import { getSocial, station } from "../config/station";
import { ArrowUpRightIcon } from "./Icons";

export function Sponsors() {
  const instagram = getSocial("instagram");

  if (station.sponsors.length === 0) {
    return (
      <div className="sponsor-slot">
        <div className="sponsor-slot__copy">
          <p className="sponsor-slot__title">Tu marca puede sonar acá.</p>
          <p className="sponsor-slot__text">
            Espacio disponible para auspiciantes. Consultanos para sumar tu
            marca a la 90.7.
          </p>
        </div>

        {instagram ? (
          <a
            className="text-link"
            href={instagram.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Consultar por auspicios
            <ArrowUpRightIcon />
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <ul className="sponsor-grid">
      {station.sponsors.map((sponsor) => (
        <li className="sponsor" key={sponsor.id}>
          {sponsor.url ? (
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${sponsor.name} (se abre en una pestaña nueva)`}
            >
              {sponsor.name}
            </a>
          ) : (
            <span>{sponsor.name}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
