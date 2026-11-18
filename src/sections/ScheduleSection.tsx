import { ProgramSchedule } from "../components/ProgramSchedule";
import { SectionHeading } from "../components/SectionHeading";

export function ScheduleSection() {
  return (
    <section
      id="programacion"
      className="section section--dark schedule"
      aria-labelledby="schedule-title"
    >
      <div className="container">
        <SectionHeading
          id="schedule-title"
          index="03"
          title="Nuestra programación"
          kicker="La grilla de la radio."
          tone="dark"
        />
        <div data-reveal data-reveal-delay="1">
          <ProgramSchedule />
        </div>
      </div>
    </section>
  );
}
