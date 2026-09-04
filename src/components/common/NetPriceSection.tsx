import React, { useEffect, useState } from 'react';
import { Wallet, ExternalLink, Loader2 } from 'lucide-react';
import { getScorecardEnabled, lookupFinancials, getFinancialsByUnitId, Financials } from '../../api/scorecard';

const BANDS: { key: keyof Financials['netPriceByIncome']; label: string }[] = [
  { key: 'band0_30k', label: '$0–30k' },
  { key: 'band30_48k', label: '$30–48k' },
  { key: 'band48_75k', label: '$48–75k' },
  { key: 'band75_110k', label: '$75–110k' },
  { key: 'band110k_plus', label: '$110k+' },
];

const usd = (n: number | null) =>
  n == null ? '—' : n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
const pct = (n: number | null) => (n == null ? '—' : `${Math.round(n * 100)}%`);

// Fetches and displays College Scorecard net-price-by-income for a college.
export const NetPriceSection: React.FC<{ collegeName: string; state?: string; unitId?: number }> = ({ collegeName, state, unitId }) => {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [fin, setFin] = useState<Financials | null>(null);
  const [band, setBand] = useState<string>('all');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const on = await getScorecardEnabled();
      if (cancelled) return;
      setEnabled(on);
      if (!on) return;
      setLoading(true);
      // Exact UNITID (curated + Scorecard-discovered colleges) hits the right
      // school directly; otherwise fall back to a name+state lookup.
      const data = unitId ? await getFinancialsByUnitId(unitId) : await lookupFinancials(collegeName, state);
      if (cancelled) return;
      setFin(data);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, [collegeName, state, unitId]);

  // Don't render the section at all if the integration isn't configured.
  if (enabled === false) return null;

  return (
    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100">
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-xs font-bold text-emerald-900 flex items-center gap-2">
          <Wallet className="w-4 h-4 text-emerald-700" />
          What families actually pay — net price by income
        </h4>
        {loading && <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />}
      </div>

      {!loading && !fin && enabled && (
        <p className="text-xs text-emerald-800/70 mt-2">
          Net-price data isn't available for this college in the federal College Scorecard.
        </p>
      )}

      {fin && (
        <div className="mt-3">
          <p className="text-[11px] text-emerald-800/80 mb-2">
            Net price is the yearly cost after grants and scholarships — what a typical{' '}
            {fin.ownership === 'public' ? 'in-state ' : ''}family pays, by household income. Not sticker price.
          </p>

          {/* Income selector */}
          <label className="flex items-center gap-2 text-[11px] font-semibold text-emerald-900 mb-2">
            Your household income:
            <select
              value={band}
              onChange={(e) => setBand(e.target.value)}
              className="text-[11px] font-semibold rounded-md border border-emerald-200 bg-white px-1.5 py-1"
            >
              <option value="all">Show all</option>
              {BANDS.map((b) => (
                <option key={b.key} value={b.key}>{b.label}</option>
              ))}
            </select>
          </label>

          {/* Band cards */}
          <div className="grid grid-cols-5 gap-1.5">
            {BANDS.map((b) => {
              const value = fin.netPriceByIncome[b.key];
              const active = band === b.key;
              return (
                <div
                  key={b.key}
                  className={`rounded-lg p-2 text-center border ${
                    active ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white border-emerald-100 text-emerald-900'
                  }`}
                >
                  <div className={`text-[9px] font-bold ${active ? 'text-emerald-100' : 'text-emerald-500'}`}>{b.label}</div>
                  <div className="text-[11px] font-black tabular-nums">{usd(value)}</div>
                </div>
              );
            })}
          </div>

          {/* Outcome stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
            <Stat label="Sticker (COA)" value={usd(fin.costOfAttendance)} />
            <Stat label="Admit rate" value={pct(fin.admissionRate)} />
            <Stat label="Median debt" value={usd(fin.medianDebt)} />
            <Stat label="Earnings (10 yr)" value={usd(fin.earnings10yr)} />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
            {fin.netPriceCalculatorUrl && (
              <a
                href={/^https?:\/\//.test(fin.netPriceCalculatorUrl) ? fin.netPriceCalculatorUrl : `https://${fin.netPriceCalculatorUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" /> Run this school's official Net Price Calculator
              </a>
            )}
          </div>

          <p className="text-[10px] text-emerald-800/60 mt-2">
            Source: {fin.source} · {fin.vintage}. Figures are averages that change yearly and don't reflect your
            specific award — use the school's calculator and financial-aid office for your family's estimate.
          </p>
        </div>
      )}
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="bg-white rounded-lg border border-emerald-100 p-2 text-center">
    <div className="text-[9px] font-bold uppercase tracking-wide text-emerald-500">{label}</div>
    <div className="text-xs font-black text-emerald-900 tabular-nums">{value}</div>
  </div>
);
