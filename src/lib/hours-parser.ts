const DAY_MAP: Record<string, number> = {
  sun: 0, sunday: 0,
  mon: 1, monday: 1,
  tue: 2, tues: 2, tuesday: 2,
  wed: 3, wednesday: 3,
  thu: 4, thurs: 4, thursday: 4,
  fri: 5, friday: 5,
  sat: 6, saturday: 6,
};

function parseTime(s: string): number | null {
  s = s.trim().toLowerCase().replace(/\s+/g, "");
  const match = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)?$/);
  if (!match) return null;
  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3];
  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;
  if (!period && hours < 7) hours += 12; // heuristic: "5" likely means 5pm not 5am
  return hours * 60 + minutes;
}

function isInTimeRange(now: number, open: number, close: number): boolean {
  if (close <= open) {
    // spans midnight (e.g., 5am-1am means open 5:00-24:59 or 0:00-1:00)
    return now >= open || now < close;
  }
  return now >= open && now < close;
}

function getDayRange(start: string, end: string): number[] {
  const s = DAY_MAP[start.toLowerCase()];
  const e = DAY_MAP[end.toLowerCase()];
  if (s === undefined || e === undefined) return [];
  const days: number[] = [];
  let d = s;
  while (true) {
    days.push(d);
    if (d === e) break;
    d = (d + 1) % 7;
  }
  return days;
}

export function isOpenNow(hours: string, open24h: boolean): boolean | null {
  if (open24h) return true;
  if (!hours) return null;

  const h = hours.trim().toLowerCase();
  if (h === "24/7" || h === "24 hours" || h === "open 24 hours") return true;

  const now = new Date();
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // "Dawn to Dusk" - approximate as 6am-8pm
  if (h.includes("dawn") && h.includes("dusk")) {
    return isInTimeRange(currentMinutes, 360, 1200);
  }

  // Try day-specific format: "Mon-Fri 8AM-5PM, Sat 8AM-12PM"
  const segments = hours.split(/,\s*/);
  let matched = false;

  for (const segment of segments) {
    const seg = segment.trim();

    // Match: "Mon-Fri 8AM-5PM" or "Mon 8AM-5PM" or "Sunday 12:30PM-8PM"
    const dayTimeMatch = seg.match(
      /^([a-z]+)(?:\s*[-–]\s*([a-z]+))?\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)$/i
    );

    if (dayTimeMatch) {
      const dayStart = dayTimeMatch[1];
      const dayEnd = dayTimeMatch[2] || dayTimeMatch[1];
      const timeOpen = parseTime(dayTimeMatch[3]);
      const timeClose = parseTime(dayTimeMatch[4]);

      if (timeOpen === null || timeClose === null) continue;

      const days = getDayRange(dayStart, dayEnd);
      if (days.length === 0) continue;

      matched = true;
      if (days.includes(currentDay)) {
        return isInTimeRange(currentMinutes, timeOpen, timeClose);
      }
    }
  }

  if (matched) {
    // We found day-specific hours but current day wasn't listed = closed
    return false;
  }

  // Simple time range: "6am-10pm" or "10:00 AM - 9:00 PM"
  const simpleMatch = hours.match(
    /^(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*[-–]\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)$/i
  );
  if (simpleMatch) {
    const open = parseTime(simpleMatch[1]);
    const close = parseTime(simpleMatch[2]);
    if (open !== null && close !== null) {
      return isInTimeRange(currentMinutes, open, close);
    }
  }

  return null;
}
