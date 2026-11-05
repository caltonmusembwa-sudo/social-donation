import React from 'react';
import { FORMAL_PROPOSAL } from '../data/interactData';
import { FileText, Printer, CheckCircle2, ShieldCheck, School, Award, Calendar, User, ArrowRight } from 'lucide-react';

interface ProposalTabProps {
  onDonateClick: () => void;
  onExploreProjects: () => void;
}

export const ProposalTab: React.FC<ProposalTabProps> = ({
  onDonateClick,
  onExploreProjects,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fadeIn">
      
      {/* Top Banner with Print Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-widest">
            <FileText className="w-4 h-4 text-amber-600" />
            <span>Official School Governance Document</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-1">
            Official Administration Proposal
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Submitted to The Headteacher &amp; School Administration of O&amp;U High School.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="self-start sm:self-auto flex items-center gap-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-800 font-semibold text-xs px-4 py-2.5 rounded-xl shadow-2xs transition-colors"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save Official Document</span>
        </button>
      </div>

      {/* Formal Document Container */}
      <div className="bg-white rounded-3xl border border-stone-200 p-8 sm:p-12 shadow-sm space-y-8 text-stone-800">
        
        {/* Document Header Header */}
        <div className="border-b-2 border-stone-900 pb-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white border-2 border-red-500 shadow-xs flex items-center justify-center p-0.5">
                <img 
                  src="/assets/aistudio/onwards_e90da280.jpg" 
                  alt="Onwards and Upwards SS Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-stone-900 font-serif uppercase tracking-tight">
                  Interact Club of O&amp;U High School
                </h1>
                <p className="text-xs text-stone-500 font-semibold tracking-wider uppercase">
                  Rotary Youth Services Partner · Community Outreach Directorate
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider">
                Formal Submission
              </span>
              <div className="font-mono text-xs text-stone-500 mt-1">
                Date: {FORMAL_PROPOSAL.date}
              </div>
            </div>
          </div>

          {/* Memo Meta Block */}
          <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-stone-400 font-semibold uppercase text-[10px] block">To:</span>
              <strong className="text-stone-900 text-sm">{FORMAL_PROPOSAL.to}</strong>
            </div>
            <div>
              <span className="text-stone-400 font-semibold uppercase text-[10px] block">From:</span>
              <strong className="text-stone-900 text-sm">{FORMAL_PROPOSAL.from}</strong>
            </div>
            <div className="sm:col-span-2 pt-1 border-t border-stone-200">
              <span className="text-stone-400 font-semibold uppercase text-[10px] block">Subject:</span>
              <strong className="text-amber-900 text-sm">{FORMAL_PROPOSAL.subject}</strong>
            </div>
          </div>
        </div>

        {/* Proposal Sections */}
        <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-stone-700">
          {FORMAL_PROPOSAL.sections.map((section) => (
            <section key={section.number} className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 text-xs flex items-center justify-center font-sans font-bold">
                  {section.number}
                </span>
                <span>{section.title}</span>
              </h3>
              <div className="pl-8 whitespace-pre-line text-stone-600 leading-relaxed font-normal">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        {/* Phase Status Tracker */}
        <div className="p-6 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Phased Implementation Status:</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
              <div className="font-bold text-emerald-700 flex items-center gap-1">
                <span>✓ Phase 1: Complete</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Website design &amp; internal QR mobile banking architecture implemented.
              </p>
            </div>

            <div className="p-3 bg-amber-100/60 rounded-xl border border-amber-300 space-y-1">
              <div className="font-bold text-amber-900 flex items-center gap-1">
                <span>⏳ Phase 2: Active</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Administrative review, Patron oversight, and school council feedback.
              </p>
            </div>

            <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
              <div className="font-bold text-stone-500 flex items-center gap-1">
                <span>Phase 3: Upcoming</span>
              </div>
              <p className="text-[11px] text-stone-600">
                Official launch during Monday general school assembly &amp; PTA dissemination.
              </p>
            </div>
          </div>
        </div>

        {/* Official Signatures Block */}
        <div className="pt-8 border-t-2 border-stone-900 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-stone-600">
          
          <div className="space-y-1">
            <div className="font-serif italic font-bold text-stone-900 text-sm">
              MUSEMBWA CALTON
            </div>
            <div className="font-bold text-stone-800">PROJECT MANAGER</div>
            <div className="text-[11px] text-stone-500">Interact Club, O&amp;U High School</div>
            <div className="text-[10px] text-emerald-700 font-mono">Sign-off Verified · 19/10/2026</div>
          </div>

          <div className="space-y-1">
            <div className="font-serif italic font-bold text-stone-900 text-sm">
              HAGENIMANA RASUL
            </div>
            <div className="font-bold text-stone-800">CLUB PRESIDENT</div>
            <div className="text-[11px] text-stone-500">Interact Club, O&amp;U High School</div>
            <div className="text-[10px] text-emerald-700 font-mono">Sign-off Verified · 19/10/2026</div>
          </div>

          <div className="space-y-1">
            <div className="font-serif italic font-bold text-stone-900 text-sm">
              PATRON DAVID SEMAKULA
            </div>
            <div className="font-bold text-stone-800">TEACHER PATRON &amp; ADVISOR</div>
            <div className="text-[11px] text-stone-500">Faculty Directorate</div>
            <div className="text-[10px] text-amber-700 font-mono">Supervision Acknowledged</div>
          </div>

        </div>

      </div>

      {/* Call to action */}
      <div className="p-6 bg-stone-900 text-white rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div>
          <h4 className="font-serif font-bold text-base text-white">
            Support Our Student-Led Humanitarian Mission
          </h4>
          <p className="text-xs text-stone-400 mt-0.5">
            100% of your gift supports student nutrition, backpacks, and athletic supplies.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onExploreProjects}
            className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-semibold rounded-xl transition-colors"
          >
            Explore Active Projects
          </button>
          <button
            onClick={onDonateClick}
            className="px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
          >
            Pledge Material Supplies
          </button>
        </div>
      </div>

    </div>
  );
};
