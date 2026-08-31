import { Reveal } from "./Primitives";
import grid1 from "@/assets/grid-1.jpg";
import grid2 from "@/assets/grid-2.jpg";
import work2 from "@/assets/work-2.jpg";
import work4 from "@/assets/work-4.jpg";
import work6 from "@/assets/work-6.jpg";
import story1 from "@/assets/story-1.jpg";

const posts = [
  { src: grid1, alt: "Brass candelabra and ivory florals on a long banquet table" },
  { src: work2, alt: "Guests dancing beneath suspended floral installation" },
  { src: grid2, alt: "Detail of hand-calligraphed place setting" },
  { src: work4, alt: "Palace courtyard lit for an evening reception" },
  { src: story1, alt: "Bride's entrance through a corridor of lanterns" },
  { src: work6, alt: "Late-night dessert table in candlelight" },
];

export function Feed() {
  return (
    <section className="relative overflow-hidden bg-ink pb-28 md:pb-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-10">
          <h2 className="display text-4xl md:text-6xl">From the studio</h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            data-cursor="FOLLOW"
            className="link-underline font-sans text-[11px] uppercase tracking-[0.28em] text-brass"
          >
            @dreamcorner.events
          </a>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {posts.map((p, i) => (
            <Reveal key={p.alt} delay={(i % 3) * 0.06} y={20}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN"
                className="group relative block aspect-square overflow-hidden"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
                />
                <span className="absolute inset-0 bg-ink/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
