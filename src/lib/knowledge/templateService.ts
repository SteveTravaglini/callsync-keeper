
import { ContentTemplate, GeneratedContent, TemplateType } from '@/lib/types';

// Helper function to get random items from an array
const getRandomItems = <T,>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Sample data for generating different content types
const productBenefits = [
  "Increased productivity by 34%",
  "Reduced meeting time by 45%",
  "Improved customer satisfaction by 27%",
  "Boosted team collaboration by 56%",
  "Decreased decision time by 38%",
  "Enhanced data accuracy by 42%",
  "Streamlined workflows by 30%",
  "Reduced operational costs by 25%",
];

const competitiveAdvantages = [
  "Proprietary AI with 2x accuracy compared to competitors",
  "Seamless integration with 20+ platforms",
  "Industry-leading data security compliance",
  "24/7 dedicated customer support",
  "Customizable reporting and dashboards",
  "Mobile-optimized experience",
  "Rapid implementation (48 hours vs industry average of 2 weeks)",
  "No-code workflow customization",
];

const successMetrics = [
  { metric: "ROI", value: "250% within first 6 months" },
  { metric: "Time Saved", value: "15 hours per employee monthly" },
  { metric: "Cost Reduction", value: "$145,000 annually" },
  { metric: "Error Reduction", value: "86% fewer manual errors" },
  { metric: "Adoption Rate", value: "92% user adoption" },
  { metric: "Training Required", value: "< 2 hours per user" },
];

const customerReferences = [
  { company: "Acme Corp", contact: "Jane Smith, CTO", quote: "Game-changing solution for our team" },
  { company: "TechGiant", contact: "Mark Johnson, VP of Sales", quote: "Exceeded our expectations on every metric" },
  { company: "Global Finance", contact: "Sarah Williams, Operations Director", quote: "The ROI has been exceptional" },
  { company: "Retail Leaders", contact: "David Chen, CIO", quote: "Transformed our customer interactions" },
];

const improvementAreas = [
  { name: "Meeting Efficiency", before: "3.5 hours daily", after: "1.5 hours daily", impact: "57% reduction" },
  { name: "Customer Response Time", before: "24 hours", after: "4 hours", impact: "83% improvement" },
  { name: "Sales Cycle Length", before: "45 days", after: "28 days", impact: "38% shorter sales cycle" },
  { name: "Team Coordination", before: "5 coordination tools", after: "1 unified platform", impact: "80% tool consolidation" },
  { name: "Data Accuracy", before: "76% accuracy", after: "98% accuracy", impact: "22% improvement" },
];

const stakeholders = [
  { name: "Maria Rodriguez", title: "Chief Revenue Officer", email: "maria@company.com" },
  { name: "Raj Patel", title: "VP of Customer Success", email: "raj@company.com" },
  { name: "Emma Johnson", title: "Director of Operations", email: "emma@company.com" },
  { name: "Thomas Chen", title: "IT Security Lead", email: "thomas@company.com" },
  { name: "Aisha Washington", title: "Implementation Manager", email: "aisha@company.com" },
];

const riskFactors = [
  { factor: "Implementation Timeline", mitigation: "Phase-based approach with weekly milestones" },
  { factor: "User Adoption", mitigation: "Comprehensive training program with champions network" },
  { factor: "Data Migration", mitigation: "Test migrations with verification protocols" },
  { factor: "Integration Complexity", mitigation: "API-first approach with pre-implementation testing" },
  { factor: "Budget Overrun", mitigation: "Fixed-price implementation with clear scope definitions" },
];

