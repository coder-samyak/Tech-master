// Realistic mock data for TechMaster's personal luxury brand CMS

export const initialData = {
  mediaLibrary: [],
  // ==========================================
  // ENTERPRISE GLOBAL SEO SCHEMA
  // ==========================================
  globalSEO: {
    websiteName: "TechMaster | Luxury Digital Native",
    websiteUrl: "https://www.techmasterco.com",
    defaultTitle: "TechMaster - Architect of Luxury Digital Experiences",
    defaultDescription: "Portfolio of TechMaster, an elite developer specializing in high-fidelity 3D configurations, interactive cinema, and luxury digital architecture.",
    defaultKeywords: "Luxury Web Design, Three.js, React, 3D Configurations, TechMaster",
    canonicalURL: "https://www.techmasterco.com",
    favicon: "/favicon.ico",
    appleIcon: "/apple-touch-icon.png",
    androidIcon: "/android-chrome-192x192.png",
    defaultOGTitle: "TechMaster - Luxury Digital Native",
    defaultOGDescription: "Discover interactive luxury digital experiences.",
    defaultOGImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200",
    twitterCard: "summary_large_image",
    twitterSite: "@techmaster",
    twitterCreator: "@techmaster",
    analytics: {
      googleAnalyticsId: "G-XXXXXXXXXX",
      gtmId: "GTM-XXXXXXX",
      metaPixelId: "",
      clarityId: "",
      linkedinInsight: "",
      customHeaderScript: "",
      customFooterScript: ""
    },
    verificationCodes: {
      google: "",
      bing: "",
      yandex: "",
      pinterest: ""
    },
    businessInformation: {
      name: "TechMaster Studios",
      type: "Creative Agency",
      email: "hello@techmasterco.com",
      phone: "+1 (555) 123-4567",
      address: "100 Luxury Avenue",
      country: "United States",
      state: "CA",
      city: "Beverly Hills",
      postalCode: "90210",
      latitude: "34.0736",
      longitude: "-118.4004",
      logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&q=80&w=200"
    },
    socialLinks: [
      { id: "gsl-1", platform: "Instagram", url: "https://instagram.com/techmaster", order: 1 },
      { id: "gsl-2", platform: "LinkedIn", url: "https://linkedin.com/in/techmaster", order: 2 }
    ],
    robotsSettings: "User-agent: *\nDisallow: /admin/\nDisallow: /config/\n\nSitemap: https://www.techmasterco.com/sitemap.xml",
    sitemapSettings: "https://www.techmasterco.com/sitemap.xml",
    globalToggles: {
      enableSEO: true,
      allowIndexing: true,
      autoSitemap: true,
      autoRobots: true,
      forceHTTPS: true,
      enableSchema: true
    }
  },

  pageSEO: [
    { id: "pseo-home", pageName: "Home", slug: "/", useGlobalSEO: true, metaTitle: "", metaDescription: "", keywords: "", canonicalURL: "", ogTitle: "", ogDescription: "", ogImage: "", robots: "index, follow", indexStatus: true, followStatus: true, priority: "1.0", changeFrequency: "daily", lastModified: "2026-07-10" },
    { id: "pseo-about", pageName: "About", slug: "/about", useGlobalSEO: true, metaTitle: "", metaDescription: "", keywords: "", canonicalURL: "", ogTitle: "", ogDescription: "", ogImage: "", robots: "index, follow", indexStatus: true, followStatus: true, priority: "0.8", changeFrequency: "weekly", lastModified: "2026-07-10" },
    { id: "pseo-portfolio", pageName: "Portfolio", slug: "/portfolio", useGlobalSEO: false, metaTitle: "Elite Digital Portfolio | TechMaster", metaDescription: "Explore case studies of award-winning digital experiences built for Vogue, Chanel, and Forbes.", keywords: "Portfolio, Case Studies, Development", canonicalURL: "https://techmaster.com/portfolio", ogTitle: "Elite Digital Portfolio | TechMaster", ogDescription: "Explore case studies of award-winning digital experiences.", ogImage: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1200", robots: "index, follow", indexStatus: true, followStatus: true, priority: "0.9", changeFrequency: "weekly", lastModified: "2026-07-10" },
    { id: "pseo-contact", pageName: "Contact", slug: "/contact", useGlobalSEO: true, metaTitle: "", metaDescription: "", keywords: "", canonicalURL: "", ogTitle: "", ogDescription: "", ogImage: "", robots: "index, follow", indexStatus: true, followStatus: true, priority: "0.7", changeFrequency: "monthly", lastModified: "2026-07-10" }
  ],

  contactHeroSetup: {
    enable: true,
    label: "Contact Us",
    mainLine1: "Get In",
    highlight: "Touch",
    description: "Whether you have a general inquiry, a partnership proposal, or just want to say hello, we are here to help.",
    glowEnable: true
  },
  contactInfoSetup: {
    enableEmail: true,
    email: "contact@techmaster.com",
    emailIcon: "mail",
    enablePhone: true,
    phone: "+1 800 123 4567",
    phoneIcon: "phone",
    enableLocation: true,
    locationTitle: "Studio Location",
    address: "Nariman Point Creative Studio, Mumbai",
    locationIcon: "map-pin"
  },
  contactWhatsAppSetup: {
    enable: true,
    number: "919999911111",
    buttonText: "Chat on WhatsApp",
    description: "Quick responses via WhatsApp Support",
    openNewTab: true
  },
  contactMapSetupData: {
    enable: true,
    url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d120935.91893962692!2d72.76678284562086!3d18.98305888251291!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce36603d6d07%3A0x6b4fb4396a56e792!2sNariman%20Point%2C%20Mumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689255655555!5m2!1sen!2sin",
    height: "300",
    rounded: true,
    darkMode: true
  },
  contactFormConfig: {
    enable: true,
    title: "Business Inquiry Form",
    buttonText: "Submit Inquiry",
    successTitle: "Inquiry Sent!",
    successDesc: "Thank you for reaching out. We will get back to you shortly.",
    receiveEmail: true
  },
  contactFormFields: [
    { id: "cff-1", enable: true, required: true, label: "Full Name", placeholder: "e.g. Gabriella Rossi", order: 1 },
    { id: "cff-2", enable: true, required: true, label: "Email Address", placeholder: "gabriella@gmail.com", order: 2 },
    { id: "cff-3", enable: true, required: true, label: "Company / Brand", placeholder: "e.g. Dior", order: 3 },
    { id: "cff-4", enable: true, required: true, label: "Inquiry Category", placeholder: "Select category", order: 4 },
    { id: "cff-5", enable: true, required: true, label: "Message", placeholder: "Type your message here...", order: 5 }
  ],
  contactCategoriesSetup: [
    { id: "cc-1", name: "Business Inquiry", value: "business", status: true },
    { id: "cc-2", name: "Brand Collaboration", value: "collab", status: true },
    { id: "cc-3", name: "Campaign", value: "campaign", status: true },
    { id: "cc-4", name: "Product Launch", value: "launch", status: true },
    { id: "cc-5", name: "Events", value: "events", status: true },
    { id: "cc-6", name: "Media", value: "media", status: true },
    { id: "cc-7", name: "Speaking", value: "speaking", status: true },
    { id: "cc-8", name: "Sponsorship", value: "sponsorship", status: true },
    { id: "cc-9", name: "Other", value: "other", status: true }
  ],
  contactSocialLinksSetup: [
    { id: "csl-1", platform: "Instagram", handle: "@techmaster", url: "https://instagram.com", icon: "instagram", order: 1, status: true, newTab: true },
    { id: "csl-2", platform: "LinkedIn", handle: "TechMaster", url: "https://linkedin.com", icon: "linkedin", order: 2, status: true, newTab: true },
    { id: "csl-3", platform: "YouTube", handle: "TechMaster", url: "https://youtube.com", icon: "youtube", order: 3, status: true, newTab: true }
  ],
  contactSEOSetup: {
    title: "Contact Us - Zenvora",
    description: "Get in touch for collaborations and inquiries.",
    keywords: "contact, luxury, brand, collaboration",
    ogImage: "",
    canonical: "https://techmaster.com/contact",
    indexing: true
  },
  contactVisibilitySetup: {
    hero: true,
    info: true,
    whatsapp: true,
    map: true,
    form: true,
    social: true
  },

  faqSettings: {
    enabled: true,
    badge: "FAQ",
    heading: "Frequently Asked",
    highlightHeading: "Questions",
    description: "Find answers to our most common inquiries. Can't find what you need? Reach out directly via our contact hub.",
    backgroundImage: ""
  },
  faqCategories: [
    { id: "fc-1", name: "General", slug: "general", displayOrder: 1, isActive: true },
    { id: "fc-2", name: "Booking", slug: "booking", displayOrder: 2, isActive: true },
    { id: "fc-3", name: "Services", slug: "services", displayOrder: 3, isActive: true },
    { id: "fc-4", name: "Pricing", slug: "pricing", displayOrder: 4, isActive: true }
  ],

  contactHero: {
    badge: "Contact Hub",
    titleLine1: "Connect with",
    titleLine2: "Our Team",
    description: "Whether you have a general inquiry, a partnership proposal, or just want to say hello, we are here to help.",
    active: true
  },
  contactFormsSetup: {
    generalTitle: "General Contact Form",
    generalButtonText: "Submit General Inquiry",
    generalActive: true,
    businessTitle: "Business Inquiry Form",
    businessButtonText: "Dispatch Business Proposal",
    businessActive: true
  },
  contactSocials: [
    { id: "cs-1", platform: "Instagram", url: "https://instagram.com", icon: "instagram", active: true, order: 1 },
    { id: "cs-2", platform: "YouTube", url: "https://youtube.com", icon: "youtube", active: true, order: 2 },
    { id: "cs-3", platform: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", active: true, order: 3 },
    { id: "cs-4", platform: "Facebook", url: "https://facebook.com", icon: "facebook", active: true, order: 4 }
  ],
  contactMapSetup: {
    title: "Studio Location Map",
    coordinates: "18°55'N, 72°49'E",
    district: "Nariman Point District",
    address: "Nariman Point Creative Studio, Mumbai",
    active: true
  },

  blogHero: {
    badge: "CREATOR JOURNAL",
    titleLine1: "Thoughts on Tech",
    titleLine2: "education & scalability.",
    animationEnabled: true,
    glowEnabled: true,
    active: true
  },
  featuredStrategy: {
    badge: "Featured Strategy",
    titleLine1: "Engineering",
    titleLine2: "Content Marketing",
    titleLine3: "Excellence",
    description: "Traditional advertising has diminishing returns. We help engineering brands build market authority through high-utility technical content, storytelling, and high-impact distribution loops.",
    active: true
  },
  strategyStats: [
    { id: "ss-1", number: "10M+", label: "Impressions", order: 1, active: true },
    { id: "ss-2", number: "+150%", label: "Engagement", order: 2, active: true },
    { id: "ss-3", number: "4.8x", label: "Content ROI", order: 3, active: true }
  ],
  strategyPillars: [
    { id: "sp-1", icon: "Users", title: "Audience Retention", description: "Translate complex system architecture into clean narratives.", order: 1, active: true },
    { id: "sp-2", icon: "BarChart3", title: "Search Dominance", description: "Rank first for high-intent queries that developers actually search.", order: 2, active: true },
    { id: "sp-3", icon: "TrendingUp", title: "Distribution Loops", description: "Syndicate deep-dives into social threads, shorts, and digests.", order: 3, active: true }
  ],
  strategyPresets: [
    { id: "solopreneur", presetName: "solopreneur", badge: "Solo Creator", impressions: "50K - 100K+", channel: "Twitter/X, Dev.to & LinkedIn", focus: "Build in public, share raw learnings, create highly readable dev cheatsheets.", roi: "High authority, premium lead acquisition", active: true },
    { id: "startup", presetName: "startup", badge: "Growth Startup", impressions: "250K - 500K+", channel: "GitHub, Medium, Tech Newsletters", focus: "Detailed technical case studies, comparisons, integration guides, and live streams.", roi: "Product signups, community growth", active: true },
    { id: "enterprise", presetName: "enterprise", badge: "Enterprise Brand", impressions: "1M - 5M+", channel: "YouTube Documentaries, Dedicated Hubs", focus: "High-production whitepapers, engineering-led media channels.", roi: "Market standard positioning, enterprise adoption", active: true }
  ],
  quickBlueprint: {
    title: "Need a custom playbook?",
    description: "Learn how we craft tailored content programs for developer-first companies.",
    buttonText: "Read Guide",
    buttonUrl: "#",
    active: true
  },
  blogCategories: [
    { id: "bc-1", name: "All", slug: "all", order: 1, active: true },
    { id: "bc-2", name: "Lifestyle", slug: "lifestyle", order: 2, active: true },
    { id: "bc-3", name: "Marketing", slug: "marketing", order: 3, active: true },
    { id: "bc-4", name: "Branding", slug: "branding", order: 4, active: true },
    { id: "bc-5", name: "Creator Journey", slug: "creator-journey", order: 5, active: true },
    { id: "bc-6", name: "Tips", slug: "tips", order: 6, active: true },
    { id: "bc-7", name: "Latest News", slug: "latest-news", order: 7, active: true }
  ],
  latestInsights: {
    title: "Latest Insights",
    subtitle: "Browse thoughts, guides, and updates from the team",
    active: true
  },
  blogPageSettings: {
    showHero: true,
    showStrategy: true,
    showLatest: true,
    showFilters: true,
    hoverAnimations: true
  },
  blogSEO: {
    metaTitle: "Tech Master | Creator Journal",
    metaDescription: "Read the latest thoughts on tech education and scalable engineering content marketing.",
    keywords: "tech, education, marketing, dev",
    canonical: "https://zenvora.com/blog",
    robots: "index, follow"
  },

  careerHero: {
    badge: "JOIN THE TEAM",
    titleLine1: "Join TechMaster's Team",
    titleLine2: "Creator & Education Lab",
    description: "We look for cinematic editors , writer and Future of Creator economy who want to construct the future of tech education.",
    bgImageUrl: "",
    bgVideoUrl: "",
    status: true
  },
  careerCulture: [
    { id: "cc-1", title: "Remote First", description: "Work from anywhere in the world. We believe in output, not office hours.", icon: "Globe", order: 1, active: true },
    { id: "cc-2", title: "Learning Budget", description: "$2,000 annual stipend for courses, books, and conference tickets.", icon: "Book", order: 2, active: true },
    { id: "cc-3", title: "Health & Wellness", description: "Premium global health coverage and mental wellness stipends.", icon: "Heart", order: 3, active: true },
    { id: "cc-4", title: "Creator Autonomy", description: "Own your projects. We cultivate leaders who can drive their own vision.", icon: "Star", order: 4, active: true }
  ],
  careerProcess: [
    { id: "cp-1", step: "01", title: "Application Review", description: "We review your portfolio, GitHub, and application answers.", active: true },
    { id: "cp-2", step: "02", title: "Intro Call", description: "A 30-minute culture and vibe check with our ops team.", active: true },
    { id: "cp-3", step: "03", title: "Technical Task", description: "A paid, asynchronous take-home project relevant to your role.", active: true },
    { id: "cp-4", step: "04", title: "Final Interview", description: "A conversation with Aman and the leads. No live whiteboarding.", active: true }
  ],
  careerStats: {
    employees: "50+",
    countries: "12",
    success: "98%",
    openPositions: "15",
    animateCounters: true
  },
  careerGallery: [],
  careerFAQ: [],
  careerSEO: {},
  careerSettings: {
    showHero: true,
    showJobs: true,
    showCulture: true,
    showProcess: true,
    showStats: true,
    showGallery: true,
    showFAQ: true
  },

  testHero: {
    badge: "COMMUNITY ACCLAIM",
    titleLine1: "Student Placements &",
    titleLine2: "Academics Success",
    description: "Discover reviews from Aman's mentored students, university professors, and tech partners who have integrated our curricula.",
    bgImageUrl: "",
    bgVideoUrl: "",
    overlayEnabled: true,
  },
  testVideos: [
    {
      id: "tv-1",
      title: "Sarah Jenkins",
      description: "VP of Engineering, Acme Corp",
      thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
      videoUrl: "",
      youtubeUrl: "",
      duration: "02:30",
      category: "Corporate",
      active: true,
      featured: true,
      order: 1
    },
    {
      id: "tv-2",
      title: "David Chen",
      description: "Founder, StartupX",
      thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80",
      videoUrl: "",
      youtubeUrl: "",
      duration: "01:45",
      category: "Corporate",
      active: true,
      featured: true,
      order: 2
    }
  ],
  testStats: [
    { id: "st-1", value: "94.2%", label: "Placement Rate", order: 1, active: true },
    { id: "st-2", value: "$120K", label: "Average Salary", order: 2, active: true },
    { id: "st-3", value: "15,000+", label: "Students Hired", order: 3, active: true },
    { id: "st-4", value: "450+", label: "Tech Partners", order: 4, active: true }
  ],
  testGallery: [],
  testCategories: [
    { id: "tc-1", name: "Students", isVisible: true },
    { id: "tc-2", name: "Corporate", isVisible: true },
    { id: "tc-3", name: "Influencers", isVisible: true },
    { id: "tc-4", name: "Brands", isVisible: true },
    { id: "tc-5", name: "Celebrities", isVisible: true },
    { id: "tc-6", name: "Faculty", isVisible: true },
    { id: "tc-7", name: "Partners", isVisible: true },
    { id: "tc-8", name: "Media", isVisible: true }
  ],
  testSettings: {
    showHero: true,
    showTextReviews: true,
    showVideoReviews: true,
    showStats: true,
    showGallery: true
  },
  testSEO: {},

  // 1. SERVICES
  services: [
    {
      id: "srv-1",
      title: "Luxury Brand Strategy",
      category: "Creative Consulting",
      description: "High-end brand positioning and creative direction for luxury hospitality and fashion labels globally.",
      benefits: ["Targeted High-Net-Worth positioning", "Immersive visual storytelling asset creation", "Multi-channel launch strategy"],
      pricing: "$12,500 - $25,000",
      cta: "Schedule Consultation",
      isActive: true,
      createdAt: "2026-01-15T08:00:00Z"
    },
    {
      id: "srv-2",
      title: "High-End Influencer Campaign Execution",
      category: "Influencer Marketing",
      description: "Bespoke influencer partnerships, content production, and amplified digital distribution.",
      benefits: ["Vetted luxury influencer roster", "UGC & high-fidelity video production", "Guaranteed luxury media visibility"],
      pricing: "$18,000 - $35,000",
      cta: "Plan Campaign",
      isActive: true,
      createdAt: "2026-02-10T09:30:00Z"
    },
    {
      id: "srv-3",
      title: "Keynote & Public Speaking",
      category: "Public Speaking",
      description: "Inspiring presentations on creator economy, entrepreneurship, and luxury market trends.",
      benefits: ["Highly engaging storytelling", "Interactive Q&A segments", "Post-event brand amplification"],
      pricing: "$8,500+",
      cta: "Book Speaking Event",
      isActive: true,
      createdAt: "2026-03-01T14:20:00Z"
    },
    {
      id: "srv-4",
      title: "UGC & Commercial Content Production",
      category: "Content Creation",
      description: "Premium commercial photoshoots, product reviews, and short-form cinematic reels.",
      benefits: ["4K HDR cinema-grade assets", "Optimized social media pacing", "Full licensing rights included"],
      pricing: "$5,000 - $12,000",
      cta: "Request Creative Pitch",
      isActive: false,
      createdAt: "2026-04-12T11:00:00Z"
    }
  ],

  // 2. BRAND COLLABORATIONS
  collaborations: [
    {
      id: "collab-1",
      brandName: "Gucci India",
      logoUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=150", // clean graphic
      productImages: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600", // Handbag
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600", // Heels
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600"  // Sunglasses
      ],
      collabDate: "2026-05-10",
      metrics: "3.2M Impressions, +24% Brand Affinity",
      showcaseUrl: "https://gucci.com",
      campaignDescription: "Launch of the premium Gucci Neo-Heritage Handbag series with custom 3D web configurators and influencer reel stories.",
      kpis: [
        { label: "Total Impressions", value: "3.2M" },
        { label: "Link Clicks", value: "48K" },
        { label: "Sales Conversion", value: "+24%" }
      ],
      isActive: true,
      createdAt: "2026-05-11T12:00:00Z"
    },
    {
      id: "collab-2",
      brandName: "Vogue India",
      logoUrl: "https://images.unsplash.com/photo-1627163430005-502a0a2df335?auto=format&fit=crop&q=80&w=150",
      productImages: [
        "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=600", // Editorial model
        "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600", // Styling shot
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=600"  // Editorial clothing
      ],
      collabDate: "2026-03-15",
      metrics: "Featured Cover & 8-page Editorial",
      showcaseUrl: "https://vogue.in",
      campaignDescription: "Exclusive cover story and double-page cinematic spread highlighting TechMaster's journey in shaping creator-driven HNW agencies.",
      kpis: [
        { label: "Print Distribution", value: "120K" },
        { label: "Online Article Reads", value: "1.2M" },
        { label: "Social Shares", value: "15.4K" }
      ],
      isActive: true,
      createdAt: "2026-03-16T10:00:00Z"
    },
    {
      id: "collab-3",
      brandName: "Armani Beauty",
      logoUrl: "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&q=80&w=150",
      productImages: [
        "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600", // Lipstick
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600", // Perfumes
        "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600"  // Creams
      ],
      collabDate: "2026-04-01",
      metrics: "1.8M Reels Views, 4.5% Engagement",
      showcaseUrl: "https://armanibeauty.com",
      campaignDescription: "Digital video activation showcasing the new Luminous Silk foundation line using slow-motion macro editing.",
      kpis: [
        { label: "Total Video Views", value: "1.8M" },
        { label: "Save Count", value: "22K" },
        { label: "Click Through Rate", value: "4.5%" }
      ],
      isActive: true,
      createdAt: "2026-04-02T15:30:00Z"
    },
    {
      id: "collab-4",
      brandName: "Porsche Club",
      logoUrl: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=150",
      productImages: [
        "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600", // Porsche 911
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=600", // Racetrack
        "https://images.unsplash.com/photo-1611245801312-520c8922264e?auto=format&fit=crop&q=80&w=600"  // Taycan Electric
      ],
      collabDate: "2026-06-20",
      metrics: "Exclusive Event Hosting & 3D Video Campaign",
      showcaseUrl: "https://porsche.com",
      campaignDescription: "Hosting the annual Porsche Club India VIP summit and launch of the digital 3D model configuration preview.",
      kpis: [
        { label: "VIP Attendance", value: "350" },
        { label: "Model Preorders", value: "18" },
        { label: "Campaign Impressions", value: "980K" }
      ],
      isActive: false,
      createdAt: "2026-06-21T09:00:00Z"
    }
  ],
  
  // BRAND COLLABORATIONS PAGE (NEW MULTI-SECTION CMS SCHEMA)
  collaborationsPage: {
    hero: {
      eyebrowText: "BRAND COOPERATIONS",
      title: "Alliances & Brand Collaborations",
      highlightedTitle: "Alliances",
      description: "Discover our strategic alliances and collaborative campaigns with top-tier brands.",
      status: "Active"
    },
    brandCarousel: [
      { id: "bc-1", brandName: "Vercel", logoImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=150", order: 1, status: "Active" },
      { id: "bc-2", brandName: "Google Cloud", logoImage: "https://images.unsplash.com/photo-1627163430005-502a0a2df335?auto=format&fit=crop&q=80&w=150", order: 2, status: "Active" }
    ],
    partners: [
      { id: "pt-1", name: "Gucci", logo: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=150", type: "Luxury", featuredWork: "Neo-Heritage Handbag", description: "Launch of the premium handbag series.", accentColor: "#D4AF37", status: "Active" }
    ],
    metrics: [
      { id: "mt-1", value: "50+", label: "Brand Partners", order: 1, status: "Active" },
      { id: "mt-2", value: "$2M+", label: "Sponsored Cloud Credits", order: 2, status: "Active" },
      { id: "mt-3", value: "20+", label: "Global Hackathons", order: 3, status: "Active" },
      { id: "mt-4", value: "5M+", label: "Campaign Impressions", order: 4, status: "Active" }
    ],
    campaigns: [
      { id: "cp-1", title: "Build in Public", description: "A 30-day challenge where 10,000 developers built and deployed Next.js applications on Vercel.", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200", buttonText: "View Case Study", buttonLink: "#", accentColor: "#D4AF37", status: "Active" }
    ],
    history: {
      eyebrow: "OUR JOURNEY",
      title: "Collaboration History",
      highlightedTitle: "History",
      description: "Since our first brand deal in 2018...",
      cardTitle: "From Startups to Enterprises",
      cardDescription: "A journey of impactful alliances."
    },
    process: [
      { id: "pr-1", stepNumber: "01", title: "Discovery & Alignment", description: "Understanding the brand vision.", order: 1, status: "Active" },
      { id: "pr-2", stepNumber: "02", title: "Creative Strategy", description: "Planning the campaign elements.", order: 2, status: "Active" },
      { id: "pr-3", stepNumber: "03", title: "Production", description: "Executing the creative vision.", order: 3, status: "Active" },
      { id: "pr-4", stepNumber: "04", title: "Launch & Analytics", description: "Deploying and measuring success.", order: 4, status: "Active" }
    ],
    testimonials: [
      { id: "tm-1", quote: "Working with the team has been transformative for our digital presence.", personName: "Sarah Jenkins", designation: "Developer Advocate", company: "Vercel", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150", accentColor: "#D4AF37", status: "Active" }
    ],
    seo: {
      metaTitle: "Brand Collaborations - Zenvora",
      metaDescription: "Explore our exclusive brand cooperations and case studies.",
      keywords: "brands, collaborations, alliances",
      ogImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
    }
  },

  // 3. CAMPAIGNS
  campaigns: [
    {
      id: "camp-1",
      title: "Summer Resort Wear '26",
      brandPartner: "Hermès Paris",
      timeline: "May 2026 - June 2026",
      bannerUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
      metrics: "5.4M Overall Reach, 12,000+ Link Clicks",
      outcome: "Sold out resort collection within 48 hours of campaign drop.",
      detailedDescription: "An exclusive digital runway simulation and interactive HNW lookbook showcasing the Hermès Summer Resort collection, targeting premium tier consumers in the Asia-Pacific region.",
      budget: "$150,000",
      targetAudience: "HNW Individuals, Fashion Collectors",
      kpis: [
        { label: "Overall Reach", value: "5.4M" },
        { label: "Link Clicks", value: "12K" },
        { label: "Sales Revenue", value: "+$1.2M" }
      ],
      isActive: true,
      createdAt: "2026-05-01T08:00:00Z"
    },
    {
      id: "camp-2",
      title: "Timeless Luxury Watches",
      brandPartner: "Rolex",
      timeline: "March 2026 - April 2026",
      bannerUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200",
      metrics: "2.1M High-HNW Target Reached",
      outcome: "Boosted boutique visitor inquiries by 35% in major metros.",
      detailedDescription: "A multi-city private event series and digital luxury watch configurator release highlighting the craftsmanship of vintage Rolex timepieces.",
      budget: "$280,000",
      targetAudience: "Elite Watch Enthusiasts, C-Suite Execs",
      kpis: [
        { label: "VIP Attendance", value: "480" },
        { label: "Boutique Inquiries", value: "+35%" },
        { label: "Social Media Share", value: "24.5K" }
      ],
      isActive: true,
      createdAt: "2026-03-01T09:00:00Z"
    },
    {
      id: "camp-3",
      title: "Sustainable Living & Design",
      brandPartner: "IKEA Signature",
      timeline: "July 2026",
      bannerUrl: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200",
      metrics: "Planned launch: 10M Expected Reach",
      outcome: "Pre-planning stage. High anticipation.",
      detailedDescription: "Upcoming sustainable interior design collaboration highlighting minimalist luxury aesthetics and carbon-neutral luxury furniture assets.",
      budget: "$95,000",
      targetAudience: "Eco-conscious Homeowners, Modern Designers",
      kpis: [
        { label: "Target Impressions", value: "10M" },
        { label: "Pre-registrations", value: "15K" },
        { label: "PR Coverage Outlets", value: "45+" }
      ],
      isActive: false,
      createdAt: "2026-06-15T10:00:00Z"
    }
  ],

  // 4. PRODUCT LAUNCHES
  launches: [
    {
      id: "launch-1",
      productName: "Oasis Fragrance Line",
      launchEventTitle: "Under The Canopy",
      videosList: "https://assets.mixkit.co/videos/preview/mixkit-luxury-perfume-bottle-shining-34289-large.mp4",
      brandDetails: "Co-created with Jo Malone London.",
      releaseDate: "2026-05-15",
      isActive: true,
      createdAt: "2026-05-10T11:00:00Z"
    },
    {
      id: "launch-2",
      productName: "Aura 3D Handbag Edition",
      launchEventTitle: "Futurism Luxury Gala",
      videosList: "https://assets.mixkit.co/videos/preview/mixkit-rotating-luxury-watch-under-light-42171-large.mp4",
      brandDetails: "Limited custom luxury 3D printed bag release.",
      releaseDate: "2026-07-20",
      isActive: true,
      createdAt: "2026-06-25T14:00:00Z"
    }
  ],

  // 5. EVENTS
  events: [
    {
      id: "evt-1",
      eventName: "Mumbai Luxury Summit 2026",
      role: "Keynote Speaker",
      dateTime: "2026-08-15T15:00",
      venue: "Grand Hyatt, Mumbai / Live Streamed",
      guestList: "VVIPs, Fashion Editors, Luxury CEOs",
      highlights: "Delivering the opening address on 'The Future of Immersive Brand Marketing'.",
      isActive: true,
      createdAt: "2026-06-10T08:00:00Z"
    },
    {
      id: "evt-2",
      eventName: "Gucci Cruise Collection Preview",
      role: "Guest Appearance",
      dateTime: "2026-05-02T19:00",
      venue: "Heritage Mansion, New Delhi",
      guestList: "Exclusive Invite-only Brand Ambassadors",
      highlights: "Red carpet attendance, press interviews, and social media takeover.",
      isActive: true,
      createdAt: "2026-04-15T09:00:00Z"
    },
    {
      id: "evt-3",
      eventName: "Social Media Masterclass Live",
      role: "Host",
      dateTime: "2026-09-05T11:00",
      venue: "Virtual Meta Studio",
      guestList: "500 Selected Content Creators",
      highlights: "3-hour intensive workshop covering luxury storytelling, editing, and sponsorships.",
      isActive: false,
      createdAt: "2026-06-20T12:00:00Z"
    }
  ],

  // 6. PORTFOLIO
  portfolioHero: {
    smallHeading: "CURATED SHOWCASES",
    mainHeadingLine1: "VISUAL",
    mainHeadingLine2: "MASTERPIECES",
    highlightText: "MASTERPIECES",
    description: "The executive content management platform for TechMaster's official creator network portfolio, campaigns, and luxury consultation services.",
    bgOverlay: true,
    bgImageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=1920",
    bgVideoUrl: "",
    gradient: "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
    glowEffect: true,
    isVisible: true
  },

  portfolioFilters: [
    { id: "pf-1", name: "Videos", slug: "videos", order: 1, isVisible: true, icon: "Video", color: "#3B82F6" },
    { id: "pf-2", name: "Photos", slug: "photos", order: 2, isVisible: true, icon: "Image", color: "#F43F5E" },
    { id: "pf-3", name: "Projects", slug: "projects", order: 3, isVisible: true, icon: "Monitor", color: "#10B981" },
    { id: "pf-4", name: "Campaigns", slug: "campaigns", order: 4, isVisible: true, icon: "Award", color: "#D4AF37" },
    { id: "pf-5", name: "Reels", slug: "reels", order: 5, isVisible: true, icon: "Smartphone", color: "#8B5CF6" },
    { id: "pf-6", name: "Commercial Shoots", slug: "commercial-shoots", order: 6, isVisible: true, icon: "Camera", color: "#F59E0B" },
    { id: "pf-7", name: "Client Work", slug: "client-work", order: 7, isVisible: true, icon: "Briefcase", color: "#64748B" }
  ],

  portfolio: [
    {
      id: "port-1",
      title: "Chasing Shadows - Noir Fashion Film",
      subtitle: "Cinematic Exploration of Light",
      client: "Vogue India & Chanel",
      category: "Commercial Shoots",
      categories: ["Commercial Shoots", "Videos"],
      year: "2026",
      description: "A breathtaking cinematic exploration of light and shadow, featuring global fashion icons in bespoke haute couture.",
      caseStudy: "The campaign challenged conventional fashion lighting by relying entirely on practical shadow play...",
      externalUrl: "https://vogue.in/chanel-noir",
      projectUrl: "https://chanel.com",
      order: 1,
      sortOrder: 1,
      featured: true,
      status: "Active",
      accentColor: "#D4AF37",
      
      // Media
      coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
      bannerImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1920",
      galleryImages: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800"],
      multipleVideos: ["https://assets.mixkit.co/videos/preview/mixkit-fashion-woman-with-silver-glitter-makeup-40439-large.mp4"],
      youtubeUrl: "",
      vimeoUrl: "",
      
      // Metadata
      tags: ["Cinematography", "Fashion", "VFX"],
      technology: ["Unreal Engine 5", "DaVinci Resolve"],
      industry: "Fashion",
      location: "Mumbai, India",
      duration: "3 Weeks",
      photographer: "Rahul Sharma",
      director: "TechMaster",
      brand: "Chanel",
      agency: "TechMaster Innovations",
      credits: "Styling: Anaita Shroff, VFX: Studio Red",
      awards: "Best Fashion Film 2026",
      
      // SEO
      seoTitle: "Vogue Chanel Shoot - Noir Fashion",
      seoDescription: "View our latest fashion film collaboration with Vogue India.",
      metaKeywords: "Chanel, Vogue, Noir, Fashion Film, TechMaster",
      canonicalUrl: "https://techmaster.com/portfolio/vogue-chanel",
      ogImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      twitterImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      schema: "{}",
      slug: "vogue-chanel-noir",
      
      createdAt: "2026-04-22T08:00:00Z",
      updatedAt: "2026-04-25T10:00:00Z"
    }
  ],

  
  // ==========================================
  // NEW MEGA MEDIA COVERAGE CMS SCHEMAS
  // ==========================================
  mediaHero: {
    badge: "NEWSROOM HUB",
    titleLine1: "Press Kit &",
    titleLine2: "Media Appearances.",
    description: "Welcome to the global archive of all media and press appearances.",
    bgImageUrl: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=1200",
    bgVideoUrl: "",
    overlayEnabled: true,
    overlayOpacity: 0.6,
    buttonText: "View Press Kit",
    buttonLink: "#downloads",
    status: "Active"
  },

  mediaFilters: [
    { id: "mf-1", name: "Photos", slug: "photos", order: 1, isVisible: true },
    { id: "mf-2", name: "Videos", slug: "videos", order: 2, isVisible: true },
    { id: "mf-3", name: "Behind The Scenes", slug: "behind-the-scenes", order: 3, isVisible: true },
    { id: "mf-4", name: "Campaign Images", slug: "campaign-images", order: 4, isVisible: true },
    { id: "mf-5", name: "Events", slug: "events", order: 5, isVisible: true },
    { id: "mf-6", name: "Celebrity Moments", slug: "celebrity-moments", order: 6, isVisible: true },
    { id: "mf-7", name: "Awards", slug: "awards", order: 7, isVisible: true },
    { id: "mf-8", name: "Travel", slug: "travel", order: 8, isVisible: true },
    { id: "mf-9", name: "Lifestyle", slug: "lifestyle", order: 9, isVisible: true },
    { id: "mf-10", name: "Interviews", slug: "interviews", order: 10, isVisible: true },
    { id: "mf-11", name: "Press Releases", slug: "press-releases", order: 11, isVisible: true },
    { id: "mf-12", name: "Podcasts", slug: "podcasts", order: 12, isVisible: true },
    { id: "mf-13", name: "TV Features", slug: "tv-features", order: 13, isVisible: true },
    { id: "mf-14", name: "Magazine Features", slug: "magazine-features", order: 14, isVisible: true }
  ],

  mediaCategories: [
    { id: "mc-1", name: "Photos", isVisible: true },
    { id: "mc-2", name: "Videos", isVisible: true },
    { id: "mc-3", name: "Behind The Scenes", isVisible: true },
    { id: "mc-4", name: "Campaign Images", isVisible: true },
    { id: "mc-5", name: "Events", isVisible: true },
    { id: "mc-6", name: "Celebrity Moments", isVisible: true },
    { id: "mc-7", name: "Awards", isVisible: true },
    { id: "mc-8", name: "Travel", isVisible: true },
    { id: "mc-9", name: "Lifestyle", isVisible: true },
    { id: "mc-10", name: "Interviews", isVisible: true },
    { id: "mc-11", name: "Press Releases", isVisible: true },
    { id: "mc-12", name: "Podcasts", isVisible: true },
    { id: "mc-13", name: "TV Features", isVisible: true },
    { id: "mc-14", name: "Magazine Features", isVisible: true }
  ],

  mediaShowreels: [
    {
      id: "sr-1",
      title: "Core Presentation Showreel",
      description: "A comprehensive look into the luxury creator economy and premium VIP setups.",
      thumbnail: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800",
      videoUrl: "https://youtube.com/embed/example",
      duration: "02:45",
      category: "Videos",
      featured: true,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  mediaDownloads: [
    {
      id: "dl-1",
      title: "Official Press Kit 2026",
      description: "Comprehensive brand guidelines, high-res portraits, and executive bios.",
      thumbnail: "",
      fileUrl: "https://example.com/presskit.pdf",
      fileType: "PDF",
      fileSize: "12.5 MB",
      buttonText: "Download PDF",
      order: 1,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  mediaMentions: [
    {
      id: "mm-1",
      title: "TechMaster Redefines the Luxury Creator Economy",
      mediaOutlet: "Forbes India",
      author: "Jane Doe",
      publishDate: "2026-04-10",
      url: "https://forbes.com",
      thumbnail: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=600",
      shortDescription: "Exclusive feature on building a HNW digital creative empire.",
      fullDescription: "In this exclusive feature, Forbes India explores how TechMaster built a HNW digital creative empire, bridging high-end luxury houses with the modern creator economy through custom 3D web configurations and storytelling.",
      category: "Press Releases",
      format: "Magazine",
      featured: true,
      active: true,
      tags: ["Luxury", "Creator", "Forbes"],
      seoTitle: "Forbes India Feature - TechMaster",
      seoDescription: "Exclusive feature on building a HNW digital creative empire.",
      seoKeywords: "Forbes, Luxury, Creator Economy",
      slug: "forbes-india-redefines",
      canonicalUrl: "",
      schemaType: "Article",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],

  mediaGallery: [
    {
      id: "mg-1",
      title: "Vogue Paris Editorial Cover",
      subtitle: "Winter Collection Exclusive",
      description: "A comprehensive look behind the scenes of the Vogue Paris winter editorial shoot.",
      shortDescription: "Behind the scenes of the Vogue Paris shoot.",
      category: "Magazine Features",
      mediaType: "Multiple Images",
      thumbnail: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=600",
      coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      previewImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
      featuredImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      mediaFile: "",
      mediaUrl: "",
      mediaDuration: "",
      resolution: "4K (3840x2160)",
      fileSize: "24.5 MB",
      language: "French",
      author: "Vogue Editorial Team",
      photographer: "Jean-Paul Gautier",
      videographer: "",
      publishDate: "2026-11-15",
      order: 1,
      isFeatured: true,
      isTrending: true,
      isLatest: false,
      isPinned: false,
      isPopular: true,
      isEditorsPick: true,
      isHeroBanner: false,
      isHomepageFeatured: true,
      status: "Published",
      albumFiles: [
        { url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200", type: "image", caption: "Cover Shot", altText: "Model on cover" },
        { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=1200", type: "image", caption: "Look 1", altText: "Winter coat" },
        { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200", type: "image", caption: "Look 2", altText: "Noir dress" }
      ],
      tags: ["Magazine", "Fashion", "Paris", "Editorial", "Winter"],
      seoTitle: "Vogue Paris Editorial Cover | TechMaster",
      seoDescription: "Exclusive behind the scenes of the Vogue Paris winter editorial shoot featuring luxury configurations.",
      seoKeywords: "Vogue, Paris, Editorial, Luxury, Configurator",
      slug: "vogue-paris-editorial-winter",
      ogImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      twitterImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
      canonicalUrl: "https://techmaster.com/gallery/vogue-paris-editorial-winter",
      schemaType: "ImageGallery",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ],
  // ==========================================

  // 8. MEDIA COVERAGE
  coverage: [
    {
      id: "cov-1",
      title: "TechMaster Redefines the Luxury Creator Economy",
      mediaOutlet: "Forbes India",
      format: "Press Releases",
      date: "2026-04-10",
      url: "https://forbes.com",
      thumbnail: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=600",
      detailedExcerpt: "In this exclusive feature, Forbes India explores how TechMaster built a HNW digital creative empire, bridging high-end luxury houses with the modern creator economy through custom 3D web configurations and storytelling.",
      metrics: "850K Readership",
      isActive: true,
      createdAt: "2026-04-11T09:00:00Z"
    },
    {
      id: "cov-2",
      title: "Building A Global Personal Brand: Interview",
      mediaOutlet: "The Creator Podcast",
      format: "Podcasts",
      date: "2026-05-18",
      url: "https://youtube.com",
      thumbnail: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=600",
      detailedExcerpt: "A comprehensive 1-hour interview discussing luxury brand positioning, high-net-worth customer engagement, and why video production is the future of personal branding.",
      metrics: "1.2M Podcast Streams",
      isActive: true,
      createdAt: "2026-05-19T10:00:00Z"
    },
    {
      id: "cov-3",
      title: "Luxury Trends to Watch in 2026",
      mediaOutlet: "Vogue Business",
      format: "Magazine Features",
      date: "2026-06-01",
      url: "https://vogue.in",
      thumbnail: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&q=80&w=600",
      detailedExcerpt: "TechMaster shares her expert predictions on the merge between virtual luxury clothing configurators and physical showroom VIP invitation strategies.",
      metrics: "Featured Editorial Cover",
      isActive: true,
      createdAt: "2026-06-02T11:00:00Z"
    }
  ],

  // 9. TESTIMONIALS
  testimonials: [
    {
      id: "test-1",
      name: "Sabrina D'Souza",
      role: "Brand Director, Armani Beauty",
      quote: "TechMaster brings unparalleled professionalism and a meticulous eye for luxury aesthetic. Our Armani campaign exceeded all engagement forecasts.",
      rating: 5,
      videoUrl: "",
      isVerified: true,
      isActive: true,
      createdAt: "2026-04-05T08:00:00Z"
    },
    {
      id: "test-2",
      name: "Marcus Vance",
      role: "CEO, Prestige Group UK",
      quote: "Her keynote on high-net-worth consumer psychology was the highlight of our annual summit. Brilliant communicator.",
      rating: 5,
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-business-woman-in-front-of-screen-41712-large.mp4",
      isVerified: true,
      isActive: true,
      createdAt: "2026-05-20T10:00:00Z"
    },
    {
      id: "test-3",
      name: "Pooja Malhotra",
      role: "Marketing VP, DLF Luxury Homes",
      quote: "Incredibly smooth collaboration. She takes active direction and respects the luxury code of our brand.",
      rating: 4,
      videoUrl: "",
      isVerified: false,
      isActive: false,
      createdAt: "2026-06-08T12:00:00Z"
    }
  ],

  // 10. CAREERS
  careers: [
    {
      id: "job-1",
      title: "Creative Video Producer & Editor",
      department: "Production",
      type: "Full-time",
      location: "Mumbai (Hybrid)",
      description: "Looking for an elite video editor and producer to storyboard and edit commercial reels, cinematic YouTube videos, and brand collaborations.",
      requirements: "3+ years editing for luxury brands, advanced knowledge of Premiere/FCP/DaVinci, experience with 3D elements/animations a plus.",
      benefits: "Premium workspace in South Mumbai, competitive luxury scale package, travel budgets, health insurance, access to exclusive industry events.",
      isActive: true,
      createdAt: "2026-06-01T08:00:00Z"
    },
    {
      id: "job-2",
      title: "Luxury Public Relations (PR) Associate",
      department: "Marketing",
      type: "Full-time",
      location: "Mumbai",
      description: "Manage relationships with luxury fashion publications, schedule press releases, coordinate brand invites, and maintain the VIP media database.",
      requirements: "Experience working with fashion or luxury agencies, stellar written English, established contacts at major Indian and global lifestyle publications.",
      benefits: "Performance bonuses, clothing allowance, top-tier health cover, direct mentorship.",
      isActive: true,
      createdAt: "2026-06-10T10:00:00Z"
    },
    {
      id: "job-3",
      title: "3D Motion Graphics Intern",
      department: "Creative Consulting",
      type: "Internship",
      location: "Remote",
      description: "Create premium 3D assets, glassmorphic UI interactions, and floating abstract graphics to be featured on social channels and the official web portal.",
      requirements: "Proficient in Blender, Cinema4D, or After Effects. Strong sense of premium layouts, gradients, and physics-based animations.",
      benefits: "Internship certificate, performance stipend, high potential for transition to full-time.",
      isActive: false,
      createdAt: "2026-06-20T12:00:00Z"
    },
    {
      id: "job-4",
      title: "Freelance Luxury Brand Copywriter",
      department: "Marketing",
      type: "Freelance",
      location: "Remote",
      description: "Craft premium storytelling copy for high-end brand campaigns, product launches, and luxury creator collaborations.",
      requirements: "Experience writing for fashion or luxury lifestyle brands, strong narrative voice, and quick turnaround capacity.",
      benefits: "Flexible schedule, project-based compensation, exposure to elite brand partnerships.",
      isActive: true,
      createdAt: "2026-06-25T10:00:00Z"
    }
  ],

  // 11. RESUME LIST
  resumes: [
    {
      id: "res-1",
      candidateName: "Rohan Varma",
      email: "rohan.varma@gmail.com",
      phone: "+91 98765 43210",
      jobApplied: "Creative Video Producer & Editor",
      experienceYears: 4,
      portfolioLink: "https://vimeo.com/rohandev",
      status: "Reviewed",
      resumeFileName: "Rohan_Varma_Showreel_2026.pdf",
      coverLetter: "Hi TechMaster, I have been editing fashion documentaries for 4 years. I understand the luxury aesthetic, color grading, and timing. I would love to join your team.",
      appliedAt: "2026-06-05T09:30:00Z"
    },
    {
      id: "res-2",
      candidateName: "Neha Kapoor",
      email: "neha.kapoor@outlook.com",
      phone: "+91 99999 88888",
      jobApplied: "Luxury Public Relations (PR) Associate",
      experienceYears: 2,
      portfolioLink: "https://linkedin.com/in/nehakapoor",
      status: "New",
      resumeFileName: "Neha_Kapoor_Resume.pdf",
      coverLetter: "I recently handled PR for the Elle Luxury Awards and have deep contacts inside Vogue and GQ. Let's take the brand to the next tier.",
      appliedAt: "2026-06-12T14:15:00Z"
    },
    {
      id: "res-3",
      candidateName: "Aleksei Ivanov",
      email: "aleksei.3d@artstation.com",
      phone: "+7 900 123 4567",
      jobApplied: "3D Motion Graphics Intern",
      experienceYears: 1,
      portfolioLink: "https://artstation.com/aleksei3d",
      status: "Rejected",
      resumeFileName: "Aleksei_Ivanov_Portfolio.pdf",
      coverLetter: "Interested in the Remote 3D Internship. I specialize in luxury glass materials and liquid simulation.",
      appliedAt: "2026-06-22T16:00:00Z"
    }
  ],

  // 12. BLOG MANAGEMENT
  blogs: [
    {
      id: "blog-1",
      title: "The Art of Golden Ratios in Modern Luxury Branding",
      slug: "art-of-golden-ratios-luxury-branding",
      category: "Branding",
      readTime: "5 min read",
      content: "Luxury branding is not just about a clean logo; it's about strict geometric harmony. In this article, we explore how the historical golden ratio is applied in high-fashion campaigns (like Chanel and Dior) to invoke an unconscious feeling of quality. From layout compositions to physical retail spaces, we break down the rules of visual scale and why minimalism is the ultimate luxury.",
      tags: ["Luxury", "Geometry", "Design Laws"],
      coverImage: "https://images.unsplash.com/photo-1507208773393-40d9fc670acf?auto=format&fit=crop&q=80&w=800",
      publishDate: "2026-05-20",
      author: "TechMaster",
      status: "published",
      createdAt: "2026-05-19T08:00:00Z"
    },
    {
      id: "blog-2",
      title: "From 10k to 1M: Storytelling Pacing That Retains Premium Audiences",
      slug: "storytelling-pacing-premium-audiences",
      category: "Creator Journey",
      readTime: "7 min read",
      content: "Audience retention on social media is traditionally optimized for high-energy hooks and rapid jumps. However, luxury brands require a different pacing—one that is slow, deliberate, and immersive. Learn why cinematic cinematography, ambient audio design, and micro-interactions perform better when targeting high-income demographics.",
      tags: ["Marketing", "Analytics", "Editing"],
      coverImage: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800",
      publishDate: "2026-06-12",
      author: "TechMaster",
      status: "published",
      createdAt: "2026-06-10T10:00:00Z"
    },
    {
      id: "blog-3",
      title: "Behind the Scenes of the Amalfi Coast Production",
      slug: "behind-scenes-amalfi-production",
      category: "Lifestyle",
      readTime: "4 min read",
      content: "Drafting the logistical journey of coordinating a luxury video shoot in southern Italy. We discuss equipment shipping, securing brand permissions, and shooting in unpredictable lighting conditions.",
      tags: ["Travel", "Production", "Amalfi"],
      coverImage: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&q=80&w=800",
      publishDate: "2026-06-28",
      author: "TechMaster",
      status: "published",
      createdAt: "2026-06-28T15:00:00Z"
    },
    {
      id: "blog-4",
      title: "10 Aesthetic Rules for HNW Digital Marketing",
      slug: "aesthetic-rules-hnw-digital-marketing",
      category: "Marketing",
      readTime: "6 min read",
      content: "High-net-worth consumers do not react to standard advertising triggers. In this column, we analyze the 10 core aesthetic guidelines for luxury digital marketing: color space constraints, quiet copywriting, typography licensing, and utilizing interactive custom WebGL frameworks to build digital showrooms.",
      tags: ["Marketing", "HNW", "Luxury Rules"],
      coverImage: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800",
      publishDate: "2026-07-01",
      author: "TechMaster",
      status: "published",
      createdAt: "2026-07-01T09:00:00Z"
    },
    {
      id: "blog-5",
      title: "5 Tips for Curating Consistent Social Media Feeds",
      slug: "tips-consistent-social-media-feeds",
      category: "Tips",
      readTime: "3 min read",
      content: "A quick checklist for visual creators trying to build clean grid flows. We detail the physics of lighting matching, contrast limits, selecting secondary accent colors, and scheduling tools to preview layout templates before publishing.",
      tags: ["Tips", "Social Grid", "Content Creation"],
      coverImage: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800",
      publishDate: "2026-07-03",
      author: "TechMaster",
      status: "published",
      createdAt: "2026-07-02T11:00:00Z"
    },
    {
      id: "blog-6",
      title: "Vogue Press Cover: Visual Media Trends in 2026",
      slug: "vogue-press-cover-media-trends",
      category: "Latest News",
      readTime: "4 min read",
      content: "TechMaster is featured on the latest digital cover of Vogue Business. The editorial interview details why interactive 3D media assets and real-time custom product configurations are overriding traditional video banners.",
      tags: ["Vogue", "Latest News", "Press Coverage"],
      coverImage: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=800",
      publishDate: "2026-07-05",
      author: "TechMaster",
      status: "published",
      createdAt: "2026-07-04T14:00:00Z"
    }
  ],

  // 13. CONTACT ENQUIRIES
  enquiries: [
    {
      id: "enq-1",
      senderName: "Gabriella Rossi",
      email: "g.rossi@dolcegabbana.it",
      subject: "Luxury Campaign Brand Ambassador Booking",
      message: "Dear TechMaster, We are planning our Winter '26 Cruise campaign launch in Lake Como and would love to discuss booking you for our opening event and a series of 3 short-form commercial reels. Let us know your availability for a brief call next week.",
      category: "Booking",
      date: "2026-06-29T10:30:00Z",
      status: "Unread"
    },
    {
      id: "enq-2",
      senderName: "Vikram Sen",
      email: "vikram@timesgroup.com",
      subject: "Invitation to Speak: India Creator Summit",
      message: "Hello TechMaster, We would like to invite you as our key speaker for the 'Elite Creators' track. We expect an audience of 1,200 aspiring digital marketers and creators.",
      category: "Sponsorship",
      date: "2026-06-25T14:00:00Z",
      status: "Read"
    },
    {
      id: "enq-3",
      senderName: "Claire Dupont",
      email: "claire.dupont@loreal.com",
      subject: "Collaborative Product Release Proposal",
      message: "Greetings. Loreal Luxe division is researching co-branded launches for Q4. Your profile matches our target demographic perfectly.",
      category: "Booking",
      date: "2026-06-20T09:00:00Z",
      status: "Replied"
    }
  ],

  // 14. SEO SETTINGS
  seo: [
    {
      id: "seo-home",
      page: "Homepage",
      title: "TechMaster | Premium Creator, Speaker & Luxury Brand Consultant",
      description: "Explore the official portfolio, collaborations, events, and business services of TechMaster, establishing standard authority in the luxury digital landscape.",
      keywords: "TechMaster, Luxury consultant, Personal branding, Vogue influencer, Keynote speaker, Fashion creator",
      ogTitle: "TechMaster - Official Personal Brand Portal",
      ogType: "website",
      ogImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "seo-about",
      page: "About",
      title: "About TechMaster | Personal Story & Professional Core Values",
      description: "Read the story of TechMaster, her creative vision, career history, awards, achievements, and roadmap for future business ventures.",
      keywords: "TechMaster story, Biography, Career achievements, Awards, Vision and core values",
      ogTitle: "About TechMaster - The Founder's Journey",
      ogType: "profile",
      ogImage: "https://images.unsplash.com/photo-1542435503-956c469947f6?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: "seo-services",
      page: "Services",
      title: "Premium Services | Creative Direction, Consulting & Speakerships",
      description: "Scale your high-end brand using tailored marketing programs, content creation strategies, and public speaking arrangements by TechMaster.",
      keywords: "Luxury marketing service, Hire luxury creator, Brand consulting, Creator workshop speaker",
      ogTitle: "Luxury Branding Services & Consultation Packages",
      ogType: "product",
      ogImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800"
    }
  ],

  // 15. USER MANAGEMENT
  users: [
    {
      id: "usr-1",
      name: "TechMaster",
      email: "admin@techmaster.com",
      role: "Super Admin",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      status: "Active",
      lastActive: "2026-07-02T12:00:00Z"
    },
    {
      id: "usr-2",
      name: "Taran Malhotra",
      email: "taran@zenvoracreative.com",
      role: "Editor",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
      status: "Active",
      lastActive: "2026-07-02T10:45:00Z"
    },
    {
      id: "usr-3",
      name: "Sophia Reed",
      email: "sophia.analytics@gmail.com",
      role: "Analyst",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150",
      status: "Suspended",
      lastActive: "2026-06-28T16:30:00Z"
    }
  ],

  // 16. HOMEPAGE MANAGEMENT
  homepage: {
    customSections: [],
    coreValues: [
      { id: "cv-1", title: "Innovation", subtitle: "Future Ready", valueName: "Constant Innovation", description: "Pushing the boundaries of immersive technology.", longDescription: "We constantly strive to push the boundaries of immersive 3D technology by leveraging React Three Fiber and GSAP.", icon: "Sparkles", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300", order: 1, status: "Active" }
    ],
    statistics: [
      { id: "st-new-1", counterNumber: "7", counterLabel: "Years Active", icon: "History", animationToggle: true, order: 1, activeToggle: true },
      { id: "st-new-2", counterNumber: "45", counterLabel: "Elite Brands", icon: "Users", animationToggle: true, order: 2, activeToggle: true }
    ],
    newsletter: {
      smallHeading: "Stay Updated",
      mainHeading: "Join Our Elite Newsletter",
      description: "Get the latest luxury insights directly in your inbox.",
      placeholderText: "Enter your email address...",
      buttonText: "Subscribe Now",
      backgroundImage: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800",
      backgroundVideo: "",
      leftIllustration: "",
      rightIllustration: "",
      successMessage: "Thank you for subscribing!",
      errorMessage: "Something went wrong. Please try again.",
      enableNewsletter: true,
      enableEmailValidation: true,  enableAnimation: true,
      privacyText: "We respect your privacy. No spam ever.",
      enableAutoResponse: true,
      subscribers: [
        { id: "sub-1", name: "John Doe", email: "john@example.com", subscriptionDate: "2026-07-10T10:00:00Z", status: "Subscribed" },
        { id: "sub-2", name: "Jane Smith", email: "jane@example.com", subscriptionDate: "2026-07-09T14:30:00Z", status: "Unsubscribed" }
      ]
    },
    events: {
      sectionTitle: "Upcoming Events",
      subtitle: "Join our exclusive gatherings",
      description: "Discover where we'll be next.",  list: [
        { id: "ev-1", eventImage: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800", eventBanner: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=1200", eventThumbnail: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400", eventGalleryImages: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800,https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800", eventVideo: "https://assets.mixkit.co/videos/preview/mixkit-glitter-particles-swirling-in-water-43289-large.mp4", eventReel: "https://assets.mixkit.co/videos/preview/mixkit-glitter-particles-swirling-in-water-43289-large.mp4", eventName: "Luxury Tech Summit 2026", eventDate: "2026-09-15", eventTime: "10:00 AM", eventLocation: "Paris, France", eventCategory: "Conference", speaker: "TechMaster", shortDescription: "Annual gathering of luxury tech leaders.", fullDescription: "Join us for the most exclusive luxury technology summit in the world.", registrationButtonText: "Register Now", registrationUrl: "/events/register", featuredToggle: true, activeToggle: true, status: "Active" }
      ]
    },
    hero: {
      title: "TECHMASTER INNOVATIONS",
      highlightTitle: "Future of Digital Operations",
      subtitle: "Enterprise Grade Systems & Creative Productions",
      description: "We engineer high-fidelity visual platforms, customized automation systems, and high-performance branding campaigns.",
      desktopImageUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800",
      mobileImageUrl: "",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glitter-particles-swirling-in-water-43289-large.mp4",
      ctaButtonText: "Explore Systems",
      ctaButtonUrl: "/portfolio-gallery",
      order: 1,
      status: "Active"
    },
    heroSlides: [
      { id: "slide-1", title: "Enterprise Automation", subtitle: "Industrial Operations", description: "Bespoke digital architecture solutions engineered for global firms.", mediaUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800", mediaType: "image", buttonText: "Learn More", buttonUrl: "/services", order: 1, status: "Active" }
    ],
    videoSlider: [
      { id: "vs-1", title: "Corporate Showreel 2026", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glitter-particles-swirling-in-water-43289-large.mp4", thumbnailUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600", description: "A cinematic review of completed high-tech system deployments.", redirectUrl: "/portfolio-gallery", order: 1, status: "Active" }
    ],
    reels: [
      { id: "reel-1", title: "System UI Flow Showcase", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glitter-particles-swirling-in-water-43289-large.mp4", thumbnailUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600", category: "Behind the Scenes", duration: "0:30", order: 1, status: "Active" }
    ],
    shorts: [
      { id: "short-1", title: "Vite Hot Reload Optimization", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glitter-particles-swirling-in-water-43289-large.mp4", thumbnailUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600", category: "Tech Hacks", order: 1, status: "Active" }
    ],
    longVideos: [
      { id: "lv-1", title: "Full Scale React Admin Architecture Setup", description: "An in-depth tutorial on building decoupled dynamic database provider frameworks with local storage fallbacks.", videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-glitter-particles-swirling-in-water-43289-large.mp4", thumbnailUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600", category: "Architecture", duration: "18:45", order: 1, status: "Active" }
    ],
    featuredProjects: [
      { id: "fp-1", title: "Zenvora Luxury CGI Campaign", description: "Bespoke 3D CGI campaign framework with interactive web-XR layouts.", thumbnailUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600", previewImageUrl: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600", previewVideoUrl: "", redirectLink: "/portfolio-gallery", order: 1, status: "Active" }
    ],
    servicesPreview: [
      { id: "sp-1", name: "Custom CGI Pipelines", iconUrl: "", description: "High-fidelity commercial 3D render pipelines customized for premium brands.", redirectLink: "/services", order: 1, status: "Active" },
      { id: "sp-2", name: "Influencer Amplification", iconUrl: "", description: "Strategic distribution networks targeting qualified luxury leads.", redirectLink: "/services", order: 2, status: "Active" }
    ],
    clientLogos: [
      { id: "cl-1", clientName: "Vogue Network", logoUrl: "https://images.unsplash.com/photo-1627163430005-502a0a2df335?auto=format&fit=crop&q=80&w=150", websiteLink: "https://vogue.in", order: 1, status: "Active" },
      { id: "cl-2", clientName: "Gucci Luxury", logoUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=150", websiteLink: "https://gucci.com", order: 2, status: "Active" }
    ],
    statisticsCounters: [
      { id: "st-1", number: "7", prefix: "", suffix: "+", label: "Years Active", icon: "History", order: 1, status: "Active" },
      { id: "st-2", number: "45", prefix: "", suffix: "+", label: "Elite Brands", icon: "Users", order: 2, status: "Active" },
      { id: "st-3", number: "15", prefix: "", suffix: "M+", label: "Campaign Reach", icon: "TrendingUp", order: 3, status: "Active" }
    ],
    whyChooseUs: [
      { id: "wcu-1", title: "Aesthetic Perfection", description: "No placeholders. Every pixel complies with professional design ratios.", iconUrl: "Sparkles", order: 1, status: "Active" },
      { id: "wcu-2", title: "Strategic Precision", description: "Our campaign metrics align directly with qualified client conversion rates.", iconUrl: "ShieldCheck", order: 2, status: "Active" }
    ],
    galleryPreview: [
      { id: "gp-1", imageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=600", title: "CGI Bottle Render Model", category: "CGI CGI", order: 1, status: "Active" }
    ],
    homeCta: {
      title: "TRANSFORM YOUR DIGITAL IDENTITY",
      description: "Discuss a collaboration project with our high-end creator consulting agency.",
      buttonText: "Schedule Consultation",
      buttonUrl: "/faq-contact",
      bgImageUrl: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
      status: "Active"
    },
    testimonialsPreview: [
      { id: "tp-1", clientName: "Gabriella Rossi", designation: "Creative Director", company: "Gucci Milan", profileImageUrl: "", review: "TechMaster's cinematic visual storytelling elevated our commercial digital launches to art-film quality.", rating: 5, order: 1, status: "Active" }
    ],
    seo: {
      metaTitle: "TechMaster Innovations | Luxury Creator Agency",
      metaDescription: "Cinematic commercial content direction and premium digital branding.",
      metaKeywords: "CGI, Production, Strategy, Marketing, High-End",
      ogImage: ""
    }
  },

  // 17. ABOUT MANAGEMENT
  about: {
    introduction: {
      founderName: "TechMaster",
      designation: "Digital Luxury Consultant",
      subtitle: "Bespoke digital brand experiences",
      shortDescription: "TechMaster is a Mumbai-based creative director, public speaker, and luxury brand consultant specializing in HNW marketing.",
      fullBiography: "Starting her career in boutique marketing agencies, TechMaster recognized a critical gap in the creator economy: the lack of high-fidelity, cinema-grade storytelling for high-end brands. In 2021, she launched her independent consultancy, bridging the gap between social media virality and the strict heritage codes of elite global fashion, hospitality, and luxury automotive industries.",
      profileImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
      mobileImageUrl: "",
      imageAltText: "TechMaster Portrait",
      ctaButtonText: "Schedule Consultation",
      ctaButtonLink: "/faq-contact",
      openInNewTab: false,
      buttonVisible: true,
      status: "Active"
    },
    philosophy: {
      title: "Philosophy",
      description: "Design is not just style. It is the core operating interface of premium businesses.",
      iconUrl: "Sparkles",
      status: "Active"
    },
    mission: {
      title: "Mission",
      description: "To make high-fidelity, cinema-grade design concepts and interactive systems accessible to every modern enterprise.",
      iconUrl: "Target",
      status: "Active"
    },
    vision: {
      title: "Vision",
      description: "To cultivate a new era of creator-led agency campaigns that rival traditional print editorials and cinematic television spots in design quality.",
      iconUrl: "Eye",
      status: "Active"
    },
    story: {
      title: "Our Story & Passion",
      subtitle: "Crafting narratives that inspire",
      description: "It all started with a simple belief: education should not be confined to boring lectures. We set out to create an ecosystem where code meets creativity. Our passion is fueled by the desire to ignite the same spark in others, turning complex algorithms into compelling visual narratives.\n\nWe live and breathe technology. Every late-night coding session, every bug fixed, and every project shipped is a testament to our unwavering dedication to the craft. Our story is just beginning, and our passion is what keeps us moving forward.",
      imageUrl: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80",
      status: "Active"
    },
    highlights: [
      { id: "hl-1", number: "8", prefix: "", suffix: "+", label: "Years Experience", order: 1, status: "Active" },
      { id: "hl-2", number: "45", prefix: "", suffix: "+", label: "Premium Brands", order: 2, status: "Active" },
      { id: "hl-3", number: "12", prefix: "", suffix: "M+", label: "Campaign Reach", order: 3, status: "Active" }
    ],
    achievements: [
      { id: "ach-1", title: "Developer of the Year", description: "Awarded at Global Tech Summit for innovations in modular interface development.", year: "2021", iconUrl: "🏆", order: 1, status: "Active" },
      { id: "ach-2", title: "Best Educational Platform", description: "Recognized for pioneers in interactive video syllabus course designs.", year: "2023", iconUrl: "🥇", order: 2, status: "Active" }
    ],
    awards: [
      { id: "aw-1", name: "Best Educational Platform", organization: "EdTech Innovation Awards", year: "2023", description: "Recognized for pioneers in interactive video syllabus course designs.", imageUrl: "🥇", order: 1, status: "Active" }
    ],
    experience: [
      { id: "exp-1", logoUrl: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80&w=150", companyName: "TechGiants", designation: "Senior Architect", location: "Mumbai, India", startDate: "2018-06-01", endDate: "2022-09-30", description: "Spearheaded the development of scalable microservices architectures.", order: 1, status: "Active" }
    ],
    seo: {
      metaTitle: "About TechMaster | Premium Creator CMS",
      metaDescription: "Professional biography and system portfolio details.",
      metaKeywords: "Luxury, Strategy, Creative",
      ogImageUrl: ""
    },
    sectionSettings: {
      introduction: { order: 1, status: "Active" },
      philosophy: { order: 2, status: "Active" },
      mission: { order: 3, status: "Active" },
      vision: { order: 4, status: "Active" },
      story: { order: 5, status: "Active" },
      highlights: { order: 6, status: "Active" },
      achievements: { order: 7, status: "Active" },
      awards: { order: 8, status: "Active" },
      experience: { order: 9, status: "Active" },
      seo: { order: 10, status: "Active" }
    }
  },

  // 18. FOUNDER JOURNEY MANAGEMENT
  founderJourney: {
    hero: {
      badgeText: "FOUNDER CHRONICLES",
      heading: "The Journey of",
      highlightWord: "Tech Master",
      description: "Tracing the evolution of Aman's personal brand from writing basic pointers on a whiteboard in 2015 to building global tech learning ecosystems.",
      scrollIndicatorText: "Explore timeline",
      scrollIndicatorVisible: true,
      status: "Active"
    },
    timelineSettings: {
      heading: "Founder Journey Timeline",
      description: "Chronological narrative line mapping career beginning, years, milestones, and custom graphics.",
      lineColor: "rgba(255,255,255,0.1)",
      activeLineColor: "#D4AF37",
      status: "Active"
    },
    milestones: [
      { id: "fj-2021", year: "2021", subtitle: "Two New Channels. One New Hire.", title: "Two New Channels. One New Hire.", description: "What was a one-person project became three. Two new channels launched, and Tech Master brought on its very first employee — the exact moment \"someone's channel\" started becoming a company.", category: "Milestone", order: 1, status: "Active" },
      { id: "fj-2022", year: "2022", subtitle: "First Brand Deal. First Studio.", title: "First Brand Deal. First Studio.", description: "A brand trusted us before we were \"big enough\" to matter. That trust funded our first real studio — the day content stopped being made out of a bedroom.", category: "Milestone", order: 2, status: "Active" },
      { id: "fj-2023", year: "2023", subtitle: "10 Million and Counting", title: "10 Million and Counting", description: "Tech Master Shorts crossed 10 million subscribers. An experiment had become a category of its own.", category: "Milestone", order: 3, status: "Active" },
      { id: "fj-2024", year: "2024", subtitle: "25+ People. Seven Play Buttons.", title: "25+ People. Seven Play Buttons.", description: "Twenty-five people, one mission, seven Play Buttons on the wall. Proof this stopped being one person's story a long time ago.", category: "Milestone", order: 4, status: "Active" },
      { id: "fj-2025", year: "2025", subtitle: "The Most-Subscribed Tech Creator on the Planet", title: "The Most-Subscribed Tech Creator on the Planet", description: "Every all-nighter, every idea that almost got cut, every video that didn't work until it did — it all built to this. Tech Master became the most-subscribed tech creator in the world.", category: "Milestone", order: 5, status: "Active" },
      { id: "fj-2026", year: "2026", subtitle: "20 Billion Views. No One Else Has Done This.", title: "20 Billion Views. No One Else Has Done This.", description: "The first tech creator in the world to cross 20 billion views on a single channel. The most-followed tech creator on Instagram, in the same year. Some milestones take a lifetime. We're just getting started.", category: "Milestone", order: 6, status: "Active" }
    ],
    highlights: [
      { id: "hl-1", icon: "👶", title: "Childhood", description: "Early fascination with computers, dismantling old radios and writing basic HTML on a Windows 95 machine.", order: 1, status: "Active" },
      { id: "hl-2", icon: "🚀", title: "Career Beginning", description: "Started as a junior developer in a local agency, learning the ropes of production-level code and client management.", order: 2, status: "Active" },
      { id: "hl-3", icon: "🤝", title: "First Brand Collab", description: "Partnering with a major tech hardware brand to produce a series of educational videos, marking the first sponsorship.", order: 3, status: "Active" },
      { id: "hl-4", icon: "📱", title: "Social Media Journey", description: "From 0 to 2.5 Million subscribers, navigating algorithm changes, burnout, and discovering a unique educational voice.", order: 4, status: "Active" }
    ],
    categories: [
      { id: "cat-1", title: "Childhood", description: "Early childhood memories, learning experiences, and initial technical hobbies.", order: 1, status: "Active" },
      { id: "cat-2", title: "Career Beginning", description: "Corporate roles, first jobs, and coding benchmarks.", order: 2, status: "Active" },
      { id: "cat-3", title: "Brand Collaboration", description: "Dynamic sponsorship projects and creative campaigns.", order: 3, status: "Active" }
    ],
    futureVision: {
      heading: "The Horizon of Immersive Media",
      subtitle: "Driving dynamic visual architectures",
      description: "Driving dynamic visual architectures across global operations networks.",
      status: "Active"
    },
    statistics: [
      { id: "stat-1", number: "2.5M+", prefix: "", suffix: "", title: "YouTube Subscribers", order: 1, status: "Active" },
      { id: "stat-2", number: "150+", prefix: "", suffix: "", title: "Tech Tutorials Published", order: 2, status: "Active" }
    ],
    seo: {
      metaTitle: "TechMaster Innovations | Founder Journey",
      metaDescription: "Follow Aman's professional timeline, achievements, and statistics.",
      metaKeywords: "Journey, Timeline, GSAP, Founder",
      ogImageUrl: ""
    },
    sectionSettings: {
      hero: { order: 1, status: "Active" },
      timelineSettings: { order: 2, status: "Active" },
      milestones: { order: 3, status: "Active" },
      highlights: { order: 4, status: "Active" },
      categories: { order: 5, status: "Active" },
      futureVision: { order: 6, status: "Active" },
      statistics: { order: 7, status: "Active" },
      seo: { order: 8, status: "Active" }
    }
  },

  // 19. MISSION & VISION
  missionVision: {
    hero: {
      smallLabel: "OUR NORTH STAR",
      headline: "Democratizing",
      highlightWord: "Tech Literacy",
      description: "We believe high-quality engineering curricula shouldn't be locked behind expensive student debts. Aman is building the tools to make code accessible to every curious mind on earth.",
      backgroundImage: "",
      backgroundVideo: "",
      button1Text: "Explore Courses",
      button1Link: "/courses",
      button2Text: "Join Community",
      button2Link: "/community",
      scrollIndicatorVisible: true,
      status: "Active"
    },
    mission: {
      heading: "To inspire, educate, and place the next million developers.",
      subHeading: "THE MISSION STATEMENT",
      description: "Our target is to break down complex system design systems, database architectures, and compiler dynamics into engaging, cinematic formats.",
      leftBorderColor: "#D4AF37",
      missionImage: "",
      missionIcon: "Target",
      buttonText: "Read Story",
      buttonUrl: "/story",
      glassEffect: true,
      status: "Active"
    },
    vision: {
      heading: "Vision 2030: Bridging the global developer deficit.",
      subHeading: "THE FUTURE VISION",
      description: "Technology evolves at a rapid pace, yet university syllabi remain outdated. We are constructing an open, adaptive, cloud-native learning playground.",
      visionImage: "",
      visionIcon: "Eye",
      accentColor: "#00E5FF",
      buttonText: "Learn More",
      buttonUrl: "/about",
      status: "Active"
    },
    coreValues: [
      { id: "cv-1", icon: "Compass", title: "Vision 2030: Democratizing Code", description: "Our core goal is to reach 10 million students globally, offering verified technical education pathways at zero subscription costs.", accentColor: "#D4AF37", order: 1, status: "Active" },
      { id: "cv-2", icon: "Eye", title: "Proof of Work Focus", description: "Moving tech candidates away from standard multiple-choice resumes and towards visible, deployed open-source contributions.", accentColor: "#00E5FF", order: 2, status: "Active" }
    ],
    brandPillars: [
      { id: "bp-1", title: "Brand Philosophy", subtitle: "Storytelling as strategy", description: "Cinematic narrative lessons detailing system design and advanced coding parameters.", icon: "Compass", borderColor: "#D4AF37", hoverColor: "#D4AF37", order: 1, status: "Active" },
      { id: "bp-2", title: "Community Vision", subtitle: "Fostering open-source network", description: "Global developers collaborating, peer reviewing code, and organizing local bootcamps.", icon: "Users", borderColor: "#aa3bff", hoverColor: "#aa3bff", order: 2, status: "Active" }
    ],
    roadmap: [
      { id: "rm-1", quarter: "Q3", year: "2026", title: "WebXR Platform Launch", goal: "Launch 3D Brand Collaborations Gallery with WebXR previews.", description: "Integrate initial interactive WebXR portfolios.", status: "In Progress", accentColor: "#00E5FF", order: 1 },
      { id: "rm-2", quarter: "Q4", year: "2026", title: " Milan Office Launch", goal: "Establish remote European production division in Milan.", description: "Establish content production and localized marketing campaigns.", status: "Planning", accentColor: "#D4AF37", order: 2 }
    ],
    cta: {
      heading: "Ready to Build Your Engineering Career?",
      description: "Join thousands of developers in our interactive sandbox playgrounds and master production-ready code.",
      primaryButtonText: "Get Started Free",
      primaryButtonLink: "/signup",
      secondaryButtonText: "Talk to Advisor",
      secondaryButtonLink: "/contact",
      backgroundGradient: "linear-gradient(to right, #000, #111)",
      status: "Active"
    },
    seo: {
      metaTitle: "Mission & Vision | TechMaster",
      metaDescription: "Read Aman's core mission statement, values, and strategic multi-year development roadmap.",
      metaKeywords: "Mission, Vision, Roadmap, Pillars",
      ogImageUrl: ""
    },
    sectionSettings: {
      hero: { order: 1, status: "Active" },
      mission: { order: 2, status: "Active" },
      vision: { order: 3, status: "Active" },
      coreValues: { order: 4, status: "Active" },
      brandPillars: { order: 5, status: "Active" },
      roadmap: { order: 6, status: "Active" },
      cta: { order: 7, status: "Active" },
      seo: { order: 8, status: "Active" }
    }
  },

  // 20. WEBSITE ANALYTICS
  analytics: {
    traffic: [
      { date: "06/26", desktop: 4500, mobile: 8000, tablet: 1200 },
      { date: "06/27", desktop: 4800, mobile: 8500, tablet: 1100 },
      { date: "06/28", desktop: 5200, mobile: 9100, tablet: 1300 },
      { date: "06/29", desktop: 6100, mobile: 11200, tablet: 1500 },
      { date: "06/30", desktop: 5900, mobile: 10800, tablet: 1400 },
      { date: "07/01", desktop: 6300, mobile: 12400, tablet: 1600 },
      { date: "07/02", desktop: 7200, mobile: 13800, tablet: 1900 }
    ],
    devices: [
      { name: "Mobile", value: 65, color: "#d4af37" },
      { name: "Desktop", value: 30, color: "#a1a1aa" },
      { name: "Tablet", value: 5, color: "#3f3f46" }
    ],
    referrals: [
      { channel: "Instagram Direct", percentage: 48, visitors: 28400 },
      { channel: "Forbes Editorial Links", percentage: 22, visitors: 13000 },
      { channel: "Google Search (Organic)", percentage: 18, visitors: 10600 },
      { channel: "Direct Traffic", percentage: 12, visitors: 7100 }
    ],
    topPages: [
      { path: "/", views: 42000, avgDuration: "2m 14s" },
      { path: "/portfolio", views: 28600, avgDuration: "3m 45s" },
      { path: "/founder-journey", views: 18400, avgDuration: "4m 20s" },
      { path: "/services", views: 12100, avgDuration: "1m 58s" }
    ]
  },

  // 21. WEBSITE SETTINGS
  settings: {
    brandLogoUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=100",
    brandName: "TECHMASTER",
    officeAddress: "Zenvora Creative Studio, Floor 14, Nariman Point, Mumbai 400021",
    emailGeneral: "hello@techmaster.com",
    emailBooking: "booking@techmaster.com",
    whatsappNumber: "+91 99999 11111",
    socialLinks: {
      instagram: "https://instagram.com/techmaster",
      youtube: "https://youtube.com/c/techmaster",
      linkedin: "https://linkedin.com/in/techmaster",
      pinterest: "https://pinterest.com/techmaster"
    },
    maintenanceMode: false,
    googleAnalyticsId: "G-LUXURY3D2026",
    smtpHost: "smtp.mailgun.org",
    footerText: "© 2026 TECHMASTER. Crafted with Zenvora 3D engine. All Rights Reserved."
  },

  // 22. FAQS (Auxiliary section referenced in Contact page)
  faqs: [
    {
      id: "faq-1",
      question: "What is your booking lead time?",
      answer: "We usually require 6-8 weeks lead time for custom production planning and creative brief approvals.",
      category: "Booking",
      isActive: true
    },
    {
      id: "faq-2",
      question: "Do you offer international consulting?",
      answer: "Yes, Zenvora handles luxury strategies globally. In-person shoots outside India are subject to active travel budgets.",
      category: "Services",
      isActive: true
    }
  ],
  whatWeDo: {
    hero: {
      smallBadge: "CORE ACTIVITIES",
      headline: "What We Do to",
      highlightWord: "Reshape Learning",
      description: "We build content, platforms, keynotes, and campaigns to bridge the gap between classroom syntax and global engineering workspaces.",
      glowEnabled: true,
      status: "Active"
    },
    operations: [
      { id: "op-1", icon: "Video", title: "YouTube Production", subtitle: "Cinematic Coding Breakdowns", description: "We script, record, and edit deep-dive developer tutorials that run like cinematic stories. Reaching over 2.5 million subscribers with weekly guides.", accent: "#D4AF37", order: 1, status: "Active" },
      { id: "op-2", icon: "Code", title: "Interactive Syllabus Design", subtitle: "Online MasterClasses", description: "Drafting production-level courses that focus on Docker pipelines, testing arrays, and backend scale, complete with live browser containers.", accent: "#00E5FF", order: 2, status: "Active" }
    ],
    servicesList: [
      { id: "sl-1", tag: "Content Creation", order: 1, status: "Active" },
      { id: "sl-2", tag: "Influencer Marketing", order: 2, status: "Active" },
      { id: "sl-3", tag: "Brand Promotions", order: 3, status: "Active" }
    ],
    quoteBanner: {
      quoteText: "Education is not the learning of facts, but the training of the mind to think.",
      authorName: "Aman (Tech Master)",
      status: "Active"
    },
    seo: {
      metaTitle: "What We Do | TechMaster",
      metaDescription: "Explore our core activities, YouTube production tutorials, masterclasses, and services.",
      metaKeywords: "Services, YouTube, Courses, Keynotes",
      ogImageUrl: ""
    },
    sectionSettings: {
      hero: { order: 1, status: "Active" },
      operations: { order: 2, status: "Active" },
      servicesList: { order: 3, status: "Active" },
      quoteBanner: { order: 4, status: "Active" },
      seo: { order: 5, status: "Active" }
    }
  },
  servicesPage: {
    hero: {
      smallBadge: "CORE PORTALS",
      headline: "Services, Courses &",
      highlightWord: "Keynote Bookings",
      description: "Explore Aman's developer training tracks, speaking keynote requests, collaborative student hackathons, and brand sponsorships.",
      glowEnabled: true,
      status: "Active"
    },
    statistics: [
      { id: "stat-1", label: "Students Enrolled", value: "2M+" },
      { id: "stat-2", label: "Enterprise Clients", value: "50+" }
    ],
    testimonials: [
      { id: "test-1", quote: "Outstanding cinematic production value.", author: "Rohan V.", role: "CEO", image: "" }
    ],
    faqs: [
      { id: "faq-1", question: "What is your pricing model?", answer: "We offer customized packages based on scope." }
    ],
    cta: {
      heading: "Ready to Transform Your Business?",
      subtext: "Let's discuss how we can help you achieve your goals.",
      buttonText: "Contact Us",
      buttonUrl: "/contact"
    },
    seo: {
      metaTitle: "Services | TechMaster",
      metaDescription: "Explore our main accordion services, advanced services tabs, and categories.",
      metaKeywords: "Services, Branding, Courses, Hackathons",
      ogImageUrl: ""
    },
    sectionSettings: {
      hero: { order: 1, status: "Active" },
      statistics: { order: 2, status: "Active" },
      testimonials: { order: 3, status: "Active" },
      faqs: { order: 4, status: "Active" },
      seo: { order: 5, status: "Active" }
    }
  },
  campaignsPage: {
    hero: {
      smallBadge: "INITIATIVE CAMPAIGNS",
      headline: "Empowerment Drives &",
      highlightWord: "Coding Challenges",
      description: "Review our campaigns designed to bring cloud services, laptops, coding bootcamps, and career mentoring to students globally.",
      glowEnabled: true,
      status: "Active"
    },
    campaignsList: [
      { id: "cl-1", title: "AWS Educate Drive", sponsor: "Amazon Web Services", reach: "25,000+", coverImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80", description: "By gamifying the learning process, we helped AWS register over 25,000 new student accounts in a single month.", highlights: ["Gamified Learning", "Cloud Credits", "Certification"], accentColor: "#D4AF37", order: 1, status: "Active" },
      { id: "cl-2", title: "MongoDB Atlas Hackathon", sponsor: "MongoDB", reach: "10,000+", coverImage: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&q=80", description: "A virtual hackathon driving adoption for MongoDB Atlas serverless infrastructure.", highlights: ["Database Architecture", "Serverless scaling", "Open Source DB"], accentColor: "#00E5FF", order: 2, status: "Active" }
    ],
    lifecycle: [
      { id: "lc-1", title: "1. Campaign Planning", description: "We meticulously outline timelines, allocate resources, and define key performance indicators to ensure every initiative starts with a rock-solid foundation.", order: 1, status: "Active" },
      { id: "lc-2", title: "2. Campaign Strategy", description: "Crafting narrative arcs and selecting the right digital channels to guarantee maximum reach and resonance with the targeted developer demographic.", order: 2, status: "Active" },
      { id: "lc-3", title: "3. Campaign Execution", description: "From high-end video production to live hackathon moderation, our team handles the ground-level execution to bring the strategic vision to life flawlessly.", order: 3, status: "Active" },
      { id: "lc-4", title: "4. Analytics", description: "Real-time monitoring of engagement metrics, audience retention, and click-through rates allows us to pivot and optimize the campaign mid-flight.", order: 4, status: "Active" },
      { id: "lc-5", title: "5. Results", description: "Delivering comprehensive post-campaign reports detailing ROI, brand lift, and total community impact against our initial benchmarks. We believe in absolute transparency and quantifiable outcomes.", order: 5, status: "Active" }
    ],
    successStories: [
      { id: "ss-1", title: "AWS Educate Drive", description: "By gamifying the learning process, we helped AWS register over 25,000 new student accounts in a single month. The campaign significantly lowered their standard customer acquisition cost while providing immense value to learners.", linkText: "Read Full Story", accentColor: "#D4AF37", order: 1, status: "Active" },
      { id: "ss-2", title: "MongoDB Hackathon", description: "A weekend-long virtual event that produced 500+ open-source database implementations. The campaign established MongoDB as the default backend choice for a new generation of full-stack bootcamps.", linkText: "Read Full Story", accentColor: "#00E5FF", order: 2, status: "Active" }
    ],
    seo: {
      metaTitle: "Initiative Campaigns | TechMaster",
      metaDescription: "Empowerment Drives & Coding Challenges.",
      metaKeywords: "Campaigns, AWS, Hackathons",
      ogImageUrl: ""
    }
  },
  launchesPage: {
    hero: {
      smallBadge: "SOFTWARE RELEASES",
      headline: "Product Launches &",
      highlightWord: "Tech Innovations",
      description: "We construct platforms, terminal tools, and architectural sandbox spaces to help learners visual and configure engineering problems.",
      glowEnabled: true,
      status: "Active"
    },
    products: [
      { id: "lp-1", title: "MasterClass App v2", tagline: "Gamified Interactive Code Learning", description: "Our core dashboard offering browser-based shell access, sandboxed docker execution, and step-by-step challenges covering system architectures.", status: "Active Launch", accentColor: "#D4AF37", icon: "Laptop", order: 1 },
      { id: "lp-2", title: "DevEnv CLI utility", tagline: "Speed Up Local Node Configuration", description: "A fast terminal CLI utility that builds customized, performant TS, Vite, and tailwind stacks in seconds, downloaded 80k+ times.", status: "Open Source", accentColor: "#00E5FF", icon: "Terminal", order: 2 },
      { id: "lp-3", title: "System Sandbox Hub", tagline: "Interactive AWS & Docker diagrams", description: "A digital workspace where students can construct multi-tier architectures visually, export them, and trigger test loads.", status: "Beta Testing", accentColor: "#aa3bff", icon: "Layers", order: 3 }
    ],
    featureVideo: {
      smallBadge: "LATEST LAUNCH VIDEO",
      headline: "MasterClass v2 Platform Launch Walkthrough",
      description: "Watch Aman demonstrate the sandboxed docker containers, web terminals, and the multiplayer live coding rooms that make learning code feel like a cooperative MMO game.",
      trailerBtnText: "Play Trailer",
      notesBtnText: "View Launch Notes",
      videoUrl: "",
      thumbnailUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=400&q=80",
      status: "Active"
    },
    initiatives: [
      { id: "li-1", title: "Launch Events", description: "Hosting high-energy digital and physical events to unveil new platforms, creating massive day-one adoption and community buzz.", order: 1, status: "Active" },
      { id: "li-2", title: "Product Promotions", description: "Strategic marketing pushes that position developer tools directly in front of their ideal user base through trusted channels.", order: 2, status: "Active" },
      { id: "li-3", title: "Brand Launches", description: "End-to-end support for introducing new technology brands to the market, establishing authority and developer trust instantly.", order: 3, status: "Active" },
      { id: "li-4", title: "Campaign Videos", description: "Cinematic, deep-dive promotional videos that explain complex software architectures in a visually stunning and digestible format.", order: 4, status: "Active" },
      { id: "li-5", title: "Results", description: "We measure our success by tangible impact: tens of thousands of active accounts created, millions of impressions, and sustained engagement long after the initial launch phase ends.", order: 5, status: "Active" }
    ],
    seo: {
      metaTitle: "Product Launches | TechMaster",
      metaDescription: "Explore our latest software releases and platform updates.",
      metaKeywords: "Launches, Apps, Tools",
      ogImageUrl: ""
    }
  },
  eventsPage: {
    heroSettings: {
      smallBadge: "PUBLIC ENGAGEMENTS",
      headline: "Keynote Speaking &",
      highlightWord: "Live Coding Seminars",
      description: "Aman shares developer insights, soft-skills blueprints, and live systems architecture demonstrations on global stages.",
      glowEnabled: true,
      status: "Active"
    },
    masterEventsList: [
      { 
        id: "ev-1", 
        title: "Developer Summit 2026", 
        type: "Keynote",
        date: "24 Nov 2026", 
        venue: "Moscone Center, SF", 
        location: "San Francisco, USA", 
        attendance: "5,000+", 
        description: "Opening keynote on the future of containerized cloud architecture.",
        media: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80", 
        accentColor: "#D4AF37", 
        status: "Upcoming", 
        featured: true 
      },
      { 
        id: "ev-2", 
        title: "Web3 Hackathon", 
        type: "Workshop",
        date: "12 Dec 2026", 
        venue: "Virtual Platform", 
        location: "Global", 
        attendance: "10,000+", 
        description: "Live interactive coding session on smart contract deployment.",
        media: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&q=80", 
        accentColor: "#00E5FF", 
        status: "Upcoming", 
        featured: true 
      }
    ],
    engagementTypes: [
      { id: "et-1", title: "Event Hosting", order: 1, status: "Active" },
      { id: "et-2", title: "Guest Appearance", order: 2, status: "Active" },
      { id: "et-3", title: "Corporate Events", order: 3, status: "Active" },
      { id: "et-4", title: "Product Events", order: 4, status: "Active" },
      { id: "et-5", title: "Meetups", order: 5, status: "Active" },
      { id: "et-6", title: "Workshops", order: 6, status: "Active" },
      { id: "et-7", title: "Conferences", order: 7, status: "Active" }
    ],
    mediaArchive: [
      { id: "ma-1", url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=600&q=80", title: "Event Gallery 1", category: "Conference", status: "Active" },
      { id: "ma-2", url: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=600&q=80", title: "Event Gallery 2", category: "Workshop", status: "Active" }
    ],
    videoHighlights: {
      thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80",
      videoUrl: "https://youtube.com/embed/dQw4w9WgXcQ",
      recapBadge: "RECAP",
      title: "Mainstage 2023",
      status: "Active"
    },
    bookingCTA: {
      smallBadge: "SPEAKER BOOKINGS",
      headline: "Bring Aman to",
      highlightWord: "Your Event",
      description: "Aman keynote schedules fill up rapidly. Bookings are open for university developer panels, virtual technical summits, DevFests, or corporate software consulting cycles.",
      awardText: "Full Press Kit and AV Rider available upon approval.",
      status: "Active"
    },
    bookingRequests: [
      { id: "br-1", name: "Sarah Jenkins", email: "sarah@techcorp.com", organization: "TechCorp", eventName: "Annual DevFest", budget: "$10k - $20k", date: "2026-10-15", status: "New" }
    ],
    workshops: [
      { id: "ws-1", title: "React Masterclass", instructor: "Aman", date: "15 Aug 2026", venue: "Delhi", seats: 50, price: "₹5000", status: "Upcoming" }
    ],
    conferences: [
      { id: "cf-1", title: "Tech Summit 2026", date: "12 Aug 2026", location: "Mumbai", guests: 250, status: "Upcoming" }
    ]
  },
  testimonialsPage: {
    hero: {
      title: "Student Placements & Academics Success",
      smallBadge: "COMMUNITY ACCLAIM",
      highlightText: "Academics Success",
      description: "Discover reviews from Aman's mentored students, university professors, and tech partners who have integrated our curricula.",
      bgImage: "",
      bgOverlay: "rgba(0, 0, 0, 0.7)",
      bgOpacity: 70,
      bgGradient: "linear-gradient(to bottom, transparent, #060606)",
      status: "Active",
      order: 1
    },
    successStats: [
      { id: "ss-1", label: "Placement Rate", value: "94.2", suffix: "%", icon: "Award", color: "#D4AF37", order: 1, status: "Active" },
      { id: "ss-2", label: "Average Salary", value: "120", suffix: "K", icon: "TrendingUp", color: "#00E5FF", order: 2, status: "Active" },
      { id: "ss-3", label: "Students Hired", value: "15000", suffix: "+", icon: "Users", color: "#aa3bff", order: 3, status: "Active" },
      { id: "ss-4", label: "Tech Partners", value: "450", suffix: "+", icon: "Briefcase", color: "#FF007F", order: 4, status: "Active" }
    ],
    videoTestimonials: [
      { id: "vt-1", name: "Sarah Jenkins", role: "VP of Engineering", company: "Acme Corp", thumbnail: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", video: "", duration: "2:45", description: "AWS placement success story.", rating: 5, featured: true, order: 1, status: "Active" },
      { id: "vt-2", name: "David Chen", role: "Founder", company: "StartupX", thumbnail: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80", video: "", duration: "3:10", description: "MongoDB Atlas Hackathon winner.", rating: 5, featured: true, order: 2, status: "Active" }
    ],
    writtenTestimonials: [
      { id: "wt-1", name: "Sabrina D'Souza", designation: "Brand Director", company: "Armani Beauty", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150", review: "TechMaster brings unparalleled professionalism and a meticulous eye for luxury aesthetic.", rating: 5, logo: "", featured: true, status: "Active", order: 1 }
    ],
    categories: [
      { id: "cat-1", title: "Content Creation", description: "Cinematic videos covering software architecture.", icon: "Film", order: 1, status: "Active" },
      { id: "cat-2", title: "Influencer Marketing", description: "Targeted campaigns for tech products.", icon: "Share2", order: 2, status: "Active" },
      { id: "cat-3", title: "Brand Promotions", description: "Bespoke digital showcases.", icon: "Sparkles", order: 3, status: "Active" },
      { id: "cat-4", title: "Software Tutorials", description: "Step-by-step masterclasses.", icon: "BookOpen", order: 4, status: "Active" }
    ],
    featuredQuote: {
      quote: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
      subtitle: "Computer Scientist",
      background: "linear-gradient(to right, #111, #000)",
      accentColor: "#D4AF37",
      showSection: true,
      order: 6
    },
    whatWeDo: [
      { id: "wwd-1", title: "Content Production", subtitle: "High-end Dev Ed", description: "We produce educational content with high production values.", icon: "Camera", image: "", buttonText: "Explore Videos", buttonLink: "/gallery", order: 1, status: "Active" }
    ],
    seo: {
      metaTitle: "Testimonials & Success Stories | TechMaster",
      metaDescription: "Read reviews and placements statistics from our students and brand partners.",
      metaKeywords: "Testimonials, Placements, Success, Reviews",
      ogImageUrl: "",
      canonicalUrl: "",
      index: true,
      follow: true
    },
    sectionSettings: {
      hero: { order: 1, status: "Active" },
      successStats: { order: 2, status: "Active" },
      videoTestimonials: { order: 3, status: "Active" },
      writtenTestimonials: { order: 4, status: "Active" },
      categories: { order: 5, status: "Active" },
      featuredQuote: { order: 6, status: "Active" },
      whatWeDo: { order: 7, status: "Active" },
      seo: { order: 8, status: "Active" }
    }
  },
  termsPolicy: {
    popupTitle: "Terms of Service",
    effectiveDate: "July 7, 2026",
    smallBadge: "LEGAL PROTOCOLS",
    subtitle: "TechMaster Terms",
    introParagraph: "By browsing this platform, subscribing to our mailing list, or submitting inquiries, you agree to these Terms of Service.",
    sections: [
      { id: "ts-1", title: "Intellectual Property", body: "All site designs, 3D shaders, systems blueprints, and video snippets are the trademark properties of Aman and Tech Master Labs unless stated otherwise.", order: 1, status: "Active" },
      { id: "ts-2", title: "User License", body: "You are granted a limited license to explore our portfolio and code projects for educational research. Scraping, cloning, or distributing source codes commercially without express written consent is strictly prohibited.", order: 2, status: "Active" },
      { id: "ts-3", title: "Sandbox Declarations", body: "All forms, databases, and estimates operate in safe sandbox demonstration pipelines.", order: 3, status: "Active" }
    ]
  },
  privacyPolicy: {
    popupTitle: "Privacy Policy",
    effectiveDate: "July 7, 2026",
    smallBadge: "USER PRIVACY",
    introParagraph: "Aman & Tech Master Media Labs operates this portfolio and education portal. We respect your privacy and only collect direct email addresses when you subscribe to our newsletter.",
    sections: [
      { id: "pp-1", heading: "Data Collection & Use", description: "We collect email addresses solely for sending newsletter digests, cohort details, and technical blogs. Your information is never sold, traded, or shared with third-party advertising companies.", order: 1, status: "Active" },
      { id: "pp-2", heading: "Cookies", description: "This platform utilizes basic localized storage and caching systems to maintain animations, 3D settings, and user navigation states smoothly.", order: 2, status: "Active" },
      { id: "pp-3", heading: "Security", description: "All direct inquiries and newsletter transmissions are protected with industry-standard cryptographic handshakes.", order: 3, status: "Active" }
    ]
  },
  cookiePolicy: {
    title: "Cookie Policy",
    effectiveDate: "July 7, 2026",
    description: "We use cookies to personalize content and analyze traffic.",
    categories: [
      { id: "cc-1", name: "Necessary", description: "Required for core system security and layout features.", order: 1, status: "Active" },
      { id: "cc-2", name: "Analytics", description: "Help us understand traffic channels and tutorial view loops.", order: 2, status: "Active" }
    ]
  },
  legalSettings: {
    showTerms: true,
    showPrivacy: true,
    showCookiePolicy: true,
    enablePopup: true,
    popupAnimation: "fade",
    blurBackground: true,
    closeOnOutsideClick: true,
    showLastUpdated: true,
    popupWidth: "max-w-2xl",
    theme: "dark",
    overlayOpacity: 80
  }
};
