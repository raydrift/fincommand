import { TrendingUp, Sparkles } from 'lucide-react';

interface CompoundGrowthCardProps {
  wealthAt5Years: number;
  currentBalance: number;
  timeframe?: string;
}

export function CompoundGrowthCard({
  wealthAt5Years,
  currentBalance,
  timeframe = '5 years',
}: CompoundGrowthCardProps) {
  const growth = wealthAt5Years - currentBalance;
  const growthPercent = ((growth / currentBalance) * 100).toFixed(1);

  return (
    <div className="rounded-xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-indigo-900">Wealth Building</h3>
          <p className="text-sm text-indigo-700 mt-1">Through compound growth</p>
        </div>
        <div className="bg-indigo-600 rounded-lg p-3">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Main Value */}
        <div>
          <p className="text-sm text-indigo-700 mb-1">Projected Net Worth</p>
          <p className="text-4xl font-bold text-indigo-900">${wealthAt5Years.toFixed(0)}</p>
          <p className="text-xs text-indigo-600 mt-1">in {timeframe}</p>
        </div>

        {/* Growth Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-white bg-opacity-70 p-3 border border-indigo-200">
            <p className="text-xs text-indigo-600 mb-1">Starting Balance</p>
            <p className="font-semibold text-indigo-900">${currentBalance.toFixed(0)}</p>
          </div>
          <div className="rounded-lg bg-white bg-opacity-70 p-3 border border-indigo-200">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <p className="text-xs text-indigo-600">Growth</p>
            </div>
            <p className="font-semibold text-emerald-600">+{growthPercent}%</p>
          </div>
        </div>

        {/* Strategy Card */}
        <div className="rounded-lg bg-white bg-opacity-50 p-3 border border-indigo-200">
          <p className="text-xs text-indigo-700 mb-2">
            <span className="font-semibold">📈 Strategy:</span>
          </p>
          <ul className="text-xs text-indigo-700 space-y-1">
            <li>• Assume 6% annual investment return</li>
            <li>• Assumes consistent monthly savings</li>
            <li>• Based on current spending patterns</li>
          </ul>
        </div>

        {/* Milestone Message */}
        <div className="rounded-lg bg-indigo-600 bg-opacity-10 p-3 border border-indigo-300">
          <p className="text-sm font-semibold text-indigo-900">
            ${growth.toFixed(0)} in growth potential!
          </p>
          <p className="text-xs text-indigo-700 mt-1">
            Start investing today to make it real.
          </p>
        </div>
      </div>
    </div>
  );
}
