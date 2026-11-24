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

  const hasFeatured = station.sponsors.some((sponsor) => sponsor.image);

  return (
    <ul className={`sponsor-grid${hasFeatured ? " sponsor-grid--featured" : ""}`}>
      {station.sponsors.map((sponsor) => {
        if (sponsor.image) {
          const cardContent = (
            <>
              <span className="sponsor__media">
                <img
                  className="sponsor__image"
                  src={sponsor.image}
                  alt={`${sponsor.name}${
                    sponsor.description ? ` — ${sponsor.description}` : ""
                  }`}
                  loading="lazy"
                />
              </span>
              <span className="sponsor__body">
                <span className="sponsor__kicker">Auspiciante</span>
                <span className="sponsor__name">{sponsor.name}</span>
                {sponsor.description ? (
                  <span className="sponsor__description">
                    {sponsor.description}
                  </span>
                ) : null}
                <span className="sponsor__cta">
                  {sponsor.cta ?? "Ver más"}
                  <ArrowUpRightIcon />
                </span>
              </span>
            </>
          );

          return (
            <li className="sponsor sponsor--featured" key={sponsor.id}>
              {sponsor.url ? (
                <a
                  className="sponsor__card"
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${sponsor.name}${
                    sponsor.description ? `, ${sponsor.description}` : ""
                  } (se abre en una pestaña nueva)`}
                >
                  {cardContent}
                </a>
              ) : (
                <div className="sponsor__card">{cardContent}</div>
              )}
            </li>
          );
        }

        return (
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
        );
      })}
    </ul>
  );
}
