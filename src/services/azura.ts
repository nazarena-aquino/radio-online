import { station } from "../config/station";
import type { NowPlayingData, SongMetadata } from "../types";

interface AzuraSong {
  artist?: string | null;
  title?: string | null;
  album?: string | null;
  art?: string | null;
  text?: string | null;
}

interface AzuraNowPlaying {
  is_online?: boolean;
  live?: { is_live?: boolean } | null;
  listeners?: { current?: number } | null;
  now_playing?: { song?: AzuraSong | null } | null;
}

/**
 * AzuraCast devuelve una portada genérica cuando la canción no tiene arte propio.
 * No la mostramos como si fuera la portada real.
 */
const GENERIC_ART = /generic_song|generic_album|default_album|album-art\.jpg/i;

function clean(value: string | null | undefined): string {
  return (value ?? "").trim();
}

function pickArt(art: string | null | undefined): string | null {
  const url = clean(art);
  if (!url || GENERIC_ART.test(url)) return null;
  return url;
}

function toSong(song: AzuraSong | null | undefined): SongMetadata | null {
  if (!song) return null;

  const artist = clean(song.artist);
  const title = clean(song.title);
  if (!artist && !title) return null;

  const fallbackText = [artist, title].filter(Boolean).join(" — ");

  return {
    artist,
    title,
    album: clean(song.album),
    art: pickArt(song.art),
    text: clean(song.text) || fallbackText,
  };
}

/**
 * Consulta la API pública de AzuraCast.
 * Devuelve null ante cualquier fallo para que la UI pueda mostrar un estado
 * de "metadatos no disponibles" sin inventar información.
 */
export async function fetchNowPlaying(
  signal?: AbortSignal,
): Promise<NowPlayingData | null> {
  const base = station.apiUrl.replace(/\/$/, "");
  const url = `${base}/nowplaying/${station.stationShortcode}`;

  try {
    const response = await fetch(url, {
      signal,
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as AzuraNowPlaying;

    return {
      song: toSong(payload.now_playing?.song),
      listeners: Math.max(0, payload.listeners?.current ?? 0),
      isOnline: Boolean(payload.is_online),
      isLive: Boolean(payload.live?.is_live),
      updatedAt: Date.now(),
    };
  } catch {
    return null;
  }
}
