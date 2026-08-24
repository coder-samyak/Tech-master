import React, { useEffect, useState, useRef } from "react";
import { ArrowDown, X } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useData } from "../context/DataContext";
import { StripeReelsCarousel } from "../components/StripeReelsCarousel";
import { LongVideosCarousel } from "../components/LongVideosCarousel";
import { AnimatedCounter } from "../components/AnimatedCounter";

import asusLogo from "../assets/ASUS.jpeg";
import dellLogo from "../assets/DELL.jpeg";
import flipkartLogo from "../assets/Flipkart.jpeg";
import huaweiLogo from "../assets/HUAWEI.jpeg";
import miLogo from "../assets/MI.jpeg";
import motorolaLogo from "../assets/motorola_hd.png";
import oneplusLogo from "../assets/Oneplus.jpeg";
import oppoLogo from "../assets/oppo.jpeg";
import pixelLogo from "../assets/PIXEL.jpeg";
import pocoLogo from "../assets/Poco.jpeg";
import realmeLogo from "../assets/realme_official.png";
import samsungLogo from "../assets/samsung.jpeg";
import vivoLogo from "../assets/Vivo.jpeg";
import amazonLogo from "../assets/amazon.jpeg";
import iqooLogo from "../assets/iQOO.jpeg";
import cashifyLogo from "../assets/Cashify.jpeg";
import nothingLogo from "../assets/Nothing.jpeg";
import blinkitLogo from "../assets/blinkit.jpeg";
import sleepCompanyLogo from "../assets/Thesleepcompany.jpeg";
import fireboltLogo from "../assets/firebolt.jpeg";
import teslaLogo from "../assets/Tesla.jpeg";
import tataLogo from "../assets/TATA.jpeg";
import hyundaiLogo from "../assets/Hyundai.jpeg";
import kiaLogo from "../assets/KIA.jpeg";
import circleImg from "../assets/First circle.jpg (1).jpeg";
gsap.registerPlugin(ScrollTrigger);

interface HomeProps {
  onChangePage: (page: string) => void;
}


