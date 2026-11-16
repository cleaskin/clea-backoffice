import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  PlusCircle,
  Clock,
  Eye,
  Trash2,
  Copy,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Archive,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { contentStore } from '@/services/contentStore';
import type { Article, ArticleCategory, ArticleStatus } from '@/types';

export const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(contentStore.getArticles());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Acne Care',
    'Hydration',
    'Anti-Aging',
    'Sun Protection',
    'Ingredients 101',
    'Daily Routine',
  ];

  const filteredArticles = articles.filter((art) => {
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || art.category === selectedCategory;

    const matchesStatus =
      selectedStatus === 'All' || art.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete article: "${title}"?`)) {
      contentStore.deleteArticle(id);
      setArticles(contentStore.getArticles());
    }
  };

  const handleDuplicate = (article: Article) => {
    const duplicate: Article = {
      ...article,
      id: `art-${Date.now()}`,
      title: `${article.title} (Copy)`,
      slug: `${article.slug}-copy`,
      status: 'draft',
      viewsCount: 0,
      likesCount: 0,
    };
    contentStore.saveArticle(duplicate);
    setArticles(contentStore.getArticles());
  };

  const handleToggleStatus = (article: Article) => {
    const nextStatus: ArticleStatus =
      article.status === 'published' ? 'draft' : 'published';
    const updated: Article = {
      ...article,
      status: nextStatus,
      publishedAt: nextStatus === 'published' ? new Date().toISOString() : undefined,
    };
    contentStore.saveArticle(updated);
    setArticles(contentStore.getArticles());
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 pb-16">
      <Header
        title="Articles & Guides"
        subtitle="Create and publish authoritative dermatological content for the mobile app."
        actions={
          <Link
            to="/articles/new"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all shadow-clea-coral"
          >
            <PlusCircle size={16} />
            <span>Create Article</span>
          </Link>
        }
      />

      <main className="px-8 pt-8 space-y-6 max-w-7xl">
        {/* Filters and Search Bar */}
        <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, ingredient, tag..."
                className="w-full pl-10 pr-4 py-2.5 bg-clea-bg rounded-xl border border-clea-border text-xs text-clea-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-clea-coral/20 focus:border-clea-coral transition-all"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-bold text-clea-muted shrink-0">Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-clea-bg border border-clea-border text-xs font-semibold text-clea-charcoal px-3 py-2 rounded-xl focus:outline-none focus:border-clea-coral"
              >
                <option value="All">All Statuses</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-clea-coral text-white shadow-clea-sm'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Articles Table Card */}
        <div className="bg-white rounded-2xl border border-clea-border shadow-clea-sm overflow-hidden">
          <div className="p-4 border-b border-clea-border bg-clea-bg-subtle flex items-center justify-between text-xs font-bold text-stone-500 uppercase tracking-wider">
            <span>Article Details</span>
            <span>Actions</span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <Search size={20} />
              </div>
              <h3 className="font-bold text-base text-clea-charcoal">No articles found</h3>
              <p className="text-xs text-clea-muted max-w-sm mx-auto">
                No matching articles for your current search and filters. Try adjusting your search query or create a new article.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-clea-border">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-clea-bg-subtle/40 transition-colors"
                >
                  {/* Left Info */}
                  <div className="flex items-start gap-4 min-w-0">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-24 h-20 rounded-xl object-cover shrink-0 border border-clea-border"
                    />

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700">
                          {article.category}
                        </span>

                        {/* Status badge with click-to-toggle */}
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(article)}
                          title="Click to toggle status"
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 transition-all ${
                            article.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                          }`}
                        >
                          {article.status === 'published' ? (
                            <>
                              <CheckCircle2 size={11} />
                              <span>Published</span>
                            </>
                          ) : (
                            <>
                              <AlertCircle size={11} />
                              <span>Draft</span>
                            </>
                          )}
                        </button>

                        <span className="text-xs text-stone-400 flex items-center gap-1">
                          <Clock size={12} />
                          {article.readingTime} min
                        </span>
                      </div>

                      <Link
                        to={`/articles/${article.id}/edit`}
                        className="text-base font-extrabold text-clea-charcoal hover:text-clea-coral transition-colors line-clamp-1"
                      >
                        {article.title}
                      </Link>

                      <p className="text-xs text-stone-500 line-clamp-1">
                        {article.summary}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-[11px] text-clea-muted">
                        <span>By {article.author.name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye size={12} />
                          {article.viewsCount} views
                        </span>
                        {article.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <div className="flex items-center gap-1">
                              {article.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] text-stone-500 bg-stone-100 px-1.5 py-0.5 rounded"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
                    <Link
                      to={`/articles/${article.id}/edit`}
                      className="p-2 rounded-xl text-stone-600 hover:text-clea-coral hover:bg-clea-coral-light transition-all"
                      title="Edit article"
                    >
                      <Edit3 size={16} />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDuplicate(article)}
                      className="p-2 rounded-xl text-stone-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                      title="Duplicate article"
                    >
                      <Copy size={16} />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(article.id, article.title)}
                      className="p-2 rounded-xl text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-all"
                      title="Delete article"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
