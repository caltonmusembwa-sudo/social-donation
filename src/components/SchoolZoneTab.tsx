import React, { useState } from 'react';
import { SchoolLeaderboardEntry } from '../types/interactClub';
import { InteractiveSchoolMap } from './InteractiveSchoolMap';
import { 
  School, Search, PlusCircle, MapPin, Users, 
  ArrowRight, PackageCheck, Map as MapIcon, Grid, Sparkles,
  Car, Clock, Navigation, ExternalLink, Compass, CheckCircle2,
  Share2, MessageCircle, Copy, Check, X
} from 'lucide-react';

interface SchoolZoneTabProps {
  schools: SchoolLeaderboardEntry[];
  onRegisterSchoolClick: () => void;
  onPledgeToSchool: (schoolName: string) => void;
}

export const SchoolZoneTab: React.FC<SchoolZoneTabProps> = ({
  schools,
  onRegisterSchoolClick,
  onPledgeToSchool,
}) => {
  const [filterRegion, setFilterRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSchoolOnMap, setSelectedSchoolOnMap] = useState<string | null>(null);
  const [sharingSchool, setSharingSchool] = useState<SchoolLeaderboardEntry | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

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

100% Non-Monetary Supply Drive. Zero money or cash involved—only physical learning materials.

👉 Pledge supplies or volunteer today:
https://ouinteract.org

#ServiceAboveSelf #PEASUganda #InteractClub #UgandaEducation`;
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2500);
  };

  const filtered = schools.filter((s) => {
    const matchesRegion = filterRegion === 'all' || s.region.toLowerCase().includes(filterRegion.toLowerCase()) || s.district.toLowerCase().includes(filterRegion.toLowerCase());
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.transportInfo.routeHighway.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const handleFocusOnMap = (schoolName: string) => {
    setSelectedSchoolOnMap(schoolName);
    const mapElement = document.getElementById('school-zone-map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn">
      
      {/* Header with Authentic Background Image Overlay */}
      <div 
        className="rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-lg border border-stone-800"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(12,10,9,0.92) 20%, rgba(28,25,23,0.85) 60%, rgba(120,53,15,0.78) 100%), url('/assets/aistudio/Peas_Sampling_Nama_High_School_Visit_cce89195.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 35%',
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
              <School className="w-4 h-4 text-amber-400" />
              <span>PEAS Uganda Partner School Directory</span>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2.5 py-0.5 rounded-full font-mono">
                Term 3 · November 2026
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
              PEAS Partner Schools &amp; Transportation Hub
            </h2>
            <p className="text-stone-200 text-sm sm:text-base leading-relaxed">
              Explore all 10 registered PEAS high schools across Uganda connected to <strong>PEAS Onwards &amp; Upwards Buloba</strong>. Check distances, highway travel corridors, and get one-tap directions for school supply drop-offs.
            </p>
          </div>

          <button
            onClick={onRegisterSchoolClick}
            className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all flex items-center gap-2 self-start md:self-auto hover:-translate-y-0.5 active:scale-95 duration-200"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Enroll a Sister PEAS Campus</span>
          </button>
        </div>
      </div>

      {/* 1. INTERACTIVE MAP COMPONENT (Leaflet + Transportation Corridors) */}
      <div id="school-zone-map" className="scroll-mt-24">
        <InteractiveSchoolMap
          schools={schools}
          onPledgeToSchool={onPledgeToSchool}
          selectedSchoolName={selectedSchoolOnMap}
        />
      </div>

      {/* Directory Section Header & Filter Toolbar */}
      <div className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
              Registered PEAS Campuses Directory ({filtered.length})
            </h3>
            <p className="text-xs text-stone-500">
              Select any school to see highway travel times from Buloba, campus coordinators, or pinpoint on map.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search school name, district, or highway..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Region Filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold pb-1 scrollbar-thin">
          <button
            onClick={() => setFilterRegion('all')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              filterRegion === 'all' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Uganda ({schools.length})
          </button>
          <button
            onClick={() => setFilterRegion('wakiso')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              filterRegion === 'wakiso' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Wakiso / Buloba
          </button>
          <button
            onClick={() => setFilterRegion('mpigi')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              filterRegion === 'mpigi' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Mpigi (Samling Nama)
          </button>
          <button
            onClick={() => setFilterRegion('luweero')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              filterRegion === 'luweero' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Luweero (Bombo Kalule)
          </button>
          <button
            onClick={() => setFilterRegion('western')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              filterRegion === 'western' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Western (Pioneer, Ibanda, Kabarole)
          </button>
          <button
            onClick={() => setFilterRegion('eastern')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              filterRegion === 'eastern' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Eastern (Mayuge, Toroma)
          </button>
          <button
            onClick={() => setFilterRegion('northern')}
            className={`px-3.5 py-1.5 rounded-xl border transition-all ${
              filterRegion === 'northern' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Northern (Lamwo Kuc)
          </button>
        </div>

        {/* Schools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-lg transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
            >
              <div>
                {/* School Photo Banner if available */}
                {school.campusPhoto && (
                  <div className="w-full h-36 bg-stone-100 overflow-hidden relative">
                    <img
                      src={school.campusPhoto}
                      alt={school.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-white text-xs font-bold">
                      <span className="bg-stone-900/80 px-2 py-0.5 rounded-md backdrop-blur-xs font-mono">
                        {school.district}
                      </span>
                      <span className="bg-amber-500 text-stone-950 px-2 py-0.5 rounded-md font-mono text-[11px]">
                        {school.transportInfo.distanceFromBulobaKm === 0 ? 'Host Campus' : `${school.transportInfo.distanceFromBulobaKm} km from Buloba`}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 pb-2">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                      {school.id === 'peas-buloba' ? 'Interact Host' : school.region}
                    </span>
                    <span className="font-bold text-stone-500 font-mono">
                      Rank #{school.rank}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-stone-900 font-serif leading-snug">
                    {school.name}
                  </h4>

                  <div className="mt-1 flex items-center gap-1.5 text-xs text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span className="truncate">{school.location}</span>
                  </div>

                  {/* Transportation Corridor Box */}
                  <div className="mt-4 p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200/50 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Car className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="truncate">{school.transportInfo.routeHighway}</span>
                    </div>
                    <div className="text-[11px] text-stone-600 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                      <span>{school.transportInfo.estimatedDriveTime}</span>
                    </div>
                  </div>

                  {/* Supply Goal Progress */}
                  <div className="mt-4 p-3.5 bg-stone-50 rounded-2xl space-y-2 text-xs border border-stone-200/60">
                    <div className="flex justify-between font-semibold text-stone-700">
                      <span>Supplies Goal:</span>
                      <span className="font-mono text-emerald-800 font-bold">
                        {school.itemsPledgedCount} / {school.targetCount} ({school.progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full bg-stone-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, school.progressPercent)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-stone-500 pt-0.5">
                      <span>{school.studentsSupported} pupils assisted</span>
                      <span>Lead: {school.coordinator.split('&')[0]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleFocusOnMap(school.name)}
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 py-1.5 px-2 rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <MapIcon className="w-3.5 h-3.5 text-amber-700" />
                    <span>Map</span>
                  </button>

                  <a
                    href={school.transportInfo.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 py-1.5 px-2 rounded-lg hover:bg-stone-100 transition-colors"
                    title="Get Directions on Google Maps"
                  >
                    <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    <span>Route</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setSharingSchool(school);
                      setHasCopied(false);
                    }}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 py-1.5 px-2.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 transition-colors"
                    title={`Share ${school.name} on WhatsApp or social media`}
                  >
                    <Share2 className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Share</span>
                  </button>
                </div>

                <button
                  onClick={() => onPledgeToSchool(school.name)}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1 hover:-translate-y-0.5 shadow-2xs"
                >
                  <span>Pledge</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SHARE SCHOOL MODAL */}
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
                  <span>Raise Awareness · WhatsApp &amp; Social Media</span>
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

            {/* School Need Summary */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200/60 space-y-1.5 text-xs">
              <div className="flex justify-between font-bold text-amber-950">
                <span>Supply Goal Progress:</span>
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

    </div>
  );
};
