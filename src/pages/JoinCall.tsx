
import Header from '@/components/Header';
import JoinCallForm from '@/components/JoinCallForm';
import { motion } from 'framer-motion';
import { Calendar, CalendarDays } from 'lucide-react';

const JoinCall = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="page-container">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center mb-10"
          >
            <div className="flex justify-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <CalendarDays className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl font-display font-medium mb-3">Join & Record a Meeting</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Connect your calendar to automatically join and record your video conferences.
            </p>
            <div className="flex items-center justify-center mt-4 text-sm text-blue-600 dark:text-blue-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Auto-join meetings from your calendar</span>
            </div>
          </motion.div>
          
          <JoinCallForm />
        </motion.div>
      </div>
    </div>
  );
};

export default JoinCall;
