import Container from "@/components/Container";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Events", href: "/events" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Partners", href: "/partners" },
  { label: "Gallery", href: "/gallery" },
  { label: "Donate", href: "/donate" },
  { label: "Contact", href: "/contact" }
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50 py-12">
      <Container className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-lg font-semibold text-slate-900">Warrior Revival</p>
          <p className="mt-3 max-w-md text-sm text-slate-600">
            Supporting service members, veterans, and their families through outdoor adventures,
            mentorship, and community in Utah.
          </p>
          <div className="mt-4 text-sm text-slate-500">
            <p>Utah</p>
            <p>info@warriorrevival.org</p>
            <p>(801) 555-0123</p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {footerLinks.map((link) => (
            <a key={link.href} className="text-sm text-slate-600 hover:text-slate-900" href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </Container>
    </footer>
  );
}
