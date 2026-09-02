import { StudentProfile, FinalFiveItem, EssayDraft } from '../types';

export const SAMPLE_STUDENT_PROFILE: StudentProfile = {
  id: 'sample_student_1',
  fullName: 'Alex Etheredge',
  gradYear: 2028,
  currentGrade: '11th (Junior)',
  highSchool: 'Westlake High School',
  city: 'Austin',
  state: 'TX',
  unweightedGpa: 3.86,
  weightedGpa: 4.28,
  satScore: 1390,
  actScore: null,
  targetSatScore: 1480,
  psatScore: 1360,
  apIbCoursesCount: 6,
  apCourses: [
    'AP Chemistry (Junior)',
    'AP Biology (Sophomore - Score: 4)',
    'AP English Language (Junior)',
    'AP US History (Junior)',
    'AP Calculus AB (Junior)',
    'AP Psychology (Junior)'
  ],
  careerGoal: 'crna', // exploring crna & anesthesiologist
  intendedMajors: [
    'Direct-Entry Nursing (BSN)',
    'Pre-Med / Biology',
    'Biomedical Health Sciences'
  ],
  clinicalHours: 65,
  communityServiceHours: 85,
  extracurriculars: [
    {
      id: 'act_1',
      title: 'Hospital Patient Transport & ER Volunteer',
      organization: 'St. David’s Medical Center',
      category: 'clinical',
      roles: 'Lead Junior Volunteer',
      grades: ['10th', '11th'],
      hoursPerWeek: 4,
      weeksPerYear: 36,
      totalHours: 144,
      description: 'Assist emergency department nurses and staff with patient transport, wheelchair assistance, resting comfort items, and stocking critical care supply carts in the surgical wing.',
      highlights: 'Earned 100+ Hours Service Recognition Pin; observed post-op recovery workflows.'
    },
    {
      id: 'act_2',
      title: 'Physician & CRNA Clinical Shadowing',
      organization: 'Regional Surgical Care Center & Austin Anesthesia Associates',
      category: 'clinical',
      roles: 'Student Observer',
      grades: ['11th'],
      hoursPerWeek: 4,
      weeksPerYear: 8,
      totalHours: 32,
      description: 'Shadowed certified registered nurse anesthetists (CRNAs) and board-certified anesthesiologists during pre-op assessments, general airway intubation, spinal blocks, and vital sign monitoring.',
      highlights: 'Observed 15+ outpatient orthopedic, general, and ENT surgical procedures.'
    },
    {
      id: 'act_3',
      title: 'HOSA - Future Health Professionals',
      organization: 'High School Chapter',
      category: 'stem_club',
      roles: 'Vice President & Medical Terminology Competitor',
      grades: ['10th', '11th'],
      hoursPerWeek: 3,
      weeksPerYear: 30,
      totalHours: 90,
      description: 'Organize monthly guest speaker series featuring trauma surgeons, ICU nurses, and CRNAs. Lead competition prep workshops for regional conferences.',
      highlights: '1st Place Regional Medical Math & Terminology; Qualified for State Leadership Conference.'
    },
    {
      id: 'act_4',
      title: 'Varsity Track & Field',
      organization: 'High School Athletics',
      category: 'sports',
      roles: 'Distance Runner (800m & 1600m)',
      grades: ['9th', '10th', '11th'],
      hoursPerWeek: 12,
      weeksPerYear: 18,
      totalHours: 216,
      description: 'Train 5 days a week; compete in district invitationals; emphasize mental discipline, cardiovascular endurance, and supportive team camaraderie.',
      highlights: 'District Finalist; Academic All-District Honoree.'
    },
    {
      id: 'act_5',
      title: 'Peer Chemistry & Biology Tutor',
      organization: 'National Honor Society (NHS)',
      category: 'volunteering',
      roles: 'Lead STEM Tutor',
      grades: ['11th'],
      hoursPerWeek: 2,
      weeksPerYear: 28,
      totalHours: 56,
      description: 'Provide weekly one-on-one tutoring in Honors Chemistry, stoichiometry, and cell biology for underclassmen.',
      highlights: 'Helped 12 students raise their semester letter grades by an average of one full tier.'
    }
  ],
  awards: [
    {
      id: 'aw_1',
      title: 'AP Scholar with Honor',
      level: 'National',
      gradeReceived: '11th',
      description: 'Awarded by College Board for exceptional performance across multiple AP exams.'
    },
    {
      id: 'aw_2',
      title: 'HOSA State Qualifier (Medical Terminology & Science)',
      level: 'State',
      gradeReceived: '10th & 11th',
      description: 'Placed Top 3 at Regional Leadership Conference out of 120 competitors.'
    },
    {
      id: 'aw_3',
      title: 'National Honor Society Inductee',
      level: 'School',
      gradeReceived: '10th',
      description: 'Selected on the basis of scholarship, leadership, character, and service.'
    },
    {
      id: 'aw_4',
      title: 'American Red Cross Basic Life Support (BLS) & CPR Certified',
      level: 'Regional',
      gradeReceived: '11th',
      description: 'Certified in CPR/AED for Healthcare Providers.'
    }
  ],
  targetCollegeCount: 5,
  budgetPerYear: 50000,
  preferredRegions: ['South', 'Midwest', 'Northeast'],
  notes: 'Goal is to compare top Direct-Entry BSN programs for CRNA pathway versus top Pre-Med tracks for Anesthesiologist MD.'
};

