
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
      {/* Header */}
      <header className="bg-[#002B5B] text-white py-5 px-6 sticky top-0 z-50 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1 rounded-full w-10 h-10 flex items-center justify-center shadow-inner">
              <i className="fa-solid fa-landmark text-[#002B5B] text-lg"></i>
            </div>
            <div className="flex flex-col">
              <h1 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1">PINANG JAYAPURA</h1>
              <p className="text-[12px] text-blue-200 leading-tight font-medium ">
                Portal INformasi PerpajakAN diGital<br/>
                KPP PRATAMA JAYAPURA
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-xl relative opacity-80 hover:opacity-100 transition-opacity">
              <i className="fa-solid fa-bell"></i>
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#002B5B]"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around py-3 px-2 safe-area-bottom shadow-lg z-50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center flex-1 transition-all duration-200 ${
              activeTab === tab.id ? 'text-[#002B5B] scale-105' : 'text-slate-400'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-xl mb-1`}></i>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
