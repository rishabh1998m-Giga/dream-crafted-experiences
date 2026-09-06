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
      className="on-bone paper-texture relative overflow-hidden py-28 md:py-40"
    >
      <div className="mx-auto grid max-w-[1600px] gap-16 px-6 md:px-10 lg:grid-cols-[1fr_0.85fr] lg:gap-24">
        <div>
          <Reveal>
            <p className="eyebrow">Why Dream Corner</p>
          </Reveal>
          <h2 className="display mt-8 text-[9.5vw] leading-[0.9] md:text-[4.6vw]">
            <MaskLines lines={["An evening", "should feel", "inevitable."]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-md font-sans text-sm leading-[1.9] text-muted-foreground">
              From intimate gatherings to grand celebrations, we design events that inspire,
              impress, and create lasting memories.
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.k} delay={0.05 * i}>
                <div className="border-t border-border pt-5">
                  <dt className="display text-2xl">{p.k}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="sticky top-28 overflow-hidden">
            <img
              src={gallery.enchantedForestNight}
              alt="Candlelit tablescape styled by Dream Corner in Bangalore"
              className="h-[520px] w-full object-cover md:h-[720px]"
              loading="lazy"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
