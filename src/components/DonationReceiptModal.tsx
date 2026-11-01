import React, { useRef } from 'react';
import { DonationRecord } from '../types/donation';
import { formatCurrency, CURRENCIES } from '../data/currencies';
import { 
  CheckCircle2, Printer, Download, Share2, Heart, 
  ShieldCheck, ArrowRight, X, Building, Award 
} from 'lucide-react';

interface DonationReceiptModalProps {
  record: DonationRecord;
  onClose: () => void;
  onShare: () => void;
}

export const DonationReceiptModal: React.FC<DonationReceiptModalProps> = ({
  record,
  onClose,
  onShare,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(record.timestamp).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Controls (Hidden on Print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50 print:hidden">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Donation Confirmed &amp; Authorized</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-3 py-1.5 rounded-lg shadow-2xs hover:bg-stone-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Receipt Document */}
        <div ref={receiptRef} className="p-8 sm:p-10 overflow-y-auto space-y-6 text-stone-800 bg-white print:p-0">
          
          {/* Header & Logo */}
          <div className="flex items-start justify-between border-b-2 border-stone-900 pb-6">
            <div>
              <div className="flex items-center gap-2 text-stone-900">
                <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white">
                  <Heart className="w-4 h-4 fill-white" />
                </div>
                <span className="text-xl font-bold tracking-tight font-serif">
                  KindPulse Foundation
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Global Grassroots Direct Community Aid Initiative
              </p>
              <p className="text-[11px] text-stone-400">
                Charity Reg. No: NGO-KP-882941 · EIN / Tax Exemption 98-4421980
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block bg-stone-100 text-stone-800 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                Official Tax Receipt
              </span>
              <div className="font-mono text-xs font-bold text-stone-900 mt-2">
                {record.receiptNumber}
              </div>
              <div className="text-[11px] text-stone-500">
                Issued: {formattedDate}
              </div>
            </div>
          </div>

          {/* Donor & Beneficiary Information */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px] block mb-1">
                Donor Information
              </span>
              <div className="font-bold text-stone-900 text-sm">
                {record.donorName}
              </div>
              <div className="text-stone-600 font-mono">
                {record.donorEmail}
              </div>
              {record.donorPhone && (
                <div className="text-stone-500">Tel: {record.donorPhone}</div>
              )}
              {record.isAnonymous && (
                <div className="text-[11px] text-stone-500 italic mt-0.5">
                  (Public visibility set to Anonymous)
                </div>
              )}
            </div>

            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px] block mb-1">
                Designated Programme
              </span>
              <div className="font-bold text-stone-900 text-sm line-clamp-1">
                {record.campaignTitle}
              </div>
              <div className="text-stone-600">
                Fund Tracking ID: {record.campaignId}
              </div>
              {record.dedicatedTo && (
                <div className="text-emerald-700 italic mt-0.5">
                  Dedicated in honour of: {record.dedicatedTo}
                </div>
              )}
            </div>
          </div>

          {/* Itemized Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                <tr>
                  <th className="py-2.5 px-4">Description</th>
                  <th className="py-2.5 px-4">Frequency</th>
                  <th className="py-2.5 px-4">Payment Channel</th>
                  <th className="py-2.5 px-4 text-right">Contribution Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900">
                    Charitable Community Grant Contribution
                  </td>
                  <td className="py-3 px-4 capitalize text-stone-600">
                    {record.frequency}
                  </td>
                  <td className="py-3 px-4 capitalize text-stone-600">
                    {record.paymentMethod.replace('-', ' ')}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-stone-900 text-sm">
                    {formatCurrency(record.amount, record.currency as any)}
                  </td>
                </tr>
              </tbody>
              <tfoot className="bg-stone-50/70 border-t border-stone-200 font-bold">
                <tr>
                  <td colSpan={3} className="py-2.5 px-4 text-stone-700">
                    Total Eligible Tax Deductible Gift
                  </td>
                  <td className="py-2.5 px-4 text-right text-emerald-800 text-base">
                    {formatCurrency(record.amount, record.currency as any)}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Tax Exemption Compliance Statement */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 text-[11px] text-stone-600 space-y-1.5 leading-relaxed">
            <p className="font-semibold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Charitable Gift Acknowledgment &amp; Tax Deduction Notice
            </p>
            <p>
              In accordance with international charitable revenue standards, no goods or services of commercial value were provided in exchange for this charitable contribution. This receipt qualifies for tax deduction in eligible jurisdictions.
            </p>
            <p className="text-[10px] text-stone-400 font-mono">
              Authorization Token: KP-TX-{record.id.substring(4)}-AUTH-OK · Verification Server: global-custody.kindpulse.org
            </p>
          </div>

          {/* Signatures & Stamp */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <div>
              <div className="font-serif italic font-bold text-stone-800 text-sm">
                Eleanor Vance
              </div>
              <div>Executive Director of Global Philanthropy</div>
              <div className="text-[10px] text-stone-400">KindPulse Governance Board</div>
            </div>

            <div className="text-right">
              <div className="w-16 h-16 border-2 border-dashed border-emerald-500/60 rounded-full flex flex-col items-center justify-center p-1 text-[8px] text-emerald-800 uppercase font-mono font-bold tracking-tighter">
                <span>KindPulse</span>
                <span>Verified</span>
                <span>Audit OK</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions (Hidden on Print) */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between print:hidden">
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share This Cause</span>
          </button>

          <button
            onClick={onClose}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all shadow-sm"
          >
            <span>Done &amp; Explore More</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
