import { Opportunity, Collaboration, OrganizationProfile, ImpactRecord, Mentor, TechSupportOffer, AuditLogEntry } from '../types';

export const JHARKHAND_DISTRICTS = [
  'Ranchi', 'Gumla', 'East Singhbhum', 'Dhanbad', 'Bokaro', 'Hazaribagh', 
  'Khunti', 'West Singhbhum', 'Palamu', 'Dumka', 'Deoghar', 'Ramgarh', 
  'Giridih', 'Latehar', 'Simdega', 'Garhwa', 'Chatra', 'Koderma', 
  'Jamtara', 'Pakur', 'Sahibganj', 'Godda', 'Seraikela Kharsawan', 'Lohardaga'
];

export const DEMO_ORGANIZATIONS: OrganizationProfile[] = [
  {
    id: 'ORG-TATA',
    name: 'Tata Steel Ltd. / CSR Foundation',
    type: 'Corporate',
    industry: 'Materials, Manufacturing & Sustainable Community Development',
    headquarters: 'Jamshedpur, Jharkhand',
    jharkhandPresence: 'Operations across East Singhbhum, West Singhbhum, Ramgarh, Ranchi',
    activeModes: ['Funder', 'Technology Partner', 'Deployment Partner'],
    capabilities: {
      technologies: ['Hardware', 'Manufacturing', 'Water Technology', 'IoT', 'Cloud', 'Renewable Energy'],
      industryExpertise: ['Water & Sanitation', 'Healthcare', 'Rural Development', 'Infrastructure', 'Environment'],
      resources: ['Funding (₹25 Cr+ CSR)', 'Field Engineering Teams', 'Testing Labs', 'Logistics & Supply Chain', 'Community Field Stations'],
      districtsOfFocus: ['East Singhbhum', 'West Singhbhum', 'Gumla', 'Saraikela Kharsawan', 'Ranchi']
    },
    csrPriorities: {
      focusAreas: ['Water & Sanitation', 'Healthcare & MedTech', 'Education & Skill', 'Rural Livelihoods'],
      annualBudget: 50000000, // ₹5 Crore
      allocatedBudget: 36000000,
      beneficiaryGroups: ['Tribal Communities', 'Women Self-Help Groups', 'Smallholder Farmers', 'School Children']
    },
    contactPerson: {
      name: 'Vikramaditya Sen',
      designation: 'Head - CSR & Sustainable Community Development',
      email: 'vikram.sen@tatasteel.com'
    }
  },
  {
    id: 'ORG-TECHM',
    name: 'Tech Mahindra Digital Foundation',
    type: 'Corporate',
    industry: 'Information Technology, AI & Rural Digitization',
    headquarters: 'Ranchi Regional Hub',
    jharkhandPresence: 'Ranchi, Dhanbad, Jamshedpur',
    activeModes: ['Technology Partner', 'Funder'],
    capabilities: {
      technologies: ['AI/ML', 'Cloud', 'IoT', 'GIS', 'Cybersecurity'],
      industryExpertise: ['Agriculture & Food', 'Education & Skill', 'Public Services'],
      resources: ['Cloud Credits', 'GPU Clusters', 'AI Specialists', 'Software Engineering Teams'],
      districtsOfFocus: ['Ranchi', 'Hazaribagh', 'Dhanbad', 'Khunti']
    },
    csrPriorities: {
      focusAreas: ['Education & Skill', 'Agriculture & Food'],
      annualBudget: 25000000,
      allocatedBudget: 18000000,
      beneficiaryGroups: ['Rural Youth', 'Farmers']
    },
    contactPerson: {
      name: 'Pooja Verma',
      designation: 'Director - CSR Social Innovation',
      email: 'pooja.verma@techmahindra.com'
    }
  },
  {
    id: 'ORG-BOKARO-MSME',
    name: 'Bokaro Bio-Clean Technologies',
    type: 'MSME',
    industry: 'Water Treatment & Sensor Hardware Manufacturing',
    headquarters: 'Bokaro Steel City, Jharkhand',
    jharkhandPresence: 'Bokaro, Dhanbad, Giridih',
    activeModes: ['Technology Partner', 'Deployment Partner'],
    capabilities: {
      technologies: ['Hardware', 'Manufacturing', 'Water Technology', 'IoT'],
      industryExpertise: ['Water & Sanitation', 'Environment & CleanTech'],
      resources: ['Fabrication Workshop', 'Rapid Prototyping', 'Assembly Line', 'Technician Pool'],
      districtsOfFocus: ['Bokaro', 'Dhanbad', 'Gumla']
    },
    csrPriorities: {
      focusAreas: ['Water & Sanitation'],
      annualBudget: 2000000,
      allocatedBudget: 1500000,
      beneficiaryGroups: ['Rural Hamlets']
    }
  },
  {
    id: 'ORG-BIRSA-STARTUP',
    name: 'Birsa Agri-Drones & Sensors',
    type: 'Startup',
    industry: 'Precision Agriculture & Remote Sensing',
    headquarters: 'BAU Ranchi Agri-Incubation Hub',
    jharkhandPresence: 'Ranchi, Khunti, Hazaribagh',
    activeModes: ['Deployment Partner', 'Technology Partner'],
    capabilities: {
      technologies: ['Robotics', 'GIS', 'AI/ML', 'Hardware'],
      industryExpertise: ['Agriculture & Food', 'Environment & CleanTech'],
      resources: ['Drone Fleet', 'Multi-Spectral Cameras', 'Field Operators'],
      districtsOfFocus: ['Khunti', 'Ranchi', 'Hazaribagh']
    },
    csrPriorities: {
      focusAreas: ['Agriculture & Food'],
      annualBudget: 1000000,
      allocatedBudget: 800000,
      beneficiaryGroups: ['Tribal Farmers']
    }
  }
];

