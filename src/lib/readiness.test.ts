import { describe, it, expect } from 'vitest';
import { computeReadinessScore } from './readiness';
import { StudentProfile } from '../types';

// Minimal profile with everything "empty"; individual tests override fields.
function makeProfile(overrides: Partial<StudentProfile> = {}): StudentProfile {
  return {
    id: 'test',
    fullName: '',
    gradYear: 2028,
    currentGrade: '11th (Junior)',
    highSchool: '',
    city: '',
    state: '',
    unweightedGpa: 0,
    weightedGpa: 0,
    satScore: null,
    actScore: null,
    targetSatScore: null,
    psatScore: null,
    apIbCoursesCount: 0,
    apCourses: [],
    careerGoal: 'undecided',
    intendedMajors: [],
    clinicalHours: 0,
    communityServiceHours: 0,
    extracurriculars: [],
    awards: [],
    targetCollegeCount: 5,
    budgetPerYear: null,
    preferredRegions: [],
    notes: '',
    ...overrides,
  };
}

function makeActivities(n: number) {
  return Array.from({ length: n }, (_, i) => ({
    id: `a${i}`,
    title: 'Activity',
    organization: 'Org',
    category: 'clinical' as const,
    roles: '',
    grades: [],
    hoursPerWeek: 0,
    weeksPerYear: 0,
    totalHours: 0,
    description: '',
    highlights: '',
  }));
}

describe('computeReadinessScore', () => {
  it('returns 0 for a completely empty profile', () => {
    expect(computeReadinessScore(makeProfile(), 0, 0)).toBe(0);
  });

  it('awards GPA points at the thresholds (15 unweighted + 5 weighted)', () => {
    expect(computeReadinessScore(makeProfile({ unweightedGpa: 3.5 }), 0, 0)).toBe(15);
    expect(computeReadinessScore(makeProfile({ unweightedGpa: 3.5, weightedGpa: 4.0 }), 0, 0)).toBe(20);
    // Just below thresholds → no points
    expect(computeReadinessScore(makeProfile({ unweightedGpa: 3.49, weightedGpa: 3.99 }), 0, 0)).toBe(0);
  });

  it('awards 15 testing points for any of SAT/ACT/PSAT', () => {
    expect(computeReadinessScore(makeProfile({ satScore: 1200 }), 0, 0)).toBe(15);
    expect(computeReadinessScore(makeProfile({ actScore: 28 }), 0, 0)).toBe(15);
    expect(computeReadinessScore(makeProfile({ psatScore: 1100 }), 0, 0)).toBe(15);
  });

  it('tiers clinical hours: >10 gives 10, >=50 gives 15', () => {
    expect(computeReadinessScore(makeProfile({ clinicalHours: 10 }), 0, 0)).toBe(0);
    expect(computeReadinessScore(makeProfile({ clinicalHours: 11 }), 0, 0)).toBe(10);
    expect(computeReadinessScore(makeProfile({ clinicalHours: 50 }), 0, 0)).toBe(15);
  });

  it('adds 5 for >=40 community-service hours', () => {
    expect(computeReadinessScore(makeProfile({ communityServiceHours: 40 }), 0, 0)).toBe(5);
    expect(computeReadinessScore(makeProfile({ communityServiceHours: 39 }), 0, 0)).toBe(0);
  });

  it('tiers extracurriculars: 1-2 gives 8, 3+ gives 15', () => {
    expect(computeReadinessScore(makeProfile({ extracurriculars: makeActivities(1) }), 0, 0)).toBe(8);
    expect(computeReadinessScore(makeProfile({ extracurriculars: makeActivities(3) }), 0, 0)).toBe(15);
  });

  it('scores final-five progress: 3 per school, full 15 at exactly 5', () => {
    expect(computeReadinessScore(makeProfile(), 2, 0)).toBe(6);
    expect(computeReadinessScore(makeProfile(), 5, 0)).toBe(15);
  });

  it('awards 15 once any essay exists', () => {
    expect(computeReadinessScore(makeProfile(), 0, 1)).toBe(15);
    expect(computeReadinessScore(makeProfile(), 0, 5)).toBe(15);
  });

  it('caps the total at 100 for a maxed-out profile', () => {
    const strong = makeProfile({
      unweightedGpa: 4.0,
      weightedGpa: 4.5,
      satScore: 1550,
      clinicalHours: 200,
      communityServiceHours: 100,
      extracurriculars: makeActivities(5),
    });
    // 15+5 +15 +15+5 +15 +15 +15 = 100
    expect(computeReadinessScore(strong, 5, 3)).toBe(100);
  });
});

describe('pathway-aware weighting', () => {
  it('weights testing lower for clinical-intensive pathways', () => {
    const p = makeProfile({ satScore: 1200 });
    expect(computeReadinessScore(p, 0, 0, 'crna')).toBe(10); // intensive testing = 10
    expect(computeReadinessScore(p, 0, 0, 'premed_general')).toBe(15); // default testing = 15
  });

  it('requires more clinical hours for full credit on intensive pathways', () => {
    // Intensive: full at 75, partial (round(20*0.66)=13) below it
    expect(computeReadinessScore(makeProfile({ clinicalHours: 50 }), 0, 0, 'crna')).toBe(13);
    expect(computeReadinessScore(makeProfile({ clinicalHours: 75 }), 0, 0, 'crna')).toBe(20);
    // Default: full at 50
    expect(computeReadinessScore(makeProfile({ clinicalHours: 50 }), 0, 0, 'premed_general')).toBe(15);
  });

  it('still caps at 100 for a maxed intensive-pathway profile', () => {
    const strong = makeProfile({
      unweightedGpa: 4.0,
      weightedGpa: 4.5,
      satScore: 1550,
      clinicalHours: 200,
      communityServiceHours: 100,
      extracurriculars: makeActivities(5),
    });
    // 20 gpa + 10 testing + 20 clinical + 5 cs + 15 act + 15 f5 + 15 essay = 100
    expect(computeReadinessScore(strong, 5, 3, 'crna')).toBe(100);
  });
});
