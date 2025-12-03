import { Debt } from '@/types/financial';
import { TrendingUp, AlertCircle } from 'lucide-react';

interface DebtCardProps {
  debt: Debt;
  isPaidOff?: boolean;
}

export function DebtCard({ debt, isPaidOff = false }: DebtCardProps) {
  const monthlyInterest = (debt.balance * debt.rate) / 12;
  const monthsToPayoff = debt.balance > 0 ? Math.ceil(debt.balance / Math.max(debt.minPayment, 1)) : 0;

  return (
    <div
      className={`rounded-xl border p-5 transition-all ${
        isPaidOff
          ? 'bg-emerald-50 border-emerald-200 opacity-60'
          : 'bg-white border-slate-200 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-slate-900">{debt.name}</h3>
          {isPaidOff && <p className="text-sm text-emerald-700 font-medium">✓ Paid Off</p>}
        </div>
        {monthlyInterest > 10 && !isPaidOff && (
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 ml-2" />
        )}
      </div>

      <div className="space-y-3">
        {/* Balance */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Balance</span>
          <span className={`font-semibold ${isPaidOff ? 'text-emerald-700' : 'text-slate-900'}`}>
            ${isPaidOff ? '0.00' : debt.balance.toFixed(2)}
          </span>
        </div>

        {/* Interest Rate */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Interest Rate</span>
          <span className="font-medium text-slate-900">{(debt.rate * 100).toFixed(1)}%</span>
        </div>

        {/* Monthly Interest */}
        {!isPaidOff && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Monthly Interest</span>
            <span className={`font-medium ${monthlyInterest > 10 ? 'text-red-600' : 'text-slate-900'}`}>
              ${monthlyInterest.toFixed(2)}
            </span>
          </div>
        )}

        {/* Minimum Payment */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Min Payment</span>
          <span className="font-medium text-slate-900">${debt.minPayment.toFixed(2)}</span>
        </div>

        {/* Months to Payoff */}
        {!isPaidOff && debt.balance > 0 && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Months to Payoff</span>
            <span className="font-medium text-amber-700 flex items-center gap-1">
              <TrendingUp className="h-4 w-4" />
              {monthsToPayoff} mo
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
