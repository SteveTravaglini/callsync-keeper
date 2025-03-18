
import { motion } from 'framer-motion';
import ExtensionPreview from '@/components/ExtensionPreview';
import CrmIntegrationPreview from '@/components/CrmIntegration/CrmIntegrationPreview';
import CompanyKnowledgePreview from '@/components/CompanyKnowledge/CompanyKnowledgePreview';

interface PreviewSectionProps {
  showExtensionPreview: boolean;
  showCrmPreview: boolean;
  showKnowledgePreview: boolean;
}

const PreviewSection = ({ 
  showExtensionPreview,
  showCrmPreview,
  showKnowledgePreview
}: PreviewSectionProps) => {
  return (
    <>
      {showExtensionPreview && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <ExtensionPreview />
        </motion.div>
      )}
      
      {showCrmPreview && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <CrmIntegrationPreview />
        </motion.div>
      )}
      
      {showKnowledgePreview && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <CompanyKnowledgePreview />
        </motion.div>
      )}
    </>
  );
};

export default PreviewSection;
