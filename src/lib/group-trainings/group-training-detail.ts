import "server-only";

import { unstable_cache } from "next/cache";
import { getPayload } from "payload";
import type { GroupTraining, Location } from "@/payload-types";
import type { Locale } from "@/lib/i18n";
import type { TrainingPageConfig } from "@/components/templates";
import type { TranslationKey } from "@/lib/translations";
import { getGroupTrainingDetailTag } from "@/lib/cache-tags";
import { getSeasonBadge } from "@/lib/group-trainings/season";
import config from "@/payload.config";

const WEEKDAY_LABELS = {
  monday: { en: "Monday", nl: "Maandag" },
  tuesday: { en: "Tuesday", nl: "Dinsdag" },
  wednesday: { en: "Wednesday", nl: "Woensdag" },
  thursday: { en: "Thursday", nl: "Donderdag" },
  friday: { en: "Friday", nl: "Vrijdag" },
  saturday: { en: "Saturday", nl: "Zaterdag" },
  sunday: { en: "Sunday", nl: "Zondag" },
} as const;

type WeekdayKey = keyof typeof WEEKDAY_LABELS;
const isWeekdayKey = (value: string): value is WeekdayKey =>
  value in WEEKDAY_LABELS;
const isLocation = (value: GroupTraining["location"]): value is Location =>
  typeof value !== "number" && value !== null;

const getLocationData = (
  locationValue: GroupTraining["location"]
): { name: string; address: string; mapsLink: string } => {
  if (!isLocation(locationValue)) {
    return { name: "Location", address: "", mapsLink: "#" };
  }

  return {
    name: locationValue.name?.trim() || "Location",
    address: locationValue.address?.trim() || "",
    mapsLink: locationValue.mapsLink?.trim() || "#",
  };
};

const formatDutchTime = (time: string) => time.replace(":", "u");
const getWeekdayLabel = (locale: Locale, weekday: WeekdayKey) =>
  WEEKDAY_LABELS[weekday][locale];
const formatTimeRange = (startTime: string, endTime: string) =>
  `${startTime} - ${endTime}`;
const formatDayTimeslot = (
  locale: Locale,
  weekday: WeekdayKey,
  startTime: string,
  endTime: string
) => {
  const weekdayLabel = getWeekdayLabel(locale, weekday);

  if (locale === "nl") {
    return `${weekdayLabel} tussen ${formatDutchTime(startTime)} en ${formatDutchTime(endTime)}`;
  }

  return `Every ${weekdayLabel} between ${startTime} and ${endTime}`;
};

export async function getPublishedGroupTraining(
  locale: Locale,
  slug: string
): Promise<GroupTraining | null> {
  const getCachedPublishedGroupTraining = unstable_cache(
    async (): Promise<GroupTraining | null> => {
      const payload = await getPayload({ config });

      return (
        (
          await payload.find({
            collection: "group-trainings",
            limit: 1,
            depth: 1,
            locale,
            fallbackLocale: "en",
            where: {
              and: [
                { slug: { equals: slug } },
                { _status: { equals: "published" } },
              ],
            },
          })
        ).docs[0] ?? null
      );
    },
    ["group-training-detail", locale, slug],
    {
      tags: [getGroupTrainingDetailTag(slug)],
    }
  );

  try {
    return await getCachedPublishedGroupTraining();
  } catch (error) {
    console.warn("Failed to load group training detail from Payload:", error);
    return null;
  }
}

