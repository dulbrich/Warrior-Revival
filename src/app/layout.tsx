import type { Metadata } from "next";
import { Bebas_Neue, Black_Ops_One, Montserrat, Open_Sans } from "next/font/google";
import "./globals.css";

const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"]
});

const bodyFont = Open_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

const accentFont = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-accent",
  weight: ["400"]
});

const blackOpsFont = Black_Ops_One({
  subsets: ["latin"],
  variable: "--font-black-ops",
  weight: ["400"]
});

export const metadata: Metadata = {
  title: "Warrior Revival",
  description:
    "Warrior Revival is a 501(c)(3) nonprofit founded in 2023 on the belief that no warrior should navigate life’s transitions alone. Through recreation, mentorship, wellness, and therapeutic retreat experiences, we walk alongside service members, veterans, and their families in Utah — fostering healing, resilience, and lasting connection.",
  icons: {
    icon: "/logo.webp"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${accentFont.variable} ${blackOpsFont.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
