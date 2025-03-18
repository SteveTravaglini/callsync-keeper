
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
