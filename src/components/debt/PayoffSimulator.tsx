import { useState, useMemo } from 'react';
import { Debt } from '@/types/financial';
import { useDebtPayoff } from '@/lib/hooks/useDebtPayoff';
import { DebtList } from './DebtList';
import { DollarSign, Zap } from 'lucide-react';

interface PayoffSimulatorProps {
  debts: Debt[];
  currentBalance: number;
}

export function PayoffSimulator({ debts, currentBalance }: PayoffSimulatorProps) {
  const [lumpSum, setLumpSum] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);

  const payoffResult = useDebtPayoff({
    debts,
    availableLumpSum: lumpSum,
  });

  const monthlyMinPayment = useMemo(() => {
    return debts.reduce((sum, d) => sum + d.minPayment, 0);
  }, [debts]);

  const timelineMonths = useMemo(() => {
    if (lumpSum === 0) {
      // Calculate based on min payments
      const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
      let months = 0;
      let remaining = totalDebt;

      while (remaining > 0 && months < 600) {
        remaining -= monthlyMinPayment;
        months++;
      }
      return Math.max(months, 0);
    }
    return payoffResult.debtsEliminated > 0 ? 12 : 24;
  }, [lumpSum, debts, payoffResult.debtsEliminated, monthlyMinPayment]);

  const handleSimulate = () => {
    if (lumpSum > 0 && lumpSum <= currentBalance) {
      setShowResults(true);
    }
  };

  const totalCurrentDebt = debts.reduce((sum, d) => sum + d.balance, 0);
  const canAfford = lumpSum > 0 && lumpSum <= currentBalance;

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="font-semibold text-slate-900 mb-4">What if you paid off debt today?</h3>

        <div className="space-y-4">
          {/* Current Balance Info */}
          <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
            <p className="text-sm text-slate-600 mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-slate-900">${currentBalance.toFixed(2)}</p>
          </div>

          {/* Lump Sum Input */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Lump Sum Amount
            </label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="number"
                  min="0"
                  max={currentBalance}
                  value={lumpSum}
                  onChange={(e) => {
                    setLumpSum(Math.max(0, parseFloat(e.target.value) || 0));
                    setShowResults(false);
                  }}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <button
                onClick={handleSimulate}
                disabled={!canAfford}
                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  canAfford
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                    : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Zap className="h-4 w-4" />
                Simulate
              </button>
            </div>
            {lumpSum > currentBalance && (
              <p className="text-sm text-red-600 mt-2">Amount exceeds available balance</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              { label: 'Min Payment', value: monthlyMinPayment },
              { label: '25% Balance', value: totalCurrentDebt * 0.25 },
              { label: '50% Balance', value: totalCurrentDebt * 0.5 },
            ].map(({ label, value }) => (
              <button
                key={label}
                onClick={() => {
                  const amount = Math.min(value, currentBalance);
                  setLumpSum(amount);
                  setShowResults(false);
                }}
                className="px-3 py-2 rounded-lg text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && lumpSum > 0 && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6">
          <h3 className="font-semibold text-emerald-900 mb-4">Payoff Strategy Results</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="rounded-lg bg-white p-4 border border-emerald-200">
              <p className="text-sm text-emerald-700 mb-1">Debts Eliminated</p>
              <p className="text-2xl font-bold text-emerald-900">{payoffResult.debtsEliminated}</p>
            </div>
            <div className="rounded-lg bg-white p-4 border border-emerald-200">
              <p className="text-sm text-emerald-700 mb-1">Remaining Debts</p>
              <p className="text-2xl font-bold text-emerald-900">{payoffResult.remainingDebts.length}</p>
            </div>
            <div className="rounded-lg bg-white p-4 border border-emerald-200">
              <p className="text-sm text-emerald-700 mb-1">Interest Saved</p>
              <p className="text-2xl font-bold text-emerald-900">
                ${payoffResult.totalInterestSaved.toFixed(0)}
              </p>
            </div>
            <div className="rounded-lg bg-white p-4 border border-emerald-200">
              <p className="text-sm text-emerald-700 mb-1">Timeline</p>
              <p className="text-2xl font-bold text-emerald-900">~{timelineMonths}mo</p>
            </div>
          </div>

          {payoffResult.debtsEliminated > 0 && (
            <div className="rounded-lg bg-white p-4 border border-emerald-200 mb-4">
              <p className="text-sm text-slate-700 mb-2 font-medium">After payoff with ${lumpSum.toFixed(2)}:</p>
              <ul className="text-sm space-y-1">
                {payoffResult.updatedDebts.slice(0, 3).map((d) => (
                  <li key={d.id} className="text-slate-600">
                    • {d.name}: ${d.balance.toFixed(2)} @ {(d.rate * 100).toFixed(1)}%
                  </li>
                ))}
                {payoffResult.updatedDebts.length > 3 && (
                  <li className="text-slate-600">• +{payoffResult.updatedDebts.length - 3} more debts</li>
                )}
              </ul>
            </div>
          )}

          <p className="text-sm text-emerald-700">
            ✓ This strategy prioritizes paying off smallest debts first (Snowball Method)
          </p>
        </div>
      )}

      {/* Current Debt List */}
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Current Debt Breakdown</h3>
        <DebtList debts={debts} showPaidOff={false} />
      </div>
    </div>
  );
}
