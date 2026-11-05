import React, { useState } from 'react';
import { ClubContentItem, AdminProfile } from '../types/interactClub';
import { 
  Lock, LogOut, Plus, Trash2, Edit3, CheckCircle2, Shield, 
  AlertCircle, Sparkles, Calendar, BookOpen, Bell, ArrowRight, 
  ExternalLink, Users, PackageCheck, Award, Smile 
} from 'lucide-react';

interface AdminDashboardProps {
  contentItems: ClubContentItem[];
  onSaveItem: (item: Partial<ClubContentItem> & { id?: string }) => void;
  onDeleteItem: (id: string) => void;
  onTogglePublish: (id: string) => void;
  currentAdmin: AdminProfile | null;
  onLogin: (email: string, pass: string) => boolean;
  onLogout: () => void;
  onNavigateToAds?: () => void;
  onNavigateToProposal?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  contentItems,
  onSaveItem,
  onDeleteItem,
  onTogglePublish,
  currentAdmin,
  onLogin,
  onLogout,
  onNavigateToAds,
  onNavigateToProposal,
}) => {
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Content form state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [type, setType] = useState<'project' | 'event' | 'news'>('project');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [published, setPublished] = useState(true);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [welcomeDismissed, setWelcomeDismissed] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setLoginError('Please enter both email and password.');
      return;
    }
    const success = onLogin(email.trim(), password.trim());
    if (!success) {
      setLoginError('Invalid credentials. Authorized leadership: calton@ouinteract.org, rasul@ouinteract.org, or patron@ouinteract.org');
    } else {
      setLoginError('');
      setEmail('');
      setPassword('');
    }
  };

  const handleQuickLogin = (roleEmail: string) => {
    onLogin(roleEmail, 'interact2026');
  };

  const handleEditClick = (item: ClubContentItem) => {
    setEditingId(item.id);
    setType(item.type);
    setTitle(item.title);
    setBody(item.body);
    setEventDate(item.event_date || '');
    setPublished(item.published);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setBody('');
    setEventDate('');
    setPublished(true);
  };

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) {
      setFeedbackMsg('Please provide both title and body text.');
      return;
    }

    onSaveItem({
      id: editingId || undefined,
      type,
      title: title.trim(),
      body: body.trim(),
      event_date: type === 'event' ? eventDate : undefined,
      published,
    });

    setFeedbackMsg(editingId ? 'Content updated successfully!' : 'New content published successfully!');
    setTimeout(() => setFeedbackMsg(''), 3000);
    handleCancelEdit();
  };

  const publishedCount = contentItems.filter((i) => i.published).length;
  const projectsCount = contentItems.filter((i) => i.type === 'project').length;
  const eventsCount = contentItems.filter((i) => i.type === 'event').length;
  const newsCount = contentItems.filter((i) => i.type === 'news').length;

  const getAdminDisplayName = () => {
    if (!currentAdmin) return 'Directorate Leader';
    if (currentAdmin.email.includes('calton')) return 'Musembwa Calton (Project Manager)';
    if (currentAdmin.email.includes('rasul')) return 'Hagenimana Rasul (Club President)';
    return 'Patron David Semakula (Faculty Advisor)';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 animate-fadeIn">
      
      {/* If Not Logged In: Welcoming Gateway & Login Panel */}
      {!currentAdmin ? (
        <div className="space-y-8 animate-welcome">
          
          {/* Welcoming Header Banner for Visitors & Leadership */}
          <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-amber-950 text-white rounded-3xl p-8 sm:p-10 shadow-sm border border-amber-500/30 text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <span>👋</span>
              <span>Welcome to the Directorate Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-serif">
              O&amp;U Interact Administration
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
              Welcome to the authorized management hub for Onwards and Upwards Secondary School Interact Club. Publish community projects, announce school assemblies, and review supply pledges.
            </p>
          </div>

          <div className="max-w-md mx-auto bg-white rounded-3xl border border-stone-200 p-8 shadow-sm space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-2xs">
                <Lock className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 block">
                Sign In to Directorate Workspace
              </span>
              <h2 className="text-2xl font-bold text-stone-900 font-serif">
                Administrator Sign In
              </h2>
              <p className="text-xs text-stone-500">
                Authorized for Musembwa Calton, Hagenimana Rasul, and Patron David Semakula.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              {loginError && (
                <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium animate-welcome">
                  {loginError}
                </div>
              )}

              <div>
                <label className="block font-bold text-stone-900 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="calton@ouinteract.org"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-all active:scale-98 hover:-translate-y-0.5"
              >
                Enter Dashboard →
              </button>

              {/* 1-Click Welcoming Instant Access Buttons */}
              <div className="pt-2 border-t border-stone-100 space-y-2">
                <span className="text-[11px] text-stone-500 font-medium block text-center">
                  1-Click Welcoming Sign-In for Leadership:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin('calton@ouinteract.org')}
                    className="p-2.5 bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-xl text-left transition-all text-xs group"
                  >
                    <span className="font-bold text-stone-900 block group-hover:text-amber-900">Musembwa Calton</span>
                    <span className="text-[10px] text-stone-500">Project Manager</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin('rasul@ouinteract.org')}
                    className="p-2.5 bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-300 rounded-xl text-left transition-all text-xs group"
                  >
                    <span className="font-bold text-stone-900 block group-hover:text-amber-900">Hagenimana Rasul</span>
                    <span className="text-[10px] text-stone-500">Club President</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* If Logged In: Welcoming Animated Command Dashboard */
        <div className="space-y-8 animate-welcome">
          
          {/* WELCOMING HERO BANNER (Animated Welcome to the Dashboard) */}
          <div className="relative overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg border border-amber-500/30">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                
                {/* Welcoming greeting pill with school logo */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white p-0.5 border-2 border-red-500 shadow-md shrink-0">
                    <img
                      src="/assets/aistudio/onwards_e90da280.jpg"
                      alt="Onwards and Upwards SS Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      <span>👋</span>
                      <span>Directorate Dashboard</span>
                    </div>
                    <h1 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif tracking-tight text-white mt-0.5">
                      Welcome back, {getAdminDisplayName()}!
                    </h1>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-xl">
                  Glad to have you back at the command hub. Your platform is live on <strong>ouinteract.org</strong> with zero-billing material pledges active across 18 partner schools.
                </p>

                {/* Welcoming motto quote */}
                <div className="pt-1 flex items-center gap-2 text-xs text-amber-200/90 italic font-serif">
                  <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>"Service Above Self — Leading with purpose, inspiring with kindness."</span>
                </div>
              </div>

              {/* Quick Session & Sign Out Actions */}
              <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                <div className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 text-xs space-y-1">
                  <div className="text-[10px] uppercase font-bold text-amber-400">Current Session:</div>
                  <div className="font-mono text-white text-[11px] truncate max-w-xs">{currentAdmin.email}</div>
                  <div className="text-emerald-400 text-[10px] font-semibold">● Live Session Active</div>
                </div>

                <button
                  onClick={onLogout}
                  className="flex items-center justify-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-all hover:-translate-y-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out of Directorate</span>
                </button>
              </div>
            </div>

            {/* Quick Welcoming Action Pills */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs">
              <span className="text-stone-400 font-semibold mr-1">Quick Shortcuts:</span>

              <button
                onClick={() => {
                  setType('project');
                  setEditingId(null);
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 rounded-lg border border-amber-500/30 flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ New Project</span>
              </button>

              <button
                onClick={() => {
                  setType('event');
                  setEditingId(null);
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 rounded-lg border border-sky-500/30 flex items-center gap-1.5 transition-colors"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>+ Schedule Event</span>
              </button>

              <button
                onClick={() => {
                  setType('news');
                  setEditingId(null);
                  window.scrollTo({ top: 500, behavior: 'smooth' });
                }}
                className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg border border-emerald-500/30 flex items-center gap-1.5 transition-colors"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>+ Announcement</span>
              </button>

              {onNavigateToAds && (
                <button
                  onClick={onNavigateToAds}
                  className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 rounded-lg border border-purple-500/30 flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Ad Studio (Spotify/YT)</span>
                </button>
              )}

              {onNavigateToProposal && (
                <button
                  onClick={onNavigateToProposal}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg border border-stone-700 flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Review School Proposal</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Metrics Bar with welcoming hover transitions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:-translate-y-1 transition-all duration-300">
              <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Total Live Content:</span>
              <div className="text-2xl font-bold font-serif text-stone-900">{publishedCount} Published</div>
              <span className="text-[11px] text-stone-500">{contentItems.length} total items</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:-translate-y-1 transition-all duration-300">
              <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Active Projects:</span>
              <div className="text-2xl font-bold font-serif text-amber-800">{projectsCount} Drives</div>
              <span className="text-[11px] text-stone-500">Backpacks, Meals, Shoes</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:-translate-y-1 transition-all duration-300">
              <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Scheduled Events:</span>
              <div className="text-2xl font-bold font-serif text-sky-800">{eventsCount} Upcoming</div>
              <span className="text-[11px] text-stone-500">Assemblies &amp; Outreach</span>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:-translate-y-1 transition-all duration-300">
              <span className="text-[10px] uppercase font-bold text-stone-400 block mb-1">Announcements:</span>
              <div className="text-2xl font-bold font-serif text-emerald-800">{newsCount} Updates</div>
              <span className="text-[11px] text-stone-500">Live on ouinteract.org</span>
            </div>
          </div>

          {/* Add / Edit Form */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-lg font-bold text-stone-900 font-serif">
                  {editingId ? 'Edit Website Content' : 'Publish New Website Content'}
                </h3>
                <p className="text-xs text-stone-500">
                  Published items update instantly on the public website.
                </p>
              </div>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-amber-800 font-semibold hover:underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            {feedbackMsg && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 text-xs font-medium flex items-center gap-2 animate-welcome">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            <form onSubmit={handleContentSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-900 mb-1">Content Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                  >
                    <option value="project">Project / Initiative</option>
                    <option value="event">Save the Date / Event</option>
                    <option value="news">Club Update / News Announcement</option>
                  </select>
                </div>

                {type === 'event' && (
                  <div>
                    <label className="block font-bold text-stone-900 mb-1">Event Date *</label>
                    <input
                      type="date"
                      required={type === 'event'}
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl font-medium"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">Title (Max 100 chars) *</label>
                <input
                  type="text"
                  required
                  maxLength={100}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Scholastic Books Consignment to Feeder Primary Schools"
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-900 mb-1">Description / Body (Max 1200 chars) *</label>
                <textarea
                  rows={4}
                  required
                  maxLength={1200}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Describe the initiative, student volunteers involved, or community impact..."
                  className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-stone-800 select-none">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Publish immediately on public website</span>
              </label>

              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-xs transition-all hover:-translate-y-0.5 active:scale-98"
                >
                  {editingId ? 'Save Changes' : 'Publish Content'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold rounded-xl"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Manage Content List */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900 font-serif">
                Manage Existing Website Content ({contentItems.length})
              </h3>
              <span className="text-xs text-stone-500">
                Sorted by most recent
              </span>
            </div>

            <div className="divide-y divide-stone-100">
              {contentItems.map((item) => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-stone-50/70 p-2 rounded-xl transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                        item.type === 'project' ? 'bg-amber-100 text-amber-900' :
                        item.type === 'event' ? 'bg-sky-100 text-sky-900' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {item.type}
                      </span>
                      <span className={`text-[10px] font-semibold ${item.published ? 'text-emerald-700' : 'text-stone-400'}`}>
                        {item.published ? '● Published' : '○ Draft'}
                      </span>
                      {item.event_date && (
                        <span className="text-[11px] text-stone-400">
                          Date: {item.event_date}
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-stone-900 text-sm">
                      {item.title}
                    </h4>
                    <p className="text-xs text-stone-600 line-clamp-1 max-w-xl">
                      {item.body}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <button
                      onClick={() => onTogglePublish(item.id)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors ${
                        item.published ? 'border-stone-200 text-stone-600 hover:bg-stone-50' : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}
                    >
                      {item.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleEditClick(item)}
                      className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
                      title="Edit item"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${item.title}" permanently?`)) {
                          onDeleteItem(item.id);
                        }
                      }}
                      className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                      title="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
