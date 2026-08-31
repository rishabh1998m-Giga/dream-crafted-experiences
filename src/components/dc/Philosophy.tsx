import { MaskLines, Reveal } from "./Primitives";
import story2 from "@/assets/story-2.jpg";

const pillars = [
  {
    k: "Restraint",
    v: "We remove until only the essential remains. Luxury is what you don't notice being handled.",
  },
  {
    k: "Craft",
    v: "Fabrication, florals and lighting made for you — never rented catalogue décor.",
  },
  {
    k: "Choreography",
    v: "A minute-by-minute score so the evening moves like music, not like a schedule.",
  },
  {
    k: "Discretion",
    v: "Quiet crews, invisible logistics, and absolute privacy for every guest list we hold.",
  },
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
          <h2 className="display mt-8 text-[12vw] leading-[0.9] md:text-[6vw]">
            <MaskLines lines={["An evening", "should feel", "inevitable."]} />
          </h2>
          <Reveal delay={0.15}>
            <p className="mt-10 max-w-xl font-sans text-[15px] leading-[1.9] text-muted-foreground">
              Since 2013 we have produced celebrations across South India and beyond from a small
              studio in Bangalore. We take a limited number of events each year — not as a
              marketing posture, but because the work demands it. What our clients remember is
              rarely a single centrepiece. It is the sense that the night arranged itself.
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.k} delay={0.05 * i}>
                <div className="border-t border-border pt-5">
                  <dt className="display text-2xl">{p.k}</dt>
                  <dd className="mt-3 font-sans text-[13px] leading-relaxed text-muted-foreground">
                    {p.v}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.1} className="relative">
          <div className="sticky top-28 overflow-hidden">
            <img
              src={story2}
              alt="Candlelit tablescape styled by Dream Corner in Bangalore"
              className="h-[520px] w-full object-cover md:h-[720px]"
              loading="lazy"
            />
            <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Atelier — Indiranagar, Bangalore
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
