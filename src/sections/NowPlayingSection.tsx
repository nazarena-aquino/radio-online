import { NowPlaying } from "../components/NowPlaying";
import { SectionHeading } from "../components/SectionHeading";

export function NowPlayingSection() {
  return (
    <section
      id="ahora-suena"
      className="section section--white now-section"
      aria-labelledby="now-title"
    >
      <div className="container">
        <SectionHeading
          id="now-title"
          index="02"
          title="Ahora suena"
          kicker="Lo que está pasando en la 90.7."
        />
        <div data-reveal data-reveal-delay="1">
          <NowPlaying />
        </div>
      </div>
    </section>
  );
}
