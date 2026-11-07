const fs = require("node:fs");
const path = require("node:path");
const Database = require("node:sqlite");

const dbPath = process.env.DB_PATH || "./data/app.sqlite";
if (dbPath !== ":memory:") fs.mkdirSync(path.dirname(path.resolve(dbPath)), { recursive: true });

const db = new Database.Database(dbPath);
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS visitors (
    visitor_id TEXT PRIMARY KEY,
    first_seen TEXT NOT NULL,
    last_seen TEXT NOT NULL,
    visits INTEGER NOT NULL DEFAULT 1
  );
  CREATE TABLE IF NOT EXISTS page_views (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT NOT NULL,
    path TEXT NOT NULL,
    referrer TEXT,
    created_at TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS download_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    visitor_id TEXT NOT NULL,
    version TEXT,
    created_at TEXT NOT NULL
  );
`);

module.exports = db;
