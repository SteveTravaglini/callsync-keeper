
import { Company, KnowledgeBase, KnowledgeSegment, ContentTemplate } from '@/lib/types';

export const mockCompanies: Company[] = [
  {
    id: 'comp-1',
    name: 'Acme Corporation',
    crmId: 'crm-001',
    industry: 'Technology',
    website: 'acmecorp.com',
    size: '1000-5000 employees',
    knowledgeBaseId: 'kb-1'
  },
  {
    id: 'comp-2',
    name: 'Global Solutions, Inc',
    crmId: 'crm-002',
    industry: 'Finance',
    website: 'globalsolutions.com',
    size: '5000+ employees',
    knowledgeBaseId: 'kb-2'
  },
  {
    id: 'comp-3',
    name: 'Innovate Tech',
    crmId: 'crm-003',
    industry: 'Healthcare',
    website: 'innovatetech.com',
    size: '500-1000 employees',
    knowledgeBaseId: 'kb-3'
  }
];

export const mockKnowledgeBases: KnowledgeBase[] = [
  {
    id: 'kb-1',
    companyId: 'comp-1',
    transcriptIds: ['tr-1', 'tr-2', 'tr-3', 'tr-4'],
    emailIds: ['em-1', 'em-2'],
    crmActivityIds: ['crm-act-1', 'crm-act-2', 'crm-act-3'],
    webResearchIds: ['web-1'],
    lastUpdated: '2023-06-15T14:30:00Z'
  },
  {
    id: 'kb-2',
    companyId: 'comp-2',
    transcriptIds: ['tr-5', 'tr-6'],
    emailIds: ['em-3', 'em-4', 'em-5'],
    crmActivityIds: ['crm-act-4'],
    webResearchIds: ['web-2', 'web-3'],
    lastUpdated: '2023-06-12T10:15:00Z'
  },
  {
    id: 'kb-3',
    companyId: 'comp-3',
    transcriptIds: ['tr-7'],
    emailIds: [],
    crmActivityIds: ['crm-act-5', 'crm-act-6'],
    webResearchIds: ['web-4'],
    lastUpdated: '2023-06-18T09:45:00Z'
  }
];

export const mockKnowledgeSegments: KnowledgeSegment[] = [
  // Transcript segments for Acme Corporation
  {
    id: 'seg-1',
    knowledgeBaseId: 'kb-1',
    sourceType: 'transcript',
    sourceId: 'tr-1',
    content: "We're looking to modernize our entire infrastructure. Our current pain points include scalability issues and increasing cloud costs.",
    date: '2023-05-10T14:30:00Z',
    metadata: { speaker: 'John Smith, CTO' }
  },
  {
    id: 'seg-2',
    knowledgeBaseId: 'kb-1',
    sourceType: 'transcript',
    sourceId: 'tr-2',
    content: "Security is a top priority for us this year. We need a solution that complies with GDPR and CCPA regulations.",
    date: '2023-05-20T11:15:00Z',
    metadata: { speaker: 'Sarah Johnson, CISO' }
  },
  
  // Email segments for Acme Corporation
  {
    id: 'seg-3',
    knowledgeBaseId: 'kb-1',
    sourceType: 'email',
    sourceId: 'em-1',
    content: "Following up on our discussion about the implementation timeline. We need to go live by Q3 to align with our fiscal year planning.",
    date: '2023-05-25T09:30:00Z',
    metadata: { sender: 'john.smith@acmecorp.com', subject: 'Implementation Timeline' }
  },
  
  // CRM segments for Acme Corporation
  {
    id: 'seg-4',
    knowledgeBaseId: 'kb-1',
    sourceType: 'crm',
    sourceId: 'crm-act-1',
    content: "Budget approved for $1.2M for the digital transformation initiative. Decision committee includes CTO, CIO, and CFO.",
    date: '2023-06-01T16:45:00Z',
    metadata: { activityType: 'Deal Update', owner: 'Account Executive' }
  },
  
  // Web research segments for Acme Corporation
  {
    id: 'seg-5',
    knowledgeBaseId: 'kb-1',
    sourceType: 'web',
    sourceId: 'web-1',
    content: "Acme Corporation announced a new strategic partnership with Microsoft to accelerate their cloud migration strategy.",
    date: '2023-06-10T08:15:00Z',
    metadata: { source: 'TechCrunch', url: 'https://techcrunch.com/2023/06/10/acme-microsoft-partnership' }
  },
  
  // Segments for other companies follow similar patterns
  {
    id: 'seg-6',
    knowledgeBaseId: 'kb-2',
    sourceType: 'transcript',
    sourceId: 'tr-5',
    content: "We're expanding to the European market in Q4 and need to ensure our financial systems are compliant with EU regulations.",
    date: '2023-06-05T13:20:00Z',
    metadata: { speaker: 'Michael Chang, CFO' }
  },
  
  {
    id: 'seg-7',
    knowledgeBaseId: 'kb-3',
    sourceType: 'transcript',
    sourceId: 'tr-7',
    content: "Our current patient data management is inefficient. We need a solution that integrates with our EHR system and provides real-time analytics.",
    date: '2023-06-15T10:30:00Z',
    metadata: { speaker: 'Dr. Lisa Patel, Medical Director' }
  }
];

