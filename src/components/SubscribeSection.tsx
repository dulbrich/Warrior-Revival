import Image from "next/image";

export default function SubscribeSection() {
  return (
    <section className="bg-primary">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-10">
          <Image
            src="/logo3.png"
            alt="Warrior Revival logo"
            width={958}
            height={1024}
            className="h-[18rem] w-auto md:h-[21rem] lg:h-[24rem] md:shrink-0"
          />
          <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 text-white md:flex-1 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Newsletter
            </p>
            <div className="mt-3 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <p className="font-heading text-3xl font-semibold">
                Get monthly updates and new adventure dates.
              </p>
              <a
                href="/newsletter"
                className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-6 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Subscribe
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
