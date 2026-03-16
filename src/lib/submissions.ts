import { CategoryType } from "./types";

const STORAGE_KEY = "gacubes-submissions";

export interface SubmissionData {
  id: string;
  name: string;
  category: CategoryType;
  address: string;
  city: string;
  zip: string;
  phone: string;
  website: string;
  hours: string;
  features: string[];
  notes: string;
  submittedAt: string;
}

export function saveSubmission(data: SubmissionData): void {
  try {
    const existing = getSubmissions();
    existing.unshift(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // ignore storage errors
  }
}

export function getSubmissions(): SubmissionData[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored) as SubmissionData[];
  } catch {
    return [];
  }
}

export function generateSubmissionId(): string {
  return `user-${Date.now()}`;
}
