import { useEffect } from "react";

/**
 * Revela con un fade-in los elementos marcados con `data-reveal` cuando
 * entran en el viewport. La clase `.js` la agrega un script inline en el
 * `<head>` para que el contenido siga visible si JavaScript no carga.
 */
export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );

    if (elements.length === 0) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    elements.forEach((element) => observer.observe(element));

    let ticking = false;

    function revealPassed() {
      const threshold = window.innerHeight * 0.92;
      let remaining = 0;

      elements.forEach((element) => {
        if (element.classList.contains("is-revealed")) return;

        if (element.getBoundingClientRect().top < threshold) {
          element.classList.add("is-revealed");
          observer.unobserve(element);
        } else {
          remaining += 1;
        }
      });

      if (remaining === 0) {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        revealPassed();
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
