'use client';

import { useMemo, useState } from 'react';
import { Debt } from '@/types/financial';
import { useFinancialMetrics } from '@/lib/hooks/useFinancialMetrics';
import { GuaranteedReturnCard } from './GuaranteedReturnCard';
import { CompoundGrowthCard } from './CompoundGrowthCard';
import { AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface AdvisorContainerProps {
  debts: Debt[];
  currentBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  safetyBuffer: number;
}

export function AdvisorContainer({
  debts,
  currentBalance,
  monthlyIncome,
  monthlyExpenses,
  safetyBuffer,
}: AdvisorContainerProps) {
  const [showDetails, setShowDetails] = useState(false);

  const metrics = useFinancialMetrics({
    currentBalance,
    monthlyIncome,
    monthlyExpenses,
    debts,
    safetyBuffer,
  });

  const hasDebt = useMemo(() => debts.length > 0 && debts.some((d) => d.balance > 0), [debts]);
  const totalDebt = useMemo(() => debts.reduce((sum, d) => sum + d.balance, 0), [debts]);

  if (hasDebt) {
    // Debt Elimination Mode
    return (
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-red-600" />
            Priority: Eliminate Debt
          </h2>
          <p className="text-slate-600 mt-2">
            Your first move is to become debt-free. This will unlock the fastest path to wealth.
          </p>
        </div>

        {/* Current Situation */}
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Your Current Situation</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-slate-600 mb-1">Total Debt</p>
              <p className="text-2xl font-bold text-red-600">${totalDebt.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Monthly Interest</p>
              <p className="text-2xl font-bold text-red-600">${metrics.monthlyInterestPaid.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Discretionary Income</p>
              <p className="text-2xl font-bold text-slate-900">${metrics.monthlyDiscretionary.toFixed(0)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600 mb-1">Debt-Free Target</p>
              <p className="text-2xl font-bold text-emerald-600">{metrics.debtFreeDate}</p>
            </div>
          </div>
        </div>

        {/* Guaranteed Return (Interest Savings) */}
        <GuaranteedReturnCard
          interestSaved={metrics.interestSavedIn12Months}
          timeframe="next 12 months"
        />

        {/* Debt Elimination Strategy */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
          <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Your Elimination Strategy
          </h3>

          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4 border border-amber-200">
              <p className="text-sm font-medium text-slate-900 mb-2">Step 1: Snowball Method</p>
              <p className="text-sm text-slate-600">
                Pay minimums on all debts, then attack the smallest balance first. Once paid off, roll that payment to the next debt.
              </p>
            </div>

            <div className="rounded-lg bg-white p-4 border border-amber-200">
              <p className="text-sm font-medium text-slate-900 mb-2">Step 2: Allocate Extra Payment</p>
              <p className="text-sm text-slate-600">
                Use your ${metrics.monthlyDiscretionary.toFixed(0)} monthly discretionary income to accelerate payoff. Every extra dollar counts.
              </p>
            </div>

            <div className="rounded-lg bg-white p-4 border border-amber-200">
              <p className="text-sm font-medium text-slate-900 mb-2">Step 3: Stay Consistent</p>
              <p className="text-sm text-slate-600">
                Stick to your plan. You&apos;ll save ${metrics.interestSavedIn12Months.toFixed(0)} in interest over the next year alone.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="font-semibold text-emerald-900 mb-3">Next Step</h3>
          <p className="text-sm text-emerald-700 mb-4">
            Head to your Debt Strategy page to see your personalized payoff plan and simulate scenarios with lump sum payments.
          </p>
          <a
            href="/debt"
            className="inline-block px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors"
          >
            View Debt Strategy →
          </a>
        </div>
      </div>
    );
  }

  // Wealth Building Mode (Debt-Free)
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-emerald-600" />
          Congratulations! You&apos;re Debt-Free
        </h2>
        <p className="text-slate-600 mt-2">
          Now it&apos;s time to build wealth through smart investing and savings.
        </p>
      </div>

      {/* Financial Health Summary */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Your Financial Health</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-slate-600 mb-1">Current Balance</p>
            <p className="text-2xl font-bold text-slate-900">${currentBalance.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Monthly Surplus</p>
            <p className="text-2xl font-bold text-emerald-600">${metrics.monthlyDiscretionary.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Emergency Fund Goal</p>
            <p className="text-2xl font-bold text-slate-900">${metrics.emergencyFundGoal.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-sm text-slate-600 mb-1">Progress</p>
            <p className="text-2xl font-bold text-emerald-600">
              {((metrics.emergencyFundProgress / metrics.emergencyFundGoal) * 100).toFixed(0)}%
            </p>
          </div>
        </div>
      </div>

      {/* Compound Growth Projection */}
      <CompoundGrowthCard
        wealthAt5Years={metrics.wealthAt5Years}
        currentBalance={currentBalance}
        timeframe="5 years"
      />

      {/* Wealth Building Strategy */}
      <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-6">
        <h3 className="font-semibold text-indigo-900 mb-4 flex items-center gap-2">
          <ArrowRight className="h-5 w-5" />
          Your Wealth Building Strategy
        </h3>

        <div className="space-y-4">
          <div className="rounded-lg bg-white p-4 border border-indigo-200">
            <p className="text-sm font-medium text-slate-900 mb-2">Step 1: Build Emergency Fund</p>
            <p className="text-sm text-slate-600">
              Your goal is ${metrics.emergencyFundGoal.toFixed(0)} (6 months of expenses). You&apos;re currently at ${metrics.emergencyFundProgress.toFixed(0)}.
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 border border-indigo-200">
            <p className="text-sm font-medium text-slate-900 mb-2">Step 2: Max Retirement Accounts</p>
            <p className="text-sm text-slate-600">
              With ${metrics.monthlyDiscretionary.toFixed(0)}/month available, prioritize tax-advantaged accounts (401k, IRA, HSA).
            </p>
          </div>

          <div className="rounded-lg bg-white p-4 border border-indigo-200">
            <p className="text-sm font-medium text-slate-900 mb-2">Step 3: Invest for the Long Term</p>
            <p className="text-sm text-slate-600">
              At a conservative 6% annual return, your ${metrics.monthlyDiscretionary.toFixed(0)}/month could grow to ${metrics.wealthAt5Years.toFixed(0)} in 5 years.
            </p>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
          <p className="text-sm font-semibold text-emerald-900 mb-2">💡 Monthly Savings Potential</p>
          <p className="text-xs text-emerald-700">
            Every month you can allocate ${metrics.monthlyDiscretionary.toFixed(0)} toward investments and emergency fund building.
          </p>
        </div>
        <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-200">
          <p className="text-sm font-semibold text-indigo-900 mb-2">🚀 5-Year Vision</p>
          <p className="text-xs text-indigo-700">
            At this rate, you could accumulate ${metrics.wealthAt5Years.toFixed(0)} in net worth within 5 years.
          </p>
        </div>
      </div>

      {/* Details Toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full py-3 px-4 text-sm font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
      >
        {showDetails ? 'Hide' : 'Show'} Detailed Calculations
      </button>

      {showDetails && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Detailed Metrics</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="text-slate-600 mb-1">Current Balance</p>
              <p className="font-semibold text-slate-900 mb-4">${currentBalance.toFixed(2)}</p>

              <p className="text-slate-600 mb-1">Monthly Income</p>
              <p className="font-semibold text-slate-900 mb-4">${monthlyIncome.toFixed(2)}</p>

              <p className="text-slate-600 mb-1">Monthly Expenses</p>
              <p className="font-semibold text-slate-900 mb-4">${monthlyExpenses.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-slate-600 mb-1">Monthly Discretionary</p>
              <p className="font-semibold text-emerald-600 mb-4">${metrics.monthlyDiscretionary.toFixed(2)}</p>

              <p className="text-slate-600 mb-1">Emergency Fund Goal</p>
              <p className="font-semibold text-slate-900 mb-4">${metrics.emergencyFundGoal.toFixed(2)}</p>

              <p className="text-slate-600 mb-1">Wealth at 5 Years (6% return)</p>
              <p className="font-semibold text-indigo-600">${metrics.wealthAt5Years.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
