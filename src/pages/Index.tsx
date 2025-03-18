
import { useState } from 'react';
import { Database, BrainCircuit } from 'lucide-react';
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';
import HeroSection from '@/components/dashboard/HeroSection';
import PreviewSection from '@/components/dashboard/PreviewSection';
import UpcomingRecordingsSection from '@/components/dashboard/UpcomingRecordingsSection';
import RecentRecordingsSection from '@/components/dashboard/RecentRecordingsSection';
import useRecordings from '@/hooks/useRecordings';
import { MicIcon } from 'lucide-react';

const Index = () => {
  const { hasRecordings, upcomingRecordings, recentRecordings } = useRecordings();
  const [showExtensionPreview, setShowExtensionPreview] = useState(false);
  const [showCrmPreview, setShowCrmPreview] = useState(false);
  const [showKnowledgePreview, setShowKnowledgePreview] = useState(false);
  
  if (!hasRecordings) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="page-container">
          <EmptyState
            icon={<MicIcon size={32} />}
            title="No recordings yet"
            description="Start by recording your first meeting. You can join Zoom, Google Meet, or Microsoft Teams calls and automatically record them."
            actionLink="/join-call"
            actionLabel="Record a Meeting"
          />
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="page-container">
        <HeroSection 
          onToggleExtensionPreview={() => setShowExtensionPreview(!showExtensionPreview)}
          onToggleCrmPreview={() => setShowCrmPreview(!showCrmPreview)}
          onToggleKnowledgePreview={() => setShowKnowledgePreview(!showKnowledgePreview)}
          showExtensionPreview={showExtensionPreview}
          showCrmPreview={showCrmPreview}
          showKnowledgePreview={showKnowledgePreview}
        />
        
        <PreviewSection 
          showExtensionPreview={showExtensionPreview}
          showCrmPreview={showCrmPreview}
          showKnowledgePreview={showKnowledgePreview}
        />
        
        <UpcomingRecordingsSection recordings={upcomingRecordings} />
        
        <RecentRecordingsSection recordings={recentRecordings} />
      </div>
    </div>
  );
};

export default Index;
