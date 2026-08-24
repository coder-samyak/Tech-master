import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useData } from "../context/DataContext";
import { LuxuryCard } from "../components/LuxuryCard";
import { ArrowDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const Journey: React.FC = () => {
  const { journeyHero, dbData } = useData();
  const [liveJourneyData, setLiveJourneyData] = useState<any>(null);

  useEffect(() => {
    const fetchFounderJourney = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://techmasterbackend.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/founder-journey`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveJourneyData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Founder Journey fetch error:", e);
      }
    };
    fetchFounderJourney();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const activeJourney = {
    ...(localDb?.founderJourney || {}),
    ...(dbData?.founderJourney || {}),
    ...(liveJourneyData || {})
  };

  const heroSmallBadge = activeJourney?.hero?.smallBadge || activeJourney?.hero?.badgeText || "WELCOME TO TECH MASTER'S JOURNEY";
  const heroTitle = activeJourney?.hero?.title || "Stories that";
  const heroHighlight = activeJourney?.hero?.highlightText || "Stay with You";
  const heroDescription = activeJourney?.hero?.description || journeyHero?.description || "Tracing the evolution from a single video in 2019 to the world's most-subscribed tech creator with over 20 billion views.";
  const heroScrollText = activeJourney?.hero?.scrollText || journeyHero?.scrollIndicatorText || "Explore timeline";

  useEffect(() => {
    // 1. Line drawing animation
    gsap.fromTo(
      ".timeline-line-active",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".timeline-container",
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      }
    );

    // 2. Reveal and highlight animation for timeline nodes
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      // Reveal
      gsap.fromTo(
        item.querySelectorAll(".timeline-reveal"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );

    });

    // 3. Roadmap container fade-in on scroll
    const roadmapContainer = document.querySelector(".roadmap-container");
    if (roadmapContainer) {
      gsap.fromTo(
        roadmapContainer,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: roadmapContainer,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const newMilestones = [
    {
      year: "2019",
      subtitle: "The First Upload",
      title: "The First Upload",
      description: "One video. No audience, no plan, no studio. Just one person from a small town who thought tech deserved better storytelling than it was getting."
    },
    {
      year: "2020",
      subtitle: "The Silver Play Button",
      title: "The Silver Play Button",
      description: "The first sign this wasn't a phase. One creator, one growing channel — and an audience that kept coming back."
    },
    {
      year: "2021",
      subtitle: "Two New Channels. One New Hire.",
      title: "Two New Channels. One New Hire.",
      description: "What was a one-person project became three. Two new channels launched, and Tech Master brought on its very first employee — the exact moment \"someone's channel\" started becoming a company."
    },
    {
      year: "2022",
      subtitle: "First Brand Deal. First Studio.",
      title: "First Brand Deal. First Studio.",
      description: "A brand trusted us before we were \"big enough\" to matter. That trust funded our first real studio — the day content stopped being made out of a bedroom."
    },
    {
      year: "2023",
      subtitle: "10 Million and Counting",
      title: "10 Million and Counting",
      description: "Tech Master Shorts crossed 10 million subscribers. An experiment had become a category of its own."
    },
    {
      year: "2024",
      subtitle: "25+ People. Seven Play Buttons.",
      title: "25+ People. Seven Play Buttons.",
      description: "Twenty-five people, one mission, seven Play Buttons on the wall. Proof this stopped being one person's story a long time ago."
    },
    {
      year: "2025",
      subtitle: "The Most-Subscribed Tech Creator on the Planet",
      title: "The Most-Subscribed Tech Creator on the Planet",
      description: "Every all-nighter, every idea that almost got cut, every video that didn't work until it did — it all built to this. Tech Master became the most-subscribed tech creator in the world."
    },
    {
      year: "2026",
      subtitle: "20 Billion Views. No One Else Has Done This.",
      title: "20 Billion Views. No One Else Has Done This.",
      description: "The first tech creator in the world to cross 20 billion views on a single channel. The most-followed tech creator on Instagram, in the same year. Some milestones take a lifetime. We're just getting started."
    }
  ];

  const rawMilestones = activeJourney?.milestones || dbData?.journeyMilestones || newMilestones;
  const milestonesToDisplay = (Array.isArray(rawMilestones) && rawMilestones.length > 0 ? rawMilestones : newMilestones).filter((m: any) => m.visible !== false && !m.deleted);

  const defaultRoadmap = [
    { title: "2021 — New Beginnings", desc: "What was a one-person project became three. Two new channels launched and our first employee joined." },
    { title: "2022 — First Studio", desc: "A brand trusted us before we were big enough to matter. Content stopped being made in a bedroom." },
    { title: "2023 — 10M Subscribers", desc: "Tech Master Shorts crossed 10 million subscribers. An experiment became a category of its own." },
    { title: "2024 — Seven Play Buttons", desc: "Twenty-five people, one mission, seven Play Buttons on the wall." },
    { title: "2025 — #1 Tech Creator", desc: "Every all-nighter built to this: Tech Master became the most-subscribed tech creator in the world." },
    { title: "2026 — 20 Billion Views", desc: "The first tech creator in the world to cross 20 billion views on a single channel." }
  ];
  const rawRoadmap = activeJourney?.roadmap?.items || defaultRoadmap;
  const roadmapItems = (Array.isArray(rawRoadmap) && rawRoadmap.length > 0 ? rawRoadmap : defaultRoadmap).map((r: any) => ({
    title: r.title,
    desc: r.desc || r.description
  }));

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/2 w-[60vw] h-[60vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="typo-badge mb-4"
        >
          {heroSmallBadge}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="typo-h2 mb-6"
        >
          {heroTitle} <span className="text-gold italic font-bold">{heroHighlight}</span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-300 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed p-6 rounded-2xl border border-gold bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.15)] mt-4"
        >
          {heroDescription}
        </motion.div>

        {/* Scroll Indicator */}
        <div className="flex flex-col items-center gap-2 mt-12 opacity-55">
          <span className="text-[9px] uppercase tracking-[3px]">{heroScrollText}</span>
          <ArrowDown className="w-4 h-4 text-gold animate-bounce" />
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timeline-container max-w-4xl mx-auto relative z-10 pb-20">
        {/* Central connecting line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2" />
        <div 
          className="timeline-line-active absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-gold -translate-x-1/2 origin-top" 
          style={{ transform: "scaleY(0)" }} 
        />

        <div className="flex flex-col gap-16 relative">
          {milestonesToDisplay.map((item: any, index: number) => {
            const isEven = index % 2 === 0;

            const yearBlock = (
              <div className={`timeline-reveal ${isEven ? "pr-8 text-right" : "pl-8 text-left"} pt-2`}>
                <motion.span 
                  initial={{ color: "rgba(255,255,255,0.2)", scale: 1 }}
                  whileInView={{ color: "#D4AF37", scale: 1.1, textShadow: "0 0 20px rgba(212,175,55,0.6)" }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.3 }}
                  className={`font-serif text-5xl font-black block mb-1 inline-block ${isEven ? "origin-right" : "origin-left"}`}
                >
                  {item.year}
                </motion.span>
              </div>
            );

            const cardBlock = (
              <LuxuryCard
                accentColor="#D4AF37"
                className="timeline-reveal"
                index={index}
              >
                <h3 className="font-serif text-xl md:text-2xl text-white font-medium mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed">
                  {item.description}
                </p>
              </LuxuryCard>
            );

            return (
              <div
                key={index}
                className="timeline-item flex flex-col sm:flex-row relative w-full items-center sm:justify-between"
              >
                {/* Timeline connector circle node */}
                <motion.div 
                  initial={{ borderColor: "rgba(255,255,255,0.2)", boxShadow: "0 0 0px rgba(212,175,55,0)" }}
                  whileInView={{ borderColor: "#D4AF37", boxShadow: "0 0 18px rgba(212,175,55,0.9)" }}
                  viewport={{ amount: 0.5 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-4 sm:left-1/2 w-4 h-4 rounded-full border bg-black -translate-x-1/2 top-3 sm:top-1/2 -translate-y-1/2 z-20 flex items-center justify-center"
                >
                  <motion.div 
                    initial={{ backgroundColor: "rgba(255,255,255,0.2)", scale: 1, boxShadow: "0 0 0px rgba(212,175,55,0)" }}
                    whileInView={{ backgroundColor: "#D4AF37", scale: 1.5, boxShadow: "0 0 12px rgba(212,175,55,1)" }}
                    viewport={{ amount: 0.5 }}
                    transition={{ duration: 0.4 }}
                    className="w-1.5 h-1.5 rounded-full" 
                  />
                </motion.div>

                {/* Mobile Display (Stacked layout for mobile screens) */}
                <div className="sm:hidden w-full pl-10">
                  <div className="timeline-reveal mb-2">
                    <motion.span 
                      initial={{ color: "rgba(255,255,255,0.2)", scale: 1 }}
                      whileInView={{ color: "#D4AF37", scale: 1.1 }}
                      viewport={{ amount: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="font-serif text-3xl font-black block origin-left inline-block"
                    >
                      {item.year}
                    </motion.span>
                  </div>
                  {cardBlock}
                </div>

                {/* Desktop Display (Alternating 50/50 Columns) */}
                <div className="hidden sm:block w-[45%] order-1">
                  {isEven ? yearBlock : cardBlock}
                </div>
                <div className="hidden sm:block w-[45%] order-2">
                  {isEven ? cardBlock : yearBlock}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Thematic Growth Roadmap */}
      <div className="roadmap-container max-w-7xl mx-auto px-6 relative z-10 pb-16">
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
          <p className="typo-badge mb-4">ROADMAP</p>
          <h2 className="typo-h2">
            Founder's <span className="text-gold italic font-bold">Growth Roadmap</span>
          </h2>
          <p className="text-xs text-gray-500 font-mono tracking-[1px] uppercase mt-2">Hover to Pause Timeline</p>
        </div>

        <div className="relative overflow-hidden pb-12 pt-6">
          <div className="animate-roadmap flex gap-8 relative z-10 h-[440px]">
            
            {/* Connection line inside the scrolling container */}
            <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/40 via-royal-purple/40 to-gold/40 -translate-y-1/2 z-0 pointer-events-none" />

            {/* Loop 1 and Loop 2 for infinite ticker */}
            {[1, 2].map((loopGroup) => (
              <div key={loopGroup} className="flex gap-8">
                {roadmapItems.map((item: any, idx: number) => {
                  const isCardOnTop = idx % 2 === 0;
                  return (
                    <div key={idx} className="flex flex-col items-center justify-center w-[300px] h-[440px] relative select-none">
                      
                      {/* Central Node Dot */}
                      <div className="w-10 h-10 rounded-full bg-black border-2 border-gold flex items-center justify-center font-mono text-xs text-gold font-bold z-20 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        0{idx + 1}
                      </div>

                      {isCardOnTop ? (
                        <>
                          {/* Card on Top */}
                          <div className="absolute top-0 left-0 right-0 glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300">
                            <h3 className="font-serif text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-xs font-light leading-relaxed">{item.desc}</p>
                          </div>
                          
                          {/* Connector line */}
                          <div className="absolute top-[150px] bottom-[240px] w-[1px] bg-gradient-to-b from-white/10 to-gold/50" />
                        </>
                      ) : (
                        <>
                          {/* Card on Bottom */}
                          <div className="absolute bottom-0 left-0 right-0 glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300">
                            <h3 className="font-serif text-lg font-bold text-white mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-xs font-light leading-relaxed">{item.desc}</p>
                          </div>

                          {/* Connector line */}
                          <div className="absolute top-[240px] bottom-[150px] w-[1px] bg-gradient-to-b from-gold/50 to-white/10" />
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

    </div>
  );
};
