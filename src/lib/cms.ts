export type NewsRecord = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  tag?: string;
  date?: string;
  category?: string;
};

export type ArtistRecord = {
  name: string;
  slug: string;
  bio?: string;
  stat?: string;
};

export type VideoRecord = {
  id: string;
  title: string;
  thumb: string;
  description?: string;
};

const KEYS = {
  news: "vibe.news",
  artists: "vibe.artists",
  videos: "vibe.videos",
} as const;

function read<T>(key: string): T[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return Array.isArray(data) ? (data as T[]) : null;
  } catch {
    return null;
  }
}

function write<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(data));
}

export const cms = {
  getNews<T extends NewsRecord>(fallback: T[]): T[] {
    return (read<T>(KEYS.news) ?? fallback) as T[];
  },
  setNews<T extends NewsRecord>(data: T[]) {
    write<T>(KEYS.news, data);
  },
  getArtists<T extends ArtistRecord>(fallback: T[]): T[] {
    return (read<T>(KEYS.artists) ?? fallback) as T[];
  },
  setArtists<T extends ArtistRecord>(data: T[]) {
    write<T>(KEYS.artists, data);
  },
  getVideos<T extends VideoRecord>(fallback: T[]): T[] {
    return (read<T>(KEYS.videos) ?? fallback) as T[];
  },
  setVideos<T extends VideoRecord>(data: T[]) {
    write<T>(KEYS.videos, data);
  },
};
