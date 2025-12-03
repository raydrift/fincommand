'use client';

import { useMemo } from 'react';
import { addDays, startOfDay } from 'date-fns';
import type { CashFlowProjection, ProjectedBalance, RecurringTransaction } from '@/types/financial';
import { DEFAULT_PROJECTION_DAYS } from '@/lib/constants/defaults';

interface UseCashFlowProjectionInput {
  currentBalance: number;
  safetyBuffer: number;
  recurringTransactions: RecurringTransaction[];
  projectionDays?: number;
  startDate?: Date;
}

/**
 * Calculate 31-day cash flow projection
 * Returns daily balances, minimum balance point, and danger days
 */
export const useCashFlowProjection = ({
  currentBalance,
  safetyBuffer,
  recurringTransactions,
  projectionDays = DEFAULT_PROJECTION_DAYS,
  startDate = new Date(),
}: UseCashFlowProjectionInput): CashFlowProjection => {
  return useMemo(() => {
    const dailyBalances: ProjectedBalance[] = [];
    let runningBalance = currentBalance;
    let minBalance = currentBalance;
    let minBalanceDate = startOfDay(startDate);
    const dangerDays: number[] = [];

    for (let i = 0; i < projectionDays; i++) {
      const currentDate = startOfDay(addDays(startDate, i));
      const dayOfMonth = currentDate.getDate();

      // Apply all transactions for this day
      const transactionsForDay = recurringTransactions.filter(
        (t) => t.date === dayOfMonth
      );

      for (const transaction of transactionsForDay) {
        if (transaction.type === 'income') {
          runningBalance += transaction.amount;
        } else {
          runningBalance -= transaction.amount;
        }
      }

      // Check if this is below safety buffer (danger day)
      const isRedDay = runningBalance < safetyBuffer;
      if (isRedDay) {
        dangerDays.push(i);
      }

      // Track minimum balance
      if (runningBalance < minBalance) {
        minBalance = runningBalance;
        minBalanceDate = currentDate;
      }

      dailyBalances.push({
        date: currentDate,
        balance: Math.round(runningBalance * 100) / 100, // Round to 2 decimals
        isRedDay,
      });
    }

    return {
      dailyBalances,
      minBalance: Math.round(minBalance * 100) / 100,
      minBalanceDate,
      dangerDays,
    };
  }, [currentBalance, safetyBuffer, recurringTransactions, projectionDays, startDate]);
};
