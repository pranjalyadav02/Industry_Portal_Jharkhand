import express from "express";
import cors from "cors";
import publicRoutes from "./routes/public";
import openRoutes from "./routes/open";
import industryRoutes from "./routes/industry";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", portal: "Industry_Portal_Jharkhand", timestamp: new Date() });
});

// Backend API Routes
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/open", openRoutes);
app.use("/api/v1/industry", industryRoutes);

// Fallback for missing APIs
app.use("/api/*", (req, res) => {
  res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "API endpoint not found." } });
});

export default app;
