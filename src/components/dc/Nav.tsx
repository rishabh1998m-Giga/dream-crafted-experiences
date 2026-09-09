import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Primitives";
import logo from "@/assets/dc-logo.png.asset.json";

const links = [
  { label: "About", href: "#about" },
  { label: "Selected Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a href="#top" data-cursor="TOP" aria-label="Dream Corner" className="block">
      <img
        src={logo.url}
        alt="Dream Corner logo"
        className="block transition-all duration-700"
        style={{ width: compact ? 132 : 172, height: "auto" }}
      />
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
          "fixed inset-x-0 top-0 z-50 border-b border-bone/10 bg-ink transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]",
          scrolled && "shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
        )}
        style={{
          paddingTop: scrolled ? 14 : 18,
          paddingBottom: scrolled ? 14 : 18,
          transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between px-6 transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] md:px-10"
          style={{
            maxWidth: scrolled ? 1180 : 1400,
          }}
        >
          <Wordmark compact={scrolled} />

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <Magnetic key={l.href} strength={0.18}>
                <a
                  href={l.href}
                  data-cursor="true"
                  className="link-underline font-sans text-[10.5px] uppercase tracking-[0.26em] text-bone/85 transition-colors duration-300 hover:text-bone"
                >
                  {l.label}
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.16}>
              <a
                href="#contact"
                data-cursor="ENQUIRE"
                className="group relative inline-flex items-center overflow-hidden px-5 py-2.5 font-sans text-[10.5px] uppercase tracking-[0.26em] transition-all duration-500"
              >
                {/* background */}
                <span className="absolute inset-0 bg-bone/10 shadow-lg transition-all duration-500 group-hover:bg-bone/18 group-hover:shadow-[0_12px_40px_rgba(211,185,140,0.14)]" />
                {/* inner border */}
                <span className="absolute inset-[3px] border border-brass/35 transition-all duration-500 group-hover:border-brass/60" />
                {/* corner accents */}
                <span className="absolute left-0 top-0 h-2 w-2 -translate-x-1 -translate-y-1 border-l border-t border-brass transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
                <span className="absolute bottom-0 right-0 h-2 w-2 translate-x-1 translate-y-1 border-r border-b border-brass transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
                {/* text + arrow */}
                <span className="relative z-10 flex items-center gap-2 text-bone transition-colors duration-300 group-hover:text-brass">
                  Plan Your Event
                  <svg
                    className="h-3.5 w-3.5 transition-all duration-500 group-hover:translate-x-1"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {/* bottom highlight line */}
                <span className="absolute bottom-0 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent via-brass to-transparent transition-all duration-700 group-hover:w-full" />
              </a>
            </Magnetic>
          </nav>

          <button
            onClick={() => setOpen(true)}
            data-cursor="MENU"
            aria-label="Open menu"
            className="flex flex-col items-end gap-[6px] lg:hidden"
          >
            <span className="block h-px w-8 bg-bone" />
            <span className="block h-px w-5 bg-bone" />
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
                    className="display text-4xl leading-[1.1] text-ink sm:text-5xl"
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
