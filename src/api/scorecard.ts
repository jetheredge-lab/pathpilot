// Client for the College Scorecard proxy (net price by income, etc.).

export interface Financials {
  unitId: number;
  name: string;
  city: string;
  state: string;
  ownership: 'public' | 'private' | 'other';
  enrollment: number | null;
  sat25: number | null;
  sat75: number | null;
  websiteUrl: string | null;
  netPriceByIncome: {
    band0_30k: number | null;
    band30_48k: number | null;
    band48_75k: number | null;
    band75_110k: number | null;
    band110k_plus: number | null;
  };
  costOfAttendance: number | null;
  admissionRate: number | null;
  medianDebt: number | null;
  earnings10yr: number | null;
  earnings6yr: number | null;
  netPriceCalculatorUrl: string | null;
  source: string;
  vintage: string;
}

export async function getScorecardEnabled(): Promise<boolean> {
  try {
    const res = await fetch('/api/scorecard/status', { credentials: 'include' });
    if (!res.ok) return false;
    const json = await res.json();
    return !!json.enabled;
  } catch {
    return false;
  }
}

// Search all operating U.S. colleges by name (+ optional state).
export async function searchColleges(q: string, state?: string): Promise<Financials[]> {
  try {
    const params = new URLSearchParams({ q });
    if (state) params.set('state', state);
    const res = await fetch(`/api/scorecard/search?${params.toString()}`, { credentials: 'include' });
    if (!res.ok) return [];
    const json = await res.json();
    return json.results ?? [];
  } catch {
    return [];
  }
}

// Fetch financials directly by IPEDS UNITID.
export async function getFinancialsByUnitId(unitId: number): Promise<Financials | null> {
  try {
    const res = await fetch(`/api/scorecard/${unitId}`, { credentials: 'include' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.financials ?? null;
  } catch {
    return null;
  }
}

// Resolve a college by name (+ state) and return its financials, or null.
export async function lookupFinancials(name: string, state?: string): Promise<Financials | null> {
  try {
    const params = new URLSearchParams({ name });
    if (state) params.set('state', state);
    const res = await fetch(`/api/scorecard/lookup?${params.toString()}`, { credentials: 'include' });
    if (!res.ok) return null;
    const json = await res.json();
    return json.financials ?? null;
  } catch {
    return null;
  }
}
