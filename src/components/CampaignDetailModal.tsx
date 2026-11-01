import React, { useState } from 'react';
import { Campaign, CurrencyCode, ImpactTier, DonorCheer } from '../types/donation';
import { formatCurrency } from '../data/currencies';
import { 
  X, MapPin, CheckCircle2, Clock, Users, ShieldCheck, Heart, 
  Share2, ArrowRight, Calendar, MessageSquare, ThumbsUp, DollarSign, ExternalLink, Check
} from 'lucide-react';

interface CampaignDetailModalProps {
  campaign: Campaign;
  onClose: () => void;
  onDonate: (campaign: Campaign, presetTier?: ImpactTier) => void;
  selectedCurrency: CurrencyCode;
  donorCheers: DonorCheer[];
  onAddCheer: (campaignId: string, message: string, donorName: string) => void;
}

export const CampaignDetailModal: React.FC<CampaignDetailModalProps> = ({
  campaign,
  onClose,
  onDonate,
  selectedCurrency,
  donorCheers,
  onAddCheer,
}) => {
  const [activeTab, setActiveTab] = useState<'story' | 'transparency' | 'milestones' | 'updates' | 'cheers'>('story');
  const [activeImage, setActiveImage] = useState<string>(campaign.coverImage);
  const [copiedLink, setCopiedLink] = useState(false);
  const [newCheerName, setNewCheerName] = useState('');
  const [newCheerMessage, setNewCheerMessage] = useState('');

  const percentage = Math.min(100, Math.round((campaign.currentAmount / campaign.targetAmount) * 100));

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCheerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheerMessage.trim()) return;
    onAddCheer(campaign.id, newCheerMessage.trim(), newCheerName.trim() || 'Supporter');
    setNewCheerMessage('');
    setNewCheerName('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-white/95 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-emerald-800 uppercase tracking-wider text-[11px]">
              {campaign.category.replace('-', ' ')}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {campaign.location}, {campaign.country}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200/80 px-3 py-1.5 rounded-lg transition-colors"
              title="Share campaign"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Main Title & Hero Presentation */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif leading-tight">
              {campaign.title}
            </h2>
            <p className="mt-2 text-stone-600 text-base leading-relaxed">
              {campaign.tagline}
            </p>
          </div>

          {/* Grid Layout: Left Content, Right Donation Action Box */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Visuals + Content Tabs */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Media Gallery */}
              <div className="space-y-2">
                <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                  <img
                    src={activeImage}
                    alt={campaign.title}
                    className="w-full h-full object-cover transition-all duration-300"
                  />
                </div>
                {campaign.galleryImages && campaign.galleryImages.length > 1 && (
                  <div className="flex gap-2">
                    {campaign.galleryImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImage === img ? 'border-emerald-600 scale-95' : 'border-stone-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Verified Organizer Badge Box */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={campaign.organizer.avatarUrl}
                    alt={campaign.organizer.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-sm text-stone-900">
                      <span>{campaign.organizer.name}</span>
                      {campaign.organizer.verified && (
                        <span title="Verified by KindPulse Foundation">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-500">
                      {campaign.organizer.role} · <strong className="text-stone-700">{campaign.organizer.organization}</strong>
                    </div>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1 text-xs text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                  Verified Grassroots Entity
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-stone-200 flex items-center gap-6 text-sm font-medium">
                <button
                  onClick={() => setActiveTab('story')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'story'
                      ? 'text-emerald-800 font-semibold border-b-2 border-emerald-600'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Cause Story
                </button>
                <button
                  onClick={() => setActiveTab('transparency')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'transparency'
                      ? 'text-emerald-800 font-semibold border-b-2 border-emerald-600'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Transparency &amp; Budget
                </button>
                <button
                  onClick={() => setActiveTab('milestones')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'milestones'
                      ? 'text-emerald-800 font-semibold border-b-2 border-emerald-600'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Milestones ({campaign.milestones.length})
                </button>
                <button
                  onClick={() => setActiveTab('updates')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'updates'
                      ? 'text-emerald-800 font-semibold border-b-2 border-emerald-600'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Field Updates ({campaign.updates.length})
                </button>
                <button
                  onClick={() => setActiveTab('cheers')}
                  className={`pb-2.5 transition-colors relative ${
                    activeTab === 'cheers'
                      ? 'text-emerald-800 font-semibold border-b-2 border-emerald-600'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  Donor Cheers
                </button>
              </div>

              {/* Tab Contents */}
              <div className="pt-2">
                
                {/* 1. Story Tab */}
                {activeTab === 'story' && (
                  <div className="space-y-6 text-stone-700 leading-relaxed text-sm">
                    <div>
                      <h4 className="text-base font-bold text-stone-900 mb-2 font-serif">
                        The Challenge
                      </h4>
                      <p className="bg-amber-50/60 border-l-4 border-amber-500 p-3.5 text-stone-800 rounded-r-lg">
                        {campaign.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-stone-900 mb-2 font-serif">
                        The Solution &amp; Direct Action
                      </h4>
                      <p className="bg-emerald-50/60 border-l-4 border-emerald-600 p-3.5 text-stone-800 rounded-r-lg">
                        {campaign.solution}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-stone-900 mb-2 font-serif">
                        Full Campaign Background
                      </h4>
                      <div className="whitespace-pre-line space-y-3 text-stone-600">
                        {campaign.story}
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. Transparency & Budget Tab */}
                {activeTab === 'transparency' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-base font-bold text-stone-900 mb-1 font-serif">
                        100% Itemized Cost Allocation
                      </h4>
                      <p className="text-xs text-stone-500">
                        Every single dollar is accounted for before work commences. Independent field auditors inspect receipts.
                      </p>
                    </div>

                    <div className="space-y-3">
                      {campaign.budgetBreakdown.map((item, idx) => (
                        <div key={idx} className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl">
                          <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-1.5">
                            <span>{item.category}</span>
                            <span className="text-emerald-700 font-mono">
                              {item.percentage}% ({formatCurrency(item.amount, selectedCurrency)})
                            </span>
                          </div>
                          <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>Direct Payout Verification:</strong> Funds are released to verified suppliers and contractors in milestone-based tranches only after geo-tagged photographic evidence is approved.
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Milestones Tab */}
                {activeTab === 'milestones' && (
                  <div className="space-y-4">
                    <p className="text-xs text-stone-500">
                      Track the direct execution phases of this programme as funding goals are met.
                    </p>
                    <div className="space-y-3">
                      {campaign.milestones.map((m, idx) => (
                        <div
                          key={m.id}
                          className={`p-4 rounded-xl border flex items-start gap-3.5 ${
                            m.achieved
                              ? 'bg-emerald-50/50 border-emerald-200'
                              : 'bg-white border-stone-200'
                          }`}
                        >
                          <div className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                            m.achieved ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600 text-xs font-bold'
                          }`}>
                            {m.achieved ? <Check className="w-3.5 h-3.5" /> : idx + 1}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs sm:text-sm font-bold text-stone-900">
                                {m.title}
                              </h5>
                              <span className={`text-[11px] font-semibold ${
                                m.achieved ? 'text-emerald-700' : 'text-stone-500'
                              }`}>
                                {formatCurrency(m.targetAmount, selectedCurrency)}
                              </span>
                            </div>
                            <p className="text-xs text-stone-600 mt-1">
                              {m.description}
                            </p>
                            <div className="mt-2 text-[11px] font-medium">
                              {m.achieved ? (
                                <span className="text-emerald-700">✓ Milestone Successfully Completed</span>
                              ) : (
                                <span className="text-amber-700">⏳ Currently Funding This Phase</span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Updates Tab */}
                {activeTab === 'updates' && (
                  <div className="space-y-4">
                    {campaign.updates.length === 0 ? (
                      <div className="text-center py-8 text-stone-500 text-xs">
                        No field updates published yet. Check back soon!
                      </div>
                    ) : (
                      campaign.updates.map((up) => (
                        <article key={up.id} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-2">
                          <div className="flex items-center justify-between text-xs text-stone-500">
                            <span className="flex items-center gap-1 font-medium text-stone-700">
                              <Calendar className="w-3.5 h-3.5 text-stone-400" />
                              {up.date}
                            </span>
                            <span>Reported by {up.author}</span>
                          </div>
                          <h5 className="text-sm font-bold text-stone-900">
                            {up.title}
                          </h5>
                          <p className="text-xs text-stone-600 leading-relaxed">
                            {up.content}
                          </p>
                        </article>
                      ))
                    )}
                  </div>
                )}

                {/* 5. Cheers & Comments Tab */}
                {activeTab === 'cheers' && (
                  <div className="space-y-6">
                    
                    {/* Add a cheer form */}
                    <form onSubmit={handleCheerSubmit} className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800">
                        <MessageSquare className="w-4 h-4 text-emerald-600" />
                        <span>Send Words of Encouragement to the Team</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={newCheerName}
                          onChange={(e) => setNewCheerName(e.target.value)}
                          placeholder="Your Name (Optional)"
                          className="px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={newCheerMessage}
                        onChange={(e) => setNewCheerMessage(e.target.value)}
                        placeholder="Write a message of hope, gratitude, or solidarity..."
                        className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                      <button
                        type="submit"
                        disabled={!newCheerMessage.trim()}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        Post Encouragement
                      </button>
                    </form>

                    {/* Cheers list */}
                    <div className="space-y-3">
                      {donorCheers.map((c) => (
                        <div key={c.id} className="p-3 bg-white border border-stone-200 rounded-xl text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-stone-900">
                              {c.isAnonymous ? 'Kind Supporter' : c.donorName}
                            </span>
                            <span className="text-stone-400 text-[11px]">{c.timestamp}</span>
                          </div>
                          <p className="text-stone-700 italic">
                            "{c.message}"
                          </p>
                          <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1 border-t border-stone-100">
                            <span className="text-emerald-700 font-semibold">
                              Donated {formatCurrency(c.amount, selectedCurrency)}
                            </span>
                            <button className="flex items-center gap-1 text-stone-400 hover:text-rose-600 transition-colors">
                              <ThumbsUp className="w-3 h-3" />
                              <span>{c.likesCount || 0}</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                )}

              </div>
            </div>

            {/* Right Column: Funding Progress & Direct Impact Tiers */}
            <div className="lg:col-span-5 space-y-6 sticky top-24">
              
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-5">
                
                {/* Progress bar */}
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
                      {formatCurrency(campaign.currentAmount, selectedCurrency)}
                    </span>
                    <span className="text-xs font-semibold text-emerald-800">
                      {percentage}% Funded
                    </span>
                  </div>

                  <div className="w-full bg-stone-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <div className="mt-2 text-xs text-stone-500 flex items-center justify-between">
                    <span>Goal: {formatCurrency(campaign.targetAmount, selectedCurrency)}</span>
                    <span>{campaign.donorCount} Supporters</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={() => onDonate(campaign)}
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 text-sm"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Donate to this Programme</span>
                </button>

                {/* Impact Tiers Grid */}
                <div className="space-y-3 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                    Direct Impact Giving Options
                  </div>

                  {campaign.impactTiers.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => onDonate(campaign, tier)}
                      className="group p-3 bg-white border border-stone-200 hover:border-emerald-600 rounded-xl cursor-pointer transition-all hover:shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-stone-900 group-hover:text-emerald-800">
                          {tier.label}
                        </span>
                        <span className="text-xs font-extrabold text-emerald-700 font-mono">
                          {formatCurrency(tier.amount, selectedCurrency)}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1">
                        {tier.description}
                      </p>
                      <div className="mt-2 text-[10px] font-medium text-emerald-600 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                        <span>Select this tier</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Security Guarantee */}
                <div className="text-[11px] text-stone-500 text-center flex items-center justify-center gap-1 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Secured 256-bit encryption · Tax-deductible receipt issued</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
