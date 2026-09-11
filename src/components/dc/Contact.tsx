import logo from "@/assets/dream-corner-logo.png.asset.json";
import { useState } from "react";
import { LineButton, MaskLines, Reveal } from "./Primitives";

function Field({
  label,
  name,
  type = "text",
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block border-b border-border py-4 focus-within:border-brass">
      <span className="block font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          rows={3}
          className="mt-3 w-full resize-none bg-transparent font-sans text-base outline-none placeholder:text-muted-foreground/50"
          placeholder="Tell us about the occasion…"
        />
      ) : (
        <input
          name={name}
          type={type}
          className="mt-3 w-full bg-transparent font-sans text-base outline-none"
        />
      )}
    </label>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="on-bone paper-texture relative overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] gap-12 px-6 py-20 md:px-10 md:py-28 lg:grid-cols-2 lg:gap-16">
        <div>
          <Reveal>
            <p className="eyebrow">Enquiries</p>
          </Reveal>
          <h2 className="display mt-6 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">
            <MaskLines lines={["Let's bring", "your event", "to life."]} />
          </h2>
          <Reveal delay={0.12}>
            <p className="mt-6 max-w-sm font-sans text-sm leading-[1.9] text-muted-foreground">
              Life is full of reasons to celebrate. Let us make them unforgettable.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="mt-8 space-y-3 font-sans text-sm">
              <p>
                <a href="mailto:hello@dreamcorner.in" data-cursor="MAIL" className="link-underline">
                  hello@dreamcorner.in
                </a>
              </p>
              <p>
                <a href="tel:+918041234567" data-cursor="CALL" className="link-underline">
                  +91 80 4123 4567
                </a>
              </p>
              <p className="text-muted-foreground">Indiranagar, Bangalore</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="lg:pt-14"
          >
            <Field label="Your name" name="name" />
            <Field label="Email" name="email" type="email" />
            <Field label="Date & city" name="date" />
            <Field label="The occasion" name="brief" textarea />
            <div className="mt-10 flex items-center gap-6">
              <LineButton type="submit" tone="bone">
                {sent ? "Received" : "Send enquiry"}
              </LineButton>
              {sent && (
                <span className="font-sans text-[11px] uppercase tracking-[0.26em] text-muted-foreground">
                  Thank you — we'll be in touch.
                </span>
              )}
            </div>
          </form>
        </Reveal>
      </div>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-10 font-sans text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-10">
          <span className="flex items-center gap-3 normal-case tracking-[0.28em]">
            <img src={logo.url} alt="Dream Corner logo" className="h-8 w-8" />
            Dream Corner, Bangalore
          </span>
          <div className="flex gap-8">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" data-cursor="true" className="link-underline">
              Instagram
            </a>
            <a href="#top" data-cursor="TOP" className="link-underline">
              Back to top
            </a>
          </div>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </section>
  );
}
