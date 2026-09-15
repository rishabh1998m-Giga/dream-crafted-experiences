import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/lib/site-data";
import { MaskLines } from "./Primitives";

const cardTreatments = [
  {
    shell: "w-[78vw] sm:w-[48vw] lg:w-[31vw] lg:self-start",
    media: "aspect-[4/5] lg:h-[56vh] lg:aspect-auto image-cut-arch",
  },
  {
    shell: "w-[86vw] sm:w-[58vw] lg:w-[40vw] lg:self-end lg:pb-4",
    media: "aspect-[5/4] lg:h-[48vh] lg:aspect-auto image-cut-slope",
  },
  {
    shell: "w-[72vw] sm:w-[44vw] lg:w-[28vw] lg:self-start lg:pt-8",
    media: "aspect-[3/4] lg:h-[52vh] lg:aspect-auto image-cut-notch",
  },
] as const;

function Card({ project, i }: { project: Project; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const treatment = cardTreatments[i % cardTreatments.length] ?? cardTreatments[0];
  return (
    <article
      ref={ref}
      data-cursor="VIEW"
      className={`group relative shrink-0 ${treatment.shell}`}
    >
      <div className={`image-frame relative overflow-hidden bg-ink-soft ${treatment.media}`}>
        <img
          src={project.image}
          alt={`${project.name} — ${project.category} in ${project.location}`}
          loading={i < 2 ? "eager" : "lazy"}
          width={1408}
          height={1760}
          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.045]"
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,oklch(0.17_0.075_310/0.75),transparent_50%)] opacity-70 transition-opacity duration-700 group-hover:opacity-40" />
        <span className="absolute left-5 top-5 font-sans text-[10px] uppercase tracking-[0.3em] text-bone/70">
          {project.index}
        </span>
        <span className="absolute bottom-5 left-5 font-sans text-[10px] uppercase tracking-[0.28em] text-brass">
          {project.category}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-t border-border pt-4 sm:mt-6 sm:gap-6 sm:pt-5">
        <div className="min-w-0">
          <h3 className="display text-2xl leading-[1.08] text-bone md:text-4xl">{project.name}</h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="font-sans text-[9px] uppercase tracking-[0.16em] text-bone/60 sm:text-[10px] sm:tracking-[0.26em]">
            {project.location}
          </p>
          <p className="mt-1.5 font-sans text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:mt-2 sm:text-[10px] sm:tracking-[0.26em]">
            {project.year}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Work() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => {
      setIsDesktop(mq.matches && !reduce);
      if (track.current) {
        setDistance(Math.max(0, track.current.scrollWidth - window.innerWidth + 40));
      }
    };
    update();
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [reduce]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const x = useTransform(smooth, [0, 1], [0, -distance]);
  const progress = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="work"
      ref={section}
      className="relative bg-ink"
      style={isDesktop ? { height: `${distance + window.innerHeight}px` } : undefined}
    >
      <div
        className={
          isDesktop
            ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden"
            : "flex flex-col justify-center overflow-hidden py-16"
        }
      >
        <div className="mx-auto mb-6 flex w-full max-w-[1600px] items-end justify-between px-5 sm:mb-8 sm:px-6 md:px-10">
          <div>
            <p className="eyebrow mb-5 sm:mb-6">02 — Selected work</p>
            <h2 className="display text-[2rem] leading-[1.06] text-bone sm:text-5xl lg:text-6xl">
              <MaskLines lines={["Celebrations"]} />
              <MaskLines lines={["worth remembering."]} lineClassName="italic" delay={0.1} />
            </h2>
          </div>
          <p className="hidden max-w-[15rem] font-sans text-[11px] uppercase leading-relaxed tracking-[0.22em] text-muted-foreground md:block">
            {isDesktop ? "Scroll to travel sideways" : "Swipe to explore"}
          </p>
        </div>

        {isDesktop ? (
          <motion.div ref={track} style={{ x }} className="flex items-center gap-10 pl-6 will-change-transform md:pl-10 lg:gap-16">
            {projects.map((p, i) => (
              <Card key={p.index} project={p} i={i} />
            ))}
            <div className="w-[10vw] shrink-0" />
          </motion.div>
        ) : (
          <div
            ref={track}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:gap-8 sm:px-6"
          >
            {projects.map((p, i) => (
              <div key={p.index} className="snap-center">
                <Card project={p} i={i} />
              </div>
            ))}
          </div>
        )}

        <div className="mx-auto mt-6 w-full max-w-[1600px] px-5 sm:mt-8 sm:px-6 md:px-10">
          <div className="h-px w-full bg-border">
            {isDesktop && <motion.div className="h-px bg-brass" style={{ width: progress }} />}
          </div>
        </div>
      </div>
    </section>
  );
}
