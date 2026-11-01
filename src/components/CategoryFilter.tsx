import React from 'react';
import { Search, SlidersHorizontal, Droplets, GraduationCap, HeartPulse, Wheat, Trees, Users, LayoutGrid } from 'lucide-react';
import { CampaignCategory } from '../types/donation';

interface CategoryFilterProps {
  selectedCategory: CampaignCategory | 'all';
  onSelectCategory: (category: CampaignCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: 'urgent' | 'funded' | 'newest' | 'target';
  onSortChange: (sort: 'urgent' | 'funded' | 'newest' | 'target') => void;
  totalFilteredCount: number;
}

const CATEGORIES: { id: CampaignCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'All Programmes', icon: LayoutGrid },
  { id: 'clean-water', label: 'Clean Water', icon: Droplets },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'healthcare', label: 'Healthcare', icon: HeartPulse },
  { id: 'food-security', label: 'Food Security', icon: Wheat },
  { id: 'climate', label: 'Climate & Nature', icon: Trees },
  { id: 'community', label: 'Community Hubs', icon: Users },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  totalFilteredCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Pills/Segmented Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm'
                  : 'bg-white text-stone-700 hover:text-stone-900 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-stone-500'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search Bar & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by programme title, country, or cause..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-stone-600 font-medium"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results count & Sort */}
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-stone-500">
          <span>
            Showing <strong className="text-stone-800">{totalFilteredCount}</strong> programme{totalFilteredCount === 1 ? '' : 's'}
          </span>

          <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-2.5 py-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <span className="text-stone-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent font-medium text-stone-800 focus:outline-none cursor-pointer"
            >
              <option value="urgent">Urgent Need First</option>
              <option value="funded">Highest Funded %</option>
              <option value="newest">Recently Launched</option>
              <option value="target">Goal Size</option>
            </select>
          </div>
        </div>

      </div>
    </div>
  );
};
