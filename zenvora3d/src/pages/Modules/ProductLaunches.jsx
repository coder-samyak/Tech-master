import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Rocket, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, Play, Terminal, Laptop, Cpu, Download, ArrowUpRight, Code, Sparkles, Sliders
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const ProductLaunches = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('products'); // overview, products, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, video, initiatives, downloads, cta
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultLaunchesCMS = {
    hero: {
      smallBadge: "SOFTWARE RELEASES",
      headline: "Product Launches &",
      highlightWord: "Tech Innovations",
      titleLine2: "",
      description: "We construct platforms, terminal tools, and architectural sandbox spaces to help learners visual and configure engineering problems.",
      visible: true
    },
    products: [
      {
        id: "prod-1",
        icon: "Laptop",
        title: "MasterClass App v2",
        tagline: "Gamified Interactive Code Learning",
        description: "Our core dashboard offering browser-based shell access, sandboxed docker execution, and step-by-step challenges covering system architectures.",
        status: "Active Launch",
        accent: "#D4AF37",
        order: 1,
        visible: true
      },
      {
        id: "prod-2",
        icon: "Terminal",
        title: "DevEnv CLI utility",
        tagline: "Speed Up Local Node Configuration",
        description: "A fast terminal CLI utility that builds customized, performant TS, Vite, and tailwind stacks in seconds, downloaded 80k+ times.",
        status: "Open Source",
        accent: "#00E5FF",
        order: 2,
        visible: true
      },
      {
        id: "prod-3",
        icon: "Layers",
        title: "System Sandbox Hub",
        tagline: "Interactive AWS & Docker diagrams",
        description: "A digital workspace where students can construct multi-tier architectures visually, export them, and trigger test loads.",
        status: "Beta Testing",
        accent: "#aa3bff",
        order: 3,
        visible: true
      }
    ],
    featureVideo: {
      smallBadge: "LATEST LAUNCH VIDEO",
      headline: "MasterClass v2 Platform Launch Walkthrough",
      description: "Watch Aman demonstrate the sandboxed docker containers, web terminals, and the multiplayer live coding rooms that make learning code feel like a cooperative MMO game.",
      trailerBtnText: "Play Trailer",
      notesBtnText: "View Launch Notes",
      thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      visible: true
    },
    initiativesHeader: {
      badge: "OUR WORK",
      titleLine1: "Launch",
      titleLine2: "Initiatives"
    },
    initiatives: [
      { id: "init-1", title: "Launch Events", description: "Hosting high-energy digital and physical events to unveil new platforms, creating massive day-one adoption and community buzz.", order: 1, visible: true },
      { id: "init-2", title: "Product Promotions", description: "Strategic marketing pushes that position developer tools directly in front of their ideal user base through trusted channels.", order: 2, visible: true },
      { id: "init-3", title: "Brand Launches", description: "End-to-end support for introducing new technology brands to the market, establishing authority and developer trust instantly.", order: 3, visible: true },
      { id: "init-4", title: "Campaign Videos", description: "Cinematic, deep-dive promotional videos that explain complex software architectures in a visually stunning and digestible format.", order: 4, visible: true },
      { id: "init-5", title: "Results", description: "We measure our success by tangible impact: tens of thousands of active accounts created, millions of impressions, and sustained engagement long after the initial launch phase ends.", order: 5, visible: true }
    ],
    downloads: [
      { id: "dl-1", platform: "Windows Installer (.exe)", version: "v2.4.1", size: "85 MB", link: "/download/win" },
      { id: "dl-2", platform: "macOS Universal (.dmg)", version: "v2.4.1", size: "92 MB", link: "/download/mac" },
      { id: "dl-3", platform: "Linux AppImage (.AppImage)", version: "v2.4.1", size: "78 MB", link: "/download/linux" }
    ],
    seo: {
      metaTitle: "Product Launches & Tech Innovations | TechMaster",
      metaDescription: "Discover TechMaster's software releases, open-source DevEnv CLI utilities, and sandbox masterclasses.",
      canonicalUrl: "https://techmaster.in/product-launches",
      ogImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80"
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

  const storedCMS = db?.launchesData || db?.productLaunchesCMS || db?.campaigns || defaultLaunchesCMS;

  const [formData, setFormData] = useState({
    ...defaultLaunchesCMS,
    ...storedCMS,
    hero: { ...defaultLaunchesCMS.hero, ...(storedCMS.hero || {}) },
    products: (storedCMS.products && storedCMS.products.length > 0) ? storedCMS.products : defaultLaunchesCMS.products,
    featureVideo: { ...defaultLaunchesCMS.featureVideo, ...(storedCMS.featureVideo || {}) },
    initiativesHeader: { ...defaultLaunchesCMS.initiativesHeader, ...(storedCMS.initiativesHeader || {}) },
    initiatives: (storedCMS.initiatives && storedCMS.initiatives.length > 0) ? storedCMS.initiatives : defaultLaunchesCMS.initiatives,
    downloads: (storedCMS.downloads && storedCMS.downloads.length > 0) ? storedCMS.downloads : defaultLaunchesCMS.downloads
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestLaunches = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/product-launches');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultLaunchesCMS,
              ...data,
              hero: { ...defaultLaunchesCMS.hero, ...(data.hero || {}) },
              products: (data.products && data.products.length > 0) ? data.products : defaultLaunchesCMS.products,
              featureVideo: { ...defaultLaunchesCMS.featureVideo, ...(data.featureVideo || {}) },
              initiativesHeader: { ...defaultLaunchesCMS.initiativesHeader, ...(data.initiativesHeader || {}) },
              initiatives: (data.initiatives && data.initiatives.length > 0) ? data.initiatives : defaultLaunchesCMS.initiatives,
              downloads: (data.downloads && data.downloads.length > 0) ? data.downloads : defaultLaunchesCMS.downloads
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest product launches from backend:", err);
      }
    };
    fetchLatestLaunches();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('launchesData', nextState);
    updateSection('productLaunchesCMS', nextState);
    updateSection('productLaunches', nextState);
    updateSection('product_launches', nextState);
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
        await apiFetch('/product-launches', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'Product Launches Published Live!' : 'Draft Saved Successfully!', 'success');
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
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Product Launches & Innovations CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Manage Software Releases, Product Cards, Launch Video Walkthrough, Initiatives & Downloads.
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
          { id: 'products', label: '1. Product Catalog', icon: Rocket },
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

      {/* TAB 1: PRODUCT CATALOG */}
      {activeTab === 'products' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Product Cards ({formData.products.length})</h3>
            <Button 
              onClick={() => setModalConfig({ listKey: 'products', item: { icon: 'Laptop', title: '', tagline: '', description: '', status: 'Active Launch', accent: '#D4AF37' } })} 
              variant="gold" 
              size="sm" 
              className="text-xs uppercase"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Product Card
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.products.map((p, idx) => (
              <div key={p.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                  <span className="px-2 py-0.5 rounded bg-luxury-gold/10 text-luxury-gold font-mono text-[9px] uppercase font-bold">{p.status}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setModalConfig({ listKey: 'products', item: p })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleItemDelete('products', p.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>

                <h4 className="font-serif font-bold text-white text-base">{p.title}</h4>
                {p.tagline && <span className="text-zinc-400 font-mono text-[10px] uppercase block">{p.tagline}</span>}
                <p className="text-zinc-400 font-light text-xs leading-relaxed">{p.description}</p>
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
              { id: 'video', label: '2. Launch Video' },
              { id: 'initiatives', label: '3. Launch Initiatives' },
              { id: 'downloads', label: '4. Downloads' }
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
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Product Launch Hero Banner</h3>
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

          {/* SUB-TAB 2: LAUNCH VIDEO */}
          {contentSubTab === 'video' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Latest Launch Video Feature</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                  <input
                    type="text"
                    value={formData.featureVideo.smallBadge}
                    onChange={(e) => persistChanges({ ...formData, featureVideo: { ...formData.featureVideo, smallBadge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Video Title Headline</label>
                  <input
                    type="text"
                    value={formData.featureVideo.headline}
                    onChange={(e) => persistChanges({ ...formData, featureVideo: { ...formData.featureVideo, headline: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.featureVideo.description}
                    onChange={(e) => persistChanges({ ...formData, featureVideo: { ...formData.featureVideo, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Trailer Button Text</label>
                    <input
                      type="text"
                      value={formData.featureVideo.trailerBtnText}
                      onChange={(e) => persistChanges({ ...formData, featureVideo: { ...formData.featureVideo, trailerBtnText: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Notes Button Text</label>
                    <input
                      type="text"
                      value={formData.featureVideo.notesBtnText}
                      onChange={(e) => persistChanges({ ...formData, featureVideo: { ...formData.featureVideo, notesBtnText: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: LAUNCH INITIATIVES */}
          {contentSubTab === 'initiatives' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Launch Initiatives Cards ({formData.initiatives.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'initiatives', item: { title: '', description: '' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Initiative
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.initiatives.map((init, idx) => (
                  <div key={init.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="font-serif font-bold text-white text-base">{init.title}</h4>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'initiatives', item: init })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('initiatives', init.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{init.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: DOWNLOADS */}
          {contentSubTab === 'downloads' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Software Downloads ({formData.downloads.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'downloads', item: { platform: 'Linux (.deb)', version: 'v2.4.1', size: '75 MB', link: '/download/linux' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Download Package
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.downloads.map((dl, idx) => (
                  <div key={dl.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-bold text-white">{dl.platform}</span>
                      <button onClick={() => handleItemDelete('downloads', dl.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <span className="text-luxury-gold font-mono text-[10px] block">{dl.version} • {dl.size}</span>
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
                src="https://www.techmasterco.com/product-launches"
                title="Live Preview Product Launches"
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
