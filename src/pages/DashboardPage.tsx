import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Sparkles,
  Eye,
  Clock,
  TrendingUp,
  PlusCircle,
  ArrowUpRight,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { contentStore } from '@/services/contentStore';
import type { Article, Story } from '@/types';

export const DashboardPage: React.FC = () => {
  const [articles] = useState<Article[]>(contentStore.getArticles());
  const [stories] = useState<Story[]>(contentStore.getStories());
  const stats = contentStore.getStats();

  const recentArticles = articles.slice(0, 4);
  const activeStories = stories.filter((s) => s.status === 'active');

  return (
    <div className="flex-1 flex flex-col min-w-0 pb-16">
      <Header
        title="Dashboard"
        subtitle="Manage daily skincare advice, ingredient library, and interactive diagnostic stories."
        actions={
          <div className="flex items-center gap-2">
            <Link
              to="/articles/new"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all shadow-clea-sm"
            >
              <PlusCircle size={15} />
              <span>Create Article</span>
            </Link>
            <Link
              to="/stories/new"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-clea-bg-subtle text-clea-charcoal border border-clea-border-dark text-xs font-semibold hover:bg-white transition-all shadow-clea-sm"
            >
              <Sparkles size={15} className="text-clea-coral" />
              <span>Create Story</span>
            </Link>
          </div>
        }
      />

      <main className="px-8 pt-8 space-y-8 max-w-7xl">
        {/* Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-clea-muted uppercase tracking-wider">
                Published Articles
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-clea-charcoal">
                  {stats.publishedArticles}
                </span>
                <span className="text-xs text-stone-400">/ {stats.totalArticles} total</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
                <TrendingUp size={12} />
                <span>+12% this month</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 flex items-center justify-center">
              <FileText size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-clea-muted uppercase tracking-wider">
                Active Stories
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-clea-charcoal">
                  {stats.activeStories}
                </span>
                <span className="text-xs text-stone-400">live in app</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
                <TrendingUp size={12} />
                <span>86% avg completion</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-clea-coral border border-rose-200/60 flex items-center justify-center">
              <Sparkles size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-clea-muted uppercase tracking-wider">
                Total Engagement
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-clea-charcoal">
                  {stats.totalViews.toLocaleString()}
                </span>
                <span className="text-xs text-stone-400">views</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-2">
                <TrendingUp size={12} />
                <span>+24.8% vs last week</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 flex items-center justify-center">
              <Eye size={22} />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-clea-muted uppercase tracking-wider">
                Avg. Read Time
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-extrabold text-clea-charcoal">
                  {stats.avgReadTime}
                </span>
                <span className="text-xs text-stone-400">minutes</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-semibold text-stone-500 mt-2">
                <span>Optimal reader retention</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 flex items-center justify-center">
              <Clock size={22} />
            </div>
          </div>
        </div>

        {/* Stories Visual Row */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-clea-charcoal tracking-tight">
                Active Stories Showcase
              </h2>
              <p className="text-xs text-clea-muted">
                Highlighted micro-content displayed in the Clea mobile app carousel.
              </p>
            </div>
            <Link
              to="/stories"
              className="text-xs font-bold text-clea-coral hover:text-clea-coral-hover flex items-center gap-1"
            >
              <span>Manage All Stories ({stories.length})</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {activeStories.map((story) => (
              <div
                key={story.id}
                className="group relative h-48 rounded-2xl overflow-hidden border border-clea-border shadow-clea-sm hover:shadow-clea transition-all"
              >
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white backdrop-blur-md">
                    {story.slides.length} slides
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white shadow-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                    Live
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] font-semibold text-white/80">{story.category}</p>
                  <h3 className="font-extrabold text-sm leading-tight mt-0.5">{story.title}</h3>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/20 text-[11px] text-white/80">
                    <span className="flex items-center gap-1">
                      <Eye size={12} />
                      {story.viewsCount} views
                    </span>
                    <Link
                      to={`/stories/${story.id}/edit`}
                      className="font-bold text-clea-coral bg-white px-2 py-0.5 rounded-md hover:bg-stone-100 transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Articles Table */}
        <section className="bg-white rounded-2xl border border-clea-border shadow-clea-sm overflow-hidden">
          <div className="p-6 border-b border-clea-border flex items-center justify-between">
            <div>
              <h2 className="text-lg font-extrabold text-clea-charcoal tracking-tight">
                Recent Articles & Guides
              </h2>
              <p className="text-xs text-clea-muted">
                Educational skincare protocols published to the mobile app feed.
              </p>
            </div>
            <Link
              to="/articles"
              className="text-xs font-bold text-clea-coral hover:text-clea-coral-hover flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ChevronRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-clea-border">
            {recentArticles.map((article) => (
              <div
                key={article.id}
                className="p-5 flex items-center justify-between gap-4 hover:bg-clea-bg-subtle/50 transition-colors"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-16 h-14 rounded-xl object-cover shrink-0 border border-clea-border"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700">
                        {article.category}
                      </span>
                      {article.status === 'published' ? (
                        <span className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1">
                          <CheckCircle2 size={12} />
                          Published
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-1">
                          <AlertCircle size={12} />
                          Draft
                        </span>
                      )}
                    </div>
                    <Link
                      to={`/articles/${article.id}/edit`}
                      className="font-bold text-sm text-clea-charcoal hover:text-clea-coral transition-colors line-clamp-1"
                    >
                      {article.title}
                    </Link>
                    <p className="text-xs text-clea-muted mt-0.5">
                      By {article.author.name} • {article.readingTime} min read • {article.viewsCount} views
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/articles/${article.id}/edit`}
                    className="px-3 py-1.5 text-xs font-bold text-clea-charcoal bg-clea-bg border border-clea-border rounded-xl hover:border-clea-coral hover:text-clea-coral transition-all flex items-center gap-1"
                  >
                    <span>Edit</span>
                    <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
