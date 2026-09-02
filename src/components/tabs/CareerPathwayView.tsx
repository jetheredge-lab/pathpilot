import React, { useState } from 'react';
import { 
  Stethoscope, 
  Clock, 
  DollarSign, 
  GraduationCap, 
  CheckCircle, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  HeartHandshake,
  HelpCircle,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAREER_PATHWAYS } from '../../data/careerPathways';
import { CareerGoal } from '../../types';

export const CareerPathwayView: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [activeTab, setActiveTab] = useState<'comparison' | 'anesthesiologist' | 'crna'>('comparison');

  const mdData = CAREER_PATHWAYS.anesthesiologist;
  const crnaData = CAREER_PATHWAYS.crna;

  const handleSelectGoal = (goal: CareerGoal) => {
    updateProfile({ careerGoal: goal });
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              <span>Healthcare Career Pathway Explorer</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              Anesthesiologist (MD/DO) vs Nurse Anesthetist (CRNA)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Compare the two premier paths in anesthesia care. Discover required undergraduate majors, high school junior year priorities, timelines, debt, and clinical training.
            </p>
          </div>

          {/* Active Choice Badge */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Your Current Focus:</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-sm font-black text-slate-900 capitalize">
                {profile.careerGoal === 'crna' ? 'Nurse Anesthetist (CRNA)' : profile.careerGoal === 'anesthesiologist' ? 'Anesthesiologist (MD/DO)' : 'Exploring Both'}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-brand-100 text-brand-800 font-bold">Active</span>
            </div>
          </div>
        </div>

        {/* Pathway Sub-tabs */}
        <div className="flex space-x-2 mt-6 border-b border-slate-200 pb-2">
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'comparison'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Side-by-Side Comparison Matrix
          </button>
          <button
            onClick={() => setActiveTab('anesthesiologist')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'anesthesiologist'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Physician Anesthesiologist (MD/DO) Roadmap
          </button>
          <button
            onClick={() => setActiveTab('crna')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              activeTab === 'crna'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            Nurse Anesthetist (CRNA) Roadmap
          </button>
        </div>
      </div>

      {/* COMPARISON MATRIX VIEW */}
      {activeTab === 'comparison' && (
        <div className="space-y-8">
          
          {/* 2 Big Headline Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* MD / DO Card */}
            <div className={`p-6 rounded-3xl border transition-all ${
              profile.careerGoal === 'anesthesiologist' 
                ? 'bg-blue-50/40 border-blue-300 ring-2 ring-blue-500/20 shadow-md' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full">
                  Physician Route (MD/DO)
                </span>
                {profile.careerGoal === 'anesthesiologist' && (
                  <span className="text-xs font-bold text-blue-600 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Selected Track</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 mt-3">{mdData.title}</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mdData.roleDescription}</p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400">Total Years Post-HS</span>
                  <span className="text-sm font-black text-slate-900 block mt-0.5">{mdData.totalYearsAfterHighSchool}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400">Average Salary</span>
                  <span className="text-sm font-black text-emerald-700 block mt-0.5">{mdData.averageSalary}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Undergrad College Strategy:</h4>
                <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                  {mdData.undergradMajorStrategy}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center">
                <button
                  onClick={() => setActiveTab('anesthesiologist')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                >
                  <span>View 4-Stage Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleSelectGoal('anesthesiologist')}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Set as Target Goal
                </button>
              </div>
            </div>

            {/* CRNA Card */}
            <div className={`p-6 rounded-3xl border transition-all ${
              profile.careerGoal === 'crna' 
                ? 'bg-purple-50/40 border-purple-300 ring-2 ring-purple-500/20 shadow-md' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-100 px-2.5 py-1 rounded-full">
                  Advanced Practice Nursing Route (CRNA)
                </span>
                {profile.careerGoal === 'crna' && (
                  <span className="text-xs font-bold text-purple-600 flex items-center space-x-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Selected Track</span>
                  </span>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 mt-3">{crnaData.title}</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{crnaData.roleDescription}</p>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400">Total Years Post-HS</span>
                  <span className="text-sm font-black text-slate-900 block mt-0.5">{crnaData.totalYearsAfterHighSchool}</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <span className="text-[11px] font-semibold text-slate-400">Average Salary</span>
                  <span className="text-sm font-black text-emerald-700 block mt-0.5">{crnaData.averageSalary}</span>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <h4 className="text-xs font-bold text-slate-900">Undergrad College Strategy:</h4>
                <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200">
                  {crnaData.undergradMajorStrategy}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200 flex justify-between items-center">
                <button
                  onClick={() => setActiveTab('crna')}
                  className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center space-x-1"
                >
                  <span>View 4-Stage Timeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleSelectGoal('crna')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Set as Target Goal
                </button>
              </div>
            </div>
          </div>

          {/* Detailed Side-by-Side Comparison Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Comprehensive Dimension Comparison</h3>
              <span className="text-xs text-slate-500">Key decision factors for high school families</span>
            </div>

            <div className="divide-y divide-slate-200">
              
              {/* Row 1: Undergraduate Admission Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-4">
                <div className="font-bold text-xs text-slate-900 flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-brand-600" />
                  <span>High School & Undergrad Application</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="text-blue-700 block">Pre-Med Track:</strong>
                  Apply to top biology, biochemistry, or health science colleges with strong Pre-Med committee support and hospital research connections.
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="text-purple-700 block">Direct-Entry BSN:</strong>
                  Apply directly to freshman-entry 4-Year BSN Nursing programs so clinical seats are 100% guaranteed from Day 1 without sophomore weed-out.
                </div>
              </div>

              {/* Row 2: Time to Practice & Early Earning */}
              <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-4 bg-slate-50/50">
                <div className="font-bold text-xs text-slate-900 flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Timeline & Early Income</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="text-blue-700 block">12-13+ Years:</strong>
                  4 yrs college + 4 yrs med school (no income) + 4 yrs residency (~$70k/yr). First full physician salary at age ~30-31.
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="text-purple-700 block">8-9 Years:</strong>
                  4 yrs BSN + 1-2 yrs full ICU RN salary ($85k-$110k/yr) + 3 yrs CRNA doctorate. Full CRNA salary at age ~26-27.
                </div>
              </div>

              {/* Row 3: Educational Debt & Cost */}
              <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-4">
                <div className="font-bold text-xs text-slate-900 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Estimated Total Debt</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="text-blue-700 block">Higher Debt ($200k - $300k+):</strong>
                  Medical school tuition averages $55k-$70k/yr. Offset by significantly higher long-term career earning power ($500k+).
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="text-purple-700 block">Lower Net Debt ($80k - $150k):</strong>
                  Student earns $100k+ as an ICU nurse before CRNA school. Total borrowing is markedly lower.
                </div>
              </div>

              {/* Row 4: Autonomy & Work-Life Balance */}
              <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-4 bg-slate-50/50">
                <div className="font-bold text-xs text-slate-900 flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>Clinical Autonomy & Lifestyle</span>
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="text-blue-700 block">Maximum Medical Authority:</strong>
                  Full independent physician license. Handles most critical cardiac, pediatric, and trauma surgeries. Higher night/weekend call burden.
                </div>
                <div className="text-xs text-slate-700 space-y-1">
                  <strong className="text-purple-700 block">High Autonomy & Predictable Shifts:</strong>
                  Independent practice in 24+ states and military; collaborative in others. Often more predictable surgical shifts and lower on-call burden.
                </div>
              </div>
            </div>
          </div>

          {/* High School Junior Action Guide for Both Paths */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8">
            <div className="flex items-center space-x-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Junior Year Action Blueprint</span>
            </div>
            <h3 className="text-xl font-black text-white">What your son should focus on right now (11th Grade)</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-brand-300 flex items-center space-x-2">
                  <Stethoscope className="w-4 h-4" />
                  <span>If Leaning Toward Anesthesiologist (MD):</span>
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-400 font-bold">•</span>
                    <span><strong>Maximize STEM GPA:</strong> Excel in AP Chemistry, AP Biology, and Calculus. Pre-med colleges scrutinize high school science stamina.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-400 font-bold">•</span>
                    <span><strong>Standardized Testing:</strong> Target SAT 1400-1550+ or ACT 32-35 to qualify for top pre-med institutions and honors colleges.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-brand-400 font-bold">•</span>
                    <span><strong>Hospital Shadowing:</strong> Connect with physician anesthesiologists for 20-40 observation hours.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                <h4 className="text-sm font-bold text-purple-300 flex items-center space-x-2">
                  <HeartHandshake className="w-4 h-4" />
                  <span>If Leaning Toward Nurse Anesthetist (CRNA):</span>
                </h4>
                <ul className="mt-3 space-y-2 text-xs text-slate-300">
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Target Direct-Entry BSN:</strong> Identify colleges with direct-admit nursing (e.g. Case Western, Pitt, Villanova, Penn, UVA).</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Hands-On Care Certification:</strong> Consider earning CPR/BLS or attending a summer CNA (Certified Nursing Assistant) course.</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span><strong>Shadow a CRNA:</strong> High school shadowing in an OR or endoscopy suite confirms passion for acute anesthesia care.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DETAILED ROADMAP: ANESTHESIOLOGIST (MD/DO) */}
      {activeTab === 'anesthesiologist' && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-blue-900">Physician Anesthesiologist (MD / DO) Career Pathway</h2>
            <p className="text-xs text-blue-800 mt-1">
              A comprehensive 4-stage roadmap taking a student from high school junior year through undergraduate pre-med, medical school, and anesthesiology residency.
            </p>
          </div>

          <div className="space-y-4">
            {mdData.stages.map((stage, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {stage.stageNumber}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{stage.stageName}</h3>
                      <span className="text-xs font-semibold text-blue-600">{stage.timeframe} • {stage.degreeEarned}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Est. Cost: {stage.annualCostEstimate}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3">{stage.description}</p>

                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-900 mb-2">Key Requirements & Milestones:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stage.keyRequirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-800">
                  <strong>High School Prep Advice: </strong>{stage.criticalJuniorHighSchoolPrep}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DETAILED ROADMAP: CRNA */}
      {activeTab === 'crna' && (
        <div className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 p-6 rounded-3xl">
            <h2 className="text-xl font-bold text-purple-900">Certified Registered Nurse Anesthetist (CRNA) Pathway</h2>
            <p className="text-xs text-purple-800 mt-1">
              A streamlined, high-earning 4-stage pathway through Direct-Entry BSN, ICU Registered Nursing, and Doctoral Nurse Anesthesia practice (DNP/DNAP).
            </p>
          </div>

          <div className="space-y-4">
            {crnaData.stages.map((stage, idx) => (
              <div key={idx} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
                      {stage.stageNumber}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{stage.stageName}</h3>
                      <span className="text-xs font-semibold text-purple-600">{stage.timeframe} • {stage.degreeEarned}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                    Est. Cost: {stage.annualCostEstimate}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-3">{stage.description}</p>

                <div className="mt-4">
                  <h4 className="text-xs font-bold text-slate-900 mb-2">Key Requirements & Milestones:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {stage.keyRequirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-start space-x-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <CheckCircle className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-800">
                  <strong>High School Prep Advice: </strong>{stage.criticalJuniorHighSchoolPrep}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 flex items-center space-x-2 mb-4">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <span>Frequently Asked Questions for High School Families</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm text-slate-600">
          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900">What is the difference between Direct-Entry BSN and standard Pre-Nursing?</h4>
            <p>
              In a <strong>Direct-Entry BSN</strong> program, admission as a high school senior guarantees you a clinical spot in the nursing school. In generic "Pre-Nursing", students must re-compete for a limited number of clinical spots in their sophomore year with a high weed-out rate. Direct-entry is vastly preferred!
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900">Can a student switch from Pre-Med to Nursing or vice versa?</h4>
            <p>
              Yes, but switching into nursing is harder than starting in nursing. If a student starts in a Direct-Entry BSN, they can easily take the extra 2-3 pre-med chemistry/physics requirements if they decide to take the MCAT for med school later.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900">Do medical schools care what you major in?</h4>
            <p>
              No! Medical schools do not care if you major in Biology, Chemistry, Psychology, English, or Nursing, as long as you complete all required pre-med science prerequisite courses (O-Chem, Biochem, Physics, Bio) and score high on the MCAT.
            </p>
          </div>

          <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <h4 className="font-bold text-slate-900">Why is ICU experience mandatory for CRNA programs?</h4>
            <p>
              CRNAs manage high-risk airways, mechanical ventilation, and vasoactive drug titrations. Accredited doctoral CRNA programs require 1-3 years of hands-on adult or pediatric ICU experience to ensure clinical crisis management skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
