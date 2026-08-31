import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
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
              {["Creating infinite memories", "Design", "Production", "Emotion", "Precision"].map(
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
            <h2 className="display text-[12vw] leading-[0.9] text-bone sm:text-[8vw] lg:text-[5.6vw]">
              <MaskLines lines={["Creating", "infinite"]} />
              <MaskLines lines={["memories."]} lineClassName="italic text-brass" delay={0.12} />
            </h2>

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <p className="max-w-sm font-sans text-sm leading-[1.9] text-muted-foreground">
                  We began in Bangalore in 2020 with a single conviction: an event is not a
                  schedule, it is a feeling that outlives the night. Everything we build serves
                  that.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="max-w-sm font-sans text-sm leading-[1.9] text-muted-foreground">
                  From intimate weddings to large-scale productions, we hold creative direction,
                  planning, design and execution under one roof — so nothing is lost in translation.
                </p>
              </Reveal>
            </div>

            <div className="mt-16 hidden lg:block">
              <motion.div style={{ y: yA }} className="relative w-[78%]">
                <img
                  src={story1}
                  alt="Hands finishing a floral place setting by candlelight"
                  loading="lazy"
                  width={1200}
                  height={1504}
                  className="h-[46vh] w-full object-cover"
                />
                <span className="mt-4 block font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Detail · Table design
                </span>
              </motion.div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <motion.div style={{ y: yB }} className="relative">
              <img
                src={story2}
                alt="Bride silhouetted against a glowing reception entrance"
                loading="lazy"
                width={1200}
                height={1600}
                className="h-[70vh] w-full object-cover lg:h-[86vh]"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.16_0.011_62/0.5),transparent_55%)]" />
            </motion.div>
            <Reveal className="mt-8">
              <p className="display text-2xl leading-snug text-bone/90 md:text-3xl">
                “We don't hand you a plan. We hand you the evening you imagined — only sharper.”
              </p>
              <p className="mt-5 font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Dream Corner · Studio note
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
