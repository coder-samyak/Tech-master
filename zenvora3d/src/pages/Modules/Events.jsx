import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Calendar, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, Award, Users, MapPin, Video, Send, Inbox, Mail, Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const Events = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('events_list'); // overview, events_list, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, engagement, booking, inbox
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultEventsCMS = {
    hero: {
      smallBadge: "PUBLIC ENGAGEMENTS",
      headline: "Keynote Speaking &",
      highlightWord: "Live Coding Seminars",
      titleLine2: "",
      description: "Aman shares developer insights, soft-skills blueprints, and live systems architecture demonstrations on global stages.",
      visible: true
    },
    eventsList: [
      {
        id: "evt-1",
        title: "React India 2024 Keynote",
        type: "INTERNATIONAL KEYNOTE",
        date: "OCTOBER 2024",
        location: "GOA, INDIA",
        attendance: "1,500+ ATTENDEES",
        description: "Delivering opening keynote on Concurrent Rendering patterns & real-time WebGL UI architectures.",
        accentColor: "#D4AF37",
        media: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
        status: "Active"
      },
      {
        id: "evt-2",
        title: "AWS Community Day",
        type: "SYSTEM ARCHITECTURE TALK",
        date: "DECEMBER 2024",
        location: "BENGALURU, INDIA",
        attendance: "3,000+ ATTENDEES",
        description: "Live breakdown of multi-region database replication & serverless container scaling.",
        accentColor: "#00E5FF",
        media: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=600&q=80",
        status: "Active"
      },
      {
        id: "evt-3",
        title: "Open Source Developers Summit",
        type: "PANEL DISCUSSION",
        date: "MARCH 2025",
        location: "NEW DELHI, INDIA",
        attendance: "2,200+ ATTENDEES",
        description: "Panel discussion on democratizing software engineering curricula and developer autonomy.",
        accentColor: "#aa3bff",
        media: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
        status: "Active"
      }
    ],
    engagementTypesHeader: {
      badge: "CAPABILITIES",
      titleLine1: "Engagement",
      titleLine2: "Types"
    },
    engagementTypes: [
      { id: "et-1", type: "Event Hosting", order: 1, visible: true },
      { id: "et-2", type: "Guest Appearance", order: 2, visible: true },
      { id: "et-3", type: "Corporate Events", order: 3, visible: true },
      { id: "et-4", type: "Fashion Shows", order: 4, visible: true },
      { id: "et-5", type: "Product Events", order: 5, visible: true },
      { id: "et-6", type: "Meetups", order: 6, visible: true },
      { id: "et-7", type: "Workshops", order: 7, visible: true },
      { id: "et-8", type: "Conferences", order: 8, visible: true }
    ],
    bookingSection: {
      smallBadge: "SPEAKER BOOKINGS",
      headlineLine1: "Bring Aman to",
      highlightWord: "Your Event",
      description: "Aman keynote schedules fill up rapidly. Bookings are open for university developer panels, virtual technical summits, DevFests, or corporate software consulting cycles.",
      pressKitNote: "Full Press Kit and AV Rider available upon approval.",
      visible: true
    },
    bookingInquiries: [
      { id: "inq-1", name: "David Miller", email: "david@devfest.org", organization: "DevFest 2026", details: "Keynote speaking request for 5,000 developer attendees.", status: "Pending", date: "Today" }
    ],
    seo: {
      metaTitle: "Keynote Speaking & Events | TechMaster",
      metaDescription: "Book Aman for keynote talks, live coding seminars, and developer summit workshops globally.",
      canonicalUrl: "https://techmaster.in/events",
      ogImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
    },
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
      published: true
    },
    versioning: {
      status: "Published",
      lastUpdated: "Today",
      updatedBy: "Super Admin"
    }
  };

  const storedCMS = db?.eventsData_CMS || db?.eventsCMS || db?.eventsPage || defaultEventsCMS;

  const [formData, setFormData] = useState({
    ...defaultEventsCMS,
    ...storedCMS,
    hero: { ...defaultEventsCMS.hero, ...(storedCMS.hero || {}) },
    eventsList: (db?.eventsData && db.eventsData.length > 0) ? db.eventsData : ((storedCMS.eventsList && storedCMS.eventsList.length > 0) ? storedCMS.eventsList : defaultEventsCMS.eventsList),
    engagementTypesHeader: { ...defaultEventsCMS.engagementTypesHeader, ...(storedCMS.engagementTypesHeader || {}) },
    engagementTypes: (storedCMS.engagementTypes && storedCMS.engagementTypes.length > 0) ? storedCMS.engagementTypes : defaultEventsCMS.engagementTypes,
    bookingSection: { ...defaultEventsCMS.bookingSection, ...(storedCMS.bookingSection || {}) },
    bookingInquiries: (db?.bookingInquiries && db.bookingInquiries.length > 0) ? db.bookingInquiries : defaultEventsCMS.bookingInquiries
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestEvents = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/events');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultEventsCMS,
              ...data,
              hero: { ...defaultEventsCMS.hero, ...(data.hero || {}) },
              eventsList: (data.eventsList && data.eventsList.length > 0) ? data.eventsList : defaultEventsCMS.eventsList,
              engagementTypesHeader: { ...defaultEventsCMS.engagementTypesHeader, ...(data.engagementTypesHeader || {}) },
              engagementTypes: (data.engagementTypes && data.engagementTypes.length > 0) ? data.engagementTypes : defaultEventsCMS.engagementTypes,
              bookingSection: { ...defaultEventsCMS.bookingSection, ...(data.bookingSection || {}) },
              bookingInquiries: (data.bookingInquiries && data.bookingInquiries.length > 0) ? data.bookingInquiries : defaultEventsCMS.bookingInquiries
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest events from backend:", err);
      }
    };
    fetchLatestEvents();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('eventsData_CMS', nextState);
    updateSection('eventsCMS', nextState);
    updateSection('eventsPage', nextState);
    updateSection('eventsData', nextState.eventsList);
    updateSection('bookingInquiries', nextState.bookingInquiries);
  };

  const handleSaveAll = async (isPublished = false) => {
    const updatedState = {
      ...formData,
      versioning: {
        ...formData.versioning,
        status: isPublished ? 'Published' : 'Draft',
        lastUpdated: new Date().toLocaleString()
      }
    };
    persistChanges(updatedState);

    try {
      if (apiFetch) {
        await apiFetch('/events', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'Events Page Published Live!' : 'Draft Saved Successfully!', 'success');
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleItemDelete = (listKey, id) => {
    const list = [...formData[listKey]];
    const updated = list.filter(item => item.id !== id);
    persistChanges({ ...formData, [listKey]: updated });
    showToast('Item removed', 'info');
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    const { listKey, item } = modalConfig;
    const list = [...formData[listKey]];

    let updated;
    if (item.id) {
      updated = list.map(i => i.id === item.id ? item : i);
    } else {
      const newItem = {
        ...item,
        id: `${listKey.slice(0, 3)}-${Date.now()}`,
        order: list.length + 1,
        status: 'Active'
      };
      updated = [...list, newItem];
    }

    persistChanges({ ...formData, [listKey]: updated });
    setModalConfig(null);
    showToast(item.id ? 'Item updated successfully!' : 'New item added!', 'success');
  };

  return (
    <div className="space-y-6 text-left">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Events & Keynotes Enterprise CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Manage Public Engagements, Conferences Catalog, Engagement Types Chips & Speaker Booking Inquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => handleSaveAll(false)} variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            Save Draft
          </Button>
          <Button onClick={() => handleSaveAll(true)} variant="gold" size="sm" className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
            {isSaved ? <Check className="w-3.5 h-3.5 text-black" /> : <Save className="w-3.5 h-3.5" />}
            {isSaved ? 'Published Live!' : 'Publish Page'}
          </Button>
        </div>
      </div>

      {/* 8 Architectural Tabs */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'events_list', label: '1. Event Cards Catalog', icon: Calendar },
          { id: 'content', label: '2. Page Content CMS', icon: Layers },
          { id: 'media', label: 'Media Assets', icon: ImageIcon }
        ].map(tab => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 shadow-[0_0_12px_rgba(212,175,55,0.05)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: EVENT CARDS CATALOG */}
      {activeTab === 'events_list' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Conferences & Keynote Cards ({formData.eventsList.length})</h3>
            <Button 
              onClick={() => setModalConfig({ listKey: 'eventsList', item: { title: '', type: 'INTERNATIONAL KEYNOTE', date: 'DECEMBER 2025', location: 'MUMBAI, INDIA', attendance: '2,000+ ATTENDEES', description: '', accentColor: '#D4AF37', media: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80', status: 'Active' } })} 
              variant="gold" 
              size="sm" 
              className="text-xs uppercase"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Event Card
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.eventsList.map((evt, idx) => (
              <div key={evt.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3 flex flex-col justify-between">
                <div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                    <img src={evt.media || evt.image} alt={evt.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/80 text-luxury-gold font-mono text-[9px] px-2 py-0.5 rounded border border-luxury-gold/30 uppercase font-bold">
                      {evt.type}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-zinc-400 uppercase block mb-1">{evt.date} • {evt.location}</span>
                  <h4 className="font-serif font-bold text-white text-base leading-snug mb-1">{evt.title}</h4>
                  <p className="text-zinc-400 font-light text-xs line-clamp-2 mb-2">{evt.description}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-[10px] font-mono text-luxury-gold">
                  <span>{evt.attendance}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setModalConfig({ listKey: 'eventsList', item: evt })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleItemDelete('eventsList', evt.id)} className="p-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PAGE CONTENT */}
      {activeTab === 'content' && (
        <div className="space-y-6 text-xs">
          {/* Sub-Navigation */}
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/80 w-fit overflow-x-auto">
            {[
              { id: 'hero', label: '1. Hero Header' },
              { id: 'engagement', label: '2. Engagement Chips' },
              { id: 'booking', label: '3. Speaker Booking CMS' },
              { id: 'inbox', label: '4. Booking Inquiries Inbox' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setContentSubTab(sub.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                  contentSubTab === sub.id
                    ? 'bg-luxury-gold text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* SUB-TAB 1: HERO HEADER */}
          {contentSubTab === 'hero' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Events Hero Banner</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                  <input
                    type="text"
                    value={formData.hero.smallBadge}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, smallBadge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Headline Main Text</label>
                    <input
                      type="text"
                      value={formData.hero.headline}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, headline: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlight Word (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.hero.highlightWord}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, highlightWord: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description Content</label>
                  <textarea
                    rows={3}
                    value={formData.hero.description}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: ENGAGEMENT CHIPS */}
          {contentSubTab === 'engagement' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Engagement Type Chips ({formData.engagementTypes.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'engagementTypes', item: { type: '' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Engagement Chip
                </Button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {formData.engagementTypes.map((et, idx) => (
                  <div key={et.id || idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200">
                    <span className="font-mono text-xs">{et.type}</span>
                    <button onClick={() => handleItemDelete('engagementTypes', et.id)} className="text-zinc-500 hover:text-rose-400"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: SPEAKER BOOKING CMS */}
          {contentSubTab === 'booking' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Speaker Booking Section Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                  <input
                    type="text"
                    value={formData.bookingSection.smallBadge}
                    onChange={(e) => persistChanges({ ...formData, bookingSection: { ...formData.bookingSection, smallBadge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Headline Line 1</label>
                    <input
                      type="text"
                      value={formData.bookingSection.headlineLine1}
                      onChange={(e) => persistChanges({ ...formData, bookingSection: { ...formData.bookingSection, headlineLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlight Word (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.bookingSection.highlightWord}
                      onChange={(e) => persistChanges({ ...formData, bookingSection: { ...formData.bookingSection, highlightWord: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.bookingSection.description}
                    onChange={(e) => persistChanges({ ...formData, bookingSection: { ...formData.bookingSection, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Press Kit Note</label>
                  <input
                    type="text"
                    value={formData.bookingSection.pressKitNote}
                    onChange={(e) => persistChanges({ ...formData, bookingSection: { ...formData.bookingSection, pressKitNote: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-400 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: BOOKING INQUIRIES INBOX */}
          {contentSubTab === 'inbox' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Speaker Booking Submissions ({formData.bookingInquiries.length})</h3>
              <div className="space-y-3">
                {formData.bookingInquiries.map((inq, idx) => (
                  <div key={inq.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <div className="flex items-center gap-2">
                        <strong className="text-white text-sm">{inq.name}</strong>
                        <span className="text-zinc-400 font-mono text-[10px]">({inq.email})</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-luxury-gold/10 text-luxury-gold font-mono text-[9px] uppercase font-bold">{inq.status}</span>
                    </div>
                    <span className="text-luxury-gold font-mono text-[10px] block">Organization: {inq.organization}</span>
                    <p className="text-zinc-300 font-light text-xs">{inq.details}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: LIVE PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 bg-zinc-950/80 border border-zinc-800 p-2 rounded-xl">
            <button onClick={() => setPreviewMode('desktop')} className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'desktop' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}>
              <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
            </button>
            <button onClick={() => setPreviewMode('tablet')} className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'tablet' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}>
              <Tablet className="w-3.5 h-3.5" /> Tablet (768px)
            </button>
            <button onClick={() => setPreviewMode('mobile')} className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'mobile' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}>
              <Smartphone className="w-3.5 h-3.5" /> Mobile (375px)
            </button>
          </div>

          <div className="flex justify-center bg-black/90 p-4 rounded-2xl border border-zinc-800 min-h-[500px]">
            <div className={`bg-black transition-all duration-300 border border-zinc-800 rounded-xl overflow-hidden ${
              previewMode === 'desktop' ? 'w-full' : previewMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'
            }`}>
              <iframe
                src="https://www.techmasterco.com/events"
                title="Live Preview Events & Keynotes"
                className="w-full h-[600px] border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalConfig && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleModalSave} className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                {modalConfig.item.id ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button type="button" onClick={() => setModalConfig(null)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {Object.keys(modalConfig.item).filter(k => !['id', 'order', 'status', 'deleted'].includes(k)).map(key => (
                <div key={key}>
                  <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">{key}</label>
                  <input
                    type="text"
                    value={modalConfig.item[key] || ''}
                    onChange={(e) => setModalConfig({
                      ...modalConfig,
                      item: { ...modalConfig.item, [key]: e.target.value }
                    })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalConfig(null)}>Cancel</Button>
              <Button type="submit" variant="gold" size="sm">Save Item</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
