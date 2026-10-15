"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about-me", label: "Sobre mí" },
  { href: "#projects", label: "Proyectos" },
  { href: "#certifications", label: "Certificaciones" },
];

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Si estamos en hero, limpiar la sección activa
            setActiveSection(entry.target.id === "hero" ? "" : `#${entry.target.id}`);
          }
        });
      },
      { root: null, rootMargin: "-20% 0px -50% 0px", threshold: 0 },
    );

    const sections = ["hero", "about-me", "projects", "certifications", "contact"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Menú móvil: cerrar al tocar fuera o con Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      ref={navRef}
      className="fixed top-3 left-1/2 z-50 w-[min(calc(100%-24px),760px)] -translate-x-1/2 sm:top-[18px] sm:w-[min(94%,760px)]"
    >
      <div
        className="flex items-center justify-between gap-3 rounded-full border border-white/[0.09] bg-[rgba(14,16,22,0.55)] py-2 pr-2 pl-2.5 backdrop-blur-[22px] backdrop-saturate-[160%]"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 50px -20px rgba(0,0,0,0.7)",
        }}
      >
        <a href="#hero" onClick={closeMenu} className="flex min-w-0 shrink items-center gap-2.5">
          <Image
            src="/foto-perfil.png"
            alt="Gustavo Díaz"
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.15)]"
          />
          <span className="truncate text-sm font-medium tracking-[-0.01em]">Gustavo Díaz</span>
        </a>

        <div className="flex shrink-0 items-center justify-end gap-0.5">
          {NAV_LINKS.map(({ href, label }) => {
            const active = activeSection === href;
            return (
              <a
                key={href}
                href={href}
                className={`hidden rounded-full px-3.5 py-2 text-[13px] whitespace-nowrap transition-all duration-300 hover:text-white md:inline-block ${
                  active ? "bg-white/[0.08] text-white" : "bg-transparent text-[#9aa0aa]"
                }`}
              >
                {label}
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={closeMenu}
            className="rounded-full bg-foreground px-4 py-2 text-[13px] font-medium whitespace-nowrap text-background transition-transform duration-300 hover:scale-[1.04] hover:text-background"
          >
            Contacto
          </a>
          <button
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="ml-1 grid h-[34px] w-[34px] place-items-center rounded-full border border-white/12 bg-white/5 text-foreground md:hidden"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full mt-2 rounded-[24px] border border-white/[0.09] bg-[rgba(14,16,22,0.8)] p-2 backdrop-blur-[22px] backdrop-saturate-[160%] transition-all duration-300 ease-glass md:hidden ${
          menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.07), 0 18px 50px -20px rgba(0,0,0,0.7)",
        }}
      >
        {NAV_LINKS.map(({ href, label }, index) => {
          const active = activeSection === href;
          return (
            <a
              key={href}
              href={href}
              onClick={closeMenu}
              tabIndex={menuOpen ? undefined : -1}
              className={`flex items-center gap-4 rounded-[18px] px-4 py-3.5 text-[15px] transition-colors hover:text-white ${
                active ? "bg-white/[0.08] text-white" : "text-[#c7cbd2]"
              }`}
            >
              <span className="font-mono text-[11px] text-ink-3">
                {String(index + 1).padStart(2, "0")}
              </span>
              {label}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
