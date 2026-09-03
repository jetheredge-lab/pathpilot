// Thin client for the RoundsAhead sync backend.
//
// In production, nginx serves the SPA and proxies `/api/*` to the API
// container, so a relative base URL works everywhere. In local dev, Vite
// proxies `/api` to the backend (see vite.config.ts).
//
// Identity is provided by Cloudflare Access at the edge (an auth cookie the
// browser already holds), so requests just need `credentials: 'include'`.

const API_BASE = '/api';

export interface AppSnapshot {
  profile: unknown;
  savedColleges: unknown;
  finalFive: unknown;
  timelineTasks: unknown;
  essays: unknown;
  campusVisits: unknown;
}

export interface LoadResult {
  reachable: boolean;
  data: Partial<AppSnapshot> | null;
}

// Loads this user's saved state.
// - reachable=false  -> backend could not be contacted (offline / not deployed)
// - reachable=true, data=null -> reachable but no saved state yet (new user)
export async function fetchRemoteState(): Promise<LoadResult> {
  try {
    const res = await fetch(`${API_BASE}/state`, {
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return { reachable: false, data: null };
    const json = await res.json();
    return { reachable: true, data: json?.data ?? null };
  } catch {
    return { reachable: false, data: null };
  }
}

// Persists the full app snapshot for this user. Returns true on success.
export async function saveRemoteState(snapshot: AppSnapshot): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/state`, {
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: snapshot }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
