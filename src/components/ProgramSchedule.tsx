import { getSocial, station } from "../config/station";
import { ArrowUpRightIcon } from "./Icons";

export function ProgramSchedule() {
  const instagram = getSocial("instagram");

  if (station.schedule.length === 0) {
    return (
      <div className="schedule-empty">
        <span className="schedule-empty__mark" aria-hidden="true">
          PROGRAMACIÓN
        </span>
        <div className="schedule-empty__body">
          <p className="eyebrow">
            <span className="red-square" aria-hidden="true" />
            Grilla en preparación
          </p>
          <h3 className="schedule-empty__title">
            La programación está en camino.
          </h3>
          <p className="schedule-empty__text">
            Estamos actualizando la grilla de programas. Mientras tanto, la
            música de la 90.7 no para.
          </p>
          <div className="schedule-empty__actions">
            <a className="btn btn--primary" href="#escuchar">
              Escuchar en vivo
            </a>
            {instagram ? (
              <a
                className="btn btn--ghost"
                href={instagram.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver novedades en Instagram
                <ArrowUpRightIcon />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul className="schedule-grid">
      {station.schedule.map((program, index) => (
        <li className="program" key={program.id}>
          <span className="program__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="program__name">{program.name}</h3>
          <p className="program__time">
            {program.day} · {program.time}
          </p>
          {program.description ? (
            <p className="program__desc">{program.description}</p>
          ) : null}
          {program.host ? (
            <p className="program__host">Con {program.host}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
