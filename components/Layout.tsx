
import React from 'react';
import { AppTab } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const tabs: { id: AppTab; icon: string; label: string }[] = [
    { id: 'Beranda', icon: 'fa-home', label: 'Beranda' },
    { id: 'Materi SPT', icon: 'fa-book-open', label: 'Materi SPT' },
    { id: 'Tutorial', icon: 'fa-graduation-cap', label: 'Tutorial' },
    { id: 'Chat', icon: 'fa-comments', label: 'Chat' },
    { id: 'Profil', icon: 'fa-user', label: 'Profil' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Header with Custom Image Background & Overlay */}
      <header 
        className="relative text-white py-7 px-6 sticky top-0 z-50 shadow-md overflow-hidden"
        style={{
          backgroundColor: '#002B5B',
          // Gunakan format direct link Google Drive agar gambar muncul sebagai background
          backgroundImage: `linear-gradient(to bottom, rgba(0, 20, 40, 0.85), rgba(0, 43, 91, 0.75)), url('https://drive.google.com/uc?export=view&id=1R37mtdqDdhQ-DANxEXeRHTmfZJzxqe8B')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <div className="bg-white/20 backdrop-blur-md p-1 rounded-2xl w-12 h-12 flex items-center justify-center border border-white/30 shadow-xl">
              <i className="fa-solid fa-landmark text-white text-xl"></i>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2 drop-shadow-md">
                PINANG JAYAPURA
              </h1>
              <div className="space-y-0.5">
                <p className="text-[12px] text-white font-semibold tracking-wide uppercase opacity-95 drop-shadow-sm">
                  Portal INformasi PerpajakAN diGital
                </p>
                <p className="text-[12px] text-white font-semibold tracking-wide uppercase opacity-95 drop-shadow-sm">
                  KPP PRATAMA JAYAPURA
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-xl relative opacity-90 hover:opacity-100 transition-all active:scale-90">
              <i className="fa-solid fa-bell"></i>
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#002B5B]"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 px-2 safe-area-bottom shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center flex-1 transition-all duration-300 ${
              activeTab === tab.id ? 'text-[#002B5B] scale-110' : 'text-slate-400'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-xl mb-1`}></i>
            <span className="text-[10px] font-black uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
