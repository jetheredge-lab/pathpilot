// Client for the RoundsAhead billing API (Stripe Checkout, hosted).

export interface BillingStatus {
  enabled: boolean;
  active: boolean;
  plan: string;
  expiresAt: string | null;
  hasCustomer: boolean;
}

export async function getBillingStatus(): Promise<BillingStatus> {
  try {
    const res = await fetch('/api/billing/status', { credentials: 'include' });
    if (!res.ok) return { enabled: false, active: false, plan: 'free', expiresAt: null, hasCustomer: false };
    return await res.json();
  } catch {
    return { enabled: false, active: false, plan: 'free', expiresAt: null, hasCustomer: false };
  }
}

// Starts hosted Checkout and redirects the browser to Stripe. Returns an error
// string if it couldn't start.
export async function startCheckout(): Promise<string | null> {
  try {
    const res = await fetch('/api/billing/checkout', { method: 'POST', credentials: 'include' });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.url) return json?.error ?? 'Could not start checkout';
    window.location.href = json.url;
    return null;
  } catch {
    return 'Could not reach the server';
  }
}

// Opens the Stripe Customer Portal (receipts / refunds). Redirects on success.
export async function openBillingPortal(): Promise<string | null> {
  try {
    const res = await fetch('/api/billing/portal', { method: 'POST', credentials: 'include' });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.url) return json?.error ?? 'Could not open billing portal';
    window.location.href = json.url;
    return null;
  } catch {
    return 'Could not reach the server';
  }
}
