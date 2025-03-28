
import Header from '@/components/Header';
import JoinCallForm from '@/components/JoinCallForm';
import ExtensionPreview from '@/components/ExtensionPreview';
import { motion } from 'framer-motion';
import { Calendar, CalendarDays } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const JoinCall = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="page-container">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-center mb-12"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100/80 dark:bg-blue-900/30 p-3.5 rounded-full shadow-sm">
                <CalendarDays className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-medium mb-3 tracking-tight">Join & Record a Meeting</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Connect your calendar to automatically join and record your video conferences.
            </p>
            <div className="flex items-center justify-center mt-6 text-sm text-blue-600 dark:text-blue-400">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Auto-join meetings from your calendar</span>
            </div>
          </motion.div>
          
          <Tabs defaultValue="join-call" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8 rounded-full p-1 bg-secondary/80 backdrop-blur-sm shadow-sm">
              <TabsTrigger value="join-call" className="rounded-full py-2.5 data-[state=active]:shadow-sm">Join Call</TabsTrigger>
              <TabsTrigger value="extension" className="rounded-full py-2.5 data-[state=active]:shadow-sm">Calendar Extension</TabsTrigger>
            </TabsList>
            
            <TabsContent value="join-call">
              <JoinCallForm />
            </TabsContent>
            
            <TabsContent value="extension">
              <ExtensionPreview />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinCall;
