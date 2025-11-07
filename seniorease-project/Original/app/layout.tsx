import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SeniorEase - Mijn Bibliotheek",
  description: "Beheer uw boeken en muziek collectie. Scan barcodes of voer handmatig in.",
  keywords: ["senioren", "digitale hulp", "ouderen", "eenvoudig", "toegankelijk", "bibliotheek", "boeken", "muziek"],
  authors: [{ name: "SeniorEase" }],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SeniorEase Bibliotheek",
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
