// A pathway id, resolved against the CAREER_PATHWAYS data rather than a fixed
// union — so new pathways can be added as data without a code/type change.
export type CareerGoal = string;

// A citation for the facts in a pathway (salary, outlook, prerequisites).
// Non-negotiable: every pathway carries sources + a lastVerified date.
export interface PathwaySource {
  label: string;
  url: string;
}

export interface StudentProfile {
  id: string;
  fullName: string;
  gradYear: number; // e.g. 2028 (current 11th grade in 2026-2027)
  currentGrade: '11th (Junior)' | '12th (Senior)' | '10th (Sophomore)';
  highSchool: string;
  city: string;
  state: string;
  unweightedGpa: number; // e.g. 3.85
  weightedGpa: number; // e.g. 4.2
  satScore: number | null; // e.g. 1420
  actScore: number | null; // e.g. 32
  targetSatScore: number | null; // e.g. 1500
  psatScore: number | null; // e.g. 1380
  apIbCoursesCount: number;
  apCourses: string[];
  careerGoal: CareerGoal;
  intendedMajors: string[]; // e.g. ["Pre-Med / Biology", "Direct-Entry Nursing (BSN)"]
  clinicalHours: number; // shadowing + hospital volunteering
  communityServiceHours: number;
  extracurriculars: ActivityItem[];
  awards: AwardItem[];
  targetCollegeCount: number;
  budgetPerYear: number | null;
  preferredRegions: string[];
  notes: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  organization: string;
  category: 'clinical' | 'volunteering' | 'leadership' | 'stem_club' | 'sports' | 'work' | 'arts' | 'other';
  roles: string;
  grades: string[]; // ['10th', '11th']
  hoursPerWeek: number;
  weeksPerYear: number;
  totalHours: number;
  description: string;
  highlights: string;
}

export interface AwardItem {
  id: string;
  title: string;
  level: 'School' | 'Regional' | 'State' | 'National';
  gradeReceived: string;
  description: string;
}

export type AdmissionChance = 'Likely / Safety' | 'Target' | 'Reach' | 'High Reach';

export interface College {
  id: string;
  unitId?: number; // IPEDS UNITID = College Scorecard id, for exact data matching
  name: string;
  shortName?: string;
  location: string;
  city: string;
  state: string;
  region: 'Northeast' | 'Midwest' | 'South' | 'West';
  type: 'Public' | 'Private';
  acceptanceRate: number; // 0.0 to 1.0 (e.g. 0.18 = 18%)
  sat25th: number;
  sat75th: number;
  act25th: number;
  act75th: number;
  avgGpa: number;
  tuitionInState: number;
  tuitionOutState: number;
  roomAndBoard: number;
  undergradEnrollment: number;
  hasDirectEntryBsn: boolean;
  bsnProgramRank?: string;
  preMedAdvisingRank?: string;
  medicalSchoolAffiliation: string;
  hospitalSystem: string;
  keyStrengths: string[];
  tags: string[];
  deadlines: {
    earlyAction?: string;
    earlyDecision?: string;
    regularDecision: string;
    financialAidPriority?: string;
  };
  applicationFee: number;
  commonApp: boolean;
  coalitionApp: boolean;
  supplementsRequired: boolean;
  supplementPromptSummary?: string;
  summary: string;
  preMedNotes: string;
  nursingNotes: string;
  websiteUrl: string;
  logoUrl?: string;
}

export interface CareerPathwayStage {
  stageNumber: number;
  stageName: string;
  timeframe: string; // e.g. "4 Years", "4 Years (Med School)"
  degreeEarned: string;
  keyRequirements: string[];
  criticalJuniorHighSchoolPrep: string;
  description: string;
  annualCostEstimate: string;
}

export interface CareerPathway {
  id: CareerGoal;
  title: string;
  shortTitle: string;
  roleDescription: string;
  totalYearsAfterHighSchool: string;
  averageSalary: string;
  jobGrowth: string;
  undergradMajorStrategy: string;
  dailyRoutine: string;
  stages: CareerPathwayStage[];
  pros: string[];
  challenges: string[];
  comparisonPoints: {
    autonomyLevel: string;
    callFrequency: string;
    trainingLength: string;
    debtBurden: string;
  };
  // Where the salary/outlook/prerequisite facts come from, and when last checked.
  dataSources?: PathwaySource[];
  lastVerified?: string; // ISO date, e.g. "2026-09-04"
}

