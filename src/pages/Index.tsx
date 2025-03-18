import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import EmptyState from '@/components/EmptyState';
import RecordingCard from '@/components/RecordingCard';
import ExtensionPreview from '@/components/ExtensionPreview';
import CrmIntegrationPreview from '@/components/CrmIntegration/CrmIntegrationPreview';
import CompanyKnowledgePreview from '@/components/CompanyKnowledge/CompanyKnowledgePreview';
import { Recording } from '@/lib/types';
import { PlusIcon, MicIcon, Clock, ListFilter, Database, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const mockRecordings: Recording[] = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    meetingType: 'zoom',
    date: '2023-06-15T09:00:00Z',
    duration: 1800, // 30 minutes
    transcriptAvailable: true,
    status: 'completed',
    meetingUrl: 'https://zoom.us/j/123456789',
  },
  {
    id: '2',
    title: 'Product Planning',
    meetingType: 'google-meet',
    date: '2023-06-14T14:30:00Z',
    duration: 3600, // 60 minutes
    transcriptAvailable: true,
    status: 'completed',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: '3',
    title: 'Client Onboarding Call',
    meetingType: 'microsoft-teams',
    date: '2023-06-16T11:00:00Z',
    duration: 0, // hasn't happened yet
    transcriptAvailable: false,
    status: 'scheduled',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join/123',
  },
];

const Index = () => {
  const [recordings, setRecordings] = useState<Recording[]>(mockRecordings);
  const [showExtensionPreview, setShowExtensionPreview] = useState(false);
  const [showCrmPreview, setShowCrmPreview] = useState(false);
  const [showKnowledgePreview, setShowKnowledgePreview] = useState(false);
  
  const hasRecordings = recordings.length > 0;
  
  const upcomingRecordings = recordings.filter(r => r.status === 'scheduled');
  const recentRecordings = recordings.filter(r => r.status !== 'scheduled').slice(0, 3);
  
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-4xl font-display font-medium mb-4"
            >
              Call Recording & Transcription
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto"
            >
              Record your meetings and get instant transcripts to keep track of important discussions.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/join-call">
                <Button size="lg" className="rounded-full px-6">
                  <PlusIcon size={18} className="mr-2" />
                  Record a Meeting
                </Button>
              </Link>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-6"
                onClick={() => setShowExtensionPreview(!showExtensionPreview)}
              >
                {showExtensionPreview ? "Hide Extension Preview" : "Show Extension Preview"}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-6"
                onClick={() => setShowCrmPreview(!showCrmPreview)}
              >
                <Database size={18} className="mr-2" />
                {showCrmPreview ? "Hide CRM Integration" : "Show CRM Integration"}
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-6"
                onClick={() => setShowKnowledgePreview(!showKnowledgePreview)}
              >
                <BrainCircuit size={18} className="mr-2" />
                {showKnowledgePreview ? "Hide Knowledge Base" : "Show Knowledge Base"}
              </Button>
            </motion.div>
          </div>
        </motion.div>
        
        {showExtensionPreview && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <ExtensionPreview />
          </motion.div>
        )}
        
        {showCrmPreview && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <CrmIntegrationPreview />
          </motion.div>
        )}
        
        {showKnowledgePreview && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <CompanyKnowledgePreview />
          </motion.div>
        )}
        
        {upcomingRecordings.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <Clock size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-display font-medium">Upcoming Recordings</h2>
              </div>
              
              <Link to="/recordings?filter=upcoming">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingRecordings.map((recording, index) => (
                <RecordingCard key={recording.id} recording={recording} index={index} />
              ))}
            </div>
          </motion.section>
        )}
        
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <MicIcon size={18} className="mr-2 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-display font-medium">Recent Recordings</h2>
            </div>
            
            <Link to="/recordings">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentRecordings.map((recording, index) => (
              <RecordingCard key={recording.id} recording={recording} index={index} />
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Index;
