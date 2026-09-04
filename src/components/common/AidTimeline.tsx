import React from 'react';
import { Landmark, CalendarClock, ExternalLink, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

// The FAFSA uses "prior-prior-year" income: aid for an academic year that starts
// in year Y is based on the family's income from tax year Y-2. This view turns a
// student's graduation year into that base year and the still-open window — it
// INFORMS (states the mechanics); it does not advise how to arrange finances.
export const AidTimeline: React.FC = () => {
  const { profile } = useApp();
  const gradYear = profile.gradYear || new Date().getFullYear() + 1;

  const firstCollegeYear = gradYear; // enters college the fall after graduating
  const firstAcademicYear = `${firstCollegeYear}–${(firstCollegeYear + 1).toString().slice(2)}`;
  const baseYear = firstCollegeYear - 2; // prior-prior tax year
  const fafsaOpensYear = firstCollegeYear - 1; // FAFSA opens ~Oct 1 of senior-year fall

  const now = new Date();
  const baseYearEnd = new Date(baseYear, 11, 31, 23, 59, 59);
  const baseYearStart = new Date(baseYear, 0, 1);
  const daysUntilClose = Math.ceil((baseYearEnd.getTime() - now.getTime()) / 86_400_000);
  const windowStatus =
    now < baseYearStart ? 'upcoming' : now <= baseYearEnd ? 'open' : 'closed';

  return (
    <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
      <h3 className="text-sm font-black text-indigo-900 flex items-center gap-2">
        <Landmark className="w-4.5 h-4.5 text-indigo-700" />
        Financial-aid eligibility window (prior-prior year)
      </h3>
      <p className="text-xs text-indigo-800/80 mt-1">
        The FAFSA looks back <span className="font-bold">two years</span> for income. Knowing which year counts —
        early — is one of the most useful things to understand about paying for college.
      </p>

      {/* The headline mechanic */}
      <div className="mt-4 rounded-xl bg-white border border-indigo-100 p-4">
        <p className="text-sm text-slate-700">
          Your student's first FAFSA — for the{' '}
          <span className="font-bold text-slate-900">{firstAcademicYear} school year</span> — will be based on your
          family's income from the{' '}
          <span className="font-bold text-indigo-700">{baseYear} tax year</span>.
        </p>
        <p className="text-xs text-slate-500 mt-1.5">
          That FAFSA opens around <span className="font-semibold">October 1, {fafsaOpensYear}</span>.
        </p>

        <div className="mt-3">
          {windowStatus === 'open' && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5">
              <CalendarClock className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-emerald-800">
                This income year is happening now — about {daysUntilClose.toLocaleString()} days until it closes on Dec 31, {baseYear}.
              </span>
            </div>
          )}
          {windowStatus === 'upcoming' && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5">
              <CalendarClock className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-amber-800">
                The {baseYear} income year hasn't started yet — it begins Jan 1, {baseYear}.
              </span>
            </div>
          )}
          {windowStatus === 'closed' && (
            <div className="inline-flex items-center gap-2 rounded-lg bg-slate-100 border border-slate-200 px-3 py-1.5">
              <CalendarClock className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-bold text-slate-600">
                The {baseYear} income year has closed — the numbers for that first FAFSA are set.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* What the formula looks at */}
      <div className="mt-4 grid sm:grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl bg-white border border-indigo-100 p-3">
          <h4 className="font-bold text-slate-800 mb-1">What the formula generally counts</h4>
          <ul className="space-y-1 text-slate-600 list-disc pl-4">
            <li>Parent and student income from the base tax year</li>
            <li>Some assets — savings and investments held outside retirement accounts</li>
          </ul>
        </div>
        <div className="rounded-xl bg-white border border-indigo-100 p-3">
          <h4 className="font-bold text-slate-800 mb-1">What it generally excludes</h4>
          <ul className="space-y-1 text-slate-600 list-disc pl-4">
            <li>Retirement accounts (e.g., 401(k), IRA) and your primary home</li>
            <li>New for 2026–27: small family businesses (≤100 employees), family farms you live on, and family fishing businesses</li>
          </ul>
        </div>
      </div>

      <p className="text-[11px] text-indigo-800/70 mt-3">
        Each college year uses its own prior-prior year, so all four years have a base year. Aid also depends on the
        Student Aid Index (SAI); for 2026–27, an SAI of $14,790 or more means no federal Pell Grant.
      </p>

      {/* Inform, do not advise */}
      <div className="mt-4 flex items-start gap-2 rounded-xl bg-white border border-slate-200 p-3">
        <Info className="w-4 h-4 text-slate-400 flex-none mt-0.5" />
        <p className="text-[11px] text-slate-500">
          This is general information, not advice. RoundsAhead does not recommend how to time income, move assets, or
          structure accounts — that is tax and financial advice from a licensed professional. The rules change (they
          were updated for 2026–27), so confirm the current details at{' '}
          <a href="https://studentaid.gov" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:text-brand-700 inline-flex items-center gap-0.5">
            studentaid.gov <ExternalLink className="w-2.5 h-2.5" />
          </a>{' '}
          and talk to a financial-aid or tax professional about your situation.
        </p>
      </div>
    </div>
  );
};
