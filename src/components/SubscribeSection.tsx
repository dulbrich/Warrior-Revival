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
              <div className="flex w-full flex-col gap-3 md:max-w-none">
                <input
                  className="h-12 w-full min-w-0 rounded-md border border-white/30 bg-white/10 px-3 text-base text-white placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:h-11"
                  placeholder="you@example.com"
                  type="email"
                />
                <button className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