export const INITIAL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'PR-2026-0019',
    challengeRefId: 'CH-2026-00421',
    title: 'Rural Water Quality Monitoring & Heavy Metal Sensor Mesh',
    type: 'University Project',
    domain: 'Water & Sanitation',
    district: 'Gumla',
    block: 'Bishunpur',
    village: 'Banari & 8 hamlets',
    university: 'Birla Institute of Technology (BIT) Mesra',
    facultyLead: 'Dr. Alok Kumar Ray (Dept of Chemical & Electronics)',
    studentTeamCount: 6,
    govtDepartment: 'Dept of Drinking Water & Sanitation (DDWS Jharkhand)',
    trl: 5,
    currentStage: 'Field Pilot Stage',
    fundingRequired: 1800000, // ₹18 Lakh
    fundingCommitted: 1200000,
    beneficiaries: 25000,
    deadline: '2026-11-30',
    matchScore: 92,
    whyMatch: [
      'Matches your IoT & Hardware Manufacturing capability',
      'Directly aligns with Tata Steel CSR Water & Sanitation mandate',
      'Addresses validated heavy metal contamination in Gumla bauxite belt',
      'MSME fabrication support needed for rugged outdoor probe casings',
      'Govt of Jharkhand DDWS field clearances already pre-approved'
    ],
    requiredCapabilities: ['IoT', 'Hardware Manufacturing', 'Water Technology', 'Rural Deployment', 'CSR Funding'],
    problemStatement: 'Groundwater in Bishunpur block of Gumla suffers from seasonal arsenic and fluoride leaching near bauxite deposits. Existing government testing relies on periodic manual lab samples arriving 3 weeks late, resulting in untreated drinking water exposure for over 25,000 residents.',
    solutionOverview: 'Solar-powered multi-parametric sensor nodes submerged in drinking tubewells transmitting electrochemical fluoride/arsenic and turbidity readings via LoRaWAN/GSM to village panchayat kiosks and district water dashboard.',
    techStack: ['Electrochemical ISFET Sensors', 'LoRaWAN Long-Range Mesh', 'Solar Micro-Harvester', 'ESP32 IoT Node', 'AWS IoT Core & Flutter Alert App'],
    readiness: {
      technology: 92,
      manufacturing: 64,
      cost: 81,
      regulatory: 68,
      infrastructure: 84,
      government: 88,
      community: 85,
      overall: 80
    },
    pilotReady: true,
    csrEligible: true,
    communityValidationScore: 89,
    milestones: [
      { name: 'Research & Electrochemical Calibration', stage: 'Research', amount: 350000, completed: true, verificationEvidence: 'BIT Mesra NABL Lab Validation Report #CH-441' },
      { name: 'Ruggedized Sensor Probe Prototyping', stage: 'Prototype', amount: 450000, completed: true, verificationEvidence: 'IP68 Enclosure & Field Bench Test Data' },
      { name: '10-Tubewell Pilot Deployment in Bishunpur', stage: 'Field Pilot', amount: 500000, completed: false },
      { name: 'Panchayat Display Kiosks & SMS Gateway', stage: 'Testing', amount: 300000, completed: false },
      { name: 'District DDWS Dashboard Integration & Scaling', stage: 'Deployment', amount: 200000, completed: false }
    ]
  },
  {
    id: 'PR-2026-0024',
    challengeRefId: 'CH-2026-00318',
    title: 'Solar Cold Chain & Phase-Change Thermal Storage for Tribal Vegetables',
    type: 'Field Pilot',
    domain: 'Agriculture & Food',
    district: 'Khunti',
    block: 'Torpa',
    university: 'Birsa Agricultural University (BAU) Ranchi',
    facultyLead: 'Prof. Sandeep Minz (Dept of Farm Machinery & Power)',
    studentTeamCount: 5,
    govtDepartment: 'Dept of Agriculture, Animal Husbandry & Co-operative',
    trl: 6,
    currentStage: 'Pilot Demonstration',
    fundingRequired: 2200000,
    fundingCommitted: 1400000,
    beneficiaries: 18500,
    deadline: '2026-10-15',
    matchScore: 87,
    whyMatch: [
      'Matches Renewable Energy & Thermal Engineering capabilities',
      'High impact on vegetable spoilage reduction (estimated 42% loss to 7%)',
      'Tribal SHG federation ready for community ownership model',
      'Patent filed with BAU Innovation Cell'
    ],
    requiredCapabilities: ['Renewable Energy', 'Hardware', 'Manufacturing', 'Rural Deployment'],
    problemStatement: 'Tribal smallholders in Torpa harvest high-value organic tomatoes and leafy vegetables, but lack grid power for refrigeration. Up to 40% of produce spoils during transit or forced distress sales at local haats.',
    solutionOverview: 'Decentralized 5-tonne micro cold room powered by 3kW solar panels and salt-hydrate phase-change thermal bricks maintaining 4°C-8°C cooling for up to 36 hours of continuous overcast monsoon weather.',
    techStack: ['Phase Change Material (PCM) Thermal Mass', 'Brushless DC Variable Compressor', 'Monocrystalline Solar PV', 'IoT Temperature Logger'],
    readiness: {
      technology: 88,
      manufacturing: 72,
      cost: 75,
      regulatory: 80,
      infrastructure: 70,
      government: 85,
      community: 92,
      overall: 82
    },
    pilotReady: true,
    csrEligible: true,
    communityValidationScore: 94,
    milestones: [
      { name: 'Phase-Change Material Formulation & Lab Cycling', stage: 'Research', amount: 400000, completed: true },
      { name: 'Prototype 1-Tonne Unit at BAU Farm', stage: 'Prototype', amount: 600000, completed: true },
      { name: '5-Tonne Unit Construction at Torpa Farmer Producer Org', stage: 'Field Pilot', amount: 800000, completed: false },
      { name: 'Commercial Certification & Standards Compliance', stage: 'Certification', amount: 400000, completed: false }
    ]
  },
  {
    id: 'PR-2026-0031',
    challengeRefId: 'CH-2026-00109',
    title: 'Low-Cost Optical Sickle Cell & Thalassemia Point-of-Care Screener',
    type: 'University Project',
    domain: 'Healthcare & MedTech',
    district: 'West Singhbhum',
    block: 'Chaibasa',
    university: 'Kolhan University in collaboration with RIMS Ranchi',
    facultyLead: 'Dr. Reena Tigga (Biomedical & Pathology)',
    studentTeamCount: 4,
    govtDepartment: 'Dept of Health, Medical Education & Family Welfare',
    trl: 4,
    currentStage: 'Clinical Bench Testing',
    fundingRequired: 1500000,
    fundingCommitted: 600000,
    beneficiaries: 48000,
    deadline: '2026-12-20',
    matchScore: 84,
    whyMatch: [
      'Critical health crisis in West Singhbhum tribal belt',
      'Optical spectroscopy + microfluidics aligns with MedTech R&D',
      'High CSR alignment with maternal and child health goals',
      'Results delivered in 90 seconds vs 14 days HPLC turnaround'
    ],
    requiredCapabilities: ['Healthcare technology', 'Hardware', 'AI/ML', 'Testing'],
    problemStatement: 'Sickle cell trait prevalence reaches 12-18% in West Singhbhum. Conventional HPLC blood tests require transporting vials to Ranchi with weeks of delay, missing critical prenatal screenings in remote sub-centres.',
    solutionOverview: 'Battery-operated handheld micro-spectrometer reading microfluidic capillary cartridges to diagnose sickle cell hemoglobin morphology in 90 seconds with 94.8% accuracy.',
    techStack: ['Microfluidic Slide Cartridge', 'Multi-Wavelength LED Optics', 'On-Device Edge ML Inference', 'Bluetooth Thermal Printer'],
    readiness: {
      technology: 82,
      manufacturing: 50,
      cost: 78,
      regulatory: 62,
      infrastructure: 65,
      government: 80,
      community: 88,
      overall: 71
    },
    pilotReady: false,
    csrEligible: true,
    communityValidationScore: 86,
    milestones: [
      { name: 'Optical Microfluidic Cartridge Design', stage: 'Research', amount: 300000, completed: true },
      { name: 'Clinical Specimen Validation (300 Patients at RIMS)', stage: 'Testing', amount: 400000, completed: true },
      { name: 'Handheld Tooling & Enclosure Engineering', stage: 'Product Engineering', amount: 500000, completed: false },
      { name: 'CDSCO Medical Device Trial Documentation', stage: 'Certification', amount: 300000, completed: false }
    ]
  },
  {
    id: 'PR-2026-0042',
    challengeRefId: 'CH-2026-00277',
    title: 'AI Groundwater Aquifer Mapping & Managed Recharge Grid',
    type: 'Deployment Opportunity',
    domain: 'Water & Sanitation',
    district: 'Dhanbad',
    block: 'Jharia & Baghmara',
    university: 'Indian Institute of Technology (ISM) Dhanbad',
    facultyLead: 'Prof. P. K. Singh (Dept of Mining & Hydrology)',
    studentTeamCount: 8,
    govtDepartment: 'Dept of Mines & Geology & Central Ground Water Board',
    trl: 7,
    currentStage: 'Deployment & Scale',
    fundingRequired: 3000000,
    fundingCommitted: 2500000,
    beneficiaries: 72000,
    deadline: '2026-10-30',
    matchScore: 91,
    whyMatch: [
      'Directly mitigates mining induced water table subsidence',
      'Advanced hydro-geological AI modeling from premier IIT ISM team',
      'Deployment ready with mining industry co-sponsorship',
      'Enables structured CSR reporting for ESG compliance'
    ],
    requiredCapabilities: ['GIS', 'AI/ML', 'Infrastructure', 'Water Technology', 'Field Teams'],
    problemStatement: 'Heavy open-cast mining in Dhanbad has de-watered shallow aquifers, leaving hundreds of villages with dried-up borewells and contaminated mine pit discharges.',
    solutionOverview: 'Subsurface 3D electrical resistivity tomography coupled with AI satellite radar interferometry to identify fractured basalt recharge conduits and construct gravity-fed silt-filtered recharge shafts.',
    techStack: ['Satellite InSAR Remote Sensing', 'Resistivity Tomography Hardware', 'Hydro-AI Flow Simulator', 'Automated Ultrasonic Water Level Sensors'],
    readiness: {
      technology: 94,
      manufacturing: 85,
      cost: 82,
      regulatory: 90,
      infrastructure: 88,
      government: 92,
      community: 89,
      overall: 90
    },
    pilotReady: true,
    csrEligible: true,
    communityValidationScore: 91,
    milestones: [
      { name: 'Geophysical Basin Survey & Hydro-Model', stage: 'Research', amount: 600000, completed: true },
      { name: '3 Pilot Recharge Shafts in Baghmara', stage: 'Field Pilot', amount: 1200000, completed: true },
      { name: 'Continuous Monitoring Telemetry Network', stage: 'Testing', amount: 600000, completed: true },
      { name: 'Scale-up across 12 Mine-Adjacent Panchayats', stage: 'Deployment', amount: 600000, completed: false }
    ]
  },
  {
    id: 'PR-2026-0055',
    challengeRefId: 'CH-2026-00589',
    title: 'Autonomous Edge-AI Smoke & Thermal Camera Mesh for Forest Fires',
    type: 'University Project',
    domain: 'Environment & CleanTech',
    district: 'Latehar',
    block: 'Garu (Betla National Park)',
    university: 'Birla Institute of Technology (BIT) Mesra',
    facultyLead: 'Dr. V. K. Jha (Remote Sensing & AI)',
    studentTeamCount: 5,
    govtDepartment: 'Dept of Forest, Environment & Climate Change',
    trl: 6,
    currentStage: 'Field Validation',
    fundingRequired: 2600000,
    fundingCommitted: 1100000,
    beneficiaries: 110000,
    deadline: '2026-11-15',
    matchScore: 82,
    whyMatch: [
      'Latehar and Palamu tiger reserve suffer rampant summer bushfires',
      'Edge AI solar thermal cameras eliminate false positives',
      'Provides forest department instant GPS coordinates within 4 minutes',
      'Strong ESG and carbon biodiversity conservation credentials'
    ],
    requiredCapabilities: ['AI/ML', 'Robotics', 'Hardware', 'Renewable Energy'],
    problemStatement: 'Betla National Park loses thousands of hectares of sal and teak forest every dry season. Satellite alerts (MODIS/VIIRS) arrive 6 to 12 hours late, by which time fires spread beyond manual control lines.',
    solutionOverview: 'Canopy-mounted dual-spectrum (optical + LWIR thermal) cameras with local edge micro-neural networks detecting nascent smoke plums at 5km range and relaying VHF packet telemetry to forest beat offices.',
    techStack: ['FLIR Lepton LWIR Thermal Core', 'YOLOv8-Nano Edge TPU', 'Solar MPPT Battery Pack', 'VHF 160MHz Long-Range Transceiver'],
    readiness: {
      technology: 89,
      manufacturing: 68,
      cost: 74,
      regulatory: 78,
      infrastructure: 72,
      government: 86,
      community: 80,
      overall: 78
    },
    pilotReady: true,
    csrEligible: true,
    communityValidationScore: 84,
    milestones: [
      { name: 'Thermal Optical Edge Algorithm Training', stage: 'Research', amount: 500000, completed: true },
      { name: 'Solar Canopy Mast Prototype', stage: 'Prototype', amount: 700000, completed: true },
      { name: '5-Tower Deployment Betla Buffer Zone', stage: 'Field Pilot', amount: 800000, completed: false },
      { name: 'Forest Patrol Command Center Integration', stage: 'Deployment', amount: 600000, completed: false }
    ]
  },
  {
    id: 'CH-2026-00512',
    title: 'Arsenic & Fluoride Mitigation in Drinking Tubewells of Ganga Basin',
    type: 'Government Challenge',
    domain: 'Water & Sanitation',
    district: 'Sahibganj',
    block: 'Rajmahal',
    govtDepartment: 'Dept of Drinking Water & Sanitation (DDWS)',
    trl: 3,
    currentStage: 'Challenge Open for Industry / University Innovation',
    fundingRequired: 3500000,
    fundingCommitted: 1500000,
    beneficiaries: 65000,
    deadline: '2026-12-31',
    matchScore: 88,
    whyMatch: [
      'Govt verified high-severity health hazard affecting 28 riverside habitations',
      'High potential for Industry water purification technologies',
      'Govt capital subsidy of 50% available under Jal Jeevan Mission innovation window'
    ],
    requiredCapabilities: ['Water Technology', 'Manufacturing', 'Rural Deployment', 'CSR Funding'],
    problemStatement: 'Tubewells in 28 riverine habitations of Rajmahal show arsenic levels exceeding 0.05 mg/L (5x WHO limit). Conventional activated alumina filtration beds clog rapidly due to fine alluvial silt.',
    solutionOverview: 'Seeking robust, electricity-independent in-line adsorbents or capacitive deionization units maintainable by local village Jal Sahiyas.',
    techStack: ['Graphene/Iron Nano-Composite Adsorbents', 'Gravity Filtration', 'Simple Colorimetric Indicator Strips'],
    readiness: {
      technology: 70,
      manufacturing: 55,
      cost: 65,
      regulatory: 70,
      infrastructure: 60,
      government: 95,
      community: 90,
      overall: 68
    },
    pilotReady: false,
    csrEligible: true,
    communityValidationScore: 78,
    milestones: [
      { name: 'Challenge Solution Shortlisting', stage: 'Research', amount: 500000, completed: false },
      { name: 'Lab Water Sample Validation', stage: 'Testing', amount: 800000, completed: false },
      { name: 'Village Community Plant Pilot', stage: 'Field Pilot', amount: 1500000, completed: false },
      { name: 'Statewide Procurement Specification', stage: 'Deployment', amount: 700000, completed: false }
    ]
  }
];

