
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CalendarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './schema';

interface ScheduleTimeFieldProps {
  control: Control<z.infer<typeof formSchema>>;
  isVisible: boolean;
}

const ScheduleTimeField = ({ control, isVisible }: ScheduleTimeFieldProps) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormField
        control={control}
        name="scheduleTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Schedule Time</FormLabel>
            <FormControl>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                <Input 
                  type="datetime-local" 
                  className="pl-10"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </motion.div>
  );
};

export default ScheduleTimeField;
