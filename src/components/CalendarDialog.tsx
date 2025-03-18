
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CalendarType } from '@/lib/types';
import { Check, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface CalendarOption {
  id: CalendarType;
  name: string;
  icon: JSX.Element;
  comingSoon?: boolean;
}

interface CalendarDialogProps {
  onConnect: (calendarType: CalendarType) => void;
}

const CalendarDialog = ({ onConnect }: CalendarDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCalendar, setSelectedCalendar] = useState<CalendarType | null>(null);
  const [step, setStep] = useState(1);
  const [authCode, setAuthCode] = useState('');
  
  const calendarOptions: CalendarOption[] = [
    { 
      id: 'google', 
      name: 'Google Calendar', 
      icon: <div className="w-8 h-8 rounded-md bg-[#4285F4] flex items-center justify-center text-white font-bold">G</div> 
    },
    { 
      id: 'outlook', 
      name: 'Microsoft Outlook', 
      icon: <div className="w-8 h-8 rounded-md bg-[#0078D4] flex items-center justify-center text-white font-bold">O</div> 
    },
    { 
      id: 'apple', 
      name: 'Apple Calendar', 
      icon: <div className="w-8 h-8 rounded-md bg-[#999] flex items-center justify-center text-white"><CalendarIcon size={16} /></div>,
      comingSoon: true 
    },
    { 
      id: 'other', 
      name: 'Other Calendar', 
      icon: <div className="w-8 h-8 rounded-md bg-gray-500 flex items-center justify-center text-white"><CalendarIcon size={16} /></div>,
      comingSoon: true 
    }
  ];
  
  const handleSelectCalendar = (calendarType: CalendarType) => {
    setSelectedCalendar(calendarType);
    setStep(2);
  };
  
  const handleConnect = () => {
    if (!selectedCalendar) return;
    
    // In a real app, you would handle OAuth flow here
    toast({
      title: "Calendar Connected",
      description: `Successfully connected to ${selectedCalendar} calendar.`,
    });
    
    onConnect(selectedCalendar);
    setIsOpen(false);
    resetDialog();
  };
  
  const resetDialog = () => {
    setStep(1);
    setSelectedCalendar(null);
    setAuthCode('');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) resetDialog();
    }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <CalendarIcon size={16} />
          Connect Calendar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Calendar</DialogTitle>
          <DialogDescription>
            Link your calendar to automatically join scheduled meetings.
          </DialogDescription>
        </DialogHeader>
        
        {step === 1 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 py-4"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Select your calendar provider:
            </p>
            
            <div className="grid gap-3">
              {calendarOptions.map((option) => (
                <button
                  key={option.id}
                  disabled={option.comingSoon}
                  onClick={() => !option.comingSoon && handleSelectCalendar(option.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                    option.comingSoon 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-accent hover:text-accent-foreground cursor-pointer'
                  }`}
                >
                  {option.icon}
                  <div className="flex-1 text-left">
                    <p className="font-medium">{option.name}</p>
                    {option.comingSoon && (
                      <p className="text-xs text-muted-foreground">Coming soon</p>
                    )}
                  </div>
                  {!option.comingSoon && <ArrowRight size={16} className="text-muted-foreground" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
        
        {step === 2 && selectedCalendar && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 py-4"
          >
            <p className="text-sm text-muted-foreground mb-2">
              {selectedCalendar === 'google' && 'Click the button below to authenticate with Google Calendar.'}
              {selectedCalendar === 'outlook' && 'Click the button below to authenticate with Microsoft Outlook.'}
            </p>
            
            <div className="flex flex-col gap-4">
              <Button 
                onClick={handleConnect}
                className="w-full justify-center"
              >
                Connect to {selectedCalendar === 'google' ? 'Google Calendar' : 'Microsoft Outlook'}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={() => setStep(1)}
                className="w-full justify-center"
              >
                Go Back
              </Button>
            </div>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CalendarDialog;
