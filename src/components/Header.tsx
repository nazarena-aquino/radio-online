import { useEffect, useState } from "react";
import { station } from "../config/station";
import { useAudio } from "../audio/AudioContext";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PauseIcon, PlayIcon } from "./Icons";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ block: "start" });
  }
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isPlaying, toggle } = useAudio();

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const handleNav = () => {
    setMenuOpen(false);
  };

  const handleListen = () => {
    const wasPlaying = isPlaying;
    toggle();
    if (!wasPlaying) scrollToSection("escuchar");
  };

  return (
    <header className="site-header">
      <div className="header__inner">
        <a
          className="header__brand"
          href="#inicio"
          aria-label="Rock & Pop 90.7 FM Formosa — Ir al inicio"
          onClick={handleNav}
        >
          <Logo variant="light" plate={false} className="logo--header" />
        </a>

        <nav className="header__nav" aria-label="Navegación principal">
          {station.nav.map((item) => (
            <a
              key={item.id}
              className="nav-link"
              href={`#${item.id}`}
              onClick={handleNav}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="btn btn--live header__listen"
            onClick={handleListen}
            aria-label={
              isPlaying
                ? "Pausar la radio en vivo"
                : "Escuchar la radio en vivo"
            }
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
            <span>{isPlaying ? "Pausar" : "Escuchar en vivo"}</span>
          </button>

          <button
            type="button"
            className="header__menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="mobile-menu"
        hidden={!menuOpen}
      >
        <nav aria-label="Navegación móvil">
          {station.nav.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="mobile-menu__link"
              onClick={handleNav}
            >
              <span>{item.label}</span>
              <span className="mobile-menu__arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="btn btn--live mobile-menu__listen"
          onClick={() => {
            handleListen();
            setMenuOpen(false);
          }}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
          {isPlaying ? "Pausar la radio" : "Escuchar en vivo"}
        </button>
      </div>
    </header>
  );
}
