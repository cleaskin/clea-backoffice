import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Save,
  ArrowLeft,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  Sliders,
  Image as ImageIcon,
  CheckCircle2,
  ScanFace,
  QrCode,
  ExternalLink,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { StoryPhoneSimulator } from '@/components/stories/StoryPhoneSimulator';
import { contentStore } from '@/services/contentStore';
import type { Story, StorySlide, StoryStatus, StoryCtaAction } from '@/types';

export const StoryEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id || id === 'new';

  const [title, setTitle] = useState('New Skincare Story');
  const [category, setCategory] = useState('Diagnostics');
  const [status, setStatus] = useState<StoryStatus>('active');
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1512290900672-1f41d916e788?q=80&w=600&auto=format&fit=crop'
  );

  const [slides, setSlides] = useState<StorySlide[]>([
    {
      id: 'slide-init-1',
      mediaUrl:
        'https://images.unsplash.com/photo-1512290900672-1f41d916e788?q=80&w=800&auto=format&fit=crop',
      mediaType: 'image',
      duration: 5,
      badge: 'FEATURE',
      title: 'Diagnostic Overview',
      subtitle: 'Experience precise skin analysis powered by computer vision algorithms.',
      ctaText: 'Start Face Scan',
      ctaAction: 'scan',
      textColor: 'white',
      overlayOpacity: 45,
    },
    {
      id: 'slide-init-2',
      mediaUrl:
        'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      mediaType: 'image',
      duration: 5,
      badge: 'STEP 2',
      title: 'Analyze Ingredients',
      subtitle: 'Scan your vanity products to detect comedogenic and irritant ingredients.',
      ctaText: 'Scan Barcode',
      ctaAction: 'product',
      textColor: 'white',
      overlayOpacity: 40,
    },
  ]);

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      const existing = contentStore.getStoryById(id);
      if (existing) {
        setTitle(existing.title);
        setCategory(existing.category);
        setStatus(existing.status);
        setCoverImage(existing.coverImage);
        if (existing.slides?.length) {
          setSlides(existing.slides);
        }
      }
    }
  }, [id, isNew]);

  const activeSlide = slides[activeSlideIndex] || slides[0];

  const updateActiveSlide = (fields: Partial<StorySlide>) => {
    setSlides((prev) => {
      const updated = [...prev];
      updated[activeSlideIndex] = {
        ...updated[activeSlideIndex],
        ...fields,
      };
      return updated;
    });
  };

  const handleAddSlide = () => {
    const newSlide: StorySlide = {
      id: `slide-${Date.now()}`,
      mediaUrl:
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
      mediaType: 'image',
      duration: 5,
      badge: 'NEW SLIDE',
      title: 'Slide Headline',
      subtitle: 'Describe the tip or feature in detail.',
      ctaText: 'Learn More',
      ctaAction: 'scan',
      textColor: 'white',
      overlayOpacity: 40,
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    setActiveSlideIndex(updated.length - 1);
  };

  const handleDuplicateSlide = (index: number) => {
    const target = slides[index];
    const clone: StorySlide = {
      ...target,
      id: `slide-${Date.now()}`,
      title: `${target.title || ''} (Copy)`,
    };
    const updated = [...slides];
    updated.splice(index + 1, 0, clone);
    setSlides(updated);
    setActiveSlideIndex(index + 1);
  };

  const handleDeleteSlide = (index: number) => {
    if (slides.length <= 1) {
      alert('A story must contain at least one slide.');
      return;
    }
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    setActiveSlideIndex(Math.max(0, index - 1));
  };

  const handleSave = () => {
    if (!title.trim()) {
      alert('Please enter a story title.');
      return;
    }

    const storyToSave: Story = {
      id: !isNew && id ? id : `story-${Date.now()}`,
      title: title.trim(),
      category: category.trim() || 'Diagnostics',
      coverImage: coverImage.trim() || slides[0].mediaUrl,
      status,
      slides,
      order: 1,
      viewsCount: !isNew && id ? contentStore.getStoryById(id)?.viewsCount || 0 : 0,
      completionRate: !isNew && id ? contentStore.getStoryById(id)?.completionRate || 85 : 85,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    contentStore.saveStory(storyToSave);
    setSavedSuccess(true);
    setTimeout(() => {
      navigate('/stories');
    }, 600);
  };

  const storyPreviewObject: Story = {
    id: id || 'preview',
    title,
    category,
    coverImage,
    status,
    slides,
    order: 1,
    viewsCount: 120,
    completionRate: 90,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 pb-20">
      <Header
        title={isNew ? 'Create New Story' : `Edit Story: ${title}`}
        subtitle="Design rich interactive slides with call-to-actions for the mobile app."
        actions={
          <div className="flex items-center gap-2">
            <Link
              to="/stories"
              className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-stone-600 hover:text-clea-charcoal transition-all"
            >
              <ArrowLeft size={14} />
              <span>Cancel</span>
            </Link>

            <button
              type="button"
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all shadow-clea-coral"
            >
              <Save size={15} />
              <span>{savedSuccess ? 'Saved!' : 'Save Story'}</span>
            </button>
          </div>
        }
      />

      <main className="px-8 pt-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form & Slide Inspector (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Story Meta Header Card */}
            <div className="bg-white p-5 rounded-2xl border border-clea-border shadow-clea-sm space-y-4">
              <h3 className="text-xs font-bold text-clea-charcoal uppercase tracking-wider">
                Story Settings
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    Story Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-clea-bg rounded-xl border border-clea-border text-xs font-bold text-clea-charcoal focus:outline-none focus:border-clea-coral"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2 bg-clea-bg rounded-xl border border-clea-border text-xs text-clea-charcoal focus:outline-none focus:border-clea-coral"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Status in App
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as StoryStatus)}
                    className="w-full bg-clea-bg border border-clea-border text-xs font-bold text-clea-charcoal px-3 py-2 rounded-xl focus:outline-none focus:border-clea-coral"
                  >
                    <option value="active">Active (Visible in Carousel)</option>
                    <option value="scheduled">Scheduled / Hidden</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Story Cover Image URL
                  </label>
                  <input
                    type="text"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full px-3 py-2 bg-clea-bg rounded-xl border border-clea-border text-xs text-stone-600 focus:outline-none focus:border-clea-coral"
                  />
                </div>
              </div>
            </div>

            {/* Slide Navigation Strip */}
            <div className="bg-white p-4 rounded-2xl border border-clea-border shadow-clea-sm space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-clea-charcoal uppercase tracking-wider">
                  Story Slides ({slides.length})
                </h3>
                <button
                  type="button"
                  onClick={handleAddSlide}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all"
                >
                  <Plus size={14} />
                  <span>Add Slide</span>
                </button>
              </div>

              <div className="flex items-center gap-3 overflow-x-auto pb-2 pt-1 no-scrollbar">
                {slides.map((s, idx) => (
                  <div
                    key={s.id || idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`relative w-20 h-28 rounded-xl overflow-hidden shrink-0 border-2 cursor-pointer transition-all group ${
                      idx === activeSlideIndex
                        ? 'border-clea-coral ring-2 ring-clea-coral/20 shadow-md scale-105'
                        : 'border-clea-border opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={s.mediaUrl} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-1.5 left-1.5 text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-black/60 text-white">
                      #{idx + 1}
                    </span>
                    <p className="absolute bottom-1.5 left-1.5 right-1.5 text-[9px] font-bold text-white line-clamp-1 leading-tight">
                      {s.title || `Slide ${idx + 1}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Slide Inspector Card */}
            <div className="bg-white p-6 rounded-2xl border border-clea-border shadow-clea-sm space-y-5">
              <div className="flex items-center justify-between border-b border-clea-border pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-clea-coral text-white text-xs font-extrabold flex items-center justify-center">
                    {activeSlideIndex + 1}
                  </span>
                  <h3 className="text-sm font-extrabold text-clea-charcoal">
                    Editing Slide #{activeSlideIndex + 1}
                  </h3>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleDuplicateSlide(activeSlideIndex)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                    title="Duplicate this slide"
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSlide(activeSlideIndex)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete this slide"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Media URL */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5 flex items-center justify-between">
                  <span>Slide Background Media URL (Photo or Video)</span>
                  <ImageIcon size={14} className="text-clea-coral" />
                </label>
                <input
                  type="text"
                  value={activeSlide.mediaUrl}
                  onChange={(e) => updateActiveSlide({ mediaUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 bg-clea-bg rounded-xl border border-clea-border text-xs text-stone-700 focus:outline-none focus:border-clea-coral"
                />
              </div>

              {/* Headline & Badge */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-600 mb-1">
                    Top Badge (Optional)
                  </label>
                  <input
                    type="text"
                    value={activeSlide.badge || ''}
                    onChange={(e) => updateActiveSlide({ badge: e.target.value })}
                    placeholder="e.g. NEW FEATURE"
                    className="w-full px-3 py-2 bg-clea-bg rounded-xl border border-clea-border text-xs font-bold text-clea-charcoal focus:outline-none focus:border-clea-coral"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Slide Headline Title
                  </label>
                  <input
                    type="text"
                    value={activeSlide.title || ''}
                    onChange={(e) => updateActiveSlide({ title: e.target.value })}
                    placeholder="e.g. 3-Angle Facial Scan"
                    className="w-full px-3.5 py-2 bg-clea-bg rounded-xl border border-clea-border text-xs font-bold text-clea-charcoal focus:outline-none focus:border-clea-coral"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Description Subtitle
                </label>
                <textarea
                  rows={2}
                  value={activeSlide.subtitle || ''}
                  onChange={(e) => updateActiveSlide({ subtitle: e.target.value })}
                  placeholder="Explain the skin benefit, active combination, or diagnostic step..."
                  className="w-full p-3 bg-clea-bg rounded-xl border border-clea-border text-xs text-stone-700 focus:outline-none focus:border-clea-coral"
                />
              </div>

              {/* CTA Action Configuration */}
              <div className="p-4 rounded-xl bg-clea-bg border border-clea-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-clea-charcoal flex items-center gap-1.5">
                    <Sparkles size={14} className="text-clea-coral" />
                    Interactive Call-to-Action (CTA Button)
                  </span>
                  <span className="text-[10px] text-stone-400">Triggers mobile app action</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={activeSlide.ctaText || ''}
                      onChange={(e) => updateActiveSlide({ ctaText: e.target.value })}
                      placeholder="e.g. Start Face Scan"
                      className="w-full px-3 py-2 bg-white rounded-xl border border-clea-border text-xs font-bold text-clea-charcoal focus:outline-none focus:border-clea-coral"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-600 mb-1">
                      Action Type
                    </label>
                    <select
                      value={activeSlide.ctaAction || 'scan'}
                      onChange={(e) =>
                        updateActiveSlide({
                          ctaAction: e.target.value as StoryCtaAction,
                        })
                      }
                      className="w-full bg-white border border-clea-border text-xs font-bold text-clea-charcoal px-3 py-2 rounded-xl focus:outline-none focus:border-clea-coral"
                    >
                      <option value="scan">Launch Face Camera Scan</option>
                      <option value="product">Launch Barcode Product Scanner</option>
                      <option value="article">Open Linked Article</option>
                      <option value="external">Open External Web Link</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Sliders: Duration & Dark Overlay */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-600 mb-1.5">
                    <span>Slide Timer Duration</span>
                    <span className="font-bold text-clea-coral">{activeSlide.duration || 5}s</span>
                  </div>
                  <input
                    type="range"
                    min={3}
                    max={12}
                    value={activeSlide.duration || 5}
                    onChange={(e) => updateActiveSlide({ duration: Number(e.target.value) })}
                    className="w-full accent-clea-coral cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>3 sec</span>
                    <span>12 sec</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-stone-600 mb-1.5">
                    <span>Dark Overlay Opacity</span>
                    <span className="font-bold text-clea-coral">
                      {activeSlide.overlayOpacity ?? 40}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={85}
                    value={activeSlide.overlayOpacity ?? 40}
                    onChange={(e) =>
                      updateActiveSlide({ overlayOpacity: Number(e.target.value) })
                    }
                    className="w-full accent-clea-coral cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-stone-400 mt-1">
                    <span>Clear (0%)</span>
                    <span>Dark (85%)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Phone Simulator (5 cols) */}
          <div className="lg:col-span-5 sticky top-28 flex flex-col items-center">
            <div className="mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">
                Live Interactive Simulator
              </span>
            </div>

            <StoryPhoneSimulator
              story={storyPreviewObject}
              activeSlideIndex={activeSlideIndex}
              onSlideChange={setActiveSlideIndex}
              autoPlay={false}
            />

            <p className="text-[11px] text-stone-400 text-center mt-3 max-w-xs">
              Click left/right halves of the phone screen or use playback controls below the phone to navigate slides.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
