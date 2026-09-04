// Recommended high-school course sequence for pre-health students, plus the
// early decision points that quietly open or close doors. Recommendations are
// generic (course names vary by district) — the planner lets families enter
// their own courses; these are guidance, not a catalog.

export interface RecommendedCourse {
  grade: number; // 9–12
  subject: string;
  name: string;
  note?: string;
}

export const SUBJECTS = ['Science', 'Math', 'English', 'Social Studies', 'World Language', 'Elective', 'Other'];

// The shared health-sciences backbone. Individual pathways emphasize different
// electives (see pathwayEmphasis) but the core is the same.
const CORE_SEQUENCE: RecommendedCourse[] = [
  { grade: 9, subject: 'Science', name: 'Biology' },
  { grade: 9, subject: 'Math', name: 'Algebra I or Geometry', note: 'Your 9th-grade math placement sets your whole trajectory.' },
  { grade: 9, subject: 'English', name: 'English 9' },
  { grade: 9, subject: 'Social Studies', name: 'World History / Geography' },
  { grade: 9, subject: 'World Language', name: 'World Language I' },

  { grade: 10, subject: 'Science', name: 'Chemistry' },
  { grade: 10, subject: 'Math', name: 'Geometry or Algebra II' },
  { grade: 10, subject: 'English', name: 'English 10' },
  { grade: 10, subject: 'Social Studies', name: 'World / U.S. History' },
  { grade: 10, subject: 'World Language', name: 'World Language II' },

  { grade: 11, subject: 'Science', name: 'AP/Honors Biology or Physics', note: 'Usually requires regular Biology/Chemistry first.' },
  { grade: 11, subject: 'Math', name: 'Algebra II or Pre-Calculus' },
  { grade: 11, subject: 'English', name: 'AP/Honors English 11' },
  { grade: 11, subject: 'Social Studies', name: 'U.S. History (AP optional)' },
  { grade: 11, subject: 'World Language', name: 'World Language III' },

  { grade: 12, subject: 'Science', name: 'AP Chemistry / Physics / Anatomy & Physiology' },
  { grade: 12, subject: 'Math', name: 'Pre-Calculus or AP Calculus', note: 'Reachable only if your 8th/9th-grade math track allowed it.' },
  { grade: 12, subject: 'English', name: 'AP/Honors English 12' },
  { grade: 12, subject: 'Elective', name: 'Statistics', note: 'Valued across every health pathway.' },
];

// Small per-pathway emphasis note shown at the top of the planner.
export function pathwayEmphasis(pathwayId: string): string {
  switch (pathwayId) {
    case 'nursing_general':
    case 'crna':
      return 'Nursing tracks especially value Anatomy & Physiology, Chemistry, and strong biology grades — and a CNA/health-science elective if your school offers one.';
    case 'premed_general':
    case 'anesthesiologist':
      return 'Pre-med values the full AP science slate (Bio, Chem, Physics) and reaching AP Calculus, plus a rigorous overall load.';
    case 'physician_assistant':
      return 'PA programs weigh patient-care experience heavily — pair the science core with an early CNA/EMT or health-science elective.';
    case 'veterinarian':
      return 'Pre-vet mirrors pre-med sciences; add biology electives and pursue animal/veterinary experience outside class.';
    default:
      return 'Every health pathway shares this science-heavy core. Keep options open by taking Biology, Chemistry, and the strongest math track you can.';
  }
}

export function recommendedCourses(): RecommendedCourse[] {
  return CORE_SEQUENCE;
}

// Early decisions that open or close doors — displayed as advisories.
export const DECISION_POINTS: string[] = [
  'Math placement in 8th/9th grade is the highest-leverage decision: it determines whether AP Calculus is reachable by senior year. If you can accelerate, do it early.',
  'AP Biology and AP Chemistry usually require finishing regular Biology and Chemistry first — plan the sequence, don’t skip steps.',
  'Selective colleges expect 4 years each of English, math, science, and social studies, plus 2–3 years of one world language.',
  'Dual-enrollment vs. AP: some health programs won’t accept dual-enrollment courses for prerequisites. Verify with the colleges you’re targeting before relying on them.',
];
