const Database = require("better-sqlite3");
const path = require("path");

const dbPath = process.env.DB_PATH || path.join(__dirname, "..", "terpshake.db");
const db = new Database(dbPath);

// Performance settings
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE,
    password    TEXT NOT NULL,
    avatar      TEXT,
    avatar_link TEXT,
    date        TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS profiles (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id          INTEGER NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    company          TEXT,
    website          TEXT,
    location         TEXT,
    status           TEXT NOT NULL,
    skills           TEXT NOT NULL,
    bio              TEXT,
    githubusername   TEXT,
    avatar_link      TEXT,
    social_youtube   TEXT,
    social_twitter   TEXT,
    social_facebook  TEXT,
    social_linkedin  TEXT,
    social_instagram TEXT,
    date             TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS experience (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id  INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    company     TEXT NOT NULL,
    location    TEXT,
    from_date   TEXT NOT NULL,
    to_date     TEXT,
    current     INTEGER DEFAULT 0,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS education (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    profile_id   INTEGER NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    school       TEXT NOT NULL,
    degree       TEXT NOT NULL,
    fieldofstudy TEXT NOT NULL,
    from_date    TEXT NOT NULL,
    to_date      TEXT,
    current      INTEGER DEFAULT 0,
    description  TEXT
  );

  CREATE TABLE IF NOT EXISTS posts (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text    TEXT NOT NULL,
    name    TEXT,
    avatar  TEXT,
    date    TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS likes (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(post_id, user_id)
  );

  CREATE TABLE IF NOT EXISTS comments (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    text    TEXT NOT NULL,
    name    TEXT,
    avatar  TEXT,
    date    TEXT DEFAULT (datetime('now'))
  );
`);

console.log("SQLite connected");

module.exports = db;
