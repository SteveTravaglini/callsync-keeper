
import { motion } from 'framer-motion';
import { PlusIcon, Database, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  onToggleExtensionPreview: () => void;
  onToggleCrmPreview: () => void;
  onToggleKnowledgePreview: () => void;
  showExtensionPreview: boolean;
  showCrmPreview: boolean;
  showKnowledgePreview: boolean;
}

const HeroSection = ({
  onToggleExtensionPreview,
  onToggleCrmPreview,
  onToggleKnowledgePreview,
  showExtensionPreview,
  showCrmPreview,
  showKnowledgePreview
}: HeroSectionProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-4xl md:text-5xl font-display font-medium mb-4 tracking-tight"
        >
          Call Recording <span className="text-primary">&</span> Transcription
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-xl mx-auto leading-relaxed"
        >
          Record your meetings and get instant transcripts to keep track of important discussions.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Link to="/join-call">
            <Button size="lg" className="rounded-full px-6 shadow-apple-button h-12">
              <PlusIcon size={18} className="mr-2" />
              Record a Meeting
            </Button>
          </Link>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-6 h-12 border-gray-200 dark:border-gray-800"
            onClick={onToggleExtensionPreview}
          >
            {showExtensionPreview ? "Hide Extension Preview" : "Show Extension Preview"}
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-6 h-12 border-gray-200 dark:border-gray-800"
            onClick={onToggleCrmPreview}
          >
            <Database size={18} className="mr-2" />
            {showCrmPreview ? "Hide CRM Integration" : "Show CRM Integration"}
          </Button>
          
          <Button 
            size="lg" 
            variant="outline" 
            className="rounded-full px-6 h-12 border-gray-200 dark:border-gray-800"
            onClick={onToggleKnowledgePreview}
          >
            <BrainCircuit size={18} className="mr-2" />
            {showKnowledgePreview ? "Hide Knowledge Base" : "Show Knowledge Base"}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HeroSection;
