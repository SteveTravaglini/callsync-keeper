
export interface Recording {
  id: string;
  title: string;
  meetingType: MeetingType;
  date: string;
  duration: number; // in seconds
  thumbnailUrl?: string;
  transcriptAvailable: boolean;
  status: RecordingStatus;
  meetingUrl?: string;
}

export interface Transcript {
  recordingId: string;
  segments: TranscriptSegment[];
  fullText: string;
  speakers: string[];
}

export interface TranscriptSegment {
  id: string;
  speaker: string;
  text: string;
  startTime: number; // in seconds
  endTime: number; // in seconds
}

export type MeetingType = 'zoom' | 'google-meet' | 'microsoft-teams' | 'webex' | 'other';

export type RecordingStatus = 'scheduled' | 'recording' | 'processing' | 'completed' | 'failed';

export type CalendarType = 'google' | 'outlook' | 'apple' | 'other';

export interface JoinCallParams {
  meetingUrl: string;
  meetingType: MeetingType;
  title: string;
  recordImmediately: boolean;
  scheduleTime?: string;
  calendarIntegration?: boolean;
  calendarType?: CalendarType;
  autoJoin?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  meetingUrl?: string;
  meetingType?: MeetingType;
}

// New CRM Integration Types
export type CrmType = 'salesforce' | 'hubspot' | 'none';

export interface CrmIntegrationConfig {
  crmType: CrmType;
  enabled: boolean;
  apiKey?: string;
  mappings: CrmFieldMapping[];
  autoSyncTranscripts: boolean;
  autoSyncRecordings: boolean;
  syncNotes: boolean;
}

export interface CrmFieldMapping {
  crmField: string;
  crmFieldType: 'standard' | 'custom';
  sourceField: 'title' | 'date' | 'duration' | 'transcript' | 'summary' | 'action_items' | 'key_points';
  isRequired: boolean;
  defaultValue?: string;
}

export interface CrmSyncResult {
  success: boolean;
  recordId?: string;
  error?: string;
  syncedFields: string[];
}

export interface TranscriptInsight {
  summary: string;
  keyPoints: string[];
  actionItems: string[];
  sentimentScore: number; // -1 to 1, negative to positive
  nextSteps?: string;
  topics: {
    name: string;
    occurrences: number;
    sentiment: number;
  }[];
}
