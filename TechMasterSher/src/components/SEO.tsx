import { useEffect } from "react";

export interface SEOProps {
  pageId: string;
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  schema?: Record<string, any>;
  dbSEO?: any;
}

/**
 * IMPORTANT:
 * Preferred/canonical domain for the entire website.
 *
 * The live website is:
 * https://www.techmasterco.com/
 *
 * Keep this consistent across:
 * - Canonical URLs
 * - Open Graph URLs
 * - JSON-LD Schema
 * - Sitemap
 * - Robots.txt
 */
const BASE_URL = "https://www.techmasterco.com";

const PAGE_DEFAULTS: Record<
  string,
  {
    title: string;
    description: string;
    slug: string;
    ogType?: string;
  }
> = {
  home: {
    title:
      "Tech Master | Technology, Automotive & Entertainment Media",
    description:
      "Tech Master is an Indian technology, automotive and entertainment media company covering technology, mobility, automotive, entertainment, digital culture and related stories.",
    slug: "/",
    ogType: "website",
  },

  about: {
    title:
      "About Us | Tech Master - Technology & Media Platform",
    description:
      "Learn about Tech Master's journey, leadership, editorial philosophy, and media coverage across tech, automotive, and entertainment.",
    slug: "/about",
    ogType: "website",
  },

  services: {
    title: "Elite Services & Capabilities | Tech Master Studio",
    description:
      "Explore our end-to-end digital solutions including 3D WebGL development, high-end UI/UX architecture, custom shader engineering, and brand strategy.",
    slug: "/services",
    ogType: "website",
  },

  portfolio: {
    title: "Featured Works & Digital Portfolio | Tech Master",
    description:
      "Explore award-winning digital experiences, interactive web applications, and channel case studies developed by Tech Master.",
    slug: "/portfolio",
    ogType: "website",
  },

  collaborations: {
    title: "Brand Alliances & Collaborations | Tech Master",
    description:
      "Discover our global brand partnerships, sponsorships, and high-impact alliances with leading technology and lifestyle leaders.",
    slug: "/collaborations",
    ogType: "website",
  },

  campaigns: {
    title: "Signature Campaigns | Tech Master Creative Lab",
    description:
      "Explore interactive marketing campaigns, viral digital launches, and immersive brand storytelling activations.",
    slug: "/campaigns",
    ogType: "website",
  },

  "product-launches": {
    title: "Product Launches & Spatial Showcases | Tech Master",
    description:
      "Pioneering product reveals with high-fidelity 3D spatial models, interactive configurators, and cinematic visualizers.",
    slug: "/product-launches",
    ogType: "website",
  },

  events: {
    title: "Global Keynotes & Tech Events | Tech Master",
    description:
      "Keynotes, developer summits, live demonstrations, and creative technology conferences hosted and attended by Tech Master.",
    slug: "/events",
    ogType: "website",
  },

  journey: {
    title: "Our Evolution & Milestone Timeline | Tech Master",
    description:
      "Follow the developmental history, breakthrough achievements, and engineering roadmap of Tech Master from inception to date.",
    slug: "/journey",
    ogType: "website",
  },

  mission: {
    title: "Mission, Core Values & Vision | Tech Master",
    description:
      "Empowering creators and enterprises with state-of-the-art interactive digital experiences that redefine the boundaries of the modern web.",
    slug: "/mission",
    ogType: "website",
  },

  "what-we-do": {
    title: "What We Do | Spatial Engineering & Creative Technology",
    description:
      "Delivering bespoke digital craftsmanship, interactive 3D visualizations, and robust scalable web systems.",
    slug: "/what-we-do",
    ogType: "website",
  },

  gallery: {
    title: "Visual Media Gallery & Highlights | Tech Master",
    description:
      "High-resolution visual archives, behind-the-scenes photography, press highlights, and production stills.",
    slug: "/gallery",
    ogType: "website",
  },

  media: {
    title: "Press Coverage & Media Publications | Tech Master",
    description:
      "Featured press articles, media mentions, podcast interviews, and editorial spotlights about Tech Master.",
    slug: "/media",
    ogType: "website",
  },

  testimonials: {
    title: "Client Endorsements & Reviews | Tech Master",
    description:
      "Read verified feedback, executive endorsements, and reviews from global industry clients and creative partners.",
    slug: "/testimonials",
    ogType: "website",
  },

  career: {
    title: "Join Our Team | Careers at Tech Master Studio",
    description:
      "Discover career opportunities for 3D graphics engineers, frontend architects, UI/UX designers, and creative coders.",
    slug: "/career",
    ogType: "website",
  },

  blog: {
    title: "Engineering Insights & Design Journal | Tech Master",
    description:
      "Deep dives into WebGL shaders, Three.js performance optimization, GSAP motion choreography, and modern full-stack development.",
    slug: "/blog",
    ogType: "website",
  },

  faq: {
    title: "Frequently Asked Questions | Tech Master",
    description:
      "Find clear answers regarding our project engagement models, development timelines, technical stacks, and partnership options.",
    slug: "/faq",
    ogType: "website",
  },

  contact: {
    title: "Contact & Project Inquiries | Tech Master Studio",
    description:
      "Get in touch with Tech Master to discuss your upcoming digital project, keynote invitations, or creative collaborations.",
    slug: "/contact",
    ogType: "website",
  },

  privacy: {
    title: "Privacy Policy | Tech Master",
    description:
      "Read our commitment to data protection, user privacy, and responsible information handling standards.",
    slug: "/privacy-policy",
    ogType: "website",
  },

  "privacy-policy": {
    title: "Privacy Policy | Tech Master",
    description:
      "Read our commitment to data protection, user privacy, and responsible information handling standards.",
    slug: "/privacy-policy",
    ogType: "website",
  },

  terms: {
    title: "Terms of Service | Tech Master",
    description:
      "Review the operational terms, licensing agreements, and service conditions governing the Tech Master platform.",
    slug: "/terms-of-service",
    ogType: "website",
  },

  "terms-of-service": {
    title: "Terms of Service | Tech Master",
    description:
      "Review the operational terms, licensing agreements, and service conditions governing the Tech Master platform.",
    slug: "/terms-of-service",
    ogType: "website",
  },

  "not-found": {
    title: "404 - Page Not Found | Tech Master",
    description:
      "The requested page could not be located. Explore our spatial laboratory, digital portfolio, and creative engineering services.",
    slug: "/404",
    ogType: "website",
  },
};

