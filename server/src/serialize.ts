// Maps Prisma rows to the JSON shapes the client expects (mirrors src/types).
import type {
  Student,
  SavedCollege,
  FinalFiveItem,
  TimelineTask,
  EssayDraft,
  CampusVisit,
  AwardLetter,
  CourseEntry,
} from '@prisma/client';

// Profile fields the client may set on a Student (whitelist for writes).
export const PROFILE_FIELDS = [
  'fullName', 'gradYear', 'currentGrade', 'highSchool', 'city', 'state',
  'unweightedGpa', 'weightedGpa', 'satScore', 'actScore', 'targetSatScore',
  'psatScore', 'apIbCoursesCount', 'apCourses', 'careerGoal', 'intendedMajors',
  'clinicalHours', 'communityServiceHours', 'extracurriculars', 'awards',
  'targetCollegeCount', 'budgetPerYear', 'preferredRegions', 'notes',
] as const;

// Keep only recognized profile fields from an arbitrary object.
export function pickProfileFields(input: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const key of PROFILE_FIELDS) {
    if (key in input) out[key] = input[key];
  }
  return out;
}

export function profileOut(s: Student) {
  return {
    id: s.id,
    fullName: s.fullName,
    gradYear: s.gradYear,
    currentGrade: s.currentGrade,
    highSchool: s.highSchool,
    city: s.city,
    state: s.state,
    unweightedGpa: s.unweightedGpa,
    weightedGpa: s.weightedGpa,
    satScore: s.satScore,
    actScore: s.actScore,
    targetSatScore: s.targetSatScore,
    psatScore: s.psatScore,
    apIbCoursesCount: s.apIbCoursesCount,
    apCourses: s.apCourses,
    careerGoal: s.careerGoal,
    intendedMajors: s.intendedMajors,
    clinicalHours: s.clinicalHours,
    communityServiceHours: s.communityServiceHours,
    extracurriculars: s.extracurriculars,
    awards: s.awards,
    targetCollegeCount: s.targetCollegeCount,
    budgetPerYear: s.budgetPerYear,
    preferredRegions: s.preferredRegions,
    notes: s.notes,
  };
}

export function finalFiveOut(f: FinalFiveItem) {
  return {
    collegeId: f.collegeId,
    applicationType: f.applicationType,
    status: f.status,
    category: f.category,
    checklist: f.checklist,
    notes: f.notes,
    targetMajor: f.targetMajor,
    portalUrl: f.portalUrl ?? undefined,
  };
}

export function taskOut(t: TimelineTask) {
  return {
    id: t.id,
    title: t.title,
    category: t.category,
    targetMonth: t.targetMonth,
    gradeLevel: t.gradeLevel,
    priority: t.priority,
    description: t.description,
    actionItems: t.actionItems,
    completed: t.completed,
    isCustom: t.isCustom,
    dueDate: t.dueDate ?? undefined,
    associatedCollegeId: t.associatedCollegeId ?? undefined,
  };
}

export function essayOut(e: EssayDraft) {
  return {
    id: e.id,
    title: e.title,
    type: e.type,
    promptText: e.promptText,
    associatedCollegeId: e.associatedCollegeId ?? undefined,
    targetWordCount: e.targetWordCount,
    currentDraft: e.currentDraft,
    outline: e.outline,
    status: e.status,
    lastEdited: e.lastEdited,
  };
}

export function awardLetterOut(a: AwardLetter) {
  return {
    id: a.id,
    collegeId: a.collegeId ?? undefined,
    collegeName: a.collegeName,
    academicYear: a.academicYear,
    tuitionAndFees: a.tuitionAndFees,
    housingAndMeals: a.housingAndMeals,
    booksAndSupplies: a.booksAndSupplies,
    transportation: a.transportation,
    personalExpenses: a.personalExpenses,
    grants: a.grants,
    workStudy: a.workStudy,
    loanSubsidized: a.loanSubsidized,
    loanUnsubsidized: a.loanUnsubsidized,
    loanParentPlus: a.loanParentPlus,
    loanOther: a.loanOther,
    notes: a.notes,
  };
}

export function courseEntryOut(c: CourseEntry) {
  return {
    id: c.id,
    grade: c.grade,
    subject: c.subject,
    name: c.name,
    level: c.level,
    completed: c.completed,
  };
}

export function visitOut(v: CampusVisit) {
  return {
    id: v.id,
    collegeId: v.collegeId,
    collegeName: v.collegeName,
    visitDate: v.visitDate,
    overallRating: v.overallRating,
    ratings: v.ratings,
    pros: v.pros,
    cons: v.cons,
    notes: v.notes,
    talkedToCurrentStudents: v.talkedToCurrentStudents,
    visitedSimulationLabOrHospital: v.visitedSimulationLabOrHospital,
  };
}
