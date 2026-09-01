import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import heroPoster from "@/assets/hero-poster.jpg";
import heroVideo from "@/assets/hero.mp4.asset.json";
import { LineButton, MaskLines } from "./Primitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [showVideo, setShowVideo] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  useEffect(() => {
    if (reduce) return;
    // Defer the video until after first paint so the poster is the LCP.
    const t = window.setTimeout(() => setShowVideo(true), 600);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden bg-bone"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroPoster}
          alt="A candlelit luxury wedding reception designed by Dream Corner"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1600ms]"
            src={heroVideo.url}
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            onPlaying={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.96_0.012_85/0.88),oklch(0.96_0.012_85/0.25)_45%,oklch(0.96_0.012_85/0.45))]" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-20"
      >
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.2 }}
          className="eyebrow mb-8"
        >
          Bangalore
        </motion.p>

        <h1 className="display text-[13.5vw] leading-[0.86] text-ink sm:text-[11vw] lg:text-[8.6vw]">
          <MaskLines
            lines={["Dreams,", "crafted into", "experiences."]}
            delay={0.15}
            immediate
            lineClassName="[&:nth-child(2)]:italic"
          />
        </h1>

        <div className="mt-10 flex items-center gap-8 border-t border-ink/15 pt-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <LineButton href="#work">Selected Work</LineButton>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: fade }}
        className="pointer-events-none absolute bottom-8 right-6 z-10 hidden items-center gap-3 md:right-10 md:flex"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] text-ink/45">Scroll</span>
        <span className="block h-10 w-px overflow-hidden bg-ink/20">
          <motion.span
            className="block h-4 w-px bg-brass"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
