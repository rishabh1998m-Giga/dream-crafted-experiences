import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";
import work5 from "@/assets/work-5.jpg";
import work6 from "@/assets/work-6.jpg";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import grid1 from "@/assets/grid-1.jpg";
import grid2 from "@/assets/grid-2.jpg";

export const images = { work1, work2, work3, work4, work5, work6, story1, story2, grid1, grid2 };

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
    name: "The Marigold Hour",
    category: "Luxury Wedding",
    location: "Bangalore, IN",
    year: "2025",
    description:
      "A thousand hand-set candles, a floral canopy grown over three days, and a ceremony timed to the last minute of dusk.",
    image: work1,
  },
  {
    index: "02",
    name: "Luminora Summit",
    category: "Corporate Experience",
    location: "Whitefield, Bangalore",
    year: "2025",
    description:
      "A 2,000-guest annual summit staged as theatre — sculptural lighting, a single sweeping arc, zero visible technology.",
    image: work2,
  },
  {
    index: "03",
    name: "Salt & Gold",
    category: "Destination Wedding",
    location: "Goa, IN",
    year: "2024",
    description:
      "Three days on the coast. One long table at the water's edge, lanterns overhead, dinner served as the sun dropped.",
    image: work3,
  },
  {
    index: "04",
    name: "Aurelian Launch",
    category: "Brand Experience",
    location: "Indiranagar, Bangalore",
    year: "2024",
    description:
      "A fragrance house debut built around silence, stone and a single beam of light. Ninety guests, no stage, no speeches.",
    image: work4,
  },
  {
    index: "05",
    name: "Courtyard No. 9",
    category: "Social Celebration",
    location: "Mysuru, IN",
    year: "2024",
    description:
      "A heritage courtyard, candlelight only, and a suspended garden that turned a birthday dinner into an heirloom.",
    image: work5,
  },
  {
    index: "06",
    name: "Field of Lights",
    category: "Large-Scale Event",
    location: "Nandi Hills, Bangalore",
    year: "2023",
    description:
      "Eighteen thousand people, one horizon of light. Built in eleven days, struck in one night, remembered for years.",
    image: work6,
  },
];

export type Service = {
  title: string;
  line: string;
  image: string;
};

export const services: Service[] = [
  {
    title: "Weddings",
    line: "Ceremony, ritual and celebration, designed end to end.",
    image: work1,
  },
  {
    title: "Corporate Events",
    line: "Summits, galas and launches with the polish of a premiere.",
    image: work2,
  },
  {
    title: "Destination Events",
    line: "Coast, palace or hillside — logistics made invisible.",
    image: work3,
  },
  {
    title: "Brand Experiences",
    line: "Physical storytelling for houses with something to say.",
    image: work4,
  },
  {
    title: "Social Celebrations",
    line: "Intimate dinners, milestones and private evenings.",
    image: work5,
  },
  {
    title: "Production & Design",
    line: "Sets, light, sound and flowers, built by our own crew.",
    image: work6,
  },
];

export const socialGrid = [
  { src: story2, alt: "Bride silhouetted against a glowing reception entrance", span: "tall" },
  { src: grid1, alt: "Couple dancing beneath a canopy of warm lights", span: "small" },
  { src: work3, alt: "Coastal dinner table at golden hour", span: "wide" },
  { src: grid2, alt: "Brass candle installation detail", span: "small" },
  { src: story1, alt: "Hands finishing a floral place setting", span: "small" },
  { src: work2, alt: "Sculptural stage lighting at a corporate gala", span: "wide" },
] as const;
