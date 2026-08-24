import { useState, useEffect, useCallback } from "react";
import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { SceneContainer } from "./three/SceneContainer";
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { useData } from "./context/DataContext";
import { BackgroundVideo } from "./components/BackgroundVideo";
import { ScrollToTop } from "./components/ScrollToTop";
import { SEO } from "./components/SEO";
import { initAnalytics, trackPageView } from "./utils/analytics";
import gsap from "gsap";

// Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Journey } from "./pages/Journey";
import { Mission } from "./pages/Mission";
import { WhatWeDo } from "./pages/WhatWeDo";
import { Services } from "./pages/Services";
import { Collaborations } from "./pages/Collaborations";
import { Campaigns } from "./pages/Campaigns";
import { ProductLaunches } from "./pages/ProductLaunches";
import { Events } from "./pages/Events";
import { Portfolio } from "./pages/Portfolio";
import { Gallery } from "./pages/Gallery";
import { Media } from "./pages/Media";
import { Testimonials } from "./pages/Testimonials";
import { Career } from "./pages/Career";
import { Blog } from "./pages/Blog";
import { BlogDetails } from "./pages/BlogDetails";
import { FAQ } from "./pages/FAQ";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";


// Slug Mapping Helpers
const getPageIdFromPath = (path: string): string => {
  const cleanPath = path.toLowerCase().replace(/\/+$/, "").replace(/^\//, "");
  if (!cleanPath || cleanPath === "") return "home";
  if (cleanPath === "privacy-policy" || cleanPath === "privacy") return "privacy";
  if (cleanPath === "terms-of-service" || cleanPath === "terms") return "terms";
  if (cleanPath.startsWith("blog/")) {
    return `blog-details/${cleanPath.split("blog/")[1]}`;
  }
  const VALID_PAGES = [
    "home", "about", "journey", "mission", "what-we-do", "services",
    "collaborations", "campaigns", "product-launches", "events", "portfolio",
    "gallery", "media", "testimonials", "career", "blog", "faq", "contact",
    "privacy", "terms"
  ];
  if (VALID_PAGES.includes(cleanPath)) return cleanPath;
  return "not-found";
};

const getPathFromPageId = (pageId: string): string => {
  if (pageId === "home") return "/";
  if (pageId === "privacy") return "/privacy-policy";
  if (pageId === "terms") return "/terms-of-service";
  if (pageId.startsWith("blog-details/")) {
    return `/blog/${pageId.split("blog-details/")[1]}`;
  }
  if (pageId === "not-found") return "/404";
  return `/${pageId}`;
};

function App() {
  const [activePage, setActivePage] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return getPageIdFromPath(window.location.pathname);
    }
    return "home";
  });
  const { dbData } = useData();

  // Initialize Analytics once dbData is ready
  useEffect(() => {
    const gaId = dbData?.globalSEO?.gaMeasurementId;
    const gtmId = dbData?.globalSEO?.gtmContainerId;
    initAnalytics(gaId, gtmId);
  }, [dbData?.globalSEO]);

  // Track Page Views on activePage transition
  useEffect(() => {
    const currentPath = getPathFromPageId(activePage);
    trackPageView(currentPath, document.title || "Tech Master");
  }, [activePage]);

  // Handle Browser Back/Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const page = getPageIdFromPath(window.location.pathname);
      setActivePage(page);
      window.scrollTo(0, 0);
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigatePage = useCallback((pageId: string) => {
    if (pageId === activePage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0);
      }
      return;
    }

    const targetPath = getPathFromPageId(pageId);
    if (typeof window !== "undefined" && window.location.pathname !== targetPath) {
      window.history.pushState({ pageId }, "", targetPath);
    }

    // Trigger smooth overlay entrance
    gsap.to(".page-transition-overlay", {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      duration: 0.6,
      ease: "power3.inOut",
      onComplete: () => {
        setActivePage(pageId);
        window.scrollTo(0, 0);
        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { immediate: true });
        }

        // Trigger overlay exit
        gsap.to(".page-transition-overlay", {
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          duration: 0.6,
          delay: 0.15,
          ease: "power3.inOut",
        });
      },
    });
  }, [activePage]);

  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return <Home onChangePage={navigatePage} />;
      case "about":
        return <About />;
      case "journey":
        return <Journey />;
      case "mission":
        return <Mission />;
      case "what-we-do":
        return <WhatWeDo />;
      case "services":
        return <Services />;
      case "collaborations":
        return <Collaborations />;
      case "campaigns":
        return <Campaigns />;
      case "product-launches":
        return <ProductLaunches />;
      case "events":
        return <Events />;
      case "portfolio":
        return <Portfolio />;
      case "gallery":
        return <Gallery />;
      case "media":
        return <Media />;
      case "testimonials":
        return <Testimonials />;
      case "career":
        return <Career />;
      case "blog":
        return <Blog onChangePage={navigatePage} />;
      case "faq":
        return <FAQ />;
      case "contact":
        return <Contact />;
      case "privacy":
      case "privacy-policy":
        return <Privacy />;
      case "terms":
      case "terms-of-service":
        return <Terms />;
      case "not-found":
        return <NotFound onChangePage={navigatePage} />;
      default:
        if (activePage.startsWith("blog-details/")) {
          const slug = activePage.split("blog-details/")[1];
          return <BlogDetails slug={slug} onChangePage={navigatePage} />;
        }
        return <NotFound onChangePage={navigatePage} />;
    }
  };

  return (
    <>
      {/* 1. Dynamic Head Metadata, Canonicals, Open Graph & Structured Data */}
      <SEO pageId={activePage} dbSEO={dbData} />

      {/* 3. Custom Magnetic Cursor */}
      <CustomCursor />

      {/* 4. Global Noise Grain overlay */}
      <div className="noise-overlay" />

      {/* 5. Background Loop Videos */}
      <BackgroundVideo activePage={activePage} />

      {/* 6. R3F Spatial 3D Canvas Background */}
      <SceneContainer />

      {/* 7. Global Page Transition Overlay */}
      <div
        className="page-transition-overlay fixed inset-0 bg-[#0d0d0d] z-[9999] pointer-events-none"
        style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
      />

      {/* 8. Floating Global Scroll to Top Button */}
      <ScrollToTop />

      {/* 9. Smooth Scroll Chassis & Content Layout */}
      <SmoothScroll>
        <div 
          className="relative min-h-screen flex flex-col justify-between overflow-x-hidden selection:bg-gold selection:text-black"
          style={{ zIndex: 10 }}
        >
          
          {/* Header Sticky Navigation */}
          <Header activePage={activePage} onChangePage={navigatePage} />

          {/* Dynamic Page Views */}
          <main className="flex-grow z-10">
            {renderActivePage()}
          </main>

          {/* Premium Multi-column Footer */}
          {activePage !== "contact" && (
            <Footer onChangePage={navigatePage} />
          )}
        </div>
      </SmoothScroll>
    </>
  );
}

export default App;
