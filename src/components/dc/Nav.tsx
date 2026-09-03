import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Primitives";
import logo from "@/assets/dream-corner-logo.png.asset.json";

const links = [
  { label: "About", href: "#about" },
  { label: "Selected Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" data-cursor="TOP" className="flex items-center gap-3">
      <img
        src={logo.url}
        alt="Dream Corner logo"
        className="rounded-full transition-all duration-700"
        style={{ width: compact ? 34 : 46, height: compact ? 34 : 46 }}
      />
      <span
        className="display text-ink transition-all duration-700"
        style={{ fontSize: compact ? "1.15rem" : "1.5rem", letterSpacing: "0.02em" }}
      >
        Dream
      </span>
      <span className="h-[6px] w-[6px] translate-y-[-3px] rotate-45 bg-brass" />
      <span
        className="font-sans uppercase text-ink/80 transition-all duration-700"
        style={{
          fontSize: compact ? "0.6rem" : "0.68rem",
          letterSpacing: "0.4em",
        }}
      >
        Corner
      </span>
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // Reveal on scroll-up, tuck away on scroll-down past the hero fold.
      setHidden(y > 480 && y > lastY.current);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]",
          scrolled
            ? "border-b border-ink/8 bg-bone/95 backdrop-blur-md"
            : "border-b border-transparent bg-transparent backdrop-blur-none"
        )}
        style={{
          paddingTop: scrolled ? 12 : 20,
          paddingBottom: scrolled ? 12 : 20,
          transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between px-6 transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] md:px-10"
          style={{
            maxWidth: scrolled ? 1180 : 1600,
          }}
        >
          <Wordmark compact={scrolled} />

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <Magnetic key={l.href} strength={0.18}>
                <a
                  href={l.href}
                  data-cursor="true"
                  className="link-underline font-sans text-[10.5px] uppercase tracking-[0.26em] text-ink transition-colors duration-300 hover:text-ink/70"
                >
                  {l.label}
                </a>
              </Magnetic>
            ))}
            <a
              href="#contact"
              data-cursor="ENQUIRE"
              className="border border-brass bg-bone/25 px-5 py-2.5 font-sans text-[10.5px] uppercase tracking-[0.26em] text-brass transition-colors duration-500 hover:bg-brass hover:text-primary-foreground"
            >
              Plan Your Event
            </a>
          </nav>

          <button
            onClick={() => setOpen(true)}
            data-cursor="MENU"
            aria-label="Open menu"
            className="flex flex-col items-end gap-[6px] lg:hidden"
          >
            <span className="block h-px w-8 bg-ink" />
            <span className="block h-px w-5 bg-ink" />
          </button>
        </div>
      </header>

      {/* scroll progress hairline */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-brass"
        style={{ scaleX: progress }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[65] bg-bone paper-texture lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex h-full flex-col justify-between px-6 py-8">
              <div className="flex items-center justify-between">
                <Wordmark compact />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="font-sans text-[11px] uppercase tracking-[0.28em] text-brass"
                >
                  Close
                </button>
              </div>
              <nav className="flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="display text-[11vw] leading-[1.05] text-ink"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
              <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-ink/55">
                Bangalore · Est. 2020
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
