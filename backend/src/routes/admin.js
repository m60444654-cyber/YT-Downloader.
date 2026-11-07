const express = require("express");
const db = require("../db");
const auth = require("../middleware/adminAuth");
const router = express.Router();

router.use(auth);
router.get("/stats", (_req, res) => {
  const visitors = db.prepare("SELECT COUNT(*) AS total FROM visitors").get().total;
  const pageViews = db.prepare("SELECT COUNT(*) AS total FROM page_views").get().total;
  const downloadClicks = db.prepare("SELECT COUNT(*) AS total FROM download_events").get().total;
  const topPages = db.prepare("SELECT path, COUNT(*) AS views FROM page_views GROUP BY path ORDER BY views DESC LIMIT 10").all();
  const recentDownloads = db.prepare("SELECT version, created_at FROM download_events ORDER BY id DESC LIMIT 20").all();
  res.json({ visitors, pageViews, downloadClicks, topPages, recentDownloads });
});

module.exports = router;
