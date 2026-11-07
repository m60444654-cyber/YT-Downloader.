module.exports = function adminAuth(req, res, next) {
  const expected = process.env.ADMIN_TOKEN;
  const supplied = req.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!expected || expected.length < 32) {
    return res.status(503).json({ error: "Admin access is not configured securely." });
  }
  if (!supplied || supplied !== expected) return res.status(401).json({ error: "Unauthorized" });
  next();
};
