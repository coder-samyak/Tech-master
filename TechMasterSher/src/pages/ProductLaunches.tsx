import React from "react";
import { motion } from "framer-motion";
import { Laptop, Terminal, Layers, ArrowUpRight, Cpu } from "lucide-react";
import { LuxuryCard } from "../components/LuxuryCard";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";

const iconMap: Record<string, React.ReactNode> = {
  Laptop: <Laptop className="w-6 h-6 text-gold" />,
  Terminal: <Terminal className="w-6 h-6 text-electric-blue" />,
  Layers: <Layers className="w-6 h-6 text-royal-purple" />,
  Cpu: <Cpu className="w-6 h-6 text-gold" />,
};

export const ProductLaunches: React.FC = () => {
  const { launchesData } = useData();
  const [liveLaunchesData, setLiveLaunchesData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/product-launches`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveLaunchesData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct ProductLaunches fetch error:", e);
      }
    };
    fetchLaunches();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const defaultLaunches = {
    hero: {
      smallBadge: "SOFTWARE RELEASES",
      headline: "Product Launches &",
      highlightWord: "Tech Innovations",
      description: "We construct platforms, terminal tools, and architectural sandbox spaces to help learners visual and configure engineering problems."
    },
    products: [
      {
        icon: "Laptop",
        title: "MasterClass App v2",
        tagline: "Gamified Interactive Code Learning",
        description: "Our core dashboard offering browser-based shell access, sandboxed docker execution, and step-by-step challenges covering system architectures.",
        status: "Active Launch",
        accent: "#D4AF37"
      },
      {
        icon: "Terminal",
        title: "DevEnv CLI utility",
        tagline: "Speed Up Local Node Configuration",
        description: "A fast terminal CLI utility that builds customized, performant TS, Vite, and tailwind stacks in seconds, downloaded 80k+ times.",
        status: "Open Source",
        accent: "#00E5FF"
      },
      {
        icon: "Layers",
        title: "System Sandbox Hub",
        tagline: "Interactive AWS & Docker diagrams",
        description: "A digital workspace where students can construct multi-tier architectures visually, export them, and trigger test loads.",
        status: "Beta Testing",
        accent: "#aa3bff"
      }
    ],
    featureVideo: {
      smallBadge: "LATEST LAUNCH VIDEO",
      headline: "MasterClass v2 Platform Launch Walkthrough",
      description: "Watch Aman demonstrate the sandboxed docker containers, web terminals, and the multiplayer live coding rooms that make learning code feel like a cooperative MMO game.",
      trailerBtnText: "Play Trailer",
      notesBtnText: "View Launch Notes",
      thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80"
    },
    initiatives: [
      { title: "Launch Events", description: "Hosting high-energy digital and physical events to unveil new platforms, creating massive day-one adoption and community buzz." },
      { title: "Product Promotions", description: "Strategic marketing pushes that position developer tools directly in front of their ideal user base through trusted channels." },
      { title: "Brand Launches", description: "End-to-end support for introducing new technology brands to the market, establishing authority and developer trust instantly." },
      { title: "Campaign Videos", description: "Cinematic, deep-dive promotional videos that explain complex software architectures in a visually stunning and digestible format." },
      { title: "Results", description: "We measure our success by tangible impact: tens of thousands of active accounts created, millions of impressions, and sustained engagement long after the initial launch phase ends." }
    ]
  };

  const hero = { ...defaultLaunches.hero, ...(localDb?.launchesData?.hero || {}), ...(launchesData?.hero || {}), ...(liveLaunchesData?.hero || {}) };

  const rawProducts = (liveLaunchesData?.products || launchesData?.products || localDb?.launchesData?.products || defaultLaunches.products);
  const validProducts = (Array.isArray(rawProducts) && rawProducts.length > 0) ? rawProducts : defaultLaunches.products;

  const products = validProducts.map((prod: any) => ({
    icon: iconMap[prod.icon] || <Laptop className="w-6 h-6 text-gold" />,
    title: prod.title,
    tagline: prod.tagline,
    description: prod.description,
    status: prod.status || "Active Launch",
    accent: prod.accent || prod.accentColor || "#D4AF37"
  }));

  const featureVideo = { ...defaultLaunches.featureVideo, ...(localDb?.launchesData?.featureVideo || {}), ...(launchesData?.featureVideo || {}), ...(liveLaunchesData?.featureVideo || {}) };

  const rawInitiatives = (liveLaunchesData?.initiatives || launchesData?.initiatives || localDb?.launchesData?.initiatives || defaultLaunches.initiatives);
  const validInitiatives = (Array.isArray(rawInitiatives) && rawInitiatives.length > 0) ? rawInitiatives : defaultLaunches.initiatives;

  const initiatives = validInitiatives.filter((init: any) => init.visible !== false && init.status !== "Inactive");

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="typo-badge mb-4 uppercase tracking-[2px]"
        >
          {hero.smallBadge || "SOFTWARE RELEASES"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="typo-h2 mb-6"
        >
          {hero.headline || "Product Launches &"} <br />
          <span className="text-gold italic font-bold">{hero.highlightWord || "Tech Innovations"}</span> {hero.titleLine2 || ""}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          {hero.description}
        </motion.p>
      </div>

      {/* Product launch items */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((prod: any, idx: number) => (
            <LuxuryCard key={idx} accentColor={prod.accent} index={idx}>
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-12 rounded-full border border-white/5 bg-white/5 flex items-center justify-center group-hover:border-gold/30 transition-colors duration-300">
                  {prod.icon}
                </div>
                <span className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[9px] uppercase tracking-[1px] font-mono text-gold">
                  {prod.status}
                </span>
              </div>

              <div className="mb-6 text-left">
                <h3 className="font-serif text-2xl text-white font-medium mb-1 group-hover:text-gold transition-colors duration-300">
                  {prod.title}
                </h3>
                <span className="text-gray-400 text-[10px] uppercase tracking-[1.5px] font-mono">
                  {prod.tagline}
                </span>
              </div>

              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-8 text-left">
                {prod.description}
              </p>

              <button className="w-full py-3 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-[2.5px] hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center gap-2 mt-auto cursor-pointer">
                Explore Tool <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </LuxuryCard>
          ))}
        </div>

        {/* Feature section video */}
        {featureVideo.visible !== false && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0 }}
            className="glass-panel p-8 md:p-12 rounded-3xl mt-12 text-left max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center"
          >
            <div className="md:w-2/3">
              <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-2">{featureVideo.smallBadge || "LATEST LAUNCH VIDEO"}</span>
              <h3 className="font-serif text-3xl font-light text-white mb-4 leading-tight">
                {featureVideo.headline || "MasterClass v2 Platform Launch Walkthrough"}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-6">
                {featureVideo.description}
              </p>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-white text-black font-bold uppercase text-[10px] tracking-[2px] rounded-full hover:bg-gold transition-all duration-300 cursor-pointer">
                  {featureVideo.trailerBtnText || "Play Trailer"}
                </button>
                <button className="px-6 py-3 border border-white/20 text-white font-bold uppercase text-[10px] tracking-[2px] rounded-full hover:border-white transition-all duration-300 cursor-pointer">
                  {featureVideo.notesBtnText || "View Launch Notes"}
                </button>
              </div>
            </div>

            <div className="md:w-1/3 w-full aspect-video rounded-2xl overflow-hidden border border-white/5 relative">
              <img
                src={mediaUrl(featureVideo.thumbnailUrl) || mediaUrl(featureVideo.thumbnail) || mediaUrl(featureVideo.coverImage) || "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80"}
                alt="Launch Thumbnail"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Cpu className="w-8 h-8 text-gold animate-pulse" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Product Launch Highlights */}
        {initiatives.length > 0 && (
          <section className="max-w-7xl mx-auto mt-16 text-left relative z-10 px-6">
            <div className="text-center mb-16">
              <p className="typo-badge mb-4">OUR WORK</p>
              <h2 className="typo-h2 mb-6">
                Launch <span className="text-gold italic font-bold">Initiatives</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {initiatives.map((init: any, idx: number) => (
                <div key={idx} className={`glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 ${idx === initiatives.length - 1 && initiatives.length % 3 === 2 ? 'lg:col-span-2' : ''}`}>
                  <h3 className="font-serif text-xl font-bold text-white mb-3">{init.title}</h3>
                  <p className="typo-card-desc">
                    {init.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};
