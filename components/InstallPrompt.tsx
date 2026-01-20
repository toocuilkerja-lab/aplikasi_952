
import React, { useState, useEffect } from 'react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIphone = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    if (isStandalone) return;

    if (isIphone) {
      setIsIOS(true);
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem('jyp_prompt_dismissed');
        if (!dismissed) setIsVisible(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      // Mencegah browser menampilkan prompt otomatis agar kita bisa kontrol sendiri
      e.preventDefault();
      setDeferredPrompt(e);
      
      const dismissed = localStorage.getItem('jyp_prompt_dismissed');
      if (!dismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleAddClick = async () => {
    if (!deferredPrompt) return;
    
    // Langsung munculkan prompt sistem "Tambah ke Layar Utama"
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    // Apapun pilihannya, hilangkan notifikasi kita setelah user berinteraksi dengan prompt sistem
    setIsVisible(false);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('jyp_prompt_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[99] animate-slideUp">
      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 p-5 flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#002B5B] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg border-2 border-blue-50/10">
            <i className="fa-solid fa-plus text-xl"></i>
          </div>
          
          <div className="flex-1">
            <h4 className="text-[15px] font-black text-[#002B5B] leading-tight">Layanan952 di Beranda</h4>
            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
              Tambahkan shortcut ke layar utama HP Anda untuk akses instan.
            </p>
          </div>
          
          <button 
            onClick={handleDismiss}
            className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {isIOS ? (
          <div className="bg-blue-50 rounded-2xl p-4 flex items-center space-x-4">
            <div className="flex flex-col items-center justify-center text-[#002B5B] shrink-0">
               <i className="fa-solid fa-arrow-up-from-bracket text-lg mb-1"></i>
               <span className="text-[9px] font-black uppercase tracking-tighter">Share</span>
            </div>
            <p className="text-[11px] text-blue-900 font-semibold leading-snug">
              Klik <span className="text-blue-600">'Share'</span> lalu pilih <span className="text-blue-600">'Add to Home Screen'</span>.
            </p>
          </div>
        ) : (
          <button 
            onClick={handleAddClick}
            className="w-full bg-[#002B5B] text-white py-4 rounded-2xl text-xs font-black shadow-xl active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <i className="fa-solid fa-square-plus"></i>
            <span>TAMBAH KE BERANDA</span>
          </button>
        )}
      </div>
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(120%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default InstallPrompt;
