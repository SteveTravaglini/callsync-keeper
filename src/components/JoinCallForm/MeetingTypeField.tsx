
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './schema';

interface MeetingTypeFieldProps {
  control: Control<z.infer<typeof formSchema>>;
}

const MeetingTypeField = ({ control }: MeetingTypeFieldProps) => {
  return (
    <FormField
      control={control}
      name="meetingType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Meeting Platform</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select platform" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="zoom">Zoom</SelectItem>
              <SelectItem value="google-meet">Google Meet</SelectItem>
              <SelectItem value="microsoft-teams">Microsoft Teams</SelectItem>
              <SelectItem value="webex">Webex</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MeetingTypeField;
