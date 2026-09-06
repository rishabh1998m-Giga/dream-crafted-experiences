import { gallery } from "./gallery";

export const images = gallery;

export type Project = {
  index: string;
  name: string;
  category: string;
  location: string;
  year: string;
  description: string;
  image: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Kiana's Fairy Garden",
    category: "Themed Birthday",
    location: "Bangalore, IN",
    year: "2025",
    description: "A blush arch garden of roses, butterflies and pastel light.",
    image: gallery.fairyGardenPink,
  },
  {
    index: "02",
    name: "Sacred Vows",
    category: "Wedding Event",
    location: "Bangalore, IN",
    year: "2025",
    description: "Marigold drapes, a silver jhoola and a hand-painted mandap backdrop.",
    image: gallery.traditionalMandap,
  },
  {
    index: "03",
    name: "Zaara's Enchanted Forest",
    category: "Themed Birthday",
    location: "Bangalore, IN",
    year: "2025",
    description: "A glowing fairy door, neon butterflies and a garden built overnight.",
    image: gallery.enchantedForestNight,
  },
  {
    index: "04",
    name: "Fifty & Golden",
    category: "Milestone Celebration",
    location: "Bangalore, IN",
    year: "2024",
    description: "Ivory arches, pampas and marquee letters on an open lawn.",
    image: gallery.goldenFifty,
  },
  {
    index: "05",
    name: "Dravin's Royal Court",
    category: "Themed Birthday",
    location: "Bangalore, IN",
    year: "2024",
    description: "Gold-tipped castle towers, a carriage and a crowned first birthday.",
    image: gallery.royalCastleGold,
  },
  {
    index: "06",
    name: "Level 12 — Game On",
    category: "Teen Celebration",
    location: "Bangalore, IN",
    year: "2024",
    description: "Neon controllers, cobalt chrome balloons and an arcade-lit stage.",
    image: gallery.gamingArena,
  },
];

export type Service = {
  title: string;
  line: string;
  image: string;
};

export const services: Service[] = [
  {
    title: "Themed Birthdays",
    line: "Fairy gardens, safaris and castles, built to scale.",
    image: gallery.fairyPurple,
  },
  {
    title: "Traditional Events",
    line: "Poojas, naming ceremonies and festive rituals.",
    image: gallery.poojaTraditional,
  },
  {
    title: "Wedding Events",
    line: "Ceremony, ritual and celebration, designed end to end.",
    image: gallery.traditionalMandap,
  },
  {
    title: "Corporate Events",
    line: "Launches, galas and milestones with polish.",
    image: gallery.goldMilestone59,
  },
];

export const socialGrid = [
  { src: gallery.peppaPlayland, alt: "Peppa themed children's party stage", span: "tall" },
  { src: gallery.winterCarnival, alt: "Winter carnival birthday setup with marquee letters", span: "small" },
  { src: gallery.safariWildOne, alt: "Safari themed first birthday garden setup", span: "wide" },
  { src: gallery.bossBaby, alt: "Boss Baby themed first birthday decor", span: "small" },
  { src: gallery.teddyPicnic, alt: "Teddy bear themed birthday stage in orange and cream", span: "small" },
  { src: gallery.travelBabyshower, alt: "Travel themed baby shower stage", span: "wide" },
] as const;
