import React, { useState, useRef, useEffect } from "react";
import { Cpu, Layers, Box, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";

export const Services: React.FC = () => {
  const { servicesData: cmsServices, servicesPageData: cmsServicesPage } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeAdvancedTab, setActiveAdvancedTab] = useState<string | null>(null);
  const [liveServicesData, setLiveServicesData] = useState<any>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/services`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveServicesData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Services fetch error:", e);
      }
    };
    fetchServices();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const defaultServices = [
    {
      id: "srv-1",
      icon: "Sparkles",
      title: "Luxury Brand Strategy",
      tagline: "",
      description: "Positioning luxury engineering and tech brands for ultra-high-net-worth market presence and authority.",
      overview: "Complete identity blueprints, luxury visual systems, and high-convert audience positioning.",
      benefits: ["Exclusive market positioning", "Premium brand perception", "High conversion equity"],
      process: ["Market Audit & Positioning Blueprint", "Visual System Design", "Global Brand Launch"],
      features: [],
      accentColor: "#D4AF37",
      displayOrder: 1
    },
    {
      id: "srv-2",
      icon: "Cpu",
      title: "High-End Influencer Campaign Execution",
      tagline: "",
      description: "Bespoke influencer partnerships, content production, and amplified digital distribution.",
      overview: "End-to-end management of tier-1 tech influencer pushes reaching millions of engaged developers.",
      benefits: ["Direct developer audience trust", "Guaranteed impression scale", "High ROI conversion tracking"],
      process: ["Creator Vetting & Alignment", "Creative Scripting & Approval", "Multi-Channel Broadcast & Analytics"],
      features: [],
      accentColor: "#00E5FF",
      displayOrder: 2
    },
    {
      id: "srv-3",
      icon: "Layers",
      title: "Keynote & Public Speaking",
      tagline: "",
      description: "Aman delivers mainstage keynotes, live coding demonstrations, and developer autonomy seminars globally.",
      overview: "Engaging, inspirational keynotes translating complex software architecture into 3D visual stories.",
      benefits: ["High-impact mainstage delivery", "Authentic audience engagement", "Full press kit & AV rider support"],
      process: ["Event Scope & Keynote Alignment", "Custom Slide & Live Sandbox Setup", "Mainstage Delivery & Q&A"],
      features: [],
      accentColor: "#aa3bff",
      displayOrder: 3
    },
    {
      id: "srv-4",
      icon: "Box",
      title: "UGC & Commercial Content Production",
      tagline: "",
      description: "High-production UGC, cinematic product trailers, and commercial developer breakdowns.",
      overview: "4K multi-cam production, 3D motion graphics, and high-retention commercial video assets.",
      benefits: ["Cinematic 4K production quality", "Higher viewer retention rates", "Multi-format social exports"],
      process: ["Concept & Storyboard Blueprint", "4K Multi-Cam Studio Filming", "3D Motion Graphics & Sound Design"],
      features: [],
      accentColor: "#FF007F",
      displayOrder: 4
    }
  ];

  const rawServices = (liveServicesData?.servicesData && liveServicesData.servicesData.length > 0)
    ? liveServicesData.servicesData
    : (cmsServices && cmsServices.length > 0)
      ? cmsServices
      : (localDb?.servicesData || defaultServices);

  const servicesDataList = [...rawServices].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const advancedServices = servicesDataList.filter(srv => srv.overview || (srv.process && srv.process.length > 0));

  useEffect(() => {
    if (advancedServices.length > 0 && !activeAdvancedTab) {
      setActiveAdvancedTab(advancedServices[0].id);
    }
  }, [advancedServices, activeAdvancedTab]);

  const defaultPageData = {
    hero: {
      badge: "CORE PORTALS",
      title: "Services, Courses &",
      highlightText: "Keynote Bookings.",
      description: "Explore Aman's developer training tracks, speaking keynote requests, collaborative student hackathons, and brand sponsorships."
    },
    expertise: {
      badge: "OUR EXPERTISE",
      title: "Comprehensive",
      highlightText: "Solutions"
    },
    cta: {
      heading: "Ready to Transform Your Business?",
      subtext: "Let's discuss how we can help you achieve your goals.",
      buttonText: "Contact Us",
      buttonUrl: "/contact"
    }
  };

  const fetchedServicesPageData = liveServicesData?.servicesPageData || liveServicesData;
  const servicesPageData = { ...defaultPageData, ...localDb?.servicesPageData, ...cmsServicesPage, ...(fetchedServicesPageData?.hero ? fetchedServicesPageData : {}) };
  const heroData = servicesPageData.hero || defaultPageData.hero;
  const expertise = servicesPageData.expertise || defaultPageData.expertise;
  const cta = servicesPageData.cta || defaultPageData.cta;

  const scrollSidebar = (direction: 'up' | 'down') => {
    if (sidebarRef.current) {
      const scrollAmount = 200;
      sidebarRef.current.scrollBy({
        top: direction === 'up' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="w-5 h-5" />;
      case "Layers":
        return <Layers className="w-5 h-5" />;
      case "Box":
        return <Box className="w-5 h-5" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4 uppercase tracking-[2px]"
        >
          {heroData.badge || "CORE PORTALS"}
        </motion.div>
        
        <h1 className="typo-h1 mb-8">
          {heroData.title} <br />
          <span className="text-gold italic font-bold">{heroData.highlightText}</span>
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          {heroData.description}
        </p>
      </section>

      {/* Services List Section */}
      <section className="max-w-4xl mx-auto text-left flex flex-col gap-6 relative z-10">
        {servicesDataList.map((srv: any, idx: number) => {
          const isExpanded = expandedId === srv.id;

          return (
            <div
              key={srv.id || idx}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold/25 transition-all duration-500"
            >
              {/* Header trigger */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : srv.id)}
                className="w-full p-8 flex items-center justify-between text-left focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm opacity-30">0{idx + 1}</span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border"
                    style={{
                      color: srv.accentColor || "#D4AF37",
                      borderColor: (srv.accentColor || "#D4AF37") + "30",
                      backgroundColor: (srv.accentColor || "#D4AF37") + "10",
                    }}
                  >
                    {getIcon(srv.icon)}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white transition-colors duration-300">
                      {srv.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-[1.5px] opacity-40 block mt-0.5">
                      {srv.tagline}
                    </span>
                  </div>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400 hover:text-white" />
                </motion.div>
              </button>

              {/* Collapsible details */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-2 border-t border-white/5 bg-white/[0.01]">
                      <p className="text-gray-400 font-light text-sm md:text-base leading-relaxed mb-6">
                        {srv.description}
                      </p>

                      {srv.features && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {srv.features.map((feat: any, fidx: number) => (
                            <div key={fidx} className="flex items-center gap-2">
                              <span className="text-xs text-gray-300 font-light">&bull; {feat}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>

      {/* Comprehensive Services - Tabbed Interface */}
      {advancedServices.length > 0 && (
        <section className="max-w-7xl mx-auto text-left flex flex-col gap-6 relative z-10 mt-16 mb-12">
          <div className="mb-12 text-center">
            <p className="typo-badge mb-4">{expertise.badge || "OUR EXPERTISE"}</p>
            <h2 className="typo-h2 mb-6">
              {expertise.title || "Comprehensive"} <span className="text-gold italic font-bold">{expertise.highlightText || "Solutions"}</span>
            </h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/3 flex flex-col items-center">
              <button 
                onClick={() => scrollSidebar('up')} 
                className="mb-2 p-2 rounded-full bg-white/5 border border-white/10 text-gold hover:bg-gold/20 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <ChevronUp className="w-5 h-5" />
              </button>
              <div 
                ref={sidebarRef}
                className="flex flex-col gap-2 overflow-y-auto max-h-[500px] w-full pr-2 custom-scrollbar scroll-smooth"
              >
                {advancedServices.map((srv: any) => (
                  <button
                    key={srv.id}
                    onClick={() => setActiveAdvancedTab(srv.id)}
                    className={`text-left px-6 py-4 rounded-2xl border transition-all duration-300 cursor-pointer ${activeAdvancedTab === srv.id ? 'bg-white/10 border-gold/50 text-gold font-bold' : 'bg-white/5 border-white/5 text-gray-400 hover:border-gold/20 hover:text-white'}`}
                  >
                    <span className="font-serif text-lg">{srv.title}</span>
                  </button>
                ))}
              </div>
              <button 
                onClick={() => scrollSidebar('down')} 
                className="mt-2 p-2 rounded-full bg-white/5 border border-white/10 text-gold hover:bg-gold/20 hover:text-white transition-colors duration-300 cursor-pointer"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
            
            {/* Content Area */}
            <div className="lg:w-2/3">
              <AnimatePresence mode="wait">
                {advancedServices.map((srv: any) => 
                  activeAdvancedTab === srv.id && (
                    <motion.div
                      key={srv.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="glass-panel p-8 md:p-12 rounded-3xl border border-white/5 h-full flex flex-col"
                    >
                      <h3 className="font-serif text-3xl font-bold text-white mb-6">{srv.title}</h3>
                      
                      {srv.overview && (
                        <div className="mb-8">
                          <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-3">Overview</h4>
                          <p className="text-gray-400 text-sm leading-relaxed font-light">{srv.overview}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                        {srv.benefits && srv.benefits.length > 0 && (
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-4">Benefits</h4>
                            <ul className="flex flex-col gap-3">
                              {srv.benefits.map((ben: string, i: number) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-xs text-gray-300 font-light">&bull; {ben}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {srv.process && srv.process.length > 0 && (
                          <div>
                            <h4 className="text-[10px] uppercase tracking-[3px] text-gold font-bold mb-4">Process</h4>
                            <ul className="flex flex-col gap-3">
                              {srv.process.map((step: string, i: number) => (
                                <li key={i} className="flex items-start gap-3">
                                  <span className="font-mono text-xs text-gold/50 mt-0.5">0{i+1}</span>
                                  <span className="text-xs text-gray-300 font-light">{step}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner Section */}
      {cta && (
        <section className="max-w-5xl mx-auto mt-16 p-12 rounded-3xl relative overflow-hidden border border-white/10 text-center shadow-2xl bg-gradient-to-r from-[#0a0a0a] to-[#141414]">
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
            <h2 className="font-serif text-3xl md:text-4xl text-white font-medium">
              {cta.heading || "Ready to Transform Your Business?"}
            </h2>
            <p className="text-gray-400 text-sm font-light leading-relaxed">
              {cta.subtext || cta.description || "Let's discuss how we can help you achieve your goals."}
            </p>
            <a 
              href={cta.buttonUrl || cta.buttonLink || "/contact"} 
              className="px-6 py-3 rounded-full bg-gold text-black font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 shadow-gold-glow-sm cursor-pointer mt-2"
            >
              {cta.buttonText || "Contact Us"}
            </a>
          </div>
        </section>
      )}
    </div>
  );
};
