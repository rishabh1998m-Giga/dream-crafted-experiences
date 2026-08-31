import { useEffect, useRef, useState } from "react";

/**
 * Luxury cursor: a small ring with slight trailing motion that expands and
 * can show contextual text on elements carrying data-cursor="LABEL".
 * Disabled on touch devices and when reduced motion is requested.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
    document.body.classList.add("dc-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);
      const el = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor],a,button,input,textarea,select,label",
      ) as HTMLElement | null;
      if (el) {
        setActive(true);
        setLabel(el.dataset?.['cursor'] && el.dataset['cursor'] !== "true" ? el.dataset['cursor']! : "");
      } else {
        setActive(false);
        setLabel("");
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", move, { passive: true });
    document.addEventListener("mouseleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", move);
      document.removeEventListener("mouseleave", leave);
      document.body.classList.remove("dc-cursor");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      <div
        ref={dot}
        className="absolute left-0 top-0 -ml-[2px] -mt-[2px] h-1 w-1 rounded-full bg-brass"
        style={{ opacity: active ? 0 : 1, transition: "opacity 250ms ease" }}
      />
      <div
        ref={ring}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-brass/70 backdrop-invert-[0.03]"
        style={{
          width: active ? (label ? 84 : 46) : 26,
          height: active ? (label ? 84 : 46) : 26,
          marginLeft: active ? (label ? -42 : -23) : -13,
          marginTop: active ? (label ? -42 : -23) : -13,
          backgroundColor: label ? "oklch(0.782 0.104 79 / 0.14)" : "transparent",
          transition: "width .45s cubic-bezier(.16,1,.3,1), height .45s cubic-bezier(.16,1,.3,1), margin .45s cubic-bezier(.16,1,.3,1), background-color .35s ease",
        }}
      >
        <span
          className="font-sans text-[9px] uppercase tracking-[0.28em] text-brass"
          style={{ opacity: label ? 1 : 0, transition: "opacity .3s ease" }}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
