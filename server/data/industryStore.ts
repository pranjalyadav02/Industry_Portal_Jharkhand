import fs from 'fs';
import path from 'path';
import {
  DEMO_OPPORTUNITIES,
  DEMO_COLLABORATIONS,
  DEMO_ORGANIZATIONS,
  INITIAL_AUDIT_LOGS,
} from '../../src/data/mockData';

const SHARED_DIR = path.resolve(process.cwd(), '..', 'shared_data');
const LOCAL_DIR = path.resolve(process.cwd(), 'data');
const SHARED_FILE = path.join(SHARED_DIR, 'industry_store.json');
const LOCAL_FILE = path.join(LOCAL_DIR, 'db.json');

export interface IndustryStoreData {
  organizations: any[];
  opportunities: any[];
  collaborations: any[];
  auditLogs: any[];
}

class IndustryStorageEngine {
  private filePath: string;
  private data: IndustryStoreData;

  constructor() {
    if (fs.existsSync(SHARED_DIR) || fs.existsSync(path.resolve(process.cwd(), '..', 'Government_Command_Jharkhand'))) {
      if (!fs.existsSync(SHARED_DIR)) {
        try { fs.mkdirSync(SHARED_DIR, { recursive: true }); } catch (e) {}
      }
      this.filePath = SHARED_FILE;
    } else {
      if (!fs.existsSync(LOCAL_DIR)) {
        try { fs.mkdirSync(LOCAL_DIR, { recursive: true }); } catch (e) {}
      }
      this.filePath = LOCAL_FILE;
    }

    this.data = this.loadData();
  }

  private loadData(): IndustryStoreData {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.opportunities)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Industry store load error:', e);
    }

    const initial: IndustryStoreData = {
      organizations: DEMO_ORGANIZATIONS,
      opportunities: DEMO_OPPORTUNITIES,
      collaborations: DEMO_COLLABORATIONS,
      auditLogs: INITIAL_AUDIT_LOGS,
    };
    this.saveData(initial);
    return initial;
  }

  public saveData(custom?: IndustryStoreData): void {
    const toSave = custom || this.data;
    try {
      const dir = path.dirname(this.filePath);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(this.filePath, JSON.stringify(toSave, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error saving IndustryStore:', e);
    }
  }

  // Overview
  public getOverview() {
    const opps = this.data.opportunities;
    const collabs = this.data.collaborations;
    const funded = collabs.filter(c => c.status === 'Active' || c.status === 'MOU Signed');
    const totalPledged = funded.reduce((acc, c) => acc + (c.fundingCommitment?.totalPledgedINR || 1500000), 0);

    return {
      activeOpportunitiesCount: opps.length,
      activeCollaborationsCount: collabs.length,
      totalCSRPledgedINR: totalPledged,
      activeFieldPilotsCount: collabs.filter(c => c.currentPhase === 'Field Testing' || c.currentPhase === 'Commercial Deployment').length,
      topMatchingOpportunities: opps.slice(0, 5),
    };
  }

  // Opportunities
  public getOpportunities(filter?: { domain?: string; stage?: string; query?: string }) {
    let list = [...this.data.opportunities];
    if (filter?.domain && filter.domain !== 'All') {
      list = list.filter(o => o.domain?.toLowerCase() === filter.domain?.toLowerCase());
    }
    if (filter?.stage && filter.stage !== 'All') {
      list = list.filter(o => o.developmentStage?.toLowerCase() === filter.stage?.toLowerCase());
    }
    if (filter?.query) {
      const q = filter.query.toLowerCase();
      list = list.filter(o => 
        (o.title && o.title.toLowerCase().includes(q)) ||
        (o.description && o.description.toLowerCase().includes(q)) ||
        (o.id && o.id.toLowerCase().includes(q))
      );
    }
    return list;
  }

  public getOpportunityById(id: string) {
    return this.data.opportunities.find(o => o.id?.toLowerCase() === id.toLowerCase());
  }

  public expressInterest(opportunityId: string, interestData: { orgName?: string; interestType?: string; message?: string; offeredSupport?: string[] }) {
    const opp = this.getOpportunityById(opportunityId);
    if (!opp) return undefined;

    const newCollab = {
      id: `COL-${Date.now().toString().slice(-4)}`,
      opportunityId,
      projectTitle: opp.title,
      universityName: opp.university?.name || 'BIT Mesra',
      partnerOrganization: interestData.orgName || 'Tata Steel CSR Foundation',
      status: 'Interest Expressed',
      currentPhase: 'Agreement Drafting',
      interestType: interestData.interestType || 'CSR Funding & Mentorship',
      message: interestData.message || '',
      offeredSupport: interestData.offeredSupport || ['Technical Mentorship', 'Pilot Testing Site'],
      createdAt: new Date().toISOString(),
    };

    this.data.collaborations.unshift(newCollab);
    this.addAuditLog({
      action: 'Expressed Partnership Interest',
      target: `${opportunityId} (${opp.title})`,
      details: `Partnership proposal submitted by ${newCollab.partnerOrganization}`,
      status: 'Success'
    });

    this.saveData();
    return newCollab;
  }

  // Collaborations
  public getCollaborations() {
    return this.data.collaborations;
  }

  public updateMilestone(collabId: string, milestoneId: string, status: string) {
    const collab = this.data.collaborations.find(c => c.id === collabId);
    if (collab) {
      collab.updatedAt = new Date().toISOString();
      this.saveData();
    }
    return collab;
  }

  public pledgeFunding(pledgeData: { opportunityId: string; amountINR: number; organizationName: string; notes?: string }) {
    const opp = this.getOpportunityById(pledgeData.opportunityId);
    const collab = {
      id: `COL-FND-${Date.now().toString().slice(-4)}`,
      opportunityId: pledgeData.opportunityId,
      projectTitle: opp?.title || 'Academic Innovation Project',
      universityName: opp?.university?.name || 'IIT ISM Dhanbad',
      partnerOrganization: pledgeData.organizationName,
      status: 'Funding Pledged',
      currentPhase: 'Grant Sanctioned',
      fundingCommitment: {
        totalPledgedINR: pledgeData.amountINR,
        disbursedINR: Math.round(pledgeData.amountINR * 0.3),
        tranches: [
          { tranche: 1, amount: Math.round(pledgeData.amountINR * 0.3), status: 'Disbursed', date: new Date().toISOString().split('T')[0] },
          { tranche: 2, amount: Math.round(pledgeData.amountINR * 0.4), status: 'Pending Milestone 2' },
          { tranche: 3, amount: Math.round(pledgeData.amountINR * 0.3), status: 'Pending Field Pilot' }
        ]
      },
      createdAt: new Date().toISOString(),
    };

    this.data.collaborations.unshift(collab);
    this.addAuditLog({
      action: 'CSR Grant Pledged',
      target: `${pledgeData.opportunityId}`,
      details: `Pledged ₹ ${(pledgeData.amountINR / 100000).toFixed(2)} Lakhs by ${pledgeData.organizationName}`,
      status: 'Success'
    });

    this.saveData();
    return collab;
  }

  // Audit Logs
  public getAuditLogs() {
    return this.data.auditLogs;
  }

  public addAuditLog(entry: { action: string; target: string; details: string; status: string }) {
    const log = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: 'Industry CSR Partner Desk',
      role: 'CSR_DIRECTOR',
      ...entry,
    };
    this.data.auditLogs.unshift(log);
    this.saveData();
    return log;
  }
}

export const industryStorage = new IndustryStorageEngine();
