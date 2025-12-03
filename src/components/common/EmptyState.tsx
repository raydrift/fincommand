'use client';

import { InboxIcon, AlertCircle, TrendingUp } from 'lucide-react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-12 text-center">
      <div className="flex justify-center mb-4">
        {icon || <InboxIcon className="h-12 w-12 text-slate-400" />}
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

export function EmptyDashboard() {
  return (
    <EmptyState
      icon={<AlertCircle className="h-12 w-12 text-slate-400" />}
      title="No Data Available"
      description="Set up your financial profile to see your dashboard, cash flow calendar, and get personalized advice."
      action={{
        label: 'Start Setup',
        onClick: () => window.location.href = '/onboarding',
      }}
    />
  );
}

export function EmptyCalendar() {
  return (
    <EmptyState
      icon={<InboxIcon className="h-12 w-12 text-slate-400" />}
      title="No Transactions"
      description="Add recurring transactions to see your 31-day cash flow calendar and identify potential shortfalls."
      action={{
        label: 'Add Transactions',
        onClick: () => window.location.href = '/onboarding',
      }}
    />
  );
}

export function EmptyDebt() {
  return (
    <EmptyState
      icon={<TrendingUp className="h-12 w-12 text-emerald-600" />}
      title="No Debt"
      description="Great news! You don't have any debt. Focus on building wealth and emergency savings."
    />
  );
}

export function EmptyAdvisor() {
  return (
    <EmptyState
      icon={<AlertCircle className="h-12 w-12 text-slate-400" />}
      title="Advisor Data Unavailable"
      description="Set up your financial profile to receive personalized financial advice and wealth projections."
      action={{
        label: 'Complete Setup',
        onClick: () => window.location.href = '/onboarding',
      }}
    />
  );
}
