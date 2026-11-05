import React from 'react';
import { PackageCheck, School, ArrowRight, Sparkles, CheckCircle2, Shield, Radio, Volume2 } from 'lucide-react';

interface HeroSectionProps {
  onPledgeClick: () => void;
  onPartnerSchoolsClick: () => void;
  onViewAdsClick: () => void;
  onViewProposalClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPledgeClick,
  onPartnerSchoolsClick,
  onViewAdsClick,
  onViewProposalClick,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-white min-h-[520px] flex items-center">
      
      {/* Background with welcoming pulse glows */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-8 border-amber-500/30 blur-2xl animate-pulse-glow" />
        <div className="absolute bottom-0 -left-24 w-80 h-80 rounded-full border-8 border-emerald-500/20 blur-2xl animate-pulse-glow" />
        <div className="w-full h-full bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Narrative with Welcoming Staggered Animations */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Welcoming Greeting Pill */}
            <div className="animate-welcome flex flex-wrap items-center gap-2 text-xs font-semibold text-amber-300">
              <span className="flex items-center gap-1.5 uppercase tracking-wider bg-amber-500/20 px-3 py-1.5 rounded-full border border-amber-500/30 shadow-xs">
                <span className="animate-pulse">👋</span>
                <span>Welcome to O&amp;U Interact</span>
              </span>
              <span aria-hidden="true" className="text-amber-500/60 hidden sm:inline">·</span>
              <span className="text-stone-300">Onwards &amp; Upwards Secondary School</span>
              <span aria-hidden="true" className="text-amber-500/60 hidden sm:inline">·</span>
              <span className="text-emerald-400 font-medium">100% Non-Monetary Supply Drive</span>
            </div>

            {/* Main Headline with Welcoming Slide Up */}
            <h1 className="animate-welcome-delayed-1 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white font-serif leading-[1.12]">
              Every Child Thrives When a Community Cares.
            </h1>

            {/* Sub-headline */}
            <p className="animate-welcome-delayed-1 text-base sm:text-lg text-stone-200 leading-relaxed font-normal max-w-2xl">
              We partner directly with local school communities to turn community material donations into real, immediate support—from nutritious meals to essential backpacks and books. Zero money or billing involved.
            </p>

            {/* Welcoming Interactive CTAs */}
            <div className="animate-welcome-delayed-2 pt-2 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onPledgeClick}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm sm:text-base active:scale-95 hover:-translate-y-0.5 duration-200"
              >
                <PackageCheck className="w-5 h-5 text-stone-950" />
                <span>Pledge Supplies for a Child</span>
              </button>

              <button
                onClick={onViewAdsClick}
                className="bg-emerald-600/90 hover:bg-emerald-600 text-white font-bold px-5 py-3.5 rounded-xl backdrop-blur-xs transition-all flex items-center justify-center gap-2 text-sm hover:-translate-y-0.5 duration-200 border border-emerald-500/30 shadow-sm"
              >
                <Volume2 className="w-4 h-4 text-emerald-200" />
                <span>Spotify &amp; YouTube Ads Studio</span>
              </button>

              <button
                onClick={onPartnerSchoolsClick}
                className="bg-white/10 hover:bg-white/20 border border-white/25 text-white font-medium px-4 py-3.5 rounded-xl backdrop-blur-xs transition-all flex items-center justify-center gap-2 text-sm hover:-translate-y-0.5 duration-200"
              >
                <School className="w-4 h-4 text-amber-300" />
                <span>See Partner Schools</span>
                <ArrowRight className="w-4 h-4 text-white/70" />
              </button>
            </div>

            {/* Trust points */}
            <div className="animate-welcome-delayed-2 pt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-stone-300 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero Money / Zero Billing
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Direct School Drop-off or Van Pickup
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Led by Project Mgr Musembwa Calton &amp; Pres. Hagenimana Rasul
              </span>
            </div>

          </div>

          {/* Right Column: Floating Crest Plaque with Gentle Floating Animation */}
          <div className="lg:col-span-4 animate-welcome-delayed-2">
            <div className="animate-float-gentle bg-stone-900/90 border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md space-y-5 transition-all duration-300 hover:border-amber-400/60">
              
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>O&amp;U High School Chapter</span>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
                  Active Drive 2026
                </span>
              </div>

              {/* Official School Logo & Crest */}
              <div className="text-center py-2 space-y-3">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-white p-1.5 shadow-2xl border-4 border-red-500 mx-auto transform hover:scale-105 transition-transform duration-300">
                    <img
                      src="/assets/aistudio/onwards_e90da280.jpg"
                      alt="Onwards and Upwards Secondary School Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white font-serif">
                    Onwards and Upwards Secondary School
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mt-0.5">
                    Interact Club · Celebrating Achievements
                  </p>
                </div>

                {/* Photo in action preview */}
                <div className="rounded-2xl overflow-hidden border border-white/20 shadow-md aspect-[16/9] w-full">
                  <img
                    src="/assets/aistudio/Screenshot_2026-11-04_120047_4b1e5d1b.png"
                    alt="Our People in Action"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Executive Sign-off Plaque */}
              <div className="bg-stone-950/80 rounded-2xl p-4 border border-stone-800 space-y-2 text-xs">
                <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                  Official Leadership Team:
                </div>
                <div className="flex items-center justify-between text-stone-200">
                  <span>Project Manager:</span>
                  <strong className="text-white">MUSEMBWA CALTON</strong>
                </div>
                <div className="flex items-center justify-between text-stone-200">
                  <span>Club President:</span>
                  <strong className="text-white">HAGENIMANA RASUL</strong>
                </div>
                <div className="flex items-center justify-between text-stone-200">
                  <span>Patron Advisor:</span>
                  <span className="text-stone-300">Patron David Semakula</span>
                </div>
              </div>

              <div className="p-3 bg-amber-950/40 border border-amber-600/30 rounded-xl text-[11px] text-amber-200/90 text-center">
                ✨ Material donations can be dropped off directly at Room B-12 during school hours.
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
