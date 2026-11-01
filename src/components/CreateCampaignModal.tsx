import React, { useState } from 'react';
import { Campaign, CampaignCategory } from '../types/donation';
import { 
  X, Plus, Sparkles, CheckCircle2, ArrowRight, ArrowLeft, 
  Image as ImageIcon, DollarSign, MapPin, Users, Target, ShieldCheck, Heart
} from 'lucide-react';

interface CreateCampaignModalProps {
  onClose: () => void;
  onCampaignCreated: (newCampaign: Campaign) => void;
}

const PRESET_COVERS = [
  {
    url: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=1200&auto=format&fit=crop&q=80',
    title: 'Clean Water Project',
  },
  {
    url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&auto=format&fit=crop&q=80',
    title: 'Education & Classroom',
  },
  {
    url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=1200&auto=format&fit=crop&q=80',
    title: 'Healthcare & Clinic',
  },
  {
    url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80',
    title: 'Food Aid & Children',
  },
  {
    url: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=1200&auto=format&fit=crop&q=80',
    title: 'Climate & Trees',
  },
  {
    url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
    title: 'Youth & Tech Center',
  },
];

export const CreateCampaignModal: React.FC<CreateCampaignModalProps> = ({
  onClose,
  onCampaignCreated,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<CampaignCategory>('clean-water');
  const [location, setLocation] = useState('');
  const [country, setCountry] = useState('');
  const [targetAmount, setTargetAmount] = useState('15000');
  const [daysLeft, setDaysLeft] = useState('30');
  const [beneficiariesCount, setBeneficiariesCount] = useState('1200');
  const [beneficiariesDescription, setBeneficiariesDescription] = useState('');
  
  // Story
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [story, setStory] = useState('');

  // Media & Organizer
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0].url);
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [organizerName, setOrganizerName] = useState('');
  const [organizerRole, setOrganizerRole] = useState('Programme Coordinator');
  const [organizerOrg, setOrganizerOrg] = useState('');

  const [error, setError] = useState('');

  const handleNext = () => {
    if (step === 1) {
      if (!title.trim() || !tagline.trim() || !location.trim() || !country.trim()) {
        setError('Please fill out the title, tagline, location, and country.');
        return;
      }
      setError('');
      setStep(2);
    } else if (step === 2) {
      if (!challenge.trim() || !solution.trim() || !story.trim()) {
        setError('Please provide the challenge, solution, and background story.');
        return;
      }
      setError('');
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!organizerName.trim() || !organizerOrg.trim()) {
      setError('Please provide the organizer name and organization.');
      return;
    }

    const finalTarget = parseFloat(targetAmount) || 10000;
    const finalDays = parseInt(daysLeft, 10) || 30;
    const finalBeneficiaries = parseInt(beneficiariesCount, 10) || 500;
    const selectedCover = customCoverUrl.trim() || coverImage;

    const newCampaign: Campaign = {
      id: 'custom-' + Date.now(),
      title: title.trim(),
      tagline: tagline.trim(),
      category,
      location: location.trim(),
      country: country.trim(),
      organizer: {
        name: organizerName.trim(),
        role: organizerRole.trim() || 'Lead Coordinator',
        organization: organizerOrg.trim(),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        verified: true,
      },
      beneficiariesCount: finalBeneficiaries,
      beneficiariesDescription: beneficiariesDescription.trim() || 'Local vulnerable households & pupils',
      targetAmount: finalTarget,
      currentAmount: 0,
      currency: 'USD',
      daysLeft: finalDays,
      donorCount: 0,
      coverImage: selectedCover,
      galleryImages: [selectedCover],
      story: story.trim(),
      challenge: challenge.trim(),
      solution: solution.trim(),
      budgetBreakdown: [
        { category: 'Direct Aid Equipment & Materials', percentage: 65, amount: Math.round(finalTarget * 0.65) },
        { category: 'Local Transport & Installation', percentage: 20, amount: Math.round(finalTarget * 0.20) },
        { category: 'Community Training & Monitoring', percentage: 10, amount: Math.round(finalTarget * 0.10) },
        { category: 'Independent Verification & Audit', percentage: 5, amount: Math.round(finalTarget * 0.05) },
      ],
      impactTiers: [
        {
          id: 'tier-1',
          amount: Math.round(finalTarget * 0.002) || 20,
          label: 'Essential Starter Kit',
          description: 'Provides direct basic supply pack for one beneficiary family.',
        },
        {
          id: 'tier-2',
          amount: Math.round(finalTarget * 0.005) || 50,
          label: 'Core Community Support',
          description: 'Funds materials and field delivery for 3 households.',
        },
        {
          id: 'tier-3',
          amount: Math.round(finalTarget * 0.015) || 150,
          label: 'Major Infrastructure Pillar',
          description: 'Sponsors hardware installation unit and local operator training.',
        },
      ],
      milestones: [
        { id: 'm1', title: 'Community mobilization and site readiness', targetAmount: Math.round(finalTarget * 0.25), achieved: false, description: 'Initial site clearance, stakeholder buy-in, and equipment ordering.' },
        { id: 'm2', title: 'Delivery and physical setup', targetAmount: Math.round(finalTarget * 0.70), achieved: false, description: 'Core installations and equipment deployment.' },
        { id: 'm3', title: 'Full commissioning and community handover', targetAmount: finalTarget, achieved: false, description: 'Final inspection, water/health testing, and training completion.' },
      ],
      updates: [],
      featured: true,
      urgent: false,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onCampaignCreated(newCampaign);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/65 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6 animate-fadeIn">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/70">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
              KindPulse Programme Studio
            </span>
            <h3 className="text-lg font-bold text-stone-900 font-serif">
              Start a New Donation Programme
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicators */}
        <div className="px-6 py-3 bg-stone-50 border-b border-stone-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              step >= 1 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
            }`}>1</span>
            <span className={step === 1 ? 'font-bold text-stone-900' : 'text-stone-500'}>Programme Basics</span>
          </div>

          <div className="h-0.5 flex-1 mx-3 bg-stone-200">
            <div className={`h-full bg-emerald-600 transition-all ${step === 1 ? 'w-0' : step === 2 ? 'w-1/2' : 'w-full'}`} />
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              step >= 2 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
            }`}>2</span>
            <span className={step === 2 ? 'font-bold text-stone-900' : 'text-stone-500'}>Story &amp; Impact</span>
          </div>

          <div className="h-0.5 flex-1 mx-3 bg-stone-200">
            <div className={`h-full bg-emerald-600 transition-all ${step === 3 ? 'w-full' : 'w-0'}`} />
          </div>

          <div className="flex items-center gap-2">
            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
              step === 3 ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-600'
            }`}>3</span>
            <span className={step === 3 ? 'font-bold text-stone-900' : 'text-stone-500'}>Organizer &amp; Launch</span>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-stone-700">
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 font-medium">
              {error}
            </div>
          )}

          {/* STEP 1: BASICS */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Programme Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Clean Solar Water Borehole for Samburu Village"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Short Tagline / Summary *
                </label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Drilling a 150m solar well to supply 2,400 residents with fresh drinking water."
                  className="w-full px-3.5 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-900 mb-1">
                    Cause Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CampaignCategory)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600 font-medium"
                  >
                    <option value="clean-water">💧 Clean Water &amp; Sanitation</option>
                    <option value="education">🎓 Education &amp; Scholarships</option>
                    <option value="healthcare">🏥 Healthcare &amp; Medical Clinics</option>
                    <option value="food-security">🍲 Food Security &amp; Farming</option>
                    <option value="climate">🌳 Climate &amp; Reforestation</option>
                    <option value="emergency">🚨 Emergency &amp; Disaster Relief</option>
                    <option value="community">💡 Community &amp; Youth Hub</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-900 mb-1">
                    Fundraising Target (USD $) *
                  </label>
                  <input
                    type="number"
                    min="500"
                    step="100"
                    value={targetAmount}
                    onChange={(e) => setTargetAmount(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-900 mb-1">
                    Location / Region *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Samburu North"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-900 mb-1">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="e.g. Kenya"
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-stone-900 mb-1">
                    Beneficiaries Count
                  </label>
                  <input
                    type="number"
                    value={beneficiariesCount}
                    onChange={(e) => setBeneficiariesCount(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-900 mb-1">
                    Campaign Duration (Days)
                  </label>
                  <input
                    type="number"
                    value={daysLeft}
                    onChange={(e) => setDaysLeft(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: STORY & IMPACT */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  The Challenge * (What problem does this community face?)
                </label>
                <textarea
                  rows={2}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  placeholder="Describe the current hardship, shortage, or vulnerability..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  The Direct Solution * (How will your programme solve it?)
                </label>
                <textarea
                  rows={2}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  placeholder="Outline the concrete action, equipment installation, or training..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Full Background Story &amp; Details *
                </label>
                <textarea
                  rows={4}
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Share the full context, human stories, and why donor support is crucial now..."
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Beneficiary Description
                </label>
                <input
                  type="text"
                  value={beneficiariesDescription}
                  onChange={(e) => setBeneficiariesDescription(e.target.value)}
                  placeholder="e.g. 1,200 school children and pastoralist mothers"
                  className="w-full px-3 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>
          )}

          {/* STEP 3: MEDIA, ORGANIZER & PUBLISH */}
          {step === 3 && (
            <div className="space-y-5">
              
              {/* Cover Photo Selection */}
              <div>
                <label className="block font-bold text-stone-900 mb-1">
                  Select Programme Cover Photo
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {PRESET_COVERS.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCoverImage(preset.url);
                        setCustomCoverUrl('');
                      }}
                      className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                        coverImage === preset.url && !customCoverUrl
                          ? 'border-emerald-600 ring-2 ring-emerald-500/20'
                          : 'border-stone-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                      <span className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[9px] py-0.5 text-center truncate px-1">
                        {preset.title}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="mt-2">
                  <input
                    type="url"
                    value={customCoverUrl}
                    onChange={(e) => setCustomCoverUrl(e.target.value)}
                    placeholder="Or paste custom image URL (https://...)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-emerald-600"
                  />
                </div>
              </div>

              {/* Organizer details */}
              <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Organizer &amp; Accountability Details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-stone-700 mb-0.5">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={organizerName}
                      onChange={(e) => setOrganizerName(e.target.value)}
                      placeholder="e.g. Calton Musembwa"
                      className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-stone-700 mb-0.5">Your Role / Title</label>
                    <input
                      type="text"
                      value={organizerRole}
                      onChange={(e) => setOrganizerRole(e.target.value)}
                      placeholder="e.g. Lead Field Coordinator"
                      className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-0.5">Organization / Initiative Name *</label>
                  <input
                    type="text"
                    required
                    value={organizerOrg}
                    onChange={(e) => setOrganizerOrg(e.target.value)}
                    placeholder="e.g. Bright Horizon Community Initiative"
                    className="w-full px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl text-xs text-emerald-900 border border-emerald-200">
                <strong>Publication Notice:</strong> Your programme will be immediately activated, given an official fund-tracking ID, and made available for public donors to pledge contributions via Card, Mobile Money, and Bank Transfer.
              </div>

            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((step - 1) as any)}
              className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg border border-stone-200 bg-white"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs px-5 py-2.5 rounded-lg transition-all"
            >
              <span>Continue to Step {step + 1}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-6 py-2.5 rounded-lg shadow-md transition-all active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Donation Programme</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
