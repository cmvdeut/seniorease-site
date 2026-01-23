import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://seniorease.nl'),
  title: {
    default: "SeniorEase - Handy technology for seniors",
    template: "%s | SeniorEase"
  },
  description: "SeniorEase offers simple digital tools specially designed for seniors. Manage your book collection, use handy calculator, calendar and more. Large texts, clear buttons - technology without hassle.",
  alternates: {
    canonical: "https://seniorease.nl/en",
    languages: {
      'en': 'https://seniorease.nl/en',
      'nl': 'https://seniorease.nl',
    },
  },
};

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {children}
    </html>
  );
}

