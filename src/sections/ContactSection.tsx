import { getSocial, station } from "../config/station";
import {
  ArrowUpRightIcon,
  InstagramIcon,
  MailIcon,
} from "../components/Icons";

export function ContactSection() {
  const instagram = getSocial("instagram");

  return (
    <section
      id="contacto"
      className="section section--dark contact"
      aria-labelledby="contact-title"
    >
      <div className="container contact__grid">
        <div className="contact__copy" data-reveal>
          <p className="eyebrow">
            <span className="red-square" aria-hidden="true" />
            Contacto
          </p>
          <h2 id="contact-title" className="contact__title">
            Hablemos.
          </h2>
          <p className="contact__text">
            Elegí el canal que prefieras: Instagram o mail. Consultas, prensa y
            auspicios.
          </p>
          <div className="contact__actions">
            {instagram ? (
              <a
                className="btn btn--primary btn--lg"
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
                Escribinos por Instagram
                <ArrowUpRightIcon />
              </a>
            ) : null}
            <a
              className="btn btn--ghost btn--lg"
              href={`mailto:${station.email}`}
            >
              <MailIcon />
              Escribinos por mail
            </a>
          </div>
        </div>

        <div className="contact__card-reveal" data-reveal data-reveal-delay="1">
          <div className="contact__card">
            <p className="contact__card-label">La radio</p>
            <dl>
              <div>
                <dt>Emisora</dt>
                <dd>{station.fullName}</dd>
              </div>
              <div>
                <dt>Ubicación</dt>
                <dd>{station.location}</dd>
              </div>
              {instagram ? (
                <div>
                  <dt>Instagram</dt>
                  <dd>
                    <a
                      href={instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {instagram.handle}
                    </a>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${station.email}`}>{station.email}</a>
                </dd>
              </div>
              <div>
                <dt>Señal</dt>
                <dd>FM 90.7 + online</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
