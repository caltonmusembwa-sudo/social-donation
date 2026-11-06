import React, { useState } from 'react';
import { SchoolLeaderboardEntry } from '../types/interactClub';
import { 
  Trophy, School, ArrowRight, PlusCircle, Users, CheckCircle2, 
  PackageCheck, Share2, MessageCircle, Copy, Check, X, ExternalLink, Sparkles 
} from 'lucide-react';

interface SchoolLeaderboardProps {
  schools: SchoolLeaderboardEntry[];
  onRegisterSchoolClick: () => void;
  onPledgeToSchool: (schoolName: string) => void;
}

export const SchoolLeaderboard: React.FC<SchoolLeaderboardProps> = ({
  schools,
  onRegisterSchoolClick,
  onPledgeToSchool,
}) => {
  const [sharingSchool, setSharingSchool] = useState<SchoolLeaderboardEntry | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return <span className="text-xl" title="1st Place">🥇</span>;
      case 2:
        return <span className="text-xl" title="2nd Place">🥈</span>;
      case 3:
        return <span className="text-xl" title="3rd Place">🥉</span>;
      default:
        return (
          <span className="w-6 h-6 rounded-full bg-stone-100 text-stone-600 font-bold text-xs flex items-center justify-center">
            {rank}
          </span>
        );
    }
  };

  // Generate customized pre-filled message for WhatsApp and Social Media
  const generateShareMessage = (school: SchoolLeaderboardEntry): string => {
    const remaining = Math.max(0, school.targetCount - school.itemsPledgedCount);
    const locationStr = school.district || school.location;
    const distanceStr = school.transportInfo?.distanceFromBulobaKm === 0
      ? 'Buloba Campus (Interact HQ)'
      : `${school.transportInfo?.distanceFromBulobaKm || ''} km from Buloba via ${school.transportInfo?.routeHighway || 'national highway'}`;

    return `🎒 Support Students at ${school.name}!

The Interact Club of PEAS Onwards and Upwards Buloba is rallying community support for ${school.name} in ${locationStr}.

📊 Progress: ${school.progressPercent}% Goal Met (${school.itemsPledgedCount}/${school.targetCount} supplies pledged)
🎯 Priority Need: ${remaining > 0 ? `${remaining} more ${school.metricLabel}` : school.metricLabel}
👥 Students Supported: ${school.studentsSupported} learners
🛣️ Location & Transit: ${distanceStr}

100% Non-Monetary Supply Drive. Zero money or cash involved—only physical learning materials (backpacks, books, meals & uniforms).

👉 Pledge supplies or volunteer today:
https://ouinteract.org

#ServiceAboveSelf #PEASUganda #InteractClub #UgandaEducation #StudentsHelpingStudents`;
  };

  const handleOpenShare = (school: SchoolLeaderboardEntry) => {
    setSharingSchool(school);
    setHasCopied(false);
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const handleNativeShare = async (school: SchoolLeaderboardEntry) => {
    const text = generateShareMessage(school);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Support ${school.name} · O&U Interact`,
          text: text,
          url: 'https://ouinteract.org',
        });
        return;
      } catch (err) {
        // Fallback to modal if user cancels or not supported
      }
    }
    handleOpenShare(school);
  };

  return (
    <section className="py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>Friendly Community School League</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 font-serif">
              PEAS Uganda Partner Schools League
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Track scholastic kits, science apparatus, and nutrition consignments pledged across all 10 registered PEAS high schools. Click <strong>Share</strong> on any school to spread awareness on WhatsApp or social media.
            </p>
          </div>

          {/* Action button */}
          <button
            onClick={onRegisterSchoolClick}
            className="self-start md:self-auto bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-2 active:scale-95 whitespace-nowrap hover:-translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Enroll Sister PEAS Campus</span>
          </button>
        </div>

        {/* Dynamic Leaderboard Table */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/70 border-b border-stone-200 text-stone-600 font-semibold text-[11px] sm:text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Current Rank</th>
                  <th className="py-3.5 px-4 sm:px-6">PEAS Campus &amp; Route</th>
                  <th className="py-3.5 px-4 sm:px-6">Goal Progress</th>
                  <th className="py-3.5 px-4 sm:px-6">Supplies Pledged</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {schools.map((school) => {
                  return (
                    <tr
                      key={school.id}
                      className="hover:bg-amber-50/40 transition-colors"
                    >
                      {/* Rank */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getRankBadge(school.rank)}
                          <span className="font-semibold text-stone-700 text-xs sm:text-sm">
                            {school.id === 'peas-buloba' ? '★ Host' : school.rank === 1 ? '1st Place' : school.rank === 2 ? '2nd Place' : school.rank === 3 ? '3rd Place' : `${school.rank}th Place`}
                          </span>
                        </div>
                      </td>

                      {/* School Name, District & Route */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-bold text-stone-900 text-sm sm:text-base flex items-center gap-2">
                          <span>{school.name}</span>
                          {school.id === 'peas-buloba' && (
                            <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-mono font-bold">
                              Interact Base
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-500 flex flex-wrap items-center gap-2 mt-1">
                          <span className="font-semibold text-stone-700">{school.district}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-amber-800 font-medium">
                            🚗 {school.transportInfo?.distanceFromBulobaKm === 0 ? 'Buloba HQ' : `${school.transportInfo?.distanceFromBulobaKm} km from Buloba`}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-stone-500 truncate max-w-[200px]">
                            {school.transportInfo?.routeHighway}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">
                            {school.studentsSupported} students
                          </span>
                        </div>
                      </td>

                      {/* Progress Bar & Percentage */}
                      <td className="py-4 px-4 sm:px-6 min-w-[180px]">
                        <div className="flex items-center justify-between text-xs font-bold text-stone-800 mb-1.5">
                          <span className="text-emerald-700 font-mono">
                            {school.progressPercent}%
                          </span>
                          <span className="text-[11px] text-stone-400 font-normal">
                            Target: {school.targetCount} Kits
                          </span>
                        </div>
                        <div className="w-full bg-stone-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ${
                              school.progressPercent >= 80 ? 'bg-emerald-600' : 'bg-amber-500'
                            }`}
                            style={{ width: `${Math.min(100, school.progressPercent)}%` }}
                          />
                        </div>
                      </td>

                      {/* Supplies Pledged */}
                      <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                        <div className="font-extrabold text-stone-900 text-sm sm:text-base font-serif flex items-center gap-1.5">
                          <PackageCheck className="w-4 h-4 text-emerald-600" />
                          <span>{school.itemsPledgedCount} Pledged</span>
                        </div>
                        <div className="text-[11px] text-stone-500">
                          {school.metricLabel}
                        </div>
                      </td>

                      {/* Actions: Share button & Pledge button */}
                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenShare(school)}
                            className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-emerald-50 text-stone-700 hover:text-emerald-800 border border-stone-200 hover:border-emerald-500 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs hover:-translate-y-0.5"
                            title={`Share awareness for ${school.name} on WhatsApp or social media`}
                          >
                            <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Share</span>
                          </button>

                          <button
                            onClick={() => onPledgeToSchool(school.name)}
                            className="inline-flex items-center gap-1 bg-amber-600 hover:bg-amber-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-2xs hover:-translate-y-0.5"
                          >
                            <span>Pledge</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footnote */}
          <div className="bg-stone-50 px-6 py-3.5 border-t border-stone-200 text-xs text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Leaderboard updates in real-time as community supply commitments are received.</span>
            </span>
            <button
              onClick={onRegisterSchoolClick}
              className="text-amber-800 font-semibold hover:underline"
            >
              Want your school listed? Enroll a new school drive →
            </button>
          </div>

        </div>

      </div>

      {/* SHARE SCHOOL AWARENESS MODAL */}
      {sharingSchool && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSharingSchool(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full border border-stone-200 shadow-2xl p-6 sm:p-7 space-y-5 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest">
                  <Share2 className="w-4 h-4 text-emerald-600" />
                  <span>Raise Awareness · WhatsApp &amp; Social</span>
                </div>
                <h3 className="text-xl font-bold font-serif text-stone-900 leading-tight">
                  Share {sharingSchool.name}
                </h3>
                <p className="text-xs text-stone-500">
                  Help rally community scholastic support for students in {sharingSchool.district}.
                </p>
              </div>

              <button
                onClick={() => setSharingSchool(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* School Need Summary Pill */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/60 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-amber-950">
                <span>Current Supply Goal:</span>
                <span className="font-mono text-emerald-800">
                  {sharingSchool.itemsPledgedCount} / {sharingSchool.targetCount} ({sharingSchool.progressPercent}%)
                </span>
              </div>
              <div className="w-full bg-amber-200/60 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, sharingSchool.progressPercent)}%` }}
                />
              </div>
              <div className="text-[11px] text-amber-900/90 pt-0.5">
                Urgent requirement: <strong>{sharingSchool.metricLabel}</strong> for {sharingSchool.studentsSupported} learners.
              </div>
            </div>

            {/* Pre-filled Message Preview Box */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-stone-600">
                <span>Pre-filled Message Preview:</span>
                <button
                  type="button"
                  onClick={() => handleCopyMessage(generateShareMessage(sharingSchool))}
                  className="text-amber-800 hover:text-amber-900 flex items-center gap-1 text-[11px] font-bold"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-stone-500" />
                      <span>Copy Text</span>
                    </>
                  )}
                </button>
              </div>

              <textarea
                readOnly
                rows={6}
                value={generateShareMessage(sharingSchool)}
                className="w-full p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-800 leading-relaxed focus:outline-none resize-none"
              />
            </div>

            {/* Direct Social Media Launchers */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                Choose Where to Share:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* 1. WhatsApp Button */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(generateShareMessage(sharingSchool))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Share on WhatsApp</span>
                </a>

                {/* 2. X / Twitter Button */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Support students at ${sharingSchool.name} (${sharingSchool.district}) through the PEAS Uganda & O&U Interact supply drive! Zero money—100% learning supplies.`
                  )}&url=${encodeURIComponent('https://ouinteract.org')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <span className="font-black text-sm">𝕏</span>
                  <span>Share on X / Twitter</span>
                </a>

                {/* 3. Facebook / Web Feed */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://ouinteract.org')}&quote=${encodeURIComponent(
                    `Support ${sharingSchool.name} students via O&U Interact School Fund!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Share on Facebook</span>
                </a>

                {/* 4. Copy to Clipboard Button */}
                <button
                  onClick={() => handleCopyMessage(generateShareMessage(sharingSchool))}
                  className="w-full py-2.5 px-3 bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-stone-600" />
                      <span>Copy Full Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct Pledge Link inside modal */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <span className="text-stone-500">Want to pledge supplies yourself?</span>
              <button
                onClick={() => {
                  const schoolName = sharingSchool.name;
                  setSharingSchool(null);
                  onPledgeToSchool(schoolName);
                }}
                className="text-amber-800 hover:text-amber-900 font-bold flex items-center gap-1 hover:underline"
              >
                <span>Pledge Directly for {sharingSchool.name.replace('PEAS ', '').split(' ')[0]}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
