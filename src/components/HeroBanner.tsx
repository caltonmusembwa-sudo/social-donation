import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../data/currencies';
import { CurrencyCode } from '../types/donation';

interface HeroBannerProps {
  onExploreClick: () => void;
  onStartCampaignClick: () => void;
  selectedCurrency: CurrencyCode;
  totalDonatedSoFarUSD: number;
  totalCampaignsCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onExploreClick,
  onStartCampaignClick,
  selectedCurrency,
  totalDonatedSoFarUSD,
  totalCampaignsCount,
}) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-stone-50 via-emerald-50/20 to-white border-b border-stone-200/80 pt-10 pb-12 sm:pt-16 sm:pb-16">
      
      {/* Subtle organic background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-emerald-100/30 via-teal-100/20 to-amber-100/30 blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Anti-slop kicker: clean unboxed text with subtle separator */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-emerald-800 mb-4">
          <span className="flex items-center gap-1.5 font-semibold tracking-wide uppercase text-xs text-emerald-700">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Transparent Grassroots Philanthropy
          </span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="text-stone-600">Direct Community Aid</span>
          <span aria-hidden="true" className="text-stone-300">·</span>
          <span className="text-stone-600">Zero Intermediary Fees</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Hero Message */}
          <div className="lg:col-span-7">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 font-serif leading-[1.18]">
              Where small acts of generosity build lasting community futures.
            </h1>
            
            <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
              Fund verified grassroots donation programmes providing clean drinking water, girls STEM education, rural solar clinics, and food security. Every dollar is tracked to specific milestones.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreClick}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-5 py-3 rounded-lg shadow-sm hover:shadow transition-all text-sm active:scale-95"
              >
                <span>Browse Programmes</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onStartCampaignClick}
                className="flex items-center gap-2 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 font-medium px-5 py-3 rounded-lg transition-all text-sm shadow-sm"
              >
                <HeartHandshake className="w-4 h-4 text-emerald-600" />
                <span>Start a Cause Programme</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="mt-8 pt-6 border-t border-stone-200/80 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-stone-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Verified Community Organizers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant Tax-Deductible Receipts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Card, M-Pesa &amp; Wire Support</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics & Transparency Highlights card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-7 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-stone-100">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Global Collective Giving Impact
                </span>
                <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Live Audited
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 py-5">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
                    {formatCurrency(totalDonatedSoFarUSD, selectedCurrency)}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 font-medium">
                    Funded Across Programmes
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
                    28,450+
                  </div>
                  <div className="text-xs text-stone-500 mt-1 font-medium">
                    Verified Beneficiaries
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-serif">
                    {totalCampaignsCount}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 font-medium">
                    Active Cause Initiatives
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 tracking-tight font-serif">
                    100%
                  </div>
                  <div className="text-xs text-stone-500 mt-1 font-medium">
                    Direct-to-Field Payouts
                  </div>
                </div>
              </div>

              <div className="p-3 bg-stone-50 rounded-xl text-xs text-stone-600 border border-stone-100 flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                <p>
                  <strong>Transparency Promise:</strong> Project teams publish photographic proof and ledger receipts at every construction and distribution milestone.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