export const INITIAL_COLLABORATIONS: Collaboration[] = [
  {
    id: 'COL-2026-0021',
    projectId: 'PR-2026-0019',
    projectTitle: 'Rural Water Quality Monitoring & Heavy Metal Sensor Mesh',
    industryPartner: 'Tata Steel Ltd. / CSR Foundation',
    university: 'Birla Institute of Technology (BIT) Mesra',
    govtDepartment: 'Dept of Drinking Water & Sanitation (DDWS)',
    msmePartner: 'Bokaro Bio-Clean Technologies',
    domain: 'Water & Sanitation',
    district: 'Gumla',
    status: 'Field Pilot',
    totalCommitment: 2000000, // ₹20 Lakh
    releasedAmount: 1200000,
    remainingAmount: 800000,
    beneficiariesTarget: 25000,
    beneficiariesCurrent: 14200,
    startDate: '2026-01-15',
    riskLevel: 'Medium',
    riskAlert: 'Sensor probe casing procurement delayed by 18 days due to supplier backorder. Recommended: Transition to local Adityapur precision machining.',
    communityValidationScore: 91,
    team: [
      { name: 'Vikramaditya Sen', role: 'CSR Project Lead', org: 'Tata Steel CSR', avatar: 'VS' },
      { name: 'Dr. Alok Kumar Ray', role: 'Chief Investigator', org: 'BIT Mesra', avatar: 'AR' },
      { name: 'Er. Rajesh Toppo', role: 'Executive Engineer', org: 'DDWS Gumla', avatar: 'RT' },
      { name: 'Sunil Agarwal', role: 'Manufacturing Lead', org: 'Bokaro Bio-Clean', avatar: 'SA' }
    ],
    milestones: [
      { id: 'M1', title: 'Sensor Bench Calibration & NABL Verification', amount: 400000, status: 'Completed', completionDate: '2026-03-10' },
      { id: 'M2', title: 'Prototype Field Testing in 3 Deep Borewells', amount: 450000, status: 'Completed', completionDate: '2026-05-22' },
      { id: 'M3', title: 'Fabrication of 20 Rugged Field Units (MSME)', amount: 350000, status: 'Completed', completionDate: '2026-07-15' },
      { id: 'M4', title: 'Field Pilot Deployment in Bishunpur & Telemetry Live', amount: 400000, status: 'In Progress' },
      { id: 'M5', title: 'Community Handover & Jal Sahiya Training', amount: 400000, status: 'Locked' }
    ]
  },
  {
    id: 'COL-2026-0018',
    projectId: 'PR-2026-0024',
    projectTitle: 'Solar Cold Chain & Phase-Change Thermal Storage',
    industryPartner: 'Tata Steel CSR Foundation',
    university: 'Birsa Agricultural University (BAU) Ranchi',
    govtDepartment: 'Dept of Agriculture & Co-operatives',
    msmePartner: 'Adityapur Precision Tooling',
    domain: 'Agriculture & Food',
    district: 'Khunti',
    status: 'Deployment',
    totalCommitment: 2400000,
    releasedAmount: 2000000,
    remainingAmount: 400000,
    beneficiariesTarget: 18500,
    beneficiariesCurrent: 16800,
    startDate: '2025-11-10',
    riskLevel: 'Low',
    communityValidationScore: 95,
    team: [
      { name: 'Pooja Kashyap', role: 'Agri CSR Specialist', org: 'Tata Steel', avatar: 'PK' },
      { name: 'Prof. Sandeep Minz', role: 'Faculty Lead', org: 'BAU Ranchi', avatar: 'SM' },
      { name: 'Devendra Oraon', role: 'FPO President', org: 'Torpa Organic FPO', avatar: 'DO' }
    ],
    milestones: [
      { id: 'M1', title: 'Thermal Energy Storage Chamber Fabrication', amount: 600000, status: 'Completed', completionDate: '2026-01-20' },
      { id: 'M2', title: 'Solar Array & MPPT Inverter Commissioning', amount: 700000, status: 'Completed', completionDate: '2026-04-12' },
      { id: 'M3', title: 'Tomato & Capsicum 90-Day Spoilage Trial', amount: 700000, status: 'Completed', completionDate: '2026-07-30' },
      { id: 'M4', title: 'FPO Commercial Integration & Final Grant Closeout', amount: 400000, status: 'Pending Verification' }
    ]
  },
  {
    id: 'COL-2026-0012',
    projectId: 'PR-2026-0031',
    projectTitle: 'Point-of-Care Sickle Cell Disease Anemia Screener',
    industryPartner: 'Tech Mahindra Digital Foundation',
    university: 'Kolhan University + RIMS Ranchi',
    govtDepartment: 'Dept of Health & Family Welfare',
    domain: 'Healthcare & MedTech',
    district: 'West Singhbhum',
    status: 'Industry Validation',
    totalCommitment: 1800000,
    releasedAmount: 800000,
    remainingAmount: 1000000,
    beneficiariesTarget: 48000,
    beneficiariesCurrent: 6200,
    startDate: '2026-02-01',
    riskLevel: 'Low',
    communityValidationScore: 88,
    team: [
      { name: 'Ananya Roy', role: 'MedTech Director', org: 'Tech Mahindra', avatar: 'AR' },
      { name: 'Dr. Reena Tigga', role: 'Head of Pathology', org: 'Kolhan Univ', avatar: 'RT' },
      { name: 'Dr. B. K. Soren', role: 'Civil Surgeon', org: 'Chaibasa Sadar Hospital', avatar: 'BS' }
    ],
    milestones: [
      { id: 'M1', title: 'Optical Spectrometer Edge Firmware', amount: 400000, status: 'Completed', completionDate: '2026-03-30' },
      { id: 'M2', title: 'Double-Blind Validation on 400 Blood Samples', amount: 400000, status: 'Completed', completionDate: '2026-06-18' },
      { id: 'M3', title: 'Plastic Mold Tooling for Disposable Slides', amount: 500000, status: 'In Progress' },
      { id: 'M4', title: 'Field Deployment across 15 Sub-Centres', amount: 500000, status: 'Locked' }
    ]
  }
];

