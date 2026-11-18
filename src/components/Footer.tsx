import { useAudio } from "../audio/AudioContext";
import { station } from "../config/station";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { MailIcon, PauseIcon, PlayIcon } from "./Icons";

export function Footer() {
  const { isPlaying, toggle } = useAudio();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer__grid">
        <div className="footer__brand" data-reveal>
          <Logo variant="light" plate={false} className="logo--footer" />
          <p className="footer__tagline">{station.description}</p>
          <p className="footer__location">{station.location}</p>
        </div>

        <nav className="footer__nav" aria-label="Navegación del pie de página" data-reveal data-reveal-delay="1">
          <p className="footer__heading">Secciones</p>
          {station.nav.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="footer__contact" data-reveal data-reveal-delay="2">
          <p className="footer__heading">Contacto</p>
          <SocialLinks className="social-links--footer" />
          <a
            className="social-link footer__email"
            href={`mailto:${station.email}`}
          >
            <MailIcon />
            <span>{station.email}</span>
          </a>
          <button
            type="button"
            className="btn btn--live footer__listen"
            onClick={toggle}
            aria-label={
              isPlaying
                ? "Pausar la radio en vivo"
                : "Escuchar la radio en vivo"
            }
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            {isPlaying ? "Pausar" : "Escuchar en vivo"}
          </button>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {year} {station.fullName}. Todos los derechos reservados.
        </p>
        <p>
          {station.band} {station.frequency} · {station.location}
        </p>
      </div>
    </footer>
  );
}
