import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

// ── Configuration ───────────────────────────────────────────────────
const IS_PROD = process.env.NODE_ENV === 'production';

// JWT signing secret. Required in production; a fixed dev value is used only
// outside production so local runs work without configuration.
const JWT_SECRET = process.env.JWT_SECRET ?? (IS_PROD ? '' : 'dev-insecure-secret');
if (IS_PROD && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}

export const SESSION_COOKIE = 'ra_session';
const SESSION_TTL_DAYS = 30;

// `secure` cookies are only sent over HTTPS. The temporary VM is reached over
// http on the LAN, so this is env-gated (default off) and should be set true
// once the app is served exclusively over HTTPS (roundsahead.com).
const COOKIE_SECURE = process.env.COOKIE_SECURE === 'true';

const BCRYPT_ROUNDS = 12;

// ── Password hashing ────────────────────────────────────────────────
export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

// ── Session tokens (JWT in an httpOnly cookie) ──────────────────────
interface SessionPayload {
  sub: string; // user id
}

export function issueSession(res: Response, userId: string): void {
  const token = jwt.sign({ sub: userId } satisfies SessionPayload, JWT_SECRET, {
    expiresIn: `${SESSION_TTL_DAYS}d`,
  });
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: COOKIE_SECURE,
    sameSite: 'lax',
    maxAge: SESSION_TTL_DAYS * 24 * 60 * 60 * 1000,
    path: '/',
  });
}

export function clearSession(res: Response): void {
  res.clearCookie(SESSION_COOKIE, { path: '/' });
}

export interface AuthedRequest extends Request {
  userId?: string;
}

// Gate for authenticated routes. 401s when no valid session cookie is present.
export function requireAuth(req: AuthedRequest, res: Response, next: NextFunction): void {
  const token = req.cookies?.[SESSION_COOKIE];
  if (!token) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET) as SessionPayload;
    req.userId = payload.sub;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' });
  }
}