export const MOCK_IMPACT_RECORDS: ImpactRecord[] = [
  {
    id: 'IMP-2026-0032',
    projectId: 'PR-2026-0019',
    projectTitle: 'Smart Water Quality Monitoring & Fluoride Alert Mesh',
    district: 'Gumla',
    domain: 'Water & Sanitation',
    expectedBeneficiaries: 20000,
    actualBeneficiaries: 24500,
    verificationStatus: 'Verified by Govt & Community',
    expectedCostSaving: 1000000,
    actualCostSaving: 1420000,
    villagesCovered: 9,
    keyMetric: '99.2% uptime of contamination warnings; zero acute fluorosis outbreaks reported in Q1-Q2 2026',
    evidenceDoc: 'DDWS_Gumla_Audit_Cert_2026.pdf'
  },
  {
    id: 'IMP-2026-0028',
    projectId: 'PR-2026-0024',
    projectTitle: 'Solar Cold Chain & Micro Thermal Storage',
    district: 'Khunti',
    domain: 'Agriculture & Food',
    expectedBeneficiaries: 15000,
    actualBeneficiaries: 18200,
    verificationStatus: 'Verified by Govt & Community',
    expectedCostSaving: 1800000,
    actualCostSaving: 2350000,
    villagesCovered: 14,
    keyMetric: 'Per-farmer income increased by ₹4,800/month by deferring sales past market gluts',
    evidenceDoc: 'BAU_Ranchi_Agri_Econ_Evaluation.pdf'
  },
  {
    id: 'IMP-2026-0015',
    projectId: 'PR-2026-0042',
    projectTitle: 'AI Groundwater Aquifer Mapping & Managed Recharge Grid',
    district: 'Dhanbad',
    domain: 'Water & Sanitation',
    expectedBeneficiaries: 50000,
    actualBeneficiaries: 68000,
    verificationStatus: 'Reported',
    expectedCostSaving: 3500000,
    actualCostSaving: 4100000,
    villagesCovered: 22,
    keyMetric: 'Water table stabilized by +2.8 meters during pre-monsoon summer across 12 monitoring piezometers',
    evidenceDoc: 'IIT_ISM_Hydro_Telemetry_Report.pdf'
  }
];

