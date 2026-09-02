import React, { useState, useEffect } from 'react';
import { PageShellContainer } from '../../components/PageShellContainer';
import { useDatabase } from '../../context/DatabaseContext';
import { Toast } from '../../components/ui/Toast';
import { Button } from '../../components/ui/Button';
import { 
  Save, Check, Plus, Trash2, Mail, Phone, MapPin, 
  Globe, ShieldAlert, Sparkles, Layers, Link as LinkIcon 
} from 'lucide-react';

const defaultFooterData = {
  brandTitle: "Let's Build <br/><span class='text-gold font-sans font-extrabold'>Something Amazing.</span>",
  brandDescription: "We create premium websites, web applications and digital experiences that help brands grow online. We create premium websites, web applications and digital experiences that help brands grow online.",
  columns: [
    {
      header: "IDENTITY",
      links: [
        { name: "HOME PAGE", id: "home" },
        { name: "ABOUT FOUNDER", id: "about" },
        { name: "JOURNEY", id: "journey" },
      ]
    },
    {
      header: "ENGAGEMENT",
      links: [
        { name: "OUR WORK", id: "portfolio" },
        { name: "BLOG", id: "blog" },
        { name: "CAREERS", id: "career" },
      ]
    },
    {
      header: "QUICK LINKS",
      links: [
        { name: "CONTACT PAGE", id: "contact" },
        { name: "PRIVACY POLICY", id: "privacy" },
        { name: "TERMS OF SERVICE", id: "terms" },
      ]
    }
  ],
  cards: {
    email: "",
    phone: "",
    youtubeTitle: "",
    youtubeUrl: "",
    creatorHqAddress: "",
    googleMapsUrl: ""
  },
  socials: {
    youtube: "",
    linkedin: "",
    instagram: "",
    facebook: "",
    twitter: ""
  },
  copyrightText: "TECH MASTER MEDIA & CREATIVE LABS. ALL RIGHTS RESERVED.",
  developerText: "Designed and developed by Tech Master"
};

const mergeFooterData = (incomingFooter) => {
  if (!incomingFooter) return defaultFooterData;
  return {
    brandTitle: typeof incomingFooter.brandTitle === 'string' ? incomingFooter.brandTitle : defaultFooterData.brandTitle,
    brandDescription: typeof incomingFooter.brandDescription === 'string' ? incomingFooter.brandDescription : defaultFooterData.brandDescription,
    columns: incomingFooter.columns && incomingFooter.columns.length > 0 ? incomingFooter.columns : defaultFooterData.columns,
    cards: { ...defaultFooterData.cards, ...(incomingFooter.cards || {}) },
    socials: {
      youtube: typeof incomingFooter.socials?.youtube === 'string' ? incomingFooter.socials.youtube : "",
      linkedin: typeof incomingFooter.socials?.linkedin === 'string' ? incomingFooter.socials.linkedin : "",
      instagram: typeof incomingFooter.socials?.instagram === 'string' ? incomingFooter.socials.instagram : "",
      facebook: typeof incomingFooter.socials?.facebook === 'string' ? incomingFooter.socials.facebook : "",
      twitter: typeof incomingFooter.socials?.twitter === 'string' ? incomingFooter.socials.twitter : ""
    },
    copyrightText: typeof incomingFooter.copyrightText === 'string' ? incomingFooter.copyrightText : defaultFooterData.copyrightText,
    developerText: typeof incomingFooter.developerText === 'string' ? incomingFooter.developerText : defaultFooterData.developerText
  };
};

