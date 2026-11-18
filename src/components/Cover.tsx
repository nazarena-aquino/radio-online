import logoMark from "../assets/logo-mark.png";

interface CoverProps {
  size?: "sm" | "lg";
}

/**
 * Portada gráfica fija de la emisora.
 * Usa el logo real sobre la tarjeta de marca para que el arte dinámico de
 * AzuraCast no cambie el tamaño del bloque.
 */
export function Cover({ size = "lg" }: CoverProps) {
  const className = `cover cover--${size} cover--brand`;

  return (
    <div className={className} aria-hidden="true">
      <div className="cover__frame">
        <div className="cover__card">
          <div className="cover__top">
            <span>FM</span>
            <span>90.7</span>
          </div>
          <div className="cover__logo">
            <img
              src={logoMark}
              alt=""
              width={800}
              height={503}
              decoding="async"
            />
          </div>
        </div>
        <div className="cover__bottom">Formosa · Argentina</div>
      </div>
    </div>
  );
}
