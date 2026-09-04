import { StudentProfile } from '../types';

// Pathways where hands-on clinical/experience hours are especially decisive for
// admission (nursing & CRNA clinicals, PA patient-care hours, vet animal hours).
// For these, clinical hours weigh more and standardized testing weighs less —
// the two always sum to 35 so the maximum score stays 100.
const CLINICAL_INTENSIVE = new Set(['crna', 'nursing_general', 'physician_assistant', 'veterinarian']);

interface ReadinessWeights {
  clinicalPrimaryMax: number; // points for meeting the clinical-hours bar
  clinicalHighThreshold: number; // hours needed for full clinical points
  testingMax: number; // points for having started standardized testing
}

// Weights are pathway-aware but always keep clinicalPrimaryMax + testingMax = 35.
function weightsFor(pathwayId?: string): ReadinessWeights {
  if (pathwayId && CLINICAL_INTENSIVE.has(pathwayId)) {
    return { clinicalPrimaryMax: 20, clinicalHighThreshold: 75, testingMax: 10 };
  }
  return { clinicalPrimaryMax: 15, clinicalHighThreshold: 50, testingMax: 15 };
}

/**
 * Holistic junior-year readiness score (0–100).
 *
 * Pure function — no React, no side effects. Weights (max points):
 *   GPA 20 · testing (10–15) · clinical/volunteer (20–25) · activities 15 ·
 *   final-five progress 15 · essays 15. The clinical/testing split shifts by
 *   pathway (see CLINICAL_INTENSIVE) but the total maximum is always 100.
 */
export function computeReadinessScore(
  profile: StudentProfile,
  finalFiveCount: number,
  essayCount: number,
  pathwayId?: string,
): number {
  const w = weightsFor(pathwayId ?? profile.careerGoal);
  let score = 0;

  // Academics & GPA (max 20)
  if (profile.unweightedGpa >= 3.5) score += 15;
  if (profile.weightedGpa >= 4.0) score += 5;

  // Testing path started (max = w.testingMax)
  if (profile.satScore || profile.actScore || profile.psatScore) score += w.testingMax;

  // Clinical & volunteer hours (max = w.clinicalPrimaryMax + 5)
  if (profile.clinicalHours >= w.clinicalHighThreshold) score += w.clinicalPrimaryMax;
  else if (profile.clinicalHours > 10) score += Math.round(w.clinicalPrimaryMax * 0.66);
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
