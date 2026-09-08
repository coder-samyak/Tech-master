import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDatabase } from '../../context/DatabaseContext';
import { useSEO } from '../../hooks/useSEO';
import { Mail, Phone, MapPin, Linkedin, Send, Settings, ArrowRight } from 'lucide-react';

const YoutubeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

export const VisitorContact = () => {
  useSEO('pseo-contact');
  const { db, addItem } = useDatabase();

  const hero = db?.contactHeroSetup || {};
  const info = db?.contactInfoSetup || {};
  const wa = db?.contactWhatsAppSetup || {};
  const map = db?.contactMapSetupData || {};
  const formCfg = db?.contactFormConfig || {};
  const fields = db?.contactFormFields || [];
  const categories = db?.contactCategoriesSetup || [];
  const socials = db?.contactSocialLinksSetup || [];
  const vis = db?.contactVisibilitySetup || {};

  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem('enquiries', {
      senderName: formData.Name || 'Unknown',
      email: formData.Email || 'Unknown',
      category: formData.Category || 'General',
      message: formData.Message || 'No message provided.',
      status: 'Unread',
      createdAt: new Date().toISOString()
    });
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormData({}); }, 4000);
  };

  const renderIcon = (iconStr) => {
    switch(iconStr?.toLowerCase()) {
      case 'instagram': return <InstagramIcon className="w-4 h-4" />;
      case 'linkedin': return <Linkedin className="w-4 h-4" />;
      case 'youtube': return <YoutubeIcon className="w-4 h-4" />;
      case 'mail': return <Mail className="w-4 h-4" />;
      case 'phone': return <Phone className="w-4 h-4" />;
      case 'map-pin': return <MapPin className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative text-white min-h-screen pt-32 pb-24 px-6 overflow-hidden">
      
      {/* Hero */}
      {vis.hero !== false && hero.enable !== false && (
        <section className="max-w-7xl mx-auto text-left mb-20 relative z-10">
          {hero.glowEnable !== false && (
            <>
              <div className="absolute top-1/4 left-1/3 w-[30vw] h-[30vw] aurora-glow-blue opacity-15 pointer-events-none" />
              <div className="absolute bottom-1/4 left-1/4 w-[30vw] h-[30vw] aurora-glow-purple opacity-10 pointer-events-none" />
            </>
          )}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {hero.label && <span className="text-[10px] uppercase tracking-[6px] text-luxury-gold font-bold mb-4 block">{hero.label}</span>}
            <h1 className="font-serif text-5xl sm:text-7xl font-light leading-tight">
              {hero.mainLine1} <br/> <span className="text-luxury-gold italic font-bold">{hero.highlight}</span>
            </h1>
            {hero.description && <p className="text-zinc-400 mt-6 max-w-lg font-light leading-relaxed">{hero.description}</p>}
          </motion.div>
        </section>
      )}

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Column A: Contact Form */}
        <div className="lg:col-span-7">
          {vis.form !== false && formCfg.enable !== false && (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="border border-white/10 bg-black/40 backdrop-blur-md p-8 md:p-12 rounded-2xl relative overflow-hidden">
                
                {submitted ? (
                   <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center h-full py-20">
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6">
                        <Send className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h3 className="font-serif text-2xl mb-2">{formCfg.successTitle || "Sent!"}</h3>
                      <p className="text-zinc-400 max-w-sm">{formCfg.successDesc || "We will reply shortly."}</p>
                   </motion.div>
                ) : (
                  <>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-luxury-gold mb-8">{formCfg.title || "Inquiry Form"}</h3>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                      {fields.filter(f => f.enable !== false).sort((a,b)=>(a.order||0)-(b.order||0)).map(f => {
                        const isSelect = f.label.toLowerCase().includes('category') || f.label.toLowerCase().includes('inquiry');
                        const isTextarea = f.label.toLowerCase().includes('message');
                        
                        if (isSelect) {
                          return (
                            <div key={f.id} className="flex flex-col">
                              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{f.label} {f.required && <span className="text-luxury-gold">*</span>}</label>
                              <select required={f.required} onChange={e => setFormData(p => ({...p, Category: e.target.value}))} className="bg-transparent border-b border-zinc-800 pb-3 text-white focus:outline-none focus:border-luxury-gold transition-colors text-sm rounded-none">
                                <option value="" disabled selected className="bg-zinc-900">{f.placeholder}</option>
                                {categories.filter(c => c.status !== false).map(c => <option key={c.id} value={c.value} className="bg-zinc-900">{c.name}</option>)}
                              </select>
                            </div>
                          );
                        }
                        
                        if (isTextarea) {
                          return (
                            <div key={f.id} className="flex flex-col">
                              <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{f.label} {f.required && <span className="text-luxury-gold">*</span>}</label>
                              <textarea required={f.required} onChange={e => setFormData(p => ({...p, Message: e.target.value}))} placeholder={f.placeholder} rows="4" className="bg-transparent border-b border-zinc-800 pb-3 text-white focus:outline-none focus:border-luxury-gold transition-colors text-sm resize-none" />
                            </div>
                          );
                        }

                        return (
                          <div key={f.id} className="flex flex-col">
                            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">{f.label} {f.required && <span className="text-luxury-gold">*</span>}</label>
                            <input required={f.required} onChange={e => {
                               if (f.label.toLowerCase().includes('name')) setFormData(p => ({...p, Name: e.target.value}));
                               if (f.label.toLowerCase().includes('email')) setFormData(p => ({...p, Email: e.target.value}));
                            }} type="text" placeholder={f.placeholder} className="bg-transparent border-b border-zinc-800 pb-3 text-white focus:outline-none focus:border-luxury-gold transition-colors text-sm rounded-none" />
                          </div>
                        );
                      })}
                      <button type="submit" className="mt-4 w-fit px-8 py-4 bg-white text-black font-semibold text-xs tracking-widest uppercase hover:bg-luxury-gold transition-colors flex items-center gap-3 group rounded-full">
                        {formCfg.buttonText || "Submit"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </div>

        {/* Column B: Info, Map, Socials */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          
          {/* Contact Info */}
          {vis.info !== false && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex flex-col gap-8">
              {info.enableEmail !== false && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest flex items-center gap-2">{renderIcon(info.emailIcon)} Email Address</span>
                  <a href={`mailto:${info.email}`} className="text-lg text-white hover:text-luxury-gold transition-colors">{info.email}</a>
                </div>
              )}
              {info.enablePhone !== false && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest flex items-center gap-2">{renderIcon(info.phoneIcon)} Telephone</span>
                  <a href={`tel:${info.phone}`} className="text-lg text-white hover:text-luxury-gold transition-colors">{info.phone}</a>
                </div>
              )}
              {info.enableLocation !== false && (
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-bold text-luxury-gold uppercase tracking-widest flex items-center gap-2">{renderIcon(info.locationIcon)} {info.locationTitle}</span>
                  <p className="text-lg text-white">{info.address}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* WhatsApp Action */}
          {vis.whatsapp !== false && wa.enable !== false && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <a href={`https://wa.me/${wa.number?.replace(/\s+/g, '')}`} target={wa.openNewTab !== false ? "_blank" : "_self"} rel="noreferrer" className="block border border-[#25D366]/30 bg-[#25D366]/10 p-6 rounded-2xl hover:bg-[#25D366]/20 hover:border-[#25D366]/50 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white"><Phone className="w-5 h-5"/></div>
                  <div>
                    <h5 className="font-bold text-white text-sm mb-1">{wa.buttonText}</h5>
                    <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{wa.description}</p>
                  </div>
                </div>
              </a>
            </motion.div>
          )}

          {/* Social Links */}
          {vis.social !== false && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }} className="flex gap-4 flex-wrap">
              {socials.filter(s => s.status !== false).sort((a,b)=>(a.order||0)-(b.order||0)).map(s => (
                <a key={s.id} href={s.url} target={s.newTab !== false ? "_blank" : "_self"} rel="noreferrer" className="w-12 h-12 rounded-full border border-zinc-800 bg-zinc-950 flex items-center justify-center text-zinc-400 hover:text-luxury-gold hover:border-luxury-gold transition-all">
                  {renderIcon(s.icon)}
                </a>
              ))}
            </motion.div>
          )}

          {/* Google Map */}
          {vis.map !== false && map.enable !== false && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
              <div className={`overflow-hidden ${map.rounded !== false ? 'rounded-2xl' : ''} ${map.darkMode !== false ? 'grayscale contrast-125' : ''}`}>
                <iframe src={map.url} width="100%" height={map.height || "300"} style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="w-full"></iframe>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
};
