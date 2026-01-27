import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 text-sm text-textSecondary md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center gap-4">
          <div>
            <p className="font-heading text-base font-semibold text-primary">Warrior Revival</p>
            <p className="text-xs uppercase tracking-[0.2em] text-textSecondary">
              Sandy, Utah
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com/Warrior.Revival.Vets"
              target="_blank"
              rel="noreferrer"
              aria-label="Warrior Revival on Facebook"
              className="text-textSecondary transition hover:text-primary"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M22 12.06C22 6.49 17.52 2 12 2S2 6.49 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/warrior.revival.vets/"
              target="_blank"
              rel="noreferrer"
              aria-label="Warrior Revival on Instagram"
              className="text-textSecondary transition hover:text-primary"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="currentColor"
              >
                <path d="M12 7.35c-2.57 0-4.65 2.08-4.65 4.65S9.43 16.65 12 16.65 16.65 14.57 16.65 12 14.57 7.35 12 7.35zm0 7.67a3.02 3.02 0 1 1 0-6.04 3.02 3.02 0 0 1 0 6.04z" />
                <path d="M17.6 2.5H6.4A3.9 3.9 0 0 0 2.5 6.4v11.2a3.9 3.9 0 0 0 3.9 3.9h11.2a3.9 3.9 0 0 0 3.9-3.9V6.4a3.9 3.9 0 0 0-3.9-3.9zm2.35 15.1a2.35 2.35 0 0 1-2.35 2.35H6.4a2.35 2.35 0 0 1-2.35-2.35V6.4A2.35 2.35 0 0 1 6.4 4.05h11.2a2.35 2.35 0 0 1 2.35 2.35v11.2z" />
                <circle cx="17.8" cy="6.2" r="1.2" />
              </svg>
            </a>
          </div>
        </div>
        <p>
          Tax EIN: 92-3281562 |{" "}
          <Link href="/privacy-policy" className="transition hover:text-primary">
            Warrior Revival&apos;s Privacy Policy
          </Link>
        </p>
        <button className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          Contact us
        </button>
      </div>
    </footer>
  );
}
