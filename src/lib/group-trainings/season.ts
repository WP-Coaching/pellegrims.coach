export function getSeasonBadge(
  seasonLabels: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  },
  sessionDates: Array<{ value: string }>
): string | null {
  if (sessionDates.length === 0) return null;

  const parsed = sessionDates
    .map((entry) => new Date(entry.value))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => a.getTime() - b.getTime());

  const firstDate = parsed[0];
  if (!firstDate) return null;

  const month = firstDate.getUTCMonth() + 1;
  const year = firstDate.getUTCFullYear();

  // Training season logic:
  // Winter season spans November through March and is shown as a year range.
  if (month === 11 || month === 12) {
    return `${seasonLabels.winter} ${year}-${year + 1}`;
  }
  if (month >= 1 && month <= 3) {
    return `${seasonLabels.winter} ${year - 1}-${year}`;
  }
  if (month >= 4 && month <= 6) {
    return `${seasonLabels.spring} ${year}`;
  }
  if (month >= 7 && month <= 8) {
    return `${seasonLabels.summer} ${year}`;
  }
  return `${seasonLabels.autumn} ${year}`;
}
