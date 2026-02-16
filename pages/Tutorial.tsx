
import React, { useState } from 'react';

export interface TutorialItem {
  id: string;
  title: string;
  category: 'PPh Badan' | 'PPh Orang Pribadi';
  version: string;
  description: string;
  icon: string;
  downloadUrl: string;
}

interface TutorialProps {
  onSelectTutorial: (id: string) => void;
}

export const TUTORIAL_DATA: TutorialItem[] = [
  {
    id: '1',
    title: 'SPT Tahunan PPh Badan (Sektor Perdagangan)',
    category: 'PPh Badan',
    version: '2025.09.10',
    description: 'Materi edukasi pengisian SPT Tahunan PPh Badan khusus untuk sektor usaha perdagangan pada sistem Coretax.',
    icon: 'fa-file-pdf',
    downloadUrl: 'https://drive.google.com/file/d/1zHhmTkBiA9-_18TmImAsqBfj750PyleH/view?usp=drive_link'
  },
  {
    id: '5',
    title: 'SPT Tahunan PPh Badan (Peredaran Bruto Tertentu / UMKM)',
    category: 'PPh Badan',
    version: '2025.09.17',
    description: 'Materi edukasi pengisian SPT Tahunan PPh Badan khusus untuk Wajib Pajak dengan Peredaran Bruto Tertentu (UMKM - PP 55/2022) pada sistem Coretax.',
    icon: 'fa-file-invoice-dollar',
    downloadUrl: 'https://drive.google.com/file/d/1WMLAEBeYhm8Bmgy6QmCLqeRMke1jDzkg/view?usp=drive_link'
  },
  {
    id: '6',
    title: 'Tatacara Pelaporan SPT PPh Badan (Bank Konvensional)',
    category: 'PPh Badan',
    version: '2025.09.17',
    description: 'Panduan lengkap langkah-langkah penyampaian SPT Tahunan PPh Badan khusus untuk sektor perbankan konvensional pada sistem Coretax.',
    icon: 'fa-building-columns',
    downloadUrl: 'https://drive.google.com/file/d/18DdpN37Mnyi8EcPRa3UrDFXwxX4ghpsw/view?usp=sharing'
  },
  {
    id: '7',
    title: 'SPT Tahunan PPh Badan (Manufaktur)',
    category: 'PPh Badan',
    version: '2025.09.17',
    description: 'Materi edukasi pengisian SPT Tahunan PPh Badan untuk sektor usaha manufaktur (Pabrikan) menggunakan aplikasi Coretax terbaru.',
    icon: 'fa-industry',
    downloadUrl: 'https://drive.google.com/file/d/1u_sGTZ8DsR2ZyTaYQ2wTZy7mCDyQYfqh/view?usp=sharing'
  },
  {
    id: '8',
    title: 'Tatacara Pelaporan SPT PPh Badan (Sektor Jasa)',
    category: 'PPh Badan',
    version: '2025.09.17',
    description: 'Langkah-langkah persiapan draft dan pengisian induk SPT Tahunan PPh Badan bagi Wajib Pajak yang bergerak di sektor jasa.',
    icon: 'fa-handshake-angle',
    downloadUrl: 'https://drive.google.com/file/d/1fLwrOrtLYmMD1OFG0N27QHwMPetlevHw/view?usp=drive_link'
  },
  {
    id: '3',
    title: 'SPT Tahunan OP Penghasilan Bruto Tertentu',
    category: 'PPh Orang Pribadi',
    version: '2025.09.10',
    description: 'Langkah-langkah persiapan draft dan pengisian induk SPT Tahunan untuk Wajib Pajak Orang Pribadi dengan Penghasilan Bruto Tertentu (UMKM).',
    icon: 'fa-user-tag',
    downloadUrl: 'https://drive.google.com/file/d/1Crb-HxetUptsEL_2udgqj4yNXeO5AREF/view?usp=drive_link'
  },
  {
    id: '9',
    title: 'SPT Tahunan OP Pekerjaan Bebas (NPPN)',
    category: 'PPh Orang Pribadi',
    version: '2025.10.24',
    description: 'Panduan pelaporan SPT Tahunan PPh Wajib Pajak Orang Pribadi Pekerjaan Bebas dengan Norma Penghitungan Penghasilan Neto (NPPN).',
    icon: 'fa-user-doctor',
    downloadUrl: 'https://drive.google.com/file/d/1pUL-q72e0PL0yG71W4dwPPlZs6PAfvnj/view?usp=drive_link'
  },
  {
    id: '4',
    title: 'Tata Cara Pelaporan SPT OP Karyawan',
    category: 'PPh Orang Pribadi',
    version: '2025.09.10',
    description: 'Panduan praktis pelaporan SPT Tahunan bagi karyawan menggunakan aplikasi Coretax terbaru.',
    icon: 'fa-id-badge',
    downloadUrl: 'https://drive.google.com/file/d/16vQfPaJk6pp4iYQ_2DjJ9ytGvGFV_w1F/view?usp=drive_link'
  }
];

const Tutorial: React.FC<TutorialProps> = ({ onSelectTutorial }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDownload = (item: TutorialItem, e: React.MouseEvent) => {
    e.stopPropagation(); 
    window.open(item.downloadUrl, '_blank');
  };

  const filteredTutorials = TUTORIAL_DATA.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 animate-fadeIn space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-bold text-slate-800">Materi SPT (Coretax)</h2>
        <p className="text-xs text-slate-500 font-medium">Panduan resmi pelaporan perpajakan sistem terbaru</p>
      </div>

      <div className="relative">
        <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
        <input 
          type="text" 
          placeholder="Cari judul materi..."
          className="w-full pl-10 pr-4 py-4 bg-white border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm font-medium"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

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
                    <i className="fa-solid fa-eye mr-1.5 text-blue-400"></i> LIHAT RINGKASAN
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

      <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-[28px] flex items-start space-x-4">
        <i className="fa-solid fa-circle-info text-blue-500 mt-0.5"></i>
        <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
          <strong>Info:</strong> Materi di atas merupakan file edukasi Coretax resmi. Gunakan fitur Unduh untuk mendapatkan salinan dokumen PDF langsung dari Google Drive.
        </p>
      </div>
    </div>
  );
};

export default Tutorial;