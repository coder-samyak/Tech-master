import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Megaphone, Check, Save, Plus, Trash2, Edit3, Eye, 
  Layers, Globe, Monitor, Tablet, Smartphone, Clock, ImageIcon, X, Award, Sparkles, Calendar, Layers3, Target, ArrowUpRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

export const Campaigns = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();

  const [activeTab, setActiveTab] = useState('content'); // overview, content, media, seo, visibility, publish, preview
  const [contentSubTab, setContentSubTab] = useState('hero'); // hero, campaigns, process, success
  const [previewMode, setPreviewMode] = useState('desktop');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [modalConfig, setModalConfig] = useState(null);

  // Default pre-populated production values
  const defaultCampaignsCMS = {
    hero: {
      eyebrowText: "INITIATIVE CAMPAIGNS",
      title: "Empowerment Drives & Coding Challenges",
      highlightedTitle: "Coding Challenges",
      description: "Review our campaigns designed to bring cloud services, laptops, coding bootcamps, and career mentoring to students globally.",
      visible: true
    },
    campaigns: [
      {
        id: "cp-1",
        title: "Vercel: Build in Public Challenge",
        description: "A 30-day global sprint encouraging developers to deploy full-stack Next.js applications with real-time feedback.",
        reach: "10,000+ Developers",
        sponsor: "Vercel",
        status: "Completed",
        coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
        accentColor: "#D4AF37",
        highlights: ["10K+ Registrations", "5,000+ App Deployments", "$50K Cloud Credits"]
      },
      {
        id: "cp-2",
        title: "GitHub Open Source University Tour",
        description: "Visiting 50 university campuses worldwide to teach Git workflows, pull request etiquette, and open-source ethics.",
        reach: "25,000+ Students",
        sponsor: "GitHub",
        status: "Active",
        coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
        accentColor: "#00E5FF",
        highlights: ["50 Campus Workshops", "2,500+ PRs Merged", "Exclusive Student Swag"]
      },
      {
        id: "cp-3",
        title: "Google Cloud Vertex AI Cohort",
        description: "Empowering 500 AI enthusiasts with hands-on Vertex AI pipelines, fine-tuning LLMs, and deploying cloud models.",
        reach: "500 AI Fellows",
        sponsor: "Google Cloud",
        status: "Active",
        coverImage: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
        accentColor: "#aa3bff",
        highlights: ["500 Fellowships", "$500K Vertex Credits", "Direct Hiring Referrals"]
      }
    ],
    process: [
      { id: "pr-1", stepNumber: "01", title: "Campaign Planning", description: "Meticulously outlining timelines, allocating resources, and defining key performance indicators." },
      { id: "pr-2", stepNumber: "02", title: "Campaign Strategy", description: "Crafting narrative arcs and selecting digital channels to guarantee maximum developer reach." },
      { id: "pr-3", stepNumber: "03", title: "Campaign Execution", description: "Handling high-end video production, live moderation, and ground-level logistics." },
      { id: "pr-4", stepNumber: "04", title: "Analytics & Monitoring", description: "Real-time tracking of engagement metrics, audience retention, and click-through rates." },
      { id: "pr-5", stepNumber: "05", title: "Results & ROI Reports", description: "Delivering comprehensive post-campaign reports detailing brand lift and quantifiable outcomes." }
    ],
    successStories: [
      {
        id: "ss-1",
        title: "AWS Educate Drive",
        description: "By gamifying the learning process, we helped AWS register over 25,000 new student accounts in a single month.",
        linkText: "Read Full Story",
        accentColor: "#D4AF37"
      },
      {
        id: "ss-2",
        title: "MongoDB Hackathon",
        description: "A weekend-long virtual event that produced 500+ open-source database implementations for full-stack bootcamps.",
        linkText: "Read Full Story",
        accentColor: "#00E5FF"
      }
    ],
    seo: {
      metaTitle: "Initiative Campaigns & Coding Drives | TechMaster",
      metaDescription: "Explore TechMaster's global coding challenges, hackathons, and cloud empowerment drives.",
      canonicalUrl: "https://techmaster.in/campaigns",
      ogImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200"
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

  const storedCMS = db?.campaignsPage || db?.campaignsCMS || db?.campaignsData || defaultCampaignsCMS;

  const [formData, setFormData] = useState({
    ...defaultCampaignsCMS,
    ...storedCMS,
    hero: { ...defaultCampaignsCMS.hero, ...(storedCMS.hero || {}) },
    campaigns: (storedCMS.campaigns && storedCMS.campaigns.length > 0) ? storedCMS.campaigns : defaultCampaignsCMS.campaigns,
    process: (storedCMS.process && storedCMS.process.length > 0) ? storedCMS.process : defaultCampaignsCMS.process,
    successStories: (storedCMS.successStories && storedCMS.successStories.length > 0) ? storedCMS.successStories : defaultCampaignsCMS.successStories
  });

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  useEffect(() => {
    const fetchLatestCampaigns = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/campaigns');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultCampaignsCMS,
              ...data,
              hero: { ...defaultCampaignsCMS.hero, ...(data.hero || {}) },
              campaigns: (data.campaigns && data.campaigns.length > 0) ? data.campaigns : defaultCampaignsCMS.campaigns,
              process: (data.process && data.process.length > 0) ? data.process : defaultCampaignsCMS.process,
              successStories: (data.successStories && data.successStories.length > 0) ? data.successStories : defaultCampaignsCMS.successStories
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest campaigns from backend:", err);
      }
    };
    fetchLatestCampaigns();
  }, []);

  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('campaignsPage', nextState);
    updateSection('campaignsCMS', nextState);
    updateSection('campaignsData', nextState.campaigns);
    updateSection('campaigns', nextState.campaigns);
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
        await apiFetch('/campaigns', {
          method: 'PUT',
          body: JSON.stringify(updatedState)
        });
      }
    } catch (err) {
      console.warn("Backend API sync warning:", err);
    }

    setIsSaved(true);
    showToast(isPublished ? 'Campaigns Page Published Live!' : 'Draft Saved Successfully!', 'success');
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
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Campaigns Enterprise CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Control Initiative Campaigns, Hackathon Drives, Lifecycle Process & Client Success Stories.
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
          { id: 'overview', label: 'Overview & Stats', icon: Megaphone },
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
              { id: 'campaigns', label: '2. Campaigns Cards' },
              { id: 'process', label: '3. Lifecycle Process' },
              { id: 'success', label: '4. Client Success Stories' }
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

          {/* SUB-TAB 1: HERO HEADER */}
          {contentSubTab === 'hero' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Campaigns Hero Banner</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Eyebrow Badge</label>
                  <input
                    type="text"
                    value={formData.hero.eyebrowText}
                    onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, eyebrowText: e.target.value } })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono uppercase font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Full Title</label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, title: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold"
                    />
                  </div>

                  <div>
                    <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlighted Word (Gold Italic)</label>
                    <input
                      type="text"
                      value={formData.hero.highlightedTitle}
                      onChange={(e) => persistChanges({ ...formData, hero: { ...formData.hero, highlightedTitle: e.target.value } })}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-serif italic font-bold"
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

          {/* SUB-TAB 2: CAMPAIGN CARDS CATALOG */}
          {contentSubTab === 'campaigns' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Campaign Cards ({formData.campaigns.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'campaigns', item: { title: '', description: '', reach: '5,000+ Developers', sponsor: 'TechMaster', status: 'Active', coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800', accentColor: '#D4AF37' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add New Campaign
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formData.campaigns.map((c, idx) => (
                  <div key={c.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="aspect-video w-full rounded-lg overflow-hidden border border-zinc-800 mb-3 relative">
                        <img src={c.coverImage || c.image} alt={c.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-black/80 text-luxury-gold font-mono text-[9px] px-2 py-0.5 rounded border border-luxury-gold/30 uppercase">
                          Reach: {c.reach}
                        </span>
                      </div>

                      <h4 className="font-serif font-bold text-white text-base leading-snug mb-1">{c.title}</h4>
                      <span className="text-zinc-400 font-mono text-[10px] uppercase block mb-2">Sponsor: {c.sponsor}</span>
                      <p className="text-zinc-400 font-light text-xs line-clamp-3 mb-2">{c.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-[10px] font-mono text-zinc-400">
                      <span>Status: {c.status}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'campaigns', item: c })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('campaigns', c.id)} className="p-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 3: LIFECYCLE PROCESS */}
          {contentSubTab === 'process' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Lifecycle Process Steps ({formData.process.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'process', item: { stepNumber: '06', title: '', description: '' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Process Step
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.process.map((pr, idx) => (
                  <div key={pr.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <span className="font-mono text-luxury-gold font-bold">{pr.stepNumber || `0${idx + 1}`}. {pr.title}</span>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'process', item: pr })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('process', pr.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{pr.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-TAB 4: CLIENT SUCCESS STORIES */}
          {contentSubTab === 'success' && (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Client Success Stories ({formData.successStories.length})</h3>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'successStories', item: { title: '', description: '', linkText: 'Read Full Story', accentColor: '#D4AF37' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Success Story
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {formData.successStories.map((ss, idx) => (
                  <div key={ss.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                      <h4 className="font-serif font-bold text-white text-base">{ss.title}</h4>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModalConfig({ listKey: 'successStories', item: ss })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleItemDelete('successStories', ss.id)} className="text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                    <p className="text-zinc-400 font-light text-xs leading-relaxed">{ss.description}</p>
                  </div>
                ))}
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
                src="https://www.techmasterco.com/campaigns"
                title="Live Preview Campaigns"
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
              {Object.keys(modalConfig.item).filter(k => !['id', 'order', 'status', 'deleted'].includes(k)).map(key => (
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

export default Campaigns;
