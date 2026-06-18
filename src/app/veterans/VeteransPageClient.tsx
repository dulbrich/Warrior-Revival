"use client";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import SubscribeSection from "@/components/SubscribeSection";
import Image from "next/image";
import { useEffect, useState } from "react";

const testimonialDisplayMs = 15000;
const testimonialTransitionMs = 900;

// testimonialCards is now passed in as a prop (fetched server-side from
// Supabase). See src/lib/testimonials/queries.ts.

const approachCards = [
  {
    title: "Community-Centered Programming",
    description:
      "Outdoor recreation, social gatherings, and group activities that rebuild the sense of belonging many veterans miss after leaving service.",
    imageSrc: "/veterans/approach/community.png",
    imageAlt: "Veterans gathering in community outdoors"
  },
  {
    title: "Peer Connection & Mentorship",
    description:
      "Veteran-to-veteran relationships that normalize transition challenges and reduce isolation.",
    imageSrc: "/veterans/approach/peers.png",
    imageAlt: "Veterans talking and connecting in peer support"
  },
  {
    title: "Therapeutic & Restorative Retreats",
    description:
      "Intentional retreats that promote mental well-being, reflection, and renewed purpose in a supportive environment.",
    imageSrc: "/veterans/approach/retreat.jpeg",
    imageAlt: "Veterans in a restorative retreat setting"
  },
  {
    title: "Accessible & Inclusive Support",
    description:
      "All programming is offered at no cost, removing barriers to participation for veterans and their families.",
    imageSrc: "/veterans/approach/chair.webp",
    imageAlt: "Inclusive veteran community participation"
  }
];

