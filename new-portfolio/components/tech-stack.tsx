"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";

const technologies = [
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "GitLab", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" },
  { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Astro", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/astro/astro-original.svg" },
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "NestJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
];

// Tiempo sobre una tecnología antes de mostrar el globo
const TOOLTIP_DELAY = 1000;
// Velocidad del carrusel con el cursor encima (1 = normal)
const SLOW_RATE = 0.25;

const noopSubscribe = () => () => {};

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [tipName, setTipName] = useState<string | null>(null);
  // El portal solo existe en el cliente
  const isClient = useSyncExternalStore(noopSubscribe, () => true, () => false);

  // Estado del loop por frame (refs: no provoca renders)
  const loop = useRef({
    pointer: { x: 0, y: 0 },
    inside: false,
    hovered: null as HTMLElement | null,
    hoverStart: 0,
    shown: null as string | null,
    rate: 1,
    raf: 0,
  });

  useEffect(() => {
    const s = loop.current;
    return () => cancelAnimationFrame(s.raf);
  }, []);

  // Cada frame: qué tecnología está bajo el cursor (las fichas se mueven bajo un cursor
  // quieto y el navegador no siempre dispara mouseenter/leave), posición del globo pegada
  // a la ficha y desaceleración suave del carrusel.
  const tick = (now: number) => {
    const s = loop.current;
    const section = sectionRef.current;
    const animation = trackRef.current?.getAnimations()[0];

    let hit: HTMLElement | null = null;
    if (s.inside && section) {
      const el = document.elementFromPoint(s.pointer.x, s.pointer.y);
      if (el && section.contains(el)) hit = el.closest<HTMLElement>("[data-tech]");
      else s.inside = false;
    }

    if (hit !== s.hovered) {
      s.hovered?.removeAttribute("data-hover");
      hit?.setAttribute("data-hover", "");
      s.hovered = hit;
      s.hoverStart = now;
      if (s.shown) {
        s.shown = null;
        setTipName(null);
      }
    }

    if (s.hovered && !s.shown && now - s.hoverStart >= TOOLTIP_DELAY) {
      s.shown = s.hovered.dataset.tech ?? null;
      setTipName(s.shown);
    }

    if (s.hovered && tipRef.current) {
      const r = s.hovered.getBoundingClientRect();
      tipRef.current.style.transform = `translate(${r.left + r.width / 2}px, ${r.top - 12}px) translate(-50%, -100%)`;
    }

    const target = s.inside ? SLOW_RATE : 1;
    s.rate += (target - s.rate) * 0.08;
    if (animation) animation.playbackRate = s.rate;

    if (s.inside || s.hovered || Math.abs(s.rate - 1) > 0.005) {
      s.raf = requestAnimationFrame(tick);
    } else {
      s.rate = 1;
      if (animation) animation.playbackRate = 1;
      s.raf = 0;
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const s = loop.current;
    s.pointer = { x: e.clientX, y: e.clientY };
    s.inside = true;
    if (!s.raf) s.raf = requestAnimationFrame(tick);
  };

  const onPointerLeave = () => {
    loop.current.inside = false;
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative overflow-hidden pt-5 pb-15 select-none mask-[linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div ref={trackRef} className="animate-marquee flex w-max gap-16 py-6">
        {[...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            data-tech={tech.name}
            aria-hidden={index >= technologies.length}
            className="group flex shrink-0 items-center gap-3.5"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={tech.icon}
              alt={tech.name}
              draggable={false}
              className="h-9 w-9 object-contain opacity-45 grayscale transition-all duration-400 group-data-hover:opacity-100 group-data-hover:grayscale-0"
            />
            <span className="text-[15px] whitespace-nowrap text-chip opacity-45 transition-opacity duration-400 group-data-hover:opacity-100">
              {tech.name}
            </span>
          </div>
        ))}
      </div>

      {/* Fuera de la sección (portal): su mask-image anularía el backdrop-filter y recortaría
          el globo. La posición la escribe el loop en cada frame para que viaje con la ficha. */}
      {isClient &&
        createPortal(
          <div ref={tipRef} className="pointer-events-none fixed top-0 left-0 z-[60]">
            <MotionConfig reducedMotion="user">
              <AnimatePresence>
                {tipName && (
                  <motion.div
                    key={tipName}
                    role="tooltip"
                    initial={{ opacity: 0, y: 6, scale: 0.96, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: 4, scale: 0.97, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: [0.22, 0.8, 0.24, 1] }}
                    className="rounded-full border border-white/12 bg-[rgba(14,16,22,0.5)] px-4 py-2 text-[13px] whitespace-nowrap text-ink-1 backdrop-blur-[18px] backdrop-saturate-[160%]"
                    style={{
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.1), 0 14px 40px -14px rgba(0,0,0,0.8), 0 0 24px -10px oklch(0.8 0.11 235 / 0.35)",
                    }}
                  >
                    Tengo conocimientos en{" "}
                    <span className="font-medium text-white">{tipName}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </MotionConfig>
          </div>,
          document.body,
        )}
    </section>
  );
}
