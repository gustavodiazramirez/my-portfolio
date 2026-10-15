"use client";

import Reveal from "../reveal";
import { MediaControls, MediaLayer, ProjectLink, pad, useIsDesktop } from "./ProjectMedia";
import { Project } from "./types";

interface ProjectPanelProps {
  projects: Project[];
  activeProject: number;
  mediaIndex: number;
  onPrev: () => void;
  onNext: () => void;
}

// Panel sticky de escritorio (en móvil la media va dentro de cada fila del índice).
export const ProjectPanel = ({
  projects,
  activeProject,
  mediaIndex,
  onPrev,
  onNext,
}: ProjectPanelProps) => {
  const project = projects[activeProject];
  const isDesktop = useIsDesktop();

  return (
    <Reveal
      className="glass sticky top-[110px] hidden rounded-[30px] border-white/[0.09] p-3 lg:block"
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 40px 100px -40px rgba(0,0,0,0.9)",
      }}
    >
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-[#0d0f14]">
        {projects.map((p, i) => {
          const on = i === activeProject;
          return (
            <div
              key={p.id}
              className="absolute inset-0"
              style={{
                opacity: on ? 1 : 0,
                transform: `scale(${on ? 1 : 1.06})`,
                transition: "opacity .7s ease, transform 1.2s var(--ease-glass)",
              }}
            >
              <MediaLayer
                project={p}
                item={on ? project.media[mediaIndex] : null}
                allowVideo={isDesktop}
              />
            </div>
          );
        })}

        <MediaControls
          mediaIndex={mediaIndex}
          mediaCount={project.media.length}
          onPrev={onPrev}
          onNext={onNext}
        />
      </div>

      <div className="flex items-center justify-between gap-4 px-2.5 pt-[18px] pb-2">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-mono text-[11px] text-ink-3">
            {pad(activeProject + 1)} / {pad(projects.length)}
          </span>
          <span className="truncate text-[15px] font-medium tracking-[-0.01em]">
            {project.title}
          </span>
        </div>
        {project.link && <ProjectLink href={project.link} />}
      </div>
    </Reveal>
  );
};
