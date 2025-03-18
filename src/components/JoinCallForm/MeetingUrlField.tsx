
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Link as LinkIcon } from 'lucide-react';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './schema';

interface MeetingUrlFieldProps {
  control: Control<z.infer<typeof formSchema>>;
  onUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MeetingUrlField = ({ control, onUrlChange }: MeetingUrlFieldProps) => {
  return (
    <FormField
      control={control}
      name="meetingUrl"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meeting URL</FormLabel>
          <FormControl>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <Input 
                placeholder="https://zoom.us/j/123456789" 
                className="pl-10" 
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onUrlChange(e);
                }}
              />
            </div>
          </FormControl>
          <FormDescription>
            Paste the URL of your Zoom, Meet, or Teams meeting
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MeetingUrlField;
