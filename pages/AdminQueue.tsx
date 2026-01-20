
import React, { useEffect, useState } from 'react';
import { QueueInfo } from '../types';
import { fetchQueueData, updateSingleQueueSheet } from '../services/queueService';
import { playQueueAnnouncement } from '../services/ttsService';

const AdminQueue: React.FC = () => {
  const [queues, setQueues] = useState<QueueInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);

  const loadData = async () => {
    const data = await fetchQueueData();
    setQueues(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000); // Admin refresh lebih cepat (10 detik)
    return () => clearInterval(interval);
  }, []);

  const handleUpdate = async (id: string, type: 'current' | 'last') => {
    setUpdating(`${id}-${type}`);
    
    // Optimistic Update UI
    const updatedQueues = queues.map(q => {
      if (q.id === id) {
        const val = q[type];
        const numOnly = parseInt(val.replace(/[^0-9]/g, '')) + 1;
        const newVal = `${id}${numOnly.toString().padStart(3, '0')}`;
        return { ...q, [type]: newVal };
      }
      return q;
    });
    setQueues(updatedQueues);

    try {
      const success = await updateSingleQueueSheet(id, type);
      
      if (success && type === 'current') {
        const queueItem = updatedQueues.find(q => q.id === id);
        if (queueItem) {
          setIsSpeaking(id);
          await playQueueAnnouncement(queueItem.current, queueItem.label);
          setIsSpeaking(null);
        }
      }
    } catch (err) {
      console.error("Gagal update sheet:", err);
    } finally {
      setUpdating(null);
      // Sinkronisasi ulang dengan server untuk memastikan data benar
      setTimeout(loadData, 1000);
    }
  };

  if (loading && queues.length === 0) return (
    <div className="p-8 text-center text-slate-400 flex flex-col items-center">
      <i className="fa-solid fa-spinner animate-spin text-3xl mb-4 text-blue-600"></i>
      <span>Sinkronisasi Data...</span>
    </div>
  );

  return (
    <div className="p-6 space-y-8 animate-fadeIn pb-32">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800 uppercase tracking-tight">Operator Antrian</h2>
            <p className="text-xs text-slate-500">Status: Aktif</p>
          </div>
          <button 
            onClick={loadData}
            className="p-2 bg-blue-50 text-blue-600 rounded-lg active:scale-95 transition-all"
          >
            <i className={`fa-solid fa-sync ${loading ? 'animate-spin' : ''}`}></i>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {queues.map((q) => {
          const lastNum = parseInt(q.last.toString().replace(/[^0-9]/g, '')) || 0;
          const currentNum = parseInt(q.current.toString().replace(/[^0-9]/g, '')) || 0;
          const remaining = Math.max(0, lastNum - currentNum);

          return (
            <div key={q.id} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`${q.color} w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg relative`}>
                    <span className="font-bold text-lg">{q.id}</span>
                    {isSpeaking === q.id && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{q.label}</h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Sisa</span>
                  <span className="text-lg font-black text-blue-600">{remaining}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Sekarang</p>
                  <p className="text-2xl font-black text-slate-800">{q.current}</p>
                  <button 
                    onClick={() => handleUpdate(q.id, 'current')}
                    disabled={updating !== null || currentNum >= lastNum}
                    className={`mt-3 w-full text-white py-2.5 rounded-xl text-xs font-bold shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 ${isSpeaking === q.id ? 'bg-emerald-500' : 'bg-[#002B5B]'}`}
                  >
                    {updating === `${q.id}-current` ? <i className="fa-solid fa-spinner animate-spin"></i> : <><i className="fa-solid fa-volume-high"></i> <span>PANGGIL</span></>}
                  </button>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100">
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Terakhir</p>
                  <p className="text-2xl font-black text-slate-800">{q.last}</p>
                  <button 
                    onClick={() => handleUpdate(q.id, 'last')}
                    disabled={updating !== null}
                    className="mt-3 w-full bg-slate-200 text-slate-600 py-2.5 rounded-xl text-xs font-bold active:scale-95 transition-all"
                  >
                    {updating === `${q.id}-last` ? <i className="fa-solid fa-spinner animate-spin"></i> : <><i className="fa-solid fa-plus mr-1"></i> ANTRIAN</>}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminQueue;
