'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Action {
  id: string;
  label: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: React.ReactNode;
  action: () => void;
}

interface ImmediateActionsProps {
  actions: Action[];
}

export function ImmediateActions({ actions }: ImmediateActionsProps) {
  const getBackgroundColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 border-red-200';
      case 'medium':
        return 'bg-amber-50 border-amber-200';
      default:
        return 'bg-emerald-50 border-emerald-200';
    }
  };

  const getIconColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-amber-600';
      default:
        return 'text-emerald-600';
    }
  };

  if (actions.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Immediate Actions</h2>
        <div className="text-center py-8">
          <p className="text-slate-500">No actions needed right now. You&apos;re on track! 🎉</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-slate-900">Immediate Actions</h2>
      {actions.map((action) => (
        <div
          key={action.id}
          className={`border rounded-xl p-4 ${getBackgroundColor(action.priority)}`}
        >
          <div className="flex items-start gap-4">
            <div className={`${getIconColor(action.priority)} flex-shrink-0 mt-1`}>
              {action.icon}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-slate-900">{action.label}</h3>
              <p className="text-sm text-slate-600 mt-1">{action.description}</p>
              <div className="mt-3">
                <Button
                  onClick={action.action}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-sm"
                >
                  Take Action
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
