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
  companyId?: string; // Added company association
}

export interface Transcript {
  recordingId: string;
  segments: TranscriptSegment[];
  fullText: string;
  speakers: string[];
  companyId?: string; // Added company association
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

// New Company Knowledge Base Types
export interface Company {
  id: string;
  name: string;
  crmId?: string;
  industry?: string;
  website?: string;
  size?: string;
  contacts?: Contact[];
  knowledgeBaseId: string;
}

export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  title?: string;
  companyId: string;
  crmContactId?: string;
}

export interface KnowledgeBase {
  id: string;
  companyId: string;
  transcriptIds: string[];
  emailIds: string[];
  crmActivityIds: string[];
  webResearchIds: string[];
  lastUpdated: string;
}

export interface KnowledgeSegment {
  id: string;
  knowledgeBaseId: string;
  sourceType: 'transcript' | 'email' | 'crm' | 'web' | 'other';
  sourceId: string;
  content: string;
  date: string;
  metadata?: Record<string, any>;
}

export interface ContentTemplate {
  id: string;
  name: string;
  description: string;
  type: TemplateType | string; // Updated to use TemplateType enum
  template: string; // Template with variables like {{company.name}}
  variables: TemplateVariable[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateVariable {
  name: string;
  source: 'company' | 'knowledgeBase' | 'transcript' | 'custom';
  path: string; // e.g., 'name' for company.name or 'insights.keyPoints[0]'
  defaultValue?: string;
}

export interface GeneratedContent {
  id: string;
  templateId: string;
  companyId: string;
  knowledgeBaseId: string;
  title: string;
  content: string;
  createdAt: string;
  variables: Record<string, any>; // Actual values used for variables
}

// Add the missing TemplateType enum
export enum TemplateType {
  PROPOSAL = 'proposal',
  EXECUTIVE_SUMMARY = 'summary', // Changed to match the expected 'summary' string
  ROI_ANALYSIS = 'roi', // Changed to match the expected 'roi' string
  IMPLEMENTATION_PLAN = 'handoff', // Changed to match the expected 'handoff' string
  CUSTOM = 'custom'
}
