import React from 'react';
import { Heart } from 'lucide-react';

export const LiveImpactTracker: React.FC = () => {
  return (
    <section className="bg-amber-50/80 border-y border-amber-200/70 py-6 sm:py-8 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Anti-slop clean live metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-amber-200/80">
          
          {/* Stat 1: 4,500+ Children Equipped */}
          <div className="flex items-center gap-3.5 px-3 pt-3 md:pt-0 hover:-translate-y-1 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl" role="img" aria-label="Backpack">
              🎒
            </span>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
                4,500+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Children Equipped for School
              </div>
            </div>
          </div>

          {/* Stat 2: 12,000+ Nutritious Meals */}
          <div className="flex items-center gap-3.5 px-3 pt-3 md:pt-0 hover:-translate-y-1 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl" role="img" aria-label="Apple">
              🍎
            </span>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
                12,000+
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Nutritious Meals Provided
              </div>
            </div>
          </div>

          {/* Stat 3: 18 Local Partner Schools */}
          <div className="flex items-center gap-3.5 px-3 pt-3 md:pt-0 hover:-translate-y-1 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl" role="img" aria-label="School">
              🏫
            </span>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif tracking-tight">
                18
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Local Partner Schools
              </div>
            </div>
          </div>

          {/* Stat 4: 100% Direct to Child Programs */}
          <div className="flex items-center gap-3.5 px-3 pt-3 md:pt-0 hover:-translate-y-1 transition-transform duration-300">
            <span className="text-3xl sm:text-4xl" role="img" aria-label="Sparkling Heart">
              💖
            </span>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-serif tracking-tight">
                100%
              </div>
              <div className="text-xs sm:text-sm font-medium text-stone-600">
                Direct to Child Programs
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
