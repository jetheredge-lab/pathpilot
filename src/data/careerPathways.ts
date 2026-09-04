import { CareerPathway } from '../types';

export const CAREER_PATHWAYS: Record<string, CareerPathway> = {
  anesthesiologist: {
    id: 'anesthesiologist',
    title: 'Physician Anesthesiologist (MD / DO)',
    shortTitle: 'Anesthesiologist (MD/DO)',
    roleDescription: 'A medical doctor who specializes in perioperative medicine, anesthesia administration, pain management, and critical care medicine for patients before, during, and after surgical procedures.',
    totalYearsAfterHighSchool: '12 - 13+ Years',
    averageSalary: '$440,000 - $550,000 / year',
    jobGrowth: '+3% to +4% (Steady high demand, especially in complex surgical centers)',
    undergradMajorStrategy: 'Pre-Med track. You can major in Biology, Biochemistry, Neuroscience, Chemistry, or ANY major (e.g. Psychology or Engineering) provided you fulfill all pre-med science requirements (Bio, Chem, O-Chem, Biochem, Physics, Calculus/Stats). A high college GPA (3.75+) and strong MCAT score (512+) are paramount.',
    dailyRoutine: 'Preoperative patient evaluation, airway management, central/arterial line placement, administering general, regional, or local anesthesia, continuous hemodynamic monitoring during high-risk complex surgeries, managing postoperative acute pain and ICU resuscitations.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Maintain high GPA (3.8+ unweighted, rigorous AP/IB courses in Bio, Chem, Calc)',
          'Aim for SAT 1350+ / ACT 30+ to qualify for top pre-med colleges & merit scholarships',
          'Begin hospital volunteering and physician shadowing (50-100 hours)',
          'Engage in STEM leadership (HOSA, Science Olympiad, Lab research)'
        ],
        criticalJuniorHighSchoolPrep: 'Junior year is the most critical academic year! Focus on AP Chemistry / AP Biology, prep for the SAT/ACT in Spring, and secure summer clinical hospital volunteer hours.',
        description: 'Build a rock-solid STEM foundation, demonstrate commitment to science and service, and gain admission to a university with strong pre-med advising and medical school acceptance rates.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Undergraduate College (Pre-Med Track)',
        timeframe: '4 Years',
        degreeEarned: 'Bachelor of Science (B.S.) or B.A.',
        keyRequirements: [
          'Complete Pre-Med prerequisites (General Chemistry, Organic Chemistry, Biology, Physics, Biochemistry, Math/Stats)',
          'Maintain undergraduate cumulative & science GPA >= 3.70',
          'Clinical patient-contact experience (EMT, Medical Scribe, CNA, or Phlebotomist: 200+ hrs)',
          'Shadowing physicians including anesthesiologists (50+ hrs)',
          'Take the MCAT exam in Junior/Senior year of college (Target: 512+)',
          'Undergraduate scientific research / publications'
        ],
        criticalJuniorHighSchoolPrep: 'Select a college that offers top-tier pre-health advising committees, research labs, and proximate teaching hospitals.',
        description: 'Complete bachelor degree while excelling in rigorous science coursework and building a competitive medical school application profile.',
        annualCostEstimate: '$25,000 - $75,000 / year'
      },
      {
        stageNumber: 3,
        stageName: 'Medical School (Allopathic MD or Osteopathic DO)',
        timeframe: '4 Years',
        degreeEarned: 'Doctor of Medicine (MD) or Doctor of Osteopathic Medicine (DO)',
        keyRequirements: [
          'Years 1-2: Pre-clinical sciences (anatomy, physiology, pathology, pharmacology)',
          'USMLE Step 1 / COMLEX Level 1 board exam',
          'Years 3-4: Core clinical hospital rotations (Surgery, Anesthesiology, ICU, Internal Medicine, Pediatrics)',
          'USMLE Step 2 CK board exam',
          'National Resident Matching Program (NRMP) Residency Match in Anesthesiology'
        ],
        criticalJuniorHighSchoolPrep: 'Understand that med school admission is nationwide and requires long-term academic stamina.',
        description: 'Comprehensive medical doctor training across all organ systems, pharmacology, diagnostics, and hands-on clinical rotations.',
        annualCostEstimate: '$50,000 - $85,000 / year (often financed through loans/scholarships)'
      },
      {
        stageNumber: 4,
        stageName: 'Anesthesiology Residency & Board Certification',
        timeframe: '4 Years (Paid)',
        degreeEarned: 'Board Certification (ABAE / ABA)',
        keyRequirements: [
          'PGY-1 (Intern Year): General clinical training (Surgery, Internal Medicine, ICU, Emergency)',
          'PGY-2 to PGY-4 (CA-1 to CA-3): Specialized clinical anesthesia (cardiac, pediatric, neuroanesthesia, obstetrics, trauma)',
          'Passing the ABA Basic Exam and ABA Advanced Exam',
          'Optional 1-year Fellowship (Pediatric Anesthesia, Cardiac, Critical Care, or Chronic Pain Management)'
        ],
        criticalJuniorHighSchoolPrep: 'Residency is salaried (approx $65k-$75k/yr) while training.',
        description: 'Intense hospital-based training managing thousands of real surgical cases under attending physician supervision.',
        annualCostEstimate: 'Paid salary (~$70,000/year)'
      }
    ],
    pros: [
      'Highest level of clinical authority, medical decision making, and autonomy in the OR',
      'Extremely high earning potential ($440k - $550k+)',
      'Qualified to lead care teams, handle the most complex trauma/cardiac cases, and manage ICU/critical care',
      'Diverse subspecialty fellowship opportunities (Pediatric Anesthesia, Pain Clinic, Cardiac, Neuro)',
      'Tremendous prestige and comprehensive medical doctor training'
    ],
    challenges: [
      'Lengthy commitment: 12-13+ years from high school graduation to independent practice',
      'Substantial medical school tuition debt (average $200k-$250k+)',
      'High-stress environment with ultimate liability for patient life during surgery',
      'Fierce competition at both Medical School admissions and Anesthesiology Residency Match'
    ],
    comparisonPoints: {
      autonomyLevel: 'Full independent medical license; oversees complex surgical suites & anesthesia care teams',
      callFrequency: 'Moderate to high (overnight call, weekend trauma coverage, variable by hospital/group)',
      trainingLength: '12-13+ years (4 undergrad + 4 med school + 4 residency)',
      debtBurden: 'Higher initial debt from medical school, offset by higher lifetime physician earning potential'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Physicians and Surgeons (outlook +4%, 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/physicians-and-surgeons.htm' },
      { label: 'BLS OEWS — Anesthesiologists (29-1211) wages', url: 'https://www.bls.gov/oes/current/oes291211.htm' },
      { label: 'AAMC — Applying to medical school & debt data', url: 'https://students-residents.aamc.org/' },
      { label: 'AACOM — Osteopathic (DO) medical schools', url: 'https://www.aacom.org/' }
    ]
  },

  crna: {
    id: 'crna',
    title: 'Certified Registered Nurse Anesthetist (CRNA)',
    shortTitle: 'Nurse Anesthetist (CRNA)',
    roleDescription: 'An advanced practice registered nurse (APRN) who administers anesthetics to patients in operating rooms, dental offices, outpatient surgery centers, and pain clinics with a high degree of clinical autonomy.',
    totalYearsAfterHighSchool: '8 - 9 Years (with 1-2 years earning as a working ICU Registered Nurse)',
    averageSalary: '$210,000 - $265,000 / year',
    jobGrowth: '+9% (Significantly faster than average, high demand across all US hospitals and surgical centers)',
    undergradMajorStrategy: 'Direct-Entry Bachelor of Science in Nursing (BSN). High school seniors should apply directly to universities offering accredited 4-year Direct-Entry BSN programs so clinical spots are guaranteed. Must graduate with strong nursing GPA (3.6+) and pass the NCLEX-RN exam.',
    dailyRoutine: 'Administering general, regional, and sedation anesthesia for surgical, obstetrical, and trauma cases; managing airways; monitoring patient vital signs; pain management epidurals; collaborating in ORs or practicing autonomously in independent practice states.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Target GPA 3.7+ (Nursing programs are exceptionally competitive for freshman direct-entry)',
          'Excel in high school Chemistry, Biology, and Anatomy/Physiology',
          'Aim for SAT 1250-1400+ / ACT 28-32',
          'Hospital volunteering, nurse shadowing, or earning a CNA/CPR certification during junior summer'
        ],
        criticalJuniorHighSchoolPrep: 'Research Direct-Entry BSN programs vs pre-nursing programs. Direct-entry is strongly preferred so you don’t have to re-compete for clinical spots in sophomore year of college!',
        description: 'Apply to accredited 4-year Direct-Entry BSN university nursing programs.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Undergraduate College (Direct-Entry BSN)',
        timeframe: '4 Years',
        degreeEarned: 'Bachelor of Science in Nursing (BSN)',
        keyRequirements: [
          'Complete nursing prerequisite sciences (Microbiology, Anatomy, Physiology, Chemistry, Statistics)',
          'Complete hospital clinical rotations (ICU, Med-Surg, ER, Pediatrics, OB)',
          'Maintain high cumulative & science GPA (minimum 3.5+, preferably 3.7+ for competitive CRNA school admissions)',
          'Pass the NCLEX-RN national licensing exam upon graduation to become a Registered Nurse (RN)'
        ],
        criticalJuniorHighSchoolPrep: 'Ensure the colleges you target have top NCLEX pass rates (90%+) and hospital clinical partnerships.',
        description: 'Earn a 4-year BSN degree and become a licensed Registered Nurse.',
        annualCostEstimate: '$20,000 - $65,000 / year'
      },
      {
        stageNumber: 3,
        stageName: 'Intensive Care Unit (ICU) RN Experience',
        timeframe: '1 - 3 Years (Paid Employment)',
        degreeEarned: 'CCRN Certification (Critical Care Registered Nurse)',
        keyRequirements: [
          'Work as a full-time RN in a high-acuity adult, pediatric, or cardiovascular Intensive Care Unit (ICU/SICU/MICU/CTICU)',
          'Manage ventilators, vasoactive titratable drips, arterial lines, and hemodynamically unstable patients',
          'Earn the CCRN (Critical Care Registered Nurse) specialty certification',
          'Obtain ACLS (Advanced Cardiac Life Support) & PALS certifications',
          'Shadow CRNAs (20-40 hours) and request recommendations from ICU Nurse Managers and Physicians'
        ],
        criticalJuniorHighSchoolPrep: 'You earn a solid registered nurse salary ($75k-$110k/yr) while gaining critical care experience before graduate school.',
        description: 'Gain mandatory hands-on clinical ICU experience required by all accredited CRNA doctoral programs.',
        annualCostEstimate: 'Earn $75,000 - $110,000 / year salary as an ICU RN'
      },
      {
        stageNumber: 4,
        stageName: 'Nurse Anesthesia Doctoral Program (DNP / DNAP)',
        timeframe: '3 Years (Full-Time)',
        degreeEarned: 'Doctor of Nursing Practice (DNP) or Doctor of Nurse Anesthesia Practice (DNAP)',
        keyRequirements: [
          'Didactic coursework in advanced pathophysiology, pharmacology of anesthesia, physics, and principles of anesthesia',
          'Complete over 2,500 clinical anesthesia hours and administer 600+ anesthetic cases',
          'Complete a doctoral clinical capstone project',
          'Pass the National Certification Examination (NCE) administered by the NBCRNA'
        ],
        criticalJuniorHighSchoolPrep: 'As of 2025, all CRNA programs are required to grant a doctoral degree (DNP/DNAP).',
        description: 'Intense 36-month full-time doctoral program combining advanced science theory and operating room clinical residency.',
        annualCostEstimate: '$35,000 - $65,000 / year'
      }
    ],
    pros: [
      'Starts earning a solid professional RN income ($80k-$100k+) just 4 years after high school',
      'Faster overall pathway to high six-figure compensation ($210k-$265k+) in ~8-9 years',
      'High career flexibility with options for full autonomy in independent practice states',
      'Lower total educational debt compared to medical school',
      'Excellent work-life balance and high job satisfaction scores across healthcare surveys'
    ],
    challenges: [
      'Requires direct ICU clinical nursing experience under high-stress life-or-death conditions',
      'CRNA school is full-time for 3 years without the ability to work during school',
      'Direct-entry BSN programs in high school are very competitive (often 5-15% acceptance rates for nursing schools)',
      'Scope of practice regulations vary by state (independent practice in some states vs physician supervision in others)'
    ],
    comparisonPoints: {
      autonomyLevel: 'Independent practice in over 24+ states; collaborative practice in others',
      callFrequency: 'Generally lower call requirements and more predictable shift hours compared to MDs',
      trainingLength: '8-9 years (4 BSN + 1-2 ICU RN + 3 DNP/DNAP)',
      debtBurden: 'Significantly lower net debt; student earns full-time ICU RN salary for 1-3 years prior to CRNA school'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Nurse Anesthetists, Midwives & NPs (group median $134,920; +36% outlook 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/nurse-anesthetists-nurse-midwives-and-nurse-practitioners.htm' },
      { label: 'BLS OEWS — Nurse Anesthetists (29-1151) wages (CRNA-specific, higher than the group median)', url: 'https://www.bls.gov/oes/current/oes291151.htm' },
      { label: 'COA — Council on Accreditation of Nurse Anesthesia programs (all entry-level now doctoral)', url: 'https://www.coacrna.org/' },
      { label: 'AANA — American Association of Nurse Anesthesiology', url: 'https://www.aana.com/' }
    ]
  },

  premed_general: {
    id: 'premed_general',
    title: 'Physician (MD / DO) — General Pre-Med',
    shortTitle: 'Physician (MD/DO)',
    roleDescription: 'A licensed medical doctor who diagnoses and treats illness and injury. Pre-med is the undergraduate foundation that keeps every physician specialty open — from primary care to surgery — before you choose a field in medical school and residency.',
    totalYearsAfterHighSchool: '11 - 15+ Years (varies by specialty)',
    averageSalary: 'Physicians & surgeons: median at or above $239,200/yr (BLS); wide range by specialty',
    jobGrowth: '+4% for physicians & surgeons, 2024–2034 (about as fast as average, ~22,100 openings/yr)',
    undergradMajorStrategy: 'Any major is acceptable as long as you complete the pre-med prerequisites (Biology, General & Organic Chemistry, Biochemistry, Physics, Math/Statistics, often English). Aim for a science + cumulative GPA of 3.6+ and a strong MCAT (target ~510+). Medical schools value clinical experience, research, and service — not a specific major.',
    dailyRoutine: 'Varies enormously by specialty and stage. Common threads: patient histories and exams, diagnosis, ordering and interpreting tests, treatment planning, procedures, documentation, and coordinating care with a team.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Strong GPA with rigorous science + math (AP/IB Biology, Chemistry, Calculus where available)',
          'Competitive SAT/ACT for admission to a college with good pre-health advising',
          'Clinical exposure: hospital or clinic volunteering, physician shadowing across specialties',
          'Service and leadership; explore whether medicine (vs. nursing, PA, etc.) fits you'
        ],
        criticalJuniorHighSchoolPrep: 'Junior year builds the science foundation and the GPA/test scores that open the door to strong pre-health colleges. Start accumulating clinical and shadowing hours.',
        description: 'Build a strong STEM foundation and gain honest exposure to clinical medicine before committing to the long physician pathway.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Undergraduate College (Pre-Med Track)',
        timeframe: '4 Years',
        degreeEarned: 'Bachelor’s degree (any major)',
        keyRequirements: [
          'Complete all pre-med prerequisite courses (Bio, Gen & Organic Chem, Biochem, Physics, Math/Stats)',
          'Maintain a high science and cumulative GPA (3.6+ recommended)',
          'Accumulate clinical experience (scribe, EMT, CNA), research, shadowing, and service',
          'Prepare for and take the MCAT (target ~510+); assemble letters and a personal statement'
        ],
        criticalJuniorHighSchoolPrep: 'Choose a college with strong pre-health advising, research access, and nearby clinical sites.',
        description: 'Earn any bachelor’s degree while completing prerequisites and building a competitive medical-school application.',
        annualCostEstimate: '$10,000 - $75,000 / year (varies widely by school & aid)'
      },
      {
        stageNumber: 3,
        stageName: 'Medical School (MD or DO)',
        timeframe: '4 Years',
        degreeEarned: 'Doctor of Medicine (MD) or Osteopathic Medicine (DO)',
        keyRequirements: [
          'Years 1–2: foundational sciences; USMLE Step 1 / COMLEX Level 1',
          'Years 3–4: core clinical rotations across specialties; USMLE Step 2 / COMLEX Level 2',
          'Choose a specialty and match into residency via the NRMP'
        ],
        criticalJuniorHighSchoolPrep: 'Medical education is long and national in scope; plan for stamina and significant tuition (often financed).',
        description: 'General physician training across all organ systems before specializing.',
        annualCostEstimate: '$40,000 - $85,000 / year (often financed)'
      },
      {
        stageNumber: 4,
        stageName: 'Residency (and optional Fellowship)',
        timeframe: '3 - 7 Years (Paid)',
        degreeEarned: 'Board Certification in a specialty',
        keyRequirements: [
          'Specialty residency (e.g., 3 yrs family medicine/internal medicine/pediatrics; longer for surgery, anesthesiology, etc.)',
          'Pass specialty board examinations',
          'Optional fellowship for subspecialization'
        ],
        criticalJuniorHighSchoolPrep: 'Residency is salaried (roughly $65k–$75k/yr) while you train.',
        description: 'Supervised, paid specialty training culminating in independent board-certified practice.',
        annualCostEstimate: 'Paid salary (~$70,000/year)'
      }
    ],
    pros: [
      'Broadest scope of medical practice and highest clinical authority',
      'Any undergraduate major is allowed if prerequisites are met',
      'High long-term earning potential across most specialties',
      'Wide choice of specialties and practice settings'
    ],
    challenges: [
      'Longest pathway among the common health careers (11–15+ years)',
      'High medical-school debt for many students (AAMC reports six-figure medians)',
      'Competitive admissions at both medical school and residency',
      'Delayed full earnings until after residency'
    ],
    comparisonPoints: {
      autonomyLevel: 'Full, independent medical license after residency',
      callFrequency: 'Highly specialty-dependent',
      trainingLength: '11–15+ years (4 undergrad + 4 med school + 3–7 residency)',
      debtBurden: 'Often the highest up front, offset by high physician earnings later'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Physicians and Surgeons (wages, +4% outlook 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/physicians-and-surgeons.htm' },
      { label: 'AAMC — Aspiring docs, requirements & med-school debt', url: 'https://students-residents.aamc.org/' },
      { label: 'AACOM — Osteopathic (DO) medical schools', url: 'https://www.aacom.org/' }
    ]
  },

  nursing_general: {
    id: 'nursing_general',
    title: 'Registered Nurse (BSN)',
    shortTitle: 'Registered Nurse (BSN)',
    roleDescription: 'A registered nurse assesses patients, administers treatments and medications, coordinates care, and educates patients and families across hospitals, clinics, and community settings. A BSN is the strongest foundation and the usual prerequisite for advanced practice (NP, CRNA, etc.).',
    totalYearsAfterHighSchool: '4 Years to RN licensure (more for advanced practice)',
    averageSalary: 'Registered nurses: median $97,550/yr (BLS, May 2024)',
    jobGrowth: '+6% for registered nurses, 2024–2034 (faster than average; ~180,800 openings/yr)',
    undergradMajorStrategy: 'Earn a Bachelor of Science in Nursing (BSN). A direct-entry (freshman-admit) BSN guarantees your clinical seat from day one; otherwise you apply into the nursing major after prerequisites. Graduate with a strong nursing GPA and pass the NCLEX-RN to be licensed.',
    dailyRoutine: 'Patient assessment and monitoring, medication administration, wound and IV care, charting, patient/family education, and collaboration with physicians and the care team; specialty and setting shape the day.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Strong GPA with Biology, Chemistry, and Anatomy/Physiology where offered',
          'Competitive SAT/ACT for direct-entry BSN admission (nursing is very competitive)',
          'Healthcare exposure: volunteering, nurse shadowing, or a CNA/CPR certification',
          'Research direct-entry BSN vs. 2+2 / upper-division programs'
        ],
        criticalJuniorHighSchoolPrep: 'Target direct-entry BSN programs so you don’t have to re-compete for a clinical seat in college. Build science grades and a healthcare resume now.',
        description: 'Apply to accredited 4-year BSN programs, ideally direct-entry.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Undergraduate College (BSN)',
        timeframe: '4 Years',
        degreeEarned: 'Bachelor of Science in Nursing (BSN)',
        keyRequirements: [
          'Complete nursing prerequisites (Microbiology, Anatomy & Physiology, Chemistry, Statistics)',
          'Complete supervised clinical rotations (Med-Surg, ICU, ER, Pediatrics, OB, Psych)',
          'Maintain a strong nursing GPA',
          'Pass the NCLEX-RN national licensing exam to become a Registered Nurse'
        ],
        criticalJuniorHighSchoolPrep: 'Prefer CCNE/ACEN-accredited programs with high NCLEX pass rates and strong hospital clinical partnerships.',
        description: 'Earn a BSN and become a licensed Registered Nurse.',
        annualCostEstimate: '$10,000 - $65,000 / year (varies widely by school & aid)'
      },
      {
        stageNumber: 3,
        stageName: 'Practice as an RN (and optional advancement)',
        timeframe: 'Ongoing / 2+ Years before advanced practice',
        degreeEarned: 'RN license (+ optional specialty certifications)',
        keyRequirements: [
          'Work as an RN and gain specialty experience (ICU experience is required for CRNA school)',
          'Earn specialty certifications (e.g., CCRN) and ACLS/PALS',
          'Optional: pursue graduate advanced practice (NP, CRNA, CNS, midwifery) — a BSN is the on-ramp'
        ],
        criticalJuniorHighSchoolPrep: 'A BSN keeps the most doors open — including CRNA — so it is the recommended nursing foundation.',
        description: 'Begin a paid nursing career with clear routes into higher-paying advanced practice roles.',
        annualCostEstimate: 'Earns RN salary; advanced degrees add later cost'
      }
    ],
    pros: [
      'Fastest of the health tracks to a licensed, well-paid career (4 years)',
      'Strong, faster-than-average job outlook and geographic flexibility',
      'A BSN is the gateway to advanced practice (NP, CRNA) and leadership',
      'Lower education debt than physician pathways'
    ],
    challenges: [
      'Direct-entry BSN admission is competitive out of high school',
      'Physically and emotionally demanding shift work',
      'Advancing to the highest-paying roles (e.g., CRNA) requires more school and ICU experience',
      'Scope of practice varies by state and setting'
    ],
    comparisonPoints: {
      autonomyLevel: 'Practices under a defined RN scope; advanced practice expands autonomy',
      callFrequency: 'Shift-based (days/nights/weekends), setting-dependent',
      trainingLength: '4 years to RN; +2–4 years for advanced practice',
      debtBurden: 'Comparatively low; starts earning after 4 years'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Registered Nurses (median $97,550; +6% outlook 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/registered-nurses.htm' },
      { label: 'AACN — American Association of Colleges of Nursing (BSN)', url: 'https://www.aacnnursing.org/' },
      { label: 'NCSBN — NCLEX-RN licensure exam', url: 'https://www.ncsbn.org/exams/nclex.page' }
    ]
  },

  undecided: {
    id: 'undecided',
    title: 'Exploring Health Careers',
    shortTitle: 'Exploring (Undecided)',
    roleDescription: 'Not sure which health career yet? That’s normal — and smart to explore now. Most health paths share the same high-school foundation, so you can keep medicine, nursing, CRNA, PA, pharmacy, dentistry, and the therapies open while you figure out the right fit.',
    totalYearsAfterHighSchool: 'Depends on the path you choose (4 to 15+ years)',
    averageSalary: 'Ranges widely — e.g., RN median $97,550 to physician median $239,200+ (BLS)',
    jobGrowth: 'Healthcare occupations are projected to grow much faster than average through 2034 (BLS)',
    undergradMajorStrategy: 'Keep options open: take the core sciences (Biology, Chemistry, Math) that nearly every health path requires, get broad clinical exposure by shadowing several professions, and choose a specific track by late high school or early college. Avoid narrowing too early before you’ve seen the work.',
    dailyRoutine: 'This stage is about exploration: volunteering, shadowing different clinicians, informational interviews, and reflecting on what you enjoy — patient contact, procedures, science, autonomy, training length, and lifestyle.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'Build the Common Foundation',
        timeframe: 'Grades 9 – 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Strong grades in Biology, Chemistry, and Math (the shared prerequisites for health paths)',
          'Broad clinical exposure: volunteer and shadow across roles (doctor, nurse, PA, pharmacist, therapist)',
          'Service, teamwork, and a healthcare student organization (e.g., HOSA)',
          'Reflect on training length, autonomy, income, and lifestyle trade-offs'
        ],
        criticalJuniorHighSchoolPrep: 'Junior year is a great time to shadow several professions — seeing the real work is the fastest way to narrow your choice without closing doors.',
        description: 'Keep every health pathway open by building the shared science foundation and exploring the actual jobs.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Choose a Path',
        timeframe: 'Late High School / Early College',
        degreeEarned: '—',
        keyRequirements: [
          'Compare pathways on training length, cost/debt, autonomy, and day-to-day work',
          'Pick a track (physician, nursing/CRNA, PA, pharmacy, dentistry, therapy, allied health)',
          'Align your college choice and major to that path’s prerequisites'
        ],
        criticalJuniorHighSchoolPrep: 'Use the pathway comparisons in RoundsAhead to weigh the trade-offs before you commit a college major.',
        description: 'Convert exploration into a decision, then follow that pathway’s specific plan.',
        annualCostEstimate: 'Varies by chosen path'
      }
    ],
    pros: [
      'Keeps the most options open while you learn what fits',
      'The shared science foundation transfers to every health path',
      'Shadowing many roles leads to a better-informed, more durable choice'
    ],
    challenges: [
      'Deciding too late can delay path-specific requirements (e.g., direct-entry BSN applications)',
      'Requires initiative to arrange varied shadowing and volunteering',
      'Some paths have early gates (nursing direct-entry) that reward earlier decisions'
    ],
    comparisonPoints: {
      autonomyLevel: 'Depends on the path chosen',
      callFrequency: 'Depends on the path chosen',
      trainingLength: '4 to 15+ years depending on the path',
      debtBurden: 'Depends on the path chosen'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Healthcare Occupations (outlook & wages)', url: 'https://www.bls.gov/ooh/healthcare/' },
      { label: 'Explore Health Careers (AAMC-supported)', url: 'https://explorehealthcareers.org/' }
    ]
  },

  physician_assistant: {
    id: 'physician_assistant',
    title: 'Physician Assistant (PA)',
    shortTitle: 'Physician Assistant (PA)',
    roleDescription: 'A licensed clinician who examines patients, diagnoses illness, orders and interprets tests, and prescribes treatment as part of a physician-led team, across virtually every specialty. PAs enter practice faster than physicians and move between specialties without new residencies.',
    totalYearsAfterHighSchool: '6 - 7 Years (4 undergrad + ~27-month master’s)',
    averageSalary: 'Median $135,880/yr (BLS, May 2024)',
    jobGrowth: '+21% for physician assistants, 2024–2034 (much faster than average)',
    undergradMajorStrategy: 'Any major works if you complete the science prerequisites (Biology, General & Organic Chemistry, Anatomy & Physiology, Microbiology, Statistics, Psychology). PA schools require substantial hands-on patient-care experience (often 1,000–2,000+ hours as an EMT, CNA, medical assistant, or scribe) and a strong GPA. Most programs use the CASPA application.',
    dailyRoutine: 'Taking histories and performing exams, diagnosing and treating conditions, ordering/interpreting labs and imaging, assisting in procedures and surgery, prescribing medications, and counseling patients — collaborating with supervising physicians.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Strong grades in Biology, Chemistry, and Math',
          'Explore patient-care roles (a summer CNA or EMT certification is a head start on required hours)',
          'Shadow PAs and other clinicians; volunteer in healthcare settings',
          'Target colleges with the PA prerequisites and good pre-health advising'
        ],
        criticalJuniorHighSchoolPrep: 'Getting an early patient-care credential (CNA/EMT) helps you bank the direct-care hours PA schools require while you’re still in high school or early college.',
        description: 'Build the science foundation and start accumulating hands-on patient-care experience.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Undergraduate College (Pre-PA)',
        timeframe: '4 Years',
        degreeEarned: 'Bachelor’s degree (any major)',
        keyRequirements: [
          'Complete PA prerequisites (Anatomy & Physiology, Micro, Chem, O-Chem, Stats, Psychology)',
          'Maintain a competitive GPA (3.4+ recommended)',
          'Accumulate 1,000–2,000+ direct patient-care hours',
          'Apply through CASPA; some programs require the GRE or PA-CAT'
        ],
        criticalJuniorHighSchoolPrep: 'Confirm each target PA program’s exact prerequisites and patient-care-hour minimums early — they vary by school.',
        description: 'Finish a bachelor’s while completing prerequisites and hands-on clinical hours.',
        annualCostEstimate: '$10,000 - $75,000 / year (varies widely by school & aid)'
      },
      {
        stageNumber: 3,
        stageName: 'PA Master’s Program & Licensure',
        timeframe: '~27 Months',
        degreeEarned: 'Master’s degree; PA-C after PANCE',
        keyRequirements: [
          'Attend an ARC-PA–accredited PA program (classroom + clinical rotations)',
          'Complete supervised clinical rotations across specialties',
          'Pass the PANCE (Physician Assistant National Certifying Exam) from the NCCPA',
          'Obtain a state license to practice'
        ],
        criticalJuniorHighSchoolPrep: 'PA programs are graduate-level and full-time; you generally can’t work during them.',
        description: 'Intensive master’s training that leads to licensure and practice — much faster than the physician route.',
        annualCostEstimate: '$25,000 - $55,000 / year'
      }
    ],
    pros: [
      'Practice medicine in about 6–7 years total, far faster than becoming a physician',
      'Move between specialties without a new residency',
      'Strong pay and among the fastest-growing health careers',
      'Lower total training time and debt than physician pathways'
    ],
    challenges: [
      'Substantial patient-care hours required before you can even apply',
      'PA school admission is competitive and graduate-level',
      'Practice under a physician-led team (scope varies by state)',
      'Prerequisites and hour requirements differ by program — careful planning needed'
    ],
    comparisonPoints: {
      autonomyLevel: 'Diagnoses, treats, and prescribes within a physician-led team; scope varies by state',
      callFrequency: 'Specialty- and setting-dependent',
      trainingLength: '~6–7 years (4 undergrad + ~27-month master’s)',
      debtBurden: 'Moderate — well below physician pathways'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Physician Assistants (median $135,880; +21% outlook 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/physician-assistants.htm' },
      { label: 'ARC-PA — accreditation of PA programs', url: 'https://www.arc-pa.org/' },
      { label: 'PAEA / CASPA — PA program application', url: 'https://paeaonline.org/' }
    ]
  },

  pharmacist: {
    id: 'pharmacist',
    title: 'Pharmacist (PharmD)',
    shortTitle: 'Pharmacist (PharmD)',
    roleDescription: 'A medication expert who dispenses prescriptions, counsels patients on safe use, checks for interactions, and increasingly provides clinical services like immunizations and medication management in pharmacies, hospitals, and clinics.',
    totalYearsAfterHighSchool: '6 - 8 Years (2–4 pre-pharmacy + 4-year PharmD)',
    averageSalary: 'Median $140,910/yr (BLS, May 2024)',
    jobGrowth: '+5% for pharmacists, 2024–2034 (faster than average)',
    undergradMajorStrategy: 'Complete pre-pharmacy prerequisites (Biology, General & Organic Chemistry, Physics, Anatomy & Physiology, Calculus, Statistics). Many students finish a bachelor’s first; some enter after 2–3 years, and a few "0–6" programs admit directly from high school. Programs use PharmCAS; the PCAT is now waived by many schools.',
    dailyRoutine: 'Verifying and dispensing prescriptions, checking for drug interactions and dosing, counseling patients, administering vaccines, collaborating with prescribers, and (in clinical roles) managing complex medication regimens.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Strong Chemistry, Biology, and Math foundation',
          'Consider "0–6" direct-admit PharmD programs if you’re sure now',
          'Work or volunteer in a pharmacy; shadow pharmacists in retail and hospital settings',
          'Target colleges with the pre-pharmacy prerequisites'
        ],
        criticalJuniorHighSchoolPrep: 'If pharmacy is a strong interest, research 0–6 direct-entry PharmD programs — they lock in your seat from freshman year.',
        description: 'Build a chemistry-heavy foundation and explore the profession in real pharmacies.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Pre-Pharmacy Coursework',
        timeframe: '2 - 4 Years',
        degreeEarned: 'Prerequisites (often a bachelor’s degree)',
        keyRequirements: [
          'Complete prerequisites (Gen & Organic Chem, Bio, Physics, A&P, Calculus, Stats)',
          'Maintain a competitive GPA',
          'Apply via PharmCAS (PCAT waived by many programs)',
          'Gain pharmacy experience as a technician or intern'
        ],
        criticalJuniorHighSchoolPrep: 'Check whether your target PharmD schools require a full bachelor’s or admit after two years.',
        description: 'Finish the science prerequisites (and usually a degree) required to enter PharmD programs.',
        annualCostEstimate: '$10,000 - $60,000 / year'
      },
      {
        stageNumber: 3,
        stageName: 'Doctor of Pharmacy (PharmD) & Licensure',
        timeframe: '4 Years',
        degreeEarned: 'PharmD; RPh after NAPLEX',
        keyRequirements: [
          'Attend an ACPE-accredited PharmD program (didactic + experiential rotations)',
          'Complete introductory and advanced pharmacy practice experiences',
          'Pass the NAPLEX and a law exam (MPJE) for state licensure',
          'Optional residency (PGY-1/PGY-2) for clinical or specialized roles'
        ],
        criticalJuniorHighSchoolPrep: 'The PharmD is a professional doctorate; plan for four full-time years and significant tuition.',
        description: 'Doctoral pharmacy training culminating in licensure to practice.',
        annualCostEstimate: '$20,000 - $65,000 / year'
      }
    ],
    pros: [
      'High, stable pay as a medication expert',
      'Direct-admit "0–6" programs can shorten the path',
      'Varied settings: community, hospital, clinical, industry, research',
      'Growing clinical role (immunizations, medication management)'
    ],
    challenges: [
      'Four-year professional doctorate with meaningful tuition',
      'Job market and setting mix have shifted in recent years — research demand where you want to work',
      'Licensure requires passing NAPLEX and a state law exam',
      'Some clinical roles now expect a residency'
    ],
    comparisonPoints: {
      autonomyLevel: 'Independent licensed practice within pharmacy scope; expanding clinical services',
      callFrequency: 'Shift-based; retail and hospital differ',
      trainingLength: '6–8 years (2–4 pre-pharmacy + 4-year PharmD)',
      debtBurden: 'Moderate to high depending on program and prior degree'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Pharmacists (median $140,910; +5% outlook 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/pharmacists.htm' },
      { label: 'ACPE — accreditation of PharmD programs', url: 'https://www.acpe-accredit.org/' },
      { label: 'PharmCAS — PharmD application', url: 'https://www.pharmcas.org/' }
    ]
  },

  dentist: {
    id: 'dentist',
    title: 'Dentist (DDS / DMD)',
    shortTitle: 'Dentist (DDS/DMD)',
    roleDescription: 'A doctor of oral health who diagnoses and treats problems with teeth, gums, and the mouth — from cleanings and fillings to extractions, restorations, and (with specialty training) orthodontics, oral surgery, and more.',
    totalYearsAfterHighSchool: '8 Years (4 undergrad + 4 dental school)',
    averageSalary: 'Median $176,110/yr (BLS, May 2024)',
    jobGrowth: '+6% for dentists, 2024–2034 (faster than average)',
    undergradMajorStrategy: 'Any major is fine with the prerequisites: Biology, General & Organic Chemistry, Physics, Biochemistry, and often English/Math. Aim for a strong GPA and a competitive DAT (Dental Admission Test) score, plus dentist shadowing and manual-dexterity activities. Apply through AADSAS.',
    dailyRoutine: 'Examining patients, taking and reading X-rays, diagnosing oral disease, performing procedures (fillings, crowns, extractions), administering local anesthesia, and leading a team of hygienists and assistants; many dentists run their own practices.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Strong Biology, Chemistry, and Math grades',
          'Shadow dentists (general and specialists) and volunteer in the community',
          'Develop hand skills / fine-motor hobbies (valued in dentistry)',
          'Target colleges with pre-dental advising and prerequisites'
        ],
        criticalJuniorHighSchoolPrep: 'Start shadowing dentists early — admissions committees look for genuine, documented exposure to the profession.',
        description: 'Build the science foundation and demonstrate real interest in dentistry.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Undergraduate College (Pre-Dental)',
        timeframe: '4 Years',
        degreeEarned: 'Bachelor’s degree (any major)',
        keyRequirements: [
          'Complete prerequisites (Bio, Gen & Organic Chem, Physics, Biochem)',
          'Maintain a competitive science and cumulative GPA',
          'Take the DAT (Dental Admission Test)',
          'Shadowing hours and letters; apply through AADSAS'
        ],
        criticalJuniorHighSchoolPrep: 'Confirm each dental school’s prerequisites and average DAT/GPA to plan a competitive application.',
        description: 'Earn a bachelor’s while completing prerequisites and preparing a strong dental-school application.',
        annualCostEstimate: '$10,000 - $75,000 / year'
      },
      {
        stageNumber: 3,
        stageName: 'Dental School & Licensure',
        timeframe: '4 Years',
        degreeEarned: 'DDS or DMD (equivalent degrees)',
        keyRequirements: [
          'Attend a CODA-accredited dental school (basic sciences + clinical training)',
          'Pass the Integrated National Board Dental Examination (INBDE)',
          'Complete a clinical licensure examination for your state',
          'Optional residency for specialties (orthodontics, oral surgery, etc.)'
        ],
        criticalJuniorHighSchoolPrep: 'DDS and DMD are the same degree with different names; both lead to licensure as a dentist.',
        description: 'Doctoral oral-health training leading to licensure and (optionally) specialty residency.',
        annualCostEstimate: '$40,000 - $80,000 / year'
      }
    ],
    pros: [
      'High income and strong practice-ownership / entrepreneurship options',
      'Predictable schedules relative to many physician specialties',
      'Clear 8-year timeline with no required residency for general dentistry',
      'Tangible, hands-on work with lasting patient relationships'
    ],
    challenges: [
      'High dental-school tuition and debt',
      'Competitive admissions (DAT + GPA + shadowing)',
      'Physically demanding, detail-intensive procedural work',
      'Specialties require additional years of residency'
    ],
    comparisonPoints: {
      autonomyLevel: 'Independent licensed practice; many own their practices',
      callFrequency: 'Generally low; largely scheduled office hours',
      trainingLength: '8 years (4 undergrad + 4 dental school)',
      debtBurden: 'High tuition, offset by strong earnings and ownership potential'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Dentists (median $176,110; +6% outlook 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/dentists.htm' },
      { label: 'CODA — Commission on Dental Accreditation', url: 'https://coda.ada.org/' },
      { label: 'ADEA AADSAS — dental school application', url: 'https://www.adea.org/dental_education_pathways/aadsas/' }
    ]
  },

  physical_therapist: {
    id: 'physical_therapist',
    title: 'Physical Therapist (DPT)',
    shortTitle: 'Physical Therapist (DPT)',
    roleDescription: 'A movement expert who helps patients recover from injury, manage chronic conditions, and improve mobility through hands-on treatment, therapeutic exercise, and education — in clinics, hospitals, sports, and rehabilitation settings.',
    totalYearsAfterHighSchool: '7 Years (4 undergrad + 3-year DPT)',
    averageSalary: 'Median $102,760/yr (BLS, May 2024)',
    jobGrowth: '+12% for physical therapists, 2024–2034 (much faster than average)',
    undergradMajorStrategy: 'Any major works with the prerequisites: Biology, Chemistry, Physics, Anatomy & Physiology, Psychology, and Statistics (kinesiology/exercise-science majors are common). DPT programs require observation hours under a licensed PT and use the PTCAS application; some require the GRE.',
    dailyRoutine: 'Evaluating movement and function, designing and guiding rehab exercise, hands-on manual therapy, tracking progress, and educating patients on prevention and recovery across orthopedic, neurologic, pediatric, and sports settings.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Solid Biology, Physics, and Math foundation',
          'Observe/volunteer with physical therapists in different settings',
          'Sports, athletic training, or exercise activities build relevant background',
          'Target colleges with pre-PT advising (often exercise/kinesiology programs)'
        ],
        criticalJuniorHighSchoolPrep: 'Start logging observation hours with a licensed PT — DPT programs require them, and different settings strengthen your application.',
        description: 'Build a science-and-movement foundation and start observation hours.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Undergraduate College (Pre-PT)',
        timeframe: '4 Years',
        degreeEarned: 'Bachelor’s degree (any major)',
        keyRequirements: [
          'Complete prerequisites (Bio, Chem, Physics, Anatomy & Physiology, Psych, Stats)',
          'Maintain a competitive GPA (3.4+ recommended)',
          'Accumulate observation hours across PT settings',
          'Apply through PTCAS; some programs require the GRE'
        ],
        criticalJuniorHighSchoolPrep: 'Prerequisites and required observation hours vary by DPT program — verify each school’s list early.',
        description: 'Finish a bachelor’s while completing prerequisites and observation hours.',
        annualCostEstimate: '$10,000 - $65,000 / year'
      },
      {
        stageNumber: 3,
        stageName: 'Doctor of Physical Therapy (DPT) & Licensure',
        timeframe: '3 Years',
        degreeEarned: 'DPT; licensed PT after NPTE',
        keyRequirements: [
          'Attend a CAPTE-accredited DPT program (didactic + full-time clinical internships)',
          'Complete supervised clinical rotations',
          'Pass the National Physical Therapy Examination (NPTE)',
          'Optional residency/fellowship for specialization'
        ],
        criticalJuniorHighSchoolPrep: 'The DPT is a 3-year doctoral degree; entry-level PTs are doctors of physical therapy.',
        description: 'Doctoral training in movement science leading to licensure to practice.',
        annualCostEstimate: '$20,000 - $55,000 / year'
      }
    ],
    pros: [
      'Fast-growing field with strong demand',
      'Hands-on, relationship-driven work helping people move and recover',
      'Varied settings: outpatient, hospital, sports, pediatrics, home health',
      'Doctoral credential in a 7-year timeline'
    ],
    challenges: [
      'DPT tuition can produce debt high relative to PT salaries',
      'Physically active, demanding work',
      'Competitive admissions with required observation hours',
      'Specialization requires additional residency/fellowship'
    ],
    comparisonPoints: {
      autonomyLevel: 'Licensed independent evaluation and treatment; direct access varies by state',
      callFrequency: 'Generally scheduled hours; setting-dependent',
      trainingLength: '7 years (4 undergrad + 3-year DPT)',
      debtBurden: 'Can be high relative to salary — weigh program cost carefully'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Physical Therapists (median $102,760; +12% outlook 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/physical-therapists.htm' },
      { label: 'CAPTE — accreditation of PT programs', url: 'https://www.capteonline.org/' },
      { label: 'PTCAS — DPT application', url: 'https://ptcas.liaisoncas.com/' }
    ]
  },

  veterinarian: {
    id: 'veterinarian',
    title: 'Veterinarian (DVM)',
    shortTitle: 'Veterinarian (DVM)',
    roleDescription: 'A doctor of veterinary medicine who diagnoses and treats animals — companion pets, livestock, or exotics — performing exams and surgery, prescribing treatment, and advising owners. US veterinary schools are few and highly competitive.',
    totalYearsAfterHighSchool: '8 Years (4 undergrad + 4 vet school)',
    averageSalary: 'Median $130,100/yr (BLS, May 2024)',
    jobGrowth: '+9% for veterinarians, 2024–2034 (much faster than average)',
    undergradMajorStrategy: 'Any major with the prerequisites: Biology, General & Organic Chemistry, Physics, Biochemistry, and often Math/Statistics and English. Veterinary and animal experience hours (clinics, farms, shelters, research) are essential. Apply through VMCAS; GRE requirements vary by school.',
    dailyRoutine: 'Examining animals, diagnosing illness and injury, performing surgery and dental work, vaccinating, running and interpreting diagnostics, prescribing medications, and counseling owners — sometimes across species and settings.',
    stages: [
      {
        stageNumber: 1,
        stageName: 'High School Junior & Senior Years',
        timeframe: 'Grades 11 & 12',
        degreeEarned: 'High School Diploma',
        keyRequirements: [
          'Strong Biology, Chemistry, and Math grades',
          'Gain animal experience: volunteer at clinics, shelters, farms, or with a vet',
          'Shadow veterinarians across practice types (small animal, large animal, exotic)',
          'Target colleges with pre-vet advising and prerequisites'
        ],
        criticalJuniorHighSchoolPrep: 'US vet schools are few and extremely competitive — start logging diverse animal and veterinary experience hours as early as possible.',
        description: 'Build the science foundation and accumulate varied animal/veterinary experience.',
        annualCostEstimate: '$0 (Public HS)'
      },
      {
        stageNumber: 2,
        stageName: 'Undergraduate College (Pre-Vet)',
        timeframe: '4 Years',
        degreeEarned: 'Bachelor’s degree (any major)',
        keyRequirements: [
          'Complete prerequisites (Bio, Gen & Organic Chem, Physics, Biochem, Math/Stats)',
          'Maintain a high GPA (vet admission is very competitive)',
          'Accumulate substantial veterinary + animal experience hours',
          'Apply through VMCAS; check each school’s GRE policy'
        ],
        criticalJuniorHighSchoolPrep: 'With so few US vet schools, a high GPA and deep, varied experience matter enormously.',
        description: 'Earn a bachelor’s while completing prerequisites and extensive animal experience.',
        annualCostEstimate: '$10,000 - $75,000 / year'
      },
      {
        stageNumber: 3,
        stageName: 'Veterinary School & Licensure',
        timeframe: '4 Years',
        degreeEarned: 'DVM (Doctor of Veterinary Medicine)',
        keyRequirements: [
          'Attend an AVMA COE–accredited veterinary program (basic sciences + clinical rotations)',
          'Complete clinical training across species/systems',
          'Pass the North American Veterinary Licensing Examination (NAVLE)',
          'Optional internship/residency for specialties'
        ],
        criticalJuniorHighSchoolPrep: 'The DVM is a 4-year doctoral degree; general practice needs no residency, but specialties do.',
        description: 'Doctoral veterinary training leading to licensure to practice.',
        annualCostEstimate: '$25,000 - $65,000 / year (higher out-of-state)'
      }
    ],
    pros: [
      'Doctor-level medicine and surgery for animals in an 8-year timeline',
      'Strong demand and faster-than-average growth',
      'Varied settings and species; general practice needs no residency',
      'Deeply rewarding for animal-focused students'
    ],
    challenges: [
      'Very few US vet schools — admission is extremely competitive',
      'High tuition and debt relative to veterinarian salaries',
      'Emotionally demanding work, including end-of-life care',
      'Extensive animal-experience hours required before applying'
    ],
    comparisonPoints: {
      autonomyLevel: 'Independent licensed practice; often owns or leads a clinic',
      callFrequency: 'Setting-dependent (emergency and large-animal practice can be higher)',
      trainingLength: '8 years (4 undergrad + 4 vet school)',
      debtBurden: 'Often high relative to salary — plan the finances carefully'
    },
    lastVerified: '2026-09-04',
    dataSources: [
      { label: 'BLS — Veterinarians (median $130,100; +9% outlook 2024–34)', url: 'https://www.bls.gov/ooh/healthcare/veterinarians.htm' },
      { label: 'AVMA Council on Education — accredited vet schools', url: 'https://www.avma.org/education/center-for-veterinary-accreditation/accreditation-policies-and-procedures-avma-council-education-coe' },
      { label: 'VMCAS — veterinary school application', url: 'https://www.aavmc.org/becoming-a-veterinarian/how-to-apply/' }
    ]
  }
};
