import { Zap, TrendingDown } from 'lucide-react';

interface GuaranteedReturnCardProps {
  interestSaved: number;
  timeframe?: string;
}

export function GuaranteedReturnCard({ interestSaved, timeframe = '12 months' }: GuaranteedReturnCardProps) {
  // Calculate equivalent return rate (assuming average debt of $10k)
  const equivalentReturn = (interestSaved / 10000) * 100;

  return (
    <div className="rounded-xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100 p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-emerald-900">Guaranteed Return</h3>
          <p className="text-sm text-emerald-700 mt-1">By eliminating debt</p>
        </div>
        <div className="bg-emerald-600 rounded-lg p-3">
          <Zap className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="space-y-4">
        {/* Main Value */}
        <div>
          <p className="text-sm text-emerald-700 mb-1">Interest You&apos;ll Save</p>
          <p className="text-4xl font-bold text-emerald-900">${interestSaved.toFixed(0)}</p>
          <p className="text-xs text-emerald-600 mt-1">in the next {timeframe}</p>
        </div>

        {/* Equivalent Return Rate */}
        <div className="rounded-lg bg-white bg-opacity-70 p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-emerald-700 font-medium">Equivalent Return Rate</span>
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="font-semibold text-emerald-900">{equivalentReturn.toFixed(1)}%</span>
            </div>
          </div>
          <p className="text-xs text-emerald-600 mt-2">
            This is like earning that percentage risk-free by paying down debt
          </p>
        </div>

        {/* Key Insight */}
        <div className="rounded-lg bg-white bg-opacity-50 p-3 border border-emerald-200">
          <p className="text-xs text-emerald-700">
            <span className="font-semibold">💡 Insight:</span> Eliminating debt is one of the safest, highest-return investments you can make.
          </p>
        </div>
      </div>
    </div>
  );
}
