export default function AdvisorPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Smart Advisor</h1>
        <p className="text-slate-500 mt-2">Compare debt elimination vs. wealth building strategies</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-emerald-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Guaranteed Return</h2>
          <p className="text-sm text-slate-600 mb-4">Interest saved from debt payoff</p>
          <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Coming in Phase 4</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-indigo-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">Compound Growth</h2>
          <p className="text-sm text-slate-600 mb-4">Wealth building potential</p>
          <div className="h-48 bg-slate-100 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Coming in Phase 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
