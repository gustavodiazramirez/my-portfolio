import Reveal from "./reveal";

interface SectionLabelProps {
  number: string;
  label: string;
  className?: string;
}

const SectionLabel = ({ number, label, className = "" }: SectionLabelProps) => (
  <Reveal
    className={`flex items-center gap-4 font-mono text-xs tracking-[0.12em] text-ink-2 ${className}`}
  >
    <span>{number}</span>
    <span className="h-px w-12 bg-white/15" />
    <span>{label}</span>
  </Reveal>
);

export default SectionLabel;
