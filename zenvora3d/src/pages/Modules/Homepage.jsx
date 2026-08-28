import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../context/DatabaseContext';
import { useMediaManager } from '../../context/MediaContext';
import { 
  Home as HomeIcon, Check, Save, Plus, Trash2, Edit3, Eye, EyeOff, 
  ArrowUp, ArrowDown, Sparkles, Image as ImageIcon, Video, Link as LinkIcon, 
  Layers, Sliders, Play, ShieldCheck, Globe, Move, Search, RefreshCw, X, RotateCcw, AlertTriangle, UploadCloud
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Toast } from '../../components/ui/Toast';

const defaultCircleAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

const lenskartLogoB64 = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 90" width="320" height="90"><g fill="none" stroke="black" stroke-width="7"><circle cx="35" cy="45" r="20"/><circle cx="75" cy="45" r="20"/></g><text x="110" y="56" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="42" fill="black">lenskart</text></svg>')}`;

const ultravioletteLogoB64 = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" width="540" height="100"><polygon points="30,25 80,25 55,75" fill="none" stroke="black" stroke-width="10" stroke-linejoin="round"/><text x="110" y="62" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="38" fill="black" letter-spacing="7">ULTRAVIOLETTE</text></svg>')}`;

const createTextLogoB64 = (text) => `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 90" width="340" height="90"><text x="170" y="55" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="32" fill="black" text-anchor="middle" letter-spacing="3">${text}</text></svg>`)}`;

const getBrandDefaultLogo = (brandName, customUrl) => {
  if (customUrl && customUrl.trim()) return customUrl.trim();
  const name = (brandName || '').toLowerCase().trim();
  const cleanAlpha = name.replace(/[^a-z0-9]/g, "");

  const mahindraSvgStr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 360" width="500" height="360"><g fill="white"><path d="M 30,10 L 235,240 L 165,350 L 125,350 Z" /><path d="M 30,10 L 165,350 L 235,240 Z" fill="#E2E8F0" /><path d="M 470,10 L 265,240 L 335,350 L 375,350 Z" /><path d="M 470,10 L 335,350 L 265,240 Z" fill="#CBD5E1" /></g></svg>';
  const mahindraLogoB64 = `data:image/svg+xml;base64,${btoa(mahindraSvgStr)}`;

  const cdnMap = {
    amazon: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/amazon.svg",
    asus: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/asus.svg",
    dell: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/dell.svg",
    flipkart: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/flipkart.svg",
    huawei: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/huawei.svg",
    iqoo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/iqoo.svg",
    fireboltt: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fireboltt.svg",
    firebolt: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/fireboltt.svg",
    mahindra: mahindraLogoB64,
    xiaomi: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/xiaomi.svg",
    mi: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/xiaomi.svg",
    motorola: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/motorola.svg",
    oneplus: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oneplus.svg",
    oppo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/oppo.svg",
    googlepixel: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    google: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    pixel: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/google.svg",
    poco: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/poco.svg",
    realme: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/realme.svg",
    samsung: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/samsung.svg",
    vivo: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/vivo.svg",
    sony: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/sony.svg",
    nothing: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/nothing.svg",
    tesla: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tesla.svg",
    tata: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/tata.svg",
    hyundai: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/hyundai.svg",
    kia: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/kia.svg",
    blinkit: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/blinkit.svg",
    lenskart: lenskartLogoB64,
    ultraviolette: ultravioletteLogoB64,
    thesleepcompany: createTextLogoB64("THE SLEEP CO"),
    sleepcompany: createTextLogoB64("THE SLEEP CO"),
    fireboltt: createTextLogoB64("FIRE-BOLTT"),
    fireboltt: createTextLogoB64("FIRE-BOLTT"),
    noise: createTextLogoB64("NOISE"),
    boat: createTextLogoB64("boAt"),
    cashify: createTextLogoB64("CASHIFY")
  };

  if (cdnMap[cleanAlpha]) return cdnMap[cleanAlpha];
  return createTextLogoB64((brandName || 'BRAND').toUpperCase());
};

export const Homepage = () => {
  const { db, updateSection, apiFetch } = useDatabase();
  const { openMediaManager } = useMediaManager();
  const [activeSection, setActiveSection] = useState('sec-1');
  const [toast, setToast] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State for Item CRUD (Create / Edit)
  const [modalConfig, setModalConfig] = useState(null); // { type: 'channel'|'val'|'stat'|'short'|'long'|'brand'|'nav', item: {}, index: null }
  const [deleteConfirmItem, setDeleteConfirmItem] = useState(null); // { type, id, title }
  const [isUploading, setIsUploading] = useState(false);

  // Production default values matching the website 100%
  const defaultHomepageCMS = {
    // SECTION 1: Navbar
    navbar: {
      logoUrl: '',
      buttonText: 'Get In Touch',
      buttonLink: '/contact',
      viewsText: '1B+ Views',
      sticky: true,
      visible: true,
      navItems: [
        { id: 'n-1', label: 'Home', url: '/', order: 1, visible: true, deleted: false },
        { id: 'n-2', label: 'About', url: '/about', order: 2, visible: true, deleted: false },
        { id: 'n-3', label: 'Journey', url: '/journey', order: 3, visible: true, deleted: false },
        { id: 'n-4', label: 'What We Do', url: '/what-we-do', order: 4, visible: true, deleted: false },
        { id: 'n-5', label: 'Services', url: '/services', order: 5, visible: true, deleted: false },
        { id: 'n-6', label: 'Portfolio', url: '/portfolio', order: 6, visible: true, deleted: false },
        { id: 'n-7', label: 'Contact', url: '/contact', order: 7, visible: true, deleted: false }
      ]
    },

    // SECTION 2: Hero Section
    hero: {
      badge: 'TECH MASTER',
      topBadgeText: "India's most-watched media production house",
      mainHeading: 'TECH MASTER',
      highlightedWord: 'MASTER',
      tagline: '"Nothing We Make Is Forgettable. Unskippable. Unforgettable."',
      subTagline: 'Attention and Influence — At Scale',
      primaryCtaText: 'Scroll down',
      primaryCtaLink: '#intro',
      bgMediaUrl: '',
      illustrationUrl: '',
      visible: true
    },

    // SECTION 3: Introduction & Vision
    introVision: {
      introBadge: 'INTRO',
      introHeading: 'Building High-Scale Media Channels',
      introDescription: 'Tech Master Digital Pvt Ltd builds and runs a portfolio of high-scale content channels across tech, automobiles, and entertainment. We take complex subjects and make them impossible to scroll past. Combining editorial rigor with production value that stands out.',
      visionBadge: 'THE VISION',
      visionHeading: 'Complexity Made Simple & Unforgettable',
      visionDescription: 'Tech Master exists to make complexity feel simple, and simplicity feel unforgettable. We tell stories that inform without lecturing, entertain without diluting, and connect without pretending. The result: content built to travel across platforms, across formats, across the world.',
      visible: true
    },

    // SECTION 4: Founder Spotlight
    founder: {
      badge: 'ABOUT THE CEO',
      name: 'Arvind Kharra',
      highlightedName: 'aka Tech Master',
      description: "An engineering graduate from Rajasthan who turned his passion for technology into world's #1 tech YouTube channel. No corporate job, no conventional path. Just a small-town outsider who made technology feel human, fun, and relatable to millions.",
      imageUrl: '',
      bgUrl: '',
      visible: true
    },

    // SECTION 5: Official Channels Ticker
    channelsTicker: {
      heading: 'Different audiences.',
      highlightedHeading: 'Same Obsession.',
      subHeading: "Four channels today. A Media Empire in Motion.",
      visible: true,
      channels: [
        { id: 'ch-1', name: 'Tech Master', circleImage: '', ytSubs: '33M Subs on YT', igFollowers: '5.8M Followers on IG', popular: '195M (Short)', logoUrl: '', order: 1, visible: true, deleted: false },
        { id: 'ch-2', name: 'Next Univerz', circleImage: '', ytSubs: '5.5M Subs on YT', igFollowers: '', popular: '88M (Shorts)', logoUrl: '', order: 2, visible: true, deleted: false },
        { id: 'ch-3', name: 'Master Wheels', circleImage: '', ytSubs: '4.6M Subs on YT', igFollowers: '1.2M Followers on IG', popular: '148M (Short)', logoUrl: '', order: 3, visible: true, deleted: false },
        { id: 'ch-4', name: 'Full Circle', circleImage: '', ytSubs: '300K Subs on YT', igFollowers: '', popular: '2M (Short)', logoUrl: '', order: 4, visible: true, deleted: false },
        { id: 'ch-5', name: 'Trendz Talk', circleImage: '', ytSubs: '', igFollowers: '15K Followers on IG', popular: '4.8M (Reel)', logoUrl: '', order: 5, visible: true, deleted: false }
      ]
    },

    // SECTION 6: Core Values (How We Move)
    coreValues: {
      badge: 'HOW WE MOVE',
      heading: 'Core Values',
      visible: true,
      cards: [
        { id: 'cv-1', title: 'Fearless Energy', description: 'Pushing creative boundaries with unyielding momentum and passion.', icon: 'Zap', order: 1, visible: true, deleted: false },
        { id: 'cv-2', title: 'Creative Storytelling', description: 'Crafting narratives that resonate, inform, and inspire millions.', icon: 'Sparkles', order: 2, visible: true, deleted: false },
        { id: 'cv-3', title: 'Community First', description: 'Building genuine connections and putting our audience at the heart of everything we create.', icon: 'Users', order: 3, visible: true, deleted: false }
      ]
    },

    // SECTION 7: Statistics
    statistics: {
      badge: 'GLOBAL REACH & STATISTICS',
      heading: 'Influence & Impact',
      visible: true,
      counters: [
        { id: 'st-1', value: '50M+', label: 'Community', icon: 'Users', order: 1, visible: true, deleted: false },
        { id: 'st-2', value: '1B+', label: 'Monthly Views', font: 'mono', order: 2, visible: true, deleted: false },
        { id: 'st-3', value: '2500+', label: 'Videos Published', icon: 'Video', order: 3, visible: true, deleted: false },
        { id: 'st-4', value: '500K+', label: 'FB Followers', icon: 'Share2', order: 4, visible: true, deleted: false },
        { id: 'st-5', value: '25B+', label: 'Lifetime Views on YT', icon: 'Youtube', order: 5, visible: true, deleted: false },
        { id: 'st-6', value: '50+', label: 'Global Brand Collaborations', icon: 'Award', order: 6, visible: true, deleted: false }
      ]
    },

    // SECTION 8: Featured Shorts & Reels
    shortsReels: {
      badge: 'OUR WORK',
      heading: 'Craft In Motion',
      visible: true,
      list: [
        { id: 'sr-1', title: 'Tech Master Viral Short', url: 'https://youtube.com/shorts/YP4CdON5rrQ?si=DOx4bPZIJPpc2LSa', videoUrl: 'https://youtube.com/shorts/YP4CdON5rrQ?si=DOx4bPZIJPpc2LSa', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '5.4M views', category: 'Short', order: 1, visible: true, deleted: false },
        { id: 'sr-2', title: 'Tech Master Official Video', url: 'https://www.youtube.com/watch?v=3VuyriEkDwg', videoUrl: 'https://www.youtube.com/watch?v=3VuyriEkDwg', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '3.8M views', category: 'Short', order: 2, visible: true, deleted: false },
        { id: 'sr-3', title: 'Tech Master Exclusive Showcase', url: 'https://youtu.be/vW2K0L-vUgw?si=4KrnU7BeuuZIlO97', videoUrl: 'https://youtu.be/vW2K0L-vUgw?si=4KrnU7BeuuZIlO97', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '4.2M views', category: 'Short', order: 3, visible: true, deleted: false },
        { id: 'sr-4', title: 'Tech Master Instagram Reel #1', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@techmasterco', handle: '@techmasterco', channelName: 'Tech Master', views: '1.8M views', category: 'Reel', order: 4, visible: true, deleted: false },
        { id: 'sr-5', title: 'Trendz Talk Pop Reel', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@trendztalk', handle: '@trendztalk', channelName: 'Trendz Talk', views: '2.4M views', category: 'Reel', order: 5, visible: true, deleted: false },
        { id: 'sr-6', title: 'Master Wheels High-Speed Breakdown', url: 'https://youtu.be/iVGAICmKlpk?si=cL_9koXbTowODWEx', videoUrl: 'https://youtu.be/iVGAICmKlpk?si=cL_9koXbTowODWEx', author: '@masterwheel1', handle: '@masterwheel1', channelName: 'Master Wheels', views: '3.2M views', category: 'Short', order: 6, visible: true, deleted: false },
        { id: 'sr-7', title: 'Next Univerz Masterclass', url: 'https://www.youtube.com/watch?v=oXr9B3Hg4fo', videoUrl: 'https://www.youtube.com/watch?v=oXr9B3Hg4fo', author: '@NextUniverz', handle: '@NextUniverz', channelName: 'Next Univerz', views: '2.7M views', category: 'Short', order: 7, visible: true, deleted: false },
        { id: 'sr-8', title: 'Full Circle Creator Story', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@fullcircle_in', handle: '@fullcircle_in', channelName: 'Full Circle', views: '950K views', category: 'Reel', order: 8, visible: true, deleted: false },
        { id: 'sr-9', title: 'Tech Master Hardware Teardown', url: 'https://www.youtube.com/watch?v=pGdwMZ_O_0A', videoUrl: 'https://www.youtube.com/watch?v=pGdwMZ_O_0A', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '8.4M views', category: 'Short', order: 9, visible: true, deleted: false },
        { id: 'sr-10', title: 'Pop Tech Short-Form Reel', url: 'https://youtube.com/shorts/gP7t0_5qMa4?si=1A54F_DsBGGlaPPF', videoUrl: 'https://youtube.com/shorts/gP7t0_5qMa4?si=1A54F_DsBGGlaPPF', author: '@trendztalk', handle: '@trendztalk', channelName: 'Trendz Talk', views: '9.1M views', category: 'Short', order: 10, visible: true, deleted: false },
        { id: 'sr-11', title: 'Automotive Tech Special', url: 'https://youtu.be/Wnid6auAxbE?si=mJKMPlZLMcCTLnuz', videoUrl: 'https://youtu.be/Wnid6auAxbE?si=mJKMPlZLMcCTLnuz', author: '@masterwheel1', handle: '@masterwheel1', channelName: 'Master Wheels', views: '4.1M views', category: 'Short', order: 11, visible: true, deleted: false },
        { id: 'sr-12', title: 'Developer Deep Dive', url: 'https://www.youtube.com/watch?v=uMW9UyONsOk', videoUrl: 'https://www.youtube.com/watch?v=uMW9UyONsOk', author: '@NextUniverz', handle: '@NextUniverz', channelName: 'Next Univerz', views: '2.2M views', category: 'Short', order: 12, visible: true, deleted: false },
        { id: 'sr-14', title: 'Viral Pop Culture Tech', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@trendztalk', handle: '@trendztalk', channelName: 'Trendz Talk', views: '3.1M views', category: 'Reel', order: 14, visible: true, deleted: false },
        { id: 'sr-15', title: 'Full Circle Podcast Highlight', url: 'https://youtu.be/iNtv0Yl1DB4?si=TTeocdaRSPQnL8_U', videoUrl: 'https://youtu.be/iNtv0Yl1DB4?si=TTeocdaRSPQnL8_U', author: '@fullcircle_in', handle: '@fullcircle_in', channelName: 'Full Circle', views: '1.9M views', category: 'Short', order: 15, visible: true, deleted: false },
        { id: 'sr-16', title: 'Tech Master Cinematic Reveal', url: 'https://www.youtube.com/watch?v=CaNEbx-Kwzc', videoUrl: 'https://www.youtube.com/watch?v=CaNEbx-Kwzc', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '4.4M views', category: 'Short', order: 16, visible: true, deleted: false },
        { id: 'sr-17', title: 'Future Gadget Breakdown', url: 'https://www.youtube.com/watch?v=ClgRNy0QBWk', videoUrl: 'https://www.youtube.com/watch?v=ClgRNy0QBWk', author: '@techmasterhq', handle: '@techmasterhq', channelName: 'Tech Master', views: '3.9M views', category: 'Short', order: 17, visible: true, deleted: false },
        { id: 'sr-18', title: 'Supercar Track Telemetry Test', url: 'https://www.youtube.com/watch?v=mAXjgBDK3Gs', videoUrl: 'https://www.youtube.com/watch?v=mAXjgBDK3Gs', author: '@masterwheel1', handle: '@masterwheel1', channelName: 'Master Wheels', views: '7.2M views', category: 'Short', order: 18, visible: true, deleted: false },
        { id: 'sr-19', title: 'Tech Master Instagram Special', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@techmasterco', handle: '@techmasterco', channelName: 'Tech Master', views: '2.8M views', category: 'Reel', order: 19, visible: true, deleted: false },
        { id: 'sr-20', title: 'Trendz Talk Pop Reel #2', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@trendztalk', handle: '@trendztalk', channelName: 'Trendz Talk', views: '1.7M views', category: 'Reel', order: 20, visible: true, deleted: false },
        { id: 'sr-21', title: 'Full Circle Studio Reel', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@fullcircle_in', handle: '@fullcircle_in', channelName: 'Full Circle', views: '890K views', category: 'Reel', order: 21, visible: true, deleted: false },
        { id: 'sr-22', title: 'Next Univerz Educational Reel', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@NextUniverz', handle: '@NextUniverz', channelName: 'Next Univerz', views: '1.4M views', category: 'Reel', order: 22, visible: true, deleted: false },
        { id: 'sr-23', title: 'Master Wheels Track Performance', url: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', videoUrl: 'https://res.cloudinary.com/qm3umdmz/video/upload/v1785840447/techmaster/reels/test_reel_dog.mp4', author: '@masterwheel1', handle: '@masterwheel1', channelName: 'Master Wheels', views: '4.5M views', category: 'Reel', order: 23, visible: true, deleted: false }
      ]
    },

    // SECTION 9: Featured Long Videos
    longVideos: {
      badge: 'FEATURED SHOWCASE',
      heading: 'Long Videos',
      visible: true,
      list: [
        { id: 'lv-1', title: 'Building Enterprise Infrastructure', youtubeUrl: 'https://www.youtube.com/watch?v=8H272rF60dc&t=86s', videoId: '8H272rF60dc', startTime: '0:20', endTime: '', views: '1.4M views', channelName: 'Tech Master', order: 1, visible: true, deleted: false },
        { id: 'lv-2', title: 'Advanced Next.js Architecture', youtubeUrl: 'https://www.youtube.com/watch?v=onV7l4H5EyM', videoId: 'onV7l4H5EyM', startTime: '5:41', endTime: '6:33', views: '890K views', channelName: 'Tech Master', order: 2, visible: true, deleted: false },
        { id: 'lv-3', title: 'Full-Stack System Design', youtubeUrl: 'https://www.youtube.com/watch?v=jbEzCIqhTV8&t=29s', videoId: 'jbEzCIqhTV8', startTime: '0:19', endTime: '0:39', views: '1.1M views', channelName: 'Tech Master', order: 3, visible: true, deleted: false },
        { id: 'lv-4', title: 'Mastering Cloud Native Systems', youtubeUrl: 'https://www.youtube.com/watch?v=4_n-ZnjIBVc&t=45s', videoId: '4_n-ZnjIBVc', startTime: '0:00', endTime: '', views: '2.3M views', channelName: 'Tech Master', order: 4, visible: true, deleted: false },
        { id: 'lv-5', title: 'Scalable Microservices Tutorial', youtubeUrl: 'https://www.youtube.com/watch?v=CvqxRkjvsxY&t=130s', videoId: 'CvqxRkjvsxY', startTime: '0:20', endTime: '', views: '950K views', channelName: 'Tech Master', order: 5, visible: true, deleted: false },
        { id: 'lv-6', title: 'High-Performance Web Applications', youtubeUrl: 'https://www.youtube.com/watch?v=udwDWFERyRw&t=185s', videoId: 'udwDWFERyRw', startTime: '0:20', endTime: '', views: '1.7M views', channelName: 'Tech Master', order: 6, visible: true, deleted: false },
        { id: 'lv-7', title: 'Master Wheels Technology Showcase', youtubeUrl: 'https://www.youtube.com/watch?v=_Db6aKavN1U&t=107s', videoId: '_Db6aKavN1U', startTime: '0:04', endTime: '', views: '3.1M views', channelName: 'Master Wheels', order: 7, visible: true, deleted: false },
        { id: 'lv-8', title: 'Automotive Engineering & Tech', youtubeUrl: 'https://www.youtube.com/watch?v=FSzP30YegeM&t=134s', videoId: 'FSzP30YegeM', startTime: '0:00', endTime: '', views: '2.8M views', channelName: 'Master Wheels', order: 8, visible: true, deleted: false },
        { id: 'lv-9', title: 'EV Hardware & Control Systems', youtubeUrl: 'https://www.youtube.com/watch?v=q-l_F3yQK88&t=69s', videoId: 'q-l_F3yQK88', startTime: '0:10', endTime: '', views: '1.9M views', channelName: 'Master Wheels', order: 9, visible: true, deleted: false }
      ]
    },

    // SECTION 10: Brand Collaborations
    brandCollaborations: {
      badge: 'BRAND COLLABORATIONS',
      heading: 'Trusted By Leading Technology Brands',
      description: 'Proud collaborations and partnerships with globally recognized technology brands that have helped shape our educational ecosystem.',
      visible: true,
      brands: [
        'Amazon', 'Asus', 'Dell', 'Flipkart', 'Huawei', 'IQOO', 'Fire-Boltt', 'Xiaomi',
        'Motorola', 'OnePlus', 'Oppo', 'Google Pixel', 'Poco', 'Realme', 'Samsung', 'Vivo',
        'boAt', 'Cashify', 'Sony', 'Nothing', 'Blinkit', 'Lenskart', 'The Sleep Company',
        'Noise', 'Mahindra', 'Tesla', 'Tata', 'Hyundai', 'Kia', 'Ultraviolette'
      ].map((name, idx) => ({ id: `b-${idx + 1}`, brandName: name, logoUrl: '', websiteUrl: '', order: idx + 1, visible: true, deleted: false }))
    },

    // SECTION 11: Newsletter & Contact Preview
    newsletterContact: {
      newsletterBadge: 'NEWSLETTER SUBSCRIPTION',
      newsletterHeading: 'Stay in the Loop',
      newsletterDescription: 'Join my newsletter for behind-the-scenes content and insights.',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      contactBadge: 'COLLABORATION INQUIRY',
      contactHeading: 'Ready to Collaborate?',
      contactCtaText: 'Get In Touch',
      visible: true
    }
  };

  const rawHomepage = db?.homepageCMS || db?.homepage || {};
  const cmsData = {
    ...defaultHomepageCMS,
    ...rawHomepage,
    navbar: {
      ...defaultHomepageCMS.navbar,
      ...(rawHomepage.navbar || {}),
      navItems: (rawHomepage.navbar?.navItems && rawHomepage.navbar.navItems.length > 0)
        ? rawHomepage.navbar.navItems
        : defaultHomepageCMS.navbar.navItems
    },
    hero: { ...defaultHomepageCMS.hero, ...(rawHomepage.hero || {}) },
    introVision: { ...defaultHomepageCMS.introVision, ...(rawHomepage.introVision || {}) },
    founder: { ...defaultHomepageCMS.founder, ...(rawHomepage.founder || {}) },
    channelsTicker: {
      ...defaultHomepageCMS.channelsTicker,
      ...(rawHomepage.channelsTicker || {}),
      channels: (rawHomepage.channelsTicker?.channels && rawHomepage.channelsTicker.channels.length > 0)
        ? rawHomepage.channelsTicker.channels
        : defaultHomepageCMS.channelsTicker.channels
    },
    coreValues: {
      ...defaultHomepageCMS.coreValues,
      ...(rawHomepage.coreValues || {}),
      cards: (rawHomepage.coreValues?.cards && rawHomepage.coreValues.cards.length > 0)
        ? rawHomepage.coreValues.cards
        : defaultHomepageCMS.coreValues.cards
    },
    statistics: {
      ...defaultHomepageCMS.statistics,
      ...(rawHomepage.statistics || {}),
      counters: (rawHomepage.statistics?.counters && rawHomepage.statistics.counters.length > 0)
        ? rawHomepage.statistics.counters
        : defaultHomepageCMS.statistics.counters
    },
    shortsReels: {
      ...defaultHomepageCMS.shortsReels,
      ...(rawHomepage.shortsReels || {}),
      list: (rawHomepage.shortsReels?.list && rawHomepage.shortsReels.list.length > 0)
        ? rawHomepage.shortsReels.list
        : defaultHomepageCMS.shortsReels.list
    },
    longVideos: {
      ...defaultHomepageCMS.longVideos,
      ...(rawHomepage.longVideos || {}),
      list: (rawHomepage.longVideos?.list && rawHomepage.longVideos.list.length > 0)
        ? rawHomepage.longVideos.list
        : defaultHomepageCMS.longVideos.list
    },
    brandCollaborations: {
      ...defaultHomepageCMS.brandCollaborations,
      ...(rawHomepage.brandCollaborations || {}),
      brands: (rawHomepage.brandCollaborations?.brands && rawHomepage.brandCollaborations.brands.length > 0)
        ? rawHomepage.brandCollaborations.brands
        : defaultHomepageCMS.brandCollaborations.brands
    },
    newsletterContact: { ...defaultHomepageCMS.newsletterContact, ...(rawHomepage.newsletterContact || {}) }
  };

  const [formData, setFormData] = useState(cmsData);

  const showToast = (msg, type = 'success') => setToast({ id: Date.now(), message: msg, type });

  const handleDirectFileUpload = async (file, onUploaded) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const savedAuth = localStorage.getItem('zenvora_auth');
      let token = "";
      if (savedAuth) {
        try {
          const parsed = JSON.parse(savedAuth);
          token = parsed.token || "";
        } catch (e) {}
      }
      const formDataUpload = new FormData();
      formDataUpload.append("file", file);

      const baseHost = (import.meta.env.VITE_API_URL || "https://techmasterbackend.onrender.com").replace(/\/api\/v1\/?$/i, "");
      const uploadPath = file.type.startsWith("video") ? "/api/upload/video" : "/api/upload/image";
      const response = await fetch(`${baseHost}${uploadPath}`, {
        method: "POST",
        headers: token ? { "Authorization": `Bearer ${token}` } : {},
        credentials: "include",
        body: formDataUpload
      });

      const data = await response.json();
      if (data.success && data.data?.cloudinaryUrl) {
        const uploadedUrl = data.data.cloudinaryUrl;
        onUploaded(uploadedUrl);

        // Store into Media Library immediately so it is available in Media Library tab!
        try {
          const isVideo = file.type.startsWith('video');
          const newMediaItem = {
            id: data.data._id || `media-${Date.now()}`,
            title: file.name.split('.')[0] || 'Uploaded Media',
            type: isVideo ? 'Video' : 'Image',
            category: 'General',
            url: uploadedUrl,
            imageUrl: !isVideo ? uploadedUrl : '',
            videoUrl: isVideo ? uploadedUrl : '',
            thumbnail: uploadedUrl,
            size: `${((data.data.fileSize || file.size) / (1024 * 1024)).toFixed(2)} MB`,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'Active',
            visibility: true
          };

          const currentLibrary = db?.mediaLibrary || [];
          const updatedLibrary = [newMediaItem, ...currentLibrary.filter(m => m.url !== uploadedUrl)];
          updateSection('mediaLibrary', updatedLibrary);
        } catch (mErr) {
          console.warn("Media Library sync warning:", mErr);
        }

        showToast('File uploaded successfully & saved to Media Library!', 'success');
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (err) {
      console.error("Direct upload error:", err);
      showToast('Upload failed: ' + (err.message || 'Error uploading file'), 'error');
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchLatestHomepage = async () => {
      try {
        if (apiFetch) {
          const res = await apiFetch('/homepage');
          if (res.success && res.data) {
            const data = res.data;
            setFormData(prev => ({
              ...defaultHomepageCMS,
              ...data,
              navbar: {
                ...defaultHomepageCMS.navbar,
                ...(data.navbar || {}),
                navItems: (data.navbar?.navItems && data.navbar.navItems.length > 0) ? data.navbar.navItems : (prev.navbar?.navItems || defaultHomepageCMS.navbar.navItems)
              },
              hero: { ...defaultHomepageCMS.hero, ...(data.hero || {}) },
              introVision: { ...defaultHomepageCMS.introVision, ...(data.introVision || {}) },
              founder: { ...defaultHomepageCMS.founder, ...(data.founder || {}) },
              channelsTicker: {
                ...defaultHomepageCMS.channelsTicker,
                ...(data.channelsTicker || {}),
                channels: (data.channelsTicker?.channels && data.channelsTicker.channels.length > 0) ? data.channelsTicker.channels : (prev.channelsTicker?.channels || defaultHomepageCMS.channelsTicker.channels)
              },
              coreValues: {
                ...defaultHomepageCMS.coreValues,
                ...(data.coreValues || {}),
                cards: (data.coreValues?.cards && data.coreValues.cards.length > 0) ? data.coreValues.cards : (prev.coreValues?.cards || defaultHomepageCMS.coreValues.cards)
              },
              statistics: {
                ...defaultHomepageCMS.statistics,
                ...(data.statistics || {}),
                counters: (data.statistics?.counters && data.statistics.counters.length > 0) ? data.statistics.counters : (prev.statistics?.counters || defaultHomepageCMS.statistics.counters)
              },
              shortsReels: {
                ...defaultHomepageCMS.shortsReels,
                ...(data.shortsReels || {}),
                list: (data.shortsReels?.list && data.shortsReels.list.length > 0) ? data.shortsReels.list : (prev.shortsReels?.list || defaultHomepageCMS.shortsReels.list)
              },
              longVideos: {
                ...defaultHomepageCMS.longVideos,
                ...(data.longVideos || {}),
                list: (data.longVideos?.list && data.longVideos.list.length > 0) ? data.longVideos.list : (prev.longVideos?.list || defaultHomepageCMS.longVideos.list)
              },
              brandCollaborations: {
                ...defaultHomepageCMS.brandCollaborations,
                ...(data.brandCollaborations || {}),
                brands: (data.brandCollaborations?.brands && data.brandCollaborations.brands.length > 0) ? data.brandCollaborations.brands : (prev.brandCollaborations?.brands || defaultHomepageCMS.brandCollaborations.brands)
              },
              newsletterContact: { ...defaultHomepageCMS.newsletterContact, ...(data.newsletterContact || {}) }
            }));
          }
        }
      } catch (err) {
        console.warn("Could not fetch latest homepage from backend:", err);
      }
    };
    fetchLatestHomepage();
  }, []);

  // Direct persistence caller
  const persistChanges = (nextState) => {
    setFormData(nextState);
    updateSection('homepageCMS', nextState);
    updateSection('homepage', nextState);
    updateSection('homeData', nextState);
  };

  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublishAll = async (isPublished = true) => {
    setIsPublishing(true);
    persistChanges(formData);
    try {
      if (apiFetch) {
        await apiFetch('/homepage', {
          method: 'PUT',
          body: JSON.stringify(formData)
        });
        try {
          await apiFetch('/cms/update', {
            method: 'POST',
            body: JSON.stringify({ key: 'homepage', value: formData })
          });
          await apiFetch('/cms/update', {
            method: 'POST',
            body: JSON.stringify({ key: 'homepageCMS', value: formData })
          });
        } catch (e) {}
      }
      setIsSaved(true);
      showToast(isPublished ? 'Homepage CMS Published Live & Synchronized to MongoDB!' : 'Homepage Draft Saved Locally!', 'success');
      setTimeout(() => setIsSaved(false), 2500);
    } catch (err) {
      console.warn("Backend API sync warning:", err);
      showToast('Saved locally! Backend: ' + (err.message || 'Updated'), 'info');
    } finally {
      setIsPublishing(false);
    }
  };

  // Direct Cloudinary / API File Upload Handler
  const handleFileUpload = async (e, callback) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const uploadData = new FormData();
      uploadData.append(file.type.startsWith('video') ? 'video' : 'image', file);
      
      const endpoint = file.type.startsWith('video') ? '/upload/video' : '/upload/image';
      const res = await apiFetch(endpoint, {
        method: 'POST',
        body: uploadData
      });

      if (res.success && (res.data?.url || res.data?.imageUrl || res.data?.secure_url)) {
        const uploadedUrl = res.data.url || res.data.imageUrl || res.data.secure_url;
        callback(uploadedUrl);
        showToast('Media uploaded & attached successfully!', 'success');
      } else {
        // Fallback for local object URL preview if offline
        const localUrl = URL.createObjectURL(file);
        callback(localUrl);
        showToast('Uploaded asset to local preview cache', 'info');
      }
    } catch (err) {
      const localUrl = URL.createObjectURL(file);
      callback(localUrl);
      showToast('Media attached to form', 'info');
    } finally {
      setIsUploading(false);
    }
  };

  // Helper Array Order Swap
  const swapOrder = (listKey, parentKey, index, direction) => {
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    // reassign order integers
    const reordered = list.map((item, idx) => ({ ...item, order: idx + 1 }));

    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: reordered } }
      : { ...formData, [listKey]: reordered };

    persistChanges(updatedState);
  };

  // Helper Toggle Visibility / Active State
  const toggleItemVisibility = (listKey, parentKey, id) => {
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    const updated = list.map(item => item.id === id ? { ...item, visible: !item.visible } : item);
    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: updated } }
      : { ...formData, [listKey]: updated };
    persistChanges(updatedState);
  };

  // Helper Delete (Removes item completely from state)
  const handleItemDelete = (listKey, parentKey, id) => {
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    const updated = list.filter(item => item.id !== id);
    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: updated } }
      : { ...formData, [listKey]: updated };
    persistChanges(updatedState);
    setDeleteConfirmItem(null);
    showToast('Item deleted successfully from CMS!', 'info');
  };

  // Helper Restore Soft Deleted Item
  const handleItemRestore = (listKey, parentKey, id) => {
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    const updated = list.map(item => item.id === id ? { ...item, deleted: false } : item);
    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: updated } }
      : { ...formData, [listKey]: updated };
    persistChanges(updatedState);
    showToast('Item restored successfully', 'success');
  };

  // Modal Submit (Create / Edit Item)
  const handleModalSave = (e) => {
    e.preventDefault();
    const { listKey, parentKey, item } = modalConfig;
    const list = parentKey ? [...formData[parentKey][listKey]] : [...formData[listKey]];
    
    const processedItem = { ...item };
    if (listKey === 'channels' || parentKey === 'channelsTicker') {
      const img = processedItem.circleImage || processedItem.logoUrl || processedItem.image || processedItem.imageUrl || '';
      processedItem.circleImage = img;
      processedItem.logoUrl = img;
      processedItem.image = img;
      processedItem.imageUrl = img;
    }

    if (listKey === 'brands' || parentKey === 'brandCollaborations') {
      const bImg = processedItem.logoUrl || processedItem.logo || processedItem.imageUrl || processedItem.brandLogo || '';
      processedItem.logoUrl = bImg;
      processedItem.logo = bImg;
      processedItem.imageUrl = bImg;
      processedItem.brandLogo = bImg;
    }

    let updated;
    if (processedItem.id) {
      updated = list.map(i => i.id === processedItem.id ? processedItem : i);
    } else {
      const newItem = {
        ...processedItem,
        id: `${listKey.slice(0, 2)}-${Date.now()}`,
        order: list.length + 1,
        visible: true,
        deleted: false
      };
      updated = [...list, newItem];
    }

    const updatedState = parentKey 
      ? { ...formData, [parentKey]: { ...formData[parentKey], [listKey]: updated } }
      : { ...formData, [listKey]: updated };

    persistChanges(updatedState);
    setModalConfig(null);
    showToast(item.id ? 'Item updated successfully!' : 'New item created successfully!', 'success');
  };

  const sectionsList = [
    { id: 'sec-1', label: 'Section 1: Navbar Settings' },
    { id: 'sec-2', label: 'Section 2: Hero Landing Section' },
    { id: 'sec-3', label: 'Section 3: Intro & Vision Grid' },
    { id: 'sec-4', label: 'Section 4: Founder Spotlight' },
    { id: 'sec-5', label: 'Section 5: Channels Ticker' },
    { id: 'sec-6', label: 'Section 6: Core Values Cards' },
    { id: 'sec-7', label: 'Section 7: Statistics Counters' },
    { id: 'sec-8', label: 'Section 8: Featured Shorts & Reels' },
    { id: 'sec-9', label: 'Section 9: Featured Long Videos' },
    { id: 'sec-10', label: 'Section 10: Brand Collaborations Wall' },
    { id: 'sec-11', label: 'Section 11: Contact CTA Settings' }
  ];

  return (
    <div className="space-y-6 text-left">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800/80">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold shadow-gold-glow animate-pulse" />
            <h1 className="text-2xl font-serif font-bold tracking-wide uppercase text-white">Homepage End-to-End CMS</h1>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-mono">
            Full End-to-End CRUD for all 11 Homepage sections synced to MongoDB.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={() => handlePublishAll(false)} variant="outline" size="sm" className="text-xs uppercase tracking-wider">
            Save Draft
          </Button>
          <Button 
            onClick={() => handlePublishAll(true)} 
            disabled={isPublishing} 
            variant="gold" 
            size="sm" 
            className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5"
          >
            {isPublishing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-black" />
            ) : isSaved ? (
              <Check className="w-3.5 h-3.5 text-black" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            {isPublishing ? 'Publishing...' : isSaved ? 'Published Live!' : 'Publish Changes'}
          </Button>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-3 border-b border-zinc-800/80">
        {sectionsList.map(sec => (
          <button
            key={sec.id}
            onClick={() => { setActiveSection(sec.id); setSearchQuery(''); setStatusFilter('all'); }}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer whitespace-nowrap ${
              activeSection === sec.id
                ? 'bg-luxury-gold/10 text-luxury-gold border border-luxury-gold/30 shadow-[0_0_12px_rgba(212,175,55,0.05)]'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* SECTION 1: NAVBAR */}
      {activeSection === 'sec-1' && (
        <div className="space-y-6">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Navbar Global Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Button Text</label>
                <input
                  type="text"
                  value={formData?.navbar?.buttonText || ''}
                  onChange={(e) => persistChanges({ ...formData, navbar: { ...(formData.navbar || {}), buttonText: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Button Target Link</label>
                <input
                  type="text"
                  value={formData?.navbar?.buttonLink || ''}
                  onChange={(e) => persistChanges({ ...formData, navbar: { ...(formData.navbar || {}), buttonLink: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono focus:outline-none"
                />
              </div>
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Views Badge</label>
                <input
                  type="text"
                  value={formData?.navbar?.viewsText || ''}
                  onChange={(e) => persistChanges({ ...formData, navbar: { ...(formData.navbar || {}), viewsText: e.target.value } })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Navigation Items List CRUD */}
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Navbar Navigation Items</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'navItems', parentKey: 'navbar', item: { label: '', url: '/' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Nav Item
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/80 text-zinc-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Order</th>
                    <th className="py-2.5 px-4">Label</th>
                    <th className="py-2.5 px-4">URL</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {formData.navbar.navItems.map((item, idx) => (
                    <tr key={item.id} className={`hover:bg-zinc-900/30 ${item.deleted ? 'opacity-40' : ''}`}>
                      <td className="py-2.5 px-4 font-mono text-zinc-500">
                        <div className="flex items-center gap-1">
                          <button onClick={() => swapOrder('navItems', 'navbar', idx, -1)} className="hover:text-luxury-gold cursor-pointer"><ArrowUp className="w-3 h-3" /></button>
                          <span>{idx + 1}</span>
                          <button onClick={() => swapOrder('navItems', 'navbar', idx, 1)} className="hover:text-luxury-gold cursor-pointer"><ArrowDown className="w-3 h-3" /></button>
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-semibold text-zinc-200">{item.label}</td>
                      <td className="py-2.5 px-4 font-mono text-zinc-400">{item.url}</td>
                      <td className="py-2.5 px-4">
                        <button 
                          onClick={() => toggleItemVisibility('navItems', 'navbar', item.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono border cursor-pointer ${item.visible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}
                        >
                          {item.visible ? 'Visible' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setModalConfig({ listKey: 'navItems', parentKey: 'navbar', item })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                          {item.deleted ? (
                            <button onClick={() => handleItemRestore('navItems', 'navbar', item.id)} className="p-1 text-emerald-400"><RotateCcw className="w-3.5 h-3.5" /></button>
                          ) : (
                            <button onClick={() => handleItemDelete('navItems', 'navbar', item.id)} className="p-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: HERO */}
      {activeSection === 'sec-2' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Hero Section Fields</h3>

          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Top Sub-Badge Text</label>
              <input
                type="text"
                value={formData?.hero?.topBadgeText || ''}
                onChange={(e) => persistChanges({ ...formData, hero: { ...(formData.hero || {}), topBadgeText: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Main Heading</label>
              <input
                type="text"
                value={formData?.hero?.mainHeading || ''}
                onChange={(e) => persistChanges({ ...formData, hero: { ...(formData.hero || {}), mainHeading: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Hero Tagline</label>
              <textarea
                rows={2}
                value={formData?.hero?.tagline || ''}
                onChange={(e) => persistChanges({ ...formData, hero: { ...(formData.hero || {}), tagline: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif italic"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Sub-Tagline</label>
              <input
                type="text"
                value={formData?.hero?.subTagline || ''}
                onChange={(e) => persistChanges({ ...formData, hero: { ...(formData.hero || {}), subTagline: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: INTRO & VISION */}
      {activeSection === 'sec-3' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Intro & Vision Grid</h3>
          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Intro Heading</label>
              <input
                type="text"
                value={formData.introVision.introHeading}
                onChange={(e) => persistChanges({ ...formData, introVision: { ...formData.introVision, introHeading: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Intro Description</label>
              <textarea
                rows={3}
                value={formData.introVision.introDescription}
                onChange={(e) => persistChanges({ ...formData, introVision: { ...formData.introVision, introDescription: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Vision Title</label>
              <input
                type="text"
                value={formData.introVision.visionHeading}
                onChange={(e) => persistChanges({ ...formData, introVision: { ...formData.introVision, visionHeading: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Vision Description</label>
              <textarea
                rows={3}
                value={formData.introVision.visionDescription}
                onChange={(e) => persistChanges({ ...formData, introVision: { ...formData.introVision, visionDescription: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: FOUNDER */}
      {activeSection === 'sec-4' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4 text-xs">
          <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Founder / CEO Spotlight</h3>
          <div className="space-y-4">
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Founder Name</label>
              <input
                type="text"
                value={formData.founder.name}
                onChange={(e) => persistChanges({ ...formData, founder: { ...formData.founder, name: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif font-bold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Highlighted Title</label>
              <input
                type="text"
                value={formData.founder.highlightedName}
                onChange={(e) => persistChanges({ ...formData, founder: { ...formData.founder, highlightedName: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-serif italic text-luxury-gold"
              />
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Bio Description</label>
              <textarea
                rows={4}
                value={formData.founder.description}
                onChange={(e) => persistChanges({ ...formData, founder: { ...formData.founder, description: e.target.value } })}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200"
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: CHANNELS TICKER */}
      {activeSection === 'sec-5' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Official Channels Ticker List</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'channels', parentKey: 'channelsTicker', item: { name: '', circleImage: '', ytSubs: '', igFollowers: '' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Channel
              </Button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-900/80 text-zinc-400 uppercase font-mono text-[10px]">
                  <tr>
                    <th className="py-2.5 px-4">Order</th>
                    <th className="py-2.5 px-4">Avatar Image</th>
                    <th className="py-2.5 px-4">Channel Name</th>
                    <th className="py-2.5 px-4">YouTube Subs</th>
                    <th className="py-2.5 px-4">IG Followers</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60">
                  {formData.channelsTicker.channels.filter(ch => !ch.deleted).map((ch, idx) => (
                    <tr key={ch.id} className={`hover:bg-zinc-900/30 ${ch.deleted ? 'opacity-40' : ''}`}>
                      <td className="py-2.5 px-4 font-mono text-zinc-500">
                        <div className="flex items-center gap-1">
                          <button onClick={() => swapOrder('channels', 'channelsTicker', idx, -1)} className="hover:text-luxury-gold cursor-pointer"><ArrowUp className="w-3 h-3" /></button>
                          <span>{idx + 1}</span>
                          <button onClick={() => swapOrder('channels', 'channelsTicker', idx, 1)} className="hover:text-luxury-gold cursor-pointer"><ArrowDown className="w-3 h-3" /></button>
                        </div>
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-luxury-gold/50 bg-black flex items-center justify-center shadow-sm">
                          <img 
                            src={ch.circleImage || ch.image || ch.imageUrl || defaultCircleAvatar} 
                            alt={ch.name} 
                            className="w-full h-full object-cover" 
                          />
                        </div>
                      </td>
                      <td className="py-2.5 px-4 font-serif font-bold text-zinc-200">{ch.name}</td>
                      <td className="py-2.5 px-4 font-mono text-luxury-gold">{ch.ytSubs || '—'}</td>
                      <td className="py-2.5 px-4 font-mono text-amber-400">{ch.igFollowers || '—'}</td>
                      <td className="py-2.5 px-4">
                        <button 
                          onClick={() => toggleItemVisibility('channels', 'channelsTicker', ch.id)}
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono border cursor-pointer ${ch.visible ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-zinc-900 text-zinc-500 border-zinc-800'}`}
                        >
                          {ch.visible ? 'Visible' : 'Hidden'}
                        </button>
                      </td>
                      <td className="py-2.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => setModalConfig({ listKey: 'channels', parentKey: 'channelsTicker', item: { name: '', circleImage: '', ytSubs: '', igFollowers: '', ...ch, circleImage: ch.circleImage || ch.logoUrl || ch.image || ch.imageUrl || '' } })} className="p-1 text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                          {ch.deleted ? (
                            <button onClick={() => handleItemRestore('channels', 'channelsTicker', ch.id)} className="p-1 text-emerald-400"><RotateCcw className="w-3.5 h-3.5" /></button>
                          ) : (
                            <button onClick={() => handleItemDelete('channels', 'channelsTicker', ch.id)} className="p-1 text-rose-400"><Trash2 className="w-3.5 h-3.5" /></button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 6: CORE VALUES */}
      {activeSection === 'sec-6' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Core Values Cards List</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'cards', parentKey: 'coreValues', item: { title: '', description: '' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Card
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.coreValues.cards.map((cv, idx) => (
                <div key={cv.id} className="p-4 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                    <span className="font-mono text-[10px] text-luxury-gold">Card #{idx + 1}</span>
                    <div className="flex items-center gap-1">
                      <button onClick={() => setModalConfig({ listKey: 'cards', parentKey: 'coreValues', item: cv })} className="text-zinc-400 hover:text-white"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleItemDelete('cards', 'coreValues', cv.id)} className="text-rose-400 hover:text-rose-300"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <h4 className="font-serif font-bold text-white text-sm">{cv.title}</h4>
                  <p className="text-zinc-400 font-light leading-relaxed">{cv.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 7: STATISTICS */}
      {activeSection === 'sec-7' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Statistics Counters</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'counters', parentKey: 'statistics', item: { value: '', label: '' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Counter
              </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              {formData.statistics.counters.map((st, idx) => (
                <div key={st.id} className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-luxury-gold text-base">{st.value}</span>
                    <button onClick={() => handleItemDelete('counters', 'statistics', st.id)} className="text-zinc-500 hover:text-rose-400"><Trash2 className="w-3 h-3" /></button>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: SHORTS & REELS */}
      {activeSection === 'sec-8' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Featured Shorts & Reels List</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'list', parentKey: 'shortsReels', item: { title: '', url: '', videoUrl: '', platform: 'youtube', username: '', channelName: '', views: '', thumbnail: '' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Reel / Short
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {formData.shortsReels.list.map((sr, idx) => (
                <div key={sr.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 hover:border-luxury-gold/50 rounded-xl space-y-2 text-xs transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate cursor-pointer hover:text-luxury-gold" onClick={() => setModalConfig({ listKey: 'list', parentKey: 'shortsReels', item: sr })}>
                      {sr.title || 'Untitled Reel'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setModalConfig({ listKey: 'list', parentKey: 'shortsReels', item: sr })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleItemDelete('list', 'shortsReels', sr.id)} className="text-rose-400 hover:text-rose-300"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-zinc-400">{sr.channelName || sr.author || sr.handle || sr.username || ''}</span>
                    <span className="text-luxury-gold">{sr.views || ''}</span>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-mono truncate">{sr.url || sr.videoUrl}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 9: LONG VIDEOS */}
      {activeSection === 'sec-9' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Featured Long Videos List</h3>
              <Button 
                onClick={() => setModalConfig({ listKey: 'list', parentKey: 'longVideos', item: { title: '', youtubeUrl: '', startTime: '0:00', endTime: '', views: '1.4M views', channelName: 'Tech Master' } })} 
                variant="gold" 
                size="sm" 
                className="text-xs uppercase"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Long Video
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.longVideos.list.map((lv, idx) => (
                <div key={lv.id || idx} className="p-4 bg-zinc-900/60 border border-zinc-800 hover:border-luxury-gold/50 rounded-xl space-y-2 text-xs transition-all">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-white truncate cursor-pointer hover:text-luxury-gold" onClick={() => setModalConfig({ listKey: 'list', parentKey: 'longVideos', item: lv })}>
                      {lv.title || 'Untitled Video'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setModalConfig({ listKey: 'list', parentKey: 'longVideos', item: lv })} className="text-zinc-400 hover:text-luxury-gold"><Edit3 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleItemDelete('list', 'longVideos', lv.id)} className="text-rose-400 hover:text-rose-300"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
                    <span>{lv.channelName || lv.channel || 'Tech Master'}</span>
                    <span className="text-luxury-gold">{lv.views || '1.4M views'}</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                    <span className="truncate">{lv.youtubeUrl}</span>
                    <span className="text-emerald-400 shrink-0 ml-2">Start: {lv.startTime || '0:00'}{lv.endTime ? ` | End: ${lv.endTime}` : ''}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 10: BRAND COLLABORATIONS */}
      {activeSection === 'sec-10' && (
        <div className="space-y-4">
          <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Brand Collaborations ({formData.brandCollaborations.brands.length})</h3>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <div className="relative w-48">
                  <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Search brand..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded pl-7 pr-2 py-1 text-xs text-zinc-200"
                  />
                </div>
                <Button 
                  onClick={() => setModalConfig({ listKey: 'brands', parentKey: 'brandCollaborations', item: { brandName: '', logoUrl: '', websiteUrl: '' } })} 
                  variant="gold" 
                  size="sm" 
                  className="text-xs uppercase"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Brand
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {formData.brandCollaborations.brands
                .filter(b => (b.brandName || '').toLowerCase().includes(searchQuery.toLowerCase()) && !b.deleted)
                .map((b) => {
                  const logoSrc = getBrandDefaultLogo(b.brandName, b.logoUrl || b.logo || b.imageUrl);
                  return (
                    <div key={b.id} className="p-3 bg-zinc-900/60 border border-zinc-800 hover:border-luxury-gold/40 rounded-xl flex flex-col items-center justify-between text-center space-y-2 relative group text-xs transition-all h-28 shadow-sm">
                      <div className="w-full h-12 flex items-center justify-center bg-black/40 rounded-lg p-1.5 overflow-hidden">
                        <img 
                          src={logoSrc} 
                          alt={b.brandName}
                          onError={(e) => {
                            if (e.target.dataset.errored) return;
                            e.target.dataset.errored = "true";
                            const name = (b.brandName || "BRAND").toUpperCase();
                            e.target.src = createTextLogoB64(name);
                          }}
                          className="max-h-full max-w-full object-contain filter invert opacity-90 group-hover:opacity-100 transition-opacity" 
                        />
                      </div>
                      <span className="font-semibold text-zinc-200 block truncate w-full text-[11px] font-mono">{b.brandName}</span>
                      
                      <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-950/80 p-1 rounded-md border border-zinc-800">
                        <button 
                          onClick={() => setModalConfig({ 
                            listKey: 'brands', 
                            parentKey: 'brandCollaborations', 
                            item: { brandName: b.brandName || '', logoUrl: b.logoUrl || b.logo || b.imageUrl || '', websiteUrl: b.websiteUrl || '', id: b.id } 
                          })}
                          className="text-zinc-400 hover:text-luxury-gold p-0.5"
                          title="Edit Brand Logo & Details"
                        >
                          <Edit3 className="w-3 h-3" />
                        </button>
                        <button 
                          onClick={() => handleItemDelete('brands', 'brandCollaborations', b.id)} 
                          className="text-zinc-400 hover:text-rose-400 p-0.5"
                          title="Delete Brand"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 11: CONTACT PREVIEW CTA */}
      {activeSection === 'sec-11' && (
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-xl p-6 backdrop-blur-xl space-y-6 text-xs">
          {/* Contact Preview Box */}
          <div className="space-y-4">
            <h3 className="text-sm font-serif font-bold text-white uppercase tracking-wider">Contact Preview CTA Settings</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Contact Tag / Badge</label>
                <input
                  type="text"
                  value={formData?.newsletterContact?.contactPreview?.tag || formData?.contactPreview?.tag || formData?.newsletterContact?.contactBadge || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    persistChanges({
                      ...formData,
                      contactPreview: { ...(formData.contactPreview || {}), tag: val, badge: val },
                      newsletterContact: { ...(formData.newsletterContact || {}), contactBadge: val, contactPreview: { ...(formData.newsletterContact?.contactPreview || {}), tag: val } }
                    });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 font-mono"
                />
              </div>
              <div>
                <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">CTA Button Text</label>
                <input
                  type="text"
                  value={formData?.newsletterContact?.contactPreview?.primaryCta || formData?.contactPreview?.primaryCta || formData?.newsletterContact?.contactCtaText || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    persistChanges({
                      ...formData,
                      contactPreview: { ...(formData.contactPreview || {}), primaryCta: val, buttonText: val },
                      newsletterContact: { ...(formData.newsletterContact || {}), contactCtaText: val, contactPreview: { ...(formData.newsletterContact?.contactPreview || {}), primaryCta: val } }
                    });
                  }}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-luxury-gold font-mono font-bold"
                />
              </div>
            </div>
            <div>
              <label className="text-zinc-400 font-mono uppercase text-[10px] block mb-1">Contact Preview Heading</label>
              <input
                type="text"
                value={formData?.newsletterContact?.contactPreview?.heading || formData?.contactPreview?.heading || formData?.newsletterContact?.contactHeading || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  persistChanges({
                    ...formData,
                    contactPreview: { ...(formData.contactPreview || {}), heading: val },
                    newsletterContact: { ...(formData.newsletterContact || {}), contactHeading: val, contactPreview: { ...(formData.newsletterContact?.contactPreview || {}), heading: val } }
                  });
                }}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white font-serif font-bold text-sm"
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
                {modalConfig.item.id ? 'Edit Item' : 'Create New Item'}
              </h3>
              <button type="button" onClick={() => setModalConfig(null)} className="text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              {Object.keys(modalConfig.item).filter(k => !['id', 'order', 'visible', 'deleted'].includes(k)).map(key => {
                const isImageKey = ['circleImage', 'image', 'imageUrl', 'logo', 'logoUrl', 'avatar', 'thumbnail'].includes(key);
                const isVideoKey = ['url', 'videoUrl', 'video', 'bgMediaUrl'].includes(key);
                const isMediaKey = isImageKey || isVideoKey;
                const fieldLabel = (key === 'circleImage' || key === 'logoUrl') ? 'Channel Avatar Image URL' : (key === 'url' || key === 'videoUrl') ? 'Reel Video URL / Cloudinary URL' : key;
                return (
                  <div key={key}>
                    <label className="text-zinc-400 block mb-1 font-mono uppercase text-[10px]">{fieldLabel}</label>
                    {isMediaKey ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          {isImageKey && (
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-luxury-gold bg-black shrink-0 flex items-center justify-center shadow-md">
                              <img 
                                src={modalConfig.item[key] || defaultCircleAvatar} 
                                alt="Preview" 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          )}
                          <input
                            type="text"
                            placeholder={isVideoKey ? "Cloudinary Video URL / YouTube / Instagram Link" : "Cloudinary Image URL"}
                            value={modalConfig.item[key] || ''}
                            onChange={(e) => setModalConfig({
                              ...modalConfig,
                              item: { ...modalConfig.item, [key]: e.target.value }
                            })}
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none font-mono text-[11px]"
                          />
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <label className="flex-1 bg-luxury-gold/15 hover:bg-luxury-gold/25 text-luxury-gold border border-luxury-gold/40 rounded-lg px-3 py-2 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm">
                            <UploadCloud className="w-4 h-4 text-luxury-gold" />
                            {isUploading ? 'Uploading to Cloudinary...' : isVideoKey ? 'Upload Video to Cloudinary' : 'Upload Photo from PC'}
                            <input 
                              type="file" 
                              accept={isVideoKey ? "video/*,image/*" : "image/*"}
                              disabled={isUploading}
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  handleDirectFileUpload(e.target.files[0], (uploadedUrl) => {
                                    setModalConfig(prev => ({
                                      ...prev,
                                      item: { ...prev.item, [key]: uploadedUrl, videoUrl: isVideoKey ? uploadedUrl : prev.item.videoUrl }
                                    }));
                                  });
                                }
                              }}
                              className="hidden" 
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => openMediaManager({
                              onSelect: (selectedUrl) => {
                                setModalConfig(prev => ({
                                  ...prev,
                                  item: { ...prev.item, [key]: selectedUrl, videoUrl: isVideoKey ? selectedUrl : prev.item.videoUrl }
                                }));
                              }
                            })}
                            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-lg px-3 py-2 text-[11px] flex items-center gap-1.5 cursor-pointer transition-colors"
                          >
                            <ImageIcon className="w-3.5 h-3.5 text-luxury-gold" />
                            Media Library
                          </button>
                        </div>
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={modalConfig.item[key] || ''}
                        onChange={(e) => setModalConfig({
                          ...modalConfig,
                          item: { ...modalConfig.item, [key]: e.target.value }
                        })}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-200 focus:outline-none"
                      />
                    )}
                  </div>
                );
              })}
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
