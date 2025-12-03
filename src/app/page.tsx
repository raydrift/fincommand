import Link from 'next/link';
import { ArrowRight, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-slate-900">FinCommand</div>
          <Link href="/dashboard">
            <Button className="bg-slate-900 hover:bg-slate-800">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          Safety-First Financial Dashboard
        </h1>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          Prevent cash-flow gaps before they happen. FinCommand visualizes your "Danger Zone" — the dates where bills exceed cash on hand — and provides strategic tools for debt elimination and wealth building.
        </p>
        <Link href="/dashboard">
          <Button className="bg-slate-900 hover:bg-slate-800 h-12 px-8 text-lg">
            Enter Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Danger Zone Alerts
                </h3>
              </div>
              <p className="text-slate-600">
                Know exactly when your balance will drop below your safety buffer, so you can take action before it's too late.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="h-6 w-6 text-emerald-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Smart Strategies
                </h3>
              </div>
              <p className="text-slate-600">
                Compare debt payoff vs. wealth building. See guaranteed returns from interest savings vs. compound growth.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 border border-slate-200 rounded-xl bg-slate-50">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Cash Flow Timeline
                </h3>
              </div>
              <p className="text-slate-600">
                See your 31-day cash flow projection with every income and expense plotted on an interactive calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to take control of your cash flow?
          </h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Set up your income, expenses, and debts in minutes. FinCommand will show you exactly where the danger zones are and help you eliminate them.
          </p>
          <Link href="/dashboard">
            <Button className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8 text-lg">
              Start Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-600">
          <p>FinCommand © 2025. Safety-First Financial Dashboard.</p>
        </div>
      </footer>
    </div>
  );
}
