import React from 'react';
import { ClubContentItem } from '../types/interactClub';
import { Calendar, ArrowUpRight, Bell, Sparkles, Mail, CheckCircle2 } from 'lucide-react';

interface EventsNewsSectionProps {
  contentItems: ClubContentItem[];
  onOpenContact: () => void;
  onOpenAdmin: () => void;
}

export const EventsNewsSection: React.FC<EventsNewsSectionProps> = ({
  contentItems,
  onOpenContact,
  onOpenAdmin,
}) => {
  const events = contentItems
    .filter((x) => x.type === 'event' && x.published)
    .sort((a, b) => (a.event_date || '9999').localeCompare(b.event_date || '9999'));

  const news = contentItems.filter((x) => x.type === 'news' && x.published);

  const formatDate = (val?: string) => {
    if (!val) return 'Date to be announced';
    try {
      return new Date(val + 'T00:00:00').toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return val;
    }
  };

  return (
    <div className="space-y-16 py-14 sm:py-20 bg-stone-50 border-b border-stone-200">
      
      {/* 04 / SAVE THE DATE (Events) */}
      <section id="events" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
              <span className="font-mono">04 /</span>
              <span>SAVE THE DATE · UPCOMING ACTIVITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
              Coming <em className="italic text-amber-700 font-normal">together.</em>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xs">
            Stay informed about general club meetings, assembly presentations, and community service days.
          </p>
        </div>

        {events.length === 0 ? (
          <div className="p-8 bg-white border border-dashed border-stone-300 rounded-2xl text-center text-xs text-stone-500">
            No upcoming events announced yet. Check back soon or visit the admin portal to add one.
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-stone-200 divide-y divide-stone-100 overflow-hidden shadow-2xs">
            {events.map((evt) => (
              <article
                key={evt.id}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-amber-50/40 transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100/80 text-amber-800 flex flex-col items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block">
                      {formatDate(evt.event_date)}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif group-hover:text-amber-800 transition-colors">
                      {evt.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-0.5 line-clamp-1 max-w-xl">
                      {evt.body}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold text-stone-500 group-hover:text-amber-800">
                  <span>View Details</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 05 / CLUB UPDATES (News) */}
      <section id="news" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
              <span className="font-mono">05 /</span>
              <span>CLUB UPDATES · ANNOUNCEMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
              What's <em className="italic text-amber-700 font-normal">new?</em>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-xs">
            Official announcements, council resolutions, and outreach milestones from O&amp;U Interact.
          </p>
        </div>

        {news.length === 0 ? (
          <div className="p-8 bg-white border border-dashed border-stone-300 rounded-2xl text-center text-xs text-stone-500">
            No announcements published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl border border-stone-200 p-6 flex flex-col justify-between shadow-2xs hover:shadow-sm transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                      Announcement
                    </span>
                    <span className="text-stone-400 text-[11px]">
                      {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {item.body}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
                  <span>O&amp;U Interact Directorate</span>
                  <span className="font-mono text-emerald-700 font-semibold">✓ Verified</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* 06 / JOIN US BANNER */}
      <section id="join" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-stone-900 rounded-3xl p-8 sm:p-12 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
              BE PART OF THE CHANGE · JOIN OUR CLUB
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-serif leading-tight">
              Your voice. Your ideas.<br />
              <em className="italic text-amber-200 font-normal">Your impact.</em>
            </h2>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-normal">
              Interested in getting involved? Speak to the Interact Club leadership at school (Room B-12, O&amp;U High School) or reach out to learn about membership and upcoming student volunteer missions.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={onOpenContact}
              className="px-6 py-3 bg-white hover:bg-amber-50 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Mail className="w-4 h-4 text-amber-700" />
              <span>Contact the Club</span>
            </button>
            <button
              onClick={onOpenAdmin}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/25 text-white text-xs font-semibold rounded-xl transition-all"
            >
              Administrator Login
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
