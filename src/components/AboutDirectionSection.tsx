import React from 'react';
import { Compass, Eye, HeartHandshake, Sparkles, CheckCircle2, Share2, Quote } from 'lucide-react';
import { DAILY_INSPIRATIONAL_QUOTES } from '../data/interactData';

export const AboutDirectionSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-white border-b border-stone-200 scroll-mt-20">
      
      {/* Ticker from O&U site */}
      <div className="bg-amber-400 text-stone-950 font-extrabold text-xs tracking-widest uppercase py-3 px-4 mb-14 overflow-x-auto whitespace-nowrap text-center shadow-2xs">
        <div className="flex items-center justify-around gap-6 max-w-7xl mx-auto">
          <span>✳ DREAM BIG</span>
          <span>✳ SERVE OTHERS</span>
          <span>✳ BUILD COMMUNITY</span>
          <span>✳ LEAD WITH HEART</span>
          <span>✳ ONWARDS &amp; UPWARDS</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* 01 / WHO WE ARE */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
            <span className="font-mono">01 /</span>
            <span>WHO WE ARE · OUINTERACT.ORG</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 font-serif leading-[1.12]">
                A club with<br />
                <em className="italic text-amber-700 font-normal">a bigger purpose.</em>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
              <p className="font-bold text-lg sm:text-xl text-stone-900 leading-snug">
                O&amp;U Interact is a student-led service club at Onwards and Upwards Secondary School.
              </p>
              <p className="text-stone-600">
                We bring students together to develop leadership skills, build friendships and take action on issues that matter. Through service projects, community feeding, and creative initiatives, we aim to make our school and community a better place.
              </p>

              {/* Values */}
              <div className="flex flex-wrap gap-2 pt-2 text-xs font-extrabold">
                <span className="px-3.5 py-2 bg-stone-100 text-stone-800 rounded-xl border border-stone-200">
                  01&nbsp; Compassion
                </span>
                <span className="px-3.5 py-2 bg-stone-100 text-stone-800 rounded-xl border border-stone-200">
                  02&nbsp; Teamwork
                </span>
                <span className="px-3.5 py-2 bg-stone-100 text-stone-800 rounded-xl border border-stone-200">
                  03&nbsp; Integrity
                </span>
              </div>
            </div>
          </div>

          {/* Authentic Campus Background Banner */}
          <div 
            className="rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-md mt-6"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(12,10,9,0.92) 25%, rgba(28,25,23,0.85) 65%, rgba(120,53,15,0.75) 100%), url('/assets/aistudio/images__4__88a8e4c6.jpg')",
              backgroundSize: 'cover',
              backgroundPosition: 'center 20%',
            }}
          >
            <div className="relative z-10 max-w-2xl space-y-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono px-2.5 py-1 rounded-full uppercase tracking-wider font-bold">
                PEAS Uganda Partner Network
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                "Keep going; everything you need will come at the perfect time."
              </h3>
              <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                From PEAS Onwards and Upwards Buloba to Samling Nama High School in Mpigi, our students and teachers stand shoulder to shoulder, building lasting educational equity.
              </p>
            </div>
          </div>
        </div>

        {/* 02 / OUR DIRECTION */}
        <div className="pt-8 border-t border-stone-100 space-y-6">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
            <span className="font-mono">02 /</span>
            <span>OUR DIRECTION &amp; PILLARS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Mission */}
            <article className="p-7 rounded-3xl bg-amber-400 text-stone-950 flex flex-col justify-between space-y-6 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center text-xl font-bold">
                ✳
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif">
                  Our mission
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-stone-900 font-medium">
                  To inspire students to serve others, grow as responsible leaders and create meaningful positive change in our community.
                </p>
              </div>
            </article>

            {/* Vision */}
            <article className="p-7 rounded-3xl bg-blue-700 text-white flex flex-col justify-between space-y-6 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold">
                ↗
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif">
                  Our vision
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-blue-100">
                  A connected generation of confident, compassionate young people making a lasting difference in schools across Uganda.
                </p>
              </div>
            </article>

            {/* Promise */}
            <article className="p-7 rounded-3xl bg-rose-600 text-white flex flex-col justify-between space-y-6 shadow-2xs">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-xl font-bold">
                ♡
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold font-serif">
                  Our promise
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-rose-100">
                  Every idea matters. Every member can contribute. Every small act of service can change a student’s future.
                </p>
              </div>
            </article>

          </div>
        </div>

        {/* 03 / EVERYDAY INSPIRATIONAL QUOTES & COMPASSION (Requested Feature) */}
        <div className="pt-10 border-t border-stone-100 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
                <span className="font-mono">03 /</span>
                <span>EVERYDAY QUOTES · WORDS THAT GUIDE US</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
                Daily Reflections on Service, Giving &amp; Grace
              </h3>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              4 Timeless Principles of the O&amp;U Interact Spirit
            </span>
          </div>

          {/* 4 Quotes Animated Grid with Different Animation & Transition Styles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAILY_INSPIRATIONAL_QUOTES.map((q, idx) => {
              // Apply different animation classes as requested
              const animClasses = [
                'animate-quote-zoom hover:scale-102',
                'animate-quote-flip hover:scale-102',
                'animate-quote-slide hover:scale-102',
                'animate-quote-bounce hover:scale-102',
              ];

              return (
                <div
                  key={q.id}
                  className={`bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between group ${animClasses[idx % animClasses.length]}`}
                >
                  <div>
                    {/* Quote Image Poster */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                      <img
                        src={q.imageUrl}
                        alt={q.quote}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                      
                      <div className="absolute top-3 left-3">
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border ${q.badgeColor}`}>
                          {q.dayLabel.split(' ')[0]}
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white">
                        <span className="text-[10px] font-mono font-bold text-amber-300 block mb-0.5">
                          {q.badge}
                        </span>
                        <div className="font-bold text-sm leading-tight text-white font-serif line-clamp-2">
                          "{q.quote}"
                        </div>
                      </div>
                    </div>

                    {/* Attribution & Context */}
                    <div className="p-5 space-y-2">
                      <div className="font-bold text-stone-900 text-xs sm:text-sm font-serif">
                        — {q.author}
                      </div>
                      <p className="text-stone-500 text-[11px] leading-relaxed line-clamp-3">
                        {q.subtext}
                      </p>
                    </div>
                  </div>

                  {/* Card Share action */}
                  <div className="p-5 pt-0 border-t border-stone-100 flex items-center justify-between mt-2">
                    <span className="text-[10px] text-stone-400 font-mono">
                      Interact Daily
                    </span>
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `✨ "${q.quote}" — ${q.author}\n${q.subtext}\n\nSupport PEAS schools at ouinteract.org`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:text-emerald-800 text-xs font-bold flex items-center gap-1 hover:underline"
                      title="Share quote on WhatsApp"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
