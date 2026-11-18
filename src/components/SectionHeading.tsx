import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  index: string;
  title: ReactNode;
  kicker?: string;
  tone?: "dark" | "light";
}

export function SectionHeading({
  id,
  index,
  title,
  kicker,
  tone = "light",
}: SectionHeadingProps) {
  return (
    <header className={`section-heading section-heading--${tone}`} data-reveal>
      <span className="section-heading__index" aria-hidden="true">
        {index}
      </span>
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {kicker ? <p className="section-heading__kicker">{kicker}</p> : null}
    </header>
  );
}