export const MOCK_MENTORS: Mentor[] = [
  {
    id: 'MEN-01',
    name: 'Suhasini Murthy',
    role: 'VP & Chief Technology Architect',
    org: 'Tata Consultancy Services',
    expertise: ['Cloud Architecture', 'IoT Edge', 'Scale Systems'],
    domain: 'Water & Agriculture',
    yearsExperience: 19,
    availability: 'Available',
    rating: 4.9,
    projectsMentored: 7
  },
  {
    id: 'MEN-02',
    name: 'Dr. Anand Swaminathan',
    role: 'Director of Biomedical Devices',
    org: 'MedTech Innovation Alliance',
    expertise: ['CDSCO Regulatory', 'Optical Sensors', 'Point-of-Care Diagnostics'],
    domain: 'Healthcare & MedTech',
    yearsExperience: 22,
    availability: 'Assigned (2 teams)',
    rating: 5.0,
    projectsMentored: 12
  },
  {
    id: 'MEN-03',
    name: 'Deepak Choudhary',
    role: 'Principal Manufacturing Engineer',
    org: 'Adityapur Tool Room & Precision Labs',
    expertise: ['Precision Machining', 'Sheet Metal Tooling', 'IP67 Ingress Testing'],
    domain: 'Hardware & Manufacturing',
    yearsExperience: 16,
    availability: 'Available',
    rating: 4.8,
    projectsMentored: 9
  }
];

