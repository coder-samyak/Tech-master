import React, { useState, useEffect } from "react";
import { Scale, Calendar, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";

export const Terms: React.FC = () => {
  const { dbData } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [liveTermsData, setLiveTermsData] = useState<any>(null);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/terms`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveTermsData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Terms fetch error:", e);
      }
    };
    fetchTerms();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const rawData = liveTermsData || dbData?.termsPolicy || localDb?.termsPolicy || {};

  const smallBadge = rawData.smallBadge || "LEGAL PROTOCOLS";
  const popupTitle = rawData.popupTitle || "Terms of Service";
  const effectiveDate = rawData.effectiveDate || "July 7, 2026";
  const versionNumber = rawData.versionNumber || "v3.1";
  const introParagraph = rawData.introParagraph || "By browsing this platform, subscribing to our mailing list, or submitting inquiries, you agree to these Terms of Service.";

  const defaultSections = [
    {
      id: "sec-1",
      title: "Intellectual Property",
      body: "All site designs, 3D shaders, systems blueprints, and video snippets are the trademark properties of Aman and Tech Master Labs unless stated otherwise."
    },
    {
      id: "sec-2",
      title: "User License",
      body: "You are granted a limited license to explore our portfolio and code projects for educational research. Scraping, cloning, or distributing source codes commercially without express written consent is strictly prohibited."
    },
    {
      id: "sec-3",
      title: "Acceptable Use & Sandbox",
      body: "Users must interact with our digital assets in good faith without attempting DDoS vectors, API key tampering, or malicious script injection."
    }
  ];

  const sectionsList = (rawData.sections && rawData.sections.length > 0) ? rawData.sections : defaultSections;

  return (
    <div className="relative text-white min-h-screen pt-24 pb-16 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-4xl mx-auto text-left mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-4"
        >
          <span className="typo-badge">{smallBadge}</span>
          <span className="px-3 py-1 bg-gold/10 text-gold border border-gold/20 rounded-full text-xs font-mono">
            {versionNumber}
          </span>
        </motion.div>

        <h1 className="typo-h1 mb-6">
          {popupTitle.split(" ")[0]} <br />
          <span className="text-gold italic font-bold">{popupTitle.split(" ").slice(1).join(" ") || "Service"}</span>.
        </h1>

        <div className="flex items-center gap-6 text-xs text-gray-400 font-mono mb-8">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" /> Effective: {effectiveDate}
          </span>
          <span className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-gold" /> Legally Binding
          </span>
        </div>

        <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-3xl bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-md">
          {introParagraph}
        </p>
      </section>

      {/* Terms Clauses Accordion */}
      <section className="max-w-4xl mx-auto text-left flex flex-col gap-4 relative z-10">
        {sectionsList.map((sec: any, idx: number) => {
          const isExpanded = expandedId === (sec.id || idx.toString());

          return (
            <div
              key={sec.id || idx}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold/25 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : (sec.id || idx.toString()))}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0 font-mono text-xs">
                    {idx + 1}
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-white leading-relaxed">
                    {sec.title || sec.heading}
                  </h3>
                </div>

                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div 
                      className="px-6 md:px-8 pb-8 pt-2 border-t border-white/5 text-xs md:text-sm text-gray-400 font-light leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: sec.body || sec.description }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </div>
  );
};
