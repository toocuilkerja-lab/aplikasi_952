
import React from 'react';
import { SubService } from '../types';

interface ServiceDetailProps {
  subService: SubService;
  onBack: () => void;
}

const InfoBox: React.FC<{ icon: string; title: string; value: string; colorClass: string }> = ({ icon, title, value, colorClass }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col items-center text-center">
    <div className={`${colorClass} mb-2 w-10 h-10 rounded-full flex items-center justify-center text-white`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{title}</h4>
    <p className="text-sm font-bold text-slate-800 mt-1">{value}</p>
  </div>
);

const RequirementItem: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-start space-x-3 group">
    <div className="mt-1 flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
      <i className="fa-solid fa-check text-[8px] text-blue-600 group-hover:text-white"></i>
    </div>
    <p className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">{text}</p>
  </div>
);

const ServiceDetail: React.FC<ServiceDetailProps> = ({ subService, onBack }) => {
  const isCoretaxService = subService.id.startsWith('n') || subService.id.startsWith('pk') || subService.id.startsWith('eb') || subService.id.startsWith('pbk');
  const estimationValue = isCoretaxService ? "1 Hari Kerja" : "1-3 Hari Kerja";
  const portalUrl = isCoretaxService ? "https://coretaxdjp.pajak.go.id" : "https://pajak.go.id";
  const portalName = isCoretaxService ? "Aplikasi Coretax" : "Portal DJP";

  const handleDownloadPDF = () => {
    // Mengarahkan langsung ke folder Google Drive materi resmi sesuai permintaan user
    window.open('https://drive.google.com/drive/folders/1ihcCLYoG3oC9Tl10I0LLYmd7xiHhi8kR', '_blank');
  };

  const showModulSection = ['n1', 'n2', 'n6', 'n7', 'n8', 'pk1', 'pk2', 'eb1', 'pbk1'].includes(subService.id);
  
  const billingVideos = [
    { title: 'Video Tutorial: Billing Mandiri', url: 'https://www.youtube.com/watch?v=DuyPFPIZ8LE' },
    { title: 'Video Tutorial: Billing Tunggakan', url: 'https://www.youtube.com/watch?v=QNJHnJwJ4Ic' },
    { title: 'Video Tutorial: Billing Aktif', url: 'https://www.youtube.com/watch?v=TYhqxExnFWE' }
  ];

  let videoUrl = 'https://www.youtube.com/watch?v=w9kmUa0EPPQ';
  let videoTitle = 'Video Tutorial (Simulasi Coretax OP)';
  
  if (subService.id === 'n2') {
    videoUrl = 'https://www.youtube.com/watch?v=57ejJ0OoGn4';
    videoTitle = 'Video Tutorial (Pendaftaran WP Badan)';
  } else if (subService.id === 'n6') {
    videoUrl = 'https://www.youtube.com/watch?v=C4A8vbXwhsM';
    videoTitle = 'Video Tutorial (Perubahan Data WP)';
  } else if (subService.id === 'n7') {
    videoUrl = 'https://www.youtube.com/watch?v=oCuf60vaU5o';
    videoTitle = 'Video Tutorial (Perubahan Status WP)';
  } else if (subService.id === 'n8') {
    videoUrl = 'https://www.youtube.com/watch?v=49Mdxvq1SM0';
    videoTitle = 'Video Tutorial (Penghapusan NPWP)';
  } else if (subService.id === 'pk1') {
    videoUrl = 'https://www.youtube.com/watch?v=tjOoPmHJe_c';
    videoTitle = 'Video Tutorial (Pengukuhan PKP)';
  } else if (subService.id === 'pk2') {
    videoUrl = 'https://www.youtube.com/watch?v=a5OdqO4720A';
    videoTitle = 'Video Tutorial (Pencabutan PKP)';
  } else if (subService.id === 'pbk1') {
    videoUrl = 'https://www.youtube.com/watch?v=wVfC4D8za4w';
    videoTitle = 'Video Tutorial (Pemindahbukuan PBK)';
  }

  return (
    <div className="animate-slideInRight bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center sticky top-[64px] z-40 shadow-sm">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
          <i className="fa-solid fa-arrow-left text-slate-600"></i>
        </button>
        <h2 className="text-sm font-bold text-slate-800 line-clamp-1 uppercase tracking-tight">Detail Layanan</h2>
      </div>

      <div className="p-6 pb-28 space-y-6 mt-2">
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-[#002B5B] leading-tight">
            {subService.title}
          </h3>
          <div className="h-1 w-12 bg-blue-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InfoBox 
            icon="fa-clock" 
            title="Estimasi" 
            value={estimationValue} 
            colorClass="bg-blue-500" 
          />
          <InfoBox 
            icon="fa-tag" 
            title="Biaya" 
            value="Rp 0 (Gratis)" 
            colorClass="bg-emerald-500" 
          />
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-50 pb-3">
            <i className="fa-solid fa-list-check text-blue-600"></i>
            <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Persyaratan Dokumen</h4>
          </div>
          <div className="space-y-4">
            {subService.id === 'n2' ? (
              <>
                <RequirementItem text="Akta Pendirian asli / Fotokopi Dokumen Pendirian." />
                <RequirementItem text="Dokumen Identitas Pengurus (KTP/NPWP)." />
                <RequirementItem text="Email aktif perusahaan / perwakilan." />
                <RequirementItem text="Nomor HP aktif penanggung jawab." />
                <RequirementItem text="Dokumen Izin Usaha / NIB (Jika ada)." />
              </>
            ) : subService.id === 'eb1' ? (
              <>
                <RequirementItem text="Nomor Identitas Wajib Pajak (NPWP)." />
                <RequirementItem text="Data Objek Pajak (Jika terkait PBB)." />
                <RequirementItem text="Surat Tagihan / Ketetapan (Jika bayar tunggakan)." />
                <RequirementItem text="Akses ke Portal Wajib Pajak (Passphrase)." />
              </>
            ) : subService.id === 'pbk1' ? (
              <>
                <RequirementItem text="Bukti Setoran (NTPN) asli/fotokopi." />
                <RequirementItem text="Surat Permohonan Pemindahbukuan resmi." />
                <RequirementItem text="Dokumen pendukung alasan PBK (Salah tulis/ketik)." />
                <RequirementItem text="Fotokopi KTP/NPWP Pemohon." />
              </>
            ) : subService.id === 'pk1' || subService.id === 'pk2' ? (
              <>
                <RequirementItem text="Identitas Wajib Pajak (KTP/NPWP)." />
                <RequirementItem text="Dokumen kepemilikan/sewa tempat usaha (Akta/Sewa/PBB)." />
                <RequirementItem text="Dokumen pendukung alasan permohonan." />
                <RequirementItem text="Email & Nomor HP aktif untuk verifikasi OTP." />
              </>
            ) : ['n6', 'n7', 'n8'].includes(subService.id) ? (
              <>
                <RequirementItem text="Identitas Wajib Pajak (KTP/NPWP)." />
                <RequirementItem text="Dokumen pendukung perubahan (Akta/Sertifikat/dll)." />
                <RequirementItem text="Formulir resmi DJP (jika datang ke KPP)." />
                <RequirementItem text="Email & Nomor HP aktif untuk verifikasi OTP." />
              </>
            ) : (
              <>
                <RequirementItem text="KTP (Kartu Tanda Penduduk) asli." />
                <RequirementItem text="Kartu Keluarga (KK) terbaru." />
                <RequirementItem text="Email aktif yang valid." />
                <RequirementItem text="Nomor HP aktif yang terhubung WhatsApp." />
                <RequirementItem text="Dokumen pendukung (Jika menjalankan usaha)." />
              </>
            )}
          </div>
        </div>

        {showModulSection && (
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center space-x-2">
                <i className="fa-solid fa-graduation-cap text-indigo-600"></i>
                <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Modul dan Tutorial</h4>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-indigo-50/50 rounded-xl group border border-indigo-100/50 transition-all">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center">
                    <i className="fa-solid fa-file-pdf text-lg"></i>
                  </div>
                  <div className="pr-2">
                    <span className="text-xs font-bold text-slate-800 block">Panduan Resmi (PDF)</span>
                    <span className="text-[9px] text-slate-500 leading-none">Materi Edukasi • Google Drive</span>
                  </div>
                </div>
                <button 
                  onClick={handleDownloadPDF}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition-all shadow-md active:scale-90 flex items-center space-x-2"
                >
                  <i className="fa-solid fa-download text-[10px]"></i>
                  <span className="text-[10px] font-bold">UNDUH PDF</span>
                </button>
              </div>

              {subService.id === 'eb1' ? (
                <div className="space-y-2">
                  {billingVideos.map((video, idx) => (
                    <div 
                      key={idx}
                      onClick={() => window.open(video.url, '_blank')}
                      className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group border border-transparent hover:border-red-100 transition-all cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                          <i className="fa-brands fa-youtube"></i>
                        </div>
                        <span className="text-xs font-semibold text-slate-700 leading-tight">{video.title}</span>
                      </div>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-300"></i>
                    </div>
                  ))}
                </div>
              ) : (
                <div 
                  onClick={() => window.open(videoUrl, '_blank')}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group border border-transparent hover:border-red-100 transition-all cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                      <i className="fa-brands fa-youtube"></i>
                    </div>
                    <span className="text-xs font-semibold text-slate-700 leading-tight">{videoTitle}</span>
                  </div>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-300"></i>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section: Proses Layanan */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 border-l-4 border-[#002B5B]">
          <div className="flex items-center justify-between border-b border-slate-50 pb-3">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-gears text-[#002B5B]"></i>
              <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Proses Layanan</h4>
            </div>
          </div>
          <div className="space-y-3">
            {/* Action 1: Aplikasi Coretax */}
            <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl group border border-blue-100/50 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-laptop text-lg"></i>
                </div>
                <div className="pr-2">
                  <span className="text-xs font-bold text-slate-800 block">Melalui {portalName}</span>
                  <span className="text-[9px] text-slate-500 leading-none">Layanan Mandiri Secara Online</span>
                </div>
              </div>
              <button 
                onClick={() => window.open(portalUrl, '_blank')}
                className="bg-[#002B5B] text-white px-4 py-2 rounded-xl hover:bg-blue-900 transition-all shadow-md active:scale-90 flex items-center space-x-2 shrink-0"
              >
                <i className="fa-solid fa-external-link text-[10px]"></i>
                <span className="text-[10px] font-bold uppercase">BUKA</span>
              </button>
            </div>

            {/* Action 2: Datang Langsung */}
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl group border border-slate-100 transition-all">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-slate-200 text-slate-600 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-building-columns text-lg"></i>
                </div>
                <div className="pr-2">
                  <span className="text-xs font-bold text-slate-800 block leading-tight">Datang Langsung ke KPP Pratama Jayapura</span>
                  <span className="text-[9px] text-slate-500 leading-none">Kunjungan Tatap Muka</span>
                </div>
              </div>
              <button 
                onClick={() => window.open('https://maps.google.com/?q=KPP+Pratama+Jayapura', '_blank')}
                className="bg-white text-[#002B5B] border border-[#002B5B] px-3 py-2 rounded-xl hover:bg-slate-50 transition-all shadow-sm active:scale-90 flex items-center space-x-2 shrink-0"
              >
                <i className="fa-solid fa-map-location-dot text-[10px]"></i>
                <span className="text-[10px] font-bold uppercase">MAPS</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
          <p className="text-[10px] text-amber-700 leading-relaxed italic">
            *Tombol UNDUH PDF akan mengarahkan Anda ke folder Google Drive resmi yang berisi materi edukasi Coretax KPP Pratama Jayapura.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
