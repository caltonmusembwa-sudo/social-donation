import React from 'react';
import { Heart, PlusCircle, UserCheck, ShieldCheck, Globe, Search } from 'lucide-react';
import { CurrencyCode } from '../types/donation';
import { CURRENCIES } from '../data/currencies';

interface NavbarProps {
  activeTab: 'explore' | 'my-impact';
  setActiveTab: (tab: 'explore' | 'my-impact') => void;
  onOpenCreateModal: () => void;
  onOpenHowItWorks: () => void;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (currency: CurrencyCode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalUserDonationsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenCreateModal,
  onOpenHowItWorks,
  selectedCurrency,
  onSelectCurrency,
  searchQuery,
  setSearchQuery,
  totalUserDonationsCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-3 text-left group focus-visible:outline-none"
            >
              <div className="w-11 h-11 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
                <Heart className="w-6 h-6 fill-white text-emerald-600" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-stone-900 font-serif flex items-center gap-1.5">
                  KindPulse
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </span>
                <span className="block text-xs font-medium text-stone-500">
                  Community Donation Programmes
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
              <button
                onClick={() => setActiveTab('explore')}
                className={`py-1 transition-colors ${
                  activeTab === 'explore'
                    ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Browse Programmes
              </button>

              <button
                onClick={() => setActiveTab('my-impact')}
                className={`py-1 flex items-center gap-1.5 transition-colors ${
                  activeTab === 'my-impact'
                    ? 'text-emerald-700 font-semibold border-b-2 border-emerald-600'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>My Giving Footprint</span>
                {totalUserDonationsCount > 0 && (
                  <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.2 rounded-full font-bold">
                    {totalUserDonationsCount}
                  </span>
                )}
              </button>

              <button
                onClick={onOpenHowItWorks}
                className="text-stone-600 hover:text-stone-900 py-1 transition-colors flex items-center gap-1"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verification &amp; Transparency</span>
              </button>
            </nav>
          </div>

          {/* Right controls: Currency, Search input, & Start Programme button */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Currency selector */}
            <div className="flex items-center gap-1 text-xs text-stone-600 bg-stone-100 hover:bg-stone-200/80 rounded-lg px-2.5 py-1.5 transition-colors">
              <Globe className="w-3.5 h-3.5 text-stone-500" />
              <select
                value={selectedCurrency}
                onChange={(e) => onSelectCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent font-semibold text-stone-800 focus:outline-none cursor-pointer"
                title="Select Currency"
              >
                {Object.values(CURRENCIES).map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.symbol})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Create Programme Button */}
            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-all shadow-sm active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Start a Programme</span>
              <span className="sm:hidden">Start</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab strip */}
        <div className="flex md:hidden items-center justify-between border-t border-stone-100 py-2.5 text-xs font-medium">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('explore')}
              className={activeTab === 'explore' ? 'text-emerald-700 font-bold' : 'text-stone-500'}
            >
              Browse Programmes
            </button>
            <button
              onClick={() => setActiveTab('my-impact')}
              className={`flex items-center gap-1 ${activeTab === 'my-impact' ? 'text-emerald-700 font-bold' : 'text-stone-500'}`}
            >
              My Impact ({totalUserDonationsCount})
            </button>
          </div>
          <button
            onClick={onOpenHowItWorks}
            className="text-stone-500 flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verification
          </button>
        </div>

      </div>
    </header>
  );
};
