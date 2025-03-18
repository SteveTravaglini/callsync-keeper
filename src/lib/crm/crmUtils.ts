
import { CrmType, CrmIntegrationConfig, CrmFieldMapping, CrmSyncResult, TranscriptInsight } from '@/lib/types';

// Default field mappings for each CRM type
export const getDefaultFieldMappings = (crmType: CrmType): CrmFieldMapping[] => {
  switch (crmType) {
    case 'salesforce':
      return [
        { crmField: 'Subject', crmFieldType: 'standard', sourceField: 'title', isRequired: true },
        { crmField: 'Description', crmFieldType: 'standard', sourceField: 'summary', isRequired: false },
        { crmField: 'Call_Duration__c', crmFieldType: 'custom', sourceField: 'duration', isRequired: false },
        { crmField: 'Action_Items__c', crmFieldType: 'custom', sourceField: 'action_items', isRequired: false },
        { crmField: 'Key_Points__c', crmFieldType: 'custom', sourceField: 'key_points', isRequired: false },
      ];
    case 'hubspot':
      return [
        { crmField: 'hs_call_title', crmFieldType: 'standard', sourceField: 'title', isRequired: true },
        { crmField: 'hs_call_body', crmFieldType: 'standard', sourceField: 'summary', isRequired: false },
        { crmField: 'hs_call_duration', crmFieldType: 'standard', sourceField: 'duration', isRequired: false },
        { crmField: 'action_items', crmFieldType: 'custom', sourceField: 'action_items', isRequired: false },
        { crmField: 'key_points', crmFieldType: 'custom', sourceField: 'key_points', isRequired: false },
      ];
    default:
      return [];
  }
};

// Default CRM configurations
export const getDefaultCrmConfig = (crmType: CrmType): CrmIntegrationConfig => {
  return {
    crmType,
    enabled: true,
    mappings: getDefaultFieldMappings(crmType),
    autoSyncTranscripts: true,
    autoSyncRecordings: true,
    syncNotes: true,
  };
};

// Save CRM configuration to localStorage
export const saveCrmConfig = (config: CrmIntegrationConfig): void => {
  localStorage.setItem('crmConfig', JSON.stringify(config));
};

// Load CRM configuration from localStorage
export const loadCrmConfig = (): CrmIntegrationConfig | null => {
  const configString = localStorage.getItem('crmConfig');
  if (!configString) return null;
  
  try {
    return JSON.parse(configString) as CrmIntegrationConfig;
  } catch (err) {
    console.error('Failed to parse CRM config from localStorage:', err);
    return null;
  }
};

// Mock function for extracting insights from transcript
// In a real implementation, this would use an AI model
export const extractInsightsFromTranscript = (transcript: string): TranscriptInsight => {
  // This is a mock implementation
  // In a real app, this would use an AI service to analyze the transcript
  return {
    summary: `This was a discussion about ${transcript.substring(0, 50)}...`,
    keyPoints: [
      'Customer expressed interest in premium tier',
      'Price point was discussed',
      'Follow-up demo scheduled for next week'
    ],
    actionItems: [
      'Send pricing document by EOD',
      'Schedule technical team for next demo',
      'Prepare custom implementation plan'
    ],
    sentimentScore: 0.65,
    nextSteps: 'Schedule follow-up call in 5 days',
    topics: [
      { name: 'pricing', occurrences: 12, sentiment: 0.3 },
      { name: 'implementation', occurrences: 8, sentiment: 0.7 },
      { name: 'timeline', occurrences: 5, sentiment: 0.5 }
    ]
  };
};

// Format insights for CRM field mapping
export const formatInsightsForCrm = (insights: TranscriptInsight): Record<string, string> => {
  return {
    summary: insights.summary,
    action_items: insights.actionItems.join('\n• '),
    key_points: insights.keyPoints.join('\n• '),
  };
};
