import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GACubes - Georgia Ice, Water & Essentials Finder",
  description:
    "Find ice vending machines, water refill stations, dry ice, propane, and nearby stores fast in Georgia.",
  keywords:
    "ice near me, Georgia ice, ice vending, water refill, dry ice, propane, Georgia essentials",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
