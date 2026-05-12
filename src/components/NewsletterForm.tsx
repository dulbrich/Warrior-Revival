"use client";

import { useEffect, useRef } from "react";

export default function NewsletterForm() {
  const hostRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || initializedRef.current) return;
    initializedRef.current = true;

    const loading = document.createElement("p");
    loading.textContent = "Loading sign-up form…";
    loading.className = "text-sm text-textSecondary";
    host.appendChild(loading);

    const anchor = document.createElement("script");
    anchor.id = "bloomerangForm166912";
    anchor.type = "text/javascript";
    host.appendChild(anchor);

    const loader = document.createElement("script");
    loader.type = "text/javascript";
    loader.src = "/bloomerang-newsletter-init.js";
    host.appendChild(loader);

    const observer = new MutationObserver(() => {
      if (host.querySelector("#email-registration-form-container")) {
        loading.remove();
        observer.disconnect();
      }
    });
    observer.observe(host, { childList: true, subtree: true });
  }, []);

  return <div ref={hostRef} suppressHydrationWarning />;
}
