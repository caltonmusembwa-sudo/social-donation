import React, { useState } from 'react';
import { INTERACT_BLOG_POSTS, InteractBlogPost } from '../data/interactData';
import { BookOpen, Calendar, User, Sparkles, ArrowRight, X, Heart, ShieldCheck, Utensils, AlertTriangle, Cpu } from 'lucide-react';

interface InteractStoriesBlogTabProps {
  onDonateClick: () => void;
}

export const InteractStoriesBlogTab: React.FC<InteractStoriesBlogTabProps> = ({
  onDonateClick,
}) => {
  const [selectedPost, setSelectedPost] = useState<InteractBlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filtered = INTERACT_BLOG_POSTS.filter((post) => {
    return filterCategory === 'all' || post.category === filterCategory;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Community Feeding': return Utensils;
      case 'Disaster Relief': return AlertTriangle;
      default: return Cpu;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          <span>Section 3 Feature · Official School Outreach Blog</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
          The "Interact Stories" Blog
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          Showcasing O&amp;U High School students actively volunteering in local feeding drives, flood relief, and community mentorship.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto text-xs font-semibold">
        {['all', 'Community Feeding', 'Disaster Relief', 'STEM & Skills'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3.5 py-1.5 rounded-lg border transition-all ${
              filterCategory === cat
                ? 'bg-amber-700 text-white border-amber-700 shadow-2xs'
                : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
            }`}
          >
            {cat === 'all' ? 'All Stories' : cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid (Zero stock photos, rich typographic presentation) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((post) => {
          const Icon = getCategoryIcon(post.category);
          return (
            <article
              key={post.id}
              className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group hover:-translate-y-1 duration-300"
            >
              <div>
                {post.imageUrl && (
                  <div className="aspect-[16/10] w-full overflow-hidden bg-stone-100 relative">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-amber-900 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-md shadow-2xs flex items-center gap-1">
                      <Icon className="w-3 h-3 text-amber-700" />
                      <span>{post.category}</span>
                    </div>
                  </div>
                )}

                <div className="p-6 space-y-3">
                  {!post.imageUrl && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60 flex items-center gap-1">
                        <Icon className="w-3.5 h-3.5 text-amber-700" />
                        <span>{post.category}</span>
                      </span>
                      <span className="text-stone-400 font-medium text-[11px]">
                        {post.date}
                      </span>
                    </div>
                  )}

                  {post.imageUrl && (
                    <div className="text-[11px] text-stone-400 font-medium">
                      {post.date}
                    </div>
                  )}

                  {/* Title */}
                  <h3
                    onClick={() => setSelectedPost(post)}
                    className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-snug cursor-pointer group-hover:text-amber-800 transition-colors"
                  >
                    {post.title}
                  </h3>

                {/* Summary */}
                <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                  {post.summary}
                </p>

                {/* Key Highlight */}
                <div className="p-2.5 bg-emerald-50 text-emerald-900 rounded-xl text-[11px] font-semibold border border-emerald-100 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{post.keyHighlight}</span>
                </div>
              </div>
            </div>

            {/* Author & Read More */}
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-stone-900 text-xs block">
                    {post.author}
                  </span>
                  <span className="text-[10px] text-stone-400">
                    {post.authorRole}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950"
                >
                  <span>Read Essay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </article>
          );
        })}
      </div>

      {/* Single Post Reading Drawer / Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
          <div 
            className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-amber-50/70">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Interact Stories Essay
              </span>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-5 text-stone-800 text-xs sm:text-sm">
              <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2.5 py-1 rounded-md">
                {selectedPost.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">
                {selectedPost.title}
              </h3>
              <div className="flex items-center gap-2 text-stone-500 text-xs pb-3 border-b border-stone-100">
                <span>By <strong>{selectedPost.author}</strong> ({selectedPost.authorRole})</span>
                <span aria-hidden="true">·</span>
                <span>{selectedPost.date}</span>
              </div>

              {selectedPost.imageUrl && (
                <div className="rounded-2xl overflow-hidden aspect-[16/9] w-full border border-stone-200">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-3.5 bg-emerald-50 rounded-xl text-emerald-950 text-xs font-medium border border-emerald-200">
                Key Accomplishment: {selectedPost.keyHighlight}
              </div>

              <div className="whitespace-pre-line leading-relaxed text-stone-700 space-y-3 font-normal">
                {selectedPost.content}
              </div>
            </div>

            <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-xs text-stone-600 font-semibold hover:text-stone-900"
              >
                Close Story
              </button>
              <button
                onClick={() => {
                  setSelectedPost(null);
                  onDonateClick();
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:-translate-y-0.5 transition-all"
              >
                <Heart className="w-3.5 h-3.5 fill-white" />
                <span>Pledge Supplies for Outreach</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
