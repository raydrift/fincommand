'use client';

import { useMemo } from 'react';
import { format, getDate, isSameDay } from 'date-fns';
import { ArrowDown, ArrowUp } from 'lucide-react';
import type { RecurringTransaction } from '@/types/financial';

interface CashFlowCalendarProps {
  transactions: RecurringTransaction[];
  startDate?: Date;
}

export function CashFlowCalendar({ transactions, startDate = new Date() }: CashFlowCalendarProps) {
  const calendarDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < 31; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const dayOfMonth = getDate(currentDate);

      const dayTransactions = transactions.filter((t) => t.date === dayOfMonth);
      const income = dayTransactions
        .filter((t) => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = dayTransactions
        .filter((t) => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      days.push({
        date: currentDate,
        dayOfMonth,
        income,
        expenses,
        net: income - expenses,
        hasTransactions: dayTransactions.length > 0,
      });
    }
    return days;
  }, [transactions, startDate]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">31-Day Cash Flow Calendar</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`rounded-lg p-3 border transition-all ${
              day.hasTransactions
                ? day.net > 0
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-red-50 border-red-200'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            {/* Date */}
            <p className="text-xs font-bold text-slate-600 uppercase tracking-wide mb-2">
              {format(day.date, 'MMM d')}
            </p>

            {/* Transactions */}
            {day.hasTransactions ? (
              <div className="space-y-2">
                {day.income > 0 && (
                  <div className="flex items-center gap-1">
                    <ArrowUp className="h-3 w-3 text-emerald-600" />
                    <span className="text-xs font-semibold text-emerald-600">
                      +${day.income.toFixed(0)}
                    </span>
                  </div>
                )}
                {day.expenses > 0 && (
                  <div className="flex items-center gap-1">
                    <ArrowDown className="h-3 w-3 text-red-600" />
                    <span className="text-xs font-semibold text-red-600">
                      -${day.expenses.toFixed(0)}
                    </span>
                  </div>
                )}
                <div className="pt-1 border-t border-slate-200 mt-2">
                  <p
                    className={`text-xs font-bold ${
                      day.net > 0 ? 'text-emerald-600' : day.net < 0 ? 'text-red-600' : 'text-slate-600'
                    }`}
                  >
                    {day.net > 0 ? '+' : ''} ${day.net.toFixed(0)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No activity</p>
            )}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-slate-200 flex gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-100 border border-emerald-200" />
          <span className="text-xs text-slate-600">Income Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-100 border border-red-200" />
          <span className="text-xs text-slate-600">Expense Day</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-slate-100 border border-slate-200" />
          <span className="text-xs text-slate-600">No Activity</span>
        </div>
      </div>
    </div>
  );
}
