import React from 'react';
import { DonationRecord, CurrencyCode } from '../types/donation';
import { formatCurrency } from '../data/currencies';
import { 
  Heart, Award, FileText, Printer, ArrowRight, ShieldCheck, 
  Calendar, CheckCircle2, Sparkles, Droplets, GraduationCap, HeartHandshake 
} from 'lucide-react';

interface UserImpactDashboardProps {
  donationRecords: DonationRecord[];
  selectedCurrency: CurrencyCode;
  onViewReceipt: (record: DonationRecord) => void;
  onExploreProgrammes: () => void;
}

export const UserImpactDashboard: React.FC<UserImpactDashboardProps> = ({
  donationRecords,
  selectedCurrency,
  onViewReceipt,
  onExploreProgrammes,
}) => {
  const totalAmountUSD = donationRecords.reduce((sum, r) => sum + r.amount, 0);
  const totalProgrammesSupported = new Set(donationRecords.map((r) => r.campaignId)).size;
  const estimatedLivesImpacted = Math.round(totalAmountUSD * 0.45);

  const handlePrintStatement = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Introduction */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Personal Philanthropy Ledger
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            My Giving Footprint
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-1">
            Track your charitable donations, tax receipts, and direct community impact.
          </p>
        </div>

        {donationRecords.length > 0 && (
          <button
            onClick={handlePrintStatement}
            className="flex items-center gap-1.5 self-start sm:self-auto bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold px-3.5 py-2 rounded-lg shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Download Annual Statement</span>
          </button>
        )}
      </div>

      {/* Impact Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
            <span>Total Contributed</span>
            <Heart className="w-4 h-4 text-emerald-600 fill-emerald-100" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {formatCurrency(totalAmountUSD, selectedCurrency)}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Across {donationRecords.length} donation transaction{donationRecords.length === 1 ? '' : 's'}
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
            <span>Programmes Backed</span>
            <HeartHandshake className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 font-serif">
            {totalProgrammesSupported}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Community initiatives directly funded
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-stone-500 mb-2 font-medium">
            <span>Estimated Lives Impacted</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-serif">
            {estimatedLivesImpacted > 0 ? `${estimatedLivesImpacted}+` : '0'}
          </div>
          <div className="text-[11px] text-stone-400 mt-1">
            Pupils, mothers &amp; families assisted
          </div>
        </div>

      </div>

      {/* Badges / Impact Recognition */}
      {donationRecords.length > 0 && (
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-800 uppercase tracking-wider">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Unlocked Giving Milestones</span>
          </div>
          
          <div className="flex flex-wrap gap-2 text-xs">
            <div className="bg-white border border-stone-200 rounded-lg px-3 py-2 flex items-center gap-2 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-semibold text-stone-800">Community Pioneer</span>
              <span className="text-[10px] text-stone-400">· 1st contribution completed</span>
            </div>

            {totalAmountUSD >= 100 && (
              <div className="bg-white border border-stone-200 rounded-lg px-3 py-2 flex items-center gap-2 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-teal-500" />
                <span className="font-semibold text-stone-800">Century Impact Sustainer</span>
                <span className="text-[10px] text-stone-400">· Over $100 funded</span>
              </div>
            )}

            {totalProgrammesSupported >= 2 && (
              <div className="bg-white border border-stone-200 rounded-lg px-3 py-2 flex items-center gap-2 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="font-semibold text-stone-800">Multi-Cause Champion</span>
                <span className="text-[10px] text-stone-400">· Supported 2+ causes</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Donation History Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xs">
        
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <h3 className="text-base font-bold text-stone-900 font-serif">
            Donation Records &amp; Tax Receipts
          </h3>
          <span className="text-xs text-stone-500 font-medium">
            {donationRecords.length} record{donationRecords.length === 1 ? '' : 's'}
          </span>
        </div>

        {donationRecords.length === 0 ? (
          <div className="p-12 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <Heart className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-stone-800">
                You haven't made a donation yet
              </h4>
              <p className="text-xs text-stone-500 max-w-sm mx-auto">
                Explore our verified programmes to fund clean drinking water, education scholarships, or medical clinics.
              </p>
            </div>
            <button
              onClick={onExploreProgrammes}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-all"
            >
              <span>Explore Active Programmes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-semibold">
                <tr>
                  <th className="py-3 px-5">Date</th>
                  <th className="py-3 px-5">Programme</th>
                  <th className="py-3 px-5">Amount</th>
                  <th className="py-3 px-5">Channel</th>
                  <th className="py-3 px-5">Receipt #</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {donationRecords.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50/70 transition-colors">
                    <td className="py-3.5 px-5 text-stone-500 whitespace-nowrap">
                      {new Date(r.timestamp).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="py-3.5 px-5 font-semibold text-stone-900 max-w-xs truncate">
                      {r.campaignTitle}
                      {r.dedicatedTo && (
                        <span className="block text-[11px] text-emerald-700 font-normal italic">
                          Dedicated to {r.dedicatedTo}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-5 font-bold text-stone-900 font-mono">
                      {formatCurrency(r.amount, selectedCurrency)}
                    </td>
                    <td className="py-3.5 px-5 text-stone-600 capitalize">
                      {r.paymentMethod.replace('-', ' ')}
                    </td>
                    <td className="py-3.5 px-5 font-mono text-[11px] text-stone-500">
                      {r.receiptNumber}
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => onViewReceipt(r)}
                        className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold text-xs py-1 px-2.5 rounded bg-emerald-50 hover:bg-emerald-100 transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        <span>View Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
