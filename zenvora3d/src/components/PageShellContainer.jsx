import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { useMediaManager } from '../context/MediaContext';
import { 
  FileText, Globe, Image as ImageIcon, Eye, EyeOff, Save, 
  RefreshCw, Check, Sparkles, Clock, History, Sliders, Monitor, 
  Smartphone, Tablet, ChevronRight, Layers, Lock, ShieldCheck 
} from 'lucide-react';
import { Button } from './ui/Button';
import { Toast } from './ui/Toast';

export const PageShellContainer = ({
  pageTitle,
  pageSlug,
  pageKey,
  sectionsRoadmap = [],
  hiddenTabs = ['media', 'seo'],
  children
}) => {
  const { db, updateSection } = useDatabase();
  const { openMediaManager } = useMediaManager();
  const [activeTab, setActiveTab] = useState('overview');
  const [previewMode, setPreviewMode] = useState('desktop'); // desktop, tablet, mobile
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // Page state tracking
  const defaultPageState = {
    status: 'Published',
    visibility: { desktop: true, mobile: true, tablet: true },
    scheduledDate: '',
    seo: {
      metaTitle: `${pageTitle} | TechMaster`,
      metaDescription: `Official ${pageTitle} page of TechMaster Digital Pvt Ltd.`,
      keywords: `TechMaster, ${pageTitle}`,
      canonicalUrl: `https://techmaster.in${pageSlug}`,
      ogImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200',
      allowIndex: true
    },
    versionHistory: [
      { version: 'v1.2 (Live)', date: '2026-07-28 14:30', author: 'Super Admin' },
      { version: 'v1.1 (Draft)', date: '2026-07-27 10:15', author: 'Content Editor' }
    ]
  };

  const storedData = db?.[`page_${pageKey}`] || defaultPageState;
  const [pageState, setPageState] = useState(storedData);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
  };

  const handleSaveDraft = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updated = { ...pageState, status: 'Draft' };
      setPageState(updated);
      updateSection(`page_${pageKey}`, updated);
      setIsSaving(false);
      showToast(`${pageTitle} saved as Draft!`, 'info');
    }, 600);
  };

  const handlePublish = () => {
    setIsSaving(true);
    setTimeout(() => {
      const updated = { 
        ...pageState, 
        status: 'Published',
        versionHistory: [
          { version: `v1.${pageState.versionHistory.length + 1} (Live)`, date: new Date().toLocaleString(), author: 'Super Admin' },
          ...pageState.versionHistory
        ]
      };
      setPageState(updated);
      updateSection(`page_${pageKey}`, updated);
      setIsSaving(false);
      showToast(`${pageTitle} Published successfully to Website!`, 'success');
    }, 800);
  };

  return (
    <div className="space-y-6 text-left">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* TOP PAGE HEADER BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">{pageTitle}</h1>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
              pageState.status === 'Published' 
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              {pageState.status}
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            URL Slug: <span className="text-luxury-gold">{pageSlug}</span> • Enterprise Page CMS Container
          </p>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <Button onClick={handleSaveDraft} variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            Save Draft
          </Button>
          <Button onClick={handlePublish} variant="gold" size="sm" className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5">
            {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
            Publish Page
          </Button>
        </div>
      </div>

      {/* ARCHITECTURAL TABS ROW */}
      <div className="flex items-center gap-1 border-b border-zinc-800/80 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'overview', label: 'Overview', icon: FileText },
          { id: 'content', label: 'Content', icon: Layers },
          { id: 'media', label: 'Media Assets', icon: ImageIcon },
          { id: 'seo', label: 'SEO & Search', icon: Globe },
          { id: 'visibility', label: 'Visibility & Access', icon: Eye },
          { id: 'publish', label: 'Publish Settings', icon: Clock },
          { id: 'preview', label: 'Live Preview', icon: Monitor }
        ].filter(tab => !hiddenTabs.includes(tab.id)).map(tab => {
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

      {/* TAB CONTENT PANELS */}

      {/* 1. OVERVIEW TAB */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">Page Health</span>
              <p className="text-xl font-serif font-bold text-emerald-400">100% Operational</p>
              <p className="text-xs text-zinc-400 mt-1">All CMS bindings & routes synced.</p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">Last Published</span>
              <p className="text-xl font-serif font-bold text-white">
                {pageState.versionHistory[0]?.date || 'Today'}
              </p>
              <p className="text-xs text-zinc-400 mt-1">By {pageState.versionHistory[0]?.author || 'Super Admin'}</p>
            </div>

            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-5 backdrop-blur-xl">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-1">Sections Count</span>
              <p className="text-xl font-serif font-bold text-luxury-gold">{sectionsRoadmap.length} Sections</p>
              <p className="text-xs text-zinc-400 mt-1">Architecture container ready for Phase 2.</p>
            </div>
          </div>

          {/* Section Architecture Roadmap */}
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Section Architecture Roadmap</span>
              <span className="text-xs font-mono text-zinc-500 font-normal">Drag & Drop Ready</span>
            </h3>

            <div className="space-y-2">
              {sectionsRoadmap.map((sec, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800/60 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 flex items-center justify-center font-mono text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-zinc-200">{sec.title}</span>
                    <span className="text-[10px] font-mono text-zinc-500">({sec.key})</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                    Active Section
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CONTENT TAB */}
      {activeTab === 'content' && (
        <div className="space-y-6">
          {children || (
            <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-8 backdrop-blur-xl text-center space-y-3">
              <Sparkles className="w-8 h-8 text-luxury-gold mx-auto" />
              <h3 className="text-base font-serif font-bold text-white uppercase tracking-wider">CMS Section Container Ready</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto font-light">
                Page architecture is fully initialized. Section-by-section fields will be added in Phase 2 as per instruction.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. MEDIA TAB */}
      {activeTab === 'media' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Page Media Attachments</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-mono uppercase text-zinc-400 block mb-1">Page Featured / Hero Banner Image</label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={pageState.seo.ogImage}
                  onChange={(e) => setPageState({ ...pageState, seo: { ...pageState.seo, ogImage: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-zinc-200 font-mono"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => openMediaManager({ onSelect: (url) => setPageState({ ...pageState, seo: { ...pageState.seo, ogImage: url } }) })}
                >
                  Media Picker
                </Button>
              </div>
            </div>

            {pageState.seo.ogImage && (
              <div className="aspect-video w-64 bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                <img src={pageState.seo.ogImage} alt="Page Asset" className="w-full h-full object-cover" />
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. SEO TAB */}
      {activeTab === 'seo' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Page SEO Metadata</h3>
          
          <div className="space-y-4 text-xs">
            <div>
              <label className="text-zinc-400 font-mono uppercase block mb-1">Meta Title</label>
              <input
                type="text"
                value={pageState.seo.metaTitle}
                onChange={(e) => setPageState({ ...pageState, seo: { ...pageState.seo, metaTitle: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase block mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={pageState.seo.metaDescription}
                onChange={(e) => setPageState({ ...pageState, seo: { ...pageState.seo, metaDescription: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>

            <div>
              <label className="text-zinc-400 font-mono uppercase block mb-1">Canonical URL</label>
              <input
                type="text"
                value={pageState.seo.canonicalUrl}
                onChange={(e) => setPageState({ ...pageState, seo: { ...pageState.seo, canonicalUrl: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. VISIBILITY TAB */}
      {activeTab === 'visibility' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Device & Access Visibility</h3>

          <div className="grid grid-cols-3 gap-4">
            {[
              { key: 'desktop', label: 'Desktop (1024px+)', icon: Monitor },
              { key: 'tablet', label: 'Tablet (768px+)', icon: Tablet },
              { key: 'mobile', label: 'Mobile (375px+)', icon: Smartphone }
            ].map(dev => {
              const IconComp = dev.icon;
              return (
                <div key={dev.key} className="bg-zinc-900/60 border border-zinc-800 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-zinc-200">
                    <IconComp className="w-4 h-4 text-luxury-gold" />
                    <span>{dev.label}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={pageState.visibility[dev.key]}
                    onChange={(e) => setPageState({
                      ...pageState,
                      visibility: { ...pageState.visibility, [dev.key]: e.target.checked }
                    })}
                    className="rounded border-zinc-800 text-luxury-gold"
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 6. PUBLISH SETTINGS TAB */}
      {activeTab === 'publish' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Version History & Revert</h3>

          <div className="space-y-2 text-xs">
            {pageState.versionHistory.map((ver, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-zinc-900/60 border border-zinc-800 font-mono">
                <div>
                  <span className="font-bold text-luxury-gold">{ver.version}</span>
                  <span className="text-zinc-500 ml-3">{ver.date}</span>
                </div>
                <span className="text-zinc-400">{ver.author}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. LIVE PREVIEW TAB */}
      {activeTab === 'preview' && (
        <div className="space-y-4">
          {/* Responsive Width Controls */}
          <div className="flex items-center justify-center gap-3 bg-zinc-950/80 border border-zinc-800 p-2 rounded-xl">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'desktop' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop (1440px)
            </button>
            <button
              onClick={() => setPreviewMode('tablet')}
              className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'tablet' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet (768px)
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={`px-3 py-1 rounded text-xs flex items-center gap-1.5 ${previewMode === 'mobile' ? 'bg-luxury-gold text-black font-bold' : 'text-zinc-400'}`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile (375px)
            </button>
          </div>

          <div className="flex justify-center bg-black/90 p-4 rounded-2xl border border-zinc-800 min-h-[500px]">
            <div className={`bg-black transition-all duration-300 border border-zinc-800 rounded-xl overflow-hidden ${
              previewMode === 'desktop' ? 'w-full' : previewMode === 'tablet' ? 'w-[768px]' : 'w-[375px]'
            }`}>
              <iframe
                src={`http://localhost:5173${pageSlug}`}
                title="Live Preview"
                className="w-full h-[600px] border-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
