import React from "react";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { LuxuryCard } from "../components/LuxuryCard";
import { mediaUrl } from "../utils/media";

export const Campaigns: React.FC = () => {
  const { campaignsData } = useData();
  const [liveCampaignData, setLiveCampaignData] = React.useState<any>(null);

  React.useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/campaigns`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveCampaignData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Campaigns fetch error:", e);
      }
    };
    fetchCampaigns();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const defaultCampaignsData = {
    hero: {
      eyebrowText: "INITIATIVE CAMPAIGNS",
      title: "Empowerment Drives & Coding Challenges",
      highlightedTitle: "Coding Challenges",
      description: "Review our campaigns designed to bring cloud services, laptops, coding bootcamps, and career mentoring to students globally."
    },
    campaigns: [
      {
        id: "cp-1",
        title: "Vercel: Build in Public Challenge",
        description: "A 30-day global sprint encouraging developers to deploy full-stack Next.js applications with real-time feedback.",
        reach: "10,000+ Developers",
        sponsor: "Vercel",
        status: "Completed",
        coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        accentColor: "#D4AF37",
        highlights: ["10K+ Registrations", "5,000+ App Deployments", "$50K Cloud Credits"]
      },
      {
        id: "cp-2",
        title: "GitHub Open Source University Tour",
        description: "Visiting 50 university campuses worldwide to teach Git workflows, pull request etiquette, and open-source ethics.",
        reach: "25,000+ Students",
        sponsor: "GitHub",
        status: "Active",
        coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        accentColor: "#00E5FF",
        highlights: ["50 Campus Workshops", "2,500+ PRs Merged", "Exclusive Student Swag"]
      },
      {
        id: "cp-3",
        title: "Google Cloud Vertex AI Cohort",
        description: "Empowering 500 AI enthusiasts with hands-on Vertex AI pipelines, fine-tuning LLMs, and deploying cloud models.",
        reach: "500 AI Fellows",
        sponsor: "Google Cloud",
        status: "Active",
        coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
        accentColor: "#aa3bff",
        highlights: ["500 Fellowships", "$500K Vertex Credits", "Direct Hiring Referrals"]
      }
    ],
    process: [
      { id: "pr-1", stepNumber: "01", title: "1. Campaign Planning", description: "We meticulously outline timelines, allocate resources, and define key performance indicators to ensure every initiative starts with a rock-solid foundation." },
      { id: "pr-2", stepNumber: "02", title: "2. Campaign Strategy", description: "Crafting narrative arcs and selecting the right digital channels to guarantee maximum reach and resonance with the targeted developer demographic." },
      { id: "pr-3", stepNumber: "03", title: "3. Campaign Execution", description: "From high-end video production to live hackathon moderation, our team handles the ground-level execution to bring the strategic vision to life flawlessly." },
      { id: "pr-4", stepNumber: "04", title: "4. Analytics", description: "Real-time monitoring of engagement metrics, audience retention, and click-through rates allows us to pivot and optimize the campaign mid-flight." },
      { id: "pr-5", stepNumber: "05", title: "5. Results", description: "Delivering comprehensive post-campaign reports detailing ROI, brand lift, and total community impact against our initial benchmarks." }
    ],
    successStories: [
      {
        id: "ss-1",
        title: "AWS Educate Drive",
        description: "By gamifying the learning process, we helped AWS register over 25,000 new student accounts in a single month. The campaign significantly lowered their standard customer acquisition cost while providing immense value to learners.",
        linkText: "Read Full Story",
        accentColor: "#D4AF37"
      },
      {
        id: "ss-2",
        title: "MongoDB Hackathon",
        description: "A weekend-long virtual event that produced 500+ open-source database implementations. The campaign established MongoDB as the default backend choice for a new generation of full-stack bootcamps.",
        linkText: "Read Full Story",
        accentColor: "#00E5FF"
      }
    ]
  };

  const hero = { ...defaultCampaignsData.hero, ...(localDb?.campaignsPage?.hero || {}), ...(liveCampaignData?.hero || {}) };

  const rawCampaigns = (liveCampaignData?.campaigns || campaignsData || localDb?.campaignsPage?.campaigns || localDb?.campaigns || defaultCampaignsData.campaigns);
  const activeCampaignsList = Array.isArray(rawCampaigns) && rawCampaigns.length > 0 ? rawCampaigns : defaultCampaignsData.campaigns;

  const rawProcess = (liveCampaignData?.process || localDb?.campaignsPage?.process || defaultCampaignsData.process);
  const processSteps = Array.isArray(rawProcess) && rawProcess.length > 0 ? rawProcess : defaultCampaignsData.process;

  const rawSuccess = (liveCampaignData?.successStories || localDb?.campaignsPage?.successStories || defaultCampaignsData.successStories);
  const successStoriesList = Array.isArray(rawSuccess) && rawSuccess.length > 0 ? rawSuccess : defaultCampaignsData.successStories;

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4 uppercase tracking-[2px]"
        >
          {hero.eyebrowText || "INITIATIVE CAMPAIGNS"}
        </motion.div>
        
        <h1 className="typo-h1 mb-8">
          {hero.title ? hero.title.replace(hero.highlightedTitle || "", "") : "Empowerment Drives & "} <br />
          <span className="text-gold italic font-bold">{hero.highlightedTitle || "Coding Challenges"}</span>.
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          {hero.description}
        </p>
      </section>

      {/* Campaigns Grid */}
      <section className="max-w-7xl mx-auto text-left grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
        {activeCampaignsList.map((item: any, idx: number) => (
          <LuxuryCard key={item.id || idx} accentColor={item.accentColor || "#D4AF37"} index={idx}>
            <div className="flex flex-col h-full justify-between">
              
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                <img
                  src={mediaUrl(item.coverImage) || mediaUrl(item.image) || mediaUrl(item.imageUrl) || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800"}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {item.reach && (
                  <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold">
                    Reach: {item.reach}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mb-4">
                {item.sponsor && (
                  <span className="text-[9px] font-mono text-gold flex items-center gap-1.5 font-bold uppercase">
                    <Calendar className="w-3.5 h-3.5 text-gold" />
                    Sponsor: {item.sponsor}
                  </span>
                )}
                {item.status && (
                  <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] font-mono text-gray-400 uppercase">
                    {item.status}
                  </span>
                )}
              </div>

              <h3 className="font-serif text-2xl text-white font-medium mb-4 group-hover:text-gold transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm font-light leading-relaxed mb-6">
                {item.description}
              </p>

              {Array.isArray(item.highlights) && item.highlights.length > 0 && (
                <ul className="flex flex-col gap-2 pt-4 border-t border-white/5 mt-auto">
                  {item.highlights.map((high: any, hidx: number) => (
                    <li key={hidx} className="flex items-start gap-2 text-[10px] text-gray-400 font-mono">
                      <span>• {typeof high === 'string' ? high : (high.text || high)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </LuxuryCard>
        ))}
      </section>

      {/* Campaign Lifecycle & Process */}
      {processSteps.length > 0 && (
        <section className="max-w-7xl mx-auto mt-16 text-left relative z-10">
          <div className="text-center mb-16">
            <p className="typo-badge mb-4">OUR PROCESS</p>
            <h2 className="typo-h2 mb-6">
              End-to-End <span className="text-gold italic font-bold">Campaign Lifecycle</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {processSteps.map((step: any, idx: number) => (
              <div key={step.id || idx} className={`glass-panel p-8 rounded-2xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 ${idx === 4 ? 'lg:col-span-2' : ''}`}>
                <h3 className="font-serif text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="typo-card-desc">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Client Success Stories */}
          {successStoriesList.length > 0 && (
            <>
              <div className="text-center mb-12">
                <p className="typo-badge mb-4">PROVEN RESULTS</p>
                <h2 className="typo-h2 mb-6">
                  Client <span className="text-gold italic font-bold">Success Stories</span>
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {successStoriesList.map((ss: any, idx: number) => (
                  <div key={ss.id || idx} className="glass-panel p-8 md:p-12 rounded-3xl border border-white/10 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-bl-full pointer-events-none group-hover:bg-gold/20 transition-colors duration-500" />
                    <h3 className="font-serif text-2xl font-bold text-white mb-4">{ss.title}</h3>
                    <p className="typo-card-desc mb-6">
                      {ss.description}
                    </p>
                    <span className="text-gold text-xs font-bold uppercase tracking-[2px] cursor-pointer hover:text-white transition-colors">
                      {ss.linkText || "Read Full Story"} &rarr;
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}

    </div>
  );
};
