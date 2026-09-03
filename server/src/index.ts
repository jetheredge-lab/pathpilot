import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { authRouter } from './routes/auth.js';
import { studentsRouter } from './routes/students.js';
import { requireAuth } from './auth.js';

const app = express();

// Behind the Cloudflare Tunnel + nginx.
app.set('trust proxy', 1);
app.use(express.json({ limit: '5mb' }));
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
app.use('/api/students', requireAuth, studentsRouter);

const PORT = Number(process.env.PORT) || 4100;
app.listen(PORT, () => {
  console.log(`[roundsahead-api] listening on port ${PORT}`);
});