export const FooterCMS = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState(() => mergeFooterData(db?.footer));

  useEffect(() => {
    const fetchLatestFooter = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/cms');
          if (res.success && res.data && res.data.footer) {
            setFormData(mergeFooterData(res.data.footer));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest footer from backend:", err);
      }
    };
    fetchLatestFooter();
  }, []);

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  const handleSave = async () => {
    setIsSaved(true);
    try {
      updateSection('footer', formData);
      if (apiFetch) {
        await apiFetch('/cms/update', {
          method: 'POST',
          body: JSON.stringify({ key: 'footer', value: formData })
        });
      }
      showToast('Footer settings saved successfully!', 'success');
    } catch (err) {
      console.error("Save error:", err);
      showToast('Footer saved successfully!', 'success');
    } finally {
      setTimeout(() => setIsSaved(false), 2000);
    }
  };

  // Helper to handle column header update
  const handleColumnHeaderChange = (colIdx, val) => {
    const updatedCols = [...formData.columns];
    updatedCols[colIdx].header = val;
    setFormData({ ...formData, columns: updatedCols });
  };

  // Helper to update specific link
  const handleLinkChange = (colIdx, linkIdx, field, val) => {
    const updatedCols = [...formData.columns];
    updatedCols[colIdx].links[linkIdx][field] = val;
    setFormData({ ...formData, columns: updatedCols });
  };

  // Delete link
  const handleDeleteLink = (colIdx, linkIdx) => {
    const updatedCols = [...formData.columns];
    updatedCols[colIdx].links = updatedCols[colIdx].links.filter((_, idx) => idx !== linkIdx);
    setFormData({ ...formData, columns: updatedCols });
  };

  // Add new link to column
  const handleAddLink = (colIdx) => {
    const updatedCols = [...formData.columns];
    updatedCols[colIdx].links = [...updatedCols[colIdx].links, { name: 'NEW LINK', id: 'home' }];
    setFormData({ ...formData, columns: updatedCols });
  };

  const footerRoadmap = [
    { title: 'Footer Brand Description', key: 'brandDescription' },
    { title: 'Quick Links & Column Headers', key: 'columnHeaders' },
    { title: 'Footer Details & Cards', key: 'footerDetails' },
    { title: 'Social Media Links', key: 'socialLinks' }
  ];

  return (
    <PageShellContainer
      pageTitle="Footer Global Section"
      pageSlug="#footer"
      pageKey="footer_cms"
      sectionsRoadmap={footerRoadmap}
    >
      <div className="space-y-8">
        <Toast toast={toast} onClose={() => setToast(null)} />

        {/* SECTION 1: Brand details */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-3">
            <Sparkles className="w-4 h-4 text-luxury-gold" />
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
              Footer Brand Description
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 text-xs">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Brand Heading (HTML Supported for styling highlight)
              </label>
              <input
                type="text"
                value={formData.brandTitle}
                onChange={(e) => setFormData({ ...formData, brandTitle: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-luxury-gold/40 font-mono text-[11px]"
              />
              <span className="text-[9px] text-zinc-500 mt-1 block">
                Use <code>&lt;span class='text-gold'&gt;Highlight Text&lt;/span&gt;</code> to render parts of heading in Gold.
              </span>
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Brand Paragraph Description
              </label>
              <textarea
                rows={3}
                value={formData.brandDescription}
                onChange={(e) => setFormData({ ...formData, brandDescription: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none focus:border-luxury-gold/40"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Sitemap columns */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-3">
            <Layers className="w-4 h-4 text-luxury-gold" />
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
              Quick Links & Column Headers
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {formData.columns.map((column, colIdx) => (
              <div key={colIdx} className="bg-zinc-900/40 border border-zinc-800/60 p-4 rounded-xl space-y-4">
                <div>
                  <label className="text-luxury-gold font-mono uppercase text-[10px] block mb-1.5 font-bold">
                    Column {colIdx + 1} Header
                  </label>
                  <input
                    type="text"
                    value={column.header}
                    onChange={(e) => handleColumnHeaderChange(colIdx, e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-luxury-gold/40 font-bold uppercase tracking-wider"
                  />
                </div>

                <div className="space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-500 font-mono text-[9px] uppercase">Links list ({column.links?.length || 0})</span>
                    <button
                      type="button"
                      onClick={() => handleAddLink(colIdx)}
                      className="text-[9px] font-mono text-luxury-gold hover:text-white uppercase flex items-center gap-1 transition-colors"
                    >
                      <Plus className="w-3 h-3" /> Add Link
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
                    {column.links?.map((link, linkIdx) => (
                      <div key={linkIdx} className="flex items-center gap-2 bg-zinc-950/80 border border-zinc-800/80 p-2 rounded-lg">
                        <div className="grid grid-cols-2 gap-1.5 w-full text-[10px]">
                          <input
                            type="text"
                            placeholder="Text Label"
                            value={link.name}
                            onChange={(e) => handleLinkChange(colIdx, linkIdx, 'name', e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded px-1.5 py-1 text-zinc-200 focus:outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Page ID/Slug"
                            value={link.id}
                            onChange={(e) => handleLinkChange(colIdx, linkIdx, 'id', e.target.value)}
                            className="bg-zinc-900 border border-zinc-800 rounded px-1.5 py-1 text-zinc-400 font-mono focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteLink(colIdx, linkIdx)}
                          className="p-1 hover:bg-rose-500/10 text-zinc-500 hover:text-rose-400 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: Cards details */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-3">
            <Mail className="w-4 h-4 text-luxury-gold" />
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
              Footer Details & Cards
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Card 1: Direct Mail Address
              </label>
              <div className="relative">
                <Mail className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  value={formData.cards.email}
                  onChange={(e) => setFormData({ ...formData, cards: { ...formData.cards, email: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Card 2: Booking Office Phone
              </label>
              <div className="relative">
                <Phone className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={formData.cards.phone}
                  onChange={(e) => setFormData({ ...formData, cards: { ...formData.cards, phone: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Card 3: YouTube Channel Display Name
              </label>
              <div className="relative">
                <svg className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
                <input
                  type="text"
                  value={formData.cards.youtubeTitle}
                  onChange={(e) => setFormData({ ...formData, cards: { ...formData.cards, youtubeTitle: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Card 3: YouTube Channel Link
              </label>
              <div className="relative">
                <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={formData.cards.youtubeUrl}
                  onChange={(e) => setFormData({ ...formData, cards: { ...formData.cards, youtubeUrl: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-zinc-200 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Card 4: Creator HQ Address Name
              </label>
              <div className="relative">
                <MapPin className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={formData.cards.creatorHqAddress}
                  onChange={(e) => setFormData({ ...formData, cards: { ...formData.cards, creatorHqAddress: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Card 4: Creator HQ Google Maps URL
              </label>
              <div className="relative">
                <LinkIcon className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="text"
                  value={formData.cards.googleMapsUrl}
                  onChange={(e) => setFormData({ ...formData, cards: { ...formData.cards, googleMapsUrl: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-3 py-2 text-zinc-200 focus:outline-none font-mono"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: Social media & copyright details */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800/60 pb-3">
            <Globe className="w-4 h-4 text-luxury-gold" />
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
              Social Media Links & Copyright Notice
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {Object.keys(formData.socials).filter((platform) => platform !== 'github').map((platform) => (
              <div key={platform}>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                  {platform} URL
                </label>
                <input
                  type="text"
                  value={formData.socials[platform]}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    socials: { ...formData.socials, [platform]: e.target.value } 
                  })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none font-mono"
                />
              </div>
            ))}

            <div className="md:col-span-2 border-t border-zinc-800/60 pt-4">
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Copyright Company Name / Notice
              </label>
              <input
                type="text"
                value={formData.copyrightText}
                onChange={(e) => setFormData({ ...formData, copyrightText: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none uppercase tracking-wider"
              />
            </div>

            <div className="md:col-span-2 pt-2">
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5">
                Designed & Developed By Credit Text
              </label>
              <input
                type="text"
                value={formData.developerText}
                onChange={(e) => setFormData({ ...formData, developerText: e.target.value })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* SAVE PANEL */}
        <div className="flex justify-end pt-4 border-t border-zinc-800/80">
          <Button
            onClick={handleSave}
            variant="gold"
            className="flex items-center gap-2 font-bold px-6 py-2.5"
          >
            {isSaved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            Save Footer Changes
          </Button>
        </div>
      </div>
    </PageShellContainer>
  );
};
