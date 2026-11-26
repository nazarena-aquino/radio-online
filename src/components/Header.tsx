import { useEffect, useRef, useState } from "react";
import { station } from "../config/station";
import { useAudio } from "../audio/AudioContext";
import { getPlaybackUiState } from "../audio/playerUi";
import { Logo } from "./Logo";
import { CloseIcon, MenuIcon, PauseIcon, PlayIcon, RetryIcon } from "./Icons";

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ block: "start" });
  }
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(station.nav[0].id);
  const headerRef = useRef<HTMLElement | null>(null);
  const { status, isBuffering, toggle } = useAudio();
  const playback = getPlaybackUiState(status, isBuffering);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const ids = station.nav.map((item) => item.id);
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (sections.length === 0) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const headerHeight = headerRef.current?.offsetHeight ?? 84;
      const probe = window.scrollY + headerHeight + 28;
      let current = ids[0];

      for (const section of sections) {
        const top = section.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = section.id;
      }

      const documentHeight = document.documentElement.scrollHeight;
      if (window.innerHeight + window.scrollY >= documentHeight - 2) {
        current = ids[ids.length - 1];
      }

      setActiveId((previous) => (previous === current ? previous : current));
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    const initialFrame = window.requestAnimationFrame(update);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [menuOpen]);

  const handleNav = () => {
    setMenuOpen(false);
  };

  const handleListen = () => {
    const wasActive = playback.isActive;
    toggle();
    if (!wasActive) scrollToSection("escuchar");
  };

  const renderPlaybackIcon = () => {
    if (playback.icon === "pause") return <PauseIcon />;
    if (playback.icon === "retry") return <RetryIcon />;
    return <PlayIcon />;
  };

  return (
    <header className="site-header" ref={headerRef}>
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
          {station.nav.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                className={`nav-link${isActive ? " is-active" : ""}`}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={handleNav}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className={`btn btn--live header__listen${
              playback.isActive ? " is-active" : ""
            }${playback.isLoading ? " is-loading" : ""}`}
            onClick={handleListen}
            aria-label={playback.ariaLabel}
            aria-pressed={playback.isActive}
            aria-busy={playback.isLoading}
          >
            <span className="header__listen-icon" aria-hidden="true">
              {renderPlaybackIcon()}
            </span>
            <span className="header__listen-label">{playback.label}</span>
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

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <nav aria-label="Navegación móvil">
          {station.nav.map((item) => {
            const isActive = activeId === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`mobile-menu__link${isActive ? " is-active" : ""}`}
                aria-current={isActive ? "location" : undefined}
                onClick={handleNav}
              >
                <span>{item.label}</span>
                <span className="mobile-menu__arrow" aria-hidden="true">
                  ↗
                </span>
              </a>
            );
          })}
        </nav>

        <button
          type="button"
          className="btn btn--live mobile-menu__listen"
          onClick={() => {
            handleListen();
            setMenuOpen(false);
          }}
          aria-pressed={playback.isActive}
          aria-busy={playback.isLoading}
        >
          {renderPlaybackIcon()}
          {playback.label}
        </button>
      </div>
    </header>
  );
}
