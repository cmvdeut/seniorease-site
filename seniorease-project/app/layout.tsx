import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Lora, Source_Sans_3 } from "next/font/google";
import JsonLd from "./components/JsonLd";
import {
  SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

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
import { LanguageProviderWrapper } from "./components/LanguageProviderWrapper";
import Header from "./components/Header";
import Footer from "./components/Footer";
import RegisterServiceWorker from "./components/RegisterServiceWorker";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SeniorEase – Digitale hulp voor senioren",
    template: "%s | SeniorEase"
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "senioren", "ouderen", "digitale hulp", "technologie voor senioren",
    "stap voor stap uitleg", "WhatsApp uitleg", "DigiD uitleg",
    "bibliotheek app", "boeken beheren", "barcode scanner",
    "eenvoudig", "toegankelijk", "grote teksten", "senior-friendly",
    "rekenmachine", "kalender", "puzzels", "grote klok",
    "Nederland", "Nederlandse app", "gratis app", "mobiele app"
  ],
  authors: [{ name: "SeniorEase", url: SITE_URL }],
  creator: "SeniorEase",
  publisher: "SeniorEase",
  manifest: "/manifest.json",
  icons: {
    icon: "/heart-logo.png",
  },
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: SITE_URL,
    siteName: "SeniorEase",
    title: "SeniorEase – Digitale hulp voor senioren",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "SeniorEase – Digitale hulp voor senioren",
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE.url],
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
  // Canonical/hreflang per pagina via buildPageMetadata — niet hier op homepage vastzetten
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
  themeColor: "#0F1F3D",
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
        <meta name="theme-color" content="#0F1F3D" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SeniorEase" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="antialiased" style={{ margin: 0 }}>
        <RegisterServiceWorker />
        <JsonLd data={[organizationSchema, websiteSchema]} />
        <LanguageProviderWrapper>
          <Header />
          {children}
          <Footer />
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
