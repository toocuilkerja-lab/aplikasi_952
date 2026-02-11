
import React from 'react';

const Profile: React.FC = () => {
  const socialLinks = [
    { handle: '@pajakjayapura', url: 'https://www.instagram.com/pajakjayapura/' },
    { handle: '@ditjenpajakri', url: 'https://www.instagram.com/ditjenpajakri/' },
    { handle: '@kringpajak1500200', url: 'https://www.instagram.com/kringpajak1500200/' }
  ];

  const offices = [
    {
      name: 'KPP Pratama Jayapura',
      address: 'Jl. Otonom No.3, Wahno, Kec. Abepura, Kota Jayapura, Papua 99224',
      mapUrl: 'https://maps.google.com/?q=KPP+Pratama+Jayapura'
    },
    {
      name: 'KP2KP Sarmi',
      address: 'Sarmi, Kec. Sarmi, Kabupaten Sarmi, Papua 99373',
      mapUrl: 'https://maps.google.com/?q=KP2KP+Sarmi'
    },
    {
      name: 'KP2KP Wamena',
      address: 'Jl. Yos Sudarso No.60, Hurekama, Distrik Wamena, Kabupaten Jayawijaya, Papua Pegunungan 99511',
      mapUrl: 'https://maps.google.com/?q=KP2KP+Wamena'
    }
  ];

  return (
    <div className="p-6 animate-fadeIn space-y-8">
      {/* Office Header Section */}
      <div className="flex flex-col items-center">
        <div 
          className="w-28 h-28 bg-[#002B5B] rounded-3xl shadow-xl flex items-center justify-center mb-6 border-4 border-white transform transition-transform duration-300"
        >
          <i className="fa-solid fa-landmark text-white text-5xl"></i>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 text-center uppercase tracking-tight">
          KPP Pratama Jayapura
        </h2>
        <div className="h-1 w-12 bg-blue-600 rounded-full mt-2"></div>
      </div>

      {/* Info Sections */}
      <div className="space-y-6">
        
        {/* Addresses Section (Vertical List) */}
        <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <i className="fa-solid fa-location-dot"></i>
            </div>
            <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider">Lokasi Kantor</h3>
          </div>

          <div className="space-y-6">
            {offices.map((office, index) => (
              <div key={index} className={`space-y-2 ${index !== offices.length - 1 ? 'pb-6 border-b border-slate-50' : ''}`}>
                <h4 className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{office.name}</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {office.address}
                </p>
                <button 
                  onClick={() => window.open(office.mapUrl, '_blank')}
                  className="inline-flex items-center space-x-2 bg-slate-50 px-4 py-2 rounded-xl text-[11px] text-blue-700 font-black hover:bg-blue-50 transition-all active:scale-95"
                >
                  <i className="fa-solid fa-map-location-dot"></i>
                  <span>PETUNJUK ARAH</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Service Hours Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-start space-x-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <i className="fa-solid fa-clock"></i>
          </div>
          <div className="flex-1">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Jam Pelayanan</h4>
            <p className="text-sm text-slate-700 font-bold">
              08.00 S.D. 15.00 WIT
            </p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Senin s.d. Jumat (Kecuali Hari Libur)
            </p>
          </div>
        </div>

        {/* Social Media Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center shrink-0">
              <i className="fa-brands fa-instagram text-xl"></i>
            </div>
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Media Sosial Resmi</h4>
          </div>
          
          <div className="grid grid-cols-1 gap-2">
            {socialLinks.map((link, idx) => (
              <button
                key={idx}
                onClick={() => window.open(link.url, '_blank')}
                className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-50 bg-slate-50/50 hover:bg-pink-50 hover:border-pink-100 transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <i className="fa-brands fa-instagram text-pink-500 text-sm opacity-60 group-hover:opacity-100"></i>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-pink-700">{link.handle}</span>
                </div>
                <i className="fa-solid fa-chevron-right text-[10px] text-slate-300 group-hover:translate-x-1 group-hover:text-pink-400 transition-all"></i>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
