import { useAudio } from "../audio/AudioContext";
import { getPlaybackUiState } from "../audio/playerUi";
import { getSocial, station } from "../config/station";
import { useNowPlaying } from "../hooks/useNowPlaying";
import type { MetadataStatus } from "../types";
import { Logo } from "../components/Logo";
import { Marquee } from "../components/Marquee";
import {
  ArrowDownIcon,
  ArrowUpRightIcon,
  PauseIcon,
  PlayIcon,
  RetryIcon,
} from "../components/Icons";

type LiveState = "live" | "offline" | "checking" | "unknown";

const LIVE_LABEL: Record<LiveState, string> = {
  live: "En vivo",
  offline: "Sin señal",
  checking: "Verificando",
  unknown: "Sin datos",
};

function getLiveState(
  status: MetadataStatus,
  isOnline: boolean | undefined,
): LiveState {
  if (status === "loading") return "checking";
  if (status === "ready" && isOnline === true) return "live";
  if (status === "ready" && isOnline === false) return "offline";
  return "unknown";
}

export function Hero() {
  const { status, isBuffering, toggle } = useAudio();
  const playback = getPlaybackUiState(status, isBuffering);
  const { data: nowPlaying, status: metadataStatus } = useNowPlaying();
  const liveState = getLiveState(metadataStatus, nowPlaying?.isOnline);
  const instagram = getSocial("instagram");

  const handleListen = () => {
    const wasActive = playback.isActive;
    toggle();
    if (!wasActive) {
      document
        .getElementById("escuchar")
        ?.scrollIntoView({ block: "start" });
    }
  };

  const renderPlaybackIcon = () => {
    if (playback.icon === "pause") return <PauseIcon />;
    if (playback.icon === "retry") return <RetryIcon />;
    return <PlayIcon />;
  };

  return (
    <section id="inicio" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__copy" data-reveal>
          <p className="eyebrow hero__eyebrow">
            <span className="red-square" aria-hidden="true" />
            <span>
              {station.band} {station.frequency} · {station.location}
            </span>
            <span className={`live-tag live-tag--${liveState}`}>
              <span className="live-tag__dot" aria-hidden="true" />
              {LIVE_LABEL[liveState]}
            </span>
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
              aria-pressed={playback.isActive}
              aria-busy={playback.isLoading}
            >
              {renderPlaybackIcon()}
              {playback.label}
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
          <div className="hero__poster-float">
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
      </div>

      <Marquee />
    </section>
  );
}
