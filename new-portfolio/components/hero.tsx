"use client";

import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import Reveal from "./reveal";

const PHRASES = [
  "soluciones tecnológicas",
  "experiencias únicas",
  "plataformas modernas",
];

const LONGEST_PHRASE = PHRASES.reduce((a, b) => (b.length > a.length ? b : a));

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const phrase = PHRASES[phraseIndex];
    let delay: number;
    let next: () => void;

    if (!isDeleting) {
      if (typed.length < phrase.length) {
        delay = typed.length === 0 && phraseIndex === 0 ? 600 : 85;
        next = () => setTyped(phrase.slice(0, typed.length + 1));
      } else {
        delay = 2000;
        next = () => setIsDeleting(true);
      }
    } else if (typed.length > 0) {
      delay = 40;
      next = () => setTyped(phrase.slice(0, typed.length - 1));
    } else {
      delay = 300;
      next = () => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
      };
    }

    const timeout = setTimeout(next, delay);
    return () => clearTimeout(timeout);
  }, [typed, isDeleting, phraseIndex]);

  return (
    <section
      id="hero"
      className="relative mx-auto flex min-h-svh sm:h-svh sm:min-h-[480px] max-w-[1280px] flex-col items-center justify-center px-[clamp(20px,5vw,64px)] pt-[clamp(76px,13vh,96px)] pb-[clamp(28px,8vh,72px)] text-center"
    >
      <div className="flex max-w-[1000px] min-w-0 flex-col items-center gap-[clamp(14px,3.2vh,32px)]">
        {/* Eyebrow en pastilla glass; en pantallas muy angostas se parte en dos líneas */}
        <Reveal className="glass-pill inline-flex flex-wrap items-center justify-center gap-x-3.5 gap-y-0.5 rounded-[20px] px-5 py-2 text-[13px] leading-snug font-normal tracking-[-0.005em] min-[440px]:rounded-full sm:text-sm">
          {/* text-glass en cada span: Safari no recorta bien background-clip:text a través de hijos */}
          <span>
            <span className="text-glass">Desarrollador </span>
            <span className="text-glass font-serif text-[1.12em] tracking-normal italic">
              Full Stack
            </span>
          </span>
          {/* Separador: línea fina que se desvanece en los extremos */}
          <span
            aria-hidden="true"
            className="hidden h-3.5 w-px bg-[linear-gradient(transparent,rgba(255,255,255,0.35),transparent)] min-[440px]:block"
          />
          <span className="text-glass">Ingeniero en Informática</span>
        </Reveal>

        <div>
          <Reveal
            as="h1"
            className="m-0 text-[clamp(36px,min(7vw,10vh),112px)] leading-[0.98] font-normal tracking-[-0.045em] text-balance"
          >
            Transformando ideas en
          </Reveal>
          <Reveal className="relative pb-1 font-serif text-[clamp(28px,8.8vw,40px)] leading-[1.05] tracking-[-0.02em] whitespace-nowrap italic sm:text-[clamp(40px,min(7.6vw,11vh),122px)]">
            {/* Reserva el espacio con la frase más larga para que la página no salte */}
            <span aria-hidden="true" className="invisible">
              {LONGEST_PHRASE}
              <span className="inline-block w-[9px]" />
            </span>
            <span className="absolute inset-x-0 top-0 text-center">
              <span className="text-gradient">{typed}</span>
              <span className="animate-blink ml-1.5 inline-block h-[0.78em] w-[3px] bg-accent align-[-0.06em]" />
            </span>
          </Reveal>
        </div>

        <Reveal
          as="p"
          className="m-0 max-w-[52ch] text-[clamp(15px,1.4vw,19px)] leading-[1.6] text-pretty text-ink-1"
        >
          Desarrollador Full Stack especializado en crear aplicaciones web
          modernas con arquitectura sólida y experiencias excepcionales.
        </Reveal>

        <Reveal className="flex w-full flex-col items-stretch justify-center gap-3 min-[420px]:w-auto min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center">
          <a
            href="#about-me"
            className="inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-[22px] py-3.5 text-[15px] font-medium whitespace-nowrap text-background shadow-[0_10px_40px_-10px_oklch(0.80_0.11_235/.6)] transition-transform duration-300 hover:-translate-y-0.5 hover:text-background"
          >
            Conocer más sobre mí
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/12 bg-white/5 px-[22px] py-3.5 text-[15px] font-medium whitespace-nowrap backdrop-blur-[20px] transition-all duration-300 hover:bg-white/10 hover:text-white"
          >
            Ver CV
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
