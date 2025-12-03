'use client';

import { Zap } from 'lucide-react';

interface EmergencyFundTrackerProps {
  current: number;
  goal: number;
}

export function EmergencyFundTracker({ current, goal }: EmergencyFundTrackerProps) {
  const percentage = Math.min((current / goal) * 100, 100);
  const remaining = Math.max(goal - current, 0);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="h-5 w-5 text-amber-500" />
        <h2 className="text-lg font-semibold text-slate-900">Emergency Fund</h2>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="bg-slate-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-amber-500 h-full transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Progress</span>
          <span className="text-sm font-semibold text-slate-900">
            {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Current</span>
          <span className="text-sm font-bold text-slate-900">
            ${current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-slate-600">Goal</span>
          <span className="text-sm font-bold text-slate-900">
            ${goal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        {remaining > 0 && (
          <div className="pt-2 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              <span className="text-amber-600 font-semibold">
                ${remaining.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {' '}to go
            </p>
          </div>
        )}
        {remaining <= 0 && (
          <div className="pt-2 border-t border-slate-200">
            <p className="text-sm text-emerald-600 font-semibold">✓ Emergency fund complete!</p>
          </div>
        )}
      </div>
    </div>
  );
}
