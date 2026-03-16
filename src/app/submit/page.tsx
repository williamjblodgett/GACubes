import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import BackButton from "@/components/BackButton";
import SubmitForm from "@/components/SubmitForm";

export const metadata: Metadata = {
  title: "Submit a Location - GACubes",
  description:
    "Submit a new ice, water, propane, or store location to the GACubes Georgia directory.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="bg-header-bg text-white py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-4 text-sm text-white/50 mb-3">
            <BackButton className="text-white/70" />
            <div className="flex items-center gap-2">
              <Link href="/" className="hover:text-white">Home</Link><span>/</span><span className="text-white">Submit Location</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold">Submit a Location</h1>
          <p className="text-white/60 mt-2">
            Know an ice, water, propane, or store location we&apos;re missing?
            Help us keep Georgia&apos;s directory complete.
          </p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <SubmitForm />
      </main>
    </div>
  );
}
