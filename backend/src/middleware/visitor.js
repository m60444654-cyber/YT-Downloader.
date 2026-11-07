const crypto = require("node:crypto");

module.exports = function visitor(req, res, next) {
  let id = req.headers.cookie?.split(";").map(v => v.trim()).find(v => v.startsWith("yt_visitor="))?.split("=")[1];
  if (!id || !/^[a-f0-9-]{36}$/i.test(id)) {
    id = crypto.randomUUID();
    res.append("Set-Cookie", `yt_visitor=${id}; Max-Age=31536000; Path=/; SameSite=Lax; HttpOnly${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
  }
  req.visitorId = id;
  next();
};
