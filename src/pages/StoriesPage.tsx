import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  PlusCircle,
  Eye,
  Trash2,
  Edit3,
  Play,
  CheckCircle2,
  Clock,
  X,
} from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { StoryPhoneSimulator } from '@/components/stories/StoryPhoneSimulator';
import { contentStore } from '@/services/contentStore';
import type { Story } from '@/types';

export const StoriesPage: React.FC = () => {
  const [stories, setStories] = useState<Story[]>(contentStore.getStories());
  const [previewStory, setPreviewStory] = useState<Story | null>(null);

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete story: "${title}"?`)) {
      contentStore.deleteStory(id);
      setStories(contentStore.getStories());
      if (previewStory?.id === id) setPreviewStory(null);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 pb-16">
      <Header
        title="Stories Builder"
        subtitle="Create dynamic, interactive multi-slide micro-content with call-to-actions (scan, barcode, catalog)."
        actions={
          <Link
            to="/stories/new"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all shadow-clea-coral"
          >
            <PlusCircle size={16} />
            <span>Create Story</span>
          </Link>
        }
      />

      <main className="px-8 pt-8 space-y-6 max-w-7xl">
        {/* Banner Info */}
        <div className="bg-gradient-to-r from-clea-coral-light via-white to-amber-50 p-6 rounded-3xl border border-clea-coral-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-clea-coral text-white flex items-center justify-center shadow-clea-coral shrink-0">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-clea-charcoal tracking-tight">
                Stories Drive 4.2x Higher Daily Engagement
              </h2>
              <p className="text-xs text-stone-600 mt-0.5">
                Each story can include up to 10 slides with CTA buttons that immediately launch camera diagnostics or open product details in Clea.
              </p>
            </div>
          </div>
          <Link
            to="/stories/new"
            className="px-4 py-2.5 rounded-xl bg-clea-coral text-white text-xs font-bold hover:bg-clea-coral-hover transition-all shrink-0"
          >
            Launch Builder
          </Link>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="bg-white rounded-3xl border border-clea-border shadow-clea-sm hover:shadow-clea transition-all overflow-hidden flex flex-col justify-between group"
            >
              {/* Card Header / Preview Area */}
              <div className="relative h-56 bg-stone-900 overflow-hidden">
                <img
                  src={story.coverImage}
                  alt={story.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
                    {story.slides.length} slides
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/80 text-stone-800 backdrop-blur-xs">
                    {story.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  {story.status === 'active' ? (
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500 text-white shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                      Active in App
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500 text-white flex items-center gap-1">
                      <Clock size={11} />
                      Scheduled
                    </span>
                  )}
                </div>

                {/* Center Hover Preview Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                  <button
                    type="button"
                    onClick={() => setPreviewStory(story)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-clea-charcoal text-xs font-bold shadow-lg hover:scale-105 transition-transform"
                  >
                    <Play size={14} className="fill-clea-coral text-clea-coral" />
                    <span>Live Simulator</span>
                  </button>
                </div>

                {/* Bottom Title on Image */}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-extrabold text-base leading-tight drop-shadow-sm">
                    {story.title}
                  </h3>
                </div>
              </div>

              {/* Card Footer Meta */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span className="flex items-center gap-1.5">
                    <Eye size={14} className="text-stone-400" />
                    <span className="font-bold text-clea-charcoal">{story.viewsCount}</span> views
                  </span>
                  <span className="font-semibold text-emerald-600">
                    {story.completionRate}% completion rate
                  </span>
                </div>

                {/* Slide Thumbnail Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
                  {story.slides.map((s, idx) => (
                    <div
                      key={s.id || idx}
                      className="w-10 h-14 rounded-lg overflow-hidden shrink-0 border border-clea-border bg-stone-100 relative group/slide"
                      title={s.title || `Slide ${idx + 1}`}
                    >
                      <img src={s.mediaUrl} alt="" className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 right-0 text-[8px] font-bold bg-black/70 text-white px-1 rounded-tl-md">
                        {idx + 1}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bottom Action Bar */}
                <div className="flex items-center justify-between pt-3 border-t border-clea-border">
                  <button
                    type="button"
                    onClick={() => setPreviewStory(story)}
                    className="text-xs font-bold text-stone-600 hover:text-clea-coral flex items-center gap-1"
                  >
                    <Play size={13} className="text-clea-coral" />
                    <span>Preview</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/stories/${story.id}/edit`}
                      className="px-3 py-1.5 rounded-xl bg-clea-bg border border-clea-border text-xs font-bold text-clea-charcoal hover:border-clea-coral hover:text-clea-coral transition-all flex items-center gap-1"
                    >
                      <Edit3 size={13} />
                      <span>Edit Slides</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(story.id, story.title)}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Story"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Simulator Modal Popup */}
      {previewStory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setPreviewStory(null)}
              className="absolute -top-12 right-0 md:-right-12 p-2 rounded-full bg-white/20 text-white hover:bg-white/40 transition-colors"
              title="Close Simulator"
            >
              <X size={20} />
            </button>
            <StoryPhoneSimulator story={previewStory} autoPlay={true} />
          </div>
        </div>
      )}
    </div>
  );
};
