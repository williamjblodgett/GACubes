import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Snowflake, BarChart3, MapPin, Star, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Advertise - GACubes",
  description:
    "Promote your business on GACubes, Georgia's #1 ice, water, and essentials directory.",
};

export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-4">
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

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Advertise on GACubes
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Reach customers searching for ice, water, propane, and essentials
            across Georgia. Get your business in front of high-intent local
            searchers.
          </p>
        </div>

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

        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Zap size={32} className="text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get Started
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Contact us to discuss advertising options and pricing.
            We offer flexible plans for businesses of all sizes.
          </p>
          <a
            href="mailto:advertise@gacubes.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Contact Us: advertise@gacubes.com
          </a>
        </div>
      </main>
    </div>
  );
}
