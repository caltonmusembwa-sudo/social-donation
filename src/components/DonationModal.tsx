import React, { useState } from 'react';
import { Campaign, CurrencyCode, ImpactTier, PaymentMethodType, DonationRecord } from '../types/donation';
import { formatCurrency, convertFromUSD, convertToUSD, CURRENCIES } from '../data/currencies';
import { 
  X, Heart, CreditCard, Smartphone, ShieldCheck, Check, 
  HelpCircle, UserCheck, AlertCircle, Sparkles, Building2, Wallet 
} from 'lucide-react';

interface DonationModalProps {
  campaign: Campaign;
  presetTier?: ImpactTier;
  selectedCurrency: CurrencyCode;
  onClose: () => void;
  onDonationComplete: (record: DonationRecord) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  campaign,
  presetTier,
  selectedCurrency,
  onClose,
  onDonationComplete,
}) => {
  const initialAmountLocal = presetTier 
    ? convertFromUSD(presetTier.amount, selectedCurrency) 
    : convertFromUSD(50, selectedCurrency);

  const [amountLocal, setAmountLocal] = useState<number>(initialAmountLocal);
  const [customInput, setCustomInput] = useState<string>(initialAmountLocal.toString());
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('card');
  
  // Donor form
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isDedicated, setIsDedicated] = useState(false);
  const [dedicatedTo, setDedicatedTo] = useState('');
  const [message, setMessage] = useState('');

  // Payment inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvc, setCardCvc] = useState('382');
  const [mobileNumber, setMobileNumber] = useState('+254 712 345 678');
  const [mobileProvider, setMobileProvider] = useState('M-Pesa');

  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [mobilePushSent, setMobilePushSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currencyConfig = CURRENCIES[selectedCurrency] || CURRENCIES.USD;
  const presetsUSD = [15, 35, 75, 150, 300];

  const handleSelectPreset = (usd: number) => {
    const local = convertFromUSD(usd, selectedCurrency);
    setAmountLocal(local);
    setCustomInput(local.toString());
  };

  const handleCustomInputChange = (val: string) => {
    const numeric = val.replace(/[^0-9.]/g, '');
    setCustomInput(numeric);
    const parsed = parseFloat(numeric);
    if (!isNaN(parsed) && parsed > 0) {
      setAmountLocal(parsed);
    }
  };

  // Compute calculated dynamic impact text
  const getDynamicImpactStatement = () => {
    const amountUSD = convertToUSD(amountLocal, selectedCurrency);
    if (campaign.category === 'clean-water') {
      const jerrycans = Math.max(1, Math.round(amountUSD / 8));
      return `Supplies approximately ${jerrycans} families with safe water filtration and storage jerrycans.`;
    } else if (campaign.category === 'education') {
      const weeksTuition = Math.max(1, Math.round(amountUSD / 18));
      return `Covers ${weeksTuition} weeks of comprehensive secondary tuition and laboratory supplies for a student.`;
    } else if (campaign.category === 'healthcare') {
      const babiesVaccinated = Math.max(2, Math.round(amountUSD / 5));
      return `Ensures continuous cold-chain vaccine storage protecting ${babiesVaccinated} infants against preventable diseases.`;
    } else if (campaign.category === 'food-security') {
      const daysOfFood = Math.max(3, Math.round((amountUSD / 35) * 21));
      return `Feeds a rural household for approximately ${daysOfFood} days with fortified nutrition baskets.`;
    } else if (campaign.category === 'climate') {
      const trees = Math.max(5, Math.round(amountUSD));
      return `Plants and protects approximately ${trees} mangrove propagules in coastal blue carbon reserves.`;
    }
    return `Provides direct life-changing assistance to ${Math.max(1, Math.round(amountUSD / 10))} individuals in the community.`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorEmail.trim() || !donorEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address to receive your tax receipt.');
      return;
    }
    if (amountLocal <= 0) {
      setErrorMessage('Please specify a valid donation amount.');
      return;
    }

    setErrorMessage('');
    setIsProcessing(true);

    if (paymentMethod === 'mobile-money') {
      setMobilePushSent(true);
    }

    // Realistic processing simulation
    setTimeout(() => {
      setIsProcessing(false);
      const receiptNumber = `KP-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
      const amountUSD = convertToUSD(amountLocal, selectedCurrency);
      
      const newRecord: DonationRecord = {
        id: 'don-' + Date.now(),
        campaignId: campaign.id,
        campaignTitle: campaign.title,
        donorName: isAnonymous ? 'Anonymous Benefactor' : (donorName.trim() || 'Generous Supporter'),
        donorEmail: donorEmail.trim(),
        donorPhone: donorPhone.trim() || undefined,
        amount: Math.round(amountUSD),
        currency: selectedCurrency,
        frequency,
        paymentMethod,
        message: message.trim() || undefined,
        isAnonymous,
        dedicatedTo: isDedicated ? dedicatedTo.trim() : undefined,
        timestamp: new Date().toISOString(),
        receiptNumber,
        taxDeductible: true,
      };

      onDonationComplete(newRecord);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Support Programme
            </span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 line-clamp-1 font-serif">
              {campaign.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-200/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Processing Overlay */}
        {isProcessing ? (
          <div className="p-10 text-center space-y-4">
            <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto" />
            <h4 className="text-lg font-bold text-stone-900 font-serif">
              {paymentMethod === 'mobile-money' ? 'Awaiting Mobile Money Authorization...' : 'Authorizing Secure Donation...'}
            </h4>
            <p className="text-xs text-stone-500 max-w-xs mx-auto">
              {paymentMethod === 'mobile-money' 
                ? `Prompt sent to ${mobileNumber}. Please approve the request on your handset with your secret PIN.`
                : 'Directing your gift to the project account. Your tax receipt is being generated.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
            
            {/* Frequency Selector: One-Time vs Monthly */}
            <div className="grid grid-cols-2 p-1 bg-stone-100 rounded-xl text-xs font-semibold">
              <button
                type="button"
                onClick={() => setFrequency('one-time')}
                className={`py-2 rounded-lg transition-all ${
                  frequency === 'one-time'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                One-Time Gift
              </button>
              <button
                type="button"
                onClick={() => setFrequency('monthly')}
                className={`py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                  frequency === 'monthly'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                <span>Monthly Sustainer</span>
              </button>
            </div>

            {/* Donation Amount Presets */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                Select Amount ({selectedCurrency})
              </label>

              <div className="grid grid-cols-5 gap-2">
                {presetsUSD.map((usd) => {
                  const local = convertFromUSD(usd, selectedCurrency);
                  const isSelected = Math.round(amountLocal) === local;
                  return (
                    <button
                      key={usd}
                      type="button"
                      onClick={() => handleSelectPreset(usd)}
                      className={`py-2 px-1 rounded-lg text-xs font-bold transition-all border ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                      }`}
                    >
                      {formatCurrency(usd, selectedCurrency)}
                    </button>
                  );
                })}
              </div>

              {/* Custom Input */}
              <div className="relative mt-2">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-500 font-bold text-sm">
                  {currencyConfig.symbol}
                </span>
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => handleCustomInputChange(e.target.value)}
                  placeholder="Custom amount"
                  className="w-full pl-9 pr-14 py-2 text-sm font-semibold bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-stone-400">
                  {selectedCurrency}
                </span>
              </div>
            </div>

            {/* Live Dynamic Impact Notice */}
            <div className="p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-950 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div>
                <strong>Direct Impact: </strong>
                {getDynamicImpactStatement()}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                Payment Channel
              </label>

              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'card'
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-bold shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span className="text-[11px]">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mobile-money')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'mobile-money'
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-bold shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[11px]">Mobile Money</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'paypal'
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-bold shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <Wallet className="w-4 h-4" />
                  <span className="text-[11px]">PayPal</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank-transfer')}
                  className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                    paymentMethod === 'bank-transfer'
                      ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 font-bold shadow-xs'
                      : 'border-stone-200 hover:bg-stone-50 text-stone-600'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span className="text-[11px]">Wire/Bank</span>
                </button>
              </div>
            </div>

            {/* Payment Details Subform */}
            {paymentMethod === 'card' && (
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <div className="text-xs font-semibold text-stone-700 flex items-center justify-between">
                  <span>Credit or Debit Card</span>
                  <div className="flex gap-1 text-[10px] text-stone-400">
                    <span>Visa</span> · <span>Mastercard</span> · <span>Amex</span>
                  </div>
                </div>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="Card Number"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <input
                    type="text"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    placeholder="CVC"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'mobile-money' && (
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                  <span>Mobile Money Push Payment</span>
                  <select
                    value={mobileProvider}
                    onChange={(e) => setMobileProvider(e.target.value)}
                    className="bg-white border border-stone-200 rounded text-xs px-2 py-0.5"
                  >
                    <option value="M-Pesa">Safaricom M-Pesa</option>
                    <option value="Airtel Money">Airtel Money</option>
                    <option value="MTN MoMo">MTN Mobile Money</option>
                    <option value="Orange Money">Orange Money</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-stone-500 mb-1">Mobile Phone Number (for PIN Prompt):</label>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    placeholder="+254 712 345 678"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <p className="text-[11px] text-stone-500">
                  Instant STK Push: A dialog will pop up on your mobile handset to confirm the transaction.
                </p>
              </div>
            )}

            {paymentMethod === 'paypal' && (
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600 space-y-1">
                <p className="font-semibold text-stone-800">PayPal &amp; Digital Wallets</p>
                <p>You will be seamlessly connected to complete your gift with 1-click PayPal authorization.</p>
              </div>
            )}

            {paymentMethod === 'bank-transfer' && (
              <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-xl text-xs space-y-1.5 text-stone-700">
                <div className="font-semibold text-stone-900">Direct Wire &amp; Bank Clearing</div>
                <div className="font-mono text-[11px] bg-white p-2 rounded border border-stone-200 space-y-0.5">
                  <div>Bank: KindPulse Global Custody Trust (Kenya / UK / USA)</div>
                  <div>Account: 0108 4492 1198 002</div>
                  <div>SWIFT/BIC: KPGLKENX</div>
                </div>
                <p className="text-[11px] text-stone-500">
                  Please use reference code <strong>KP-{campaign.id.substring(0, 6).toUpperCase()}</strong> in your payment notes.
                </p>
              </div>
            )}

            {/* Donor Information */}
            <div className="space-y-3 pt-1">
              <label className="block text-xs font-bold text-stone-800 uppercase tracking-wide">
                Donor Information
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    placeholder="Your Full Name"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    placeholder="Email for Official Tax Receipt *"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Message of support */}
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Optional words of hope for the project team..."
                className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />

              {/* Checkboxes */}
              <div className="space-y-2 pt-1 text-xs text-stone-600">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Make my donation anonymous on the public supporter list</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isDedicated}
                    onChange={(e) => setIsDedicated(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Dedicate this donation in honour or memory of someone</span>
                </label>

                {isDedicated && (
                  <div className="pl-6">
                    <input
                      type="text"
                      value={dedicatedTo}
                      onChange={(e) => setDedicatedTo(e.target.value)}
                      placeholder="In memory/honour of (e.g. My beloved mother Mary)"
                      className="w-full px-3 py-1.5 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98 text-sm"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span>
                  Confirm Donation of {currencyConfig.symbol}{amountLocal.toLocaleString()} {frequency === 'monthly' ? '/ month' : ''}
                </span>
              </button>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-stone-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Tax Deductible · Zero Platform Deductions</span>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
