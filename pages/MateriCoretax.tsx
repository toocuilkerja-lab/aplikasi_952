
import React from 'react';
import Tutorial from './Tutorial';

interface MateriCoretaxProps {
  onSelectTutorial: (id: string) => void;
}

const MateriCoretax: React.FC<MateriCoretaxProps> = ({ onSelectTutorial }) => {
  return (
    <div className="animate-fadeIn">
      <div className="px-6 pt-6">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 rounded-[32px] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-xl font-black uppercase tracking-tight">Materi Coretax</h2>
            <p className="text-xs text-blue-100 opacity-80 mt-1">Edukasi Sistem Administrasi Perpajakan Terbaru</p>
          </div>
          <i className="fa-solid fa-laptop-code absolute -right-4 -bottom-4 text-white/10 text-8xl rotate-12"></i>
        </div>
      </div>
      <Tutorial onSelectTutorial={onSelectTutorial} />
    </div>
  );
};

export default MateriCoretax;