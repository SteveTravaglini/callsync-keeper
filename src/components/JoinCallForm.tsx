
import { useState } from 'react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { JoinCallParams, MeetingType, CalendarType } from '@/lib/types';
import { CalendarIcon, Link as LinkIcon, PlayCircle, Calendar, Clock, CalendarCheck, CalendarDays, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import CalendarDialog from './CalendarDialog';

const formSchema = z.object({
  meetingUrl: z.string().url({ message: "Please enter a valid meeting URL" }),
  meetingType: z.enum(['zoom', 'google-meet', 'microsoft-teams', 'webex', 'other']),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  recordImmediately: z.boolean().default(true),
  scheduleTime: z.string().optional(),
  calendarIntegration: z.boolean().default(false),
  autoJoin: z.boolean().default(false),
});

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
  const calendarIntegration = form.watch('calendarIntegration');
  
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
  
  const detectMeetingType = (url: string): MeetingType => {
    if (url.includes('zoom.us')) return 'zoom';
    if (url.includes('meet.google.com')) return 'google-meet';
    if (url.includes('teams.microsoft.com')) return 'microsoft-teams';
    if (url.includes('webex.com')) return 'webex';
    return 'other';
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
              <FormField
                control={form.control}
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
                            handleUrlChange(e);
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
              
              <FormField
                control={form.control}
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
              
              <FormField
                control={form.control}
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
              
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Calendar Integration</div>
                {!isCalendarConnected ? (
                  <CalendarDialog onConnect={handleCalendarConnect} />
                ) : (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-500">
                    <Check size={14} className="mr-1" />
                    {calendarType === 'google' ? 'Google Calendar' : 'Microsoft Outlook'} Connected
                  </div>
                )}
              </div>
              
              {isCalendarConnected && (
                <FormField
                  control={form.control}
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
              
              <FormField
                control={form.control}
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
                          setIsScheduling(!checked);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isScheduling && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FormField
                    control={form.control}
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
              )}
              
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
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default JoinCallForm;
