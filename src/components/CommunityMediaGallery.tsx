import React, { useState } from 'react';
import { COMMUNITY_GALLERY_IMAGES, SCHOOL_LOGO_URL } from '../data/interactData';
import { GalleryPhoto } from '../types/interactClub';
import { 
  Camera, Eye, X, Sparkles, Filter, Heart, 
  MapPin, CheckCircle2, ArrowRight, Share2, ZoomIn 
} from 'lucide-react';

interface CommunityMediaGalleryProps {
  onPledgeClick: () => void;
}

export const CommunityMediaGallery: React.FC<CommunityMediaGalleryProps> = ({
  onPledgeClick,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['all', 'Partner Visits', 'Student Leaders', 'Campus & Teachers', 'Facilities & Drives'];

  const filteredPhotos = COMMUNITY_GALLERY_IMAGES.filter((photo) => {
    return selectedCategory === 'all' || photo.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fadeIn">
      
      {/* Header with Official School Logo and Welcoming Intro */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950 text-white rounded-3xl p-8 sm:p-12 shadow-sm border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>Verified Community Media Archive</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-serif leading-tight">
            Our People &amp; School Community in Action
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Real moments from Onwards and Upwards Secondary School Interact Club, partner school outreach visits, student leaders, and community mentorship.
          </p>
        </div>

        {/* Official School Logo Display Badge */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-3xl text-center space-y-2 shrink-0 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-white p-1 border-4 border-amber-400 shadow-xl">
            <img 
              src={SCHOOL_LOGO_URL} 
              alt="Onwards and Upwards SS Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="text-xs font-extrabold text-amber-300 uppercase tracking-wider">
            Onwards &amp; Upwards SS
          </div>
          <span className="text-[10px] text-stone-300 block font-mono">
            Celebrating Achievements
          </span>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto text-xs font-bold pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl border transition-all whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat === 'all' ? `All Photos (${COMMUNITY_GALLERY_IMAGES.length})` : cat}
          </button>
        ))}
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
              <img
                src={photo.imageUrl}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                <span className="text-white text-xs font-bold flex items-center gap-1.5 bg-black/40 backdrop-blur-xs px-2.5 py-1 rounded-lg">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>View Full Photo</span>
                </span>
              </div>

              <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-amber-900 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full shadow-2xs">
                {photo.category}
              </div>
            </div>

            <div className="p-5 space-y-1.5">
              <h3 className="font-bold text-sm sm:text-base text-stone-900 font-serif leading-snug group-hover:text-amber-800 transition-colors">
                {photo.title}
              </h3>
              <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
            </div>

            <div className="px-5 pb-4 pt-1 flex items-center justify-between text-[11px] text-amber-800 font-semibold border-t border-stone-100">
              <span>Inspect Photo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-welcome"
          onClick={() => setActivePhoto(null)}
        >
          <div 
            className="bg-white max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col max-h-[95vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded">
                  {activePhoto.category}
                </span>
                <span className="font-bold text-stone-900 text-sm sm:text-base font-serif">
                  {activePhoto.title}
                </span>
              </div>

              <button
                onClick={() => setActivePhoto(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Photo Preview Container */}
            <div className="bg-stone-950 flex items-center justify-center max-h-[60vh] overflow-hidden p-2">
              <img
                src={activePhoto.imageUrl}
                alt={activePhoto.title}
                className="max-h-[58vh] max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Modal Description & Actions */}
            <div className="p-6 bg-white space-y-3">
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-normal">
                {activePhoto.caption}
              </p>

              <div className="pt-2 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <span className="text-stone-400">
                  Onwards and Upwards Secondary School · Interact Club Outreach Archive
                </span>

                <button
                  onClick={() => {
                    setActivePhoto(null);
                    onPledgeClick();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Pledge Supplies for Our Students</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
