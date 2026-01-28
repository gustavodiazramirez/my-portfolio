"use client";

import { motion } from "framer-motion";

export const ProjectsHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12 lg:mb-20"
    >
      <div className="space-y-3 mb-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          Proyectos
        </h2>
        <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/30 rounded-full mx-auto"></div>
      </div>
      <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
        Soluciones innovadoras que combinan tecnología de vanguardia con
        experiencia de usuario excepcional
      </p>
    </motion.header>
  );
};
