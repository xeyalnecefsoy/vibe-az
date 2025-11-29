import Image from "next/image";
import { Play, Film, Flame } from "lucide-react";
import Link from "next/link";
import { getVideos, getStrapiImageUrl, type Video } from "@/lib/strapi";

export const revalidate = 60;

export default async function VideosPage() {
  let videos: (Video & { thumb: string })[] = [];
  
  try {
    const strapiVideos = await getVideos({ limit: 100 });
    videos = strapiVideos.map((video) => ({
      ...video,
      thumb: getStrapiImageUrl(video.thumbnail) || 
             "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop",
    }));
  } catch (error) {
    console.error('Failed to fetch videos:', error);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Videolar</h1>
        <p className="mt-1 text-sm text-zinc-400">Premyeralar, canlı sessiyalar və kliplər</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-[--color-accent]">
          <Film className="h-4 w-4" /> Seçilmiş kliplər
        </div>
      </header>
      
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <div key={v.id} className="group overflow-hidden rounded-xl border bg-[--color-card] transition-colors hover:border-[--color-accent]/50">
              <div className="relative aspect-video w-full">
                <Image 
                  src={v.thumb} 
                  alt={v.title} 
                  fill 
                  className="object-cover transition-transform duration-300 group-hover:scale-105" 
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  suppressHydrationWarning
                />
                <div className="absolute inset-0 flex items-end justify-between bg-black/10 p-3">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[--color-accent]/90 px-2 py-1 text-xs font-medium text-white">
                    <Flame className="h-3.5 w-3.5" /> Yeni
                  </span>
                  <a 
                    href={v.videoUrl} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex cursor-pointer select-none items-center gap-2 rounded-md bg-white/90 px-3 py-1.5 text-sm font-semibold text-black shadow transition active:scale-[0.98]"
                  >
                    <Play className="h-4 w-4" /> İzlə
                  </a>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{v.title}</h3>
                {v.description && (
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{v.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border bg-[--color-card] p-8 text-center text-zinc-400">
          Hələ ki video yoxdur. Strapi admin panelindən əlavə edin.
        </div>
      )}
    </div>
  );
}
