export default function DashboardPage() {
  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-2">Welcome to FinCommand – Your Safety-First Financial Dashboard</p>
      </div>

      {/* Placeholder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Safety Gauge Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Safety Gauge</h2>
          <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Coming in Phase 3</span>
          </div>
        </div>

        {/* Immediate Actions Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Immediate Actions</h2>
          <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Coming in Phase 3</span>
          </div>
        </div>

        {/* Emergency Fund Placeholder */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Emergency Fund</h2>
          <div className="h-32 bg-slate-100 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Coming in Phase 3</span>
          </div>
        </div>
      </div>

      {/* Large Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Cash Flow Projection</h2>
        <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
          <span className="text-slate-500">Chart coming in Phase 4</span>
        </div>
      </div>
    </div>
  );
}
