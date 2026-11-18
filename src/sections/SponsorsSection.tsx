import { Sponsors } from "../components/Sponsors";

export function SponsorsSection() {
  return (
    <section
      id="auspiciantes"
      className="section section--white sponsors"
      aria-labelledby="sponsors-title"
    >
      <div className="container">
        <div className="sponsors__head" data-reveal>
          <h2 id="sponsors-title" className="sponsors__title">
            Auspiciantes
          </h2>
          <p className="sponsors__note">
            Espacio disponible para marcas y proyectos.
          </p>
        </div>
        <div data-reveal data-reveal-delay="1">
          <Sponsors />
        </div>
      </div>
    </section>
  );
}
