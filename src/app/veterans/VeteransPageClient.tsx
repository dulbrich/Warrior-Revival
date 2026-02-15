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
const testimonialDisplayMs = 15000;
const testimonialTransitionMs = 900;

const reintegrationQuotes = [
  "No one wears rank out here.",
  "Solving a rubix cube with no hands.",
  "It takes adjusting knowing I have to adjust to my family's lifestyle.",
  "I have to slow my world... they don't march to the same beat in the civilian world.",
  "The military kept me together like glue and now that is all melted away, I need to pick up all the pieces off the floor and figure out how to piece them back together again."
];

const testimonialCards = [
  "Thanks for the opportunity to dive. I feel much safer and confident to look into getting certified now.",
  "Warrior Revival got me out my comfort zone. It showed me what’s still possible. I had a blast and can’t wait to do it again.",
  "The Warrior Revival group was so helpful. I'm so happy my daughter was there with me. She felt so welcomed and loved by everyone.",
  "It's always nice to be among like minded people that can understand the military culture specially since SLC is not a big military concentration town and be able to exchange ideas and other things regarding veteran health and well being and support.",
  "I’m so thankful for the incredible opportunity to skydive last month with Warrior Revival. It was an unforgettable experience I probably wouldn’t have pursued on my own.",
  "I was able to attend the 1st Annual Fishing tournament put on by my Warrior Revival on 20 September. As a retired Air Force Veteran, I felt this event was very well represented, organized, and a great opportunity to get outdoors and enjoy the beauty of Utah and Strawberry Reservoir. Additionally, and more importantly, it was a great way to meet other Veterans, family members, and people that support our Veterans here in Utah. I will definitely be attending next year, and am looking forward to another amazing turnout.",
  "This was my boy's first time experiencing a Jazz game and they loved it. Thank you so much for the opportunity!",
  "It’s easy to see why Warrior Revival has impacted so many lives so powerfully. Katie, Carl, and the whole team genuinely care about each person they interact with. It’s a joy and an honor to be part of anything Warrior Revival does!"
];

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

export default function VeteransPageClient() {
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);
  const [typedQuote, setTypedQuote] = useState("");
  const [quotePhase, setQuotePhase] = useState<
    "typing" | "holding" | "selecting" | "pausing"
  >("typing");
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);
  const [isTestimonialTransitioning, setIsTestimonialTransitioning] = useState(false);

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
  }, [isTestimonialTransitioning]);

  const activeQuote = reintegrationQuotes[activeQuoteIndex];
  const showClosingQuote = typedQuote.length > 0 && typedQuote.length === activeQuote.length;
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

      <section className="relative h-[800px] overflow-hidden bg-surface md:h-[740px] lg:h-[700px]">
        <div
          className="absolute inset-0 bg-[url('/home/backgrounds/mountains.jpg')] bg-cover bg-center opacity-[0.18]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-white via-white/90 to-secondary/20"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex h-full max-w-6xl flex-col px-4 py-12 md:px-8 md:py-14 lg:py-12">
          <div className="mb-10 space-y-3">
            <p className="font-accent text-sm uppercase tracking-[0.3em] text-secondary">
              Impact on Veterans
            </p>
            <h1 className="max-w-3xl font-blackOps text-4xl font-normal text-primary md:text-5xl">
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

      <section className="bg-white">
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

      <section className="bg-light">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center md:px-8">
          <div className="relative min-h-[380px] md:order-2 md:min-h-[460px]">
            <Image
              src="/home/soldier.jpg"
              alt="Soldier reflecting outdoors"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="rounded-3xl object-cover shadow-card"
            />
          </div>
          <div className="space-y-6 md:order-1">
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Our members have described the challenges of reintegration as:
            </h2>
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
            <p className="text-base text-textSecondary">
              We strive to create a supportive network that fosters camaraderie, a sense of
              purpose, and to raise awareness of the unique challenges veterans face in the
              transition to civilian life.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
          <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
            What Warrior Revival Offers
          </h2>
          <p className="mt-6 max-w-4xl text-base text-textSecondary">
            Warrior Revival is a Utah-based 501(c)(3) nonprofit dedicated to supporting
            veterans and their families through connection, community, and shared
            experiences.
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

          <h3 className="mt-10 font-heading text-2xl font-semibold text-primary md:text-3xl">
            Why It Matters
          </h3>
          <p className="mt-6 max-w-5xl text-base text-textSecondary">
            By fostering authentic connection and community, Warrior Revival helps address
            isolation before it becomes crisis — strengthening resilience, supporting
            mental health, and contributing to suicide prevention through belonging and
            purpose.
          </p>
        </div>
      </section>

      <SubscribeSection />
      <SiteFooter />
    </main>
  );
}
