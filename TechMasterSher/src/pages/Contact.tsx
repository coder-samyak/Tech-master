import React, { useState, useEffect } from "react";
import { Mail, MapPin, Send } from "lucide-react";
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
        const baseUrl = import.meta.env.VITE_API_URL || "https://techmasterbackend12.onrender.com/api/v1";
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
  
  const emailVal = contactInfo.email;
  const addressVal = contactInfo.address;

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

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "https://techmasterbackend12.onrender.com/api/v1";
      const res = await fetch(`${baseUrl}/public/enquiry`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          candidateName: formData.name,
          email: formData.email,
          category: formData.category,
          subject: formData.category,
          company: formData.company,
          brand: formData.company,
          message: formData.message,
          outline: formData.message
        })
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "Failed to submit inquiry");
      }

      // Also save to local storage for instant dashboard updates
      try {
        const savedDb = localStorage.getItem('zenvora_db');
        const dbObj = savedDb ? JSON.parse(savedDb) : {};
        const currentEnquiries = Array.isArray(dbObj.contactEnquiries) ? dbObj.contactEnquiries : [];
        
        const newLead = json.data || {
          id: `enq-${Date.now()}`,
          name: formData.name,
          email: formData.email,
          company: formData.company,
          category: formData.category,
          message: formData.message,
          date: new Date().toISOString().split('T')[0],
          status: "New"
        };

        const updatedEnquiries = [newLead, ...currentEnquiries];
        dbObj.contactEnquiries = updatedEnquiries;
        dbObj.enquiries = updatedEnquiries;
        localStorage.setItem('zenvora_db', JSON.stringify(dbObj));

        // Cross-tab broadcast notification
        try {
          const bc = new BroadcastChannel("zenvora_cms_sync");
          bc.postMessage({ type: "NEW_ENQUIRY", enquiry: newLead });
          bc.close();
        } catch (bErr) {}
      } catch (lErr) {}

      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || "Inquiry submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-roboto">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gold/5 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-900/10 blur-[120px] pointer-events-none rounded-full" />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-mono tracking-[3px] text-gold uppercase font-bold mb-3 block">
            {contactHero.badge}
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight mb-4 leading-tight">
            {contactHero.heading} <span className="text-gold italic font-bold">{contactHero.highlightHeading}</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto font-light leading-relaxed">
            Direct portal for brand deals, keynote bookings, high-scale engineering masterclasses, and executive consulting.
          </p>
        </motion.div>
      </section>

      {/* Main Content Layout Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-start">
        {/* Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-10">
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
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7 flex flex-col gap-8">
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
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">YOUR NAME :</label>
                  <input
                    type="text"
                    required
                    placeholder="Arian Devi"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">EMAIL ADDRESS :</label>
                  <input
                    type="email"
                    required
                    placeholder="arian@devi.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto font-sans"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">INQUIRY CATEGORY :</label>
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
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">COMPANY & BRAND :</label>
                  <input
                    type="text"
                    placeholder="Google Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">INQUIRY OUTLINE :</label>
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
        </div>
      </section>
    </div>
  );
};
