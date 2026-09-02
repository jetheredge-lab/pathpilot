import { TimelineTask } from '../types';

export const DEFAULT_TIMELINE_TASKS: TimelineTask[] = [
  // --- JUNIOR YEAR (FALL: Sept - Dec) ---
  {
    id: 'jun_fall_1',
    title: 'Review Junior Year Course Rigor & GPA Target',
    category: 'academics',
    targetMonth: 'September (Junior Fall)',
    gradeLevel: 'Junior Year (11th)',
    priority: 'high',
    description: 'Junior year grades are the most scrutinized by college admissions officers. Ensure AP/IB Chem, Bio, or Calc coursework has tutoring/study plans in place.',
    actionItems: [
      'Confirm enrolled in rigorous science & math classes (AP Chem, AP Bio, Anatomy, Pre-Calc/Calc)',
      'Set target unweighted GPA (e.g., 3.8+) and monitor quarter 1 grades closely',
      'Meet with your high school counselor to verify graduation requirements and transcript review'
    ],
    completed: true
  },
  {
    id: 'jun_fall_2',
    title: 'Register & Take PSAT/NMSQT in October',
    category: 'testing',
    targetMonth: 'October (Junior Fall)',
    gradeLevel: 'Junior Year (11th)',
    priority: 'high',
    description: 'The 11th grade PSAT qualifies you for the prestigious National Merit Scholarship program and gives an accurate diagnostic for the SAT.',
    actionItems: [
      'Take official Practice PSAT on Khan Academy or Bluebook app',
      'Sit for official 11th grade PSAT/NMSQT exam at school',
      'Analyze PSAT score report to identify math and reading/writing growth areas'
    ],
    completed: false
  },
  {
    id: 'jun_fall_3',
    title: 'Launch Healthcare Volunteering & Shadowing',
    category: 'clinical',
    targetMonth: 'November (Junior Fall)',
    gradeLevel: 'Junior Year (11th)',
    priority: 'high',
    description: 'Whether aiming for CRNA (Direct-Entry BSN) or Anesthesiologist (Pre-Med), demonstrating early clinical exposure is essential for nursing admissions and pre-health credentials.',
    actionItems: [
      'Apply for junior volunteer programs at local hospital or outpatient surgical center',
      'Reach out to local CRNAs or anesthesiologists for clinical shadowing opportunities (aim for 20-50 hours)',
      'Consider registering for CPR/BLS certification or exploring a summer CNA/EMT course'
    ],
    completed: false
  },
  {
    id: 'jun_fall_4',
    title: 'Map Out Career Pathway: MD vs Direct-Entry BSN',
    category: 'college_search',
    targetMonth: 'December (Junior Fall)',
    gradeLevel: 'Junior Year (11th)',
    priority: 'medium',
    description: 'Determine whether you want to target Direct-Entry BSN programs (guaranteed nursing clinicals for CRNA) vs Pre-Med science tracks (Biology/Biochem for Anesthesiology MD).',
    actionItems: [
      'Review the Career Pathway comparison in PathPilot with your parents',
      'Identify if college list should focus on Direct-Entry BSN universities or Pre-Med powerhouses',
      'Build initial long-list of 15-20 prospective colleges'
    ],
    completed: false
  },

  // --- JUNIOR YEAR (SPRING: Jan - May) ---
  {
    id: 'jun_spr_1',
    title: 'Intensive SAT / ACT Preparation & First Official Exam',
    category: 'testing',
    targetMonth: 'March (Junior Spring)',
    gradeLevel: 'Junior Year (11th)',
    priority: 'high',
    description: 'Take your first official SAT or ACT in March or May. Taking it in spring gives you time to superscore or retake in June/August if needed.',
    actionItems: [
      'Complete 4-6 timed practice digital SAT/ACT tests',
      'Register for the March or May official SAT/ACT test administration',
      'Aim for score targets (1350-1500+ for competitive Pre-Med/BSN programs)'
    ],
    completed: false
  },
  {
    id: 'jun_spr_2',
    title: 'Plan & Execute Spring Break College Visits',
    category: 'college_search',
    targetMonth: 'April (Junior Spring)',
    gradeLevel: 'Junior Year (11th)',
    priority: 'medium',
    description: 'Visit 2-4 college campuses during junior spring break while college students are in session to experience actual campus life and inspect nursing simulation labs and hospital proximity.',
    actionItems: [
      'Book official campus tours & information sessions',
      'Schedule specific tours with the School of Nursing or Pre-Health Advising office',
      'Use the PathPilot Campus Visit Scorecard to record notes and impressions'
    ],
    completed: false
  },
  {
    id: 'jun_spr_3',
    title: 'Identify & Request 11th Grade Teacher Recommendation Letters',
    category: 'recommendations',
    targetMonth: 'May (Junior Spring)',
    gradeLevel: 'Junior Year (11th)',
    priority: 'high',
    description: 'Colleges prefer recommendation letters from junior year core academic teachers (especially 1 Science and 1 Math or English teacher). Ask before summer break!',
    actionItems: [
      'Identify 2 junior year teachers who know your work ethic and character best (e.g. AP Chem + AP English)',
      'Generate your official Counselor & Teacher Brag Sheet in PathPilot',
      'Politely ask teachers in person before finals, followed by an email packet'
    ],
    completed: false
  },

  // --- SUMMER BEFORE SENIOR YEAR (June - August) ---
  {
    id: 'sum_1',
    title: 'Draft Common Application Personal Statement Essay',
    category: 'essays',
    targetMonth: 'July (Summer)',
    gradeLevel: 'Summer Before Senior',
    priority: 'high',
    description: 'Write your 650-word Common App essay during the summer before senior coursework begins. Focus on a defining moment or insight into your character and curiosity.',
    actionItems: [
      'Review the 7 Common App prompts in the Essay Studio',
      'Brainstorm 3 different topic ideas with specific personal anecdotes',
      'Write first rough draft (aim for 500-650 words) and seek feedback from parents/mentors'
    ],
    completed: false
  },
  {
    id: 'sum_2',
    title: 'Lock In the "Final 5 to 8" Balanced College List',
    category: 'college_search',
    targetMonth: 'August (Summer)',
    gradeLevel: 'Summer Before Senior',
    priority: 'high',
    description: 'Narrow your college list into a balanced mix of 2 Likely/Safety schools, 2-3 Target schools, and 1-2 Reach schools.',
    actionItems: [
      'Populate your Final 5 Application Package in PathPilot',
      'Verify Early Action (EA) vs Regular Decision (RD) deadline dates for each school',
      'Check specific direct-entry nursing supplemental requirements for each university'
    ],
    completed: false
  },

  // --- SENIOR YEAR (FALL: Sept - Dec) ---
  {
    id: 'sen_fall_1',
    title: 'Create Common App Account & Request Transcripts',
    category: 'applications',
    targetMonth: 'September (Senior Fall)',
    gradeLevel: 'Senior Year (12th)',
    priority: 'high',
    description: 'Open your Common Application, link with Naviance/SchooLinks if your high school uses it, and request official transcripts from the guidance office.',
    actionItems: [
      'Create Common App profile and add your selected colleges',
      'Send formal recommendation invite links to your confirmed teachers',
      'Submit high school transcript request forms for early deadlines'
    ],
    completed: false
  },
  {
    id: 'sen_fall_2',
    title: 'Submit FAFSA & CSS Profile Financial Aid Forms',
    category: 'financial_aid',
    targetMonth: 'October (Senior Fall)',
    gradeLevel: 'Senior Year (12th)',
    priority: 'high',
    description: 'Complete the Free Application for Federal Student Aid (FAFSA) and CSS Profile (if required by private colleges) as soon as applications open in October.',
    actionItems: [
      'Create StudentAid.gov FSA IDs for both student and parent',
      'Gather prior-prior year tax returns (W-2s, 1040 forms)',
      'Submit FAFSA and list all target college federal school codes'
    ],
    completed: false
  },
  {
    id: 'sen_fall_3',
    title: 'Submit Early Action (EA) Applications (November 1-15)',
    category: 'applications',
    targetMonth: 'November (Senior Fall)',
    gradeLevel: 'Senior Year (12th)',
    priority: 'high',
    description: 'Early Action is non-binding and often has higher acceptance rates and earlier access to merit scholarships and honors nursing cohorts.',
    actionItems: [
      'Proofread all supplemental essays for each EA school',
      'Confirm official SAT/ACT scores and transcripts are transmitted',
      'Submit applications before the November 1 or November 15 deadline',
      'Set up applicant portals for each school and verify "All Materials Received"'
    ],
    completed: false
  },

  // --- SENIOR YEAR (SPRING: Jan - May) ---
  {
    id: 'sen_spr_1',
    title: 'Submit Regular Decision Applications & Mid-Year Grades',
    category: 'applications',
    targetMonth: 'January (Senior Spring)',
    gradeLevel: 'Senior Year (12th)',
    priority: 'medium',
    description: 'Submit all remaining Regular Decision applications by Jan 1 - Jan 15 and have counselor submit Senior Mid-Year transcript report.',
    actionItems: [
      'Submit RD applications and verify fee waivers or payment',
      'Ensure 1st semester senior grades remain high (no senioritis!)',
      'Send senior mid-year report to all colleges'
    ],
    completed: false
  },
  {
    id: 'sen_spr_2',
    title: 'Review Financial Aid Offers & Make Final Decision by May 1',
    category: 'financial_aid',
    targetMonth: 'April - May (Senior Spring)',
    gradeLevel: 'Senior Year (12th)',
    priority: 'high',
    description: 'Compare financial aid award letters, net cost of attendance, clinical placements, and submit enrollment deposit by National Decision Day (May 1).',
    actionItems: [
      'Compare net cost of attendance sheets (Tuition - Grants/Scholarships = Out of Pocket)',
      'Attend admitted student days for your top choice schools',
      'Accept admission offer and place enrollment deposit by May 1!',
      'Celebrate an incredible journey from 11th grade prep to college bound!'
    ],
    completed: false
  }
];
