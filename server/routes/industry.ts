import { Router, Request, Response } from 'express';
import { industryStorage } from '../data/industryStore';

const router = Router();

// Overview
router.get('/overview', (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: industryStorage.getOverview() });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Opportunities
router.get('/opportunities', (req: Request, res: Response) => {
  try {
    const { domain, stage, query } = req.query as Record<string, string>;
    const opps = industryStorage.getOpportunities({ domain, stage, query });
    res.json({ success: true, data: opps, meta: { total: opps.length } });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

router.get('/opportunities/:id', (req: Request, res: Response) => {
  try {
    const opp = industryStorage.getOpportunityById(req.params.id);
    if (!opp) return res.status(404).json({ success: false, error: 'Opportunity not found' });
    res.json({ success: true, data: opp });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Express Interest
router.post('/opportunities/:id/interest', (req: Request, res: Response) => {
  try {
    const { orgName, interestType, message, offeredSupport } = req.body;
    const collab = industryStorage.expressInterest(req.params.id, { orgName, interestType, message, offeredSupport });
    if (!collab) return res.status(404).json({ success: false, error: 'Opportunity not found' });
    res.status(201).json({ success: true, data: collab });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Collaborations
router.get('/collaborations', (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: industryStorage.getCollaborations() });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Funding Pledge
router.post('/funding/pledge', (req: Request, res: Response) => {
  try {
    const { opportunityId, amountINR, organizationName, notes } = req.body;
    if (!opportunityId || !amountINR) {
      return res.status(400).json({ success: false, error: 'Opportunity ID and amount are required' });
    }
    const pledge = industryStorage.pledgeFunding({
      opportunityId,
      amountINR: Number(amountINR),
      organizationName: organizationName || 'Tata Steel CSR Foundation',
      notes
    });
    res.status(201).json({ success: true, data: pledge });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

// Audit Logs
router.get('/audit-logs', (req: Request, res: Response) => {
  try {
    res.json({ success: true, data: industryStorage.getAuditLogs() });
  } catch (e: any) {
    res.status(500).json({ success: false, error: e.message });
  }
});

export default router;