export const mockTemplates: ContentTemplate[] = [
  {
    id: 'template-1',
    name: 'Value Proposition',
    description: 'Generate a tailored value proposition based on client pain points and needs',
    type: 'proposal',
    template: `
      <h1>Value Proposition for {{company.name}}</h1>
      <p class="text-gray-500">Generated on {{generatedDate}}</p>
      <hr>
      <h2>Understanding Your Challenges</h2>
      <p>Based on our conversations with {{company.name}}, we understand that you're facing the following challenges:</p>
      <ul>
        {{#each painPoints}}
          <li><strong>{{this}}</strong></li>
        {{/each}}
      </ul>
      <h2>Our Proposed Solution</h2>
      <p>{{proposedSolution}}</p>
      <h2>Expected Outcomes</h2>
      <ul>
        {{#each outcomes}}
          <li><strong>{{this}}</strong></li>
        {{/each}}
      </ul>
      <h2>Next Steps</h2>
      <p>{{nextSteps}}</p>
    `,
    variables: [
      { name: 'company.name', source: 'company', path: 'name', defaultValue: 'Client' },
      { name: 'generatedDate', source: 'custom', path: 'date', defaultValue: 'today' },
      { name: 'painPoints', source: 'knowledgeBase', path: 'insights.keyPoints', defaultValue: '[]' },
      { name: 'proposedSolution', source: 'custom', path: 'solution', defaultValue: 'Our comprehensive solution...' },
      { name: 'outcomes', source: 'custom', path: 'outcomes', defaultValue: '[]' },
      { name: 'nextSteps', source: 'knowledgeBase', path: 'insights.nextSteps', defaultValue: 'Let\'s schedule a follow-up call' }
    ],
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2023-05-20T14:30:00Z'
  },
  {
    id: 'template-2',
    name: 'ROI Business Case',
    description: 'Generate an ROI analysis and business case for the proposed solution',
    type: 'roi',
    template: `
      <h1>ROI Business Case for {{company.name}}</h1>
      <p class="text-gray-500">Generated on {{generatedDate}}</p>
      <hr>
      <h2>Executive Summary</h2>
      <p>{{executiveSummary}}</p>
      <h2>Current Situation</h2>
      <p>{{currentSituation}}</p>
      <h2>Financial Impact</h2>
      <table class="w-full border-collapse">
        <thead>
          <tr>
            <th class="border p-2">Metric</th>
            <th class="border p-2">Before</th>
            <th class="border p-2">After</th>
            <th class="border p-2">Impact</th>
          </tr>
        </thead>
        <tbody>
          {{#each financialMetrics}}
            <tr>
              <td class="border p-2">{{name}}</td>
              <td class="border p-2">{{before}}</td>
              <td class="border p-2">{{after}}</td>
              <td class="border p-2">{{impact}}</td>
            </tr>
          {{/each}}
        </tbody>
      </table>
      <h2>Expected ROI</h2>
      <p>{{expectedRoi}}</p>
      <h2>Implementation Timeline</h2>
      <p>{{implementationTimeline}}</p>
    `,
    variables: [
      { name: 'company.name', source: 'company', path: 'name', defaultValue: 'Client' },
      { name: 'generatedDate', source: 'custom', path: 'date', defaultValue: 'today' },
      { name: 'executiveSummary', source: 'custom', path: 'summary', defaultValue: 'This business case outlines...' },
      { name: 'currentSituation', source: 'knowledgeBase', path: 'insights.summary', defaultValue: 'The client is currently...' },
      { name: 'financialMetrics', source: 'custom', path: 'metrics', defaultValue: '[]' },
      { name: 'expectedRoi', source: 'custom', path: 'roi', defaultValue: 'Expected ROI of 250% over 3 years' },
      { name: 'implementationTimeline', source: 'custom', path: 'timeline', defaultValue: '12 weeks implementation' }
    ],
    createdAt: '2023-02-10T11:30:00Z',
    updatedAt: '2023-05-22T09:15:00Z'
  },
  {
    id: 'template-3',
    name: 'Customer Success Handoff',
    description: 'Generate a comprehensive handoff document from sales to customer success',
    type: 'handoff',
    template: `
      <h1>Customer Success Handoff: {{company.name}}</h1>
      <p class="text-gray-500">Generated on {{generatedDate}}</p>
      <hr>
      <h2>Account Overview</h2>
      <p><strong>Industry:</strong> {{company.industry}}</p>
      <p><strong>Size:</strong> {{company.size}}</p>
      <p><strong>Website:</strong> {{company.website}}</p>
      <h2>Key Stakeholders</h2>
      <ul>
        {{#each stakeholders}}
          <li><strong>{{name}}</strong> - {{title}} ({{email}})</li>
        {{/each}}
      </ul>
      <h2>Solution Overview</h2>
      <p>{{solutionOverview}}</p>
      <h2>Success Criteria</h2>
      <ul>
        {{#each successCriteria}}
          <li>{{this}}</li>
        {{/each}}
      </ul>
      <h2>Implementation Plan</h2>
      <p>{{implementationPlan}}</p>
      <h2>Risk Factors</h2>
      <ul>
        {{#each riskFactors}}
          <li><strong>{{factor}}:</strong> {{mitigation}}</li>
        {{/each}}
      </ul>
    `,
    variables: [
      { name: 'company.name', source: 'company', path: 'name', defaultValue: 'Client' },
      { name: 'company.industry', source: 'company', path: 'industry', defaultValue: 'Technology' },
      { name: 'company.size', source: 'company', path: 'size', defaultValue: 'Enterprise' },
      { name: 'company.website', source: 'company', path: 'website', defaultValue: 'client.com' },
      { name: 'generatedDate', source: 'custom', path: 'date', defaultValue: 'today' },
      { name: 'stakeholders', source: 'custom', path: 'stakeholders', defaultValue: '[]' },
      { name: 'solutionOverview', source: 'custom', path: 'solution', defaultValue: 'The client has purchased...' },
      { name: 'successCriteria', source: 'knowledgeBase', path: 'insights.keyPoints', defaultValue: '[]' },
      { name: 'implementationPlan', source: 'custom', path: 'implementation', defaultValue: 'Phase 1: Discovery...' },
      { name: 'riskFactors', source: 'custom', path: 'risks', defaultValue: '[]' }
    ],
    createdAt: '2023-03-05T13:45:00Z',
    updatedAt: '2023-06-01T15:20:00Z'
  }
];
