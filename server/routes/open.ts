import { Router } from "express";
import { mockDB, formatResponse } from "../data/mockDB";
import { PublicProjectionService } from "../services/PublicProjectionService";

const router = Router();

// OPEN DATA EXPORT & APIs
// These are rate limited, safe public projections suitable for CSV/JSON export or external apps.

router.get("/challenges", (req, res) => {
  const projected = mockDB.challenges.map(PublicProjectionService.projectChallenge);
  res.json(formatResponse(projected));
});

router.get("/projects", (req, res) => {
  const projected = mockDB.projects.map(PublicProjectionService.projectProject);
  res.json(formatResponse(projected));
});

router.get("/solutions", (req, res) => {
  res.json(formatResponse([{ id: "SOL-001", title: "Water Mesh", trl: 6 }]));
});

router.get("/districts", (req, res) => {
  res.json(formatResponse(mockDB.districts));
});

router.get("/infrastructure", (req, res) => {
  res.json(formatResponse([{ id: "INF-001", type: "Road", status: "Active" }]));
});

router.get("/impact", (req, res) => {
  res.json(formatResponse(mockDB.impact));
});

router.get("/statistics", (req, res) => {
  res.json(formatResponse(mockDB.overview));
});

export default router;
