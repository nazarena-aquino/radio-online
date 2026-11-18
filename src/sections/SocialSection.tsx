import { getSocial } from "../config/station";
import { SectionHeading } from "../components/SectionHeading";
import {
  ArrowUpRightIcon,
  InstagramIcon,
} from "../components/Icons";

export function SocialSection() {
  const instagram = getSocial("instagram");

  return (
    <section
      id="redes"
      className="section section--dark social"
      aria-labelledby="social-title"
    >
      <div className="container">
        <SectionHeading
          id="social-title"
          index="04"
          title="Seguinos"
          kicker="La radio, también en Instagram."
          tone="dark"
        />

        <div className="social__grid">
          <div className="social__cta" data-reveal>
            {instagram ? (
              <p className="social__handle">{instagram.handle}</p>
            ) : null}
            <p className="social__text">
              Novedades, música y la vida de la 90.7. Seguinos en Instagram.
            </p>
            {instagram ? (
              <a
                className="btn btn--primary btn--lg"
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
                Seguir en Instagram
                <ArrowUpRightIcon />
              </a>
            ) : null}
          </div>

          <div className="social__tiles" aria-hidden="true" data-reveal data-reveal-delay="1">
            <span className="social__tile social__tile--a">ROCK</span>
            <span className="social__tile social__tile--b">90.7</span>
            <span className="social__tile social__tile--c">FORMOSA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
