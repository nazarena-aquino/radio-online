import levitarFest from "../assets/levitar-fest.jpg";
import type { StationConfig } from "../types";

/**
 * Configuración central de la emisora.
 * Todos los datos editables del sitio viven acá: no duplicar valores en componentes.
 *
 * IMPORTANTE:
 * - `schedule` y `sponsors` quedan vacíos a propósito hasta tener datos reales.
 *   No inventar programas, horarios, conductores, marcas ni acuerdos comerciales.
 * - `socials` solo contiene Instagram porque es la única red confirmada.
 *   Para sumar otra red, agregar un objeto con su URL real; el sitio la muestra sola.
 */
export const station: StationConfig = {
  name: "Rock & Pop",
  fullName: "Rock & Pop 90.7 FM Formosa",
  footerName: "Rock&Pop 90.7 Formosa",
  frequency: "90.7",
  band: "FM",
  location: "Formosa, Argentina",
  country: "Argentina",
  description: "Rock, pop y actitud desde Formosa. La 90.7 suena en vivo.",

  hero: {
    line1: "EL ROCK",
    line2: "SUENA",
    accent: "ACÁ",
    lead: "Rock, pop y actitud desde Formosa. La 90.7 suena en vivo, para vos.",
  },

  streamUrl:
    import.meta.env.VITE_STREAM_URL ?? "https://radio.ceomultimedios.online/radio.mp3",
  apiUrl:
    import.meta.env.VITE_API_URL ?? "https://panel.ceomultimedios.online/api",
  stationShortcode:
    import.meta.env.VITE_STATION_SHORTCODE ?? "rock__pop_90.7_formosa",

  siteUrl: "https://ceomultimedios.online",
  email: "ceomultimedios2026@gmail.com",

  socials: [
    {
      id: "instagram",
      label: "Instagram",
      url: "https://www.instagram.com/rockandpop907fm/",
      handle: "@rockandpop907fm",
    },
  ],

  nav: [
    { id: "inicio", label: "Inicio" },
    { id: "escuchar", label: "Escuchar" },
    { id: "programacion", label: "Programación" },
    { id: "la-radio", label: "La radio" },
    { id: "auspiciantes", label: "Auspiciantes" },
    { id: "contacto", label: "Contacto" },
  ],

  // Programación real confirmada. Mientras esté vacío, el sitio muestra un estado
  // editorial de "grilla en preparación" y no inventa horarios.
  // Ejemplo:
  // { id: "programa-1", name: "Nombre real", day: "Lunes", time: "20:00 a 22:00",
  //   description: "Descripción real", host: "Conductor real" }
  schedule: [],

  // Auspiciantes reales confirmados. Mientras esté vacío, se muestra el espacio
  // disponible sin inventar marcas.
  sponsors: [
    {
      id: "levitar-fest",
      name: "Levitar Fest",
      description: "19 de diciembre en JBC",
      image: levitarFest,
      url: "https://www.instagram.com/levitarfest/",
      cta: "Levitar Fest en Instagram",
    },
  ],

  meta: {
    title: "Rock & Pop 90.7 FM Formosa — Radio en vivo",
    description:
      "Rock & Pop 90.7 FM Formosa. Rock, pop y actitud desde Formosa, Argentina. Escuchá la radio en vivo.",
  },
};

/** Devuelve la red social configurada para un id, o undefined si no existe. */
export function getSocial(id: StationConfig["socials"][number]["id"]) {
  return station.socials.find((social) => social.id === id);
}
