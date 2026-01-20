
import React, { useState, useEffect } from 'react';

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      // Mencegah browser menampilkan prompt bawaan
      e.preventDefault();
      // Simpan event agar bisa dipicu nanti
      setDeferredPrompt(e);
      
      // Tampilkan UI kustom jika pengguna belum pernah menolak/menginstal hari ini
      const isDismissed = localStorage.getItem('pwa_install_dismissed');
      const lastPromptTime = localStorage.getItem('pwa_last_prompt_time');
      const now = new Date().getTime();
      
      // Munculkan jika belum di-dismiss ATAU sudah lewat 24 jam dari dismiss terakhir
      if (!isDismissed || (lastPromptTime && now - parseInt(lastPromptTime) > 86400000)) {
        setIsVisible(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    setIsVisible(false);
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('pwa_install_dismissed', 'true');
    localStorage.setItem('pwa_last_prompt_time', new Date().getTime().toString());
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-[90] animate-slideUp">
      <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-100 p-4 flex items-center space-x-4">
        <div className="w-12 h-12 bg-[#002B5B] rounded-xl flex items-center justify-center text-white shrink-0">
          <i className="fa-solid fa-landmark text-xl"></i>
        </div>
        <div className="flex-1">
          <h4 className="text-sm font-bold text-slate-800 leading-tight">Pasang Aplikasi</h4>
          <p className="text-[10px] text-slate-500">Akses lebih cepat melalui layar utama Anda.</p>
        </div>
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleDismiss}
            className="px-3 py-2 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Nanti
          </button>
          <button 
            onClick={handleInstallClick}
            className="bg-[#002B5B] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-blue-100 active:scale-95 transition-all"
          >
            Pasang
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
