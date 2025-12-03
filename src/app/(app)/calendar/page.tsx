'use client';

import { CashFlowCalendar } from '@/components/calendar';

// Demo data
const DEMO_TRANSACTIONS = [
  { id: '1', userId: 'demo', date: 5, amount: 3500, type: 'income' as const, label: 'Salary', isRecurring: true, createdAt: new Date() },
  { id: '2', userId: 'demo', date: 1, amount: 1200, type: 'expense' as const, label: 'Rent', isRecurring: true, createdAt: new Date() },
  { id: '3', userId: 'demo', date: 10, amount: 350, type: 'expense' as const, label: 'Utilities', isRecurring: true, createdAt: new Date() },
  { id: '4', userId: 'demo', date: 15, amount: 250, type: 'expense' as const, label: 'Insurance', isRecurring: true, createdAt: new Date() },
  { id: '5', userId: 'demo', date: 20, amount: 500, type: 'expense' as const, label: 'Groceries', isRecurring: true, createdAt: new Date() },
];

export default function CalendarPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Cash Flow Calendar</h1>
        <p className="text-slate-500 mt-2">31-day projection of your cash flow with danger zone indicators</p>
      </div>
      <CashFlowCalendar transactions={DEMO_TRANSACTIONS} />
    </div>
  );
}
