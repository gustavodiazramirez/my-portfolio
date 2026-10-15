"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { certifications as certificationsData } from "@/lib/certifications";
import Reveal from "./reveal";
import SectionLabel from "./section-label";

const VISIBLE = 5;

const Certifications = () => {
  const [showAll, setShowAll] = useState(false);
  const extra = certificationsData.length - VISIBLE;

  return (
    <section id="certifications" className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,64px)] py-[88px] sm:py-[120px]">
      <header className="mb-10 flex sm:mb-12 flex-wrap items-end justify-between gap-6">
        <div className="flex flex-col gap-7">
          <SectionLabel number="03" label="LICENCIAS Y CERTIFICACIONES" />
          <Reveal
            as="h2"
            className="m-0 text-[clamp(36px,4.6vw,64px)] leading-[1.04] font-normal tracking-[-0.035em]"
          >
            Formación <span className="font-serif italic">continua</span>
          </Reveal>
        </div>
        <Reveal as="p" className="m-0 max-w-[40ch] text-base leading-[1.6] text-ink-2">
          Formación continua en tecnologías y metodologías modernas
        </Reveal>
      </header>

      <Reveal className="glass rounded-[24px] bg-white/[0.03] p-1.5 sm:rounded-[28px] sm:p-2">
        {certificationsData.map((cert, index) => {
          const open = index < VISIBLE || showAll;
          // Cascada: al abrir en orden, al cerrar en orden inverso
          const k = Math.max(0, index - VISIBLE);
          const delay = index < VISIBLE ? 0 : showAll ? k * 0.05 : (extra - 1 - k) * 0.03;
          return (
            <div
              key={cert.url}
              className="grid"
              style={{
                gridTemplateRows: open ? "1fr" : "0fr",
                opacity: open ? 1 : 0,
                transition: `grid-template-rows .7s var(--ease-expand) ${delay}s, opacity .55s ease ${delay}s`,
              }}
            >
              <div className="min-h-0 overflow-hidden">
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={open ? undefined : -1}
                  className="flex items-center gap-x-4 rounded-[20px] px-3.5 py-4 text-foreground transition-colors duration-300 hover:bg-white/5 hover:text-white sm:gap-x-6 sm:px-5 sm:py-[18px]"
                >
                  <span className="w-[22px] shrink-0 self-start pt-[3px] font-mono text-[11px] text-ink-3 md:self-center md:pt-0">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* Móvil: título arriba y emisor · fecha abajo. md+: columnas en línea */}
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5 md:flex-row md:items-center md:gap-6">
                    <span className="min-w-0 text-[15px] tracking-[-0.01em] sm:text-base md:flex-[1_1_280px]">
                      {cert.titulo}
                    </span>
                    <span className="flex flex-wrap gap-x-3 md:contents">
                      <span className="text-[13px] text-ink-1 sm:text-[13.5px] md:flex-[0_0_170px]">
                        {cert.institucion}
                      </span>
                      <span className="font-mono text-xs text-ink-3 md:flex-[0_0_120px]">
                        {cert.fecha}
                      </span>
                    </span>
                  </span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/12 text-chip">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>
          );
        })}
      </Reveal>

      {extra > 0 && (
        <div className="mt-7 flex justify-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-[22px] py-[13px] text-sm text-foreground backdrop-blur-[20px] transition-colors duration-300 hover:bg-white/10"
          >
            {showAll ? "Ver menos" : `Ver más (${extra} adicionales)`}
            <ChevronDown
              className={`h-[15px] w-[15px] transition-transform duration-400 ${showAll ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      )}
    </section>
  );
};

export default Certifications;
