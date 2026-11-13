import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { initSmoothScroll, scrollToElement, scrollToTop } from "@/lib/smoothScroll";

/**
 * - boots inertia smooth scrolling once
 * - on navigation: scrolls to the #hash target if present (retrying until the lazy
 *   section mounts), otherwise resets to the top
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => initSmoothScroll(), []);

  useEffect(() => {
    if (!hash) {
      scrollToTop();
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 30) {
        window.clearInterval(timer);
        if (el) scrollToElement(el);
      }
    }, 60);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
