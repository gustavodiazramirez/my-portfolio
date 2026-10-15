"use client";

import { useEffect, useRef } from "react";

// Opacidad de los orbes de luz (el prototipo usa 0.7; probado también 0.2).
export const LIGHT_INTENSITY = 0.7;

// Luz de cursor: intensidad (alpha del centro), tamaño y suavidad del seguimiento (lerp).
const CURSOR_ALPHA = 0.065;
const CURSOR_SIZE = 640;
const CURSOR_LERP = 0.07;

const Background = () => {
  const orbA = useRef<HTMLDivElement>(null);
  const orbB = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const withCursor = desktop && !reduced;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 3;
    let cx = mx;
    let cy = my;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    if (withCursor) window.addEventListener("mousemove", onMove);

    let frame = 0;
    const loop = () => {
      cx += (mx - cx) * CURSOR_LERP;
      cy += (my - cy) * CURSOR_LERP;
      if (glow.current) glow.current.style.transform = `translate(${cx}px,${cy}px)`;
      const y = window.scrollY;
      if (orbA.current) orbA.current.style.translate = `0 ${y * -0.15}px`;
      if (orbB.current) orbB.current.style.translate = `0 ${y * -0.3}px`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div
          ref={orbA}
          className="animate-drift-a absolute top-[-18vh] left-[-12vw] h-[70vw] max-h-[980px] w-[70vw] max-w-[980px] rounded-full blur-[40px]"
          style={{
            background: "radial-gradient(circle at center, oklch(0.62 0.14 240 / 0.55), transparent 62%)",
            opacity: LIGHT_INTENSITY,
          }}
        />
        <div
          ref={orbB}
          className="animate-drift-b absolute top-[40vh] right-[-18vw] h-[60vw] max-h-[860px] w-[60vw] max-w-[860px] rounded-full blur-[50px]"
          style={{
            background: "radial-gradient(circle at center, oklch(0.58 0.14 295 / 0.45), transparent 62%)",
            opacity: LIGHT_INTENSITY,
          }}
        />
        <div className="bg-grid absolute inset-0" />
        <div className="grain absolute inset-[-50%] opacity-[0.06]" />
      </div>
      {/* Luz de cursor: solo en desktop y sin reduced-motion */}
      <div
        ref={glow}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[1] hidden rounded-full mix-blend-screen motion-safe:[@media(hover:hover)_and_(pointer:fine)]:block"
        style={{
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          margin: `${-CURSOR_SIZE / 2}px 0 0 ${-CURSOR_SIZE / 2}px`,
          background: `radial-gradient(circle, oklch(0.85 0.08 230 / ${CURSOR_ALPHA}), oklch(0.85 0.08 230 / ${CURSOR_ALPHA / 3}) 35%, transparent 68%)`,
          transform: "translate(-999px,-999px)",
        }}
      />
    </>
  );
};

export default Background;
