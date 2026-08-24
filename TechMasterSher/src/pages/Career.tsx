import React, { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { useData } from "../context/DataContext";
import { mediaUrl } from "../utils/media";

export const Career: React.FC = () => {
  const { careerData, dbData } = useData();

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const activeDb = { ...localDb, ...dbData };

  const defaultJobs = [
    {
      id: "job-1",
      title: "Senior Video Editor & Colorist",
      department: "Production Suite",
      team: "Production Suite",
      type: "Full Time",
      location: "Jaipur / Remote",
      salary: "$18,000 - $25,000",
      description: "Crafting high-octane 4K YouTube breakdowns, fast-paced shorts, and cinematic color grades.",
      status: "Active",
      visible: true
    },
    {
      id: "job-2",
      title: "Full-Stack Curriculum Architect",
      department: "Next Univerz",
      team: "Next Univerz",
      type: "Full Time",
      location: "Remote",
      salary: "$30,000 - $45,000",
      description: "Designing interactive web dev sandboxes, system design masterclasses, and coding challenges.",
      status: "Active",
      visible: true
    }
  ];

  const rawJobs = (careerData && careerData.length > 0)
    ? careerData
    : (activeDb?.careers || activeDb?.careersCMS?.jobs || defaultJobs);

  const careerList = rawJobs.filter((c: any) => c.active !== false && c.status !== false && c.visible !== false && !c.deleted);
  
  const careerHero = activeDb?.careerHero || activeDb?.careersCMS?.hero || {
    badge: "JOIN THE TEAM",
    titleLine1: "Join Aman's",
    titleLine2: "Creator & Education Lab",
    description: "We look for cinematic editors, curriculum writers, and developer advocates who want to construct the future of tech education."
  };

  const cultureHeader = activeDb?.cultureHeader || activeDb?.careersCMS?.cultureHeader || {
    badge: "OUR DNA",
    titleLine1: "Culture &",
    titleLine2: "Benefits"
  };

  const defaultCulture = [
    { title: "Learning Budget", description: "$2,000 annual stipend for courses, books, and conference tickets." },
    { title: "Health & Wellness", description: "Premium global health coverage and mental wellness stipends." },
    { title: "Creator Autonomy", description: "Own your projects. We cultivate leaders who can drive their own vision." },
    { title: "Remote First", description: "Work from anywhere in the world. We believe in output, not office hours." }
  ];
  const careerCulture = (activeDb?.careerCulture || activeDb?.careersCMS?.culture || defaultCulture).filter((c: any) => c.visible !== false && !c.deleted);

  const processHeader = activeDb?.processHeader || activeDb?.careersCMS?.processHeader || {
    badge: "HOW WE HIRE",
    titleLine1: "The",
    titleLine2: "Process"
  };

  const defaultProcess = [
    { step: "01", title: "Application Review", description: "We review your portfolio, GitHub, and application answers." },
    { step: "02", title: "Intro Call", description: "A 30-minute culture and vibe check with our ops team." },
    { step: "03", title: "Technical Task", description: "A paid, asynchronous take-home project relevant to your role." },
    { step: "04", title: "Final Interview", description: "A conversation with Aman and the leads. No live whiteboarding." }
  ];
  const careerProcess = (activeDb?.careerProcess || activeDb?.careersCMS?.process || defaultProcess).filter((p: any) => p.visible !== false && !p.deleted);

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: "",
    portfolioLink: "",
    whyJoin: "",
    coverLetter: "",
    resumeFile: null as File | null
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    if (!formData.resumeFile) {
      setErrorMsg("Please upload a resume file.");
      setIsSubmitting(false);
      return;
    }

    try {
      const dataPayload = new FormData();
      dataPayload.append("name", formData.name);
      dataPayload.append("email", formData.email);
      dataPayload.append("phone", formData.phone);
      dataPayload.append("jobTitle", formData.jobTitle || "General Application");
      dataPayload.append("experience", formData.portfolioLink);
      dataPayload.append("message", formData.whyJoin);
      dataPayload.append("coverLetter", formData.coverLetter);
      dataPayload.append("resume", formData.resumeFile);

      const response = await fetch(`${import.meta.env.VITE_API_URL || "https://techmasterbackend.onrender.com/api/v1"}` + "/cms/public/resume", {
        method: "POST",
        body: dataPayload
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative text-white min-h-screen pt-24 pb-8 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] aurora-glow-blue opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-10 pointer-events-none" />

      {careerHero.bgVideoUrl || careerHero.bgImageUrl ? (
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          {careerHero.bgVideoUrl ? (
            <video src={mediaUrl(careerHero.bgVideoUrl)} className="w-full h-full object-cover" autoPlay loop muted playsInline />
          ) : (
            <img src={mediaUrl(careerHero.bgImageUrl)} className="w-full h-full object-cover" alt="Background" />
          )}
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ) : null}

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto text-left mb-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="typo-badge mb-4"
        >
          {careerHero.badge || "JOIN THE TEAM"}
        </motion.div>
        
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-white mb-6">
          {careerHero.titleLine1 || "Join TechMaster's Team"} <br />
          <span className="text-gold italic font-bold">{careerHero.titleLine2 || "Creator & Education Lab"}</span>.
        </h1>

        <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
          {careerHero.description || "We look for cinematic editors, curriculum writers, and developer advocates who want to construct the future of tech education."}
        </p>
      </section>

      {/* Active Roles */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-left mb-12 relative z-10">
        {/* Roles List */}
        <div>
          <h3 className="font-serif text-2xl text-white font-bold mb-6">Open Positions</h3>
          <div className="flex flex-col gap-6">
            {careerList.map((role: any) => (
              <div key={role.id || role._id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-gold/25 transition-all duration-300">
                <span className="text-gold font-mono text-[9px] uppercase tracking-[1.5px] block mb-1">
                  Team: {role.team || role.department}
                </span>
                <h4 className="font-serif text-xl font-bold text-white mb-4">{role.role || role.title}</h4>
                <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                  {role.description}
                </p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-light pt-4 border-t border-white/5">
                  <span className="flex items-center">
                    Employment: {role.type || "Full Time"}
                  </span>
                  <span className="flex items-center">
                    Location: {role.location}
                  </span>
                  {role.salary && (
                    <span className="flex items-center">
                      Budget: {role.salary || role.pricing}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture Application Form */}
        <div className="glass-panel p-8 rounded-3xl border border-white/5 relative h-fit career-form-container font-roboto">
          <h3 className="font-serif text-2xl text-white font-bold mb-6">Direct Application</h3>
          
          {submitted ? (
            <div className="py-12 text-center font-roboto">
              <span className="text-gold text-4xl block mb-4">✓</span>
              <h4 className="font-serif text-xl font-bold mb-2">Application Received</h4>
              <p className="text-gray-400 text-xs font-light font-roboto">
                Our operations director will review your materials and reach out soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="flex flex-col gap-5 font-roboto">
              {errorMsg && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-xs font-light font-roboto">
                  {errorMsg}
                </div>
              )}
              <div>
                <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">FULL NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Arya Patel"
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
                  placeholder="arya@code.net"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">PHONE NUMBER</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs uppercase text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">POSITION APPLYING FOR</label>
                <select
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-gray-400 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                >
                  <option value="" className="bg-[#121212] text-white font-roboto">Select a Position (Optional)</option>
                  {careerList.map((role: any) => (
                    <option key={role.id || role._id} value={role.title || role.role} className="bg-[#121212] text-white font-roboto">
                      {role.title || role.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">PORTFOLIO / GITHUB LINK</label>
                <input
                  type="url"
                  required
                  placeholder="https://github.com/arya"
                  value={formData.portfolioLink}
                  onChange={(e) => setFormData({ ...formData, portfolioLink: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">WHY JOIN TECH MASTER?</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly tell us how you want to contribute to the education space."
                  value={formData.whyJoin}
                  onChange={(e) => setFormData({ ...formData, whyJoin: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">COVER LETTER</label>
                <textarea
                  rows={4}
                  placeholder="Tell us why you are the best fit for this role."
                  value={formData.coverLetter}
                  onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors duration-300 font-roboto"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-[2px] text-gold font-bold block mb-2 font-roboto">UPLOAD RESUME (PDF/DOC/PPT)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  required
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files && files.length > 0) {
                      setFormData({ ...formData, resumeFile: files[0] });
                    }
                  }}
                  className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[9px] file:uppercase file:tracking-[1px] file:font-bold file:bg-gold file:text-black hover:file:bg-gold/80 transition-colors duration-300 cursor-pointer font-roboto"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gold hover:bg-gold-light text-black font-bold uppercase text-xs tracking-[2px] rounded-xl flex items-center justify-center gap-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer font-roboto"
                data-cursor="submit"
              >
                {isSubmitting ? "Submitting Application..." : "Send Application"}
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Culture & Benefits */}
      <section className="max-w-7xl mx-auto mt-16 mb-12 relative z-10 text-left">
        <div className="text-center mb-16">
          <p className="typo-badge mb-4">{cultureHeader.badge || "OUR DNA"}</p>
          <h2 className="typo-h2 mb-6">
            {cultureHeader.titleLine1 || "Culture &"} <span className="text-gold italic font-bold">{cultureHeader.titleLine2 || "Benefits"}</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {careerCulture.map((item: any, idx: number) => (
            <div key={item.id || idx} className="glass-panel p-8 rounded-3xl border-t border-white/5 hover:border-gold/30 transition-all duration-300 text-center">
              <h4 className="font-serif text-xl font-bold text-white mb-3">{item.title}</h4>
              <p className="text-gray-400 text-sm font-light">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hiring Process */}
      <section className="max-w-5xl mx-auto mb-16 relative z-10">
        <div className="text-center mb-16">
          <p className="typo-badge mb-4">{processHeader.badge || "HOW WE HIRE"}</p>
          <h2 className="typo-h2 mb-6">
            {processHeader.titleLine1 || "The"} <span className="text-gold italic font-bold">{processHeader.titleLine2 || "Process"}</span>
          </h2>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative before:absolute before:top-8 before:bottom-8 before:left-8 md:before:left-[12.5%] md:before:top-12 md:before:bottom-auto md:before:w-[75%] before:w-0.5 md:before:h-0.5 before:bg-white/10">
          {careerProcess.map((item: any, idx: number) => (
            <div key={item.id || idx} className="relative z-10 flex md:flex-col items-start md:items-center gap-6 md:gap-4 text-left md:text-center">
              <div className="w-16 h-16 rounded-full bg-[#0d0d0d] border border-gold flex items-center justify-center font-serif text-xl text-gold font-bold shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                {item.step || `0${idx + 1}`}
              </div>
              <div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400 text-xs font-light max-w-[200px]">{item.description || item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
