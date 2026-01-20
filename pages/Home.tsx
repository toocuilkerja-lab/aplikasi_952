
import React, { useEffect, useState } from 'react';
import { SERVICES } from '../constants';
import { ServiceCategory, QueueInfo } from '../types';
import { fetchQueueData, INITIAL_DATA } from '../services/queueService';

const QueueCard: React.FC<{ queue: QueueInfo }> = ({ queue }) => {
  const lastNum = parseInt(queue.last.toString().replace(/[^0-9]/g, '')) || 0;
  const currentNum = parseInt(queue.current.toString().replace(/[^0-9]/g, '')) || 0;
  const remaining = Math.max(0, lastNum - currentNum);

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col items-center text-center transition-all hover:shadow-md">
      <div className={`${queue.color} w-full py-1.5 rounded-t-xl -mt-4 mb-3 text-[10px] font-bold text-white uppercase tracking-widest`}>
        {queue.label}
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[70px] w-full mb-3 mt-1">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-none mb-1">Sedang Dilayani</span>
        <span className="text-4xl font-black text-slate-800 tracking-tighter leading-none">{queue.current}</span>
      </div>
      
      <div className="w-full h-px bg-slate-50 mb-3"></div>
      
      <div className="flex justify-between w-full px-2 mb-2">
        <div className="text-left">
          <p className="text-[9px] text-slate-400 uppercase font-bold">Terakhir</p>
          <p className="text-sm font-bold text-slate-600 leading-none">{queue.last}</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-slate-400 uppercase font-bold">Sisa</p>
          <p className="text-sm font-bold text-blue-600 leading-none">{remaining}</p>
        </div>
      </div>

      {queue.location && queue.location !== '-' && (
        <div className="w-full pt-2 border-t border-slate-50">
          <p className="text-[9px] text-slate-400 font-medium italic">
            Lokasi : <span className="font-bold text-slate-600 not-italic">{queue.location}</span>
          </p>
        </div>
      )}
    </div>
  );
};

const Home: React.FC<{ onSelectService: (category: ServiceCategory) => void }> = ({ onSelectService }) => {
  const [queues, setQueues] = useState<QueueInfo[]>(INITIAL_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  const loadData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const data = await fetchQueueData();
      setQueues(data);
      setError(false);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(() => loadData(false), 30000);
    
    const handleStatus = () => setIsOnline(window.navigator.onLine);
    window.addEventListener('online', handleStatus);
    window.addEventListener('offline', handleStatus);

    return () => {
      clearInterval(interval);
      window.removeEventListener('online', handleStatus);
      window.removeEventListener('offline', handleStatus);
    };
  }, []);

  return (
    <div className="p-6 space-y-8 animate-fadeIn">
      <div className="bg-gradient-to-br from-[#003B7B] to-[#002B5B] rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Selamat Datang!</h2>
          <p className="text-blue-100 text-sm opacity-90 leading-relaxed pr-2">
            Akses layanan perpajakan KPP Pratama Jayapura dengan lebih cepat dan mudah langsung dari genggaman Anda.
          </p>
        </div>
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800 text-lg">Status Antrian</h3>
          <div className="flex items-center space-x-1.5 bg-slate-100 px-2 py-1 rounded-full">
            <span className={`w-1.5 h-1.5 rounded-full ${!isOnline ? 'bg-red-500' : (loading ? 'bg-amber-400 animate-pulse' : 'bg-green-500')}`}></span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">
              {!isOnline ? 'OFFLINE' : (loading ? 'SYNCING' : 'LIVE')}
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {queues.map(q => (
            <QueueCard key={q.id} queue={q} />
          ))}
        </div>
        {!isOnline && (
          <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-center space-x-2">
            <i className="fa-solid fa-cloud-slash text-red-400 text-xs"></i>
            <p className="text-[9px] text-red-600 font-bold uppercase tracking-tight">Koneksi terputus. Menampilkan data terakhir.</p>
          </div>
        )}
      </div>

      <div>
        <div className="mb-4">
          <h3 className="font-bold text-slate-800 text-lg">Layanan Utama</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => onSelectService(service.id)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center transition-all hover:scale-[1.02] hover:shadow-md group active:scale-95"
            >
              <div className={`${service.color} w-14 h-14 rounded-2xl flex items-center justify-center mb-4 text-white text-2xl shadow-lg transition-transform group-hover:rotate-6`}>
                <i className={`fa-solid ${service.icon}`}></i>
              </div>
              <span className="font-bold text-slate-700">{service.title}</span>
              <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">Klik untuk rincian</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center space-x-2 mb-3">
          <i className="fa-solid fa-bullhorn text-amber-600"></i>
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">Informasi Terbaru</h4>
        </div>
        <ul className="space-y-2">
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Segera lakukan <strong>Aktivasi Akun Coretax</strong> dan <strong>Kode Otorisasi DJP</strong>
            </p>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Jika Gabung NPWP istri ke Suami : <strong>Istri Ajukan Non-Aktif Sebelum 31 Maret 2026*</strong>
            </p>
          </li>
          <li className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
            <p className="text-[11px] text-amber-800 leading-relaxed">
              Batas pelaporan SPT Tahunan PPh Orang Pribadi adalah <strong>31 Maret 2026</strong>.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
