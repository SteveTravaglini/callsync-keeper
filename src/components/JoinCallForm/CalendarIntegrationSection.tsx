
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Check } from 'lucide-react';
import CalendarDialog from '../CalendarDialog';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './schema';
import { CalendarType } from '@/lib/types';

interface CalendarIntegrationSectionProps {
  control: Control<z.infer<typeof formSchema>>;
  isCalendarConnected: boolean;
  calendarType: CalendarType | null;
  onCalendarConnect: (type: CalendarType) => void;
}

const CalendarIntegrationSection = ({ 
  control, 
  isCalendarConnected, 
  calendarType, 
  onCalendarConnect 
}: CalendarIntegrationSectionProps) => {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="text-sm font-medium">Calendar Integration</div>
        {!isCalendarConnected ? (
          <CalendarDialog onConnect={onCalendarConnect} />
        ) : (
          <div className="flex items-center text-sm text-green-600 dark:text-green-500">
            <Check size={14} className="mr-1" />
            {calendarType === 'google' ? 'Google Calendar' : 'Microsoft Outlook'} Connected
          </div>
        )}
      </div>
      
      {isCalendarConnected && (
        <FormField
          control={control}
          name="autoJoin"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Auto-Join Meetings</FormLabel>
                <FormDescription>
                  Automatically join meetings from your calendar
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default CalendarIntegrationSection;
