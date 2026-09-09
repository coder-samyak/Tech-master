import React, { useState, useRef } from "react";
import { Briefcase, MapPin, DollarSign, Send } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { useDatabase } from "../../context/DatabaseContext";
import { useSEO } from '../../hooks/useSEO';

export const VisitorCareer = () => {
  useSEO('pseo-home');
  const { db, addItem } = useDatabase();
  
  const careerHero = db?.careerHero || {};
  const careers = db?.careers || [];
  const careerCulture = db?.careerCulture || [];
  const careerProcess = db?.careerProcess || [];
  const careerStats = db?.careerStats || {};
  const careerSettings = db?.careerSettings || {};

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    candidateName: '', email: '', portfolioUrl: '', coverLetter: '', resumeFileName: '', resumeFileUrl: ''
  });
  
  const fileRef = useRef(null);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    addItem('resumes', {
      ...formData,
      status: 'New',
      jobApplied: 'General Application',
      rating: 0
    });
    setSubmitted(true);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({...formData, resumeFileName: file.name, resumeFileUrl: URL.createObjectURL(file)});
    }
  };

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] aurora-glow-blue opacity-15 pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-10 pointer-events-none" />

      {/* Hero Header */}
      {careerSettings.showHero !== false && (
        <section className="max-w-7xl mx-auto text-left mb-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[10px] uppercase tracking-[6px] text-luxury-gold font-bold mb-4"
          >
            {careerHero.badge || "JOIN THE TEAM"}
          </motion.div>
          
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light leading-tight mb-8">
            {careerHero.titleLine1 || "Join TechMaster's Team"} <br />
            <span className="text-luxury-gold italic font-bold">{careerHero.titleLine2 || "Creator & Education Lab"}</span>
          </h1>

          <p className="text-gray-400 font-light text-base md:text-lg max-w-2xl leading-relaxed mt-6">
            {careerHero.description || "We look for cinematic editors, curriculum writers, and developer advocates who want to construct the future of tech education."}
          </p>
        </section>
      )}

      {/* Active Roles & Form */}
      {careerSettings.showJobs !== false && (
        <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 text-left mb-24 relative z-10">
          {/* Roles List */}
          <div>
            <h3 className="font-serif text-2xl text-white font-bold mb-6">Open Positions</h3>
            <div className="flex flex-col gap-6">
              {careers.filter(c => c.active !== false).sort((a,b) => (a.order || 1) - (b.order || 1)).map((role) => (
                <div key={role.id} className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-luxury-gold/25 transition-all duration-300 relative overflow-hidden group">
                  {(role.team || role.department) && (role.team || role.department).toLowerCase() !== 'production suite' && (
                    <span className="text-luxury-gold font-mono text-[9px] uppercase tracking-[1.5px] block mb-1">
                      {role.team || role.department}
                    </span>
                  )}
                  <h4 className="font-serif text-xl font-bold text-luxury-gold mb-4">{role.title}</h4>
                  <p className="text-gray-400 text-xs font-light leading-relaxed mb-6">
                    {role.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-light pt-4 border-t border-white/5">
                    <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 text-luxury-gold" /> {role.type || 'Full Time'}</span>
                    <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-luxury-gold" /> {role.location || 'Remote'}</span>
                    {role.salary && <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5 text-luxury-gold" /> {role.salary}</span>}
                  </div>
                </div>
              ))}
              {careers.filter(c => c.active !== false).length === 0 && <p className="text-zinc-500 italic text-sm">No open positions currently available.</p>}
            </div>
          </div>

          {/* Application Form */}
          <div className="glass-panel p-8 rounded-3xl border border-white/5 relative h-fit">
            <h3 className="font-serif text-2xl text-white font-bold mb-6">Direct Application</h3>
            
            {submitted ? (
              <div className="py-12 text-center">
                <span className="text-luxury-gold text-4xl block mb-4">✓</span>
                <h4 className="font-serif text-xl font-bold mb-2">Application Received</h4>
                <p className="text-gray-400 text-xs font-light">
                  Our operations director will review your materials and reach out soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="flex flex-col gap-5">
                <div>
                  <label className="text-[9px] uppercase tracking-[2px] text-luxury-gold font-bold block mb-2">FULL NAME :</label>
                  <input required value={formData.candidateName} onChange={e => setFormData({...formData, candidateName: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-luxury-gold outline-none" />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[2px] text-luxury-gold font-bold block mb-2">EMAIL ADDRESS :</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-luxury-gold outline-none" />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[2px] text-luxury-gold font-bold block mb-2">PORTFOLIO & GITHUB LINK :</label>
                  <input type="url" value={formData.portfolioUrl} onChange={e => setFormData({...formData, portfolioUrl: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-luxury-gold outline-none" />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[2px] text-luxury-gold font-bold block mb-2">WHY JOIN TECH MASTER? :</label>
                  <textarea rows={3} required value={formData.whyJoin || ''} onChange={e => setFormData({...formData, whyJoin: e.target.value})} className="w-full bg-black/60 border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-luxury-gold outline-none" />
                </div>
                <div>
                  <label className="text-[9px] uppercase tracking-[2px] text-luxury-gold font-bold block mb-2">UPLOAD RESUME (PDF/DOC) :</label>
                  <div className="flex gap-2">
                     <button type="button" onClick={() => fileRef.current?.click()} className="bg-luxury-gold text-black font-bold text-[9px] uppercase tracking-[1px] px-4 py-2 rounded-full hover:bg-luxury-gold/80 transition-colors">Choose File</button>
                     <span className="text-zinc-400 text-xs flex items-center">{formData.resumeFileName || 'No file selected'}</span>
                  </div>
                  <input type="file" ref={fileRef} accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" required />
                </div>

                <button type="submit" className="w-full mt-2 py-4 bg-luxury-gold hover:bg-luxury-gold/80 text-black font-bold uppercase text-xs tracking-[2px] rounded-xl flex items-center justify-center gap-2 transition-colors">
                  Send Application <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </section>
      )}

      {/* Culture & Benefits */}
      {careerSettings.showCulture !== false && careerCulture.length > 0 && (
        <section className="max-w-7xl mx-auto mt-16 mb-24 relative z-10 text-left">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[6px] text-luxury-gold font-bold mb-4">OUR DNA</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
              Culture & <span className="text-luxury-gold italic font-bold">Benefits</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {careerCulture.filter(c => c.active !== false).map((benefit, idx) => (
              <div key={benefit.id} className="glass-panel p-8 rounded-3xl border-t border-white/5 hover:border-luxury-gold/30 transition-all duration-300 text-center">
                <h4 className="font-serif text-xl font-bold text-white mb-3">{benefit.title}</h4>
                <p className="text-gray-400 text-sm font-light">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hiring Process */}
      {careerSettings.showProcess !== false && careerProcess.length > 0 && (
        <section className="max-w-5xl mx-auto mb-32 relative z-10">
          <div className="text-center mb-16">
            <p className="text-[10px] uppercase tracking-[6px] text-luxury-gold font-bold mb-4">HOW WE HIRE</p>
            <h2 className="font-serif text-3xl sm:text-5xl font-light text-white mb-6">
              The <span className="text-luxury-gold italic font-bold">Process</span>
            </h2>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative before:absolute before:top-8 before:left-8 md:before:left-0 md:before:top-12 before:w-0.5 md:before:w-full before:h-full md:before:h-0.5 before:bg-white/10">
            {careerProcess.filter(p => p.active !== false).map((item, idx) => (
              <div key={item.id} className="relative z-10 flex md:flex-col items-start md:items-center gap-6 md:gap-4 text-left md:text-center">
                <div className="w-16 h-16 rounded-full bg-[#0d0d0d] border border-luxury-gold flex items-center justify-center font-serif text-xl text-luxury-gold font-bold shrink-0 shadow-gold-glow">
                  {item.step}
                </div>
                <div>
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400 text-xs font-light max-w-[200px]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
};
