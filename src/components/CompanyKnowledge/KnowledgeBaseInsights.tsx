
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { FileText, Mail, Building, Globe, Clock } from 'lucide-react';
import { mockKnowledgeBases, mockKnowledgeSegments } from '@/lib/knowledge/mockData';

interface KnowledgeBaseInsightsProps {
  companyId: string;
}

const KnowledgeBaseInsights = ({ companyId }: KnowledgeBaseInsightsProps) => {
  const [activeSourceTab, setActiveSourceTab] = useState('transcripts');
  
  const knowledgeBase = mockKnowledgeBases.find(kb => kb.companyId === companyId);
  const segments = mockKnowledgeSegments.filter(segment => 
    segment.knowledgeBaseId === knowledgeBase?.id && segment.sourceType === activeSourceTab.slice(0, -1)
  );
  
  if (!knowledgeBase) {
    return <div>Knowledge base not found</div>;
  }
  
  const transcriptCount = knowledgeBase.transcriptIds.length;
  const emailCount = knowledgeBase.emailIds.length;
  const crmCount = knowledgeBase.crmActivityIds.length;
  const webCount = knowledgeBase.webResearchIds.length;
  const totalItems = transcriptCount + emailCount + crmCount + webCount;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-4 sm:col-span-1">
          <div className="text-xs text-gray-500 mb-1">Knowledge Sources</div>
          <div className="text-2xl font-semibold">{totalItems}</div>
          <div className="mt-1 text-xs">Last updated: {new Date(knowledgeBase.lastUpdated).toLocaleDateString()}</div>
        </div>
        
        <div className="col-span-4 sm:col-span-3">
          <div className="flex flex-wrap gap-2 items-center mb-2">
            <Badge className="flex items-center gap-1 bg-blue-100 text-blue-800 hover:bg-blue-200">
              <FileText className="h-3 w-3" /> {transcriptCount} Transcripts
            </Badge>
            <Badge className="flex items-center gap-1 bg-purple-100 text-purple-800 hover:bg-purple-200">
              <Mail className="h-3 w-3" /> {emailCount} Emails
            </Badge>
            <Badge className="flex items-center gap-1 bg-orange-100 text-orange-800 hover:bg-orange-200">
              <Building className="h-3 w-3" /> {crmCount} CRM Activities
            </Badge>
            <Badge className="flex items-center gap-1 bg-green-100 text-green-800 hover:bg-green-200">
              <Globe className="h-3 w-3" /> {webCount} Web Research
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span>Transcripts</span>
              <span>{Math.round((transcriptCount/totalItems)*100)}%</span>
            </div>
            <Progress value={(transcriptCount/totalItems)*100} className="h-1.5" />
            
            <div className="flex justify-between items-center text-xs">
              <span>Emails</span>
              <span>{Math.round((emailCount/totalItems)*100)}%</span>
            </div>
            <Progress value={(emailCount/totalItems)*100} className="h-1.5" />
            
            <div className="flex justify-between items-center text-xs">
              <span>CRM Activities</span>
              <span>{Math.round((crmCount/totalItems)*100)}%</span>
            </div>
            <Progress value={(crmCount/totalItems)*100} className="h-1.5" />
            
            <div className="flex justify-between items-center text-xs">
              <span>Web Research</span>
              <span>{Math.round((webCount/totalItems)*100)}%</span>
            </div>
            <Progress value={(webCount/totalItems)*100} className="h-1.5" />
          </div>
        </div>
      </div>
      
      <Separator />
      
      <Tabs value={activeSourceTab} onValueChange={setActiveSourceTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="transcripts" className="text-xs">Transcripts</TabsTrigger>
          <TabsTrigger value="emails" className="text-xs">Emails</TabsTrigger>
          <TabsTrigger value="crms" className="text-xs">CRM</TabsTrigger>
          <TabsTrigger value="webs" className="text-xs">Web</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transcripts" className="space-y-3 mt-3">
          {segments.length > 0 ? segments.map((segment, idx) => (
            <div key={segment.id} className="border rounded-md p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <FileText className="h-4 w-4 text-blue-600" />
                <div className="text-sm font-medium">Weekly Team Meeting</div>
                <Badge variant="outline" className="ml-auto text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(segment.date).toLocaleDateString()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{segment.content}</p>
            </div>
          )) : (
            <div className="text-center py-6 text-gray-500">
              No transcript data available
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="emails" className="space-y-3 mt-3">
          {segments.length > 0 ? segments.map((segment, idx) => (
            <div key={segment.id} className="border rounded-md p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Mail className="h-4 w-4 text-purple-600" />
                <div className="text-sm font-medium">RE: Proposal Follow-up</div>
                <Badge variant="outline" className="ml-auto text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(segment.date).toLocaleDateString()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{segment.content}</p>
            </div>
          )) : (
            <div className="text-center py-6 text-gray-500">
              No email data available
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="crms" className="space-y-3 mt-3">
          {segments.length > 0 ? segments.map((segment, idx) => (
            <div key={segment.id} className="border rounded-md p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Building className="h-4 w-4 text-orange-600" />
                <div className="text-sm font-medium">Deal Stage Update</div>
                <Badge variant="outline" className="ml-auto text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(segment.date).toLocaleDateString()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{segment.content}</p>
            </div>
          )) : (
            <div className="text-center py-6 text-gray-500">
              No CRM data available
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="webs" className="space-y-3 mt-3">
          {segments.length > 0 ? segments.map((segment, idx) => (
            <div key={segment.id} className="border rounded-md p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <Globe className="h-4 w-4 text-green-600" />
                <div className="text-sm font-medium">Company News</div>
                <Badge variant="outline" className="ml-auto text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(segment.date).toLocaleDateString()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{segment.content}</p>
            </div>
          )) : (
            <div className="text-center py-6 text-gray-500">
              No web research data available
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default KnowledgeBaseInsights;
