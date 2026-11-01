import React from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, Landmark, HeartHandshake, Eye, Sparkles } from 'lucide-react';

interface HowItWorksModalProps {
  onClose: () => void;
  onExplore: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({
  onClose,
  onExplore,
}) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
              Our 100% Direct Verification &amp; Trust Model
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-stone-700 text-xs sm:text-sm leading-relaxed">
          
          <div className="space-y-2">
            <h4 className="text-base font-bold text-stone-900 font-serif">
              How KindPulse Protects Every Contribution
            </h4>
            <p className="text-stone-600">
              Unlike traditional charities where massive administrative overhead dilutes donations, KindPulse links donors directly with vetted grassroots coordinators on the frontlines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                1
              </div>
              <h5 className="font-bold text-stone-900">
                Four-Tier Organizer Verification
              </h5>
              <p className="text-stone-600 text-xs">
                Every project leader submits official government NGO registration, bank KYC verification, local community elder endorsements, and previous project audits.
              </p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                2
              </div>
              <h5 className="font-bold text-stone-900">
                Milestone-Gated Fund Release
              </h5>
              <p className="text-stone-600 text-xs">
                Donations are held safely in fiduciary custody. Funds are unlocked in stages (e.g. drilling rig arrival, water testing) only after geo-tagged photographic evidence is reviewed.
              </p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                3
              </div>
              <h5 className="font-bold text-stone-900">
                Zero Platform Fee Deduction
              </h5>
              <p className="text-stone-600 text-xs">
                100% of your public donation goes straight to the project equipment, materials, and community field workers. Our platform hosting and tech costs are privately underwritten.
              </p>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
                4
              </div>
              <h5 className="font-bold text-stone-900">
                Instant Tax Deductibility
              </h5>
              <p className="text-stone-600 text-xs">
                Receive an official, timestamped tax-exempt receipt with authorization code instantly upon completing your gift via Card, Mobile Money, or Wire.
              </p>
            </div>

          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-emerald-950 text-xs">
            <div className="flex items-center gap-1.5 font-bold">
              <Eye className="w-4 h-4 text-emerald-700" />
              <span>Full Public Transparency</span>
            </div>
            <p>
              Project coordinators post live photographic updates directly to the programme page as wells are drilled, students receive laptops, and clinic fridges are turned on.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Questions? Contact audit@kindpulse.org
          </span>

          <button
            onClick={() => {
              onClose();
              onExplore();
            }}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all"
          >
            Explore Verified Programmes
          </button>
        </div>

      </div>
    </div>
  );
};
