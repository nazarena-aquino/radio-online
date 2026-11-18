import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { fetchNowPlaying } from "../services/azura";
import type { MetadataStatus, NowPlayingData } from "../types";

interface NowPlayingValue {
  data: NowPlayingData | null;
  status: MetadataStatus;
  refresh: () => void;
}

const NowPlayingContext = createContext<NowPlayingValue | null>(null);

const POLL_MS = 15_000;
const REQUEST_TIMEOUT_MS = 6_000;

/**
 * Una sola consulta periódica a la API pública para todo el sitio.
 * Se pausa cuando la pestaña está oculta y se reanuda al volver.
 */
export function NowPlayingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<NowPlayingData | null>(null);
  const [status, setStatus] = useState<MetadataStatus>("loading");
  const dataRef = useRef<NowPlayingData | null>(null);
  const failuresRef = useRef(0);
  const activeRef = useRef(true);

  const load = useCallback(async () => {
    const controller = new AbortController();
    const timeout = window.setTimeout(
      () => controller.abort(),
      REQUEST_TIMEOUT_MS,
    );

    try {
      const next = await fetchNowPlaying(controller.signal);
      if (!activeRef.current) return;

      if (next) {
        failuresRef.current = 0;
        dataRef.current = next;
        setData(next);
        setStatus("ready");
      } else {
        failuresRef.current += 1;
        // Un fallo aislado no borra la canción actual; dos seguidos sí.
        if (!dataRef.current || failuresRef.current >= 2) {
          setStatus("unavailable");
        }
      }
    } finally {
      window.clearTimeout(timeout);
    }
  }, []);

  useEffect(() => {
    activeRef.current = true;
    void load();

    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (!activeRef.current) return;
        if (document.visibilityState === "visible") void load();
        schedule();
      }, POLL_MS);
    };
    schedule();

    const onVisibility = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      activeRef.current = false;
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [load]);

  const refresh = useCallback(() => {
    failuresRef.current = 0;
    setStatus("loading");
    void load();
  }, [load]);

  return (
    <NowPlayingContext.Provider value={{ data, status, refresh }}>
      {children}
    </NowPlayingContext.Provider>
  );
}

export function useNowPlaying(): NowPlayingValue {
  const context = useContext(NowPlayingContext);
  if (!context) {
    throw new Error("useNowPlaying debe usarse dentro de <NowPlayingProvider>");
  }
  return context;
}
