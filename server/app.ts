import express from "express";
import publicRoutes from "./routes/public";
import openRoutes from "./routes/open";

const app = express();

app.use(express.json());

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Backend API Routes
app.use("/api/v1/public", publicRoutes);
app.use("/api/v1/open", openRoutes);

// Fallback for missing APIs
app.use("/api/*", (req, res) => {
  res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "API endpoint not found." } });
});

export default app;
