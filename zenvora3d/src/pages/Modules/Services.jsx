import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Briefcase, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, Cpu, Box, Sparkles, ChevronDown, ListChecks, ArrowUpRight, Sliders
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const Services = () => {
  const { db, updateSection } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('accordions'); // overview, accordions, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, solutions, cta
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultServicesCMS = {
    servicesPageData: {
      hero: {
        badge: "CORE PORTALS",
        title: "Services, Courses &",
        highlightText: "Keynote Bookings.",
        description: "Explore Aman's developer training tracks, speaking keynote requests, collaborative student hackathons, and brand sponsorships.",
        visible: true
      },
      expertise: {
        badge: "OUR EXPERTISE",
        title: "Comprehensive",
        highlightText: "Solutions"
      },
      cta: {
        heading: "Ready to Transform Your Business?",
        subtext: "Let's discuss how we can help you achieve your goals.",
        buttonText: "Contact Us",
        buttonUrl: "/contact",
        visible: true
      }
    },
    servicesData: [
      {
        id: "srv-1",
        icon: "Sparkles",
        title: "Luxury Brand Strategy",
        tagline: "High-End Positioning & Identity",
        description: "Positioning luxury engineering and tech brands for ultra-high-net-worth market presence and authority.",
        overview: "Complete identity blueprints, luxury visual systems, and high-convert audience positioning.",
        benefits: ["Exclusive market positioning", "Premium brand perception", "High conversion equity"],
        process: ["Market Audit & Positioning Blueprint", "Visual System Design", "Global Brand Launch"],
        features: ["Brand Identity Blueprint", "Luxury Visual Assets", "Strategic Positioning"],
        accentColor: "#D4AF37",
        displayOrder: 1,
        status: "Active"
      },
      {
        id: "srv-2",
        icon: "Cpu",
        title: "High-End Influencer Campaign Execution",
        tagline: "Multiverse Creator Syndication",
        description: "Strategic partnerships across top technology key opinion leaders, tech YouTubers, and developer creators.",
        overview: "End-to-end management of tier-1 tech influencer pushes reaching millions of engaged developers.",
        benefits: ["Direct developer audience trust", "Guaranteed impression scale", "High ROI conversion tracking"],
        process: ["Creator Vetting & Alignment", "Creative Scripting & Approval", "Multi-Channel Broadcast & Analytics"],
        features: ["Creator Network Access", "Campaign Tracking Dashboard", "Dedicated Account Manager"],
        accentColor: "#00E5FF",
        displayOrder: 2,
        status: "Active"
      },
      {
        id: "srv-3",
        icon: "Layers",
        title: "Keynote & Public Speaking",
        tagline: "Global Tech Summits & Seminars",
        description: "Aman delivers mainstage keynotes, live coding demonstrations, and developer autonomy seminars globally.",
        overview: "Engaging, inspirational keynotes translating complex software architecture into 3D visual stories.",
        benefits: ["High-impact mainstage delivery", "Authentic audience engagement", "Full press kit & AV rider support"],
        process: ["Event Scope & Keynote Alignment", "Custom Slide & Live Sandbox Setup", "Mainstage Delivery & Q&A"],
        features: ["Mainstage Keynotes", "Live Sandbox Demos", "Q&A Cohort Sessions"],
        accentColor: "#aa3bff",
        displayOrder: 3,
        status: "Active"
      },
      {
        id: "srv-4",
        icon: "Box",
        title: "UGC & Commercial Content Production",
        tagline: "Cinematic Product Spotlights",
        description: "High-production UGC, cinematic product trailers, and commercial developer breakdowns.",
        overview: "4K multi-cam production, 3D motion graphics, and high-retention commercial video assets.",
        benefits: ["Cinematic 4K production quality", "Higher viewer retention rates", "Multi-format social exports"],
        process: ["Concept & Storyboard Blueprint", "4K Multi-Cam Studio Filming", "3D Motion Graphics & Sound Design"],
        features: ["4K Studio Filming", "3D Motion Graphics", "Multi-Format Exports"],
        accentColor: "#FF007F",
        displayOrder: 4,
        status: "Active"
      }
    ],
    seo: {
      metaTitle: "Services & Solutions | TechMaster",
      metaDescription: "Explore TechMaster's developer training tracks, media production, open-source CLI tools, and keynote speaking.",
      canonicalUrl: "https://techmaster.in/services",
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

  const storedCMS = db?.servicesPageData || db?.servicesCMS || defaultServicesCMS;

  const [formData, setFormData] = useState({
    ...defaultServicesCMS,
    ...storedCMS,
    servicesPageData: { ...defaultServicesCMS.servicesPageData, ...(storedCMS.servicesPageData || {}) },
    servicesData: (db?.servicesData && db.servicesData.length > 0) ? db.servicesData : ((storedCMS.servicesData && storedCMS.servicesData.length > 0) ? storedCMS.servicesData : defaultServicesCMS.servicesData)
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestServices = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/services');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultServicesCMS,
              ...data,
              servicesPageData: { ...defaultServicesCMS.servicesPageData, ...(data.servicesPageData || {}) },
              servicesData: (data.servicesData && data.servicesData.length > 0) ? data.servicesData : defaultServicesCMS.servicesData
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest services from backend:", err);
      }
    };
    fetchLatestServices();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('servicesPageData', nextState.servicesPageData);
    updateSection('servicesCMS', nextState);
    updateSection('servicesData', nextState.servicesData);
    updateSection('coreServices', nextState);
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
        await apiFetch('/services', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'Services Catalog Published Live!' : 'Draft Saved Successfully!', 'success');
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
        displayOrder: list.length + 1,
        status: 'Active',
        benefits: item.benefits || ["Feature benefit 1", "Feature benefit 2"],
        process: item.process || ["Step 1 Analysis", "Step 2 Implementation"],
        features: item.features || ["Core Feature 1", "Core Feature 2"]
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
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Services & Solutions Enterprise CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Control Service Accordions, Comprehensive Solutions, Process Steps, Benefits & CTA Banner.
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
          { id: 'accordions', label: '1. Service Accordions', icon: Briefcase },
          { id: 'content', label: '2. Page Content CMS', icon: Layers },
          { id: 'media', label: 'Media Library', icon: ImageIcon }
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

      {/* TAB 1: SERVICE ACCORDIONS */}
      {activeTab === 'accordions' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Service Accordion Cards ({formData.servicesData.length})</h3>
            <Button 
              onClick={() => setModalConfig({ listKey: 'servicesData', item: { icon: 'Cpu', title: '', tagline: '', description: '', overview: '', accentColor: '#D4AF37' } })} 
              variant="gold" 
              size="sm" 
              className="text-xs uppercase"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Service Card
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.servicesData.map((srv, idx) => (
              <div key={srv.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="font-mono text-[10px] text-luxury-gold uppercase font-bold">Service 0{idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setModalConfig({ listKey: 'servicesData', item: srv })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleItemDelete('servicesData', srv.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-white text-base">{srv.title}</h4>
                {srv.tagline && <span className="text-zinc-400 font-mono text-[10px] uppercase block">{srv.tagline}</span>}
                <p className="text-zinc-400 font-light text-xs leading-relaxed">{srv.description}</p>
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
              { id: 'solutions', label: '2. Comprehensive Solutions Header' },
              { id: 'cta', label: '3. CTA Section' }
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
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Services Hero Banner</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.servicesPageData.hero.badge}
                    onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, hero: { ...formData.servicesPageData.hero, badge: e.target.value } } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Main Text</label>
                    <input
                      type="text"
                      value={formData.servicesPageData.hero.title}
                      onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, hero: { ...formData.servicesPageData.hero, title: e.target.value } } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlight Text (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.servicesPageData.hero.highlightText}
                      onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, hero: { ...formData.servicesPageData.hero, highlightText: e.target.value } } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.servicesPageData.hero.description}
                    onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, hero: { ...formData.servicesPageData.hero, description: e.target.value } } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: COMPREHENSIVE SOLUTIONS HEADER */}
          {contentSubTab === 'solutions' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Comprehensive Solutions Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.servicesPageData.expertise.badge}
                    onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, expertise: { ...formData.servicesPageData.expertise, badge: e.target.value } } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Main Text</label>
                  <input
                    type="text"
                    value={formData.servicesPageData.expertise.title}
                    onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, expertise: { ...formData.servicesPageData.expertise, title: e.target.value } } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlight Word</label>
                  <input
                    type="text"
                    value={formData.servicesPageData.expertise.highlightText}
                    onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, expertise: { ...formData.servicesPageData.expertise, highlightText: e.target.value } } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: CTA SECTION */}
          {contentSubTab === 'cta' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">CTA Banner Section CMS</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Heading</label>
                  <input
                    type="text"
                    value={formData.servicesPageData.cta.heading}
                    onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, cta: { ...formData.servicesPageData.cta, heading: e.target.value } } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Subtext / Description</label>
                  <textarea
                    rows={2}
                    value={formData.servicesPageData.cta.subtext}
                    onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, cta: { ...formData.servicesPageData.cta, subtext: e.target.value } } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Button Text</label>
                    <input
                      type="text"
                      value={formData.servicesPageData.cta.buttonText}
                      onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, cta: { ...formData.servicesPageData.cta, buttonText: e.target.value } } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Button Link</label>
                    <input
                      type="text"
                      value={formData.servicesPageData.cta.buttonUrl}
                      onChange={(e) => persistChanges({ ...formData, servicesPageData: { ...formData.servicesPageData, cta: { ...formData.servicesPageData.cta, buttonUrl: e.target.value } } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-mono"
                    />
                  </div>
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
                src="https://www.techmasterco.com/services"
                title="Live Preview Services"
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
              {Object.keys(modalConfig.item).filter(k => !['id', 'displayOrder', 'status', 'deleted', 'benefits', 'process', 'features'].includes(k)).map(key => (
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
