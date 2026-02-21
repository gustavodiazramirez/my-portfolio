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
      { type: "image", src: "/projects/gestion-prehospitalaria-1.webp" },
      { type: "image", src: "/projects/gestion-prehospitalaria-3.webp" },
      { type: "image", src: "/projects/gestion-prehospitalaria-2.webp" },
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
    title: "IA Tumoral - Herramienta de Detección Temprana de Cáncer",
    category: "Software Development Lifecycle",
    startDate: "Mar 2024",
    endDate: "Jun 2024",
    description:
      "Herramienta web basada en inteligencia artificial para la predicción temprana del cáncer de ovario, reconocida como semifinalista en el programa BRAIN Chile 2024.",
    impact:
      "Finalista del programa BRAIN 2024, entre las 10 mejores iniciativas científico-tecnológicas de Latinoamérica",
    media: [
      { type: "video", src: "/projects/ia-tumoral-4.mp4" },
      { type: "image", src: "/projects/ia-tumoral-1.webp" },
      { type: "image", src: "/projects/ia-tumoral-2.webp" },
      { type: "image", src: "/projects/ia-tumoral-3.webp" },
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
  {
    id: 3,
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
      { type: "image", src: "/projects/rehabilitacion-pediatrica-2.webp" },
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
    id: 4,
    title: "SCANBIKE - Sistema de Gestión y Trazabilidad de Cicloparqueaderos",
    category: "Software Development Lifecycle",
    startDate: "Mar 2025",
    endDate: "Jul 2025",
    description:
      "Solución integral para la automatización y digitalización del control de acceso en los cicloparqueaderos de la Universidad de La Frontera. Sustituye registros manuales por un ecosistema digital que integra autenticación OAuth 2.0 (Google), escaneo de códigos QR para ciclistas y tags de barras (1D) para la trazabilidad de activos físicos.",
    impact:
      "Elimina el error humano y garantiza la trazabilidad en tiempo real de los ingresos y retiros. Implementa una arquitectura robusta con alta disponibilidad (99.9%) y un sistema de contingencia basado en caché local para asegurar la continuidad operativa ante fallas de conectividad.",
    media: [
      { type: "image", src: "/projects/scanbike-1.webp" },
      { type: "image", src: "/projects/scanbike-2.webp" },
      { type: "image", src: "/projects/scanbike-3.webp" },
      { type: "image", src: "/projects/scanbike-4.webp" },
      { type: "image", src: "/projects/scanbike-5.webp" },
    ],
    technologies: [
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "OAuth 2.0",
      "MinIO",
      "SendGrid",
      "API Rest",
      "Next",
      "Flutter",
      "NestJS",
      "Next.js",
      "TailwindCSS",
      "React",
    ],
  },
  {
    id: 5,
    title: "L'essence - Catálogo Digital de Alta Perfumería",
    category: "Software Development Lifecycle",
    startDate: "Ene 2026",
    endDate: "Feb 2026",
    description:
      "Plataforma de comercio conversacional para la venta de decants de perfumes. Implementa un catálogo dinámico y un motor de recomendación (Quiz) que guía al usuario hasta el cierre de la venta mediante integración directa con WhatsApp.",
    impact:
      "Digitaliza el proceso de venta personalizada, reduciendo la fricción en la selección de productos y automatizando la preventa para derivar leads cualificados hacia atención directa por chat.",
    media: [
      { type: "video", src: "/projects/lassence.mp4" },
      { type: "image", src: "/projects/lassence-1.webp" },
      { type: "image", src: "/projects/lassence-2.webp" },
      { type: "image", src: "/projects/lassence-3.webp" },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "TailwindCSS",
      "Vercel",
      "WhatsApp Business API",
      "Framer Motion",
    ],
  },
  {
    id: 6,
    title: "Sistema de Monitoreo para Puntos de Reciclaje",
    category: "Software Development Lifecycle",
    startDate: "Ago 2024",
    endDate: "Dic 2024",
    description:
      "Aplicación para el monitoreo inteligente de puntos de reciclaje, que permite gestionar contenedores en tiempo real mediante sensores IoT, alertas automáticas y visualización de datos históricos.",
    impact:
      "Sistema de monitoreo en tiempo real con alertas automáticas y análisis de datos históricos para optimizar la recolección de residuos",
    media: [
      { type: "image", src: "/projects/iot-1.webp" },
      { type: "image", src: "/projects/iot-2.webp" },
      { type: "image", src: "/projects/iot-4.webp" },
      { type: "image", src: "/projects/iot-3.webp" },
    ],
    technologies: ["Next.js", "Node.js", "TailwindCSS", "React", "IoT"],
  },
  {
    id: 7,
    title: "SWAPIT - Aplicación de Intercambio de Ropa",
    category: "Personal Project",
    startDate: "Ene 2024",
    endDate: "May 2024",
    description:
      "Aplicación para el intercambio rápido de ropa, que incluye funciones de emparejamiento, chat en tiempo real y notificaciones para facilitar la comunicación entre usuarios.",
    impact:
      "Plataforma de economía circular que facilita el intercambio sostenible de prendas mediante algoritmos de emparejamiento inteligente",
    media: [
      { type: "image", src: "/projects/swapit-1.webp" },
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
    id: 8,
    title: "Red Impacto - Plataforma de Conexión de Voluntarios",
    category: "Personal Project",
    startDate: "Mar 2024",
    endDate: "Jun 2024",
    description:
      "Plataforma que conecta voluntarios con organizaciones utilizando un sistema de puntos que incentiva la participación activa y el intercambio de servicios entre ambos.",
    impact:
      "Sistema de gamificación que promueve el voluntariado mediante recompensas e intercambio de servicios bidireccional",
    media: [
      { type: "image", src: "/projects/red-impacto-1.webp" },
      { type: "image", src: "/projects/red-impacto-2.webp" },
      { type: "image", src: "/projects/red-impacto-3.webp" },
      { type: "image", src: "/projects/red-impacto-4.webp" },
      { type: "image", src: "/projects/red-impacto-5.webp" },
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
];
