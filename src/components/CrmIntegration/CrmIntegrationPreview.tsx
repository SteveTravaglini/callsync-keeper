
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { extractInsightsFromTranscript, formatInsightsForCrm } from '@/lib/crm/crmUtils';
import { saveCrmConfig, getDefaultCrmConfig } from '@/lib/crm/crmUtils';
import { Database, MessageSquare, Zap, CheckCircle, Clock, GanttChart } from 'lucide-react';
import { TranscriptInsight, CrmType } from '@/lib/types';
import FieldMappingsTable from './FieldMappingsTable';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const CrmIntegrationPreview = () => {
  const [activeTab, setActiveTab] = useState<CrmType>('salesforce');
  const navigate = useNavigate();
  
  // Sample transcript text
  const sampleTranscript = `
  John: Hi Sarah, thanks for joining the call today. I wanted to discuss our enterprise plan options.
  Sarah: Hi John, glad to be here. Yes, I'm particularly interested in the implementation timeline and how it would work with our existing systems.
  John: Great question. Typically, our implementation takes about 4-6 weeks, depending on the complexity of your systems.
  Sarah: That sounds reasonable. And what about pricing for the enterprise tier?
  John: The enterprise tier starts at $1,500 per month with annual billing. That includes all features plus premium support.
  Sarah: OK, and can you send over some case studies from similar companies in our industry?
  John: Absolutely, I'll email those over by end of day. Would it make sense to schedule a technical demo next week with our implementation team?
  Sarah: Yes, that would be great. Let's plan for next Tuesday if possible.
  John: Perfect, I'll send over a calendar invite. Is there anything else you'd like to discuss today?
  Sarah: I think that covers it for now. Thanks for your time.
  `;
  
  // Generate AI insights
  const insights: TranscriptInsight = extractInsightsFromTranscript(sampleTranscript);
  
  // Format for CRM display
  const crmFormatted = formatInsightsForCrm(insights);
  
  const handleConfigureClick = () => {
    navigate('/settings/crm');
  };
  
  const handleSetupClick = () => {
    // Save a default config to localStorage for demo purposes
    const config = getDefaultCrmConfig(activeTab);
    config.apiKey = 'demo-api-key-123';
    saveCrmConfig(config);
    
    toast({
      title: "Demo Configuration Saved",
      description: `A demo ${activeTab === 'salesforce' ? 'Salesforce' : 'HubSpot'} configuration has been set up for you to explore.`,
    });
  };
  
  return (
    <div className="space-y-8">
      <Card className="border-blue-200 shadow-md">
        <CardHeader className="bg-blue-50 dark:bg-blue-950 border-b">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Database className="h-5 w-5 text-blue-500" />
            CRM Integration Demo
          </CardTitle>
          <CardDescription>
            Automatically extract valuable insights from your call recordings and sync them to your CRM
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="insights" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
              <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
              <TabsTrigger value="preview">CRM Preview</TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-violet-500" />
                      AI-Generated Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {insights.summary}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Clock className="h-4 w-4 text-amber-500" />
                      Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {insights.nextSteps}
                    </p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-amber-50 text-amber-900 dark:bg-amber-900 dark:text-amber-50 border-amber-200">
                        Scheduled: Technical Demo
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      Action Items
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="text-sm space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                      {insights.actionItems.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      Key Points
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="text-sm space-y-1 list-disc list-inside text-gray-700 dark:text-gray-300">
                      {insights.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <GanttChart className="h-4 w-4 text-blue-500" />
                    Topic Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {insights.topics.map((topic, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium">{topic.name}</span>
                          <Badge variant={topic.sentiment > 0.5 ? "success" : topic.sentiment < 0.3 ? "destructive" : "secondary"}>
                            {topic.sentiment > 0.5 ? "Positive" : topic.sentiment < 0.3 ? "Negative" : "Neutral"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-500">
                          Mentioned {topic.occurrences} times
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="mapping">
              <div className="space-y-4">
                <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CrmType)}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="salesforce">Salesforce</TabsTrigger>
                    <TabsTrigger value="hubspot">HubSpot</TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="border-b pb-4 mb-4">
                  <h3 className="text-lg font-medium mb-4">Map AI-Extracted Data to {activeTab === 'salesforce' ? 'Salesforce' : 'HubSpot'} Fields</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Customize how Winrate maps transcript insights to your {activeTab === 'salesforce' ? 'Salesforce' : 'HubSpot'} fields.
                    Add both standard and custom fields to create the perfect workflow for your team.
                  </p>
                </div>
                
                <FieldMappingsTable 
                  mappings={getDefaultCrmConfig(activeTab).mappings}
                  onUpdate={() => {}}
                  crmType={activeTab} 
                />
                
                <div className="flex gap-3 mt-6">
                  <Button onClick={handleSetupClick}>
                    Setup Demo Configuration
                  </Button>
                  <Button variant="outline" onClick={handleConfigureClick}>
                    <Database className="h-4 w-4 mr-2" />
                    Configure CRM Settings
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview">
              <div className="space-y-4">
                <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <h3 className="text-lg font-medium mb-2">{activeTab === 'salesforce' ? 'Salesforce' : 'HubSpot'} Record Preview</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Here's how the data will appear in your {activeTab === 'salesforce' ? 'Salesforce' : 'HubSpot'} instance:
                  </p>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                      <div className="font-medium">Field</div>
                      <div className="font-medium col-span-2">Value</div>
                    </div>
                    
                    {activeTab === 'salesforce' ? (
                      <>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">Subject</div>
                          <div className="col-span-2 font-medium">Enterprise Plan Discussion with Sarah</div>
                        </div>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">Description</div>
                          <div className="col-span-2">{insights.summary}</div>
                        </div>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">Call_Duration__c</div>
                          <div className="col-span-2">15 minutes</div>
                        </div>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">Action_Items__c</div>
                          <div className="col-span-2 whitespace-pre-line">{crmFormatted.action_items}</div>
                        </div>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">Key_Points__c</div>
                          <div className="col-span-2 whitespace-pre-line">{crmFormatted.key_points}</div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">hs_call_title</div>
                          <div className="col-span-2 font-medium">Enterprise Plan Discussion with Sarah</div>
                        </div>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">hs_call_body</div>
                          <div className="col-span-2">{insights.summary}</div>
                        </div>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">hs_call_duration</div>
                          <div className="col-span-2">15 minutes</div>
                        </div>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">action_items</div>
                          <div className="col-span-2 whitespace-pre-line">{crmFormatted.action_items}</div>
                        </div>
                        <div className="grid grid-cols-3 p-3 bg-white dark:bg-gray-800 rounded border">
                          <div className="text-gray-600">key_points</div>
                          <div className="col-span-2 whitespace-pre-line">{crmFormatted.key_points}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center gap-2 text-green-800 dark:text-green-300 font-medium mb-2">
                    <CheckCircle className="h-5 w-5" />
                    Automatic CRM Sync
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    When enabled, Winrate will automatically extract insights from your call recordings
                    and sync them to your CRM without any manual intervention.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CrmIntegrationPreview;
