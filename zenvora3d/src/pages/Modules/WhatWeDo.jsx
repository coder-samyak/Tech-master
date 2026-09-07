import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Briefcase, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, Award, Sparkles, Video, Code, Presentation, MessageSquareCode, Sliders
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const WhatWeDo = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('content'); // overview, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, operations, services, quote
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultWhatWeDoCMS = {
    hero: {
      smallBadge: "CORE ACTIVITIES",
      headline: "What We Do to",
      highlightWord: "Reshape Learning",
      titleLine2: "",
      description: "We build content, platforms, keynotes, and campaigns to bridge the gap between classroom syntax and global engineering workspaces.",
      bgImageUrl: "",
      bgVideoUrl: "",
      visible: true
    },
    operations: [
      {
        id: "op-1",
        icon: "Video",
        opNumber: "01",
        title: "YouTube Production",
        subtitle: "Cinematic Coding Breakdowns",
        description: "We scripting, record, and edit deep-dive developer tutorials that run like cinematic stories. Reaching over 2.5 million subscribers with weekly guides.",
        accent: "#D4AF37",
        order: 1,
        visible: true
      },
      {
        id: "op-2",
        icon: "Code",
        opNumber: "02",
        title: "Interactive Syllabus Design",
        subtitle: "Online MasterClasses",
        description: "Drafting production-level courses that focus on Docker pipelines, testing arrays, and backend scale, complete with live browser containers.",
        accent: "#00E5FF",
        order: 2,
        visible: true
      },
      {
        id: "op-3",
        icon: "Presentation",
        opNumber: "03",
        title: "Motivational Keynotes",
        subtitle: "TEDx & Global Tech Talks",
        description: "Aman travels worldwide delivering opening remarks on 'Democratizing Code' and soft skill strategies to help students bypass generic hiring cycles.",
        accent: "#aa3bff",
        order: 3,
        visible: true
      },
      {
        id: "op-4",
        icon: "MessageSquareCode",
        opNumber: "04",
        title: "Community Hackathons",
        subtitle: "Empowerment Cohorts",
        description: "Hosting virtual/physical coding tournaments sponsored by Vercel and Google Cloud to give students direct placement links.",
        accent: "#FF007F",
        order: 4,
        visible: true
      }
    ],
    servicesHeader: {
      badge: "OUR EXPERTISE",
      titleLine1: "Comprehensive",
      titleLine2: "Services"
    },
    servicesList: [
      { id: "srv-1", tag: "Content Creation", order: 1, visible: true },
      { id: "srv-2", tag: "Influencer Marketing", order: 2, visible: true },
      { id: "srv-3", tag: "Brand Promotions", order: 3, visible: true },
      { id: "srv-4", tag: "Brand Campaigns", order: 4, visible: true },
      { id: "srv-5", tag: "Product Launches", order: 5, visible: true },
      { id: "srv-6", tag: "Event Hosting", order: 6, visible: true },
      { id: "srv-7", tag: "Event Management", order: 7, visible: true },
      { id: "srv-8", tag: "Corporate Collaborations", order: 8, visible: true },
      { id: "srv-9", tag: "Digital Marketing", order: 9, visible: true },
      { id: "srv-10", tag: "Personal Branding", order: 10, visible: true },
      { id: "srv-11", tag: "Creative Consulting", order: 11, visible: true },
      { id: "srv-12", tag: "Social Media Strategy", order: 12, visible: true },
      { id: "srv-13", tag: "Creative Direction", order: 13, visible: true },
      { id: "srv-14", tag: "Public Speaking", order: 14, visible: true },
      { id: "srv-15", tag: "Workshop Sessions", order: 15, visible: true }
    ],
    quoteBanner: {
      quoteText: "Education is not the learning of facts, but the training of the mind to think.",
      authorName: "Aman (Tech Master)",
      accentColor: "#D4AF37",
      visible: true
    },
    seo: {
      metaTitle: "What We Do | TechMaster",
      metaDescription: "Discover how TechMaster reshapes technology education through cinematic YouTube guidebooks, keynotes, and masterclasses.",
      canonicalUrl: "https://techmaster.in/what-we-do",
      ogImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
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

  const storedCMS = db?.whatWeDoData || db?.what_we_do || defaultWhatWeDoCMS;

  const [formData, setFormData] = useState({
    ...defaultWhatWeDoCMS,
    ...storedCMS,
    hero: { ...defaultWhatWeDoCMS.hero, ...(storedCMS.hero || {}) },
    operations: (storedCMS.operations && storedCMS.operations.length > 0) ? storedCMS.operations : defaultWhatWeDoCMS.operations,
    servicesHeader: { ...defaultWhatWeDoCMS.servicesHeader, ...(storedCMS.servicesHeader || {}) },
    servicesList: (storedCMS.servicesList && storedCMS.servicesList.length > 0) ? storedCMS.servicesList : defaultWhatWeDoCMS.servicesList,
    quoteBanner: { ...defaultWhatWeDoCMS.quoteBanner, ...(storedCMS.quoteBanner || {}) }
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestWhatWeDo = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/whatWeDo');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultWhatWeDoCMS,
              ...data,
              hero: { ...defaultWhatWeDoCMS.hero, ...(data.hero || {}) },
              operations: (data.operations && data.operations.length > 0) ? data.operations : defaultWhatWeDoCMS.operations,
              servicesHeader: { ...defaultWhatWeDoCMS.servicesHeader, ...(data.servicesHeader || {}) },
              servicesList: (data.servicesList && data.servicesList.length > 0) ? data.servicesList : defaultWhatWeDoCMS.servicesList,
              quoteBanner: { ...defaultWhatWeDoCMS.quoteBanner, ...(data.quoteBanner || {}) }
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest whatWeDo from backend:", err);
      }
    };
    fetchLatestWhatWeDo();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('whatWeDoData', nextState);
    updateSection('what_we_do', nextState);
    updateSection('whatWeDo', nextState);
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
        await apiFetch('/whatWeDo', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'What We Do Page Published Live!' : 'Draft Saved Successfully!', 'success');
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
        visible: true
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
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">What We Do Enterprise CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Manage Core Operations, Category Service Pills, Hero Banner & Quote Philosophy Card.
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

      {/* 7 Architectural Tabs */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'content', label: 'Page Content CMS', icon: Layers },
          { id: 'overview', label: 'Overview & Stats', icon: Briefcase },
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

      {/* TAB: CONTENT (Sub-Tabs) */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Sub-Navigation */}
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/80 w-fit overflow-x-auto">
            {[
              { id: 'hero', label: '1. Hero Header' },
              { id: 'operations', label: '2. Activity Cards' },
              { id: 'services', label: '3. Service Categories' },
              { id: 'quote', label: '4. Quote Philosophy' }
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
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Hero Section CMS</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge Tag</label>
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

          {/* SUB-TAB 2: ACTIVITY CARDS */}
          {contentSubTab === 'operations' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Activity Operations Cards ({formData.operations.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'operations', item: { icon: 'Video', opNumber: '05', title: '', subtitle: '', description: '', accent: '#D4AF37' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Activity Card
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.operations.map((op, idx) => (
                  <div key={op.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-mono text-[10px] text-luxury-gold uppercase">Operation {op.opNumber || `0${idx + 1}`}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'operations', item: op })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('operations', op.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-white text-base">{op.title}</h4>
                    {op.subtitle && <span className="text-zinc-400 font-mono text-[10px] uppercase block">{op.subtitle}</span>}
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{op.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: SERVICE CATEGORIES (PILLS) */}
          {contentSubTab === 'services' && (
            <div className="space-y-6 text-xs">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Services Header</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.servicesHeader.badge}
                      onChange={(e) => persistChanges({ ...formData, servicesHeader: { ...formData.servicesHeader, badge: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Main Title</label>
                    <input
                      type="text"
                      value={formData.servicesHeader.titleLine1}
                      onChange={(e) => persistChanges({ ...formData, servicesHeader: { ...formData.servicesHeader, titleLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Service Category Pills ({formData.servicesList.length})</h3>
                  <Button 
                    onClick={() => setModalConfig({ listKey: 'servicesList', item: { tag: '' } })} 
                    variant="gold" 
                    size="sm" 
                    className="text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Service Tag
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {formData.servicesList.map((srv, idx) => (
                    <div key={srv.id || idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200">
                      <span className="font-mono text-xs">{srv.tag}</span>
                      <button onClick={() => handleItemDelete('servicesList', srv.id)} className="text-zinc-500 hover:text-rose-400"><X className="w-3 h-3" /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: QUOTE PHILOSOPHY CARD */}
          {contentSubTab === 'quote' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Award className="w-4 h-4 text-luxury-gold" />
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Quote Philosophy Card CMS</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Quote Content</label>
                  <textarea
                    rows={3}
                    value={formData.quoteBanner.quoteText || formData.quoteBanner.quote || ''}
                    onChange={(e) => persistChanges({ ...formData, quoteBanner: { ...formData.quoteBanner, quoteText: e.target.value, quote: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif italic text-sm font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Author Name / Title</label>
                  <input
                    type="text"
                    value={formData.quoteBanner.authorName || formData.quoteBanner.author || ''}
                    onChange={(e) => persistChanges({ ...formData, quoteBanner: { ...formData.quoteBanner, authorName: e.target.value, author: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>
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
                src="https://www.techmasterco.com/what-we-do"
                title="Live Preview What We Do"
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
              {Object.keys(modalConfig.item).filter(k => !['id', 'order', 'visible', 'deleted'].includes(k)).map(key => (
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
