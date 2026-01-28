"use client";

import { PROJECTS } from "./projects/data";
import { ProjectCard } from "./projects/ProjectCard";
import { ProjectsHeader } from "./projects/ProjectsHeader";
import { motion } from "framer-motion";

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative py-16 sm:py-20 lg:py-28 xl:py-32 px-6 sm:px-8 lg:px-16 xl:px-60 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 lg:w-96 lg:h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <ProjectsHeader />

        {/* Projects Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="space-y-20 lg:space-y-24"
        >
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

