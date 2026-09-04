import React, { useState } from 'react';
import { Plus, Trash2, Pencil, FileDown, Scale, AlertTriangle, X } from 'lucide-react';
import jsPDF from 'jspdf';
import { useApp } from '../../context/AppContext';
import { AwardLetter, AwardLetterGrant } from '../../types';
import { Modal } from '../common/Modal';
import {
  costOfAttendance,
  directCosts,
  indirectCosts,
  totalGiftAid,
  nonRenewableGiftAid,
  totalLoans,
  netCostThisYear,
  gapAfterSelfHelp,
  projectedFourYearNetCost,
  projectedFourYearBorrowing,
  hasLoans,
} from '../../lib/awardLetter';

const usd = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const MAX_OFFERS = 6;

function blankLetter(): AwardLetter {
  return {
    id: `award_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    collegeName: '',
    academicYear: '',
    tuitionAndFees: 0,
    housingAndMeals: 0,
    booksAndSupplies: 0,
    transportation: 0,
    personalExpenses: 0,
    grants: [],
    workStudy: 0,
    loanSubsidized: 0,
    loanUnsubsidized: 0,
    loanParentPlus: 0,
    loanOther: 0,
    notes: '',
  };
}

export const AwardLettersView: React.FC = () => {
  const { awardLetters, saveAwardLetter, deleteAwardLetter, finalFive, colleges } = useApp();
  const [editing, setEditing] = useState<AwardLetter | null>(null);
  const [isNew, setIsNew] = useState(false);

  const openNew = () => {
    setEditing(blankLetter());
    setIsNew(true);
  };
  const openEdit = (letter: AwardLetter) => {
    setEditing({ ...letter, grants: letter.grants.map((g) => ({ ...g })) });
    setIsNew(false);
  };

  // College names the family already tracks, to prefill the picker.
  const suggestedColleges = finalFive
    .map((f) => colleges.find((c) => c.id === f.collegeId))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const lowestNetCostId =
    awardLetters.length > 1
      ? awardLetters.reduce((min, l) => (netCostThisYear(l) < netCostThisYear(min) ? l : min)).id
      : null;

  const exportPdf = () => {
    const doc = new jsPDF();
    let y = 16;
    doc.setFontSize(16);
    doc.text('RoundsAhead — Award Letter Comparison', 14, y);
    y += 7;
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text('Net cost = cost of attendance minus gift aid (grants/scholarships).', 14, y);
    y += 4;
    doc.text('Loans and work-study are ways to cover the net cost, not reductions of it.', 14, y);
    doc.setTextColor(0);
    y += 8;
    awardLetters.forEach((l) => {
      doc.setFontSize(12);
      doc.text(`${l.collegeName || 'Unnamed college'}${l.academicYear ? ` (${l.academicYear})` : ''}`, 14, y);
      y += 6;
      doc.setFontSize(10);
      const lines = [
        `Cost of attendance:            ${usd(costOfAttendance(l))}`,
        `Gift aid (not repaid):         ${usd(totalGiftAid(l))}`,
        `NET COST THIS YEAR:            ${usd(netCostThisYear(l))}`,
        `Work-study (must be earned):   ${usd(l.workStudy)}`,
        `Loans (must be repaid):        ${usd(totalLoans(l))}`,
        `PROJECTED 4-YEAR BORROWING:    ${usd(projectedFourYearBorrowing(l))}`,
      ];
      lines.forEach((line) => {
        doc.text(line, 18, y);
        y += 5;
      });
      y += 4;
      if (y > 260) {
        doc.addPage();
        y = 16;
      }
    });
    doc.save('roundsahead-award-comparison.pdf');
  };

  // A row in the comparison table.
  const Row: React.FC<{
    label: string;
    render: (l: AwardLetter) => React.ReactNode;
    lead?: boolean;
    sub?: boolean;
  }> = ({ label, render, lead, sub }) => (
    <tr className={lead ? 'bg-brand-50/60' : ''}>
      <th
        className={`sticky left-0 z-10 text-left px-4 py-2.5 font-semibold whitespace-nowrap ${
          lead ? 'bg-brand-50 text-slate-900' : sub ? 'bg-white text-slate-500 pl-6 font-medium' : 'bg-white text-slate-700'
        }`}
      >
        {label}
      </th>
      {awardLetters.map((l) => (
        <td key={l.id} className={`px-4 py-2.5 text-right tabular-nums ${lead ? 'font-bold text-slate-900' : 'text-slate-700'}`}>
          {render(l)}
        </td>
      ))}
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <Scale className="w-6 h-6 text-brand-600" />
            Award Letter Comparison
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Enter each financial-aid offer to compare the real cost side by side. All figures are annual.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {awardLetters.length > 0 && (
            <button
              onClick={exportPdf}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <FileDown className="w-4 h-4" /> Export PDF
            </button>
          )}
          <button
            onClick={openNew}
            disabled={awardLetters.length >= MAX_OFFERS}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 disabled:opacity-50"
          >
            <Plus className="w-4 h-4" /> Add an offer
          </button>
        </div>
      </div>

      {/* Decision-day banner */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <div className="text-2xl font-black text-amber-600">May 1</div>
        <div className="text-sm text-amber-800">
          <span className="font-bold">National College Decision Day.</span> Most schools require your enrollment
          deposit by May 1 — compare the full four-year picture before you commit.
        </div>
      </div>

      {awardLetters.length === 0 ? (
        <div className="text-center py-16 border-2 border-dashed border-slate-200 rounded-2xl">
          <Scale className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-slate-700">No offers yet</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Add each college's financial-aid award letter and we'll normalize them to the same shape — so you can
            see what each one actually costs, and what's a grant versus a loan.
          </p>
          <button onClick={openNew} className="text-sm font-semibold px-4 py-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700">
            Add your first offer
          </button>
        </div>
      ) : (
        <>
          {/* Comparison table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full text-sm border-collapse">
              <thead>
                <tr>
                  <th className="sticky left-0 z-10 bg-slate-50 px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-400">
                    Offer
                  </th>
                  {awardLetters.map((l) => (
                    <th key={l.id} className="px-4 py-3 text-right min-w-[160px]">
                      <div className="flex items-start justify-end gap-1.5">
                        <div>
                          <div className="font-bold text-slate-900">{l.collegeName || 'Unnamed'}</div>
                          {l.academicYear && <div className="text-[11px] text-slate-400 font-normal">{l.academicYear}</div>}
                          {l.id === lowestNetCostId && (
                            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-wide mt-0.5">
                              Lowest net cost
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <button onClick={() => openEdit(l)} className="text-slate-400 hover:text-brand-600" title="Edit">
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => { if (window.confirm(`Remove the ${l.collegeName || 'this'} offer?`)) deleteAwardLetter(l.id); }}
                            className="text-slate-400 hover:text-rose-600"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <Row label="Direct costs (billed)" render={(l) => usd(directCosts(l))} sub />
                <Row label="Indirect costs (estimated)" render={(l) => usd(indirectCosts(l))} sub />
                <Row label="Cost of attendance" render={(l) => usd(costOfAttendance(l))} />
                <Row label="Gift aid (grants/scholarships)" render={(l) => `– ${usd(totalGiftAid(l))}`} />
                <Row label="Net cost this year" render={(l) => usd(netCostThisYear(l))} lead />
                <Row label="Work-study (must be earned)" render={(l) => usd(l.workStudy)} sub />
                <Row
                  label="Loans (must be repaid)"
                  render={(l) =>
                    hasLoans(l) ? (
                      <span className="text-rose-600 font-semibold">{usd(totalLoans(l))}</span>
                    ) : (
                      usd(0)
                    )
                  }
                />
                <Row label="Projected 4-year net cost" render={(l) => usd(projectedFourYearNetCost(l))} />
                <Row label="Projected 4-year borrowing" render={(l) => usd(projectedFourYearBorrowing(l))} lead />
              </tbody>
            </table>
          </div>

          {/* Honesty callouts */}
          <div className="grid gap-3 sm:grid-cols-2">
            {awardLetters.some(hasLoans) && (
              <div className="flex gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
                <AlertTriangle className="w-5 h-5 text-rose-500 flex-none mt-0.5" />
                <p className="text-xs text-rose-800">
                  <span className="font-bold">Some offers include loans.</span> Loans are often listed alongside grants
                  as "aid," but they are borrowed money you repay with interest — not a discount. We keep them separate
                  above and in the 4-year borrowing total.
                </p>
              </div>
            )}
            {awardLetters.some((l) => nonRenewableGiftAid(l) > 0) && (
              <div className="flex gap-2.5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                <AlertTriangle className="w-5 h-5 text-amber-500 flex-none mt-0.5" />
                <p className="text-xs text-amber-800">
                  <span className="font-bold">Some grants don't renew.</span>{' '}
                  {awardLetters
                    .filter((l) => nonRenewableGiftAid(l) > 0)
                    .map((l) => `${l.collegeName || 'An offer'}: ${usd(nonRenewableGiftAid(l))}`)
                    .join(' · ')}{' '}
                  may not repeat after freshman year, which raises the cost in later years.
                </p>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-400">
            RoundsAhead shows you the numbers so you can decide. We don't recommend a school — the right choice depends
            on fit, outcomes, and your family's finances. For personalized advice, talk to each school's financial-aid
            office.
          </p>
        </>
      )}

      {editing && (
        <AwardLetterForm
          letter={editing}
          isNew={isNew}
          collegeSuggestions={suggestedColleges.map((c) => ({ id: c.id, name: c.name }))}
          onCancel={() => setEditing(null)}
          onSave={(l) => {
            saveAwardLetter(l);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
};

// ── Add / edit form ──────────────────────────────────────────────────
const AwardLetterForm: React.FC<{
  letter: AwardLetter;
  isNew: boolean;
  collegeSuggestions: { id: string; name: string }[];
  onCancel: () => void;
  onSave: (l: AwardLetter) => void;
}> = ({ letter, isNew, collegeSuggestions, onCancel, onSave }) => {
  const [draft, setDraft] = useState<AwardLetter>(letter);

  const num = (v: string) => Math.max(0, Math.round(Number(v) || 0));
  const set = (patch: Partial<AwardLetter>) => setDraft((d) => ({ ...d, ...patch }));

  const setGrant = (id: string, patch: Partial<AwardLetterGrant>) =>
    setDraft((d) => ({ ...d, grants: d.grants.map((g) => (g.id === id ? { ...g, ...patch } : g)) }));
  const addGrant = () =>
    setDraft((d) => ({
      ...d,
      grants: [...d.grants, { id: `g_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, name: '', amount: 0, renewable: true, condition: '' }],
    }));
  const removeGrant = (id: string) => setDraft((d) => ({ ...d, grants: d.grants.filter((g) => g.id !== id) }));

  const MoneyField: React.FC<{ label: string; value: number; onChange: (n: number) => void }> = ({ label, value, onChange }) => (
    <label className="block">
      <span className="block text-xs font-semibold text-slate-600 mb-1">{label}</span>
      <div className="relative">
        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">$</span>
        <input
          type="number"
          min={0}
          value={value || ''}
          onChange={(e) => onChange(num(e.target.value))}
          className="w-full pl-6 pr-2 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          placeholder="0"
        />
      </div>
    </label>
  );

  return (
    <Modal
      isOpen
      onClose={onCancel}
      title={isNew ? 'Add an award letter' : 'Edit award letter'}
      subtitle="Enter the amounts exactly as they appear on the letter. Annual figures."
    >
      <div className="space-y-5">
        {/* College + year */}
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="block text-xs font-semibold text-slate-600 mb-1">College</span>
            <input
              list="award-college-suggestions"
              value={draft.collegeName}
              onChange={(e) => set({ collegeName: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="e.g. University of Pittsburgh"
            />
            <datalist id="award-college-suggestions">
              {collegeSuggestions.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
          </label>
          <label className="block">
            <span className="block text-xs font-semibold text-slate-600 mb-1">Academic year</span>
            <input
              value={draft.academicYear}
              onChange={(e) => set({ academicYear: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
              placeholder="2027–2028"
            />
          </label>
        </div>

        {/* Costs */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Cost of attendance</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <MoneyField label="Tuition & fees" value={draft.tuitionAndFees} onChange={(n) => set({ tuitionAndFees: n })} />
            <MoneyField label="Housing & meals" value={draft.housingAndMeals} onChange={(n) => set({ housingAndMeals: n })} />
            <MoneyField label="Books & supplies" value={draft.booksAndSupplies} onChange={(n) => set({ booksAndSupplies: n })} />
            <MoneyField label="Transportation" value={draft.transportation} onChange={(n) => set({ transportation: n })} />
            <MoneyField label="Personal expenses" value={draft.personalExpenses} onChange={(n) => set({ personalExpenses: n })} />
          </div>
        </div>

        {/* Grants / scholarships */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Grants & scholarships (not repaid)</h4>
            <button onClick={addGrant} className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
          {draft.grants.length === 0 && <p className="text-xs text-slate-400">No grants added yet.</p>}
          <div className="space-y-2">
            {draft.grants.map((g) => (
              <div key={g.id} className="flex flex-wrap items-center gap-2 bg-slate-50 rounded-lg p-2 border border-slate-200">
                <input
                  value={g.name}
                  onChange={(e) => setGrant(g.id, { name: e.target.value })}
                  placeholder="Name (e.g. Merit Scholarship)"
                  className="flex-1 min-w-[140px] px-2 py-1.5 rounded border border-slate-300 text-xs"
                />
                <div className="relative">
                  <span className="absolute left-2 top-1/2 -translate-y-1/2 text-slate-400 text-xs">$</span>
                  <input
                    type="number"
                    min={0}
                    value={g.amount || ''}
                    onChange={(e) => setGrant(g.id, { amount: num(e.target.value) })}
                    placeholder="0"
                    className="w-24 pl-5 pr-1 py-1.5 rounded border border-slate-300 text-xs"
                  />
                </div>
                <label className="flex items-center gap-1 text-xs text-slate-600">
                  <input type="checkbox" checked={g.renewable} onChange={(e) => setGrant(g.id, { renewable: e.target.checked })} />
                  Renews yearly
                </label>
                <button onClick={() => removeGrant(g.id)} className="text-slate-400 hover:text-rose-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Self-help + loans */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">Work-study & loans</h4>
          <div className="grid sm:grid-cols-2 gap-3">
            <MoneyField label="Work-study (earned)" value={draft.workStudy} onChange={(n) => set({ workStudy: n })} />
            <MoneyField label="Subsidized loan" value={draft.loanSubsidized} onChange={(n) => set({ loanSubsidized: n })} />
            <MoneyField label="Unsubsidized loan" value={draft.loanUnsubsidized} onChange={(n) => set({ loanUnsubsidized: n })} />
            <MoneyField label="Parent PLUS loan" value={draft.loanParentPlus} onChange={(n) => set({ loanParentPlus: n })} />
            <MoneyField label="Other / private loan" value={draft.loanOther} onChange={(n) => set({ loanOther: n })} />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-4">
          <button onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            Cancel
          </button>
          <button
            onClick={() => onSave(draft)}
            className="px-4 py-2 text-sm font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700"
          >
            Save offer
          </button>
        </div>
      </div>
    </Modal>
  );
};
