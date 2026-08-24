import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import { ChevronLeft, ChevronRight } from "lucide-react";

const YoutubeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);



const CHANNEL_SOCIAL_LINKS: Record<string, { youtube?: string; instagram?: string }> = {
  "Tech Master": {
    youtube: "https://www.youtube.com/@techmasterhq",
    instagram: "https://www.instagram.com/techmasterco/?hl=en"
  },
  "Next Univerz": {
    youtube: "https://www.youtube.com/@NextUniverz",
    instagram: "https://www.instagram.com/NextUniverz/"
  },
  "Master Wheels": {
    youtube: "https://www.youtube.com/@MasterWheelsAK",
    instagram: "https://www.instagram.com/masterwheel1/"
  },
  "Full Circle": {
    youtube: "https://www.youtube.com/@fullcircle_in",
    instagram: "https://www.instagram.com/fullcircle_in/"
  },
  "Trendz Talk": {
    youtube: "",
    instagram: ""
  }
};

const getSocialLinks = (ch: any) => {
  const rawName = (ch.keyName || ch.name || "").replace(/^\d+\.\s*/, "").trim();
  const known = CHANNEL_SOCIAL_LINKS[rawName] || CHANNEL_SOCIAL_LINKS[ch.name] || {};
  
  // Prioritize Admin Dashboard / Database fields first!
  const youtube = ch.youtubeLink || ch.youtubeUrl || ch.youtube || ch.ytLink || ch.ytUrl || (ch.link?.includes("youtube") || ch.link?.includes("youtu.be") ? ch.link : "") || (ch.url?.includes("youtube") || ch.url?.includes("youtu.be") ? ch.url : "") || known.youtube || "";

  const instagram = ch.instagramLink || ch.instagramUrl || ch.instagram || ch.igLink || ch.igUrl || (ch.link?.includes("instagram") ? ch.link : "") || (ch.url?.includes("instagram") ? ch.url : "") || (ch.link && !ch.link.includes("youtube") ? ch.link : "") || (ch.url && !ch.url.includes("youtube") ? ch.url : "") || known.instagram || "";

  return { youtube, instagram };
};



const getChannelCircleImage = (clientOrChannelName: string, channelObj?: any, liveData?: any, activeDb?: any) => {
  const name = (clientOrChannelName || "").trim().toLowerCase();

  if (name.includes("tech master") || name.includes("techmaster")) return "/TechMaster.jpeg";
  if (name.includes("next univerz") || name.includes("nextuniverz")) return "/NextUniverz.jpeg";
  if (name.includes("master wheels") || name.includes("masterwheels") || name.includes("wheels")) return "/MasterWheels.jpeg";
  if (name.includes("full circle") || name.includes("fullcircle")) return "/First circle.jpg.jpeg";
  if (name.includes("trendz talk") || name.includes("trendztalk") || name.includes("trendz")) return "/Trendz talk logo.png";

  if (channelObj) {
    const directImg = channelObj.circleImage || channelObj.logoUrl || channelObj.image || channelObj.imageUrl;
    if (directImg) return mediaUrl(directImg);
  }

  const allTickerChannels = [
    ...(liveData?.channelsTicker?.channels || []),
    ...(liveData?.channels || []),
    ...(activeDb?.channelsTicker?.channels || []),
    ...(activeDb?.multiverseChannels || []),
    ...(activeDb?.channels || [])
  ];

  const found = allTickerChannels.find((c: any) => {
    const cName = (c.brandName || c.keyName || c.name || c.title || "").trim().toLowerCase();
    return cName && (name.includes(cName) || cName.includes(name));
  });

  if (found) {
    const img = found.circleImage || found.logoUrl || found.image || found.imageUrl;
    if (img) return mediaUrl(img);
  }

  return "/TechMaster.jpeg";
};

