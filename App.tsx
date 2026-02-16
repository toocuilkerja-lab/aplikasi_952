
import React, { useState, useCallback } from 'react';
import { AppTab, ServiceCategory, MainService, SubService } from './types';
import { SERVICES } from './constants';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceList from './pages/ServiceList';
import ServiceDetail from './pages/ServiceDetail';
import Tutorial from './pages/Tutorial';
import TutorialDetail from './pages/TutorialDetail';
import MateriCoretax from './pages/MateriCoretax';
import MateriCoretaxDetail from './pages/MateriCoretaxDetail';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import InstallPrompt from './components/InstallPrompt';

const WhatsAppConfirmModal: React.FC<{ isOpen: boolean; onClose: () => void; onConfirm: () => void }> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-fadeIn">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-sm rounded-[32px] p-8 relative z-10 shadow-2xl animate-zoomIn border border-slate-100">
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <i className="fa-brands fa-whatsapp text-4xl"></i>
          </div>
          <h3 className="text-xl font-black text-[#002B5B] mb-3 leading-tight">Hubungi Helpdesk</h3>
          <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8">
            Apakah Anda ingin disambungkan ke layanan WhatsApp KPP Pratama Jayapura?
          </p>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <button 
              onClick={onClose}
              className="py-4 px-6 rounded-2xl bg-slate-100 text-slate-600 text-xs font-black hover:bg-slate-200 transition-all active:scale-95"
            >
              BATAL
            </button>
            <button 
              onClick={onConfirm}
              className="py-4 px-6 rounded-2xl bg-[#002B5B] text-white text-xs font-black shadow-lg shadow-blue-200 hover:bg-blue-900 transition-all active:scale-95"
            >
              YA, SAMBUNGKAN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('Beranda');
  const [selectedService, setSelectedService] = useState<MainService | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);
  const [selectedCoretaxId, setSelectedCoretaxId] = useState<string | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
  
  const handleSelectService = (category: ServiceCategory) => {
    const service = SERVICES.find(s => s.id === category);
    if (service) {
      setSelectedService(service);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectSubService = (sub: SubService) => {
    setSelectedSubService(sub);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTutorial = (id: string) => {
    setSelectedTutorialId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCoretax = (id: string) => {
    setSelectedCoretaxId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToServices = useCallback(() => {
    setSelectedSubService(null);
  }, []);

  const handleBackToHome = useCallback(() => {
    setSelectedService(null);
    setSelectedSubService(null);
  }, []);

  const handleBackToTutorialList = useCallback(() => {
    setSelectedTutorialId(null);
  }, []);

  const handleBackToCoretaxList = useCallback(() => {
    setSelectedCoretaxId(null);
  }, []);

  const confirmWhatsApp = () => {
    window.open("https://wa.me/6285246953952", "_blank");
    setIsWhatsAppModalOpen(false);
  };

  const handleTabChange = (tab: AppTab) => {
    if (tab === 'Chat') {
      setIsWhatsAppModalOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  const renderContent = () => {
    if (activeTab === 'Beranda') {
      if (selectedSubService) {
        return <ServiceDetail subService={selectedSubService} onBack={handleBackToServices} />;
      }
      if (selectedService) {
        return <ServiceList service={selectedService} onBack={handleBackToHome} onSelectSubService={handleSelectSubService} />;
      }
      return <Home onSelectService={handleSelectService} />;
    }

    switch (activeTab) {
      case 'Materi SPT':
        if (selectedTutorialId) {
          return <TutorialDetail tutorialId={selectedTutorialId} onBack={handleBackToTutorialList} />;
        }
        return <Tutorial onSelectTutorial={handleSelectTutorial} />;
      case 'Materi Coretax':
        if (selectedCoretaxId) {
          return <MateriCoretaxDetail tutorialId={selectedCoretaxId} onBack={handleBackToCoretaxList} />;
        }
        return <MateriCoretax onSelectTutorial={handleSelectCoretax} />;
      case 'FAQ':
        return <FAQ />;
      case 'Profil':
        return <Profile />;
      default:
        return <Home onSelectService={handleSelectService} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={handleTabChange}>
      {renderContent()}
      <InstallPrompt />
      <WhatsAppConfirmModal 
        isOpen={isWhatsAppModalOpen} 
        onClose={() => setIsWhatsAppModalOpen(false)} 
        onConfirm={confirmWhatsApp} 
      />
    </Layout>
  );
};

export default App;