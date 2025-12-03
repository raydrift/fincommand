'use client';

import { AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { SafetyGauge, ImmediateActions, EmergencyFundTracker } from '@/components/dashboard';
import { useCashFlowProjection, useFinancialMetrics } from '@/lib/hooks';

// Demo data
const DEMO_TRANSACTIONS = [
  { id: '1', userId: 'demo', date: 5, amount: 3500, type: 'income' as const, label: 'Salary', isRecurring: true, createdAt: new Date() },
  { id: '2', userId: 'demo', date: 1, amount: 1200, type: 'expense' as const, label: 'Rent', isRecurring: true, createdAt: new Date() },
  { id: '3', userId: 'demo', date: 10, amount: 350, type: 'expense' as const, label: 'Utilities', isRecurring: true, createdAt: new Date() },
  { id: '4', userId: 'demo', date: 15, amount: 250, type: 'expense' as const, label: 'Insurance', isRecurring: true, createdAt: new Date() },
];

const DEMO_DEBTS = [
  { id: '1', userId: 'demo', name: 'Credit Card', balance: 3500, rate: 0.1899, minPayment: 100, createdAt: new Date() },
  { id: '2', userId: 'demo', name: 'Student Loan', balance: 12000, rate: 0.045, minPayment: 150, createdAt: new Date() },
];

export default function DashboardPage() {
  const currentBalance = 5200;
  const safetyBuffer = 1500;

  // Calculate projections
  const projection = useCashFlowProjection({
    currentBalance,
    safetyBuffer,
    recurringTransactions: DEMO_TRANSACTIONS,
  });

  // Calculate financial metrics
  const metrics = useFinancialMetrics({
    currentBalance,
    monthlyIncome: 3500,
    monthlyExpenses: 1800,
    debts: DEMO_DEBTS,
    safetyBuffer,
  });

  // Determine status
  const getStatus = () => {
    if (projection.minBalance < 0) return 'critical';
    if (projection.minBalance < safetyBuffer) return 'warning';
    return 'safe';
  };

  // Build immediate actions
  const actions = [];
  if (projection.minBalance < 0) {
    actions.push({
      id: 'fix-cashflow',
      label: 'Fix Cash Flow',
      description: 'Your balance will go negative. Review expenses or increase income.',
      priority: 'high' as const,
      icon: <AlertCircle className="h-5 w-5" />,
      action: () => console.log('Navigate to expense review'),
    });
  }
  if (metrics.totalDebt > 0) {
    actions.push({
      id: 'payoff-debt',
      label: 'Execute Payoff Strategy',
      description: `Save $${metrics.interestSavedIn12Months.toFixed(2)} in interest over 12 months.`,
      priority: 'medium' as const,
      icon: <TrendingUp className="h-5 w-5" />,
      action: () => console.log('Navigate to debt strategy'),
    });
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Welcome to FinCommand – Your Safety-First Financial Dashboard</p>
      </motion.div>

      {/* Safety Gauge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SafetyGauge
          minBalance={projection.minBalance}
          currentBalance={currentBalance}
          safetyBuffer={safetyBuffer}
          status={getStatus()}
        />
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Immediate Actions - Full Width on Mobile, 2 Cols on Desktop */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <ImmediateActions actions={actions} />
        </motion.div>

        {/* Emergency Fund - Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <EmergencyFundTracker
            current={Math.max(currentBalance - safetyBuffer, 0)}
            goal={metrics.emergencyFundGoal}
          />
        </motion.div>
      </div>

      {/* Metrics Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-2">
            Monthly Surplus
          </p>
          <p className="text-2xl font-bold text-emerald-600">
            ${metrics.monthlyDiscretionary.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-2">
            Total Debt
          </p>
          <p className="text-2xl font-bold text-slate-900">
            ${metrics.totalDebt.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-2">
            Interest Saved in 12mo
          </p>
          <p className="text-2xl font-bold text-amber-600">
            ${metrics.interestSavedIn12Months.toFixed(2)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-2">
            Debt-Free Target
          </p>
          <p className="text-2xl font-bold text-indigo-600">
            {metrics.debtFreeDate || 'N/A'}
          </p>
        </div>
      </motion.div>

      {/* Danger Days Info */}
      {projection.dangerDays.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-red-50 border border-red-200 rounded-xl p-5"
        >
          <h3 className="font-semibold text-red-900 mb-2">Danger Days Ahead</h3>
          <p className="text-sm text-red-800 mb-3">
            Your balance will drop below your safety buffer on {projection.dangerDays.length} days in the next 31 days.
          </p>
          <p className="text-sm text-red-700">
            Lowest point: <span className="font-bold">${projection.minBalance.toFixed(2)}</span> on{' '}
            <span className="font-bold">{projection.minBalanceDate.toLocaleDateString()}</span>
          </p>
        </motion.div>
      )}
    </div>
  );
}