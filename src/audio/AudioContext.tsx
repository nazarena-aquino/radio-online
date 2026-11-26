import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { station } from "../config/station";
import type { PlayerStatus } from "../types";
import { isPlaybackActive } from "./playerUi";

interface RadioAudioValue {
  status: PlayerStatus;
  isPlaying: boolean;
  isBuffering: boolean;
  error: string | null;
  volume: number;
  isMuted: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  retry: () => void;
  setVolume: (value: number) => void;
  toggleMute: () => void;
}

const RadioAudioContext = createContext<RadioAudioValue | null>(null);

const STREAM_URL = station.streamUrl;

/**
 * Un único HTMLAudioElement para todo el sitio.
 * El header, el hero, el reproductor y el footer comparten este estado:
 * nunca se abren conexiones de audio duplicadas.
 */
export function AudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("idle");
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolumeState] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";
    audio.volume = 0.8;
    audioRef.current = audio;

    const handlePlaying = () => {
      setStatus("playing");
      setIsBuffering(false);
      setError(null);
    };

    const handlePause = () => {
      setStatus((current) => (current === "error" ? current : "paused"));
      setIsBuffering(false);
    };

    const handleWaiting = () => {
      setIsBuffering(true);
    };

    const handleError = () => {
      setStatus("error");
      setIsBuffering(false);
      setError(
        "No pudimos conectar con la transmisión. Revisá tu conexión e intentá de nuevo.",
      );
    };

    audio.addEventListener("playing", handlePlaying);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("waiting", handleWaiting);
    audio.addEventListener("stalled", handleWaiting);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("playing", handlePlaying);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("waiting", handleWaiting);
      audio.removeEventListener("stalled", handleWaiting);
      audio.removeEventListener("error", handleError);
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = isMuted;
  }, [volume, isMuted]);

  const start = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!STREAM_URL) {
      setStatus("error");
      setError("La URL de la transmisión no está configurada.");
      return;
    }

    setError(null);
    setStatus("loading");
    setIsBuffering(true);

    try {
      // Reconectar siempre al borde en vivo: una pausa larga deja el buffer viejo.
      audio.src = STREAM_URL;
      audio.load();

      const playback = audio.play();
      if (playback) {
        void playback.catch(() => {
          setStatus("error");
          setIsBuffering(false);
          setError(
            "No pudimos iniciar la transmisión. Puede que el navegador haya bloqueado el audio o que la señal no esté disponible.",
          );
        });
      }
    } catch {
      setStatus("error");
      setIsBuffering(false);
      setError("No pudimos iniciar la transmisión. Intentá de nuevo.");
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (isPlaybackActive(status)) {
      pause();
    } else {
      start();
    }
  }, [status, pause, start]);

  const retry = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setError(null);
    setStatus("loading");
    setIsBuffering(true);
    audio.src = STREAM_URL;
    audio.load();

    const playback = audio.play();
    if (playback) {
      void playback.catch(() => {
        setStatus("error");
        setIsBuffering(false);
        setError(
          "La transmisión sigue sin responder. Probá de nuevo en unos segundos.",
        );
      });
    }
  }, []);

  const setVolume = useCallback((value: number) => {
    const next = Math.min(1, Math.max(0, value));
    setVolumeState(next);
    if (next > 0) setIsMuted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((current) => !current);
  }, []);

  const value = useMemo<RadioAudioValue>(
    () => ({
      status,
      isPlaying: status === "playing",
      isBuffering,
      error,
      volume,
      isMuted,
      play: start,
      pause,
      toggle,
      retry,
      setVolume,
      toggleMute,
    }),
    [
      status,
      isBuffering,
      error,
      volume,
      isMuted,
      start,
      pause,
      toggle,
      retry,
      setVolume,
      toggleMute,
    ],
  );

  return (
    <RadioAudioContext.Provider value={value}>
      {children}
    </RadioAudioContext.Provider>
  );
}

export function useAudio(): RadioAudioValue {
  const context = useContext(RadioAudioContext);
  if (!context) {
    throw new Error("useAudio debe usarse dentro de <AudioProvider>");
  }
  return context;
}
