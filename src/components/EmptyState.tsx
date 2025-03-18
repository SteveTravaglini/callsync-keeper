
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLink: string;
  actionLabel: string;
  secondaryAction?: {
    label: string;
    link: string;
  };
}

const EmptyState = ({
  icon,
  title,
  description,
  actionLink,
  actionLabel,
  secondaryAction
}: EmptyStateProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="flex flex-col items-center justify-center w-full max-w-md mx-auto py-20 text-center"
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary"
      >
        {icon}
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="text-2xl font-medium mb-3 text-balance"
      >
        {title}
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="text-muted-foreground mb-8 max-w-sm text-balance"
      >
        {description}
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Link to={actionLink}>
          <Button size="lg" className="rounded-full px-6">
            {actionLabel}
          </Button>
        </Link>
        
        {secondaryAction && (
          <Link to={secondaryAction.link}>
            <Button variant="outline" size="lg" className="rounded-full px-6">
              {secondaryAction.label}
            </Button>
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
};

export default EmptyState;
