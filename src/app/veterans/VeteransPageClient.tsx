"use client";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";
import Image from "next/image";
import { useEffect, useState } from "react";

const quoteTypingSpeedMs = 24;
const quoteHoldMs = 5400;
const quoteSelectMs = 650;
const quotePauseMs = 1500;

const reintegrationQuotes = [
  "No one wears rank out here.",
  "Solving a rubix cube with no hands.",
  "It takes adjusting knowing I have to adjust to my family's lifestyle.",
  "I have to slow my world... they don't march to the same beat in the civilian world.",
  "The military kept me together like glue and now that is all melted away, I need to pick up all the pieces off the floor and figure out how to piece them back together again."
];

export default function VeteransPageClient() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [typedQuote, setTypedQuote] = useState("");
  const [quotePhase, setQuotePhase] = useState<
    "typing" | "holding" | "selecting" | "pausing"
  >("typing");

  useEffect(() => {
    const fullQuote = reintegrationQuotes[activeQuoteIndex];
    let timeoutId: number | undefined;

    if (quotePhase === "typing") {
      if (typedQuote.length < fullQuote.length) {
        timeoutId = window.setTimeout(() => {
          setTypedQuote(fullQuote.slice(0, typedQuote.length + 1));
        }, quoteTypingSpeedMs);
      } else {
        setQuotePhase("holding");
      }
    } else if (quotePhase === "holding") {
      timeoutId = window.setTimeout(() => {
        setQuotePhase("selecting");
      }, quoteHoldMs);
    } else if (quotePhase === "selecting") {
      timeoutId = window.setTimeout(() => {
        setTypedQuote("");
        setQuotePhase("pausing");
      }, quoteSelectMs);
    } else if (quotePhase === "pausing") {
      timeoutId = window.setTimeout(() => {
        setActiveQuoteIndex((prev) => (prev + 1) % reintegrationQuotes.length);
        setQuotePhase("typing");
      }, quotePauseMs);
    }

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [activeQuoteIndex, quotePhase, typedQuote]);

  const activeQuote = reintegrationQuotes[activeQuoteIndex];
  const showClosingQuote = typedQuote.length > 0 && typedQuote.length === activeQuote.length;

  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:px-8">
          <div className="space-y-6">
            <h1 className="font-heading text-4xl font-semibold text-primary md:text-5xl">
              Our members have described the challenges of reintegration as:
            </h1>
            <p className="text-base text-textSecondary">
              We strive to create a supportive network that fosters camaraderie, a sense of
              purpose, and to raise awareness of the unique challenges veterans face in the
              transition to civilian life.
            </p>
            <div className="flex min-h-[280px] flex-col rounded-2xl border border-border bg-white p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                Veteran voices
              </p>
              <div className="flex flex-1 flex-col justify-center">
                <blockquote className="font-heading text-2xl text-primary md:text-3xl">
                  <span
                    className={`quote-text ${
                      quotePhase === "selecting" ? "quote-selected" : ""
                    }`}
                  >
                    {typedQuote
                      ? `"${typedQuote}${showClosingQuote ? '"' : ""}`
                      : ""}
                  </span>
                </blockquote>
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-textSecondary">
                {activeQuoteIndex + 1} of {reintegrationQuotes.length}
              </p>
            </div>
          </div>
          <div className="relative min-h-[380px] md:min-h-[460px]">
            <Image
              src="/home/soldier.jpg"
              alt="Soldier reflecting outdoors"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="rounded-3xl object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
