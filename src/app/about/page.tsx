import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Snowflake, Database, MapPin, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About - GACubes",
  description:
    "Learn about GACubes, Georgia's #1 directory for ice, water refill, dry ice, propane, and nearby essentials.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="p-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={20} className="text-gray-600" />
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Snowflake size={18} className="text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">GACubes</span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          About GACubes
        </h1>

        <div className="prose prose-gray max-w-none">
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <p className="text-gray-600 leading-relaxed text-lg">
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
              <div
                key={title}
                className="bg-white rounded-xl border border-gray-200 p-6"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3">
              Our Data Sources
            </h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <strong>Ice Vending:</strong> Twice the Ice, Kooler Ice, Ice
                House America, Ice Merchant
              </li>
              <li>
                <strong>Dry Ice:</strong> Airgas, Penguin Dry Ice,
                DryIceDirectory
              </li>
              <li>
                <strong>Propane:</strong> AmeriGas, U-Haul propane locations
              </li>
              <li>
                <strong>Beer &amp; Drinks:</strong> Georgia Department of Revenue
                active alcohol license reports (updated quarterly)
              </li>
              <li>
                <strong>Convenience Stores:</strong> Georgia Association of
                Convenience Stores ecosystem
              </li>
              <li>
                <strong>Community:</strong> User-submitted locations, verified by
                our team
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-600 mb-4">
              Questions, feedback, or partnership inquiries? We&apos;d love to
              hear from you.
            </p>
            <a
              href="mailto:hello@gacubes.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
            >
              hello@gacubes.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
