require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const visitor = require("./middleware/visitor");
const analytics = require("./routes/analytics");
const downloads = require("./routes/downloads");
const downloader = require("./routes/downloader");
const admin = require("./routes/admin");

const app = express();
app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(",").map(v => v.trim()) : false,
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json({ limit: "20kb" }));
app.use(visitor);

app.get("/health", (_req, res) => res.json({ ok: true, service: "yt-downloader-api" }));
app.use("/api/analytics", analytics);
app.use("/api/downloads", downloads);
app.use("/api/downloader", downloader);
app.use("/api/admin", admin);

app.use((err, _req, res, _next) => {
  console.error(err.message);
  res.status(500).json({ error: "Internal server error" });
});

const port = Number(process.env.PORT) || 3000;
app.listen(port, () => console.log(`YT-Downloader API listening on port ${port}`));
