import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Target, Eye, Check, Save, Plus, Trash2, Edit3, EyeOff, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, ShieldCheck, Sparkles, Compass, Award, Flag
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const MissionVision = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('content'); // overview, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, mission_vision, core_values, pillars, roadmap, cta
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultMissionVisionCMS = {
    hero: {
      badge: "OUR NORTH STAR",
      headingLine1: "Democratizing",
      highlightText: "Tech Literacy",
      headingLine2: "Globally",
      description: "We believe high-quality engineering curricula shouldn't be locked behind expensive student debts. Aman is building the tools to make code accessible to every curious mind on earth.",
      bgImageUrl: "",
      bgVideoUrl: "",
      visible: true
    },
    mission: {
      label: "THE MISSION STATEMENT",
      title: "To inspire, educate, and place the next million full-stack developers.",
      description: "Our target is to break down complex system design systems, database architectures, and compiler dynamics into engaging, cinematic formats. We enable students to transition seamlessly from beginners to self-sufficient contributors.",
      accentColor: "#D4AF37",
      visible: true
    },
    vision: {
      label: "THE FUTURE VISION",
      title: "Vision 2030: Bridging the global developer deficit.",
      description: "Technology evolves at a rapid pace, yet university syllabi remain outdated. We are constructing an open, adaptive, cloud-native learning playground that responds directly to modern tech requirements.",
      accentColor: "#00E5FF",
      visible: true
    },
    coreValuesHeader: {
      badge: "OUR FUNDAMENTAL PRINCIPLES",
      titleLine1: "The Values that",
      titleLine2: "Drive Us",
      titleLine3: "Forward",
      description: "The core philosophy that guides every tutorial, sandbox, and curriculum line."
    },
    coreValues: [
      { id: "cv-1", title: "Cinematic Pedagogy", description: "Translating dry software engineering documentation into visual 3D storytelling.", accentColor: "#D4AF37", order: 1, status: "Active" },
      { id: "cv-2", title: "Open Source Ethos", description: "Empowering developers to build in public and contribute to core frameworks.", accentColor: "#00E5FF", order: 2, status: "Active" },
      { id: "cv-3", title: "Industry Alignment", description: "Curricula designed directly by senior principal engineers from tier-1 tech companies.", accentColor: "#aa3bff", order: 3, status: "Active" },
      { id: "cv-4", title: "Self-Sustaining Autonomy", description: "Teaching problem-solving blueprints rather than just copy-pasting code snippets.", accentColor: "#FF007F", order: 4, status: "Active" }
    ],
    brandPillarsHeader: {
      badge: "OUR PILLARS",
      titleLine1: "",
      titleLine2: "",
      titleLine3: ""
    },
    brandPillars: [
      { id: "pil-1", title: "Full-Stack Architecture", subtitle: "Next.js • Node.js • Distributed Systems", description: "Comprehensive coverage from browser rendering loops down to database sharding.", borderColor: "#D4AF37", order: 1, status: "Active" },
      { id: "pil-2", title: "Interactive Sandboxes", subtitle: "Cloud-Native Playground", description: "Zero-config, browser-based container environments for instant code execution.", borderColor: "#00E5FF", order: 2, status: "Active" },
      { id: "pil-3", title: "Career Placement Engine", subtitle: "Direct Partner Referrals", description: "Connecting top 1% graduates directly with high-growth venture-backed startups.", borderColor: "#aa3bff", order: 3, status: "Active" },
      { id: "pil-4", title: "Creator Ecosystem", subtitle: "Multiverse Content Channels", description: "Syndicating short-form breakdowns and documentaries across 5 core channels.", borderColor: "#FF007F", order: 4, status: "Active" }
    ],
    roadmapHeader: {
      badge: "STRATEGIC ROADMAP",
      titleLine1: "Our",
      titleLine2: "Roadmap to 2030",
      description: "Hover to Pause Timeline"
    },
    roadmap: [
      { id: "rm-1", year: "2024", quarter: "Q1", title: "Studio Suite Launch", goal: "JAIPUR HEADQUARTERS", description: "Established 4K multi-cam production suite & 3D render pipeline.", status: "Completed", accentColor: "#D4AF37", order: 1 },
      { id: "rm-2", year: "2025", quarter: "Q2", title: "Next Univerz Sandbox", goal: "WEB DEV PLAYGROUND", description: "Launched browser-based interactive terminal & code compiler sandbox.", status: "Active", accentColor: "#00E5FF", order: 2 },
      { id: "rm-3", year: "2026", quarter: "Q3", title: "Multiverse 5M Sub", goal: "GLOBAL AUDIENCE", description: "Expanding developer reach across 5 dedicated YouTube & IG channels.", status: "In Progress", accentColor: "#aa3bff", order: 3 },
      { id: "rm-4", year: "2030", quarter: "Q4", title: "Open Tech University", goal: "DECENTRALIZED DEGREE", description: "Accredited open engineering diploma recognized by global tech giants.", status: "Planning", accentColor: "#FF007F", order: 4 }
    ],
    cta: {
      heading: "Ready to Build Your Engineering Career?",
      description: "Join thousands of developers in our interactive sandbox playgrounds and master production-ready code.",
      primaryButtonText: "Get Started",
      primaryButtonLink: "/signup",
      secondaryButtonText: "Contact Admissions",
      secondaryButtonLink: "/contact",
      backgroundGradient: "linear-gradient(to right, #0a0a0a, #141414)",
      visible: true
    },
    seo: {
      metaTitle: "Mission & Vision | TechMaster",
      metaDescription: "Explore TechMaster's core mission to democratize technology education globally by 2030.",
      canonicalUrl: "https://techmaster.in/mission",
      ogImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
    },
    visibility: {
      desktop: true,
      tablet: true,
      mobile: true,
      published: true
    },
    versioning: {
      status: "Published",
      lastUpdated: "Today",
      updatedBy: "Super Admin"
    }
  };

  const ensureIds = (list, prefix) => {
    if (!Array.isArray(list)) return [];
    return list.map((item, idx) => ({
      id: item.id || item._id || `${prefix}-${idx}-${Date.now()}`,
      ...item
    }));
  };

  const storedCMS = db?.missionVisionData || db?.missionCMS || db?.mission_vision || defaultMissionVisionCMS;

  const [formData, setFormData] = useState({
    ...defaultMissionVisionCMS,
    ...storedCMS,
    hero: { ...defaultMissionVisionCMS.hero, ...(storedCMS.hero || {}) },
    mission: { ...defaultMissionVisionCMS.mission, ...(storedCMS.mission || {}) },
    vision: { ...defaultMissionVisionCMS.vision, ...(storedCMS.vision || {}) },
    coreValuesHeader: { ...defaultMissionVisionCMS.coreValuesHeader, ...(storedCMS.coreValuesHeader || {}) },
    coreValues: ensureIds((storedCMS.coreValues && storedCMS.coreValues.length > 0) ? storedCMS.coreValues : defaultMissionVisionCMS.coreValues, 'cor'),
    brandPillarsHeader: { ...defaultMissionVisionCMS.brandPillarsHeader, ...(storedCMS.brandPillarsHeader || {}) },
    brandPillars: ensureIds((storedCMS.brandPillars && storedCMS.brandPillars.length > 0) ? storedCMS.brandPillars : defaultMissionVisionCMS.brandPillars, 'pil'),
    roadmapHeader: { ...defaultMissionVisionCMS.roadmapHeader, ...(storedCMS.roadmapHeader || {}) },
    roadmap: ensureIds((storedCMS.roadmap && storedCMS.roadmap.length > 0) ? storedCMS.roadmap : defaultMissionVisionCMS.roadmap, 'roa'),
    cta: { ...defaultMissionVisionCMS.cta, ...(storedCMS.cta || {}) }
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestMissionVision = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/missionVision');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultMissionVisionCMS,
              ...data,
              hero: { ...defaultMissionVisionCMS.hero, ...(data.hero || {}) },
              mission: { ...defaultMissionVisionCMS.mission, ...(data.mission || {}) },
              vision: { ...defaultMissionVisionCMS.vision, ...(data.vision || {}) },
              coreValuesHeader: { ...defaultMissionVisionCMS.coreValuesHeader, ...(data.coreValuesHeader || {}) },
              coreValues: ensureIds((data.coreValues && data.coreValues.length > 0) ? data.coreValues : defaultMissionVisionCMS.coreValues, 'cor'),
              brandPillarsHeader: { ...defaultMissionVisionCMS.brandPillarsHeader, ...(data.brandPillarsHeader || {}) },
              brandPillars: ensureIds((data.brandPillars && data.brandPillars.length > 0) ? data.brandPillars : defaultMissionVisionCMS.brandPillars, 'pil'),
              roadmapHeader: { ...defaultMissionVisionCMS.roadmapHeader, ...(data.roadmapHeader || {}) },
              roadmap: ensureIds((data.roadmap && data.roadmap.length > 0) ? data.roadmap : defaultMissionVisionCMS.roadmap, 'roa'),
              cta: { ...defaultMissionVisionCMS.cta, ...(data.cta || {}) }
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest missionVision from backend:", err);
      }
    };
    fetchLatestMissionVision();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('missionVisionData', nextState);
    updateSection('missionCMS', nextState);
    updateSection('mission_vision', nextState);
    updateSection('missionVision', nextState);
  };

  const handleSaveAll = async (isPublished = false) => {
    const updatedState = {
      ...formData,
      versioning: {
        ...formData.versioning,
        status: isPublished ? 'Published' : 'Draft',
        lastUpdated: new Date().toLocaleString()
      }
    };
    persistChanges(updatedState);

    try {
      if (apiFetch) {
        await apiFetch('/missionVision', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'Mission & Vision Published Live!' : 'Draft Saved Successfully!', 'success');
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleItemDelete = (listKey, id) => {
    const list = [...formData[listKey]];
    const updated = list.filter(item => item.id !== id);
    persistChanges({ ...formData, [listKey]: updated });
    showToast('Item removed', 'info');
  };

  const handleModalSave = (e) => {
    e.preventDefault();
    const { listKey, item } = modalConfig;
    const list = [...formData[listKey]];

    let updated;
    if (item.id) {
      updated = list.map(i => i.id === item.id ? item : i);
    } else {
      const newItem = {
        ...item,
        id: `${listKey.slice(0, 3)}-${Date.now()}`,
        order: list.length + 1,
        status: 'Active'
      };
      updated = [...list, newItem];
    }

    persistChanges({ ...formData, [listKey]: updated });
    setModalConfig(null);
    showToast(item.id ? 'Item updated successfully!' : 'New item added!', 'success');
  };

  return (
    <div className="space-y-6 text-left">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Mission & Vision Enterprise CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Control Hero North Star, Mission Statement, Vision 2030, Core Values, Pillars & Strategic Roadmap.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => handleSaveAll(false)} variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            Save Draft
          </Button>
          <Button onClick={() => handleSaveAll(true)} variant="gold" size="sm" className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
            {isSaved ? <Check className="w-3.5 h-3.5 text-black" /> : <Save className="w-3.5 h-3.5" />}
            {isSaved ? 'Published Live!' : 'Publish Page'}
          </Button>
        </div>
      </div>

      {/* 7 Architectural Tabs */}
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'content', label: 'Page Content CMS', icon: Layers },
          { id: 'overview', label: 'Overview & Sections', icon: Compass },
          { id: 'media', label: 'Media Assets', icon: ImageIcon }
        ].map(tab => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 shadow-[0_0_12px_rgba(212,175,55,0.05)]'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB: CONTENT (Sub-Tabs) */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {/* Sub-Navigation */}
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/80 w-fit overflow-x-auto">
            {[
              { id: 'hero', label: '1. Hero Banner' },
              { id: 'mission_vision', label: '2. Mission & Vision Cards' },
              { id: 'core_values', label: '3. Fundamental Principles' },
              { id: 'pillars', label: '4. Foundation Pillars' },
              { id: 'roadmap', label: '5. Strategic Roadmap' },
              { id: 'cta', label: '6. CTA Banner' }
            ].map(sub => (
              <button
                key={sub.id}
                onClick={() => setContentSubTab(sub.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
                  contentSubTab === sub.id
                    ? 'bg-luxury-gold text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* SUB-TAB 1: HERO BANNER */}
          {contentSubTab === 'hero' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Hero Banner CMS</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                  <input
                    type="text"
                    value={formData.hero.badge}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, badge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Heading Line 1</label>
                    <input
                      type="text"
                      value={formData.hero.headingLine1}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, headingLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlight Word (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.hero.highlightText}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, highlightText: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Heading Line 2</label>
                    <input
                      type="text"
                      value={formData.hero.headingLine2}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, headingLine2: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description Content</label>
                  <textarea
                    rows={3}
                    value={formData.hero.description}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 2: MISSION & VISION CARDS */}
          {contentSubTab === 'mission_vision' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Mission Card */}
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Target className="w-4 h-4 text-luxury-gold" />
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Mission Statement Card</h3>
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.mission.label}
                    onChange={(e) => persistChanges({ ...formData, mission: { ...formData.mission, label: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Mission Title</label>
                  <textarea
                    rows={2}
                    value={formData.mission.title}
                    onChange={(e) => persistChanges({ ...formData, mission: { ...formData.mission, title: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Mission Description</label>
                  <textarea
                    rows={4}
                    value={formData.mission.description}
                    onChange={(e) => persistChanges({ ...formData, mission: { ...formData.mission, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Eye className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Vision Statement Card</h3>
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={formData.vision.label}
                    onChange={(e) => persistChanges({ ...formData, vision: { ...formData.vision, label: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-cyan-400 font-mono uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Vision Title</label>
                  <textarea
                    rows={2}
                    value={formData.vision.title}
                    onChange={(e) => persistChanges({ ...formData, vision: { ...formData.vision, title: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Vision Description</label>
                  <textarea
                    rows={4}
                    value={formData.vision.description}
                    onChange={(e) => persistChanges({ ...formData, vision: { ...formData.vision, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 3: FUNDAMENTAL PRINCIPLES (CORE VALUES) */}
          {contentSubTab === 'core_values' && (
            <div className="space-y-6 text-xs">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Fundamental Principles Header CMS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.coreValuesHeader.badge}
                      onChange={(e) => persistChanges({ ...formData, coreValuesHeader: { ...formData.coreValuesHeader, badge: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Section Title</label>
                    <input
                      type="text"
                      value={formData.coreValuesHeader.titleLine1}
                      onChange={(e) => persistChanges({ ...formData, coreValuesHeader: { ...formData.coreValuesHeader, titleLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Principle Cards ({formData.coreValues.length})</h3>
                  <Button 
                    onClick={() => setModalConfig({ listKey: 'coreValues', item: { title: '', description: '', accentColor: '#D4AF37' } })} 
                    variant="gold" 
                    size="sm" 
                    className="text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Principle Card
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {formData.coreValues.map((v, idx) => (
                    <div key={v.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
                          <span className="font-mono text-[10px] uppercase text-luxury-gold">Card #{idx + 1}</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setModalConfig({ listKey: 'coreValues', item: v })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleItemDelete('coreValues', v.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                        <h4 className="font-serif font-bold text-white text-base mb-1">{v.title}</h4>
                        <p className="text-zinc-400 font-light text-xs leading-relaxed">{v.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 4: FOUNDATION PILLARS */}
          {contentSubTab === 'pillars' && (
            <div className="space-y-6 text-xs">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Foundation Pillars Header CMS</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.brandPillarsHeader.badge}
                      onChange={(e) => persistChanges({ ...formData, brandPillarsHeader: { ...formData.brandPillarsHeader, badge: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Section Title</label>
                    <input
                      type="text"
                      value={formData.brandPillarsHeader.titleLine1}
                      onChange={(e) => persistChanges({ ...formData, brandPillarsHeader: { ...formData.brandPillarsHeader, titleLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Pillar Cards ({formData.brandPillars.length})</h3>
                  <Button 
                    onClick={() => setModalConfig({ listKey: 'brandPillars', item: { title: '', subtitle: '', description: '', borderColor: '#D4AF37' } })} 
                    variant="gold" 
                    size="sm" 
                    className="text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Pillar Card
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.brandPillars.map((p, idx) => (
                    <div key={p.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <h4 className="font-serif font-bold text-white text-base">{p.title}</h4>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setModalConfig({ listKey: 'brandPillars', item: p })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleItemDelete('brandPillars', p.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      {p.subtitle && <span className="text-luxury-gold font-mono text-[10px] uppercase block">{p.subtitle}</span>}
                      <p className="text-zinc-400 font-light text-xs leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 5: STRATEGIC ROADMAP TIMELINE */}
          {contentSubTab === 'roadmap' && (
            <div className="space-y-6 text-xs">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Roadmap Timeline Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.roadmapHeader.badge}
                      onChange={(e) => persistChanges({ ...formData, roadmapHeader: { ...formData.roadmapHeader, badge: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title</label>
                    <input
                      type="text"
                      value={formData.roadmapHeader.titleLine2}
                      onChange={(e) => persistChanges({ ...formData, roadmapHeader: { ...formData.roadmapHeader, titleLine2: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Hint Text</label>
                    <input
                      type="text"
                      value={formData.roadmapHeader.description}
                      onChange={(e) => persistChanges({ ...formData, roadmapHeader: { ...formData.roadmapHeader, description: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-400 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Roadmap Milestones ({formData.roadmap.length})</h3>
                  <Button 
                    onClick={() => setModalConfig({ listKey: 'roadmap', item: { year: '2027', quarter: 'Q1', title: '', goal: '', description: '', status: 'Planning', accentColor: '#D4AF37' } })} 
                    variant="gold" 
                    size="sm" 
                    className="text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Milestone
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.roadmap.map((rm, idx) => (
                    <div key={rm.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-luxury-gold/10 text-luxury-gold font-mono font-bold">{rm.year} {rm.quarter}</span>
                          <span className="text-[10px] font-mono uppercase text-emerald-400">{rm.status}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setModalConfig({ listKey: 'roadmap', item: rm })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleItemDelete('roadmap', rm.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      <h4 className="font-serif font-bold text-white text-base">{rm.title}</h4>
                      {rm.goal && <span className="text-zinc-400 font-mono text-[10px] uppercase block">{rm.goal}</span>}
                      <p className="text-zinc-400 font-light text-xs leading-relaxed">{rm.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB 6: CTA SECTION BANNER */}
          {contentSubTab === 'cta' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">CTA Banner Section CMS</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Heading</label>
                  <input
                    type="text"
                    value={formData.cta.heading}
                    onChange={(e) => persistChanges({ ...formData, cta: { ...formData.cta, heading: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formData.cta.description}
                    onChange={(e) => persistChanges({ ...formData, cta: { ...formData.cta, description: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-light"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Primary Button Text</label>
                    <input
                      type="text"
                      value={formData.cta.primaryButtonText}
                      onChange={(e) => persistChanges({ ...formData, cta: { ...formData.cta, primaryButtonText: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Primary Button Link</label>
                    <input
                      type="text"
                      value={formData.cta.primaryButtonLink}
                      onChange={(e) => persistChanges({ ...formData, cta: { ...formData.cta, primaryButtonLink: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-300 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: LIVE PREVIEW */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-3 bg-zinc-950/80 border border-zinc-800 p-2 rounded-xl">
            <button onClick={() => setPreviewMode('desktop')} className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'desktop' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}>
              <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
            </button>
            <button onClick={() => setPreviewMode('tablet')} className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'tablet' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}>
              <Tablet className="w-3.5 h-3.5" /> Tablet (768px)
            </button>
            <button onClick={() => setPreviewMode('mobile')} className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'mobile' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}>
              <Smartphone className="w-3.5 h-3.5" /> Mobile (375px)
            </button>
          </div>

          <div className="flex justify-center bg-black/90 p-4 rounded-2xl border border-zinc-800 min-h-[500px]">
            <div className={`bg-black transition-all duration-300 border border-zinc-800 rounded-xl overflow-hidden ${
              previewMode === 'desktop' ? 'w-full' : previewMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'
            }`}>
              <iframe
                src="https://www.techmasterco.com/mission"
                title="Live Preview Mission & Vision"
                className="w-full h-[600px] border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* CREATE / EDIT MODAL */}
      {modalConfig && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleModalSave} className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">
                {modalConfig.item.id ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button type="button" onClick={() => setModalConfig(null)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {Object.keys(modalConfig.item).filter(k => !['id', 'order', 'visible', 'deleted'].includes(k)).map(key => (
                <div key={key}>
                  <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">{key}</label>
                  <input
                    type="text"
                    value={modalConfig.item[key] || ''}
                    onChange={(e) => setModalConfig({
                      ...modalConfig,
                      item: { ...modalConfig.item, [key]: e.target.value }
                    })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                  />
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
              <Button type="button" variant="outline" size="sm" onClick={() => setModalConfig(null)}>Cancel</Button>
              <Button type="submit" variant="gold" size="sm">Save Item</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
