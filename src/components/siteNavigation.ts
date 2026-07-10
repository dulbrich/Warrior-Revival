import { donatePageHref } from "@/lib/donation";

export const siteNavigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Veterans", href: "/veterans" },
  { label: "Events", href: "/events" },
  { label: "Golf", href: "/golf" },
  { label: "Join the Mission", href: "/join-the-mission" },
  { label: "Gallery", href: "/gallery" },
  { label: "Donate", href: donatePageHref },
  { label: "Contact", href: "/contact" }
];
