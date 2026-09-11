import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Primitives";
import logo from "@/assets/dream-corner-round.png";

const links = [
  { label: "About", href: "#about" },
  { label: "Selected Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Contact", href: "#contact" },
];

function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href="#top"
      data-cursor="TOP"
      aria-label="Dream Corner"
      className={cn(
        "block aspect-square overflow-hidden rounded-full border border-brass/60 bg-ink shadow-[0_10px_32px_rgba(0,0,0,0.3)] transition-all duration-700",
        compact ? "w-[72px]" : "w-[90px] md:w-[98px]"
      )}
    >
      <img
        src={logo}
        alt="Dream Corner logo"
        className="h-full w-full object-cover"
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
          "fixed inset-x-0 top-0 z-50 transition-all duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)]"
        )}
        style={{
          paddingTop: scrolled ? 8 : 14,
          transform: hidden && !open ? "translateY(-100%)" : "translateY(0)",
        }}
      >
        <div
          className={cn(
            "group/nav mx-4 flex items-center justify-between rounded-full border border-bone/20 bg-ink/12 px-4 py-2 shadow-[0_16px_48px_rgba(0,0,0,0.18)] backdrop-blur-xl transition-all duration-[700ms] ease-[cubic-bezier(.16,1,.3,1)] hover:border-bone/30 hover:bg-ink/20 md:mx-auto md:px-5",
            scrolled && "border-bone/15 bg-ink/55 shadow-[0_12px_36px_rgba(0,0,0,0.24)]"
          )}
          style={{
            maxWidth: scrolled ? 1160 : 1320,
          }}
        >
          <Wordmark compact={scrolled} />

          <nav className="hidden items-center gap-2 lg:flex">
            {links.map((l) => (
              <Magnetic key={l.href} strength={0.18}>
                <a
                  href={l.href}
                  data-cursor="true"
                  className="group/link relative flex items-center gap-2 rounded-full px-4 py-3 font-sans text-[10px] uppercase tracking-[0.22em] text-bone/80 transition-all duration-500 hover:bg-bone/10 hover:text-bone"
                >
                  <span className="h-1 w-1 scale-0 rounded-full bg-brass opacity-0 transition-all duration-500 group-hover/link:scale-100 group-hover/link:opacity-100" />
                  {l.label}
                  <span className="absolute bottom-2 left-4 right-4 h-px origin-right scale-x-0 bg-brass/80 transition-transform duration-500 group-hover/link:origin-left group-hover/link:scale-x-100" />
                </a>
              </Magnetic>
            ))}
            <Magnetic strength={0.16}>
              <a
                href="#contact"
                data-cursor="ENQUIRE"
                className="group relative inline-flex items-center overflow-hidden rounded-full border border-bone/30 bg-bone px-6 py-3 font-sans text-[10px] uppercase tracking-[0.22em] shadow-[0_8px_28px_rgba(0,0,0,0.18)] transition-all duration-500 hover:scale-[1.04] hover:border-brass hover:shadow-[0_10px_34px_rgba(211,185,140,0.2)]"
              >
                <span className="absolute inset-0 translate-y-full bg-brass transition-transform duration-500 group-hover:translate-y-0" />
                <span className="relative z-10 flex items-center gap-2 text-ink">
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
            className="fixed inset-0 z-[65] flex flex-col bg-ink lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 py-5">
              <Wordmark compact />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="font-sans text-[11px] uppercase tracking-[0.28em] text-brass"
              >
                Close
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-3 px-6 pb-12">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.06, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="display text-4xl leading-[1.1] text-bone sm:text-5xl"
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
