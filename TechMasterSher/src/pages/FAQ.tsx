import React, { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";

export const FAQ: React.FC = () => {
  const { dbData } = useData();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [liveFaqData, setLiveFaqData] = useState<any>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/faqs`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveFaqData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct FAQ fetch error:", e);
      }
    };
    fetchFaqs();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const rawData = liveFaqData || dbData?.faqPageData || localDb?.faqPageData || {};

  const faqSettings = rawData.settings || {
    badge: "INFORMATION ARCHIVE",
    heading: "Answers &",
    highlightHeading: "Frequently Asked Questions"
  };

  const defaultFaqs = [
    { id: '1', question: "What is your main service?", answer: "We provide enterprise tech solutions.", category: "General", order: 1 }
  ];

  const faqsList = (rawData.faqs && rawData.faqs.length > 0) ? rawData.faqs : defaultFaqs;

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4"
        >
          {faqSettings.badge}
        </motion.div>
        
        <h1 className="typo-h1 mb-8">
          {faqSettings.heading} <br />
          <span className="text-gold italic font-bold">{faqSettings.highlightHeading}</span>.
        </h1>
      </section>

      {/* FAQ Accordion Grid */}
      <section className="max-w-4xl mx-auto text-left flex flex-col gap-5 relative z-10">
        {faqsList.map((faq: any) => {
          const isExpanded = expandedId === faq.id;

          return (
            <div
              key={faq.id}
              className="glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-gold/25 transition-all duration-300"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gold shrink-0">
                    <HelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-white leading-relaxed">
                    {faq.question}
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
                    <div className="px-6 md:px-8 pb-8 pt-2 border-t border-white/5 text-xs md:text-sm text-gray-400 font-light leading-relaxed">
                      {faq.answer}
                    </div>
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
