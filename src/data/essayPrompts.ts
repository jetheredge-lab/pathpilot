export interface CommonAppPrompt {
  id: number;
  prompt: string;
  category: string;
  brainstormQuestions: string[];
  tipsForPreMedAndNursing: string;
}

export const COMMON_APP_PROMPTS: CommonAppPrompt[] = [
  {
    id: 1,
    prompt: "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.",
    category: "Identity & Core Passion",
    brainstormQuestions: [
      "What is something you do purely for the love of it, where you lose all track of time?",
      "How has a unique family, cultural, or personal experience shaped the way you view science, caregiving, or healing?",
      "What core interest defines your curiosity outside of the classroom?"
    ],
    tipsForPreMedAndNursing: "Avoid writing just 'I want to help people.' Show a specific moment where your intellectual curiosity or empathy came alive (e.g. dissecting an organ, learning complex pharmacology, or caring for a loved one)."
  },
  {
    id: 2,
    prompt: "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?",
    category: "Resilience & Growth",
    brainstormQuestions: [
      "When did a science lab experiment, sports season, or academic goal go completely wrong?",
      "How did you recalibrate when you faced an unexpected hurdle?",
      "What did that experience teach you about perseverance, emotional composure, or problem solving under pressure?"
    ],
    tipsForPreMedAndNursing: "Both anesthesia and critical care nursing demand unflappable composure under pressure. Showing how you calmly analyze a mistake and bounce back is highly valued by admissions committees."
  },
  {
    id: 3,
    prompt: "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?",
    category: "Critical Thinking",
    brainstormQuestions: [
      "When did you challenge a common misconception in science, healthcare access, or team dynamics?",
      "What evidence did you seek out to evaluate the issue objectively?",
      "How did this change how you communicate with others who hold different views?"
    ],
    tipsForPreMedAndNursing: "Focus on evidence-based inquiry, patient advocacy, or bridging communication gaps."
  },
  {
    id: 4,
    prompt: "Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?",
    category: "Gratitude & Perspective",
    brainstormQuestions: [
      "Who showed unexpected kindness or mentorship when you were struggling?",
      "How did receiving that support inspire you to pay it forward to others in your community or hospital volunteering?"
    ],
    tipsForPreMedAndNursing: "Great for illustrating the mentor-mentee relationship or the profound impact of compassionate care in a medical setting."
  },
  {
    id: 5,
    prompt: "Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.",
    category: "Transformation & Maturity",
    brainstormQuestions: [
      "What milestone (e.g. first hospital clinical shift, leading a HOSA competition, earning CPR/CNA certification) changed your perspective on adulthood or healthcare?",
      "How did your worldview expand after that event?"
    ],
    tipsForPreMedAndNursing: "A stellar prompt for describing the transition from admiring healthcare from afar to stepping into a real clinical environment with real human vulnerability."
  },
  {
    id: 6,
    prompt: "Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?",
    category: "Intellectual Vitality",
    brainstormQuestions: [
      "What biological mechanism, pharmacology concept, or physiological system are you obsessed with reading about?",
      "How do you explore this topic beyond your high school syllabus (podcasts, medical journals, research papers)?"
    ],
    tipsForPreMedAndNursing: "Ideal for deep STEM enthusiasts. Dive into the fascinating physiology of anesthesia (how anesthetic drugs alter neural firing, pain pathways, or hemodynamic stability)."
  },
  {
    id: 7,
    prompt: "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design.",
    category: "Open Topic",
    brainstormQuestions: [
      "Do you have a unique narrative that doesn't fit the other boxes?",
      "What is the single most vivid story that showcases your voice, values, and humor?"
    ],
    tipsForPreMedAndNursing: "Ensure the essay retains focus and tells a compelling personal story rather than reading like a resume in paragraph form."
  }
];

export const SUPPLEMENTAL_TEMPLATES = [
  {
    id: 'why_nursing_premed',
    title: 'Why Healthcare / Why Pre-Med / Why Nursing (BSN)?',
    typicalWordCount: 300,
    guidance: 'Colleges want to see that your desire to enter healthcare is authentic, informed by real experience, and grounded in service rather than prestige or financial reward.',
    outlineStructure: [
      'Hook: A specific clinical, personal, or scientific moment that catalyzed your interest.',
      'Validation: How you tested this interest (volunteering, shadowing, coursework, CPR/EMT training).',
      'Understanding of the Profession: Demonstrate you know the realities (stamina, empathy, precision, lifelong learning).',
      'Future Vision: How this university will provide the clinical immersion and academic training to achieve your goals.'
    ]
  },
  {
    id: 'why_this_college',
    title: 'Why This Specific College / Program?',
    typicalWordCount: 250,
    guidance: 'Do NOT write generic praise about great professors or nice campuses. Name specific simulation labs, hospital affiliations, research institutes, specialized courses, or student organizations.',
    outlineStructure: [
      'Specific Academic Fit: Mention 1-2 upper-level courses or research labs that excite you.',
      'Clinical / Experiential Advantage: Mention their specific hospital partnerships (e.g. UPMC, Cleveland Clinic, CHOP, Emory Healthcare).',
      'Community Contribution: How you will engage with campus student life (e.g., pre-health societies, peer tutoring).'
    ]
  },
  {
    id: 'community_contribution',
    title: 'Community Contribution & Personal Perspective',
    typicalWordCount: 250,
    guidance: 'Focus on how your background, values, and collaborative spirit will contribute to the diversity and energy of the campus and residential community.',
    outlineStructure: [
      'Context: A community you belong to (academic, cultural, athletic, service).',
      'Your Active Role: How you brought people together or solved a problem.',
      'Translation to College: How you will foster inclusive, supportive teamwork on campus.'
    ]
  }
];

export const RECOMMENDATION_EMAIL_TEMPLATE = `Dear [Teacher/Counselor Name],

I hope you are having a wonderful week! 

As I prepare for my college applications and plan my future studies in [Pre-Med / Direct-Entry Nursing / Healthcare], your [Class Name, e.g., AP Chemistry] class was one of the most rewarding and formative academic experiences of my high school career. I truly appreciated your guidance, especially when [mention specific project, lab, or memory from their class].

I am writing to respectfully ask if you would feel comfortable writing a strong letter of recommendation on my behalf for my college applications this coming fall.

To make this as easy and helpful as possible, I have compiled my student resume and an academic brag sheet detailing:
• My academic coursework, GPA, and test scores
• My clinical volunteering and healthcare shadowing hours
• Key projects and moments from your class that inspired me
• My target colleges and deadlines (earliest deadline: [Date, e.g., November 1st])

I would be delighted to meet briefly during office hours or after school to answer any questions. Thank you so much for your time, support, and mentorship!

Warm regards,

[Student Full Name]
High School Junior | Class of [Grad Year]
[Student Email] | [Student Phone]`;
