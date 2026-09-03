import Database from 'better-sqlite3';
import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// Single-file SQLite store. One row per user identity (email), holding the
// entire app state as a JSON document. This mirrors the frontend's own
// state shape exactly, so no relational modeling is needed.
const DB_PATH = process.env.DB_PATH ?? './data/roundsahead.db';

mkdirSync(dirname(DB_PATH), { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.exec(`
  CREATE TABLE IF NOT EXISTS user_state (
    email      TEXT PRIMARY KEY,
    data       TEXT NOT NULL,
    updated_at TEXT NOT NULL
  );
`);

const selectStmt = db.prepare('SELECT data FROM user_state WHERE email = ?');
const upsertStmt = db.prepare(`
  INSERT INTO user_state (email, data, updated_at)
  VALUES (@email, @data, @updated_at)
  ON CONFLICT(email) DO UPDATE SET
    data = excluded.data,
    updated_at = excluded.updated_at
`);

export function getState(email: string): unknown | null {
  const row = selectStmt.get(email) as { data: string } | undefined;
  return row ? JSON.parse(row.data) : null;
}

export function putState(email: string, data: unknown): void {
  upsertStmt.run({
    email,
    data: JSON.stringify(data),
    updated_at: new Date().toISOString(),
  });
}
