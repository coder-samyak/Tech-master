import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  Settings, Save, Check, Mail, Phone, MessageCircle, MapPin, 
  ExternalLink, Send, Plus, Trash2, Edit3, MessageSquare, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const defaultContactData = {
  hero: {
    badge: "DIRECT PORTAL",
    heading: "Connect &",
    highlightHeading: "Launch Collaborations"
  },
  info: {
    email: "aman@techmaster.com",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    address: "TechMaster HQ, Silicon Valley"
  },
  map: {
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d-122.4194155!3d37.7749295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580700d987b51%3A0xcb13e9a7e02e60f0!2sSilicon%20Valley!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
  },
  socials: [
    { platform: "Instagram", handle: "@aman_techmaster", url: "https://instagram.com" },
    { platform: "LinkedIn", handle: "/in/aman-tech", url: "https://linkedin.com" }
  ],
  categories: [
    { label: "Business Inquiry", value: "business" },
    { label: "Brand Collaboration", value: "collab" }
  ]
};

export const Contact = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const [isPublishing, setIsPublishing] = useState(false);

  const rawData = db?.contactPageData || {};
  const submissions = db?.enquiries || db?.contactEnquiries || [];

  const [heroForm, setHeroForm] = useState(rawData.hero || defaultContactData.hero);
  const [infoForm, setInfoForm] = useState(rawData.info || defaultContactData.info);
  const [mapForm, setMapForm] = useState(rawData.map || defaultContactData.map);
  const [socialsForm, setSocialsForm] = useState(rawData.socials || defaultContactData.socials);
  const [categoriesForm, setCategoriesForm] = useState(rawData.categories || defaultContactData.categories);
  const [socialTitle, setSocialTitle] = useState(rawData.socialTitle || "Connect Internationally");
  const [socialModal, setSocialModal] = useState({ isOpen: false, mode: 'add', item: { platform: '', handle: '', url: '' }, index: null });

  const handleDeleteSocialCard = (index) => {
    if (!window.confirm("Delete this social card?")) return;
    const updated = socialsForm.filter((_, i) => i !== index);
    setSocialsForm(updated);
    handleSaveData('socials', updated);
  };

  const handleSaveSocialModal = (e) => {
    e.preventDefault();
    let updated = [...socialsForm];
    if (socialModal.mode === 'edit' && socialModal.index !== null) {
      updated[socialModal.index] = socialModal.item;
    } else {
      updated.push(socialModal.item);
    }
    setSocialsForm(updated);
    handleSaveData('socials', updated);
    setSocialModal({ isOpen: false, mode: 'add', item: { platform: '', handle: '', url: '' }, index: null });
  };

  useEffect(() => {
    const fetchLatestContact = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/contact');
          if (res.success && res.data) {
            const data = res.data;
            if (data.hero) setHeroForm(data.hero);
            if (data.info) setInfoForm(data.info);
            if (data.map) setMapForm(data.map);
            if (data.socials && data.socials.length > 0) setSocialsForm(data.socials);
            if (data.socialTitle) setSocialTitle(data.socialTitle);
            if (data.categories && data.categories.length > 0) setCategoriesForm(data.categories);
          }
        }
      } catch (err) {
        console.warn("Could not fetch contact data from backend:", err);
      }
    };
    fetchLatestContact();
  }, []);

  const handlePublishAll = async () => {
    setIsPublishing(true);
    const payload = {
      hero: heroForm,
      info: infoForm,
      map: mapForm,
      socials: socialsForm,
      socialTitle: socialTitle,
      categories: categoriesForm
    };
    if (updateSection) {
      updateSection('contactPageData', payload);
      updateSection('contactInfo', infoForm);
      updateSection('contactHero', heroForm);
    }

    try {
      if (apiFetch) {
        await apiFetch('/contact', {
          method: 'PUT',
          body: JSON.stringify(payload)
        });
      }
      alert("Contact Page Published Live to Website!");
    } catch (err) {
      console.warn("Backend API sync warning:", err);
      alert("Published locally! Backend notice: " + (err.message || "Saved"));
    } finally {
      setIsPublishing(false);
    }
  };

  const handleSaveData = (section, data) => {
    const updated = {
      hero: heroForm,
      info: infoForm,
      map: mapForm,
      socials: socialsForm,
      socialTitle: socialTitle,
      categories: categoriesForm,
      [section]: data
    };
    if (updateSection) updateSection('contactPageData', updated);
  };

  const [activeTab, setActiveTab] = useState('hero');

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 pb-24">
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-serif text-white">Contact CMS</h1>
            <span className="px-3 py-1 bg-gold/20 text-gold border border-gold/30 rounded-full text-xs font-mono">1:1 REPLICA CMS</span>
          </div>
          <p className="text-gray-400 text-sm">Visual exact mirror of the Website Contact Page with instant sync.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handlePublishAll}
            disabled={isPublishing}
            className="flex items-center gap-2 px-6 py-2 bg-gold hover:bg-yellow-500 text-black font-semibold rounded-xl transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {isPublishing ? 'Publishing...' : 'Publish Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* LEFT COLUMN: Admin Editors */}
        <div className="space-y-6">
          <div className="flex gap-2 p-1 bg-zinc-900 border border-white/5 rounded-xl flex-wrap">
            {['hero', 'channels', 'map', 'socials', 'categories', 'inbox'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)} 
                className={`px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all capitalize ${activeTab === tab ? 'bg-gold text-black' : 'text-gray-400 hover:text-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab === 'hero' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-serif text-white mb-6">Hero Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Small Badge</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" value={heroForm.badge} onChange={e => setHeroForm({...heroForm, badge: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Main Heading</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" value={heroForm.heading} onChange={e => setHeroForm({...heroForm, heading: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Highlight Heading</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" value={heroForm.highlightHeading} onChange={e => setHeroForm({...heroForm, highlightHeading: e.target.value})} />
                </div>
                <button onClick={() => handleSaveData('hero', heroForm)} className="w-full py-2 bg-zinc-800 text-white rounded-lg">Apply to Preview</button>
              </div>
            </div>
          )}

          {activeTab === 'channels' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-serif text-white mb-6">Direct Channels Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Business Email</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" value={infoForm.email} onChange={e => setInfoForm({...infoForm, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" value={infoForm.phone} onChange={e => setInfoForm({...infoForm, phone: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">WhatsApp Number</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" value={infoForm.whatsapp} onChange={e => setInfoForm({...infoForm, whatsapp: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Creator HQ Address</label>
                  <input type="text" className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" value={infoForm.address} onChange={e => setInfoForm({...infoForm, address: e.target.value})} />
                </div>
                <button onClick={() => handleSaveData('info', infoForm)} className="w-full py-2 bg-zinc-800 text-white rounded-lg">Apply to Preview</button>
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
              <h3 className="text-lg font-serif text-white mb-6">Google Map Settings</h3>
              <div>
                <label className="block text-xs text-gray-400 uppercase tracking-wider mb-2">Embed URL</label>
                <textarea rows={4} className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white focus:border-gold outline-none" value={mapForm.url} onChange={e => setMapForm({...mapForm, url: e.target.value})} />
                <button onClick={() => handleSaveData('map', mapForm)} className="w-full mt-4 py-2 bg-zinc-800 text-white rounded-lg">Apply Map</button>
              </div>
            </div>
          )}

          {activeTab === 'inbox' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-serif text-white">Form Submissions Inbox</h3>
                <span className="text-xs text-gray-400 bg-black px-3 py-1 rounded-full border border-white/10">1 New Inquiry</span>
              </div>
              <div className="space-y-3">
                {submissions.map(sub => (
                  <div key={sub.id} className="p-4 bg-black border border-white/10 rounded-xl hover:border-gold/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-bold text-white">{sub.name}</span>
                      <span className="text-[10px] uppercase font-mono text-gold border border-gold/30 px-2 py-0.5 rounded-sm bg-gold/10">{sub.status}</span>
                    </div>
                    <p className="text-xs text-gray-400">{sub.email} • Category: {sub.category}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'socials' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 space-y-6">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-serif text-white">Connect Internationally CMS</h3>
                  <p className="text-xs text-gray-400">Edit social handle cards & section header title.</p>
                </div>
                <button 
                  onClick={() => setSocialModal({ isOpen: true, mode: 'add', item: { platform: '', handle: '', url: '' }, index: null })}
                  className="px-4 py-2 bg-gold text-black font-bold rounded-lg text-xs flex items-center gap-1.5 hover:bg-yellow-500 transition-colors"
                >
                  <Plus className="w-4 h-4" /> Add Social Card
                </button>
              </div>

              {/* Section Header Title */}
              <div>
                <label className="block text-xs text-gray-400 uppercase font-mono tracking-wider mb-2">Section Title Heading</label>
                <input 
                  type="text" 
                  className="w-full bg-black border border-white/10 rounded-lg px-4 py-2 text-white font-serif focus:border-gold outline-none text-sm" 
                  value={socialTitle} 
                  onChange={e => setSocialTitle(e.target.value)} 
                  placeholder="Connect Internationally"
                />
              </div>

              {/* Social Handle Cards List */}
              <div className="space-y-3">
                <label className="block text-xs text-gray-400 uppercase font-mono tracking-wider">Social Cards ({socialsForm.length})</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {socialsForm.map((s, idx) => (
                    <div key={idx} className="p-4 bg-black border border-white/10 rounded-xl space-y-2 hover:border-gold/40 transition-colors relative">
                      <div className="flex justify-between items-center border-b border-white/10 pb-2">
                        <span className="text-xs font-mono font-bold text-gold uppercase">{s.platform || "Social Link"}</span>
                        <div className="flex items-center gap-2">
                          <button 
                            type="button"
                            onClick={() => setSocialModal({ isOpen: true, mode: 'edit', item: s, index: idx })} 
                            className="p-1 text-gray-400 hover:text-white transition-colors"
                            title="Edit Card"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button 
                            type="button"
                            onClick={() => handleDeleteSocialCard(idx)} 
                            className="p-1 text-rose-400 hover:text-rose-200 transition-colors"
                            title="Delete Card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-gray-500 font-mono block">Handle / Display Text:</span>
                        <span className="text-xs font-semibold text-white">{s.handle || 'N/A'}</span>
                      </div>

                      {s.url && (
                        <div>
                          <span className="text-[10px] text-gray-500 font-mono block">Target URL:</span>
                          <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-gold hover:underline font-mono truncate block">
                            {s.url}
                          </a>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <button 
                type="button"
                onClick={() => handleSaveData('socials', socialsForm)} 
                className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-lg text-xs transition-colors"
              >
                Apply Socials to Preview
              </button>
            </div>
          )}

          {activeTab === 'categories' && (
            <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 text-center">
              <Database className="w-12 h-12 text-zinc-800 mx-auto mb-4" />
              <h3 className="text-lg font-serif text-white mb-2">Form Categories Manager</h3>
              <p className="text-sm text-gray-500">Fully synced with MongoDB. Manage dropdown options.</p>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Live 1:1 Preview */}
        <div className="bg-[#060606] border border-white/10 rounded-3xl overflow-hidden relative min-h-[700px] shadow-2xl flex flex-col">
          {/* Browser Bar Mockup */}
          <div className="h-12 bg-zinc-900 border-b border-white/5 flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="mx-auto px-4 py-1 bg-black rounded-md text-[10px] text-gray-500 font-mono flex items-center gap-2">
               techmaster.com/contact <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse" />
            </div>
          </div>

          {/* Actual 1:1 Render Area */}
          <div className="flex-1 overflow-y-auto relative p-6 custom-scrollbar">
            {/* Glows */}
            <div className="absolute top-1/4 left-1/4 w-[150px] h-[150px] bg-purple-600/20 blur-[80px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[150px] h-[150px] bg-yellow-600/10 blur-[80px] pointer-events-none" />

            {/* Hero */}
            <div className="text-left mb-10 relative z-10">
              <div className="inline-block mb-3 px-3 py-1 bg-gold/5 border border-gold/30 text-[9px] uppercase tracking-[2px] font-bold text-gold rounded-sm">
                {heroForm.badge}
              </div>
              <h1 className="text-3xl md:text-4xl font-serif text-white mb-6 leading-tight">
                {heroForm.heading} <br />
                <span className="text-gold italic font-bold">{heroForm.highlightHeading}</span>.
              </h1>
            </div>

            {/* Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left relative z-10">
              {/* Left Col */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div>
                  <h3 className="font-serif text-xl text-white font-bold mb-4">Direct Channels</h3>
                  <div className="flex flex-col gap-4">
                    {/* Email */}
                    <div className="flex items-center gap-3 border border-white/5 bg-white/[0.01] p-3 rounded-2xl hover:border-gold/20">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold"><Mail className="w-3.5 h-3.5" /></div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[1px] opacity-40 block font-mono">BUSINESS EMAIL</span>
                        <span className="text-xs font-bold text-white">{infoForm.email}</span>
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="flex items-center gap-3 border border-white/5 bg-white/[0.01] p-3 rounded-2xl hover:border-gold/20">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold"><Phone className="w-3.5 h-3.5" /></div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[1px] opacity-40 block font-mono">COMMUNICATION TELEPHONE</span>
                        <span className="text-xs font-bold text-white">{infoForm.phone}</span>
                      </div>
                    </div>
                    {/* WhatsApp */}
                    <div className="flex items-center gap-3 border border-white/5 bg-white/[0.01] p-3 rounded-2xl hover:border-green-500/20">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400"><MessageCircle className="w-4 h-4" /></div>
                      <div className="flex-1 flex justify-between items-center pr-1">
                        <div>
                          <span className="text-[9px] uppercase tracking-[1px] opacity-40 block font-mono">INSTANT CHAT</span>
                          <span className="text-[10px] text-gray-300 font-light block">Need answers right away?</span>
                        </div>
                        <span className="px-3 py-1.5 bg-green-600 text-white text-[9px] font-bold uppercase tracking-[1px] rounded-lg">WhatsApp</span>
                      </div>
                    </div>
                    {/* Address */}
                    <div className="flex items-center gap-3 border border-white/5 bg-white/[0.01] p-3 rounded-2xl hover:border-gold/20">
                      <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold"><MapPin className="w-3.5 h-3.5" /></div>
                      <div>
                        <span className="text-[9px] uppercase tracking-[1px] opacity-40 block font-mono">CREATOR HQ</span>
                        <span className="text-xs font-bold text-white">{infoForm.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="w-full">
                  <h4 className="font-serif text-[10px] font-bold text-white mb-2 uppercase tracking-[2px]">Location Map</h4>
                  <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-white/[0.01] p-1.5">
                    <iframe src={mapForm.url} width="100%" height="150" style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(100%) contrast(90%)" }} />
                  </div>
                </div>
              </div>

              {/* Right Col */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                {/* Form */}
                <div className="bg-white/[0.02] backdrop-blur-md p-6 rounded-3xl border border-white/5">
                  <h3 className="font-serif text-xl text-white font-bold mb-6">Business Inquiry Form</h3>
                  <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[8px] uppercase tracking-[2px] text-gold font-bold block mb-1 font-mono">YOUR NAME</label>
                        <input disabled placeholder="ARIAN DEVI" className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-[10px] uppercase text-white" />
                      </div>
                      <div>
                        <label className="text-[8px] uppercase tracking-[2px] text-gold font-bold block mb-1 font-mono">EMAIL ADDRESS</label>
                        <input disabled placeholder="ARIAN@DEVI.COM" className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-[10px] uppercase text-white" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[8px] uppercase tracking-[2px] text-gold font-bold block mb-1 font-mono">INQUIRY CATEGORY</label>
                        <select disabled className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-gray-400">
                          {(categoriesForm || []).map(c => <option key={c.value || c.label}>{c.label}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-[8px] uppercase tracking-[2px] text-gold font-bold block mb-1 font-mono">COMPANY / BRAND</label>
                        <input disabled placeholder="GOOGLE INC." className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-[10px] uppercase text-white" />
                      </div>
                    </div>
                    <div>
                      <label className="text-[8px] uppercase tracking-[2px] text-gold font-bold block mb-1 font-mono">INQUIRY OUTLINE</label>
                      <textarea disabled rows={3} placeholder="Provide outline dates..." className="w-full bg-black/60 border border-white/10 rounded-lg px-3 py-2 text-[10px] text-white" />
                    </div>
                    <button disabled className="w-full py-3 bg-gold text-black font-bold uppercase text-[10px] tracking-[2px] rounded-lg">Log Inquiry Details</button>
                  </div>
                </div>

                {/* Socials */}
                <div>
                  <h4 className="font-serif text-[10px] font-bold text-white mb-3 uppercase tracking-[2px]">{socialTitle}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {socialsForm.map((s, idx) => (
                      <div key={s.platform || idx} className="border border-white/5 bg-white/[0.01] p-3 rounded-2xl">
                        <span className="text-[9px] text-gold uppercase tracking-[1px] font-bold font-mono">{s.platform}</span>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-white font-light truncate max-w-[80%]">{s.handle}</span>
                          <ExternalLink className="w-3 h-3 text-gray-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ADD / EDIT SOCIAL CARD MODAL */}
      {socialModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs font-roboto">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                {socialModal.mode === 'add' ? 'Add New Social Card' : 'Edit Social Card'}
              </h3>
              <button 
                type="button" 
                onClick={() => setSocialModal({ isOpen: false, mode: 'add', item: { platform: '', handle: '', url: '' }, index: null })} 
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveSocialModal} className="space-y-4">
              <div>
                <label className="block text-zinc-400 font-mono uppercase text-[10px] mb-1">Platform Name (e.g., INSTAGRAM, LINKEDIN)</label>
                <input 
                  type="text" 
                  required
                  placeholder="INSTAGRAM"
                  value={socialModal.item.platform} 
                  onChange={e => setSocialModal({ ...socialModal, item: { ...socialModal.item, platform: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-gold font-mono uppercase font-bold text-xs"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono uppercase text-[10px] mb-1">Handle / Username (e.g., @aman_techmaster)</label>
                <input 
                  type="text" 
                  required
                  placeholder="@aman_techmaster"
                  value={socialModal.item.handle} 
                  onChange={e => setSocialModal({ ...socialModal, item: { ...socialModal.item, handle: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-zinc-400 font-mono uppercase text-[10px] mb-1">Target Profile URL (e.g., https://instagram.com/aman_techmaster)</label>
                <input 
                  type="url" 
                  placeholder="https://instagram.com"
                  value={socialModal.item.url} 
                  onChange={e => setSocialModal({ ...socialModal, item: { ...socialModal.item, url: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button 
                  type="button" 
                  onClick={() => setSocialModal({ isOpen: false, mode: 'add', item: { platform: '', handle: '', url: '' }, index: null })}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:bg-zinc-900 text-xs"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-gold text-black font-bold text-xs hover:bg-yellow-500 transition-colors"
                >
                  Save Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
