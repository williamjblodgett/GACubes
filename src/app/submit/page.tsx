import { Metadata } from "next";
import Link from "next/link";
import { CATEGORY_LABELS, CategoryType } from "@/lib/types";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Submit a Location - GACubes",
  description:
    "Submit a new ice, water, propane, or store location to the GACubes Georgia directory.",
};

export default function SubmitPage() {
  return (
    <div className="min-h-screen bg-surface-secondary">
      <Header />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link href="/" className="hover:text-primary">Home</Link><span>/</span><span className="text-foreground">Submit Location</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Submit a Location
        </h1>
        <p className="text-muted mb-8">
          Know an ice, water, propane, or store location we&apos;re missing?
          Help us keep Georgia&apos;s directory complete.
        </p>

        <form className="bg-surface rounded-xl border border-border p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Business Name *
            </label>
            <input
              type="text"
              required
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
              placeholder="e.g., Twice the Ice - Roswell"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Category *
            </label>
            <select
              required
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
            >
              <option value="">Select a category</option>
              {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_LABELS[cat]}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Street Address *
              </label>
              <input
                type="text"
                required
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
                placeholder="1025 Alpharetta St"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                City *
              </label>
              <input
                type="text"
                required
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
                placeholder="Roswell"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                ZIP Code *
              </label>
              <input
                type="text"
                required
                pattern="[0-9]{5}"
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
                placeholder="30075"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
                placeholder="(770) 555-0101"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Website
            </label>
            <input
              type="url"
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Hours
            </label>
            <input
              type="text"
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none"
              placeholder="24/7 or Mon-Fri 8AM-5PM"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Features
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Open 24/7",
                "Card Accepted",
                "Cash Accepted",
                "Water Refill",
                "Dry Ice",
                "Propane Refill",
                "Propane Exchange",
                "Beer / Drinks Nearby",
              ].map((feat) => (
                <label
                  key={feat}
                  className="flex items-center gap-2 text-sm text-foreground"
                >
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary"
                  />
                  {feat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-1">
              Additional Notes
            </label>
            <textarea
              rows={3}
              className="w-full border border-border rounded-lg px-3 py-2.5 text-sm bg-surface text-foreground focus:ring-2 focus:ring-primary outline-none resize-none"
              placeholder="Any extra details about this location..."
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors"
          >
            Submit Location
          </button>

          <p className="text-xs text-muted text-center">
            Submissions are reviewed before being added to the directory.
          </p>
        </form>
      </main>
    </div>
  );
}
