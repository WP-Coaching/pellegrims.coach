import {
  XIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/icons";

export const ATHLETE_COUNTS = {
  CLIENTS: 100,
  MIN_TRAINING_CAMP_SIZE: 6,
} as const;

export const socialLinks = [
  { href: "https://x.com/WardPel", icon: XIcon, platform: "X" },
  {
    href: "https://www.facebook.com/ward.pellegrims/",
    icon: FacebookIcon,
    platform: "Facebook",
  },
  {
    href: "https://www.instagram.com/wardpel/",
    icon: InstagramIcon,
    platform: "Instagram",
  },
  {
    href: "https://www.linkedin.com/in/pellegrimsward/",
    icon: LinkedinIcon,
    platform: "LinkedIn",
  },
] as const;

export type SocialLink = (typeof socialLinks)[number];
