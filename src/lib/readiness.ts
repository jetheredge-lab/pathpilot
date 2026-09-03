import { StudentProfile } from '../types';

/**
 * Holistic junior-year readiness score (0–100).
 *
 * Pure function — no React, no side effects — so the scoring rubric can be unit
 * tested and evolved independently of the UI. Weights (max points):
 *   GPA 20 · testing 15 · clinical/volunteer 20 · activities 15 ·
 *   final-five progress 15 · essays 15.
 */
export function computeReadinessScore(
  profile: StudentProfile,
  finalFiveCount: number,
  essayCount: number,
): number {
  let score = 0;

  // Academics & GPA (max 20)
  if (profile.unweightedGpa >= 3.5) score += 15;
  if (profile.weightedGpa >= 4.0) score += 5;

  // Testing path started (max 15)
  if (profile.satScore || profile.actScore || profile.psatScore) score += 15;

  // Clinical & volunteer hours (max 20)
  if (profile.clinicalHours >= 50) score += 15;
  else if (profile.clinicalHours > 10) score += 10;
  if (profile.communityServiceHours >= 40) score += 5;

  // Extracurriculars & leadership (max 15)
  if (profile.extracurriculars.length >= 3) score += 15;
  else if (profile.extracurriculars.length >= 1) score += 8;

  // Final 5 schools selected (max 15)
  if (finalFiveCount === 5) score += 15;
  else score += finalFiveCount * 3;

  // At least one essay drafted (max 15)
  if (essayCount > 0) score += 15;

  return Math.min(100, Math.round(score));
}
