export const JHARKHAND_DISTRICTS = [
  "Ranchi", "Dhanbad", "Bokaro", "Dumka", "Deoghar", "East Singhbhum", 
  "West Singhbhum", "Gumla", "Simdega", "Hazaribagh", "Giridih", "Palamu", 
  "Latehar", "Lohardaga", "Khunti", "Pakur", "Sahibganj", "Godda", 
  "Garhwa", "Chatra", "Koderma", "Jamtara", "Ramgarh", "Seraikela-Kharsawan"
];

// Reusable formatting function
export const formatResponse = (data: any, meta: any = null) => {
  return {
    success: true,
    data,
    meta: meta || { page: 1, pageSize: 25, total: Array.isArray(data) ? data.length : 1 }
  };
};

export const formatError = (code: string, message: string) => {
  return {
    success: false,
    error: {
      code,
      message
    }
  };
};

// Mock data structures
export const mockDB = {
  overview: {
    challengesReported: 4521,
    verifiedChallenges: 3204,
    activeProjects: 412,
    resolvedChallenges: 1850,
    deployedSolutions: 124,
    districtsCovered: 24,
    universitiesParticipating: 8,
    industryPartners: 15,
    citizensParticipating: 142050,
    beneficiaries: 850200,
    fieldPilots: 45,
    impactVerified: 110,
    csrParticipation: 12,
    publicFunding: 450000000,
    overallSlaPerformance: 82
  },
  
  challenges: [
    {
      id: "CH-2026-001",
      publicId: "PUB-CH-001",
      title: "Village Drinking Water Issue",
      generalLocation: "Bishunpur, Gumla",
      district: "Gumla",
      block: "Bishunpur",
      domain: "Water",
      description: "Severe fluoride contamination in primary drinking water sources affecting 4 villages.",
      verificationStatus: "VERIFIED",
      affectedPopulation: 4500,
      evidenceSummary: "Lab tested water samples (NABL approved), 120 citizen reports.",
      responsibleDepartment: "Drinking Water & Sanitation Department",
      currentStatus: "Assigned",
      timeline: [
        { event: "Problem Reported", timestamp: "2026-01-15T10:00:00Z", source: "Citizen Portal", status: "OFFICIAL", visibility: "PUBLIC" },
        { event: "AI Classified", timestamp: "2026-01-15T10:05:00Z", source: "AI Platform", status: "AI_GENERATED", visibility: "PUBLIC" },
        { event: "Verified", timestamp: "2026-01-20T14:30:00Z", source: "Department Official", status: "VERIFIED", visibility: "PUBLIC" },
        { event: "Government Assigned", timestamp: "2026-01-22T09:15:00Z", source: "Command Center", status: "OFFICIAL", visibility: "PUBLIC" },
        { event: "University Matched", timestamp: "2026-02-10T11:00:00Z", source: "Platform", status: "OFFICIAL", visibility: "PUBLIC" }
      ],
      relatedProject: "PR-2026-104",
      communityParticipation: 1284,
      resolution: "Pending",
      impact: "Pending Verification",
      isDemo: true,
      sourceType: "DEMO"
    },
    {
      id: "CH-2026-002",
      publicId: "PUB-CH-002",
      title: "Dilapidated Primary School Roof",
      generalLocation: "Torpa, Khunti",
      district: "Khunti",
      block: "Torpa",
      domain: "Education",
      description: "Primary school roof collapsed partially during monsoon, affecting 200 students.",
      verificationStatus: "VERIFIED",
      affectedPopulation: 200,
      evidenceSummary: "Photos uploaded by Headmaster, Verified by Block Education Officer.",
      responsibleDepartment: "Department of School Education",
      currentStatus: "Resolved",
      timeline: [
        { event: "Problem Reported", timestamp: "2025-11-10T08:00:00Z", source: "Citizen Portal", status: "OFFICIAL", visibility: "PUBLIC" },
        { event: "Verified", timestamp: "2025-11-12T10:30:00Z", source: "BEO", status: "VERIFIED", visibility: "PUBLIC" },
        { event: "Project Started", timestamp: "2025-11-20T09:00:00Z", source: "Department", status: "OFFICIAL", visibility: "PUBLIC" },
        { event: "Deployment", timestamp: "2026-01-15T14:00:00Z", source: "Contractor", status: "OFFICIAL", visibility: "PUBLIC" }
      ],
      relatedProject: "PR-2025-890",
      communityParticipation: 450,
      resolution: "Roof completely rebuilt with weather-proof materials",
      impact: "200 students resumed classes safely",
      isDemo: true,
      sourceType: "DEMO"
    }
  ],

  projects: [
    {
      id: "PR-2026-104",
      publicId: "PUB-PR-104",
      title: "Electrochemical Fluoride Sensing Mesh",
      originatingChallenge: "PUB-CH-001",
      university: "BIT Mesra",
      industryPartner: "Tata Steel CSR",
      governmentDepartment: "Drinking Water & Sanitation Department",
      district: "Gumla",
      domain: "Water",
      trl: 6,
      currentStage: "PROTOTYPE",
      milestones: [
        { id: "M1", title: "Lab Prototype", status: "COMPLETED" },
        { id: "M2", title: "Field Testing", status: "IN_PROGRESS" }
      ],
      pilot: "Upcoming",
      deployment: "Pending",
      beneficiaries: 0,
      impact: "Pending",
      isDemo: true,
      sourceType: "DEMO"
    }
  ],

  accountability: [
    {
      id: "ACC-2026-001",
      publicId: "PUB-ACC-001",
      issueTitle: "Road Washout - NH33 Link",
      asset: "NH33 to Village Link Road 4",
      contractor: "ABC Builders Ltd",
      department: "Road Construction Department",
      district: "Ranchi",
      status: "Verified Contractual Non-Compliance",
      timeline: [
        { stage: "Reported", status: "Community Reported", date: "2026-06-15" },
        { stage: "Verification", status: "Verified", date: "2026-06-18" },
        { stage: "Investigation", status: "Investigation", date: "2026-06-25" },
        { stage: "Finding", status: "Official Finding", date: "2026-07-10" },
        { stage: "Action", status: "Verified Contractual Non-Compliance", date: "2026-07-15" }
      ],
      isDemo: true,
      sourceType: "DEMO"
    }
  ],

  impact: {
    expected: { beneficiaries: 10000, label: "Expected" },
    reported: { beneficiaries: 9500, label: "Reported" },
    measured: { beneficiaries: 8920, label: "Measured" },
    verified: { beneficiaries: 8400, label: "Verified" }
  },

  districts: JHARKHAND_DISTRICTS.map(d => ({
    id: d.toLowerCase().replace(/ /g, '-'),
    name: d,
    challenges: Math.floor(Math.random() * 2000) + 500,
    verified: Math.floor(Math.random() * 1500) + 300,
    activeProjects: Math.floor(Math.random() * 300) + 50,
    resolved: Math.floor(Math.random() * 1000) + 200,
    solutions: Math.floor(Math.random() * 50) + 5,
    beneficiaries: Math.floor(Math.random() * 100000) + 10000,
    slaCompliance: Math.floor(Math.random() * 30) + 60
  }))
};
