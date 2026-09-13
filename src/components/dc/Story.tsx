import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { gallery } from "@/lib/gallery";
import { MaskLines, Reveal } from "./Primitives";

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["-6%", "8%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <section id="about" className="paper-texture relative overflow-hidden bg-ink py-16 md:py-28">
      <div ref={ref} className="mx-auto max-w-[1600px] px-5 sm:px-6 md:px-10">
        <div className="grid gap-9 sm:gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-5 sm:mb-7">01 — Who we are</p>
            </Reveal>
            <h2 className="display text-[2rem] leading-[1.06] text-bone sm:text-5xl lg:text-6xl">
              <MaskLines lines={["Creating", "infinite"]} />
              <MaskLines lines={["memories."]} lineClassName="italic text-brass" delay={0.12} />
            </h2>

            <Reveal delay={0.08}>
              <p className="mt-6 max-w-md font-sans text-[13px] leading-6 text-muted-foreground sm:mt-8 sm:text-sm sm:leading-[1.9]">
                From weddings to corporate events, birthdays to grand launches. We create moments
                that leave lasting memories.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.2em] text-brass sm:mt-6 sm:text-[11px] sm:tracking-[0.26em]">
                Your dream event starts here.
              </p>
            </Reveal>

            <div className="mt-10 hidden lg:block">
              <motion.div style={{ y: yA }} className="relative w-[78%]">
                <img
                  src={gallery.fantasyForest}
                  alt="Fantasy themed birthday installation with glowing arches and florals"
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="h-[46vh] w-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div style={{ y: yB }} className="relative">
              <img
                src={gallery.princessCastle}
                alt="Pink princess castle themed birthday stage at dusk"
                loading="lazy"
                width={1200}
                height={1600}
                className="h-[58vh] min-h-[400px] max-h-[560px] w-full object-cover lg:h-[86vh] lg:max-h-none"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.17_0.075_310/0.5),transparent_55%)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
