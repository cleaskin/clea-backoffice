import React, { useState } from 'react';
import {
  Settings,
  Database,
  Download,
  Upload,
  RefreshCw,
  Server,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { contentStore } from '@/services/contentStore';

export const SettingsPage: React.FC = () => {
  const [userServiceUrl, setUserServiceUrl] = useState('http://100.76.217.2:8000');
  const [keycloakUrl, setKeycloakUrl] = useState('http://100.76.217.2:8080');
  const [savedConfig, setSavedConfig] = useState(false);

  const stats = contentStore.getStats();

  const handleExportData = () => {
    const data = {
      articles: contentStore.getArticles(),
      stories: contentStore.getStories(),
      exportedAt: new Date().toISOString(),
      app: 'clea-backoffice',
      version: '1.0.0',
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `clea-content-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleResetDemo = () => {
    if (
      window.confirm(
        'Are you sure you want to restore initial demo articles and stories? Custom edits will be overwritten.'
      )
    ) {
      contentStore.resetToDefaults();
      alert('Default content restored!');
      window.location.reload();
    }
  };

  const handleSaveEndpoints = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedConfig(true);
    setTimeout(() => setSavedConfig(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 pb-16">
      <Header
        title="Settings & System Integration"
        subtitle="Configure backend endpoints, export database backups, and manage content sync."
      />

      <main className="px-8 pt-8 space-y-8 max-w-4xl">
        {/* Backend & Keycloak Connection */}
        <div className="bg-white p-6 rounded-3xl border border-clea-border shadow-clea-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-clea-border pb-4">
            <div className="w-10 h-10 rounded-2xl bg-clea-coral-light text-clea-coral flex items-center justify-center">
              <Server size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-clea-charcoal tracking-tight">
                Backend Services Connection
              </h2>
              <p className="text-xs text-clea-muted">
                Connect backoffice directly to Tailscale or local backend instances.
              </p>
            </div>
          </div>

          <form onSubmit={handleSaveEndpoints} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                FastAPI User Service URL
              </label>
              <input
                type="text"
                value={userServiceUrl}
                onChange={(e) => setUserServiceUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-clea-bg rounded-xl border border-clea-border text-xs font-mono text-stone-700 focus:outline-none focus:border-clea-coral"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Keycloak OIDC URL
              </label>
              <input
                type="text"
                value={keycloakUrl}
                onChange={(e) => setKeycloakUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-clea-bg rounded-xl border border-clea-border text-xs font-mono text-stone-700 focus:outline-none focus:border-clea-coral"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                Realm: <strong className="text-clea-charcoal">cleaskin</strong> | Client:{' '}
                <strong className="text-clea-charcoal">clea-mobile</strong>
              </span>

              <button
                type="submit"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all shadow-clea-coral"
              >
                {savedConfig ? (
                  <>
                    <Check size={14} />
                    <span>Saved!</span>
                  </>
                ) : (
                  <span>Save Configuration</span>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Database & Data Backup */}
        <div className="bg-white p-6 rounded-3xl border border-clea-border shadow-clea-sm space-y-5">
          <div className="flex items-center gap-3 border-b border-clea-border pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-clea-charcoal tracking-tight">
                Content Store & Data Backups
              </h2>
              <p className="text-xs text-clea-muted">
                Currently holding {stats.totalArticles} articles and {stats.activeStories} active stories.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleExportData}
              className="p-5 rounded-2xl border border-clea-border bg-clea-bg-subtle hover:bg-white hover:border-clea-coral hover:shadow-clea-sm transition-all text-left flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-stone-700 border border-clea-border flex items-center justify-center group-hover:text-clea-coral group-hover:border-clea-coral-border transition-colors shrink-0">
                <Download size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-clea-charcoal">Export JSON Backup</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Download all articles, rich text, and stories in a clean JSON format.
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={handleResetDemo}
              className="p-5 rounded-2xl border border-clea-border bg-clea-bg-subtle hover:bg-white hover:border-rose-300 hover:shadow-clea-sm transition-all text-left flex items-start gap-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-white text-stone-700 border border-clea-border flex items-center justify-center group-hover:text-rose-600 group-hover:border-rose-200 transition-colors shrink-0">
                <RefreshCw size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm text-clea-charcoal">Restore Demo Data</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Reset backoffice content to initial Clea editorial articles & stories.
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* System & Architecture Info */}
        <div className="p-5 rounded-2xl bg-stone-100/70 border border-clea-border text-xs text-stone-600 space-y-2">
          <div className="flex items-center gap-2 font-bold text-stone-800">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span>Clea Backoffice Studio Architecture</span>
          </div>
          <p className="leading-relaxed">
            Content created here is compatible with the mobile app routing protocols (
            <code className="text-clea-coral font-bold">clea://scan</code>,{' '}
            <code className="text-clea-coral font-bold">clea://products/:id</code>,{' '}
            <code className="text-clea-coral font-bold">clea://articles/:slug</code>
            ). When Andrey provides the backend content endpoints, this backoffice will directly sync data over HTTP with Bearer tokens.
          </p>
        </div>
      </main>
    </div>
  );
};
