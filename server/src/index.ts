import express from 'express';
import cors from 'cors';
import { getState, putState } from './db.js';
import { requireIdentity, type AuthedRequest } from './auth.js';

const app = express();

// Behind the Cloudflare Tunnel + nginx; trust the proxy chain for correct
// client info and to read forwarded headers.
app.set('trust proxy', true);
app.use(express.json({ limit: '5mb' }));

// CORS is only relevant for local dev where the Vite dev server may call the
// API on a different port. In production the SPA and API share one origin.
const DEV_ORIGIN = process.env.DEV_ORIGIN ?? 'http://localhost:3000';
app.use(cors({ origin: DEV_ORIGIN, credentials: true }));

// Shared-portfolio mode: everyone who can reach the app reads and writes ONE
// household portfolio (keyed by a fixed id), instead of a separate per-user
// document. Ideal when a family collaborates on a single student's plan.
const SHARED_PORTFOLIO = process.env.SHARED_PORTFOLIO === 'true';
const HOUSEHOLD_KEY = 'household';

// Which storage key a request maps to.
function stateKey(req: AuthedRequest): string {
  return SHARED_PORTFOLIO ? HOUSEHOLD_KEY : req.userEmail!;
}

console.log(
  SHARED_PORTFOLIO
    ? '[pathpilot-api] SHARED portfolio mode — all users share one household document'
    : '[pathpilot-api] PER-USER portfolio mode — each identity gets its own document',
);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'pathpilot-api' });
});

// Load the household (shared) or the current user's saved app state.
app.get('/api/state', requireIdentity, (req: AuthedRequest, res) => {
  const data = getState(stateKey(req));
  res.json({ data: data ?? null });
});

// Replace the household (shared) or the current user's app state.
app.put('/api/state', requireIdentity, (req: AuthedRequest, res) => {
  const body = req.body as { data?: unknown } | undefined;
  if (!body || typeof body !== 'object' || typeof body.data !== 'object' || body.data === null) {
    res.status(400).json({ error: 'Expected JSON body of the form { data: { ... } }' });
    return;
  }
  putState(stateKey(req), body.data);
  res.json({ ok: true });
});

const PORT = Number(process.env.PORT) || 4100;
app.listen(PORT, () => {
  console.log(`[pathpilot-api] listening on port ${PORT}`);
});
