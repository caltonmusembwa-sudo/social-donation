import React from 'react';
import { Quote, ArrowRight, Award, Heart, Trophy, School } from 'lucide-react';
import { SUCCESS_STORIES } from '../data/interactData';

interface SpotlightStoryProps {
  onReadMoreClick: () => void;
}

export const SpotlightStory: React.FC<SpotlightStoryProps> = ({
  onReadMoreClick,
}) => {
  const mainStory = SUCCESS_STORIES[0];

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Anti-slop clean unboxed card with zero external images */}
        <div className="bg-gradient-to-br from-amber-50/60 via-stone-50 to-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Story Photograph with Verified Field Impact Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-stone-200 shadow-lg group">
                <img
                  src="/assets/aistudio/images__1__9b1711cc.jpg"
                  alt="Coach Marcus and student athlete smiling proudly"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex flex-col justify-between p-5 text-white">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest bg-emerald-600 text-white px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <Heart className="w-3 h-3 fill-white" />
                      <span>Verified Field Impact</span>
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <div className="font-bold text-sm text-white font-serif">
                      Coach Marcus &amp; Student Athlete
                    </div>
                    <div className="text-[11px] text-amber-300 font-mono">
                      Riverdale Track Team &amp; O&amp;U Interact Footwear Drive
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Story Text & Quote */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Community Spotlight Story</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 font-serif leading-tight">
                "{mainStory.title}"
              </h2>

              <div className="relative pl-6 border-l-4 border-amber-600 text-stone-700">
                <Quote className="w-8 h-8 text-amber-300 absolute -left-4 -top-3 -z-10 opacity-70" />
                <p className="text-base sm:text-lg italic leading-relaxed text-stone-800 font-serif">
                  "{mainStory.quote}"
                </p>
                <div className="mt-3 text-xs sm:text-sm font-semibold text-stone-900">
                  — {mainStory.author}, <span className="font-normal text-stone-600">{mainStory.role}, {mainStory.school}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Before this community footwear drive, five talented student runners shared one pair of torn shoes. Your supply pledges provided regulation athletic shoes and team socks, elevating their dignity and leading them to district championship trials.
              </p>

              <div className="pt-2">
                <button
                  onClick={onReadMoreClick}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-900 hover:text-amber-700 bg-amber-100 hover:bg-amber-200/80 px-4 py-2.5 rounded-xl transition-all shadow-2xs group"
                >
                  <span>Read More Success Stories</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
