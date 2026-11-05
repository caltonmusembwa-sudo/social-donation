import React, { useState } from 'react';
import { School, Heart, Check, Mail, ShieldCheck, FileText, Volume2, PackageCheck } from 'lucide-react';
import { ActiveTab } from '../types/interactClub';

interface FooterSectionProps {
  onNavTab: (tab: ActiveTab) => void;
  onOpenTransparency: () => void;
  onOpenContact: () => void;
  onOpenProposal: () => void;
  onOpenAds: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onNavTab,
  onOpenTransparency,
  onOpenContact,
  onOpenProposal,
  onOpenAds,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top Grid: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-stone-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-red-500 shadow-sm flex items-center justify-center p-0.5 shrink-0">
                <img
                  src="/assets/aistudio/onwards_e90da280.jpg"
                  alt="Onwards and Upwards SS Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-white font-serif tracking-tight block">
                  KidsConnect Community Fund
                </span>
                <span className="text-[11px] text-amber-400 font-semibold uppercase tracking-wider">
                  Interact Club of Onwards &amp; Upwards Secondary School
                </span>
              </div>
            </div>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-md">
              A student-led initiative sponsored by Rotary International. We connect community physical supplies with vulnerable students across 18 partner schools. Zero money or billing involved.
            </p>

            <div className="p-3 bg-stone-950/70 border border-stone-800 rounded-xl space-y-1 text-[11px]">
              <div className="text-amber-400 font-semibold">Leadership Directorate:</div>
              <div className="text-stone-300">Project Manager: <strong>MUSEMBWA CALTON</strong> (caltonmusembwa@gmail.com)</div>
              <div className="text-stone-300">Club President: <strong>HAGENIMANA RASUL</strong></div>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Direct Material Delivery · Non-Monetary Community Model</span>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-6 space-y-3">
            <h4 className="text-sm font-bold text-white font-serif">
              Stay updated on how your community is changing.
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Get monthly transparency reports, student milestone announcements, and partner school dispatches directly to your inbox.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/70 border border-emerald-700/60 rounded-xl text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you for subscribing! You'll receive our next community dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-4 py-2.5 bg-stone-800 border border-stone-700 rounded-xl text-white placeholder:text-stone-500 text-xs focus:outline-none focus:border-amber-500 flex-1"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-2.5 rounded-xl transition-colors shadow-2xs whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Quick Links & Handover Badges */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-stone-800">
          
          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 text-stone-400">
            <button onClick={() => onNavTab('home')} className="hover:text-white transition-colors">
              Home
            </button>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <button onClick={onOpenAds} className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" />
              <span>Ad Studio (Spotify &amp; YT)</span>
            </button>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <button onClick={() => onNavTab('projects')} className="hover:text-white transition-colors">
              Our Projects
            </button>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <button onClick={() => onNavTab('gallery')} className="hover:text-amber-300 font-semibold transition-colors">
              Photo Gallery
            </button>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <button onClick={() => onNavTab('events')} className="hover:text-white transition-colors">
              Events
            </button>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <button onClick={() => onNavTab('school-zone')} className="hover:text-white transition-colors">
              School Zone
            </button>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <button onClick={onOpenTransparency} className="hover:text-white transition-colors">
              Material Transparency
            </button>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <button onClick={onOpenProposal} className="hover:text-amber-300 font-bold transition-colors">
              School Proposal
            </button>
            <span aria-hidden="true" className="text-stone-700">|</span>
            <button onClick={onOpenContact} className="hover:text-white transition-colors">
              Contact &amp; Room B-12
            </button>
          </div>

          {/* Supply Handover Badges (No Billing / No Money) */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-stone-500 uppercase tracking-widest font-semibold mr-1">
              Supply Handover:
            </span>
            <span className="bg-stone-800 border border-stone-700 text-amber-300 font-bold px-2 py-1 rounded text-[10px] tracking-tight">
              School Drop-off (B-12)
            </span>
            <span className="bg-stone-800 border border-stone-700 text-emerald-300 font-bold px-2 py-1 rounded text-[10px] tracking-tight">
              Volunteer Van Pickup
            </span>
            <span className="bg-stone-800 border border-stone-700 text-sky-300 font-bold px-2 py-1 rounded text-[10px] tracking-tight">
              Zero Money Model
            </span>
          </div>

        </div>

        {/* Bottom Copyright & Legal Disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-[11px]">
          <div>
            © 2026 KidsConnect Community Fund · O&amp;U Interact Club of Onwards &amp; Upwards Secondary School (ouinteract.org). All Rights Reserved.
          </div>
          <div className="flex items-center gap-1.5 text-stone-400">
            <Heart className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Service Above Self · Rotary Youth Services</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
