/**
 * Strapi API Client
 * Handles all communication with the Strapi CMS backend
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://127.0.0.1:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface StrapiImage {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: any;
  url: string;
}

export interface NewsArticle {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tag: string | null;
  featured: boolean;
  coverImage: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Artist {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  bio: string;
  instagram: string | null;
  spotify: string | null;
  youtube: string | null;
  featured: boolean;
  profileImage: StrapiImage | null;
  coverImage: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Video {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  featured: boolean;
  thumbnail: StrapiImage | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Helper to get full image URL from Strapi
 */
export function getStrapiImageUrl(image: StrapiImage | null): string {
  if (!image) return '';
  const url = image.url;
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

/**
 * Generic fetch function for Strapi API
 */
async function fetchAPI<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const response = await fetch(`${STRAPI_URL}/api${path}`, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    console.error(`Strapi API error details for ${path}:`, errorData);
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

/**
 * Fetch all news articles
 */
export async function getNewsArticles(params?: {
  featured?: boolean;
  tag?: string;
  limit?: number;
}): Promise<NewsArticle[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('populate', '*');
  queryParams.append('sort', 'publishedAt:desc');

  if (params?.featured) {
    queryParams.append('filters[featured][$eq]', 'true');
  }

  if (params?.tag) {
    queryParams.append('filters[tag][$eq]', params.tag);
  }

  if (params?.limit) {
    queryParams.append('pagination[limit]', params.limit.toString());
  }

  const response = await fetchAPI<StrapiResponse<NewsArticle[]>>(
    `/news-articles?${queryParams.toString()}`
  );

  return response.data;
}

/**
 * Fetch single news article by slug
 */
export async function getNewsArticleBySlug(slug: string): Promise<NewsArticle | null> {
  const queryParams = new URLSearchParams();
  queryParams.append('filters[slug][$eq]', slug);
  queryParams.append('populate', '*');

  const response = await fetchAPI<StrapiResponse<NewsArticle[]>>(
    `/news-articles?${queryParams.toString()}`
  );

  return response.data[0] || null;
}

/**
 * Fetch all artists
 */
export async function getArtists(params?: {
  featured?: boolean;
  limit?: number;
}): Promise<Artist[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('populate', '*');
  queryParams.append('sort', 'name:asc');

  if (params?.featured) {
    queryParams.append('filters[featured][$eq]', 'true');
  }

  if (params?.limit) {
    queryParams.append('pagination[limit]', params.limit.toString());
  }

  const response = await fetchAPI<StrapiResponse<Artist[]>>(
    `/artists?${queryParams.toString()}`
  );

  return response.data;
}

/**
 * Fetch single artist by slug
 */
export async function getArtistBySlug(slug: string): Promise<Artist | null> {
  const queryParams = new URLSearchParams();
  queryParams.append('filters[slug][$eq]', slug);
  queryParams.append('populate', 'profileImage,coverImage');

  const response = await fetchAPI<StrapiResponse<Artist[]>>(
    `/artists?${queryParams.toString()}`
  );

  return response.data[0] || null;
}

/**
 * Fetch all videos
 */
export async function getVideos(params?: {
  featured?: boolean;
  limit?: number;
}): Promise<Video[]> {
  const queryParams = new URLSearchParams();
  queryParams.append('populate', '*');
  queryParams.append('sort', 'publishedAt:desc');

  if (params?.featured) {
    queryParams.append('filters[featured][$eq]', 'true');
  }

  if (params?.limit) {
    queryParams.append('pagination[limit]', params.limit.toString());
  }

  const response = await fetchAPI<StrapiResponse<Video[]>>(
    `/videos?${queryParams.toString()}`
  );

  return response.data;
}

/**
 * Fetch single video by slug
 */
export async function getVideoBySlug(slug: string): Promise<Video | null> {
  const queryParams = new URLSearchParams();
  queryParams.append('filters[slug][$eq]', slug);
  queryParams.append('populate', 'thumbnail');

  const response = await fetchAPI<StrapiResponse<Video[]>>(
    `/videos?${queryParams.toString()}`
  );

  return response.data[0] || null;
}

/**
 * Fetch all categories
 */
export async function getCategories(): Promise<Category[]> {
  const response = await fetchAPI<StrapiResponse<Category[]>>(
    '/categories?sort=name:asc'
  );

  return response.data;
}
