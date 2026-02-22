"use client";

import Image from "next/image";
import { ThemeToggle } from "./theme-toggle";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { href: "#about-me", label: "Sobre mí" },
  { href: "#projects", label: "Proyectos" },
  { href: "#certifications", label: "Certificaciones" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setIsScrolled(currentScrollY > 50);
      
      // Si estamos en la parte superior, siempre mostrar
      if (currentScrollY < 10) {
        setIsVisible(true);
      } 
      // Si scrolleamos hacia abajo, ocultar
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } 
      // Si scrolleamos hacia arriba, mostrar
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = `#${entry.target.id}`;
          // Si estamos en hero, limpiar la sección activa
          if (sectionId === "#hero") {
            setActiveSection("");
          } else {
            setActiveSection(sectionId);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observar todas las secciones incluyendo hero
    const sections = ["hero", "about-me", "projects", "certifications", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -32, 
          opacity: isVisible ? 1 : 0,
          filter: isVisible ? "blur(0px)" : "blur(4px)"
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeOut"
        }}
        className={`fixed top-3 sm:top-4 lg:top-6 left-1/2 -translate-x-1/2 z-50 w-[96%] sm:w-[90%] max-w-3xl ${
          !isVisible && 'pointer-events-none'
        }`}
      >
        <motion.div
          className={`backdrop-blur-xl border rounded-full px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 transition-all duration-300 ${
            isScrolled
              ? "bg-card/95 border-border/40 shadow-2xl"
              : "bg-card/90 border-border/90 shadow-xl"
          }`}
        >
          <div className="flex items-center justify-center sm:justify-between">
            <a
              href="#hero"
              className="items-center gap-2 sm:gap-3 shrink-0 hidden sm:flex"
            >
              <Image
                src="/foto-perfil.png"
                alt="Gustavo Díaz"
                width={32}
                height={32}
                className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-full object-cover ring-2 ring-primary/20"
              />
              <span className="font-semibold text-card-foreground text-sm sm:text-base hidden md:block">
                Gustavo Díaz
              </span>
            </a>

            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-4 xl:gap-6">
              {NAV_LINKS.map(({ href, label }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`transition-all text-[10px] sm:text-xs md:text-sm px-1.5 sm:px-2 md:px-0 ${
                    activeSection === href
                      ? "text-foreground font-bold"
                      : "text-muted-foreground font-medium hover:text-foreground"
                  }`}
                >
                  {label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.3,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-primary text-primary-foreground px-2.5 sm:px-4 md:px-5 py-1.5 sm:py-2 rounded-full hover:opacity-90 transition-opacity text-[10px] sm:text-xs md:text-sm shadow-md hover:shadow-lg whitespace-nowrap ${
                  activeSection === "#contact" ? "font-bold" : "font-medium"
                }`}
              >
                Contacto
              </motion.a>
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};

export default Navbar;
