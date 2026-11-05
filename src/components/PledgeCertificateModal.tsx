import React from 'react';
import { CompletedPledge } from '../types/interactClub';
import { CheckCircle2, Printer, X, School, PackageCheck, ShieldCheck, Share2, Heart } from 'lucide-react';

interface PledgeCertificateModalProps {
  pledge: CompletedPledge;
  onClose: () => void;
  onShare: () => void;
}

export const PledgeCertificateModal: React.FC<PledgeCertificateModalProps> = ({
  pledge,
  onClose,
  onShare,
}) => {
  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(pledge.timestamp).toLocaleDateString('en-US', {
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
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Top Header Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-amber-50/70 print:hidden">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Material Supply Pledge Certificate Confirmed</span>
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

        {/* Printable Official Certificate Body */}
        <div className="p-8 sm:p-10 overflow-y-auto space-y-6 text-stone-800 bg-white print:p-0">
          
          {/* Header & Logo */}
          <div className="flex items-start justify-between border-b-2 border-stone-900 pb-6">
            <div>
              <div className="flex items-center gap-2 text-stone-900">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white border-2 border-red-500 shadow-sm flex items-center justify-center p-0.5 shrink-0">
                  <img 
                    src="/assets/aistudio/onwards_e90da280.jpg" 
                    alt="Onwards and Upwards SS Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <div>
                  <span className="text-xl font-bold tracking-tight font-serif block">
                    KidsConnect Community Fund
                  </span>
                  <span className="text-[11px] font-bold text-amber-800 tracking-wider uppercase block">
                    Interact Club of O&amp;U High School
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Student-Led Grassroots Education &amp; Supplies Initiative (ouinteract.org)
              </p>
              <p className="text-[10px] text-stone-400 font-mono">
                Charter 7824 · Zero-Billing Non-Monetary Material Pledge
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block bg-amber-100 text-amber-900 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded">
                Official Supply Certificate
              </span>
              <div className="font-mono text-xs font-bold text-stone-900 mt-2">
                {pledge.pledgeCertificateNumber}
              </div>
              <div className="text-[11px] text-stone-500">
                Issued: {formattedDate}
              </div>
            </div>
          </div>

          {/* Contributor & School Allocation Information */}
          <div className="grid grid-cols-2 gap-6 text-xs">
            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px] block mb-1">
                Contributor Details
              </span>
              <div className="font-bold text-stone-900 text-sm">
                {pledge.donorName}
              </div>
              <div className="text-stone-600 font-mono">
                {pledge.donorEmail}
              </div>
              {pledge.donorPhone && (
                <div className="text-stone-500 font-mono">Tel: {pledge.donorPhone}</div>
              )}
            </div>

            <div>
              <span className="font-bold text-stone-400 uppercase tracking-wider text-[10px] block mb-1">
                Designated School &amp; Beneficiaries
              </span>
              <div className="font-bold text-stone-900 text-sm">
                {pledge.dedicatedSchool || 'Partner Schools Highest Need'}
              </div>
              <div className="text-emerald-700 font-medium">
                {pledge.tierName}
              </div>
              {pledge.dedicatedStudent && (
                <div className="text-stone-500 italic mt-0.5">
                  Dedicated in honour of: {pledge.dedicatedStudent}
                </div>
              )}
            </div>
          </div>

          {/* Itemized Material Pledge Table */}
          <div className="border border-stone-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-stone-50 border-b border-stone-200 text-stone-600 font-bold">
                <tr>
                  <th className="py-2.5 px-4">Pledged Material Item / Kit</th>
                  <th className="py-2.5 px-4">Delivery / Handover Method</th>
                  <th className="py-2.5 px-4 text-right">Quantity / Commitment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="py-3 px-4 font-medium text-stone-900">
                    <div className="font-bold">{pledge.tierName}</div>
                    <div className="text-[11px] text-stone-500">{pledge.supplyDescription}</div>
                  </td>
                  <td className="py-3 px-4 capitalize text-stone-600">
                    {pledge.deliveryMethod === 'dropoff_school'
                      ? 'Drop-off at School Office'
                      : pledge.deliveryMethod === 'interact_pickup'
                      ? 'Interact Volunteer Van Pickup'
                      : 'Courier Package Dispatch'}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-emerald-800 text-sm font-mono">
                    {pledge.quantityUnits} Package Unit{pledge.quantityUnits > 1 ? 's' : ''}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Handover Instructions */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-950 space-y-1">
            <strong>Physical Handover Details:</strong>
            <div>Designated Drop-off / Handover Point: <strong>{pledge.dropoffLocation || 'O&U High School Room B-12'}</strong></div>
            <div>Expected Handover Date: <strong>{pledge.scheduledDate || 'Coordinated with volunteer team'}</strong></div>
            {pledge.notes && <div>Contributor Notes: <em>"{pledge.notes}"</em></div>}
          </div>

          {/* Zero Money Policy Statement */}
          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 text-[11px] text-stone-600 space-y-1 leading-relaxed">
            <p className="font-semibold text-stone-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Non-Monetary Certification
            </p>
            <p>
              This certificate confirms a non-monetary pledge of physical student supplies. No currency was billed, collected, or processed. All items will be directly handed over to student recipients with school headteacher verification.
            </p>
          </div>

          {/* Signatures */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
            <div>
              <div className="font-serif italic font-bold text-stone-800 text-sm">
                Musembwa Calton &amp; Hagenimana Rasul
              </div>
              <div>Project Manager &amp; Club President</div>
              <div className="text-[10px] text-stone-400">Interact Club of O&amp;U High School</div>
            </div>

            <div className="w-16 h-16 border-2 border-dashed border-amber-600/60 rounded-full flex flex-col items-center justify-center p-1 text-[8px] text-amber-800 uppercase font-mono font-bold tracking-tighter text-center">
              <span>O&amp;U Interact</span>
              <span>Pledge Verified</span>
              <span>2026 OK</span>
            </div>
          </div>

        </div>

        {/* Footer (Hidden on print) */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between print:hidden">
          <button
            onClick={onShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-stone-900"
          >
            <Share2 className="w-4 h-4" />
            <span>Share This Cause</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs hover:-translate-y-0.5 transition-all"
          >
            Done &amp; Return Home
          </button>
        </div>

      </div>
    </div>
  );
};
