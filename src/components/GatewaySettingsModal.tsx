import React, { useState } from 'react';
import { X, ShieldCheck, Key, Check, ToggleLeft, ToggleRight, Sparkles, Building2, HelpCircle } from 'lucide-react';
import { GatewayConfig, saveGatewayConfig } from '../services/paymentConfig';

interface GatewaySettingsModalProps {
  config: GatewayConfig;
  onClose: () => void;
  onSave: (updated: GatewayConfig) => void;
}

export const GatewaySettingsModal: React.FC<GatewaySettingsModalProps> = ({
  config,
  onClose,
  onSave,
}) => {
  const [flutterwaveKey, setFlutterwaveKey] = useState(config.flutterwavePublicKey);
  const [paypalId, setPaypalId] = useState(config.paypalClientId);
  const [isLive, setIsLive] = useState(config.isLiveMode);
  const [merchantCode, setMerchantCode] = useState(config.merchantCode);
  const [accountNumber, setAccountNumber] = useState(config.momoMerchantAccount);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: GatewayConfig = {
      flutterwavePublicKey: flutterwaveKey.trim(),
      paypalClientId: paypalId.trim(),
      isLiveMode: isLive,
      merchantCode: merchantCode.trim() || '782490',
      momoMerchantAccount: accountNumber.trim() || '010844921198002',
    };
    saveGatewayConfig(updated);
    onSave(updated);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-amber-50/70">
          <div className="flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-700" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Administration &amp; Integration Hub
              </span>
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Online Payment Gateways Configuration
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs text-stone-700">
          
          {/* Active Status Badge */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <span className="font-bold text-emerald-950 text-xs block">
                  Online Payment Gateways Active &amp; Linked
                </span>
                <span className="text-[11px] text-emerald-800">
                  Flutterwave (MoMo &amp; Cards) + PayPal SDK + Banking QR active.
                </span>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">
              ONLINE
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center justify-between p-3.5 bg-stone-50 border border-stone-200 rounded-2xl">
            <div>
              <div className="font-bold text-stone-900">
                Gateway Environment Mode
              </div>
              <div className="text-[11px] text-stone-500">
                {isLive
                  ? 'Processing REAL live money transactions through Flutterwave & PayPal.'
                  : 'Processing verified online test transactions (no real money charged).'}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsLive(!isLive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
                isLive
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-emerald-600 text-white shadow-xs'
              }`}
            >
              <span>{isLive ? 'Live Mode' : 'Sandbox Test'}</span>
            </button>
          </div>

          {/* Flutterwave Keys */}
          <div className="space-y-1">
            <label className="block font-bold text-stone-900">
              Flutterwave Public Key (Uganda MoMo &amp; Cards):
            </label>
            <input
              type="text"
              required
              value={flutterwaveKey}
              onChange={(e) => setFlutterwaveKey(e.target.value)}
              placeholder="FLWPUBK_TEST-XXXX or FLWPUBK_LIVE-XXXX"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <span className="text-[10px] text-stone-400">
              Supports MTN Uganda, Airtel Money Uganda, Visa, Mastercard, and Bank Transfers.
            </span>
          </div>

          {/* PayPal Client ID */}
          <div className="space-y-1">
            <label className="block font-bold text-stone-900">
              PayPal Client ID (International &amp; Diaspora):
            </label>
            <input
              type="text"
              required
              value={paypalId}
              onChange={(e) => setPaypalId(e.target.value)}
              placeholder="sb (sandbox) or your Live PayPal Client ID"
              className="w-full px-3.5 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <span className="text-[10px] text-stone-400">
              Converts UGX dynamically to USD and executes direct wallet or debit card capture.
            </span>
          </div>

          {/* School Merchant Code */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-stone-900 mb-1">
                MoMo Pay Merchant Code:
              </label>
              <input
                type="text"
                value={merchantCode}
                onChange={(e) => setMerchantCode(e.target.value)}
                placeholder="782490"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-stone-900 mb-1">
                Bank Account / Custody:
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="010844921198002"
                className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl font-mono text-xs"
              />
            </div>
          </div>

          {savedSuccess && (
            <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Gateway settings successfully updated and saved!</span>
            </div>
          )}

          {/* Footer buttons */}
          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-200 rounded-xl text-stone-600 hover:bg-stone-50 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-xs"
            >
              Save Configuration
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
