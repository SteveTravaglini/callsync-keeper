
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { CrmType, CrmIntegrationConfig, CrmFieldMapping } from '@/lib/types';
import { getDefaultCrmConfig, loadCrmConfig, saveCrmConfig } from '@/lib/crm/crmUtils';
import { testCrmConnection } from '@/lib/crm/crmService';
import { toast } from '@/components/ui/use-toast';
import { Database, HelpCircle } from 'lucide-react';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import FieldMappingsTable from './FieldMappingsTable';

const crmConfigSchema = z.object({
  apiKey: z.string().min(1, { message: "API key is required" }),
  autoSyncTranscripts: z.boolean(),
  autoSyncRecordings: z.boolean(),
  syncNotes: z.boolean(),
});

const CrmSettings = () => {
  const [activeTab, setActiveTab] = useState<CrmType>('salesforce');
  const [config, setConfig] = useState<CrmIntegrationConfig | null>(null);
  const [isTesting, setIsTesting] = useState(false);
  
  const form = useForm<z.infer<typeof crmConfigSchema>>({
    resolver: zodResolver(crmConfigSchema),
    defaultValues: {
      apiKey: '',
      autoSyncTranscripts: true,
      autoSyncRecordings: true,
      syncNotes: true,
    },
  });

  // Load the config on component mount and when the active tab changes
  useEffect(() => {
    const savedConfig = loadCrmConfig();
    
    if (savedConfig && savedConfig.crmType === activeTab) {
      setConfig(savedConfig);
      
      // Update form values
      form.reset({
        apiKey: savedConfig.apiKey || '',
        autoSyncTranscripts: savedConfig.autoSyncTranscripts,
        autoSyncRecordings: savedConfig.autoSyncRecordings,
        syncNotes: savedConfig.syncNotes,
      });
    } else {
      // If no config is saved or the tab changed, use default config
      const defaultConfig = getDefaultCrmConfig(activeTab);
      setConfig(defaultConfig);
      
      // Reset form with default values
      form.reset({
        apiKey: '',
        autoSyncTranscripts: defaultConfig.autoSyncTranscripts,
        autoSyncRecordings: defaultConfig.autoSyncRecordings,
        syncNotes: defaultConfig.syncNotes,
      });
    }
  }, [activeTab, form]);

  const onSubmit = async (values: z.infer<typeof crmConfigSchema>) => {
    if (!config) return;
    
    const updatedConfig: CrmIntegrationConfig = {
      ...config,
      apiKey: values.apiKey,
      autoSyncTranscripts: values.autoSyncTranscripts,
      autoSyncRecordings: values.autoSyncRecordings,
      syncNotes: values.syncNotes,
    };
    
    saveCrmConfig(updatedConfig);
    setConfig(updatedConfig);
    
    toast({
      title: "Settings Saved",
      description: `Your ${activeTab === 'salesforce' ? 'Salesforce' : 'HubSpot'} settings have been saved.`,
    });
  };

  const handleTestConnection = async () => {
    if (!config || !config.apiKey) {
      toast({
        title: "Error",
        description: "Please enter an API key before testing the connection.",
        variant: "destructive",
      });
      return;
    }
    
    setIsTesting(true);
    
    try {
      const result = await testCrmConnection(config);
      
      if (result.success) {
        toast({
          title: "Connection Successful",
          description: result.message,
        });
      } else {
        toast({
          title: "Connection Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "An unexpected error occurred while testing the connection.",
        variant: "destructive",
      });
    } finally {
      setIsTesting(false);
    }
  };

  const updateFieldMappings = (mappings: CrmFieldMapping[]) => {
    if (!config) return;
    
    const updatedConfig: CrmIntegrationConfig = {
      ...config,
      mappings,
    };
    
    saveCrmConfig(updatedConfig);
    setConfig(updatedConfig);
    
    toast({
      title: "Field Mappings Updated",
      description: "Your field mapping settings have been saved.",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          CRM Integration Settings
        </CardTitle>
        <CardDescription>
          Configure how call recordings and transcripts sync with your CRM
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="salesforce" value={activeTab} onValueChange={(value) => setActiveTab(value as CrmType)}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="salesforce">Salesforce</TabsTrigger>
            <TabsTrigger value="hubspot">HubSpot</TabsTrigger>
          </TabsList>
          
          {['salesforce', 'hubspot'].map((crmType) => (
            <TabsContent key={crmType} value={crmType}>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder={`Enter your ${crmType === 'salesforce' ? 'Salesforce' : 'HubSpot'} API key`} 
                              {...field}
                              type="password"
                              autoComplete="off"
                            />
                          </FormControl>
                          <FormDescription className="flex items-center gap-1">
                            <HelpCircle className="h-3 w-3" />
                            This key will be used to authenticate with the {crmType === 'salesforce' ? 'Salesforce' : 'HubSpot'} API
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-4">
                      <FormField
                        control={form.control}
                        name="autoSyncRecordings"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Auto-sync Recordings</FormLabel>
                              <FormDescription>
                                Automatically sync new recordings to your CRM
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="autoSyncTranscripts"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>Auto-sync Transcripts</FormLabel>
                              <FormDescription>
                                Automatically sync transcripts when they become available
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="syncNotes"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between rounded-lg border p-3">
                            <div className="space-y-0.5">
                              <FormLabel>AI-Generated Notes</FormLabel>
                              <FormDescription>
                                Extract and sync AI-generated summaries, action items, and key points
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch 
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button type="submit">Save Settings</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleTestConnection}
                      disabled={isTesting}
                    >
                      {isTesting ? 'Testing...' : 'Test Connection'}
                    </Button>
                  </div>
                </form>
              </Form>
              
              {config && (
                <div className="mt-8">
                  <h3 className="text-lg font-medium mb-4">Field Mappings</h3>
                  <FieldMappingsTable 
                    mappings={config.mappings} 
                    onUpdate={updateFieldMappings} 
                    crmType={crmType as CrmType}
                  />
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CrmSettings;
