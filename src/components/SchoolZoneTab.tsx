import React, { useState } from 'react';
import { SchoolLeaderboardEntry } from '../types/interactClub';
import { InteractiveSchoolMap } from './InteractiveSchoolMap';
import { 
  School, Search, PlusCircle, MapPin, Users, 
  ArrowRight, PackageCheck, Map as MapIcon, Grid, Sparkles 
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
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedSchoolOnMap, setSelectedSchoolOnMap] = useState<string | null>(null);

  const filtered = schools.filter((s) => {
    const matchesLevel = filterLevel === 'all' || s.level.toLowerCase().includes(filterLevel.toLowerCase());
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
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
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
            <School className="w-4 h-4 text-amber-600" />
            <span>School Zone &amp; Community Directory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
            Partner Schools &amp; Geographic Zone
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Discover all 18 active local partner schools in our educational network. Use the interactive map below to explore school locations, check supply needs, and pledge directly to classrooms.
          </p>
        </div>

        <button
          onClick={onRegisterSchoolClick}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-all flex items-center gap-2 self-start md:self-auto hover:-translate-y-0.5"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Register Your Child’s School</span>
        </button>
      </div>

      {/* 1. INTERACTIVE MAP COMPONENT (Requested Feature) */}
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
              Registered Schools Directory ({filtered.length})
            </h3>
            <p className="text-xs text-stone-500">
              Select any school to view coordinator contacts or pinpoint its location on the map.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search school name or location..."
              className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Level Filters */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-semibold pb-1">
          <button
            onClick={() => setFilterLevel('all')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              filterLevel === 'all' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            All Schools ({schools.length})
          </button>
          <button
            onClick={() => setFilterLevel('primary')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              filterLevel === 'primary' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Primary / Elementary
          </button>
          <button
            onClick={() => setFilterLevel('junior')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              filterLevel === 'junior' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            Junior / Middle
          </button>
          <button
            onClick={() => setFilterLevel('high')}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              filterLevel === 'high' ? 'bg-amber-700 text-white border-amber-700' : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            High Schools
          </button>
        </div>

        {/* Schools Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((school) => (
            <div
              key={school.id}
              className="bg-white rounded-3xl border border-stone-200 p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                    {school.level}
                  </span>
                  <span className="font-bold text-stone-500 font-mono">
                    Rank #{school.rank}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-stone-900 font-serif leading-snug">
                  {school.name}
                </h4>

                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{school.location}</span>
                </div>

                <div className="mt-4 p-4 bg-stone-50 rounded-2xl space-y-2 text-xs">
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
                  <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                    <span>{school.studentsSupported} pupils assisted</span>
                    <span>Lead: {school.coordinator}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleFocusOnMap(school.name)}
                  className="text-xs font-semibold text-stone-600 hover:text-stone-900 flex items-center gap-1 py-1 px-2 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  <MapIcon className="w-3.5 h-3.5 text-amber-700" />
                  <span>View on Map</span>
                </button>

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

    </div>
  );
};
