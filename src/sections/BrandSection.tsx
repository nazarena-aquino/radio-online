import { Logo } from "../components/Logo";
import { station } from "../config/station";

export function BrandSection() {
  return (
    <section
      id="la-radio"
      className="section section--light brand"
      aria-labelledby="brand-title"
    >
      <div className="container brand__grid">
        <div className="brand__copy" data-reveal>
          <p className="eyebrow">
            <span className="red-square" aria-hidden="true" />
            La radio
          </p>
          <h2 id="brand-title" className="brand__title">
            Rock, pop y actitud desde Formosa.
          </h2>
          <p className="brand__text">
            {station.fullName} transmite desde {station.location}. Una
            frecuencia para la música, la actitud y la cultura rockera de la
            ciudad.
          </p>
          <dl className="brand__facts">
            <div>
              <dt>Frecuencia</dt>
              <dd>90.7 FM</dd>
            </div>
            <div>
              <dt>Ubicación</dt>
              <dd>Formosa, Argentina</dd>
            </div>
            <div>
              <dt>Transmisión</dt>
              <dd>FM + online</dd>
            </div>
          </dl>
        </div>

        <div className="brand__visual" aria-hidden="true" data-reveal data-reveal-delay="1">
          <span className="brand__big-number">90.7</span>
          <div className="brand__logo-plate">
            <Logo plate={false} decorative />
          </div>
          <span className="brand__vertical">Rock &amp; Pop · Formosa</span>
        </div>
      </div>
    </section>
  );
}
