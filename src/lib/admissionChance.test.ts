import { describe, it, expect } from 'vitest';
import { getAdmissionChance } from '../data/colleges';
import { College } from '../types';

// Build a College fixture; tests override only the fields the scorer reads
// (acceptanceRate, avgGpa, sat25th/75th, act25th/75th).
function makeCollege(overrides: Partial<College> = {}): College {
  return {
    id: 'test',
    name: 'Test University',
    location: 'Testville, TS',
    city: 'Testville',
    state: 'TS',
    region: 'South',
    type: 'Private',
    acceptanceRate: 0.5,
    sat25th: 1100,
    sat75th: 1300,
    act25th: 24,
    act75th: 30,
    avgGpa: 3.5,
    tuitionInState: 20000,
    tuitionOutState: 40000,
    roomAndBoard: 12000,
    undergradEnrollment: 10000,
    hasDirectEntryBsn: false,
    medicalSchoolAffiliation: '',
    hospitalSystem: '',
    keyStrengths: [],
    tags: [],
    deadlines: { regularDecision: 'Jan 1' },
    applicationFee: 50,
    commonApp: true,
    coalitionApp: false,
    supplementsRequired: false,
    summary: '',
    preMedNotes: '',
    nursingNotes: '',
    websiteUrl: '',
    ...overrides,
  };
}

describe('getAdmissionChance', () => {
  it('is always a Reach when acceptance rate is below 12%, even with strong stats', () => {
    const elite = makeCollege({ acceptanceRate: 0.08 });
    expect(getAdmissionChance(elite, 4.0, 1600, null)).toBe('Reach');
  });

  it('returns Likely / Safety when the student is above range at a less selective school', () => {
    const safety = makeCollege({ acceptanceRate: 0.5, avgGpa: 3.5, sat25th: 1100, sat75th: 1300 });
    // gpa 3.7 (>= 3.6 → +1), sat 1350 (>= 1300 → +1) => composite 2, accept > 0.35
    expect(getAdmissionChance(safety, 3.7, 1350, null)).toBe('Likely / Safety');
  });

  it('returns Target when the student is at range', () => {
    const target = makeCollege({ acceptanceRate: 0.3, avgGpa: 3.5, sat25th: 1100, sat75th: 1300 });
    // gpa 3.5 (in-band → 0), sat 1200 (in-band → 0) => composite 0, accept >= 0.20
    expect(getAdmissionChance(target, 3.5, 1200, null)).toBe('Target');
  });

  it('returns Reach when the student is below range', () => {
    const school = makeCollege({ acceptanceRate: 0.4, avgGpa: 3.8, sat25th: 1200, sat75th: 1400 });
    // gpa 2.5 (below → -1), sat 900 (below → -1) => composite -2
    expect(getAdmissionChance(school, 2.5, 900, null)).toBe('Reach');
  });

  it('does not grant Safety when acceptance rate is not above 35%, even with strong composite', () => {
    const school = makeCollege({ acceptanceRate: 0.3, avgGpa: 3.5, sat25th: 1100, sat75th: 1300 });
    // strong composite (2) but accept 0.30 → falls through to Target
    expect(getAdmissionChance(school, 3.7, 1350, null)).toBe('Target');
  });

  it('falls back to ACT when SAT is absent', () => {
    const safety = makeCollege({ acceptanceRate: 0.5, avgGpa: 3.5, act25th: 24, act75th: 30 });
    // gpa 3.7 (+1), act 31 (>= 30 → +1) => composite 2, accept > 0.35
    expect(getAdmissionChance(safety, 3.7, null, 31)).toBe('Likely / Safety');
  });
});
