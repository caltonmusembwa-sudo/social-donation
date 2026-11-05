import React from 'react';
import { ClipboardList, ShieldCheck, Truck, Sparkles } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>The School-Community Partnership</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 font-serif">
            How Community Material Pledges Create Impact
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            A transparent, direct-delivery model engineered by the Interact Club of O&amp;U High School to ensure every notebook, backpack, and meal reaches a real student desk.
          </p>
        </div>

        {/* 3-Step Icon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden md:block absolute top-1/3 left-1/6 right-1/6 h-0.5 bg-stone-200 -z-0" />

          {/* Step 1 */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-2xs hover:shadow-sm transition-all relative z-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-100/80 text-amber-800 flex items-center justify-center shadow-xs">
                <ClipboardList className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">
                  Step 01
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-serif mt-1">
                  Schools Identify the Need
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Teachers and school heads tell us exactly what their students lack—whether it's uniforms, scholastic materials, backpacks, or nutritious mid-day snacks.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span>Verified school priority list</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-2xs hover:shadow-sm transition-all relative z-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center shadow-xs">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                  Step 02
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-serif mt-1">
                  You Pledge Physical Supplies
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Pledge tangible student supplies (backpacks, meals, uniforms) and choose your preferred handover method (school drop-off or volunteer pickup). Zero billing involved.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>100% non-monetary supply handover</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl p-7 border border-stone-200 shadow-2xs hover:shadow-sm transition-all relative z-10 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-100/80 text-sky-800 flex items-center justify-center shadow-xs">
                <Truck className="w-7 h-7" />
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700">
                  Step 03
                </span>
                <h3 className="text-lg font-bold text-stone-900 font-serif mt-1">
                  Children Get What They Need
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                We deliver supplies and meal consignments directly to partner schools with teacher verification, ensuring no child falls through the cracks.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 text-[11px] text-stone-500 font-medium flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span>Photographic proof &amp; receipts</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
