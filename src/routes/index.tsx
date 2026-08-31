import { createFileRoute } from "@tanstack/react-router";

import { Cursor } from "@/components/dc/Cursor";
import { Grain } from "@/components/dc/Primitives";
import { Nav } from "@/components/dc/Nav";
import { Hero } from "@/components/dc/Hero";
import { Story } from "@/components/dc/Story";
import { Work } from "@/components/dc/Work";
import { Services } from "@/components/dc/Services";
import { Philosophy } from "@/components/dc/Philosophy";
import { Proof } from "@/components/dc/Proof";
import { Feed } from "@/components/dc/Feed";
import { Contact } from "@/components/dc/Contact";

const title = "Dream Corner — Luxury Event Planning in Bangalore";
const description =
  "Dream Corner designs and produces weddings, destination celebrations and brand evenings across Bangalore and India. A limited number of commissions each season.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Cursor />
      <Grain />
      <Nav />
      <main>
        <Hero />
        <Story />
        <Work />
        <Services />
        <Philosophy />
        <Proof />
        <Feed />
        <Contact />
      </main>
    </>
  );
}
