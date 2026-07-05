import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Lora, Source_Sans_3 } from "next/font/google";

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-heading",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

const GA_ID = "G-N1TDJB81RW";
import Link from "next/link";
import { LanguageProviderWrapper } from "./components/LanguageProviderWrapper";
import StickyNav from "./components/StickyNav";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.seniorease.nl'),
  title: {
    default: "SeniorEase – Digitale hulp voor senioren",
    template: "%s | SeniorEase"
  },
  description: "SeniorEase biedt eenvoudige digitale tools speciaal voor senioren. Beheer uw boeken collectie, gebruik handige rekenmachine, kalender en meer. Grote teksten, duidelijke knoppen - technologie zonder gedoe.",
  keywords: [
    "senioren", "ouderen", "digitale hulp", "technologie voor senioren",
    "bibliotheek app", "boeken beheren", "barcode scanner",
    "eenvoudig", "toegankelijk", "grote teksten", "senior-friendly",
    "rekenmachine", "kalender", "puzzels", "grote klok",
    "Nederland", "Nederlandse app", "gratis app", "mobiele app"
  ],
  authors: [{ name: "SeniorEase", url: "https://seniorease.nl" }],
  creator: "SeniorEase",
  publisher: "SeniorEase",
  manifest: "/manifest.json",
  icons: {
    icon: "/heart-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://www.seniorease.nl",
    siteName: "SeniorEase",
    title: "SeniorEase - Handige technologie voor senioren",
    description: "Eenvoudige digitale tools speciaal voor senioren. Bibliotheek, rekenmachine, kalender en meer. Grote teksten, duidelijke knoppen.",
    images: [
      {
        url: "/heart-logo.png",
        width: 512,
        height: 512,
        alt: "SeniorEase logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SeniorEase - Handige technologie voor senioren",
    description: "Eenvoudige digitale tools speciaal voor senioren. Grote teksten, duidelijke knoppen - technologie zonder gedoe.",
    images: ["/heart-logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://www.seniorease.nl",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SeniorEase",
  },
  verification: {
    google: "CnJwgFy2XRApB0H55JzcQynioGjLaHHJ-lJc1_z1vaU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8B5E3C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${lora.variable} ${sourceSans.variable} ${sourceSans.className}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5E3C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SeniorEase Bibliotheek" />
      </head>
      <body className="antialiased" style={{ margin: 0 }}>
        <LanguageProviderWrapper>
          <StickyNav />
          {children}
          <footer className="bg-white border-t border-neutral-stone/40 py-6">
            <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-400" style={{ fontSize: '0.95rem' }}>
              <p>© 2026 SeniorEase</p>
              <div className="flex gap-5">
                <Link href="/over-ons" className="hover:text-primary transition-colors">Over ons</Link>
                <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
                <Link href="/voorwaarden" className="hover:text-primary transition-colors">Voorwaarden</Link>
              </div>
              <div className="flex gap-4">
                <a href="https://www.facebook.com/seniorease.nl" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Facebook</a>
                <a href="https://www.youtube.com/@SeniorEaseNL" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">YouTube</a>
              </div>
            </div>
          </footer>
        </LanguageProviderWrapper>
        {/* Google Analytics */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
