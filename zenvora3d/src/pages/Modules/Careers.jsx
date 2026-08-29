import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Briefcase, Users, Check, Save, Plus, Trash2, Edit3, Eye, EyeOff, 
  ArrowUp, ArrowDown, Upload, RefreshCw, Copy, Layers, Sliders, Globe, 
  Monitor, Tablet, Smartphone, Clock, Palette, Play, Image as ImageIcon, X, RotateCcw, FileText, Download, Mail, Phone, ExternalLink, CheckCircle2, Heart, Award
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const Careers = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('content'); // overview, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('culture'); // hero, jobs, form, applicants, culture, process
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);
  const [selectedApplicant, setSelectedApplicant] = useState(null);

  // Default pre-populated production values
  const defaultCareersCMS = {
    hero: {
      badge: "JOIN THE TEAM",
      titleLine1: "Join Aman's",
      titleLine2: "Creator & Education Lab",
      description: "We look for cinematic editors, curriculum writers, and developer advocates who want to construct the future of tech education.",
      bgVideoUrl: "",
      bgImageUrl: "",
      visible: true
    },
    cultureHeader: {
      badge: "OUR DNA",
      titleLine1: "Culture &",
      titleLine2: "Benefits",
      description: "Our core principles, stipends, and work environment."
    },
    culture: [
      { id: "cul-1", title: "Learning Budget", description: "$2,000 annual stipend for courses, books, and conference tickets.", order: 1, visible: true, deleted: false },
      { id: "cul-2", title: "Health & Wellness", description: "Premium global health coverage and mental wellness stipends.", order: 2, visible: true, deleted: false },
      { id: "cul-3", title: "Creator Autonomy", description: "Own your projects. We cultivate leaders who can drive their own vision.", order: 3, visible: true, deleted: false },
      { id: "cul-4", title: "Remote First", description: "Work from anywhere in the world. We believe in output, not office hours.", order: 4, visible: true, deleted: false }
    ],
    processHeader: {
      badge: "HOW WE HIRE",
      titleLine1: "The",
      titleLine2: "Process",
      description: "Transparent, asynchronous 4-step hiring pipeline."
    },
    process: [
      { id: "prc-1", step: "01", title: "Application Review", description: "We review your portfolio, GitHub, and application answers.", order: 1, visible: true, deleted: false },
      { id: "prc-2", step: "02", title: "Intro Call", description: "A 30-minute culture and vibe check with our ops team.", order: 2, visible: true, deleted: false },
      { id: "prc-3", step: "03", title: "Technical Task", description: "A paid, asynchronous take-home project relevant to your role.", order: 3, visible: true, deleted: false },
      { id: "prc-4", step: "04", title: "Final Interview", description: "A conversation with Aman and the leads. No live whiteboarding.", order: 4, visible: true, deleted: false }
    ],
    formConfig: {
      title: "Direct Application",
      enableName: true,
      enableEmail: true,
      enablePhone: true,
      enablePosition: true,
      enablePortfolio: true,
      enableWhyJoin: true,
      enableCoverLetter: true,
      enableResume: true,
      allowedTypes: ".pdf,.doc,.docx,.ppt,.pptx",
      maxSizeMB: 10,
      submitButtonText: "Send Application",
      successMessage: "Our operations director will review your materials and reach out soon."
    },
    jobs: [
      {
        id: "job-1",
        title: "Senior Video Editor & Colorist",
        department: "Production Suite",
        type: "Full Time",
        location: "Jaipur / Remote",
        salary: "$18,000 - $25,000",
        description: "Crafting high-octane 4K YouTube breakdowns, fast-paced shorts, and cinematic color grades.",
        status: "Active",
        featured: true,
        order: 1,
        visible: true,
        deleted: false
      },
      {
        id: "job-2",
        title: "Full-Stack Curriculum Architect",
        department: "Next Univerz",
        type: "Full Time",
        location: "Remote",
        salary: "$30,000 - $45,000",
        description: "Designing interactive web dev sandboxes, system design masterclasses, and coding challenges.",
        status: "Active",
        featured: true,
        order: 2,
        visible: true,
        deleted: false
      }
    ],
    resumes: [
      {
        id: "res-1",
        name: "Rohan Varma",
        email: "rohan@editor.io",
        phone: "+91 98765 43210",
        jobTitle: "Senior Video Editor & Colorist",
        experience: "https://portfolio.rohanvarma.dev",
        message: "Passionate about fast-paced cinematic tech reviews and Premiere/Resolve workflows.",
        coverLetter: "I have edited 500+ viral shorts and long-form tech teardowns...",
        resumeUrl: "https://example.com/resume.pdf",
        status: "New",
        createdAt: "2026-07-28T10:15:00Z"
      }
    ],
    seo: {
      metaTitle: "Careers & Openings | TechMaster",
      metaDescription: "Join TechMaster's Creator & Education Lab. Explore open positions for video editors, engineers, and curriculum leads.",
      canonicalUrl: "https://techmaster.in/careers",
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

  const storedCMS = db?.careersCMS || db?.careersPage || defaultCareersCMS;
  const storedJobs = db?.careers || db?.jobOpenings || defaultCareersCMS.jobs;
  const storedResumes = db?.resumes || defaultCareersCMS.resumes;

  const [formData, setFormData] = useState({
    ...defaultCareersCMS,
    ...storedCMS,
    hero: { ...defaultCareersCMS.hero, ...(storedCMS.hero || db?.careerHero || {}) },
    cultureHeader: { ...defaultCareersCMS.cultureHeader, ...(storedCMS.cultureHeader || db?.cultureHeader || {}) },
    culture: (db?.careerCulture && db.careerCulture.length > 0) ? db.careerCulture : defaultCareersCMS.culture,
    processHeader: { ...defaultCareersCMS.processHeader, ...(storedCMS.processHeader || db?.processHeader || {}) },
    process: (db?.careerProcess && db.careerProcess.length > 0) ? db.careerProcess : defaultCareersCMS.process,
    jobs: (storedJobs && storedJobs.length > 0) ? storedJobs : defaultCareersCMS.jobs,
    resumes: (storedResumes && storedResumes.length > 0) ? storedResumes : defaultCareersCMS.resumes
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  const getSafeResumeUrl = (rawUrl) => {
    if (!rawUrl) return "";
    if (rawUrl.includes("cloudinary.com") && rawUrl.includes("/image/upload/")) {
      return rawUrl.replace("/image/upload/", "/raw/upload/");
    }
    return rawUrl;
  };

  const fetchResumesFromBackend = async () => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
      const res = await fetch(`${baseUrl}/cms`);
      if (res.ok) {
        const json = await res.json();
        const serverResumes = json.data?.resumes || json.data?.careerApplications || [];
        if (Array.isArray(serverResumes) && serverResumes.length > 0) {
          setFormData(prev => {
            const merged = [...serverResumes];
            (prev.resumes || []).forEach(localItem => {
              if (!merged.some(m => m.id === localItem.id || (m.email === localItem.email && m.createdAt === localItem.createdAt))) {
                merged.push(localItem);
              }
            });
            return { ...prev, resumes: merged };
          });
        }
      }
    } catch (e) {
      console.warn("Resumes fetch warning:", e);
    }
  };

  useEffect(() => {
    fetchResumesFromBackend();
    const interval = setInterval(fetchResumesFromBackend, 5000);

    let channel;
    try {
      channel = new BroadcastChannel("zenvora_cms_sync");
      channel.onmessage = (event) => {
        if (event.data?.type === "APPLICATION_SUBMITTED" && event.data?.data) {
          const newApp = event.data.data;
          setFormData(prev => {
            const exists = (prev.resumes || []).some(r => r.id === newApp.id);
            if (exists) return prev;
            const updated = [newApp, ...(prev.resumes || [])];
            updateSection('resumes', updated);
            return { ...prev, resumes: updated };
          });
          showToast(`New Job Application from ${newApp.candidateName || newApp.name || 'Candidate'}!`, 'info');
        }
      };
    } catch (e) {}

    return () => {
      clearInterval(interval);
      if (channel) channel.close();
    };
  }, []);

  const handleDeleteApplicant = async (appId) => {
    if (!window.confirm("Are you sure you want to delete this job application?")) return;

    try {
      const baseUrl = import.meta.env.VITE_API_URL || "https://tech-master-afhx.onrender.com/api/v1";
      await fetch(`${baseUrl}/resumes/${appId}`, { method: "DELETE" });
    } catch (e) {
      console.warn("Delete endpoint call error:", e);
    }

    const updatedResumes = formData.resumes.filter(r => r.id !== appId && r._id !== appId);
    persistChanges({ ...formData, resumes: updatedResumes });
    if (selectedApplicant && (selectedApplicant.id === appId || selectedApplicant._id === appId)) {
      setSelectedApplicant(null);
    }
    showToast('Application deleted successfully!', 'info');
  };

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('careersCMS', nextState);
    updateSection('careersPage', nextState);
    updateSection('careers', nextState.jobs);
    updateSection('careerData', nextState.jobs);
    updateSection('careerHero', nextState.hero);
    updateSection('cultureHeader', nextState.cultureHeader);
    updateSection('careerCulture', nextState.culture);
    updateSection('processHeader', nextState.processHeader);
    updateSection('careerProcess', nextState.process);
    updateSection('resumes', nextState.resumes);
  };

  const handleSaveAll = (isPublished = false) => {
    const updatedState = {
      ...formData,
      versioning: {
        ...formData.versioning,
        status: isPublished ? 'Published' : 'Draft',
        lastUpdated: new Date().toLocaleString()
      }
    };
    persistChanges(updatedState);
    setIsSaved(true);
    showToast(isPublished ? 'Careers Page Published Live!' : 'Draft Saved Successfully!', 'success');
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
        visible: true
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

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Careers Page Enterprise CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Manage Open Positions, Direct Applications Inbox, Culture & Benefits Cards, and Hiring Steps.
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

      {/* Page Sub-Navigation */}
      <div className="space-y-6">
          {/* Sub-Navigation */}
          <div className="flex items-center gap-2 bg-zinc-900/60 p-1.5 rounded-xl border border-zinc-800/80 w-fit overflow-x-auto">
            {[
              { id: 'culture', label: '★ Culture & Benefits CMS' },
              { id: 'hero', label: '1. Hero Banner' },
              { id: 'jobs', label: '2. Open Positions' },
              { id: 'form', label: '3. Application Form' },
              { id: 'applicants', label: '4. Applicants Inbox' },
              { id: 'process', label: '5. Hiring Process' }
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

          {/* SUB-TAB: CULTURE & BENEFITS CMS */}
          {contentSubTab === 'culture' && (
            <div className="space-y-6">
              {/* Header Editor */}
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
                <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                  <Heart className="w-4 h-4 text-luxury-gold" />
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Culture & Benefits Section Header CMS</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.cultureHeader.badge}
                      onChange={(e) => persistChanges({ ...formData, cultureHeader: { ...formData.cultureHeader, badge: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Main Text</label>
                    <input
                      type="text"
                      value={formData.cultureHeader.titleLine1}
                      onChange={(e) => persistChanges({ ...formData, cultureHeader: { ...formData.cultureHeader, titleLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlight Word (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.cultureHeader.titleLine2}
                      onChange={(e) => persistChanges({ ...formData, cultureHeader: { ...formData.cultureHeader, titleLine2: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Cards Grid Editor */}
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Culture Cards Catalog ({formData.culture.length} Cards)</h3>
                    <p className="text-[11px] text-zinc-400 font-mono mt-0.5">Manage Learning Budget, Health & Wellness, Creator Autonomy, Remote First cards.</p>
                  </div>
                  <Button 
                    onClick={() => setModalConfig({ listKey: 'culture', item: { title: '', description: '' } })} 
                    variant="gold" 
                    size="sm" 
                    className="text-xs uppercase font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Benefit Card
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {formData.culture.map((c, idx) => (
                    <div key={c.id || idx} className="p-5 bg-zinc-900/60 border border-zinc-800/80 rounded-xl space-y-3 flex flex-col justify-between hover:border-luxury-gold/30 transition-all">
                      <div>
                        <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 mb-3">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase">Card #{idx + 1}</span>
                          <div className="flex items-center gap-1">
                            <button onClick={() => setModalConfig({ listKey: 'culture', item: c })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleItemDelete('culture', c.id)} className="p-1 text-rose-400 hover:text-rose-300"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </div>
                        <h4 className="font-serif font-bold text-white text-base mb-2">{c.title}</h4>
                        <p className="text-zinc-400 font-light text-xs leading-relaxed">{c.description}</p>
                      </div>

                      <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono text-luxury-gold">
                        <span>Status: Active</span>
                        <span className="cursor-pointer hover:underline" onClick={() => setModalConfig({ listKey: 'culture', item: c })}>Edit Card →</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB: HERO */}
          {contentSubTab === 'hero' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Careers Hero Banner</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Small Badge</label>
                  <input
                    type="text"
                    value={formData.hero.badge}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, badge: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 1</label>
                  <input
                    type="text"
                    value={formData.hero.titleLine1}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, titleLine1: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Line 2 (Highlighted)</label>
                  <input
                    type="text"
                    value={formData.hero.titleLine2}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, titleLine2: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                  />
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

          {/* SUB-TAB: OPEN POSITIONS */}
          {contentSubTab === 'jobs' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Open Positions ({formData.jobs.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'jobs', item: { title: '', department: 'Production Suite', type: 'Full Time', location: 'Jaipur / Remote', salary: '$20,000', description: '', status: 'Active' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Position
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.jobs.map((j) => (
                  <div key={j.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-mono text-[10px] text-luxury-gold uppercase">{j.department}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'jobs', item: j })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('jobs', j.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>

                    <h4 className="font-serif font-bold text-white text-base">{j.title}</h4>
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{j.description}</p>

                    <div className="flex flex-wrap gap-2 text-[10px] font-mono text-zinc-400 pt-2 border-t border-zinc-800">
                      <span>Location: <strong className="text-white">{j.location}</strong></span>
                      <span>Type: <strong className="text-white">{j.type}</strong></span>
                      {j.salary && <span>Salary: <strong className="text-luxury-gold">{j.salary}</strong></span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB: APPLICATION FORM */}
          {contentSubTab === 'form' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Direct Application Form Configuration</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Form Section Title</label>
                  <input
                    type="text"
                    value={formData.formConfig.title}
                    onChange={(e) => persistChanges({ ...formData, formConfig: { ...formData.formConfig, title: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Submit Button Text</label>
                  <input
                    type="text"
                    value={formData.formConfig.submitButtonText}
                    onChange={(e) => persistChanges({ ...formData, formConfig: { ...formData.formConfig, submitButtonText: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>
              </div>
            </div>
          )}

          {/* SUB-TAB: APPLICANTS INBOX */}
          {contentSubTab === 'applicants' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Applicants Submission Inbox ({formData.resumes.length})</h3>
                <Button onClick={fetchResumesFromBackend} variant="outline" size="sm" className="text-[10px] uppercase font-mono">
                  Refresh Applications
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900/80 text-zinc-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Applicant Name</th>
                      <th className="py-2.5 px-4">Position</th>
                      <th className="py-2.5 px-4">Email</th>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Resume Document</th>
                      <th className="py-2.5 px-4">Status</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60">
                    {formData.resumes.map((r, idx) => {
                      const name = r.candidateName || r.name || r.fullName || r.applicantName || "Anonymous Candidate";
                      const jobRole = r.jobApplied || r.jobTitle || r.position || r.role || "General Application";
                      const rawResume = r.resumeFileUrl || r.resumeUrl || r.resume || "";
                      const resumeLink = getSafeResumeUrl(rawResume);
                      const resumeName = r.resumeFileName || "Resume File";
                      const dateStr = r.date || (r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "Recent");

                      return (
                        <tr key={r.id || r._id || idx} className="hover:bg-zinc-900/30">
                          <td className="py-2.5 px-4 font-semibold text-white">
                            <div>{name}</div>
                            {r.phone && <div className="text-[10px] text-zinc-500 font-mono">{r.phone}</div>}
                          </td>
                          <td className="py-2.5 px-4 font-mono text-luxury-gold font-bold">{jobRole}</td>
                          <td className="py-2.5 px-4 font-mono text-zinc-300">{r.email || 'N/A'}</td>
                          <td className="py-2.5 px-4 font-mono text-zinc-500 text-[10px]">{dateStr}</td>
                          <td className="py-2.5 px-4">
                            {resumeLink ? (
                              <a 
                                href={resumeLink} 
                                target="_blank" 
                                rel="noreferrer" 
                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500 hover:text-white transition-colors font-mono text-[10px]"
                              >
                                <FileText className="w-3 h-3 text-luxury-gold" /> {resumeName}
                              </a>
                            ) : (
                              <span className="text-zinc-600 font-mono text-[10px]">No File</span>
                            )}
                          </td>
                          <td className="py-2.5 px-4">
                            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[10px]">
                              {r.status || 'New'}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-right flex items-center justify-end gap-2">
                            <button onClick={() => setSelectedApplicant(r)} className="px-2.5 py-1 rounded bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 hover:bg-luxury-gold hover:text-black transition-colors font-mono uppercase text-[10px]">
                              View Details
                            </button>
                            <button 
                              onClick={() => handleDeleteApplicant(r.id || r._id)} 
                              className="p-1 rounded text-rose-400 hover:text-rose-200 hover:bg-rose-500/20 transition-colors"
                              title="Delete Application"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SUB-TAB: HIRING PROCESS */}
          {contentSubTab === 'process' && (
            <div className="space-y-6">
              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Hiring Process Section Header</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.processHeader.badge}
                      onChange={(e) => persistChanges({ ...formData, processHeader: { ...formData.processHeader, badge: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Title Main Text</label>
                    <input
                      type="text"
                      value={formData.processHeader.titleLine1}
                      onChange={(e) => persistChanges({ ...formData, processHeader: { ...formData.processHeader, titleLine1: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlight Word</label>
                    <input
                      type="text"
                      value={formData.processHeader.titleLine2}
                      onChange={(e) => persistChanges({ ...formData, processHeader: { ...formData.processHeader, titleLine2: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Hiring Process Steps ({formData.process.length})</h3>
                  <Button 
                    onClick={() => setModalConfig({ listKey: 'process', item: { step: '05', title: '', description: '' } })} 
                    variant="gold" 
                    size="sm" 
                    className="text-xs uppercase"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Add Hiring Step
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formData.process.map((p, idx) => (
                    <div key={p.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="font-serif font-bold text-luxury-gold text-lg">Step {p.step || `0${idx + 1}`}</span>
                        <div className="flex items-center gap-1">
                          <button onClick={() => setModalConfig({ listKey: 'process', item: p })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleItemDelete('process', p.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                      <h4 className="font-bold text-white text-sm">{p.title}</h4>
                      <p className="text-zinc-400 font-light text-xs leading-relaxed">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

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
                src="http://localhost:5173/careers"
                title="Live Preview Careers"
                className="w-full h-[600px] border-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* APPLICANT DETAIL MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Applicant Profile</h3>
              <button type="button" onClick={() => setSelectedApplicant(null)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            {(() => {
              const name = selectedApplicant.candidateName || selectedApplicant.name || selectedApplicant.fullName || "Anonymous Candidate";
              const jobRole = selectedApplicant.jobApplied || selectedApplicant.jobTitle || selectedApplicant.position || "General Application";
              const rawResume = selectedApplicant.resumeFileUrl || selectedApplicant.resumeUrl || selectedApplicant.resume || "";
              const resumeLink = getSafeResumeUrl(rawResume);
              const resumeName = selectedApplicant.resumeFileName || "Uploaded Resume PDF";
              const portfolio = selectedApplicant.portfolioUrl || selectedApplicant.experience || selectedApplicant.portfolioLink || "";
              const whyJoin = selectedApplicant.message || selectedApplicant.whyJoin || "";

              return (
                <div className="space-y-3">
                  <div>
                    <span className="text-zinc-500 font-mono uppercase text-[10px] block">Candidate Name</span> 
                    <strong className="text-white text-base font-serif">{name}</strong>
                  </div>
                  
                  <div>
                    <span className="text-zinc-500 font-mono uppercase text-[10px] block">Applied Position</span> 
                    <span className="text-luxury-gold font-mono font-bold text-xs">{jobRole}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <div>
                      <span className="text-zinc-500 font-mono uppercase text-[10px] block">Email</span> 
                      <span className="text-zinc-200 font-mono text-xs">{selectedApplicant.email || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-zinc-500 font-mono uppercase text-[10px] block">Phone</span> 
                      <span className="text-zinc-200 font-mono text-xs">{selectedApplicant.phone || 'N/A'}</span>
                    </div>
                  </div>

                  {portfolio && (
                    <div>
                      <span className="text-zinc-500 font-mono uppercase text-[10px] block mb-1">Portfolio / GitHub</span> 
                      <a href={portfolio} target="_blank" rel="noreferrer" className="text-luxury-gold hover:underline font-mono text-xs break-all">
                        {portfolio}
                      </a>
                    </div>
                  )}

                  {resumeLink && (
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                      <span className="text-zinc-400 font-mono uppercase text-[10px] block mb-1.5 font-bold">Uploaded Resume Document</span> 
                      <a 
                        href={resumeLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-luxury-gold text-black font-bold font-mono text-xs hover:bg-yellow-400 transition-colors shadow-gold-glow"
                      >
                        <FileText className="w-4 h-4 text-black" /> View / Download {resumeName}
                      </a>
                    </div>
                  )}

                  {whyJoin && (
                    <div>
                      <span className="text-zinc-500 font-mono uppercase text-[10px] block mb-1">Why Join Answer</span> 
                      <p className="text-zinc-300 p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs leading-relaxed">{whyJoin}</p>
                    </div>
                  )}

                  {selectedApplicant.coverLetter && (
                    <div>
                      <span className="text-zinc-500 font-mono uppercase text-[10px] block mb-1">Cover Letter</span> 
                      <p className="text-zinc-300 p-3 bg-zinc-900 rounded-xl border border-zinc-800 text-xs leading-relaxed">{selectedApplicant.coverLetter}</p>
                    </div>
                  )}
                </div>
              );
            })()}

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <button 
                type="button"
                onClick={() => handleDeleteApplicant(selectedApplicant.id || selectedApplicant._id)} 
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors text-xs font-mono flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Application
              </button>
              <Button variant="outline" size="sm" onClick={() => setSelectedApplicant(null)}>Close</Button>
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
