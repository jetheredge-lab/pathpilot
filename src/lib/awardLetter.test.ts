import { describe, it, expect } from 'vitest';
import {
  costOfAttendance,
  totalGiftAid,
  nonRenewableGiftAid,
  totalLoans,
  netCostThisYear,
  gapAfterSelfHelp,
  projectedFourYearNetCost,
  projectedFourYearBorrowing,
  hasLoans,
} from './awardLetter';
import { AwardLetter } from '../types';

function makeLetter(overrides: Partial<AwardLetter> = {}): AwardLetter {
  return {
    id: 'l1',
    collegeName: 'Test University',
    academicYear: '2027-2028',
    tuitionAndFees: 40000,
    housingAndMeals: 15000,
    booksAndSupplies: 1200,
    transportation: 800,
    personalExpenses: 2000,
    grants: [],
    workStudy: 0,
    loanSubsidized: 0,
    loanUnsubsidized: 0,
    loanParentPlus: 0,
    loanOther: 0,
    notes: '',
    ...overrides,
  };
}

describe('award letter math', () => {
  it('sums direct + indirect into cost of attendance', () => {
    // 40000+15000 direct + 1200+800+2000 indirect = 59000
    expect(costOfAttendance(makeLetter())).toBe(59000);
  });

  it('nets gift aid off the cost of attendance (loans do not reduce net cost)', () => {
    const a = makeLetter({
      grants: [
        { id: 'g1', name: 'Merit', amount: 20000, renewable: true, condition: '' },
        { id: 'g2', name: 'Pell', amount: 5000, renewable: true, condition: '' },
      ],
      loanUnsubsidized: 5500,
      workStudy: 2500,
    });
    expect(totalGiftAid(a)).toBe(25000);
    // Net cost ignores loans + work-study: 59000 - 25000
    expect(netCostThisYear(a)).toBe(34000);
  });

  it('tracks non-renewable gift aid separately', () => {
    const a = makeLetter({
      grants: [
        { id: 'g1', name: 'Renewable merit', amount: 10000, renewable: true, condition: '' },
        { id: 'g2', name: 'First-year grant', amount: 4000, renewable: false, condition: '' },
      ],
    });
    expect(totalGiftAid(a)).toBe(14000);
    expect(nonRenewableGiftAid(a)).toBe(4000);
  });

  it('sums all loan types and flags the presence of loans', () => {
    const a = makeLetter({ loanSubsidized: 3500, loanUnsubsidized: 2000, loanParentPlus: 10000, loanOther: 1000 });
    expect(totalLoans(a)).toBe(16500);
    expect(hasLoans(a)).toBe(true);
    expect(hasLoans(makeLetter())).toBe(false);
  });

  it('computes the gap remaining after self-help', () => {
    const a = makeLetter({
      grants: [{ id: 'g1', name: 'Merit', amount: 25000, renewable: true, condition: '' }],
      workStudy: 3000,
      loanUnsubsidized: 5500,
    });
    // net 34000 - 3000 work-study - 5500 loans = 25500 still unfunded
    expect(gapAfterSelfHelp(a)).toBe(25500);
  });

  it('projects four-year net cost and borrowing', () => {
    const a = makeLetter({
      grants: [{ id: 'g1', name: 'Merit', amount: 25000, renewable: true, condition: '' }],
      loanUnsubsidized: 5500,
    });
    expect(projectedFourYearNetCost(a)).toBe(34000 * 4);
    expect(projectedFourYearBorrowing(a)).toBe(5500 * 4);
  });
});
