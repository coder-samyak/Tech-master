import React, { useRef, useState, useEffect, useMemo } from "react";
import { Mail, MapPin } from "lucide-react";
import { Magnetic } from "../components/Magnetic";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useData } from "../context/DataContext";

interface FooterProps {
  onChangePage: (page: string) => void;
}

// 3D Scene Component for the Footer
const MorphingTorus: React.FC = () => {
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const logoTexture = useMemo(() => {
    const tex = new THREE.TextureLoader().load("/Tech MAster Logo.png");
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    return tex;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate outer ring on two axes
    if (outerRingRef.current) {
      outerRingRef.current.rotation.x = time * 0.35;
      outerRingRef.current.rotation.y = time * 0.2;
    }
    
    // Rotate inner ring in opposite directions
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y = -time * 0.45;
      innerRingRef.current.rotation.z = time * 0.3;
    }

    // Gentle wobble for logo center
    if (coreRef.current) {
      coreRef.current.rotation.y = Math.sin(time * 0.5) * 0.15;
    }
  });

  return (
    <group scale={1.25}>
      {/* Outer Yellow Ring */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[0.58, 0.009, 16, 80]} />
        <meshStandardMaterial
          color="#FACC15"
          metalness={0.8}
          roughness={0.2}
          emissive="#EAB308"
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* Inner Cyan/Electric Blue Ring */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[0.45, 0.009, 16, 80]} />
        <meshStandardMaterial
          color="#00E5FF"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Center Tech Master Logo */}
      <mesh ref={coreRef}>
        <planeGeometry args={[0.9, 0.9]} />
        <meshBasicMaterial
          map={logoTexture}
          transparent={true}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

// Custom Particle Emitter Component inside the footer
const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      opacity: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        speedY: -Math.random() * 0.5 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Emitter Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(212, 175, 55, 0.4)";

      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        // Update position
        p.y += p.speedY;

        // Reset particles at top boundary
        if (p.y < 0) {
          p.y = height;
          p.x = Math.random() * width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />;
};