export const Portfolio: React.FC = () => {
  const { dbData } = useData();
  const [selectedChannel, setSelectedChannel] = useState("Tech Master");
  const [livePortfolioData, setLivePortfolioData] = useState<any>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://techmasterbackend.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/portfolio`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLivePortfolioData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Portfolio fetch error:", e);
      }
    };
    fetchPortfolio();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const activeDb = { ...localDb, ...dbData };

  const rawHero = livePortfolioData?.hero || activeDb?.portfolioHero || activeDb?.portfolioCMS?.hero;
  
  const heroData = {
    badge: (rawHero?.badge && !rawHero.badge.includes("MASTERPIECES")) ? rawHero.badge : "CREATIVE ECOSYSTEM",
    title: (rawHero?.title && rawHero.title !== "MASTERPIECES") ? rawHero.title : "The",
    highlightText: (rawHero?.highlightText || rawHero?.highlightedTitle) ? (rawHero.highlightText || rawHero.highlightedTitle) : "Multiverse",
    description: ((rawHero?.description && !rawHero.description.includes("executive content management platform")) 
      ? rawHero.description 
      : "Masterpieces In Motion — Our portfolio of 5 high-scale content channels spanning technology, automotive, podcasts, and viral entertainment.").replace(/Masterpieces\./g, "Masterpieces")
  };

  const defaultChannels = [
    {
      id: "ch-1",
      keyName: "Tech Master",
      name: "1. Tech Master",
      desc: "Making tech simple, relatable, and impossible to ignore - through humor, honesty, and real stories anyone can feel. And we're just getting started.",
      stats: ["33M Subs on YT", "5.8M Followers on IG"],
      ytSubs: "33M Subs on YT",
      igFollowers: "5.8M Followers on IG",
      popular: "195M (Short) • 219M (Reel)",
      link: "https://www.youtube.com/@techmasterhq",
      accent: "#D4AF37"
    },
    {
      id: "ch-2",
      keyName: "Next Univerz",
      name: "2. Next Univerz",
      desc: "Where curiosity meets the unknown. Next Univerz goes beyond typical tech content - exploring cutting-edge innovation and hidden corners of the world most channels never reach.",
      stats: ["5.5M Subs on YT"],
      ytSubs: "5.5M Subs on YT",
      igFollowers: "",
      popular: "88M (Shorts) • 4.6M (Long)",
      link: "https://www.youtube.com/@NextUniverz",
      accent: "#00E5FF"
    },
    {
      id: "ch-3",
      keyName: "Master Wheels",
      name: "3. Master Wheels",
      desc: "India's auto culture, from every angle. Reviews. Road trips. Modifications. Ownership stories. The full Experience",
      stats: ["4.6M Subs on YT", "1.2M Followers on IG"],
      ytSubs: "4.6M Subs on YT",
      igFollowers: "1.2M Followers on IG",
      popular: "1.7M (Long) • 148M (Short) • 70M (Reel)",
      link: "https://www.youtube.com/@MasterWheelsAK",
      accent: "#FF3366"
    },
    {
      id: "ch-4",
      keyName: "Full Circle",
      name: "4. Full Circle",
      desc: "Experiences most people only dream about. Full Circle goes further than most channels are willing to. Challenges. Experiments. No limits.",
      stats: ["300K Subs on YT"],
      ytSubs: "300K Subs on YT",
      igFollowers: "",
      popular: "2M (Short)",
      link: "https://www.youtube.com/@fullcircle_in",
      accent: "#AA3BFF"
    }
  ];

  const rawChannels = livePortfolioData?.channels || activeDb?.multiverseChannels || activeDb?.portfolioCMS?.channels || defaultChannels;
  const channels = (Array.isArray(rawChannels) && rawChannels.length > 0 ? rawChannels : defaultChannels)
    .filter((c: any) => c.visible !== false && !c.deleted)
    .filter((c: any) => {
      const name = (c.name || c.keyName || "").toLowerCase();
      return !name.includes("trendz");
    });

  const currentChannelIndex = channels.findIndex((c: any) => {
    const rawName = (c.keyName || c.name || "").replace(/^\d+\.\s*/, "").trim();
    return rawName.toLowerCase() === selectedChannel.toLowerCase();
  });

  const handlePrevChannel = () => {
    if (channels.length === 0) return;
    const activeIdx = currentChannelIndex >= 0 ? currentChannelIndex : 0;
    const prevIdx = (activeIdx - 1 + channels.length) % channels.length;
    const rawName = (channels[prevIdx].keyName || channels[prevIdx].name || "").replace(/^\d+\.\s*/, "").trim();
    setSelectedChannel(rawName);
  };

  const handleNextChannel = () => {
    if (channels.length === 0) return;
    const activeIdx = currentChannelIndex >= 0 ? currentChannelIndex : 0;
    const nextIdx = (activeIdx + 1) % channels.length;
    const rawName = (channels[nextIdx].keyName || channels[nextIdx].name || "").replace(/^\d+\.\s*/, "").trim();
    setSelectedChannel(rawName);
  };

  return (
    <div className="relative text-white min-h-screen pt-24 pb-16 px-6 overflow-hidden bg-black">
      {/* Background radial overlay */}
      <div className="absolute top-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4 text-gold"
        >
          {heroData.badge}
        </motion.div>
        
        <h1 className="typo-h1 mb-6">
          {heroData.title} <span className="text-gold italic font-bold">{heroData.highlightText}</span>
        </h1>
        <p className="text-gray-300 text-base md:text-lg font-light max-w-2xl leading-relaxed">
          {heroData.description}
        </p>
      </section>

      {/* 1. CHANNEL FILTER BUTTONS BAR */}
      <section className="max-w-7xl mx-auto mb-8 relative z-10">
        <div className="flex flex-wrap gap-2.5 items-center">
          {channels.map((ch: any) => {
            const rawName = (ch.keyName || ch.name || "").replace(/^\d+\.\s*/, "").trim();
            const isSelected = selectedChannel.toLowerCase() === rawName.toLowerCase();
            return (
              <button
                key={ch.id || ch.name}
                onClick={() => setSelectedChannel(rawName)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-[1.5px] border transition-all duration-300 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-gold border-gold text-black shadow-[0_0_20px_rgba(212,175,55,0.3)] font-black"
                    : "bg-[#0d0d0d] border-white/10 text-gray-400 hover:border-gold/40 hover:text-white"
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ch.accent || '#D4AF37' }} />
                {rawName}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. DYNAMIC CENTERED CHANNEL CARDS DISPLAY WITH CIRCULAR NAVIGATION */}
      <section className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="relative flex items-center justify-center max-w-4xl mx-auto px-2 sm:px-12">
          {/* Previous Channel Circular Button */}
          {channels.length > 1 && (
            <button
              onClick={handlePrevChannel}
              className="absolute left-0 sm:left-2 md:-left-4 z-30 p-2.5 sm:p-3 rounded-full border border-gold/40 hover:border-gold hover:scale-110 bg-black/80 hover:bg-black text-gold backdrop-blur-md transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer flex items-center justify-center"
              aria-label="Previous channel"
              title="Previous Channel"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            </button>
          )}

          {/* Single Centered Channel Card */}
          <div className="w-full max-w-xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedChannel}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full"
              >
                {(() => {
                  const ch = channels.find((c: any) => {
                    const rawName = (c.keyName || c.name || "").replace(/^\d+\.\s*/, "").trim();
                    return rawName.toLowerCase() === selectedChannel.toLowerCase();
                  }) || channels[0];
                  
                  const channelStats = Array.isArray(ch.stats) 
                    ? ch.stats 
                    : [ch.ytSubs, ch.igFollowers].filter(Boolean);

                  return (
                    <div className="glass-panel p-8 sm:p-10 rounded-3xl border-2 border-gold/50 shadow-[0_0_50px_rgba(212,175,55,0.25)] bg-black/85 backdrop-blur-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-5">
                          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">{ch.name}</h3>
                          
                          {/* Right Side Circular Channel Image Badge with Enhanced Brightness */}
                          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-gold/60 shadow-[0_0_20px_rgba(212,175,55,0.4)] bg-black shrink-0 group/circle flex items-center justify-center">
                            <img
                              src={getChannelCircleImage(ch.name || ch.keyName, ch, livePortfolioData, activeDb)}
                              alt={`${ch.name} Circle`}
                              className="w-full h-full object-cover rounded-full opacity-95 brightness-110 contrast-105 group-hover/circle:opacity-100 group-hover/circle:scale-110 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2.5 mb-5">
                          {channelStats.map((st: string, i: number) => (
                            <span key={i} className="px-4 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold text-xs font-mono font-bold">
                              {st}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed mb-6">
                          {(() => {
                            const lowName = (ch.name || "").toLowerCase();
                            if (lowName.includes("tech master")) {
                              return "Making tech simple, relatable, and impossible to ignore - through humor, honesty, and real stories anyone can feel. And we're just getting started.";
                            }
                            if (lowName.includes("next univerz")) {
                              return "Where curiosity meets the unknown. Next Univerz goes beyond typical tech content - exploring cutting-edge innovation and hidden corners of the world most channels never reach.";
                            }
                            if (lowName.includes("master wheels") || lowName.includes("wheels")) {
                              return "India's auto culture, from every angle. Reviews. Road trips. Modifications. Ownership stories. The full Experience";
                            }
                            if (lowName.includes("full circle") || lowName.includes("fullcircle")) {
                              return "Experiences most people only dream about. Full Circle goes further than most channels are willing to. Challenges. Experiments. No limits.";
                            }
                            if (lowName.includes("trendz talk") || lowName.includes("trendztalk") || lowName.includes("trendz")) {
                              return "Complex ideas, made visual. TrendzTalk breaks down engineering, technology, and the facts most people never stop to think about - one animation at a time.";
                            }
                            return ch.desc || ch.description || "";
                          })()}
                        </p>
                        {ch.popular && (
                          <div className="text-xs font-mono text-gray-300 bg-black/60 p-4 rounded-2xl border border-white/10 mb-6">
                            <span className="text-gold uppercase tracking-wider block text-[10px] mb-1 font-bold">MOST POPULAR:</span>
                            <span className="text-white font-semibold text-sm">{ch.popular}</span>
                          </div>
                        )}
                      </div>

                      {/* Circular Social Buttons (YouTube & Instagram - Grey Theme) */}
                      {(() => {
                        const social = getSocialLinks(ch);
                        return (
                          <div className="flex items-center gap-3 pt-2">
                            {social.youtube && (
                              <a
                                href={social.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Visit YouTube Channel"
                                onClick={(e) => e.stopPropagation()}
                                className="w-11 h-11 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center shadow-md group/btn cursor-pointer"
                              >
                                <YoutubeIcon className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                              </a>
                            )}
                            {social.instagram && (
                              <a
                                href={social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Visit Instagram Page"
                                onClick={(e) => e.stopPropagation()}
                                className="w-11 h-11 rounded-full border border-white/15 bg-white/5 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/40 transition-all duration-300 flex items-center justify-center shadow-md group/btn cursor-pointer"
                              >
                                <InstagramIcon className="w-5 h-5 transition-transform duration-300 group-hover/btn:scale-110" />
                              </a>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Channel Circular Button */}
          {channels.length > 1 && (
            <button
              onClick={handleNextChannel}
              className="absolute right-0 sm:right-2 md:-right-4 z-30 p-2.5 sm:p-3 rounded-full border border-gold/40 hover:border-gold hover:scale-110 bg-black/80 hover:bg-black text-gold backdrop-blur-md transition-all shadow-[0_0_20px_rgba(212,175,55,0.2)] cursor-pointer flex items-center justify-center"
              aria-label="Next channel"
              title="Next Channel"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
