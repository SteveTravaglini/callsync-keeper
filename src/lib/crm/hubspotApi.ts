
import { CrmIntegrationConfig, CrmSyncResult, TranscriptInsight } from '@/lib/types';
import { formatInsightsForCrm } from './crmUtils';

export interface HubspotCallData {
  recordingId: string;
  title: string;
  date: string;
  duration: number;
  transcriptText?: string;
  contactId?: string;
  dealId?: string;
  insights?: TranscriptInsight;
}

export const syncToHubspot = async (
  config: CrmIntegrationConfig,
  callData: HubspotCallData
): Promise<CrmSyncResult> => {
  if (!config.apiKey) {
    return {
      success: false,
      error: "No HubSpot API key provided",
      syncedFields: []
    };
  }

  try {
    // In a real implementation, this would make API calls to HubSpot
    console.log('Syncing to HubSpot:', callData);
    
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const syncedFields: string[] = [];
    
    // Process field mappings
    for (const mapping of config.mappings) {
      let value: string | number | undefined;
      
      // Get the source value based on the mapping
      if (mapping.sourceField === 'title') {
        value = callData.title;
      } else if (mapping.sourceField === 'date') {
        value = callData.date;
      } else if (mapping.sourceField === 'duration') {
        value = callData.duration;
      } else if (mapping.sourceField === 'transcript' && callData.transcriptText) {
        value = callData.transcriptText;
      } else if (callData.insights) {
        const formattedInsights = formatInsightsForCrm(callData.insights);
        value = formattedInsights[mapping.sourceField];
      }
      
      if (value !== undefined) {
        syncedFields.push(mapping.crmField);
      }
    }

    return {
      success: true,
      recordId: `hs-${Date.now()}`,
      syncedFields
    };
  } catch (error) {
    console.error('HubSpot sync error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      syncedFields: []
    };
  }
};