export const MOCK_TECH_SUPPORT: TechSupportOffer[] = [
  {
    id: 'TS-01',
    offeredBy: 'Tech Mahindra Digital Lab',
    title: 'Cloud AI / GPU Compute Credits (A100)',
    category: 'Cloud & GPU',
    description: 'Providing 500 GPU hours for training satellite and computer vision models for university researchers.',
    status: 'Approved',
    projectAssigned: 'PR-2026-0055 (BIT Mesra Forest Fire AI)'
  },
  {
    id: 'TS-02',
    offeredBy: 'Tata Steel Jamshedpur R&D',
    title: 'Corrosion & Accelerated Environmental Chamber Testing',
    category: 'Regulatory & Testing',
    description: 'Access to salt-spray and thermal shock cycling chambers for outdoor sensors and enclosures.',
    status: 'Delivered',
    projectAssigned: 'PR-2026-0019 (Water Sensor Mesh)'
  },
  {
    id: 'TS-03',
    offeredBy: 'Bokaro Bio-Clean Technologies',
    title: 'Precision Plastic Injection & CNC Tooling',
    category: 'Manufacturing & Tooling',
    description: 'Rapid turnaround fabrication of custom sensor housings and flow-cell manifolds.',
    status: 'Available'
  }
];

export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'AUD-901',
    timestamp: '2026-09-06 14:15',
    user: 'Vikramaditya Sen',
    role: 'CSR Head (Tata Steel)',
    action: 'Approved Milestone 4 Funding Release',
    details: 'Released ₹4,00,000 for Bishunpur Telemetry deployment upon NABL report receipt',
    previousState: 'Status: Pending Verification',
    newState: 'Status: Released / In Progress'
  },
  {
    id: 'AUD-900',
    timestamp: '2026-09-05 11:20',
    user: 'Dr. Alok Kumar Ray',
    role: 'Faculty Lead (BIT Mesra)',
    action: 'Submitted Field Trial Evidence',
    details: 'Uploaded 30-day continuous water telemetry logs from Gumla Tubewell #3',
    previousState: 'Milestone 3 Completed',
    newState: 'Milestone 4 Evidence Submitted'
  },
  {
    id: 'AUD-899',
    timestamp: '2026-09-04 16:45',
    user: 'Platform AI Matching Engine',
    role: 'System AI',
    action: 'Generated 92% Match Score',
    details: 'Matched Tata Steel capabilities with PR-2026-0019 Rural Water Quality project',
    previousState: 'Unassigned Opportunity',
    newState: 'Recommended Match'
  },
  {
    id: 'AUD-898',
    timestamp: '2026-09-03 09:30',
    user: 'Er. Rajesh Toppo',
    role: 'Govt Liaison (DDWS)',
    action: 'Issued District Pilot Clearance',
    details: 'Approved installation of sensor probes on 20 public borewells across Bishunpur',
    previousState: 'Govt Verification Pending',
    newState: 'Govt Clearance Granted'
  }
];

export const DEMO_OPPORTUNITIES = INITIAL_OPPORTUNITIES;
export const DEMO_COLLABORATIONS = INITIAL_COLLABORATIONS;
export const INITIAL_AUDIT_LOGS = MOCK_AUDIT_LOGS;
