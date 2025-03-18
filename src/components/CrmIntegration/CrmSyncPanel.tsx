
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CrmType, Recording, Transcript, CrmSyncResult } from '@/lib/types';
import { loadCrmConfig } from '@/lib/crm/crmUtils';
import { syncToCrm, CallData } from '@/lib/crm/crmService';
import { toast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Database, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CrmSyncPanelProps {
  recording: Recording;
  transcript?: Transcript;
}

const CrmSyncPanel = ({ recording, transcript }: CrmSyncPanelProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<CrmSyncResult | null>(null);
  const navigate = useNavigate();
  
  const crmConfig = loadCrmConfig();
  
  const handleSync = async () => {
    if (!crmConfig) {
      toast({
        title: "CRM Not Configured",
        description: "Please configure your CRM integration first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const callData: CallData = {
        recordingId: recording.id,
        title: recording.title,
        date: recording.date,
        duration: recording.duration,
        transcriptText: transcript?.fullText,
      };
      
      const result = await syncToCrm(crmConfig, callData);
      setLastSyncResult(result);
      
      if (result.success) {
        toast({
          title: "Sync Successful",
          description: `Successfully synced to ${crmConfig.crmType === 'salesforce' ? 'Salesforce' : 'HubSpot'}`,
        });
      } else {
        toast({
          title: "Sync Failed",
          description: result.error || "An unknown error occurred",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Sync Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConfigureCrm = () => {
    // Navigate to CRM settings page
    navigate('/settings/crm');
  };
  
  if (!crmConfig) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            CRM Integration
          </CardTitle>
          <CardDescription>
            Sync this recording and transcript to your CRM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              CRM integration is not configured. Set up your CRM integration to automatically sync recordings and transcripts.
            </p>
            <Button onClick={handleConfigureCrm}>Configure CRM</Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          CRM Integration
        </CardTitle>
        <CardDescription>
          Sync this recording and transcript to {crmConfig.crmType === 'salesforce' ? 'Salesforce' : 'HubSpot'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Connection Status</p>
              <div className="flex items-center mt-1">
                <Badge variant="outline" className="mr-2">
                  {crmConfig.crmType === 'salesforce' ? 'Salesforce' : 'HubSpot'}
                </Badge>
                {crmConfig.apiKey ? (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                    <XCircle className="h-3 w-3 mr-1" />
                    API Key Missing
                  </Badge>
                )}
              </div>
            </div>
            
            <Button 
              onClick={handleSync} 
              disabled={isLoading || !crmConfig.apiKey}
              className="flex items-center"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Sync to CRM
                </>
              )}
            </Button>
          </div>
          
          {lastSyncResult && (
            <div className="rounded-md border p-4 mt-4">
              <div className="flex items-center gap-2 mb-2">
                {lastSyncResult.success ? (
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Success
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="h-3 w-3 mr-1" />
                    Failed
                  </Badge>
                )}
                <span className="text-sm text-muted-foreground">
                  Last sync: {new Date().toLocaleTimeString()}
                </span>
              </div>
              
              {lastSyncResult.success ? (
                <>
                  <p className="text-sm mb-2">
                    Successfully synced to {crmConfig.crmType === 'salesforce' ? 'Salesforce' : 'HubSpot'}
                    {lastSyncResult.recordId && <span className="ml-1">with ID: {lastSyncResult.recordId}</span>}
                  </p>
                  {lastSyncResult.syncedFields.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-1">Synced fields:</p>
                      <div className="flex flex-wrap gap-1">
                        {lastSyncResult.syncedFields.map((field) => (
                          <Badge key={field} variant="outline" className="text-xs">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <p className="text-sm text-red-500">
                  {lastSyncResult.error || "Unknown error occurred"}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CrmSyncPanel;
