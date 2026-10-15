"use client";

import { useRef } from "react";
import Reveal from "../reveal";
import { MediaControls, MediaLayer, ProjectLink, useIsDesktop } from "./ProjectMedia";
import { Project } from "./types";

interface ProjectIndexRowProps {
  project: Project;
  index: number;
  active: boolean;
  mediaIndex: number;
  onSelect: () => void;
  onPrevMedia: () => void;
  onNextMedia: () => void;
}

const EXPAND_TRANSITION =
  "grid-template-rows .7s var(--ease-expand), opacity .6s ease, filter .6s ease";

export const ProjectIndexRow = ({
  project,
  index,
  active,
  mediaIndex,
  onSelect,
  onPrevMedia,
  onNextMedia,
}: ProjectIndexRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const year = project.endDate.split(" ")[1];

  // Al tocar una fila, la que estaba abierta arriba se cierra y empujaría esta hacia arriba.
  // Mantener la fila tocada en su lugar mientras dura la transición (Safari no tiene scroll anchoring).
  const handleClick = () => {
    if (active) return;
    const el = rowRef.current;
    const startTop = el?.getBoundingClientRect().top;
    onSelect();
    if (!el || startTop === undefined) return;

    const t0 = performance.now();
    const keepInPlace = (now: number) => {
      const delta = el.getBoundingClientRect().top - startTop;
      if (Math.abs(delta) > 0.5) window.scrollBy(0, delta);
      if (now - t0 < 800) requestAnimationFrame(keepInPlace);
    };
    requestAnimationFrame(keepInPlace);
  };

  return (
    <Reveal
      ref={rowRef}
      onClick={handleClick}
      className={`group border-b border-white/[0.08] px-1 py-[22px] ${active ? "" : "cursor-pointer"}`}
    >
      <div className="flex items-baseline gap-3.5 sm:gap-[18px]">
        <span
          className={`w-[22px] shrink-0 font-mono text-xs transition-colors duration-400 ${
            active ? "text-accent" : "text-ink-3 group-hover:text-ink-1"
          }`}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className={`min-w-0 flex-1 text-[clamp(18px,1.6vw,22px)] leading-[1.25] font-normal tracking-[-0.02em] text-pretty transition-colors duration-400 ${
            active ? "text-white" : "text-ink-2 group-hover:text-chip"
          }`}
        >
          {project.title}
        </span>
        <span className="font-mono text-[11px] whitespace-nowrap text-ink-3">{year}</span>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateRows: active ? "1fr" : "0fr",
          opacity: active ? 1 : 0,
          filter: active ? "none" : "blur(6px)",
          transition: EXPAND_TRANSITION,
        }}
      >
        <div className="min-h-0 overflow-hidden">
          <div
            className="flex flex-col gap-4 pt-4 pb-1 transition-transform duration-700 ease-expand sm:pl-10"
            style={{ transform: active ? "translateY(0)" : "translateY(-10px)" }}
          >
            {/* Media en línea para móvil/tablet; en escritorio la muestra el panel sticky */}
            <div className="relative aspect-video overflow-hidden rounded-[18px] border border-white/[0.08] bg-[#0d0f14] lg:hidden">
              <MediaLayer
                project={project}
                item={active ? project.media[mediaIndex] : null}
                allowVideo={!isDesktop}
              />
              <MediaControls
                mediaIndex={active ? mediaIndex : 0}
                mediaCount={project.media.length}
                onPrev={onPrevMedia}
                onNext={onNextMedia}
              />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.06em] text-ink-2 uppercase">
              <span>{project.category}</span>
              <span>
                {project.startDate} — {project.endDate}
              </span>
            </div>
            <p className="m-0 text-[15px] leading-[1.65] text-pretty text-ink-1">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/[0.08] bg-white/5 px-2.5 py-[5px] text-xs text-chip"
                >
                  {tech}
                </span>
              ))}
            </div>
            {project.link && (
              <div className="lg:hidden">
                <ProjectLink href={project.link} />
              </div>
            )}
          </div>
        </div>
      </div>
    </Reveal>
  );
};
