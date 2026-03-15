import React from 'react';

const DownloadButton = ({ onClick, label = "Download PNG" }) => {
  return (
    <button 
      onClick={onClick}
      className="mt-6 bg-gray-800 hover:bg-black text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg flex items-center gap-2"
    >
      <span>📥</span> {label}
    </button>
  );
};

export default DownloadButton;