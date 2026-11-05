import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SchoolLeaderboardEntry } from '../types/interactClub';
import { 
  MapPin, School, Navigation, PackageCheck, Users, 
  ArrowRight, Sparkles, Filter, Layers, ZoomIn, ZoomOut 
} from 'lucide-react';

interface InteractiveSchoolMapProps {
  schools: SchoolLeaderboardEntry[];
  onPledgeToSchool: (schoolName: string) => void;
  selectedSchoolName?: string | null;
}

export const InteractiveSchoolMap: React.FC<InteractiveSchoolMapProps> = ({
  schools,
  onPledgeToSchool,
  selectedSchoolName,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});

  const [activeSchool, setActiveSchool] = useState<SchoolLeaderboardEntry | null>(() => {
    return schools[0] || null;
  });
  const [filterType, setFilterType] = useState<'all' | 'primary' | 'secondary' | 'top3'>('all');

  const filteredSchools = schools.filter((s) => {
    if (filterType === 'top3') return s.rank <= 3;
    if (filterType === 'primary') return s.level.toLowerCase().includes('primary') || s.level.toLowerCase().includes('elementary');
    if (filterType === 'secondary') return s.level.toLowerCase().includes('high') || s.level.toLowerCase().includes('middle') || s.level.toLowerCase().includes('junior');
    return true;
  });

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double initialization

    // Center on Kampala Educational Cluster
    const initialLat = 0.3420;
    const initialLng = 0.3275;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 13,
      zoomControl: false, // We'll render custom zoom buttons
      scrollWheelZoom: true,
    });

    // Clean OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors · O&U Interact',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers when schools or filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    const bounds: L.LatLngExpression[] = [];

    filteredSchools.forEach((school) => {
      const lat = school.lat || (0.3390 + (school.rank * 0.006));
      const lng = school.lng || (32.5650 + (school.rank * 0.007));
      bounds.push([lat, lng]);

      // Create Custom HTML Pin Icon
      const isHost = school.name.includes('O&U High School');
      const isTop3 = school.rank <= 3;

      const markerHtml = `
        <div class="group relative cursor-pointer transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110">
          <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg border-2 ${
            isHost 
              ? 'bg-[#15244a] text-[#ffcf45] border-[#ffcf45]' 
              : isTop3 
              ? 'bg-amber-600 text-white border-amber-300' 
              : 'bg-white text-stone-900 border-stone-300'
          }">
            <span class="font-extrabold text-[11px] font-mono">
              ${isHost ? '★' : `#${school.rank}`}
            </span>
            <span class="text-[11px] font-bold truncate max-w-[95px] hidden sm:inline">
              ${school.name.split(' ')[0]}
            </span>
          </div>
          <div class="w-2.5 h-2.5 rotate-45 mx-auto -mt-1.5 shadow-xs ${
            isHost ? 'bg-[#15244a]' : isTop3 ? 'bg-amber-600' : 'bg-white'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-school-marker',
        html: markerHtml,
        iconSize: [120, 42],
        iconAnchor: [60, 42],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const popupContent = `
        <div style="font-family:'DM Sans',sans-serif; padding:4px; max-width:220px;">
          <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#b45309; letter-spacing:0.5px;">
            ${school.level} · Rank #${school.rank}
          </div>
          <h4 style="font-family:'Outfit',sans-serif; font-size:15px; font-weight:800; margin:4px 0 2px; color:#1c1917;">
            ${school.name}
          </h4>
          <div style="font-size:11px; color:#78716c; margin-bottom:6px;">
            📍 ${school.location}
          </div>
          <div style="background:#f5f5f4; padding:6px 8px; border-radius:8px; margin-bottom:8px; font-size:11px;">
            <div style="display:flex; justify-content:space-between; font-weight:700; color:#15803d; margin-bottom:2px;">
              <span>${school.progressPercent}% Goal Met</span>
              <span>${school.itemsPledgedCount}/${school.targetCount} Kits</span>
            </div>
            <div style="color:#57534e; font-size:10px;">Lead: ${school.coordinator}</div>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setActiveSchool(school);
      });

      markersRef.current[school.id] = marker;
    });

    // Fit bounds if multiple schools
    if (bounds.length > 0) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [40, 40], maxZoom: 14 });
    }
  }, [filteredSchools]);

  // Center on school when selected externally
  useEffect(() => {
    if (!selectedSchoolName || !mapInstanceRef.current) return;
    const match = schools.find((s) => s.name === selectedSchoolName);
    if (match) {
      setActiveSchool(match);
      const lat = match.lat || 0.3420;
      const lng = match.lng || 32.5750;
      mapInstanceRef.current.setView([lat, lng], 15, { animate: true });
      const marker = markersRef.current[match.id];
      if (marker) marker.openPopup();
    }
  }, [selectedSchoolName, schools]);

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  const handleResetView = () => {
    if (filteredSchools.length > 0 && mapInstanceRef.current) {
      const bounds = filteredSchools.map((s) => [s.lat || 0.34, s.lng || 32.57] as [number, number]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
    }
  };

  const handleSelectCard = (school: SchoolLeaderboardEntry) => {
    setActiveSchool(school);
    if (mapInstanceRef.current && school.lat && school.lng) {
      mapInstanceRef.current.setView([school.lat, school.lng], 15, { animate: true });
      const marker = markersRef.current[school.id];
      if (marker) marker.openPopup();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm space-y-0">
      
      {/* Top Map Toolbar */}
      <div className="p-4 sm:p-5 bg-stone-50 border-b border-stone-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
            <Navigation className="w-3.5 h-3.5 text-amber-600" />
            <span>Interactive Geographic Visualizer</span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif">
            School Zone Locations Map
          </h3>
          <p className="text-xs text-stone-500">
            Click any pin to inspect school supply needs, headteacher contacts, and distribution status.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filterType === 'all'
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            All Pins ({schools.length})
          </button>
          <button
            onClick={() => setFilterType('top3')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filterType === 'top3'
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            🥇 Top 3 Leaders
          </button>
          <button
            onClick={() => setFilterType('primary')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filterType === 'primary'
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            Primary Schools
          </button>
          <button
            onClick={() => setFilterType('secondary')}
            className={`px-3 py-1.5 rounded-lg border transition-all ${
              filterType === 'secondary'
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-100'
            }`}
          >
            High &amp; Junior Schools
          </button>
        </div>
      </div>

      {/* Map Canvas + Active School Spotlight Container */}
      <div className="relative">
        
        {/* Leaflet Map Div */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-[460px] sm:h-[500px] z-10 bg-stone-100"
          style={{ cursor: 'grab' }}
        />

        {/* Floating Custom Map Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-stone-800 border border-stone-200 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-stone-800 border border-stone-200 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="w-9 h-9 rounded-xl bg-white/95 hover:bg-white text-amber-800 border border-stone-200 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-xs font-bold"
            title="Reset to Full District"
          >
            <Navigation className="w-4 h-4 text-amber-700" />
          </button>
        </div>

        {/* Floating Active School Spotlight Card */}
        {activeSchool && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-md z-20 bg-white/95 backdrop-blur-md border border-stone-200 rounded-2xl p-4 sm:p-5 shadow-xl space-y-3 animate-welcome">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  <span>Rank #{activeSchool.rank}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeSchool.level}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-tight">
                  {activeSchool.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span>{activeSchool.location}</span>
                </div>
              </div>

              <span className="text-xs font-extrabold text-emerald-700 font-mono bg-emerald-50 px-2 py-1 rounded-md shrink-0">
                {activeSchool.progressPercent}% Met
              </span>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, activeSchool.progressPercent)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-stone-500 font-medium pt-0.5">
                <span>{activeSchool.itemsPledgedCount} Pledged</span>
                <span>Target: {activeSchool.targetCount} Kits</span>
              </div>
            </div>

            <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="text-[11px] text-stone-600">
                Lead: <strong>{activeSchool.coordinator}</strong> ({activeSchool.studentsSupported} kids)
              </div>

              <button
                onClick={() => onPledgeToSchool(activeSchool.name)}
                className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-xs shadow-2xs transition-all flex items-center gap-1 hover:-translate-y-0.5"
              >
                <span>Pledge Supplies</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Quick Scrollable Carousel of Pins below map */}
      <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center gap-2 overflow-x-auto text-xs scrollbar-thin">
        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest shrink-0 mr-1">
          Registered Pins:
        </span>
        {filteredSchools.map((school) => {
          const isSelected = activeSchool?.id === school.id;
          return (
            <button
              key={school.id}
              onClick={() => handleSelectCard(school)}
              className={`px-3 py-1.5 rounded-xl border text-left shrink-0 transition-all flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-white border-amber-600 text-stone-900 shadow-2xs ring-1 ring-amber-600'
                  : 'bg-white/80 border-stone-200 text-stone-600 hover:bg-white hover:border-stone-300'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold ${
                school.rank <= 3 ? 'bg-amber-500 text-stone-950' : 'bg-stone-200 text-stone-700'
              }`}>
                {school.rank}
              </span>
              <span className="font-semibold truncate max-w-[140px]">{school.name}</span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
