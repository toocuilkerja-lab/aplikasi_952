import React, { useState, useEffect } from 'react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Deteksi iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIphone = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    setIsIOS(isIphone && !isStandalone);

    const handleBeforeInstallPrompt = (e: any) => {
      // Mencegah browser menampilkan prompt bawaan
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Paksa tampilkan
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Untuk iOS, munculkan panduan setelah 2 detik
    if (isIphone && !isStandalone) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
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
    // Simpan status ditolak agar tidak mengganggu terus-menerus
    localStorage.setItem('pwa_install_dismissed', 'true');
    localStorage.setItem('pwa_last_prompt_time', new Date().getTime().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[99] animate-slideUp">
      <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 p-5 flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          {/* Ikon Landmark sesuai permintaan (Navy Blue Background, White Icon) */}
          <div className="w-14 h-14 bg-[#002B5B] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg border-2 border-blue-50/10">
            <svg className="w-8 h-8" viewBox="0 0 512 512" fill="currentColor">
              <path d="M256 64l224 112v32H32v-32L256 64zM64 448v-32h384v32H64zm320-208v144h-32V240h32zm-96 0v144h-32V240h32zm-96 0v144h-32V240h32zm-96 0v144h-32V240h32z" />
            </svg>
          </div>
          
          <div className="flex-1">
            <h4 className="text-[16px] font-black text-[#002B5B] leading-tight">Install Layanan952</h4>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-medium">
              Akses cepat layanan kantor pajak Jayapura langsung dari layar utama HP Anda.
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
              Klik tombol <span className="text-blue-600">'Share'</span> di Safari, lalu pilih <span className="text-blue-600">'Add to Home Screen'</span>.
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleDismiss}
              className="flex-1 py-3.5 text-xs font-bold text-slate-400 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors active:scale-95"
            >
              NANTI SAJA
            </button>
            <button 
              onClick={handleInstallClick}
              className="flex-[2] bg-[#002B5B] text-white py-3.5 rounded-2xl text-xs font-black shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <i className="fa-solid fa-download"></i>
              <span>PASANG SEKARANG</span>
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