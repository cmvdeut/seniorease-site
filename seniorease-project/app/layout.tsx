import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://seniorease.nl'),
  title: {
    default: "SeniorEase - Handige technologie voor senioren",
    template: "%s | SeniorEase"
  },
  description: "SeniorEase - Handige technologie zonder gedoe voor senioren. Beheer uw boeken en muziek collectie met barcode scanner. Gratis op PC, €2,99 voor Android app. Grote teksten, duidelijke knoppen, speciaal gemaakt voor senioren in Nederland.",
  keywords: [
    "senioren", "ouderen", "digitale hulp", "technologie voor senioren",
    "bibliotheek app", "boeken beheren", "muziek collectie", "barcode scanner",
    "eenvoudig", "toegankelijk", "grote teksten", "senior-friendly",
    "rekenmachine", "kalender", "puzzels", "grote klok",
    "Nederland", "Nederlandse app", "gratis app", "Android app",
    "Android telefoon", "Android tablet", "senioren app Nederland",
    "digitale bibliotheek", "boeken app", "muziek app", "barcode app",
    "handige app voor senioren", "eenvoudige app", "grote knoppen app"
  ],
  authors: [{ name: "SeniorEase", url: "https://seniorease.nl" }],
  creator: "SeniorEase",
  publisher: "SeniorEase",
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://seniorease.nl",
    siteName: "SeniorEase",
    title: "SeniorEase - Handige technologie voor senioren",
    description: "SeniorEase - Handige technologie zonder gedoe voor senioren. Beheer boeken en muziek met barcode scanner. Gratis op PC, Android app beschikbaar. Grote teksten, duidelijke knoppen.",
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
    description: "SeniorEase - Handige technologie zonder gedoe voor senioren. Bibliotheek app, rekenmachine, kalender. Gratis op PC, Android app beschikbaar.",
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
    canonical: "https://seniorease.nl",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SeniorEase",
  },
  verification: {
    // Voeg hier later Google Search Console verification code toe
    // google: "your-verification-code",
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
    <html lang="nl">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#8B5E3C" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SeniorEase Bibliotheek" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
