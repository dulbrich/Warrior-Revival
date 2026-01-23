import type { Metadata } from "next";
import { Poppins, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const headingFont = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["600", "700"]
});

const bodyFont = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "Warrior Revival",
  description: "Warrior Revival website prototype",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
