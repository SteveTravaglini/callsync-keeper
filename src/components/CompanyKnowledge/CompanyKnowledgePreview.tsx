
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Building, FileText, Mail, Globe, BrainCircuit, FileOutput } from 'lucide-react';
import { Company, KnowledgeBase, ContentTemplate, GeneratedContent } from '@/lib/types';
import { mockCompanies, mockTemplates } from '@/lib/knowledge/mockData';
import KnowledgeBaseInsights from './KnowledgeBaseInsights';
import TemplateGenerator from './TemplateGenerator';

const CompanyKnowledgePreview = () => {
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(mockCompanies[0].id);
  const [activeTab, setActiveTab] = useState<string>('insights');
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  
  const selectedCompany = mockCompanies.find(company => company.id === selectedCompanyId);
  
  const handleGenerateContent = (content: GeneratedContent) => {
    setGeneratedContent(content);
    setActiveTab('generated');
  };
  
  return (
    <Card className="border-2 shadow-lg">
      <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-blue-600" />
            <CardTitle>Company Knowledge Base</CardTitle>
          </div>
          <Badge variant="outline" className="px-3 py-1 bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            Preview
          </Badge>
        </div>
        <CardDescription>
          Accumulate knowledge from transcripts and other sources to build company intelligence
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Select Company</h3>
              <div className="space-y-2">
                {mockCompanies.map(company => (
                  <Card 
                    key={company.id}
                    className={`cursor-pointer transition-all ${selectedCompanyId === company.id 
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                      : 'hover:border-gray-300'}`}
                    onClick={() => setSelectedCompanyId(company.id)}
                  >
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                        <Building className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{company.name}</h4>
                        <p className="text-xs text-gray-500">{company.industry}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-500">Content Templates</h3>
              <div className="space-y-2">
                {mockTemplates.map(template => (
                  <Card key={template.id} className="hover:border-gray-300">
                    <CardContent className="p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                        <FileOutput className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <p className="text-xs text-gray-500">{template.type} template</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            {selectedCompany && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="insights">Knowledge Insights</TabsTrigger>
                  <TabsTrigger value="generated">Generated Content</TabsTrigger>
                </TabsList>
                
                <TabsContent value="insights" className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{selectedCompany.name}</CardTitle>
                      <CardDescription>
                        {selectedCompany.website} • {selectedCompany.industry} • {selectedCompany.size}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <KnowledgeBaseInsights companyId={selectedCompany.id} />
                      
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Generate Content</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Create a document using knowledge from transcripts and other sources
                        </p>
                        <TemplateGenerator 
                          companyId={selectedCompany.id} 
                          onGenerate={handleGenerateContent}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="generated">
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          {generatedContent?.title || "Generated Content"}
                        </CardTitle>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                      </div>
                      <CardDescription>
                        Template: {mockTemplates.find(t => t.id === generatedContent?.templateId)?.name || 'Custom'} • Generated: {generatedContent ? new Date(generatedContent.createdAt).toLocaleDateString() : 'Not yet generated'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {generatedContent ? (
                        <div className="prose dark:prose-invert max-w-none">
                          <div dangerouslySetInnerHTML={{ __html: generatedContent.content }} />
                        </div>
                      ) : (
                        <div className="text-center py-12">
                          <FileOutput className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium mb-2">No content generated yet</h3>
                          <p className="text-gray-500 mb-4">
                            Select a template and generate content based on company knowledge
                          </p>
                          <Button onClick={() => setActiveTab('insights')}>
                            Create Content
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyKnowledgePreview;