export default function VeteransPageClient({
  testimonials
}: {
  testimonials: string[];
}) {
  const testimonialCards = testimonials;
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isTestimonialTransitioning, setIsTestimonialTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIsTestimonialTransitioning(true);
    }, testimonialDisplayMs);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (!isTestimonialTransitioning) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonialCards.length);
      setIsTestimonialTransitioning(false);
    }, testimonialTransitionMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isTestimonialTransitioning, testimonialCards.length]);

  const visibleTestimonials = [0, 1, 2].map(
    (offset) => testimonialCards[(activeTestimonialIndex + offset) % testimonialCards.length]
  );
  const mobileCurrentTestimonial = testimonialCards[activeTestimonialIndex];
  const mobileEnteringTestimonial =
    testimonialCards[(activeTestimonialIndex + 1) % testimonialCards.length];
  const enteringTestimonial =
    testimonialCards[(activeTestimonialIndex + 3) % testimonialCards.length];

  return (
    <main className="bg-light">
      <SiteHeader />

      <section className="relative overflow-hidden bg-surface">
        <div
          className="absolute inset-0 bg-[url('/home/backgrounds/mountains.jpg')] bg-cover bg-center opacity-[0.18]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-secondary/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 md:px-8">
          <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
            Built for Warriors. Here for Every Step.
          </p>
          <h2 className="mt-3 font-blackOps text-5xl font-normal text-primary md:text-6xl">
            What Warrior Revival Offers
          </h2>
          <p className="mt-6 max-w-4xl text-base text-textSecondary">
            Warrior Revival is a Utah-based 501(c)(3) nonprofit dedicated to serving
            active duty service members, veterans, and their families through genuine
            connection, shared experiences, and community built around the military
            mindset.
          </p>

          <h3 className="mt-10 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Our Approach
          </h3>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {approachCards.map((card) => (
              <article
                key={card.title}
                className="flex overflow-hidden rounded-2xl border border-border bg-surface shadow-card"
              >
                <div className="relative aspect-square w-28 shrink-0 sm:w-32 md:w-36">
                  <Image
                    src={card.imageSrc}
                    alt={card.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 144px, (min-width: 640px) 128px, 112px"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h4 className="font-heading text-xl font-semibold text-primary">
                    {card.title}
                  </h4>
                  <p className="mt-3 text-base text-textSecondary">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative h-[800px] overflow-hidden bg-white md:h-[740px] lg:h-[700px]">
        <div className="relative mx-auto flex h-full max-w-6xl flex-col px-4 py-12 md:px-8 md:py-14 lg:py-12">
          <div className="mb-10 space-y-3">
            <h1 className="max-w-3xl font-heading text-3xl font-semibold text-primary md:text-4xl">
              What Our Members Say
            </h1>
          </div>

          <div className="testimonial-mobile-stage flex-1 lg:hidden">
            <article
              className={`testimonial-mobile-card ${
                isTestimonialTransitioning ? "testimonial-mobile-card--exit" : ""
              } flex flex-col rounded-xl border border-border bg-white/95 p-6 shadow-card backdrop-blur-sm`}
            >
              <p className="pb-5 text-base leading-7 text-textPrimary">
                “{mobileCurrentTestimonial}”
              </p>
              <p className="mt-4 border-t border-border pt-4 text-sm text-textSecondary">
                Warrior Revival veteran member
              </p>
            </article>

            {isTestimonialTransitioning ? (
              <article
                key={`mobile-enter-${activeTestimonialIndex}`}
                className="testimonial-mobile-card testimonial-mobile-card--enter flex flex-col rounded-xl border border-border bg-white/95 p-6 shadow-card backdrop-blur-sm"
              >
                <p className="pb-5 text-base leading-7 text-textPrimary">
                  “{mobileEnteringTestimonial}”
                </p>
                <p className="mt-4 border-t border-border pt-4 text-sm text-textSecondary">
                  Warrior Revival veteran member
                </p>
              </article>
            ) : null}
          </div>

          <div className="testimonial-lg-stage hidden flex-1 lg:block">
            <article
              key={`left-${activeTestimonialIndex}`}
              className={`testimonial-lg-card testimonial-lg-card--left ${
                isTestimonialTransitioning ? "testimonial-lg-card--move-left" : ""
              } flex flex-col rounded-xl border border-border bg-white/95 p-6 shadow-card backdrop-blur-sm`}
            >
              <p className="pb-5 text-base leading-7 text-textPrimary">
                “{visibleTestimonials[0]}”
              </p>
              <p className="mt-auto border-t border-border pt-4 text-sm text-textSecondary">
                Warrior Revival veteran member
              </p>
            </article>

            <article
              key={`center-${activeTestimonialIndex}`}
              className={`testimonial-lg-card testimonial-lg-card--center ${
                isTestimonialTransitioning ? "testimonial-lg-card--move-center" : ""
              } flex flex-col rounded-xl border border-secondary bg-white/95 p-6 shadow-[0_14px_36px_rgba(47,111,143,0.22)] backdrop-blur-sm`}
            >
              <p className="pb-5 text-base leading-7 text-textPrimary">
                “{visibleTestimonials[1]}”
              </p>
              <p className="mt-auto border-t border-border pt-4 text-sm text-textSecondary">
                Warrior Revival veteran member
              </p>
            </article>

            <article
              key={`right-${activeTestimonialIndex}`}
              className={`testimonial-lg-card testimonial-lg-card--right ${
                isTestimonialTransitioning ? "testimonial-lg-card--move-right" : ""
              } flex flex-col rounded-xl border border-border bg-white/95 p-6 shadow-card backdrop-blur-sm`}
            >
              <p className="pb-5 text-base leading-7 text-textPrimary">
                “{visibleTestimonials[2]}”
              </p>
              <p className="mt-auto border-t border-border pt-4 text-sm text-textSecondary">
                Warrior Revival veteran member
              </p>
            </article>

            {isTestimonialTransitioning ? (
              <article
                key={`enter-${activeTestimonialIndex}`}
                className="testimonial-lg-card testimonial-lg-card--enter flex flex-col rounded-xl border border-border bg-white/95 p-6 shadow-card backdrop-blur-sm"
              >
                <p className="pb-5 text-base leading-7 text-textPrimary">
                  “{enteringTestimonial}”
                </p>
                <p className="mt-auto border-t border-border pt-4 text-sm text-textSecondary">
                  Warrior Revival veteran member
                </p>
              </article>
            ) : null}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {testimonialCards.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  setIsTestimonialTransitioning(false);
                  setActiveTestimonialIndex(index);
                }}
                className={`h-1 rounded-full transition ${
                  index === activeTestimonialIndex
                    ? "w-4 bg-accent"
                    : "w-4 bg-secondary/30 hover:bg-secondary/50"
                }`}
                aria-label={`Show testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-200">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:grid-rows-[auto_1fr] md:items-center md:px-8">
          <div className="md:col-start-2 md:row-start-1">
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Lead With Purpose
            </h2>
          </div>
          <div className="relative min-h-[360px] md:col-start-1 md:row-start-1 md:row-span-2">
            <Image
              src="/veterans/hike.png"
              alt="Veteran community gathering space"
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="rounded-3xl object-cover shadow-card"
            />
          </div>
          <div className="space-y-6 md:col-start-2 md:row-start-2">
            <p className="text-base text-textSecondary">
              We believe peer support matters. Veterans learn best from one another
              through shared experience, trust, and service. If you have a purpose you
              want to share, an idea you’re passionate about, or a desire to lead and
              support fellow veterans, there is a place for you here. Warrior Revival
              helps with the structure and logistics — while you lead.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            Unsure Where to Start?
          </h2>
          <p className="mt-6 max-w-3xl text-base text-textSecondary">
            Every journey looks different. If you’re not sure where you fit, schedule an
            intro call and we’ll help you find the right way to get connected.
          </p>
          <a
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-base font-bold uppercase tracking-wide text-white transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            Schedule an Intro Call
          </a>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
