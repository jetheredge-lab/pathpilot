import React, { useState } from 'react';
import {
  Clock,
  DollarSign,
  TrendingUp,
  GraduationCap,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowLeftRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CAREER_PATHWAYS } from '../../data/careerPathways';
import { CareerPathway } from '../../types';

// Curated display order for the selector (general first, then specialized).
const PATHWAY_ORDER = ['undecided', 'premed_general', 'anesthesiologist', 'nursing_general', 'crna'];

const orderedPathways = (): CareerPathway[] => {
  const all = CAREER_PATHWAYS;
  const known = PATHWAY_ORDER.filter((id) => all[id]).map((id) => all[id]);
  const rest = Object.values(all).filter((p) => !PATHWAY_ORDER.includes(p.id));
  return [...known, ...rest];
};

function formatVerified(iso?: string): string {
  if (!iso) return '';
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export const CareerPathwayView: React.FC = () => {
  const { profile, updateProfile } = useApp();
  const [comparing, setComparing] = useState(false);

  const pathways = orderedPathways();
  const selected = CAREER_PATHWAYS[profile.careerGoal] ?? pathways[0];

  const select = (id: string) => {
    updateProfile({ careerGoal: id });
    setComparing(false);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header + selector */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3">
          <Activity className="w-3.5 h-3.5 text-emerald-600" />
          <span>Health Career Pathway Explorer</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Which path are you exploring?</h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Pick a pathway to see the roadmap from high school through licensure — training length, prerequisites,
          cost, and outlook. Every fact is sourced and dated.
        </p>

        <div className="flex flex-wrap gap-2 mt-5">
          {pathways.map((p) => {
            const active = !comparing && p.id === selected.id;
            return (
              <button
                key={p.id}
                onClick={() => select(p.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors ${
                  active
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {p.shortTitle}
              </button>
            );
          })}
          {CAREER_PATHWAYS.anesthesiologist && CAREER_PATHWAYS.crna && (
            <button
              onClick={() => setComparing(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 ${
                comparing ? 'bg-brand-600 text-white shadow-sm' : 'bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-200'
              }`}
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
              Compare MD vs CRNA
            </button>
          )}
        </div>
      </div>

      {comparing ? (
        <ComparisonView md={CAREER_PATHWAYS.anesthesiologist} crna={CAREER_PATHWAYS.crna} />
      ) : (
        <PathwayDetail pathway={selected} isCurrentFocus={selected.id === profile.careerGoal} />
      )}
    </div>
  );
};

// ── Single pathway roadmap ───────────────────────────────────────────
const Stat: React.FC<{ icon: React.ReactNode; label: string; value: string; accent?: string }> = ({ icon, label, value, accent }) => (
  <div className="bg-white rounded-2xl border border-slate-200 p-4">
    <div className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide ${accent ?? 'text-slate-400'}`}>
      {icon}
      {label}
    </div>
    <div className="text-sm font-bold text-slate-900 mt-1 leading-snug">{value}</div>
  </div>
);

const PathwayDetail: React.FC<{ pathway: CareerPathway; isCurrentFocus: boolean }> = ({ pathway, isCurrentFocus }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">{pathway.title}</h2>
          <p className="text-sm text-slate-600 mt-2 max-w-3xl">{pathway.roleDescription}</p>
        </div>
        {isCurrentFocus && (
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-brand-100 text-brand-800 whitespace-nowrap">
            Your focus
          </span>
        )}
      </div>

      <div className="grid sm:grid-cols-3 gap-3 mt-5">
        <Stat icon={<Clock className="w-3.5 h-3.5" />} label="Time after high school" value={pathway.totalYearsAfterHighSchool} accent="text-brand-600" />
        <Stat icon={<DollarSign className="w-3.5 h-3.5" />} label="Typical pay" value={pathway.averageSalary} accent="text-emerald-600" />
        <Stat icon={<TrendingUp className="w-3.5 h-3.5" />} label="Job outlook" value={pathway.jobGrowth} accent="text-indigo-600" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-5">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Undergraduate strategy</h4>
          <p className="text-sm text-slate-700">{pathway.undergradMajorStrategy}</p>
        </div>
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4">
          <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-1">Day-to-day</h4>
          <p className="text-sm text-slate-700">{pathway.dailyRoutine}</p>
        </div>
      </div>
    </div>

    {/* Stage timeline */}
    <div className="space-y-4">
      {pathway.stages.map((stage) => (
        <div key={stage.stageNumber} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm flex-none">
              {stage.stageNumber}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className="font-bold text-slate-900">{stage.stageName}</h3>
                <span className="text-xs text-slate-500 flex items-center gap-1"><Clock className="w-3 h-3" /> {stage.timeframe}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {stage.degreeEarned}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1"><DollarSign className="w-3 h-3" /> {stage.annualCostEstimate}</span>
              </div>
              <p className="text-sm text-slate-600 mt-1.5">{stage.description}</p>

              <ul className="mt-3 space-y-1.5">
                {stage.keyRequirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-none mt-0.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              {stage.criticalJuniorHighSchoolPrep && (
                <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-none mt-0.5" />
                  <p className="text-xs text-amber-800">{stage.criticalJuniorHighSchoolPrep}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Pros / challenges */}
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="bg-emerald-50 rounded-2xl border border-emerald-200 p-5">
        <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Strengths</h4>
        <ul className="space-y-1.5">
          {pathway.pros.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-emerald-900"><CheckCircle className="w-4 h-4 text-emerald-500 flex-none mt-0.5" />{p}</li>
          ))}
        </ul>
      </div>
      <div className="bg-rose-50 rounded-2xl border border-rose-200 p-5">
        <h4 className="font-bold text-rose-800 mb-2 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Trade-offs</h4>
        <ul className="space-y-1.5">
          {pathway.challenges.map((c, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-rose-900"><AlertCircle className="w-4 h-4 text-rose-500 flex-none mt-0.5" />{c}</li>
          ))}
        </ul>
      </div>
    </div>

    {/* Sources / verification */}
    {pathway.dataSources && pathway.dataSources.length > 0 && (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Verified {formatVerified(pathway.lastVerified)} · sources
        </div>
        <ul className="mt-2 space-y-1">
          {pathway.dataSources.map((s, i) => (
            <li key={i}>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-600 hover:text-brand-700 inline-flex items-center gap-1">
                <ExternalLink className="w-3 h-3" /> {s.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[11px] text-slate-400 mt-2">
          Figures are estimates that change over time. Always confirm current costs, prerequisites, and salaries with the
          schools and the sources above.
        </p>
      </div>
    )}
  </div>
);

// ── MD vs CRNA comparison ────────────────────────────────────────────
const ComparisonView: React.FC<{ md: CareerPathway; crna: CareerPathway }> = ({ md, crna }) => {
  const rows: { label: string; md: string; crna: string }[] = [
    { label: 'Time after high school', md: md.totalYearsAfterHighSchool, crna: crna.totalYearsAfterHighSchool },
    { label: 'Typical pay', md: md.averageSalary, crna: crna.averageSalary },
    { label: 'Job outlook', md: md.jobGrowth, crna: crna.jobGrowth },
    { label: 'Undergraduate major', md: md.undergradMajorStrategy, crna: crna.undergradMajorStrategy },
    { label: 'Autonomy', md: md.comparisonPoints.autonomyLevel, crna: crna.comparisonPoints.autonomyLevel },
    { label: 'Call frequency', md: md.comparisonPoints.callFrequency, crna: crna.comparisonPoints.callFrequency },
    { label: 'Training length', md: md.comparisonPoints.trainingLength, crna: crna.comparisonPoints.trainingLength },
    { label: 'Debt burden', md: md.comparisonPoints.debtBurden, crna: crna.comparisonPoints.debtBurden },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-400 w-44">Factor</th>
            <th className="text-left px-4 py-3 font-black text-blue-700">{md.shortTitle}</th>
            <th className="text-left px-4 py-3 font-black text-purple-700">{crna.shortTitle}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 align-top">
          {rows.map((r) => (
            <tr key={r.label}>
              <th className="text-left px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">{r.label}</th>
              <td className="px-4 py-3 text-slate-700">{r.md}</td>
              <td className="px-4 py-3 text-slate-700">{r.crna}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[11px] text-slate-400 px-4 py-3 border-t border-slate-100">
        RoundsAhead presents the trade-offs; it doesn't tell you which to choose. See each pathway's sources for details.
      </p>
    </div>
  );
};
