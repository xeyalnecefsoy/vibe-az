import Image from "next/image";
import { Play, Film, Flame } from "lucide-react";
import Link from "next/link";

const videos = [
  {
    id: "v1",
    title: "Qaranlıq tonlarda güclü mesaj",
    thumb:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "v2",
    title: "Şəhər gecələri: noir estetika",
    thumb:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "v3",
    title: "Canlı sessiya: studiya improvisasiyası",
    thumb:
      "https://images.unsplash.com/photo-1495305379050-64540d6ee870?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function VideosPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Videolar</h1>
        <p className="mt-1 text-sm text-zinc-400">Premyeralar, canlı sessiyalar və kliplər</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-[--color-accent]">
          <Film className="h-4 w-4" /> Seçilmiş kliplər
        </div>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <div key={v.id} className="group overflow-hidden rounded-xl border bg-[--color-card] transition-colors hover:border-[--color-accent]/50">
            <div className="relative aspect-video w-full">
              <Image src={v.thumb} alt={v.title} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 flex items-end justify-between bg-black/10 p-3">
                <span className="inline-flex items-center gap-1 rounded-md bg-[--color-accent]/90 px-2 py-1 text-xs font-medium text-white">
                  <Flame className="h-3.5 w-3.5" /> Yeni
                </span>
                <Link href={`/videos/${v.id}`} className="inline-flex cursor-pointer select-none items-center gap-2 rounded-md bg-white/90 px-3 py-1.5 text-sm font-semibold text-black shadow transition active:scale-[0.98]">
                  <Play className="h-4 w-4" /> İzlə
                </Link>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{v.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
