import Link from "next/link";
import Container from "@/components/Container";
import PrimaryButton from "@/components/PrimaryButton";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Partners", href: "/partners" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" }
];

export default function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <Container className="flex items-center justify-between py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-sm font-semibold text-white">
            WR
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Warrior Revival</p>
            <p className="text-xs text-slate-500">Empowering veterans through adventure</p>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} className="hover:text-slate-900" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <PrimaryButton href="/donate">Donate</PrimaryButton>
          <PrimaryButton href="/events/submit" variant="secondary">
            Submit Event
          </PrimaryButton>
        </div>
        <button
          className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 lg:hidden"
          type="button"
        >
          Menu
        </button>
      </Container>
    </header>
  );
}
