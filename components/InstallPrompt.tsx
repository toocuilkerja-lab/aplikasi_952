
import React, { useState, useEffect } from 'react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIphone = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    // Jika sudah dibuka dari homescreen (mode standalone), jangan tampilkan prompt
    if (isStandalone) return;

    if (isIphone) {
      setIsIOS(true);
      // Untuk iOS, tampilkan setelah 4 detik jika belum pernah di-dismiss
      const timer = setTimeout(() => {
        const dismissed = localStorage.getItem('jyp_prompt_dismissed');
        if (!dismissed) setIsVisible(true);
      }, 4000);
      return () => clearTimeout(timer);
    }

    const handleBeforeInstallPrompt = (e: any) => {
      // Mencegah browser menampilkan prompt instalasi sistem otomatis
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

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Memunculkan dialog "Tambah ke Layar Utama" bawaan browser
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Simpan status agar tidak muncul kembali di sesi yang sama
    localStorage.setItem('jyp_prompt_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[99] animate-slideUp">
      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 p-5 flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-[#002B5B] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg border-2 border-blue-50/10">
            <i className="fa-solid fa-landmark text-2xl"></i>
          </div>
          
          <div className="flex-1">
            <h4 className="text-[16px] font-black text-[#002B5B] leading-tight">Tambah ke Beranda</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-medium">
              Simpan akses cepat Layanan952 langsung dari layar utama HP Anda.
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
              Klik tombol <span className="text-blue-600">'Share'</span> lalu pilih <span className="text-blue-600">'Add to Home Screen'</span>.
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleDismiss}
              className="flex-1 py-3.5 text-xs font-bold text-slate-400 bg-slate-50 rounded-2xl"
            >
              NANTI
            </button>
            <button 
              onClick={handleInstallClick}
              className="flex-[2] bg-[#002B5B] text-white py-3.5 rounded-2xl text-xs font-black shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-plus-square"></i>
              <span>TAMBAH KE BERANDA</span>
            </button>
          </div>
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
