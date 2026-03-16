"use client";

import { useState } from "react";
import { CATEGORY_LABELS, CategoryType } from "@/lib/types";
import { saveSubmission, generateSubmissionId } from "@/lib/submissions";
import { useToast } from "./Toast";
import { CheckCircle } from "lucide-react";

const FEATURE_OPTIONS = [
  "Open 24/7",
  "Card Accepted",
  "Cash Accepted",
  "Water Refill",
  "Dry Ice",
  "Propane Refill",
  "Propane Exchange",
  "Beer / Drinks Nearby",
];

const inputClass =
  "w-full border border-border rounded-xl px-4 py-3 text-sm bg-background text-foreground focus:ring-2 focus:ring-primary outline-none";

interface FormErrors {
  name?: string;
  category?: string;
  address?: string;
  city?: string;
  zip?: string;
  website?: string;
}

export default function SubmitForm() {
  const { showToast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [website, setWebsite] = useState("");
  const [hours, setHours] = useState("");
  const [features, setFeatures] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const toggleFeature = (feat: string) => {
    setFeatures((prev) =>
      prev.includes(feat) ? prev.filter((f) => f !== feat) : [...prev, feat]
    );
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!name.trim()) newErrors.name = "Business name is required";
    if (!category) newErrors.category = "Please select a category";
    if (!address.trim()) newErrors.address = "Street address is required";
    if (!city.trim()) newErrors.city = "City is required";
    if (!zip.trim() || !/^\d{5}$/.test(zip.trim())) newErrors.zip = "Valid 5-digit ZIP required";
    if (website.trim() && !/^https?:\/\/.+\..+/.test(website.trim())) {
      newErrors.website = "Enter a valid URL (https://...)";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    saveSubmission({
      id: generateSubmissionId(),
      name: name.trim(),
      category: category as CategoryType,
      address: address.trim(),
      city: city.trim(),
      zip: zip.trim(),
      phone: phone.trim(),
      website: website.trim(),
      hours: hours.trim(),
      features,
      notes: notes.trim(),
      submittedAt: new Date().toISOString(),
    });

    showToast("Location submitted successfully!");
    setSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setAddress("");
    setCity("");
    setZip("");
    setPhone("");
    setWebsite("");
    setHours("");
    setFeatures([]);
    setNotes("");
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="bg-surface rounded-2xl border border-border p-8 text-center">
        <CheckCircle size={48} className="mx-auto text-green-500 mb-4" />
        <h2 className="text-lg font-bold text-foreground">Thank You!</h2>
        <p className="text-sm text-muted mt-2">
          Your location has been submitted and will be reviewed before being added to the directory.
        </p>
        <button
          onClick={resetForm}
          className="mt-6 px-6 py-3 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          Submit Another Location
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface rounded-2xl border border-border p-6 space-y-5"
      noValidate
    >
      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Business Name *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder="e.g., Twice the Ice - Roswell"
        />
        {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Category *</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          <option value="">Select a category</option>
          {(Object.keys(CATEGORY_LABELS) as CategoryType[]).map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_LABELS[cat]}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">Street Address *</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={inputClass}
            placeholder="1025 Alpharetta St"
          />
          {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">City *</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={inputClass}
            placeholder="Roswell"
          />
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">ZIP Code *</label>
          <input
            type="text"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className={inputClass}
            placeholder="30075"
            maxLength={5}
          />
          {errors.zip && <p className="text-xs text-red-500 mt-1">{errors.zip}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground mb-1">Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
            placeholder="(770) 555-0101"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Website</label>
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className={inputClass}
          placeholder="https://example.com"
        />
        {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Hours</label>
        <input
          type="text"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className={inputClass}
          placeholder="24/7 or Mon-Fri 8AM-5PM"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-2">Features</label>
        <div className="grid grid-cols-2 gap-2">
          {FEATURE_OPTIONS.map((feat) => (
            <label key={feat} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={features.includes(feat)}
                onChange={() => toggleFeature(feat)}
                className="rounded border-border text-primary focus:ring-primary"
              />
              {feat}
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-foreground mb-1">Additional Notes</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="Any extra details about this location..."
        />
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-primary text-white rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors"
      >
        Submit Location
      </button>

      <p className="text-xs text-muted text-center">
        Submissions are reviewed before being added to the directory.
      </p>
    </form>
  );
}