const isOutdatedLuxuryText = (text?: string): boolean => {
  if (!text) return false;
  return /luxury|spatial studio|architect of luxury|3d configurations|3d spatial|digital native/i.test(text);
};

const sanitizeTitle = (val?: string): string | undefined => {
  if (!val || isOutdatedLuxuryText(val)) return undefined;
  return val;
};

const sanitizeDesc = (val?: string): string | undefined => {
  if (!val || isOutdatedLuxuryText(val)) return undefined;
  return val;
};

const sanitizeKeywords = (val?: string): string | undefined => {
  if (!val || isOutdatedLuxuryText(val)) return undefined;
  return val;
};

export const SEO = ({
  pageId,
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage,
  ogType = "website",
  robots,
  schema,
  dbSEO,
}: SEOProps) => {
  useEffect(() => {
    const fallback = PAGE_DEFAULTS[pageId] || PAGE_DEFAULTS.home;

    const globalSEO = dbSEO?.globalSEO || {};
    const pageSEOList = dbSEO?.pageSEO || [];

    const matchedPageSEO = pageSEOList.find(
      (p: any) =>
        p.id === `pseo-${pageId}` ||
        p.slug === `/${pageId}`
    );

    /*
     * ============================================================
     * 1. TITLE
     * ============================================================
     */

    const activeTitle =
      sanitizeTitle(title) ||
      sanitizeTitle(matchedPageSEO?.metaTitle) ||
      (pageId === "home"
        ? sanitizeTitle(globalSEO.defaultTitle) || sanitizeTitle(globalSEO.websiteName)
        : undefined) ||
      fallback.title;

    /*
     * ============================================================
     * 2. DESCRIPTION
     * ============================================================
     */

    const activeDesc =
      sanitizeDesc(description) ||
      sanitizeDesc(matchedPageSEO?.metaDescription) ||
      (pageId === "home"
        ? sanitizeDesc(globalSEO.defaultDescription)
        : undefined) ||
      fallback.description;

    /*
     * ============================================================
     * 3. KEYWORDS
     * ============================================================
     */

    const activeKeywords =
      sanitizeKeywords(keywords) ||
      sanitizeKeywords(matchedPageSEO?.keywords) ||
      sanitizeKeywords(globalSEO.defaultKeywords) ||
      "technology, automotive, mobility, entertainment media, digital culture, tech master";

    /*
     * ============================================================
     * 4. PAGE SLUG
     * ============================================================
     */

    const computedSlug =
      matchedPageSEO?.slug ||
      fallback.slug ||
      `/${pageId}`;

    /*
     * ============================================================
     * 5. CANONICAL URL
     * ============================================================
     *
     * IMPORTANT:
     * If the database contains the old:
     *
     * https://techmaster.com/about
     *
     * it will automatically become:
     *
     * https://www.techmasterco.com/about
     *
     * This prevents www / non-www canonical conflicts.
     */

    const rawCanonical =
      canonicalUrl ||
      matchedPageSEO?.canonicalURL ||
      `${BASE_URL}${computedSlug === "/" ? "" : computedSlug}`;

    const activeCanonical = rawCanonical.replace(
      /^https:\/\/techmaster\.com/i,
      BASE_URL
    );

    /*
     * ============================================================
     * 6. OG IMAGE
     * ============================================================
     */

    const activeOgImage =
      ogImage ||
      matchedPageSEO?.ogImage ||
      globalSEO.defaultOGImage ||
      `${BASE_URL}/Trendz%20talk%20logo.png`;

    /*
     * ============================================================
     * 7. ROBOTS
     * ============================================================
     */

    const activeRobots =
      robots ||
      (pageId === "not-found"
        ? "noindex, nofollow"
        : matchedPageSEO?.robots || "index, follow");

    /*
     * ============================================================
     * 8. DOCUMENT TITLE
     * ============================================================
     */

    document.title = activeTitle;

    /*
     * ============================================================
     * META TAG HELPER
     * ============================================================
     */

    const setMeta = (
      name: string,
      content: string,
      isProperty = false
    ) => {
      const attr = isProperty ? "property" : "name";

      let elem = document.querySelector(
        `meta[${attr}="${name}"]`
      ) as HTMLMetaElement | null;

      if (!elem) {
        elem = document.createElement("meta");
        elem.setAttribute(attr, name);
        document.head.appendChild(elem);
      }

      elem.setAttribute("content", content);
    };

    /*
     * ============================================================
     * 9. STANDARD META TAGS
     * ============================================================
     */

    setMeta("description", activeDesc);
    setMeta("keywords", activeKeywords);
    setMeta("robots", activeRobots);
    setMeta("author", "Tech Master Studio");

    /*
     * ============================================================
     * 10. OPEN GRAPH
     * ============================================================
     */

    setMeta("og:title", activeTitle, true);
    setMeta("og:description", activeDesc, true);
    setMeta("og:image", activeOgImage, true);
    setMeta("og:url", activeCanonical, true);
    setMeta(
      "og:type",
      ogType || fallback.ogType || "website",
      true
    );
    setMeta("og:site_name", "Tech Master", true);

    /*
     * ============================================================
     * 11. TWITTER / X CARD
     * ============================================================
     */

    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", activeTitle);
    setMeta("twitter:description", activeDesc);
    setMeta("twitter:image", activeOgImage);

    /*
     * ============================================================
     * 12. CANONICAL LINK
     * ============================================================
     */

    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;

    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }

    canonicalLink.setAttribute("href", activeCanonical);

    /*
     * ============================================================
     * 13. JSON-LD STRUCTURED DATA
     * ============================================================
     */

    const defaultSchema = {
      "@context": "https://schema.org",

      "@graph": [
        {
          "@type": "Organization",

          "@id": `${BASE_URL}/#organization`,

          name: "Tech Master",

          url: BASE_URL,

          logo: `${BASE_URL}/Tech%20MAster%20Logo.png`,

          description:
            "Indian technology, automotive and entertainment media company.",

          sameAs: [
            "https://youtube.com/@techmastersher",
            "https://instagram.com/techmastersher",
            "https://linkedin.com/company/techmaster",
          ],
        },

        {
          "@type": "WebSite",

          "@id": `${BASE_URL}/#website`,

          url: BASE_URL,

          name: "Tech Master",

          publisher: {
            "@id": `${BASE_URL}/#organization`,
          },

          potentialAction: {
            "@type": "SearchAction",

            target: `${BASE_URL}/portfolio?q={search_term_string}`,

            "query-input":
              "required name=search_term_string",
          },
        },

        {
          "@type": "WebPage",

          "@id": `${activeCanonical}#webpage`,

          url: activeCanonical,

          name: activeTitle,

          description: activeDesc,

          isPartOf: {
            "@id": `${BASE_URL}/#website`,
          },

          about: {
            "@id": `${BASE_URL}/#organization`,
          },
        },

        {
          "@type": "BreadcrumbList",

          itemListElement: [
            {
              "@type": "ListItem",

              position: 1,

              name: "Home",

              item: BASE_URL,
            },

            ...(pageId !== "home"
              ? [
                {
                  "@type": "ListItem",

                  position: 2,

                  name: fallback.title
                    .split("|")[0]
                    .trim(),

                  item: activeCanonical,
                },
              ]
              : []),
          ],
        },
      ],
    };

    /*
     * ============================================================
     * 14. FINAL SCHEMA
     * ============================================================
     */

    const finalSchema = schema || defaultSchema;

    let schemaScript = document.getElementById(
      "seo-schema-jsonld"
    );

    if (!schemaScript) {
      schemaScript = document.createElement("script");
      schemaScript.id = "seo-schema-jsonld";
      schemaScript.setAttribute(
        "type",
        "application/ld+json"
      );
      document.head.appendChild(schemaScript);
    }

    schemaScript.textContent = JSON.stringify(
      finalSchema,
      null,
      2
    );
  }, [
    pageId,
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage,
    ogType,
    robots,
    schema,
    dbSEO,
  ]);

  return null;
};