export const SAMPLE_FINAL_FIVE: FinalFiveItem[] = [
  {
    collegeId: 'case_western',
    applicationType: 'EA',
    category: 'Target',
    status: 'ready_to_apply',
    targetMajor: 'Direct-Entry BSN (Frances Payne Bolton)',
    portalUrl: 'https://apply.case.edu/portal',
    checklist: {
      commonAppAdded: true,
      transcriptRequested: true,
      satActSent: true,
      counselorRecRequested: true,
      teacherRec1Requested: true,
      teacherRec2Requested: false,
      supplementEssayDrafted: true,
      supplementEssayPolished: false,
      fafsaSubmitted: false,
      cssProfileSubmitted: false,
      applicationSubmitted: false,
      portalLoginCreated: false
    },
    notes: 'Partnered with Cleveland Clinic (#2 hospital in the world). Direct clinical rotations start freshman year.'
  },
  {
    collegeId: 'pitt',
    applicationType: 'EA',
    category: 'Target',
    status: 'ready_to_apply',
    targetMajor: 'Direct-Entry BSN (School of Nursing)',
    portalUrl: 'https://admissions.pitt.edu',
    checklist: {
      commonAppAdded: true,
      transcriptRequested: true,
      satActSent: true,
      counselorRecRequested: true,
      teacherRec1Requested: true,
      teacherRec2Requested: true,
      supplementEssayDrafted: true,
      supplementEssayPolished: true,
      fafsaSubmitted: false,
      cssProfileSubmitted: false,
      applicationSubmitted: false,
      portalLoginCreated: false
    },
    notes: 'Direct clinicals at UPMC Presbyterian & Children’s Hospital of Pittsburgh. Rolling admissions priority.'
  },
  {
    collegeId: 'villanova',
    applicationType: 'EA',
    category: 'Target',
    status: 'researching',
    targetMajor: 'Direct-Entry BSN (Fitzpatrick College)',
    portalUrl: 'https://www.villanova.edu/admission',
    checklist: {
      commonAppAdded: true,
      transcriptRequested: false,
      satActSent: false,
      counselorRecRequested: false,
      teacherRec1Requested: false,
      teacherRec2Requested: false,
      supplementEssayDrafted: false,
      supplementEssayPolished: false,
      fafsaSubmitted: false,
      cssProfileSubmitted: false,
      applicationSubmitted: false,
      portalLoginCreated: false
    },
    notes: '98% NCLEX pass rate. Outstanding clinical connections in Main Line Health and Philadelphia hospitals.'
  },
  {
    collegeId: 'upenn',
    applicationType: 'RD',
    category: 'Reach',
    status: 'researching',
    targetMajor: 'Direct-Entry BSN / Pre-Med Dual',
    portalUrl: 'https://admissions.upenn.edu',
    checklist: {
      commonAppAdded: true,
      transcriptRequested: false,
      satActSent: false,
      counselorRecRequested: false,
      teacherRec1Requested: false,
      teacherRec2Requested: false,
      supplementEssayDrafted: false,
      supplementEssayPolished: false,
      fafsaSubmitted: false,
      cssProfileSubmitted: false,
      applicationSubmitted: false,
      portalLoginCreated: false
    },
    notes: '#1 Ranked BSN in the nation; Perelman School of Medicine and CHOP right across the street.'
  },
  {
    collegeId: 'slu',
    applicationType: 'EA',
    category: 'Safety',
    status: 'ready_to_apply',
    targetMajor: 'Direct-Entry BSN / Medical Scholars',
    portalUrl: 'https://www.slu.edu/admission',
    checklist: {
      commonAppAdded: true,
      transcriptRequested: true,
      satActSent: true,
      counselorRecRequested: true,
      teacherRec1Requested: true,
      teacherRec2Requested: true,
      supplementEssayDrafted: true,
      supplementEssayPolished: true,
      fafsaSubmitted: false,
      cssProfileSubmitted: false,
      applicationSubmitted: false,
      portalLoginCreated: false
    },
    notes: 'Strong safety / likely school with great merit scholarships and guaranteed direct-entry clinical spots.'
  }
];

