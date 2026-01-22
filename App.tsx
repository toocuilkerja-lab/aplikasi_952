
import React, { useState, useCallback } from 'react';
import { AppTab, ServiceCategory, MainService, SubService } from './types';
import { SERVICES } from './constants';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceList from './pages/ServiceList';
import ServiceDetail from './pages/ServiceDetail';
import Tutorial from './pages/Tutorial';
import TutorialDetail from './pages/TutorialDetail';
import FAQ from './pages/FAQ';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import InstallPrompt from './components/InstallPrompt';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>('Beranda');
  const [selectedService, setSelectedService] = useState<MainService | null>(null);
  const [selectedSubService, setSelectedSubService] = useState<SubService | null>(null);
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | null>(null);
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

  const handleOpenWhatsApp = () => {
    window.open("https://wa.me/628114216899", "_blank");
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
      case 'Tutorial':
        return <FAQ />;
      case 'Chat':
        return <Chat onOpenWhatsApp={handleOpenWhatsApp} />;
      case 'Profil':
        return <Profile />;
      default:
        return <Home onSelectService={handleSelectService} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
      <InstallPrompt />
    </Layout>
  );
};

export default App;
