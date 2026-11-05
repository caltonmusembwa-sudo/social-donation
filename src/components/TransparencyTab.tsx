import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Search, FileText, PackageCheck, Truck, Users, School } from 'lucide-react';
import { CompletedPledge } from '../types/interactClub';

interface TransparencyTabProps {
  pledges: CompletedPledge[];
  onPledgeClick: () => void;
}

export const TransparencyTab: React.FC<TransparencyTabProps> = ({
  pledges,
  onPledgeClick,
}) => {
  const [searchCert, setSearchCert] = useState('');
  const [searchedRecord, setSearchedRecord] = useState<CompletedPledge | null>(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCert.trim()) return;
    const found = pledges.find(
      (p) => p.pledgeCertificateNumber.toLowerCase() === searchCert.trim().toLowerCase()
    );
    setSearchedRecord(found || null);
    setSearchPerformed(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 animate-fadeIn">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Fiduciary Governance &amp; Supply Verification</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
          Our 100% Direct Material Policy
        </h2>
        <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
          The Interact Club of O&amp;U High School operates with a strict zero-money policy on this platform. We only receive, log, and deliver physical learning supplies directly to student hands.
        </p>
      </div>

      {/* 3 Pillars of Material Transparency */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-7 bg-white border border-stone-200 rounded-3xl shadow-2xs space-y-3 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center">
            <PackageCheck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base font-serif">
            Direct Physical Supplies Only
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            All support comes as physical backpacks, notebooks, pens, meals, and athletic shoes. No monetary transactions, credit card fees, or cash handling.
          </p>
        </div>

        <div className="p-7 bg-white border border-stone-200 rounded-3xl shadow-2xs space-y-3 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base font-serif">
            Student Volunteer Logistics
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Supplies are packaged by student volunteers at O&amp;U High School and delivered by our school van with teacher supervisor sign-off.
          </p>
        </div>

        <div className="p-7 bg-white border border-stone-200 rounded-3xl shadow-2xs space-y-3 hover:-translate-y-1 transition-transform">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center">
            <School className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-stone-900 text-base font-serif">
            Headteacher Sign-Off &amp; Handover
          </h4>
          <p className="text-xs text-stone-600 leading-relaxed">
            Partner school headteachers and bursars sign material handover logs to guarantee that every item is given to the intended student.
          </p>
        </div>

      </div>

      {/* Zero Money Guarantee Banner */}
      <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-emerald-950 flex items-center justify-center sm:justify-start gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>100% Non-Monetary Community Model</span>
          </h4>
          <p className="text-xs text-emerald-900 max-w-xl">
            Because we have not planned around money, this platform accepts zero billing. All contributions are in-kind physical supplies and student volunteer hours.
          </p>
        </div>
        <button
          onClick={onPledgeClick}
          className="whitespace-nowrap px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs hover:-translate-y-0.5 transition-all"
        >
          Pledge Physical Supplies
        </button>
      </div>

      {/* Public Pledge Certificate Verification Lookup */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-700" />
          <h3 className="text-lg font-bold text-stone-900 font-serif">
            Verify a Supply Pledge Certificate
          </h3>
        </div>
        <p className="text-xs text-stone-600 max-w-xl">
          Enter your Pledge Certificate Number (e.g. KC-PLG-2026-XXXXXX) to inspect verified handover status and school destination.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
          <input
            type="text"
            value={searchCert}
            onChange={(e) => setSearchCert(e.target.value)}
            placeholder="e.g. KC-PLG-2026-482109"
            className="px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-mono flex-1 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs rounded-lg flex items-center gap-1.5"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Verify</span>
          </button>
        </form>

        {searchPerformed && (
          <div className="mt-4 pt-4 border-t border-stone-100">
            {searchedRecord ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Valid Supply Pledge Certificate Verified</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div>Contributor: <strong>{searchedRecord.donorName}</strong></div>
                  <div>Allocated School: <strong>{searchedRecord.dedicatedSchool || 'Partner Schools Pool'}</strong></div>
                  <div>Pledge: <strong>{searchedRecord.supplyDescription}</strong></div>
                  <div>Status: <strong>{searchedRecord.status}</strong></div>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-stone-100 rounded-xl text-xs text-stone-600">
                No matching pledge certificate found with that number. Pledges made in this session appear here.
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
