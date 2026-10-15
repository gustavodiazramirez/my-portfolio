"use client";

import { useSyncExternalStore } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { MediaItem, Project } from "./types";

export const pad = (n: number) => String(n).padStart(2, "0");

const DESKTOP_QUERY = "(min-width: 1024px)";

// true en escritorio (panel sticky visible); en móvil la media va en la fila del índice.
export const useIsDesktop = () =>
  useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(DESKTOP_QUERY);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => false,
  );

// Portada de un proyecto: su primera imagen (los videos solo se cargan al estar activos).
export const coverOf = (project: Project) =>
  (project.media.find((m) => m.type === "image") ?? project.media[0]).src;

interface MediaLayerProps {
  project: Project;
  item: MediaItem | null;
  // false cuando la capa está oculta por CSS, para no descargar ni reproducir el video
  allowVideo: boolean;
}

// Imagen (o video) de un proyecto; sin item muestra la portada.
export const MediaLayer = ({ project, item, allowVideo }: MediaLayerProps) => (
  <>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={item?.type === "image" ? item.src : coverOf(project)}
      alt={project.title}
      loading="lazy"
      className="absolute inset-0 h-full w-full object-contain"
    />
    {allowVideo && item?.type === "video" && (
      <video
        key={item.src}
        src={item.src}
        className="absolute inset-0 h-full w-full bg-[#0d0f14] object-contain"
        autoPlay
        muted
        loop
        playsInline
      />
    )}
  </>
);

interface MediaControlsProps {
  mediaIndex: number;
  mediaCount: number;
  onPrev: () => void;
  onNext: () => void;
}

// Degradado inferior + contador + botones ‹ ›
export const MediaControls = ({ mediaIndex, mediaCount, onPrev, onNext }: MediaControlsProps) => (
  <>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(transparent,rgba(7,8,11,0.7))]" />
    <div className="absolute right-3.5 bottom-3.5 left-3.5 flex items-center justify-between gap-2">
      <span className="glass-dark rounded-full px-2.5 py-1.5 font-mono text-[11px] text-chip">
        {pad(mediaIndex + 1)} / {pad(mediaCount)}
      </span>
      {mediaCount > 1 && (
        <div className="flex gap-1.5">
          {[
            { label: "Anterior", Icon: ChevronLeft, onClick: onPrev },
            { label: "Siguiente", Icon: ChevronRight, onClick: onNext },
          ].map(({ label, Icon, onClick }) => (
            <button
              key={label}
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
              aria-label={label}
              className="glass-dark grid h-[34px] w-[34px] place-items-center rounded-full border border-white/15 text-foreground transition-colors hover:bg-white/15"
            >
              <Icon className="h-[15px] w-[15px]" />
            </button>
          ))}
        </div>
      )}
    </div>
  </>
);

export const ProjectLink = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={(e) => e.stopPropagation()}
    className="inline-flex shrink-0 items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-[13px] font-medium text-background hover:text-background hover:opacity-90"
  >
    Ver proyecto
    <ArrowUpRight className="h-3.5 w-3.5" />
  </a>
);