// Main function to generate content based on a template
export const generateContentFromTemplate = async (
  template: ContentTemplate, 
  companyId: string
): Promise<GeneratedContent> => {
  console.log(`Generating ${template.type} for company ${companyId}`);
  
  let content: any = {};
  
  switch (template.type) {
    case TemplateType.PROPOSAL:
      content = generateProposal(companyId);
      break;
    case TemplateType.EXECUTIVE_SUMMARY:
      content = generateExecutiveSummary(companyId);
      break;
    case TemplateType.ROI_ANALYSIS:
      content = generateROIAnalysis(companyId);
      break;
    case TemplateType.IMPLEMENTATION_PLAN:
      content = generateImplementationPlan(companyId);
      break;
    default:
      throw new Error(`Unsupported template type: ${template.type}`);
  }
  
  return {
    id: `gen-${Date.now()}`,
    templateId: template.id,
    companyId,
    title: `${template.name} for Company ${companyId}`,
    dateGenerated: new Date().toISOString(),
    content: content
  };
};

const generateProposal = (companyId: string) => {
  return {
    executiveSummary: "This proposal outlines our recommended solution based on our understanding of your requirements and challenges.",
    challengesSolved: getRandomItems(productBenefits, 3),
    proposedSolution: "Our comprehensive platform provides end-to-end automation and intelligence for your team's needs.",
    keyBenefits: getRandomItems(productBenefits, 4),
    competitiveAdvantages: getRandomItems(competitiveAdvantages, 3),
    implementationTimeline: "8 weeks from contract signature",
    investmentSummary: {
      setup: "$25,000",
      annual: "$48,000",
      roi: "250% expected within 6 months"
    },
    nextSteps: "Schedule a technical workshop to define implementation details"
  };
};

const generateExecutiveSummary = (companyId: string) => {
  return {
    businessContext: "Based on our discovery sessions, we've identified key opportunities to improve operational efficiency.",
    challengesAddressed: getRandomItems(productBenefits, 3),
    recommendedApproach: "A phased implementation focused on quick wins followed by broader transformation.",
    strategicValue: "This solution aligns with your stated 2023 objectives of improving customer experiences and operational efficiency.",
    keyMetrics: getRandomItems(successMetrics, 3).map(sm => `${sm.metric}: ${sm.value}`),
    investmentSummary: "$73,000 total first-year cost with expected 250% ROI",
    conclusionStatement: "This initiative represents a strategic opportunity to address current challenges while positioning for future growth."
  };
};

const generateROIAnalysis = (companyId: string) => {
  return {
    overviewStatement: "This analysis outlines the expected return on investment based on industry benchmarks and your specific usage patterns.",
    initialInvestment: "$73,000 (implementation + first year subscription)",
    areasOfImprovement: getRandomItems(improvementAreas, 3),
    quantitativeGains: {
      yearOne: "$98,000 estimated savings",
      yearTwo: "$182,000 estimated savings",
      yearThree: "$215,000 estimated savings"
    },
    qualitativeGains: [
      "Improved employee satisfaction",
      "Enhanced customer experience",
      "Better market positioning",
      "Increased data-driven decision making"
    ],
    breakEvenAnalysis: "Expected break-even within 8.9 months",
    conclusionStatement: "The combined quantitative and qualitative benefits provide a compelling case for implementation."
  };
};

const generateImplementationPlan = (companyId: string) => {
  return {
    approachOverview: "A phased implementation approach designed to minimize disruption while quickly delivering value.",
    phases: [
      "Phase 1: Discovery and Design (2 weeks)",
      "Phase 2: Core Implementation (4 weeks)",
      "Phase 3: Integration (3 weeks)",
      "Phase 4: Testing and Validation (2 weeks)",
      "Phase 5: Training and Rollout (3 weeks)"
    ],
    keyMilestones: [
      "Project kickoff: Week 1",
      "Solution design approval: Week 2",
      "Core functionality available: Week 6",
      "User acceptance testing: Week 10",
      "Production deployment: Week 14"
    ],
    resourceRequirements: "2-3 hours weekly from key stakeholders during implementation",
    keyStakeholders: getRandomItems(stakeholders, 3),
    riskManagement: getRandomItems(riskFactors, 3),
    successCriteria: "Successful implementation will be measured by 100% feature deployment, 85%+ user adoption within 30 days, and customer satisfaction scores of 4.5/5 or higher."
  };
};

export default { generateContentFromTemplate };
