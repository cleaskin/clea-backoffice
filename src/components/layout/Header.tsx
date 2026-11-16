import React from 'react';
import { Search, Bell, Database } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, actions }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-clea-border px-8 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-xl font-extrabold text-clea-charcoal tracking-tight">{title}</h1>
        {subtitle && <p className="text-xs text-clea-muted mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Environment / Storage Status */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
          <Database size={13} className="text-emerald-600" />
          <span>Local Store Active</span>
        </div>

        {/* Search Bar */}
        <div className="relative hidden lg:block">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Search articles, stories..."
            className="w-64 pl-9 pr-4 py-2 bg-clea-bg rounded-xl border border-clea-border text-xs text-clea-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-clea-coral/20 focus:border-clea-coral transition-all"
          />
        </div>

        {/* Notification Icon */}
        <button
          title="Notifications"
          className="w-9 h-9 rounded-xl bg-clea-bg border border-clea-border flex items-center justify-center text-stone-500 hover:text-clea-charcoal hover:bg-stone-100 transition-all relative"
        >
          <Bell size={16} />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-clea-coral"></span>
        </button>

        {actions && <div className="flex items-center gap-2.5 ml-2">{actions}</div>}
      </div>
    </header>
  );
};
