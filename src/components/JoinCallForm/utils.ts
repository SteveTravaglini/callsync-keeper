
import { MeetingType, CrmType } from '@/lib/types';

export const detectMeetingType = (url: string): MeetingType => {
  if (url.includes('zoom.us')) return 'zoom';
  if (url.includes('meet.google.com')) return 'google-meet';
  if (url.includes('teams.microsoft.com')) return 'microsoft-teams';
  if (url.includes('webex.com')) return 'webex';
  return 'other';
};

// Get suitable CRM type based on domain in the user's email
export const suggestCrmType = (email: string): CrmType => {
  if (!email) return 'none';
  
  const domain = email.split('@')[1]?.toLowerCase();
  
  if (domain?.includes('salesforce') || domain?.includes('sfdc')) {
    return 'salesforce';
  }
  
  if (domain?.includes('hubspot')) {
    return 'hubspot';
  }
  
  return 'none';
};

// Format duration from seconds to a human-readable format
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  if (hours > 0) {
    return `${hours}h ${minutes}m ${remainingSeconds}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${remainingSeconds}s`;
  } else {
    return `${remainingSeconds}s`;
  }
};
