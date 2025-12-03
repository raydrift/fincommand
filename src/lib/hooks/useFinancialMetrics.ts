'use client';

import { useMemo } from 'react';
import type { Debt } from '@/types/financial';
import {
  calculateMonthlyInterest,
  calculateInterestSaved,
  calculateCompoundGrowth,
} from '@/lib/utils/calculations';
import { EMERGENCY_FUND_MONTHS, DEFAULT_INTEREST_RATE } from '@/lib/constants/defaults';

interface UseFinancialMetricsInput {
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  debts: Debt[];
  safetyBuffer: number;
}

interface FinancialMetrics {
  monthlyInterestPaid: number;
  totalDebt: number;
  debtFreeDate: string | null;
  emergencyFundGoal: number;
  emergencyFundProgress: number;
  monthlyDiscretionary: number;
  interestSavedIn12Months: number;
  wealthAt5Years: number;
}

/**
 * Calculate comprehensive financial metrics for advisor
 */
export const useFinancialMetrics = ({
  currentBalance,
  monthlyIncome,
  monthlyExpenses,
  debts,
  safetyBuffer,
}: UseFinancialMetricsInput): FinancialMetrics => {
  return useMemo(() => {
    // Calculate total debt and monthly interest
    const totalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const monthlyInterestPaid = debts.reduce(
      (sum, debt) => sum + calculateMonthlyInterest(debt.balance, debt.rate),
      0
    );

    // Emergency fund goal: 6 months of expenses
    const emergencyFundGoal = monthlyExpenses * EMERGENCY_FUND_MONTHS;
    const emergencyFundProgress = Math.min(
      currentBalance - safetyBuffer,
      emergencyFundGoal
    );

    // Monthly discretionary: Income - Expenses - Min Debt Payments
    const monthlyMinDebtPayments = debts.reduce(
      (sum, debt) => sum + debt.minPayment,
      0
    );
    const monthlyDiscretionary = Math.max(
      0,
      monthlyIncome - monthlyExpenses - monthlyMinDebtPayments
    );

    // Interest saved if paying aggressively in 12 months
    const interestSavedIn12Months = debts.reduce(
      (sum, debt) => sum + calculateInterestSaved(debt.balance, debt.rate, 12),
      0
    );

    // Projected wealth at 5 years (invested at DEFAULT_INTEREST_RATE)
    const availableToInvest = monthlyDiscretionary; // Monthly surplus
    const wealthAt5Years = calculateCompoundGrowth(
      currentBalance + availableToInvest * 60, // 5 years * 12 months
      DEFAULT_INTEREST_RATE,
      5
    );

    // Estimate debt-free date (simplified: assuming minimum payments)
    let debtFreeDate: string | null = null;
    if (totalDebt > 0 && monthlyMinDebtPayments > 0) {
      const monthsToPayOff = Math.ceil(totalDebt / monthlyMinDebtPayments);
      const futureDate = new Date();
      futureDate.setMonth(futureDate.getMonth() + monthsToPayOff);
      debtFreeDate = futureDate.toLocaleDateString();
    }

    return {
      monthlyInterestPaid: Math.round(monthlyInterestPaid * 100) / 100,
      totalDebt: Math.round(totalDebt * 100) / 100,
      debtFreeDate,
      emergencyFundGoal: Math.round(emergencyFundGoal * 100) / 100,
      emergencyFundProgress: Math.round(emergencyFundProgress * 100) / 100,
      monthlyDiscretionary: Math.round(monthlyDiscretionary * 100) / 100,
      interestSavedIn12Months: Math.round(interestSavedIn12Months * 100) / 100,
      wealthAt5Years: Math.round(wealthAt5Years * 100) / 100,
    };
  }, [currentBalance, monthlyIncome, monthlyExpenses, debts, safetyBuffer]);
};
