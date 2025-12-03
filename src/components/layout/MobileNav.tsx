'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  Calendar,
  CreditCard,
  Lightbulb,
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
    icon: <BarChart3 className="h-6 w-6" />,
  },
  {
    label: 'Calendar',
    href: '/calendar',
    icon: <Calendar className="h-6 w-6" />,
  },
  {
    label: 'Debt',
    href: '/debt',
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    label: 'Advisor',
    href: '/advisor',
    icon: <Lightbulb className="h-6 w-6" />,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className={`${COLORS.primary} text-white border-t border-slate-700 px-4 py-3`}>
      <div className="flex justify-around items-center">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <div
                className={`flex flex-col items-center gap-1 p-2 rounded transition-all ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.icon}
                <span className="text-xs font-medium">{link.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
