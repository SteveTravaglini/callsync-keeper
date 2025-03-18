
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './schema';

interface RecordingToggleProps {
  control: Control<z.infer<typeof formSchema>>;
  onToggle: (checked: boolean) => void;
}

const RecordingToggle = ({ control, onToggle }: RecordingToggleProps) => {
  return (
    <FormField
      control={control}
      name="recordImmediately"
      render={({ field }) => (
        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
          <div className="space-y-0.5">
            <FormLabel className="text-base">Record Immediately</FormLabel>
            <FormDescription>
              Start recording as soon as joined
            </FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                onToggle(!checked);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RecordingToggle;
