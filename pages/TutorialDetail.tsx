
import React from 'react';

interface TutorialDetailProps {
  tutorialId: string;
  onBack: () => void;
}

const TutorialDetail: React.FC<TutorialDetailProps> = ({ tutorialId, onBack }) => {
  const renderContent = () => {
    switch (tutorialId) {
      case '5': // PPh Badan (Peredaran Bruto Tertentu)
        return (
          <div className="space-y-6">
            <header className="space-y-2">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Edukasi Coretax v.2025.09.17</span>
              <h3 className="text-xl font-black text-slate-800 uppercase leading-tight">PPh Badan - Peredaran Bruto Tertentu</h3>
            </header>

            <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 text-sm border-b pb-3 flex items-center uppercase tracking-wide">
                <i className="fa-solid fa-star text-amber-400 mr-2"></i> Poin Penting (PP 55/2022)
              </h4>
              <ul className="space-y-4">
                <InfoItem icon="fa-check" text="Ditujukan bagi Wajib Pajak yang dikenakan PPh bersifat final UMKM 0,5%." />
                <InfoItem icon="fa-check" text="Rekapitulasi peredaran bruto diisi pada Lampiran 5 Bagian B." />
                <InfoItem icon="fa-check" text="Pengisian dilakukan mulai dari Induk SPT." />
                <InfoItem icon="fa-check" text="Status SPT akhir adalah Nihil setelah validasi pembayaran mandiri." />
              </ul>
            </section>

            <section className="space-y-4">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide ml-2">Skenario Pengisian</h4>
              <div className="space-y-4">
                <StepCard num="1" title="Login & Impersonate" desc="Buka coretaxdjp.pajak.go.id, login NIK/NPWP dan impersonate ke akun badan." />
                <StepCard num="2" title="Induk Bagian C" desc="Pilih 'Ya' pada penghasilan peredaran bruto tertentu final." />
                <StepCard num="3" title="Lampiran 5 & 4" desc="Isi rekap bruto bulanan di L5, lalu validasi DPP di Lampiran 4 Bagian A." />
              </div>
            </section>
          </div>
        );

      case '6': // Bank Konvensional
        return (
          <div className="space-y-6">
            <header className="space-y-2">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Edukasi Coretax v.2025.09.17</span>
              <h3 className="text-xl font-black text-slate-800 uppercase leading-tight">PPh Badan - Bank Konvensional</h3>
            </header>

            <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 text-sm border-b pb-3 flex items-center uppercase tracking-wide">
                <i className="fa-solid fa-university text-blue-500 mr-2"></i> Ketentuan Sektor Perbankan
              </h4>
              <ul className="space-y-4">
                <InfoItem icon="fa-check" text="Menggunakan Lampiran L1-E Rekonsiliasi Laporan Keuangan Bank." />
                <InfoItem icon="fa-check" text="Pendapatan dan Beban Bunga bersih disajikan sesuai standar akuntansi." />
                <InfoItem icon="fa-check" text="Koreksi fiskal dilakukan langsung pada setiap akun pendapatan operasional." />
                <InfoItem icon="fa-check" text="Laporan posisi keuangan (Neraca) wajib diisi lengkap." />
              </ul>
            </section>

            <section className="space-y-4">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide ml-2">Langkah Pelaporan</h4>
              <div className="space-y-4">
                <StepCard num="1" title="Aktifkan L1-E" desc="Pilih sektor usaha 'Bank Konvensional' pada Induk Bagian B." />
                <StepCard num="2" title="Isi Laba Rugi" desc="Klik ikon pensil di L1-E untuk input Nilai Komersial dan Koreksi Fiskal." />
                <StepCard num="3" title="Lampiran 11-B" desc="Input data DER (Debt to Equity Ratio) dan perhitungan EBITDA." />
              </div>
            </section>
          </div>
        );

      case '7': // Manufaktur
        return (
          <div className="space-y-6">
            <header className="space-y-2">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Edukasi Coretax v.2025.09.17</span>
              <h3 className="text-xl font-black text-slate-800 uppercase leading-tight">PPh Badan - Sektor Manufaktur</h3>
            </header>

            <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 text-sm border-b pb-3 flex items-center uppercase tracking-wide">
                <i className="fa-solid fa-industry text-slate-600 mr-2"></i> Detail Sektor Pabrikan
              </h4>
              <ul className="space-y-4">
                <InfoItem icon="fa-check" text="Menggunakan Lampiran L1-B khusus manufaktur/pabrikan." />
                <InfoItem icon="fa-check" text="Wajib mengisi detail Harga Pokok Produksi (HPP) mencakup bahan baku." />
                <InfoItem icon="fa-check" text="Penyusutan aset tetap (Lampiran 9) menggunakan metode garis lurus." />
                <InfoItem icon="fa-check" text="Biaya promosi (Rp500jt) dilaporkan pada Lampiran 11-A Bagian I." />
              </ul>
            </section>

            <section className="space-y-4">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide ml-2">Panduan Pengisian</h4>
              <div className="space-y-4">
                <StepCard num="1" title="L1-B Laba Rugi" desc="Isi Persediaan Awal/Akhir Bahan Baku dan Barang Jadi." />
                <StepCard num="2" title="Koreksi Fiskal" desc="Input koreksi pada akun Beban Gaji, Transportasi, dan Amortisasi." />
                <StepCard num="3" title="Lampiran 9" desc="Lengkapi daftar penyusutan Harta Berwujud Kelompok 1 & 2." />
              </div>
            </section>
          </div>
        );

      case '8': // Sektor Jasa
        return (
          <div className="space-y-6">
            <header className="space-y-2">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Edukasi Coretax v.2025.09.17</span>
              <h3 className="text-xl font-black text-slate-800 uppercase leading-tight">PPh Badan - Sektor Jasa</h3>
            </header>

            <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 text-sm border-b pb-3 flex items-center uppercase tracking-wide">
                <i className="fa-solid fa-handshake-angle text-emerald-500 mr-2"></i> Ketentuan Sektor Jasa
              </h4>
              <ul className="space-y-4">
                <InfoItem icon="fa-check" text="Menggunakan Lampiran L1-D khusus sektor usaha Jasa." />
                <InfoItem icon="fa-check" text="Pendapatan Jasa Rupiah diinput pada kode akun 4021." />
                <InfoItem icon="fa-check" text="Fasilitas Pasal 31E diaktifkan pada Induk Bagian D jika omzet < 50 M." />
                <InfoItem icon="fa-check" text="Kredit pajak PPh 23 Jasa dilaporkan pada Lampiran 3 Bagian B." />
              </ul>
            </section>

            <section className="space-y-4">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide ml-2">Prosedur Coretax</h4>
              <div className="space-y-4">
                <StepCard num="1" title="Rekonsiliasi L1-D" desc="Input Nilai Komersial Pendapatan Jasa dan Biaya Pokok Jasa." />
                <StepCard num="2" title="Induk Bagian D" desc="Pilih tarif fasilitas Pasal 31E dan lengkapi Lampiran 8." />
                <StepCard num="3" title="Lampiran 3" desc="Input detail bukti potong dari lawan transaksi (NPWP, DPP, PPh)." />
              </div>
            </section>
          </div>
        );

      case '1': // PPh Badan Perdagangan
        return (
          <div className="space-y-6">
            <header className="space-y-2">
              <span className="bg-indigo-100 text-indigo-700 text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">Edukasi Coretax</span>
              <h3 className="text-xl font-black text-slate-800 uppercase leading-tight">SPT Tahunan PPh Badan - Sektor Perdagangan</h3>
            </header>

            <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm space-y-4">
              <h4 className="font-bold text-slate-800 text-sm border-b pb-3 flex items-center uppercase tracking-wide">
                <i className="fa-solid fa-star text-amber-400 mr-2"></i> Perubahan Utama
              </h4>
              <ul className="space-y-4">
                <InfoItem icon="fa-1" text="Pengisian SPT dilakukan mulai dari Induk SPT." />
                <InfoItem icon="fa-2" text="Lampiran L2 (Daftar Kepemilikan) dan L-11B muncul otomatis." />
                <InfoItem icon="fa-3" text="Terdapat 12 sektor usaha pada Lampiran L1 (Perdagangan = L1-C)." />
                <InfoItem icon="fa-4" text="Koreksi Fiskal dilakukan langsung di laporan laba rugi." />
              </ul>
            </section>

            <section className="space-y-4">
              <h4 className="font-bold text-slate-700 text-sm uppercase tracking-wide ml-2">Tahap Pengisian</h4>
              <div className="space-y-4">
                <StepCard num="1" title="Login Coretax" desc="Gunakan NIK/NPWP 16 digit dan passphrase yang valid." />
                <StepCard num="2" title="Pilih Modul SPT" desc="Masuk ke Modul SPT > Konsep SPT > Buat Konsep SPT." />
                <StepCard num="3" title="Laporan Keuangan" desc="Isi Lampiran 1 (Laba/Rugi & Neraca) sesuai rincian fiskal." />
              </div>
            </section>
          </div>
        );

      default:
        return (
          <div className="py-20 text-center space-y-4">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
              <i className="fa-solid fa-hourglass-half text-3xl"></i>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Materi Masih Diproses</h3>
              <p className="text-xs text-slate-400">Konten rincian sedang dalam tahap digitalisasi.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="animate-slideInRight bg-slate-50 min-h-screen">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center sticky top-[68px] z-40 shadow-sm">
        <button onClick={onBack} className="mr-4 p-2 hover:bg-slate-100 rounded-full transition-colors">
          <i className="fa-solid fa-arrow-left text-slate-600"></i>
        </button>
        <h2 className="text-sm font-bold text-slate-800 line-clamp-1 uppercase tracking-tight">Rincian Materi Edukasi</h2>
      </div>

      <div className="p-6 pb-28">
        {renderContent()}
      </div>
    </div>
  );
};

const InfoItem: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <li className="flex items-start space-x-3 group">
    <div className="w-6 h-6 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
      <i className={`fa-solid ${icon} text-[10px]`}></i>
    </div>
    <span className="text-xs text-slate-600 leading-relaxed font-medium">{text}</span>
  </li>
);

const StepCard: React.FC<{ num: string; title: string; desc: string }> = ({ num, title, desc }) => (
  <div className="bg-white p-5 rounded-[24px] border border-slate-100 flex space-x-4 shadow-sm hover:border-blue-200 transition-all">
    <div className="w-9 h-9 bg-slate-800 text-white rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-lg">
      {num}
    </div>
    <div>
      <h5 className="text-sm font-black text-slate-800 uppercase tracking-tight">{title}</h5>
      <p className="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">{desc}</p>
    </div>
  </div>
);

export default TutorialDetail;
