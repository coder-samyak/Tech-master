import React, { useState, useEffect } from "react";
import { ArrowUpRight, Users, Target } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { LuxuryCard } from "../components/LuxuryCard";
import { mediaUrl } from "../utils/media";

interface BlogProps {
  onChangePage?: (pageId: string) => void;
}

export const Blog: React.FC<BlogProps> = ({ onChangePage }) => {
  const { 
    blogsData, 
    blogHeroData, 
    featuredStrategyData, 
    strategyStatsData, 
    strategyPillarsData, 
    strategyPresetsData, 
    blogCategoriesData, 
    latestInsightsData,
  } = useData();

  const [liveBlogData, setLiveBlogData] = useState<any>(null);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/blogs`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveBlogData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Blog fetch error:", e);
      }
    };
    fetchBlogData();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const defaultBlogs = [
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
  ];

  const rawBlogs = (liveBlogData?.blogs || blogsData || localDb?.blogs || localDb?.blogsData || defaultBlogs);
  const blogsList = Array.isArray(rawBlogs) ? rawBlogs.filter((b: any) => b.active !== false && b.status !== "draft") : defaultBlogs;

  const defaultHero = {
    badge: "CREATOR JOURNAL",
    titleLine1: "Thoughts on Tech",
    titleLine2: "education & scalability.",
    active: true
  };
  const activeHero = { ...defaultHero, ...(localDb?.blogHero || {}), ...(blogHeroData || {}), ...(liveBlogData?.blogHero || {}) };

  const defaultStrategy = {
    badge: "Featured Strategy",
    titleLine1: "Engineering",
    titleLine2: "Content Marketing",
    titleLine3: "Excellence",
    description: "Traditional advertising has diminishing returns. We help engineering brands build market authority through high-utility technical content, storytelling, and high-impact distribution loops.",
    active: true
  };
  const activeStrategyData = { ...defaultStrategy, ...(localDb?.featuredStrategy || {}), ...(featuredStrategyData || {}), ...(liveBlogData?.featuredStrategy || {}) };

  const defaultStats = [
    { number: "10M+", label: "Impressions", active: true },
    { number: "+150%", label: "Engagement", active: true },
    { number: "4.8x", label: "Content ROI", active: true }
  ];
  const activeStats = (liveBlogData?.strategyStats || strategyStatsData || localDb?.strategyStats || defaultStats);

  const defaultPillars = [
    { title: "Audience Retention", description: "Translate complex system architecture into clean narratives.", active: true },
    { title: "Search Dominance", description: "Rank first for high-intent queries that developers actually search.", active: true },
    { title: "Distribution Loops", description: "Syndicate deep-dives into social threads, shorts, and digests.", active: true }
  ];
  const activePillars = (liveBlogData?.strategyPillars || strategyPillarsData || localDb?.strategyPillars || defaultPillars);

  const defaultPresets = [
    { presetName: "solopreneur", badge: "Solo Creator", impressions: "50K - 100K+", channel: "Twitter/X, Dev.to & LinkedIn", focus: "Build in public, share raw learnings, create highly readable dev cheatsheets.", roi: "High authority, premium lead acquisition", active: true },
    { presetName: "startup", badge: "Growth Startup", impressions: "250K - 500K+", channel: "GitHub, Medium, Tech Newsletters", focus: "Detailed technical case studies, comparisons, integration guides, and live streams.", roi: "Product signups, community growth", active: true },
    { presetName: "enterprise", badge: "Enterprise Brand", impressions: "1M - 5M+", channel: "YouTube Documentaries, Dedicated Hubs", focus: "High-production whitepapers, engineering-led media channels.", roi: "Market standard positioning, enterprise adoption", active: true }
  ];
  const rawPresets = (liveBlogData?.strategyPresets || strategyPresetsData || localDb?.strategyPresets || defaultPresets);
  const presets = Array.isArray(rawPresets) ? rawPresets.filter((p: any) => p.active !== false) : defaultPresets;

  const defaultCategories = [
    { name: "All" }, { name: "Lifestyle" }, { name: "Marketing" }, { name: "Branding" }, { name: "Creator Journey" }, { name: "Tips" }, { name: "Latest News" }
  ];
  const rawCategories = (liveBlogData?.blogCategories || blogCategoriesData || localDb?.blogCategories || defaultCategories);
  const validCategories = Array.isArray(rawCategories) ? rawCategories : defaultCategories;
  const categories = [{ name: "All" }, ...validCategories.filter((c: any) => c.name !== "All" && c.active !== false)];

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeStrategyPreset, setActiveStrategyPreset] = useState<string>("");

  useEffect(() => {
    if (presets.length > 0 && !activeStrategyPreset) {
      setActiveStrategyPreset(presets[0].presetName || presets[0].id);
    }
  }, [presets, activeStrategyPreset]);

  const activePresetItem = presets.find((p: any) => p.presetName === activeStrategyPreset || p.id === activeStrategyPreset) || presets[0] || {};

  const filteredBlogs = selectedCategory === "All"
    ? blogsList
    : blogsList.filter((post: any) => post.category === selectedCategory);

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      {activeHero.active !== false && (
        <section className="max-w-7xl mx-auto text-left mb-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="typo-badge mb-4 uppercase tracking-[2px]"
          >
            {activeHero.badge || "CREATOR JOURNAL"}
          </motion.div>
          
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
            {activeHero.titleLine1 || "Thoughts on Tech"} <br />
            <span className="text-gold italic font-bold">{activeHero.titleLine2 || "education & scalability."}</span>
          </h1>
        </section>
      )}

      {/* Content Marketing Section / Strategy Builder */}
      {activeStrategyData.active !== false && (
        <section className="max-w-7xl mx-auto mb-12 relative z-10 text-left">
          <div className="border border-white/5 bg-black/40 backdrop-blur-md rounded-3xl p-8 md:p-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div>
                <div className="typo-badge mb-3 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" />
                  {activeStrategyData.badge || "Featured Strategy"}
                </div>
                <h2 className="font-serif text-2xl sm:text-4xl font-light text-white leading-snug">
                  {activeStrategyData.titleLine1} <span className="text-gold font-bold italic">{activeStrategyData.titleLine2}</span> {activeStrategyData.titleLine3}
                </h2>
                <p className="text-gray-400 text-sm max-w-2xl mt-4 font-light leading-relaxed">
                  {activeStrategyData.description}
                </p>
              </div>
              
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 border-t md:border-t-0 md:border-l border-white/10 pt-6 md:pt-0 md:pl-10">
                {activeStats.filter((s: any) => s.active !== false).map((stat: any, idx: number) => (
                  <div key={idx} className="text-left">
                    <div className="text-xl sm:text-2xl font-serif text-gold font-bold">{stat.number}</div>
                    <div className="text-[9px] text-gray-500 uppercase tracking-widest font-mono mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pillars and Strategy Planner Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Core Pillars */}
              <div className="lg:col-span-7 flex flex-col justify-between gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activePillars.filter((p: any) => p.active !== false).map((pillar: any, index: number) => (
                    <div key={index} className="border border-white/5 bg-white/[0.02] p-6 rounded-2xl flex flex-col justify-between hover:border-white/10 transition-colors">
                      <div>
                        <div className="mb-4 bg-gold/10 w-9 h-9 rounded-xl flex items-center justify-center">
                          <Users className="w-5 h-5 text-gold" />
                        </div>
                        <h4 className="font-sans text-sm font-semibold text-white mb-2">{pillar.title}</h4>
                      </div>
                      <p className="text-gray-400 text-xs font-light leading-relaxed mt-2">{pillar.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Strategy Planner */}
              {presets.length > 0 && (
                <div className="lg:col-span-5 border border-white/5 bg-white/[0.02] rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-[2px]">Reach & ROI Estimator</span>
                    </div>
                    
                    {/* Toggles */}
                    <div className="flex bg-black/40 p-1 rounded-xl gap-1 mb-6 border border-white/5">
                      {presets.map((preset: any) => (
                        <button
                          key={preset.presetName || preset.id}
                          onClick={() => setActiveStrategyPreset(preset.presetName || preset.id)}
                          className={`flex-1 text-[10px] sm:text-xs font-semibold py-2 rounded-lg transition-all duration-300 cursor-pointer ${
                            activeStrategyPreset === (preset.presetName || preset.id)
                              ? "bg-gold text-black shadow-lg shadow-gold/10 font-bold"
                              : "text-gray-400 hover:text-white"
                          }`}
                        >
                          {preset.badge}
                        </button>
                      ))}
                    </div>

                    {/* Estimate details */}
                    <div className="space-y-4 text-left">
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Estimated Monthly Reach</span>
                        <div className="text-2xl sm:text-3xl font-serif text-white font-bold mt-1">
                          {activePresetItem.impressions}
                        </div>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Primary Channels</span>
                        <span className="text-xs text-gold font-mono block mt-1">
                          {activePresetItem.channel}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] text-gray-500 uppercase tracking-widest font-mono block">Content Focus</span>
                        <p className="text-xs text-gray-300 leading-relaxed font-light mt-1">
                          {activePresetItem.focus}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer row inside planner */}
                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                    <span className="text-[9px] text-gray-500 uppercase font-mono">ROI: {activePresetItem.roi}</span>
                    <span className="text-[10px] text-gold uppercase tracking-[1px] font-bold">Strategy Verified</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Main Blog Hub */}
      <section className="max-w-7xl mx-auto text-left relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 pb-6 mb-10 gap-6">
          <div>
            <h2 className="font-serif text-3xl font-light">
              {latestInsightsData?.title || localDb?.latestInsights?.title || "Latest Insights"}
            </h2>
            <p className="text-gray-400 text-xs mt-1 font-light">
              {latestInsightsData?.subtitle || localDb?.latestInsights?.subtitle || "Browse thoughts, guides, and updates from the team"}
            </p>
          </div>
          
          {/* Category Filter Bar */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category: any) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-xs transition-all duration-300 cursor-pointer ${
                  selectedCategory === category.name
                    ? "bg-gold text-black font-semibold border border-gold"
                    : "bg-white/[0.03] border border-white/5 hover:border-white/20 text-gray-300 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog List Grid */}
      <section className="max-w-7xl mx-auto text-left relative z-10">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-white/10 rounded-3xl">
            <p className="text-gray-400 text-sm">No articles found in this category.</p>
            <button
              onClick={() => setSelectedCategory("All")}
              className="text-gold text-xs uppercase tracking-[1.5px] font-bold mt-4 hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredBlogs.map((post: any, idx: number) => (
                <motion.div
                  key={post.id || post.slug || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <LuxuryCard accentColor="#D4AF37" index={idx}>
                    <div onClick={() => onChangePage && onChangePage(`blog-details/${post.slug || post.id}`)} className="flex flex-col h-full justify-between block w-full h-full cursor-pointer relative z-20">
                      <div>
                        <div className="aspect-video w-full overflow-hidden border-b border-white/5 relative rounded-2xl mb-6">
                          <img
                            src={mediaUrl(post.coverImage) || mediaUrl(post.image) || mediaUrl(post.imageUrl) || ""}
                            alt={post.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                            data-cursor="read"
                          />
                        </div>

                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] font-mono text-gold font-bold uppercase tracking-[1px]">{post.category || (post.tags && post.tags[0])}</span>
                          <span className="text-[9px] text-gray-400 font-mono uppercase">{post.publishDate || post.date}</span>
                        </div>

                        <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors duration-300 mb-3 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6 line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 flex justify-between items-center border-t border-white/5 mt-auto pointer-events-none">
                        <span className="text-[10px] text-gray-400 uppercase tracking-[1px]">{post.readTime}</span>
                        <div className="text-gold group-hover:text-white transition-colors duration-300 flex items-center gap-1 text-xs font-bold uppercase tracking-[1.5px]">
                          Read Article
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </LuxuryCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>
    </div>
  );
};
