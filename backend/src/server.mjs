import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import youtube from "./routes/youtubeRoute.mjs";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Routes
app.use("/api/youtube/", youtube);

// Fallback 404
app.use((_req, res) => res.status(404).json({ error: "Not found" }));

// Error handler
app.use((err, _req, res, _next) => {
  console.error("[error]", err?.message || err);
  res.status(500).json({ error: "Internal server error" });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => {
  console.log(`[backend] http://localhost:${port}`);
});
