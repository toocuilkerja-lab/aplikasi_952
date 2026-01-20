
import React, { useState, useEffect } from 'react';

const InstallPrompt: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIphone = /iphone|ipad|ipod/.test(userAgent);
    const isStandalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
    
    // Jangan tampilkan jika sudah dalam mode shortcut/homescreen
    if (isStandalone) return;

    setIsIOS(isIphone);

    // Munculkan banner setelah 3 detik jika belum pernah di-dismiss
    const timer = setTimeout(() => {
      const dismissed = localStorage.getItem('jyp_shortcut_dismissed');
      if (!dismissed) setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('jyp_shortcut_dismissed', 'true');
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Banner Utama */}
      <div className="fixed bottom-24 left-4 right-4 z-[99] animate-slideUp">
        <div className="bg-white rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-100 p-5 flex flex-col space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-[#002B5B] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg border-2 border-blue-50/10">
              <i className="fa-solid fa-star text-xl"></i>
            </div>
            
            <div className="flex-1">
              <h4 className="text-[15px] font-black text-[#002B5B] leading-tight">Akses Cepat Layanan952</h4>
              <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-medium">
                Simpan shortcut di layar utama untuk akses lebih praktis tanpa install.
              </p>
            </div>
            
            <button 
              onClick={handleDismiss}
              className="w-8 h-8 flex items-center justify-center text-slate-300 hover:text-slate-500 transition-colors"
            >
              <i className="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <button 
            onClick={() => setShowGuide(true)}
            className="w-full bg-[#002B5B] text-white py-4 rounded-2xl text-xs font-black shadow-xl active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <i className="fa-solid fa-plus-square"></i>
            <span>TAMBAH KE BERANDA</span>
          </button>
        </div>
      </div>

      {/* Overlay Panduan (Muncul saat tombol diklik) */}
      {showGuide && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setShowGuide(false)}></div>
          
          <div className="bg-white w-full max-w-md rounded-t-[40px] p-8 pb-12 relative z-10 animate-slideUp">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
            
            <h3 className="text-xl font-black text-[#002B5B] mb-6 text-center">Cara Tambah ke Beranda</h3>
            
            <div className="space-y-6">
              {isIOS ? (
                <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <p className="text-sm text-slate-600 pt-1 leading-relaxed">
                      Klik ikon <strong>'Bagikan' (Share)</strong> di bagian bawah Safari <i className="fa-solid fa-arrow-up-from-bracket mx-1"></i>.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <p className="text-sm text-slate-600 pt-1 leading-relaxed">
                      Gulir ke bawah dan pilih menu <strong>'Add to Home Screen'</strong>.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</div>
                    <p className="text-sm text-slate-600 pt-1 leading-relaxed">
                      Klik ikon <strong>titik tiga (⋮)</strong> di pojok kanan atas browser <i className="fa-solid fa-ellipsis-vertical mx-1"></i>.
                    </p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</div>
                    <p className="text-sm text-slate-600 pt-1 leading-relaxed">
                      Pilih menu <strong>'Tambah ke Layar Utama'</strong> (Add to Home Screen).
                    </p>
                  </div>
                </div>
              )}

              <button 
                onClick={() => setShowGuide(false)}
                className="w-full mt-4 bg-slate-100 text-slate-600 py-4 rounded-2xl font-bold text-sm"
              >
                SAYA MENGERTI
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default InstallPrompt;
