import React, { useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    classRoom: '', 
    phone: '', 
    uid: '', 
    rollId: '',
    division: '',
    academicYear: '2025-2026',
    gender: 'male',
    parentName: '',
    regNo: ''
  });

  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentData = {
        name: formData.name,
        classRoom: formData.classRoom, 
        phone: formData.phone,   
        uid: formData.rollId, 
        rollId: formData.rollId,
        division: formData.division,
        academicYear: formData.academicYear,
        gender: formData.gender,
        parentName: formData.parentName,
        regNo: formData.regNo
      };

      const response = await axios.post('https://students-uid-finder-app.onrender.com/api/students/add', studentData);
      
      if (response.data.success) {
        alert('Student Added Successfully!');
        setFormData({ 
          name: '', classRoom: '', phone: '', uid: '', 
          rollId: '', division: '', academicYear: '2025-2026', 
          gender: 'male', parentName: '', regNo: '' 
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding student.');
    }
  };

  // ഫയൽ സെലക്ട് ചെയ്യുമ്പോൾ മാത്രം റൺ ചെയ്യുന്ന ഫങ്ക്ഷൻ
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // അപ്‌ലോഡ് ബട്ടൺ അമർത്തുമ്പോൾ ഡാറ്റ പ്രോസസ്സ് ചെയ്യാനുള്ള ഫങ്ക്ഷൻ
  const handleBulkUpload = async () => {
    if (!selectedFile) {
      alert("Please select a JSON file first!");
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsText(selectedFile, "UTF-8");
    fileReader.onload = async (e) => {
      try {
        let jsonContent;
        const rawData = e.target.result.trim();

        if (rawData.startsWith('[')) {
          jsonContent = JSON.parse(rawData);
        } else {
          jsonContent = rawData.split('\n')
            .filter(line => line.trim() !== '')
            .map(line => JSON.parse(line));
        }

        if (Array.isArray(jsonContent)) {
          setUploading(true);
          let successCount = 0;

          for (const student of jsonContent) {
            const filteredData = {
              name: student.name,
              parentName: student.parentName,
              classRoom: String(student.class || student.classRoom),
              division: student.division,
              regNo: student.regNo,
              rollId: student.rollId,
              uid: student.rollId || student.uid, 
              academicYear: student.academicYear || "2025-2026",
              gender: student.gender || "male",
              phone: student.phone || "0000000000"
            };

            await axios.post('http://localhost:5000/api/students/add', filteredData);
            successCount++;
          }

          alert(`${successCount} Students uploaded successfully!`);
          setUploading(false);
          setSelectedFile(null); // ഫയൽ റീസെറ്റ് ചെയ്യുന്നു
          document.getElementById('fileInput').value = ""; 
        }
      } catch (err) {
        console.error(err);
        alert("Error parsing JSON file. Please check the file format.");
        setUploading(false);
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center text-sans">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-emerald-900 uppercase">Admin Dashboard</h1>
      </div>

      {/* Bulk Upload Section */}
      <div className="w-full max-w-2xl mb-6 p-6 bg-emerald-50 rounded-3xl border-2 border-dashed border-emerald-200 text-center">
        <p className="text-emerald-800 font-bold mb-3 uppercase text-xs tracking-widest">Bulk Import from JSON</p>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input 
            id="fileInput"
            type="file" 
            accept=".json" 
            onChange={handleFileChange}
            className="block w-full text-sm text-emerald-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-emerald-700 hover:file:bg-gray-100 cursor-pointer"
          />
          <button 
            onClick={handleBulkUpload}
            disabled={uploading || !selectedFile}
            className={`px-6 py-2 rounded-full font-bold uppercase text-xs transition-all ${uploading || !selectedFile ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md active:scale-95'}`}
          >
            {uploading ? 'Uploading...' : 'Upload JSON'}
          </button>
        </div>
        {uploading && <p className="mt-4 text-emerald-600 font-bold animate-pulse text-xs uppercase">Processing Data... Please wait.</p>}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Full Name */}
        <input 
          type="text" placeholder="Student Full Name" required
          className="w-full border-2 border-gray-100 p-3 rounded-2xl" 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})} 
        />

        {/* Parent Name */}
        <input 
          type="text" placeholder="Parent Name" required
          className="w-full border-2 border-gray-100 p-3 rounded-2xl" 
          value={formData.parentName} 
          onChange={(e) => setFormData({...formData, parentName: e.target.value})} 
        />

        {/* Class */}
        <input 
          type="text" placeholder="Class (e.g. 1)" required
          className="w-full border-2 border-gray-100 p-3 rounded-2xl" 
          value={formData.classRoom} 
          onChange={(e) => setFormData({...formData, classRoom: e.target.value})} 
        />

        {/* Division */}
        <input 
          type="text" placeholder="Division (e.g. A)" required
          className="w-full border-2 border-gray-100 p-3 rounded-2xl" 
          value={formData.division} 
          onChange={(e) => setFormData({...formData, division: e.target.value})} 
        />

        {/* Registration No */}
        <input 
          type="text" placeholder="Registration No" required
          className="w-full border-2 border-gray-100 p-3 rounded-2xl" 
          value={formData.regNo} 
          onChange={(e) => setFormData({...formData, regNo: e.target.value})} 
        />

        {/* Roll ID (ഇതാണ് UID ആയും സേവ് ആകുന്നത്) */}
        <input 
          type="text" placeholder="Roll ID / UID" required
          className="w-full border-2 border-emerald-500 p-3 rounded-2xl font-bold" 
          value={formData.rollId} 
          onChange={(e) => setFormData({...formData, rollId: e.target.value})} 
        />

        {/* Academic Year */}
        <input 
          type="text" placeholder="Academic Year" required
          className="w-full border-2 border-gray-100 p-3 rounded-2xl" 
          value={formData.academicYear} 
          onChange={(e) => setFormData({...formData, academicYear: e.target.value})} 
        />

        {/* Gender */}
        <select 
          className="w-full border-2 border-gray-100 p-3 rounded-2xl bg-white text-gray-400"
          value={formData.gender}
          onChange={(e) => setFormData({...formData, gender: e.target.value})}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        {/* Phone */}
        <input 
          type="text" placeholder="Parent's Phone" required
          className="w-full border-2 border-gray-100 p-3 rounded-2xl md:col-span-2" 
          value={formData.phone} 
          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
        />

        <button type="submit" className="md:col-span-2 w-full bg-emerald-600 text-white py-4 rounded-2xl font-black uppercase shadow-lg hover:bg-emerald-700 transition-all active:scale-95">
          Save Student Data
        </button>
      </form>
    </div>
  );
};

export default Admin;