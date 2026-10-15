"use client";

import type { AnchorHTMLAttributes } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

type RevealTag = "div" | "p" | "h1" | "h2" | "a";

type RevealProps = HTMLMotionProps<"div"> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "target" | "rel"> & {
    as?: RevealTag;
  };

// Aparición en scroll: opacidad + desplazamiento + desenfoque, una sola vez.
const Reveal = ({ as = "div", transition, ...props }: RevealProps) => {
  const reduced = useReducedMotion();
  const Component = motion[as] as typeof motion.div;

  if (reduced) return <Component {...props} />;

  return (
    <Component
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      // filter "none" al terminar: un filter residual rompe el backdrop-filter de los hijos glass
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1], ...transition }}
      {...props}
    />
  );
};

export default Reveal;
