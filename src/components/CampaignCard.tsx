import React from 'react';
import { Campaign, CurrencyCode } from '../types/donation';
import { formatCurrency } from '../data/currencies';
import { MapPin, Users, CheckCircle2, Clock, ArrowUpRight, Heart } from 'lucide-react';

interface CampaignCardProps {
  campaign: Campaign;
  selectedCurrency: CurrencyCode;
  onSelect: (campaign: Campaign) => void;
  onDonate: (campaign: Campaign) => void;
}

export const CampaignCard: React.FC<CampaignCardProps> = ({
  campaign,
  selectedCurrency,
  onSelect,
  onDonate,
}) => {
  const percentage = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));

  const formatCategoryName = (cat: string) => {
    switch (cat) {
      case 'clean-water': return 'Clean Water';
      case 'education': return 'Education & STEM';
      case 'healthcare': return 'Rural Healthcare';
      case 'food-security': return 'Food Security';
      case 'climate': return 'Climate & Nature';
      case 'community': return 'Community Hub';
      default: return 'Community Cause';
    }
  };

  return (
    <article className="group bg-white rounded-xl border border-stone-200 overflow-hidden flex flex-col hover:border-stone-300 hover:shadow-md transition-all duration-200">
      
      {/* Cover Image */}
      <div className="relative aspect-video w-full overflow-hidden bg-stone-100 cursor-pointer" onClick={() => onSelect(campaign)}>
        <img
          src={campaign.coverImage}
          alt={campaign.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Quick urgent or featured indicator as quiet minimal corner tag */}
        {campaign.urgent && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded shadow-sm">
            Critical Need
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Clean Unboxed Metadata with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="font-medium text-emerald-800">{formatCategoryName(campaign.category)}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 text-stone-600">
              <MapPin className="w-3 h-3 text-stone-400" />
              {campaign.location}, {campaign.country}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelect(campaign)}
            className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition-colors line-clamp-2 cursor-pointer font-serif"
          >
            {campaign.title}
          </h3>

          {/* Tagline */}
          <p className="mt-2 text-xs sm:text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {campaign.tagline}
          </p>

          {/* Organizer */}
          <div className="mt-3.5 flex items-center gap-2 text-xs text-stone-600">
            <img
              src={campaign.organizer.avatarUrl}
              alt={campaign.organizer.name}
              className="w-6 h-6 rounded-full object-cover border border-stone-200"
            />
            <span className="font-medium text-stone-800 truncate">{campaign.organizer.name}</span>
            {campaign.organizer.verified && (
              <span title="Verified organizer">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              </span>
            )}
            <span className="text-stone-400">({campaign.organizer.organization})</span>
          </div>
        </div>

        {/* Progress & Funding Section */}
        <div className="mt-5 pt-4 border-t border-stone-100">
          
          {/* Progress Bar */}
          <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 100 ? 'bg-teal-500' : 'bg-emerald-600'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          {/* Stats breakdown */}
          <div className="mt-3 flex items-baseline justify-between text-xs">
            <div>
              <span className="text-base font-bold text-stone-900">
                {formatCurrency(campaign.currentAmount, selectedCurrency)}
              </span>
              <span className="text-stone-500 ml-1">
                raised of {formatCurrency(campaign.targetAmount, selectedCurrency)}
              </span>
            </div>
            <span className="font-semibold text-emerald-700">
              {percentage}%
            </span>
          </div>

          {/* Secondary stats: Beneficiaries & Days left */}
          <div className="mt-2 flex items-center justify-between text-[11px] text-stone-500">
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3 text-stone-400" />
              {campaign.beneficiariesCount.toLocaleString()} beneficiaries
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-stone-400" />
              {campaign.daysLeft > 0 ? `${campaign.daysLeft} days left` : 'Ending today'}
            </span>
          </div>

          {/* Actions */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              onClick={() => onSelect(campaign)}
              className="w-full py-2 px-3 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <span>View Story</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
            </button>

            <button
              onClick={() => onDonate(campaign)}
              className="w-full py-2 px-3 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>Donate</span>
            </button>
          </div>

        </div>

      </div>

    </article>
  );
};
