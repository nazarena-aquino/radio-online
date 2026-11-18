import { LivePlayer } from "../components/LivePlayer";
import { SectionHeading } from "../components/SectionHeading";

export function ListenSection() {
  return (
    <section
      id="escuchar"
      className="section section--light listen"
      aria-labelledby="listen-title"
    >
      <div className="container">
        <SectionHeading
          id="listen-title"
          index="01"
          title="Escuchar en vivo"
          kicker="La 90.7, en tiempo real."
        />
        <div data-reveal data-reveal-delay="1">
          <LivePlayer />
        </div>
      </div>
    </section>
  );
}
