import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, ExternalLink, QrCode, ScanFace } from 'lucide-react';
import type { Story, StorySlide } from '@/types';

interface StoryPhoneSimulatorProps {
  story?: Story | null;
  activeSlideIndex?: number;
  onSlideChange?: (index: number) => void;
  autoPlay?: boolean;
}

export const StoryPhoneSimulator: React.FC<StoryPhoneSimulatorProps> = ({
  story,
  activeSlideIndex = 0,
  onSlideChange,
  autoPlay = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(activeSlideIndex);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0); // 0 to 100
  const progressTimerRef = useRef<number | null>(null);

  const slides: StorySlide[] = story?.slides?.length
    ? story.slides
    : [
        {
          id: 'preview-1',
          mediaUrl:
            'https://images.unsplash.com/photo-1512290900672-1f41d916e788?q=80&w=800&auto=format&fit=crop',
          mediaType: 'image',
          duration: 5,
          badge: 'PREVIEW',
          title: 'Skin Analysis Protocol',
          subtitle: 'Real-time interactive preview of your story inside the mobile application.',
          ctaText: 'Start Face Scan',
          ctaAction: 'scan',
          textColor: 'white',
          overlayOpacity: 45,
        },
      ];

  const currentSlide = slides[currentIndex] || slides[0];

  useEffect(() => {
    setCurrentIndex(activeSlideIndex);
    setProgress(0);
  }, [activeSlideIndex]);

  // Timer loop for autoPlay
  useEffect(() => {
    if (!isPlaying) {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    const durationSeconds = currentSlide?.duration || 5;
    const intervalMs = 50;
    const step = 100 / ((durationSeconds * 1000) / intervalMs);

    progressTimerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next slide
          if (currentIndex < slides.length - 1) {
            const nextIdx = currentIndex + 1;
            setCurrentIndex(nextIdx);
            onSlideChange?.(nextIdx);
            return 0;
          } else {
            // Loop or stop
            setIsPlaying(false);
            return 100;
          }
        }
        return prev + step;
      });
    }, intervalMs);

    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, [isPlaying, currentIndex, currentSlide, slides.length, onSlideChange]);

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setProgress(0);
      onSlideChange?.(prevIdx);
    } else {
      setProgress(0);
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (currentIndex < slides.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setProgress(0);
      onSlideChange?.(nextIdx);
    } else {
      setProgress(100);
      setIsPlaying(false);
    }
  };

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsPlaying(!isPlaying);
  };

  const renderCtaIcon = () => {
    switch (currentSlide.ctaAction) {
      case 'scan':
        return <ScanFace size={16} className="text-white" />;
      case 'product':
        return <QrCode size={16} className="text-white" />;
      default:
        return <ExternalLink size={15} className="text-white" />;
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Simulator Device Frame */}
      <div className="relative w-[340px] h-[680px] bg-stone-900 rounded-[50px] p-3 shadow-2xl ring-1 ring-stone-800/80 select-none">
        {/* Exterior Bezel Details */}
        <div className="relative w-full h-full bg-black rounded-[40px] overflow-hidden flex flex-col justify-between">
          {/* Background Media */}
          <div className="absolute inset-0 z-0 bg-stone-800">
            {currentSlide.mediaUrl ? (
              <img
                src={currentSlide.mediaUrl}
                alt={currentSlide.title || 'Slide background'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-clea-coral via-clea-sun to-amber-200 flex items-center justify-center text-white/50">
                <Sparkles size={48} />
              </div>
            )}

            {/* Gradient & Darkness Overlay */}
            <div
              className="absolute inset-0 bg-black pointer-events-none transition-opacity"
              style={{ opacity: (currentSlide.overlayOpacity ?? 40) / 100 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />
          </div>

          {/* Top System Bar & Story Progress Bars */}
          <div className="relative z-10 pt-3 px-4">
            {/* Dynamic Island / Speaker */}
            <div className="flex items-center justify-between mb-3 px-1 text-white text-[11px] font-semibold">
              <span>9:41</span>
              <div className="w-20 h-4 bg-black rounded-full mx-auto" />
              <div className="flex items-center gap-1">
                <span className="text-[10px]">5G</span>
                <div className="w-5 h-2.5 border border-white/60 rounded-sm p-[1px]">
                  <div className="w-full h-full bg-white rounded-xs"></div>
                </div>
              </div>
            </div>

            {/* Segmented Progress Bars */}
            <div className="flex items-center gap-1.5 mb-2">
              {slides.map((_, idx) => {
                let fillPercent = 0;
                if (idx < currentIndex) fillPercent = 100;
                else if (idx === currentIndex) fillPercent = progress;

                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setProgress(0);
                      onSlideChange?.(idx);
                    }}
                    className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden cursor-pointer backdrop-blur-xs"
                  >
                    <div
                      className="h-full bg-white transition-all duration-75"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* Author / Category Top Meta */}
            <div className="flex items-center justify-between pt-1 text-white">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-clea-coral to-clea-sun flex items-center justify-center text-[10px] font-bold text-white shadow-sm ring-1 ring-white/40">
                  C
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight drop-shadow-sm">
                    {story?.title || 'Clea Diagnostic'}
                  </p>
                  <p className="text-[10px] text-white/75 font-medium">
                    {story?.category || 'Daily Skin Care'}
                  </p>
                </div>
              </div>

              <div className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md">
                {currentIndex + 1} / {slides.length}
              </div>
            </div>
          </div>

          {/* Mid Touch Interaction Zone */}
          <div className="relative z-10 flex-1 grid grid-cols-2">
            <div
              onClick={handlePrev}
              className="h-full cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
              title="Previous slide"
            />
            <div
              onClick={handleNext}
              className="h-full cursor-pointer hover:bg-white/5 active:bg-white/10 transition-colors"
              title="Next slide"
            />
          </div>

          {/* Bottom Content Area */}
          <div className="relative z-10 p-5 pb-8 space-y-3 pointer-events-none">
            {/* Badge */}
            {currentSlide.badge && (
              <span className="inline-block px-2.5 py-1 rounded-full bg-clea-coral text-white text-[10px] font-extrabold uppercase tracking-wider shadow-sm">
                {currentSlide.badge}
              </span>
            )}

            {/* Slide Title */}
            {currentSlide.title && (
              <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow-md">
                {currentSlide.title}
              </h3>
            )}

            {/* Slide Subtitle */}
            {currentSlide.subtitle && (
              <p className="text-xs text-white/90 leading-relaxed font-medium drop-shadow-sm line-clamp-3">
                {currentSlide.subtitle}
              </p>
            )}

            {/* Interactive CTA Button */}
            {currentSlide.ctaText && (
              <div className="pt-2">
                <div className="pointer-events-auto flex items-center justify-center gap-2 w-full py-3 px-4 rounded-full bg-clea-coral text-white text-xs font-bold shadow-clea-coral cursor-pointer hover:bg-clea-coral-hover active:scale-[0.98] transition-all">
                  {renderCtaIcon()}
                  <span>{currentSlide.ctaText}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Simulator Playback Controls */}
      <div className="mt-4 flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-clea-border shadow-clea-sm">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 disabled:opacity-30 transition-all"
          title="Previous slide"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          type="button"
          onClick={togglePlay}
          className="p-2 rounded-xl bg-clea-coral text-white shadow-clea-sm hover:bg-clea-coral-hover transition-all"
          title={isPlaying ? 'Pause auto-play' : 'Play auto-play'}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentIndex >= slides.length - 1}
          className="p-1.5 rounded-lg text-stone-600 hover:bg-stone-100 disabled:opacity-30 transition-all"
          title="Next slide"
        >
          <ChevronRight size={18} />
        </button>

        <span className="text-xs font-bold text-stone-500 ml-1">
          {currentIndex + 1} of {slides.length}
        </span>
      </div>
    </div>
  );
};
