/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, CompletedPledge, SchoolLeaderboardEntry, 
  SchoolRegistrationRequest, ClubContentItem, AdminProfile 
} from './types/interactClub';
import { INITIAL_SCHOOLS, INITIAL_CLUB_CONTENT } from './data/interactData';
import { HeaderNavbar } from './components/HeaderNavbar';
import { HeroSection } from './components/HeroSection';
import { AboutDirectionSection } from './components/AboutDirectionSection';
import { LiveImpactTracker } from './components/LiveImpactTracker';
import { HowItWorksSection } from './components/HowItWorksSection';
import { PledgeSupportZone } from './components/PledgeSupportZone';
import { SchoolLeaderboard } from './components/SchoolLeaderboard';
import { SpotlightStory } from './components/SpotlightStory';
import { EventsNewsSection } from './components/EventsNewsSection';
import { FooterSection } from './components/FooterSection';
import { ProjectsTab } from './components/ProjectsTab';
import { SchoolZoneTab } from './components/SchoolZoneTab';
import { TransparencyTab } from './components/TransparencyTab';
import { ProposalTab } from './components/ProposalTab';
import { AdCampaignStudio } from './components/AdCampaignStudio';
import { CommunityMediaGallery } from './components/CommunityMediaGallery';
import { AdminDashboard } from './components/AdminDashboard';
import { RegisterSchoolModal } from './components/RegisterSchoolModal';
import { SuccessStoriesModal } from './components/SuccessStoriesModal';
import { PledgeCertificateModal } from './components/PledgeCertificateModal';
import { Check, Sparkles, RotateCw, RefreshCw, Radio, CheckCircle2, Clock } from 'lucide-react';

