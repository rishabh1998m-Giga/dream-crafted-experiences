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
    <section id="about" className="paper-texture relative overflow-hidden bg-ink py-28 md:py-40">
      {/* marquee statement */}
      <div className="relative mb-24 overflow-hidden border-y border-border py-5 md:mb-36">
        <div className="animate-marquee flex w-max whitespace-nowrap will-change-transform">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex">
              {["Creating infinite memories"].map(
                (t) => (
                  <span
                    key={t + k}
                    className="mx-8 font-sans text-[11px] uppercase tracking-[0.42em] text-muted-foreground"
                  >
                    {t} <span className="ml-8 text-brass">◆</span>
                  </span>
                ),
              )}
            </span>
          ))}
        </div>
      </div>

      <div ref={ref} className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-10">01 — Who we are</p>
            </Reveal>
            <h2 className="display text-4xl leading-[1.02] text-bone sm:text-5xl lg:text-6xl">
              <MaskLines lines={["Creating", "infinite"]} />
              <MaskLines lines={["memories."]} lineClassName="italic text-brass" delay={0.12} />
            </h2>

            <Reveal delay={0.08}>
              <p className="mt-12 max-w-md font-sans text-sm leading-[1.9] text-muted-foreground">
                From weddings to corporate events, birthdays to grand launches. We create moments
                that leave lasting memories.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-6 font-sans text-[11px] uppercase tracking-[0.26em] text-brass">
                Your dream event starts here.
              </p>
            </Reveal>

            <div className="mt-16 hidden lg:block">
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
                className="h-[70vh] w-full object-cover lg:h-[86vh]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.17_0.075_310/0.5),transparent_55%)]" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
