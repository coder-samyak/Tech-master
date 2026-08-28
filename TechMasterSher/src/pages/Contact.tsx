import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Send, MessageCircle, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";

export const Contact: React.FC = () => {
  const { dbData } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [liveContactData, setLiveContactData] = useState<any>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://techmasterbackend.onrender.com/api/v1";
        const res = await fetch(`${baseUrl}/contact`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveContactData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Contact fetch error:", e);
      }
    };
    fetchContact();
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const rawData = liveContactData || dbData?.contactPageData || localDb?.contactPageData || {};

  const contactHero = rawData.hero || { badge: "DIRECT PORTAL", heading: "Connect &", highlightHeading: "Launch Collaborations" };
  const contactInfo = rawData.info || { email: "aman@techmaster.com", phone: "+91 98765 43210", whatsapp: "919876543210", address: "TechMaster HQ, Silicon Valley" };
  const mapData = rawData.map || { url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580700d987b51%3A0xcb13e9a7e02e60f0!2sSilicon%20Valley!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus" };
  
  const emailVal = contactInfo.email;
  const phoneVal = contactInfo.phone;
  const addressVal = contactInfo.address;
  const whatsappNumber = contactInfo.whatsapp;

  const socialsList = rawData.socials || [
    { platform: "Instagram", handle: "@aman_techmaster", url: "https://instagram.com" },
    { platform: "LinkedIn", handle: "/in/aman-tech", url: "https://linkedin.com" }
  ];

  const inquiryTypes = rawData.categories || [
    { label: "Business Inquiry", value: "business" },
    { label: "Brand Collaboration", value: "collab" }
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: inquiryTypes[0]?.value || "general",
    company: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    const newEnquiry = {
      id: `enq-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      company: formData.company,
      category: formData.category,
      subject: formData.category,
      message: formData.message,
      date: new Date().toISOString().split('T')[0],
      status: "New",
      createdAt: new Date().toISOString()
    };

    const envUrl = import.meta.env.VITE_API_URL || "";
    const apiBases = [
      ...(envUrl ? [envUrl] : []),
      "http://localhost:5000/api/v1",
      "http://localhost:5001/api/v1",
      "https://tech-master-afhx.onrender.com/api/v1",
      "https://techmasterbackend.onrender.com/api/v1"
    ];

    const endpointsToTry: string[] = [];
    apiBases.forEach(base => {
      const cleanBase = base.replace(/\/+$/, "");
      endpointsToTry.push(`${cleanBase}/cms/public/enquiry`);
      endpointsToTry.push(`${cleanBase}/public/enquiry`);
      endpointsToTry.push(`${cleanBase}/cms/public/contact`);
    });

    for (const url of endpointsToTry) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        });
        if (response.ok) {
          break;
        }
      } catch (err) {
        console.warn(`Attempt failed for ${url}:`, err);
      }
    }

    // Broadcast lead over cross-tab channel so admin dashboard on any local port receives it instantly
    try {
      const channel = new BroadcastChannel("zenvora_cms_sync");
      channel.postMessage({ type: "NEW_ENQUIRY", enquiry: newEnquiry });
      channel.close();
    } catch (bcErr) {
      console.warn("BroadcastChannel post warning:", bcErr);
    }

    // Backup to localStorage so admin dashboard & client local state update instantly
    try {
      const saved = localStorage.getItem('zenvora_db');
      let localDbObj = saved ? JSON.parse(saved) : {};
      const currentEnquiries = Array.isArray(localDbObj.contactEnquiries) ? localDbObj.contactEnquiries : [];
      localDbObj.contactEnquiries = [newEnquiry, ...currentEnquiries];
      localDbObj.enquiries = [newEnquiry, ...(Array.isArray(localDbObj.enquiries) ? localDbObj.enquiries : [])];
      localStorage.setItem('zenvora_db', JSON.stringify(localDbObj));
    } catch (e) {
      console.warn("LocalStorage backup warning:", e);
    }

    setSubmitted(true);
    setIsSubmitting(false);
  };

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/4 w-[35vw] h-[35vw] aurora-glow-purple opacity-20 pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] aurora-glow-gold opacity-10 pointer-events-none" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4"
        >
          {contactHero.badge}
        </motion.div>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white mb-6">
          {contactHero.heading} <br />
          <span className="text-gold italic font-bold">{contactHero.highlightHeading}</span>
        </h1>
      </section>

      {/* Contact Layout */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 text-left relative z-10">
        {/* Info & Map Column */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-10">
          <div>
            <h3 className="font-serif text-2xl text-white font-bold mb-6">Direct Channels</h3>
            
            <div className="flex flex-col gap-6">
              {/* Business Email */}
              <div className="flex items-center gap-4 border border-white/5 bg-white/[0.01] p-4 rounded-2xl hover:border-gold/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[1px] opacity-40 block font-mono">BUSINESS EMAIL</span>
                  <a href={`mailto:${emailVal}`} className="text-sm font-bold text-white hover:text-gold transition-colors duration-300">
                    {emailVal}
                  </a>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-center gap-4 border border-white/5 bg-white/[0.01] p-4 rounded-2xl hover:border-gold/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[1px] opacity-40 block font-mono">COMMUNICATION TELEPHONE</span>
                  <a href={`tel:${phoneVal}`} className="text-sm font-bold text-white hover:text-gold transition-colors duration-300">
                    {phoneVal}
                  </a>
                </div>
              </div>

              {/* WhatsApp Button */}
              <div className="flex items-center gap-4 border border-white/5 bg-white/[0.01] p-4 rounded-2xl hover:border-green-500/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="flex-1 flex justify-between items-center pr-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[1px] opacity-40 block font-mono">INSTANT CHAT</span>
                    <span className="text-xs text-gray-300 font-light block">Need answers right away?</span>
                  </div>
                  <a 
                    href={`https://wa.me/${whatsappNumber}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold uppercase tracking-[1.5px] rounded-xl flex items-center gap-1.5 transition-all duration-300 cursor-pointer shadow-lg shadow-green-600/10"
                  >
                    WhatsApp <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Location HQ */}
              <div className="flex items-center gap-4 border border-white/5 bg-white/[0.01] p-4 rounded-2xl hover:border-gold/20 transition-all duration-300">
                <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-[1px] opacity-40 block font-mono">CREATOR HQ</span>
                  <span className="text-sm font-bold text-white">
                    {addressVal}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="w-full">
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-[2px]">Location Map</h4>
            <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01] p-2">
              <iframe 
                src={mapData.url}
                width="100%" 
                height="220" 
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(100%) contrast(90%)" }} 
                allowFullScreen={false} 
                loading="lazy"
                title="Office HQ Map"
                className="rounded-xl opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-8">
          {/* Business Inquiry Form */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 relative contact-form-container font-roboto">
            <h3 className="font-serif text-2xl text-white font-bold mb-6">Business Inquiry Form</h3>

            {submitted ? (
              <div className="py-12 text-center font-roboto">
                <span className="text-gold text-4xl block mb-4">✓</span>
                <h4 className="font-serif text-xl font-bold mb-2">Transmission Logged</h4>
                <p className="text-gray-400 text-xs font-light font-roboto">
                  Your direct booking or collaboration inquiry has been logged successfully. We will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-roboto">
                {errorMsg && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-light font-roboto">
                    {errorMsg}
                  </div>
                )}
                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">YOUR NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="ARIAN DEVI"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    placeholder="ARIAN@DEVI.COM"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">INQUIRY CATEGORY</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                  >
                    {inquiryTypes.map((type: any) => (
                      <option key={type.value} value={type.value} className="bg-[#121212] text-white font-roboto">
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">COMPANY / BRAND</label>
                  <input
                    type="text"
                    placeholder="GOOGLE INC."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">INQUIRY OUTLINE</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide outline dates, audience sizes, sponsorship briefs, or general requests."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase text-xs tracking-[2px] rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-roboto"
                  data-cursor="submit"
                >
                  {isSubmitting ? "Logging Outline..." : "Log Inquiry Details"}
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Social Media Links section */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white mb-4 uppercase tracking-[2px]">Connect Internationally</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {socialsList.map((social: any) => (
                <a 
                  key={social.platform || social.name} 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border border-white/5 bg-white/[0.01] p-4 rounded-2xl flex flex-col justify-between hover:border-gold/30 hover:bg-gold/[0.02] transition-all duration-300"
                >
                  <span className="text-[10px] text-gold uppercase tracking-[1px] font-bold font-mono">{social.platform || social.name}</span>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-white truncate max-w-[80%] font-light">{social.handle}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-gray-500" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
