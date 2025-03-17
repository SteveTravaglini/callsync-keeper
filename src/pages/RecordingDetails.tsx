
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import { Recording } from '@/lib/types';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Download, 
  FileText, 
  Link as LinkIcon, 
  PlayCircle, 
  Share2, 
  Trash2,
  VideoIcon 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';

// Mock recording data - in a real app, this would come from an API
const mockRecording: Recording = {
  id: '1',
  title: 'Weekly Team Standup',
  meetingType: 'zoom',
  date: '2023-06-15T09:00:00Z',
  duration: 1800, // 30 minutes
  transcriptAvailable: true,
  status: 'completed',
  meetingUrl: 'https://zoom.us/j/123456789',
};

const RecordingDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the recording data based on the ID
  const recording = mockRecording;
  
  const handleShareRecording = () => {
    navigator.clipboard.writeText(`https://callsync.app/recording/${id}`);
    toast({
      title: "Link copied",
      description: "Recording link has been copied to your clipboard.",
    });
  };
  
  const handleDeleteRecording = () => {
    toast({
      title: "Recording deleted",
      description: "This recording has been permanently deleted.",
      variant: "destructive",
    });
    // In a real app, you would redirect to the recordings page after deletion
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit'
    });
  };
  
  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Scheduled</Badge>;
      case 'recording':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 animate-pulse">Recording</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Processing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">Completed</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      default:
        return null;
    }
  };
  
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
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-display font-medium">
                  {recording.title}
                </h1>
                {getStatusBadge(recording.status)}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {formatDate(recording.date)} at {formatTime(recording.date)}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleShareRecording}>
              <Share2 size={16} className="mr-2" />
              Share
            </Button>
            
            <Button variant="destructive" size="sm" onClick={handleDeleteRecording}>
              <Trash2 size={16} className="mr-2" />
              Delete
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          <Tabs defaultValue="recording" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="recording" className="relative">
                <VideoIcon size={16} className="mr-2" />
                Recording
              </TabsTrigger>
              <TabsTrigger value="transcript" className="relative">
                <FileText size={16} className="mr-2" />
                Transcript
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="recording" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <Card className="lg:col-span-3 overflow-hidden">
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <PlayCircle size={48} className="mx-auto mb-3 text-white/60" />
                      <span className="text-white/80 text-sm">Click to play recording</span>
                    </div>
                  </div>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recording Info</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar size={14} className="mr-2" />
                        <span>{formatDate(recording.date)}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Clock size={14} className="mr-2" />
                        <span>{formatDuration(recording.duration)}</span>
                      </div>
                      
                      {recording.meetingUrl && (
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                          <LinkIcon size={14} className="mr-2" />
                          <a 
                            href={recording.meetingUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:underline truncate max-w-[200px]"
                          >
                            {recording.meetingUrl}
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3 pt-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download size={14} className="mr-2" />
                        Download Recording
                      </Button>
                      
                      {recording.transcriptAvailable && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start"
                          asChild
                        >
                          <Link to={`/transcript/${recording.id}`}>
                            <FileText size={14} className="mr-2" />
                            View Full Transcript
                          </Link>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="transcript">
              <div className="text-center">
                <Button 
                  variant="default" 
                  size="lg"
                  asChild
                >
                  <Link to={`/transcript/${recording.id}`}>
                    <FileText size={16} className="mr-2" />
                    View Full Transcript
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default RecordingDetails;
