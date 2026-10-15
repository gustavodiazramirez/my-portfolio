"use client";

import { useState, useEffect } from "react";
import Reveal from "./reveal";
import SectionLabel from "./section-label";

const PHOTOS = [
  {
    src: "/about-me/certificado-titulo.webp",
    alt: "Certificado de título como Ingeniero en Informática",
  },
  {
    src: "/about-me/presentacion.webp",
    alt: "Defensa de titulo",
  },
  {
    src: "/about-me/gustavo-ufro.webp",
    alt: "Gustavo Díaz en la Universidad de La Frontera",
  },
];

const STACK_TRANSFORMS = [
  "none",
  "translate(6%,4%) rotate(4deg) scale(0.94)",
  "translate(12%,8%) rotate(8deg) scale(0.88)",
];

const AboutMe = () => {
  const [photoIndex, setPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    // En escritorio la sección entera cabe en una pantalla: alto mínimo 100svh y tamaños
    // derivados del alto del viewport (galería = 100svh − 290px de paddings, etiqueta y dots).
    <section
      id="about-me"
      className="mx-auto max-w-[1280px] px-[clamp(20px,5vw,64px)] py-[88px] sm:py-[120px] lg:flex lg:min-h-svh lg:flex-col lg:justify-center lg:pt-24 lg:pb-16"
    >
      <SectionLabel number="01" label="SOBRE MÍ" className="mb-10 sm:mb-14 lg:mb-[clamp(24px,4.5vh,56px)]" />

      <div className="grid grid-cols-1 items-center gap-[clamp(40px,6vw,96px)] lg:grid-cols-2 lg:gap-[clamp(40px,5vw,80px)]">
        {/* En móvil más angosta: las fotos de atrás se desplazan y rotan hacia la derecha */}
        <Reveal className="relative mb-14 aspect-[4/5] w-[min(80%,420px)] -translate-x-[4%] justify-self-center sm:w-[min(100%,420px)] sm:translate-x-0 lg:mb-0 lg:w-[min(100%,420px,calc((100svh-290px)*0.8))]">
          {PHOTOS.map((photo, index) => {
            const position = (index - photoIndex + PHOTOS.length) % PHOTOS.length;
            return (
              <div
                key={photo.src}
                className="absolute inset-0 rounded-[30px] border border-white/10 bg-white/[0.04] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-[20px] transition-all duration-[1100ms] ease-glass"
                style={{
                  transform: STACK_TRANSFORMS[position],
                  zIndex: 30 - position * 10,
                  opacity: position === 2 ? 0.55 : 1,
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="block h-full w-full rounded-[22px] object-cover"
                />
              </div>
            );
          })}
          <div className="absolute bottom-[-44px] left-1/2 flex -translate-x-1/2 gap-2">
            {PHOTOS.map((_, index) => (
              <button
                key={index}
                onClick={() => setPhotoIndex(index)}
                aria-label={`Ir a imagen ${index + 1}`}
                className={`h-1.5 rounded-full border-0 p-0 transition-all duration-400 ${
                  index === photoIndex ? "w-7 bg-foreground" : "w-1.5 bg-white/25"
                }`}
              />
            ))}
          </div>
        </Reveal>

        <div className="flex flex-col gap-6 lg:gap-[clamp(14px,2.6vh,24px)]">
          <Reveal
            as="h2"
            className="m-0 text-[clamp(30px,3.6vw,50px)] leading-[1.1] font-normal tracking-[-0.03em] text-balance lg:text-[clamp(28px,min(3.4vw,5.6vh),50px)]"
          >
            Soy{" "}
            <span className="font-serif tracking-[-0.01em] italic">Gustavo Díaz</span>,
            Ingeniero en Informática y desarrollador Full Stack.
          </Reveal>
          <Reveal
            as="p"
            className="m-0 max-w-[58ch] text-[clamp(16px,1.3vw,18px)] leading-[1.75] text-pretty text-ink-1 lg:text-[clamp(15px,min(1.3vw,2.3vh),18px)] lg:leading-[1.7]"
          >
            Me gusta entender el problema antes de escribir la primera línea de
            código. Disfruto el camino que va de una idea difusa a un sistema que
            funciona: conversar con quienes lo van a usar, ordenar lo que
            realmente necesitan y elegir una arquitectura que pueda crecer con
            ellos.
          </Reveal>
          <Reveal
            as="p"
            className="m-0 max-w-[58ch] text-[clamp(16px,1.3vw,18px)] leading-[1.75] text-pretty text-ink-1 lg:text-[clamp(15px,min(1.3vw,2.3vh),18px)] lg:leading-[1.7]"
          >
            Me muevo con la misma comodidad en el backend que en la interfaz,
            trabajo bien en equipo y aprendo rápido cuando un proyecto pide una
            herramienta nueva. Lo que más me motiva son los proyectos con
            impacto real en las personas.
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
