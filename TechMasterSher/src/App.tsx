import {
  useState,
  useEffect,
  useCallback,
  lazy,
  Suspense,
} from "react";

import { CustomCursor } from "./components/CustomCursor";
import { SmoothScroll } from "./components/SmoothScroll";
import { Header } from "./layouts/Header";
import { Footer } from "./layouts/Footer";
import { useData } from "./context/DataContext";
import { BackgroundVideo } from "./components/BackgroundVideo";
import { ScrollToTop } from "./components/ScrollToTop";
import { SEO } from "./components/SEO";
import {
  initAnalytics,
  trackPageView,
} from "./utils/analytics";

import gsap from "gsap";

/* -------------------------------------------------------------------------- */
/* HOME - KEEP EAGER                                                          */
/* -------------------------------------------------------------------------- */

import { Home } from "./pages/Home";

/* -------------------------------------------------------------------------- */
/* LAZY LOAD ALL NON-HOME PAGES                                               */
/* -------------------------------------------------------------------------- */

const About = lazy(() =>
  import("./pages/About").then((m) => ({
    default: m.About,
  }))
);

const Journey = lazy(() =>
  import("./pages/Journey").then((m) => ({
    default: m.Journey,
  }))
);

const Mission = lazy(() =>
  import("./pages/Mission").then((m) => ({
    default: m.Mission,
  }))
);

const WhatWeDo = lazy(() =>
  import("./pages/WhatWeDo").then((m) => ({
    default: m.WhatWeDo,
  }))
);

const Services = lazy(() =>
  import("./pages/Services").then((m) => ({
    default: m.Services,
  }))
);

const Collaborations = lazy(() =>
  import("./pages/Collaborations").then((m) => ({
    default: m.Collaborations,
  }))
);

const Campaigns = lazy(() =>
  import("./pages/Campaigns").then((m) => ({
    default: m.Campaigns,
  }))
);

const ProductLaunches = lazy(() =>
  import("./pages/ProductLaunches").then((m) => ({
    default: m.ProductLaunches,
  }))
);

const Events = lazy(() =>
  import("./pages/Events").then((m) => ({
    default: m.Events,
  }))
);

const Portfolio = lazy(() =>
  import("./pages/Portfolio").then((m) => ({
    default: m.Portfolio,
  }))
);

const Gallery = lazy(() =>
  import("./pages/Gallery").then((m) => ({
    default: m.Gallery,
  }))
);

const Media = lazy(() =>
  import("./pages/Media").then((m) => ({
    default: m.Media,
  }))
);

const Testimonials = lazy(() =>
  import("./pages/Testimonials").then((m) => ({
    default: m.Testimonials,
  }))
);

const Career = lazy(() =>
  import("./pages/Career").then((m) => ({
    default: m.Career,
  }))
);

const Blog = lazy(() =>
  import("./pages/Blog").then((m) => ({
    default: m.Blog,
  }))
);

const BlogDetails = lazy(() =>
  import("./pages/BlogDetails").then((m) => ({
    default: m.BlogDetails,
  }))
);

const FAQ = lazy(() =>
  import("./pages/FAQ").then((m) => ({
    default: m.FAQ,
  }))
);

const Contact = lazy(() =>
  import("./pages/Contact").then((m) => ({
    default: m.Contact,
  }))
);

const Privacy = lazy(() =>
  import("./pages/Privacy").then((m) => ({
    default: m.Privacy,
  }))
);

const Terms = lazy(() =>
  import("./pages/Terms").then((m) => ({
    default: m.Terms,
  }))
);

const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({
    default: m.NotFound,
  }))
);

/* -------------------------------------------------------------------------- */
/* THREE.JS                                                                   */
/* -------------------------------------------------------------------------- */

const SceneContainer = lazy(() =>
  import("./three/SceneContainer").then((m) => ({
    default: m.SceneContainer,
  }))
);

/* -------------------------------------------------------------------------- */
/* ROUTING                                                                    */
/* -------------------------------------------------------------------------- */

