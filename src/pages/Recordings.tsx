
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import RecordingCard from '@/components/RecordingCard';
import EmptyState from '@/components/EmptyState';
import { Recording } from '@/lib/types';
import { ListFilter, Search, MicIcon, ArchiveIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data - in a real app, this would come from an API
const mockRecordings: Recording[] = [
  {
    id: '1',
    title: 'Weekly Team Standup',
    meetingType: 'zoom',
    date: '2023-06-15T09:00:00Z',
    duration: 1800, // 30 minutes
    transcriptAvailable: true,
    status: 'completed',
    meetingUrl: 'https://zoom.us/j/123456789',
  },
  {
    id: '2',
    title: 'Product Planning',
    meetingType: 'google-meet',
    date: '2023-06-14T14:30:00Z',
    duration: 3600, // 60 minutes
    transcriptAvailable: true,
    status: 'completed',
    meetingUrl: 'https://meet.google.com/abc-defg-hij',
  },
  {
    id: '3',
    title: 'Client Onboarding Call',
    meetingType: 'microsoft-teams',
    date: '2023-06-16T11:00:00Z',
    duration: 0, // hasn't happened yet
    transcriptAvailable: false,
    status: 'scheduled',
    meetingUrl: 'https://teams.microsoft.com/l/meetup-join/123',
  },
  {
    id: '4',
    title: 'Design Review',
    meetingType: 'zoom',
    date: '2023-06-12T16:00:00Z',
    duration: 2700, // 45 minutes
    transcriptAvailable: true,
    status: 'completed',
    meetingUrl: 'https://zoom.us/j/987654321',
  },
  {
    id: '5',
    title: 'Quarterly Planning',
    meetingType: 'google-meet',
    date: '2023-06-18T13:00:00Z',
    duration: 0, // hasn't happened yet
    transcriptAvailable: false,
    status: 'scheduled',
    meetingUrl: 'https://meet.google.com/xyz-abcd-efg',
  },
];

const Recordings = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = searchParams.get('filter') || 'all';
  
  const [recordings, setRecordings] = useState<Recording[]>(mockRecordings);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState(initialFilter);
  
  // Filter records based on search query and status filter
  const filteredRecordings = recordings.filter(recording => {
    const matchesSearch = recording.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                        (statusFilter === 'upcoming' && recording.status === 'scheduled') ||
                        (statusFilter === 'completed' && recording.status === 'completed');
    
    return matchesSearch && matchesStatus;
  });
  
  const sortedRecordings = [...filteredRecordings].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="page-container">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl font-display font-medium mb-1">Recordings</h1>
            <p className="text-gray-600 dark:text-gray-400">
              View and manage all your meeting recordings
            </p>
          </div>
          
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full" 
            asChild
          >
            <a href="/join-call">
              <MicIcon size={16} className="mr-2" />
              New Recording
            </a>
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search recordings..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center">
            <ListFilter size={16} className="mr-2 text-gray-500" />
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Recordings</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
        
        {sortedRecordings.length === 0 ? (
          <EmptyState
            icon={<ArchiveIcon size={32} />}
            title="No recordings found"
            description={searchQuery ? `No recordings matching "${searchQuery}"` : "Try changing your filters or create a new recording"}
            actionLink="/join-call"
            actionLabel="Record a Meeting"
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {sortedRecordings.map((recording, index) => (
              <RecordingCard 
                key={recording.id} 
                recording={recording} 
                index={index} 
              />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Recordings;
