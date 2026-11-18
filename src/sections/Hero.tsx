import { useAudio } from "../audio/AudioContext";
import { getSocial, station } from "../config/station";
import { Logo } from "../components/Logo";
import { Marquee } from "../components/Marquee";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  PauseIcon,
  PlayIcon,
} from "../components/Icons";

export function Hero() {
  const { isPlaying, toggle } = useAudio();
  const instagram = getSocial("instagram");

  const handleListen = () => {
    const wasPlaying = isPlaying;
    toggle();
    if (!wasPlaying) {
      document
        .getElementById("escuchar")
        ?.scrollIntoView({ block: "start" });
    }
  };

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy" data-reveal>
          <p className="eyebrow hero__eyebrow">
            <span className="red-square" aria-hidden="true" />
            {station.band} {station.frequency} · {station.location}
          </p>

          <h1 id="hero-title" className="hero__title">
            <span className="hero__line">{station.hero.line1}</span>
            <span className="hero__line">
              {station.hero.line2}{" "}
              <em className="hero__accent">{station.hero.accent}</em>
            </span>
          </h1>

          <p className="hero__lead">{station.hero.lead}</p>

          <div className="hero__actions">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={handleListen}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
              {isPlaying ? "Pausar" : "Escuchar en vivo"}
            </button>
            <a className="btn btn--ghost btn--lg" href="#la-radio">
              Conocé la radio
              <ArrowDownIcon />
            </a>
          </div>

          <dl className="hero__facts">
            <div>
              <dt>Frecuencia</dt>
              <dd>
                90.7 <span>FM</span>
              </dd>
            </div>
            <div>
              <dt>Desde</dt>
              <dd>Formosa, Argentina</dd>
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
                    <ArrowUpRightIcon />
                  </a>
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="hero__poster-wrap" data-reveal data-reveal-delay="1">
          <div className="hero__poster">
            <div className="poster__bar poster__bar--top">
              <span>FM</span>
              <span>90.7</span>
            </div>
            <Logo plate={false} decorative className="poster__logo" />
            <div className="poster__bar poster__bar--bottom">
              <span>Formosa · Argentina</span>
            </div>
          </div>
        </div>
      </div>

      <Marquee />
    </section>
  );
}
