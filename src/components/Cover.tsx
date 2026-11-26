import { useEffect, useState } from "react";

interface CoverProps {
  size?: "sm" | "lg";
  /** Carátula válida de los metadatos. Si falla al cargar, vuelve al arte de la emisora. */
  src?: string | null;
}

/**
 * Portada cuadrada del bloque "Ahora suena".
 * Sin una imagen válida mantiene la placa 90.7 FM / Formosa, que es la
 * identidad gráfica de la emisora. Con carátula válida la muestra recortada,
 * sin cambiar el tamaño del bloque.
 */
export function Cover({ size = "lg", src }: CoverProps) {
  const className = `cover cover--${size}`;
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const artUrl = src && !failed ? src : null;

  return (
    <div
      className={`${className} ${artUrl ? "cover--art" : "cover--fallback"}`}
      aria-hidden="true"
    >
      {artUrl ? (
        <img
          className="cover__image"
          src={artUrl}
          alt=""
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <span className="cover__freq">90.7</span>
          <span className="cover__fm">FM</span>
          <span className="cover__place">FORMOSA</span>
        </>
      )}
    </div>
  );
}
