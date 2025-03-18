
import { useState } from 'react';
import { Recording } from '@/lib/types';

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
];

const useRecordings = () => {
  const [recordings, setRecordings] = useState<Recording[]>(mockRecordings);
  
  // Filter recordings by status
  const upcomingRecordings = recordings.filter(r => r.status === 'scheduled');
  const recentRecordings = recordings.filter(r => r.status !== 'scheduled').slice(0, 3);
  
  return {
    recordings,
    setRecordings,
    upcomingRecordings,
    recentRecordings,
    hasRecordings: recordings.length > 0
  };
};

export default useRecordings;
