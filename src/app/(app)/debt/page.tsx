export default function DebtPage() {
  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-900">Debt Strategy</h1>
        <p className="text-slate-500 mt-2">Use the snowball method to eliminate debt strategically</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Your Debts</h2>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Debt list coming in Phase 4</span>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Payoff Strategy</h2>
          <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
            <span className="text-slate-500">Payoff plan coming in Phase 4</span>
          </div>
        </div>
      </div>
    </div>
  );
}
