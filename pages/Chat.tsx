
import React from 'react';

const Chat: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh] p-8 text-center">
      <div className="space-y-4">
        <div className="w-20 h-20 bg-blue-50 text-[#002B5B] rounded-full flex items-center justify-center mx-auto">
          <i className="fa-solid fa-comments text-3xl"></i>
        </div>
        <h3 className="font-bold text-slate-800">Layanan Helpdesk</h3>
        <p className="text-sm text-slate-500">Silakan gunakan tombol WhatsApp untuk berkonsultasi langsung dengan petugas kami.</p>
      </div>
    </div>
  );
};

export default Chat;
