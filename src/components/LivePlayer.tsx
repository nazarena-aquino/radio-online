import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useAudio } from "../audio/AudioContext";
import { getPlaybackUiState } from "../audio/playerUi";
import { useNowPlaying } from "../hooks/useNowPlaying";
import { Cover } from "./Cover";
import {
  ArrowDownIcon,
  MuteIcon,
  PauseIcon,
  PlayIcon,
  RetryIcon,
  VolumeIcon,
} from "./Icons";

type SignalState = "live" | "onair" | "offline" | "unknown";

const SIGNAL_LABEL: Record<SignalState, string> = {
  live: "EN VIVO",
  onair: "AL AIRE",
  offline: "SIN SEÑAL",
  unknown: "SIN DATOS",
};

function getSignalState(
  isPlaying: boolean,
  isOnline: boolean | undefined,
): SignalState {
  if (isOnline === undefined) return "unknown";
  if (!isOnline) return "offline";
  return isPlaying ? "live" : "onair";
}

export function LivePlayer() {
  const {
    status,
    isPlaying,
    isBuffering,
    error,
    volume,
    isMuted,
    toggle,
    retry,
    setVolume,
    toggleMute,
  } = useAudio();
  const { data, status: metadataStatus } = useNowPlaying();

  const playback = getPlaybackUiState(status, isBuffering);
  const signal = getSignalState(isPlaying, data?.isOnline);
  const metadataUnavailable = metadataStatus === "unavailable";
  const signalLabel =
    metadataStatus === "loading"
      ? "VERIFICANDO"
      : metadataUnavailable
        ? "SIN DATOS"
        : SIGNAL_LABEL[signal];
  const signalClass = metadataUnavailable ? "unknown" : signal;
  const volumePercent = isMuted ? 0 : Math.round(volume * 100);
  const playingNow = isPlaying && !isBuffering;

  const [metadataUpdating, setMetadataUpdating] = useState(false);
  const lastUpdatedRef = useRef(data?.updatedAt);

  useEffect(() => {
    const updatedAt = data?.updatedAt;
    if (!updatedAt || updatedAt === lastUpdatedRef.current) return;

    lastUpdatedRef.current = updatedAt;
    setMetadataUpdating(true);
    const timer = window.setTimeout(() => setMetadataUpdating(false), 900);
    return () => window.clearTimeout(timer);
  }, [data?.updatedAt]);

  const displaySong =
    metadataStatus === "ready" && data?.isOnline ? data.song : null;
  const songKey = displaySong
    ? `${displaySong.artist}|${displaySong.title}|${displaySong.album}`
    : metadataStatus;

  let stateLabel = "Listo para escuchar";
  if (status === "error") stateLabel = "Sin conexión";
  else if (status === "loading") stateLabel = "Conectando…";
  else if (isPlaying && isBuffering) stateLabel = "Recargando señal…";
  else if (isPlaying) stateLabel = "Reproduciendo en vivo";
  else if (status === "paused") stateLabel = "Transmisión en pausa";

  const renderNowPlaying = () => {
    if (metadataStatus === "loading") {
      return (
        <>
          <p className="player__song-title player__song-title--muted">
            Buscando información...
          </p>
          <p className="player__song-empty">
            Consultando los datos de la radio.
          </p>
        </>
      );
    }

    if (metadataStatus === "unavailable") {
      return (
        <>
          <p className="player__song-title player__song-title--muted">
            Metadatos no disponibles
          </p>
          <p className="player__song-empty">
            La radio puede seguir al aire. La información se actualiza sola.
          </p>
        </>
      );
    }

    if (data && !data.isOnline) {
      return (
        <>
          <p className="player__song-title player__song-title--muted">
            Señal no disponible
          </p>
          <p className="player__song-empty">
            La transmisión figura fuera de línea en este momento.
          </p>
        </>
      );
    }

    if (displaySong) {
      return (
        <>
          {displaySong.artist ? (
            <p className="player__song-artist">{displaySong.artist}</p>
          ) : null}
          <p className="player__song-title">
            {displaySong.title || "Título no disponible"}
          </p>
          {displaySong.album ? (
            <p className="player__song-album">{displaySong.album}</p>
          ) : null}
        </>
      );
    }

    return (
      <>
        <p className="player__song-title player__song-title--muted">
          Música en vivo
        </p>
        <p className="player__song-empty">
          Sin datos de la canción en este momento.
        </p>
      </>
    );
  };

  return (
    <section className="player" aria-labelledby="player-title">
      <div className="player__main">
        <div className="player__top">
          <p className={`player__badge player__badge--${signalClass}`}>
            <span className="player__badge-dot" aria-hidden="true" />
            {signalLabel}
            <span
              className={`eq ${playingNow ? "is-active" : ""}`}
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
            </span>
          </p>
        </div>

        <div className="player__controls">
          <button
            type="button"
            className={`player__play${playback.isActive ? " is-active" : ""}${
              playback.isLoading ? " is-loading" : ""
            }`}
            onClick={toggle}
            aria-label={playback.ariaLabel}
            aria-pressed={playback.isActive}
            aria-busy={playback.isLoading}
          >
            {playback.icon === "pause" ? (
              <PauseIcon />
            ) : playback.icon === "retry" ? (
              <RetryIcon />
            ) : (
              <PlayIcon />
            )}
          </button>

          <div className="player__station">
            <p className="player__eyebrow">Radio en vivo</p>
            <h3 id="player-title" className="player__name">
              Rock &amp; Pop
            </h3>
            <p className="player__freq">
              <strong>90.7</strong> FM · Formosa
            </p>
            <p className="player__state" role="status" aria-live="polite">
              {stateLabel}
            </p>
          </div>
        </div>

        {error ? (
          <div className="player__error" role="alert">
            <p>{error}</p>
            <button type="button" className="player__retry" onClick={retry}>
              <RetryIcon />
              Reintentar
            </button>
          </div>
        ) : null}

        <div className="player__footer">
          <div className="volume">
            <button
              type="button"
              className="volume__button"
              onClick={toggleMute}
              aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              aria-pressed={isMuted}
            >
              {isMuted || volume === 0 ? <MuteIcon /> : <VolumeIcon />}
            </button>
            <input
              className="volume__range"
              type="range"
              min={0}
              max={100}
              step={1}
              value={volumePercent}
              style={{ "--volume-progress": `${volumePercent}%` } as CSSProperties}
              onChange={(event) => setVolume(Number(event.target.value) / 100)}
              aria-label="Volumen de la radio"
              aria-valuetext={`${volumePercent} por ciento`}
            />
            <span className="volume__value" aria-hidden="true">
              {volumePercent}%
            </span>
          </div>

          <a className="player__link" href="#ahora-suena">
            Ver qué suena
            <ArrowDownIcon />
          </a>
        </div>
      </div>

      <div className="player__now">
        <Cover size="sm" />
        <div className="player__now-text">
          <div className="player__now-heading">
            <p className="player__eyebrow">Ahora suena</p>
            {metadataStatus === "loading" || metadataUpdating ? (
              <span className="player__now-updating" aria-hidden="true">
                Actualizando…
              </span>
            ) : null}
          </div>
          <div className="player__song" key={songKey}>
            {renderNowPlaying()}
          </div>
        </div>
      </div>
    </section>
  );
}