export interface TimelineTask {
  id: string;
  title: string;
  category: 'testing' | 'academics' | 'clinical' | 'college_search' | 'essays' | 'recommendations' | 'financial_aid' | 'applications';
  targetMonth: string; // e.g. "September 2026 (Junior Fall)"
  gradeLevel: 'Junior Year (11th)' | 'Summer Before Senior' | 'Senior Year (12th)';
  priority: 'high' | 'medium' | 'low';
  description: string;
  actionItems: string[];
  completed: boolean;
  isCustom?: boolean;
  dueDate?: string;
  associatedCollegeId?: string;
}

export interface FinalFiveItem {
  collegeId: string;
  applicationType: 'EA' | 'ED' | 'RD' | 'Rolling';
  status: 'researching' | 'ready_to_apply' | 'submitted' | 'accepted' | 'waitlisted' | 'enrolled';
  category: 'Safety' | 'Target' | 'Reach';
  checklist: {
    commonAppAdded: boolean;
    transcriptRequested: boolean;
    satActSent: boolean;
    counselorRecRequested: boolean;
    teacherRec1Requested: boolean;
    teacherRec2Requested: boolean;
    supplementEssayDrafted: boolean;
    supplementEssayPolished: boolean;
    fafsaSubmitted: boolean;
    cssProfileSubmitted: boolean;
    applicationSubmitted: boolean;
    portalLoginCreated: boolean;
  };
  notes: string;
  targetMajor: string;
  portalUrl?: string;
}

export interface EssayDraft {
  id: string;
  title: string;
  type: 'common_app' | 'supplemental' | 'why_major' | 'diversity' | 'custom';
  promptText: string;
  associatedCollegeId?: string;
  targetWordCount: number;
  currentDraft: string;
  outline: string;
  status: 'brainstorming' | 'outline' | 'first_draft' | 'polishing' | 'final';
  lastEdited: string;
}

export type CourseLevel = 'regular' | 'honors' | 'ap' | 'ib' | 'dual';

// A single planned/completed high-school course in the four-year planner.
export interface CourseEntry {
  id: string;
  grade: number; // 9, 10, 11, 12
  subject: string; // Science, Math, English, Social Studies, World Language, Elective, Other
  name: string;
  level: CourseLevel;
  completed: boolean;
}

export interface AwardLetterGrant {
  id: string;
  name: string;
  amount: number;
  renewable: boolean; // renews each year vs. one-time / freshman-only
  condition: string; // e.g. "Maintain 3.0 GPA"
}

// A financial-aid award letter, entered by the family, normalized to a common
// shape so offers can be compared apples-to-apples. All amounts are annual USD.
export interface AwardLetter {
  id: string;
  collegeId?: string; // optional link to a saved college
  collegeName: string;
  academicYear: string; // e.g. "2027–2028"
  // Direct costs (billed by the school)
  tuitionAndFees: number;
  housingAndMeals: number;
  // Indirect costs (estimated, not billed)
  booksAndSupplies: number;
  transportation: number;
  personalExpenses: number;
  // Gift aid — money that is NOT repaid
  grants: AwardLetterGrant[];
  // Self-help — money that must be earned
  workStudy: number;
  // Loans — money that must be repaid
  loanSubsidized: number;
  loanUnsubsidized: number;
  loanParentPlus: number;
  loanOther: number;
  notes: string;
}

export interface CampusVisit {
  id: string;
  collegeId: string;
  collegeName: string;
  visitDate: string;
  overallRating: number; // 1-5
  ratings: {
    campusVibe: number;
    academicFacilities: number;
    dormAndFood: number;
    preMedNursingAdvising: number;
    locationSafety: number;
  };
  pros: string[];
  cons: string[];
  notes: string;
  talkedToCurrentStudents: boolean;
  visitedSimulationLabOrHospital: boolean;
}
