import React from "react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import { LuxuryCard } from "../components/LuxuryCard";
import { AnimatedCounter } from "../components/AnimatedCounter";

export const Collaborations: React.FC = () => {
  const { dbData } = useData();
  const [liveCollabData, setLiveCollabData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchCollaborations = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/collaborations`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveCollabData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Collaborations fetch error:", e);
      }
    };
    fetchCollaborations();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const defaultCollaborations = {
    hero: {
      eyebrowText: "BRAND COOPERATIONS",
      title: "Alliances & Brand Collaborations",
      highlightedTitle: "Brand Collaborations",
      description: "We join forces with leading technology companies and cloud giants to build open-source tools, launch hackathons, and deliver industry-relevant education."
    },
    brandCarousel: ["GOOGLE CLOUD", "AWS", "GITHUB", "VERCEL", "STRIPE", "NVIDIA", "MICROSOFT", "SHOPIFY"],
    partners: [
      {
        id: "pt-1",
        name: "Vercel",
        type: "Frontend Cloud Partner",
        logo: "VC",
        featuredWork: "Next.js Masterclass Series",
        description: "Official cloud infrastructure sponsorship powering all interactive coding sandboxes for Next Univerz.",
        accentColor: "#D4AF37"
      },
      {
        id: "pt-2",
        name: "Google Cloud",
        type: "Infrastructure Sponsor",
        logo: "GC",
        featuredWork: "Global AI Hackathon 2026",
        description: "Providing $500,000 in Vertex AI credits for developer cohorts and live stream workshops.",
        accentColor: "#00E5FF"
      }
    ],
    metrics: [
      { value: "50+", label: "Brand Partners" },
      { value: "$2M+", label: "Sponsored Cloud Credits" },
      { value: "20+", label: "Global Hackathons" },
      { value: "5M+", label: "Campaign Impressions" }
    ],
    campaigns: [
      { id: "cp-1", title: "Vercel: Build in Public", description: "A 30-day challenge where 10,000 developers built and deployed Next.js applications on Vercel.", accentColor: "#D4AF37", buttonText: "View Highlight" },
      { id: "cp-2", title: "GitHub Education Tour", description: "Sponsored university tour reaching 50 campuses to promote open-source contributions.", accentColor: "#00E5FF", buttonText: "View Highlight" }
    ],
    history: {
      eyebrow: "TIMELINE",
      title: "Collaboration History",
      highlightedTitle: "History",
      description: "Since our first brand deal in 2018, we have maintained long-term relationships with the world's most innovative companies. Our history is built on delivering genuine value to both the developer community and our partners.",
      cardTitle: "From Startups to Enterprises",
      cardDescription: "Whether it's an early-stage AI tool or an established cloud provider, we tailor our integration to fit the product's unique value proposition."
    },
    process: [
      { stepNumber: "01", title: "Discovery & Alignment" },
      { stepNumber: "02", title: "Creative Strategy & Scripting" },
      { stepNumber: "03", title: "Production & Integration" },
      { stepNumber: "04", title: "Launch & Analytics" }
    ],
    testimonials: [
      { quote: "Working with Tech Master has been transformative. Their ability to explain complex APIs to junior developers drove massive adoption for our new features.", personName: "Sarah Jenkins", company: "Vercel", accentColor: "#D4AF37" },
      { quote: "The engagement on the sponsored hackathon was unprecedented. We reached exactly the demographic we were aiming for.", personName: "David Chen", company: "Google Cloud", accentColor: "#00E5FF" }
    ]
  };

  const hero = { ...defaultCollaborations.hero, ...(localDb?.collaborationsPage?.hero || {}), ...(dbData?.collaborationsPage?.hero || {}), ...(liveCollabData?.hero || {}) };

  const rawCarousel = (liveCollabData?.brandCarousel || dbData?.collaborationsPage?.brandCarousel || localDb?.collaborationsPage?.brandCarousel || defaultCollaborations.brandCarousel);
  const validCarousel = (Array.isArray(rawCarousel) && rawCarousel.length > 0) ? rawCarousel : defaultCollaborations.brandCarousel;
  const brandCarousel = validCarousel.map((b: any) => typeof b === 'string' ? b : (b.brandName || b.name || b));

  const rawPartners = (liveCollabData?.partners || dbData?.collaborationsPage?.partners || localDb?.collaborationsPage?.partners || defaultCollaborations.partners);
  const validPartners = (Array.isArray(rawPartners) && rawPartners.length > 0) ? rawPartners : defaultCollaborations.partners;
  const partners = validPartners.filter((p: any) => p.status === "Active" || p.status === true || p.status === undefined);

  const rawMetrics = (liveCollabData?.metrics || dbData?.collaborationsPage?.metrics || localDb?.collaborationsPage?.metrics || defaultCollaborations.metrics);
  const validMetrics = (Array.isArray(rawMetrics) && rawMetrics.length > 0) ? rawMetrics : defaultCollaborations.metrics;
  const metrics = validMetrics.filter((m: any) => m.status === "Active" || m.status === true || m.status === undefined);

  const rawCampaigns = (liveCollabData?.campaigns || dbData?.collaborationsPage?.campaigns || localDb?.collaborationsPage?.campaigns || defaultCollaborations.campaigns);
  const validCampaigns = (Array.isArray(rawCampaigns) && rawCampaigns.length > 0) ? rawCampaigns : defaultCollaborations.campaigns;
  const campaigns = validCampaigns.filter((c: any) => c.status === "Active" || c.status === true || c.status === undefined);

  const history = { ...defaultCollaborations.history, ...(localDb?.collaborationsPage?.history || {}), ...(dbData?.collaborationsPage?.history || {}), ...(liveCollabData?.history || {}) };

  const rawProcess = (liveCollabData?.process || dbData?.collaborationsPage?.process || localDb?.collaborationsPage?.process || defaultCollaborations.process);
  const validProcess = (Array.isArray(rawProcess) && rawProcess.length > 0) ? rawProcess : defaultCollaborations.process;
  const process = validProcess.filter((pr: any) => pr.status === "Active" || pr.status === true || pr.status === undefined);

  const rawTestimonials = (liveCollabData?.testimonials || dbData?.collaborationsPage?.testimonials || localDb?.collaborationsPage?.testimonials || defaultCollaborations.testimonials);
  const validTestimonials = (Array.isArray(rawTestimonials) && rawTestimonials.length > 0) ? rawTestimonials : defaultCollaborations.testimonials;
  const testimonials = validTestimonials.filter((t: any) => t.status === "Active" || t.status === true || t.status === undefined);

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4 uppercase tracking-[2px]"
        >
          {hero.eyebrowText || "BRAND COOPERATIONS"}
        </motion.div>
        
        <h1 className="typo-h1 mb-8">
          {hero.title ? hero.title.replace(hero.highlightedTitle || "", "") : "Alliances & "} <br />
          <span className="text-gold italic font-bold">{hero.highlightedTitle || "Brand Collaborations"}</span>.
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          {hero.description}
        </p>
      </section>

      {/* Interactive Logo Carousel */}
      <section className="mb-12 py-12 border-y border-white/5 bg-black/40 overflow-hidden relative z-10">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ ease: "linear", duration: 35, repeat: Infinity }}
          className="flex w-max"
        >
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center">
              {brandCarousel.map((brand: string, j: number) => (
                <span key={`${brand}-${j}-${i}`} className="font-serif text-2xl sm:text-3xl font-black text-gold tracking-[6px] hover:text-white transition-colors duration-300 cursor-default select-none uppercase px-12 sm:px-16">
                  {brand}
                </span>
              ))}
            </div>
          ))}
        </motion.div>
      </section>

      {/* Partners Grid */}
      {partners.length > 0 && (
        <section className="max-w-7xl mx-auto text-left grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 relative z-10">
          {partners.map((item: any, idx: number) => (
            <LuxuryCard key={item.id || item._id || idx} accentColor={item.accentColor} index={idx}>
              <div className="flex justify-between items-start mb-6">
                <div 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-serif text-xs font-bold"
                  style={{ color: item.accentColor }}
                >
                  {item.logo ? item.logo.substring(0, 2) : item.name.substring(0, 2)}
                </div>
                <span className="text-[9px] font-mono tracking-[1.5px] text-gold uppercase">
                  {item.type}
                </span>
              </div>

              <div className="mb-4">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-gold transition-colors duration-300">
                  {item.name}
                </h3>
                {item.featuredWork && (
                  <span className="text-gray-400 text-[9px] uppercase tracking-[1px] font-mono block mt-1">
                    Featured: {item.featuredWork}
                  </span>
                )}
              </div>

              <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed pt-4 border-t border-white/5 mt-4">
                {item.description}
              </p>
            </LuxuryCard>
          ))}
        </section>
      )}

      {/* Success Metrics */}
      {metrics.length > 0 && (
        <section className="max-w-7xl mx-auto mb-12 px-6 relative z-10 text-center">
          <p className="typo-badge mb-4">IMPACT</p>
          <h2 className="typo-h2 mb-12">
            Success <span className="text-gold italic font-bold">Metrics</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {metrics.map((stat: any, idx: number) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-gold/30 transition-all duration-300">
                <AnimatedCounter value={stat.value} className="font-serif text-4xl font-black text-gold block mb-2" />
                <span className="text-gray-400 text-xs tracking-[1px] uppercase font-mono">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case Studies & Campaign Highlights */}
      {campaigns.length > 0 && (
        <section className="max-w-7xl mx-auto mb-12 px-6 relative z-10">
          <div className="text-center mb-12">
            <p className="typo-badge mb-4">SHOWCASE</p>
            <h2 className="typo-h2">
              Case Studies & <span className="text-gold italic font-bold">Campaigns</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {campaigns.map((camp: any, idx: number) => (
              <div key={camp.id || idx} className="glass-panel p-8 rounded-3xl border-l-2 hover:bg-white/5 transition-all cursor-pointer text-left" style={{ borderLeftColor: camp.accentColor || "#D4AF37" }}>
                <h3 className="font-serif text-2xl text-white mb-2">{camp.title}</h3>
                <p className="text-gray-400 text-sm font-light mb-4">{camp.description}</p>
                <span className="typo-btn" style={{ color: camp.accentColor || "#D4AF37" }}>{camp.buttonText || "View Highlight"}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Collaboration History & Process */}
      <section className="max-w-7xl mx-auto mb-12 px-6 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="typo-badge mb-4">{history.eyebrow || "TIMELINE"}</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mb-6">
              {history.title ? history.title.replace(history.highlightedTitle || "", "") : "Collaboration "} <span className="text-gold italic font-bold">{history.highlightedTitle || "History"}</span>
            </h2>
            <p className="typo-card-desc mb-6">
              {history.description}
            </p>
            <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-gold">
              <h4 className="text-white font-bold mb-2">{history.cardTitle}</h4>
              <p className="text-gray-400 text-xs font-light">{history.cardDescription}</p>
            </div>
          </div>
          <div>
            <p className="typo-badge mb-4">HOW IT WORKS</p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white mb-6">
              Partnership <span className="text-gold italic font-bold">Process</span>
            </h2>
            <div className="flex flex-col gap-4">
              {process.map((step: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <span className="text-gold font-mono font-bold">{step.stepNumber || `0${idx + 1}`}</span>
                  <span className="text-white text-sm font-semibold">{step.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {testimonials.length > 0 && (
        <section className="max-w-7xl mx-auto mb-12 px-6 relative z-10 text-center">
          <p className="typo-badge mb-4">ENDORSEMENTS</p>
          <h2 className="typo-h2 mb-12">
            Partner <span className="text-gold italic font-bold">Testimonials</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            {testimonials.map((test: any, idx: number) => (
              <div key={idx} className="glass-panel p-8 rounded-3xl border border-white/5">
                <p className="text-gray-400 font-light italic mb-6">"{test.quote}"</p>
                <div className="flex items-center gap-4">
                  {mediaUrl(test.avatar) ? (
                    <img src={mediaUrl(test.avatar)} alt={test.personName} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/50 flex items-center justify-center text-luxury-gold font-bold font-mono text-xs">
                      {test.personName ? test.personName.substring(0, 2) : 'TM'}
                    </div>
                  )}
                  <div>
                    <h4 className="text-white font-bold text-sm">{test.personName || test.name}</h4>
                    <p className="text-gold text-xs">{test.designation || test.role}, {test.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
