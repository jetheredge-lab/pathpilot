import { College } from '../types';
import { Financials } from '../api/scorecard';

// U.S. Census regions, used to slot Scorecard schools into the app's region filter.
const REGION_BY_STATE: Record<string, College['region']> = {
  CT: 'Northeast', ME: 'Northeast', MA: 'Northeast', NH: 'Northeast', RI: 'Northeast', VT: 'Northeast',
  NJ: 'Northeast', NY: 'Northeast', PA: 'Northeast',
  IL: 'Midwest', IN: 'Midwest', MI: 'Midwest', OH: 'Midwest', WI: 'Midwest',
  IA: 'Midwest', KS: 'Midwest', MN: 'Midwest', MO: 'Midwest', NE: 'Midwest', ND: 'Midwest', SD: 'Midwest',
  DE: 'South', FL: 'South', GA: 'South', MD: 'South', NC: 'South', SC: 'South', VA: 'South', DC: 'South',
  WV: 'South', AL: 'South', KY: 'South', MS: 'South', TN: 'South', AR: 'South', LA: 'South', OK: 'South', TX: 'South',
  AZ: 'West', CO: 'West', ID: 'West', MT: 'West', NV: 'West', NM: 'West', UT: 'West', WY: 'West',
  AK: 'West', CA: 'West', HI: 'West', OR: 'West', WA: 'West',
};

export const SCORECARD_PREFIX = 'sc_';
export const isScorecardId = (id: string) => id.startsWith(SCORECARD_PREFIX);
export const unitIdFromCollegeId = (id: string): number | null => {
  if (!isScorecardId(id)) return null;
  const n = Number(id.slice(SCORECARD_PREFIX.length));
  return Number.isFinite(n) ? n : null;
};

// Adapt a Scorecard record into the app's College shape. Fields Scorecard
// doesn't provide (GPA, ACT, deadlines, health notes) get neutral defaults; the
// rich net-price data is shown live via NetPriceSection.
export function scorecardToCollege(f: Financials): College {
  const coa = f.costOfAttendance ?? 0;
  return {
    id: `${SCORECARD_PREFIX}${f.unitId}`,
    name: f.name,
    location: [f.city, f.state].filter(Boolean).join(', '),
    city: f.city,
    state: f.state,
    region: REGION_BY_STATE[f.state] ?? 'Midwest',
    type: f.ownership === 'public' ? 'Public' : 'Private',
    acceptanceRate: f.admissionRate ?? 0.5,
    sat25th: f.sat25 ?? 0,
    sat75th: f.sat75 ?? 0,
    act25th: 0,
    act75th: 0,
    avgGpa: 3.5, // Scorecard has no GPA; neutral default so tiering isn't skewed
    tuitionInState: coa,
    tuitionOutState: coa,
    roomAndBoard: 0,
    undergradEnrollment: f.enrollment ?? 0,
    hasDirectEntryBsn: false,
    medicalSchoolAffiliation: '',
    hospitalSystem: '',
    keyStrengths: [],
    tags: ['Federal data'],
    deadlines: { regularDecision: 'See school website' },
    applicationFee: 0,
    commonApp: false,
    coalitionApp: false,
    supplementsRequired: false,
    summary: `${[f.city, f.state].filter(Boolean).join(', ')}. Profile from the U.S. Dept. of Education College Scorecard — not yet fully curated in RoundsAhead.`,
    preMedNotes: 'This college isn’t in our curated set yet — use the net-price data above and the school’s official pre-health pages.',
    nursingNotes: 'This college isn’t in our curated set yet — check the school’s nursing / BSN pages directly.',
    websiteUrl: f.websiteUrl ?? '',
  };
}
