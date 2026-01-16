const navigation = [
  "Home",
  "About",
  "Programs",
  "Events",
  "Get Involved",
  "Partners",
  "Gallery",
  "Donate",
  "Contact"
];

const events = [
  {
    title: "Wasatch Sunrise Hike",
    date: "Oct 12, 2024",
    location: "Salt Lake City, UT",
    tag: "Outdoor Adventure"
  },
  {
    title: "Kayak Skills Intensive",
    date: "Nov 2, 2024",
    location: "Provo River, UT",
    tag: "Water Therapy"
  },
  {
    title: "Family Campfire Night",
    date: "Nov 18, 2024",
    location: "Ogden Canyon, UT",
    tag: "Community"
  }
];

const pathways = [
  {
    title: "Veterans",
    description:
      "Start your next chapter with guided outings, mentorship, and a supportive community.",
    cta: "Join a program"
  },
  {
    title: "Volunteers",
    description:
      "Lead trips, share skills, and help build confidence through outdoor experiences.",
    cta: "Become a volunteer"
  },
  {
    title: "Sponsors",
    description:
      "Invest in veteran wellness and connect your team with meaningful impact.",
    cta: "Partner with us"
  }
];

const stats = [
  { value: "120+", label: "Outings hosted this year" },
  { value: "1,400", label: "Veterans & family members served" },
  { value: "85%", label: "Participants report improved wellbeing" }
];

export default function Home() {
  return (
    <main className="bg-light">
      <header className="sticky top-0 z-20 border-b border-border bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <img
              src="/warrior-revival-logo.svg"
              alt="Warrior Revival logo"
              className="h-12 w-12"
            />
            <div>
              <p className="font-heading text-lg font-semibold text-primary">Warrior Revival</p>
              <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">
                Military, Transition, Community
              </p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-semibold text-textSecondary lg:flex">
            {navigation.slice(0, 7).map((item) => (
              <a
                key={item}
                href="#"
                className="transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {item}
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
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
        <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-center gap-6 px-4 py-20 text-white md:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
            Welcome to Warrior Revival
          </p>
          <h1 className="max-w-3xl font-heading text-4xl font-semibold md:text-5xl">
            SUPPORT &amp; EMPOWER VETERANS
          </h1>
          <p className="max-w-2xl text-base text-white/90 md:text-lg">
            Warrior Revival is a non-profit 501(c)(3) organization that was established in 2023
            to support and empower Veterans and their families transition from the military to
            civilian life through recreation, mentorship, wellness and therapeutic retreats.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-soft transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Donate
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              View Events
            </button>
            <button className="inline-flex items-center justify-center rounded-md border border-white/70 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
              Join the community
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-3 md:px-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-surface p-6 shadow-card"
          >
            <p className="text-3xl font-heading font-semibold text-primary md:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm text-textSecondary">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Our mission
            </p>
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Building belonging through challenge, mentorship, and shared adventure.
            </h2>
            <p className="text-base text-textSecondary md:text-lg">
              Warrior Revival blends evidence-based wellness programs with outdoor education.
              Each experience is led by trained volunteers who understand military culture and
              create space for healing conversations.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-light p-4">
                <p className="font-heading text-lg font-semibold text-primary">Programs</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Guided hikes, adaptive sports, and leadership workshops rooted in resilience.
                </p>
              </div>
              <div className="rounded-xl border border-border bg-light p-4">
                <p className="font-heading text-lg font-semibold text-primary">Support</p>
                <p className="mt-2 text-sm text-textSecondary">
                  Peer mentors, family outings, and sponsor resources that last all year long.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-light p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
                Upcoming events
              </p>
              <div className="mt-6 space-y-4">
                {events.map((event) => (
                  <div
                    key={event.title}
                    className="rounded-xl border border-border bg-surface p-4 shadow-soft"
                  >
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                        {event.tag}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-wide text-textSecondary">
                        {event.date}
                      </span>
                    </div>
                    <p className="mt-3 font-heading text-lg font-semibold text-primary">
                      {event.title}
                    </p>
                    <p className="text-sm text-textSecondary">{event.location}</p>
                    <a
                      href="#"
                      className="mt-3 inline-flex items-center text-sm font-semibold text-secondary hover:text-primary"
                    >
                      Register now →
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-primary p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
                Newsletter
              </p>
              <p className="mt-3 font-heading text-2xl font-semibold">
                Get monthly updates and new adventure dates.
              </p>
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <input
                  className="h-11 flex-1 rounded-md border border-white/30 bg-white/10 px-3 text-sm text-white placeholder:text-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Get involved
            </p>
            <h2 className="font-heading text-3xl font-semibold text-primary md:text-4xl">
              Choose your pathway to impact.
            </h2>
          </div>
          <button className="inline-flex items-center justify-center rounded-md border border-primary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary transition hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Explore all programs
          </button>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {pathways.map((pathway) => (
            <div
              key={pathway.title}
              className="rounded-2xl border border-border bg-surface p-6 shadow-card"
            >
              <p className="font-heading text-xl font-semibold text-primary">
                {pathway.title}
              </p>
              <p className="mt-3 text-sm text-textSecondary">{pathway.description}</p>
              <button className="mt-6 inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                {pathway.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 py-16 text-white md:flex-row md:items-center md:justify-between md:px-8">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
              Partners
            </p>
            <h2 className="font-heading text-3xl font-semibold md:text-4xl">
              Together we deliver life-changing programs.
            </h2>
            <p className="max-w-xl text-base text-white/80">
              We collaborate with outdoor brands, mental health providers, and local
              organizations to expand access and reduce barriers to care.
            </p>
          </div>
          <div className="grid w-full gap-4 sm:grid-cols-2 md:max-w-md">
            {["Summit Co.", "Canyon Health", "Basecamp Gear", "Utah Outdoor Society"].map(
              (partner) => (
                <div
                  key={partner}
                  className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-semibold"
                >
                  {partner}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-textSecondary md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="font-heading text-base font-semibold text-primary">Warrior Revival</p>
            <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">
              Salt Lake City, Utah
            </p>
          </div>
          <p>Empowering veterans and families through adventure and belonging.</p>
          <button className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
            Support the mission
          </button>
        </div>
      </footer>
    </main>
  );
}
