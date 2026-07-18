import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "SeniorEase - Handy technology for seniors",
    template: "%s | SeniorEase"
  },
  description: "SeniorEase offers simple digital tools specially designed for seniors. Manage your book collection, use handy calculator, calendar and more. Large texts, clear buttons - technology without hassle.",
  alternates: {
    canonical: "https://www.seniorease.nl/en",
    languages: {
      en: "https://www.seniorease.nl/en",
      "en-US": "https://www.seniorease.nl/en",
      nl: "https://www.seniorease.nl",
      "nl-NL": "https://www.seniorease.nl",
      "x-default": "https://www.seniorease.nl",
    },
  },
};

/** No nested <html> — root layout already provides the document element. */
export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div lang="en">{children}</div>;
}