export const Home: React.FC<HomeProps> = ({ onChangePage }) => {
  const { homeData, dbData } = useData();
  const [liveHomeData, setLiveHomeData] = useState<any>(null);

  useEffect(() => {
    const fetchHomepage = async () => {
      try {
        const envUrl = (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"))
          ? "http://localhost:5000/api/v1"
          : import.meta.env.VITE_API_URL?.trim();
        const base = envUrl ? (envUrl.replace(/\/+$|\/api\/v1\/*$/i, "").endsWith("/api/v1") ? envUrl.replace(/\/+$|\/api\/v1\/*$/i, "") : `${envUrl.replace(/\/+$|\/api\/v1\/*$/i, "")}/api/v1`) : "https://techmasterbackend.onrender.com/api/v1";
        const res = await fetch(`${base}/homepage?t=${Date.now()}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setLiveHomeData(json.data);
          }
        }
      } catch (e) {
        console.warn("Direct Homepage fetch error:", e);
      }
    };

    fetchHomepage();
    const interval = setInterval(fetchHomepage, 2500);
    const handleFocus = () => { fetchHomepage(); };
    window.addEventListener("focus", handleFocus);
    window.addEventListener("storage", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("storage", handleFocus);
    };
  }, []);

  let localDb: any = {};
  try {
    const saved = localStorage.getItem('zenvora_db');
    if (saved) localDb = JSON.parse(saved);
  } catch (e) {}

  const activeHome = {
    ...(homeData || {}),
    ...(dbData?.homepageCMS || dbData?.homepage || {}),
    ...(localDb?.homepageCMS || localDb?.homepage || {}),
    ...(liveHomeData || {})
  };

  const heroTopBadge = liveHomeData?.hero?.topBadgeText || activeHome?.hero?.topBadgeText || activeHome?.heroTopBadge || "India's most-watched media production house";
  const heroMainHeading = liveHomeData?.hero?.mainHeading || activeHome?.hero?.mainHeading || activeHome?.heroMainHeading || "TECH MASTER";
  const heroTagline = liveHomeData?.hero?.tagline || activeHome?.hero?.tagline || activeHome?.heroTagline || '"Nothing We Make Is Forgettable. Unskippable. Unforgettable."';
  const heroSubTagline = liveHomeData?.hero?.subTagline || activeHome?.hero?.subTagline || activeHome?.heroSubTagline || "Attention and Influence — At Scale";

  const introBadge = liveHomeData?.introVision?.introBadge || activeHome?.introVision?.introBadge || activeHome?.introBadge || "INTRO";
  const introHeading = liveHomeData?.introVision?.introHeading || activeHome?.introVision?.introHeading || activeHome?.introHeading || "Building High-Scale Media Channels";
  const introDescription = liveHomeData?.introVision?.introDescription || activeHome?.introVision?.introDescription || activeHome?.introDescription || "Tech Master Digital Pvt Ltd builds and runs a portfolio of high-scale content channels across tech, automobiles, and entertainment. We take complex subjects and make them impossible to scroll past. Combining editorial rigor with production value that stands out.";

  const visionBadge = liveHomeData?.introVision?.visionBadge || activeHome?.introVision?.visionBadge || activeHome?.visionBadge || "THE VISION";
  const visionHeading = liveHomeData?.introVision?.visionHeading || activeHome?.introVision?.visionHeading || activeHome?.visionHeading || "Complexity Made Simple & Unforgettable";
  const visionDescription = liveHomeData?.introVision?.visionDescription || activeHome?.introVision?.visionDescription || activeHome?.visionDescription || "Tech Master exists to make complexity feel simple, and simplicity feel unforgettable. We tell stories that inform without lecturing, entertain without diluting, and connect without pretending. The result: content built to travel across platforms, across formats, across the world.";

  const founderBadge = (liveHomeData?.founder?.badge || activeHome?.founder?.badge || activeHome?.founderBadge || "ABOUT THE CEO")
    .replace(/\/\s*founder/gi, "")
    .trim();
  const founderName = liveHomeData?.founder?.name || activeHome?.founder?.name || activeHome?.founderName || "Arvind Kharra";
  const founderHighlighted = liveHomeData?.founder?.highlightedName || activeHome?.founder?.highlightedName || activeHome?.founderHighlighted || "aka Tech Master";
  const founderBio = liveHomeData?.founder?.description || activeHome?.founder?.description || activeHome?.founderBio || "An engineering graduate from Rajasthan who turned his passion for technology into world's #1 tech YouTube channel. No corporate job, no conventional path. Just a small-town outsider who made technology feel human, fun, and relatable to millions.";

  const tickerHeading = liveHomeData?.channelsTicker?.heading || activeHome?.channelsTicker?.heading || activeHome?.tickerHeading || "Different audiences.";
  const tickerHighlight = liveHomeData?.channelsTicker?.highlightedHeading || activeHome?.channelsTicker?.highlightedHeading || activeHome?.tickerHighlight || "Same Obsession.";
  const tickerSubHeading = (liveHomeData?.channelsTicker?.subHeading || activeHome?.channelsTicker?.subHeading || activeHome?.tickerSubHeading || "Four channels today. A Media Empire in Motion.")
    .replace(/we're just getting started\s*[\/\-]?\s*/gi, "")
    .replace(/five channels/gi, "Four channels")
    .replace(/four channels/gi, "Four channels")
    .trim();
  const defaultBrandChannels = [
    { brandName: "Tech Master" },
    { brandName: "Next Univerz" },
    { brandName: "Master Wheels" },
    { brandName: "Full Circle" }
  ];
  const rawChannels = (liveHomeData?.channelsTicker?.channels && liveHomeData.channelsTicker.channels.length > 0)
    ? liveHomeData.channelsTicker.channels
    : ((activeHome?.channelsTicker?.channels && activeHome.channelsTicker.channels.length > 0)
      ? activeHome.channelsTicker.channels
      : (activeHome?.channels && activeHome.channels.length > 0 ? activeHome.channels : defaultBrandChannels));
  const tickerChannelsList = rawChannels.filter((c: any) => {
    if (c.visible === false || c.deleted === true) return false;
    const name = (c.brandName || c.name || c.title || "").toLowerCase();
    return !name.includes("trendz");
  });

  const contactTag = liveHomeData?.newsletterContact?.contactPreview?.tag
    || activeHome?.newsletterContact?.contactPreview?.tag 
    || activeHome?.newsletterContact?.contactPreview?.badge 
    || activeHome?.contactPreview?.tag 
    || activeHome?.contactPreview?.badge 
    || activeHome?.newsletterContact?.contactBadge 
    || activeHome?.contactBadge 
    || homeData?.contactPreview?.tag 
    || "COLLABORATION INQUIRY";

  const contactHeading = liveHomeData?.newsletterContact?.contactPreview?.heading
    || activeHome?.newsletterContact?.contactPreview?.heading 
    || activeHome?.contactPreview?.heading 
    || activeHome?.newsletterContact?.contactHeading 
    || activeHome?.contactHeading 
    || homeData?.contactPreview?.heading 
    || "Ready to Collaborate?";

  const contactCtaText = liveHomeData?.newsletterContact?.contactPreview?.primaryCta
    || liveHomeData?.newsletterContact?.contactPreview?.buttonText
    || activeHome?.newsletterContact?.contactPreview?.primaryCta 
    || activeHome?.newsletterContact?.contactPreview?.buttonText 
    || activeHome?.contactPreview?.primaryCta 
    || activeHome?.contactPreview?.buttonText 
    || activeHome?.newsletterContact?.contactCtaText 
    || activeHome?.contactCtaText 
    || homeData?.contactPreview?.primaryCta 
    || "Get In Touch";

  const defaultCoreValues = [
    { title: "Fearless Energy", desc: "Pushing creative boundaries with unyielding momentum, bold innovation, and passion." },
    { title: "Creative Storytelling", desc: "Crafting powerful visual narratives that inform, engage, and inspire millions globally." },
    { title: "Community First", desc: "Putting our audience at the core of everything we build, cultivate, and create." }
  ];
  const defaultDescMap: Record<string, string> = {
    "fearless energy": "Pushing creative boundaries with unyielding momentum, bold innovation, and passion.",
    "creative storytelling": "Crafting powerful visual narratives that inform, engage, and inspire millions globally.",
    "community first": "Putting our audience at the core of everything we build, cultivate, and create."
  };
  const rawCoreValues = (liveHomeData?.coreValues?.cards && liveHomeData.coreValues.cards.length > 0)
    ? liveHomeData.coreValues.cards
    : (activeHome?.coreValues?.cards || []);
  const coreValuesList = (rawCoreValues && rawCoreValues.length > 0)
    ? rawCoreValues.filter((c: any) => c.deleted !== true).map((c: any) => {
        const titleKey = (c.title || "").toLowerCase().trim();
        const fallback = defaultDescMap[titleKey] || "Pushing creative boundaries and delivering excellence in everything we build.";
        return {
          title: c.title,
          desc: c.desc || c.description || fallback
        };
      })
    : defaultCoreValues;

  const defaultStats = [
    { number: "50M+", label: "Community" },
    { number: "1B+", label: "Monthly Views" },
    { number: "2500+", label: "Videos Published" },
    { number: "500K+", label: "FB Followers" },
    { number: "25B+", label: "Lifetime Views on YT" },
    { number: "50+", label: "Global Brand Collaborations" }
  ];
  const rawCounters = (liveHomeData?.statistics?.counters && liveHomeData.statistics.counters.length > 0)
    ? liveHomeData.statistics.counters
    : (activeHome?.statistics?.counters || []);

  let processedStats = (rawCounters && rawCounters.length > 0)
    ? rawCounters
        .filter((s: any) => s.deleted !== true)
        .map((s: any) => {
          let num = s.value || s.number || "";
          if (num === "25B") num = "25B+";
          return { number: num, label: s.label || "" };
        })
    : defaultStats;

  // Filter out any unwanted RGR / RRR cards
  processedStats = processedStats.filter((s: any) => 
    !/rgr|rrr/i.test(s.number) && !/rgr|rrr/i.test(s.label)
  );

  // Replace old separate "Subscribers" (40M+) & "IG Followers" (7M+) cards with single "50M+" "Community" card
  const hasOldSubCards = processedStats.some((s: any) => 
    /subscriber/i.test(s.label) || /ig follower/i.test(s.label) || s.number === "40M+" || s.number === "7M+"
  );

  if (hasOldSubCards) {
    processedStats = processedStats.filter((s: any) => 
      !/subscriber/i.test(s.label) && !/ig follower/i.test(s.label) && s.number !== "40M+" && s.number !== "7M+"
    );
    if (!processedStats.some((s: any) => /community/i.test(s.label))) {
      processedStats.unshift({ number: "50M+", label: "Community" });
    }
  }

  const statsList = processedStats.length > 0 ? processedStats : defaultStats;

  const dummyViews = ["1.2M views", "850K views", "3.4M views", "2.1M views", "500K views", "4.8M views", "920K views", "1.5M views", "300K views", "2.9M views"];

  const reelsList = Array.isArray(liveHomeData?.shortsReels?.list)
    ? liveHomeData.shortsReels.list.filter((r: any) => r.deleted !== true)
    : (Array.isArray(activeHome?.shortsReels?.list)
      ? activeHome.shortsReels.list.filter((r: any) => r.deleted !== true)
      : (Array.isArray(activeHome?.reels) ? activeHome.reels : (Array.isArray(dbData?.homepage?.reels) ? dbData.homepage.reels : [])));

  const shortsList = Array.isArray(activeHome?.shorts)
    ? activeHome.shorts
    : (Array.isArray(dbData?.homepage?.shorts) ? dbData.homepage.shorts : []);

  const longList = Array.isArray(activeHome?.longVideos?.list)
    ? activeHome.longVideos.list
    : (Array.isArray(activeHome?.longVideos) ? activeHome.longVideos : (Array.isArray(dbData?.homepage?.longVideos) ? dbData.homepage.longVideos : []));

  const dynamicVideos = [
    ...reelsList.map((v: any) => ({
      id: v.id,
      platform: v.platform || (v.url && v.url.includes("instagram.com") ? "instagram" : "youtube"),
      title: v.title || "",
      username: v.username || v.handle || v.author || "",
      channelName: v.channelName || "",
      views: v.views || v.viewCount || "",
      thumbnail: v.thumbnail || v.thumbnailUrl || v.imageUrl || "",
      url: v.url || "",
      videoUrl: v.videoUrl || "",
      type: "reel",
      category: "Reels & Shorts",
      aspectRatio: "9/16"
    })),
    ...shortsList.map((v: any) => ({
      id: v.id,
      platform: v.platform || (v.url && v.url.includes("instagram.com") ? "instagram" : "youtube"),
      title: v.title || "",
      username: v.username || v.handle || v.author || "",
      channelName: v.channelName || "",
      views: v.views || v.viewCount || "",
      thumbnail: v.thumbnail || v.thumbnailUrl || v.imageUrl || "",
      url: v.url || "",
      videoUrl: v.videoUrl || "",
      type: "short",
      category: "Reels & Shorts",
      aspectRatio: "9/16"
    })),
    ...longList.map((v: any, i: number) => ({
      id: v.id,
      title: v.title,
      type: "long_video",
      url: v.url || v.videoUrl,
      videoUrl: v.videoUrl || v.url,
      thumbnail: v.thumbnailUrl || v.thumbnail || v.imageUrl,
      aspectRatio: "16/9",
      category: "Long Videos",
      views: v.views || dummyViews[(i + 6) % dummyViews.length],
      author: v.author,
      handle: v.handle
    }))
  ];
  const activeVideos = dynamicVideos.length > 0 ? dynamicVideos : [];

  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const sections = document.querySelectorAll(".scroll-section");
    sections.forEach((sec) => {
      gsap.fromTo(
        sec.querySelectorAll(".fade-up"),
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Custom timeline for Core Values Grid (Sequential Reveal & Typing Heading)
    const coreValuesGrid = document.querySelector(".core-values-grid");
    if (coreValuesGrid) {
      const cards = coreValuesGrid.querySelectorAll(".value-card");
      
      // Initialize GSAP states to prevent flash
      gsap.set(cards, { opacity: 0, y: 50 });
      cards.forEach((card) => {
        const headingChars = card.querySelectorAll(".char");
        if (headingChars.length > 0) {
          gsap.set(headingChars, { opacity: 0 });
        }
        gsap.set(card.querySelector(".value-card-content"), { opacity: 0, y: 20 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: coreValuesGrid,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      });

      cards.forEach((card, i) => {
        const headingChars = card.querySelectorAll(".char");
        const content = card.querySelector(".value-card-content");

        // Stagger cards in quickly
        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, i * 0.15); // Add overlap based on index

        if (headingChars.length > 0) {
          tl.to(headingChars, {
            opacity: 1,
            duration: 0.03,
            stagger: 0.05,
            ease: "none"
          }, i * 0.15 + 0.3); // Start typing shortly after card starts appearing
        }

        tl.to(content, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out"
        }, i * 0.15 + 0.5);
      });
    }

    // Custom trigger for each Services Card (Swoops in individually on scroll)
    const servicesGrid = document.querySelector(".services-grid");
    if (servicesGrid) {
      const cards = servicesGrid.querySelectorAll(".services-card");
      
      // Initialize GSAP states to prevent flash
      gsap.set(cards, { 
        opacity: 0, 
        x: 250, 
        y: 200, 
        rotation: 15, 
        transformOrigin: "right bottom" 
      });

      cards.forEach((card, idx) => {
        gsap.fromTo(card,
          { 
            opacity: 0, 
            x: 250, 
            y: 200, 
            rotation: 15, 
            transformOrigin: "right bottom" 
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card, 
              start: idx === 0 ? "top 85%" : "top 55%", // Card 2 requires more scroll to trigger
              toggleActions: "play none none none",
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = Array.from(document.querySelectorAll(".video-fade-in"));
      if (cards.length === 0) return;

      // Set premium 3D motion initial state
      gsap.killTweensOf(cards);
      gsap.set(cards, { 
        y: 100, 
        scale: 0.9, 
        opacity: 0, 
        rotationX: 15, 
        transformPerspective: 1000,
        transformOrigin: "center top"
      });

      // Animate each card individually when it enters the viewport
      cards.forEach((card) => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          opacity: 1,
          rotationX: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 92%", // Triggers when the card enters the lower viewport threshold
            toggleActions: "restart none restart none",
          },
        });
      });

      // Intro & Vision Timeline Line Animation
      gsap.fromTo(
        ".intro-vision-line-active",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".intro-vision-timeline",
            start: "top 65%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      // Highlight Vision Card when line reaches it
      gsap.to(".vision-card-inner", {
        borderColor: "rgba(212, 175, 55, 0.8)",
        backgroundColor: "rgba(212, 175, 55, 0.08)",
        boxShadow: "0 0 50px rgba(212, 175, 55, 0.35)",
        scale: 1.02,
        duration: 0.8,
        scrollTrigger: {
          trigger: ".vision-card-node",
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(".vision-badge", {
        color: "#D4AF37",
        duration: 0.5,
        scrollTrigger: {
          trigger: ".vision-card-node",
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });

      gsap.to(".vision-orb", {
        backgroundColor: "#D4AF37",
        boxShadow: "0 0 15px rgba(212, 175, 55, 1)",
        duration: 0.5,
        scrollTrigger: {
          trigger: ".vision-card-node",
          start: "top 75%",
          toggleActions: "play reverse play reverse",
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNavClick = (pageId: string) => {
    onChangePage(pageId);
  };

  const filteredVideos = activeVideos;

  const timelineRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: timelineScrollProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 75%"]
  });

  const timelineScaleY = useSpring(timelineScrollProgress, { stiffness: 200, damping: 30 });

  const { scrollYProgress: introScrollProgress } = useScroll({
    target: introRef,
    offset: ["start 85%", "center 50%", "end 15%"]
  });

  const { scrollYProgress: visionScrollProgress } = useScroll({
    target: visionRef,
    offset: ["start 85%", "center 50%", "end 15%"]
  });

  // Intro Card transform properties (Activates ONLY when card reaches the center of the viewport)
  const introHighlightProgress = useTransform(
    introScrollProgress,
    [0.0, 0.35, 0.5, 0.65, 1.0],
    [0, 0, 1, 0, 0]
  );
  const introBorderColor = useTransform(
    introHighlightProgress,
    [0, 1],
    ["rgba(255, 255, 255, 0.1)", "rgba(212, 175, 55, 0.95)"]
  );
  const introBgColor = useTransform(
    introHighlightProgress,
    [0, 1],
    ["rgba(0, 0, 0, 0.6)", "rgba(212, 175, 55, 0.12)"]
  );
  const introShadow = useTransform(
    introHighlightProgress,
    [0, 1],
    ["0px 10px 40px rgba(0,0,0,0.8)", "0px 0px 50px rgba(212,175,55,0.45)"]
  );
  const introScale = useTransform(introHighlightProgress, [0, 1], [0.98, 1.02]);

  // Vision Card transform properties (Activates ONLY when card reaches the center of the viewport)
  const visionHighlightProgress = useTransform(
    visionScrollProgress,
    [0.0, 0.35, 0.5, 0.65, 1.0],
    [0, 0, 1, 0, 0]
  );
  const visionBorderColor = useTransform(
    visionHighlightProgress,
    [0, 1],
    ["rgba(255, 255, 255, 0.1)", "rgba(212, 175, 55, 0.95)"]
  );
  const visionBgColor = useTransform(
    visionHighlightProgress,
    [0, 1],
    ["rgba(0, 0, 0, 0.6)", "rgba(212, 175, 55, 0.12)"]
  );
  const visionShadow = useTransform(
    visionHighlightProgress,
    [0, 1],
    ["0px 10px 40px rgba(0,0,0,0.8)", "0px 0px 50px rgba(212,175,55,0.45)"]
  );
  const visionScale = useTransform(visionHighlightProgress, [0, 1], [0.98, 1.02]);
  const visionBadgeColor = useTransform(visionHighlightProgress, [0, 1], ["#9CA3AF", "#D4AF37"]);
  const visionOrbColor = useTransform(visionHighlightProgress, [0, 1], ["#6B7280", "#D4AF37"]);
  const visionOrbGlow = useTransform(
    visionHighlightProgress,
    [0, 1],
    ["none", "0px 0px 15px rgba(212, 175, 55, 1)"]
  );

  return (
    <div className="relative text-white min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="flex flex-col justify-center items-center px-6 sm:px-6 md:px-12 relative overflow-hidden pt-28 sm:pt-20 md:pt-24 pb-0 text-center">
        {/* Main Title: TECH MASTER - Positioned just below navbar */}
        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-20 mb-3">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl sm:text-7xl md:text-8xl lg:text-[104px] font-black leading-none text-center uppercase whitespace-normal sm:whitespace-nowrap select-none inline-block relative z-10 mb-3 sm:mb-4"
            style={{
              fontFamily: "'Montserrat', 'League Spartan', 'Outfit', sans-serif",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              filter: "drop-shadow(2px 2px 0px #880000)"
            }}
          >
            {(() => {
              const headingText = (heroMainHeading || "TECH MASTER").toUpperCase();
              const parts = headingText.split(" ");
              if (parts.length >= 2) {
                const first = parts[0];
                const rest = parts.slice(1).join(" ");
                return (
                  <>
                    <span className="text-[#E2E8F0] opacity-95">{first}</span>{" "}
                    <span
                      className="bg-gradient-to-b from-[#FACC15] via-[#EAB308] to-[#B45309] bg-clip-text text-transparent"
                      style={{
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {rest}
                    </span>
                  </>
                );
              }
              return (
                <span className="text-[#E2E8F0]">{headingText}</span>
              );
            })()}
          </motion.h1>

          {/* INDIA'S MOST-WATCHED MEDIA PRODUCTION HOUSE Badge directly below TECH MASTER title (Above Lion) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="typo-badge border border-gold/25 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-gold/5 backdrop-blur-md flex items-center justify-center gap-2 text-gold text-[10px] sm:text-xs shadow-md text-center max-w-full leading-tight"
          >
            <svg className="w-3.5 h-3.5 fill-current text-gold shrink-0" viewBox="0 0 24 24">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            {heroTopBadge}
          </motion.div>
        </div>

        {/* Vertical Gap for 3D Lion / Sher Logo */}
        <div className="h-[260px] sm:h-80 md:h-[440px] w-full pointer-events-none" />

        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10 mt-4 sm:mt-8">

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.6 }}
            className="text-gray-300 text-sm sm:text-lg md:text-2xl font-serif italic max-w-3xl leading-relaxed mb-2 md:mb-4 p-4 sm:p-6 md:p-8 rounded-2xl border border-gold/30 bg-black/40 backdrop-blur-sm shadow-[0_0_30px_rgba(212,175,55,0.1)]"
          >
            {heroTagline}
            <span className="block text-[10px] sm:text-xs font-mono font-normal text-gold/80 not-italic uppercase tracking-[2px] mt-2 sm:mt-3">
              {heroSubTagline}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.8 }}
            className="relative z-30 mt-1 sm:mt-2 mb-1 sm:mb-2"
          >
            <div
              onClick={() => introRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="flex flex-col items-center gap-1.5 px-4 py-2 opacity-80 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer group select-none"
            >
              <span className="text-[10px] uppercase tracking-[3px] text-gold font-bold font-mono group-hover:text-gold-light transition-colors">
                Scroll down
              </span>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              >
                <ArrowDown className="w-4 h-4 text-gold group-hover:text-white transition-colors" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro & The Vision Animated Vertical Timeline Section */}
      <section className="scroll-section py-10 sm:py-16 md:py-20 px-6 sm:px-6 md:px-12 max-w-4xl mx-auto relative z-10">
        <div ref={timelineRef} className="intro-vision-timeline relative flex flex-col items-center gap-10 sm:gap-20">
          
          {/* Central Vertical Connecting Timeline Line (Journey Style) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-[3px] bg-white/10 z-0 overflow-hidden rounded-full">
            <motion.div
              style={{ scaleY: timelineScaleY, transformOrigin: "top center" }}
              className="intro-vision-line-active w-full h-full bg-gradient-to-b from-gold via-[#F3E5AB] to-gold shadow-[0_0_20px_rgba(212,175,55,0.9)]"
            />
          </div>

          {/* Top Card: INTRO (Highlights with Gold Glow ONLY when reaching center of viewport) */}
          <div ref={introRef} className="intro-card-node w-full relative z-10">
            <motion.div
              style={{
                borderColor: introBorderColor,
                backgroundColor: introBgColor,
                boxShadow: introShadow,
                scale: introScale
              }}
              className="glass-panel p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border backdrop-blur-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <span className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-gold animate-pulse shadow-[0_0_12px_rgba(212,175,55,0.9)]" />
                <span className="typo-badge text-gold tracking-[2px] uppercase font-mono font-bold text-[10px] sm:text-xs">{introBadge}</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-3 sm:mb-5 leading-tight">
                {introHeading}
              </h2>
              <p className="text-gray-300 text-xs sm:text-base md:text-lg font-light leading-relaxed">
                {introDescription}
              </p>
            </motion.div>
          </div>

          {/* Bottom Card: THE VISION (Highlights with Gold Glow ONLY when reaching center of viewport) */}
          <div ref={visionRef} className="vision-card-node w-full relative z-10">
            <motion.div
              style={{
                borderColor: visionBorderColor,
                backgroundColor: visionBgColor,
                boxShadow: visionShadow,
                scale: visionScale
              }}
              className="vision-card-inner glass-panel p-5 sm:p-10 md:p-12 rounded-2xl sm:rounded-3xl border backdrop-blur-xl transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
                <motion.span
                  style={{ backgroundColor: visionOrbColor, boxShadow: visionOrbGlow }}
                  className="vision-orb w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300"
                />
                <motion.span
                  style={{ color: visionBadgeColor }}
                  className="vision-badge typo-badge tracking-[2px] uppercase font-mono font-bold text-[10px] sm:text-xs transition-colors duration-300"
                >
                  {visionBadge}
                </motion.span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-3 sm:mb-5 leading-tight">
                {visionHeading}
              </h2>
              <p className="text-gray-300 text-xs sm:text-base md:text-lg font-light leading-relaxed">
                {visionDescription}
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* About the CEO / Founder */}
      <section className="scroll-section py-10 sm:py-16 md:py-20 px-6 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="glass-panel p-5 sm:p-12 rounded-2xl sm:rounded-3xl border border-gold/30 bg-black/60 backdrop-blur-xl relative overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.08)]">
          <span className="typo-badge text-gold/80 border border-gold/30 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-black/40 font-mono font-semibold text-[10px] sm:text-xs inline-block mb-4 sm:mb-6">
            {founderBadge}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white font-bold mb-4 sm:mb-6">
            {founderName} <span className="text-gold italic">{founderHighlighted}</span>
          </h2>
          <p className="text-gray-300 text-sm sm:text-lg font-light leading-relaxed max-w-4xl">
            {founderBio}
          </p>
        </div>
      </section>

      {/* 2. Channels Ticker Section */}
      <section className="py-10 sm:py-16 bg-black/60 border-y border-white/10 relative z-10 overflow-hidden text-center flex flex-col items-center justify-center gap-2 sm:gap-3">
        <div className="flex flex-col items-center gap-1 relative z-20 max-w-3xl px-6 sm:px-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {tickerHeading} <span className="text-gold italic font-bold">{tickerHighlight}</span>
          </h2>
          <p className="text-gray-400 text-[11px] sm:text-sm font-mono tracking-wider uppercase mt-0.5 sm:mt-1">
            {tickerSubHeading}
          </p>
        </div>

        <motion.div 
          animate={{ x: ["0%", "-50%"] }} 
          transition={{ ease: "linear", duration: 110, repeat: Infinity }}
          style={{ willChange: "transform", display: "flex", flexDirection: "row", width: "max-content" }}
          className="flex flex-row flex-nowrap items-center mt-3 sm:mt-4"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((groupIndex) => {
            return (
              <div key={groupIndex} className="flex flex-row flex-nowrap items-center shrink-0">
                {tickerChannelsList.map((brand: any, idx: number) => {
                  const bName = brand.brandName || brand.name || brand.title || "";
                  const bImg = brand.circleImage || brand.logoUrl || brand.image || brand.imageUrl || circleImg;
                  return (
                    <div
                      key={`${bName}-${idx}-${groupIndex}`}
                      onClick={() => handleNavClick("portfolio")}
                      data-cursor="CLICK"
                      className="group/brand relative inline-flex items-center justify-center px-6 sm:px-16 py-1.5 sm:py-2 transition-all duration-300 cursor-pointer select-none shrink-0"
                    >
                      <div className="flex flex-col items-center">
                        {/* Professional Channel Circle Image above the name */}
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-gold/40 group-hover/brand:border-gold transition-all duration-300 mb-2 sm:mb-3 shadow-[0_0_12px_rgba(212,175,55,0.15)] group-hover/brand:shadow-[0_0_20px_rgba(212,175,55,0.35)] relative bg-black/60 flex items-center justify-center">
                          <img
                            src={bImg}
                            alt={`${bName} Circle Icon`}
                            className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover/brand:scale-110"
                          />
                        </div>
                        <span className="font-serif text-lg sm:text-2xl font-bold text-gold tracking-[2px] sm:tracking-[3px] whitespace-nowrap group-hover/brand:text-white transition-colors duration-300">
                          {bName}
                        </span>
                      </div>
                      <span className="text-white/20 mx-4 sm:mx-8 self-center select-none">•</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </motion.div>
      </section>

      {/* 3. Core Values Section */}
      <section className="scroll-section py-10 sm:py-16 md:py-20 px-6 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-8 sm:mb-12 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/40 font-mono font-semibold">
            {activeHome?.coreValues?.badge || "HOW WE MOVE"}
          </span>
        </div>
        <div className="core-values-grid grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8 max-w-7xl mx-auto">
          {coreValuesList.map((val: any, idx: number) => (
            <div key={idx} className="glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl border-t-4 border-t-gold/40 hover:border-t-gold transition-all duration-300 flex flex-col items-center justify-center text-center">
              <h3 className="typo-h4 mb-2 sm:mb-3 !text-[#FACC15] font-serif text-center font-bold tracking-wide" style={{ color: "#FACC15" }}>{val.title}</h3>
              <p className="text-gray-300 text-xs sm:text-sm font-light leading-relaxed text-center max-w-md">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Global Reach & Statistics */}
      <section className="scroll-section py-10 sm:py-16 md:py-20 bg-[#050505] border-y border-white/5 px-6 sm:px-6 md:px-12 relative z-10 text-center">
        <div className="flex justify-center mb-6 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/40 font-mono font-semibold">
            {activeHome?.statistics?.badge || "GLOBAL REACH & STATISTICS"}
          </span>
        </div>
        <div className="max-w-7xl mx-auto">
          <h2 className="typo-h2 mb-8 sm:mb-12">
            {activeHome?.statistics?.heading?.split("&")[0] || "Influence &"} <span className="text-gold italic font-bold">{activeHome?.statistics?.heading?.split("&")[1] || "Impact"}</span>
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8">
            {statsList.map((stat: any, idx: number) => {
              const isMonthlyViews = /monthly views/i.test(stat.label);
              return (
                <div key={idx} className="glass-panel p-4 sm:p-8 rounded-2xl border border-white/5 hover:border-gold/30 transition-colors">
                  {isMonthlyViews ? (
                    <span className="font-serif text-2xl sm:text-4xl font-black text-gold block mb-1 sm:mb-2">
                      1B+
                    </span>
                  ) : (
                    <AnimatedCounter 
                      value={stat.number} 
                      className="font-serif text-2xl sm:text-4xl font-black text-gold block mb-1 sm:mb-2" 
                    />
                  )}
                  <span className="text-gray-400 text-[10px] sm:text-xs font-mono uppercase tracking-wider">{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Video Showcase Section */}
      <section className="scroll-section py-10 sm:py-16 md:py-20 px-6 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10 text-left">
        <div className="flex justify-center mb-8 sm:mb-12 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/40 font-mono font-semibold">
            FEATURED VIDEO SHOWCASE
          </span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 sm:mb-10 gap-4 sm:gap-8 px-2 sm:px-0">
          <div>
            <p className="typo-badge mb-2 sm:mb-4">OUR WORK</p>
            <h2 className="typo-h2">
              Craft <span className="text-gold italic font-bold">In Motion</span>
            </h2>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="flex flex-col gap-10 sm:gap-16 md:gap-20 w-full max-w-7xl mx-auto video-showcase-grid-container">
          {(() => {
            const rawShortsReels = (
              (homeData?.shortsReels?.list && homeData.shortsReels.list.length > 0 && homeData.shortsReels.list) ||
              (homeData?.reelsList && homeData.reelsList.length > 0 && homeData.reelsList) ||
              (dbData?.homepageCMS?.shortsReels?.list && dbData.homepageCMS.shortsReels.list.length > 0 && dbData.homepageCMS.shortsReels.list) ||
              (dbData?.homepageCMS?.reelsList && dbData.homepageCMS.reelsList.length > 0 && dbData.homepageCMS.reelsList) ||
              (dbData?.homepage?.shortsReels?.list && dbData.homepage.shortsReels.list.length > 0 && dbData.homepage.shortsReels.list) ||
              null
            );

            const cmsReels = (rawShortsReels && rawShortsReels.length > 0)
              ? rawShortsReels.filter((v: any) => v.status === "Active" || v.status === true || v.status === undefined || v.visible !== false)
              : (filteredVideos.filter((v: any) => v.type === "reel" || v.type === "short"));

            const cmsLongVideos = (
              (homeData?.longVideos?.list && homeData.longVideos.list.length > 0 && homeData.longVideos.list) ||
              (homeData?.featuredVideos && homeData.featuredVideos.length > 0 && homeData.featuredVideos.filter((v: any) => v.status === "Active" || v.status === true || v.status === undefined)) ||
              (dbData?.homepageCMS?.longVideos?.list && dbData.homepageCMS.longVideos.list.length > 0 && dbData.homepageCMS.longVideos.list) ||
              (dbData?.featuredVideos && dbData.featuredVideos.length > 0 && dbData.featuredVideos) ||
              undefined
            );

            return (
              <>
                <StripeReelsCarousel reels={cmsReels} isHomePage={true} />
                
                <div className="mt-4 sm:mt-6 md:mt-10 w-full max-w-[100vw] overflow-hidden">
                  <LongVideosCarousel videos={cmsLongVideos} isHomePage={true} />
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* 7. Brand Collaborations Grid (Original Logo Size, Reduced Inner Gap, Centered) */}
      <section className="scroll-section py-10 sm:py-16 md:py-20 px-3 sm:px-6 max-w-6xl mx-auto relative z-10 text-center flex flex-col items-center justify-center">
        {/* Small Badge */}
        <div className="flex justify-center mb-4 sm:mb-6 relative z-20">
          <span className="typo-badge text-gold/80 border border-gold/30 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/50 font-mono font-semibold tracking-[2px] sm:tracking-[3px] uppercase text-[10px] sm:text-xs">
            {activeHome?.brandCollaborations?.badge || "BRAND COLLABORATIONS"}
          </span>
        </div>

        {/* Main Heading & Subtitle */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-12 relative z-20">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white mb-3 sm:mb-4 tracking-tight">
            {(() => {
              const rawHeading = activeHome?.brandCollaborations?.heading;
              if (rawHeading && !rawHeading.includes("Trusted By") && !rawHeading.includes("Leading Technology Brands")) {
                const words = rawHeading.split(" ");
                return (
                  <>
                    {words[0]}{" "}
                    <span className="text-gold italic font-bold">
                      {words.slice(1).join(" ")}
                    </span>
                  </>
                );
              }
              return (
                <>
                  Creative <span className="text-gold italic font-bold">Collabs</span>
                </>
              );
            })()}
          </h2>
        </div>

        {/* Luxury Brand Wall (16 Exact Image 1 Brands - Transparent Pure White Vector Marks, Zero Background Rectangle) */}
        {(() => {
          const lenskartSvgStr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 90" width="320" height="90"><g fill="none" stroke="white" stroke-width="7"><circle cx="35" cy="45" r="20"/><circle cx="75" cy="45" r="20"/></g><text x="110" y="56" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="42" fill="white">lenskart</text></svg>';
          const lenskartLogoB64 = `data:image/svg+xml;base64,${btoa(lenskartSvgStr)}`;

          const ultravioletteSvgStr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 100" width="540" height="100"><polygon points="30,25 80,25 55,75" fill="none" stroke="white" stroke-width="10" stroke-linejoin="round"/><text x="110" y="62" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="38" fill="white" letter-spacing="7">ULTRAVIOLETTE</text></svg>';
          const ultravioletteLogoB64 = `data:image/svg+xml;base64,${btoa(ultravioletteSvgStr)}`;

          const mahindraSvgStr = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 360" width="500" height="360"><g fill="white"><path d="M 30,10 L 235,240 L 165,350 L 125,350 Z" /><path d="M 30,10 L 165,350 L 235,240 Z" fill="#E2E8F0" /><path d="M 470,10 L 265,240 L 335,350 L 375,350 Z" /><path d="M 470,10 L 335,350 L 265,240 Z" fill="#CBD5E1" /></g></svg>';
          const mahindraLogoB64 = `data:image/svg+xml;base64,${btoa(mahindraSvgStr)}`;

          const brandVectorMap: Record<string, { icon: string; fallback: any }> = {
            amazon: { icon: "https://cdn.simpleicons.org/amazon/white", fallback: amazonLogo },
            asus: { icon: "https://cdn.simpleicons.org/asus/white", fallback: asusLogo },
            dell: { icon: "https://cdn.simpleicons.org/dell/white", fallback: dellLogo },
            flipkart: { icon: flipkartLogo, fallback: flipkartLogo },
            huawei: { icon: "https://cdn.simpleicons.org/huawei/white", fallback: huaweiLogo },
            iqoo: { icon: "https://cdn.simpleicons.org/iqoo/white", fallback: iqooLogo },
            mahindra: { icon: mahindraLogoB64, fallback: mahindraLogoB64 },
            xiaomi: { icon: "https://cdn.simpleicons.org/xiaomi/white", fallback: miLogo },
            mi: { icon: "https://cdn.simpleicons.org/xiaomi/white", fallback: miLogo },
            motorola: { icon: "https://cdn.simpleicons.org/motorola/white", fallback: motorolaLogo },
            oneplus: { icon: "https://cdn.simpleicons.org/oneplus/white", fallback: oneplusLogo },
            oppo: { icon: "https://cdn.simpleicons.org/oppo/white", fallback: oppoLogo },
            "google pixel": { icon: "https://cdn.simpleicons.org/google/white", fallback: pixelLogo },
            google: { icon: "https://cdn.simpleicons.org/google/white", fallback: pixelLogo },
            pixel: { icon: "https://cdn.simpleicons.org/google/white", fallback: pixelLogo },
            poco: { icon: pocoLogo, fallback: pocoLogo },
            realme: { icon: realmeLogo, fallback: realmeLogo },
            samsung: { icon: "https://cdn.simpleicons.org/samsung/white", fallback: samsungLogo },
            vivo: { icon: "https://cdn.simpleicons.org/vivo/white", fallback: vivoLogo },
            cashify: { icon: cashifyLogo, fallback: cashifyLogo },
            noise: { icon: "TEXT_FALLBACK", fallback: "TEXT_FALLBACK" },
            nothing: { icon: "https://cdn.simpleicons.org/nothing/white", fallback: nothingLogo },
            blinkit: { icon: "https://cdn.simpleicons.org/blinkit/white", fallback: blinkitLogo },
            lenskart: { icon: lenskartLogoB64, fallback: lenskartLogoB64 },
            "the sleep company": { icon: "https://cdn.simpleicons.org/thesleepcompany/white", fallback: sleepCompanyLogo },
            "fire-boltt": { icon: "https://cdn.simpleicons.org/fireboltt/white", fallback: fireboltLogo },
            fireboltt: { icon: "https://cdn.simpleicons.org/fireboltt/white", fallback: fireboltLogo },
            ultraviolette: { icon: ultravioletteLogoB64, fallback: ultravioletteLogoB64 },
            tesla: { icon: "https://cdn.simpleicons.org/tesla/white", fallback: teslaLogo },
            tata: { icon: "https://cdn.simpleicons.org/tata/white", fallback: tataLogo },
            hyundai: { icon: "https://cdn.simpleicons.org/hyundai/white", fallback: hyundaiLogo },
            kia: { icon: "https://cdn.simpleicons.org/kia/white", fallback: kiaLogo }
          };

          const oldBrands = [
            "Amazon", "Asus", "Dell", "Flipkart", "Huawei", "IQOO", "Fire-Boltt", "Xiaomi",
            "Motorola", "OnePlus", "Oppo", "Google Pixel", "Poco", "Realme", "Samsung", "Vivo"
          ];
          const newBrands = [
            "boAt", "Cashify", "Sony", "Nothing", "Blinkit", "Lenskart", 
            "The Sleep Company", "Noise", "Mahindra", "Tesla", "Tata", 
            "Hyundai", "Kia", "Ultraviolette"
          ];
          const requestedBrands = [...oldBrands, ...newBrands];

          const defaultBrandCollabs = requestedBrands.map((name) => {
            const clean = name.toLowerCase();
            const cleanAlphanumeric = name.toLowerCase().replace(/[^a-z0-9]/g, "");
            const mappedInfo = brandVectorMap[clean];
            
            const generatedFallback = 'TEXT_FALLBACK';
            
            return {
              brandName: name,
              logo: mappedInfo ? mappedInfo.icon : `https://cdn.simpleicons.org/${cleanAlphanumeric}/white`,
              fallbackLogo: mappedInfo ? mappedInfo.fallback : generatedFallback
            };
          });

          const rawCollabs = (liveHomeData?.brandCollaborations?.brands && liveHomeData.brandCollaborations.brands.length > 0)
            ? liveHomeData.brandCollaborations.brands
            : ((activeHome?.brandCollaborations?.brands && activeHome.brandCollaborations.brands.length > 0)
              ? activeHome.brandCollaborations.brands
              : (homeData?.brandCollaborationsList && homeData.brandCollaborationsList.length > 0
                ? homeData.brandCollaborationsList
                : defaultBrandCollabs));

          const activeCollabs = rawCollabs.filter((b: any) => b.deleted !== true && (b.status === "Active" || b.status === true || b.status === undefined || b.visible !== false));

          // Sanitize activeCollabs so Marshall is replaced with Fire-Boltt, and Fire-Boltt position becomes Mahindra
          const sanitizedCollabs = activeCollabs.map((b: any) => {
            const bName = b.brandName || b.name || "";
            if (/marshall/i.test(bName)) {
              return { ...b, brandName: "Fire-Boltt", logoUrl: "", logo: "" };
            }
            if (/fire-?boltt?/i.test(bName)) {
              return { ...b, brandName: "Mahindra", logoUrl: "", logo: "" };
            }
            return b;
          }).filter((b: any) => !/marshall/i.test(b.brandName || b.name || ""));

          const displayCollabs = (sanitizedCollabs.length > 0 ? sanitizedCollabs : defaultBrandCollabs).map((b: any) => {
            const bName = b.brandName || b.name || "";
            const cleanName = bName.toLowerCase().trim();
            const cleanAlphanumeric = bName.toLowerCase().replace(/[^a-z0-9]/g, "");
            
            const generatedFallback = 'TEXT_FALLBACK';
            const vInfo = brandVectorMap[cleanName];
            const customLogo = b.logoUrl || b.logo || b.imageUrl || b.brandLogo;
            
            return {
              brandName: bName,
              logo: (vInfo ? vInfo.icon : (customLogo || `https://cdn.simpleicons.org/${cleanAlphanumeric}/white`)),
              fallbackLogo: (vInfo ? vInfo.fallback : (customLogo || generatedFallback)),
              isCustom: Boolean(customLogo),
              order: Number(b.order) || 0
            };
          }).sort((a: any, b: any) => a.order - b.order);

          return (
            <div className="relative max-w-6xl mx-auto px-2 sm:px-4 flex flex-col items-center justify-center">
              {/* Background Ambient Aurora Glow behind Grid */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

              {/* Luxury Apple + Linear Grid Wall Container */}
              <div className="border border-white/5 rounded-2xl sm:rounded-3xl overflow-hidden bg-black/30 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] relative z-10 p-2 sm:p-5 w-full">
                <motion.div 
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: { staggerChildren: 0.04 }
                    }
                  }}
                  className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-2.5 w-full items-center justify-items-center"
                >
                  {displayCollabs.map((brand: any, idx: number) => {
                    const bName = brand.brandName;
                    const isUltra = bName.toLowerCase().includes("ultraviolet");
                    const isCashify = bName.toLowerCase() === "cashify";
                    const isLenskart = bName.toLowerCase() === "lenskart";

                    const imgClasses = isUltra
                      ? "h-4 sm:h-6 md:h-7 w-auto max-w-[80px] sm:max-w-[130px] md:max-w-[150px]"
                      : (isCashify
                        ? "h-3.5 sm:h-5 md:h-6 w-auto max-w-[70px] sm:max-w-[105px] md:max-w-[125px]"
                        : (isLenskart
                          ? "h-6 sm:h-9 md:h-11 w-auto max-w-[90px] sm:max-w-[160px] md:max-w-[200px]"
                          : "h-9 sm:h-14 md:h-18 w-auto max-w-[110px] sm:max-w-[220px] md:max-w-[280px]"));

                    const logoFilter = isCashify
                      ? "brightness(2.8) contrast(150%) grayscale(1)"
                      : "grayscale(1) brightness(1.2)";

                    return (
                      <motion.div
                        key={`${bName}-${idx}`}
                        variants={{
                          hidden: { opacity: 0, y: 15, scale: 0.96 },
                          show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        whileHover={{ y: -3, scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="group relative flex items-center justify-center p-1 sm:p-4 h-18 sm:h-28 md:h-32 w-full rounded-xl sm:rounded-2xl transition-all duration-300 hover:bg-white/[0.04] hover:shadow-[inset_0_0_35px_rgba(255,255,255,0.03)] select-none cursor-pointer overflow-hidden"
                      >
                        {/* Subtle Cell Hover Ambient Light Sweep */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <img
                          src={brand.logo}
                          alt={bName}
                          loading="eager"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (brand.fallbackLogo === 'TEXT_FALLBACK') {
                              target.style.display = 'none';
                              if (target.nextElementSibling) {
                                (target.nextElementSibling as HTMLElement).style.display = 'block';
                              }
                            } else if (brand.fallbackLogo && target.src !== brand.fallbackLogo) {
                              target.src = brand.fallbackLogo;
                            }
                          }}
                          className={`${imgClasses} object-contain transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.7)] relative z-10 mix-blend-screen`}
                          style={{ filter: logoFilter }}
                        />
                        <span 
                          className="text-white font-sans font-bold text-lg sm:text-2xl tracking-[4px] uppercase text-center transition-all duration-500 opacity-70 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.7)] relative z-10"
                          style={{ display: 'none' }}
                        >
                          {bName}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>
          );
        })()}
      </section>


      {/* Contact Preview */}
      <section className="scroll-section py-10 sm:py-16 md:py-20 px-6 sm:px-6 md:px-12 max-w-7xl mx-auto relative z-10 text-center">
        <div className="flex justify-center mb-6 sm:mb-10 relative z-20">
          <span className="typo-badge text-gold/70 border border-gold/25 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/40 font-mono font-semibold text-[10px] sm:text-xs">{contactTag}</span>
        </div>
        <h2 className="typo-h2 mb-6 sm:mb-8 fade-up">
          {contactHeading}
        </h2>
        <button
          onClick={() => handleNavClick("contact")}
          className="light-sweep px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-black font-bold uppercase text-[11px] sm:text-xs tracking-[2px] rounded-full hover:bg-gold hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(255,255,255,0.1)] fade-up cursor-pointer"
        >{contactCtaText}</button>
      </section>

      {/* Lightbox Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4">
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedVideo(null)} />
          
          <div className="relative w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] bg-[#070707] rounded-3xl border border-white/10 overflow-y-auto md:overflow-hidden shadow-2xl flex flex-col md:flex-row z-50">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Video Player */}
            <div className={`flex-1 bg-black flex items-center justify-center ${selectedVideo.aspectRatio === "9/16" ? "md:max-w-md mx-auto" : "w-full"}`}>
              <video 
                src={selectedVideo.url} 
                controls 
                playsInline
                className="w-full h-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Details Side-panel */}
            <div className="p-6 md:p-8 md:w-80 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 bg-[#090909]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[2px] text-gold block mb-2">
                  {selectedVideo.category}
                </span>
                <h3 className="font-serif text-2xl text-white font-semibold leading-tight mb-4">
                  {selectedVideo.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light mb-6">
                  This showcase demonstrates our high-production-value video assets, structured to engage audiences across modern content distributions.
                </p>
              </div>

              <div className="pt-6 border-t border-white/5">
                <span className="text-[9px] font-mono uppercase text-gray-500 block mb-1">Source Stream</span>
                <span className="text-xs text-gold font-mono tracking-wider font-semibold">SECURE CDN DIRECT LINK</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
