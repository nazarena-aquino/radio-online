import type { SongMetadata } from "../types";

interface CoverProps {
  song: SongMetadata | null;
  size?: "sm" | "lg";
}

/**
 * Portada de la canción. Si AzuraCast no entrega un arte real, se usa una
 * portada gráfica de la emisora (no se inventa una imagen de disco).
 */
export function Cover({ song, size = "lg" }: CoverProps) {
  const className = `cover cover--${size}`;

  if (song?.art) {
    return (
      <img
        className={className}
        src={song.art}
        alt={
          song.title
            ? `Portada de ${song.title}${song.artist ? `, de ${song.artist}` : ""}`
            : "Portada de la canción en reproducción"
        }
        width={600}
        height={600}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div className={`${className} cover--fallback`} aria-hidden="true">
      <span className="cover__freq">90.7</span>
      <span className="cover__fm">FM</span>
      <span className="cover__place">FORMOSA</span>
    </div>
  );
}
