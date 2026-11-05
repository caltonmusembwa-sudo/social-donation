import React from 'react';
import { SUCCESS_STORIES } from '../data/interactData';
import { X, Quote, Heart, CheckCircle2, Award, BookOpen, Utensils, Trophy } from 'lucide-react';

interface SuccessStoriesModalProps {
  onClose: () => void;
  onDonateClick: () => void;
}

export const SuccessStoriesModal: React.FC<SuccessStoriesModalProps> = ({
  onClose,
  onDonateClick,
}) => {
  const getIconForIndex = (idx: number) => {
    switch (idx) {
      case 0: return Trophy;
      case 1: return Utensils;
      default: return BookOpen;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-amber-50/70">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-700" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Community Impact Dispatches
              </span>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Stories of Hope from Local Classrooms
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stories List (No external images) */}
        <div className="p-6 overflow-y-auto space-y-8">
          {SUCCESS_STORIES.map((story, idx) => {
            const Icon = getIconForIndex(idx);
            return (
              <article key={story.id} className="p-6 bg-stone-50 border border-stone-200 rounded-2xl space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                  
                  {/* Photo or Graphic Emblem */}
                  <div className="sm:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden shadow-xs border border-stone-200 bg-stone-100">
                    {story.image ? (
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-amber-700 to-stone-900 p-5 flex flex-col justify-between text-white">
                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-amber-300">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider block">
                            Story 0{idx + 1}
                          </span>
                          <span className="font-bold text-xs font-serif text-white">
                            {story.school}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="sm:col-span-8 space-y-2">
                    <span className="text-[10px] font-bold uppercase text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                      {story.school}
                    </span>
                    <h4 className="text-lg font-bold text-stone-900 font-serif">
                      {story.title}
                    </h4>
                    <div className="text-xs text-stone-500 font-medium">
                      Reported by {story.author} ({story.role})
                    </div>
                    <div className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded inline-block">
                      ✓ {story.impact}
                    </div>
                  </div>

                </div>

                <div className="border-l-2 border-amber-500 pl-4 text-xs sm:text-sm italic text-stone-700 font-serif bg-white p-3 rounded-r-lg">
                  "{story.quote}"
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed whitespace-pre-line">
                  {story.fullStory}
                </p>
              </article>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Every story was made possible by community members pledging learning supplies.
          </span>
          <button
            onClick={() => {
              onClose();
              onDonateClick();
            }}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 hover:-translate-y-0.5"
          >
            <Heart className="w-3.5 h-3.5 fill-white" />
            <span>Pledge Supplies for Students</span>
          </button>
        </div>

      </div>
    </div>
  );
};
