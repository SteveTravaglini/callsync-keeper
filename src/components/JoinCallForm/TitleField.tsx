
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import { formSchema } from './schema';

interface TitleFieldProps {
  control: Control<z.infer<typeof formSchema>>;
}

const TitleField = ({ control }: TitleFieldProps) => {
  return (
    <FormField
      control={control}
      name="title"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Recording Title</FormLabel>
          <FormControl>
            <Input placeholder="Weekly Team Meeting" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TitleField;
