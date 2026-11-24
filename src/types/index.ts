export type PlayerStatus = "idle" | "loading" | "playing" | "paused" | "error";

export type MetadataStatus = "loading" | "ready" | "unavailable";

export interface SongMetadata {
  artist: string;
  title: string;
  album: string;
  art: string | null;
  text: string;
}

export interface NowPlayingData {
  song: SongMetadata | null;
  listeners: number;
  isOnline: boolean;
  isLive: boolean;
  updatedAt: number;
}

export interface Program {
  id: string;
  name: string;
  day: string;
  time: string;
  description?: string;
  host?: string;
}

export type SocialId = "instagram" | "facebook" | "youtube" | "tiktok" | "whatsapp";

export interface SocialLink {
  id: SocialId;
  label: string;
  url: string;
  handle?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  url?: string;
  logoUrl?: string;
  /** Imagen promocional opcional. Si existe, el auspiciante se muestra como tarjeta destacada. */
  image?: string;
  /** Bajada corta debajo del nombre (fecha, lugar, etc.). */
  description?: string;
  /** Texto del enlace cuando hay imagen. */
  cta?: string;
}

export interface NavItem {
  id: string;
  label: string;
}

export interface HeroCopy {
  line1: string;
  line2: string;
  accent: string;
  lead: string;
}

export interface StationConfig {
  name: string;
  fullName: string;
  footerName: string;
  frequency: string;
  band: string;
  location: string;
  country: string;
  description: string;
  hero: HeroCopy;
  streamUrl: string;
  apiUrl: string;
  stationShortcode: string;
  siteUrl: string;
  email: string;
  socials: SocialLink[];
  nav: NavItem[];
  schedule: Program[];
  sponsors: Sponsor[];
  meta: {
    title: string;
    description: string;
  };
}
