'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Calendar,
  CreditCard,
  Lightbulb,
  LogOut,
  Settings,
} from 'lucide-react';
import { COLORS } from '@/lib/constants/colors';

interface NavLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    label: 'Calendar',
    href: '/calendar',
    icon: <Calendar className="h-5 w-5" />,
  },
  {
    label: 'Debt Strategy',
    href: '/debt',
    icon: <CreditCard className="h-5 w-5" />,
  },
  {
    label: 'Smart Advisor',
    href: '/advisor',
    icon: <Lightbulb className="h-5 w-5" />,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className={`${COLORS.primary} text-white w-64 min-h-screen flex flex-col`}>
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <Link href="/">
          <h1 className="text-2xl font-bold text-white">FinCommand</h1>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.icon}
                <span className="font-medium">{link.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-700 p-4 space-y-2">
        <Link href="/settings">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
            <Settings className="h-5 w-5" />
            <span className="font-medium">Settings</span>
          </div>
        </Link>
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
}
