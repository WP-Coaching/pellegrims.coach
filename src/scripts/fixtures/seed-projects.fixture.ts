import type { SportCategory } from "@/payload-types";

type SeedProjectFixture = {
  imagePath: string;
  category: SportCategory["key"];
  link?: string;
  title: {
    en: string;
    nl: string;
  };
  description: {
    en: string;
    nl: string;
  };
  sortOrder: number;
};

export const seedProjectsFixture: readonly SeedProjectFixture[] = [
  {
    imagePath: "/images/testdag-wetsuits-28-feb.png",
    category: "triathlon",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScoTuDmXAyQ4jfdV_WTqJ_ylwGxmeFozx0fty84Wthe-fFCSA/viewform?usp=header",
    title: {
      en: "Orca Wetsuits Test Day 2",
      nl: "Orca wetsuits testdag 2",
    },
    description: {
      en: "Saturday 28 February 16:00",
      nl: "Zaterdag 28 februari 16u00",
    },
    sortOrder: 10,
  },
  {
    imagePath: "/images/testdag-wetsuits.png",
    category: "triathlon",
    link: "https://docs.google.com/forms/d/1RHxrbavY7qfqOn8DiZHwTnrHtX_vaVelio7R8c26gdQ/edit",
    title: {
      en: "Orca Wetsuits Test Day 1",
      nl: "Orca Wetsuits testdag 1",
    },
    description: {
      en: "Saturday 7 February 16:00",
      nl: "Zaterdag 7 februari 16u00",
    },
    sortOrder: 20,
  },
  {
    imagePath: "/images/lanzarote.avif",
    category: "triathlon",
    title: {
      en: "Triathlon Training Camp La Santa Lanzarote",
      nl: "Triatlon trainingstage La Santa Lanzarote",
    },
    description: {
      en: "18-25 April 2026 - Contact for more info",
      nl: "18-25 april 2026 - Neem contact op voor meer info",
    },
    sortOrder: 30,
  },
  {
    imagePath: "/images/trainingpeaks-logo.png",
    category: "triathlon",
    link: "https://www.trainingpeaks.com/coach/pellegrims#trainingplans",
    title: {
      en: "Training Plans",
      nl: "Training Plans",
    },
    description: {
      en: "Swimming and running plans available on TrainingPeaks.com",
      nl: "Zwem- en loopschema's beschikbaar op TrainingPeaks.com",
    },
    sortOrder: 40,
  },
  {
    imagePath: "/images/zwem-coach-hero.png",
    category: "swimming",
    link: "https://www.zwem.coach",
    title: {
      en: "Zwem.coach",
      nl: "Zwem.coach",
    },
    description: {
      en: "Start to Crawl in Vilvoorde with Pieter Timmers",
      nl: "Start to Crawl in Vilvoorde met Pieter Timmers",
    },
    sortOrder: 45,
  },
  {
    imagePath: "/images/pic01.jpg",
    category: "swimming",
    title: {
      en: "Coaching Elite Swimmers",
      nl: "Coaching van elite zwemmers",
    },
    description: {
      en: "Between 2009 and 2021.",
      nl: "Tussen 2009 en 2021",
    },
    sortOrder: 50,
  },
  {
    imagePath: "/images/rvo-kenia.jpg",
    category: "cycling",
    link: "https://www.riftvalleyodyssey.com",
    title: {
      en: "RVO Kenya 2025",
      nl: "RVO Kenia 2025",
    },
    description: {
      en: "Rift Valley Odyssey",
      nl: "Rift Valley Odyssey",
    },
    sortOrder: 60,
  },
  {
    imagePath: "/images/rwanda1.jpg",
    category: "cycling",
    link: "https://www.rwandanepic.com/",
    title: {
      en: "Rwanda Epic",
      nl: "Rwanda Epic",
    },
    description: {
      en: "November 2023",
      nl: "November 2023",
    },
    sortOrder: 70,
  },
  {
    imagePath: "/images/rdmlogo.png",
    category: "cycling",
    link: "https://www.rocdumaroc.com/",
    title: {
      en: "Roc Du Maroc",
      nl: "Roc Du Maroc",
    },
    description: {
      en: "October 2022",
      nl: "Oktober 2022",
    },
    sortOrder: 80,
  },
];
