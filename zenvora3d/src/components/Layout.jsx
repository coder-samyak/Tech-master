import React, { useState } from 'react';
import { useDatabase } from '../context/DatabaseContext';
import { motion, AnimatePresence } from 'framer-motion';
import logoImage from '../assets/logo_transparent-removebg-preview.png';
import {
  LayoutDashboard, Home, User, History, Target, Briefcase, 
  Handshake, Megaphone, Calendar, FolderHeart, Newspaper, 
  Award, FileSpreadsheet, FileText, MessageSquare, Globe, 
  Users, Settings, Menu, LogOut, Bell, X, ChevronDown, 
  ChevronRight, ShieldAlert, Layers, ExternalLink, PhoneCall, Scale,
  FolderKanban, Navigation, Mail, ShieldCheck, BarChart3, Rocket, HelpCircle, Film
} from 'lucide-react';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import { Floating3DShapes } from './ui/Floating3DShapes';

export const Layout = ({ children, currentView, setCurrentView }) => {
  const { auth, logout, notifications } = useDatabase();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Accordion state for Website Management
  const [isWebsiteMgmtExpanded, setIsWebsiteMgmtExpanded] = useState(true);

  const websitePages = [
    { id: 'homepage', label: 'Homepage', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'founder-journey', label: 'Founder Journey', icon: History },
    { id: 'mission-vision', label: 'Mission & Vision', icon: Target },
    { id: 'portfolio', label: 'Our Work / Portfolio', icon: FolderHeart },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'careers', label: 'Careers', icon: FileSpreadsheet },
    { id: 'contact', label: 'Contact', icon: PhoneCall },
    { id: 'privacy-policy', label: 'Privacy Policy', icon: Scale },
    { id: 'terms-conditions', label: 'Terms & Conditions', icon: Scale },
    { id: 'footer', label: 'Footer', icon: Layers }
  ];

  const mainMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { 
      id: 'website-management', 
      label: 'Website Management', 
      icon: FolderKanban, 
      hasDropdown: true, 
      subItems: websitePages 
    },
    { id: 'navigation-manager', label: 'Navigation Manager', icon: Navigation },
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'contacts', label: 'Contacts', icon: PhoneCall },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles-permissions', label: 'Roles & Permissions', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const isPageInWebsiteMgmt = websitePages.some(p => p.id === currentView);

  return (
    <div className="h-screen bg-luxury-bg text-zinc-100 flex relative overflow-hidden luxury-grid text-left">
      <Floating3DShapes />
      
      {/* Background Radiants */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] luxury-radial pointer-events-none z-0" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] luxury-radial pointer-events-none z-0" />

      {/* DESKTOP SIDEBAR */}
      <aside className={`hidden md:flex flex-col border-r border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl h-screen sticky top-0 transition-all duration-300 z-20 ${isSidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="h-28 flex items-center justify-between px-5 border-b border-zinc-800/80 flex-shrink-0">
          {!isSidebarCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 w-full justify-center">
              <img src={logoImage} alt="TechMaster Logo" className="h-20 w-auto object-contain drop-shadow-[0_0_6px_rgba(250,204,21,0.3)]" />
            </motion.div>
          )}
          {isSidebarCollapsed && (
            <div className="w-12 flex items-center justify-center mx-auto">
              <img src={logoImage} alt="TechMaster Logo" className="h-12 w-auto object-contain drop-shadow-[0_0_4px_rgba(250,204,21,0.3)]" />
            </div>
          )}
          <button onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)} className="text-zinc-500 hover:text-white transition-colors cursor-pointer">
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 scrollbar-thin">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;

            if (item.hasDropdown) {
              return (
                <div key={item.id} className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      if (isSidebarCollapsed) setIsSidebarCollapsed(false);
                      setIsWebsiteMgmtExpanded(!isWebsiteMgmtExpanded);
                    }}
                    className={`w-full flex items-center rounded-md transition-all duration-300 py-2.5 px-3 text-xs uppercase font-mono tracking-wider cursor-pointer border justify-between ${
                      isPageInWebsiteMgmt
                        ? 'bg-luxury-gold/5 text-luxury-gold border-luxury-gold/20 font-semibold'
                        : 'text-zinc-400 border-transparent hover:text-zinc-100 hover:bg-zinc-900/40'
                    }`}
                    title={item.label}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isPageInWebsiteMgmt ? 'text-luxury-gold' : ''}`} />
                      {!isSidebarCollapsed && <span>{item.label}</span>}
                    </div>
                    {!isSidebarCollapsed && (
                      isWebsiteMgmtExpanded ? <ChevronDown className="w-3.5 h-3.5 opacity-60" /> : <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                    )}
                  </button>

                  {/* Dropdown Items */}
                  {isWebsiteMgmtExpanded && !isSidebarCollapsed && (
                    <div className="pl-6 pr-1 py-1 flex flex-col gap-0.5 border-l border-zinc-800/60 ml-4 mt-0.5">
                      {item.subItems.map((sub) => {
                        const SubIcon = sub.icon;
                        const isSubActive = currentView === sub.id;
                        return (
                          <button
                            type="button"
                            key={sub.id}
                            onClick={() => setCurrentView(sub.id)}
                            className={`w-full flex items-center gap-2.5 text-left py-1.5 px-2.5 text-xs rounded transition-all cursor-pointer ${
                              isSubActive 
                                ? 'text-luxury-gold font-medium bg-luxury-gold/10 border border-luxury-gold/20' 
                                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
                            }`}
                          >
                            <SubIcon className={`w-3.5 h-3.5 ${isSubActive ? 'text-luxury-gold' : 'text-zinc-500'}`} />
                            <span>{sub.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            const isActive = currentView === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center rounded-md transition-all duration-300 py-2.5 px-3 text-xs uppercase font-mono tracking-wider cursor-pointer border ${
                  isActive 
                    ? 'bg-luxury-gold/10 text-luxury-gold border-luxury-gold/30 shadow-[0_0_15px_rgba(212,175,55,0.05)] font-semibold' 
                    : 'text-zinc-400 border-transparent hover:text-zinc-100 hover:bg-zinc-900/40'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-luxury-gold' : ''}`} />
                  {!isSidebarCollapsed && <span>{item.label}</span>}
                </div>
              </button>
            );
          })}
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded bg-gradient-to-r from-luxury-gold to-amber-500 flex items-center justify-center text-black font-serif font-black text-xs">TM</div>
          <span className="font-serif font-bold text-[10px] tracking-wider text-zinc-100">TECHMASTER <span className="text-luxury-gold font-sans font-medium text-[9px]">CMS</span></span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setIsNotificationsOpen(true)} className="relative p-2 text-zinc-400"><Bell className="w-5 h-5" /></button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-zinc-400"><Menu className="w-5 h-5" /></button>
        </div>
      </div>

      {/* MAIN CONTAINER PANEL */}
      <div className="flex-1 flex flex-col h-screen pt-16 md:pt-0 z-10 w-full overflow-hidden">
        {/* DESKTOP HEADER BAR */}
        <header className="hidden md:flex h-20 items-center justify-between px-8 border-b border-zinc-800/80 bg-zinc-950/40 backdrop-blur-md sticky top-0 z-20 flex-shrink-0">
          <h2 className="text-sm font-semibold text-zinc-100 uppercase tracking-widest font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <span>
              {websitePages.find(p => p.id === currentView)?.label || 
               mainMenuItems.find(i => i.id === currentView)?.label || 
               "Dashboard"}
            </span>
          </h2>
          <div className="flex items-center gap-5">
            <button onClick={() => setIsNotificationsOpen(true)} className="relative p-2 text-zinc-400 hover:text-white cursor-pointer">
              <Bell className="w-5 h-5" />
            </button>
            <div 
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-3 pl-4 border-l border-zinc-800/80 cursor-pointer hover:opacity-85 transition-opacity"
              title="View & Edit Profile"
            >
              <div className="text-right">
                <span className="text-xs font-semibold text-zinc-300 block">{auth?.user?.name || 'TechMaster'}</span>
                <span className="text-[10px] text-zinc-500 font-mono flex items-center justify-end gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> ONLINE</span>
              </div>
              <img src={auth?.user?.imageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150"} alt="" className="w-10 h-10 rounded-full border border-zinc-800 object-cover" />
            </div>
            <button 
              onClick={logout} 
              className="p-2 text-zinc-500 hover:text-rose-400 hover:bg-rose-500/5 border border-zinc-900 rounded transition-all cursor-pointer"
              title="Logout Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* MAIN BODY LAYOUT VIEW */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto flex flex-col justify-between" style={{ perspective: 1000 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, rotateX: 2, y: 5 }}
              animate={{ opacity: 1, rotateX: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: -2, y: -5 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex-grow"
            >
              {children}
            </motion.div>
          </AnimatePresence>

          {/* GLOBAL FOOTER */}
          <footer className="w-full mt-12 border-t border-zinc-900 bg-zinc-950/20 rounded-lg p-6 flex items-center justify-between text-xs text-zinc-500 font-mono flex-shrink-0">
            <div>
              <span>TechMaster Enterprise CMS v2.0</span>
            </div>
            <div>
              <span>Designed for High-Scale Website Management</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};