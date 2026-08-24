import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Magnetic } from "../components/Magnetic";
import gsap from "gsap";
import logo1 from "../assets/logo_transparent-removebg-preview.png";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";


interface HeaderProps {
  activePage: string;
  onChangePage: (page: string) => void;
}

const ScrollCounter = ({ viewsLabel }: { viewsLabel?: string }) => {
  const [viewsCount, setViewsCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      let scrollPercent = docHeight > 0 ? Math.max(0, Math.min(1, scrollY / docHeight)) : 0;
      if (scrollPercent > 0.98) scrollPercent = 1;
      setViewsCount(Math.floor(scrollPercent * 25000000000));
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-7 px-3.5 rounded-full border border-gold/30 bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center gap-1.5 shadow-sm pointer-events-auto select-none">
      <span className="font-mono text-[9.5px] text-gray-400 tracking-[1.5px] uppercase font-semibold leading-none self-center translate-y-[0.5px]">
        {viewsLabel || "VIEWS"}
      </span>
      <span className="font-mono font-bold text-gold text-[10px] tracking-wider tabular-nums leading-none self-center">
        {viewsCount.toLocaleString()}+
      </span>
    </div>
  );
};

export const Header: React.FC<HeaderProps> = ({ activePage, onChangePage }) => {
  const { dbData, websiteSettings, homeData, termsPolicyData, privacyPolicyData, legalSettingsData } = useData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const activeHome = { ...(dbData?.homepageCMS || dbData?.homepage || {}), ...(homeData || {}) };
  const viewsLabel = activeHome?.navbar?.viewsText || (websiteSettings as any)?.viewsText || "VIEWS";
  const navBtnText = activeHome?.navbar?.buttonText || (websiteSettings as any)?.buttonText || "LET'S TALK";
  const navBtnLink = activeHome?.navbar?.buttonLink || (websiteSettings as any)?.buttonLink || "contact";

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initialize immediately
    
    const handleOpenTerms = () => setIsTermsOpen(true);
    const handleOpenPrivacy = () => setIsPrivacyOpen(true);
    window.addEventListener("open-terms-modal", handleOpenTerms);
    window.addEventListener("open-privacy-modal", handleOpenPrivacy);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-terms-modal", handleOpenTerms);
      window.removeEventListener("open-privacy-modal", handleOpenPrivacy);
    };
  }, []);

  const removedNavIds = new Set([
    "mission",
    "what-we-do",
    "collaborations",
    "campaigns",
    "product-launches",
    "events",
    "services",
    "testimonials",
    "faq"
  ]);

  const defaultIdentityItems = [
    { name: "Home", id: "home" },
    { name: "About Founder", id: "about" },
    { name: "Journey", id: "journey" },
  ];

  const defaultEngagementItems = [
    { name: "Our Work", id: "portfolio" },
    { name: "Blog", id: "blog" },
    { name: "Careers", id: "career" },
  ];

  const defaultQuickLinksItems = [
    { name: "Contact Page", id: "contact" },
    { name: "Privacy Policy", id: "privacy" },
    { name: "Terms of Service", id: "terms" },
  ];

  const rawIdentity = dbData?.navigation?.identityItems || defaultIdentityItems;
  const identityItems = rawIdentity.filter((item: any) => !removedNavIds.has(item.id));

  const rawEngagement = dbData?.navigation?.engagementItems || defaultEngagementItems;
  const engagementItems = rawEngagement.filter((item: any) => !removedNavIds.has(item.id));

  const rawQuickLinks = dbData?.navigation?.quickLinksItems || defaultQuickLinksItems;
  const quickLinksItems = rawQuickLinks.filter((item: any) => !removedNavIds.has(item.id));

  const handleNavClick = (pageId: string) => {
    if (pageId === "privacy") {
      setIsPrivacyOpen(true);
    } else if (pageId === "terms") {
      setIsTermsOpen(true);
    } else {
      setIsMenuOpen(false);
      onChangePage(pageId);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Fullscreen menu open animation
      gsap.to(".menu-overlay", {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.8,
        ease: "power4.inOut"
      });
      gsap.fromTo(".menu-link", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.03, ease: "power3.out", delay: 0.3 }
      );
    } else {
      // Close animation
      gsap.to(".menu-overlay", {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.6,
        ease: "power4.inOut"
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[999] py-1.5 md:py-2 pl-3.5 pr-2.5 sm:pl-6 md:pl-12 md:pr-5 flex justify-between items-center transition-all duration-300 ${!isScrolled ? "glass-nav" : ""}`}
        style={{
          filter: isScrolled ? 'none' : `
            drop-shadow(0 2px 4px rgba(212, 175, 55, 0.7))
            drop-shadow(0 4px 10px rgba(212, 175, 55, 0.3))
          `,
          background: isScrolled ? 'transparent' : 'black',
          borderBottom: `1px solid ${isScrolled ? 'transparent' : 'rgba(255,255,255,0.1)'}`,
          pointerEvents: 'none'
        }}
      >
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick("home")} 
          className={`flex items-center gap-2.5 cursor-pointer group transition-opacity duration-300 ${isScrolled ? 'opacity-0' : 'opacity-100'}`}
          data-cursor="home"
          style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
        >
          <img
            src={mediaUrl(websiteSettings?.companyLogo) || logo1}
            alt="Tech Master Logo"
            className="h-16 sm:h-20 lg:h-28 w-auto object-contain -my-2 sm:-my-4 lg:-my-6 max-h-none"
            style={{
              imageRendering: "-webkit-optimize-contrast",
              filter: "none",
            }}
          />
        </div>

        {/* Desktop Navigation Link Cluster */}
        <nav className={`hidden lg:flex items-center gap-5 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
          {(dbData?.navigation?.desktopLinks || [
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Journey", id: "journey" },
            { name: "Our Work", id: "portfolio" },
            { name: "Careers", id: "career" },
          ]).map((item: any) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs uppercase tracking-[2px] transition-all duration-300 relative py-1 hover:text-gold font-black ${
                activePage === item.id ? "text-gold" : "text-gray-400"
              }`}
            >
              {item.name}
              {activePage === item.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
          <div className="hidden md:flex items-center justify-center">
            <ScrollCounter viewsLabel={viewsLabel} />
          </div>
          <div className={`transition-opacity duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <Magnetic strength={0.3}>
              <button
                onClick={() => handleNavClick((navBtnLink || "contact").replace(/^\//, ""))}
                className="light-sweep h-7 px-3.5 rounded-full border border-gold/30 hover:border-gold hover:text-black hover:bg-gold transition-all duration-500 text-[10px] font-black uppercase tracking-[1.5px] text-gold flex items-center justify-center gap-1.5 shadow-sm"
              >
                {navBtnText}
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </Magnetic>
          </div>

          {/* Hamburger Menu Toggle Button (Visible on all viewports, key navigation toggle) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`w-7 h-7 flex flex-col justify-center items-center gap-1 rounded-full border border-gold/30 bg-black/60 hover:bg-black/90 hover:border-gold pointer-events-auto cursor-pointer transition-all duration-300 ${isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            aria-label="Toggle Menu"
          >
            <div className={`w-3.5 h-[1.2px] bg-gold transition-all duration-300 ${isMenuOpen ? "rotate-45 translate-y-[5px]" : ""}`} />
            <div className={`w-3.5 h-[1.2px] bg-gold transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
            <div className={`w-3.5 h-[1.2px] bg-gold transition-all duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[5px]" : ""}`} />
          </button>


        </div>
      </header>
      {/* Fullscreen Overlay Menu */}
      <div 
        className="menu-overlay fixed inset-0 bg-[#060606]/98 backdrop-blur-2xl z-[998] overflow-y-auto flex flex-col justify-start py-16 px-4 md:px-16"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
      >
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] aurora-glow-purple -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] aurora-glow-blue translate-x-1/2 translate-y-1/2 opacity-10 pointer-events-none" />

        <div className="w-full max-w-5xl mx-auto my-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 z-10 py-4 md:py-16">
          
          {/* Column 1: Identity */}
          <div className="flex flex-col gap-2 text-center items-center">
            <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold border-b border-white/5 pb-2 w-full text-center">IDENTITY</p>
            <div className="flex flex-col gap-0 md:gap-0.5 w-full">
              {identityItems.map((item: any) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="menu-link mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-sans text-gray-400 hover:text-gold transition-colors duration-300 py-0.5 relative group font-light"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                      {item.name}
                    </span>
                    {activePage === item.id && (
                      <span className="text-[8px] font-sans text-gold border border-gold/40 px-1.5 py-0.5 rounded-full tracking-[1.5px] uppercase bg-gold/5 shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Engagement */}
          <div className="flex flex-col gap-2 text-center items-center">
            <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold border-b border-white/5 pb-2 w-full text-center">ENGAGEMENT</p>
            <div className="flex flex-col gap-0 md:gap-0.5 w-full">
              {engagementItems.map((item: any) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="menu-link mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-sans text-gray-400 hover:text-gold transition-colors duration-300 py-0.5 relative group font-light"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                      {item.name}
                    </span>
                    {activePage === item.id && (
                      <span className="text-[8px] font-sans text-gold border border-gold/40 px-1.5 py-0.5 rounded-full tracking-[1.5px] uppercase bg-gold/5 shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div className="flex flex-col gap-2 text-center items-center">
            <p className="text-[10px] uppercase tracking-[6px] text-gold/80 mb-2 font-bold border-b border-white/5 pb-2 w-full text-center">QUICK LINKS</p>
            <div className="flex flex-col gap-0 md:gap-0.5 w-full">
              {quickLinksItems.map((item: any) => (
                <div key={item.id} className="overflow-hidden">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="menu-link mx-auto flex items-center justify-center gap-3 text-sm md:text-base font-sans text-gray-400 hover:text-gold transition-colors duration-300 py-0.5 relative group font-light"
                  >
                    <span className="inline-block transition-transform duration-300 group-hover:scale-105">
                      {item.name}
                    </span>
                    {activePage === item.id && (
                      <span className="text-[8px] font-sans text-gold border border-gold/40 px-1.5 py-0.5 rounded-full tracking-[1.5px] uppercase bg-gold/5 shrink-0">
                        Active
                      </span>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && legalSettingsData?.showPrivacy !== false && (
          <div 
            onClick={(e) => {
              if (legalSettingsData?.closeOnOutsideClick !== false && e.target === e.currentTarget) {
                setIsPrivacyOpen(false);
              }
            }}
            style={{
              backgroundColor: `rgba(0, 0, 0, ${(legalSettingsData?.overlayOpacity ?? 80) / 100})`,
              backdropFilter: legalSettingsData?.blurBackground !== false ? "blur(8px)" : "none",
            }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-6 text-left"
          >
            <motion.div 
              initial={legalSettingsData?.popupAnimation === "scale" ? { scale: 0.9, opacity: 0 } : { y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={legalSettingsData?.popupAnimation === "scale" ? { scale: 0.9, opacity: 0 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`glass-panel w-full p-8 rounded-3xl relative max-h-[80vh] overflow-y-auto ${legalSettingsData?.popupWidth || "max-w-2xl"}`}
            >
              <button 
                onClick={() => setIsPrivacyOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gold transition-colors duration-300 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/40 font-bold"
              >
                ✕
              </button>
              <span className="text-[9px] font-sans text-gold uppercase tracking-widest">{privacyPolicyData?.smallBadge || "USER PRIVACY"}</span>
              <h3 className="font-sans text-2xl text-gold font-bold mb-6 mt-1">{privacyPolicyData?.popupTitle || "Privacy Policy"}</h3>
              <div className="text-gray-300 text-xs md:text-sm leading-relaxed space-y-4 font-light">
                {legalSettingsData?.showLastUpdated !== false && (
                  <p><strong>Effective Date: {privacyPolicyData?.effectiveDate || "July 7, 2026"}</strong></p>
                )}
                {privacyPolicyData?.introParagraph && <p>{privacyPolicyData.introParagraph}</p>}
                
                {Array.isArray(privacyPolicyData?.sections) && [...privacyPolicyData.sections]
                  .filter((s: any) => s.status !== "Inactive")
                  .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                  .map((sec: any, idx: number) => (
                    <div key={sec.id || idx} className="mt-4">
                      <h4 className="text-white font-bold mb-1.5 uppercase tracking-wider text-xs">{sec.heading}</h4>
                      <div className="text-gray-400 leading-relaxed text-xs" dangerouslySetInnerHTML={{ __html: sec.description }} />
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms of Service Modal */}
      <AnimatePresence>
        {isTermsOpen && legalSettingsData?.showTerms !== false && (
          <div 
            onClick={(e) => {
              if (legalSettingsData?.closeOnOutsideClick !== false && e.target === e.currentTarget) {
                setIsTermsOpen(false);
              }
            }}
            style={{
              backgroundColor: `rgba(0, 0, 0, ${(legalSettingsData?.overlayOpacity ?? 80) / 100})`,
              backdropFilter: legalSettingsData?.blurBackground !== false ? "blur(8px)" : "none",
            }}
            className="fixed inset-0 z-[99999] flex items-center justify-center p-6 text-left"
          >
            <motion.div 
              initial={legalSettingsData?.popupAnimation === "scale" ? { scale: 0.9, opacity: 0 } : { y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={legalSettingsData?.popupAnimation === "scale" ? { scale: 0.9, opacity: 0 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`glass-panel w-full p-8 rounded-3xl relative max-h-[80vh] overflow-y-auto ${legalSettingsData?.popupWidth || "max-w-2xl"}`}
            >
              <button 
                onClick={() => setIsTermsOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-gold transition-colors duration-300 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-black/40 font-bold"
              >
                ✕
              </button>
              <span className="text-[9px] font-sans text-gold uppercase tracking-widest">{termsPolicyData?.smallBadge || "LEGAL PROTOCOLS"}</span>
              <h3 className="font-sans text-2xl text-gold font-bold mb-6 mt-1">{termsPolicyData?.popupTitle || "Terms of Service"}</h3>
              <div className="text-gray-300 text-xs md:text-sm leading-relaxed space-y-4 font-light">
                {legalSettingsData?.showLastUpdated !== false && (
                  <p><strong>Effective Date: {termsPolicyData?.effectiveDate || "July 7, 2026"}</strong></p>
                )}
                {termsPolicyData?.introParagraph && <p>{termsPolicyData.introParagraph}</p>}
                
                {Array.isArray(termsPolicyData?.sections) && [...termsPolicyData.sections]
                  .filter((s: any) => s.status !== "Inactive")
                  .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                  .map((sec: any, idx: number) => (
                    <div key={sec.id || idx} className="mt-4">
                      <h4 className="text-white font-bold mb-1.5 uppercase tracking-wider text-xs">{sec.title}</h4>
                      <div className="text-gray-400 leading-relaxed text-xs" dangerouslySetInnerHTML={{ __html: sec.body }} />
                    </div>
                  ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};


