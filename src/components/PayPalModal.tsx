import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { GatewayConfig } from '../services/paymentConfig';

interface PayPalModalProps {
  amountUGX: number;
  amountUSD: number;
  donorName: string;
  donorEmail: string;
  tierName: string;
  dedicatedSchool: string;
  config: GatewayConfig;
  onClose: () => void;
  onSuccess: (txData: { txRef: string; channel: string; paypalOrderId: string }) => void;
}

export const PayPalModal: React.FC<PayPalModalProps> = ({
  amountUGX,
  amountUSD,
  donorName,
  donorEmail,
  tierName,
  dedicatedSchool,
  config,
  onClose,
  onSuccess,
}) => {
  const [method, setMethod] = useState<'paypal_account' | 'guest_card'>('paypal_account');
  const [paypalEmail, setPaypalEmail] = useState(donorEmail || 'donor@paypal.com');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId] = useState(`PAYID_${Math.random().toString(36).substring(2, 12).toUpperCase()}`);

  const handleAuthorize = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onSuccess({
        txRef: `KC_PP_${Date.now()}`,
        channel: method === 'paypal_account' ? 'PayPal Wallet' : 'PayPal Guest Debit/Credit Card',
        paypalOrderId: orderId,
      });
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* PayPal Header */}
        <div className="px-6 py-4 bg-[#003087] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tighter italic">
              PayPal
            </span>
            <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-mono">
              Online Gateway
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Order Details */}
        <div className="px-6 py-3.5 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
          <div>
            <div className="text-stone-500 font-medium">Beneficiary:</div>
            <strong className="text-stone-900">KidsConnect School Fund</strong>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-stone-900 font-mono">
              ${amountUSD}.00 USD
            </div>
            <div className="text-[11px] text-stone-500">
              ≈ UGX {amountUGX.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {isProcessing ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 border-4 border-blue-200 border-t-[#003087] rounded-full animate-spin mx-auto" />
              <h4 className="text-base font-bold text-stone-900 font-serif">
                Connecting to PayPal Secure Sandbox...
              </h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Authorizing order {orderId} for {donorName || 'Donor'}...
              </p>
            </div>
          ) : (
            <form onSubmit={handleAuthorize} className="space-y-5">
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Select PayPal Option:
                </label>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setMethod('paypal_account')}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      method === 'paypal_account'
                        ? 'bg-blue-50 border-[#003087] text-[#003087] ring-1 ring-[#003087]'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    PayPal Balance
                  </button>
                  <button
                    type="button"
                    onClick={() => setMethod('guest_card')}
                    className={`p-3 rounded-xl border text-center font-bold transition-all ${
                      method === 'guest_card'
                        ? 'bg-blue-50 border-[#003087] text-[#003087] ring-1 ring-[#003087]'
                        : 'bg-white border-stone-200 text-stone-600'
                    }`}
                  >
                    Debit or Credit Card
                  </button>
                </div>
              </div>

              <div className="space-y-3 p-4 bg-stone-50 rounded-2xl border border-stone-200 text-xs">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">
                    {method === 'paypal_account' ? 'PayPal Account Email' : 'Billing Email for Card Receipt'}
                  </label>
                  <input
                    type="email"
                    required
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    placeholder="email@example.com"
                    className="w-full px-3.5 py-2 bg-white border border-stone-200 rounded-xl"
                  />
                </div>

                <div className="text-[11px] text-stone-500">
                  Designated cause: <strong>{tierName}</strong> for <strong>{dedicatedSchool}</strong>.
                </div>
              </div>

              {/* Official PayPal Button Style */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-[#ffc439] hover:bg-[#f4bb33] text-[#003087] font-extrabold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Authorize &amp; Pay ${amountUSD} USD</span>
                <ArrowRight className="w-4 h-4 text-[#003087]" />
              </button>

              <div className="text-[11px] text-stone-400 text-center flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>PayPal Buyer Protection &amp; Instant Charitable Receipt</span>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
