import { Metadata } from "next";
import Link from "next/link";
import { Database, MapPin, Shield, Users } from "lucide-react";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";

export const metadata: Metadata = {
  title: "About - GACubes",
  description:
    "Learn about GACubes, Georgia's #1 directory for ice, water refill, dry ice, propane, and nearby essentials.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-header-bg text-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-4 text-sm text-white/50 mb-3">
            <BackButton className="text-white/70" />
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link><span>/</span><span className="text-white">About</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold">About GACubes</h1>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-surface rounded-2xl border border-border p-6 mb-8">
          <p className="text-muted leading-relaxed text-lg">
            GACubes is Georgia&apos;s comprehensive directory for finding ice
            vending machines, water refill stations, dry ice sellers, propane
            refill and exchange locations, and nearby convenience and package
            stores. Our mission is simple: help you find what you need, fast.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            {
              icon: <Database size={24} />,
              title: "Multi-Source Data",
              desc: "We combine data from ice vending networks (Twice the Ice, Kooler Ice, Ice House America), dry ice suppliers (Airgas, Penguin), propane services (AmeriGas, U-Haul), and Georgia's official alcohol license reports into one unified directory.",
            },
            {
              icon: <MapPin size={24} />,
              title: "Location-First",
              desc: "Search by GPS, town, ZIP, or browse by city. Our map-first experience helps you find the closest option instantly, with distance, hours, and directions.",
            },
            {
              icon: <Shield size={24} />,
              title: "Verified Data",
              desc: 'Every listing includes source attribution and verification dates. Community submissions are reviewed before publishing. We use Georgia\'s official license data for "near beer" badges.',
            },
            {
              icon: <Users size={24} />,
              title: "Community-Driven",
              desc: "Know a location we're missing? Submit it. See wrong info? Report it. GACubes gets better with every contribution from Georgia residents and visitors.",
            },
          ].map(({ icon, title, desc }) => (
            <div key={title} className="bg-surface rounded-2xl border border-border p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                {icon}
              </div>
              <h3 className="font-bold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-surface rounded-2xl border border-border p-6 mb-8">
          <h2 className="text-xl font-bold text-foreground mb-3">Our Data Sources</h2>
          <ul className="space-y-2 text-sm text-muted">
            <li><strong className="text-foreground">Ice Vending:</strong> Twice the Ice, Kooler Ice, Ice House America, Ice Merchant</li>
            <li><strong className="text-foreground">Dry Ice:</strong> Airgas, Penguin Dry Ice, DryIceDirectory</li>
            <li><strong className="text-foreground">Propane:</strong> AmeriGas, U-Haul propane locations</li>
            <li><strong className="text-foreground">Beer &amp; Drinks:</strong> Georgia Department of Revenue active alcohol license reports (updated quarterly)</li>
            <li><strong className="text-foreground">Convenience Stores:</strong> Georgia Association of Convenience Stores ecosystem</li>
            <li><strong className="text-foreground">Community:</strong> User-submitted locations, verified by our team</li>
          </ul>
        </div>

        <div className="bg-primary-light rounded-2xl p-8 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2">Contact Us</h2>
          <p className="text-muted mb-4">Questions, feedback, or partnership inquiries? We&apos;d love to hear from you.</p>
          <a
            href="mailto:hello@gacubes.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover"
          >
            hello@gacubes.com
          </a>
        </div>
      </main>
    </div>
  );
}
