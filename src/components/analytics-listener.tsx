"use client";

import { useEffect } from "react";
import { track } from "@/lib/ga";

// Tracks outbound clicks to Donorbox from any link on the site.
export function AnalyticsListener() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const link = (e.target as HTMLElement | null)?.closest("a");
      if (!link?.href) return;
      let url: URL;
      try {
        url = new URL(link.href);
      } catch {
        return;
      }
      if (url.hostname.endsWith("donorbox.org")) {
        track("donate_click", { link_url: link.href, page_path: window.location.pathname });
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
