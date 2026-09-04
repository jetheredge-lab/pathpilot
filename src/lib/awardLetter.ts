import { AwardLetter } from '../types';

// All calculations are pure functions of a single award letter (annual USD),
// so the money math can be unit-tested independently of the UI.

export function directCosts(a: AwardLetter): number {
  return a.tuitionAndFees + a.housingAndMeals;
}

export function indirectCosts(a: AwardLetter): number {
  return a.booksAndSupplies + a.transportation + a.personalExpenses;
}

export function costOfAttendance(a: AwardLetter): number {
  return directCosts(a) + indirectCosts(a);
}

// Gift aid — grants + scholarships, money that is never repaid.
export function totalGiftAid(a: AwardLetter): number {
  return a.grants.reduce((sum, g) => sum + (g.amount || 0), 0);
}

// Gift aid that does NOT renew after year one — the amount at risk of vanishing.
export function nonRenewableGiftAid(a: AwardLetter): number {
  return a.grants.filter((g) => !g.renewable).reduce((sum, g) => sum + (g.amount || 0), 0);
}

// Loans — money that must be repaid. Kept distinct from aid on purpose.
export function totalLoans(a: AwardLetter): number {
  return a.loanSubsidized + a.loanUnsubsidized + a.loanParentPlus + a.loanOther;
}

// The headline number: cost of attendance minus gift aid. This is what the
// family is actually responsible for — loans and work-study are ways to cover
// it, not reductions of it.
export function netCostThisYear(a: AwardLetter): number {
  return costOfAttendance(a) - totalGiftAid(a);
}

// What's still unfunded after applying self-help (work-study + loans). Negative
// means the package over-covers the cost.
export function gapAfterSelfHelp(a: AwardLetter): number {
  return netCostThisYear(a) - a.workStudy - totalLoans(a);
}

// Simple four-year projections. Year one is repeated; real costs rise and some
// aid doesn't renew, so the UI presents these as estimates with caveats.
export function projectedFourYearNetCost(a: AwardLetter): number {
  return netCostThisYear(a) * 4;
}

export function projectedFourYearBorrowing(a: AwardLetter): number {
  return totalLoans(a) * 4;
}

// True when the offer includes any loans — used to flag "loans presented as
// awards", the most common way award letters mislead families.
export function hasLoans(a: AwardLetter): boolean {
  return totalLoans(a) > 0;
}