export const Footer: React.FC<FooterProps> = ({ onChangePage }) => {
  const { websiteSettings, contactData, footerData } = useData();
  const footerRef = useRef<HTMLElement>(null);
  const [mouseGlow, setMouseGlow] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMouseGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavClick = (pageId: string) => {
    if (pageId === "privacy") {
      window.dispatchEvent(new CustomEvent("open-privacy-modal"));
    } else if (pageId === "terms") {
      window.dispatchEvent(new CustomEvent("open-terms-modal"));
    } else {
      onChangePage(pageId);
    }
  };

  return (
    <footer 
      ref={footerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-gradient-to-b from-black via-[#060606] to-black border-t border-white/10 pt-16 pb-12 px-6 sm:px-10 md:px-16 lg:px-20 overflow-hidden text-left"
    >
      {/* Interactive Mouse Glow Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-700 z-0"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${mouseGlow.x}px ${mouseGlow.y}px, rgba(212, 175, 55, 0.07), transparent 70%)`,
        }}
      />

      {/* HTML5 Particle Canvas */}
      <ParticleCanvas />

      {/* Ambient Rotating Background Glow */}
      <div className="absolute bottom-[-120px] right-[-100px] w-[500px] h-[500px] aurora-glow-purple opacity-15 pointer-events-none blur-[120px] animate-pulse" />

      {/* Top Badge: CREATOR PLATFORM (Sits on top with gap) */}
      <div className="max-w-7xl mx-auto relative z-10 mb-5">
        <span className="text-[11px] font-mono tracking-[2.5px] text-gold uppercase font-bold block">
          CREATOR PLATFORM
        </span>
      </div>

      {/* Main Top Section Grid Layout (Let's Build & Quick Links headers start on the exact same horizontal top line) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 mb-10 sm:mb-14 items-start">
        
        {/* LEFT COLUMN (lg:col-span-5): Branding & Prominent Heading */}
        <div className="lg:col-span-5 flex flex-col justify-start gap-4">
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white leading-[1.1] tracking-tight">
            {footerData?.brandTitle ? (
              <span dangerouslySetInnerHTML={{ __html: footerData.brandTitle.replace(/\n/g, "<br />") }} />
            ) : (
              <>
                Let's Build <br />
                <span className="text-gold font-sans font-extrabold">
                  Something Amazing.
                </span>
              </>
            )}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm font-sans font-normal max-w-md leading-relaxed opacity-90 mt-1">
            {footerData?.brandDescription || "We create premium websites, web applications and digital experiences that help brands grow online. We create premium websites, web applications and digital experiences that help brands grow online."}
          </p>
        </div>

        {/* MIDDLE COLUMNS (lg:col-span-4): 3 Sitemap Columns */}
        <div className="lg:col-span-4 grid grid-cols-3 gap-2 sm:gap-6 pt-1 sm:pt-2">
          {(() => {
            const removedFooterIds = new Set([
              "mission",
              "what-we-do",
              "collaborations",
              "campaigns",
              "product-launches",
              "events",
              "services",
              "testimonials",
              "faq"
            ]);

            const defaultCols = [
              {
                header: "IDENTITY",
                links: [
                  { name: "HOME PAGE", id: "home" },
                  { name: "ABOUT FOUNDER", id: "about" },
                  { name: "JOURNEY", id: "journey" },
                ]
              },
              {
                header: "ENGAGEMENT",
                links: [
                  { name: "OUR WORK", id: "portfolio" },
                  { name: "BLOG", id: "blog" },
                  { name: "CAREERS", id: "career" },
                ]
              },
              {
                header: "QUICK LINKS",
                links: [
                  { name: "CONTACT PAGE", id: "contact" },
                  { name: "PRIVACY POLICY", id: "privacy" },
                  { name: "TERMS OF SERVICE", id: "terms" },
                ]
              }
            ];

            const rawCols = footerData?.columns || defaultCols;
            return rawCols.map((column: any) => ({
              ...column,
              links: (column.links || []).filter((link: any) => !removedFooterIds.has(link.id))
            }));
          })().map((column: any, colIdx: number) => (
            <div key={colIdx}>
              <p className="text-[9px] sm:text-[11px] font-mono tracking-[1.5px] sm:tracking-[2.5px] text-gold uppercase font-bold mb-3 sm:mb-4 block">
                {column.header}
              </p>
              <ul className="flex flex-col gap-[12px] sm:gap-[18px]">
                {column.links?.map((link: any, linkIdx: number) => {
                  const href = link.id === "home" ? "/" : link.id === "portfolio" ? "/what-we-do" : link.id === "privacy" ? "/privacy-policy" : link.id === "terms" ? "/terms-of-service" : `/${link.id}`;
                  return (
                    <li key={linkIdx}>
                      <a
                        href={href}
                        onClick={(e) => { e.preventDefault(); handleNavClick(link.id); }}
                        className="text-[10px] sm:text-[11px] uppercase tracking-wider text-gray-400 hover:text-gold transition-colors duration-200 text-left font-light block leading-tight"
                      >
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN (lg:col-span-3): Taller & Perfectly Balanced 3D Spatial Node Panel */}
        <div className="lg:col-span-3 flex flex-col justify-stretch h-full items-center lg:items-end">
          <div className="glass-panel p-4 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden h-full min-h-[260px] sm:min-h-[380px] w-full max-w-[260px] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 3], fov: 45 }} gl={{ antialias: true, alpha: true }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[2, 2, 2]} intensity={1.5} color="#ffffff" />
                <pointLight position={[-2, -2, 2]} intensity={2.0} color="#aa3bff" />
                <MorphingTorus />
              </Canvas>
            </div>
            <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
              <span className="text-[9px] font-mono tracking-widest text-gold uppercase bg-black/80 px-2.5 py-1 rounded border border-gold/30 font-bold">
                TechMaster
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* BOTTOM HORIZONTAL GRID BAR (2 Cards in 1 Row) */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 relative z-10 mb-8 sm:mb-12">
        
        {/* Card 1: DIRECT MAIL */}
        <motion.a 
          href={`mailto:${footerData?.cards?.email || contactData?.heroSetup?.email || websiteSettings?.email || "hello@techmaster.com"}`}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="group relative glass-panel p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-gold/60 transition-all duration-300 flex items-center gap-3 sm:gap-4 shadow-lg hover:shadow-[0_10px_30px_rgba(212,175,55,0.25)] overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-2xl border border-gold/40 bg-gold/10 flex items-center justify-center text-gold group-hover:scale-110 group-hover:rotate-6 group-hover:bg-gold group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
            <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="overflow-hidden relative z-10">
            <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[1.5px] text-gray-400 font-semibold block mb-0.5 group-hover:text-gold transition-colors">DIRECT MAIL</span>
            <span className="text-xs sm:text-sm font-bold text-white group-hover:text-gold transition-colors block truncate">
              {footerData?.cards?.email || contactData?.heroSetup?.email || websiteSettings?.email || "hello@techmaster.com"}
            </span>
          </div>
        </motion.a>

        {/* Card 4: CREATOR HQ */}
        <motion.a 
          href={footerData?.cards?.googleMapsUrl || websiteSettings?.googleMapsUrl || "#"}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="group relative glass-panel p-3.5 sm:p-4 rounded-2xl bg-black/60 border border-white/10 hover:border-purple-400/60 transition-all duration-300 flex items-center gap-3 sm:gap-4 shadow-lg hover:shadow-[0_10px_30px_rgba(192,132,252,0.25)] overflow-hidden cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-2xl border border-purple-400/40 bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(192,132,252,0.15)]">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="overflow-hidden relative z-10">
            <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-[1.5px] text-gray-400 font-semibold block mb-0.5 group-hover:text-purple-400 transition-colors">CREATOR HQ</span>
            <span className="text-xs sm:text-sm font-bold text-white group-hover:text-purple-400 transition-colors block truncate">
              {footerData?.cards?.creatorHqAddress || "Silicon Valley Creator Lab"}
            </span>
          </div>
        </motion.a>

      </div>

      {/* Footer Bottom copyright and social handles */}
      <div className="max-w-7xl mx-auto pt-6 sm:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6 relative z-10 text-center md:text-left">
        <div className="text-left">
          <p className="text-[10px] uppercase tracking-[2px] text-gray-300 font-light">
            &copy; {new Date().getFullYear()} {footerData?.copyrightText || websiteSettings?.copyrightText || websiteSettings?.companyName || "TECH MASTER MEDIA & CREATIVE LABS. ALL RIGHTS RESERVED."}
          </p>
          <p className="text-[9px] uppercase tracking-[1px] text-gray-500 mt-1 flex items-center gap-3">
            <span>{footerData?.developerText || "Designed and developed by ......."}</span>
            <span>•</span>
            <a 
              href="/privacy-policy"
              onClick={(e) => { e.preventDefault(); handleNavClick("privacy"); }}
              className="text-gray-400 hover:text-gold transition-colors underline cursor-pointer"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a 
              href="/terms-of-service"
              onClick={(e) => { e.preventDefault(); handleNavClick("terms"); }}
              className="text-gray-400 hover:text-gold transition-colors underline cursor-pointer"
            >
              Terms of Service
            </a>
          </p>
        </div>

        {/* Floating Magnetic Social Icons */}
        <div className="flex gap-3.5">
          {[
            { 
              label: "YouTube",
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              ), 
              href: footerData?.socials?.youtube || (websiteSettings as any)?.socials?.youtube || (websiteSettings as any)?.youtubeUrl || "" 
            },
            { 
              label: "LinkedIn",
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              ), 
              href: footerData?.socials?.linkedin || (websiteSettings as any)?.socials?.linkedin || (websiteSettings as any)?.linkedinUrl || "" 
            },
            { 
              label: "Instagram",
              icon: (
                <svg className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              ), 
              href: footerData?.socials?.instagram || (websiteSettings as any)?.socials?.instagram || (websiteSettings as any)?.instagramUrl || "" 
            },
            { 
              label: "Facebook",
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              ), 
              href: footerData?.socials?.facebook || (websiteSettings as any)?.socials?.facebook || (websiteSettings as any)?.facebookUrl || "" 
            },
            { 
              label: "Twitter",
              icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ), 
              href: footerData?.socials?.twitter || (websiteSettings as any)?.socials?.twitter || (websiteSettings as any)?.twitterUrl || "" 
            },
          ]
            .filter((soc) => typeof soc.href === "string" && soc.href.trim().length > 0)
            .map((soc, idx) => (
              <Magnetic key={idx} strength={0.3}>
                <motion.a
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Tech Master on ${soc.label}`}
                  className="w-9 h-9 rounded-full border border-white/10 hover:border-gold/50 flex items-center justify-center text-gray-400 hover:text-gold bg-white/5 transition-all duration-300 shadow-sm"
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 4,
                    delay: idx * 0.5,
                    ease: "easeInOut",
                  }}
                >
                  {soc.icon}
                </motion.a>
              </Magnetic>
            ))}
        </div>
      </div>
    </footer>
  );
};
