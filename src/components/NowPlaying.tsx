import { useNowPlaying } from "../hooks/useNowPlaying";
import { Cover } from "./Cover";
import { ArrowUpRightIcon } from "./Icons";

function formatUpdated(updatedAt: number | undefined): string {
  if (!updatedAt) return "—";
  const seconds = Math.max(0, Math.round((Date.now() - updatedAt) / 1000));
  if (seconds < 10) return "ahora";
  if (seconds < 60) return `hace ${seconds}s`;
  const minutes = Math.round(seconds / 60);
  return `hace ${minutes} min`;
}

export function NowPlaying() {
  const { data, status } = useNowPlaying();

  const online = data?.isOnline;
  const song = status === "ready" && online ? data?.song ?? null : null;
  const unavailable = status === "unavailable";
  const offline = status === "ready" && data !== null && !online;

  let signalText = "—";
  if (status === "loading") signalText = "Verificando";
  else if (unavailable) signalText = "Sin datos";
  else if (online === true) signalText = "En línea";
  else if (online === false) signalText = "Fuera de línea";

  const renderInfo = () => {
    if (status === "loading") {
      return (
        <>
          <h3 className="now-playing__title now-playing__title--muted">
            Buscando información
          </h3>
          <p className="now-playing__meta">
            Consultando los datos de la radio.
          </p>
        </>
      );
    }

    if (unavailable) {
      return (
        <>
          <h3 className="now-playing__title now-playing__title--muted">
            Metadatos no disponibles
          </h3>
          <p className="now-playing__meta">
            No pudimos obtener la información de la canción. La radio puede
            seguir al aire y los datos se actualizan automáticamente.
          </p>
        </>
      );
    }

    if (offline) {
      return (
        <>
          <h3 className="now-playing__title now-playing__title--muted">
            Señal no disponible
          </h3>
          <p className="now-playing__meta">
            La transmisión figura fuera de línea en este momento.
          </p>
        </>
      );
    }

    if (song) {
      return (
        <>
          {song.artist ? (
            <p className="now-playing__artist">{song.artist}</p>
          ) : null}
          <h3 className="now-playing__title">
            {song.title || "Título no disponible"}
          </h3>
          {song.album ? (
            <p className="now-playing__album">{song.album}</p>
          ) : null}
        </>
      );
    }

    return (
      <>
        <h3 className="now-playing__title now-playing__title--muted">
          Música en vivo
        </h3>
        <p className="now-playing__meta">
          Sin datos de la canción en este momento.
        </p>
      </>
    );
  };

  return (
    <div className="now-playing">
      <div className="now-playing__cover-wrap">
        <Cover song={song} size="lg" />
        <span className="now-playing__stamp">90.7 FM</span>
      </div>

      <div className="now-playing__info">
        {renderInfo()}

        <dl className="now-playing__facts">
          <div>
            <dt>Señal</dt>
            <dd>{signalText}</dd>
          </div>
          <div>
            <dt>Actualizado</dt>
            <dd>{formatUpdated(data?.updatedAt)}</dd>
          </div>
        </dl>

        <a className="text-link" href="#escuchar">
          Ir al reproductor
          <ArrowUpRightIcon />
        </a>
      </div>
    </div>
  );
}
