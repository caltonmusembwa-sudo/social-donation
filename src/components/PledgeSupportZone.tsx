import React, { useState } from 'react';
import { SupplyPledgeTier, PledgeDeliveryMethod, CompletedPledge } from '../types/interactClub';
import { SUPPLY_PLEDGE_TIERS, INITIAL_SCHOOLS } from '../data/interactData';
import { 
  Heart, PackageCheck, Truck, School, Check, 
  MapPin, Calendar, AlertCircle, ArrowRight, Sparkles, ShieldCheck, Box 
} from 'lucide-react';

interface PledgeSupportZoneProps {
  onPledgeSuccess: (pledge: CompletedPledge) => void;
}

export const PledgeSupportZone: React.FC<PledgeSupportZoneProps> = ({
  onPledgeSuccess,
}) => {
  // Step 1: Selected Supply Tier or Custom Supply
  const [selectedTierId, setSelectedTierId] = useState<string>('starter');
  const [customSupplyText, setCustomSupplyText] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);

  // Step 2: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<PledgeDeliveryMethod>('dropoff_school');
  const [dropoffLocation, setDropoffLocation] = useState('O&U High School Main Administration Office (Room B-12)');
  const [scheduledDate, setScheduledDate] = useState('2026-11-10');
  const [pickupAddress, setPickupAddress] = useState('');

  // Step 3: Contributor Details
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [contributorPhone, setContributorPhone] = useState('');
  const [dedicatedSchool, setDedicatedSchool] = useState<string>('PEAS Onwards and Upwards Buloba (Interact Host)');
  const [dedicatedStudent, setDedicatedStudent] = useState<string>('');
  const [notes, setNotes] = useState('');

  // Processing state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const selectedTier = SUPPLY_PLEDGE_TIERS.find((t) => t.id === selectedTierId) || SUPPLY_PLEDGE_TIERS[0];

  const handleSelectTier = (tier: SupplyPledgeTier) => {
    setIsCustom(false);
    setSelectedTierId(tier.id);
  };

  const handleSubmitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contributorEmail.trim() || !contributorEmail.includes('@')) {
      setErrorMessage('Please provide a valid email address to receive your official Pledge Certificate.');
      return;
    }

    if (isCustom && !customSupplyText.trim()) {
      setErrorMessage('Please specify the supplies or materials you wish to pledge.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const certificateNumber = `KC-PLG-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

      const completedRecord: CompletedPledge = {
        id: 'plg-' + Date.now(),
        pledgeCertificateNumber: certificateNumber,
        donorName: contributorName.trim() || 'Generous Community Supporter',
        donorEmail: contributorEmail.trim(),
        donorPhone: contributorPhone.trim() || undefined,
        tierId: isCustom ? 'custom' : selectedTierId,
        tierName: isCustom ? 'Custom Supplies Contribution' : selectedTier.name,
        quantityUnits: isCustom ? 1 : quantity,
        supplyDescription: isCustom ? customSupplyText.trim() : `${quantity}x ${selectedTier.supplyQuantity}`,
        deliveryMethod,
        dropoffLocation: deliveryMethod === 'dropoff_school' ? dropoffLocation : pickupAddress,
        scheduledDate,
        dedicatedSchool,
        dedicatedStudent: dedicatedStudent.trim() || undefined,
        notes: notes.trim() || undefined,
        timestamp: new Date().toISOString(),
        status: 'Pledge Confirmed · Awaiting Handover',
      };

      onPledgeSuccess(completedRecord);
    }, 1200);
  };

  return (
    <section id="pledge-zone" className="py-14 sm:py-20 bg-white border-b border-stone-200 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
            <PackageCheck className="w-4 h-4 text-amber-600" />
            <span>Material Supplies &amp; Volunteer Pledges</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 font-serif">
            Pledge Supplies. Empower Classrooms.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            No money or billing involved. Pledge real backpacks, notebooks, meals, or athletic uniforms for children in need. Hand them over at school or schedule a volunteer collection.
          </p>
        </div>

        {/* Main Pledge Card */}
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          
          {isSubmitting ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin mx-auto" />
              <h3 className="text-xl font-bold text-stone-900 font-serif">
                Generating Official Supply Pledge Certificate
              </h3>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Registering your supply commitment with the O&amp;U Interact Club liaison and notifying the school coordinator...
              </p>
              <div className="text-xs text-stone-400 font-mono">
                100% Non-Monetary · Direct Material Delivery · Community Transparency
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitPledge} className="space-y-8 relative z-10">
              
              {/* STEP 1: CHOOSE WHAT SUPPLIES TO PLEDGE */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans">
                      1
                    </span>
                    <span>Step 1: Choose What Supplies You Will Provide</span>
                  </h3>
                  <span className="text-xs text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Zero Money · 100% Material Support
                  </span>
                </div>

                {/* 4 Supply Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {SUPPLY_PLEDGE_TIERS.map((tier) => {
                    const isSelected = !isCustom && selectedTierId === tier.id;
                    return (
                      <div
                        key={tier.id}
                        onClick={() => handleSelectTier(tier)}
                        className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-amber-50/70 border-amber-600 shadow-sm ring-1 ring-amber-600'
                            : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-2xl" role="img" aria-label={tier.name}>
                              {tier.icon}
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded">
                              {tier.tag}
                            </span>
                          </div>

                          <h4 className="text-base font-bold text-stone-900 font-serif">
                            {tier.name}
                          </h4>

                          <div className="mt-1 text-xs font-extrabold text-amber-900 font-mono">
                            {tier.supplyQuantity}
                          </div>

                          <p className="mt-2 text-xs text-stone-600 leading-relaxed">
                            {tier.description}
                          </p>

                          <div className="mt-3 pt-3 border-t border-stone-200/60 space-y-1">
                            <span className="text-[10px] font-bold text-stone-400 uppercase block">Items in this kit:</span>
                            <ul className="text-[11px] text-stone-600 space-y-0.5">
                              {tier.itemsIncluded.slice(0, 3).map((item, idx) => (
                                <li key={idx} className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold">
                          <span className={isSelected ? 'text-amber-800' : 'text-stone-500'}>
                            {isSelected ? '✓ Selected Supply Kit' : 'Select This Supply'}
                          </span>
                          <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'bg-amber-600 border-amber-600 text-white' : 'border-stone-300'
                          }`}>
                            {isSelected && <Check className="w-3 h-3" />}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quantity selector */}
                {!isCustom && (
                  <div className="p-4 bg-white rounded-xl border border-stone-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-stone-900 block">How many of this supply kit will you provide?</span>
                      <span className="text-[11px] text-stone-500">You can bring 1 kit, 5 kits, or outfit an entire class</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {[1, 2, 5, 10, 25].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setQuantity(num)}
                          className={`w-9 h-9 rounded-lg font-bold text-xs transition-all border ${
                            quantity === num
                              ? 'bg-amber-600 text-white border-amber-600 shadow-2xs'
                              : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                          }`}
                        >
                          {num}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Custom Supply contribution */}
                <div className={`p-4 rounded-xl border transition-all ${
                  isCustom ? 'bg-amber-50/60 border-amber-600' : 'bg-white border-stone-200'
                }`}>
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-xs sm:text-sm text-stone-900 mb-2">
                    <input
                      type="radio"
                      name="supplyChoice"
                      checked={isCustom}
                      onChange={() => setIsCustom(true)}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <span>Or, specify custom physical items (e.g. 50 notebooks, boxes of pens, library storybooks, food grain):</span>
                  </label>

                  <div className="pl-6">
                    <input
                      type="text"
                      value={customSupplyText}
                      onFocus={() => setIsCustom(true)}
                      onChange={(e) => setCustomSupplyText(e.target.value)}
                      placeholder="e.g. 40 Primary English storybooks and 2 cartons of ballpoint pens"
                      className="w-full px-3.5 py-2.5 bg-white border border-stone-200 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                    />
                  </div>
                </div>

              </div>

              {/* STEP 2: HOW WILL YOU DELIVER THE SUPPLIES */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans">
                      2
                    </span>
                    <span>Step 2: Choose Delivery or Handover Method</span>
                  </h3>
                  <span className="text-xs text-stone-500">
                    Coordinated by O&amp;U Interact Logistics
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  {/* Option 1: Drop off at school */}
                  <div
                    onClick={() => setDeliveryMethod('dropoff_school')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      deliveryMethod === 'dropoff_school'
                        ? 'bg-white border-amber-600 shadow-sm ring-1 ring-amber-600'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs uppercase mb-1">
                        <School className="w-4 h-4" />
                        <span>Drop Off at School</span>
                      </div>
                      <div className="font-bold text-sm text-stone-900">
                        School Administration Office
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                        Hand over items directly to Room B-12 (Interact Office) or the School Bursar.
                      </p>
                    </div>
                  </div>

                  {/* Option 2: Student Volunteer Pickup */}
                  <div
                    onClick={() => setDeliveryMethod('interact_pickup')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      deliveryMethod === 'interact_pickup'
                        ? 'bg-white border-emerald-600 shadow-sm ring-1 ring-emerald-600'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-emerald-800 font-bold text-xs uppercase mb-1">
                        <Truck className="w-4 h-4" />
                        <span>Student Volunteer Pickup</span>
                      </div>
                      <div className="font-bold text-sm text-stone-900">
                        Scheduled Collection
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                        Our outreach van collects boxes from your home, office, or community center.
                      </p>
                    </div>
                  </div>

                  {/* Option 3: Courier / Package Dispatch */}
                  <div
                    onClick={() => setDeliveryMethod('dispatch_courier')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                      deliveryMethod === 'dispatch_courier'
                        ? 'bg-white border-sky-600 shadow-sm ring-1 ring-sky-600'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 text-sky-800 font-bold text-xs uppercase mb-1">
                        <Box className="w-4 h-4" />
                        <span>Courier Dispatch</span>
                      </div>
                      <div className="font-bold text-sm text-stone-900">
                        Boda / Courier Delivery
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 leading-normal">
                        Dispatch via SafeBoda, Faras, or postal courier to O&amp;U High School gate.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Sub details */}
                <div className="p-4 bg-white border border-stone-200 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Designated Location / Address</label>
                    {deliveryMethod === 'dropoff_school' ? (
                      <select
                        value={dropoffLocation}
                        onChange={(e) => setDropoffLocation(e.target.value)}
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs"
                      >
                        <option value="PEAS Onwards and Upwards Buloba (Room B-12 Interact Office)">PEAS Onwards &amp; Upwards Buloba (Room B-12 Interact Office)</option>
                        <option value="PEAS Samling Nama High School Mpigi (Administration Block)">PEAS Samling Nama High School Mpigi (Admin Block)</option>
                        <option value="PEAS Horizon High School Bombo Kalule (Front Office)">PEAS Horizon High School Bombo Kalule (Front Office)</option>
                        <option value="PEAS Pioneer High School (Bursar Office)">PEAS Pioneer High School (Bursar Office)</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={pickupAddress}
                        onChange={(e) => setPickupAddress(e.target.value)}
                        placeholder="e.g. Ntinda Shopping Mall, Office 4B"
                        className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Estimated Handover Date</label>
                    <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg font-mono"
                    />
                  </div>
                </div>

              </div>

              {/* STEP 3: CONTRIBUTOR DETAILS & SCHOOL ALLOCATION */}
              <div className="space-y-4 pt-4 border-t border-stone-200">
                <h3 className="text-base sm:text-lg font-bold text-stone-900 font-serif flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white text-xs flex items-center justify-center font-sans">
                    3
                  </span>
                  <span>Step 3: Contributor Information &amp; School Allocation</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      value={contributorName}
                      onChange={(e) => setContributorName(e.target.value)}
                      placeholder="e.g. Sarah Mirembe"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Email Address (for Official Certificate) *</label>
                    <input
                      type="email"
                      required
                      value={contributorEmail}
                      onChange={(e) => setContributorEmail(e.target.value)}
                      placeholder="supporter@example.com"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Allocate Supplies to Specific School:</label>
                    <select
                      value={dedicatedSchool}
                      onChange={(e) => setDedicatedSchool(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg text-xs"
                    >
                      <option value="All Partner Schools (Highest Need)">All Partner Schools (Direct to Highest Need)</option>
                      {INITIAL_SCHOOLS.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-stone-700 mb-1">Phone Number (for Pickup / Handover Confirmation)</label>
                    <input
                      type="tel"
                      value={contributorPhone}
                      onChange={(e) => setContributorPhone(e.target.value)}
                      placeholder="0770 000 000"
                      className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg font-mono"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-semibold text-stone-700 mb-1">Dedication or Special Note (Optional)</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. In honour of Grade 4 pupils / Will bring boxes on Monday morning"
                    className="w-full px-3 py-2 bg-white border border-stone-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Error message */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* ACTION BUTTON */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <PackageCheck className="w-5 h-5" />
                  <span>
                    Confirm Supply Pledge: {isCustom ? 'Custom Items' : `${quantity}x ${selectedTier.name}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="mt-3 flex items-center justify-center gap-2 text-xs text-stone-500 text-center">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>
                    Zero Money Involved · Official Supply Handover Certificate Issued Instantly
                  </span>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
