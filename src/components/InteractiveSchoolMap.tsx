import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SchoolLeaderboardEntry } from '../types/interactClub';
import { 
  MapPin, School, Navigation, PackageCheck, Users, 
  ArrowRight, Sparkles, Filter, Layers, ZoomIn, ZoomOut,
  Car, Clock, Compass, ExternalLink, Calendar, CheckCircle2
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
  const routePolylineRef = useRef<L.Polyline | null>(null);

  const [activeSchool, setActiveSchool] = useState<SchoolLeaderboardEntry | null>(() => {
    return schools[0] || null;
  });
  const [selectedRegion, setSelectedRegion] = useState<string>('all');

  const filteredSchools = schools.filter((s) => {
    if (selectedRegion === 'all') return true;
    if (selectedRegion === 'central') return s.region.toLowerCase().includes('central') || s.region.toLowerCase().includes('wakiso') || s.region.toLowerCase().includes('mpigi') || s.region.toLowerCase().includes('luweero');
    if (selectedRegion === 'western') return s.region.toLowerCase().includes('western');
    if (selectedRegion === 'eastern') return s.region.toLowerCase().includes('eastern');
    if (selectedRegion === 'northern') return s.region.toLowerCase().includes('northern');
    return true;
  });

  // Buloba Host Coordinates (Origin for transportation & route lines)
  const BULOBA_COORDS: [number, number] = [0.3345, 32.4632];

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return; // Prevent double initialization

    // Center on Uganda
    const initialLat = 0.8500;
    const initialLng = 32.4000;

    const map = L.map(mapContainerRef.current, {
      center: [initialLat, initialLng],
      zoom: 7,
      zoomControl: false,
      scrollWheelZoom: true,
    });

    // Clean OpenStreetMap Tile Layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> · PEAS Uganda Transportation Network',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers & Route lines when schools or filter changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    const bounds: L.LatLngExpression[] = [];

    filteredSchools.forEach((school) => {
      const lat = school.lat;
      const lng = school.lng;
      bounds.push([lat, lng]);

      const isHost = school.id === 'peas-buloba' || school.name.toLowerCase().includes('buloba');
      const isNama = school.id === 'peas-samling-nama' || school.name.toLowerCase().includes('nama');
      const isTop3 = school.rank <= 3;

      const markerHtml = `
        <div class="group relative cursor-pointer transform -translate-x-1/2 -translate-y-full transition-transform hover:scale-110">
          <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-xl border-2 ${
            isHost 
              ? 'bg-[#15244a] text-[#ffcf45] border-[#ffcf45] ring-2 ring-amber-400/50' 
              : isNama
              ? 'bg-emerald-800 text-white border-emerald-300 ring-2 ring-emerald-400/40'
              : isTop3 
              ? 'bg-amber-700 text-white border-amber-300' 
              : 'bg-white text-stone-900 border-stone-300'
          }">
            <span class="font-black text-[12px] font-mono">
              ${isHost ? '★ Buloba' : `#${school.rank}`}
            </span>
            <span class="text-[11px] font-bold truncate max-w-[100px] hidden sm:inline">
              ${school.name.replace('PEAS ', '').split(' ')[0]}
            </span>
          </div>
          <div class="w-3 h-3 rotate-45 mx-auto -mt-2 shadow-xs ${
            isHost ? 'bg-[#15244a]' : isNama ? 'bg-emerald-800' : isTop3 ? 'bg-amber-700' : 'bg-white'
          }"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-peas-marker',
        html: markerHtml,
        iconSize: [140, 48],
        iconAnchor: [70, 48],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      // Popup Content
      const directionsUrl = school.transportInfo?.googleMapsDirectionsUrl || 
        `https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=${lat},${lng}`;

      const popupContent = `
        <div style="font-family:'DM Sans',sans-serif; padding:6px; max-width:260px;">
          <div style="font-size:10px; font-weight:800; text-transform:uppercase; color:#b45309; letter-spacing:0.5px;">
            ${school.district} · Rank #${school.rank}
          </div>
          <h4 style="font-family:'Outfit',sans-serif; font-size:15px; font-weight:800; margin:4px 0 2px; color:#1c1917;">
            ${school.name}
          </h4>
          <div style="font-size:11px; color:#78716c; margin-bottom:8px;">
            📍 ${school.location}
          </div>
          
          <div style="background:#fef3c7; border:1px solid #fde68a; padding:6px 8px; border-radius:8px; margin-bottom:8px; font-size:11px; color:#92400e;">
            <div style="font-weight:700;">🛣️ ${school.transportInfo?.routeHighway || 'National Highway'}</div>
            <div style="font-size:10px; margin-top:2px;">🚗 ${school.transportInfo?.distanceFromBulobaKm} km from Buloba (${school.transportInfo?.estimatedDriveTime})</div>
          </div>

          <div style="background:#f5f5f4; padding:6px 8px; border-radius:8px; margin-bottom:8px; font-size:11px;">
            <div style="display:flex; justify-content:space-between; font-weight:700; color:#15803d; margin-bottom:2px;">
              <span>${school.progressPercent}% Goal Met</span>
              <span>${school.itemsPledgedCount}/${school.targetCount} Kits</span>
            </div>
            <div style="color:#57534e; font-size:10px;">Lead: ${school.coordinator}</div>
          </div>

          <a href="${directionsUrl}" target="_blank" rel="noopener noreferrer" style="display:block; text-align:center; background:#15803d; color:white; font-size:11px; font-weight:700; padding:6px 10px; border-radius:6px; text-decoration:none; margin-top:6px;">
            🗺️ Get Google Maps Directions →
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);

      marker.on('click', () => {
        setActiveSchool(school);
      });

      markersRef.current[school.id] = marker;
    });

    // Fit bounds
    if (bounds.length > 0) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, { padding: [50, 50], maxZoom: 13 });
    }
  }, [filteredSchools]);

  // Draw transportation route line from Buloba to activeSchool
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (routePolylineRef.current) {
      routePolylineRef.current.remove();
      routePolylineRef.current = null;
    }

    if (activeSchool && activeSchool.id !== 'peas-buloba') {
      const latlngs: [number, number][] = [
        BULOBA_COORDS,
        [activeSchool.lat, activeSchool.lng],
      ];

      const polyline = L.polyline(latlngs, {
        color: '#b45309',
        weight: 3.5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(map);

      routePolylineRef.current = polyline;
    }
  }, [activeSchool]);

  // Center on school when selected externally
  useEffect(() => {
    if (!selectedSchoolName || !mapInstanceRef.current) return;
    const match = schools.find((s) => s.name.toLowerCase().includes(selectedSchoolName.toLowerCase()) || selectedSchoolName.toLowerCase().includes(s.name.toLowerCase()));
    if (match) {
      setActiveSchool(match);
      mapInstanceRef.current.setView([match.lat, match.lng], 12, { animate: true });
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
      const bounds = filteredSchools.map((s) => [s.lat, s.lng] as [number, number]);
      mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  const handleSelectCard = (school: SchoolLeaderboardEntry) => {
    setActiveSchool(school);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([school.lat, school.lng], 12, { animate: true });
      const marker = markersRef.current[school.id];
      if (marker) marker.openPopup();
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm space-y-0">
      
      {/* Top Map Toolbar with Background Branding */}
      <div 
        className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 text-white border-b border-stone-200 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(28,25,23,0.95), rgba(41,37,36,0.90)), url('/assets/aistudio/Peas_Sampling_Nama_High_School_Visit_cce89195.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center 40%',
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-widest">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>PEAS Uganda Transportation &amp; Directions Hub</span>
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono">
                Term 3 · Latest November 2026
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
              All 10 PEAS Partner Schools Across Uganda
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Explore real-time transportation routes, distances in km from host campus <strong>PEAS Onwards &amp; Upwards Buloba</strong>, transit tips, and one-tap turn-by-turn directions.
            </p>
          </div>

          {/* Region Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-semibold">
            <button
              onClick={() => setSelectedRegion('all')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedRegion === 'all'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/20'
              }`}
            >
              All Uganda ({schools.length})
            </button>
            <button
              onClick={() => setSelectedRegion('central')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedRegion === 'central'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/20'
              }`}
            >
              Central (Buloba, Nama, Bombo)
            </button>
            <button
              onClick={() => setSelectedRegion('western')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedRegion === 'western'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/20'
              }`}
            >
              Western (Pioneer, Ibanda, Kabarole)
            </button>
            <button
              onClick={() => setSelectedRegion('eastern')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedRegion === 'eastern'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/20'
              }`}
            >
              Eastern (Mayuge, Toroma)
            </button>
            <button
              onClick={() => setSelectedRegion('northern')}
              className={`px-3 py-1.5 rounded-xl border transition-all ${
                selectedRegion === 'northern'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-sm'
                  : 'bg-white/10 text-stone-200 border-white/20 hover:bg-white/20'
              }`}
            >
              Northern (Lamwo Kuc)
            </button>
          </div>
        </div>
      </div>

      {/* Map Canvas + Active School Spotlight Container */}
      <div className="relative">
        
        {/* Leaflet Map Div */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-[500px] sm:h-[560px] z-10 bg-stone-100"
          style={{ cursor: 'grab' }}
        />

        {/* Floating Custom Map Controls */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-xl bg-white/95 hover:bg-white text-stone-800 border border-stone-200 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-xl bg-white/95 hover:bg-white text-stone-800 border border-stone-200 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetView}
            className="w-10 h-10 rounded-xl bg-white/95 hover:bg-white text-amber-800 border border-stone-200 shadow-md flex items-center justify-center transition-all hover:scale-105 active:scale-95 text-xs font-bold"
            title="Reset to Full Uganda Network"
          >
            <Navigation className="w-4 h-4 text-amber-700" />
          </button>
        </div>

        {/* Floating Active School Spotlight Card with Transportation Route Details */}
        {activeSchool && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:max-w-lg z-20 bg-white/98 backdrop-blur-md border border-stone-200 rounded-3xl p-5 shadow-2xl space-y-3.5 animate-welcome max-h-[85%] overflow-y-auto">
            
            {/* Header with Photo Thumbnail if available */}
            <div className="flex items-start gap-3">
              {activeSchool.campusPhoto && (
                <div className="w-16 h-16 rounded-2xl overflow-hidden border border-stone-200 shrink-0 shadow-xs bg-stone-100">
                  <img
                    src={activeSchool.campusPhoto}
                    alt={activeSchool.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-mono">
                    {activeSchool.id === 'peas-buloba' ? '★ Host Campus' : `Rank #${activeSchool.rank}`}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-500 font-semibold">{activeSchool.district}</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-tight truncate">
                  {activeSchool.name}
                </h4>
                <div className="flex items-center gap-1 text-xs text-stone-500">
                  <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                  <span className="truncate">{activeSchool.location}</span>
                </div>
              </div>

              <span className="text-xs font-extrabold text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-md shrink-0 border border-emerald-200/60">
                {activeSchool.progressPercent}% Met
              </span>
            </div>

            {/* Transportation & Route Details Box */}
            <div className="bg-stone-50 rounded-2xl p-3.5 border border-stone-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between font-bold text-stone-900">
                <span className="flex items-center gap-1.5 text-amber-900">
                  <Car className="w-3.5 h-3.5 text-amber-600" />
                  <span>Highway Route:</span>
                </span>
                <span className="text-stone-700 font-mono text-[11px] text-right">
                  {activeSchool.transportInfo.distanceFromBulobaKm === 0 
                    ? '0 km (Interact Base)' 
                    : `${activeSchool.transportInfo.distanceFromBulobaKm} km from Buloba`}
                </span>
              </div>
              <div className="text-stone-800 font-semibold text-xs">
                🛣️ {activeSchool.transportInfo.routeHighway}
              </div>
              <div className="text-[11px] text-stone-600 flex items-center gap-1">
                <Clock className="w-3 h-3 text-stone-400 shrink-0" />
                <span>Est. Travel Time: <strong>{activeSchool.transportInfo.estimatedDriveTime}</strong></span>
              </div>
              <div className="text-[11px] text-stone-600 bg-white p-2 rounded-xl border border-stone-200/60">
                💡 <strong>Accessibility:</strong> {activeSchool.transportInfo.transportAccessibility}
              </div>
            </div>

            {/* Supply Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-stone-800">
                <span className="text-emerald-800 font-mono">{activeSchool.itemsPledgedCount} Pledged</span>
                <span className="text-stone-400 text-[11px]">Goal: {activeSchool.targetCount} Kits</span>
              </div>
              <div className="w-full bg-stone-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, activeSchool.progressPercent)}%` }}
                />
              </div>
              <div className="text-[11px] text-stone-500 pt-0.5">
                Lead: <strong>{activeSchool.coordinator}</strong> · {activeSchool.studentsSupported} students supported
              </div>
            </div>

            {/* Action Buttons: Google Maps Navigation + Pledge Supplies */}
            <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-2">
              <a
                href={activeSchool.transportInfo.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 hover:-translate-y-0.5"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-400" />
                <span>Directions from Buloba</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>

              <button
                onClick={() => onPledgeToSchool(activeSchool.name)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-xs transition-all flex items-center gap-1 hover:-translate-y-0.5"
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
        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest shrink-0 mr-1 flex items-center gap-1">
          <Car className="w-3 h-3 text-amber-700" />
          <span>PEAS Campuses:</span>
        </span>
        {filteredSchools.map((school) => {
          const isSelected = activeSchool?.id === school.id;
          return (
            <button
              key={school.id}
              onClick={() => handleSelectCard(school)}
              className={`px-3 py-2 rounded-xl border text-left shrink-0 transition-all flex items-center gap-2 ${
                isSelected
                  ? 'bg-white border-amber-600 text-stone-900 shadow-xs ring-1 ring-amber-600'
                  : 'bg-white/80 border-stone-200 text-stone-600 hover:bg-white hover:border-stone-300'
              }`}
            >
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                school.id === 'peas-buloba'
                  ? 'bg-[#15244a] text-[#ffcf45]'
                  : school.rank <= 3 
                  ? 'bg-amber-500 text-stone-950' 
                  : 'bg-stone-200 text-stone-700'
              }`}>
                {school.id === 'peas-buloba' ? '★' : school.rank}
              </span>
              <div>
                <div className="font-bold truncate max-w-[150px]">{school.name}</div>
                <div className="text-[10px] text-stone-400">{school.district} · {school.transportInfo.distanceFromBulobaKm} km</div>
              </div>
            </button>
          );
        })}
      </div>

    </div>
  );
};
