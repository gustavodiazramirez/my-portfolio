import { Project } from "./types";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Plataforma de Gestión Prehospitalaria y KPIs",
    category: "Software Development Lifecycle",
    startDate: "Sep 2025",
    endDate: "Dic 2025",
    description:
      "Aplicación para la gestión prehospitalaria del SAMU Araucanía Sur, orientada a la centralización y visualización de KPIs operacionales del Centro Regulador, con generación de reportes automatizados en PDF y Excel.",
    impact:
      "Moderniza procesos manuales y sistemas legados mediante una arquitectura basada en NestJS, Next.js, PostgreSQL y un microservicio ETL en Python",
    media: [
      { type: "video", src: "/projects/gestion-prehospitalaria-1.mp4" },
      { type: "image", src: "/projects/gestion-prehospitalaria-2.jpeg" },
    ],
    technologies: [
      "NestJS",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "React",
      "Docker",
      "Python",
    ],
  },
  {
    id: 2,
    title: "Plataforma IoT para Rehabilitación Pediátrica",
    category: "Software Development Lifecycle",
    startDate: "Mar 2025",
    endDate: "Jul 2025",
    description:
      "Aplicación para la rehabilitación pediátrica con órtesis inteligentes IoT, que integra telemetría en tiempo real, dashboards clínicos y visualización de datos para el seguimiento del tratamiento.",
    impact:
      "Implementa backend en NestJS con TypeORM y PostgreSQL, frontend en Vue.js con TailwindCSS, integración con ThingsBoard para IoT, y orquestación con Docker Compose",
    media: [
      { type: "video", src: "/projects/rehabilitacion-pediatrica-1.mp4" },
        { type: "image", src: "/projects/rehabilitacion-pediatrica-2.jpg" },
    ],

    technologies: [
      "Vue.js",
      "NestJS",
      "TailwindCSS",
      "PostgreSQL",
      "Node.js",
      "React",
      "Docker",
    ],
  },
  {
    id: 3,
    title: "Sistema de Monitoreo para Puntos de Reciclaje",
    category: "Software Development Lifecycle",
    startDate: "Ago 2024",
    endDate: "Dic 2024",
    description:
      "Aplicación para el monitoreo inteligente de puntos de reciclaje, que permite gestionar contenedores en tiempo real mediante sensores IoT, alertas automáticas y visualización de datos históricos.",
    impact:
      "Sistema de monitoreo en tiempo real con alertas automáticas y análisis de datos históricos para optimizar la recolección de residuos",
    media: [
      { type: "image", src: "/projects/iot-1.jpg" },
      { type: "image", src: "/projects/iot-2.jpg" },
      { type: "image", src: "/projects/iot-3.jpg" },
    ],
    technologies: ["Next.js", "Node.js", "TailwindCSS", "React", "IoT"],
  },
  {
    id: 4,
    title: "SWAPIT - Aplicación de Intercambio de Ropa",
    category: "Personal Project",
    startDate: "Ene 2024",
    endDate: "May 2024",
    description:
      "Aplicación para el intercambio rápido de ropa, que incluye funciones de emparejamiento, chat en tiempo real y notificaciones para facilitar la comunicación entre usuarios.",
    impact:
      "Plataforma de economía circular que facilita el intercambio sostenible de prendas mediante algoritmos de emparejamiento inteligente",
    media: [
      { type: "image", src: "/projects/swapit-1.jpg" },
      { type: "video", src: "/projects/swapit-video.mp4" },
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "MinIO",
      "TailwindCSS",
      "Docker",
    ],
  },
  {
    id: 5,
    title: "Red Impacto - Plataforma de Conexión de Voluntarios",
    category: "Personal Project",
    startDate: "Mar 2024",
    endDate: "Jun 2024",
    description:
      "Plataforma que conecta voluntarios con organizaciones utilizando un sistema de puntos que incentiva la participación activa y el intercambio de servicios entre ambos.",
    impact:
      "Sistema de gamificación que promueve el voluntariado mediante recompensas e intercambio de servicios bidireccional",
    media: [
      { type: "image", src: "/projects/red-impacto-1.jpg" },
      { type: "image", src: "/projects/red-impacto-2.jpg" },
      { type: "image", src: "/projects/red-impacto-3.jpg" },
      { type: "image", src: "/projects/red-impacto-4.jpg" },
      { type: "image", src: "/projects/red-impacto-5.jpg" },
    ],
    technologies: [
      "React",
      "Node.js",
      "MinIO",
      "TailwindCSS",
      "Flutter",
      "Next.js",
      "Express.js",
    ],
  },
  {
    id: 6,
    title: "IA Tumoral - Herramienta de Detección Temprana de Cáncer",
    category: "Software Development Lifecycle",
    startDate: "Mar 2024",
    endDate: "Jun 2024",
    description:
      "Herramienta web basada en inteligencia artificial para la predicción temprana del cáncer de ovario, reconocida como semifinalista en el programa BRAIN Chile 2024.",
    impact:
      "Finalista del programa BRAIN 2024, entre las 10 mejores iniciativas científico-tecnológicas de Latinoamérica",
    media: [
      { type: "image", src: "/projects/ia-tumoral-1.jpg" },
      { type: "image", src: "/projects/ia-tumoral-2.png" },
      { type: "image", src: "/projects/ia-tumoral-3.jpg" },
      { type: "video", src: "/projects/ia-tumoral-4.mp4" },
    ],
    technologies: [
      "Astro",
      "PostgreSQL",
      "React",
      "TailwindCSS",
      "Docker",
      "Python",
      "FastAPI",
    ],
  },
];
