import React, { useState } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Newspaper, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, Download, Film, Tag, ArrowUpRight, Sparkles, Filter
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const MediaGallery = () => {
  const { db, updateSection } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('gallery_items'); // overview, gallery_items, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, categories, press, showreel, downloads
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultMediaGalleryCMS = {
    hero: {
      badge: "CREATOR ARCHIVES",
      titleLine1: "Media Coverage &",
      titleLine2: "Gallery",
      description: "Welcome to the global archive of all media, gallery press appearances and newsroom highlights.",
      visible: true
    },
    filters: [
      { id: "fl-1", name: "Photos", isVisible: true, order: 1 },
      { id: "fl-2", name: "Videos", isVisible: true, order: 2 },
      { id: "fl-3", name: "Behind The Scenes", isVisible: true, order: 3 },
      { id: "fl-4", name: "Campaign Images", isVisible: true, order: 4 },
      { id: "fl-5", name: "Events", isVisible: true, order: 5 },
      { id: "fl-6", name: "Celebrity Moments", isVisible: true, order: 6 },
      { id: "fl-7", name: "Awards", isVisible: true, order: 7 },
      { id: "fl-8", name: "Travel", isVisible: true, order: 8 },
      { id: "fl-9", name: "Lifestyle", isVisible: true, order: 9 },
      { id: "fl-10", name: "Interviews", isVisible: true, order: 10 }
    ],
    items: [
      {
        id: "mg-1",
        title: "Mainstage Keynote at React India",
        type: "Events",
        category: "Events",
        description: "Addressing 1,500+ full-stack engineers in Goa on WebGL rendering pipelines.",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80",
        status: "Active"
      },
      {
        id: "mg-2",
        title: "Behind the Scenes Studio Shoot",
        type: "Behind The Scenes",
        category: "Behind The Scenes",
        description: "4K multi-cam production setup at Jaipur tech studio.",
        imageUrl: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=600&q=80",
        status: "Active"
      },
      {
        id: "mg-3",
        title: "Global Tech Award Ceremony",
        type: "Awards",
        category: "Awards",
        description: "Awarded Top Technical Educator of the Year 2025.",
        imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
        status: "Active"
      }
    ],
    showreel: {
      title: "TechMaster Core Presentation Showreel 2026",
      description: "A cinematic breakdown of our developer ecosystem, 2.5M subscriber reach, and interactive sandbox platforms.",
      thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      visible: true
    },
    downloads: [
      { id: "dl-1", title: "Official Press Kit & Bios (ZIP)", format: "ZIP Archive", size: "45 MB", url: "/press/press-kit.zip", status: "Active" },
      { id: "dl-2", title: "High-Res Speaker Headshots & Logos", format: "PNG / SVG", size: "28 MB", url: "/press/headshots.zip", status: "Active" }
    ],
    pressMentions: [
      { id: "pm-1", publisher: "TechCrunch", title: "How TechMaster Built an Open Coding Sandbox Reaching Millions", date: "2026-06-15", url: "https://techcrunch.com", status: "Active" },
      { id: "pm-2", publisher: "Forbes India", title: "Aman on Democratizing Technical Literacy Globally", date: "2026-05-20", url: "https://forbes.com", status: "Active" }
    ],
    seo: {
      metaTitle: "Media Gallery & Press Coverage | TechMaster",
      metaDescription: "Browse official photo archives, video showreels, press mentions, and speaker press kits.",
      canonicalUrl: "https://techmaster.in/media-gallery",
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

  const storedCMS = db?.mediaGalleryCMS || db?.mediaPage || defaultMediaGalleryCMS;

  const [formData, setFormData] = useState({
    ...defaultMediaGalleryCMS,
    ...storedCMS,
    hero: { ...defaultMediaGalleryCMS.hero, ...(storedCMS.hero || {}) },
    filters: (db?.mediaFilters && db.mediaFilters.length > 0) ? db.mediaFilters : ((storedCMS.filters && storedCMS.filters.length > 0) ? storedCMS.filters : defaultMediaGalleryCMS.filters),
    items: (db?.mediaGallery && db.mediaGallery.length > 0) ? db.mediaGallery : ((storedCMS.items && storedCMS.items.length > 0) ? storedCMS.items : defaultMediaGalleryCMS.items),
    showreel: { ...defaultMediaGalleryCMS.showreel, ...(db?.mediaShowreels && db.mediaShowreels[0] ? db.mediaShowreels[0] : (storedCMS.showreel || {})) },
    downloads: (db?.mediaDownloads && db.mediaDownloads.length > 0) ? db.mediaDownloads : ((storedCMS.downloads && storedCMS.downloads.length > 0) ? storedCMS.downloads : defaultMediaGalleryCMS.downloads),
    pressMentions: (storedCMS.pressMentions && storedCMS.pressMentions.length > 0) ? storedCMS.pressMentions : defaultMediaGalleryCMS.pressMentions
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('mediaGalleryCMS', nextState);
    updateSection('mediaHero', nextState.hero);
    updateSection('mediaFilters', nextState.filters);
    updateSection('mediaGallery', nextState.items);
    updateSection('mediaShowreels', [nextState.showreel]);
    updateSection('mediaDownloads', nextState.downloads);
  };

  const handleSaveAll = (isPublished = false) => {
    const updatedState = {
      ...formData,
      versioning: {
        ...formData.versioning,
        status: isPublished ? 'Published' : 'Draft',
        lastUpdated: new Date().toLocaleString()
      }
    };
    persistChanges(updatedState);
    setIsSaved(true);
    showToast(isPublished ? 'Media Gallery Published Live!' : 'Draft Saved Successfully!', 'success');
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
        status: 'Active',
        isVisible: true
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
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Media Gallery & Press CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Control Media Archives, Photo & Video Gallery, Showreels, Category Filters, Press Mentions & Press Kits.
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
          { id: 'gallery_items', label: '1. Media Gallery Grid', icon: Newspaper },
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

      {/* TAB 1: MEDIA GALLERY GRID */}
      {activeTab === 'gallery_items' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Media & Press Gallery Cards ({formData.items.length})</h3>
            <Button 
              onClick={() => setModalConfig({ listKey: 'items', item: { title: '', type: 'Events', category: 'Events', description: '', imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80', status: 'Active' } })} 
              variant="gold" 
              size="sm" 
              className="text-xs uppercase"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Media Card
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {formData.items.map((m, idx) => (
              <div key={m.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3 flex flex-col justify-between">
                <div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                    <img src={m.imageUrl || m.image} alt={m.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/80 text-luxury-gold font-mono text-[9px] px-2 py-0.5 rounded border border-luxury-gold/30 uppercase font-bold">
                      {m.type || m.category}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-white text-base leading-snug mb-1">{m.title}</h4>
                  <p className="text-zinc-400 font-light text-xs line-clamp-2 mb-2">{m.description}</p>
                </div>

                <div className="flex items-center justify-end pt-3 border-t border-zinc-800/80 gap-2">
                  <button onClick={() => setModalConfig({ listKey: 'items', item: m })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleItemDelete('items', m.id)} className="p-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
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
              { id: 'categories', label: '2. Category Filters' },
              { id: 'press', label: '3. Press Mentions' },
              { id: 'showreel', label: '4. Video Showreel' },
              { id: 'downloads', label: '5. Asset Downloads' }
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
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Media Gallery Hero Banner</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                  <input
                    type="text"
                    value={formData.hero.badge}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, badge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 1</label>
                    <input
                      type="text"
                      value={formData.hero.titleLine1}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, titleLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 2 (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.hero.titleLine2}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, titleLine2: e.target.value } })}
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

          {/* SUB-TAB 2: CATEGORY FILTERS */}
          {contentSubTab === 'categories' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Gallery Filter Categories ({formData.filters.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'filters', item: { name: '', isVisible: true } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Filter Pill
                </Button>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {formData.filters.map((f, idx) => (
                  <div key={f.id || idx} className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-luxury-gold font-mono font-bold">
                    <span>{f.name}</span>
                    <button onClick={() => handleItemDelete('filters', f.id)} className="text-zinc-500 hover:text-rose-400"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: PRESS MENTIONS */}
          {contentSubTab === 'press' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Editorial & Press Mentions ({formData.pressMentions.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'pressMentions', item: { publisher: '', title: '', date: new Date().toISOString().split('T')[0], url: 'https://' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Press Mention
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.pressMentions.map((pm, idx) => (
                  <div key={pm.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-mono text-xs font-bold text-luxury-gold uppercase">{pm.publisher}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'pressMentions', item: pm })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('pressMentions', pm.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <h4 className="font-serif font-bold text-white text-sm">{pm.title}</h4>
                    <span className="text-zinc-400 font-mono text-[10px] block">{pm.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: SHOWREEL */}
          {contentSubTab === 'showreel' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Video Showreel Feature</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Showreel Title</label>
                  <input
                    type="text"
                    value={formData.showreel.title}
                    onChange={(e) => persistChanges({ ...formData, showreel: { ...formData.showreel, title: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.showreel.description}
                    onChange={(e) => persistChanges({ ...formData, showreel: { ...formData.showreel, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Video URL</label>
                    <input
                      type="text"
                      value={formData.showreel.videoUrl}
                      onChange={(e) => persistChanges({ ...formData, showreel: { ...formData.showreel, videoUrl: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Thumbnail Image URL</label>
                    <input
                      type="text"
                      value={formData.showreel.thumbnailUrl}
                      onChange={(e) => persistChanges({ ...formData, showreel: { ...formData.showreel, thumbnailUrl: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 5: DOWNLOADS */}
          {contentSubTab === 'downloads' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Press & Speaker Download Kits ({formData.downloads.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'downloads', item: { title: '', format: 'ZIP', size: '20 MB', url: '/press/kit.zip' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Asset Kit
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.downloads.map((dl, idx) => (
                  <div key={dl.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <strong className="text-white text-sm">{dl.title}</strong>
                      <button onClick={() => handleItemDelete('downloads', dl.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <span className="text-luxury-gold font-mono text-[10px] block">{dl.format} • {dl.size}</span>
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
                src="https://www.techmasterco.com/media-gallery"
                title="Live Preview Media Gallery"
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
