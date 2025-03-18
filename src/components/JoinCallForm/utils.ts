
import { MeetingType } from '@/lib/types';

export const detectMeetingType = (url: string): MeetingType => {
  if (url.includes('zoom.us')) return 'zoom';
  if (url.includes('meet.google.com')) return 'google-meet';
  if (url.includes('teams.microsoft.com')) return 'microsoft-teams';
  if (url.includes('webex.com')) return 'webex';
  return 'other';
};
