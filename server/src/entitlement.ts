// Whether a user currently has an active paid entitlement.
export function entitlementActive(user: { plan: string; entitlementExpiresAt: Date | null }): boolean {
  if (user.plan !== 'paid') return false;
  if (!user.entitlementExpiresAt) return false;
  return new Date(user.entitlementExpiresAt).getTime() > Date.now();
}
