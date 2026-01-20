
import React, { useState, useEffect } from 'react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Cek apakah perangkat adalah iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIphone = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    setIsIOS(isIphone && !isStandalone);

    const handleBeforeInstallPrompt = (e: any) => {
      // Mencegah browser menampilkan prompt bawaan (Android/Chrome)
      e.preventDefault();
      setDeferredPrompt(e);
      
      const isDismissed = localStorage.getItem('pwa_install_dismissed');
      const lastPromptTime = localStorage.getItem('pwa_last_prompt_time');
      const now = new Date().getTime();
      
      if (!isDismissed || (lastPromptTime && now - parseInt(lastPromptTime) > 86400000)) {
        setIsVisible(true);
      }
    };

    // Untuk Android/Chrome
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Untuk iOS, munculkan prompt setelah beberapa detik jika bukan standalone
    if (isIphone && !isStandalone) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    setIsVisible(false);
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa_install_dismissed', 'true');
    localStorage.setItem('pwa_last_prompt_time', new Date().getTime().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[95] animate-slideUp">
      <div className="bg-white rounded-[24px] shadow-[0_15px_50px_-12px_rgba(0,0,0,0.25)] border border-slate-100 p-5 flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          {/* Ikon Logo Kantor seperti di Profil */}
          <div className="w-14 h-14 bg-[#002B5B] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg border-2 border-blue-50/20">
            <i className="fa-solid fa-landmark text-2xl"></i>
          </div>
          
          <div className="flex-1">
            <h4 className="text-[15px] font-bold text-slate-800 leading-tight">Pasang Aplikasi</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Tambahkan ke layar utama untuk akses layanan pajak lebih cepat & mudah.
            </p>
          </div>
          
          <button 
            onClick={handleDismiss}
            className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {isIOS ? (
          /* Panduan Khusus iOS */
          <div className="bg-blue-50 rounded-xl p-3 flex items-center space-x-3">
            <div className="flex flex-col items-center justify-center text-[#002B5B]">
               <i className="fa-solid fa-arrow-up-from-bracket text-sm mb-1"></i>
               <span className="text-[8px] font-bold uppercase">Share</span>
            </div>
            <p className="text-[10px] text-blue-800 font-medium">
              Ketuk ikon <strong>'Share'</strong> di bawah, lalu pilih <strong>'Add to Home Screen'</strong>.
            </p>
          </div>
        ) : (
          /* Tombol Instal untuk Android/PC */
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleDismiss}
              className="flex-1 py-3 text-xs font-bold text-slate-400 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Nanti Saja
            </button>
            <button 
              onClick={handleInstallClick}
              className="flex-[2] bg-[#002B5B] text-white py-3 rounded-xl text-xs font-bold shadow-lg shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-plus-circle"></i>
              <span>PASANG SEKARANG</span>
            </button>
          </div>
        )}
      </div>
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default InstallPrompt;
