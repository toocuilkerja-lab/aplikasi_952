
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

  // Menggunakan direct link dari ImgBB untuk performa terbaik
  const backgroundUrl = 'https://i.ibb.co.com/dwDLb46h/Pinang-by-nanobanana.png';

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* 
        Header dengan Background Image dari ImgBB 
        Dilapisi dengan gradient gelap agar teks tetap terbaca dengan jelas (Readability First)
      */}
      <header 
        className="relative text-white py-8 px-6 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)] overflow-hidden bg-[#002B5B]"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 20, 50, 0.85), rgba(0, 43, 91, 0.75)), url('${backgroundUrl}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Subtle Pattern Overlay untuk tekstur tambahan */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            {/* Glassmorphism Icon Container */}
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl w-14 h-14 flex items-center justify-center border border-white/20 shadow-2xl">
              <i className="fa-solid fa-landmark text-white text-2xl drop-shadow-sm"></i>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-2xl font-black uppercase tracking-tighter leading-none mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                PINANG JAYAPURA
              </h1>
              <div className="space-y-0.5 border-l-2 border-amber-400 pl-2">
                <p className="text-[13px] text-blue-200 font-bold tracking-wide leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                  Portal INformasi PerpajakAN diGital
                </p>
                <p className="text-[13px] text-blue-200 font-bold tracking-wide uppercase leading-tight drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
                  KPP PRATAMA JAYAPURA
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 px-2 safe-area-bottom shadow-[0_-8px_30px_rgba(0,0,0,0.08)] z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center flex-1 transition-all duration-300 rounded-2xl py-1 ${
              activeTab === tab.id ? 'text-[#002B5B] scale-105' : 'text-slate-400 opacity-60'
            }`}
          >
            <div className={`mb-1 transition-transform duration-300 ${activeTab === tab.id ? 'translate-y-[-2px]' : ''}`}>
              <i className={`fa-solid ${tab.icon} text-xl`}></i>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-tighter transition-all ${activeTab === tab.id ? 'opacity-100' : 'opacity-80'}`}>
              {tab.label}
            </span>
            {activeTab === tab.id && <div className="w-1 h-1 bg-amber-400 rounded-full mt-0.5 shadow-sm shadow-amber-200"></div>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
