/**
 * Lightweight Google Analytics 4 + Google Tag Manager integration.
 *
 * Performance goals:
 * - Never block initial rendering
 * - Load analytics after the browser becomes idle
 * - Load immediately after meaningful user interaction
 * - Support SPA virtual page views
 * - Support DB configuration + Vite environment variables
 * - Avoid duplicate GA/GTM initialization
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

let isInitialized = false;
let initializationStarted = false;

let activeMeasurementId: string | undefined;
let activeContainerId: string | undefined;

let idleCallbackId: number | undefined;
let timeoutId: ReturnType<typeof setTimeout> | undefined;

const getEnvironmentValue = (key: string): string | undefined => {
  try {
    return (import.meta as any).env?.[key] || undefined;
  } catch {
    return undefined;
  }
};

/**
 * Create the GA dataLayer function without loading any network resource.
 */
const prepareDataLayer = () => {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function (...args: any[]) {
      window.dataLayer?.push(args);
    };
  }
};

/**
 * Load Google Analytics 4 script.
 */
const loadGA4 = (measurementId: string) => {
  if (typeof window === "undefined") return;

  prepareDataLayer();

  if (!document.getElementById("ga4-script")) {
    const script = document.createElement("script");

    script.id = "ga4-script";
    script.async = true;
    script.src =
      `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
        measurementId
      )}`;

    document.head.appendChild(script);
  }

  window.gtag?.("js", new Date());

  window.gtag?.("config", measurementId, {
    send_page_view: false,
    transport_type: "beacon",
  });
};

/**
 * Load Google Tag Manager.
 */
const loadGTM = (containerId: string) => {
  if (typeof window === "undefined") return;

  prepareDataLayer();

  if (document.getElementById("gtm-script")) {
    return;
  }

  window.dataLayer?.push({
    "gtm.start": new Date().getTime(),
    event: "gtm.js",
  });

  const script = document.createElement("script");

  script.id = "gtm-script";
  script.async = true;

  script.src =
    `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(
      containerId
    )}`;

  document.head.appendChild(script);
};

/**
 * Actually initialize analytics.
 *
 * This function is intentionally separated from initAnalytics()
 * so the expensive/network part can happen after initial rendering.
 */
const performInitialization = () => {
  if (
    typeof window === "undefined" ||
    isInitialized ||
    initializationStarted
  ) {
    return;
  }

  initializationStarted = true;

  prepareDataLayer();

  if (activeMeasurementId) {
    loadGA4(activeMeasurementId);
  }

  if (activeContainerId) {
    loadGTM(activeContainerId);
  }

  isInitialized = true;

  cleanupListeners();
};

/**
 * Remove deferred-loading listeners.
 */
const cleanupListeners = () => {
  if (typeof window === "undefined") return;

  window.removeEventListener("pointerdown", handleUserInteraction);
  window.removeEventListener("keydown", handleUserInteraction);
  window.removeEventListener("touchstart", handleUserInteraction);
  window.removeEventListener("scroll", handleUserInteraction);

  if (
    idleCallbackId !== undefined &&
    "cancelIdleCallback" in window
  ) {
    window.cancelIdleCallback(idleCallbackId);
    idleCallbackId = undefined;
  }

  if (timeoutId !== undefined) {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }
};

/**
 * Load analytics when the visitor actually interacts.
 */
const handleUserInteraction = () => {
  performInitialization();
};

/**
 * Initialize analytics configuration without blocking the page.
 *
 * Actual GA/GTM network scripts are intentionally deferred.
 */
export const initAnalytics = (
  gaId?: string,
  gtmId?: string
) => {
  if (typeof window === "undefined") return;

  if (initializationStarted || isInitialized) {
    return;
  }

  activeMeasurementId =
    gaId ||
    getEnvironmentValue("VITE_GA_MEASUREMENT_ID");

  activeContainerId =
    gtmId ||
    getEnvironmentValue("VITE_GTM_ID");

  // Nothing configured.
  if (!activeMeasurementId && !activeContainerId) {
    isInitialized = true;
    return;
  }

  /*
   * Prepare dataLayer immediately.
   *
   * This does NOT download Google scripts.
   */
  prepareDataLayer();

  /*
   * If the browser supports requestIdleCallback,
   * wait until important page work is finished.
   */
  if ("requestIdleCallback" in window) {
    idleCallbackId = window.requestIdleCallback(
      () => {
        performInitialization();
      },
      {
        timeout: 5000,
      }
    );
  } else {
    /*
     * Fallback for browsers without requestIdleCallback.
     */
    timeoutId = setTimeout(() => {
      performInitialization();
    }, 4000);
  }

  /*
   * If the visitor interacts before idle time,
   * initialize immediately.
   */
  window.addEventListener(
    "pointerdown",
    handleUserInteraction,
    {
      passive: true,
      once: true,
    }
  );

  window.addEventListener(
    "keydown",
    handleUserInteraction,
    {
      passive: true,
      once: true,
    }
  );

  window.addEventListener(
    "touchstart",
    handleUserInteraction,
    {
      passive: true,
      once: true,
    }
  );

  window.addEventListener(
    "scroll",
    handleUserInteraction,
    {
      passive: true,
      once: true,
    }
  );
};

/**
 * Track SPA page views.
 *
 * Important:
 * The event is safely queued in dataLayer even if GA
 * has not loaded yet.
 */
export const trackPageView = (
  pagePath: string,
  pageTitle: string
) => {
  if (typeof window === "undefined") return;

  const measurementId =
    activeMeasurementId ||
    getEnvironmentValue("VITE_GA_MEASUREMENT_ID");

  /*
   * Always keep the GTM virtual page view event available.
   * GTM can process it once its script loads.
   */
  window.dataLayer = window.dataLayer || [];

  window.dataLayer.push({
    event: "virtualPageView",
    pagePath,
    pageTitle,
    pageLocation: window.location.href,
  });

  /*
   * If GA is already available, send the page view directly.
   */
  if (window.gtag && measurementId) {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle,
      page_location: window.location.href,
    });
  }
};