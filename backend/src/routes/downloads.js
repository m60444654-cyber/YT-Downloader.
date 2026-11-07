const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/track", (req, res) => {
  const version = typeof req.body?.version === "string" ? req.body.version.slice(0, 40) : null;
  db.prepare("INSERT INTO download_events(visitor_id, version, created_at) VALUES (?, ?, ?)")
    .run(req.visitorId, version, new Date().toISOString());
  res.status(201).json({ ok: true, message: "Download click recorded." });
});

router.get("/latest", (_req, res) => {
  res.json({ url: process.env.DOWNLOAD_URL || null });
});

module.exports = router;
