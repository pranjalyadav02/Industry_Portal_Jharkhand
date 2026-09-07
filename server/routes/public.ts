import { Router, Request, Response, NextFunction } from "express";
import { mockDB, formatResponse, formatError } from "../data/mockDB";
import { PublicProjectionService } from "../services/PublicProjectionService";

const router = Router();

// 51. RATE LIMITING (Mock Implementation)
const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  // Simple pass-through middleware simulating rate-limits
  res.setHeader("X-RateLimit-Limit", "100");
  res.setHeader("X-RateLimit-Remaining", "99");
  next();
};

router.use(rateLimiter);

// 4. PUBLIC HOME / STATE OVERVIEW
router.get("/overview", (req, res) => {
  res.json(formatResponse(mockDB.overview));
});

// 5. STATEWIDE IMPACT MAP
router.get("/map", (req, res) => {
  res.json(formatResponse({
    type: "FeatureCollection",
    features: mockDB.challenges.map(c => ({
      type: "Feature",
      geometry: { type: "Point", coordinates: [85.3, 23.3] }, // Approximate center
      properties: {
        id: c.publicId,
        title: c.title,
        domain: c.domain,
        status: c.currentStatus
      }
    }))
  }));
});

// 6 & 7. GEOGRAPHIC HIERARCHY & DISTRICT TRANSPARENCY
router.get("/districts", (req, res) => {
  res.json(formatResponse(mockDB.districts));
});

router.get("/districts/:id", (req, res) => {
  const district = mockDB.districts.find(d => d.id === req.params.id);
  if (!district) return res.status(404).json(formatError("NOT_FOUND", "District not found"));
  res.json(formatResponse(district));
});

router.get("/districts/:id/blocks", (req, res) => {
  res.json(formatResponse([{ id: "b1", name: "Bishunpur" }, { id: "b2", name: "Torpa" }]));
});

router.get("/blocks/:id", (req, res) => {
  res.json(formatResponse({ id: req.params.id, name: "Bishunpur", challenges: 150 }));
});

router.get("/local-areas/:id", (req, res) => {
  res.json(formatResponse({ id: req.params.id, name: "Banari Village", type: "Village" }));
});

// 9. PUBLIC PROBLEM EXPLORER
router.get("/challenges", (req, res) => {
  const projected = mockDB.challenges.map(PublicProjectionService.projectChallenge);
  res.json(formatResponse(projected));
});

// 10. PUBLIC PROBLEM DETAIL
router.get("/challenges/:publicId", (req, res) => {
  const challenge = mockDB.challenges.find(c => c.publicId === req.params.publicId);
  if (!challenge) return res.status(404).json(formatError("NOT_FOUND", "Challenge not found"));
  res.json(formatResponse(PublicProjectionService.projectChallenge(challenge)));
});

// 12. PROJECT TRACKER
router.get("/projects", (req, res) => {
  const projected = mockDB.projects.map(PublicProjectionService.projectProject);
  res.json(formatResponse(projected));
});

router.get("/projects/:id", (req, res) => {
  const project = mockDB.projects.find(p => p.publicId === req.params.id);
  if (!project) return res.status(404).json(formatError("NOT_FOUND", "Project not found"));
  res.json(formatResponse(PublicProjectionService.projectProject(project)));
});

// 15. SOLUTION LIBRARY
router.get("/solutions", (req, res) => {
  res.json(formatResponse([{ id: "SOL-001", title: "Water Mesh", trl: 6 }]));
});

router.get("/solutions/:id", (req, res) => {
  res.json(formatResponse({ id: req.params.id, title: "Water Mesh", trl: 6, impact: "8400 beneficiaries" }));
});

// 16. SOLUTION REPLICATION
router.post("/solutions/:id/replication-request", (req, res) => {
  res.json(formatResponse({ status: "REQUESTED", trackingId: "REQ-1234" }));
});

// 17. INFRASTRUCTURE TRANSPARENCY
router.get("/infrastructure", (req, res) => {
  res.json(formatResponse([{ id: "INF-001", type: "Road", status: "Active" }]));
});

router.get("/infrastructure/:id", (req, res) => {
  res.json(formatResponse({ id: req.params.id, type: "Road", status: "Active", repairObligation: "Warranty Active" }));
});

// 20. CONTRACTOR PERFORMANCE
router.get("/contractors", (req, res) => {
  res.json(formatResponse([{ id: "CON-001", name: "ABC Builders Ltd", slaCompliance: 85 }]));
});

router.get("/contractors/:id", (req, res) => {
  res.json(formatResponse({ id: req.params.id, name: "ABC Builders Ltd", slaCompliance: 85, projects: 12 }));
});

// 21. STATE ACCOUNTABILITY
router.get("/accountability", (req, res) => {
  const projected = mockDB.accountability.map(PublicProjectionService.projectAccountability);
  res.json(formatResponse(projected));
});

