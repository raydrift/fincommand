export default function CalendarPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Cash Flow Calendar</h1>
        <p className="text-slate-500 mt-2">31-day projection of your cash flow with danger zone indicators</p>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
        <div className="h-96 bg-slate-100 rounded-lg flex items-center justify-center">
          <span className="text-slate-500">Calendar grid coming in Phase 4</span>
        </div>
      </div>
    </div>
  );
}
