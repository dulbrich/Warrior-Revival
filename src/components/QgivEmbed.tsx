"use client";

import Script from "next/script";

type QgivEmbedProps = {
  embedId: string;
  embedUrl: string;
  width?: number;
};

export default function QgivEmbed({ embedId, embedUrl, width = 630 }: QgivEmbedProps) {
  return (
    <>
      <div
        className="qgiv-embed-container"
        data-qgiv-embed="true"
        data-embed-id={embedId}
        data-embed={embedUrl}
        data-width={width}
        suppressHydrationWarning
      />
      <Script
        id="qgiv-embedjs"
        src="https://secure.qgiv.com/resources/core/js/embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
