
import React, { useState } from 'react';

interface TutorialItem {
  id: string;
  title: string;
  category: 'PPh Badan' | 'PPh Orang Pribadi';
  version: string;
  description: string;
  icon: string;
}

interface TutorialProps {
  onSelectTutorial: (id: string) => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onSelectTutorial }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const tutorials: TutorialItem[] = [
    {
      id: '5',
      title: 'SPT Tahunan PPh Badan (Peredaran Bruto Tertentu)',
      category: 'PPh Badan',
      version: '2025.09.17',
      description: 'Materi edukasi pengisian SPT Tahunan PPh Badan khusus untuk Wajib Pajak dengan Peredaran Bruto Tertentu pada sistem Coretax.',
      icon: 'fa-file-invoice-dollar',
    },
    {
      id: '6',
      title: 'Tatacara Pelaporan SPT PPh Badan (Bank Konvensional)',
      category: 'PPh Badan',
      version: '2025.09.17',
      description: 'Panduan lengkap langkah-langkah penyampaian SPT Tahunan PPh Badan khusus untuk sektor perbankan konvensional.',
      icon: 'fa-building-columns',
    },
    {
      id: '7',
      title: 'SPT Tahunan PPh Badan (Manufaktur)',
      category: 'PPh Badan',
      version: '2025.09.17',
      description: 'Materi edukasi pengisian SPT Tahunan PPh Badan untuk sektor usaha manufaktur menggunakan aplikasi Coretax terbaru.',
      icon: 'fa-industry',
    },
    {
      id: '8',
      title: 'Tatacara Pelaporan SPT PPh Badan (Sektor Jasa)',
      category: 'PPh Badan',
      version: '2025.09.17',
      description: 'Langkah-langkah persiapan draft dan pengisian induk SPT Tahunan PPh Badan bagi Wajib Pajak yang bergerak di sektor jasa.',
      icon: 'fa-handshake-angle',
    },
    {
      id: '1',
      title: 'SPT Tahunan PPh Badan (Sektor Perdagangan)',
      category: 'PPh Badan',
      version: '2025.09.10',
      description: 'Materi edukasi pengisian SPT Tahunan PPh Badan khusus untuk sektor usaha perdagangan pada sistem Coretax.',
      icon: 'fa-file-pdf',
    },
    {
      id: '2',
      title: 'Pengenalan Induk & Lampiran SPT Tahunan Badan',
      category: 'PPh Badan',
      version: '2025.08.19',
      description: 'Panduan mendalam mengenai struktur formulir induk dan rincian lampiran (L1-L14) untuk Wajib Pajak Badan.',
      icon: 'fa-book',
    },
    {
      id: '3',
      title: 'SPT Tahunan PPh Orang Pribadi',
      category: 'PPh Orang Pribadi',
      version: '2025.09.10',
      description: 'Langkah-langkah persiapan draft dan pengisian induk SPT Tahunan untuk Wajib Pajak Orang Pribadi.',
      icon: 'fa-user-gear',
    },
    {
      id: '4',
      title: 'Tata Cara Pelaporan SPT OP Karyawan',
      category: 'PPh Orang Pribadi',
      version: '2025.09.10',
      description: 'Panduan praktis pelaporan SPT Tahunan bagi karyawan menggunakan aplikasi Coretax terbaru.',
      icon: 'fa-id-badge',
    }
  ];

  const handleDownload = (item: TutorialItem, e: React.MouseEvent) => {
    e.stopPropagation(); 
    const simulatedContent = `
      MATERI EDUKASI CORETAX - KPP PRATAMA JAYAPURA
      ============================================
      Judul: ${item.title}
      Kategori: ${item.category}
      Versi: ${item.version}
      
      DESKRIPSI:
      ${item.description}
      
      ---
      Dokumen ini dihasilkan secara otomatis oleh sistem pelayanan digital.
      Silakan kunjungi coretaxdjp.pajak.go.id untuk panduan interaktif selengkapnya.
      © 2025 KPP Pratama Jayapura
    `;

    const blob = new Blob([simulatedContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const fileName = item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `Materi_${fileName}_v${item.version}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredTutorials = tutorials.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 animate-fadeIn space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-bold text-slate-800">Pusat Edukasi Coretax</h2>
        <p className="text-xs text-slate-500 font-medium">Materi resmi perpajakan KPP Pratama Jayapura</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input 
          type="text" 
          placeholder="Cari materi tutorial..."
          className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tutorial List */}
      <div className="space-y-4">
        {filteredTutorials.length > 0 ? (
          filteredTutorials.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onSelectTutorial(item.id)}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all group cursor-pointer active:scale-[0.98]"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${item.category === 'PPh Badan' ? 'bg-indigo-600' : 'bg-emerald-600'}`}>
                    <i className={`fa-solid ${item.icon} text-xl`}></i>
                  </div>
                  <span className="text-[10px] font-black px-3 py-1 bg-slate-100 text-slate-500 rounded-full uppercase tracking-wider border border-slate-200/50">
                    v.{item.version}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${item.category === 'PPh Badan' ? 'text-indigo-600' : 'text-emerald-600'}`}>
                    {item.category}
                  </span>
                  <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1 font-medium">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center text-slate-400 text-[10px] font-bold uppercase tracking-tighter">
                    <i className="fa-solid fa-eye mr-1.5 text-blue-400"></i> BACA DETAIL
                  </div>
                  <button 
                    onClick={(e) => handleDownload(item, e)}
                    className="bg-blue-600 text-white px-5 py-2.5 rounded-2xl text-[10px] font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center uppercase tracking-widest"
                  >
                    <i className="fa-solid fa-download mr-2"></i> UNDUH
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <i className="fa-solid fa-file-circle-exclamation text-slate-200 text-5xl mb-4"></i>
            <p className="text-slate-400 text-sm font-medium">Materi tidak ditemukan</p>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-[28px] flex items-start space-x-4">
        <i className="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
        <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
          <strong>Tip:</strong> Klik pada kartu untuk melihat ringkasan materi, atau klik tombol <strong>Unduh</strong> untuk menyimpan dokumen PDF ke perangkat Anda.
        </p>
      </div>
    </div>
  );
};

export default Tutorial;
