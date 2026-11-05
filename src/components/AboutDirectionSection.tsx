import React from 'react';
import { Compass, Eye, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';

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

      </div>
    </section>
  );
};
