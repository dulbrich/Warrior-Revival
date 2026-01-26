"use client";

import { useEffect, useRef, useState } from "react";

type MarqueeTextProps = {
  text: string;
  className?: string;
};

export default function MarqueeText({ text, className }: MarqueeTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const textClassName = className ? `${className}` : "";

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    if (!container || !textElement) {
      return;
    }

    let frameId = 0;
    const measure = () => {
      frameId = window.requestAnimationFrame(() => {
        const fits = textElement.scrollWidth <= container.clientWidth;
        setShouldScroll(!fits);
      });
    };

    measure();

    const observer =
      typeof ResizeObserver !== "undefined" ? new ResizeObserver(measure) : null;

    if (observer) {
      observer.observe(container);
      observer.observe(textElement);
    } else {
      window.addEventListener("resize", measure);
    }

    return () => {
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener("resize", measure);
      }
    };
  }, [text]);

  return (
    <div ref={containerRef} className="marquee-shell min-w-0 w-full">
      <div className={`marquee-track ${shouldScroll ? "marquee-track--active" : ""}`}>
        <span ref={textRef} className={`marquee-item ${textClassName}`}>
          {text}
        </span>
        <span aria-hidden="true" className={`marquee-item ${textClassName}`}>
          {text}
        </span>
      </div>
    </div>
  );
}
