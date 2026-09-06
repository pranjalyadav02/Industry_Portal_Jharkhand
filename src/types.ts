export type UserRole = 
  | 'Company Administrator'
  | 'CSR Head'
  | 'Innovation Manager'
  | 'R&D Manager'
  | 'Technology Lead'
  | 'Industry Mentor'
  | 'Project Sponsor'
  | 'Startup Founder'
  | 'MSME Lead'
  | 'CSR Program Officer'
  | 'Government Liaison';

export type IndustryMode = 'Funder' | 'Technology Partner' | 'Deployment Partner';

export type TRLStage = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type OpportunityType = 
  | 'Government Challenge'
  | 'University Project'
  | 'Field Pilot'
  | 'Deployment Opportunity'
  | 'Startup Commercialization'
  | 'CSR Program';

export type DomainType = 
  | 'Water & Sanitation'
  | 'Healthcare & MedTech'
  | 'Agriculture & Food'
  | 'Education & Skill'
  | 'Environment & CleanTech'
  | 'Infrastructure & Energy'
  | 'Rural Livelihoods'
  | 'Accessibility & Inclusion';

export interface ReadinessDimensions {
  technology: number; // 0-100
  manufacturing: number;
  cost: number;
  regulatory: number;
  infrastructure: number;
  government: number;
  community: number;
  overall: number;
}

export interface Opportunity {
  id: string; // e.g. PR-2026-0019 or CH-2026-00421
  title: string;
  type: OpportunityType;
  domain: DomainType;
  district: string;
  block?: string;
  village?: string;
  university?: string;
  facultyLead?: string;
  studentTeamCount?: number;
  govtDepartment?: string;
  challengeRefId?: string; // cross-platform linkage
  trl: TRLStage;
  currentStage: string;
  fundingRequired: number; // in Rupees
  fundingCommitted: number;
  beneficiaries: number;
  deadline: string;
  matchScore?: number;
  whyMatch?: string[];
  requiredCapabilities: string[];
  problemStatement: string;
  solutionOverview: string;
  techStack: string[];
  readiness: ReadinessDimensions;
  pilotReady: boolean;
  csrEligible: boolean;
  communityValidationScore?: number; // 0-100
  milestones: {
    name: string;
    stage: string;
    amount: number;
    completed: boolean;
    verificationEvidence?: string;
  }[];
}

export interface Collaboration {
  id: string; // e.g. COL-2026-0021
  projectId: string;
  projectTitle: string;
  industryPartner: string;
  university: string;
  govtDepartment: string;
  msmePartner?: string;
  domain: DomainType;
  district: string;
  status: 'Technical Review' | 'Industry Validation' | 'Product Engineering' | 'Manufacturing' | 'Field Pilot' | 'Certification' | 'Deployment' | 'Scale';
  totalCommitment: number;
  releasedAmount: number;
  remainingAmount: number;
  beneficiariesTarget: number;
  beneficiariesCurrent: number;
  startDate: string;
  milestones: {
    id: string;
    title: string;
    amount: number;
    status: 'Completed' | 'In Progress' | 'Pending Verification' | 'Locked';
    completionDate?: string;
  }[];
  riskLevel: 'Low' | 'Medium' | 'High';
  riskAlert?: string;
  communityValidationScore: number;
  team: {
    name: string;
    role: string;
    org: string;
    avatar: string;
  }[];
  agreementStatus?: string;
  governmentPartner?: string;
  communityPartner?: string;
  corporatePartner?: string;
}

export interface OrganizationProfile {
  id: string;
  name: string;
  type: 'Corporate' | 'Startup' | 'MSME' | 'CSR Foundation';
  industry: string;
  headquarters: string;
  jharkhandPresence: string;
  activeModes: IndustryMode[];
  capabilities: {
    technologies: string[];
    industryExpertise: string[];
    resources: string[];
    districtsOfFocus: string[];
  };
  csrPriorities: {
    focusAreas: DomainType[];
    annualBudget: number;
    allocatedBudget: number;
    beneficiaryGroups: string[];
  };
  contactPerson?: {
    name: string;
    designation: string;
    email: string;
  };
}

export interface ImpactRecord {
  id: string;
  projectId: string;
  projectTitle: string;
  district: string;
  domain: DomainType;
  expectedBeneficiaries: number;
  actualBeneficiaries: number;
  verificationStatus: 'Expected' | 'Reported' | 'Verified by Govt & Community';
  expectedCostSaving: number;
  actualCostSaving: number;
  villagesCovered: number;
  keyMetric: string;
  evidenceDoc: string;
}

export interface Mentor {
  id: string;
  name: string;
  title?: string;
  role?: string;
  org?: string;
  organization?: string;
  expertise: string[];
  domain?: string;
  yearsExperience?: number;
  availability?: 'Available' | 'Assigned (2 teams)' | 'Full';
  rating?: number;
  projectsMentored?: number;
  assignedProjects?: string[];
  hoursContributed?: number;
}

export interface TechSupportOffer {
  id: string;
  offeredBy: string;
  title: string;
  category: 'Cloud & GPU' | 'Sensors & IoT' | 'Hardware Labs' | 'Manufacturing & Tooling' | 'Regulatory & Testing';
  description: string;
  status: 'Available' | 'Requested' | 'Approved' | 'Delivered' | 'Integrated';
  projectAssigned?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user?: string;
  actor?: string;
  role: string;
  organization?: string;
  action: string;
  entityId?: string;
  details: string;
  previousState?: string;
  newState?: string;
  ipAddress?: string;
}
