
import React, { useState, useEffect } from 'react';

interface FAQItem {
  title: string;
  url: string;
}

interface FAQSubMenu {
  title: string;
  items: FAQItem[];
}

interface FAQMenu {
  id: string;
  title: string;
  icon: string;
  subMenus: FAQSubMenu[];
}

const FAQ: React.FC = () => {
  const [activeMenuId, setActiveMenuId] = useState('m1');
  const [searchTerm, setSearchTerm] = useState('');
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);

  // Reset open submenu when changing main menu or searching
  useEffect(() => {
    setOpenSubMenuIndex(null);
  }, [activeMenuId, searchTerm]);

  const coretaxData: FAQMenu[] = [
    {
      id: 'm1',
      title: 'Registrasi',
      icon: 'fa-user-plus',
      subMenus: [
        {
          title: '1.1 Akses dan Aktivasi Coretax DJP',
          items: [
            { title: 'Pertama kali akses Coretax DJP', url: 'https://pajak.go.id/coretaxpedia/pertama-kali-akses-coretax-djp' },
            { title: 'Akses Coretax bagi bukan user DJP Online', url: 'https://pajak.go.id/coretaxpedia/akses-coretax-bagi-bukan-user-djp-online' },
            { title: 'Akses Coretax bagi user DJP Online', url: 'https://pajak.go.id/coretaxpedia/akses-coretax-bagi-user-djp-online' },
            { title: 'Apa itu aktivasi akun', url: 'https://pajak.go.id/coretaxpedia/apa-itu-aktivasi-akun' },
            { title: 'Akses bagi bukan WP', url: 'https://pajak.go.id/coretaxpedia/akses-bagi-bukan-wp' },
            { title: 'Akses Coretax DJP bagi subjek pajak luar negeri', url: 'https://pajak.go.id/coretaxpedia/akses-coretax-djp-bagi-subjek-pajak-luar-negeri' },
            { title: 'Atur ulang kata sandi', url: 'https://pajak.go.id/coretaxpedia/atur-ulang-kata-sandi' },
            { title: 'Akun WP badan digunakan bersama', url: 'https://pajak.go.id/coretaxpedia/akun-wp-badan-digunakan-bersama' },
            { title: 'Aktivasi akun dengan perubahan detail kontak', url: 'https://pajak.go.id/coretaxpedia/aktivasi-akun-dengan-perubahan-detail-kontak' },
            { title: 'Akses bagi istri NPWP gabung suami', url: 'https://pajak.go.id/coretaxpedia/akses-bagi-istri-npwp-gabung-suami' },
            { title: 'Bagaimana istri gabung NPWP suami', url: 'https://pajak.go.id/coretaxpedia/bagaimana-istri-gabung-npwp-suami' },
            { title: 'Mengamankan akses dengan verifikasi dua langkah', url: 'https://pajak.go.id/coretaxpedia/mengamankan-akses-dengan-verifikasi-dua-langkah' },
            { title: 'Karakter khusus', url: 'https://pajak.go.id/coretaxpedia/karakter-khusus' },
            { title: 'Risiko tidak aktivasi akun Coretax DJP', url: 'https://pajak.go.id/coretaxpedia/risiko-tidak-aktivasi-akun-coretax-djp' },
            { title: 'Status NPWP tidak aktivasi akun Coretax DJP', url: 'https://pajak.go.id/coretaxpedia/status-npwp-tidak-aktivasi-akun-coretax-djp' },
          ]
        },
        {
          title: '1.2 Pendaftaran Wajib Pajak',
          items: [
            { title: 'Pendaftaran WP orang pribadi', url: 'https://pajak.go.id/coretaxpedia/pendaftaran-wp-orang-pribadi' },
            { title: 'Dokumen yang perlu disiapkan', url: 'https://pajak.go.id/coretaxpedia/dokumen-yang-perlu-disiapkan' },
            { title: 'Pendaftaran di bawah yayasan', url: 'https://pajak.go.id/coretaxpedia/pendaftaran-di-bawah-yayasan' },
            { title: 'Menu "Hanya Registrasi"', url: 'https://pajak.go.id/coretaxpedia/menu-"hanya-registrasi"' },
          ]
        },
        {
          title: '1.3 Impersonate',
          items: [
            { title: 'Apa itu impersonate', url: 'https://pajak.go.id/coretaxpedia/apa-itu-impersonate' },
            { title: 'Bagaimana melakukan impersonate', url: 'https://pajak.go.id/coretaxpedia/bagaimana-melakukan-impersonate' },
            { title: 'Tidak ada menu impersonate', url: 'https://pajak.go.id/coretaxpedia/tidak-ada-menu-impersonate' },
            { title: 'Kendala impersonate', url: 'https://pajak.go.id/coretaxpedia/kendala-impersonate' },
          ]
        },
        {
          title: '1.4 Role & Pihak Terkait',
          items: [
            { title: 'Apa itu penanggung jawab/PIC', url: 'https://pajak.go.id/coretaxpedia/apa-itu-penanggung-jawab/pic' },
            { title: 'Hak akses PIC', url: 'https://pajak.go.id/coretaxpedia/hak-akses-pic' },
            { title: 'Siapa dapat menjadi PIC', url: 'https://pajak.go.id/coretaxpedia/siapa-dapat-menjadi-pic' },
            { title: 'PIC harus pejabat tertinggi', url: 'https://pajak.go.id/coretaxpedia/pic-harus-pejabat-tertinggi' },
            { title: 'Dua jenis role', url: 'https://pajak.go.id/coretaxpedia/dua-jenis-role' },
            { title: 'Siapa saja pihak terkait', url: 'https://pajak.go.id/coretaxpedia/siapa-saja-pihak-terkait' },
            { title: 'Tambah/hapus pihak terkait', url: 'https://pajak.go.id/coretaxpedia/tambah/hapus-pihak-terkait' },
            { title: 'Cek role akses yang diberikan', url: 'https://pajak.go.id/coretaxpedia/cek-role-akses-yang-diberikan' },
            { title: 'Beri/cabut role', url: 'https://pajak.go.id/coretaxpedia/beri/cabut-role' },
            { title: 'Ketentuan pendelegasian wewenang', url: 'https://pajak.go.id/coretaxpedia/ketentuan-pendelegasian-wewenang' },
            { title: 'Bagaimana menunjuk PIC', url: 'https://pajak.go.id/coretaxpedia/bagaimana-menunjuk-pic' },
            { title: 'Bagaimana mengganti PIC', url: 'https://pajak.go.id/coretaxpedia/bagaimana-mengganti-pic' },
            { title: 'Karyawan cuti panjang', url: 'https://pajak.go.id/coretaxpedia/karyawan-cuti-panjang' },
            { title: 'Akun wajib pajak badan', url: 'https://pajak.go.id/coretaxpedia/akun-wajib-pajak-badan' },
          ]
        },
        {
          title: '1.5 Kode Otorisasi dan Sertifikat Digital',
          items: [
            { title: 'Apa itu kode otorisasi', url: 'https://pajak.go.id/coretaxpedia/apa-itu-kode-otorisasi' },
            { title: 'Bagaimana mendapat kode otorisasi', url: 'https://pajak.go.id/coretaxpedia/bagaimana-mendapat-kode-otorisasi' },
            { title: 'Mengapa perlu kode otorisasi', url: 'https://pajak.go.id/coretaxpedia/mengapa-perlu-kode-otorisasi' },
            { title: 'Bagaimana mengetahui status kode otorisasi', url: 'https://pajak.go.id/coretaxpedia/bagaimana-mengetahui-status-kode-otorisasi' },
            { title: 'Lupa passphrase kode otorisasi', url: 'https://pajak.go.id/coretaxpedia/lupa-passphrase-kode-otorisasi' },
            { title: 'Kode otorisasi tidak muncul', url: 'https://pajak.go.id/coretaxpedia/kode-otorisasi-tidak-muncul' },
            { title: 'Siapa yang harus memiliki kode otorisasi', url: 'https://pajak.go.id/coretaxpedia/siapa-yang-harus-memiliki-kode-otorisasi' },
            { title: 'Masa berlaku kode otorisasi', url: 'https://pajak.go.id/coretaxpedia/masa-berlaku-kode-otorisasi' },
            { title: 'Kode otorisasi suami istri', url: 'https://pajak.go.id/coretaxpedia/kode-otorisasi-suami-istri' },
          ]
        },
        {
          title: '1.6 Perubahan Status dan Perubahan Data',
          items: [
            { title: 'Siapa berhak mengubah data', url: 'https://pajak.go.id/coretaxpedia/siapa-berhak-mengubah-data' },
            { title: 'Ubah status menjadi aktif', url: 'https://pajak.go.id/coretaxpedia/ubah-status-menjadi-aktif' },
            { title: 'Bagaimana mengubah data', url: 'https://pajak.go.id/coretaxpedia/bagaimana-mengubah-data' },
            { title: 'Ubah data masih tidak sesuai', url: 'https://pajak.go.id/coretaxpedia/ubah-data-masid-tidak-sesuai' },
            { title: 'Kewajiban pajak anggota keluarga', url: 'https://pajak.go.id/coretaxpedia/kewajiban-pajak-anggota-keluarga' },
            { title: 'Perubahan data di DJP Online', url: 'https://pajak.go.id/coretaxpedia/perubahan-data-di-djp-online' },
            { title: 'Pengajuan status nonaktif', url: 'https://pajak.go.id/coretaxpedia/pengajuan-status-nonaktif' },
            { title: 'Otomatis status nonaktif', url: 'https://pajak.go.id/coretaxpedia/otomatis-status-nonaktif' },
            { title: 'Data rekening bank', url: 'https://pajak.go.id/coretaxpedia/data-rekening-bank' },
            { title: 'Data Unit Keluarga', url: 'https://pajak.go.id/coretaxpedia/data-unit-keluarga' },
            { title: 'Belum pemadanan NPWP', url: 'https://pajak.go.id/coretaxpedia/belum-pemadanan-npwp' },
            { title: 'Status Belum Aktif (SPDN)', url: 'https://pajak.go.id/coretaxpedia/status-belum-aktif-(spdn)' },
          ]
        }
      ]
    },
    {
      id: 'm2',
      title: 'Pelaporan SPT',
      icon: 'fa-file-invoice',
      subMenus: [
        {
          title: '2.1 Bukti Potong',
          items: [
            { title: 'Apa itu bukti potong', url: 'https://pajak.go.id/coretaxpedia/apa-itu-bukti-potong' },
            { title: 'Manfaat Coretax bagi pemberi penghasilan', url: 'https://pajak.go.id/coretaxpedia/manfaat-coretax-bagi-pemberi-penghasilan' },
            { title: 'Manfaat Coretax bagi penerima penghasilan', url: 'https://pajak.go.id/coretaxpedia/manfaat-coretax-bagi-penerima-penghasilan' },
            { title: 'Jenis-jenis bukti potong', url: 'https://pajak.go.id/coretaxpedia/jenis-jenis-bukti-potong' },
            { title: 'Bagaimana bukti potong dikirimkan', url: 'https://pajak.go.id/coretaxpedia/bagaimana-bukti-potong-dikirimkan' },
            { title: 'Bagaimana membuat bukti potong', url: 'https://pajak.go.id/coretaxpedia/bagaimana-membuat-bukti-potong' },
            { title: 'Dampak penggunaan NPWP sementara', url: 'https://pajak.go.id/coretaxpedia/dampak-penggunaan-npwp-sementara' },
            { title: 'Skema pembuatan bupot', url: 'https://pajak.go.id/coretaxpedia/skema-pembuatan-bupot' },
            { title: 'Informasi penerima penghasilan pada bupot', url: 'https://pajak.go.id/coretaxpedia/informasi-penerima-penghasilan-pada-bupot' },
            { title: 'Penerima penghasilan belum terdaftar', url: 'https://pajak.go.id/coretaxpedia/penerima-penghasilan-belum-terdaftar' },
            { title: 'Upload XML bupot', url: 'https://pajak.go.id/coretaxpedia/upload-xml-bupot' },
            { title: 'Cara penerbitan bupot TKU', url: 'https://pajak.go.id/coretaxpedia/cara-penerbitan-bupot-tku' },
            { title: 'Akses bupot untuk WP dengan banyak TKU', url: 'https://pajak.go.id/coretaxpedia/akses-bupot-untuk-wp-dengan-banyak-tku' },
            { title: 'NITKU cabang tidak muncul', url: 'https://pajak.go.id/coretaxpedia/nitku-cabang-tidak-muncul' },
            { title: 'Bupot istri NPWP gabung suami', url: 'https://pajak.go.id/coretaxpedia/bupot-istri-npwp-gabung-suami' },
            { title: 'Bupot pegawai yang pindah tempat kerja', url: 'https://pajak.go.id/coretaxpedia/bupot-pegawai-yang-pindah-tempat-kerja' },
            { title: 'Pembetulan bupot', url: 'https://pajak.go.id/coretaxpedia/pembetulan-bupot' },
            { title: 'Pencantuman NITKU pada bukti potong', url: 'https://pajak.go.id/coretaxpedia/pencantuman-nitku-pada-bukti-potong' },
            { title: 'Kerahasiaan bupot PPh 21', url: 'https://pajak.go.id/coretaxpedia/kerahasiaan-bupot-pph-21' },
            { title: 'Bupot PPh 21 Desember', url: 'https://pajak.go.id/coretaxpedia/bupot-pph-21-desember' },
            { title: 'Bupot monthly payroll', url: 'https://pajak.go.id/coretaxpedia/bupot-monthly-payroll' },
            { title: 'Input fasilitas pada ebupot', url: 'https://pajak.go.id/coretaxpedia/input-fasilitas-pada-ebupot' },
            { title: 'Unduh Bukti Potong', url: 'https://pajak.go.id/coretaxpedia/unduh-bukti-potong' },
            { title: 'A1 untuk bupot dengan NPWP sementara', url: 'https://pajak.go.id/coretaxpedia/a1-untuk-bupot-dengan-npwp-sementara' },
          ]
        },
        {
          title: '2.2 Faktur Pajak',
          items: [
            { title: 'Skema umum pembuatan efaktur', url: 'https://pajak.go.id/coretaxpedia/skema-umum-pembuatan-efaktur' },
            { title: 'Cara membuat faktur', url: 'https://pajak.go.id/coretaxpedia/cara-membuat-faktur' },
            { title: 'Step by step XML', url: 'https://pajak.go.id/coretaxpedia/step-by-step-xml' },
            { title: 'Kredit pajak masukan', url: 'https://pajak.go.id/coretaxpedia/kredit-pajak-masukan' },
            { title: 'Faktur tanggal mundur', url: 'https://pajak.go.id/coretaxpedia/faktur-tanggal-mundur' },
            { title: 'Uang muka legacy, pelunasan Coretax', url: 'https://pajak.go.id/coretaxpedia/uang-muka-legacy,-pelunasan-coretax' },
            { title: 'Faktur pajak uang muka dan pelunasan', url: 'https://pajak.go.id/coretaxpedia/faktur-pajak-uang-muka-dan-pelunasan' },
            { title: 'Pencantuman NITKU pada faktur pajak', url: 'https://pajak.go.id/coretaxpedia/pencantuman-nitku-pada-faktur-pajak' },
            { title: 'Approval faktur pajak', url: 'https://pajak.go.id/coretaxpedia/approval-faktur-pajak' },
            { title: 'Daftar faktur dan SPT tidak sinkron', url: 'https://pajak.go.id/coretaxpedia/daftar-faktur-dan-spt-tidak-sinkron' },
            { title: 'XML transaksi digunggung', url: 'https://pajak.go.id/coretaxpedia/xml-transaksi-digunggung' },
            { title: 'Daftar faktur tidak muncul', url: 'https://pajak.go.id/coretaxpedia/daftar-faktur-tidak-muncul' },
            { title: 'Identitas pembeli faktur pajak digunggung', url: 'https://pajak.go.id/coretaxpedia/identitas-pembeli-faktur-pajak-digunggung' },
            { title: 'Nomor seri faktur pajak', url: 'https://pajak.go.id/coretaxpedia/nomor-seri-faktur-pajak' },
            { title: 'Pencantuman identitas pembeli', url: 'https://pajak.go.id/coretaxpedia/pencantuman-identitas-pembeli' },
            { title: 'Faktur pajak 07', url: 'https://pajak.go.id/coretaxpedia/faktur-pajak-07' },
            { title: 'Input tiga digit desimal', url: 'https://pajak.go.id/coretaxpedia/input-tiga-digit-desimal' },
            { title: 'Migrasi data faktur', url: 'https://pajak.go.id/coretaxpedia/migrasi-data-faktur' },
            { title: 'Unduh massal faktur pajak', url: 'https://pajak.go.id/coretaxpedia/unduh-massal-faktur-pajak' },
            { title: 'Retur barang', url: 'https://pajak.go.id/coretaxpedia/retur-barang' },
            { title: 'Status waiting for amendment/cancellation', url: 'https://pajak.go.id/coretaxpedia/status-waiting-for-amendment/cancellation' },
          ]
        },
        {
          title: '2.3 SPT',
          items: [
            { title: 'Cara buat SPT masa PPN', url: 'https://pajak.go.id/coretaxpedia/cara-buat-spt-masa-ppn' },
            { title: 'Cara buat SPT masa PPh 21/26', url: 'https://pajak.go.id/coretaxpedia/cara-buat-spt-masa-pph-21/26' },
            { title: 'Akses riwayat SPT', url: 'https://pajak.go.id/coretaxpedia/akses-riwayat-spt' },
            { title: 'Opsi SPT PPN normal tidak muncul', url: 'https://pajak.go.id/coretaxpedia/opsi-spt-ppn-normal-tidak-muncul' },
            { title: 'Pengaruh konsep delta', url: 'https://pajak.go.id/coretaxpedia/pengaruh-konsep-delta' },
            { title: 'Koreksi LB menjadi nihil atau KB', url: 'https://pajak.go.id/coretaxpedia/koreksi-lb-menjadi-nihil-atau-kb' },
            { title: 'Nilai kompensasi tidak terisi', url: 'https://pajak.go.id/coretaxpedia/nilai-kompensasi-tidak-terisi' },
            { title: 'Tanggal pelaporan SPT', url: 'https://pajak.go.id/coretaxpedia/tanggal-pelaporan-spt' },
            { title: 'Jatuh tempo jatuh pada hari libur', url: 'https://pajak.go.id/coretaxpedia/jatuh-tempo-jatuh-pada-hari-libur' },
            { title: 'Lapor PPN nihil', url: 'https://pajak.go.id/coretaxpedia/lapor-ppn-nihil' },
            { title: 'Dokumen lain PIB PEB', url: 'https://pajak.go.id/coretaxpedia/dokumen-lain-pib-peb' },
            { title: 'Lapor SPT terkendala', url: 'https://pajak.go.id/coretaxpedia/lapor-spt-terkendala' },
            { title: 'Simulator SPT Tahunan PPh Badan', url: 'https://pajak.go.id/coretaxpedia/simulator-spt-tahunan-pph-badan' },
            { title: 'Lapor SPT tahunan orang pribadi', url: 'https://pajak.go.id/coretaxpedia/lapor-spt-tahunan-orang-pribadi' },
            { title: 'Lapor SPT tahunan badan', url: 'https://pajak.go.id/coretaxpedia/lapor-spt-tahunan-badan' },
            { title: 'Edit SPT menunggu pembayaran', url: 'https://pajak.go.id/coretaxpedia/edit-spt-menunggu-pembayaran' },
          ]
        }
      ]
    },
    {
      id: 'm3',
      title: 'Pembayaran',
      icon: 'fa-money-check-dollar',
      subMenus: [
        {
          title: '3.1 Kode Billing',
          items: [
            { title: 'Tiga metode pembuatan kode billling', url: 'https://pajak.go.id/coretaxpedia/tiga-metode-pembuatan-kode-billling' },
            { title: 'Buat kode billing mandiri', url: 'https://pajak.go.id/coretaxpedia/buat-kode-billing-mandiri' },
            { title: 'Buat kode billing tagihan pajak', url: 'https://pajak.go.id/coretaxpedia/buat-kode-billing-tagihan-pajak' },
            { title: 'Cek daftar kode billing', url: 'https://pajak.go.id/coretaxpedia/cek-daftar-kode-billing' },
            { title: 'Membatalkan kode billing', url: 'https://pajak.go.id/coretaxpedia/membatalkan-kode-billing' },
            { title: 'Kode billing di DJP Online', url: 'https://pajak.go.id/coretaxpedia/kode-billing-di-djp-online' },
            { title: 'Bayar kode billing', url: 'https://pajak.go.id/coretaxpedia/bayar-kode-billing' },
            { title: 'Kode billing PHTB', url: 'https://pajak.go.id/coretaxpedia/kode-billing-phtb' },
            { title: 'Unduh ulang kode billing deposit', url: 'https://pajak.go.id/coretaxpedia/unduh-ulang-kode-billing-deposit' },
            { title: 'Masa aktif kode billing', url: 'https://pajak.go.id/coretaxpedia/masa-aktif-kode-billing' },
            { title: 'Satu SPT dua kode billing', url: 'https://pajak.go.id/coretaxpedia/satu-spt-dua-kode-billing' },
            { title: 'Kode billing deposit', url: 'https://pajak.go.id/coretaxpedia/kode-billing-deposit' },
          ]
        },
        {
          title: '3.2 Pemindahbukuan dan Restitusi',
          items: [
            { title: 'Cara pengajuan Pbk', url: 'https://pajak.go.id/coretaxpedia/cara-pengajuan-pbk' },
            { title: 'Siapa dapat mengajukan Pbk', url: 'https://pajak.go.id/coretaxpedia/siapa-dapat-mengajukan-pbk' },
            { title: 'Pengembalian kelebihan pembayaran pajak', url: 'https://pajak.go.id/coretaxpedia/pengembalian-kelebihan-pembayaran-pajak' },
            { title: 'Konfirmasi SPKKP', url: 'https://pajak.go.id/coretaxpedia/konfirmasi-spkkp' },
          ]
        },
        {
          title: '3.3 Deposit dan Buku Besar',
          items: [
            { title: 'Apa itu deposit', url: 'https://pajak.go.id/coretaxpedia/apa-itu-deposit' },
            { title: 'Bayar tagihan dan SPT dengan deposit', url: 'https://pajak.go.id/coretaxpedia/bayar-tagihan-dan-spt-dengan-deposit' },
            { title: 'Bayar menggunakan lebih dari satu deposit', url: 'https://pajak.go.id/coretaxpedia/bayar-menggunakan-lebih-dari-satu-deposit' },
            { title: 'Gabung deposit dan kode billing', url: 'https://pajak.go.id/coretaxpedia/gabung-deposit-dan-kode-billing' },
            { title: 'Metode FIFO pada deposit', url: 'https://pajak.go.id/coretaxpedia/metode-fifo-pada-deposit' },
            { title: 'Deposit untuk tagihan sebelum 2025', url: 'https://pajak.go.id/coretaxpedia/deposit-untuk-tagihan-sebelum-2025' },
            { title: 'Keterangan untuk deposit', url: 'https://pajak.go.id/coretaxpedia/keterangan-untuk-deposit' },
            { title: 'Pemanfaatan deposit secara manual', url: 'https://pajak.go.id/coretaxpedia/pemanfaatan-deposit-secara-manual' },
            { title: 'Cek sisa deposit', url: 'https://pajak.go.id/coretaxpedia/cek-sisa-deposit' },
            { title: 'Data buku besar', url: 'https://pajak.go.id/coretaxpedia/data-buku-besar' },
            { title: 'Filter tanggal data buku besar', url: 'https://pajak.go.id/coretaxpedia/filter-tanggal-data-buku-besar' },
            { title: 'Cara baca buku besar', url: 'https://pajak.go.id/coretaxpedia/cara-baca-buku-besar' },
            { title: 'Auto alokasi deposit', url: 'https://pajak.go.id/coretaxpedia/auto-alokasi-deposit' },
          ]
        }
      ]
    },
    {
      id: 'm4',
      title: 'Layanan',
      icon: 'fa-hand-holding-hand',
      subMenus: [
        {
          title: '4.1 Jenis dan Akses Layanan',
          items: [
            { title: 'Menu layanan', url: 'https://pajak.go.id/coretaxpedia/menu-layanan' },
            { title: 'Cara mengakses layanan administrasi', url: 'https://pajak.go.id/coretaxpedia/cara-mengakses-layanan-administrasi' },
            { title: 'Akses layanan permintaan informasi', url: 'https://pajak.go.id/coretaxpedia/akses-layanan-permintaan-informasi' },
            { title: 'Pengajuan layanan pengaduan', url: 'https://pajak.go.id/coretaxpedia/pengajuan-layanan-pengaduan' },
            { title: 'Akses layanan edukasi', url: 'https://pajak.go.id/coretaxpedia/akses-layanan-edukasi' },
            { title: 'Pemberitahuan penggunaan NPPN', url: 'https://pajak.go.id/coretaxpedia/pemberitahuan-penggunaan-nppn' },
          ]
        }
      ]
    },
    {
      id: 'm5',
      title: 'Lain-lain',
      icon: 'fa-ellipsis',
      subMenus: [
        {
          title: '5.1 Umum',
          items: [
            { title: 'Apa itu Coretax DJP', url: 'https://pajak.go.id/coretaxpedia/apa-itu-coretax-djp' },
            { title: 'Dasar hukum Coretax DJP', url: 'https://pajak.go.id/coretaxpedia/dasar-hukum-coretax-djp' },
            { title: 'Persiapan menggunakan Coretax DJP', url: 'https://pajak.go.id/coretaxpedia/persiapan-menggunakan-coretax-djp' },
            { title: 'Kewajiban perpajakan suami istri', url: 'https://pajak.go.id/coretaxpedia/kewajiban-perpajakan-suami-istri' },
            { title: 'Status DJP Online', url: 'https://pajak.go.id/coretaxpedia/status-djp-online' },
            { title: 'Perpanjangan sertel versi lama', url: 'https://pajak.go.id/coretaxpedia/perpanjangan-sertel-versi-lama' },
            { title: 'Batas waktu lapor/bayar', url: 'https://pajak.go.id/coretaxpedia/batas-waktu-lapor/bayar' },
            { title: 'Apa arti NPWP gabung suami', url: 'https://pajak.go.id/coretaxpedia/apa-arti-npwp-gabung-suami' },
            { title: 'Pelaporan SPT suami istri gabung NPWP', url: 'https://pajak.go.id/coretaxpedia/pelaporan-spt-suami-istri-gabung-npwp' },
            { title: 'Apakah istri wajib nonaktif', url: 'https://pajak.go.id/coretaxpedia/apakah-istri-wajib-nonaktif' },
            { title: 'Pelaporan SPT suami istri pisah NPWP', url: 'https://pajak.go.id/coretaxpedia/pelaporan-spt-suami-istri-pisah-npwp' },
            { title: 'Apakah NPWP istri otomatis nonaktif', url: 'https://pajak.go.id/coretaxpedia/apakah-npwp-istri-otomatis-nonaktif' },
            { title: 'Apakah NPWP suami istri gabung/pisah menambah pajak', url: 'https://pajak.go.id/coretaxpedia/apakah-npwp-suami-istri-gabung/pisah-menambah-pajak' },
            { title: 'Apakah suami istri ASN/Pegawai wajib gabung NPWP', url: 'https://pajak.go.id/coretaxpedia/apakah-suami-istri-asn/pegawai-wajib-gabung-npwp' },
            { title: 'Istri punya usaha sendiri', url: 'https://pajak.go.id/coretaxpedia/istri-punya-usaha-sendiri' },
            { title: 'Istri sebagai direktur', url: 'https://pajak.go.id/coretaxpedia/istri-sebagai-direktur' },
          ]
        },
        {
          title: '5.2 Kasus Tertentu',
          items: [
            { title: 'Apa itu TKU', url: 'https://pajak.go.id/coretaxpedia/apa-itu-tku' },
            { title: 'Pembuatan kode billing PPN luar daerah pabean', url: 'https://pajak.go.id/coretaxpedia/pembuatan-kode-billing-ppn-luar-daerah-pabean' },
            { title: 'Validasi PHTB', url: 'https://pajak.go.id/coretaxpedia/validasi-phtb' },
            { title: 'Suket PHTB tidak ditemukan di BPN', url: 'https://pajak.go.id/coretaxpedia/suket-phtb-tidak-ditemukan-di-bpn' },
            { title: 'Ganti/batal suket PHTB', url: 'https://pajak.go.id/coretaxpedia/ganti/batal-suket-phtb' },
            { title: 'Bendahara pusat', url: 'https://pajak.go.id/coretaxpedia/bendahara-pusat' },
            { title: 'Pembelian tanah/bangunan oleh instansi pemerintah', url: 'https://pajak.go.id/coretaxpedia/pembelian-tanah/bangunan-oleh-instansi-pemerintah' },
            { title: 'SSP PPh pasal 22', url: 'https://pajak.go.id/coretaxpedia/ssp-pph-pasal-22' },
            { title: 'Pembatalan SKET PHTB', url: 'https://pajak.go.id/coretaxpedia/pembatalan-sket-phtb' },
            { title: 'Permohonan penghapusan sanksi administrasi', url: 'https://pajak.go.id/coretaxpedia/permohonan-penghapusan-sanksi-administrasi' },
          ]
        },
        {
          title: '5.3 Solusi Error',
          items: [
            { title: 'PPh final sewa tanah dan bangunan', url: 'https://pajak.go.id/coretaxpedia/pph-final-sewa-tanah-dan-bangunan' },
            { title: 'Kendala aktivasi – gagal validasi nomor HP', url: 'https://pajak.go.id/coretaxpedia/kendala-aktivasi-–-gagal-validasi-nomor-hp' },
            { title: 'Kendala aktivasi – gagal ambil foto', url: 'https://pajak.go.id/coretaxpedia/kendala-aktivasi-–-gagal-ambil-foto' },
            { title: 'NIK sudah terdaftar', url: 'https://pajak.go.id/coretaxpedia/nik-sudah-terdaftar' },
            { title: 'Kendala aktivasi – Belum aktif SPDN', url: 'https://pajak.go.id/coretaxpedia/kendala-aktivasi-–-belum-aktif-spdn' },
            { title: 'Kendala aktivasi – ukuran file foto', url: 'https://pajak.go.id/coretaxpedia/kendala-aktivasi-–-ukuran-file-foto' },
            { title: 'Kode satker tidak ditemukan', url: 'https://pajak.go.id/coretaxpedia/kode-satker-tidak-ditemukan' },
            { title: 'Kendala atur ulang kata sandi', url: 'https://pajak.go.id/coretaxpedia/kendala-atur-ulang-kata-sandi' },
            { title: 'Kendala pengukuhan PKP', url: 'https://pajak.go.id/coretaxpedia/kendala-pengukuhan-pkp' },
            { title: 'Error permissions 96, 99, 225', url: 'https://pajak.go.id/coretaxpedia/error-permissions-96,-99,-225' },
            { title: 'Gagal unggah data EOI', url: 'https://pajak.go.id/coretaxpedia/gagal-unggah-data-eoi' },
            { title: 'Kendala impor bupot', url: 'https://pajak.go.id/coretaxpedia/kendala-impor-bupot' },
            { title: 'Gagal simpan permohonan NPPN', url: 'https://pajak.go.id/coretaxpedia/gagal-simpan-permohonan-nppn' },
            { title: 'SPPB not found', url: 'https://pajak.go.id/coretaxpedia/sppb-not-found' },
            { title: 'Incorrect signer passphrase', url: 'https://pajak.go.id/coretaxpedia/incorrect-signer-passphrase' },
            { title: 'Deposit berkurang, SPT tetap di konsep', url: 'https://pajak.go.id/coretaxpedia/deposit-berkurang,-spt-tetap-di-konsep' },
            { title: 'Kendala total PPN telah berubah', url: 'https://pajak.go.id/coretaxpedia/kendala-total-ppn-telah-berubah' },
            { title: 'Bupot 21 NITKU suami tidak muncul', url: 'https://pajak.go.id/coretaxpedia/bupot-21-nitku-suami-tidak-muncul' },
            { title: 'Faktur pajak masukan tidak ditemukan', url: 'https://pajak.go.id/coretaxpedia/faktur-pajak-masukan-tidak-ditemukan' },
            { title: 'Apa itu tiket Melati', url: 'https://pajak.go.id/coretaxpedia/apa-itu-tiket-melati' },
          ]
        }
      ]
    },
    {
      id: 'm6',
      title: 'Digital',
      icon: 'fa-folder-open',
      subMenus: [
        {
          title: '6.1 Buku',
          items: [
            { title: 'Buku panduan Coretax DJP', url: 'https://pajak.go.id/coretaxpedia/buku-panduan-coretax-djp' },
          ]
        },
        {
          title: '6.2 Templat',
          items: [
            { title: 'Templat impor data ke Coretax DJP', url: 'https://pajak.go.id/coretaxpedia/templat-impor-data-ke-coretax-djp' },
          ]
        }
      ]
    }
  ];

  const activeMenu = coretaxData.find(m => m.id === activeMenuId) || coretaxData[0];

  const filteredSubMenus = activeMenu.subMenus.map(sm => ({
    ...sm,
    items: sm.items.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(sm => sm.items.length > 0);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20 animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-[#002B5B] text-white p-8 pt-10 rounded-b-[40px] shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black tracking-tight">
            CORETAX<span className="text-amber-400">PEDIA</span>
          </h2>
          <p className="text-xs text-blue-200 mt-1 opacity-80 font-medium">Panduan Lengkap Sistem Administrasi Baru</p>
        </div>
        <i className="fa-solid fa-book-bookmark absolute -right-6 -bottom-6 text-white/5 text-9xl rotate-12"></i>
      </div>

      {/* Search Container */}
      <div className="px-6 -mt-6 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl p-2 flex items-center border border-slate-100">
          <div className="pl-4 text-slate-400">
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <input 
            type="text" 
            placeholder="Cari panduan coretax..."
            className="w-full px-4 py-3 text-sm outline-none bg-transparent font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Menu Selection (Horizontal Tabs) */}
      <div className="mt-8 px-6">
        <div className="flex space-x-3 overflow-x-auto pb-4 no-scrollbar">
          {coretaxData.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveMenuId(menu.id)}
              className={`flex flex-col items-center justify-center min-w-[90px] p-4 rounded-3xl transition-all duration-300 border-2 ${
                activeMenuId === menu.id 
                ? 'bg-[#002B5B] border-[#002B5B] text-white shadow-lg' 
                : 'bg-white border-slate-50 text-slate-400 hover:border-blue-100'
              }`}
            >
              <i className={`fa-solid ${menu.icon} text-xl mb-2`}></i>
              <span className="text-[10px] font-black uppercase tracking-wider">{menu.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area - SubMenus as Accordions */}
      <div className="px-6 mt-6 space-y-4">
        {filteredSubMenus.length > 0 ? (
          filteredSubMenus.map((sm, smIdx) => (
            <div key={smIdx} className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
              <button 
                onClick={() => toggleSubMenu(smIdx)}
                className="w-full p-6 text-left flex items-center justify-between group active:bg-slate-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-1.5 h-6 rounded-full transition-colors ${openSubMenuIndex === smIdx ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                  <h3 className={`text-sm font-black transition-colors uppercase tracking-wide ${openSubMenuIndex === smIdx ? 'text-blue-600' : 'text-slate-800'}`}>
                    {sm.title}
                  </h3>
                </div>
                <i className={`fa-solid fa-chevron-down text-xs transition-transform duration-300 ${openSubMenuIndex === smIdx ? 'rotate-180 text-blue-600' : 'text-slate-300'}`}></i>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openSubMenuIndex === smIdx ? 'max-h-[2000px] opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-6 space-y-3">
                  {sm.items.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => window.open(item.url, '_blank')}
                      className="w-full bg-slate-50/50 p-5 rounded-[24px] border border-slate-50 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all hover:border-blue-100"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-white text-blue-600 rounded-xl flex items-center justify-center font-bold text-[10px] shrink-0 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors">
                          {i + 1}
                        </div>
                        <p className="text-sm font-bold text-slate-700 leading-snug pt-1 text-left">
                          {item.title}
                        </p>
                      </div>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-300 group-hover:text-blue-600 transition-colors ml-4"></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 opacity-40">
            <i className="fa-solid fa-file-circle-question text-6xl mb-4"></i>
            <p className="font-bold">Topik tidak ditemukan</p>
          </div>
        )}
      </div>

      {/* Footer Support */}
      <div className="mt-12 px-6">
        <div className="p-8 bg-slate-900 rounded-[40px] text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h4 className="text-lg font-black mb-2">Butuh Bantuan Lebih?</h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-6 opacity-80">
              Tim Helpdesk KPP Pratama Jayapura siap memandu Anda langkah demi langkah dalam menggunakan sistem Coretax.
            </p>
            <button 
              onClick={() => window.open("https://wa.me/628114216899", "_blank")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-green-900/40 flex items-center justify-center space-x-3 transition-all active:scale-95"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>HUBUNGI HELPDESK</span>
            </button>
          </div>
          <i className="fa-solid fa-headset absolute -right-4 -bottom-4 text-white/5 text-[120px] -rotate-12"></i>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default FAQ;
