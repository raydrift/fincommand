'use client';

import { useMemo } from 'react';
import type { Debt } from '@/types/financial';
import { sortDebtsBySnowball, calculateInterestSaved } from '@/lib/utils/calculations';

interface UseDebtPayoffInput {
  debts: Debt[];
  availableLumpSum: number;
  months?: number;
}

interface DebtPayoffResult {
  updatedDebts: Debt[];
  paidOffDebts: Debt[];
  remainingDebts: Debt[];
  totalInterestSaved: number;
  debtsEliminated: number;
}

/**
 * Calculate debt payoff using snowball method
 * Applies lump sum to smallest balance first
 */
export const useDebtPayoff = ({
  debts,
  availableLumpSum,
  months = 12,
}: UseDebtPayoffInput): DebtPayoffResult => {
  return useMemo(() => {
    if (debts.length === 0 || availableLumpSum <= 0) {
      return {
        updatedDebts: [],
        paidOffDebts: [],
        remainingDebts: [],
        totalInterestSaved: 0,
        debtsEliminated: 0,
      };
    }

    // Sort debts by smallest balance (snowball method)
    const sortedDebts = sortDebtsBySnowball(debts);
    const updatedDebts: Debt[] = [];
    const paidOffDebts: Debt[] = [];
    const remainingDebts: Debt[] = [];

    let remainingFunds = availableLumpSum;
    let totalInterestSaved = 0;

    for (const debt of sortedDebts) {
      let newBalance = debt.balance;
      let interestSaved = 0;

      // Apply lump sum if we have funds
      if (remainingFunds > 0) {
        const amountToApply = Math.min(remainingFunds, debt.balance);
        newBalance -= amountToApply;
        remainingFunds -= amountToApply;

        // Calculate interest saved on remaining balance
        if (newBalance > 0) {
          interestSaved = calculateInterestSaved(
            newBalance,
            debt.rate,
            months
          );
        }
      }

      totalInterestSaved += interestSaved;

      const updatedDebt: Debt = {
        ...debt,
        balance: Math.max(0, Math.round(newBalance * 100) / 100),
      };

      updatedDebts.push(updatedDebt);

      // Track paid off vs remaining
      if (updatedDebt.balance <= 0) {
        paidOffDebts.push(updatedDebt);
      } else {
        remainingDebts.push(updatedDebt);
      }
    }

    return {
      updatedDebts,
      paidOffDebts,
      remainingDebts,
      totalInterestSaved: Math.round(totalInterestSaved * 100) / 100,
      debtsEliminated: paidOffDebts.length,
    };
  }, [debts, availableLumpSum, months]);
};
