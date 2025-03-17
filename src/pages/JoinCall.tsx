
import Header from '@/components/Header';
import JoinCallForm from '@/components/JoinCallForm';
import { motion } from 'framer-motion';

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
            <h1 className="text-3xl font-display font-medium mb-3">Join & Record a Meeting</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Enter your meeting details below to join and automatically record your video conference.
            </p>
          </motion.div>
          
          <JoinCallForm />
        </motion.div>
      </div>
    </div>
  );
};

export default JoinCall;
