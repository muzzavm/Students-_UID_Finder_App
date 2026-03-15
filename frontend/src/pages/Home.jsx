import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', classRoom: '', phone: '' });
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStudent(null);
    try {
      const { classRoom, phone } = formData;
      const { data } = await axios.get(
        `https://students-uid-finder-app.onrender.com/api/students/search?classRoom=${classRoom}&phone=${phone}`
      );
      setStudent(data);
    } catch (err) {
      alert("Student not found! Please check Class and Phone Number correctly.");
    }
    setLoading(false);
  };

  const handleReset = () => {
    setStudent(null);
    setFormData({ name: '', classRoom: '', phone: '' });
  };

  const handleAdminLogin = async () => {
    try {
      const res = await axios.post('https://students-uid-finder-app.onrender.com/api/admin/verify-passcode', { passcode });
      if (res.data.success) {
        setShowAdminModal(false);
        navigate('/admin');
      }
    } catch (err) {
      alert('Invalid Passcode!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 font-sans text-sans">
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            .printable-card, .printable-card *, .print-footer { visibility: visible; }
            .printable-card {
              position: absolute;
              left: 50%;
              top: 20px;
              transform: translateX(-50%);
              width: 100%;
              max-width: 350px;
              margin: 0 auto;
              border: none !important;
              box-shadow: none !important;
            }
            .print-footer {
              position: absolute;
              bottom: 20px;
              width: 100%;
              text-align: center;
              left: 0;
            }
            .no-print { display: none !important; }
          }
        `}
      </style>

      <div className="w-full max-w-4xl flex justify-end mb-4 no-print">
        <button onClick={() => setShowAdminModal(true)} className="bg-slate-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-slate-600 transition text-sm font-bold uppercase">
          Admin Login
        </button>
      </div>

      <div className="text-center mb-8 no-print">
        <h1 className="text-3xl font-black text-emerald-900 uppercase tracking-tighter">Madrasa UID Finder</h1>
        <p className="text-gray-500 text-sm">Enter Details to get the ID Card</p>
      </div>

      {!student && (
        <form onSubmit={handleSearch} className="w-full max-w-md bg-white p-6 rounded-3xl shadow-2xl space-y-4 border-b-8 border-emerald-600 no-print">
          <input 
            type="text" placeholder="Student Name" required 
            className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <input 
              type="text" placeholder="Class (e.g. 5)" required
              className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-center"
              value={formData.classRoom}
              onChange={(e) => setFormData({...formData, classRoom: e.target.value})}
            />
            <input 
              type="text" placeholder="Phone" required
              className="w-full p-4 rounded-2xl border border-gray-100 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-center"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <button className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase shadow-lg hover:bg-emerald-700 transition-all active:scale-95">
            {loading ? 'Searching...' : 'GET ID CARD'}
          </button>
        </form>
      )}

      {student && (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-sm bg-white p-6 rounded-3xl shadow-2xl border-2 border-emerald-600 printable-card">
            <div className="text-center">
              <div className="bg-emerald-800 text-white py-2 rounded-t-xl -mt-6 -mx-6 mb-4 font-bold tracking-widest uppercase text-xs">
                {student.academicYear || "Official ID Card"}
              </div>
              
              <h2 className="text-2xl font-black text-gray-800 uppercase leading-tight">{student.name}</h2>
              <p className="text-emerald-700 font-black text-sm mb-4">Reg No: {student.regNo}</p>

              <div className="grid grid-cols-2 gap-2 text-left bg-gray-50 p-4 rounded-2xl border border-gray-100 text-[11px] mb-4">
                <div><span className="text-gray-400 block uppercase font-bold text-[9px]">Parent</span><span className="font-bold text-gray-700 uppercase">{student.parentName}</span></div>
                <div><span className="text-gray-400 block uppercase font-bold text-[9px]">Gender</span><span className="font-bold text-gray-700 uppercase">{student.gender}</span></div>
                <div><span className="text-gray-400 block uppercase font-bold text-[9px]">Class & Div</span><span className="font-bold text-emerald-800">{student.classRoom} - {student.division}</span></div>
                <div><span className="text-gray-400 block uppercase font-bold text-[9px]">Roll ID</span><span className="font-bold text-emerald-800">{student.rollId}</span></div>
              </div>
              
              <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-dashed border-emerald-200 shadow-inner">
                <p className="text-[20px] text-red-600 uppercase font-black tracking-widest mb-1">UID</p>
                <p className="text-4xl font-mono font-black text-emerald-950">{student.uid}</p>
              </div>
              
              <button 
                onClick={() => window.print()} 
                className="mt-6 w-full py-2 bg-gray-100 text-gray-500 rounded-lg text-xs font-black uppercase hover:bg-emerald-50 hover:text-emerald-600 transition-all no-print"
              >
                Print ID Card
              </button>
            </div>
          </div>

          <button 
            onClick={handleReset}
            className="mt-6 bg-white text-emerald-700 border-2 border-emerald-600 px-8 py-3 rounded-2xl font-black uppercase shadow-md hover:bg-emerald-50 transition-all active:scale-95 no-print"
          >
            Find Other
          </button>
        </div>
      )}

      {showAdminModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 no-print">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4 uppercase tracking-widest">Admin Access</h2>
            <input type="password" placeholder="Passcode" className="w-full p-3 border rounded-xl mb-4 text-center" value={passcode} onChange={(e) => setPasscode(e.target.value)} />
            <div className="flex gap-2">
              <button onClick={() => setShowAdminModal(false)} className="flex-1 py-2 text-gray-400 font-bold uppercase text-xs">Back</button>
              <button onClick={handleAdminLogin} className="flex-1 py-2 bg-emerald-600 text-white rounded-xl font-bold uppercase text-xs">Verify</button>
            </div>
          </div>
        </div>
      )}

      {/* Updated Footer Section to show during print */}
      <footer className="mt-auto pt-10 pb-4 text-gray-400 text-[10px] font-bold camelcase tracking-widest print-footer">
        Copyright©2026 Muzza Enable Dashboards - E I P
      </footer>
    </div>
  );
};

export default Home;