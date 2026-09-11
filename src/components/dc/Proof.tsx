import { CountUp, MaskLines, Reveal } from "./Primitives";

const stats = [
  { to: 240, suffix: "+", label: "Celebrations" },
  { to: 13, suffix: " yrs", label: "In practice" },
  { to: 19, suffix: "", label: "Cities" },
  { to: 96, suffix: "%", label: "By referral" },
];

const quotes = [
  {
    q: "A 700-guest wedding that felt like a private dinner.",
    a: "Anaya & Rohan M.",
    m: "Coorg",
  },
  {
    q: "Nothing shouted, and every frame looked staged by a film unit.",
    a: "Priya Nair",
    m: "UB City",
  },
];

export function Proof() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <Reveal className="mb-8">
          <p className="eyebrow">Your occasion deserves excellence.</p>
        </Reveal>
        <div className="grid gap-y-10 border-y border-border py-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="px-2">
              <p className="display text-5xl text-brass md:text-6xl">
                <CountUp to={s.to} suffix={s.suffix} />
              </p>
              <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {quotes.map((c, i) => (
            <Reveal key={c.a} delay={i * 0.1}>
              <blockquote>
                <p className="display text-3xl leading-[1.25] md:text-[2.1rem]">
                  <MaskLines lines={[`“${c.q}”`]} lineClassName="block" />
                </p>
                <footer className="mt-8 flex items-center gap-4">
                  <span className="h-px w-10 bg-brass" />
                  <span className="font-sans text-[11px] uppercase tracking-[0.26em]">{c.a}</span>
                  <span className="font-sans text-[11px] tracking-[0.14em] text-muted-foreground">
                    {c.m}
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
