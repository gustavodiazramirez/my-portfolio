"use client";

import { ArrowUpRight, Mail, Linkedin, Github, Gitlab } from "lucide-react";
import CopyButton from "./copy-button";
import Reveal from "./reveal";
import SectionLabel from "./section-label";
import { LIGHT_INTENSITY } from "./background";

const EMAIL = "gustavodiazramirez26@gmail.com";

const contactLinks = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Linkedin, label: "LinkedIn", value: "/in/gdiaz14", href: "https://www.linkedin.com/in/gdiaz14" },
  { icon: Github, label: "GitHub", value: "@gustavidiazramirez", href: "https://github.com/gustavodiazramirez" },
  { icon: Gitlab, label: "GitLab", value: "@gdiaz14", href: "https://gitlab.com/gdiaz14" },
];

const Contact = () => {
  return (
    <section
      id="contact"
      className="relative mx-auto max-w-[1280px] px-[clamp(20px,5vw,64px)] pt-[96px] pb-10 sm:pt-[140px] sm:pb-12"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[30%] left-1/2 h-[420px] w-[min(900px,90vw)] -translate-x-1/2 rounded-full blur-[30px]"
        style={{
          background: "radial-gradient(ellipse, oklch(0.70 0.12 250 / 0.28), transparent 65%)",
          opacity: LIGHT_INTENSITY,
        }}
      />

      <div className="relative flex flex-col items-center gap-7 text-center">
        <SectionLabel number="04" label="CONTACTO" />
        <Reveal
          as="h2"
          className="m-0 text-[clamp(64px,13vw,200px)] leading-[0.9] font-normal tracking-[-0.055em]"
        >
          Hablemos<span className="font-serif text-accent italic">.</span>
        </Reveal>
        <Reveal
          as="p"
          className="m-0 max-w-[44ch] text-[clamp(16px,1.4vw,19px)] leading-[1.6] text-ink-1"
        >
          Si tienes una idea, un proyecto o simplemente quieres conversar sobre
          tecnología.
        </Reveal>
        <Reveal className="glass flex w-full max-w-[400px] flex-col items-stretch gap-1.5 rounded-[26px] border-white/10 bg-white/[0.04] p-2 sm:w-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-2.5 sm:rounded-full">
          <a
            href={`mailto:${EMAIL}`}
            className="truncate px-[18px] py-3 text-center text-[clamp(14px,1.5vw,18px)] tracking-[-0.01em] sm:text-left"
          >
            {EMAIL}
          </a>
          <CopyButton text={EMAIL} />
        </Reveal>
      </div>

      <div className="relative mt-16 grid sm:mt-24 grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
        {contactLinks.map(({ icon: Icon, label, value, href }) => (
          <Reveal key={label}>
            {/* El hover vive en el <a> interno para no competir con la animación de Reveal */}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass glass-hover flex items-center gap-3.5 rounded-[22px] p-[18px]"
            >
              <span className="grid h-[42px] w-[42px] shrink-0 place-items-center rounded-[14px] bg-white/[0.06] text-chip">
                <Icon className="h-[18px] w-[18px]" />
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                <span className="font-mono text-[10.5px] tracking-[0.1em] text-ink-3 uppercase">
                  {label}
                </span>
                <span className="truncate text-[14.5px]">{value}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-ink-3" />
            </a>
          </Reveal>
        ))}
      </div>

      <footer className="relative mt-16 flex flex-col items-center gap-3 text-center sm:mt-24 sm:flex-row sm:flex-wrap sm:justify-between sm:text-left border-t border-white/[0.08] pt-6 font-mono text-[11px] tracking-[0.06em] text-ink-3">
        <span>© 2026 GUSTAVO DÍAZ RAMÍREZ</span>
        <span>* DISPONIBLE PARA COLABORACIONES Y NUEVOS RETOS</span>
        <a href="#hero" className="text-ink-2 hover:text-ink-2">
          VOLVER ARRIBA ↑
        </a>
      </footer>
    </section>
  );
};

export default Contact;
