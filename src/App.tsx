import React from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { CommandCenter } from './components/CommandCenter';
import { MarketplaceView } from './components/MarketplaceView';
import { AIMatchingView } from './components/AIMatchingView';
import { CSRView } from './components/CSRView';
import { FundingWorkspace } from './components/FundingWorkspace';
import { PrototypePipelineView } from './components/PrototypePipelineView';
import { CollaborationWorkspaceView } from './components/CollaborationWorkspaceView';
import { ImpactDashboardView } from './components/ImpactDashboardView';
import { PartnerDiscoveryView } from './components/PartnerDiscoveryView';
import { TechTransferView } from './components/TechTransferView';
import { AuditLogView } from './components/AuditLogView';
import { TechSupportView } from './components/TechSupportView';
import { FieldDeploymentView } from './components/FieldDeploymentView';
import { OpportunityDetailModal } from './components/OpportunityDetailModal';
import { ExpressInterestModal } from './components/ExpressInterestModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationsModal } from './components/NotificationsModal';

import { 
  DEMO_ORGANIZATIONS, 
  DEMO_OPPORTUNITIES, 
  DEMO_COLLABORATIONS, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import { 
  Opportunity, 
  Collaboration, 
  OrganizationProfile, 
  UserRole, 
  IndustryMode, 
  AuditLogEntry 
} from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Global State
  const [currentTab, setCurrentTab] = React.useState<string>('command-center');
  const [currentOrg, setCurrentOrg] = React.useState<OrganizationProfile>(DEMO_ORGANIZATIONS[0]);
  const [userRole, setUserRole] = React.useState<UserRole>('CSR Head');
  const [activeModes, setActiveModes] = React.useState<IndustryMode[]>(['Funder', 'Technology Partner']);
  
  // Data Collections
  const [opportunities, setOpportunities] = React.useState<Opportunity[]>(DEMO_OPPORTUNITIES);
  const [collaborations, setCollaborations] = React.useState<Collaboration[]>(DEMO_COLLABORATIONS);
  const [auditLogs, setAuditLogs] = React.useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  // Modals & Popups
  const [selectedOpportunity, setSelectedOpportunity] = React.useState<Opportunity | null>(null);
  const [selectedCollaboration, setSelectedCollaboration] = React.useState<Collaboration | null>(null);
  const [interestModalOpp, setInterestModalOpp] = React.useState<Opportunity | null>(null);
  const [isSearchOpen, setIsSearchOpen] = React.useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleToggleMode = (mode: IndustryMode) => {
    setActiveModes(prev => 
      prev.includes(mode) 
        ? prev.length > 1 ? prev.filter(m => m !== mode) : prev 
        : [...prev, mode]
    );
  };

  // Add immutable audit log entry
  const logAuditAction = (action: string, entityId: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      actor: currentOrg.contactPerson.name,
      organization: currentOrg.name,
      role: userRole,
      action,
      entityId,
      details,
      ipAddress: '10.24.180.44'
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Express Interest Submission
  const handleExpressInterestSubmit = (data: {
    modes: IndustryMode[];
    commitmentAmount: number;
    notes: string;
  }) => {
    if (!interestModalOpp) return;

    const newColId = `COL-2026-00${collaborations.length + 22}`;
    const newCollaboration: Collaboration = {
      id: newColId,
      projectId: interestModalOpp.id,
      projectTitle: interestModalOpp.title,
      district: interestModalOpp.district,
      domain: interestModalOpp.domain,
      university: interestModalOpp.university || 'State Technical Consortium',
      industryPartner: currentOrg.name,
      govtDepartment: interestModalOpp.govtDepartment || 'Dept of IT & e-Gov, Jharkhand',
      corporatePartner: currentOrg.name,
      governmentPartner: interestModalOpp.govtDepartment || 'Dept of IT & e-Gov, Jharkhand',
      communityPartner: `${interestModalOpp.district} Local Community Council`,
      status: 'Field Pilot',
      agreementStatus: 'Drafting MoU',
      totalCommitment: data.commitmentAmount || 1800000,
      releasedAmount: 0,
      remainingAmount: data.commitmentAmount || 1800000,
      beneficiariesTarget: interestModalOpp.beneficiaries,
      beneficiariesCurrent: 0,
      startDate: new Date().toISOString().slice(0, 10),
      riskLevel: 'Low',
      communityValidationScore: 88,
      team: [
        { name: currentOrg.contactPerson?.name || 'CSR Lead', role: 'Corporate Sponsor', org: currentOrg.name, avatar: 'CS' },
        { name: interestModalOpp.facultyLead || 'Lead Investigator', role: 'Faculty Lead', org: interestModalOpp.university || 'University', avatar: 'FL' }
      ],
      milestones: interestModalOpp.milestones.map((m, i) => ({
        id: `M-${i + 1}`,
        title: m.name,
        amount: m.amount,
        status: i === 0 ? 'In Progress' : 'Locked'
      }))
    };

    setCollaborations([newCollaboration, ...collaborations]);
    
    // Update opportunity committed funding
    setOpportunities(prev => prev.map(o => {
      if (o.id === interestModalOpp.id) {
        return {
          ...o,
          fundingCommitted: o.fundingCommitted + data.commitmentAmount
        };
      }
      return o;
    }));

    logAuditAction(
      'Expression of Interest Submitted',
      newColId,
      `Expressed interest with ₹${(data.commitmentAmount/100000).toFixed(1)}L commitment for ${interestModalOpp.title}`
    );

    showToast(`✓ Consortium proposal initialized for ${interestModalOpp.id}. Collaboration Workspace provisioned!`);
  };

  // Milestone Funding Tranche Release
  const handleReleaseTranche = (colId: string, milestoneId: string, amount: number) => {
    setCollaborations(prev => prev.map(col => {
      if (col.id === colId) {
        const updatedMilestones = col.milestones.map(m => {
          if (m.id === milestoneId) {
            return {
              ...m,
              status: 'Completed' as const,
              completionDate: new Date().toISOString().slice(0, 10)
            };
          }
          return m;
        });

        const newReleased = col.releasedAmount + amount;
        return {
          ...col,
          releasedAmount: newReleased,
          remainingAmount: Math.max(0, col.totalCommitment - newReleased),
          milestones: updatedMilestones
        };
      }
      return col;
    }));

    logAuditAction(
      'Milestone Tranche Escrow Release',
      colId,
      `Authorized and disbursed ₹${(amount/100000).toFixed(1)}L tranche for ${milestoneId} based on NABL verification`
    );

    showToast(`✓ Capital tranche of ₹${(amount/100000).toFixed(1)}L successfully released from escrow!`);
  };

  // CSR Budget Allocation Plan
  const handleCommitCSRBudget = (plan: any) => {
    logAuditAction(
      'CSR Portfolio Commitment',
      'CSR-2026-ENVELOPE',
      `Allocated ₹${(plan.budget/100000).toFixed(0)} Lakh across 4 university initiatives in Jharkhand`
    );
    showToast(`✓ CSR Impact Allocation of ₹${(plan.budget/100000).toFixed(0)} Lakh committed! Legal escrow initialized.`);
  };

  // Hero Demos One-Click Launchers
  const handleLaunchHeroDemo = (demoId: 'demo1' | 'demo2' | 'demo3') => {
    if (demoId === 'demo1') {
      setCurrentTab('ai-matching');
      showToast('🚀 Hero Demo 1: AI Opportunity Matching loaded. Review 92% match with Gumla Water Sensor project.');
    } else if (demoId === 'demo2') {
      setCurrentTab('csr-planner');
      showToast('🚀 Hero Demo 2: CSR to Impact (₹50 Lakh allocation) loaded. Review AI-balanced 4-district portfolio.');
    } else if (demoId === 'demo3') {
      setCurrentTab('pipeline');
      showToast('🚀 Hero Demo 3: Prototype to Scale loaded. Advancing university prototype TRL-6 to MSME manufacturing.');
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#F8FAFC] text-slate-900 overflow-hidden font-sans antialiased select-none">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentOrg={currentOrg}
        allOrgs={DEMO_ORGANIZATIONS}
        onSwitchOrg={(org) => {
          setCurrentOrg(org);
          showToast(`Switched active organization to ${org.name}`);
        }}
        userRole={userRole}
        onSwitchRole={(role) => {
          setUserRole(role);
          showToast(`Active role set to ${role}`);
        }}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          activeModes={activeModes}
          onToggleMode={handleToggleMode}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadAlertsCount={3}
          onLaunchHeroDemo={handleLaunchHeroDemo}
          userRole={userRole}
        />

        {/* Dynamic Views */}
        <main className="flex-1 overflow-y-auto bg-slate-50/60">
          {currentTab === 'command-center' && (
            <CommandCenter
              currentOrg={currentOrg}
              opportunities={opportunities}
              collaborations={collaborations}
              onSelectOpportunity={setSelectedOpportunity}
              onSelectCollaboration={(col) => {
                setSelectedCollaboration(col);
                setCurrentTab('collaborations');
              }}
              onNavigateTo={setCurrentTab}
              onExpressInterest={(opp) => setInterestModalOpp(opp)}
              onOpenAudit={() => setCurrentTab('audit-log')}
            />
          )}

          {currentTab === 'marketplace' && (
            <MarketplaceView
              opportunities={opportunities}
              onSelectOpportunity={setSelectedOpportunity}
              onExpressInterest={(opp) => setInterestModalOpp(opp)}
              initialTypeFilter="All"
            />
          )}

          {currentTab === 'govt-challenges' && (
            <MarketplaceView
              opportunities={opportunities}
              onSelectOpportunity={setSelectedOpportunity}
              onExpressInterest={(opp) => setInterestModalOpp(opp)}
              initialTypeFilter="Government Challenge"
            />
          )}

          {currentTab === 'university-projects' && (
            <MarketplaceView
              opportunities={opportunities}
              onSelectOpportunity={setSelectedOpportunity}
              onExpressInterest={(opp) => setInterestModalOpp(opp)}
              initialTypeFilter="University Project"
            />
          )}

          {currentTab === 'ai-matching' && (
            <AIMatchingView
              currentOrg={currentOrg}
              opportunities={opportunities}
              onSelectOpportunity={setSelectedOpportunity}
              onExpressInterest={(opp) => setInterestModalOpp(opp)}
              onOpenAudit={() => setCurrentTab('audit-log')}
            />
          )}

          {currentTab === 'collaborations' && (
            <CollaborationWorkspaceView
              collaborations={collaborations}
              onSelectCollaboration={setSelectedCollaboration}
              selectedCollaboration={selectedCollaboration}
              currentOrg={currentOrg}
            />
          )}

          {currentTab === 'pipeline' && (
            <PrototypePipelineView
              opportunities={opportunities}
              onSelectOpportunity={setSelectedOpportunity}
            />
          )}

          {currentTab === 'deployment' && (
            <FieldDeploymentView />
          )}

          {currentTab === 'tech-support' && (
            <TechSupportView />
          )}

          {currentTab === 'csr-planner' && (
            <CSRView
              currentOrg={currentOrg}
              opportunities={opportunities}
              onSelectOpportunity={setSelectedOpportunity}
              onCommitCSRBudget={handleCommitCSRBudget}
            />
          )}

          {currentTab === 'funding-workspace' && (
            <FundingWorkspace
              collaborations={collaborations}
              userRole={userRole}
              onReleaseTranche={handleReleaseTranche}
            />
          )}

          {currentTab === 'impact-dashboard' && (
            <ImpactDashboardView />
          )}

          {currentTab === 'partners' && (
            <PartnerDiscoveryView />
          )}

          {currentTab === 'tech-transfer' && (
            <TechTransferView />
          )}

          {currentTab === 'audit-log' && (
            <AuditLogView logs={auditLogs} />
          )}
        </main>
      </div>

      {/* Global Interactive Modals */}
      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
        onExpressInterest={(opp) => setInterestModalOpp(opp)}
        onFundProject={(opp) => {
          setInterestModalOpp(opp);
        }}
        currentOrg={currentOrg}
      />

      <ExpressInterestModal
        opportunity={interestModalOpp}
        currentOrg={currentOrg}
        isOpen={!!interestModalOpp}
        onClose={() => setInterestModalOpp(null)}
        onSubmit={handleExpressInterestSubmit}
      />

      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        opportunities={opportunities}
        collaborations={collaborations}
        onSelectOpportunity={(opp) => setSelectedOpportunity(opp)}
        onSelectCollaboration={(col) => {
          setSelectedCollaboration(col);
          setCurrentTab('collaborations');
        }}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigateTo={(tab) => setCurrentTab(tab)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-150 border border-slate-700">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
