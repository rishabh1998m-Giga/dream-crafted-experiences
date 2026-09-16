import { motion, useReducedMotion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Grain() {
  return <div aria-hidden className="grain-layer" />;
}

/** Scroll-triggered reveal: fade + rise, honouring reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Line-by-line masked text reveal for editorial headlines. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  immediate = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const show = immediate || inView || reduce;
  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={line + i} className="block overflow-hidden">
          <motion.span
            className={cn("block", lineClassName)}
            initial={reduce ? false : { y: "110%" }}
            animate={show ? { y: "0%" } : { y: "110%" }}
            transition={{ duration: 1.15, delay: delay + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/** Character-by-character typewriter reveal with a blinking caret. */
export function TypeLine({
  text,
  startDelay = 0,
  speed = 55,
  holdMs = 900,
  immediate = false,
  className,
  lineClassName,
  caretClassName,
}: {
  text: string;
  startDelay?: number;
  speed?: number;
  /** How long the caret keeps blinking after the text completes. */
  holdMs?: number;
  immediate?: boolean;
  className?: string;
  lineClassName?: string;
  caretClassName?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const show = immediate || inView || reduce;
  const [count, setCount] = useState(0);
  const [caretOn, setCaretOn] = useState(!reduce);

  useEffect(() => {
    if (!show) return;
    if (reduce) {
      setCount(text.length);
      setCaretOn(false);
      return;
    }
    let raf = 0;
    let hold = 0;
    const startAt = performance.now() + startDelay;
    const tick = (now: number) => {
      const n = Math.min(text.length, Math.max(0, Math.floor((now - startAt) / speed)));
      setCount(n);
      if (n < text.length) {
        raf = requestAnimationFrame(tick);
      } else {
        hold = window.setTimeout(() => setCaretOn(false), holdMs);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(hold);
    };
  }, [show, reduce, text, startDelay, speed, holdMs]);

  return (
    <span ref={ref} aria-label={text} className={cn("block", className)}>
      <span className="relative block">
        {/* Invisible full text reserves the line's final size — no layout shift while typing. */}
        <span aria-hidden className="invisible block">
          {text}
        </span>
        <span aria-hidden className={cn("absolute inset-0 block", lineClassName)}>
          <span className="whitespace-pre-wrap">{text.slice(0, count)}</span>
          {caretOn && (
            <span
              className={cn(
                "animate-caret-blink ml-[0.12em] inline-block h-[0.82em] w-[3px] translate-y-[0.06em] rounded-full bg-brass",
                caretClassName,
              )}
            />
          )}
        </span>
      </span>
    </span>
  );
}

/** Magnetic wrapper — element drifts subtly toward the pointer. */
export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const reset = () => {
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength, reduce]);

  return (
    <span
      ref={ref}
      className={cn("inline-block will-change-transform", className)}
      style={{ transition: "transform .6s cubic-bezier(.16,1,.3,1)" }}
    >
      {children}
    </span>
  );
}

/** Editorial line-button. */
export function LineButton({
  children,
  href,
  onClick,
  tone = "brass",
  type,
  className,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  tone?: "brass" | "bone";
  type?: "submit" | "button";
  className?: string;
}) {
  const inner = (
    <span
      className={cn(
        "group relative inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-full border px-6 py-3 font-sans text-[13px] font-semibold transition-all duration-500 sm:min-h-[54px] sm:gap-4 sm:px-8 sm:py-4 sm:text-sm",
        tone === "brass"
          ? "border-bone bg-bone text-ink shadow-[0_10px_30px_rgba(0,0,0,0.18)] hover:border-brass hover:bg-brass hover:text-primary-foreground hover:shadow-[0_14px_38px_rgba(0,0,0,0.24)]"
          : "border-ink bg-ink text-bone shadow-[0_10px_30px_rgba(0,0,0,0.14)] hover:border-brass hover:bg-brass hover:text-ink",
        className,
      )}
    >
      <span className="relative z-10">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </span>
  );

  if (href) {
    return (
      <Magnetic>
        <a href={href} data-cursor="true" className="inline-block">
          {inner}
        </a>
      </Magnetic>
    );
  }
  return (
    <Magnetic>
      <button type={type ?? "button"} onClick={onClick} data-cursor="true">
        {inner}
      </button>
    </Magnetic>
  );
}

/** Count-up number that animates once in view. */
export function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1800;
        const tick = (now: number) => {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 4);
          setValue(Math.round(to * eased));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, reduce]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
