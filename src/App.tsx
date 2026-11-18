import { AudioProvider } from "./audio/AudioContext";
import { NowPlayingProvider } from "./hooks/useNowPlaying";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Hero } from "./sections/Hero";
import { ListenSection } from "./sections/ListenSection";
import { NowPlayingSection } from "./sections/NowPlayingSection";
import { ScheduleSection } from "./sections/ScheduleSection";
import { BrandSection } from "./sections/BrandSection";
import { SocialSection } from "./sections/SocialSection";
import { SponsorsSection } from "./sections/SponsorsSection";
import { ContactSection } from "./sections/ContactSection";
import { useScrollReveal } from "./hooks/useScrollReveal";

export default function App() {
  useScrollReveal();

  return (
    <AudioProvider>
      <NowPlayingProvider>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido">
          <Hero />
          <ListenSection />
          <NowPlayingSection />
          <ScheduleSection />
          <BrandSection />
          <SocialSection />
          <SponsorsSection />
          <ContactSection />
        </main>
        <Footer />
      </NowPlayingProvider>
    </AudioProvider>
  );
}
