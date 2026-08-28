import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Play, X } from "lucide-react";
import * as Icons from "lucide-react";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import { LuxuryCard } from "../components/LuxuryCard";
import { AnimatedCounter } from "../components/AnimatedCounter";

const getIcon = (name: string, className = "w-6 h-6 text-gold", color?: string) => {
  const IconComponent = (Icons as any)[name];
  const style = color ? { color } : undefined;
  return IconComponent ? <IconComponent className={className} style={style} /> : <Icons.HelpCircle className={className} style={style} />;
};

export const Testimonials: React.FC = () => {
  const { dbData } = useData();
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [liveTestimonialsData, setLiveTestimonialsData] = useState<any>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/testimonials`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveTestimonialsData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Testimonials fetch error:", e);
      }
    };
    fetchTestimonials();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const rawData = liveTestimonialsData || dbData?.testimonialsPageData || localDb?.testimonialsPageData;
  const page = rawData || {};
  
  const hero = page.hero || {
    smallBadge: "COMMUNITY ACCLAIM",
    title: "Student Placements & Academics Success",
    highlightText: "Academics Success",
    description: "Discover reviews from Aman's mentored students, university professors, and tech partners who have integrated our curricula."
  };
  const successStats = page.successStats || [
    { id: '1', label: 'Placement Rate', value: '98', suffix: '%', icon: 'Award', color: '#D4AF37' },
    { id: '2', label: 'Average Salary', value: '14', suffix: 'LPA', icon: 'TrendingUp', color: '#00E5FF' },
    { id: '3', label: 'Students Hired', value: '1,200', suffix: '+', icon: 'Users', color: '#aa3bff' },
    { id: '4', label: 'Tech Partners', value: '45', suffix: '+', icon: 'Briefcase', color: '#FF007F' }
  ];
  const videoTestimonials = page.videoTestimonials || [
    { id: '1', name: 'Rahul Sharma', role: 'SDE-2', company: 'Amazon', duration: '2:15', thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', video: '' },
    { id: '2', name: 'Priya Patel', role: 'Frontend Engineer', company: 'Microsoft', duration: '1:45', thumbnail: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80', video: '' }
  ];
  const writtenTestimonials = page.writtenTestimonials || [
    { id: '1', name: 'Arjun Desai', designation: 'Backend Developer', company: 'Uber', rating: 5, review: 'The curriculum completely changed my perspective on distributed systems and system design architectures.', photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' },
    { id: '2', name: 'Neha Gupta', designation: 'Data Engineer', company: 'Meta', rating: 5, review: 'Aman’s teaching methodology is phenomenal. The practical approach helped me crack the toughest interviews.', photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98a?auto=format&fit=crop&w=150&q=80' },
    { id: '3', name: 'Vikram Singh', designation: 'Full Stack Engineer', company: 'Google', rating: 5, review: 'The live coding sessions were eye-opening. I gained the confidence to build and deploy scalable applications.', photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80' }
  ];
  const categories = page.categories || [
    { id: 'cat1', title: 'Software Engineering', icon: 'Terminal', description: 'Advanced programming tracks' },
    { id: 'cat2', title: 'Data Science', icon: 'Database', description: 'Analytics and ML tracks' }
  ];
  const featuredQuote = page.featuredQuote || {
    showSection: true,
    quote: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    subtitle: "Computer Scientist",
    accentColor: "#D4AF37"
  };
  const whatWeDo = page.whatWeDo || [
    { id: 'op1', title: 'Technical Interview Prep', subtitle: 'Algorithms & System Design', description: 'Intensive preparation for FAANG level interviews.', icon: 'Code' },
    { id: 'op2', title: 'Resume Review', subtitle: 'ATS Optimization', description: 'Crafting resumes that get shortlisted by top companies.', icon: 'FileText' }
  ];
  const seo = page.seo || {};
  const sectionSettings = page.sectionSettings || {};

  const isSectionActive = (id: string) => {
    return sectionSettings[id]?.status !== "Inactive";
  };

  // SEO configuration updates
  if (seo.metaTitle) {
    document.title = seo.metaTitle;
    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) metaDesc.setAttribute("content", seo.metaDescription || "");
  }

  // Active items lists
  const activeStats = successStats
    .filter((s: any) => s.status !== "Inactive")
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const activeVideos = videoTestimonials
    .filter((v: any) => v.status !== "Inactive")
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const activeWritten = writtenTestimonials
    .filter((w: any) => w.status !== "Inactive")
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const activeCategories = categories
    .filter((c: any) => c.status !== "Inactive")
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const activeWhatWeDo = whatWeDo
    .filter((w: any) => w.status !== "Inactive")
    .sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  // Determine sections layout sequence
  const defaultSectionsList = [
    { id: "hero", render: () => renderHero() },
    { id: "successStats", render: () => renderStats() },
    { id: "videoTestimonials", render: () => renderVideos() },
    { id: "writtenTestimonials", render: () => renderWritten() },
    { id: "categories", render: () => renderCategories() },
    { id: "featuredQuote", render: () => renderQuote() },
    { id: "whatWeDo", render: () => renderWhatWeDoSection() }
  ];

  const sortedSections = [...defaultSectionsList].sort((a, b) => {
    const orderA = sectionSettings[a.id]?.order ?? 99;
    const orderB = sectionSettings[b.id]?.order ?? 99;
    return orderA - orderB;
  });

  function renderHero() {
    if (!isSectionActive("hero")) return null;
    return (
      <div key="hero" className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="typo-badge mb-4"
        >
          {hero.smallBadge || "COMMUNITY ACCLAIM"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="typo-h2 mb-6"
        >
          {hero.title ? (
            <>
              {hero.title.split(hero.highlightText || "")[0]}
              {hero.highlightText && <span className="text-gold italic font-bold">{hero.highlightText}</span>}
              {hero.title.split(hero.highlightText || "")[1]}
            </>
          ) : (
            <>
              Student Placements & <br />
              <span className="text-gold italic font-bold">Academics Success</span>
            </>
          )}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          {hero.description || "Discover reviews from Aman's mentored students, university professors, and tech partners who have integrated our curricula."}
        </motion.p>
      </div>
    );
  }

  function renderStats() {
    if (!isSectionActive("successStats") || activeStats.length === 0) return null;
    return (
      <motion.div
        key="successStats"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.0 }}
        className="glass-panel p-8 md:p-12 rounded-3xl text-center max-w-4xl mx-auto border border-gold/10 mb-16 relative z-10"
      >
        <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-6">STUDENT PLACEMENT MATRIX</span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {activeStats.map((stat: any, idx: number) => {
            const statColor = stat.color || "#D4AF37";
            return (
              <div key={stat.id || idx} className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-3">
                  {getIcon(stat.icon || "Award", "w-4 h-4", statColor)}
                </div>
                 <div className="flex items-baseline justify-center" style={{ color: statColor }}>
                  <AnimatedCounter 
                    value={stat.value} 
                    className="font-serif text-3xl sm:text-4xl font-black block mb-1" 
                  />
                  {stat.suffix && <span className="font-serif text-xl font-bold ml-0.5">{stat.suffix}</span>}
                </div>
                <span className="text-gray-400 text-[10px] uppercase tracking-[1px] font-mono mt-1">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    );
  }

  function renderVideos() {
    if (!isSectionActive("videoTestimonials") || activeVideos.length === 0) return null;
    return (
      <div key="videoTestimonials" className="mb-20 relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="typo-badge mb-4">WATCH EXPERIENCES</p>
          <h2 className="typo-h2">
            Video <span className="text-gold italic font-bold">Testimonials</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeVideos.map((video: any, idx: number) => (
            <div 
              key={video.id || idx} 
              className="glass-panel p-4 rounded-3xl group relative overflow-hidden border-t border-white/5 hover:border-gold/30 transition-all duration-500"
            >
              <div className="aspect-video w-full rounded-2xl overflow-hidden relative flex items-center justify-center bg-black">
                <img 
                  src={mediaUrl(video.thumbnail) || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80"} 
                  alt={video.name} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 absolute inset-0" 
                />
                <button 
                  onClick={() => setActiveVideo(mediaUrl(video.video) || null)}
                  className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center backdrop-blur-md border border-gold/50 z-10 cursor-pointer group-hover:scale-110 transition-transform duration-300 outline-none"
                >
                  <Play className="w-6 h-6 text-gold fill-gold ml-1" />
                </button>
                <div className="absolute bottom-4 left-4 z-10 text-left">
                  <span className="font-serif text-lg text-white block">{video.name}</span>
                  <span className="text-[9px] uppercase font-mono tracking-[1px] text-gold block mt-1">
                    {video.role}, {video.company}
                  </span>
                  {video.duration && (
                    <span className="text-[8.5px] uppercase font-mono text-gray-400 block mt-0.5">
                      Duration: {video.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function renderWritten() {
    if (!isSectionActive("writtenTestimonials") || activeWritten.length === 0) return null;
    return (
      <div key="writtenTestimonials" className="mb-20 relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="typo-badge mb-4">STUDENT FEEDBACK</p>
          <h2 className="typo-h2">
            Written <span className="text-gold italic font-bold">Endorsements</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activeWritten.map((test: any, idx: number) => (
            <LuxuryCard key={test.id || idx} accentColor="#D4AF37" index={idx}>
              <div className="flex justify-between items-start mb-6">
                <Quote className="w-8 h-8 text-gold/20" />
                <div className="flex gap-0.5">
                  {[...Array(Number(test.rating || 5))].map((_, sIdx) => (
                    <Star key={sIdx} className="w-3.5 h-3.5 fill-gold stroke-gold" />
                  ))}
                </div>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm font-light italic leading-relaxed mb-8 flex-grow">
                "{test.review}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-auto">
                <img
                  src={mediaUrl(test.photo) || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"}
                  alt={test.name}
                  className="w-10 h-10 rounded-full border border-white/10 object-cover"
                />
                <div className="text-left flex-grow">
                  <h4 className="text-white font-bold text-xs uppercase tracking-[0.5px]">
                    {test.name}
                  </h4>
                  <span className="text-gray-400 text-[9px] uppercase tracking-[1px] font-mono block">
                    {test.designation || "Partner"}
                  </span>
                  <span className="text-gold text-[8px] uppercase tracking-[1px] font-mono block mt-0.5">
                    {test.company}
                  </span>
                </div>
                {test.logo && (
                  <img src={mediaUrl(test.logo)} alt="Logo" className="w-8 h-8 object-contain opacity-50 max-w-[60px]" />
                )}
              </div>
            </LuxuryCard>
          ))}
        </div>
      </div>
    );
  }

  function renderCategories() {
    if (!isSectionActive("categories") || activeCategories.length === 0) return null;
    return (
      <div key="categories" className="mb-20 relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="typo-badge mb-4">AREAS OF SERVICE</p>
          <h2 className="typo-h2">
            Dynamic <span className="text-gold italic font-bold">Categories</span>
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button 
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${activeCategory === "all" ? "bg-gold text-black font-bold" : "border border-white/10 text-white hover:border-gold"}`}
          >
            All Tracks
          </button>
          {activeCategories.map((cat: any) => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${activeCategory === cat.id ? "bg-gold text-black font-bold" : "border border-white/10 text-white hover:border-gold"}`}
            >
              {cat.title}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeCategories
            .filter((c: any) => activeCategory === "all" || c.id === activeCategory)
            .map((cat: any, idx: number) => (
              <LuxuryCard key={cat.id || idx} accentColor="#D4AF37" index={idx}>
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {getIcon(cat.icon || "Film", "w-5 h-5 text-gold")}
                </div>
                <h3 className="font-serif text-lg text-white font-medium mb-2">{cat.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed font-light">{cat.description}</p>
              </LuxuryCard>
            ))}
        </div>
      </div>
    );
  }

  function renderQuote() {
    if (!isSectionActive("featuredQuote") || featuredQuote.showSection === false) return null;
    return (
      <div 
        key="featuredQuote"
        className="max-w-4xl mx-auto my-20 p-12 rounded-3xl relative overflow-hidden border border-white/10 text-center shadow-2xl"
        style={{ background: featuredQuote.background || "linear-gradient(to right, #0a0a0a, #141414)" }}
      >
        <Quote className="w-16 h-16 text-gold/5 absolute -top-4 -left-4 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <p className="font-serif text-xl sm:text-2xl text-white/90 italic leading-relaxed max-w-2xl">
            "{featuredQuote.quote || "The best way to predict the future is to invent it."}"
          </p>
          <div className="mt-4">
            <span className="block font-bold text-xs uppercase tracking-[2px]" style={{ color: featuredQuote.accentColor || "#D4AF37" }}>
              {featuredQuote.author || "Alan Kay"}
            </span>
            <span className="block text-gray-500 text-[10px] uppercase tracking-[1px] font-mono mt-0.5">
              {featuredQuote.subtitle || "Computer Scientist"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  function renderWhatWeDoSection() {
    if (!isSectionActive("whatWeDo") || activeWhatWeDo.length === 0) return null;
    return (
      <div key="whatWeDo" className="mb-20 relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="typo-badge mb-4">WHAT WE DO</p>
          <h2 className="typo-h2">
            Core <span className="text-gold italic font-bold">Operations</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeWhatWeDo.map((op: any, idx: number) => (
            <LuxuryCard key={op.id || idx} accentColor="#D4AF37" index={idx}>
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  {getIcon(op.icon || "Compass", "w-5 h-5 text-gold")}
                </div>
                <span className="text-[9px] uppercase font-mono tracking-[1px] text-gray-500">Operation 0{idx + 1}</span>
              </div>
              <h3 className="font-serif text-xl text-white font-medium mb-1">{op.title}</h3>
              {op.subtitle && <span className="text-gray-400 text-[9px] uppercase tracking-[1px] font-mono block mb-4">{op.subtitle}</span>}
              <p className="text-gray-400 text-xs sm:text-sm font-light leading-relaxed mb-6">{op.description}</p>
              {op.image && (
                <div className="w-full h-40 rounded-xl overflow-hidden mb-6 border border-white/5">
                  <img src={mediaUrl(op.image)} className="w-full h-full object-cover" alt={op.title} />
                </div>
              )}
              {op.buttonText && op.buttonLink && (
                <a 
                  href={op.buttonLink} 
                  className="inline-flex items-center gap-1 text-[10px] uppercase font-mono tracking-widest text-gold hover:text-white transition-colors"
                >
                  {op.buttonText} &rarr;
                </a>
              )}
            </LuxuryCard>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {sortedSections.map(sec => sec.render())}

      {/* Video Modal Player Overlay */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <div className="relative w-full max-w-4xl aspect-video bg-zinc-950 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
              <button 
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white/80 hover:text-white z-10 transition-colors cursor-pointer outline-none"
              >
                <X className="w-5 h-5" />
              </button>
              <video src={activeVideo} className="w-full h-full object-contain" autoPlay controls />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
