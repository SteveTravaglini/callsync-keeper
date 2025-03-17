
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface AnimatedTransitionProps {
  children: ReactNode;
  mode?: 'sync' | 'wait';
}

const AnimatedTransition = ({ 
  children, 
  mode = 'wait' 
}: AnimatedTransitionProps) => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode={mode} initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{
          type: 'spring',
          stiffness: 380,
          damping: 30,
        }}
        className="page-content w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedTransition;
