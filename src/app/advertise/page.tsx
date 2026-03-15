import { Metadata } from "next";
import Link from "next/link";
import { BarChart3, MapPin, Star, Zap } from "lucide-react";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Advertise - GACubes",
  description:
    "Promote your business on GACubes, Georgia's #1 ice, water, and essentials directory.",
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-header-bg text-white py-8">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-white/50 mb-3">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span><span className="text-white">Advertise</span>
          </div>
          <h1 className="text-3xl font-bold">Advertise on GACubes</h1>
          <p className="text-white/60 mt-2 max-w-2xl">
            Reach customers searching for ice, water, propane, and essentials
            across Georgia. Get your business in front of high-intent local searchers.
          </p>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <MapPin size={24} />,
              title: "Featured Listings",
              desc: "Pin your business to the top of search results in your area. Includes a featured badge and enhanced listing details.",
            },
            {
              icon: <Star size={24} />,
              title: "Sponsored Placement",
              desc: "Appear as a sponsored result on city pages, ZIP pages, and category landing pages across the site.",
            },
            {
              icon: <BarChart3 size={24} />,
              title: "Analytics & Tracking",
              desc: "Track clicks, calls, and direction requests. See how many customers find your business through GACubes.",
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

        <div className="bg-surface rounded-2xl border border-border p-8 text-center">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap size={28} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Get Started</h2>
          <p className="text-muted mb-6 max-w-lg mx-auto">
            Contact us to discuss advertising options and pricing.
            We offer flexible plans for businesses of all sizes.
          </p>
          <a
            href="mailto:hello@gacubes.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            Contact Us: hello@gacubes.com
          </a>
        </div>
      </main>
    </div>
  );
}
