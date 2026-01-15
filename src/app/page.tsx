const stories = [
  {
    title: "Emeline Lakrout",
    description: "A painter who found new confidence through adaptive sports and art camps.",
    tag: "Adaptive Art"
  },
  {
    title: "Jordan Hayes",
    description: "From rehab to racing, Jordan now mentors fellow veterans on the trails.",
    tag: "Outdoor Adventure"
  },
  {
    title: "Sofia Nguyen",
    description: "Sofia is building a community of peer support through weekly wellness walks.",
    tag: "Peer Support"
  }
];

const highlights = [
  {
    label: "Programs delivered",
    value: "48+",
    detail: "Across adaptive sports, art therapy, and wellness coaching."
  },
  {
    label: "Volunteer hours",
    value: "3,200",
    detail: "Dedicated community members fueling inclusive experiences."
  },
  {
    label: "Scholarships awarded",
    value: "$90k",
    detail: "Removing barriers so every warrior can participate."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-light">
      <header className="bg-primary text-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
              Warrior Revival
            </p>
            <p className="font-heading text-xl">Stories of Strength</p>
          </div>
          <nav className="hidden items-center gap-8 text-sm font-semibold uppercase tracking-[0.2em] text-surface/80 md:flex">
            <a className="transition hover:text-surface" href="#stories">
              Stories
            </a>
            <a className="transition hover:text-surface" href="#impact">
              Impact
            </a>
            <a className="transition hover:text-surface" href="#join">
              Get Involved
            </a>
          </nav>
          <button className="btn btn-accent">Donate</button>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-surface shadow-xl">
          <div className="absolute inset-0 topo-bg bg-primary opacity-70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/85 to-primary/60"></div>
          <div className="relative z-10 grid gap-10 px-8 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-14">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-mutedBlue">
                Adaptive Nation
              </p>
              <h1 className="mt-4 text-4xl font-bold text-surface sm:text-5xl">
                Where every warrior story inspires the next step forward.
              </h1>
              <p className="mt-4 max-w-xl text-lg text-surface/90">
                Warrior Revival celebrates resilience through inclusive recreation, creative
                expression, and wellness programs. Discover the journeys that are reshaping our
                community.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a className="btn btn-accent" href="#stories">
                  View stories
                </a>
                <a className="btn btn-primary border border-surface/40" href="#join">
                  Submit your story
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-surface/10 p-6 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
                Upcoming Events
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-surface">
                Adaptive Winter Retreat
              </h2>
              <p className="mt-2 text-sm text-surface/80">
                January 18 · Park City, Utah
              </p>
              <p className="mt-4 text-base text-surface/90">
                A weekend of adaptive skiing, mindfulness sessions, and community dinners.
              </p>
              <button className="btn btn-accent mt-6 w-full">Reserve a spot</button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-6 lg:px-10">
        <div className="grid gap-6 rounded-2xl border border-border bg-surface p-6 shadow-sm md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.label} className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
                {item.label}
              </p>
              <p className="text-3xl font-bold text-secondary">{item.value}</p>
              <p className="text-sm text-textSecondary">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
              Warrior stories
            </p>
            <h2 className="mt-3 text-3xl font-semibold">Stories that power our mission</h2>
            <p className="mt-3 max-w-2xl text-base text-textSecondary">
              Every story is a testament to courage and community. Explore how adaptive programs
              are helping warriors reclaim joy, confidence, and connection.
            </p>
          </div>
          <button className="btn btn-primary">Browse all stories</button>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.title}
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-md"
            >
              <div className="aspect-[4/3] w-full bg-secondary/20"></div>
              <div className="space-y-3 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
                  {story.tag}
                </p>
                <h3 className="text-xl font-semibold">{story.title}</h3>
                <p className="text-sm text-textSecondary">{story.description}</p>
                <button className="btn btn-accent w-full">Read the story</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="impact" className="bg-surface">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
              Community impact
            </p>
            <h2 className="text-3xl font-semibold">Designed for inclusion, built on trust.</h2>
            <p className="text-base text-textSecondary">
              Warrior Revival partners with adaptive experts to create accessible experiences for
              veterans and their families. Every program is supported by trained volunteers,
              evidence-based wellness practices, and a deep respect for each individual journey.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Certified adaptive instructors",
                "Family-centered wellness plans",
                "Peer mentorship circles",
                "Accessible adventure gear"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-border bg-light px-4 py-3 text-sm text-textSecondary"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-light p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
              Latest update
            </p>
            <h3 className="mt-3 text-2xl font-semibold">
              The summit series expands to five new states.
            </h3>
            <p className="mt-4 text-sm text-textSecondary">
              With new partners in Colorado, Arizona, and Montana, we are bringing adaptive
              climbing and outdoor retreats to even more warriors.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-textSecondary">
              <span className="rounded-full bg-surface px-3 py-1">Blog</span>
              <span>September 12, 2024</span>
            </div>
            <button className="btn btn-primary mt-6">Read the update</button>
          </div>
        </div>
      </section>

      <section id="join" className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
              Share your journey
            </p>
            <h2 className="text-3xl font-semibold">Submit your story to inspire others.</h2>
            <p className="text-base text-textSecondary">
              We are always looking for new voices. Tell us about your adaptive experience and
              help shape what is possible for the next warrior who needs hope.
            </p>
            <ul className="space-y-3 text-sm text-textSecondary">
              <li>• Highlight your adaptive sports or wellness milestone.</li>
              <li>• Share how community support made a difference.</li>
              <li>• Upload photos that bring your story to life.</li>
            </ul>
          </div>
          <form className="rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-textSecondary">
                First name
                <input
                  className="mt-2 w-full rounded-md border border-border px-3 py-2 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="Jamie"
                  type="text"
                />
              </label>
              <label className="text-sm font-medium text-textSecondary">
                Last name
                <input
                  className="mt-2 w-full rounded-md border border-border px-3 py-2 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                  placeholder="Lee"
                  type="text"
                />
              </label>
            </div>
            <label className="mt-4 block text-sm font-medium text-textSecondary">
              Email
              <input
                className="mt-2 w-full rounded-md border border-border px-3 py-2 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="you@email.com"
                type="email"
              />
            </label>
            <label className="mt-4 block text-sm font-medium text-textSecondary">
              Your story
              <textarea
                className="mt-2 min-h-[120px] w-full rounded-md border border-border px-3 py-2 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40"
                placeholder="Share the moments that made a difference."
              ></textarea>
            </label>
            <button className="btn btn-accent mt-6 w-full">Submit story</button>
          </form>
        </div>
      </section>

      <footer className="bg-primary text-surface">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-3 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-mutedBlue">
              Warrior Revival
            </p>
            <p className="mt-2 text-sm text-surface/80">
              Adaptive programs, inclusive recreation, and community support for every warrior.
            </p>
          </div>
          <div className="text-sm text-surface/80">
            <p className="font-semibold uppercase tracking-[0.2em] text-surface">
              Contact
            </p>
            <p className="mt-2">hello@warriorrevival.org</p>
            <p>(801) 555-0199</p>
          </div>
          <div className="text-sm text-surface/80">
            <p className="font-semibold uppercase tracking-[0.2em] text-surface">
              Stay connected
            </p>
            <div className="mt-3 flex gap-3">
              <button className="btn btn-accent">Newsletter</button>
              <button className="btn btn-primary border border-surface/40">Volunteer</button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
