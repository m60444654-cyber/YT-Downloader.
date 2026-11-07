const express = require("express");
const db = require("../db");
const router = express.Router();

router.post("/page-view", (req, res) => {
  const now = new Date().toISOString();
  const page = typeof req.body?.path === "string" ? req.body.path.slice(0, 300) : "/";
  const referrer = typeof req.body?.referrer === "string" ? req.body.referrer.slice(0, 500) : null;
  db.prepare(`INSERT INTO visitors(visitor_id, first_seen, last_seen, visits)
    VALUES (?, ?, ?, 1)
    ON CONFLICT(visitor_id) DO UPDATE SET last_seen=excluded.last_seen, visits=visits+1`)
    .run(req.visitorId, now, now);
  db.prepare("INSERT INTO page_views(visitor_id, path, referrer, created_at) VALUES (?, ?, ?, ?)")
    .run(req.visitorId, page, referrer, now);
  res.status(201).json({ ok: true });
});

module.exports = router;
