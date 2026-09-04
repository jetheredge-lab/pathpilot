import { API_BASE_URL } from './config';

// The signed-in user, as returned by the backend (never includes the hash).
export interface AuthUser {
  id: string;
  email: string;
  emailVerified: boolean;
  plan: string;
  entitlementExpiresAt: string | null;
  active: boolean;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  token?: string | null;
}

// Thin fetch wrapper. Native clients authenticate with a Bearer token (there is
// no cookie jar on device), which the backend accepts as of Phase 8.0.
async function request<T>(path: string, opts: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: opts.method ?? 'GET',
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    throw new Error(data?.error ?? `Request failed (${res.status})`);
  }
  return data as T;
}

export const api = {
  signup: (email: string, password: string) =>
    request<AuthResponse>('/auth/signup', { method: 'POST', body: { email, password } }),
  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', { method: 'POST', body: { email, password } }),
  me: (token: string) => request<{ user: AuthUser }>('/auth/me', { token }),
  deleteAccount: (token: string) =>
    request<{ ok: boolean }>('/auth/account', { method: 'DELETE', token }),
};
