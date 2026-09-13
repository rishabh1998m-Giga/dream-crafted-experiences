import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import heroPoster from "@/assets/hero-poster.jpg";
const heroVideo = { url: "/media/hero-indian.mp4" };
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
      className="relative h-[100svh] w-full overflow-hidden bg-ink"
    >
      <motion.div className="absolute inset-0" style={{ y, scale }}>
        <img
          src={heroPoster}
          alt="Indian guests celebrating at a premium event designed by Dream Corner"
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

      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.16_0.06_308/0.92),oklch(0.16_0.06_308/0.35)_55%,oklch(0.16_0.06_308/0.55))]" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-5 pb-8 sm:px-6 sm:pb-10 md:px-10 md:pb-14"
      >
        <h1 className="display text-[2rem] leading-[1.06] text-bone sm:text-5xl lg:text-6xl">
          <MaskLines
            lines={["Dreams,", "crafted into", "experiences."]}
            delay={0.15}
            immediate
            lineClassName="[&:nth-child(2)]:italic"
          />
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-[21rem] font-sans text-[13px] leading-6 text-bone/80 sm:mt-8 sm:max-w-md sm:text-sm sm:leading-[1.8]"
        >
          Every great celebration begins with a vision. We turn your ideas into unforgettable
          experiences.
        </motion.p>

        <div className="mt-6 flex items-center gap-6 sm:mt-10 sm:gap-8">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <LineButton href="#work">Selected Work</LineButton>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
