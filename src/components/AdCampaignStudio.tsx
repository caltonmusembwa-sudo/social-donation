import React, { useState } from 'react';
import { AD_CAMPAIGNS, USER_ACCOUNT_EMAIL, CLUB_DOMAIN } from '../data/interactData';
import { AdCreative } from '../types/interactClub';
import { 
  Sparkles, Copy, Check, ExternalLink, Play, Radio, 
  Share2, ArrowRight, ShieldCheck, Download, Code, Globe, Volume2 
} from 'lucide-react';

interface AdCampaignStudioProps {
  onPledgeClick: () => void;
}

export const AdCampaignStudio: React.FC<AdCampaignStudioProps> = ({
  onPledgeClick,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isPlayingAudioPreview, setIsPlayingAudioPreview] = useState(false);

  const filteredAds = AD_CAMPAIGNS.filter(
    (ad) => selectedPlatform === 'all' || ad.platform === selectedPlatform
  );

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handleExportAll = () => {
    const fullText = AD_CAMPAIGNS.map(
      (ad) => `=== ${ad.platformName.toUpperCase()} (${ad.format}) ===\nHeadline: ${ad.headline}\nTarget Audience: ${ad.targetAudience}\nCTA: ${ad.callToAction}\nTarget URL: ${ad.targetUrl}\nSpecs: ${ad.specs}\n\n${ad.scriptOrCopy}\n\n`
    ).join('\n----------------------------------------\n\n');

    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `OU_Interact_Ad_Campaigns_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const simulateAudioPlay = () => {
    setIsPlayingAudioPreview(true);
    setTimeout(() => setIsPlayingAudioPreview(false), 5000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fadeIn">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-sm space-y-6 border border-amber-500/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Multi-Platform Outreach &amp; Marketing Studio</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight">
              Ready-to-Launch Ad Campaigns
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
              Professional audio commercials, video scripts, LinkedIn sponsor copy, and Netlify web banners built for O&amp;U Interact Club (ouinteract.org). Zero billing required.
            </p>
          </div>

          {/* Account Sync Card */}
          <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-5 text-xs space-y-3 shrink-0">
            <div className="flex items-center gap-2 text-stone-400 uppercase font-semibold text-[10px]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Connected Ad Account</span>
            </div>
            <div className="font-mono text-sm font-bold text-white bg-black/40 px-3 py-1.5 rounded-lg border border-stone-800">
              {USER_ACCOUNT_EMAIL}
            </div>
            <p className="text-[11px] text-stone-400 max-w-xs leading-normal">
              Click any launch button to sign in directly with your linked Google/app credentials and run these ads.
            </p>
            <button
              onClick={handleExportAll}
              className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download All Ad Scripts (.txt)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Platform Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto text-xs font-bold pb-2">
        {[
          { id: 'all', label: 'All Ad Formats (5)', icon: '🌟' },
          { id: 'spotify', label: 'Spotify Audio Ads', icon: '🎵' },
          { id: 'youtube', label: 'YouTube Video Ads', icon: '▶️' },
          { id: 'linkedin', label: 'LinkedIn Professional', icon: '💼' },
          { id: 'netlify', label: 'Netlify Web Banners', icon: '🌐' },
          { id: 'instagram', label: 'Instagram & TikTok', icon: '📱' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedPlatform(tab.id)}
            className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-1.5 whitespace-nowrap ${
              selectedPlatform === tab.id
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Campaign Cards Grid */}
      <div className="space-y-8">
        {filteredAds.map((ad) => {
          const isCopied = copiedId === ad.id;

          return (
            <article
              key={ad.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-sm transition-all"
            >
              {/* Card Header Strip */}
              <div className="px-6 sm:px-8 py-5 bg-stone-50 border-b border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" role="img" aria-label={ad.platformName}>
                    {ad.icon}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${ad.badgeColor}`}>
                        {ad.platformName}
                      </span>
                      <span className="text-stone-400 text-xs font-medium">·</span>
                      <span className="text-xs font-semibold text-stone-600">{ad.format}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif mt-0.5">
                      {ad.headline}
                    </h3>
                  </div>
                </div>

                {/* Direct Launch / Sign In Button */}
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <a
                    href={ad.accountLaunchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors"
                  >
                    <span>Open {ad.platformName.split(' ')[0]}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  </a>

                  <button
                    onClick={() => handleCopy(ad.id, ad.scriptOrCopy)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 font-semibold text-xs rounded-xl transition-colors"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Copied!' : 'Copy Script / Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-stone-700">
                
                {/* Meta details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-stone-50 rounded-2xl border border-stone-200/80 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Target Audience:</span>
                    <span className="text-stone-800 font-medium">{ad.targetAudience}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Call to Action (CTA):</span>
                    <span className="text-amber-800 font-bold font-mono">{ad.callToAction}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block mb-0.5">Technical Specs:</span>
                    <span className="text-stone-600 font-mono text-[11px]">{ad.specs}</span>
                  </div>
                </div>

                {/* Script / Ad Copy Presentation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-800">
                    <span>Creative Ad Script &amp; Text Content:</span>
                    {ad.platform === 'spotify' && (
                      <button
                        onClick={simulateAudioPlay}
                        className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlayingAudioPreview ? 'Simulating 30s Audio...' : 'Simulate Audio Timing'}</span>
                      </button>
                    )}
                  </div>

                  <pre className="p-5 bg-stone-900 text-stone-100 rounded-2xl font-mono text-xs whitespace-pre-wrap leading-relaxed overflow-x-auto border border-stone-800">
                    {ad.scriptOrCopy}
                  </pre>
                </div>

                {/* Director's notes / visual cues */}
                {ad.voiceoverOrVisualDirection && (
                  <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl text-xs text-amber-950 space-y-1">
                    <strong>Creative Direction &amp; Video/Audio Cues:</strong>
                    <p className="leading-relaxed">{ad.voiceoverOrVisualDirection}</p>
                  </div>
                )}

                {/* Interactive Netlify Embed Live Preview */}
                {ad.platform === 'netlify' && (
                  <div className="space-y-2 pt-2 border-t border-stone-100">
                    <span className="text-xs font-bold text-stone-800">Live Preview of Netlify Embeddable Web Widget:</span>
                    <div className="p-6 bg-stone-100 rounded-2xl flex justify-center">
                      <div className="bg-[#17223b] text-white p-5 rounded-2xl border-2 border-[#ffcf45] max-w-sm text-center shadow-md">
                        <span className="bg-[#ffcf45] text-[#15244a] font-extrabold text-[10px] px-2 py-0.5 rounded tracking-wider">
                          O&amp;U INTERACT
                        </span>
                        <h4 className="font-serif text-lg font-bold mt-2 text-white">
                          Every Child Thrives When a Community Cares
                        </h4>
                        <p className="text-xs text-stone-300 mt-1 mb-4 leading-relaxed">
                          Pledge student backpacks, school meals, and athletic shoes directly to 18 partner schools.
                        </p>
                        <button
                          onClick={onPledgeClick}
                          className="px-4 py-2 bg-[#ffcf45] text-[#17223b] font-bold text-xs rounded-full hover:bg-amber-300 transition-colors"
                        >
                          Pledge Supplies on ouinteract.org →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Share Link Action */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500">
                  <div className="flex items-center gap-1.5">
                    <span>Authorized Manager:</span>
                    <strong className="text-stone-800">Musembwa Calton ({USER_ACCOUNT_EMAIL})</strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://ouinteract.org')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:text-blue-900 font-semibold flex items-center gap-1"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Post to LinkedIn Feed</span>
                    </a>
                    <span className="text-stone-300">·</span>
                    <button
                      onClick={() => handleCopy(ad.id, ad.scriptOrCopy)}
                      className="text-amber-800 hover:text-amber-950 font-semibold"
                    >
                      {isCopied ? '✓ Copied' : 'Copy Text'}
                    </button>
                  </div>
                </div>

              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
};
