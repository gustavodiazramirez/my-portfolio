"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
}

const SPRING = { type: "spring", stiffness: 520, damping: 28 } as const;
const SWAP = { duration: 0.35, ease: [0.22, 0.8, 0.24, 1] } as const;

const CopyButton = ({ text }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);
  // Cambia en cada copia para relanzar el anillo aunque ya esté en "Copiado"
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timeout);
  }, [copied, pulse]);

  const copy = () => {
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setPulse((p) => p + 1);
  };

  return (
    <MotionConfig reducedMotion="user">
      <motion.button
        onClick={copy}
        aria-live="polite"
        whileTap={{ scale: 0.94 }}
        animate={{
          scale: copied ? [1, 1.06, 1] : 1,
          backgroundColor: copied ? "oklch(0.86 0.12 155)" : "#eef0f3",
        }}
        transition={{ scale: { duration: 0.45, ease: "easeOut" }, backgroundColor: { duration: 0.4 } }}
        className="relative inline-flex min-w-[124px] items-center justify-center gap-2 overflow-visible rounded-full border-0 px-[18px] py-3 text-sm font-medium text-background"
      >
        {/* Anillo que se expande al copiar */}
        <AnimatePresence>
          {copied && (
            <motion.span
              key={pulse}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-full border border-[oklch(0.86_0.12_155)]"
              initial={{ opacity: 0.7, scale: 1 }}
              animate={{ opacity: 0, scale: 1.45 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Entrante y saliente se apilan en la misma celda del grid ([grid-area:1/1]) y se
            cruzan; sin mode="popLayout", que mide offsetTop y no funciona con <svg>. */}
        <span className="grid h-3.5 w-3.5 place-items-center">
          <AnimatePresence initial={false}>
            {copied ? (
              <motion.svg
                key="check"
                viewBox="0 0 24 24"
                className="h-3.5 w-3.5 [grid-area:1/1]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ scale: 0.4, rotate: -45, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0, filter: "blur(3px)" }}
                transition={SPRING}
              >
                {/* El check se "dibuja" */}
                <motion.path
                  d="M20 6 9 17l-5-5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
                />
              </motion.svg>
            ) : (
              <motion.span
                key="copy"
                className="grid place-items-center [grid-area:1/1]"
                initial={{ scale: 0.4, rotate: 90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0.4, rotate: -90, opacity: 0, filter: "blur(3px)" }}
                transition={SPRING}
              >
                <Copy className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* Etiqueta: sale hacia arriba con desenfoque, entra desde abajo */}
        <span className="inline-grid justify-items-start overflow-hidden">
          {/* Reserva el ancho de la palabra más larga para que el contenido no se corra */}
          <span aria-hidden="true" className="invisible [grid-area:1/1]">
            Copiado
          </span>
          <AnimatePresence initial={false}>
            <motion.span
              key={copied ? "copied" : "copy"}
              className="[grid-area:1/1]"
              initial={{ y: 14, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -14, opacity: 0, filter: "blur(4px)" }}
              transition={SWAP}
            >
              {copied ? "Copiado" : "Copiar"}
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.button>
    </MotionConfig>
  );
};

export default CopyButton;
