
import { CrmIntegrationConfig, CrmSyncResult, TranscriptInsight } from '@/lib/types';
import { formatInsightsForCrm } from './crmUtils';

export interface SalesforceCallData {
  recordingId: string;
  title: string;
  date: string;
  duration: number;
  transcriptText?: string;
  insights?: TranscriptInsight;
}

export const syncToSalesforce = async (
  config: CrmIntegrationConfig,
  callData: SalesforceCallData
): Promise<CrmSyncResult> => {
  if (!config.apiKey) {
    return {
      success: false,
      error: "No Salesforce API key provided",
      syncedFields: []
    };
  }

  try {
    // In a real implementation, this would make API calls to Salesforce
    console.log('Syncing to Salesforce:', callData);
    
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
      recordId: `sf-${Date.now()}`,
      syncedFields
    };
  } catch (error) {
    console.error('Salesforce sync error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      syncedFields: []
    };
  }
};
