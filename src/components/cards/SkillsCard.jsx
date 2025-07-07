"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// Datos de habilidades
const skills = [
  { name: "JavaScript", icon: "javascript" },
  { name: "React", icon: "react" },
  { name: "GitHub", icon: "github" },
  { name: "TailwindCSS", icon: "tailwind" },
  { name: "Figma", icon: "figma" },
  { name: "PostgresSQL", icon: "postgresql" },
  { name: "Next", icon: "nextjs" },
  { name: "Minio", icon: "minio" },
  { name: "Astro", icon: "astro" },
  { name: "NestJS", icon: "nestjs" },
  { name: "Typescript", icon: "typescript" },
  { name: "GitLab", icon: "gitlab" },

];

function SkillCard({ skill }) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const toggleSkillDetails = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className="bg-black text-white border border-gray-800 rounded-3xl p-4 shadow-md relative group"
        onClick={toggleSkillDetails}
      >
        <img
          src={`/icons/${skill.icon}.svg`}
          alt={skill.name}
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
        />
        {/* Tooltip */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
          {skill.name}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="animate-blurred-fade-in py-12 sm:py-16 md:py-36 flex justify-center items-center mb-16"
    >
      <div className="w-full max-w-5xl px-8 sm:px-16 mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white">
            Mis <span className="text-black relative before:content-[''] overflow-hidden before:absolute before:w-full before:h-full before:bg-gradient-to-r before:from-[#FFFE65] before:to-[#F7DF1F] before:rotate-2 mix-blend-lighten before:-z-30 before:top-0">
              Habilidades
            </span>
          </h3>
          <p className="text-sm md:text-xl text-primary items-center px-12 md:px-56 font-semibold mt-8 mb-12 sm:mb-24">
            Tecnologías y herramientas de mi stack de desarrollo.
          </p>
        </div>

        {/* Sección de tarjetas */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-8 justify-center items-center">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}
