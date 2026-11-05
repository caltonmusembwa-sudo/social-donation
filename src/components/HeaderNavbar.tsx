import React, { useState } from 'react';
import { ActiveTab } from '../types/interactClub';
import { SCHOOL_LOGO_URL } from '../data/interactData';
import { Heart, Menu, X, ShieldCheck, FileText, Lock, Volume2, PackageCheck, Camera } from 'lucide-react';

interface HeaderNavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onPledgeClick: () => void;
  isAdminLoggedIn: boolean;
}

export const HeaderNavbar: React.FC<HeaderNavbarProps> = ({
  activeTab,
  setActiveTab,
  onPledgeClick,
  isAdminLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 transition-all duration-300">
      
      {/* Top Banner with Domain and Leadership strip */}
      <div className="bg-amber-400 text-stone-950 text-[11px] font-extrabold py-1.5 px-4 tracking-wider flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <span>O&amp;U INTERACT CLUB</span>
          <span className="opacity-40">|</span>
          <span className="text-stone-900 font-semibold font-mono">ouinteract.org</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-stone-900 font-medium text-[10px]">
          <span>Lead: Musembwa Calton &amp; Hagenimana Rasul</span>
          <span className="opacity-40">|</span>
          <span>Zero-Billing Community Material Drive</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand with Official School Logo */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNav('home')}
              className="flex items-center gap-3 text-left group focus-visible:outline-none"
            >
              {/* Official School Logo Image */}
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-red-500 shadow-sm flex items-center justify-center p-0.5 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
                <img 
                  src={SCHOOL_LOGO_URL} 
                  alt="Onwards and Upwards Secondary School Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-extrabold text-stone-900 font-serif text-lg tracking-tight group-hover:text-amber-800 transition-colors">
                    INTERACT
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 hidden sm:inline">
                    ouinteract.org
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10px] text-stone-500 font-bold tracking-widest uppercase">
                  ONWARDS &amp; UPWARDS SECONDARY SCHOOL
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs sm:text-sm font-bold text-stone-700">
            <button
              onClick={() => handleNav('home')}
              className={`transition-all py-1 duration-200 ${activeTab === 'home' ? 'text-amber-700 border-b-2 border-amber-600' : 'hover:text-stone-900 hover:-translate-y-0.5'}`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('projects')}
              className={`transition-all py-1 duration-200 ${activeTab === 'projects' ? 'text-amber-700 border-b-2 border-amber-600' : 'hover:text-stone-900 hover:-translate-y-0.5'}`}
            >
              Projects
            </button>

            <button
              onClick={() => handleNav('gallery')}
              className={`transition-all py-1 flex items-center gap-1.5 duration-200 px-2.5 py-1 rounded-lg ${
                activeTab === 'gallery'
                  ? 'bg-amber-100 text-amber-900 font-bold'
                  : 'text-amber-800 hover:bg-amber-50 hover:-translate-y-0.5'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>Gallery</span>
              <span className="text-[9px] bg-amber-500 text-stone-950 font-bold px-1.5 rounded-full font-mono">8 Photos</span>
            </button>

            <button
              onClick={() => handleNav('ads')}
              className={`transition-all py-1 flex items-center gap-1.5 duration-200 px-2.5 py-1 rounded-lg ${
                activeTab === 'ads'
                  ? 'bg-emerald-100 text-emerald-900 font-bold'
                  : 'text-emerald-700 hover:bg-emerald-50 hover:-translate-y-0.5'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Ad Studio</span>
              <span className="text-[9px] bg-emerald-600 text-white px-1.5 rounded-full font-mono">Spotify/YT</span>
            </button>

            <button
              onClick={() => handleNav('events')}
              className={`transition-all py-1 duration-200 ${activeTab === 'events' ? 'text-amber-700 border-b-2 border-amber-600' : 'hover:text-stone-900 hover:-translate-y-0.5'}`}
            >
              Events
            </button>

            <button
              onClick={() => handleNav('news')}
              className={`transition-all py-1 duration-200 ${activeTab === 'news' ? 'text-amber-700 border-b-2 border-amber-600' : 'hover:text-stone-900 hover:-translate-y-0.5'}`}
            >
              News
            </button>

            <button
              onClick={() => handleNav('school-zone')}
              className={`transition-all py-1 duration-200 ${activeTab === 'school-zone' ? 'text-amber-700 border-b-2 border-amber-600' : 'hover:text-stone-900 hover:-translate-y-0.5'}`}
            >
              School Zone
            </button>

            <button
              onClick={() => handleNav('transparency')}
              className={`transition-all py-1 flex items-center gap-1 duration-200 ${activeTab === 'transparency' ? 'text-amber-700 border-b-2 border-amber-600' : 'hover:text-stone-900 hover:-translate-y-0.5'}`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Transparency</span>
            </button>

            <button
              onClick={() => handleNav('proposal')}
              className={`transition-all py-1 flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg duration-200 ${
                activeTab === 'proposal'
                  ? 'bg-amber-100 text-amber-900 font-bold'
                  : 'text-amber-800 hover:bg-amber-50 hover:-translate-y-0.5'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-700" />
              <span>School Proposal</span>
            </button>

            <button
              onClick={() => handleNav('admin')}
              className={`py-1 px-3 border rounded-full text-xs font-semibold flex items-center gap-1 transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'border-stone-300 text-stone-600 hover:text-stone-900 hover:border-stone-400 hover:-translate-y-0.5'
              }`}
            >
              <Lock className="w-3 h-3 text-amber-500" />
              <span>{isAdminLoggedIn ? 'Dashboard' : 'Admin'}</span>
            </button>
          </nav>

          {/* Right Controls: PLEDGE SUPPLIES (Zero Money) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onPledgeClick}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center gap-2 active:scale-95 hover:-translate-y-0.5"
            >
              <PackageCheck className="w-4 h-4 text-stone-950" />
              <span>PLEDGE SUPPLIES</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={onPledgeClick}
              className="bg-amber-500 text-stone-950 font-bold text-xs px-3 py-1.5 rounded-lg"
            >
              PLEDGE
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:text-stone-900 rounded-lg text-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-stone-200 py-3 space-y-1.5 text-xs sm:text-sm font-semibold animate-welcome">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'home' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700'}`}
            >
              Home (About &amp; Overview)
            </button>

            <button
              onClick={() => handleNav('ads')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${activeTab === 'ads' ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-emerald-800'}`}
            >
              <span>Ad Studio (Spotify, YouTube, LinkedIn)</span>
              <span className="text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full">New</span>
            </button>

            <button
              onClick={() => handleNav('projects')}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'projects' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700'}`}
            >
              Projects &amp; Supplies
            </button>

            <button
              onClick={() => handleNav('gallery')}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between ${activeTab === 'gallery' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700'}`}
            >
              <span>School Community Photo Gallery</span>
              <span className="text-[10px] bg-amber-500 text-stone-950 font-bold px-2 py-0.5 rounded-full">8 Photos</span>
            </button>

            <button
              onClick={() => handleNav('events')}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'events' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700'}`}
            >
              Events (Save the Date)
            </button>

            <button
              onClick={() => handleNav('news')}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'news' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700'}`}
            >
              Club Updates &amp; News
            </button>

            <button
              onClick={() => handleNav('school-zone')}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'school-zone' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700'}`}
            >
              School Zone &amp; Leaderboard
            </button>

            <button
              onClick={() => handleNav('transparency')}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'transparency' ? 'bg-amber-100 text-amber-900 font-bold' : 'text-stone-700'}`}
            >
              Material Transparency &amp; Audit
            </button>

            <button
              onClick={() => handleNav('proposal')}
              className={`w-full text-left px-3 py-2 rounded-lg font-bold ${activeTab === 'proposal' ? 'bg-amber-100 text-amber-900' : 'text-amber-800'}`}
            >
              School Administration Proposal
            </button>

            <button
              onClick={() => handleNav('admin')}
              className={`w-full text-left px-3 py-2 rounded-lg ${activeTab === 'admin' ? 'bg-stone-900 text-white font-bold' : 'text-stone-700'}`}
            >
              Club Administration Dashboard
            </button>
          </div>
        )}

      </div>
    </header>
  );
};
