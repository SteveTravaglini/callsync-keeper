
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import TranscriptViewer from '@/components/TranscriptViewer';
import { Transcript as TranscriptType } from '@/lib/types';
import { ArrowLeft, Share2, CalendarIcon, Clock, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';

// Mock transcript data - in a real app, this would come from an API
const mockTranscript: TranscriptType = {
  recordingId: '1',
  segments: [
    {
      id: 'seg-1',
      speaker: 'John Doe',
      text: "Hello everyone, thanks for joining today's call. We're going to be discussing the product roadmap for Q3.",
      startTime: 0,
      endTime: 10,
    },
    {
      id: 'seg-2',
      speaker: 'Jane Smith',
      text: "Thanks for organizing this, John. I've prepared some slides with metrics from Q2 that might be relevant.",
      startTime: 11,
      endTime: 18,
    },
    {
      id: 'seg-3',
      speaker: 'John Doe',
      text: "Great, Jane. Let's go through those first and then open up for discussion about priorities.",
      startTime: 19,
      endTime: 24,
    },
    {
      id: 'seg-4',
      speaker: 'Alex Johnson',
      text: "I'd also like to share some feedback from the customer success team that might inform our prioritization.",
      startTime: 25,
      endTime: 33,
    },
    {
      id: 'seg-5',
      speaker: 'Jane Smith',
      text: "Here's the first slide showing our user growth in Q2. As you can see, we had a 25% increase in daily active users, which exceeded our target of 15%. This was largely driven by the new onboarding flow we launched in April.",
      startTime: 34,
      endTime: 50,
    },
    {
      id: 'seg-6',
      speaker: 'John Doe',
      text: "That's impressive. What about retention numbers?",
      startTime: 51,
      endTime: 54,
    },
    {
      id: 'seg-7',
      speaker: 'Jane Smith',
      text: "Good question. If you look at slide 3, our 30-day retention improved from 68% to 74%. The product improvements in the dashboard experience seem to be paying off.",
      startTime: 55,
      endTime: 68,
    },
    {
      id: 'seg-8',
      speaker: 'Alex Johnson',
      text: "This aligns with what we're hearing from customers. The most common positive feedback is about the dashboard customization and the new analytics features.",
      startTime: 69,
      endTime: 80,
    },
    {
      id: 'seg-9',
      speaker: 'John Doe',
      text: "Excellent. With these results in mind, I think we should continue investing in the user experience improvements. For Q3, I propose we focus on three key initiatives: mobile app enhancement, integration with third-party tools, and performance optimization.",
      startTime: 81,
      endTime: 100,
    },
    {
      id: 'seg-10',
      speaker: 'Jane Smith',
      text: "I agree with those priorities. The mobile experience in particular has been lagging behind our web app, and usage data shows more users are accessing via mobile each month.",
      startTime: 101,
      endTime: 112,
    },
    {
      id: 'seg-11',
      speaker: 'Alex Johnson',
      text: "The third-party integrations would address one of our top feature requests too. Especially the Salesforce and HubSpot integrations.",
      startTime: 113,
      endTime: 124,
    },
    {
      id: 'seg-12',
      speaker: 'John Doe',
      text: "Great, I think we have alignment here. Let's dig into each initiative and start planning the specific features and timeline.",
      startTime: 125,
      endTime: 135,
    },
  ],
  fullText: "Hello everyone, thanks for joining today's call. We're going to be discussing the product roadmap for Q3. Thanks for organizing this, John. I've prepared some slides with metrics from Q2 that might be relevant. Great, Jane. Let's go through those first and then open up for discussion about priorities. I'd also like to share some feedback from the customer success team that might inform our prioritization. Here's the first slide showing our user growth in Q2. As you can see, we had a 25% increase in daily active users, which exceeded our target of 15%. This was largely driven by the new onboarding flow we launched in April. That's impressive. What about retention numbers? Good question. If you look at slide 3, our 30-day retention improved from 68% to 74%. The product improvements in the dashboard experience seem to be paying off. This aligns with what we're hearing from customers. The most common positive feedback is about the dashboard customization and the new analytics features. Excellent. With these results in mind, I think we should continue investing in the user experience improvements. For Q3, I propose we focus on three key initiatives: mobile app enhancement, integration with third-party tools, and performance optimization. I agree with those priorities. The mobile experience in particular has been lagging behind our web app, and usage data shows more users are accessing via mobile each month. The third-party integrations would address one of our top feature requests too. Especially the Salesforce and HubSpot integrations. Great, I think we have alignment here. Let's dig into each initiative and start planning the specific features and timeline.",
  speakers: ['John Doe', 'Jane Smith', 'Alex Johnson'],
};

const TranscriptPage = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the transcript data based on the ID
  const transcript = mockTranscript;
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="page-container">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6"
        >
          <div className="flex items-center">
            <Link to="/recordings">
              <Button variant="ghost" size="sm" className="mr-2 h-8 w-8 p-0 rounded-full">
                <ArrowLeft size={16} />
              </Button>
            </Link>
            <h1 className="text-2xl font-display font-medium">Weekly Team Standup</h1>
          </div>
          
          <Button variant="outline" size="sm" className="rounded-full">
            <Share2 size={16} className="mr-2" />
            Share Transcript
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="lg:col-span-3">
            <CardContent className="p-6">
              <TranscriptViewer transcript={transcript} />
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display font-medium">Recording Info</h3>
                <Separator />
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CalendarIcon size={14} className="mr-2" />
                    <span>June 15, 2023</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Clock size={14} className="mr-2" />
                    <span>30 minutes</span>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <Users size={14} className="mr-2" />
                    <span>{transcript.speakers.length} participants</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 space-y-4">
                <h3 className="font-display font-medium">Participants</h3>
                <Separator />
                
                <div className="space-y-3">
                  {transcript.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mr-3 text-gray-500">
                        {speaker.split(' ').map(word => word[0]).join('')}
                      </div>
                      <span>{speaker}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TranscriptPage;
