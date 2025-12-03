'use client';

import { PayoffSimulator } from '@/components/debt';
import { Debt } from '@/types/financial';

// Demo data
const DEMO_DEBTS: Debt[] = [
  {
    id: '1',
    userId: 'demo-user',
    name: 'Credit Card (Visa)',
    balance: 3500,
    rate: 0.22,
    minPayment: 100,
    createdAt: new Date(),
  },
  {
    id: '2',
    userId: 'demo-user',
    name: 'Student Loan',
    balance: 15000,
    rate: 0.05,
    minPayment: 200,
    createdAt: new Date(),
  },
  {
    id: '3',
    userId: 'demo-user',
    name: 'Personal Loan',
    balance: 5200,
    rate: 0.12,
    minPayment: 150,
    createdAt: new Date(),
  },
];

export default function DebtPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Debt Strategy</h1>
        <p className="text-slate-500 mt-2">
          Eliminate debt using the Snowball Method - pay off smallest debts first
        </p>
      </div>

      <PayoffSimulator debts={DEMO_DEBTS} currentBalance={5200} />
    </div>
  );
}
