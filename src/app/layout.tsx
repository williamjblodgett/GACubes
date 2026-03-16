import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { ServiceWorkerRegistrar } from "@/components/ServiceWorker";

export const metadata: Metadata = {
  title: "GACubes - Georgia Ice, Water & Essentials Finder",
  description:
    "Find ice vending machines, water refill stations, dry ice, propane, and nearby stores fast in Georgia.",
  keywords:
    "ice near me, Georgia ice, ice vending, water refill, dry ice, propane, Georgia essentials",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "GACubes",
  },
};

export const viewport: Viewport = {
  themeColor: "#4A9FD9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" href="/logos/39C1E6E2-AF08-4656-BAE7-AC123CC3B5BC.png" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2048351819045611"
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </head>
      <body className="antialiased bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
        <ServiceWorkerRegistrar />
      </body>
    </html>
  );
}
