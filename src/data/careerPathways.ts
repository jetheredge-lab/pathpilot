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
    }
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
    }
  }
};
