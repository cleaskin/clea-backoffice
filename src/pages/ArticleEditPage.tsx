import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Image as ImageIcon,
  User,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { TipTapEditor } from '@/components/articles/TipTapEditor';
import { contentStore } from '@/services/contentStore';
import type { Article, ArticleCategory, ArticleStatus } from '@/types';

export const ArticleEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState<ArticleCategory>('Ingredients 101');
  const [summary, setSummary] = useState('');
  const [contentHtml, setContentHtml] = useState('');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop'
  );
  const [readingTime, setReadingTime] = useState<number>(4);
  const [authorName, setAuthorName] = useState('Dr. Elena Rostova');
  const [authorRole, setAuthorRole] = useState('Lead Dermatologist');
  const [status, setStatus] = useState<ArticleStatus>('published');
  const [tagsInput, setTagsInput] = useState('Niacinamide, Barrier Repair');
  const [previewMode, setPreviewMode] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const categories: ArticleCategory[] = [
    'Acne Care',
    'Hydration',
    'Anti-Aging',
    'Sun Protection',
    'Ingredients 101',
    'Daily Routine',
  ];

  useEffect(() => {
    if (!isNew && id) {
      const existing = contentStore.getArticleById(id);
      if (existing) {
        setTitle(existing.title);
        setSlug(existing.slug);
        setCategory(existing.category);
        setSummary(existing.summary);
        setContentHtml(existing.contentHtml);
        setCoverImage(existing.coverImage);
        setReadingTime(existing.readingTime || 4);
        setAuthorName(existing.author.name);
        setAuthorRole(existing.author.role);
        setStatus(existing.status);
        setTagsInput(existing.tags.join(', '));
      }
    }
  }, [id, isNew]);

  // Auto-generate slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (isNew) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(autoSlug);
    }
  };

  const handleSave = (newStatus?: ArticleStatus) => {
    if (!title.trim()) {
      alert('Please enter an article title.');
      return;
    }

    const currentStatus = newStatus || status;
    const finalTags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const articleToSave: Article = {
      id: !isNew && id ? id : `art-${Date.now()}`,
      title: title.trim(),
      slug: slug.trim() || 'article-slug',
      category,
      summary: summary.trim(),
      contentHtml,
      coverImage: coverImage.trim(),
      readingTime: Number(readingTime) || 3,
      author: {
        name: authorName.trim() || 'Clea Editorial Team',
        role: authorRole.trim() || 'Dermatologist',
        avatar: 'https://images.unsplash.com/photo-1594824813639-95240c541783?q=80&w=200&auto=format&fit=crop',
      },
      status: currentStatus,
      publishedAt: currentStatus === 'published' ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: finalTags,
      viewsCount: !isNew && id ? contentStore.getArticleById(id)?.viewsCount || 0 : 0,
      likesCount: !isNew && id ? contentStore.getArticleById(id)?.likesCount || 0 : 0,
    };

    contentStore.saveArticle(articleToSave);
    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/articles');
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 pb-20">
      <Header
        title={isNew ? 'Create New Article' : 'Edit Article'}
        subtitle={isNew ? 'Draft a new scientific skincare guide for the mobile app.' : `Editing: ${title}`}
        actions={
          <div className="flex items-center gap-2">
            <Link
              to="/articles"
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-clea-charcoal transition-all"
            >
              <ArrowLeft size={14} />
              <span>Cancel</span>
            </Link>

            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                previewMode
                  ? 'bg-clea-charcoal text-white border-clea-charcoal'
                  : 'bg-white border-clea-border text-stone-700 hover:bg-stone-50'
              }`}
            >
              <Eye size={14} />
              <span>{previewMode ? 'Edit Mode' : 'Live Preview'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSave('draft')}
              className="px-4 py-2 rounded-xl bg-clea-bg-subtle text-clea-charcoal border border-clea-border-dark text-xs font-bold hover:bg-white transition-all shadow-clea-sm"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => handleSave('published')}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all shadow-clea-coral"
            >
              <Save size={14} />
              <span>{savedSuccess ? 'Saved!' : 'Publish Article'}</span>
            </button>
          </div>
        }
      />

      <main className="px-8 pt-8 max-w-6xl space-y-8">
        {previewMode ? (
          /* Live Article Mobile/Web Preview */
          <div className="bg-white rounded-3xl border border-clea-border shadow-clea p-8 max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-clea-coral-light text-clea-coral border border-clea-coral-border">
                {category}
              </span>
              <span className="text-xs text-stone-400">• {readingTime} min read</span>
            </div>

            <h1 className="text-3xl font-extrabold text-clea-charcoal leading-tight">
              {title || 'Untitled Article'}
            </h1>

            {summary && (
              <p className="text-base text-stone-600 font-medium leading-relaxed italic border-l-2 border-clea-coral pl-4">
                {summary}
              </p>
            )}

            <div className="flex items-center gap-3 py-3 border-y border-clea-border">
              <img
                src="https://images.unsplash.com/photo-1594824813639-95240c541783?q=80&w=120&auto=format&fit=crop"
                alt={authorName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-bold text-clea-charcoal">{authorName}</p>
                <p className="text-[11px] text-clea-muted">{authorRole}</p>
              </div>
            </div>

            {coverImage && (
              <img
                src={coverImage}
                alt={title}
                className="w-full h-80 object-cover rounded-2xl shadow-sm"
              />
            )}

            <div
              className="prose prose-stone max-w-none text-stone-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>
        ) : (
          /* Editor Layout */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Columns: Main Fields & TipTap */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title & Slug */}
              <div className="bg-white p-6 rounded-2xl border border-clea-border shadow-clea-sm space-y-4">
                <div>
                  <label className="block text-xs font-bold text-clea-charcoal mb-1.5 uppercase tracking-wider">
                    Article Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. The Truth About Niacinamide: Why 5% is the Sweet Spot"
                    className="w-full px-4 py-3 bg-clea-bg rounded-xl border border-clea-border text-base font-bold text-clea-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-clea-coral/20 focus:border-clea-coral transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-500 mb-1">
                    Slug (URL identifier in mobile routing)
                  </label>
                  <div className="flex items-center">
                    <span className="text-xs text-stone-400 bg-stone-100 px-3 py-2 rounded-l-xl border border-r-0 border-clea-border">
                      clea://articles/
                    </span>
                    <input
                      type="text"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="niacinamide-sweet-spot"
                      className="flex-1 px-3 py-2 bg-clea-bg rounded-r-xl border border-clea-border text-xs text-stone-600 focus:outline-none focus:border-clea-coral"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-clea-charcoal mb-1.5 uppercase tracking-wider">
                    Summary / Excerpt (Shows on mobile card feed)
                  </label>
                  <textarea
                    rows={3}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief 2-line summary explaining the core takeaway..."
                    className="w-full p-3 bg-clea-bg rounded-xl border border-clea-border text-xs text-clea-charcoal placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-clea-coral/20 focus:border-clea-coral transition-all"
                  />
                </div>
              </div>

              {/* Rich-Text TipTap Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                  <label className="text-xs font-bold text-clea-charcoal uppercase tracking-wider">
                    Article Body (Rich-Text Content)
                  </label>
                  <span className="text-xs text-stone-400">WYSIWYG Markdown support</span>
                </div>
                <TipTapEditor content={contentHtml} onChange={setContentHtml} />
              </div>
            </div>

            {/* Right Column: Metadata & Settings */}
            <div className="space-y-6">
              {/* Publishing Status Card */}
              <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm space-y-4">
                <h3 className="text-xs font-bold text-clea-charcoal uppercase tracking-wider">
                  Publishing Settings
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as ArticleCategory)}
                    className="w-full bg-clea-bg border border-clea-border text-xs font-bold text-clea-charcoal px-3 py-2.5 rounded-xl focus:outline-none focus:border-clea-coral"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Est. Reading Time (minutes)
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={readingTime}
                    onChange={(e) => setReadingTime(Number(e.target.value))}
                    className="w-full bg-clea-bg border border-clea-border text-xs font-bold text-clea-charcoal px-3 py-2 rounded-xl focus:outline-none focus:border-clea-coral"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Niacinamide, SPF, Acne..."
                    className="w-full bg-clea-bg border border-clea-border text-xs text-clea-charcoal px-3 py-2 rounded-xl focus:outline-none focus:border-clea-coral"
                  />
                </div>
              </div>

              {/* Cover Image Inspector */}
              <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm space-y-3">
                <h3 className="text-xs font-bold text-clea-charcoal uppercase tracking-wider flex items-center justify-between">
                  <span>Cover Photo</span>
                  <ImageIcon size={14} className="text-clea-coral" />
                </h3>

                {coverImage ? (
                  <div className="relative rounded-xl overflow-hidden border border-clea-border h-36">
                    <img
                      src={coverImage}
                      alt="Cover Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}

                <div>
                  <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-clea-bg border border-clea-border text-xs text-stone-600 px-3 py-2 rounded-xl focus:outline-none focus:border-clea-coral"
                  />
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm space-y-3">
                <h3 className="text-xs font-bold text-clea-charcoal uppercase tracking-wider flex items-center justify-between">
                  <span>Author Attributed</span>
                  <User size={14} className="text-stone-400" />
                </h3>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-clea-bg border border-clea-border text-xs font-bold text-clea-charcoal px-3 py-2 rounded-xl focus:outline-none focus:border-clea-coral"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-stone-500 mb-1">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={authorRole}
                    onChange={(e) => setAuthorRole(e.target.value)}
                    className="w-full bg-clea-bg border border-clea-border text-xs text-stone-600 px-3 py-2 rounded-xl focus:outline-none focus:border-clea-coral"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
