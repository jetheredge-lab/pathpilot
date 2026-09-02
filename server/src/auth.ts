import { createRemoteJWKSet, jwtVerify } from 'jose';
import type { Request, Response, NextFunction } from 'express';

// Identity comes from Cloudflare Access, which authenticates the user at the
// edge and forwards a signed JWT in the `Cf-Access-Jwt-Assertion` header.
// We verify that JWT against the team's public keys and trust the email
// claim inside it — so this service needs no passwords of its own.
//
// When the Cloudflare env vars are absent (local development, where nothing
// sits in front of the API), we fall back to a fixed development identity so
// the app is still fully usable offline.

const TEAM_DOMAIN = process.env.CF_ACCESS_TEAM_DOMAIN; // e.g. myteam.cloudflareaccess.com
const AUD = process.env.CF_ACCESS_AUD; // Access application "Audience" (AUD) tag — optional
const DEV_EMAIL = (process.env.DEV_IDENTITY_EMAIL ?? 'dev@local').toLowerCase();

// Verification turns on as soon as we know the team domain. The AUD tag is an
// optional extra check ("token was issued for THIS app"); when it's absent we
// still verify the signature + issuer and trust the email claim, since the
// Access policy at the edge already controls who may reach this service.
const accessEnabled = Boolean(TEAM_DOMAIN);

const jwks = accessEnabled
  ? createRemoteJWKSet(new URL(`https://${TEAM_DOMAIN}/cdn-cgi/access/certs`))
  : null;

if (accessEnabled) {
  console.log(
    `[auth] Cloudflare Access verification enabled for team ${TEAM_DOMAIN}` +
      (AUD ? ' (with AUD audience check)' : ' (no AUD set — audience check skipped)'),
  );
} else {
  console.warn(
    `[auth] Cloudflare Access NOT configured — using dev identity "${DEV_EMAIL}". ` +
      'Set CF_ACCESS_TEAM_DOMAIN in production.',
  );
}

export interface AuthedRequest extends Request {
  userEmail?: string;
}

export async function requireIdentity(
  req: AuthedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> {
  if (!accessEnabled || !jwks || !TEAM_DOMAIN) {
    req.userEmail = DEV_EMAIL;
    next();
    return;
  }

  const token = req.header('Cf-Access-Jwt-Assertion');
  if (!token) {
    res.status(401).json({ error: 'Missing Cloudflare Access token' });
    return;
  }

  try {
    const verifyOpts: { issuer: string; audience?: string } = {
      issuer: `https://${TEAM_DOMAIN}`,
    };
    if (AUD) verifyOpts.audience = AUD;
    const { payload } = await jwtVerify(token, jwks, verifyOpts);
    const email = (payload.email as string | undefined) ?? (payload.sub as string | undefined);
    if (!email) {
      res.status(401).json({ error: 'No identity in Cloudflare Access token' });
      return;
    }
    req.userEmail = email.toLowerCase();
    next();
  } catch {
    res.status(401).json({ error: 'Invalid Cloudflare Access token' });
  }
}
