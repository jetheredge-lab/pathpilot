import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth.js';
import { oauthRouter } from './routes/oauth.js';
import { studentsRouter } from './routes/students.js';
import { billingRouter, billingWebhookHandler } from './routes/billing.js';
import { requireAuth } from './auth.js';

const app = express();

// Behind the Cloudflare Tunnel + nginx.
app.set('trust proxy', 1);

// Stripe webhook needs the RAW body for signature verification, so it must be
// registered before the JSON body parser.
app.post('/api/billing/webhook', express.raw({ type: 'application/json' }), billingWebhookHandler);

app.use(express.json({ limit: '5mb' }));
// Apple's Sign in with Apple posts its callback as form-encoded data.
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// CORS only matters for local dev (Vite on a different port). In production the
// SPA and API share one origin.
const DEV_ORIGIN = process.env.DEV_ORIGIN ?? 'http://localhost:3000';
app.use(cors({ origin: DEV_ORIGIN, credentials: true }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'roundsahead-api' });
});

// Throttle auth endpoints to blunt credential stuffing / brute force.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many attempts, please try again later' },
});

app.use('/api/auth', authLimiter, authRouter);
// OAuth redirect/callback routes (not rate-limited like credential endpoints).
app.use('/api/auth', oauthRouter);
app.use('/api/students', requireAuth, studentsRouter);
app.use('/api/billing', requireAuth, billingRouter);

const PORT = Number(process.env.PORT) || 4100;
app.listen(PORT, () => {
  console.log(`[roundsahead-api] listening on port ${PORT}`);
});
