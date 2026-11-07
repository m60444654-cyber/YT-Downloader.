const express = require("express");
const router = express.Router();

router.post("/prepare", (req, res) => {
  const input = req.body?.url;
  if (typeof input !== "string" || input.length > 2048) {
    return res.status(400).json({ error: "A valid URL is required." });
  }
  let parsed;
  try { parsed = new URL(input); } catch { return res.status(400).json({ error: "Invalid URL." }); }
  if (parsed.protocol !== "https:") return res.status(400).json({ error: "Only HTTPS URLs are accepted." });

  // This endpoint deliberately does not fetch or download third-party media.
  // A download worker can be added after the permitted content sources and integration
  // with the desktop application's source code are confirmed.
  res.status(202).json({
    status: "not_configured",
    message: "The API is ready for integration. Only download content you own or are authorized to use."
  });
});

module.exports = router;
