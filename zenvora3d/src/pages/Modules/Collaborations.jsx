import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Handshake, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, Award, BarChart3, MessageSquare, ArrowUpRight, Play, Sliders
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const Collaborations = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('content'); // overview, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, carousel, partners, metrics, campaigns, process, testimonials
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultCollaborationsCMS = {
    hero: {
      eyebrowText: "BRAND COOPERATIONS",
      title: "Alliances & Brand Collaborations",
      highlightedTitle: "Brand Collaborations",
      description: "We join forces with leading technology companies and cloud giants to build open-source tools, launch hackathons, and deliver industry-relevant education.",
      visible: true
    },
    brandCarousel: [
      { id: "bc-1", brandName: "GOOGLE CLOUD", status: "Active", order: 1 },
      { id: "bc-2", brandName: "AWS", status: "Active", order: 2 },
      { id: "bc-3", brandName: "GITHUB", status: "Active", order: 3 },
      { id: "bc-4", brandName: "VERCEL", status: "Active", order: 4 },
      { id: "bc-5", brandName: "STRIPE", status: "Active", order: 5 },
      { id: "bc-6", brandName: "NVIDIA", status: "Active", order: 6 },
      { id: "bc-7", brandName: "MICROSOFT", status: "Active", order: 7 },
      { id: "bc-8", brandName: "SHOPIFY", status: "Active", order: 8 }
    ],
    partners: [
      {
        id: "pt-1",
        name: "Vercel",
        type: "Frontend Cloud Partner",
        logo: "VC",
        featuredWork: "Next.js Masterclass Series",
        description: "Official cloud infrastructure sponsorship powering all interactive coding sandboxes for Next Univerz.",
        accentColor: "#D4AF37",
        status: "Active"
      },
      {
        id: "pt-2",
        name: "Google Cloud",
        type: "Infrastructure Sponsor",
        logo: "GC",
        featuredWork: "Global AI Hackathon 2026",
        description: "Providing $500,000 in Vertex AI credits for developer cohorts and live stream workshops.",
        accentColor: "#00E5FF",
        status: "Active"
      }
    ],
    metrics: [
      { id: "sm-1", value: "50+", label: "Brand Partners", status: "Active" },
      { id: "sm-2", value: "$2M+", label: "Sponsored Cloud Credits", status: "Active" },
      { id: "sm-3", value: "20+", label: "Global Hackathons", status: "Active" },
      { id: "sm-4", value: "5M+", label: "Campaign Impressions", status: "Active" }
    ],
    campaigns: [
      {
        id: "cp-1",
        title: "Vercel: Build in Public",
        description: "A 30-day challenge where 10,000 developers built and deployed Next.js applications on Vercel.",
        accentColor: "#D4AF37",
        buttonText: "View Highlight",
        status: "Active"
      },
      {
        id: "cp-2",
        title: "GitHub Education Tour",
        description: "Sponsored university tour reaching 50 campuses to promote open-source contributions.",
        accentColor: "#00E5FF",
        buttonText: "View Highlight",
        status: "Active"
      }
    ],
    history: {
      eyebrow: "TIMELINE",
      title: "Collaboration History",
      highlightedTitle: "History",
      description: "Since our first brand deal in 2018, we have maintained long-term relationships with the world's most innovative companies. Our history is built on delivering genuine value to both the developer community and our partners.",
      cardTitle: "From Startups to Enterprises",
      cardDescription: "Whether it's an early-stage AI tool or an established cloud provider, we tailor our integration to fit the product's unique value proposition."
    },
    process: [
      { id: "pr-1", stepNumber: "01", title: "Discovery & Alignment", status: "Active" },
      { id: "pr-2", stepNumber: "02", title: "Creative Strategy & Scripting", status: "Active" },
      { id: "pr-3", stepNumber: "03", title: "Production & Integration", status: "Active" },
      { id: "pr-4", stepNumber: "04", title: "Launch & Analytics", status: "Active" }
    ],
    testimonials: [
      {
        id: "tm-1",
        quote: "Working with Tech Master has been transformative. Their ability to explain complex APIs to junior developers drove massive adoption for our new features.",
        personName: "Sarah Jenkins",
        designation: "VP of Developer Relations",
        company: "Vercel",
        accentColor: "#D4AF37",
        status: "Active"
      },
      {
        id: "tm-2",
        quote: "The engagement on the sponsored hackathon was unprecedented. We reached exactly the demographic we were aiming for.",
        personName: "David Chen",
        designation: "Global Developer Ecosystem Lead",
        company: "Google Cloud",
        accentColor: "#00E5FF",
        status: "Active"
      }
    ],
    seo: {
      metaTitle: "Brand Collaborations | TechMaster",
      metaDescription: "Explore TechMaster's brand alliances with Google Cloud, Vercel, AWS, GitHub, and global tech leaders.",
      canonicalUrl: "https://techmaster.in/collaborations",
      ogImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200"
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

  const storedCMS = db?.collaborationsPage || db?.collaborationsCMS || defaultCollaborationsCMS;

  const [formData, setFormData] = useState({
    ...defaultCollaborationsCMS,
    ...storedCMS,
    hero: { ...defaultCollaborationsCMS.hero, ...(storedCMS.hero || {}) },
    brandCarousel: (storedCMS.brandCarousel && storedCMS.brandCarousel.length > 0) ? storedCMS.brandCarousel : defaultCollaborationsCMS.brandCarousel,
    partners: (storedCMS.partners && storedCMS.partners.length > 0) ? storedCMS.partners : defaultCollaborationsCMS.partners,
    metrics: (storedCMS.metrics && storedCMS.metrics.length > 0) ? storedCMS.metrics : defaultCollaborationsCMS.metrics,
    campaigns: (storedCMS.campaigns && storedCMS.campaigns.length > 0) ? storedCMS.campaigns : defaultCollaborationsCMS.campaigns,
    history: { ...defaultCollaborationsCMS.history, ...(storedCMS.history || {}) },
    process: (storedCMS.process && storedCMS.process.length > 0) ? storedCMS.process : defaultCollaborationsCMS.process,
    testimonials: (storedCMS.testimonials && storedCMS.testimonials.length > 0) ? storedCMS.testimonials : defaultCollaborationsCMS.testimonials
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestCollaborations = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/collaborations');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultCollaborationsCMS,
              ...data,
              hero: { ...defaultCollaborationsCMS.hero, ...(data.hero || {}) },
              brandCarousel: (data.brandCarousel && data.brandCarousel.length > 0) ? data.brandCarousel : defaultCollaborationsCMS.brandCarousel,
              partners: (data.partners && data.partners.length > 0) ? data.partners : defaultCollaborationsCMS.partners,
              metrics: (data.metrics && data.metrics.length > 0) ? data.metrics : defaultCollaborationsCMS.metrics,
              campaigns: (data.campaigns && data.campaigns.length > 0) ? data.campaigns : defaultCollaborationsCMS.campaigns,
              history: { ...defaultCollaborationsCMS.history, ...(data.history || {}) },
              process: (data.process && data.process.length > 0) ? data.process : defaultCollaborationsCMS.process,
              testimonials: (data.testimonials && data.testimonials.length > 0) ? data.testimonials : defaultCollaborationsCMS.testimonials
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest collaborations from backend:", err);
      }
    };
    fetchLatestCollaborations();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('collaborationsPage', nextState);
    updateSection('collaborationsCMS', nextState);
    updateSection('collaborations', nextState);
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
        await apiFetch('/collaborations', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'Brand Collaborations Page Published Live!' : 'Draft Saved Successfully!', 'success');
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
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Brand Collaborations CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Control Brand Logo Carousel, Alliances, Success Metrics, Campaigns Showcase, Process & Testimonials.
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
          { id: 'overview', label: 'Overview & Stats', icon: Handshake },
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
              { id: 'carousel', label: '2. Brand Logo Slider' },
              { id: 'partners', label: '3. Brand Cards Grid' },
              { id: 'metrics', label: '4. Success Metrics' },
              { id: 'campaigns', label: '5. Case Studies' },
              { id: 'process', label: '6. Partnership Process' },
              { id: 'testimonials', label: '7. Partner Testimonials' }
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
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Brand Collaborations Hero Banner</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Eyebrow Badge</label>
                  <input
                    type="text"
                    value={formData.hero.eyebrowText}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, eyebrowText: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Full Title</label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, title: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlighted Word (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.hero.highlightedTitle}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, highlightedTitle: e.target.value } })}
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

          {/* SUB-TAB 2: BRAND LOGO SLIDER */}
          {contentSubTab === 'carousel' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Brand Carousel Logos ({formData.brandCarousel.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'brandCarousel', item: { brandName: '', status: 'Active' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Brand Logo
                </Button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {formData.brandCarousel.map((b, idx) => (
                  <div key={b.id || idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-luxury-gold font-mono font-bold uppercase">
                    <span>{b.brandName}</span>
                    <button onClick={() => handleItemDelete('brandCarousel', b.id)} className="text-zinc-500 hover:text-rose-400"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: BRAND CARDS GRID */}
          {contentSubTab === 'partners' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Brand Cards Grid ({formData.partners.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'partners', item: { name: '', type: 'Cloud Partner', logo: '', featuredWork: '', description: '', accentColor: '#D4AF37', status: 'Active' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Brand Card
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.partners.map((p, idx) => (
                  <div key={p.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-mono text-[10px] text-luxury-gold uppercase">{p.type}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'partners', item: p })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('partners', p.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-white text-base">{p.name}</h4>
                    {p.featuredWork && <span className="text-zinc-400 font-mono text-[10px] uppercase block">Featured: {p.featuredWork}</span>}
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: SUCCESS METRICS */}
          {contentSubTab === 'metrics' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Success Metrics ({formData.metrics.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'metrics', item: { value: '100+', label: 'New Metric', status: 'Active' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Metric
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.metrics.map((m, idx) => (
                  <div key={m.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2 text-center">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-serif text-2xl font-bold text-luxury-gold">{m.value}</span>
                      <button onClick={() => handleItemDelete('metrics', m.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <span className="font-mono text-xs uppercase text-zinc-300 block">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 5: CASE STUDIES */}
          {contentSubTab === 'campaigns' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Case Studies & Campaigns ({formData.campaigns.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'campaigns', item: { title: '', description: '', accentColor: '#D4AF37', buttonText: 'View Highlight', status: 'Active' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Case Study
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.campaigns.map((c, idx) => (
                  <div key={c.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="font-serif font-bold text-white text-base">{c.title}</h4>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'campaigns', item: c })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('campaigns', c.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{c.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 6: PARTNERSHIP PROCESS */}
          {contentSubTab === 'process' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Partnership Process Steps ({formData.process.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'process', item: { stepNumber: '05', title: '', status: 'Active' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Process Step
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.process.map((pr, idx) => (
                  <div key={pr.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-luxury-gold font-bold">{pr.stepNumber || `0${idx + 1}`}</span>
                      <span className="text-white text-sm font-semibold">{pr.title}</span>
                    </div>
                    <button onClick={() => handleItemDelete('process', pr.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 7: PARTNER TESTIMONIALS */}
          {contentSubTab === 'testimonials' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Partner Testimonials ({formData.testimonials.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'testimonials', item: { quote: '', personName: '', designation: '', company: '', accentColor: '#D4AF37', status: 'Active' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Testimonial
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.testimonials.map((t, idx) => (
                  <div key={t.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <strong className="text-white text-sm">{t.personName} ({t.company})</strong>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'testimonials', item: t })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('testimonials', t.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-zinc-300 font-light italic text-xs">"{t.quote}"</p>
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
                src="https://www.techmasterco.com/collaborations"
                title="Live Preview Brand Collaborations"
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
