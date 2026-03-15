import React, { useRef } from 'react';
import { toPng } from 'html-to-image';

const IDCard = ({ student }) => {
  const cardRef = useRef(null);

  const downloadImage = () => {
    if (cardRef.current === null) return;
    toPng(cardRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = `${student.name}-UID.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center animate-fadeIn">
      {/* ID Card Box */}
      <div 
        ref={cardRef} 
        className="w-85 p-6 bg-gradient-to-br from-emerald-600 to-green-700 text-white rounded-[2.5rem] shadow-2xl border-4 border-white/20 relative overflow-hidden"
      >
        {/* Background Decorative Element */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>

        <div className="text-center border-b border-white/30 pb-3 mb-4">
          <h1 className="text-xl font-black tracking-wider uppercase">Madrasa E-Card</h1>
          <p className="text-[10px] uppercase opacity-80 tracking-[0.2em]">{student.academicYear || "Academic Year 2025-26"}</p>
        </div>
        
        <div className="space-y-3">
          {/* Main Info */}
          <div className="text-center mb-4">
             <p className="text-[10px] uppercase opacity-70">Student Name</p>
             <p className="font-black text-xl uppercase leading-tight">{student.name}</p>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-2 gap-3 bg-black/10 p-4 rounded-2xl border border-white/10 text-[11px]">
            <p><span className="opacity-70 uppercase block text-[9px]">Parent:</span> <span className="font-bold uppercase">{student.parentName}</span></p>
            <p><span className="opacity-70 uppercase block text-[9px]">Reg No:</span> <span className="font-bold">{student.regNo}</span></p>
            <p><span className="opacity-70 uppercase block text-[9px]">Class & Div:</span> <span className="font-bold">{student.classRoom} - {student.division}</span></p>
            <p><span className="opacity-70 uppercase block text-[9px]">Gender:</span> <span className="font-bold uppercase">{student.gender}</span></p>
          </div>

          <p className="text-center text-[10px] opacity-60">Ph: {student.phone}</p>
        </div>

        {/* UID Display */}
        <div className="mt-5 bg-white text-emerald-900 py-4 rounded-2xl text-center shadow-inner border-b-4 border-emerald-200">
          <p className="text-[20px] font-black uppercase opacity-50 tracking-widest mb-1">UID</p>
          <p className="text-4xl font-mono font-black tracking-tighter">{student.uid}</p>
        </div>
      </div>

      {/* Download Button */}
      <button 
        onClick={downloadImage}
        className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 px-10 rounded-2xl transition-all shadow-xl flex items-center gap-3 uppercase text-sm tracking-widest active:scale-95"
      >
        <span>📥</span> Download ID Card (PNG)
      </button>
    </div>
  );
};

export default IDCard;