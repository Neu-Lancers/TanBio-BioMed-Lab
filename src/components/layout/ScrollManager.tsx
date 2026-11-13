import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * On navigation: scroll to the #hash target if present (retrying until the lazy
 * section mounts), otherwise reset to the top. Smooth for in-page jumps.
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    let tries = 0;
    const timer = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el || ++tries > 25) {
        window.clearInterval(timer);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 60);
    return () => window.clearInterval(timer);
  }, [pathname, hash]);

  return null;
}
