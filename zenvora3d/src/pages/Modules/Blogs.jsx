import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  FileText, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, Sparkles, Target, Users, TrendingUp, BarChart3, Bookmark, Tag, MessageSquare, ArrowUpRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const Blogs = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('posts'); // overview, posts, categories, strategy, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, strategy_banner, stats, pillars, presets, latest_header
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultBlogCMS = {
    blogHero: {
      badge: "CREATOR JOURNAL",
      titleLine1: "Thoughts on Tech",
      titleLine2: "education & scalability.",
      animationEnabled: true,
      glowEnabled: true,
      active: true
    },
    featuredStrategy: {
      badge: "Featured Strategy",
      titleLine1: "Engineering",
      titleLine2: "Content Marketing",
      titleLine3: "Excellence",
      description: "Traditional advertising has diminishing returns. We help engineering brands build market authority through high-utility technical content, storytelling, and high-impact distribution loops.",
      active: true
    },
    strategyStats: [
      { id: "ss-1", number: "10M+", label: "Impressions", order: 1, active: true },
      { id: "ss-2", number: "+150%", label: "Engagement", order: 2, active: true },
      { id: "ss-3", number: "4.8x", label: "Content ROI", order: 3, active: true }
    ],
    strategyPillars: [
      { id: "sp-1", icon: "Users", title: "Audience Retention", description: "Translate complex system architecture into clean narratives.", order: 1, active: true },
      { id: "sp-2", icon: "BarChart3", title: "Search Dominance", description: "Rank first for high-intent queries that developers actually search.", order: 2, active: true },
      { id: "sp-3", icon: "TrendingUp", title: "Distribution Loops", description: "Syndicate deep-dives into social threads, shorts, and digests.", order: 3, active: true }
    ],
    strategyPresets: [
      { id: "solopreneur", presetName: "solopreneur", badge: "Solo Creator", impressions: "50K - 100K+", channel: "Twitter/X, Dev.to & LinkedIn", focus: "Build in public, share raw learnings, create highly readable dev cheatsheets.", roi: "High authority, premium lead acquisition", active: true },
      { id: "startup", presetName: "startup", badge: "Growth Startup", impressions: "250K - 500K+", channel: "GitHub, Medium, Tech Newsletters", focus: "Detailed technical case studies, comparisons, integration guides, and live streams.", roi: "Product signups, community growth", active: true },
      { id: "enterprise", presetName: "enterprise", badge: "Enterprise Brand", impressions: "1M - 5M+", channel: "YouTube Documentaries, Dedicated Hubs", focus: "High-production whitepapers, engineering-led media channels.", roi: "Market standard positioning, enterprise adoption", active: true }
    ],
    blogCategories: [
      { id: "bc-1", name: "All", slug: "all", order: 1, active: true },
      { id: "bc-2", name: "Lifestyle", slug: "lifestyle", order: 2, active: true },
      { id: "bc-3", name: "Marketing", slug: "marketing", order: 3, active: true },
      { id: "bc-4", name: "Branding", slug: "branding", order: 4, active: true },
      { id: "bc-5", name: "Creator Journey", slug: "creator-journey", order: 5, active: true },
      { id: "bc-6", name: "Tips", slug: "tips", order: 6, active: true },
      { id: "bc-7", name: "Latest News", slug: "latest-news", order: 7, active: true }
    ],
    latestInsights: {
      title: "Latest Insights",
      subtitle: "Browse thoughts, guides, and updates from the team",
      active: true
    },
    blogPageSettings: {
      showHero: true,
      showStrategy: true,
      showLatest: true,
      showFilters: true
    },
    blogs: [
      {
        id: "blog-1",
        title: "The Art of Golden Ratios in Modern Luxury Branding",
        slug: "golden-ratios-luxury-branding",
        category: "Branding",
        coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
        excerpt: "Exploring mathematical elegance in high-fashion identity design and visual hierarchy.",
        content: "Detailed technical whitepaper on golden ratios in modern digital branding...",
        publishDate: "2026-07-20",
        readTime: "6 min read",
        author: "Aman",
        featured: true,
        status: "published",
        active: true
      },
      {
        id: "blog-2",
        title: "Building 60FPS Three.js Configurators for WebGL",
        slug: "60fps-threejs-configurators",
        category: "Marketing",
        coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        excerpt: "Optimizing GPU memory buffers, draw calls, and lighting shaders for interactive browser experiences.",
        content: "Deep-dive technical guide into Three.js performance tuning...",
        publishDate: "2026-07-15",
        readTime: "10 min read",
        author: "TechMaster Lead",
        featured: true,
        status: "published",
        active: true
      }
    ],
    seo: {
      metaTitle: "Tech & Creator Journal | TechMaster",
      metaDescription: "Read guides on software architecture, developer education, and high-scale media strategy.",
      canonicalUrl: "https://techmaster.in/blog",
      ogImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200"
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

  const storedCMS = db?.blogCMS || db?.blogsData || defaultBlogCMS;
  const storedBlogs = db?.blogs || db?.blogsList || defaultBlogCMS.blogs;

  const [formData, setFormData] = useState({
    ...defaultBlogCMS,
    ...storedCMS,
    blogHero: { ...defaultBlogCMS.blogHero, ...(db?.blogHero || storedCMS.blogHero || {}) },
    featuredStrategy: { ...defaultBlogCMS.featuredStrategy, ...(db?.featuredStrategy || storedCMS.featuredStrategy || {}) },
    strategyStats: (db?.strategyStats && db.strategyStats.length > 0) ? db.strategyStats : ((storedCMS.strategyStats && storedCMS.strategyStats.length > 0) ? storedCMS.strategyStats : defaultBlogCMS.strategyStats),
    strategyPillars: (db?.strategyPillars && db.strategyPillars.length > 0) ? db.strategyPillars : ((storedCMS.strategyPillars && storedCMS.strategyPillars.length > 0) ? storedCMS.strategyPillars : defaultBlogCMS.strategyPillars),
    strategyPresets: (db?.strategyPresets && db.strategyPresets.length > 0) ? db.strategyPresets : ((storedCMS.strategyPresets && storedCMS.strategyPresets.length > 0) ? storedCMS.strategyPresets : defaultBlogCMS.strategyPresets),
    blogCategories: (db?.blogCategories && db.blogCategories.length > 0) ? db.blogCategories : ((storedCMS.blogCategories && storedCMS.blogCategories.length > 0) ? storedCMS.blogCategories : defaultBlogCMS.blogCategories),
    latestInsights: { ...defaultBlogCMS.latestInsights, ...(db?.latestInsights || storedCMS.latestInsights || {}) },
    blogs: (storedBlogs && storedBlogs.length > 0) ? storedBlogs : defaultBlogCMS.blogs
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/blogs');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultBlogCMS,
              ...data,
              blogHero: { ...defaultBlogCMS.blogHero, ...(data.blogHero || {}) },
              featuredStrategy: { ...defaultBlogCMS.featuredStrategy, ...(data.featuredStrategy || {}) },
              strategyStats: (data.strategyStats && data.strategyStats.length > 0) ? data.strategyStats : defaultBlogCMS.strategyStats,
              strategyPillars: (data.strategyPillars && data.strategyPillars.length > 0) ? data.strategyPillars : defaultBlogCMS.strategyPillars,
              strategyPresets: (data.strategyPresets && data.strategyPresets.length > 0) ? data.strategyPresets : defaultBlogCMS.strategyPresets,
              blogCategories: (data.blogCategories && data.blogCategories.length > 0) ? data.blogCategories : defaultBlogCMS.blogCategories,
              latestInsights: { ...defaultBlogCMS.latestInsights, ...(data.latestInsights || {}) },
              blogs: (data.blogs && data.blogs.length > 0) ? data.blogs : defaultBlogCMS.blogs
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest blogs from backend:", err);
      }
    };
    fetchLatestBlogs();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('blogCMS', nextState);
    updateSection('blogsData', nextState.blogs);
    updateSection('blogs', nextState.blogs);
    updateSection('blogHero', nextState.blogHero);
    updateSection('featuredStrategy', nextState.featuredStrategy);
    updateSection('strategyStats', nextState.strategyStats);
    updateSection('strategyPillars', nextState.strategyPillars);
    updateSection('strategyPresets', nextState.strategyPresets);
    updateSection('blogCategories', nextState.blogCategories);
    updateSection('latestInsights', nextState.latestInsights);
    updateSection('blogPageSettings', nextState.blogPageSettings);
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
        await apiFetch('/blogs', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'Blog Page Published Live!' : 'Draft Saved Successfully!', 'success');
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleItemDelete = (listKey, targetId) => {
    const list = [...formData[listKey]];
    const updated = list.filter(item => (item.id || item._id) !== targetId);
    persistChanges({ ...formData, [listKey]: updated });
    showToast('Item removed', 'info');
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    const { listKey, item } = modalConfig;
    const list = [...formData[listKey]];

    const itemId = item.id || item._id;
    const isEditMode = itemId && list.some(i => (i.id || i._id) === itemId);

    let updated;
    if (isEditMode) {
      updated = list.map(i => ((i.id || i._id) === itemId) ? { ...item, id: itemId } : i);
    } else {
      const newId = itemId || `${listKey.slice(0, 3)}-${Date.now()}`;
      const newItem = {
        ...item,
        id: newId,
        order: list.length + 1,
        active: true,
        status: item.status || 'published'
      };
      updated = [...list, newItem];
    }

    persistChanges({ ...formData, [listKey]: updated });
    setModalConfig(null);
    showToast(isEditMode ? 'Article updated successfully!' : 'New article added!', 'success');
  };

  return (
    <div className="space-y-6 text-left">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Blog Enterprise CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Control Articles Catalog, Categories, Content Marketing Strategy, Reach & ROI Estimator, and SEO.
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

      {/* Architectural Tabs */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'posts', label: '1. Blog Posts Catalog', icon: FileText },
          { id: 'categories', label: '2. Categories & Filters', icon: Tag },
          { id: 'strategy', label: '3. Strategy & ROI Estimator', icon: Target }
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

      {/* TAB 1: BLOG POSTS CATALOG */}
      {activeTab === 'posts' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Published Articles & Guides ({formData.blogs.length})</h3>
            <Button 
              onClick={() => setModalConfig({ listKey: 'blogs', item: { title: '', slug: '', category: 'Branding', excerpt: '', readTime: '5 min read', publishDate: new Date().toISOString().split('T')[0], coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800', featured: true, status: 'published' } })} 
              variant="gold" 
              size="sm" 
              className="text-xs uppercase"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add New Article
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.blogs.map((b, idx) => (
              <div key={b.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3 flex flex-col justify-between">
                <div>
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                    <img src={b.coverImage || b.image} alt={b.title} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 bg-black/80 text-luxury-gold font-mono text-[9px] px-2 py-0.5 rounded border border-luxury-gold/30 uppercase">
                      {b.category}
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-white text-base leading-snug mb-1">{b.title}</h4>
                  <p className="text-zinc-400 font-light text-xs line-clamp-2 mb-2">{b.excerpt}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-400">
                  <span>{b.readTime || '5 min'}</span>
                  <div className="flex items-center gap-1">
                    <button onClick={() => setModalConfig({ listKey: 'blogs', item: { ...b, id: b.id || b._id } })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                    <button onClick={() => handleItemDelete('blogs', b.id || b._id)} className="p-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Blog Categories ({formData.blogCategories.length})</h3>
            <Button 
              onClick={() => setModalConfig({ listKey: 'blogCategories', item: { name: '', slug: '', active: true } })} 
              variant="gold" 
              size="sm" 
              className="text-xs uppercase"
            >
              <Plus className="w-3.5 h-3.5 mr-1" /> Add Category
            </Button>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {formData.blogCategories.map((c, idx) => (
              <div key={c.id || idx} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-200">
                <span className="font-mono text-xs text-luxury-gold font-bold">{c.name}</span>
                <button onClick={() => handleItemDelete('blogCategories', c.id)} className="text-zinc-500 hover:text-rose-400"><X className="w-3 h-3" /></button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STRATEGY & ROI ESTIMATOR */}
      {activeTab === 'strategy' && (
        <div className="space-y-6 text-xs">
          {/* Sub-Navigation */}
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/80 w-fit overflow-x-auto">
            {[
              { id: 'hero', label: '1. Hero Header' },
              { id: 'strategy_banner', label: '2. Strategy Banner' },
              { id: 'stats', label: '3. Strategy Stats' },
              { id: 'pillars', label: '4. Core Pillars' },
              { id: 'presets', label: '5. Reach & ROI Presets' },
              { id: 'latest_header', label: '6. Latest Insights Header' }
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

          {/* 1. HERO HEADER */}
          {contentSubTab === 'hero' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Blog Hero Header CMS</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                  <input
                    type="text"
                    value={formData.blogHero.badge}
                    onChange={(e) => persistChanges({ ...formData, blogHero: { ...formData.blogHero, badge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 1</label>
                    <input
                      type="text"
                      value={formData.blogHero.titleLine1}
                      onChange={(e) => persistChanges({ ...formData, blogHero: { ...formData.blogHero, titleLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 2 (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.blogHero.titleLine2}
                      onChange={(e) => persistChanges({ ...formData, blogHero: { ...formData.blogHero, titleLine2: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. STRATEGY BANNER */}
          {contentSubTab === 'strategy_banner' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Featured Strategy Banner CMS</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.featuredStrategy.badge}
                    onChange={(e) => persistChanges({ ...formData, featuredStrategy: { ...formData.featuredStrategy, badge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 1</label>
                    <input
                      type="text"
                      value={formData.featuredStrategy.titleLine1}
                      onChange={(e) => persistChanges({ ...formData, featuredStrategy: { ...formData.featuredStrategy, titleLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 2 (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.featuredStrategy.titleLine2}
                      onChange={(e) => persistChanges({ ...formData, featuredStrategy: { ...formData.featuredStrategy, titleLine2: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 3</label>
                    <input
                      type="text"
                      value={formData.featuredStrategy.titleLine3}
                      onChange={(e) => persistChanges({ ...formData, featuredStrategy: { ...formData.featuredStrategy, titleLine3: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description Content</label>
                  <textarea
                    rows={3}
                    value={formData.featuredStrategy.description}
                    onChange={(e) => persistChanges({ ...formData, featuredStrategy: { ...formData.featuredStrategy, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. STRATEGY STATS */}
          {contentSubTab === 'stats' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Strategy Metrics & Stats ({formData.strategyStats.length})</h3>
                <Button onClick={() => setModalConfig({ listKey: 'strategyStats', item: { number: '1M+', label: 'New Metric', active: true } })} variant="gold" size="sm" className="text-xs uppercase">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Stat
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.strategyStats.map((st, idx) => (
                  <div key={st.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-serif text-2xl font-bold text-luxury-gold">{st.number}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'strategyStats', item: st })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('strategyStats', st.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <span className="font-mono text-xs uppercase text-zinc-300">{st.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CORE PILLARS */}
          {contentSubTab === 'pillars' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Core Pillars ({formData.strategyPillars.length})</h3>
                <Button onClick={() => setModalConfig({ listKey: 'strategyPillars', item: { title: '', description: '', active: true } })} variant="gold" size="sm" className="text-xs uppercase">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Pillar
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.strategyPillars.map((p, idx) => (
                  <div key={p.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="font-bold text-white text-sm">{p.title}</h4>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'strategyPillars', item: p })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('strategyPillars', p.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{p.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. REACH & ROI PRESETS */}
          {contentSubTab === 'presets' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Reach & ROI Estimator Presets ({formData.strategyPresets.length})</h3>
                <Button onClick={() => setModalConfig({ listKey: 'strategyPresets', item: { presetName: 'custom', badge: 'Custom', impressions: '100K+', channel: 'Multi-Channel', focus: '', roi: 'High ROI', active: true } })} variant="gold" size="sm" className="text-xs uppercase">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Preset
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.strategyPresets.map((pr, idx) => (
                  <div key={pr.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-mono text-xs font-bold text-luxury-gold">{pr.badge}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'strategyPresets', item: pr })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('strategyPresets', pr.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="font-serif text-lg font-bold text-white">{pr.impressions}</p>
                    <p className="text-zinc-400 text-xs font-light">{pr.focus}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. LATEST INSIGHTS HEADER */}
          {contentSubTab === 'latest_header' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Latest Insights Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.latestInsights.title}
                    onChange={(e) => persistChanges({ ...formData, latestInsights: { ...formData.latestInsights, title: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Subtitle</label>
                  <input
                    type="text"
                    value={formData.latestInsights.subtitle}
                    onChange={(e) => persistChanges({ ...formData, latestInsights: { ...formData.latestInsights, subtitle: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
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
                src="http://localhost:5173/blog"
                title="Live Preview Blog"
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
              {Object.keys(modalConfig.item).filter(k => !['id', 'order', 'active', 'deleted'].includes(k)).map(key => (
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
