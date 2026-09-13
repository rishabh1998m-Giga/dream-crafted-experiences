import { MaskLines, Reveal } from "./Primitives";
import { gallery } from "@/lib/gallery";

const pillars = [
  { k: "Restraint" },
  { k: "Craft" },
  { k: "Choreography" },
  { k: "Discretion" },
];

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="on-bone paper-texture relative overflow-hidden py-16 md:py-28"
    >
      <div className="mx-auto grid max-w-[1600px] gap-9 px-5 sm:gap-12 sm:px-6 md:px-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">Why Dream Corner</p>
          </Reveal>
          <h2 className="display mt-5 text-[2rem] leading-[1.06] sm:mt-6 sm:text-5xl lg:text-6xl">
            <MaskLines lines={["An evening", "should feel", "inevitable."]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md font-sans text-[13px] leading-6 text-muted-foreground sm:mt-8 sm:text-sm sm:leading-[1.9]">
              From intimate gatherings to grand celebrations, we design events that inspire,
              impress, and create lasting memories.
            </p>
          </Reveal>

          <dl className="mt-8 grid gap-x-12 gap-y-6 sm:mt-10 sm:grid-cols-2 sm:gap-y-8">
            {pillars.map((p, i) => (
              <Reveal key={p.k} delay={0.05 * i}>
                <div className="border-t border-border pt-5">
                  <dt className="display text-xl sm:text-2xl">{p.k}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="sticky top-28 overflow-hidden">
            <img
              src={gallery.enchantedForestNight}
              alt="Enchanted forest themed birthday installation by Dream Corner in Bangalore"
              className="aspect-[4/5] max-h-[520px] w-full object-cover md:h-[720px] md:max-h-none md:aspect-auto"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
