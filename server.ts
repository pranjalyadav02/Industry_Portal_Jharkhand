import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import publicRoutes from "./server/routes/public";
import openRoutes from "./server/routes/open";

async function startServer() {
  const app = express();
  const PORT = 3000;

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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support for Express v5 and React Router fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(console.error);