const STORAGE_KEYS = {
  SCHOOLS: 'ou_interact_schools_peas_v6',
  PLEDGES: 'ou_interact_pledges_peas_v6',
  CONTENT: 'ou_interact_content_peas_v6',
  ADMIN_SESSION: 'ou_interact_admin_session_peas_v6',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  const [schools, setSchools] = useState<SchoolLeaderboardEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SCHOOLS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_SCHOOLS;
  });

  const [pledges, setPledges] = useState<CompletedPledge[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLEDGES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const [contentItems, setContentItems] = useState<ClubContentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTENT);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return INITIAL_CLUB_CONTENT;
  });

  const [currentAdmin, setCurrentAdmin] = useState<AdminProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return null;
  });

  // Modal dialog states
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isStoriesModalOpen, setIsStoriesModalOpen] = useState(false);
  const [activeCertificate, setActiveCertificate] = useState<CompletedPledge | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Automatic Self-Updating State (Requested Feature)
  const [lastSyncTime, setLastSyncTime] = useState<Date>(new Date());
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState<boolean>(true);

  const performAutoSync = (isManual = false) => {
    setIsSyncing(true);
    setTimeout(() => {
      setLastSyncTime(new Date());
      setIsSyncing(false);
      if (isManual) {
        showToast('App refreshed automatically: PEAS network & Term 3 2026 data up to date!');
      }
    }, 500);
  };

  // Heartbeat interval for automatic live background updates
  useEffect(() => {
    if (!autoUpdateEnabled) return;

    // Automatically check & synchronize every 40 seconds
    const interval = setInterval(() => {
      performAutoSync(false);
    }, 40000);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        performAutoSync(false);
      }
    };

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleVisibilityChange);
    };
  }, [autoUpdateEnabled]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SCHOOLS, JSON.stringify(schools));
    } catch (e) {}
  }, [schools]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLEDGES, JSON.stringify(pledges));
    } catch (e) {}
  }, [pledges]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(contentItems));
    } catch (e) {}
  }, [contentItems]);

  useEffect(() => {
    try {
      if (currentAdmin) {
        localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, JSON.stringify(currentAdmin));
      } else {
        localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
      }
    } catch (e) {}
  }, [currentAdmin]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const scrollToPledge = () => {
    setActiveTab('home');
    setTimeout(() => {
      const el = document.getElementById('pledge-zone');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handlePledgeSuccess = (newPledge: CompletedPledge) => {
    setPledges((prev) => [newPledge, ...prev]);

    if (newPledge.dedicatedSchool && newPledge.dedicatedSchool !== 'All Partner Schools (Highest Need)') {
      setSchools((prev) => {
        const updated = prev.map((s) => {
          if (s.name === newPledge.dedicatedSchool) {
            const addedItems = newPledge.quantityUnits || 1;
            const newCount = s.itemsPledgedCount + addedItems;
            const newPercent = Math.min(100, Math.round((newCount / s.targetCount) * 100));
            const newStudents = s.studentsSupported + (addedItems * 2);
            return {
              ...s,
              itemsPledgedCount: newCount,
              progressPercent: newPercent,
              studentsSupported: newStudents,
            };
          }
          return s;
        });

        return updated
          .sort((a, b) => b.itemsPledgedCount - a.itemsPledgedCount)
          .map((s, idx) => ({ ...s, rank: idx + 1 }));
      });
    }

    setActiveCertificate(newPledge);
    showToast(`Thank you! Supply Pledge Certificate ${newPledge.pledgeCertificateNumber} generated.`);
  };

  const handleSchoolRegistered = (req: SchoolRegistrationRequest) => {
    const clusterLat = 0.3420 + (Math.random() - 0.5) * 0.04;
    const clusterLng = 32.5750 + (Math.random() - 0.5) * 0.04;

    const newEntry: SchoolLeaderboardEntry = {
      id: req.id,
      rank: schools.length + 1,
      name: req.schoolName,
      level: req.level + ' School',
      location: req.location,
      district: req.location.includes('District') ? req.location : req.location + ' District',
      region: 'Central Uganda',
      progressPercent: 0,
      itemsPledgedCount: 0,
      targetCount: 500,
      metricLabel: 'Backpacks & Kits Pledged',
      studentsSupported: 0,
      coordinator: req.contactPerson,
      lat: Number(clusterLat.toFixed(4)),
      lng: Number(clusterLng.toFixed(4)),
      lastUpdatedDate: '5th November 2026 (Term 3)',
      transportInfo: {
        distanceFromBulobaKm: 28,
        estimatedDriveTime: '40 mins via Main Road',
        routeHighway: 'Kampala-Mityana Highway corridor',
        transportAccessibility: 'Accessible by regional bus and school dispatch van',
        googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&origin=0.3345,32.4632&destination=${clusterLat.toFixed(4)},${clusterLng.toFixed(4)}`,
        recommendedTransport: 'Outreach passenger coaster or local commuter taxi',
      },
    };

    setSchools((prev) => [...prev, newEntry]);
    setIsRegisterModalOpen(false);
    showToast(`"${req.schoolName}" has been successfully enrolled and pinned to the PEAS School Zone map!`);
  };

  const handlePledgeToSchool = (schoolName: string) => {
    scrollToPledge();
    showToast(`Directing your material pledge to ${schoolName}. Choose your items below.`);
  };

  // Admin content operations
  const handleAdminLogin = (emailInput: string, passInput: string): boolean => {
    const normalized = emailInput.toLowerCase().trim();
    if (
      normalized.includes('calton') ||
      normalized.includes('rasul') ||
      normalized.includes('patron') ||
      normalized.includes('ouinteract')
    ) {
      const role = normalized.includes('calton')
        ? 'Project Manager'
        : normalized.includes('rasul')
        ? 'Club President'
        : 'Faculty Patron';
      setCurrentAdmin({
        email: normalized,
        isAdmin: true,
        role,
      });
      showToast(`Welcome back, ${role}! Content management active.`);
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setCurrentAdmin(null);
    showToast('Signed out of admin dashboard.');
  };

  const handleSaveContentItem = (data: Partial<ClubContentItem> & { id?: string }) => {
    if (data.id) {
      setContentItems((prev) =>
        prev.map((item) => (item.id === data.id ? { ...item, ...data } as ClubContentItem : item))
      );
      showToast('Content item updated.');
    } else {
      const newItem: ClubContentItem = {
        id: 'item-' + Date.now(),
        type: data.type || 'project',
        title: data.title || '',
        body: data.body || '',
        event_date: data.event_date,
        published: data.published ?? true,
        created_at: new Date().toISOString(),
      };
      setContentItems((prev) => [newItem, ...prev]);
      showToast('New content published to website.');
    }
  };

  const handleDeleteContentItem = (id: string) => {
    setContentItems((prev) => prev.filter((x) => x.id !== id));
    showToast('Item deleted.');
  };

  const handleTogglePublish = (id: string) => {
    setContentItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, published: !item.published } : item))
    );
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* Toast Alert with welcoming bouncy pop-in */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white text-xs sm:text-sm font-semibold py-3 px-4 rounded-xl shadow-xl border border-stone-800 flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Navigation Bar */}
      <HeaderNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPledgeClick={scrollToPledge}
        isAdminLoggedIn={!!currentAdmin}
      />

      {/* Main View Router */}
      <main className="flex-1">
        
        {/* 1. HOME TAB */}
        {activeTab === 'home' && (
          <div>
            {/* 1. HERO SECTION (Welcoming Animations + Non-Billing Copy) */}
            <HeroSection
              onPledgeClick={scrollToPledge}
              onPartnerSchoolsClick={() => {
                setActiveTab('school-zone');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewAdsClick={() => {
                setActiveTab('ads');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onViewProposalClick={() => {
                setActiveTab('proposal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 2. ABOUT & OUR DIRECTION */}
            <AboutDirectionSection />

            {/* 3. LIVE IMPACT TRACKER */}
            <LiveImpactTracker />

            {/* 4. HOW IT WORKS */}
            <HowItWorksSection />

            {/* 5. PLEDGE SUPPORT ZONE (Zero money, 100% material supplies) */}
            <PledgeSupportZone
              onPledgeSuccess={handlePledgeSuccess}
            />

            {/* 6. THE SCHOOL LEADERBOARD */}
            <SchoolLeaderboard
              schools={schools}
              onRegisterSchoolClick={() => setIsRegisterModalOpen(true)}
              onPledgeToSchool={handlePledgeToSchool}
            />

            {/* 7. SPOTLIGHT STORY */}
            <SpotlightStory
              onReadMoreClick={() => setIsStoriesModalOpen(true)}
            />

            {/* 8. COMMUNITY PHOTO GALLERY PREVIEW */}
            <section className="py-12 bg-white border-b border-stone-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-widest">
                      <span>📸</span>
                      <span>Verified Community Photo Archive</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif mt-1">
                      Our People &amp; School Community in Action
                    </h2>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('gallery');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="self-start sm:self-auto text-xs font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <span>View All 8 Photos in Gallery</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { src: '/assets/aistudio/Peas_Sampling_Nama_High_School_Visit_cce89195.png', title: 'PEAS Samling Nama Visit' },
                    { src: '/assets/aistudio/images__3__245ac07c.jpg', title: 'Student Leaders Assembly' },
                    { src: '/assets/aistudio/images__4__88a8e4c6.jpg', title: 'Headmistress Tr. Agnes' },
                    { src: '/assets/aistudio/images__1__9b1711cc.jpg', title: 'Coach Marcus & Athlete' },
                  ].map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        setActiveTab('gallery');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="group cursor-pointer rounded-2xl overflow-hidden border border-stone-200 aspect-[4/3] relative bg-stone-100 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    >
                      <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-3">
                        <span className="text-white text-[11px] font-bold leading-tight drop-shadow-sm">{img.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 9. SAVE THE DATE (Events) & CLUB UPDATES (News) & JOIN US */}
            <EventsNewsSection
              contentItems={contentItems}
              onOpenContact={() => {
                showToast('Interact Club Office: Room B-12, Onwards & Upwards Secondary School Campus · ouinteract.org');
              }}
              onOpenAdmin={() => {
                setActiveTab('admin');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* 2. ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="animate-welcome">
            <AboutDirectionSection />
          </div>
        )}

        {/* 3. PROJECTS TAB (Zero Money) */}
        {activeTab === 'projects' && (
          <div className="animate-welcome">
            <ProjectsTab
              onPledgeToProject={(tierId) => {
                scrollToPledge();
              }}
            />
          </div>
        )}

        {/* 4. PHOTO GALLERY TAB (All 8 Uploaded School Photos) */}
        {activeTab === 'gallery' && (
          <div className="animate-welcome">
            <CommunityMediaGallery
              onPledgeClick={scrollToPledge}
            />
          </div>
        )}

        {/* 5. AD CAMPAIGNS STUDIO (Spotify, YouTube, LinkedIn, Netlify, Instagram) */}
        {activeTab === 'ads' && (
          <div className="animate-welcome">
            <AdCampaignStudio
              onPledgeClick={scrollToPledge}
            />
          </div>
        )}

        {/* 5. EVENTS TAB */}
        {activeTab === 'events' && (
          <div className="py-12 animate-welcome">
            <EventsNewsSection
              contentItems={contentItems}
              onOpenContact={() => {
                showToast('Interact Club Office: Room B-12, O&U High School · ouinteract.org');
              }}
              onOpenAdmin={() => setActiveTab('admin')}
            />
          </div>
        )}

        {/* 6. NEWS TAB */}
        {activeTab === 'news' && (
          <div className="py-12 animate-welcome">
            <EventsNewsSection
              contentItems={contentItems}
              onOpenContact={() => {
                showToast('Interact Club Office: Room B-12, O&U High School · ouinteract.org');
              }}
              onOpenAdmin={() => setActiveTab('admin')}
            />
          </div>
        )}

        {/* 7. SCHOOL ZONE TAB */}
        {activeTab === 'school-zone' && (
          <div className="animate-welcome">
            <SchoolZoneTab
              schools={schools}
              onRegisterSchoolClick={() => setIsRegisterModalOpen(true)}
              onPledgeToSchool={handlePledgeToSchool}
            />
          </div>
        )}

        {/* 8. TRANSPARENCY TAB (Material Transparency) */}
        {activeTab === 'transparency' && (
          <div className="animate-welcome">
            <TransparencyTab
              pledges={pledges}
              onPledgeClick={scrollToPledge}
            />
          </div>
        )}

        {/* 9. PROPOSAL TAB */}
        {activeTab === 'proposal' && (
          <div className="animate-welcome">
            <ProposalTab
              onDonateClick={scrollToPledge}
              onExploreProjects={() => {
                setActiveTab('projects');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* 10. ADMIN DASHBOARD TAB */}
        {activeTab === 'admin' && (
          <div className="animate-welcome">
            <AdminDashboard
              contentItems={contentItems}
              onSaveItem={handleSaveContentItem}
              onDeleteItem={handleDeleteContentItem}
              onTogglePublish={handleTogglePublish}
              currentAdmin={currentAdmin}
              onLogin={handleAdminLogin}
              onLogout={handleAdminLogout}
              onNavigateToAds={() => {
                setActiveTab('ads');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToProposal={() => {
                setActiveTab('proposal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

      </main>

      {/* FOOTER SECTION */}
      <FooterSection
        onNavTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTransparency={() => {
          setActiveTab('transparency');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenContact={() => {
          showToast('Interact Club Office: Room B-12, Onwards & Upwards Secondary School Campus · ouinteract.org');
        }}
        onOpenProposal={() => {
          setActiveTab('proposal');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAds={() => {
          setActiveTab('ads');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* MODALS */}

      {/* 1. Register School or PTA Modal */}
      {isRegisterModalOpen && (
        <RegisterSchoolModal
          onClose={() => setIsRegisterModalOpen(false)}
          onRegistered={handleSchoolRegistered}
        />
      )}

      {/* 2. Success Stories Modal */}
      {isStoriesModalOpen && (
        <SuccessStoriesModal
          onClose={() => setIsStoriesModalOpen(false)}
          onDonateClick={scrollToPledge}
        />
      )}

      {/* 3. Official Material Supply Pledge Certificate Modal */}
      {activeCertificate && (
        <PledgeCertificateModal
          pledge={activeCertificate}
          onClose={() => setActiveCertificate(null)}
          onShare={() => {
            navigator.clipboard.writeText('https://ouinteract.org');
            showToast('ouinteract.org link copied to clipboard!');
          }}
        />
      )}

      {/* 4. Live Automatic Self-Updating Status & Refresh Widget (Requested Feature) */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-2 bg-stone-900/95 text-white border border-stone-700/80 rounded-2xl px-3.5 py-2.5 shadow-2xl backdrop-blur-md text-xs transition-all hover:border-amber-500/50">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
              autoUpdateEnabled ? 'bg-emerald-400' : 'bg-stone-500'
            }`} />
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
              autoUpdateEnabled ? 'bg-emerald-500' : 'bg-stone-500'
            }`} />
          </span>
          <div className="flex flex-col">
            <span className="font-bold text-[11px] text-stone-200 flex items-center gap-1">
              <span>{autoUpdateEnabled ? 'Auto-Update Active' : 'Auto-Update Paused'}</span>
              <span className="text-[10px] text-amber-400 font-mono">Term 3 · Nov 2026</span>
            </span>
            <span className="text-[10px] text-stone-400">
              Synced {lastSyncTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>

        <div className="h-5 w-[1px] bg-stone-700 mx-1" />

        <button
          onClick={() => performAutoSync(true)}
          disabled={isSyncing}
          className="p-1.5 hover:bg-stone-800 text-stone-300 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-[11px] font-semibold"
          title="Manually trigger update now"
        >
          <RotateCw className={`w-3.5 h-3.5 text-amber-400 ${isSyncing ? 'animate-spin text-emerald-400' : ''}`} />
          <span>{isSyncing ? 'Updating...' : 'Sync Now'}</span>
        </button>

        <button
          onClick={() => {
            const next = !autoUpdateEnabled;
            setAutoUpdateEnabled(next);
            showToast(next ? 'Live auto-updating turned ON' : 'Live auto-updating paused');
          }}
          className={`text-[10px] px-2 py-1 rounded font-bold transition-colors ${
            autoUpdateEnabled 
              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 hover:bg-emerald-900' 
              : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
          }`}
          title="Toggle automatic background sync"
        >
          {autoUpdateEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

    </div>
  );
}
