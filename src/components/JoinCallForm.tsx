
import { useState } from 'react';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { JoinCallParams, CalendarType } from '@/lib/types';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Import refactored components
import MeetingUrlField from './JoinCallForm/MeetingUrlField';
import MeetingTypeField from './JoinCallForm/MeetingTypeField';
import TitleField from './JoinCallForm/TitleField';
import CalendarIntegrationSection from './JoinCallForm/CalendarIntegrationSection';
import RecordingToggle from './JoinCallForm/RecordingToggle';
import ScheduleTimeField from './JoinCallForm/ScheduleTimeField';
import SubmitButton from './JoinCallForm/SubmitButton';
import { formSchema } from './JoinCallForm/schema';
import { detectMeetingType } from './JoinCallForm/utils';

const JoinCallForm = () => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [calendarType, setCalendarType] = useState<CalendarType | null>(null);
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      meetingUrl: '',
      meetingType: 'zoom',
      title: '',
      recordImmediately: true,
      scheduleTime: '',
      calendarIntegration: false,
      autoJoin: false,
    },
  });
  
  const recordImmediately = form.watch('recordImmediately');
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log('Form values:', values);
    
    // Here you would normally call an API to schedule or start the recording
    
    toast({
      title: recordImmediately ? "Recording Started" : "Recording Scheduled",
      description: recordImmediately 
        ? "Your meeting is being recorded. You can view it in your recordings."
        : `Your recording has been scheduled. ${values.autoJoin ? "It will automatically join when the meeting starts." : "You'll receive a notification when it starts."}`,
    });
    
    // Redirect to recordings page
    navigate('/recordings');
  };
  
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url) {
      const detectedType = detectMeetingType(url);
      form.setValue('meetingType', detectedType);
    }
  };
  
  const handleCalendarConnect = (type: CalendarType) => {
    setIsCalendarConnected(true);
    setCalendarType(type);
    form.setValue('calendarIntegration', true);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-display">Join & Record Call</CardTitle>
          <CardDescription>
            Enter meeting details to join and record
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <MeetingUrlField control={form.control} onUrlChange={handleUrlChange} />
              <MeetingTypeField control={form.control} />
              <TitleField control={form.control} />
              
              <CalendarIntegrationSection 
                control={form.control}
                isCalendarConnected={isCalendarConnected}
                calendarType={calendarType}
                onCalendarConnect={handleCalendarConnect}
              />
              
              <RecordingToggle control={form.control} onToggle={setIsScheduling} />
              <ScheduleTimeField control={form.control} isVisible={isScheduling} />
              
              <SubmitButton recordImmediately={recordImmediately} />
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JoinCallForm;
