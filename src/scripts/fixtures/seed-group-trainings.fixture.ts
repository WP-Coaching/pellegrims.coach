const textNode = (text: string) => ({
  detail: 0,
  format: 0,
  mode: "normal",
  style: "",
  text,
  type: "text",
  version: 1,
});

const paragraphNode = (text: string) => ({
  children: [textNode(text)],
  direction: null,
  format: "",
  indent: 0,
  type: "paragraph",
  version: 1,
});

const listItemNode = (text: string) => ({
  children: [paragraphNode(text)],
  direction: null,
  format: "",
  indent: 0,
  type: "listitem",
  version: 1,
  value: 1,
});

const listNode = (items: string[]) => ({
  children: items.map(listItemNode),
  direction: null,
  format: "",
  indent: 0,
  listType: "bullet",
  start: 1,
  tag: "ul",
  type: "list",
  version: 1,
});

const quoteNode = (text: string) => ({
  children: [textNode(text)],
  direction: null,
  format: "",
  indent: 0,
  type: "quote",
  version: 1,
});

const buildFocusContent = (
  intro: string,
  bullets: string[],
  quote: string
): GroupTraining["focusContent"] => ({
  root: {
    children: [paragraphNode(intro), listNode(bullets), quoteNode(quote)],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
});

export const seedGroupTrainingsFixture = [
  {
    title: {
      en: "Friday Winter Training",
      nl: "Wintertraining Vrijdag",
    },
    subtitle: {
      en: "Perfect your freestyle for triathlon and swim faster and more efficiently.",
      nl: "Perfectioneer je crawltechniek voor triatlon en zwem sneller en efficiënter.",
    },
    slug: "winter-2025-2026-vrijdag-13u",
    status: "open",
    sortOrder: 10,
    level: "beginner",
    weekday: "friday",
    startTime: "13:00",
    endTime: "14:00",
    focusContent: {
      en: buildFocusContent(
        "Are you new to the triathlon world, or do you feel your swim technique could use a serious upgrade? Then this group is for you. We start from the basics and build your technique step by step. I place maximum focus on:",
        [
          "Efficient freestyle technique: the right body position in the water, minimizing drag and optimizing propulsion.",
          "Breathing: Learn to relax and breathe effectively, so you save energy for the rest of the race.",
          "Water feel: Gain more control and confidence in the water.",
        ],
        "In this group, speed is secondary to perfect execution. A strong technical base is the key to sustainable success."
      ),
      nl: buildFocusContent(
        "Ben je nieuw in de triatlonwereld of voel je dat je zwemtechniek een stevige upgrade kan gebruiken? Dan is deze groep voor jou. We starten vanaf de basis en bouwen je techniek stap voor stap op. Ik besteed maximale aandacht aan:",
        [
          "Efficiënte crawltechniek: De juiste ligging in het water, minimaliseren van remming en een optimaliseren van stuwing.",
          "Ademhaling: Leer ontspannen en effectief ademhalen, zodat energie spaart voor de rest van de race.",
          "Watergevoel: Krijg meer controle en vertrouwen in het water.",
        ],
        "In deze groep is snelheid ondergeschikt aan een perfecte uitvoering. Een sterke technische basis is de sleutel tot duurzaam succes."
      ),
    },
    coachName: "Ward Pellegrims",
    locationName: {
      en: "Topsportbad Wezenberg",
      nl: "Topsportbad Wezenberg",
    },
    locationAddress: {
      en: "Desguinlei 17-19, 2018 Antwerp",
      nl: "Desguinlei 17-19, 2018 Antwerpen",
    },
    locationMapUrl: "https://maps.app.goo.gl/LLJVUopK1vmeFsZWA",
    price: {
      en: "€315 (incl. VAT) for 15 sessions",
      nl: "€315 (incl. BTW) voor 15 sessies",
    },
    gear: {
      en: "Goggles, fins, hand paddles, pull buoy, snorkel",
      nl: "Zwembril, vinnen, handpaddles, pull buoy en zwemsnorkel",
    },
    sessionDates: [
      "2025-11-07T00:00:00.000Z",
      "2025-11-14T00:00:00.000Z",
      "2025-11-21T00:00:00.000Z",
      "2025-11-28T00:00:00.000Z",
      "2025-12-05T00:00:00.000Z",
      "2025-12-12T00:00:00.000Z",
      "2025-12-19T00:00:00.000Z",
      "2026-01-09T00:00:00.000Z",
      "2026-01-16T00:00:00.000Z",
      "2026-01-23T00:00:00.000Z",
      "2026-01-30T00:00:00.000Z",
      "2026-02-06T00:00:00.000Z",
      "2026-02-13T00:00:00.000Z",
      "2026-02-20T00:00:00.000Z",
      "2026-02-27T00:00:00.000Z",
    ],
    enrollmentStripeUrl: "https://book.stripe.com/fZu00jbxuctMepZf7g3F601",
  },
  {
    title: {
      en: "Friday Winter Training",
      nl: "Wintertraining Vrijdag",
    },
    subtitle: {
      en: "Perfect your freestyle for triathlon and swim faster and more efficiently.",
      nl: "Perfectioneer je crawltechniek voor triatlon en zwem sneller en efficiënter.",
    },
    slug: "winter-2025-2026-vrijdag-14u",
    status: "open",
    sortOrder: 20,
    level: "advanced",
    weekday: "friday",
    startTime: "14:00",
    endTime: "15:00",
    focusContent: {
      en: buildFocusContent(
        "Have you mastered the basic technique and want to take your performance to a higher level? Then join our advanced group. Here the focus is on:",
        [
          "Specific training sets: Intervaltraining and endurance sets to increase speed and stamina.",
          "Tempo and race simulation: Learn to distribute your effort correctly and train at race pace.",
          "Refinement of technique under pressure: Maintain your efficiency, even when fatigue kicks in.",
        ],
        "This group is ideal for athletes ready to break their personal records."
      ),
      nl: buildFocusContent(
        "Heb je de basistechniek onder de knie en wil je je prestaties naar een hoger niveau tillen? Sluit dan aan bij onze gevorderde groep. Hier ligt de focus op:",
        [
          "Specifieke trainingssets: Intervaltrainingen en duursets om je snelheid en uithoudingsvermogen te vergroten.",
          "Tempo en wedstrijdsimulatie: Leer je krachten correct te verdelen en train op wedstrijdsnelheid.",
          "Verfijning van de techniek onder druk: Behoud je efficiëntie, zelfs wanneer de vermoeidheid toeslaat.",
        ],
        "Deze groep is ideaal voor de atleet die klaar is om zijn persoonlijke records te breken."
      ),
    },
    coachName: "Ward Pellegrims",
    locationName: {
      en: "Topsportbad Wezenberg",
      nl: "Topsportbad Wezenberg",
    },
    locationAddress: {
      en: "Desguinlei 17-19, 2018 Antwerp",
      nl: "Desguinlei 17-19, 2018 Antwerpen",
    },
    locationMapUrl: "https://maps.app.goo.gl/LLJVUopK1vmeFsZWA",
    price: {
      en: "€315 (incl. VAT) for 15 sessions",
      nl: "€315 (incl. BTW) voor 15 sessies",
    },
    gear: {
      en: "Goggles, fins, hand paddles, pull buoy, snorkel",
      nl: "Zwembril, vinnen, handpaddles, pull buoy en zwemsnorkel",
    },
    sessionDates: [
      "2025-11-07T00:00:00.000Z",
      "2025-11-14T00:00:00.000Z",
      "2025-11-21T00:00:00.000Z",
      "2025-11-28T00:00:00.000Z",
      "2025-12-05T00:00:00.000Z",
      "2025-12-12T00:00:00.000Z",
      "2025-12-19T00:00:00.000Z",
      "2026-01-09T00:00:00.000Z",
      "2026-01-16T00:00:00.000Z",
      "2026-01-23T00:00:00.000Z",
      "2026-01-30T00:00:00.000Z",
      "2026-02-06T00:00:00.000Z",
      "2026-02-13T00:00:00.000Z",
      "2026-02-20T00:00:00.000Z",
      "2026-02-27T00:00:00.000Z",
    ],
    enrollmentStripeUrl: "https://book.stripe.com/fZuaEXbxufFY2Hh6AK3F600",
  },
  {
    title: {
      en: "Tuesday Winter Training",
      nl: "Wintertraining Dinsdag",
    },
    subtitle: {
      en: "Focus on speed and technique.",
      nl: "Focus op snelheid en techniek.",
    },
    slug: "winter-2026-dinsdag",
    status: "open",
    sortOrder: 30,
    level: "advanced",
    weekday: "tuesday",
    startTime: "13:45",
    endTime: "14:45",
    focusContent: {
      en: buildFocusContent(
        "Have you mastered the basic technique and want to take your performance to a higher level? Then join our advanced group. Here the focus is on:",
        [
          "Specific training sets: Intervaltraining and endurance sets to increase speed and stamina.",
          "Tempo and race simulation: Learn to distribute your effort correctly and train at race pace.",
          "Refinement of technique under pressure: Maintain your efficiency, even when fatigue kicks in.",
        ],
        "This group is ideal for athletes ready to break their personal records."
      ),
      nl: buildFocusContent(
        "Heb je de basistechniek onder de knie en wil je je prestaties naar een hoger niveau tillen? Sluit dan aan bij onze gevorderde groep. Hier ligt de focus op:",
        [
          "Specifieke trainingssets: Intervaltrainingen en duursets om je snelheid en uithoudingsvermogen te vergroten.",
          "Tempo en wedstrijdsimulatie: Leer je krachten correct te verdelen en train op wedstrijdsnelheid.",
          "Verfijning van de techniek onder druk: Behoud je efficiëntie, zelfs wanneer de vermoeidheid toeslaat.",
        ],
        "Deze groep is ideaal voor de atleet die klaar is om zijn persoonlijke records te breken."
      ),
    },
    coachName: "Ward Pellegrims",
    locationName: {
      en: "Topsportbad Wezenberg",
      nl: "Topsportbad Wezenberg",
    },
    locationAddress: {
      en: "Desguinlei 17-19, 2018 Antwerp",
      nl: "Desguinlei 17-19, 2018 Antwerpen",
    },
    locationMapUrl: "https://maps.app.goo.gl/LLJVUopK1vmeFsZWA",
    price: {
      en: "€200 (incl. VAT) for 9 sessions, including entrance",
      nl: "€200 (incl. BTW) voor 9 sessies, inclusief toegang tot het zwembad",
    },
    gear: {
      en: "Goggles, fins, paddles, pull buoy and snorkel",
      nl: "Zwembril, vinnen, paddles, pull buoy en snorkel",
    },
    sessionDates: [
      "2026-01-13T00:00:00.000Z",
      "2026-01-20T00:00:00.000Z",
      "2026-01-27T00:00:00.000Z",
      "2026-02-03T00:00:00.000Z",
      "2026-02-10T00:00:00.000Z",
      "2026-02-17T00:00:00.000Z",
      "2026-02-24T00:00:00.000Z",
      "2026-03-03T00:00:00.000Z",
      "2026-03-10T00:00:00.000Z",
    ],
    enrollmentStripeUrl: "https://buy.stripe.com/00weVd7hefFYchR1gq3F604",
  },
] as const;
import type { GroupTraining } from "@/payload-types";
