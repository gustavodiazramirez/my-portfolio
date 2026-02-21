"use client";

import { useState, useEffect } from "react";
import { Lightbulb, Rocket } from "lucide-react";
import { motion } from "framer-motion";

const AboutMe = () => {
  const images = [
    {
      src: "/about-me/certificado-titulo.webp",
      alt: "Certificado de título como Ingeniero en Informática",
    },
    {
      src: "/about-me/presentacion.webp",
      alt: "Defensa de titulo",
    },
    {
      src: "/about-me/titulado.webp",
      alt: "Foto de titulación",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length]);

  const highlights = [
    {
      icon: Lightbulb,
      title: "Aprendizaje Continuo",
      description:
        "Siempre actualizado con las últimas tecnologías y mejores prácticas",
    },
    {
      icon: Rocket,
      title: "Enfoque en Resultados",
      description:
        "Soluciones escalables que generan impacto tangible y sostenible",
    },
  ];

  return (
    <section
      id="about-me"
      className="min-h-screen w-full px-6 sm:px-8 lg:px-16 xl:px-60 pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-20 flex items-center"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-center md:items-center w-full"
      >
        {/* Galería de imágenes */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full md:w-auto shrink-0 order-2 md:order-1"
        >
          <div className="relative w-80 h-96 sm:w-96 sm:h-[28rem] mx-auto md:mx-0">
            {images.map((image, index) => {
              const position =
                (index - currentIndex + images.length) % images.length;

              return (
                <div
                  key={index}
                  className="absolute transition-all duration-1000 ease-in-out"
                  style={{
                    left:
                      position === 0 ? "0px" : position === 1 ? "40px" : "80px",
                    top:
                      position === 0 ? "0px" : position === 1 ? "20px" : "40px",
                    zIndex: position === 0 ? 30 : position === 1 ? 20 : 10,
                    opacity: 1,
                    transform: `scale(${position === 0 ? 1 : 0.95}) rotate(${position === 0 ? "0deg" : position === 1 ? "2deg" : "4deg"})`,
                  }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-border/50">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-64 h-80 sm:w-72 sm:h-100 object-cover"
                    />
                    {position !== 0 && (
                      <div
                        className="absolute inset-0 bg-black/20 transition-opacity duration-1000"
                        style={{ opacity: position === 1 ? 0.15 : 0.3 }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Indicadores del carrusel */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 flex flex-col justify-center md:justify-start text-center md:text-left space-y-4 md:space-y-6 order-1 md:order-2"
        >
          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Sobre mí
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/30 rounded-full mx-auto md:mx-0"></div>
          </div>

          <p className="text-base sm:text-lg md:text-md text-muted-foreground leading-relaxed text-justify pt-4 md:pt-8">
            Hola!, soy{" "}
            <span className="text-foreground font-semibold">Gustavo Díaz</span>,
            especializado en desarrollo Full Stack. Me enfoco en crear
            soluciones escalables y sostenibles que resuelvan problemas reales,
            aplicando buenas prácticas y manteniendo siempre al usuario final
            como prioridad. Mi experiencia abarca desde el diseño hasta la
            implementación, trabajando en equipo y adaptándome continuamente a
            nuevas tecnologías y desafíos técnicos.
          </p>

          {/* Grid de highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group relative p-4 rounded-xl bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <highlight.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm mb-1 text-foreground">
                      {highlight.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {highlight.description}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