router.get("/accountability/:id", (req, res) => {
  const account = mockDB.accountability.find(a => a.publicId === req.params.id);
  if (!account) return res.status(404).json(formatError("NOT_FOUND", "Accountability record not found"));
  res.json(formatResponse(PublicProjectionService.projectAccountability(account)));
});

// 23. SLA TRANSPARENCY
router.get("/sla", (req, res) => {
  res.json(formatResponse([{ department: "Road Construction", onTimePercentage: 82 }]));
});

router.get("/sla/overview", (req, res) => {
  res.json(formatResponse({ responseTime: "48h", verificationTime: "72h", resolutionTime: "45d", onTimePercentage: 82 }));
});

// 24. FUNDING TRANSPARENCY
router.get("/funding", (req, res) => {
  res.json(formatResponse([{ source: "CSR Funds", committed: 10000000, released: 5000000 }]));
});

router.get("/funding/overview", (req, res) => {
  res.json(formatResponse({ committed: 500000000, released: 200000000, utilized: 150000000 }));
});

// 28. GOVERNMENT PERFORMANCE
router.get("/government-performance", (req, res) => {
  res.json(formatResponse({ responseTime: "24h", resolutionRate: 75 }));
});

// 29. IMPACT DASHBOARD
router.get("/impact", (req, res) => {
  res.json(formatResponse([{ project: "PUB-PR-104", beneficiaries: 8400 }]));
});

router.get("/impact/overview", (req, res) => {
  res.json(formatResponse(mockDB.impact));
});

// 32. DOMAIN ANALYTICS
router.get("/domains", (req, res) => {
  res.json(formatResponse([{ id: "water", name: "Water", challenges: 1500 }, { id: "education", name: "Education", challenges: 1200 }]));
});

router.get("/domains/:id", (req, res) => {
  res.json(formatResponse({ id: req.params.id, name: req.params.id, challenges: 1500, projects: 45 }));
});

// 33. INTEGRITY TRANSPARENCY
router.get("/integrity/overview", (req, res) => {
  res.json(formatResponse({ reports: 450, verifications: 300, investigations: 120, closed: 85 }));
});

// 35. PUBLIC FEEDBACK
router.post("/feedback", (req, res) => {
  res.json(formatResponse({ status: "RECEIVED" }));
});

router.get("/feedback/:entityId", (req, res) => {
  res.json(formatResponse([{ id: "FB-01", message: "Resolved completely", date: "2026-09-01" }]));
});

// 38. PUBLIC ALERTS
router.get("/alerts", (req, res) => {
  res.json(formatResponse([{ id: "ALT-001", type: "INFO", message: "New water sensor deployment in Gumla" }]));
});

// 39. GLOBAL SEARCH
router.get("/search", (req, res) => {
  const q = req.query.q as string || "";
  res.json(formatResponse({
    results: [
      { type: "challenge", id: "CH-001", title: "Village Drinking Water Issue match" }
    ].filter(r => r.title.toLowerCase().includes(q.toLowerCase()))
  }));
});

// 40. DATA LINEAGE
router.get("/lineage/:metricId", (req, res) => {
  res.json(formatResponse({ metricId: req.params.metricId, source: "Project Registry", lastUpdated: "2026-09-07" }));
});

// 41. METHODOLOGY CENTER
router.get("/methodology", (req, res) => {
  res.json(formatResponse([{ topic: "SLA Calculation", description: "Business days excluding state holidays." }]));
});

router.get("/methodology/:topic", (req, res) => {
  res.json(formatResponse({ topic: req.params.topic, description: "Detailed methodology explanation here." }));
});

// 42. AI TRANSPARENCY
router.get("/ai/transparency", (req, res) => {
  res.json(formatResponse([{ purpose: "Classification", model: "Gemini 3.1 Pro", confidence: 95 }]));
});

// 43. PUBLIC AI INSIGHTS
router.get("/ai/insights", (req, res) => {
  res.json(formatResponse([{ insight: "Water-related challenges increased 18%", source: "Platform Analytics", confidence: "High" }]));
});

// 46. PUBLIC REPORTS
router.get("/reports", (req, res) => {
  res.json(formatResponse([{ id: "REP-2026-09", title: "State Impact Report Sept 2026" }]));
});

router.get("/reports/:id", (req, res) => {
  res.json(formatResponse({ id: req.params.id, title: "State Impact Report Sept 2026", generatedDate: "2026-09-01" }));
});

// 54. DATA CORRECTION
router.post("/data-corrections", (req, res) => {
  res.json(formatResponse({ status: "REPORTED", ticketId: "CORR-992" }));
});

// 60. PUBLIC DASHBOARD API
router.get("/dashboard", (req, res) => {
  res.json(formatResponse({
    statewideKpis: mockDB.overview,
    impactSummary: mockDB.impact,
    districtSummary: mockDB.districts.slice(0, 5),
    alerts: [{ id: "ALT-001", message: "New deployment active" }]
  }));
});

// 65. DEMO MODE
router.post("/demo/reset", (req, res) => {
  res.json(formatResponse({ status: "RESET_COMPLETE", message: "Demo data has been reset for the current session." }));
});

export default router;
