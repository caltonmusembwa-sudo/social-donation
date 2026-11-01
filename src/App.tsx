/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Campaign, CampaignCategory, CurrencyCode, DonationRecord, DonorCheer, ImpactTier } from './types/donation';
import { INITIAL_CAMPAIGNS, INITIAL_DONOR_CHEERS } from './data/initialCampaigns';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { CampaignCard } from './components/CampaignCard';
import { CampaignDetailModal } from './components/CampaignDetailModal';
import { DonationModal } from './components/DonationModal';
import { DonationReceiptModal } from './components/DonationReceiptModal';
import { CreateCampaignModal } from './components/CreateCampaignModal';
import { UserImpactDashboard } from './components/UserImpactDashboard';
import { HowItWorksModal } from './components/HowItWorksModal';
import { Heart, Sparkles, ShieldCheck, ArrowRight, PlusCircle, Check } from 'lucide-react';

const STORAGE_KEYS = {
  CAMPAIGNS: 'kindpulse_campaigns_v1',
  USER_DONATIONS: 'kindpulse_user_donations_v1',
  DONOR_CHEERS: 'kindpulse_cheers_v1',
  CURRENCY: 'kindpulse_currency_v1',
};

export default function App() {
  // 1. Core State
  const [campaigns, setCampaigns] = useState<Campaign[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved campaigns:', e);
    }
    return INITIAL_CAMPAIGNS;
  });

  const [userDonations, setUserDonations] = useState<DonationRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_DONATIONS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved user donations:', e);
    }
    return [];
  });

  const [donorCheers, setDonorCheers] = useState<DonorCheer[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DONOR_CHEERS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved donor cheers:', e);
    }
    return INITIAL_DONOR_CHEERS;
  });

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENCY) as CurrencyCode;
      if (saved) return saved;
    } catch (e) {}
    return 'USD';
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'explore' | 'my-impact'>('explore');
  const [selectedCategory, setSelectedCategory] = useState<CampaignCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'urgent' | 'funded' | 'newest' | 'target'>('urgent');

  // Modal dialog states
  const [selectedCampaignForDetail, setSelectedCampaignForDetail] = useState<Campaign | null>(null);
  const [campaignForDonation, setCampaignForDonation] = useState<Campaign | null>(null);
  const [presetTierForDonation, setPresetTierForDonation] = useState<ImpactTier | undefined>(undefined);
  const [recentReceiptRecord, setRecentReceiptRecord] = useState<DonationRecord | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    } catch (e) {}
  }, [campaigns]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_DONATIONS, JSON.stringify(userDonations));
    } catch (e) {}
  }, [userDonations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DONOR_CHEERS, JSON.stringify(donorCheers));
    } catch (e) {}
  }, [donorCheers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CURRENCY, selectedCurrency);
    } catch (e) {}
  }, [selectedCurrency]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Filtered & Sorted Campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns
      .filter((c) => {
        const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
        const matchesSearch =
          searchQuery.trim() === '' ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.organizer.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'urgent') {
          if (a.urgent && !b.urgent) return -1;
          if (!a.urgent && b.urgent) return 1;
          return a.daysLeft - b.daysLeft;
        } else if (sortBy === 'funded') {
          const pctA = a.currentAmount / a.targetAmount;
          const pctB = b.currentAmount / b.targetAmount;
          return pctB - pctA;
        } else if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortBy === 'target') {
          return b.targetAmount - a.targetAmount;
        }
        return 0;
      });
  }, [campaigns, selectedCategory, searchQuery, sortBy]);

  // Aggregate metrics
  const totalDonatedUSD = useMemo(() => {
    return campaigns.reduce((sum, c) => sum + c.currentAmount, 0);
  }, [campaigns]);

  // Handlers
  const handleOpenDonate = (campaign: Campaign, presetTier?: ImpactTier) => {
    setCampaignForDonation(campaign);
    setPresetTierForDonation(presetTier);
  };

  const handleDonationComplete = (record: DonationRecord) => {
    // 1. Update campaign funded amounts & donor count
    setCampaigns((prev) =>
      prev.map((c) => {
        if (c.id === record.campaignId) {
          const updatedAmount = c.currentAmount + record.amount;
          return {
            ...c,
            currentAmount: updatedAmount,
            donorCount: c.donorCount + 1,
            // check milestone achievement
            milestones: c.milestones.map((m) =>
              updatedAmount >= m.targetAmount ? { ...m, achieved: true } : m
            ),
          };
        }
        return c;
      })
    );

    // 2. Save to user personal history
    setUserDonations((prev) => [record, ...prev]);

    // 3. Add to public cheers if message provided
    if (record.message) {
      const newCheer: DonorCheer = {
        id: 'cheer-' + Date.now(),
        donorName: record.isAnonymous ? 'Kind Supporter' : record.donorName,
        amount: record.amount,
        currency: record.currency,
        timestamp: 'Just now',
        message: record.message,
        isAnonymous: record.isAnonymous,
        likesCount: 1,
      };
      setDonorCheers((prev) => [newCheer, ...prev]);
    }

    // 4. Close donation modal and open official receipt
    setCampaignForDonation(null);
    setPresetTierForDonation(undefined);
    setRecentReceiptRecord(record);

    showToast(`Thank you! Your donation receipt ${record.receiptNumber} has been generated.`);
  };

  const handleCampaignCreated = (newCampaign: Campaign) => {
    setCampaigns((prev) => [newCampaign, ...prev]);
    setIsCreateModalOpen(false);
    setSelectedCampaignForDetail(newCampaign);
    showToast(`Congratulations! "${newCampaign.title}" is now active and ready for donations.`);
  };

  const handleAddCheer = (campaignId: string, message: string, donorName: string) => {
    const cheer: DonorCheer = {
      id: 'cheer-' + Date.now(),
      donorName,
      amount: 25,
      currency: selectedCurrency,
      timestamp: 'Just now',
      message,
      isAnonymous: false,
      likesCount: 0,
    };
    setDonorCheers((prev) => [cheer, ...prev]);
    showToast('Your message of encouragement was posted!');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs sm:text-sm font-medium py-3 px-4 rounded-xl shadow-xl border border-stone-800 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        selectedCurrency={selectedCurrency}
        onSelectCurrency={setSelectedCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalUserDonationsCount={userDonations.length}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {activeTab === 'explore' ? (
          <div>
            {/* Hero Section */}
            <HeroBanner
              onExploreClick={() => {
                const el = document.getElementById('programmes-directory');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onStartCampaignClick={() => setIsCreateModalOpen(true)}
              selectedCurrency={selectedCurrency}
              totalDonatedSoFarUSD={totalDonatedUSD}
              totalCampaignsCount={campaigns.length}
            />

            {/* Programmes Directory Section */}
            <section id="programmes-directory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
              
              {/* Category Filter & Controls */}
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                sortBy={sortBy}
                onSortChange={setSortBy}
                totalFilteredCount={filteredCampaigns.length}
              />

              {/* Campaigns Grid */}
              {filteredCampaigns.length === 0 ? (
                <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                    <Heart className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">
                      No matching donation programmes found
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                      Try adjusting your search keywords, clear category filters, or launch your own community programme!
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="px-4 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>Start a Programme</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCampaigns.map((camp) => (
                    <CampaignCard
                      key={camp.id}
                      campaign={camp}
                      selectedCurrency={selectedCurrency}
                      onSelect={(c) => setSelectedCampaignForDetail(c)}
                      onDonate={(c) => handleOpenDonate(c)}
                    />
                  ))}
                </div>
              )}

              {/* Call to Action Banner at bottom */}
              <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2 text-center md:text-left">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-300">
                    Community Driven Philanthropy
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold font-serif">
                    Do you have a project ready to make a difference?
                  </h3>
                  <p className="text-emerald-100 text-xs sm:text-sm max-w-xl">
                    Launch your cause in minutes. We provide zero-deduction payout processing, instant charitable tax receipts for your backers, and field audit tools.
                  </p>
                </div>
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="whitespace-nowrap px-6 py-3.5 bg-white hover:bg-emerald-50 text-emerald-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-700" />
                  <span>Start Your Donation Programme</span>
                </button>
              </div>

            </section>
          </div>
        ) : (
          /* Personal Philanthropy Ledger */
          <UserImpactDashboard
            donationRecords={userDonations}
            selectedCurrency={selectedCurrency}
            onViewReceipt={(r) => setRecentReceiptRecord(r)}
            onExploreProgrammes={() => setActiveTab('explore')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-12 text-stone-600 text-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-serif text-lg font-bold text-stone-900">
                KindPulse
              </span>
              <span className="text-stone-300">|</span>
              <span className="text-stone-500">
                Direct Grassroots Philanthropy
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs text-stone-500">
              <button onClick={() => setIsHowItWorksOpen(true)} className="hover:text-stone-900 transition-colors">
                Verification Pipeline
              </button>
              <button onClick={() => setIsCreateModalOpen(true)} className="hover:text-stone-900 transition-colors">
                Programme Builder
              </button>
              <button onClick={() => setActiveTab('my-impact')} className="hover:text-stone-900 transition-colors">
                Tax Receipts &amp; Ledger
              </button>
            </div>
          </div>

          <div className="border-t border-stone-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-400">
            <div>
              © 2026 KindPulse Community Donation Initiatives. 100% of public funds routed directly to designated projects.
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Fiduciary Custody · Encrypted Transactions · Audited Accounts</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS */}

      {/* 1. Campaign Details & Story Modal */}
      {selectedCampaignForDetail && (
        <CampaignDetailModal
          campaign={selectedCampaignForDetail}
          onClose={() => setSelectedCampaignForDetail(null)}
          onDonate={(c, tier) => {
            setSelectedCampaignForDetail(null);
            handleOpenDonate(c, tier);
          }}
          selectedCurrency={selectedCurrency}
          donorCheers={donorCheers}
          onAddCheer={handleAddCheer}
        />
      )}

      {/* 2. Donation Checkout Modal */}
      {campaignForDonation && (
        <DonationModal
          campaign={campaignForDonation}
          presetTier={presetTierForDonation}
          selectedCurrency={selectedCurrency}
          onClose={() => {
            setCampaignForDonation(null);
            setPresetTierForDonation(undefined);
          }}
          onDonationComplete={handleDonationComplete}
        />
      )}

      {/* 3. Official Tax Receipt Modal */}
      {recentReceiptRecord && (
        <DonationReceiptModal
          record={recentReceiptRecord}
          onClose={() => setRecentReceiptRecord(null)}
          onShare={() => {
            navigator.clipboard.writeText(window.location.href);
            showToast('Cause link copied to clipboard to share with friends!');
          }}
        />
      )}

      {/* 4. Start a Campaign Builder Wizard Modal */}
      {isCreateModalOpen && (
        <CreateCampaignModal
          onClose={() => setIsCreateModalOpen(false)}
          onCampaignCreated={handleCampaignCreated}
        />
      )}

      {/* 5. How It Works & Transparency Modal */}
      {isHowItWorksOpen && (
        <HowItWorksModal
          onClose={() => setIsHowItWorksOpen(false)}
          onExplore={() => {
            setIsHowItWorksOpen(false);
            setActiveTab('explore');
          }}
        />
      )}

    </div>
  );
}
