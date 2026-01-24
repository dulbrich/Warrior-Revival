"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Veterans", href: "/veterans" },
  { label: "Programs", href: "#" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "#" },
  { label: "Partners", href: "#" },
  { label: "Gallery", href: "#" },
  { label: "Donate", href: "#" },
  { label: "Contact", href: "#" }
];

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="sticky top-0 z-30">
        <header className="border-b border-border bg-surface/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
            <a href="/" className="flex items-center gap-3">
              <Image
                src="/logo.webp"
                alt="Warrior Revival logo"
                width={64}
                height={64}
                className="h-14 w-14 md:h-16 md:w-16"
                priority
              />
              <div>
                <p className="font-accent text-2xl text-primary md:text-3xl tracking-[0.08em]">
                  Warrior Revival
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">
                  Military, Transition, Community
                </p>
              </div>
            </a>
            <nav className="hidden items-center gap-6 text-base font-accent text-textSecondary tracking-[0.08em] lg:flex">
              {navigation.slice(0, 7).map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="hidden items-center gap-3 lg:flex">
              <button className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                Join
              </button>
              <button className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                Donate
              </button>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:hidden"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              <span className="sr-only">Toggle menu</span>
              <span className="relative block h-5 w-6" aria-hidden="true">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-6 bg-current transition duration-300 ${
                    isMenuOpen ? "translate-y-[9px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-2 h-0.5 w-6 bg-current transition duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`absolute left-0 top-4 h-0.5 w-6 bg-current transition duration-300 ${
                    isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </header>

        <div
          id="mobile-navigation"
          className={`lg:hidden overflow-hidden border-b border-border bg-surface/95 backdrop-blur transition-[max-height,opacity] duration-300 ease-out ${
            isMenuOpen
              ? "max-h-[calc(100vh-96px)] overflow-y-auto opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
          aria-hidden={!isMenuOpen}
        >
          <nav className="mx-auto max-w-7xl px-4 pb-4 md:px-8">
            <div className="grid gap-2 pt-2 text-base font-accent text-textSecondary tracking-[0.08em]">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-md px-3 py-2 transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

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
    </main>
  );
}
