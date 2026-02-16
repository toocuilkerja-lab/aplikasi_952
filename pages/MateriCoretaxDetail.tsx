
import React from 'react';
import TutorialDetail from './TutorialDetail';

interface MateriCoretaxDetailProps {
  tutorialId: string;
  onBack: () => void;
}

const MateriCoretaxDetail: React.FC<MateriCoretaxDetailProps> = ({ tutorialId, onBack }) => {
  return <TutorialDetail tutorialId={tutorialId} onBack={onBack} />;
};

export default MateriCoretaxDetail;