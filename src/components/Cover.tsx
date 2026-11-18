interface CoverProps {
  size?: "sm" | "lg";
}

/**
 * Portada gráfica fija de la emisora.
 * Se usa siempre para que el arte dinámico de AzuraCast no cambie el tamaño
 * del bloque en "Ahora suena" ni en el reproductor.
 */
export function Cover({ size = "lg" }: CoverProps) {
  const className = `cover cover--${size}`;

  return (
    <div className={`${className} cover--fallback`} aria-hidden="true">
      <span className="cover__freq">90.7</span>
      <span className="cover__fm">FM</span>
      <span className="cover__place">FORMOSA</span>
    </div>
  );
}
