import { Debt } from '@/types/financial';
import { DebtCard } from './DebtCard';
import { sortDebtsBySnowball } from '@/lib/utils/calculations';

interface DebtListProps {
  debts: Debt[];
  paidOffDebts?: Debt[];
  showPaidOff?: boolean;
}

export function DebtList({ debts, paidOffDebts = [], showPaidOff = true }: DebtListProps) {
  const sortedDebts = sortDebtsBySnowball(debts);
  const totalBalance = debts.reduce((sum, d) => sum + d.balance, 0);

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Total Debt</p>
          <p className="text-2xl font-bold text-slate-900">${totalBalance.toFixed(2)}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
          <p className="text-sm text-slate-600 mb-1">Debts</p>
          <p className="text-2xl font-bold text-slate-900">{debts.length}</p>
        </div>
        {paidOffDebts.length > 0 && (
          <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
            <p className="text-sm text-emerald-700 mb-1">Paid Off</p>
            <p className="text-2xl font-bold text-emerald-700">{paidOffDebts.length}</p>
          </div>
        )}
      </div>

      {/* Active Debts */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">
          Snowball Strategy {sortedDebts.length > 0 && `(${sortedDebts.length})`}
        </h3>
        {sortedDebts.length > 0 ? (
          <div className="space-y-4">
            {sortedDebts.map((debt) => (
              <DebtCard key={debt.id} debt={debt} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">No active debts. Great job! 🎉</p>
          </div>
        )}
      </div>

      {/* Paid Off Debts */}
      {showPaidOff && paidOffDebts.length > 0 && (
        <div>
          <h3 className="font-semibold text-slate-900 mb-4">Paid Off ({paidOffDebts.length})</h3>
          <div className="space-y-4">
            {paidOffDebts.map((debt) => (
              <DebtCard key={debt.id} debt={debt} isPaidOff />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
