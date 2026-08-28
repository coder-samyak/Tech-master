import React from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import coverImg from "../assets/Cover.jpeg";

export const About: React.FC = () => {
  const { aboutData } = useData();
  const [liveAbout, setLiveAbout] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchAbout = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/about`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveAbout(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct About fetch error:", e);
      }
    };
    fetchAbout();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const rawAbout = liveAbout?.value || liveAbout || aboutData || localDb?.about || {};
  const aboutDataAny = (rawAbout as any) || {};

  // Extract Section 1 (About Tech Master)
  const aboutTechMaster = aboutDataAny?.aboutTechMaster || {
    smallBadge: "ABOUT TECH MASTER",
    mainHeading: "What Tech Master Is",
    highlightedHeading: "Tech Master",
    description: "It started in 2019 one person, one channel, and a belief that tech content in India could be smarter than it was. That belief became Tech Master, and by 2023, it had become a company. Today, Tech Master Digital Pvt Ltd is a 50+ person team running four established channels across tech, automobiles, and entertainment with a fifth already taking shape in 3D animation out of a full production studio in Jaipur, complete with an in-house editing suite, animation team, and gaming studio. Today our content generates 1B+ views every month.",
    visibility: true,
    order: 1
  };

  // Extract Section 2 (Company Culture)
  const culture = aboutDataAny?.culture || {
    smallBadge: "OUR CULTURE",
    mainHeading: "Good People.",
    highlightedText: "Good Work. Good Vibes",
    description: "Ideas get clashed over here, not because we're trying to prove a point, but because everyone actually cares. We push each other, we push ourselves but nobody's burning out to do it. Somewhere between the deadlines and the chai breaks, this team just falls into a rhythm.",
    visibility: true,
    order: 2
  };

  // Extract Section 3 (Studio / Image Card)
  const studioCard = aboutDataAny?.studioCard || {
    imageUrl: culture.imageUrl || aboutDataAny?.story?.imageUrl || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    imageAlt: culture.imageAlt || "Tech Master Team",
    imageSubtitle: culture.imageSubtitle || "Jaipur Studio",
    imageDescription: culture.imageDescription || "50+ Person Production & Gaming Suite",
    overlayCaption: culture.overlayCaption || "",
    visibility: true,
    order: 3
  };

  // Extract Section 4 (Founder Philosophy)
  const philosophy = aboutDataAny?.philosophy || {
    smallBadge: "FOUNDER PHILOSOPHY",
    quote: aboutDataAny?.philosophy?.description || "Information is Wealth.",
    description: "Information is Wealth.",
    founderName: "Tech Master Founder",
    founderDesignation: "Founder & CEO",
    profileImageUrl: aboutDataAny?.introduction?.profileImageUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
    showDivider: true,
    visibility: true,
    order: 4
  };

  const studioImgUrl = mediaUrl(studioCard.imageUrl || culture.imageUrl || aboutDataAny?.story?.imageUrl) || "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";
  const founderImgUrl = mediaUrl(philosophy.profileImageUrl || philosophy.imageUrl || philosophy.image || aboutDataAny?.introduction?.profileImageUrl) || coverImg;

  return (
    <div className="relative text-white min-h-screen pt-28 pb-16 px-6 overflow-hidden bg-black">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 w-[60vw] h-[60vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-15 pointer-events-none translate-x-1/2 translate-y-1/2" />

      <div className="max-w-6xl mx-auto space-y-10 sm:space-y-24 relative z-10">

        {/* 1. Founder Philosophy (FIRST SECTION: Image on Left, Content Card on Right) */}
        {philosophy.visibility !== false && philosophy.status !== "Draft" && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column: Clean Image Container WITHOUT Any Text Overlay */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden border border-gold/30 shadow-[0_0_40px_rgba(212,175,55,0.2)] h-[380px] sm:h-[480px] md:h-[520px] w-full"
            >
              <img
                src={founderImgUrl}
                alt={philosophy.founderName || "Tech Master Founder"}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>

            {/* Right Column: Glass Card with Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold/30 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(212,175,55,0.1)] h-full min-h-[380px] sm:min-h-[480px]"
            >
              <span className="text-gold font-mono text-xs sm:text-sm tracking-[4px] uppercase font-bold mb-4 block text-center">
                {philosophy.smallBadge || "FOUNDER PHILOSOPHY"}
              </span>

              <blockquote className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-normal italic leading-tight mb-6 text-center max-w-xl">
                "{philosophy.quote || philosophy.description || "Information is Wealth."}"
              </blockquote>

              {philosophy.showDivider !== false && (
                <div className="w-16 h-1 bg-gold rounded-full shadow-[0_0_12px_rgba(212,175,55,0.8)] mb-6 mx-auto" />
              )}

              <p className="text-gold font-mono text-xs sm:text-sm tracking-[2px] uppercase font-bold text-center">
                — {philosophy.founderName || "Tech Master Founder"} {philosophy.founderDesignation ? `(${philosophy.founderDesignation})` : ""}
              </p>
            </motion.div>
          </section>
        )}

        {/* 2. Header & Company Story */}
        {aboutTechMaster.visibility !== false && aboutTechMaster.status !== "Draft" && (
          <section className="text-center max-w-4xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="typo-badge mb-4 uppercase inline-block"
            >
              {aboutTechMaster.smallBadge || "ABOUT TECH MASTER"}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass-panel p-8 sm:p-12 rounded-3xl border border-gold/30 bg-black/50 backdrop-blur-xl text-left shadow-[0_0_40px_rgba(212,175,55,0.1)]"
            >
              <div 
                className="text-gray-300 font-light text-base sm:text-lg leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: aboutTechMaster.description || "" }}
              />
            </motion.div>
          </section>
        )}

        {/* 3. Team Culture & Studio Image Card Section */}
        {(culture.visibility !== false || studioCard.visibility !== false) && (
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {culture.visibility !== false && culture.status !== "Draft" && (
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-gold/30 transition-all duration-300"
              >
                <span className="typo-badge mb-4 block uppercase">{culture.smallBadge || "OUR CULTURE"}</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-white font-bold mb-6">
                  {culture.mainHeading || "Good People."} <span className="text-gold italic font-normal">{culture.highlightedText || "Good Work. Good Vibes"}</span>
                </h2>
                <div 
                  className="text-gray-300 font-light text-base leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: (culture.description || "").replace(/Good People\.\s*Good Work\.\s*Good Vibes/gi, "").trim() }}
                />
              </motion.div>
            )}

            {studioCard.visibility !== false && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative rounded-3xl overflow-hidden border border-gold/20 shadow-2xl h-[380px]"
              >
                <img
                  src={studioImgUrl}
                  alt={culture.imageAlt || studioCard.imageAlt || "Tech Master Team"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-gold font-mono text-xs uppercase tracking-widest font-bold block mb-1">
                    {culture.imageSubtitle || studioCard.imageSubtitle || "Jaipur Studio"}
                  </span>
                  <p className="text-white font-serif text-lg font-bold">
                    {culture.imageDescription || studioCard.imageDescription || "50+ Person Production & Gaming Suite"}
                  </p>
                  {studioCard.overlayCaption && (
                    <p className="text-gray-300 text-xs mt-1 italic">
                      {studioCard.overlayCaption}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </section>
        )}

      </div>
    </div>
  );
};
