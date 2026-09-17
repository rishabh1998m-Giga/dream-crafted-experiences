import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
const heroPoster = "/media/hero-birthday-poster.jpg";
const heroVideo = { url: "/media/hero-birthday.mp4" };
import { LineButton, MaskLines, TypeLine } from "./Primitives";

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
          alt="A premium Indian birthday celebration designed by Dream Corner"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="h-full w-full object-cover"
        />
        {showVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1600ms]"
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={(event) => {
              void event.currentTarget.play().catch(() => undefined);
            }}
            onPlaying={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            <source src="/media/hero-birthday.webm" type="video/webm" />
            <source src={heroVideo.url} type="video/mp4" />
          </video>
        )}
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.16_0.06_308/0.8),oklch(0.16_0.06_308/0.32)_45%,oklch(0.16_0.06_308/0.2)_70%,oklch(0.16_0.06_308/0.3))]" />

      <motion.div
        style={{ opacity: fade }}
        className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-5 pb-16 text-center sm:px-6 md:px-10"
      >
        <h1 className="display whitespace-nowrap text-[clamp(1.05rem,4.6vw,4rem)] leading-[1.12] text-bone">
          <MaskLines lines={["Dreams,"]} delay={0.15} immediate inline />
          <TypeLine
            text={" crafted into"}
            immediate
            startDelay={900}
            speed={62}
            holdMs={1100}
            lineClassName="italic"
            inline
          />
          <MaskLines lines={[" experiences."]} delay={2.05} immediate inline />
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-md font-sans text-[13px] leading-6 text-bone/80 sm:mt-7 sm:text-sm sm:leading-[1.8]"
        >
          Every great celebration begins with a vision. We turn your ideas into unforgettable
          experiences.
        </motion.p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-9 sm:gap-4">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <LineButton href="#work">Selected Work</LineButton>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <LineButton href="#contact">
              Plan Your Event
            </LineButton>
          </motion.div>
        </div>
      </motion.div>

    </section>
  );
}
