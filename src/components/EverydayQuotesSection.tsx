import React, { useState, useEffect } from 'react';
import { 
  DAILY_INSPIRATIONAL_QUOTES 
} from '../data/interactData';
import { DailyInspirationalQuote, QuoteTransitionMode } from '../types/interactClub';
import { 
  Quote, Play, Pause, ChevronLeft, ChevronRight, Share2, 
  Copy, Check, Sparkles, MessageCircle, Heart, Maximize2, X, RefreshCw 
} from 'lucide-react';

interface EverydayQuotesSectionProps {
  onPledgeClick: () => void;
}

export const EverydayQuotesSection: React.FC<EverydayQuotesSectionProps> = ({
  onPledgeClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTransition, setActiveTransition] = useState<QuoteTransitionMode>('zoom');
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [animatingKey, setAnimatingKey] = useState(0);
  const [hasCopied, setHasCopied] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentQuote: DailyInspirationalQuote = DAILY_INSPIRATIONAL_QUOTES[currentIndex];

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      handleNext();
    }, 7000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % DAILY_INSPIRATIONAL_QUOTES.length);
    setAnimatingKey((k) => k + 1);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + DAILY_INSPIRATIONAL_QUOTES.length) % DAILY_INSPIRATIONAL_QUOTES.length);
    setAnimatingKey((k) => k + 1);
  };

  const handleSelectQuote = (index: number) => {
    setCurrentIndex(index);
    setAnimatingKey((k) => k + 1);
  };

  const handleChangeTransition = (mode: QuoteTransitionMode) => {
    setActiveTransition(mode);
    setAnimatingKey((k) => k + 1);
  };

  const handleCopyQuote = (quote: DailyInspirationalQuote) => {
    const text = `"${quote.quote}" — ${quote.author}\n${quote.subtext}\n\nSupport PEAS Uganda & O&U Interact at: https://ouinteract.org`;
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  // Map transition to CSS animation class
  const getAnimationClass = () => {
    switch (activeTransition) {
      case 'zoom':
        return 'animate-quote-zoom';
      case 'flip':
        return 'animate-quote-flip';
      case 'slide':
        return 'animate-quote-slide';
      case 'bounce':
        return 'animate-quote-bounce';
      default:
        return 'animate-quote-zoom';
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-900 text-white relative overflow-hidden border-b border-stone-800">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-amber-500/30 blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="w-full h-full bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:28px_28px] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Top Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-800">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Everyday Words of Compassion &amp; Grace</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-mono">
                Daily Inspiration
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white tracking-tight">
              Words That Move Our Hearts to Action
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Every day, our students, teachers, and Rotary supporters draw strength from timeless reminders that even the smallest act of service transforms a life.
            </p>
          </div>

          {/* Interactive Transition & Animation Selector */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-bold mr-1 hidden sm:inline">
              Animation Style:
            </span>
            <div className="flex items-center bg-stone-950/80 p-1 rounded-xl border border-stone-700/80 text-xs">
              <button
                onClick={() => handleChangeTransition('zoom')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  activeTransition === 'zoom' 
                    ? 'bg-amber-500 text-stone-950 shadow-xs' 
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Fade & Zoom transition"
              >
                Zoom
              </button>
              <button
                onClick={() => handleChangeTransition('flip')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  activeTransition === 'flip' 
                    ? 'bg-amber-500 text-stone-950 shadow-xs' 
                    : 'text-stone-300 hover:text-white'
                }`}
                title="3D Flip transition"
              >
                3D Flip
              </button>
              <button
                onClick={() => handleChangeTransition('slide')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  activeTransition === 'slide' 
                    ? 'bg-amber-500 text-stone-950 shadow-xs' 
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Slide & Float transition"
              >
                Slide
              </button>
              <button
                onClick={() => handleChangeTransition('bounce')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  activeTransition === 'bounce' 
                    ? 'bg-amber-500 text-stone-950 shadow-xs' 
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Spring Bounce transition"
              >
                Bounce
              </button>
            </div>
          </div>
        </div>

        {/* Featured Dynamic Quote Showcase Card */}
        <div className="relative">
          <div 
            key={`${currentQuote.id}-${animatingKey}`}
            className={`bg-stone-950/90 border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md overflow-hidden ${getAnimationClass()}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Authentic Quote Poster Image with Preview Lightbox Trigger */}
              <div className="lg:col-span-5 relative group">
                <div 
                  className="relative aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden border-2 border-stone-700/80 shadow-2xl group-hover:border-amber-400/80 transition-all duration-300 cursor-pointer"
                  onClick={() => setLightboxImage(currentQuote.imageUrl)}
                >
                  <img
                    src={currentQuote.imageUrl}
                    alt={currentQuote.quote}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Subtle Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Floating Action Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-md ${currentQuote.badgeColor}`}>
                      <Heart className="w-3 h-3 fill-current" />
                      <span>{currentQuote.dayLabel}</span>
                    </span>
                  </div>

                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-stone-900/90 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>Expand Poster</span>
                  </div>
                </div>

                {/* Reflection accent glow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-6 bg-amber-500/20 blur-xl rounded-full" />
              </div>

              {/* Right Column: Quote Text, Attribution, Meaning & Direct Share Launchers */}
              <div className="lg:col-span-7 space-y-6">
                
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 bg-stone-800/80 border border-stone-700 px-3 py-1 rounded-full text-xs font-semibold text-amber-300">
                    <Quote className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentQuote.badge}</span>
                  </div>

                  {/* The Quote Statement */}
                  <blockquote className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white leading-snug">
                    "{currentQuote.quote}"
                  </blockquote>
                </div>

                {/* Author & Context Attribution */}
                <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 space-y-1">
                  <div className="font-bold text-base text-amber-300 font-serif">
                    {currentQuote.author}
                  </div>
                  <div className="text-xs text-stone-400 font-medium">
                    {currentQuote.roleOrContext}
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 pt-1 leading-relaxed">
                    {currentQuote.subtext}
                  </p>
                </div>

                {/* Action Buttons: WhatsApp Share, Copy, Pledge */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `✨ Everyday Quote from O&U Interact:\n\n"${currentQuote.quote}"\n— ${currentQuote.author}\n\n${currentQuote.subtext}\n\nExplore our 100% non-monetary supply drive for PEAS partner schools: https://ouinteract.org`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-white" />
                    <span>Share on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => handleCopyQuote(currentQuote)}
                    className="px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 rounded-xl font-bold text-xs transition-all flex items-center gap-2 hover:-translate-y-0.5"
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-stone-400" />
                        <span>Copy Quote</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={onPledgeClick}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 hover:-translate-y-0.5"
                  >
                    <span>Pledge Supplies Today</span>
                  </button>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Carousel Navigation Toolbar & 4 Thumbnails */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          
          {/* Thumbnails of the 4 uploaded quotes */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 max-w-full">
            {DAILY_INSPIRATIONAL_QUOTES.map((item, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectQuote(idx)}
                  className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-2xl border transition-all text-left ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400 text-white ring-2 ring-amber-400/40'
                      : 'bg-stone-950/60 border-stone-800 text-stone-400 hover:text-stone-200 hover:border-stone-700'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-stone-700">
                    <img
                      src={item.imageUrl}
                      alt={item.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="text-[11px] font-bold text-stone-200 truncate max-w-[130px]">
                      {item.author.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-amber-400 font-mono">
                      {item.dayLabel.split(' ')[0]}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Controls: Prev, Play/Pause, Next */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              title="Previous Quote"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAutoPlaying 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                  : 'bg-stone-800 text-stone-400 border border-stone-700'
              }`}
              title={isAutoPlaying ? 'Pause rotation' : 'Resume rotation'}
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Autoplay ON</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Paused</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              className="w-9 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              title="Next Quote"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

      {/* Lightbox Modal to View High-Resolution Quote Poster */}
      {lightboxImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div 
            className="relative max-w-lg w-full max-h-[90vh] flex flex-col items-center animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors"
              title="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-3xl overflow-hidden border border-stone-700 shadow-2xl max-h-[80vh]">
              <img
                src={lightboxImage}
                alt="Everyday Quote Poster Full View"
                className="w-full h-full object-contain max-h-[80vh]"
              />
            </div>
            
            <p className="text-stone-300 text-xs text-center mt-3">
              Tap anywhere outside or press Close to dismiss
            </p>
          </div>
        </div>
      )}

    </section>
  );
};
