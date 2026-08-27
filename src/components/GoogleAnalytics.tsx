"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const measurementId =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-HYNGMXZKYT";

declare global {
  interface Window {
    dataLayer: IArguments[];
    gtag: (...args: unknown[]) => void;
    warriorRevivalGaInitialized?: boolean;
  }
}

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const [scriptReady, setScriptReady] = useState(false);
  const isAdminPage = pathname.startsWith("/admin");

  useEffect(() => {
    if (!measurementId || !scriptReady || isAdminPage) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };

    if (!window.warriorRevivalGaInitialized) {
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { send_page_view: false });
      window.warriorRevivalGaInitialized = true;
    }

    window.gtag("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: `${pathname}${window.location.search}`
    });
  }, [isAdminPage, pathname, scriptReady]);

  if (!measurementId || isAdminPage) return null;

  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
      onReady={() => setScriptReady(true)}
    />
  );
}
