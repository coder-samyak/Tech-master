import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  FolderHeart, Sparkles, Check, Save, Plus, Trash2, Edit3, Eye, EyeOff, 
  ArrowUp, ArrowDown, Upload, RefreshCw, Copy, Layers, Sliders, Globe, 
  Monitor, Tablet, Smartphone, Clock, Palette, Play, Image as ImageIcon, X, RotateCcw, Link as LinkIcon, Search
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const Portfolio = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('overview'); // overview, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, channels, categories, projects
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null); // { type: 'channel'|'category'|'project', item: {} }
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Default production values for Our Work / Portfolio CMS
  const defaultPortfolioCMS = {
    hero: {
      badge: "CREATIVE ECOSYSTEM",
      title: "The",
      highlightText: "Multiverse",
      description: "Masterpieces In Motion — Our portfolio of 5 high-scale content channels spanning technology, automotive, podcasts, and viral entertainment.",
      visible: true
    },
    channels: [
      {
        id: "ch-1",
        number: "1",
        name: "1. Tech Master",
        circleImage: "/TechMaster.jpeg",
        desc: "High-scale technology breakdowns, hardware reviews, and cinematic teardowns.",
        ytSubs: "33M Subs on YT",
        igFollowers: "5.8M Followers on IG",
        popular: "195M (Short) • 219M (Reel)",
        link: "https://www.youtube.com/@techmasterhq",
        accent: "#D4AF37",
        order: 1,
        visible: true,
        deleted: false
      },
      {
        id: "ch-2",
        number: "2",
        name: "2. Next Univerz",
        circleImage: "/NextUniverz.jpeg",
        desc: "Engineering insights, software masterclasses, and digital transformation.",
        ytSubs: "5.5M Subs on YT",
        igFollowers: "",
        popular: "88M (Shorts) • 4.6M (Long)",
        link: "https://www.youtube.com/@NextUniverz",
        accent: "#00E5FF",
        order: 2,
        visible: true,
        deleted: false
      },
      {
        id: "ch-3",
        number: "3",
        name: "3. Master Wheels",
        circleImage: "/MasterWheels.jpeg",
        desc: "Supercar testing, EV innovations, and automotive engineering marvels.",
        ytSubs: "4.6M Subs on YT",
        igFollowers: "1.2M Followers on IG",
        popular: "1.7M (Long) • 148M (Short) • 70M (Reel)",
        link: "https://www.youtube.com/@MasterWheelsAK",
        accent: "#FF3366",
        order: 3,
        visible: true,
        deleted: false
      },
      {
        id: "ch-4",
        number: "4",
        name: "4. Full Circle",
        circleImage: "/First circle.jpg.jpeg",
        desc: "Deep-dive conversations, creator podcasts, and behind-the-scenes stories.",
        ytSubs: "300K Subs on YT",
        igFollowers: "",
        popular: "2M (Short)",
        link: "https://www.youtube.com/@fullcircle_in",
        accent: "#AA3BFF",
        order: 4,
        visible: true,
        deleted: false
      },
      {
        id: "ch-5",
        number: "5",
        name: "5. Trendz Talk",
        circleImage: "/Trendz talk logo.png",
        desc: "Viral tech trends, short-form pop tech, and culture storytelling.",
        ytSubs: "",
        igFollowers: "15K Followers on IG",
        popular: "4.8M (Reel)",
        link: "https://www.instagram.com/techmasterco/",
        accent: "#00FF66",
        order: 5,
        visible: true,
        deleted: false
      }
    ],
    categories: [
      { id: "cat-1", name: "Videos", order: 1, visible: true },
      { id: "cat-2", name: "Photos", order: 2, visible: true },
      { id: "cat-3", name: "Projects", order: 3, visible: true },
      { id: "cat-4", name: "Campaigns", order: 4, visible: true },
      { id: "cat-5", name: "Reels", order: 5, visible: true },
      { id: "cat-6", name: "Commercial Shoots", order: 6, visible: true },
      { id: "cat-7", name: "Client Work", order: 7, visible: true }
    ],
    projects: [
      {
        id: "proj-1",
        title: "Asus ROG Phone 8 Global Reveal",
        category: "Videos",
        client: "ASUS Gaming",
        year: "2026",
        description: "Complete commercial production, 3D gaming render animations, and multi-channel launch across Tech Master ecosystem.",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        accentColor: "#D4AF37",
        tags: ["3D Animation", "Commercial Shoot", "Hardware Review"],
        buttonText: "Review Case",
        buttonUrl: "https://youtube.com",
        featured: true,
        order: 1,
        visible: true,
        deleted: false
      },
      {
        id: "proj-2",
        title: "Tesla Cyberbeast Track Performance Test",
        category: "Commercial Shoots",
        client: "Master Wheels",
        year: "2026",
        description: "High-speed 4K tracking camera production at Buddh International Circuit testing top-speed telemetry.",
        imageUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=800",
        accentColor: "#FF3366",
        tags: ["Automotive", "High-Speed Cinema", "Telemetry"],
        buttonText: "Review Case",
        buttonUrl: "https://youtube.com",
        featured: true,
        order: 2,
        visible: true,
        deleted: false
      },
      {
        id: "proj-3",
        title: "Next Univerz Full-Stack Masterclass",
        category: "Projects",
        client: "Next Univerz",
        year: "2025",
        description: "Curriculum design, interactive coding sandbox development, and 50+ video production modules.",
        imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800",
        accentColor: "#00E5FF",
        tags: ["Education", "Full-Stack", "Masterclass"],
        buttonText: "Review Case",
        buttonUrl: "https://youtube.com",
        featured: true,
        order: 3,
        visible: true,
        deleted: false
      },
      {
        id: "proj-4",
        title: "Full Circle Studio Podcast with CEO Guests",
        category: "Reels",
        client: "Full Circle",
        year: "2025",
        description: "Multi-cam 4K podcast recording suite, spatial audio mix, and viral short clips editing.",
        imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800",
        accentColor: "#AA3BFF",
        tags: ["Podcast", "Multi-Cam", "Viral Clips"],
        buttonText: "Review Case",
        buttonUrl: "https://youtube.com",
        featured: true,
        order: 4,
        visible: true,
        deleted: false
      },
      {
        id: "proj-5",
        title: "Trendz Talk Pop Tech Short-Form Series",
        category: "Reels",
        client: "Trendz Talk",
        year: "2026",
        description: "Fast-paced vertical tech news series reaching 4.8M+ views per reel on Instagram.",
        imageUrl: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=800",
        accentColor: "#00FF66",
        tags: ["Short-Form", "Pop Tech", "Viral Reels"],
        buttonText: "Review Case",
        buttonUrl: "https://instagram.com",
        featured: true,
        order: 5,
        visible: true,
        deleted: false
      },
      {
        id: "proj-6",
        title: "Apple Vision Pro Spatial Computing Showcase",
        category: "Videos",
        client: "Tech Master",
        year: "2025",
        description: "In-depth spatial audio and optical tracking teardown reaching 15M+ tech enthusiasts.",
        imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=800",
        accentColor: "#D4AF37",
        tags: ["Spatial Computing", "Teardown", "Apple"],
        buttonText: "Review Case",
        buttonUrl: "https://youtube.com",
        featured: true,
        order: 6,
        visible: true,
        deleted: false
      }
    ],
    seo: {
      metaTitle: "Our Work & Portfolio — TechMaster Multiverse",
      metaDescription: "Explore our portfolio of 5 high-scale content channels spanning technology, automotive, podcasts, and viral entertainment.",
      canonicalUrl: "https://techmaster.in/portfolio",
      ogImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
      twitterCard: "summary_large_image",
      allowIndex: true
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
      updatedBy: "Super Admin",
      versions: [
        { version: "v2.0 (Live)", date: "2026-07-29", author: "Super Admin" }
      ]
    }
  };

  const storedCMS = db?.portfolioCMS || db?.portfolioPage || defaultPortfolioCMS;
  const storedProjects = db?.portfolio || defaultPortfolioCMS.projects;

  const [formData, setFormData] = useState({
    ...defaultPortfolioCMS,
    ...storedCMS,
    projects: (storedProjects && storedProjects.length > 0) ? storedProjects : defaultPortfolioCMS.projects
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestPortfolio = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/portfolio');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultPortfolioCMS,
              ...data,
              hero: { ...defaultPortfolioCMS.hero, ...(data.hero || {}) },
              channels: (data.channels && data.channels.length > 0) ? data.channels : defaultPortfolioCMS.channels,
              categories: (data.categories && data.categories.length > 0) ? data.categories : defaultPortfolioCMS.categories,
              projects: (data.projects && data.projects.length > 0) ? data.projects : defaultPortfolioCMS.projects
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest portfolio from backend:", err);
      }
    };
    fetchLatestPortfolio();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('portfolioCMS', nextState);
    updateSection('portfolioPage', nextState);
    updateSection('ourWork', nextState);
    updateSection('portfolio', nextState.projects);
    updateSection('portfolioFilters', nextState.categories);
    updateSection('multiverseChannels', nextState.channels);
    updateSection('portfolioHero', nextState.hero);
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
        await apiFetch('/portfolio', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'Our Work Page Published Live!' : 'Draft Saved Successfully!', 'success');
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append('image', file);

      const res = await apiFetch('/upload/image', { method: 'POST', body: uploadData });

      if (res.success && (res.data?.url || res.data?.imageUrl || res.data?.secure_url)) {
        callback(res.data.url || res.data.imageUrl || res.data.secure_url);
        showToast('Image uploaded successfully!', 'success');
      } else {
        const localUrl = URL.createObjectURL(file);
        callback(localUrl);
        showToast('Image attached to form preview', 'info');
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      callback(localUrl);
      showToast('Image preview attached', 'info');
    } finally {
      setIsUploading(false);
    }
  };

  // List Reordering Swap
  const swapOrder = (listKey, index, direction) => {
    const list = [...formData[listKey]];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    persistChanges({ ...formData, [listKey]: reordered });
  };

  // Item Delete / Soft Delete / Restore
  const handleItemDelete = (listKey, id, permanent = false) => {
    const list = [...formData[listKey]];
    let updated;
    if (permanent) {
      updated = list.filter(item => item.id !== id);
    } else {
      updated = list.map(item => item.id === id ? { ...item, deleted: true } : item);
    }
    persistChanges({ ...formData, [listKey]: updated });
    showToast(permanent ? 'Item permanently deleted' : 'Item soft-deleted. Restore anytime.', 'info');
  };

  const handleItemRestore = (listKey, id) => {
    const list = [...formData[listKey]];
    const updated = list.map(item => item.id === id ? { ...item, deleted: false } : item);
    persistChanges({ ...formData, [listKey]: updated });
    showToast('Item restored successfully', 'success');
  };

  const handleItemDuplicate = (listKey, item) => {
    const list = [...formData[listKey]];
    const dup = {
      ...item,
      id: `${listKey.slice(0, 2)}-dup-${Date.now()}`,
      title: item.title ? `${item.title} (Copy)` : item.name ? `${item.name} (Copy)` : 'Copy',
      name: item.name ? `${item.name} (Copy)` : item.title ? `${item.title} (Copy)` : 'Copy',
      order: list.length + 1
    };
    const updated = [...list, dup];
    persistChanges({ ...formData, [listKey]: updated });
    showToast('Item duplicated successfully!', 'success');
  };

  // Modal Save
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
        id: `${listKey.slice(0, 2)}-${Date.now()}`,
        order: list.length + 1,
        visible: true,
        deleted: false
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Our Work / Portfolio CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Enterprise CMS controlling Multiverse Channels, Filter Categories, and Project Cards.
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

      {/* 7 Existing CMS Tabs */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: FolderHeart },
          { id: 'content', label: 'Content', icon: Layers },
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

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">Multiverse Channels</span>
              <p className="text-xl font-serif font-bold text-luxury-gold">{formData.channels.length} Channels</p>
              <p className="text-xs text-zinc-400 mt-1">Tech Master, Next Univerz, Master Wheels...</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CONTENT (Sub-Tabs: Hero, Channels, Categories, Projects) */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Sub-Navigation */}
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/80 w-fit">
            {[
              { id: 'hero', label: 'Hero Header' },
              { id: 'channels', label: 'Multiverse Channels (5 Cards)' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setContentSubTab(sub.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  contentSubTab === sub.id
                    ? 'bg-luxury-gold text-black font-bold'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Sub-Tab 1: HERO HEADER */}
          {contentSubTab === 'hero' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Hero Section</h3>

              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge Tag</label>
                  <input
                    type="text"
                    value={formData.hero.badge}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, badge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Main Text</label>
                  <input
                    type="text"
                    value={formData.hero.title}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, title: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold text-base"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlight Word</label>
                  <input
                    type="text"
                    value={formData.hero.highlightText}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, highlightText: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic text-base"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description Content</label>
                  <textarea
                    rows={3}
                    value={formData.hero.description}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light leading-relaxed"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: MULTIVERSE CHANNELS */}
          {contentSubTab === 'channels' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Multiverse Channel Cards ({formData.channels.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'channels', item: { circleImage: '', name: '', desc: '', ytSubs: '', igFollowers: '', popular: '', link: '', accent: '#D4AF37' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Channel Card
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                {formData.channels.map((ch, idx) => (
                  <div key={ch.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3 relative group">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-luxury-gold/50 bg-black shrink-0 flex items-center justify-center">
                          {(ch.circleImage || ch.imageUrl || ch.logoUrl) ? (
                            <img src={ch.circleImage || ch.imageUrl || ch.logoUrl} alt={ch.name} className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <span className="text-luxury-gold font-mono text-[9px]">#{idx + 1}</span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-white text-sm">{ch.name}</h4>
                          <span className="text-[9px] font-mono text-zinc-500 block">Channel Card #{idx + 1}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => swapOrder('channels', idx, -1)} className="text-zinc-500 hover:text-luxury-gold"><ArrowUp className="w-3 h-3" /></button>
                        <button onClick={() => swapOrder('channels', idx, 1)} className="text-zinc-500 hover:text-luxury-gold"><ArrowDown className="w-3 h-3" /></button>
                        <button onClick={() => handleItemDuplicate('channels', ch)} className="text-zinc-400 hover:text-white"><Copy className="w-3.5 h-3.5" /></button>
                        <button 
                          onClick={() => {
                            const lowName = (ch.name || "").toLowerCase();
                            const fallbackImg = 
                              lowName.includes("tech master") ? "/TechMaster.jpeg" :
                              lowName.includes("next univerz") ? "/NextUniverz.jpeg" :
                              lowName.includes("master wheels") ? "/MasterWheels.jpeg" :
                              lowName.includes("full circle") ? "/First circle.jpg.jpeg" :
                              lowName.includes("trendz talk") ? "/Trendz talk logo.png" : "";

                            const activeImg = ch.circleImage || ch.imageUrl || ch.logoUrl || ch.image || fallbackImg;

                            setModalConfig({
                              listKey: 'channels',
                              item: {
                                circleImage: activeImg,
                                name: ch.name || '',
                                desc: ch.desc || '',
                                ytSubs: ch.ytSubs || '',
                                igFollowers: ch.igFollowers || '',
                                popular: ch.popular || '',
                                link: ch.link || '',
                                accent: ch.accent || '#D4AF37',
                                ...ch,
                                circleImage: activeImg
                              }
                            });
                          }} 
                          className="text-zinc-400 hover:text-luxury-gold"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleItemDelete('channels', ch.id, true)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{ch.desc}</p>

                    <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                      {ch.ytSubs && <span className="px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/30">{ch.ytSubs}</span>}
                      {ch.igFollowers && <span className="px-2 py-0.5 rounded bg-gold/10 text-gold border border-gold/30">{ch.igFollowers}</span>}
                    </div>

                    <div className="text-[10px] font-mono text-zinc-500 bg-black/40 p-2 rounded border border-zinc-800">
                      <span className="block text-[8px] uppercase text-zinc-500">Popular:</span>
                      <span className="text-zinc-300">{ch.popular}</span>
                    </div>

                    <a href={ch.link} target="_blank" rel="noreferrer" className="text-luxury-gold text-[10px] font-mono uppercase inline-flex items-center gap-1 hover:underline">
                      Visit Channel <LinkIcon className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: MEDIA ASSETS */}
      {activeTab === 'media' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Page Media Assets</h3>
          <div>
            <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">OG Share Banner Image</label>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={formData.seo.ogImage}
                onChange={(e) => persistChanges({ ...formData, seo: { ...formData.seo, ogImage: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono"
              />
              <Button type="button" variant="outline" size="sm" onClick={() => openMediaManager({ onSelect: (url) => persistChanges({ ...formData, seo: { ...formData.seo, ogImage: url } }) })}>
                Media Picker
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SEO & SEARCH */}
      {activeTab === 'seo' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Page SEO Metadata</h3>
          <div className="space-y-3">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Meta Title</label>
              <input
                type="text"
                value={formData.seo.metaTitle}
                onChange={(e) => persistChanges({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={formData.seo.metaDescription}
                onChange={(e) => persistChanges({ ...formData, seo: { ...formData.seo, metaDescription: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: LIVE PREVIEW */}
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
                src="http://localhost:5173/portfolio"
                title="Live Preview Portfolio"
                className="w-full h-[600px] border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT ITEM MODAL */}
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

            <div className="space-y-3 text-xs max-h-[60vh] overflow-y-auto pr-1">
              {(() => {
                let keys = Object.keys(modalConfig.item).filter(k => !['id', 'order', 'visible', 'deleted'].includes(k));
                if (modalConfig.listKey === 'channels' && !keys.includes('circleImage')) {
                  keys.unshift('circleImage');
                }
                return keys.map(key => {
                  const isImageField = ['circleImage', 'imageUrl', 'logoUrl', 'image', 'avatarUrl'].includes(key);
                if (isImageField) {
                  const currentImg = modalConfig.item[key] || '';
                  return (
                    <div key={key} className="space-y-1.5 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/80">
                      <label className="text-luxury-gold block font-mono uppercase text-[10px] font-bold">
                        {key === 'circleImage' ? 'Channel Circle Avatar Image' : key}
                      </label>
                      
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border border-luxury-gold/50 bg-black shrink-0 flex items-center justify-center">
                          {currentImg ? (
                            <img src={currentImg} alt="Preview" className="w-full h-full object-cover rounded-full" />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-zinc-600" />
                          )}
                        </div>

                        <div className="flex-1 space-y-1.5">
                          <input
                            type="text"
                            placeholder="Enter image URL or choose file..."
                            value={currentImg}
                            onChange={(e) => setModalConfig({
                              ...modalConfig,
                              item: { ...modalConfig.item, [key]: e.target.value }
                            })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-zinc-200 text-xs focus:outline-none"
                          />
                          <div className="flex items-center gap-2">
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              className="text-[10px] py-1 px-2.5 uppercase font-mono"
                              onClick={() => openMediaManager({ 
                                onSelect: (url) => setModalConfig({
                                  ...modalConfig,
                                  item: { ...modalConfig.item, [key]: url }
                                })
                              })}
                            >
                              <ImageIcon className="w-3 h-3 mr-1 text-luxury-gold" /> Media Library
                            </Button>

                            <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-2.5 py-1 rounded-md text-[10px] uppercase font-mono border border-zinc-700 flex items-center gap-1">
                              <Upload className="w-3 h-3 text-luxury-gold" /> Upload
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleFileUpload(e, (url) => setModalConfig({
                                  ...modalConfig,
                                  item: { ...modalConfig.item, [key]: url }
                                }))} 
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
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
                );
              });
            })()}
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