export function buildTrainingConfig(
  locale: Locale,
  groupTraining: GroupTraining,
  copy: TranslationKey["groupTrainingDetail"]
): TrainingPageConfig {
  const localeCode = locale === "nl" ? "nl-BE" : "en-US";
  const monthFormatter = new Intl.DateTimeFormat(localeCode, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const applyTemplate = (
    template: string,
    values: Record<string, string>
  ): string =>
    Object.entries(values).reduce(
      (result, [key, value]) => result.replaceAll(`{${key}}`, value),
      template
    );

  const monthsByKey = new Map<
    string,
    { id: string; title: string; days: string[] }
  >();
  for (const session of groupTraining.sessionDates) {
    const date = new Date(session.value);
    if (Number.isNaN(date.getTime())) {
      continue;
    }

    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = String(date.getUTCDate());
    const key = `${year}-${String(month).padStart(2, "0")}`;
    const titleRaw = monthFormatter.format(date);
    const title = titleRaw.charAt(0).toUpperCase() + titleRaw.slice(1);
    const existing = monthsByKey.get(key);

    if (existing) {
      existing.days.push(day);
      continue;
    }

    monthsByKey.set(key, {
      id: key,
      title,
      days: [day],
    });
  }

  const groupedMonths = Array.from(monthsByKey.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([, month]) => month);
  const location = getLocationData(groupTraining.location);
  const fullLocation = location.address
    ? `${location.name}, ${location.address}`
    : location.name;
  const weekday: WeekdayKey = isWeekdayKey(groupTraining.weekday)
    ? groupTraining.weekday
    : "monday";
  const dayValue = formatDayTimeslot(
    locale,
    weekday,
    groupTraining.startTime,
    groupTraining.endTime
  );
  const timeRange = formatTimeRange(
    groupTraining.startTime,
    groupTraining.endTime
  );
  const subtitle = groupTraining.subtitle.trim();
  const heroTitle = groupTraining.title.trim();

  return {
    locale,
    hero: {
      badges: [
        {
          text: getSeasonBadge(copy.seasons, groupTraining.sessionDates) || "",
          className:
            "border-primary-300 bg-primary-50/90 text-primary-800 shadow-sm backdrop-blur-sm",
        },
        {
          label: copy.levelLabel,
          text: copy.levels[groupTraining.level],
          className:
            groupTraining.level === "beginner"
              ? "border-emerald-400/70 bg-emerald-100 text-emerald-900"
              : "border-amber-400/70 bg-amber-100 text-amber-900",
          labelClassName:
            groupTraining.level === "beginner"
              ? "text-emerald-700"
              : "text-amber-700",
        },
      ].filter((badge) => badge.text),
      title: heroTitle,
      intro: subtitle,
      locationText: copy.locationLabel,
      locationName: location.name,
      locationHref: location.mapsLink,
    },
    groups: {
      title: copy.groupsTitle,
      items: [
        {
          content: groupTraining.focusContent,
        },
      ],
      columns: 1,
    },
    practical: {
      title: copy.practicalTitle,
      items: [
        {
          label: copy.levelLabel,
          value: copy.levels[groupTraining.level],
          icon: "🏅",
        },
        {
          label: copy.coachLabel,
          value: groupTraining.coachName,
          icon: "👨‍🏫",
        },
        {
          label: copy.locationLabel,
          value: fullLocation,
          href: location.mapsLink,
          external: true,
          icon: "📍",
        },
        { label: copy.dayLabel, value: dayValue, icon: "📅" },
        { label: copy.priceLabel, value: groupTraining.price, icon: "💶" },
        { label: copy.gearLabel, value: groupTraining.gear, icon: "🏊‍♀️" },
        { label: copy.invoiceLabel, value: copy.invoiceValue, icon: "📄" },
      ],
    },
    dates: {
      title: copy.datesTitle,
      months: groupedMonths,
      footerText: applyTemplate(copy.datesFooterTemplate, {
        day: dayValue,
      }),
    },
    datesFooter: {
      locationName: location.name,
      locationHref: location.mapsLink,
    },
    enrollment: {
      title: copy.enrollTitle,
      subtitle: applyTemplate(copy.enrollSubtitleTemplate, {
        location: location.name,
        day: dayValue,
        price: groupTraining.price,
      }),
      signup: {
        title: copy.enrollmentSignupTitle,
        intro: copy.enrollmentSignupIntro,
        options: [
          {
            id: `option-${groupTraining.slug}`,
            title: heroTitle,
            time: timeRange,
            cta: copy.enrollmentOptionCta,
            isOpen: groupTraining.status === "open",
            stripeUrl: groupTraining.enrollmentStripeUrl || undefined,
            closedLabel: copy.enrollmentClosedLabel,
            contactFallbackLabel: copy.enrollmentContactFallbackLabel,
          },
        ],
      },
      questionsText: copy.questionsText,
      contactLinkText: copy.contactLinkText,
      contactHref: `/${locale}/#contact`,
    },
  };
}
