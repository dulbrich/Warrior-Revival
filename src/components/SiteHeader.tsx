"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { siteNavigation } from "./siteNavigation";

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
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
          <nav className="hidden items-center gap-6 text-base font-accent tracking-[0.08em] lg:flex">
            {siteNavigation.slice(0, 7).map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? "text-primary" : "text-textSecondary"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </a>
              );
            })}
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
            {siteNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`rounded-md px-3 py-2 transition hover:bg-primary/10 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? "text-primary" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
