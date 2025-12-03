'use client';

import { AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface SafetyGaugeProps {
  minBalance: number;
  currentBalance: number;
  safetyBuffer: number;
  status?: 'safe' | 'warning' | 'critical';
}

export function SafetyGauge({
  minBalance,
  currentBalance,
  safetyBuffer,
  status = 'safe',
}: SafetyGaugeProps) {
  const getStatusConfig = (s: string) => {
    switch (s) {
      case 'critical':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          label: 'Critical',
          description: 'Your balance will drop below safety buffer',
        };
      case 'warning':
        return {
          icon: AlertTriangle,
          color: 'text-amber-600',
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          label: 'Warning',
          description: 'Approaching danger zone',
        };
      default:
        return {
          icon: CheckCircle,
          color: 'text-emerald-600',
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-200',
          label: 'Safe',
          description: 'All systems optimal',
        };
    }
  };

  const config = getStatusConfig(status);
  const StatusIcon = config.icon;

  return (
    <div className={`${config.bgColor} border ${config.borderColor} rounded-xl p-6`}>
      <div className="flex items-start gap-4">
        <StatusIcon className={`${config.color} h-8 w-8 flex-shrink-0 mt-1`} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-slate-900">Safety Gauge</h2>
            <span className={`text-sm font-bold ${config.color}`}>{config.label}</span>
          </div>
          <p className={`${config.color} text-sm mb-4`}>{config.description}</p>

          {/* Current Balance */}
          <div className="space-y-3">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">
                Current Balance
              </p>
              <p className="text-2xl font-bold text-slate-900">
                ${currentBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Safety Buffer */}
            <div className="pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">
                Safety Buffer
              </p>
              <p className="text-lg font-semibold text-slate-700">
                ${safetyBuffer.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Minimum Projected Balance */}
            <div className="pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">
                Minimum Projected Balance (Next 31 Days)
              </p>
              <p className={`text-lg font-bold ${minBalance < safetyBuffer ? 'text-red-600' : 'text-emerald-600'}`}>
                ${minBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            {/* Buffer Status */}
            {minBalance < safetyBuffer ? (
              <div className="pt-2 border-t border-slate-200">
                <p className="text-sm text-red-600 font-medium">
                  ⚠️ Projected shortfall: ${Math.abs(minBalance - safetyBuffer).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} below safety buffer
                </p>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-200">
                <p className="text-sm text-emerald-600 font-medium">
                  ✓ Buffer: ${(minBalance - safetyBuffer).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} above safety buffer
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
