import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { 
  Scale, Save, Eye, Plus, Trash2, Edit3, ArrowUp, ArrowDown, 
  Copy, Settings, Check, Clock, Globe, BarChart3, X, Sliders, 
  RefreshCw, Lock, FileText, Layers, Sparkles, AlertCircle, EyeOff,
  Bold, Italic, List, Link as LinkIcon, Table, Heading, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const TermsConditions = () => {
  const { db, updateSection, saveToLocalDb, apiFetch } = useDatabase();
  const [isPublishing, setIsPublishing] = useState(false);

  // Initial / Existing State fallback
  const rawData = db?.termsPolicy || {};

  const [activeTab, setActiveTab] = useState('hero'); // hero, sections, date, popup, close, legal, seo, analytics
  const [toastMsg, setToastMsg] = useState('');

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  // Module 1 & Fallback Data
  const [smallBadge, setSmallBadge] = useState(rawData.smallBadge || "LEGAL PROTOCOLS");
  const [popupTitle, setPopupTitle] = useState(rawData.popupTitle || "Terms of Service");
  const [effectiveDate, setEffectiveDate] = useState(rawData.effectiveDate || "July 7, 2026");
  const [lastUpdatedDate, setLastUpdatedDate] = useState(rawData.lastUpdatedDate || "July 7, 2026");
  const [versionNumber, setVersionNumber] = useState(rawData.versionNumber || "v3.1");
  const [autoUpdateDate, setAutoUpdateDate] = useState(rawData.autoUpdateDate ?? false);
  const [introParagraph, setIntroParagraph] = useState(
    rawData.introParagraph || 
    "By browsing this platform, subscribing to our mailing list, or submitting inquiries, you agree to these Terms of Service."
  );
  const [visibility, setVisibility] = useState(rawData.visibility ?? true);

  useEffect(() => {
    const fetchLatestTerms = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/terms');
          if (res.success && res.data) {
            const data = res.data;
            if (data.smallBadge) setSmallBadge(data.smallBadge);
            if (data.popupTitle) setPopupTitle(data.popupTitle);
            if (data.effectiveDate) setEffectiveDate(data.effectiveDate);
            if (data.lastUpdatedDate) setLastUpdatedDate(data.lastUpdatedDate);
            if (data.versionNumber) setVersionNumber(data.versionNumber);
            if (data.introParagraph) setIntroParagraph(data.introParagraph);
            if (data.sections && data.sections.length > 0) setSections(data.sections);
          }
        }
      } catch (err) {
        console.warn("Could not fetch terms policy from backend:", err);
      }
    };
    fetchLatestTerms();
  }, []);

  // Module 2 — Terms Sections
  const defaultSections = [
    {
      id: "sec-1",
      title: "Intellectual Property",
      body: "All site designs, 3D shaders, systems blueprints, and video snippets are the trademark properties of Aman and Tech Master Labs unless stated otherwise.",
      order: 1,
      status: "Active"
    },
    {
      id: "sec-2",
      title: "User License",
      body: "You are granted a limited license to explore our portfolio and code projects for educational research. Scraping, cloning, or distributing source codes commercially without express written consent is strictly prohibited.",
      order: 2,
      status: "Active"
    },
    {
      id: "sec-3",
      title: "Sandbox Declarations",
      body: "All forms, databases, and estimates operate in safe sandbox demonstration pipelines.",
      order: 3,
      status: "Active"
    },
    {
      id: "sec-4",
      title: "Acceptable Use",
      body: "Users must interact with our digital assets in good faith without attempting DDoS vectors, API key tampering, or malicious script injection.",
      order: 4,
      status: "Active"
    },
    {
      id: "sec-5",
      title: "Prohibited Activities",
      body: "System reverse engineering, automated bot scraping of client case studies, or unauthorized credential sharing are grounds for instant blacklisting.",
      order: 5,
      status: "Active"
    },
    {
      id: "sec-6",
      title: "Limitation of Liability",
      body: "Tech Master Labs will not be held liable for temporary sandbox downtime, external network latencies, or third-party web graphics driver incompatibilities.",
      order: 6,
      status: "Active"
    },
    {
      id: "sec-7",
      title: "Termination",
      body: "We reserve the right to revoke API key access or suspend platform credentials if these terms are violated.",
      order: 7,
      status: "Active"
    },
    {
      id: "sec-8",
      title: "Governing Law",
      body: "These terms are governed by and construed in accordance with the laws of international digital trade and local jurisdiction.",
      order: 8,
      status: "Active"
    },
    {
      id: "sec-9",
      title: "Contact Information",
      body: "For questions concerning these Terms & Conditions, please contact legal@techmaster.com.",
      order: 9,
      status: "Active"
    }
  ];

  const [sections, setSections] = useState(rawData.sections && rawData.sections.length > 0 ? rawData.sections : defaultSections);
  const [editingSection, setEditingSection] = useState(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [newSectionBody, setNewSectionBody] = useState('');

  // Module 5 — Popup Design Settings
  const [popupSettings, setPopupSettings] = useState({
    width: rawData.popupSettings?.width || "max-w-2xl",
    maxHeight: rawData.popupSettings?.maxHeight || "max-h-[80vh]",
    scrollEnable: rawData.popupSettings?.scrollEnable ?? true,
    overlayColor: rawData.popupSettings?.overlayColor || "#000000",
    overlayOpacity: rawData.popupSettings?.overlayOpacity ?? 80,
    overlayBlur: rawData.popupSettings?.overlayBlur ?? true,
    bgGlassEffect: rawData.popupSettings?.bgGlassEffect ?? true,
    shadowStyle: rawData.popupSettings?.shadowStyle || "shadow-2xl",
    borderRadius: rawData.popupSettings?.borderRadius || "rounded-3xl",
    animation: rawData.popupSettings?.animation || "scale",
    openTransition: rawData.popupSettings?.openTransition || "ease-out duration-300",
    closeTransition: rawData.popupSettings?.closeTransition || "ease-in duration-200"
  });

  // Module 6 — Close Button Settings
  const [closeButtonSettings, setCloseButtonSettings] = useState({
    showCloseButton: rawData.closeButtonSettings?.showCloseButton ?? true,
    position: rawData.closeButtonSettings?.position || "top-right",
    icon: rawData.closeButtonSettings?.icon || "✕",
    size: rawData.closeButtonSettings?.size || "w-8 h-8",
    color: rawData.closeButtonSettings?.color || "text-gray-400",
    hoverColor: rawData.closeButtonSettings?.hoverColor || "hover:text-gold"
  });

  // Module 7 — Legal Settings
  const [legalSettings, setLegalSettings] = useState({
    requireUserAcceptance: rawData.legalSettings?.requireUserAcceptance ?? false,
    showBeforeRegistration: rawData.legalSettings?.showBeforeRegistration ?? true,
    showBeforeContactForm: rawData.legalSettings?.showBeforeContactForm ?? true,
    showBeforeNewsletter: rawData.legalSettings?.showBeforeNewsletter ?? false,
    mandatoryAcceptance: rawData.legalSettings?.mandatoryAcceptance ?? false,
    versionTracking: rawData.legalSettings?.versionTracking ?? true
  });

  // Module 8 — SEO Settings
  const [seo, setSeo] = useState({
    metaTitle: rawData.seo?.metaTitle || "Terms & Conditions | TechMaster Enterprise",
    metaDescription: rawData.seo?.metaDescription || "Review the official Terms of Service for TechMaster. Understand licensing, sandbox rules, and intellectual property.",
    metaKeywords: rawData.seo?.metaKeywords || "Terms of Service, Legal Protocols, License, TechMaster",
    canonicalUrl: rawData.seo?.canonicalUrl || "https://techmaster.com/terms-conditions",
    ogTitle: rawData.seo?.ogTitle || "TechMaster Terms of Service & Legal Guidelines",
    twitterCard: rawData.seo?.twitterCard || "summary_large_image",
    structuredData: rawData.seo?.structuredData || '{\n  "@context": "https://schema.org",\n  "@type": "WebPage",\n  "name": "Terms of Service"\n}'
  });

  // Module 9 — Analytics
  const analytics = rawData.analytics || {
    totalViews: 18450,
    acceptanceCount: 17820,
    lastUpdated: lastUpdatedDate,
    currentVersion: versionNumber,
    mostViewedSection: "Intellectual Property"
  };

  // Section Actions
  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    const created = {
      id: `sec-${Date.now()}`,
      title: newSectionTitle,
      body: newSectionBody || "Terms regarding this specific clause.",
      order: sections.length + 1,
      status: "Active"
    };
    setSections([...sections, created]);
    setNewSectionTitle('');
    setNewSectionBody('');
    triggerToast("New Terms Section added!");
  };

  const handleUpdateSection = (id, field, val) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  const handleDeleteSection = (id) => {
    setSections(sections.filter(s => s.id !== id));
    triggerToast("Section deleted.");
  };

  const handleDuplicateSection = (sec) => {
    const dup = {
      ...sec,
      id: `sec-${Date.now()}`,
      title: `${sec.title} (Copy)`,
      order: sections.length + 1
    };
    setSections([...sections, dup]);
    triggerToast("Section duplicated.");
  };

  const handleMoveSection = (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    const reordered = updated.map((item, idx) => ({ ...item, order: idx + 1 }));
    setSections(reordered);
  };

  // Rich Text Helper Inserter
  const insertRichTextTag = (tag) => {
    if (!editingSection) return;
    let snippet = '';
    if (tag === 'bold') snippet = '<strong>Bold Text</strong>';
    else if (tag === 'italic') snippet = '<em>Italic Text</em>';
    else if (tag === 'list') snippet = '<ul><li>Clause 1</li><li>Clause 2</li></ul>';
    else if (tag === 'link') snippet = '<a href="https://techmaster.com" class="text-gold underline">Legal Link</a>';
    else if (tag === 'heading') snippet = '<h5 class="text-white font-semibold mt-2">Clause Subheading</h5>';
    else if (tag === 'table') snippet = '<table class="w-full my-2 border border-white/10 text-xs"><tr><th class="border border-white/10 p-1">Header</th></tr><tr><td class="border border-white/10 p-1">Rule</td></tr></table>';

    handleUpdateSection(editingSection.id, 'body', editingSection.body + ' ' + snippet);
  };

  // Global Publish Handler
  const handlePublishAll = async () => {
    setIsPublishing(true);
    const fullPayload = {
      smallBadge,
      popupTitle,
      effectiveDate,
      lastUpdatedDate,
      versionNumber,
      autoUpdateDate,
      introParagraph,
      visibility,
      sections,
      popupSettings,
      closeButtonSettings,
      legalSettings,
      seo,
      analytics: {
        ...analytics,
        lastUpdated: new Date().toISOString().split('T')[0],
        currentVersion: versionNumber
      }
    };

    if (updateSection) updateSection('termsPolicy', fullPayload);
    if (saveToLocalDb) saveToLocalDb('termsPolicy', fullPayload);

    try {
      if (apiFetch) {
        await apiFetch('/terms', {
          method: 'PUT',
          body: JSON.stringify(fullPayload)
        });
      }
      triggerToast("Terms of Service CMS published & synced live with website!");
    } catch (err) {
      console.warn("Backend API sync warning:", err);
      triggerToast("Saved locally! Backend: " + (err.message || "Updated"));
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-6 pb-24 text-left">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 right-6 z-[9999] bg-zinc-950 text-emerald-400 font-bold px-4 py-3 rounded-xl shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-500/50 text-xs flex items-center gap-2.5 backdrop-blur-2xl"
          >
            <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <Check className="w-3.5 h-3.5 stroke-[3]" />
            </div>
            <span className="text-emerald-300 font-mono tracking-wide">{toastMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-[0_0_12px_rgba(212,175,55,0.8)] animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide uppercase">Terms & Conditions CMS</h1>
            <span className="px-3 py-0.5 bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 rounded-full text-[10px] font-mono uppercase tracking-wider font-semibold">1:1 EXACT REPLICA</span>
            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full text-[10px] font-mono">LIVE SYNC</span>
          </div>
          <p className="text-xs text-zinc-400 font-light max-w-2xl">
            Pixel-perfect interactive CMS replica of the website Terms of Service popup. Edit legal protocols, clauses, dates, styling, close button & user acceptance triggers.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button 
            onClick={() => {
              setSections(defaultSections);
              triggerToast("Reset to default terms preview");
            }}
            className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 rounded-xl text-xs font-mono transition-all flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Default
          </button>
          <button 
            onClick={handlePublishAll} 
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 via-luxury-gold to-yellow-500 hover:brightness-110 text-black font-bold rounded-xl text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.25)] transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4 stroke-[2.5]" /> Save & Publish Live
          </button>
        </div>
      </div>

      {/* TWO COLUMN GRID LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Admin Control Tabs & Editors (6 Columns) */}
        <div className="xl:col-span-6 space-y-6">
          {/* TAB NAVIGATION */}
          <div className="flex gap-1.5 p-1 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl overflow-x-auto scrollbar-none">
            {[
              { id: 'hero', label: '1. Popup & Intro', icon: FileText },
              { id: 'sections', label: '2. Sections', icon: Layers },
              { id: 'date', label: '3. Date & Version', icon: Clock },
              { id: 'popup', label: '4. Styling', icon: Sliders },
              { id: 'close', label: '5. Close Button', icon: X },
              { id: 'legal', label: '6. Legal Rules', icon: Lock },
              { id: 'seo', label: '7. SEO', icon: Globe },
              { id: 'analytics', label: '8. Analytics', icon: BarChart3 }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-[11px] font-medium transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-luxury-gold text-black font-bold shadow-[0_0_12px_rgba(212,175,55,0.3)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: POPUP & INTRO (MODULE 1) */}
          {activeTab === 'hero' && (
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-5 backdrop-blur-xl">
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800/60">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-luxury-gold" /> Popup Header & Introduction
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-400">Visibility:</span>
                  <button 
                    onClick={() => setVisibility(!visibility)}
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${visibility ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}
                  >
                    {visibility ? 'Visible On Site' : 'Hidden'}
                  </button>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Small Heading</label>
                  <input
                    type="text"
                    value={smallBadge}
                    onChange={e => setSmallBadge(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                    placeholder="LEGAL PROTOCOLS"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Main Title</label>
                  <input
                    type="text"
                    value={popupTitle}
                    onChange={e => setPopupTitle(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none font-bold text-sm"
                    placeholder="Terms of Service"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Effective Date Display</label>
                  <input
                    type="text"
                    value={effectiveDate}
                    onChange={e => setEffectiveDate(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                    placeholder="July 7, 2026"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Introduction Paragraph</label>
                  <textarea
                    rows={4}
                    value={introParagraph}
                    onChange={e => setIntroParagraph(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-200 focus:border-luxury-gold outline-none leading-relaxed"
                    placeholder="Write introductory legal agreement statement..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SECTIONS MANAGER (MODULE 2 & MODULE 4) */}
          {activeTab === 'sections' && (
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-6 backdrop-blur-xl">
              <div className="flex justify-between items-center pb-3 border-b border-zinc-800/60">
                <div>
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-luxury-gold" /> Terms Sections Manager
                  </h3>
                  <span className="text-[10px] text-zinc-500 font-mono">Reorder, Edit Rich Body, Status & Duplicate</span>
                </div>
                <span className="text-xs font-mono text-luxury-gold font-bold">{sections.length} Clauses</span>
              </div>

              {/* Add New Section Form */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4 space-y-3">
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest block font-bold">Add New Terms Clause</span>
                <input
                  type="text"
                  placeholder="Section Title (e.g. Limitation of Liability)"
                  value={newSectionTitle}
                  onChange={e => setNewSectionTitle(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-white focus:border-luxury-gold outline-none"
                />
                <textarea
                  rows={2}
                  placeholder="Clause Content body..."
                  value={newSectionBody}
                  onChange={e => setNewSectionBody(e.target.value)}
                  className="w-full bg-black/60 border border-zinc-800 rounded-lg px-3.5 py-2 text-xs text-zinc-300 focus:border-luxury-gold outline-none"
                />
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 bg-luxury-gold hover:bg-yellow-500 text-black font-bold rounded-lg text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" /> Add Terms Clause
                </button>
              </div>

              {/* Section Edit Toolbar (Module 4 — Rich Text Editor) */}
              {editingSection && (
                <div className="bg-zinc-900/90 border border-luxury-gold/40 rounded-xl p-4 space-y-3 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-luxury-gold uppercase font-mono">Editing Clause: {editingSection.title}</span>
                    <button onClick={() => setEditingSection(null)} className="text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
                  </div>
                  
                  {/* Rich Text Toolbar */}
                  <div className="flex gap-1 bg-black p-1 rounded-lg border border-zinc-800 flex-wrap">
                    <button onClick={() => insertRichTextTag('bold')} title="Bold" className="p-1.5 hover:bg-zinc-800 rounded text-zinc-300"><Bold className="w-3.5 h-3.5" /></button>
                    <button onClick={() => insertRichTextTag('italic')} title="Italic" className="p-1.5 hover:bg-zinc-800 rounded text-zinc-300"><Italic className="w-3.5 h-3.5" /></button>
                    <button onClick={() => insertRichTextTag('heading')} title="Heading" className="p-1.5 hover:bg-zinc-800 rounded text-zinc-300"><Heading className="w-3.5 h-3.5" /></button>
                    <button onClick={() => insertRichTextTag('list')} title="List" className="p-1.5 hover:bg-zinc-800 rounded text-zinc-300"><List className="w-3.5 h-3.5" /></button>
                    <button onClick={() => insertRichTextTag('link')} title="Hyperlink" className="p-1.5 hover:bg-zinc-800 rounded text-zinc-300"><LinkIcon className="w-3.5 h-3.5" /></button>
                    <button onClick={() => insertRichTextTag('table')} title="Table" className="p-1.5 hover:bg-zinc-800 rounded text-zinc-300"><Table className="w-3.5 h-3.5" /></button>
                  </div>

                  <input
                    type="text"
                    value={editingSection.title}
                    onChange={e => {
                      handleUpdateSection(editingSection.id, 'title', e.target.value);
                      setEditingSection({ ...editingSection, title: e.target.value });
                    }}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-1.5 text-xs text-white"
                  />
                  <textarea
                    rows={4}
                    value={editingSection.body}
                    onChange={e => {
                      handleUpdateSection(editingSection.id, 'body', e.target.value);
                      setEditingSection({ ...editingSection, body: e.target.value });
                    }}
                    className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200"
                  />
                </div>
              )}

              {/* Existing Sections List */}
              <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                {sections.map((sec, idx) => (
                  <div
                    key={sec.id || idx}
                    className={`p-3.5 bg-zinc-900/40 border border-zinc-800/80 rounded-xl flex items-start justify-between gap-3 hover:border-zinc-700 transition-all ${
                      sec.status === 'Inactive' ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-luxury-gold font-bold">#{idx + 1}</span>
                        <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-wider">{sec.title}</h4>
                        <span className={`px-2 py-0.2 rounded text-[9px] font-mono border ${sec.status === 'Active' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
                          {sec.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-light">{sec.body}</p>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button onClick={() => handleMoveSection(idx, 'up')} className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded" title="Move Up"><ArrowUp className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleMoveSection(idx, 'down')} className="p-1 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded" title="Move Down"><ArrowDown className="w-3.5 h-3.5" /></button>
                      <button onClick={() => setEditingSection(sec)} className="p-1 hover:bg-zinc-800 text-luxury-gold rounded" title="Edit Clause"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDuplicateSection(sec)} className="p-1 hover:bg-zinc-800 text-blue-400 rounded" title="Duplicate Clause"><Copy className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleUpdateSection(sec.id, 'status', sec.status === 'Active' ? 'Inactive' : 'Active')} className="p-1 hover:bg-zinc-800 text-amber-400 rounded" title="Toggle Status">
                        {sec.status === 'Active' ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => handleDeleteSection(sec.id)} className="p-1 hover:bg-rose-500/20 text-rose-400 rounded" title="Delete"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DATE & VERSIONING (MODULE 3) */}
          {activeTab === 'date' && (
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-5 backdrop-blur-xl">
              <div className="pb-3 border-b border-zinc-800/60">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-luxury-gold" /> Effective Date & Versioning Control
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Effective Date</label>
                  <input
                    type="text"
                    value={effectiveDate}
                    onChange={e => setEffectiveDate(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Last Updated Date</label>
                  <input
                    type="text"
                    value={lastUpdatedDate}
                    onChange={e => setLastUpdatedDate(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Terms Version Code</label>
                  <input
                    type="text"
                    value={versionNumber}
                    onChange={e => setVersionNumber(e.target.value)}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none font-mono"
                    placeholder="v3.1"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Auto Update Date on Publish</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Set Last Updated Date to today's date automatically when saving.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoUpdateDate}
                    onChange={e => setAutoUpdateDate(e.target.checked)}
                    className="w-4 h-4 accent-luxury-gold cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: STYLING & CANVAS SETTINGS (MODULE 5) */}
          {activeTab === 'popup' && (
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-5 backdrop-blur-xl">
              <div className="pb-3 border-b border-zinc-800/60">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-luxury-gold" /> Popup Design & Canvas Options
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Popup Max Width</label>
                  <select
                    value={popupSettings.width}
                    onChange={e => setPopupSettings({ ...popupSettings, width: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                  >
                    <option value="max-w-md">Compact (max-w-md)</option>
                    <option value="max-w-xl">Medium (max-w-xl)</option>
                    <option value="max-w-2xl">Standard Replica (max-w-2xl)</option>
                    <option value="max-w-4xl">Wide (max-w-4xl)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Max Height</label>
                  <select
                    value={popupSettings.maxHeight}
                    onChange={e => setPopupSettings({ ...popupSettings, maxHeight: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                  >
                    <option value="max-h-[60vh]">60% Viewport (max-h-[60vh])</option>
                    <option value="max-h-[70vh]">70% Viewport (max-h-[70vh])</option>
                    <option value="max-h-[80vh]">80% Viewport Replica (max-h-[80vh])</option>
                    <option value="max-h-[90vh]">90% Viewport (max-h-[90vh])</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 font-mono text-[10px] uppercase mb-1.5">
                    <span>Overlay Opacity</span>
                    <span>{popupSettings.overlayOpacity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="95"
                    value={popupSettings.overlayOpacity}
                    onChange={e => setPopupSettings({ ...popupSettings, overlayOpacity: Number(e.target.value) })}
                    className="w-full accent-luxury-gold cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Backdrop Glass Blur</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Apply backdrop-blur-md (8px) effect on website modal overlay.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={popupSettings.overlayBlur}
                    onChange={e => setPopupSettings({ ...popupSettings, overlayBlur: e.target.checked })}
                    className="w-4 h-4 accent-luxury-gold cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Border Radius</label>
                  <select
                    value={popupSettings.borderRadius}
                    onChange={e => setPopupSettings({ ...popupSettings, borderRadius: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                  >
                    <option value="rounded-2xl">Rounded 2XL (rounded-2xl)</option>
                    <option value="rounded-3xl">Rounded 3XL Replica (rounded-3xl)</option>
                    <option value="rounded-xl">Rounded XL (rounded-xl)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CLOSE BUTTON SETTINGS (MODULE 6) */}
          {activeTab === 'close' && (
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-5 backdrop-blur-xl">
              <div className="pb-3 border-b border-zinc-800/60">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <X className="w-4 h-4 text-luxury-gold" /> Close Button & Icon Options
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Show Close Button</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Render circular close button inside top-right of modal.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={closeButtonSettings.showCloseButton}
                    onChange={e => setCloseButtonSettings({ ...closeButtonSettings, showCloseButton: e.target.checked })}
                    className="w-4 h-4 accent-luxury-gold cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Close Icon Symbol</label>
                  <select
                    value={closeButtonSettings.icon}
                    onChange={e => setCloseButtonSettings({ ...closeButtonSettings, icon: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                  >
                    <option value="✕">Standard Cross (✕)</option>
                    <option value="✖">Bold Cross (✖)</option>
                    <option value="X">Letter X</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Position</label>
                  <select
                    value={closeButtonSettings.position}
                    onChange={e => setCloseButtonSettings({ ...closeButtonSettings, position: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                  >
                    <option value="top-right">Top Right (top-6 right-6)</option>
                    <option value="top-left">Top Left (top-6 left-6)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: LEGAL RULES SETTINGS (MODULE 7) */}
          {activeTab === 'legal' && (
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-5 backdrop-blur-xl">
              <div className="pb-3 border-b border-zinc-800/60">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-4 h-4 text-luxury-gold" /> Legal Triggers & Consent Triggers
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Require Explicit Acceptance Button</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Show "I Accept Terms of Service" button inside the modal.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={legalSettings.requireUserAcceptance}
                    onChange={e => setLegalSettings({ ...legalSettings, requireUserAcceptance: e.target.checked })}
                    className="w-4 h-4 accent-luxury-gold cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Show Before User Registration</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Force acceptance popup before user account creation.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={legalSettings.showBeforeRegistration}
                    onChange={e => setLegalSettings({ ...legalSettings, showBeforeRegistration: e.target.checked })}
                    className="w-4 h-4 accent-luxury-gold cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-3.5 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-zinc-200 block">Show Before Contact Form Submit</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Require terms checkbox on client contact form.</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={legalSettings.showBeforeContactForm}
                    onChange={e => setLegalSettings({ ...legalSettings, showBeforeContactForm: e.target.checked })}
                    className="w-4 h-4 accent-luxury-gold cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: SEO SETTINGS (MODULE 8) */}
          {activeTab === 'seo' && (
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-5 backdrop-blur-xl">
              <div className="pb-3 border-b border-zinc-800/60">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-luxury-gold" /> SEO & OpenGraph Settings
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Meta Title</label>
                  <input
                    type="text"
                    value={seo.metaTitle}
                    onChange={e => setSeo({ ...seo, metaTitle: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Meta Description</label>
                  <textarea
                    rows={3}
                    value={seo.metaDescription}
                    onChange={e => setSeo({ ...seo, metaDescription: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-200 focus:border-luxury-gold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 uppercase tracking-widest font-mono text-[10px] mb-1.5">Canonical URL</label>
                  <input
                    type="text"
                    value={seo.canonicalUrl}
                    onChange={e => setSeo({ ...seo, canonicalUrl: e.target.value })}
                    className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-2 text-zinc-100 focus:border-luxury-gold outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: ANALYTICS (MODULE 9) */}
          {activeTab === 'analytics' && (
            <div className="bg-zinc-950/70 border border-zinc-800/80 rounded-2xl p-6 space-y-5 backdrop-blur-xl">
              <div className="pb-3 border-b border-zinc-800/60">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-luxury-gold" /> Terms & Conditions Analytics
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Total Modal Views</span>
                  <p className="text-2xl font-serif font-bold text-white mt-1">{analytics.totalViews.toLocaleString()}</p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Total Acceptance Count</span>
                  <p className="text-2xl font-serif font-bold text-emerald-400 mt-1">{analytics.acceptanceCount.toLocaleString()}</p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Current Version</span>
                  <p className="text-lg font-mono font-bold text-luxury-gold mt-1">{versionNumber}</p>
                </div>
                <div className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Most Viewed Clause</span>
                  <p className="text-xs font-bold text-zinc-200 mt-1 truncate">{analytics.mostViewedSection}</p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: MODULE 10 — Exact 1:1 Live Website Preview (6 Columns) */}
        <div className="xl:col-span-6">
          <div className="bg-[#050505] border border-zinc-800/80 rounded-3xl overflow-hidden relative shadow-2xl sticky top-6 min-h-[680px] flex flex-col">
            {/* Browser Navigation Bar Mockup */}
            <div className="h-12 bg-zinc-950 border-b border-zinc-800/80 flex items-center px-4 justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500 ml-2">Website Terms Modal Replica</span>
              </div>
              <div className="px-4 py-1 bg-zinc-900/90 rounded-md text-[10px] text-zinc-400 font-mono flex items-center gap-2 border border-zinc-800">
                <Lock className="w-2.5 h-2.5 text-emerald-400" />
                <span>techmaster.com/terms-conditions</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
              </div>
            </div>

            {/* PREVIEW CONTAINER: EXACT WEBSITE REPLICA TERMS POPUP */}
            <div 
              className="flex-1 relative flex items-center justify-center p-4 md:p-8 overflow-y-auto custom-scrollbar"
              style={{
                backgroundColor: `rgba(0, 0, 0, ${popupSettings.overlayOpacity / 100})`,
                backdropFilter: popupSettings.overlayBlur ? "blur(8px)" : "none"
              }}
            >
              {/* Radial glow backdrop */}
              <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-luxury-gold/10 blur-[100px] pointer-events-none" />

              {/* Exact Glass Modal Container */}
              <motion.div 
                key={`${popupTitle}-${smallBadge}-${popupSettings.width}`}
                initial={popupSettings.animation === 'scale' ? { scale: 0.95, opacity: 0 } : { y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className={`glass-panel w-full p-8 rounded-3xl relative max-h-[80vh] overflow-y-auto text-left border border-white/10 shadow-2xl bg-zinc-950/80 backdrop-blur-xl ${popupSettings.width}`}
              >
                {/* Close Button Exact Mirror */}
                {closeButtonSettings.showCloseButton && (
                  <button 
                    className={`absolute top-6 right-6 ${closeButtonSettings.color} ${closeButtonSettings.hoverColor} transition-colors duration-300 ${closeButtonSettings.size} rounded-full border border-white/10 flex items-center justify-center bg-black/40 font-bold text-sm cursor-pointer`}
                    title="Close Terms of Service Modal"
                  >
                    {closeButtonSettings.icon}
                  </button>
                )}

                {/* Small Badge */}
                <span className="text-[9px] font-sans text-luxury-gold uppercase tracking-widest font-semibold block mb-1">
                  {smallBadge}
                </span>

                {/* Popup Title */}
                <h3 className="font-sans text-2xl text-luxury-gold font-bold mb-6">
                  {popupTitle}
                </h3>

                {/* Effective Date & Intro */}
                <div className="text-zinc-300 text-xs md:text-sm leading-relaxed space-y-4 font-light">
                  <p><strong className="text-white">Effective Date: {effectiveDate}</strong></p>
                  {introParagraph && <p className="text-zinc-300">{introParagraph}</p>}

                  {/* Sections List Exact Mirror */}
                  {sections
                    .filter(s => s.status !== 'Inactive')
                    .map((sec, idx) => (
                      <div key={sec.id || idx} className="mt-5 pt-3 border-t border-white/5">
                        <h4 className="text-white font-bold mb-1.5 uppercase tracking-wider text-xs">{sec.title}</h4>
                        <div 
                          className="text-zinc-400 leading-relaxed text-xs space-y-1" 
                          dangerouslySetInnerHTML={{ __html: sec.body }} 
                        />
                      </div>
                    ))}
                </div>

                {/* Require Acceptance Button Mirror */}
                {legalSettings.requireUserAcceptance && (
                  <div className="mt-8 pt-4 border-t border-zinc-800">
                    <button className="w-full py-3 bg-gradient-to-r from-amber-400 via-luxury-gold to-yellow-500 text-black font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg">
                      I Agree to Terms of Service
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
