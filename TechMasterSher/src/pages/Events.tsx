import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Award, ArrowUpRight, Check } from "lucide-react";
import { LuxuryCard } from "../components/LuxuryCard";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Events: React.FC = () => {
  const { eventsData: cmsEvents, updateSection } = useData();
  const [liveEventsData, setLiveEventsData] = useState<any>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/events`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveEventsData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Events fetch error:", e);
      }
    };
    fetchEvents();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const defaultEvents = [
    {
      id: "evt-1",
      title: "React India 2024 Keynote",
      type: "INTERNATIONAL KEYNOTE",
      date: "OCTOBER 2024",
      location: "GOA, INDIA",
      attendance: "1,500+ ATTENDEES",
      description: "Delivering opening keynote on Concurrent Rendering patterns & real-time WebGL UI architectures.",
      accentColor: "#D4AF37",
      media: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "evt-2",
      title: "AWS Community Day",
      type: "SYSTEM ARCHITECTURE TALK",
      date: "DECEMBER 2024",
      location: "BENGALURU, INDIA",
      attendance: "3,000+ ATTENDEES",
      description: "Live breakdown of multi-region database replication & serverless container scaling.",
      accentColor: "#00E5FF",
      media: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "evt-3",
      title: "Open Source Developers Summit",
      type: "PANEL DISCUSSION",
      date: "MARCH 2025",
      location: "NEW DELHI, INDIA",
      attendance: "2,200+ ATTENDEES",
      description: "Panel discussion on democratizing software engineering curricula and developer autonomy.",
      accentColor: "#aa3bff",
      media: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const rawEvents = (liveEventsData?.eventsList || (Array.isArray(liveEventsData) && liveEventsData.length > 0 ? liveEventsData : null) || cmsEvents || localDb?.eventsData || defaultEvents);
  const validEvents = (Array.isArray(rawEvents) && rawEvents.length > 0) ? rawEvents : defaultEvents;
  const eventsData = validEvents.filter((evt: any) => evt.status !== "Inactive");

  const defaultHero = {
    smallBadge: "PUBLIC ENGAGEMENTS",
    headline: "Keynote Speaking &",
    highlightWord: "Live Coding Seminars",
    description: "Aman shares developer insights, soft-skills blueprints, and live systems architecture demonstrations on global stages."
  };

  const hero = { ...defaultHero, ...(localDb?.eventsData_CMS?.hero || {}), ...(liveEventsData?.hero || {}) };

  const defaultChips = [
    "Event Hosting", "Guest Appearance", "Corporate Events", "Fashion Shows", 
    "Product Events", "Meetups", "Workshops", "Conferences"
  ];

  const rawChips = liveEventsData?.engagementTypes || localDb?.eventsData_CMS?.engagementTypes || defaultChips;
  const engagementChips = (Array.isArray(rawChips) ? rawChips : defaultChips).map((c: any) => typeof c === 'string' ? c : (c.type || c.name || c));

  const bookingSection = {
    smallBadge: "SPEAKER BOOKINGS",
    headlineLine1: "Bring Aman to",
    highlightWord: "Your Event",
    description: "Aman keynote schedules fill up rapidly. Bookings are open for university developer panels, virtual technical summits, DevFests, or corporate software consulting cycles.",
    pressKitNote: "Full Press Kit and AV Rider available upon approval.",
    ...(localDb?.eventsData_CMS?.bookingSection || {}),
    ...(liveEventsData?.bookingSection || {})
  };

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    organization: "",
    details: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email) return;

    const existingInquiries = localDb?.bookingInquiries || [];
    const newInquiry = {
      id: `inq-${Date.now()}`,
      ...bookingForm,
      status: "Pending",
      date: new Date().toLocaleDateString()
    };

    const nextDb = {
      ...localDb,
      bookingInquiries: [newInquiry, ...existingInquiries]
    };

    try {
      localStorage.setItem('zenvora_db', JSON.stringify(nextDb));
      if (updateSection) updateSection('bookingInquiries', nextDb.bookingInquiries);
    } catch (err) {}

    setIsSubmitted(true);
    setBookingForm({ name: "", email: "", organization: "", details: "" });
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  useEffect(() => {
    gsap.fromTo(
      ".event-card-reveal",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".events-grid-trigger",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background aurora glows */}
      <div className="absolute top-1/4 left-1/4 w-[45vw] h-[45vw] aurora-glow-purple opacity-20 pointer-events-none -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] aurora-glow-gold opacity-10 pointer-events-none translate-x-1/2" />

      {/* Hero Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="typo-badge mb-4 uppercase tracking-[2px]"
        >
          {hero.smallBadge || "PUBLIC ENGAGEMENTS"}
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="typo-h2 mb-6"
        >
          {hero.headline || "Keynote Speaking &"} <br />
          <span className="text-gold italic font-bold">{hero.highlightWord || "Live Coding Seminars"}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-gray-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed"
        >
          {hero.description}
        </motion.p>
      </div>

      {/* Main events catalog */}
      <div className="max-w-6xl mx-auto relative z-10 events-grid-trigger">
        <p className="typo-badge mb-10 text-center uppercase tracking-[2px]">FEATURED CONFERENCES & KEYNOTES</p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 text-left">
          {eventsData.map((evt: any, idx: number) => (
            <LuxuryCard key={evt.id || idx} accentColor={evt.accentColor} className="event-card-reveal" index={idx}>
              <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/5 mb-6 relative">
                <img
                  src={mediaUrl(evt.media) || mediaUrl(evt.image) || mediaUrl(evt.imageUrl) || mediaUrl(evt.bannerImage)}
                  alt={evt.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-black/80 border border-white/10 px-3 py-1 rounded-full text-[9px] uppercase tracking-[1px] font-mono text-gold font-bold">
                  {evt.type}
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase font-mono tracking-[1px]">
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] uppercase font-mono tracking-[1px]">
                  <span>{evt.location}</span>
                </div>
              </div>

              <h3 className="font-serif text-xl text-white font-medium mb-3 group-hover:text-gold transition-colors duration-300">
                {evt.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed font-light mb-6">
                {evt.description}
              </p>

              <div className="flex items-center gap-1.5 text-[10px] text-gold font-mono uppercase tracking-[1.5px] mt-auto pt-4 border-t border-white/5">
                <span>Attendance: {evt.attendance}</span>
              </div>
            </LuxuryCard>
          ))}
        </div>

        {/* Engagement Types */}
        <section className="mb-12 pt-12 border-t border-white/5 relative z-10 text-center">
          <p className="typo-badge mb-4">CAPABILITIES</p>
          <h2 className="typo-h2 mb-10">
            Engagement <span className="text-gold italic font-bold">Types</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {engagementChips.map((type: string, idx: number) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="px-6 py-3 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm hover:border-gold hover:text-gold transition-colors duration-300 cursor-default"
              >
                {type}
              </motion.div>
            ))}
          </div>
        </section>

        {/* Media & Highlights */}
        <section className="mb-12 relative z-10 text-center">
          <div className="text-center mb-12">
            <p className="typo-badge mb-4">MEDIA ARCHIVE</p>
            <h2 className="typo-h2">
              Gallery, Videos & <span className="text-gold italic font-bold">Highlights</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 grid grid-cols-2 gap-6">
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 group">
                <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80" alt="Event Gallery 1" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="aspect-square rounded-2xl overflow-hidden border border-white/5 group">
                <img src="https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=600&q=80" alt="Event Gallery 2" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              </div>
            </div>
            <div className="md:col-span-1 rounded-2xl overflow-hidden border border-white/5 relative group flex items-center justify-center bg-black min-h-[300px]">
              <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80" alt="Video Thumbnail" loading="lazy" className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-700 absolute inset-0" />
              <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center backdrop-blur-sm border border-gold/50 z-10 cursor-pointer group-hover:scale-110 transition-transform duration-300">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-gold border-b-[8px] border-b-transparent ml-1" />
              </div>
              <div className="absolute bottom-6 left-6 z-10 text-left">
                <span className="text-[10px] uppercase font-bold tracking-[2px] text-gold block mb-1">RECAP</span>
                <span className="font-serif text-xl text-white">Mainstage 2023</span>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0 }}
          className="glass-panel p-8 md:p-16 rounded-3xl text-left max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="md:w-1/2">
            <span className="text-[10px] uppercase font-bold tracking-[3px] text-gold block mb-2">{bookingSection.smallBadge || "SPEAKER BOOKINGS"}</span>
            <h2 className="font-serif text-3xl font-light text-white mb-6 leading-tight">
              {bookingSection.headlineLine1 || "Bring Aman to"} <br />
              <span className="text-gold italic font-bold">{bookingSection.highlightWord || "Your Event"}</span>
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-light mb-6">
              {bookingSection.description}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono tracking-[1px] text-gray-400">
              <Award className="w-4 h-4 text-gold shrink-0" />
              <span>{bookingSection.pressKitNote || "Full Press Kit and AV Rider available upon approval."}</span>
            </div>
          </div>

          <form onSubmit={handleBookingSubmit} className="md:w-1/2 w-full flex flex-col gap-4">
            {isSubmitted ? (
              <div className="p-6 bg-gold/10 border border-gold/30 rounded-2xl text-center space-y-2">
                <Check className="w-8 h-8 text-gold mx-auto" />
                <h4 className="text-gold font-serif font-bold text-lg">Booking Request Sent!</h4>
                <p className="text-gray-300 text-xs font-light">Our team will review your event schedule and reach out directly.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="YOUR NAME"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
                  />
                  <input
                    type="email"
                    required
                    placeholder="EMAIL ADDRESS"
                    value={bookingForm.email}
                    onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
                  />
                </div>
                <input
                  type="text"
                  placeholder="EVENT NAME / ORGANIZATION"
                  value={bookingForm.organization}
                  onChange={(e) => setBookingForm({ ...bookingForm, organization: e.target.value })}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300"
                />
                <textarea
                  rows={4}
                  placeholder="EVENT DETAILS & SPEECH TOPICS..."
                  value={bookingForm.details}
                  onChange={(e) => setBookingForm({ ...bookingForm, details: e.target.value })}
                  className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-xs font-mono uppercase text-white focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                />
                <button type="submit" className="py-3.5 bg-white text-black font-bold uppercase text-[10px] tracking-[2.5px] rounded-xl hover:bg-gold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-lg cursor-pointer">
                  Submit Speaker Booking <ArrowUpRight className="w-4 h-4" />
                </button>
              </>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};
