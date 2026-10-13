import type { Metadata, Viewport } from "next";
import "./globals.css";
import { gymConfig } from "@/config/gymConfig";

export const metadata: Metadata = {
  title: `${gymConfig.brand.name} ${gymConfig.brand.brandTag} | ${gymConfig.brand.tagline}`,
  description: `${gymConfig.brand.heroHeadline} ${gymConfig.brand.heroSubtext} A 45,000 sq ft luxury athletic sanctuary featuring Eleiko calibrated weights, cryogenic recovery, and Olympic master coaching.`,
  keywords: [
    "luxury gym",
    "elite fitness",
    "Austin private gym",
    "Eleiko strength sanctuary",
    "Olympic weightlifting",
    "cryotherapy sauna recovery",
    "high performance training",
    "personal trainer Austin",
  ],
  authors: [{ name: "IRONFORGE Elite Fitness" }],
  openGraph: {
    title: `${gymConfig.brand.name} | Built by Discipline`,
    description: "An uncompromising cathedral of human performance and biomechanical strength.",
    type: "website",
    locale: "en_US",
    siteName: gymConfig.brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${gymConfig.brand.name} ${gymConfig.brand.brandTag}`,
    description: gymConfig.brand.tagline,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="bg-obsidian-900 text-silver-200 antialiased selection:bg-crimson selection:text-white">
        {children}
      </body>
    </html>
  );
}
