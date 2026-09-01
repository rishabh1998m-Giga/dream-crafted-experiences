import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MaskLines, Reveal } from "./Primitives";
import work1 from "@/assets/work-1.jpg";
import work3 from "@/assets/work-3.jpg";
import work5 from "@/assets/work-5.jpg";
import story1 from "@/assets/story-1.jpg";
import grid1 from "@/assets/grid-1.jpg";

const services = [
  {
    n: "01",
    title: "Weddings",
    image: work1,
  },
  {
    n: "02",
    title: "Destination Affairs",
    image: work3,
  },
  {
    n: "03",
    title: "Brand & Corporate",
    image: work5,
  },
  {
    n: "04",
    title: "Intimate Gatherings",
    image: story1,
  },
  {
    n: "05",
    title: "Design & Styling",
    image: grid1,
  },
];

export function Services() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="services" className="relative overflow-hidden bg-ink py-28 md:py-40">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="display text-[10vw] leading-[0.88] md:text-[5.4vw]">
            <MaskLines lines={["What we", "compose"]} />
          </h2>
          <Reveal delay={0.1}>
            <p className="eyebrow">Services</p>
          </Reveal>
        </div>

        <div
          className="relative mt-16 md:mt-24"
          onMouseLeave={() => setActive(null)}
        >
          {/* floating hover preview (desktop) */}
          <AnimatePresence>
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="pointer-events-none absolute right-4 top-1/2 z-20 hidden h-[340px] w-[260px] -translate-y-1/2 overflow-hidden lg:block"
              >
                <img
                  src={services[active]?.image}
                  alt={services[active]?.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <ul>
            {services.map((s, i) => (
              <li key={s.title}>
                <Reveal y={18} delay={i * 0.04}>
                  <div
                    data-cursor="VIEW"
                    onMouseEnter={() => setActive(i)}
                    className="group relative flex cursor-default items-baseline gap-6 border-t border-border py-7 transition-colors duration-500 md:gap-12 md:py-9"
                  >
                    <span
                      className="absolute inset-0 -z-0 origin-left scale-x-0 bg-brass/8 transition-transform duration-[800ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-x-100"
                      aria-hidden
                    />
                    <span className="relative font-sans text-[10px] tracking-[0.3em] text-brass">
                      {s.n}
                    </span>
                    <h3 className="display relative flex-1 text-4xl transition-transform duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3 md:text-6xl">
                      {s.title}
                    </h3>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
          <div className="border-t border-border" />
        </div>
      </div>
    </section>
  );
}
