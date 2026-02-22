"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PHRASES = [
  "soluciones tecnológicas",
  "experiencias únicas",
  "plataformas modernas",
];

const Hero = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = PHRASES[phraseIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentPhrase.length) {
            setDisplayText(currentPhrase.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(currentPhrase.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % PHRASES.length);
          }
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 sm:px-8 lg:px-16 xl:px-60 pt-24 sm:pt-28 lg:pt-32 pb-16"
    >
      <div className="w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center space-y-5 sm:space-y-6 lg:space-y-7"
        >
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="space-y-2 sm:space-y-3"
          >
            {/* Profile Picture - Only on small screens */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              className="md:hidden flex justify-center mb-6"
            >
              <img
                src="/foto-perfil.png"
                alt="Foto de perfil"
                className="w-48 h-48 rounded-full shadow-xl border-4 border-primary object-cover"
              />
            </motion.div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Transformando ideas en
            </h1>
            <div className="relative flex items-center justify-center">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary">
                {displayText}
                <span className="animate-pulse ml-0.5">|</span>
              </span>
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Desarrollador Full Stack especializado en crear aplicaciones web
            modernas con arquitectura sólida y experiencias excepcionales.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-3"
          >
            <motion.a
              href="#about-me"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-full hover:opacity-95 transition-all duration-50 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl cursor-pointer"
            >
              Conocer más sobre mí
            </motion.a>
            <motion.button
              onClick={() => window.open('/cv.pdf', '_blank')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-full sm:w-auto bg-gray-100/5 text-foreground border-2 border-border px-8 py-3 rounded-full hover:bg-accent hover:border-primary transition-all duration-50 text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl cursor-pointer"
            >
              Ver CV
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
