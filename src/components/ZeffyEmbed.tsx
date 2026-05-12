"use client";

import Script from "next/script";
import { useState } from "react";

type ZeffyEmbedProps = {
  formPath: string;
  title?: string;
  heightPx?: number;
};

export default function ZeffyEmbed({
  formPath,
  title = "Form powered by Zeffy",
  heightPx = 450
}: ZeffyEmbedProps) {
  const [showFallback, setShowFallback] = useState(false);
  const iframeSrc = `https://www.zeffy.com${formPath}`;

  return (
    <div>
      <div data-zeffy-embed data-form-url={formPath} suppressHydrationWarning />
      <div
        data-zeffy-embed-fallback
        style={{ display: showFallback ? "block" : "none" }}
      >
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            height: `${heightPx}px`,
            width: "100%",
            paddingTop: `${heightPx}px`
          }}
        >
          <iframe
            title={title}
            style={{
              position: "absolute",
              border: 0,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: "100%",
              height: "100%"
            }}
            src={iframeSrc}
            allow="payment"
            allowTransparency
          />
        </div>
      </div>
      <Script
        src="https://www.zeffy.com/embed/v2/zeffy-embed.js"
        strategy="afterInteractive"
        onError={() => setShowFallback(true)}
      />
    </div>
  );
}
