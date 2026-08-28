import React from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { TiltCard } from '../../components/ui/TiltCard';
import { Button } from '../../components/ui/Button';
import { 
  Users, Handshake, MessageSquare, Briefcase, Plus, Globe, 
  Settings, Sparkles, Activity, FileText, Layers, Calendar, 
  Award, HelpCircle, FileSpreadsheet
} from 'lucide-react';

const defaultPagesCount = 20;

export const Dashboard = ({ setCurrentView }) => {
  const { db } = useDatabase();

  // Dynamic calculations from real DB collections
  const collaborationCount = db?.collaborations?.length || db?.brandPartners?.length || 0;
  const enquiriesList = db?.enquiries || db?.contactEnquiries || [];
  const pendingEnquiriesCount = enquiriesList.filter(e => e.status === 'Unread' || e.status === 'New').length;
  const portfolioCount = db?.portfolio?.length || 0;
  const pagesCount = db?.pagesList?.length || defaultPagesCount;

  const summaryCards = [
    { title: "Managed Pages", value: pagesCount, icon: FileText, color: "from-amber-500/10 to-amber-500/20", label: "Active website views", viewKey: "pages" },
    { title: "Blogs Published", value: (db?.blogs || []).length, icon: FileText, color: "from-emerald-500/10 to-emerald-500/20", label: "Creator journal posts", viewKey: "blogs" },
    { title: "Showcase Projects", value: portfolioCount, icon: Briefcase, color: "from-pink-500/10 to-pink-500/20", label: "Curated work items", viewKey: "portfolio" },
    { title: "Client Enquiries", value: enquiriesList.length, icon: MessageSquare, color: "from-rose-500/10 to-rose-500/20", label: "Total contact submissions", viewKey: "contacts" },
    { title: "Career Resumes", value: (db?.resumes || []).length, icon: FileSpreadsheet, color: "from-cyan-500/10 to-cyan-500/20", label: "Applications received", viewKey: "careers" }
  ];

  // Dynamic Activities Logs generated from real DB collections
  const dynamicActivities = [];

  if (Array.isArray(db?.blogs) && db.blogs.length > 0) {
    db.blogs.slice(0, 2).forEach((blog, idx) => {
      dynamicActivities.push({
        id: `blog-${blog.id || idx}`,
        text: `Blog published: '${blog.title || "Untitled"}' in category '${blog.category || "General"}'.`,
        type: "blog",
        time: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Recently"
      });
    });
  }

  if (Array.isArray(enquiriesList) && enquiriesList.length > 0) {
    enquiriesList.slice(0, 2).forEach((enq, idx) => {
      dynamicActivities.push({
        id: `enq-${enq.id || idx}`,
        text: `Enquiry submission received from ${enq.name || enq.email || enq.candidateName || "Client"} (${enq.category || "Business"}).`,
        type: "enquiry",
        time: enq.createdAt ? new Date(enq.createdAt).toLocaleDateString() : "Recently"
      });
    });
  }

  if (Array.isArray(db?.resumes) && db.resumes.length > 0) {
    db.resumes.slice(0, 2).forEach((res, idx) => {
      dynamicActivities.push({
        id: `resume-${res.id || idx}`,
        text: `Resume submission received from ${res.candidateName || "Applicant"} for job applied '${res.jobApplied || "Editor"}'.`,
        type: "career",
        time: res.createdAt ? new Date(res.createdAt).toLocaleDateString() : "Recently"
      });
    });
  }

  // Fallback logs if DB is empty
  const activities = dynamicActivities.length > 0 
    ? dynamicActivities.sort((a, b) => b.id.localeCompare(a.id)).slice(0, 6)
    : [
        { id: 1, text: "Welcome to TechMaster Website Management System.", type: "system", time: "Just now" }
      ];

  return (
    <div className="flex flex-col gap-8 text-left">
      {/* Dynamic Welcome Banner Area */}
      <div className="relative overflow-hidden rounded-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-zinc-800/80 bg-gradient-to-r from-zinc-950 to-zinc-900/40 backdrop-blur-md shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-luxury-gold/5 to-transparent pointer-events-none blur-xl" />
        <div className="z-10">
          <h1 className="font-serif text-2xl md:text-3xl font-medium tracking-wide gold-text-gradient flex items-center gap-2">
            Website Overview & Analytics
            <Sparkles className="w-5 h-5 text-luxury-gold hidden sm:inline-block animate-pulse" />
          </h1>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Live counts and database summary metrics from your website configuration. Click any module card to edit.
          </p>
        </div>
        <div className="flex items-center gap-3 z-10 flex-wrap">
          <Button variant="secondary" size="sm" onClick={() => setCurrentView('contacts')} className="gap-2 border border-zinc-800 hover:border-zinc-700">
            <MessageSquare className="w-4 h-4" />
            <span>Enquiries ({pendingEnquiriesCount})</span>
          </Button>
          <Button variant="primary" size="sm" onClick={() => setCurrentView('blogs')} className="gap-2">
            <Plus className="w-4 h-4 text-white stroke-[3]" />
            <span className="text-white font-semibold">Write Blog</span>
          </Button>
        </div>
      </div>

      {/* Dynamic Website Module Analytics Grid */}
      <div>
        <h2 className="text-sm font-serif font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <Layers className="w-4 h-4 text-luxury-gold" />
          <span>Website Summary Matrix</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {summaryCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <TiltCard 
                key={i} 
                onClick={() => setCurrentView(card.viewKey)}
                className="relative overflow-hidden group border border-zinc-800/60 bg-zinc-950/40 p-4 rounded-lg cursor-pointer hover:border-luxury-gold/40 transition-all duration-300 shadow-md hover:shadow-gold-glow/5"
                maxTilt={6}
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none">{card.title}</span>
                    <span className="font-serif text-3xl font-medium text-zinc-100 mt-2">{card.value}</span>
                  </div>
                  <div className={`p-2 rounded-md bg-gradient-to-br ${card.color} border border-zinc-800/80 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-4 h-4 text-luxury-gold" />
                  </div>
                </div>
                <p className="text-[10px] text-zinc-500 mt-3 group-hover:text-zinc-400 transition-colors">{card.label}</p>
              </TiltCard>
            );
          })}
        </div>
      </div>

      {/* Quick Ops & Active Logging Timeline Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Dynamic Control Operation Matrix Links */}
        <Card className="border border-zinc-800/60 bg-zinc-950/20" title="Quick Operations" subtitle="Shortcuts to frequent tasks">
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button 
              onClick={() => setCurrentView('portfolio')}
              className="p-4 rounded-md border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-luxury-gold/30 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
              <Briefcase className="w-5 h-5 text-zinc-400 group-hover:text-luxury-gold transition-colors" />
              <span className="text-xs text-zinc-300 font-medium">Portfolio</span>
            </button>
            <button 
              onClick={() => setCurrentView('blogs')}
              className="p-4 rounded-md border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-luxury-gold/30 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
              <FileText className="w-5 h-5 text-zinc-400 group-hover:text-luxury-gold transition-colors" />
              <span className="text-xs text-zinc-300 font-medium">Blogs</span>
            </button>
            <button 
              onClick={() => setCurrentView('contacts')}
              className="p-4 rounded-md border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-luxury-gold/30 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
              <MessageSquare className="w-5 h-5 text-zinc-400 group-hover:text-luxury-gold transition-colors" />
              <span className="text-xs text-zinc-300 font-medium">Contacts</span>
            </button>
            <button 
              onClick={() => setCurrentView('settings')}
              className="p-4 rounded-md border border-zinc-900 bg-zinc-950/40 hover:bg-zinc-900/30 hover:border-luxury-gold/30 transition-all duration-300 flex flex-col items-center justify-center gap-2 cursor-pointer group"
            >
              <Settings className="w-5 h-5 text-zinc-400 group-hover:text-luxury-gold transition-colors" />
              <span className="text-xs text-zinc-300 font-medium">Settings</span>
            </button>
          </div>
        </Card>

        {/* Dynamic Activity Tracker Layout Logs */}
        <Card className="lg:col-span-2 border border-zinc-800/60 bg-zinc-950/20" title="Recent Management Logs" subtitle="Audit timeline of operations in this panel">
          <div className="flex flex-col gap-4 mt-4">
            {activities.map((act) => (
              <div key={act.id} className="flex gap-4 items-start border-l border-zinc-800 pl-4 relative pb-2 transition-all hover:translate-x-0.5">
                <span className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.6)]" />
                <div className="flex-1 text-left">
                  <p className="text-xs text-zinc-300 font-medium leading-relaxed">{act.text}</p>
                  <span className="text-[9px] text-zinc-500 font-mono block mt-1 uppercase tracking-wider">{act.time}</span>
                </div>
                <Badge variant={act.type === 'campaign' ? 'gold' : act.type === 'career' ? 'info' : 'default'} className="text-[10px] tracking-wide scale-95 uppercase">
                  {act.type}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};