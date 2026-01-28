"use client";

import { Calendar } from "lucide-react";
import { Project } from "./types";
import { MediaCarousel } from "./MediaCarousel";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const isReverse = index % 2 !== 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start ${
          isReverse ? "lg:direction-rtl" : ""
        }`}
      >
        {/* Content Side */}
        <div
          className={`lg:col-span-7 ${
            isReverse ? "lg:order-2" : "lg:order-1"
          } order-1`}
        >
          <div className="space-y-4 lg:space-y-6 lg:pr-8">
            {/* Category & Number */}
            <div className="flex items-center gap-4">
              <span className="text-4xl lg:text-5xl font-bold text-primary/30">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-foreground transition-colors leading-tight">
              {project.title}
            </h3>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">
                {project.startDate} — {project.endDate}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base italic lg:text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-2.5 lg:px-3 py-1 lg:py-1.5 text-xs font-semibold bg-secondary/50 border border-border hover:border-primary hover:bg-primary/10 text-secondary-foreground rounded-md transition-all cursor-default"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>

        {/* Image Side */}
        <div
          className={`lg:col-span-5 ${
            isReverse ? "lg:order-1" : "lg:order-2"
          } order-2`}
        >
          <div className="relative transition-all duration-500 ease-in-out">
            <MediaCarousel media={project.media} projectTitle={project.title} />
          </div>
        </div>
      </div>
    </motion.article>
  );
};
