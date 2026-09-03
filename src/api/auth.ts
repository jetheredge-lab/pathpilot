// Client for the RoundsAhead auth API. The session lives in an httpOnly cookie
// set by the server, so requests just need `credentials: 'include'`.

const API_BASE = '/api/auth';

export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  plan: string;
  entitlementExpiresAt: string | null;
}

interface AuthResult {
  user?: AuthUser;
  error?: string;
}

async function post(path: string, body?: unknown): Promise<AuthResult> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return { error: json?.error ?? 'Something went wrong' };
    return { user: json.user };
  } catch {
    return { error: 'Could not reach the server' };
  }
}

// Which OAuth providers are configured on the server (drives which buttons show).
export async function apiProviders(): Promise<{ google: boolean; apple: boolean }> {
  try {
    const res = await fetch(`${API_BASE}/providers`, { credentials: 'include' });
    if (!res.ok) return { google: false, apple: false };
    return await res.json();
  } catch {
    return { google: false, apple: false };
  }
}

// Returns the signed-in user, or null if there is no valid session.
export async function apiMe(): Promise<AuthUser | null> {
  try {
    const res = await fetch(`${API_BASE}/me`, { credentials: 'include' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.user ?? null;
  } catch {
    return null;
  }
}

export function apiSignup(email: string, password: string): Promise<AuthResult> {
  return post('/signup', { email, password });
}

export function apiLogin(email: string, password: string): Promise<AuthResult> {
  return post('/login', { email, password });
}

export async function apiLogout(): Promise<void> {
  await post('/logout');
}

export async function apiDeleteAccount(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/account`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return res.ok;
  } catch {
    return false;
  }
}
