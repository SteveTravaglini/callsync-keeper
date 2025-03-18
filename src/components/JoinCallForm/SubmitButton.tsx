
import { Button } from '@/components/ui/button';
import { PlayCircle, Calendar, Database } from 'lucide-react';

interface SubmitButtonProps {
  recordImmediately: boolean;
  syncToCrm?: boolean;
}

const SubmitButton = ({ recordImmediately, syncToCrm = false }: SubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full">
      {recordImmediately ? (
        <>
          <PlayCircle className="mr-2 h-4 w-4" />
          {syncToCrm ? 'Join, Record & Sync to CRM' : 'Join & Record Now'}
        </>
      ) : (
        <>
          <Calendar className="mr-2 h-4 w-4" />
          {syncToCrm ? 'Schedule Recording & CRM Sync' : 'Schedule Recording'}
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
