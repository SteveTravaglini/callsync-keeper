
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecordingCard from '@/components/RecordingCard';
import { Recording } from '@/lib/types';

interface UpcomingRecordingsSectionProps {
  recordings: Recording[];
}

const UpcomingRecordingsSection = ({ recordings }: UpcomingRecordingsSectionProps) => {
  if (recordings.length === 0) return null;
  
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="mb-16"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-3">
            <Clock size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-xl font-display font-medium">Upcoming Recordings</h2>
        </div>
        
        <Link to="/recordings?filter=upcoming">
          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-800">
            View All
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordings.map((recording, index) => (
          <RecordingCard key={recording.id} recording={recording} index={index} />
        ))}
      </div>
    </motion.section>
  );
};

export default UpcomingRecordingsSection;
