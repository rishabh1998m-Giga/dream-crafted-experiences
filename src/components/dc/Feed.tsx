import { Reveal } from "./Primitives";
import { gallery } from "@/lib/gallery";

const posts = [
  { src: gallery.peppaPlayland, alt: "Peppa themed children's party stage with balloons and cake table" },
  { src: gallery.winterCarnival, alt: "Winter carnival birthday setup with marquee letters and ferris wheel" },
  { src: gallery.bossBaby, alt: "Boss Baby themed first birthday decor in blue and black" },
  { src: gallery.jungleCarnival, alt: "Jungle themed birthday stage with animal props and balloon arch" },
  { src: gallery.bearlyWait, alt: "Teddy bear baby shower backdrop with pastel balloons" },
  { src: gallery.fiftyFabulous, alt: "Pink and floral fiftieth birthday backdrop" },
];

export function Feed() {
  return (
    <section className="relative overflow-hidden bg-ink pb-28 md:pb-36">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-6 border-t border-border pt-10">
          <h2 className="display text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">From the studio</h2>
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
