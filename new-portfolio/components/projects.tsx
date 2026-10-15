"use client";

import { useState } from "react";
import { PROJECTS } from "./projects/data";
import { ProjectsHeader } from "./projects/ProjectsHeader";
import { ProjectIndexRow } from "./projects/ProjectIndexRow";
import { ProjectPanel } from "./projects/ProjectPanel";

const Projects = () => {
  const [activeProject, setActiveProject] = useState(0);
  const [mediaIndex, setMediaIndex] = useState(0);

  const mediaCount = PROJECTS[activeProject].media.length;

  const selectProject = (index: number) => {
    if (index === activeProject) return;
    setActiveProject(index);
    setMediaIndex(0);
  };

  const prevMedia = () => setMediaIndex((i) => (i - 1 + mediaCount) % mediaCount);
  const nextMedia = () => setMediaIndex((i) => (i + 1) % mediaCount);

  return (
    <section id="projects" className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,64px)] py-[88px] sm:py-[120px]">
      <ProjectsHeader />

      <div className="grid grid-cols-1 items-start gap-[clamp(24px,4vw,56px)] lg:grid-cols-2">
        <div className="flex flex-col border-t border-white/[0.08]">
          {PROJECTS.map((project, index) => (
            <ProjectIndexRow
              key={project.id}
              project={project}
              index={index}
              active={index === activeProject}
              mediaIndex={mediaIndex}
              onSelect={() => selectProject(index)}
              onPrevMedia={prevMedia}
              onNextMedia={nextMedia}
            />
          ))}
        </div>

        <ProjectPanel
          projects={PROJECTS}
          activeProject={activeProject}
          mediaIndex={mediaIndex}
          onPrev={prevMedia}
          onNext={nextMedia}
        />
      </div>
    </section>
  );
};

export default Projects;
