import React, { useState, useEffect } from "react";
import { Calendar, Lock, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";

export const Privacy: React.FC = () => {
  const { dbData } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [livePrivacyData, setLivePrivacyData] = useState<any>(null);

  useEffect(() => {
    const fetchPrivacy = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/privacy-policy`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLivePrivacyData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Privacy Policy fetch error:", e);
      }
    };
    fetchPrivacy();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const rawData = livePrivacyData || dbData?.privacyPolicy || localDb?.privacyPolicy || {};

  const smallBadge = rawData.smallBadge || "USER PRIVACY";
  const popupTitle = rawData.popupTitle || "Privacy Policy";
  const effectiveDate = rawData.effectiveDate || "July 7, 2026";
  const versionNumber = rawData.versionNumber || "v2.4";
  const introParagraph = rawData.introParagraph || "Aman & Tech Master Media Labs operates this portfolio and education portal. We respect your privacy and only collect direct email addresses when you subscribe to our newsletter.";

  const defaultSections = [
    {
      id: "sec-1",
      heading: "Data Collection & Use",
      description: "We collect email addresses solely for sending newsletter digests, cohort details, and technical blogs. Your information is never sold, traded, or shared with third-party advertising companies."
    },
    {
      id: "sec-2",
      heading: "Cookies & Caching",
      description: "This platform utilizes basic localized storage and caching systems to maintain animations, 3D settings, and user navigation states smoothly."
    },
    {
      id: "sec-3",
      heading: "Cryptographic Security",
      description: "All direct inquiries and newsletter transmissions are protected with industry-standard cryptographic handshakes and TLS encryption."
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
          <span className="text-gold italic font-bold">{popupTitle.split(" ").slice(1).join(" ") || "Protocols"}</span>.
        </h1>

        <div className="flex items-center gap-6 text-xs text-gray-400 font-mono mb-8">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gold" /> Effective: {effectiveDate}
          </span>
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-green-400" /> End-to-End Encrypted
          </span>
        </div>

        <p className="text-sm md:text-base text-gray-300 font-light leading-relaxed max-w-3xl bg-white/[0.02] border border-white/5 p-6 rounded-3xl backdrop-blur-md">
          {introParagraph}
        </p>
      </section>

      {/* Policy Sections Accordion */}
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
                    {sec.heading}
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
                      dangerouslySetInnerHTML={{ __html: sec.description }}
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
