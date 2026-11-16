import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  Settings,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { contentStore } from '@/services/contentStore';

interface SidebarProps {
  onNewArticle?: () => void;
  onNewStory?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = () => {
  const stats = contentStore.getStats();

  const navItems = [
    {
      to: '/',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/articles',
      label: 'Articles',
      icon: FileText,
      badge: stats.publishedArticles,
    },
    {
      to: '/stories',
      label: 'Stories Builder',
      icon: Sparkles,
      badge: stats.activeStories,
      badgeColor: 'bg-clea-coral text-white',
    },
    {
      to: '/settings',
      label: 'Settings & API',
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-clea-border flex flex-col h-screen sticky top-0 shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-clea-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-clea-coral to-clea-sun flex items-center justify-center shadow-clea-coral text-white font-extrabold text-xl">
            C
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg text-clea-charcoal tracking-tight">Clea</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-clea-coral-light text-clea-coral border border-clea-coral-border uppercase tracking-wider">
                Admin
              </span>
            </div>
            <p className="text-xs text-clea-muted">Backoffice Studio</p>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="p-4 space-y-2 border-b border-clea-border">
        <NavLink
          to="/articles/new"
          className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all shadow-clea-sm active:scale-[0.98]"
        >
          <PlusCircle size={15} />
          <span>New Article</span>
        </NavLink>
        <NavLink
          to="/stories/new"
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-clea-bg-subtle text-clea-charcoal border border-clea-border-dark text-xs font-semibold hover:bg-clea-coral-light hover:text-clea-coral hover:border-clea-coral-border transition-all"
        >
          <Sparkles size={14} className="text-clea-coral" />
          <span>New Story</span>
        </NavLink>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-3 pt-2 pb-1 text-[11px] font-bold text-clea-muted uppercase tracking-wider">
          Content Management
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-clea-coral text-white shadow-clea-sm'
                    : 'text-stone-600 hover:bg-clea-bg hover:text-clea-charcoal'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-white' : 'text-stone-400'} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== null && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/25 text-white'
                          : item.badgeColor || 'bg-stone-100 text-stone-600'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        <div className="pt-6 px-3 pb-1 text-[11px] font-bold text-clea-muted uppercase tracking-wider">
          App Ecosystem
        </div>
        <a
          href="http://localhost:8081"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-500 hover:bg-stone-50 hover:text-stone-800 transition-all"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Expo Dev Server
          </span>
          <ExternalLink size={13} className="text-stone-400" />
        </a>
      </nav>

      {/* User Footer Profile */}
      <div className="p-4 border-t border-clea-border bg-clea-bg/40">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
              alt="Admin avatar"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-clea-charcoal truncate">Oles Partyka</p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <ShieldCheck size={12} />
              <span>Super Admin</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
