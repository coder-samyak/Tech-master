import React from "react";
import { motion } from "framer-motion";
import { LuxuryCard } from "../components/LuxuryCard";
import { useData } from "../context/DataContext";

const accentColors = ["#D4AF37", "#00E5FF", "#aa3bff", "#FF007F"];

export const Mission: React.FC = () => {
  const { missionVisionData } = useData();
  const [liveMV, setLiveMV] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchMissionVision = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/missionVision`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveMV(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Mission & Vision fetch error:", e);
      }
    };
    fetchMissionVision();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const defaultMV = {
    hero: {
      badge: "OUR NORTH STAR",
      headingLine1: "Democratizing",
      highlightText: "Tech Literacy",
      headingLine2: "Globally",
      description: "We believe high-quality engineering curricula shouldn't be locked behind expensive student debts. Aman is building the tools to make code accessible to every curious mind on earth."
    },
    mission: {
      label: "THE MISSION STATEMENT",
      title: "To inspire, educate, and place the next million full-stack developers.",
      description: "Our target is to break down complex system design systems, database architectures, and compiler dynamics into engaging, cinematic formats. We enable students to transition seamlessly from beginners to self-sufficient contributors."
    },
    vision: {
      label: "THE FUTURE VISION",
      title: "Vision 2030: Bridging the global developer deficit.",
      description: "Technology evolves at a rapid pace, yet university syllabi remain outdated. We are constructing an open, adaptive, cloud-native learning playground that responds directly to modern tech requirements."
    },
    coreValuesHeader: {
      badge: "OUR FUNDAMENTAL PRINCIPLES",
      titleLine1: "The Values that",
      titleLine2: "Drive Us",
      titleLine3: "Forward"
    },
    coreValues: [
      { title: "Cinematic Pedagogy", description: "Translating dry software engineering documentation into visual 3D storytelling.", accentColor: "#D4AF37" },
      { title: "Open Source Ethos", description: "Empowering developers to build in public and contribute to core frameworks.", accentColor: "#00E5FF" },
      { title: "Industry Alignment", description: "Curricula designed directly by senior principal engineers from tier-1 tech companies.", accentColor: "#aa3bff" },
      { title: "Self-Sustaining Autonomy", description: "Teaching problem-solving blueprints rather than just copy-pasting code snippets.", accentColor: "#FF007F" }
    ],
    brandPillarsHeader: {
      badge: "OUR PILLARS",
      titleLine1: "",
      titleLine2: "",
      titleLine3: ""
    },
    brandPillars: [
      { title: "Full-Stack Architecture", subtitle: "Next.js • Node.js • Distributed Systems", description: "Comprehensive coverage from browser rendering loops down to database sharding.", borderColor: "#D4AF37" },
      { title: "Interactive Sandboxes", subtitle: "Cloud-Native Playground", description: "Zero-config, browser-based container environments for instant code execution.", borderColor: "#00E5FF" },
      { title: "Career Placement Engine", subtitle: "Direct Partner Referrals", description: "Connecting top 1% graduates directly with high-growth venture-backed startups.", borderColor: "#aa3bff" },
      { title: "Creator Ecosystem", subtitle: "Multiverse Content Channels", description: "Syndicating short-form breakdowns and documentaries across 5 core channels.", borderColor: "#FF007F" }
    ],
    roadmapHeader: {
      badge: "STRATEGIC ROADMAP",
      titleLine1: "Our",
      titleLine2: "Roadmap to 2030",
      description: "Hover to Pause Timeline"
    },
    roadmap: [
      { year: "2024", quarter: "Q1", title: "Studio Suite Launch", goal: "JAIPUR HEADQUARTERS", description: "Established 4K multi-cam production suite & 3D render pipeline.", status: "Completed", accentColor: "#D4AF37" },
      { year: "2025", quarter: "Q2", title: "Next Univerz Sandbox", goal: "WEB DEV PLAYGROUND", description: "Launched browser-based interactive terminal & code compiler sandbox.", status: "Active", accentColor: "#00E5FF" },
      { year: "2026", quarter: "Q3", title: "Multiverse 5M Sub", goal: "GLOBAL AUDIENCE", description: "Expanding developer reach across 5 dedicated YouTube & IG channels.", status: "In Progress", accentColor: "#aa3bff" },
      { year: "2030", quarter: "Q4", title: "Open Tech University", goal: "DECENTRALIZED DEGREE", description: "Accredited open engineering diploma recognized by global tech giants.", status: "Planning", accentColor: "#FF007F" }
    ],
    cta: {
      heading: "Ready to Build Your Engineering Career?",
      description: "Join thousands of developers in our interactive sandbox playgrounds and master production-ready code.",
      primaryButtonText: "Get Started",
      primaryButtonLink: "/signup",
      secondaryButtonText: "Contact Admissions",
      secondaryButtonLink: "/contact"
    }
  };

  const heroData = { ...defaultMV.hero, ...(localDb?.missionVisionData?.hero || {}), ...(missionVisionData?.hero || {}), ...(liveMV?.hero || {}) };
  const missionData = { ...defaultMV.mission, ...(localDb?.missionVisionData?.mission || {}), ...(missionVisionData?.mission || {}), ...(liveMV?.mission || {}) };
  const visionData = { ...defaultMV.vision, ...(localDb?.missionVisionData?.vision || {}), ...(missionVisionData?.vision || {}), ...(liveMV?.vision || {}) };
  const coreValuesHeader = { ...defaultMV.coreValuesHeader, ...(localDb?.missionVisionData?.coreValuesHeader || {}), ...(missionVisionData?.coreValuesHeader || {}), ...(liveMV?.coreValuesHeader || {}) };
  const rawBrandPillarsHeader = { ...defaultMV.brandPillarsHeader, ...(localDb?.missionVisionData?.brandPillarsHeader || {}), ...(missionVisionData?.brandPillarsHeader || {}), ...(liveMV?.brandPillarsHeader || {}) };
  const brandPillarsHeader = {
    ...rawBrandPillarsHeader,
    titleLine1: rawBrandPillarsHeader.titleLine1 === "The" ? "" : (rawBrandPillarsHeader.titleLine1 || ""),
    titleLine2: rawBrandPillarsHeader.titleLine2 === "Foundation" ? "" : (rawBrandPillarsHeader.titleLine2 || ""),
    titleLine3: rawBrandPillarsHeader.titleLine3 === "of Our Work" ? "" : (rawBrandPillarsHeader.titleLine3 || "")
  };
  const roadmapHeader = { ...defaultMV.roadmapHeader, ...(localDb?.missionVisionData?.roadmapHeader || {}), ...(missionVisionData?.roadmapHeader || {}), ...(liveMV?.roadmapHeader || {}) };
  const ctaForm = { ...defaultMV.cta, ...(localDb?.missionVisionData?.cta || {}), ...(missionVisionData?.cta || {}), ...(liveMV?.cta || {}) };

  const rawCoreValues = (liveMV?.coreValues || missionVisionData?.coreValues || localDb?.missionVisionData?.coreValues || defaultMV.coreValues);
  const coreValues = (Array.isArray(rawCoreValues) && rawCoreValues.length > 0 ? rawCoreValues : defaultMV.coreValues)
    .filter((v: any) => v.status === "Active" || v.status === true || v.status === undefined)
    .map((v: any, idx: number) => ({
      title: v.title || v.valueName,
      description: v.description,
      accent: v.accentColor || accentColors[idx % accentColors.length],
    }));

  const rawBrandPillars = (liveMV?.brandPillars || missionVisionData?.brandPillars || localDb?.missionVisionData?.brandPillars || defaultMV.brandPillars);
  const brandPillars = (Array.isArray(rawBrandPillars) && rawBrandPillars.length > 0 ? rawBrandPillars : defaultMV.brandPillars)
    .filter((p: any) => p.status === "Active" || p.status === true || p.status === undefined);

  const rawRoadmap = (liveMV?.roadmap || missionVisionData?.roadmap || localDb?.missionVisionData?.roadmap || defaultMV.roadmap);
  const roadmapItems = (Array.isArray(rawRoadmap) && rawRoadmap.length > 0 ? rawRoadmap : defaultMV.roadmap)
    .filter((r: any) => r.status !== "Inactive");

  return (
    <div className="relative text-white min-h-screen pt-24 pb-20 px-6 overflow-hidden">
      {/* Glow overlays */}
      <div className="absolute top-1/3 left-1/4 w-[45vw] h-[45vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-blue opacity-15 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="typo-badge mb-4 uppercase tracking-[2px]"
        >
          {heroData.badge || "OUR NORTH STAR"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="typo-h2 mb-6"
        >
          {heroData.headingLine1 || "Democratizing"} <br />
          <span className="text-gold italic font-bold">{heroData.highlightText || "Tech Literacy"}</span> {heroData.headingLine2 || "Globally"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          {heroData.description || "We believe high-quality engineering curricula shouldn't be locked behind expensive student debts. Aman is building the tools to make code accessible to every curious mind on earth."}
        </motion.p>
      </div>

      {/* Core Mission grids */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-left flex flex-col justify-center border-l-4 border-l-gold"
          >
            <span className="text-xs uppercase font-bold tracking-[3px] text-gold mb-4">{missionData.label || "THE MISSION STATEMENT"}</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6 leading-snug">
              {missionData.title || "To inspire, educate, and place the next million full-stack developers."}
            </h2>
            <p className="typo-card-desc">
              {missionData.description || "Our target is to break down complex system design systems, database architectures, and compiler dynamics into engaging, cinematic formats. We enable students to transition seamlessly from beginners to self-sufficient contributors."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-left flex flex-col justify-center border-l-4 border-l-electric-blue"
          >
            <span className="text-xs uppercase font-bold tracking-[3px] text-electric-blue mb-4">{visionData.label || "THE FUTURE VISION"}</span>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-white mb-6 leading-snug">
              {visionData.title || "Vision 2030: Bridging the global developer deficit."}
            </h2>
            <p className="typo-card-desc">
              {visionData.description || "Technology evolves at a rapid pace, yet university syllabi remain outdated. We are constructing an open, adaptive, cloud-native learning playground that responds directly to modern tech requirements."}
            </p>
          </motion.div>
        </div>

        {/* Core Values grid using LuxuryCard */}
        {coreValues.length > 0 && (
          <div className="mb-12 text-center">
            <p className="typo-badge mb-4">{coreValuesHeader.badge || "OUR FUNDAMENTAL PRINCIPLES"}</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-16">
              {coreValuesHeader.titleLine1 || "The Values that"} <span className="text-gold italic font-bold">{coreValuesHeader.titleLine2 || "Drive Us"}</span> {coreValuesHeader.titleLine3 || "Forward"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              {coreValues.map((val: any, idx: number) => (
                <LuxuryCard key={idx} accentColor={val.accent} index={idx}>
                  <h3 className="font-serif text-lg text-white font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                    {val.title}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed font-light">
                    {val.description}
                  </p>
                </LuxuryCard>
              ))}
            </div>
          </div>
        )}

        {/* Core Pillars */}
        {brandPillars.length > 0 && (
          <div className="mb-12">
            <div className="mb-12 text-center">
              {brandPillarsHeader.badge && <p className="typo-badge mb-4">{brandPillarsHeader.badge}</p>}
              {(brandPillarsHeader.titleLine1 || brandPillarsHeader.titleLine2 || brandPillarsHeader.titleLine3 || brandPillarsHeader.title) && (
                <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-8">
                  {brandPillarsHeader.titleLine1 || brandPillarsHeader.title || ""}
                  {brandPillarsHeader.titleLine2 && (
                    <span className="text-gold italic font-bold"> {brandPillarsHeader.titleLine2}</span>
                  )}
                  {brandPillarsHeader.titleLine3 && ` ${brandPillarsHeader.titleLine3}`}
                </h2>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {brandPillars.map((pillar: any, idx: number) => {
                const borderAccentColor = pillar.borderColor || accentColors[idx % accentColors.length];
                return (
                  <motion.div
                    key={pillar.id || idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className="glass-panel p-8 rounded-2xl border-l-2 hover:border-l-gold transition-all duration-300 text-left"
                    style={{ borderLeftColor: borderAccentColor } as React.CSSProperties}
                  >
                    <h3 className="font-serif text-xl font-bold text-white mb-1">{pillar.title}</h3>
                    {pillar.subtitle && <p className="text-gold font-mono text-[10px] uppercase tracking-[1px] mb-3">{pillar.subtitle}</p>}
                    <p className="typo-card-desc">
                      {pillar.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Strategic Roadmap Section */}
        {roadmapItems.length > 0 && (
          <div className="roadmap-container max-w-7xl mx-auto px-6 relative z-10 pb-16 mt-16">
            <style>{`
              @keyframes roadmapScroll {
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .animate-roadmap {
                display: flex;
                width: max-content;
                animation: roadmapScroll 45s linear infinite;
              }
              .animate-roadmap:hover {
                animation-play-state: paused;
              }
            `}</style>

            <div className="mb-16 text-center">
              <p className="typo-badge mb-4">{roadmapHeader.badge || "STRATEGIC ROADMAP"}</p>
              <h2 className="typo-h2">
                {roadmapHeader.titleLine1 || "Our"} <span className="text-gold italic font-bold">{roadmapHeader.titleLine2 || "Roadmap to 2030"}</span>
              </h2>
              <p className="text-xs text-gray-500 font-mono tracking-[1px] uppercase mt-2">{roadmapHeader.description || "Hover to Pause Timeline"}</p>
            </div>

            <div className="relative overflow-hidden pb-12 pt-6">
              <div className="animate-roadmap flex gap-8 relative z-10 h-[440px]">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/40 via-royal-purple/40 to-gold/40 -translate-y-1/2 z-0 pointer-events-none" />

                {[1, 2].map((loopGroup) => (
                  <div key={loopGroup} className="flex gap-8">
                    {roadmapItems.map((item: any, idx: number) => {
                      const isCardOnTop = idx % 2 === 0;
                      const nodeAccent = item.accentColor || "#D4AF37";
                      return (
                        <div key={`${loopGroup}-${idx}`} className="flex flex-col items-center justify-center w-[300px] h-[440px] relative select-none">
                          <div 
                            className="w-10 h-10 rounded-full bg-black border-2 flex items-center justify-center font-mono text-xs font-bold z-20"
                            style={{ borderColor: nodeAccent, color: nodeAccent, boxShadow: `0 0 15px ${nodeAccent}4d` }}
                          >
                            {item.quarter}
                          </div>

                          <span className="text-[10px] font-mono text-gray-500 mt-2 z-20 absolute top-[250px]">{item.year}</span>

                          {isCardOnTop ? (
                            <>
                              <div className="absolute top-0 left-0 right-0 glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300 text-left">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                                  <span className="text-[9px] uppercase tracking-wider font-mono text-gold px-1.5 py-0.5 rounded bg-gold/10">{item.status}</span>
                                </div>
                                {item.goal && <p className="text-white/80 font-mono text-[9px] mb-2 uppercase">{item.goal}</p>}
                                <p className="text-gray-400 text-xs font-light leading-relaxed">{item.description}</p>
                              </div>
                              <div className="absolute top-[150px] bottom-[240px] w-[1px]" style={{ backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.1), ${nodeAccent})` }} />
                            </>
                          ) : (
                            <>
                              <div className="absolute bottom-0 left-0 right-0 glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300 text-left">
                                <div className="flex items-center justify-between mb-2">
                                  <h3 className="font-serif text-lg font-bold text-white">{item.title}</h3>
                                  <span className="text-[9px] uppercase tracking-wider font-mono text-gold px-1.5 py-0.5 rounded bg-gold/10">{item.status}</span>
                                </div>
                                {item.goal && <p className="text-white/80 font-mono text-[9px] mb-2 uppercase">{item.goal}</p>}
                                <p className="text-gray-400 text-xs font-light leading-relaxed">{item.description}</p>
                              </div>
                              <div className="absolute top-[240px] bottom-[150px] w-[1px]" style={{ backgroundImage: `linear-gradient(to bottom, ${nodeAccent}, rgba(255,255,255,0.1))` }} />
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Banner Section */}
        {ctaForm && (
          <div 
            className="max-w-5xl mx-auto mt-20 p-12 rounded-3xl relative overflow-hidden border border-white/10 text-center shadow-2xl"
            style={{ background: ctaForm.backgroundGradient || "linear-gradient(to right, #0a0a0a, #141414)" }}
          >
            <div className="absolute inset-0 bg-gold/5 opacity-30 blur-2xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
              <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">
                {ctaForm.heading || "Ready to Build Your Engineering Career?"}
              </h2>
              <p className="text-gray-400 text-sm font-light leading-relaxed">
                {ctaForm.description || "Join thousands of developers in our interactive sandbox playgrounds and master production-ready code."}
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                {ctaForm.primaryButtonText && (
                  <a 
                    href={ctaForm.primaryButtonLink || "/signup"} 
                    className="px-6 py-3 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-gold-glow-sm cursor-pointer"
                  >
                    {ctaForm.primaryButtonText}
                  </a>
                )}
                {ctaForm.secondaryButtonText && (
                  <a 
                    href={ctaForm.secondaryButtonLink || "/contact"} 
                    className="px-6 py-3 rounded-full border border-white/20 text-white font-bold text-xs uppercase tracking-wider hover:border-gold hover:text-gold transition-all duration-300 cursor-pointer"
                  >
                    {ctaForm.secondaryButtonText}
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