export const SAMPLE_ESSAYS: EssayDraft[] = [
  {
    id: 'essay_common_app_1',
    title: 'The Calm in the Controlled Storm: Anesthesia & Composure',
    type: 'common_app',
    promptText: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it...',
    targetWordCount: 650,
    status: 'first_draft',
    lastEdited: '2026-09-02',
    outline: '1. Hook: In the OR during a laparoscopic surgery shadowing shift, observing the rhythmic beep of the pulse oximeter.\n2. Insight: Anesthesia is not just putting people to sleep; it is maintaining the delicate physiological balance between life and painlessness.\n3. Clinical Context: How hospital volunteering in ER and patient transport taught me to read anxiety and comfort nervous families.\n4. Science & Empathy Synthesis: Why I am dedicated to acute perioperative care.',
    currentDraft: `The surgical suite was a symphony of controlled urgency. Stainless steel trays gleamed under the bright halogens, and the rhythmic, metronomic chirp of the pulse oximeter kept time. Amidst the flurry of surgeons adjusting sterile drapes, my attention was transfixed on the practitioner sitting at the head of the bed. 

With quiet, steady hands, the nurse anesthetist adjusted the vaporizers, monitored the capnography waveform, and gently held the patient's shoulder as consciousness gently yielded to chemical tranquility. In that moment, I realized that anesthesia is not simply about inducing sleep—it is the art of guarding human life at its most vulnerable threshold.

Throughout my junior year volunteering in the emergency department at St. David’s Medical Center, I discovered that true healthcare happens in the subtle spaces between technical mastery and emotional reassurance. Whether wheeling an anxious teenager into pre-op or explaining a procedure to an elderly patient gripping their blanket, I learned that a calm presence is just as vital as clinical precision.`
  },
  {
    id: 'essay_supp_why_major',
    title: 'Why Direct-Entry BSN & Critical Care / CRNA Path',
    type: 'why_major',
    promptText: 'Please describe why you have chosen your intended major and what career path you plan to pursue.',
    targetWordCount: 300,
    status: 'outline',
    lastEdited: '2026-09-01',
    outline: '1. Passion for high-acuity critical care nursing.\n2. Goal of becoming a Certified Registered Nurse Anesthetist (CRNA).\n3. Desire for hands-on clinical rotations from undergraduate through ICU RN to doctoral practice.',
    currentDraft: `My goal is to earn a Bachelor of Science in Nursing (BSN) to launch a career in critical care and ultimately become a Certified Registered Nurse Anesthetist (CRNA). 

Through 65+ hours of hospital volunteering and surgical shadowing, I was captivated by the unique intersection of pharmacology, hemodynamics, and direct bedside vigilance in the operating room. A Direct-Entry BSN program provides the rigorous clinical immersion, simulation labs, and early hospital rotations necessary to graduate as a confident RN ready for high-acuity ICU practice.`
  }
];
