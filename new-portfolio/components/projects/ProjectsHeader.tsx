import Reveal from "../reveal";
import SectionLabel from "../section-label";

export const ProjectsHeader = () => {
  return (
    <header className="mb-10 flex sm:mb-16 flex-wrap items-end justify-between gap-6">
      <div className="flex flex-col gap-7">
        <SectionLabel number="02" label="PROYECTOS" />
        <Reveal
          as="h2"
          className="m-0 text-[clamp(36px,4.6vw,64px)] leading-[1.04] font-normal tracking-[-0.035em]"
        >
          Trabajo <span className="font-serif italic">seleccionado</span>
        </Reveal>
      </div>
      <Reveal as="p" className="m-0 max-w-[40ch] text-base leading-[1.6] text-ink-2">
        Soluciones innovadoras que combinan tecnología de vanguardia con
        experiencia de usuario excepcional
      </Reveal>
    </header>
  );
};
