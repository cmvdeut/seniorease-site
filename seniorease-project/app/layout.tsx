import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProviderWrapper } from "./components/LanguageProviderWrapper";

export const metadata: Metadata = {
  metadataBase: new URL('https://seniorease.nl'),
  title: {
    default: "SeniorEase - Handige technologie voor senioren",
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
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://seniorease.nl",
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
        <LanguageProviderWrapper>
          {children}
        </LanguageProviderWrapper>
      </body>
    </html>
  );
}
