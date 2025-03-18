
import { CrmType, CrmIntegrationConfig, CrmSyncResult, TranscriptInsight } from '@/lib/types';
import { syncToSalesforce, SalesforceCallData } from './salesforceApi';
import { syncToHubspot, HubspotCallData } from './hubspotApi';
import { extractInsightsFromTranscript } from './crmUtils';

export interface CallData {
  recordingId: string;
  title: string;
  date: string;
  duration: number;
  transcriptText?: string;
  contactId?: string;
  dealId?: string;
}

export const syncToCrm = async (
  config: CrmIntegrationConfig,
  callData: CallData
): Promise<CrmSyncResult> => {
  // Extract insights from transcript if available
  let insights: TranscriptInsight | undefined;
  if (callData.transcriptText && config.syncNotes) {
    insights = extractInsightsFromTranscript(callData.transcriptText);
  }

  // Call the appropriate CRM API based on the config
  switch (config.crmType) {
    case 'salesforce':
      return syncToSalesforce(config, {
        ...callData,
        insights
      } as SalesforceCallData);
    
    case 'hubspot':
      return syncToHubspot(config, {
        ...callData,
        insights
      } as HubspotCallData);
    
    default:
      return {
        success: false,
        error: `Unsupported CRM type: ${config.crmType}`,
        syncedFields: []
      };
  }
};

// Helper function for testing CRM connection
export const testCrmConnection = async (
  config: CrmIntegrationConfig
): Promise<{ success: boolean; message: string }> => {
  try {
    // This would be a real API call in production
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation check
    if (!config.apiKey) {
      return { success: false, message: "API key is required" };
    }
    
    return { 
      success: true, 
      message: `Successfully connected to ${config.crmType === 'salesforce' ? 'Salesforce' : 'HubSpot'}` 
    };
  } catch (error) {
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Connection failed" 
    };
  }
};
