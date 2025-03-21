
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FileOutput, Wand2 } from 'lucide-react';
import { ContentTemplate, GeneratedContent } from '@/lib/types';
import { mockTemplates } from '@/lib/knowledge/mockData';
import { generateContentFromTemplate } from '@/lib/knowledge/templateService';
import { Badge } from '@/components/ui/badge';

interface TemplateGeneratorProps {
  companyId: string;
  onGenerate: (content: GeneratedContent) => void;
}

const TemplateGenerator = ({ companyId, onGenerate }: TemplateGeneratorProps) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  
  const selectedTemplate = mockTemplates.find(t => t.id === selectedTemplateId);
  
  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = await generateContentFromTemplate(selectedTemplate, companyId);
      onGenerate(result);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <Label htmlFor="template-select" className="text-sm font-medium mb-1.5 block">Select a template</Label>
          <Select
            value={selectedTemplateId}
            onValueChange={setSelectedTemplateId}
          >
            <SelectTrigger id="template-select" className="h-10 rounded-xl">
              <SelectValue placeholder="Choose a template" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              {mockTemplates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-1 flex items-end">
          <Button 
            className="w-full rounded-xl h-10" 
            disabled={!selectedTemplateId || isGenerating}
            onClick={handleGenerate}
          >
            {isGenerating ? (
              <>
                <Wand2 className="h-4 w-4 mr-2 animate-pulse" />
                Generating...
              </>
            ) : (
              <>
                <FileOutput className="h-4 w-4 mr-2" />
                Generate
              </>
            )}
          </Button>
        </div>
      </div>
      
      {selectedTemplate && (
        <Card className="p-4 rounded-xl bg-muted/50 border-border/30">
          <p className="text-sm text-muted-foreground">{selectedTemplate.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedTemplate.variables.map(variable => (
              <Badge key={variable.name} variant="outline" className="text-xs px-2 py-1 font-normal">
                {variable.name}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default TemplateGenerator;