const getPageIdFromPath = (path: string): string => {
  const cleanPath = path
    .toLowerCase()
    .replace(/\/+$/, "")
    .replace(/^\//, "");

  if (!cleanPath) {
    return "home";
  }

  if (
    cleanPath === "privacy-policy" ||
    cleanPath === "privacy"
  ) {
    return "privacy";
  }

  if (
    cleanPath === "terms-of-service" ||
    cleanPath === "terms"
  ) {
    return "terms";
  }

  if (
    cleanPath === "contact-us" ||
    cleanPath === "contact_us" ||
    cleanPath === "contactpage" ||
    cleanPath === "contacts" ||
    cleanPath === "get-in-touch" ||
    cleanPath === "talk" ||
    cleanPath === "contact"
  ) {
    return "contact";
  }

  if (
    cleanPath === "our-work" ||
    cleanPath === "what-we-do"
  ) {
    return "what-we-do";
  }

  if (
    cleanPath === "about-us" ||
    cleanPath === "about"
  ) {
    return "about";
  }

  if (cleanPath.startsWith("blog/")) {
    const slug = cleanPath.substring(5);

    if (slug) {
      return `blog-details/${slug}`;
    }

    return "blog";
  }

  const VALID_PAGES = [
    "home",
    "about",
    "journey",
    "mission",
    "what-we-do",
    "services",
    "collaborations",
    "campaigns",
    "product-launches",
    "events",
    "portfolio",
    "gallery",
    "media",
    "testimonials",
    "career",
    "blog",
    "faq",
    "contact",
    "privacy",
    "terms",
  ];

  if (VALID_PAGES.includes(cleanPath)) {
    return cleanPath;
  }

  return "not-found";
};

const getPathFromPageId = (pageId: string): string => {
  const cleanId = (pageId || "")
    .toLowerCase()
    .replace(/^\//, "")
    .replace(/\/+$/, "");

  if (cleanId === "home" || cleanId === "") {
    return "/";
  }

  if (cleanId === "privacy" || cleanId === "privacy-policy") {
    return "/privacy-policy";
  }

  if (cleanId === "terms" || cleanId === "terms-of-service") {
    return "/terms-of-service";
  }

  if (
    cleanId === "contact" ||
    cleanId === "contact-us" ||
    cleanId === "contact_us" ||
    cleanId === "contactpage" ||
    cleanId === "contacts" ||
    cleanId === "get-in-touch" ||
    cleanId === "talk"
  ) {
    return "/contact";
  }

  if (cleanId.startsWith("blog-details/")) {
    return `/blog/${cleanId.substring(
      "blog-details/".length
    )}`;
  }

  if (cleanId === "not-found") {
    return "/404";
  }

  return `/${cleanId}`;
};

/* -------------------------------------------------------------------------- */
/* PAGE LOADER                                                                */
/* -------------------------------------------------------------------------- */

const PageLoader = () => {
  return (
    <div
      className="min-h-[60vh] flex items-center justify-center"
      aria-label="Loading page"
    >
      <div
        className="
          w-6
          h-6
          rounded-full
          border
          border-white/20
          border-t-white
          animate-spin
        "
      />
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* APP                                                                        */
/* -------------------------------------------------------------------------- */

function App() {
  const [activePage, setActivePage] =
    useState<string>(() => {
      if (typeof window !== "undefined") {
        return getPageIdFromPath(
          window.location.pathname
        );
      }

      return "home";
    });

  const { dbData } = useData();

  /* ------------------------------------------------------------------------ */
  /* ANALYTICS                                                               */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const gaId =
      dbData?.globalSEO?.gaMeasurementId;

    const gtmId =
      dbData?.globalSEO?.gtmContainerId;

    /*
     * Delay analytics so it doesn't compete
     * with the critical first render.
     */
    const timer = window.setTimeout(() => {
      initAnalytics(gaId, gtmId);
    }, 2500);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    dbData?.globalSEO?.gaMeasurementId,
    dbData?.globalSEO?.gtmContainerId,
  ]);

  /* ------------------------------------------------------------------------ */
  /* PAGE VIEW                                                                */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const currentPath =
      getPathFromPageId(activePage);

    /*
     * Don't execute tracking during the critical
     * rendering phase.
     */
    const timer = window.setTimeout(() => {
      trackPageView(
        currentPath,
        document.title || "Tech Master"
      );
    }, 1000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [activePage]);

  /* ------------------------------------------------------------------------ */
  /* BROWSER BACK / FORWARD                                                   */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const handlePopState = () => {
      const page = getPageIdFromPath(
        window.location.pathname
      );

      setActivePage(page);

      window.scrollTo({
        top: 0,
        behavior: "auto",
      });

      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, {
          immediate: true,
        });
      }
    };

    window.addEventListener(
      "popstate",
      handlePopState
    );

    return () => {
      window.removeEventListener(
        "popstate",
        handlePopState
      );
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* NAVIGATION                                                               */
  /* ------------------------------------------------------------------------ */

  const navigatePage = useCallback(
    (pageId: string) => {
      let normalizedId = (pageId || "contact").trim().toLowerCase().replace(/^\//, "").replace(/\/+$/, "");

      if (
        normalizedId === "contact" ||
        normalizedId === "contact-us" ||
        normalizedId === "contact_us" ||
        normalizedId === "contactpage" ||
        normalizedId === "contacts" ||
        normalizedId === "get-in-touch" ||
        normalizedId === "talk"
      ) {
        normalizedId = "contact";
      } else if (normalizedId === "about-us") {
        normalizedId = "about";
      } else if (normalizedId === "our-work") {
        normalizedId = "what-we-do";
      }

      if (normalizedId === activePage) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0);
        }

        return;
      }

      const targetPath =
        getPathFromPageId(normalizedId);

      if (
        typeof window !== "undefined" &&
        window.location.pathname !== targetPath
      ) {
        window.history.pushState(
          { pageId: normalizedId },
          "",
          targetPath
        );
      }

      gsap.to(
        ".page-transition-overlay",
        {
          clipPath:
            "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 0.45,
          ease: "power3.inOut",

          onComplete: () => {
            setActivePage(normalizedId);

            window.scrollTo({
              top: 0,
              behavior: "auto",
            });

            if ((window as any).lenis) {
              (window as any).lenis.scrollTo(
                0,
                {
                  immediate: true,
                }
              );
            }

            gsap.to(
              ".page-transition-overlay",
              {
                clipPath:
                  "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
                duration: 0.45,
                delay: 0.05,
                ease: "power3.inOut",
              }
            );
          },
        }
      );
    },
    [activePage]
  );

  /* ------------------------------------------------------------------------ */
  /* ACTIVE PAGE                                                              */
  /* ------------------------------------------------------------------------ */

  const renderActivePage = () => {
    switch (activePage) {
      case "home":
        return (
          <Home
            onChangePage={navigatePage}
          />
        );

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
        return (
          <Blog
            onChangePage={navigatePage}
          />
        );

      case "faq":
        return <FAQ />;

      case "contact":
        return <Contact />;

      case "privacy":
        return <Privacy />;

      case "terms":
        return <Terms />;

      case "not-found":
        return (
          <NotFound
            onChangePage={navigatePage}
          />
        );

      default:
        if (
          activePage.startsWith(
            "blog-details/"
          )
        ) {
          const slug =
            activePage.substring(
              "blog-details/".length
            );

          return (
            <BlogDetails
              slug={slug}
              onChangePage={navigatePage}
            />
          );
        }

        return (
          <NotFound
            onChangePage={navigatePage}
          />
        );
    }
  };

  /* ------------------------------------------------------------------------ */
  /* UI                                                                       */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      {/* Dynamic SEO */}
      <SEO
        pageId={activePage}
        dbSEO={dbData}
      />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Global Noise */}
      <div
        className="noise-overlay"
        aria-hidden="true"
      />

      {/* Optimized Background Video */}
      <BackgroundVideo
        activePage={activePage}
      />

      {/* Lazy Three.js */}
      <Suspense fallback={null}>
        <SceneContainer />
      </Suspense>

      {/* Page Transition */}
      <div
        className="
          page-transition-overlay
          fixed
          inset-0
          bg-[#0d0d0d]
          z-[9999]
          pointer-events-none
        "
        style={{
          clipPath:
            "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        }}
        aria-hidden="true"
      />

      {/* Scroll To Top */}
      <ScrollToTop />

      {/* Smooth Scroll */}
      <SmoothScroll>
        <div
          className="
            relative
            min-h-screen
            flex
            flex-col
            justify-between
            overflow-x-hidden
            selection:bg-gold
            selection:text-black
          "
          style={{
            zIndex: 10,
          }}
        >
          {/* Header */}
          <Header
            activePage={activePage}
            onChangePage={navigatePage}
          />

          {/* Page */}
          <main className="flex-grow z-10">
            <Suspense fallback={<PageLoader />}>
              {renderActivePage()}
            </Suspense>
          </main>

          {/* Footer */}
          <Footer
            onChangePage={navigatePage}
          />
        </div>
      </SmoothScroll>
    </>
  );
}

export default App;