import logoMark from "../assets/logo-mark.png";
import logoMarkWhite from "../assets/logo-mark-white.png";

interface LogoProps {
  /** `plate` pone el logo sobre una placa clara para que el arte negro se lea. */
  plate?: boolean;
  /** `light` usa la versión blanca para fondos oscuros; `dark` es el arte negro original. */
  variant?: "dark" | "light";
  className?: string;
  /** Para usos decorativos: el texto alternativo queda vacío y lo aporta el contexto. */
  decorative?: boolean;
  alt?: string;
}

/**
 * Logo original de Rock & Pop 90.7 FM Formosa.
 * Se usa el archivo entregado, recortado únicamente de sus márgenes transparentes
 * para que sea legible en tamaños chicos. El arte no se redibuja ni se deforma;
 * la variante clara reutiliza el mismo contorno en blanco para fondos oscuros.
 */
export function Logo({
  plate = true,
  variant = "dark",
  className = "",
  decorative = false,
  alt = "Rock & Pop 90.7 FM Formosa",
}: LogoProps) {
  const src = variant === "light" ? logoMarkWhite : logoMark;

  return (
    <span className={`logo ${plate ? "logo--plate" : ""} ${className}`.trim()}>
      <img
        className="logo__image"
        src={src}
        alt={decorative ? "" : alt}
        width={800}
        height={503}
        decoding="async"
      />
    </span>
  );
}
