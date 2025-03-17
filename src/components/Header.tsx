
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusIcon, MicIcon, ClockIcon, SettingsIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-500 text-white"
            >
              <MicIcon size={18} />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -5 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-medium text-lg"
            >
              CallSync
            </motion.span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <NavLink to="/" label="Dashboard" isActive={location.pathname === '/'} />
          <NavLink to="/recordings" label="Recordings" isActive={location.pathname === '/recordings'} />
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link to="/join-call">
            <Button size="sm" className="rounded-full px-4 h-9">
              <PlusIcon size={16} className="mr-1" />
              New Recording
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full h-9 w-9">
            <SettingsIcon size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  isActive: boolean;
}

const NavLink = ({ to, label, isActive }: NavLinkProps) => {
  return (
    <Link to={to} className="relative py-1 px-1">
      <span className={`${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'} font-medium transition-colors`}>
        {label}
      </span>
      {isActive && (
        <motion.div 
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
        />
      )}
    </Link>
  );
};

export default Header;
