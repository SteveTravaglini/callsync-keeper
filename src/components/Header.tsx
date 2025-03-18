
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusIcon, MicIcon, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 dark:bg-background/80 backdrop-blur-xl border-b border-border/20">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-sm"
            >
              <MicIcon size={16} />
            </motion.div>
            <motion.span 
              initial={{ opacity: 0, x: -5 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="font-medium text-lg ml-2 tracking-tight"
            >
              CallSync
            </motion.span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center mx-auto">
          <div className="flex bg-secondary/80 rounded-full p-0.5 shadow-sm">
            <NavLink to="/" label="Dashboard" isActive={location.pathname === '/'} />
            <NavLink to="/recordings" label="Recordings" isActive={location.pathname === '/recordings'} />
          </div>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Link to="/join-call">
            <Button size="sm" className="rounded-full px-4 h-8 gap-1.5 font-medium shadow-sm bg-blue-500 hover:bg-blue-600">
              <PlusIcon size={14} />
              New Recording
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="rounded-full h-8 w-8 bg-secondary/80 text-gray-600">
            <Settings size={16} />
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
    <Link 
      to={to} 
      className={`relative py-1.5 px-4 rounded-full transition-all ${
        isActive 
          ? 'bg-background text-foreground shadow-sm' 
          : 'text-foreground/60 hover:text-foreground'
      }`}
    >
      <span className="font-medium text-sm">{label}</span>
    </Link>
  );
};

export default Header;
