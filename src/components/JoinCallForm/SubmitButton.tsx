
import { Button } from '@/components/ui/button';
import { PlayCircle, Calendar } from 'lucide-react';

interface SubmitButtonProps {
  recordImmediately: boolean;
}

const SubmitButton = ({ recordImmediately }: SubmitButtonProps) => {
  return (
    <Button type="submit" className="w-full">
      {recordImmediately ? (
        <>
          <PlayCircle className="mr-2 h-4 w-4" />
          Join & Record Now
        </>
      ) : (
        <>
          <Calendar className="mr-2 h-4 w-4" />
          Schedule Recording
        </>
      )}
    </Button>
  );
};

export default SubmitButton;
