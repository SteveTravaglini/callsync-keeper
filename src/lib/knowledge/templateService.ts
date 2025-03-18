import { ContentTemplate, GeneratedContent, Company } from '@/lib/types';
import { mockCompanies, mockKnowledgeBases, mockKnowledgeSegments } from './mockData';

// Helper function to extract insights from knowledge base
const extractInsightsFromKnowledgeBase = (companyId: string) => {
  const company = mockCompanies.find(c => c.id === companyId);
  const knowledgeBase = mockKnowledgeBases.find(kb => kb.companyId === companyId);
  
  if (!company || !knowledgeBase) {
    throw new Error('Company or knowledge base not found');
  }
  
  // Get all segments for this knowledge base
  const segments = mockKnowledgeSegments.filter(
    seg => seg.knowledgeBaseId === knowledgeBase.id
  );
  
  // Extract key points from transcript segments
  const transcriptSegments = segments.filter(seg => seg.sourceType === 'transcript');
  const keyPoints = transcriptSegments.map(seg => seg.content.substring(0, 100) + '...');
  
  // Generate a summary
  const summary = `Based on our analysis of ${segments.length} knowledge sources about ${company.name}, 
    including ${transcriptSegments.length} meeting transcripts, we've identified several key insights 
    about their business needs and challenges.`;
  
  // Extract action items and next steps
  const actionItems = [
    'Schedule follow-up demo with technical team',
    'Share ROI calculation spreadsheet',
    'Introduce customer success team members'
  ];
  
  const nextSteps = `Our recommended next step is to schedule a technical deep dive 
    with ${company.name}'s IT team to discuss implementation details.`;
  
  // Return structured insights
  return {
    summary,
    keyPoints: keyPoints.slice(0, 3), // Limit to 3 key points
    actionItems,
    nextSteps,
    sentimentScore: 0.75,
    topics: [
      { name: 'implementation', occurrences: 4, sentiment: 0.8 },
      { name: 'security', occurrences: 3, sentiment: 0.6 },
      { name: 'budget', occurrences: 2, sentiment: 0.7 }
    ]
  };
};

// Function to fill template variables with actual values
const fillTemplateVariables = (
  template: ContentTemplate,
  companyId: string
): { content: string; variables: Record<string, any> } => {
  const company = mockCompanies.find(c => c.id === companyId);
  if (!company) {
    throw new Error('Company not found');
  }
  
  const insights = extractInsightsFromKnowledgeBase(companyId);
  
  // Prepare all variable values
  const variableValues: Record<string, any> = {};
  
  template.variables.forEach(variable => {
    const { name, source, path, defaultValue } = variable;
    
    // Extract value based on source and path
    let value = defaultValue;
    
    if (source === 'company' && company) {
      const keys = path.split('.');
      let current: any = company;
      
      for (const key of keys) {
        if (current && key in current) {
          current = current[key];
        } else {
          current = null;
          break;
        }
      }
      
      if (current !== null) {
        value = current;
      }
    }
    else if (source === 'knowledgeBase' && insights) {
      const keys = path.split('.');
      let current: any = insights;
      
      for (const key of keys) {
        if (current && key in current) {
          current = current[key];
        } else {
          current = null;
          break;
        }
      }
      
      if (current !== null) {
        value = current;
      }
    }
    else if (source === 'custom') {
      // For demo purposes, we'll provide some sample custom values
      switch (name) {
        case 'generatedDate':
          value = new Date().toLocaleDateString();
          break;
        case 'proposedSolution':
          value = `Our comprehensive platform will address ${company.name}'s challenges by providing a scalable, secure infrastructure that reduces operational costs while ensuring compliance with all relevant regulations.`;
          break;
        case 'outcomes':
          value = [
            '30% reduction in infrastructure costs',
            'Improved scalability and performance',
            'Full compliance with GDPR and CCPA requirements',
            'Enhanced security posture'
          ];
          break;
        case 'executiveSummary':
          value = `This ROI analysis demonstrates how our solution will provide ${company.name} with significant cost savings and operational improvements over a 3-year period.`;
          break;
        case 'financialMetrics':
          value = [
            { name: 'Annual Infrastructure Costs', before: '$1.2M', after: '$840K', impact: '30% decrease' },
            { name: 'Operational Efficiency', before: '65%', after: '85%', impact: '20% improvement' },
            { name: 'Security Incidents', before: '12/year', after: '3/year', impact: '75% reduction' },
            { name: 'Time to Market', before: '6 months', after: '2 months', impact: '66% faster' }
          ];
          break;
        case 'expectedRoi':
          value = 'Based on our analysis, we project a 275% ROI over 3 years with a payback period of 9 months.';
          break;
        case 'stakeholders':
          value = [
            { name: 'John Smith', title: 'CTO', email: 'john.smith@example.com' },
            { name: 'Sarah Johnson', title: 'CISO', email: 'sarah.j@example.com' },
            { name: 'Michael Chang', title: 'VP of Engineering', email: 'michael.c@example.com' }
          ];
          break;
        case 'riskFactors':
          value = [
            { factor: 'Integration Complexity', mitigation: 'Dedicated integration team with weekly check-ins' },
            { factor: 'Data Migration', mitigation: 'Phased migration approach with validation at each step' },
            { factor: 'User Adoption', mitigation: 'Comprehensive training program and champions network' }
          ];
          break;
        default:
          // Keep default value
          break;
      }
    }
    
    variableValues[name] = value;
  });
  
  // Replace template variables with actual values
  let content = template.template;
  
  // Handle simple variable replacements like {{company.name}}
  Object.entries(variableValues).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      const regex = new RegExp(`{{${key}}}`, 'g');
      content = content.replace(regex, String(value));
    }
  });
  
  // Handle each loops like {{#each painPoints}}...{{/each}}
  const eachRegex = /{{#each (\w+)}}([\s\S]*?){{\/each}}/g;
  let match;
  
  while ((match = eachRegex.exec(content)) !== null) {
    const [fullMatch, arrayName, template] = match;
    const arrayValue = variableValues[arrayName];
    
    if (Array.isArray(arrayValue)) {
      const replacements = arrayValue.map(item => {
        let replacement = template;
        
        if (typeof item === 'string') {
          // Simple string array
          replacement = replacement.replace(/{{this}}/g, item);
        } else {
          // Object array
          Object.entries(item).forEach(([key, value]) => {
            const itemRegex = new RegExp(`{{${key}}}`, 'g');
            replacement = replacement.replace(itemRegex, String(value));
          });
        }
        
        return replacement;
      }).join('');
      
      content = content.replace(fullMatch, replacements);
    } else {
      // If not an array or empty, replace with empty string
      content = content.replace(fullMatch, '');
    }
  }
  
  return {
    content,
    variables: variableValues
  };
};

export const generateContentFromTemplate = async (
  template: ContentTemplate,
  companyId: string
): Promise<GeneratedContent> => {
  const company = mockCompanies.find(c => c.id === companyId);
  const knowledgeBase = mockKnowledgeBases.find(kb => kb.companyId === companyId);
  
  if (!company || !knowledgeBase) {
    throw new Error('Company or knowledge base not found');
  }
  
  const { content, variables } = fillTemplateVariables(template, companyId);
  
  // Create generated content object
  return {
    id: `gen-${Date.now()}`,
    templateId: template.id,
    companyId: company.id,
    knowledgeBaseId: knowledgeBase.id,
    title: `${template.name} for ${company.name}`,
    content,
    createdAt: new Date().toISOString(),
    variables
  };
};
