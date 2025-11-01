import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SeniorEase - Digitaal gemak voor senioren",
  description: "Eenvoudige digitale hulpmiddelen speciaal ontworpen voor senioren",
  keywords: ["senioren", "digitale hulp", "ouderen", "eenvoudig", "toegankelijk"],
  authors: [{ name: "SeniorEase" }],
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
