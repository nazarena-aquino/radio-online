import type { PlayerStatus } from "../types";

export type PlaybackIcon = "play" | "pause" | "retry";

export interface PlaybackUiState {
  /** `true` mientras suena o se está conectando; el botón debe ofrecer pausa. */
  isActive: boolean;
  /** `true` mientras se establece la conexión o se recarga el buffer. */
  isLoading: boolean;
  label: string;
  ariaLabel: string;
  icon: PlaybackIcon;
}

/**
 * El estado del reproductor vive únicamente en AudioContext.
 * Esta función solo lo traduce a la interfaz para que Header, Hero y el menú
 * móvil muestren siempre la misma acción y el mismo texto.
 */
export function isPlaybackActive(status: PlayerStatus): boolean {
  return status === "playing" || status === "loading";
}

export function getPlaybackUiState(
  status: PlayerStatus,
  isBuffering: boolean,
): PlaybackUiState {
  if (status === "error") {
    return {
      isActive: false,
      isLoading: false,
      label: "Reintentar",
      ariaLabel: "Reintentar la conexión con la radio en vivo",
      icon: "retry",
    };
  }

  if (status === "loading") {
    return {
      isActive: true,
      isLoading: true,
      label: "Conectando…",
      ariaLabel: "Cancelar la conexión con la radio en vivo",
      icon: "pause",
    };
  }

  if (status === "playing" && isBuffering) {
    return {
      isActive: true,
      isLoading: true,
      label: "Cargando…",
      ariaLabel: "Pausar la radio en vivo",
      icon: "pause",
    };
  }

  if (status === "playing") {
    return {
      isActive: true,
      isLoading: false,
      label: "Pausar",
      ariaLabel: "Pausar la radio en vivo",
      icon: "pause",
    };
  }

  return {
    isActive: false,
    isLoading: false,
    label: "Escuchar en vivo",
    ariaLabel: "Escuchar la radio en vivo",
    icon: "play",
  };
}
