'use client';

import { Sidebar } from './Sidebar';
import { MobileNav } from './MobileNav';

interface LayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar - hidden on mobile */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 z-40">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Content area */}
        <main className="flex-1 pb-20 lg:pb-0">
          {children}
        </main>

        {/* Mobile Navigation - shown on mobile, hidden on desktop */}
        <div className="fixed bottom-0 left-0 right-0 lg:hidden z-40">
          <MobileNav />
        </div>
      </div>
    </div>
  );
}
