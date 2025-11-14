import { notFound } from "next/navigation";
import { Music2, Mic2, Star } from "lucide-react";
import type { ComponentType } from "react";
import Link from "next/link";
import { Music, Globe, Calendar } from "lucide-react";

type IconType = ComponentType<React.SVGProps<SVGSVGElement>>;

const ARTISTS: Record<string, { name: string; bio: string; stats: string[]; icon: IconType }>
  = {
  "northside-mc": {
    name: "Northside MC",
    bio: "Şimal küləkləri kimi sərt flow və introspektiv lirika ilə seçilən MC.",
    stats: ["Yeni EP", "50K aylıq dinləyici", "Baku Sessions"],
    icon: Music2,
  },
  "bakuflow": {
    name: "BakuFlow",
    bio: "Şəhər ritmlərini trap teksturaları ilə birləşdirən prodüser/MC dueti.",
    stats: ["Top single", "120K izlənmə", "Live at Sea Breeze"],
    icon: Star,
  },
  "qara-nota": {
    name: "Qara Nota",
    bio: "Dark estetika və poeziyanı rap ilə sintez edən layihə.",
    stats: ["Tour 2026", "Debut LP", "Noir Sessions"],
    icon: Mic2,
  },
};

export async function generateStaticParams() {
  return Object.keys(ARTISTS).map((slug) => ({ slug }));
}

export default async function ArtistDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = ARTISTS[slug];
  if (!data) return notFound();
  const Icon = data.icon;

  return (
    <div className="space-y-6">
      <header className="flex items-center gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[--color-accent]/20 text-[--color-accent]">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
          <p className="text-sm text-zinc-400">{data.bio}</p>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {data.stats.map((s) => (
          <div key={s} className="rounded-xl border bg-[--color-card] p-4 text-sm text-zinc-300">
            {s}
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-[--color-card] p-4 md:col-span-2">
          <h2 className="mb-3 text-sm font-semibold text-[--accent]">Ən populyar treklər</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2">
              <span className="inline-flex items-center gap-2"><Music className="h-4 w-4 text-[--accent]"/> Şəhər Gecəsi</span>
              <span className="text-zinc-400">3:12</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2">
              <span className="inline-flex items-center gap-2"><Music className="h-4 w-4 text-[--accent]"/> Noir Flow</span>
              <span className="text-zinc-400">2:47</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2">
              <span className="inline-flex items-center gap-2"><Music className="h-4 w-4 text-[--accent]"/> Sükutdan Sonra</span>
              <span className="text-zinc-400">3:33</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border bg-[--color-card] p-4">
          <h2 className="mb-3 text-sm font-semibold text-[--accent]">Sosial bağlantılar</h2>
          <div className="grid gap-2 text-sm">
            <Link href="#" className="inline-flex items-center gap-2 rounded-md bg-[--accent]/15 px-3 py-2 font-medium text-[--accent] transition hover:bg-[--accent]/25"><Globe className="h-4 w-4"/> Rəsmi sayt</Link>
            <Link href="#" className="inline-flex items-center gap-2 rounded-md bg-[--accent]/15 px-3 py-2 font-medium text-[--accent] transition hover:bg-[--accent]/25"><Music className="h-4 w-4"/> Spotify</Link>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-xl border bg-[--color-card] p-4">
          <h2 className="mb-3 text-sm font-semibold text-[--accent]">Buraxılışlar</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2">
              <span>EP — Şimal Küləyi</span>
              <span className="text-zinc-400">2025</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2">
              <span>Single — Qara Nota</span>
              <span className="text-zinc-400">2024</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border bg-[--color-card] p-4">
          <h2 className="mb-3 text-sm font-semibold text-[--accent]">Tədbirlər</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2">
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-[--accent]"/> Baku Sessions</span>
              <span className="text-zinc-400">15 Dec 2025</span>
            </li>
            <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2">
              <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-[--accent]"/> Winter Fest</span>
              <span className="text-zinc-400">20 Jan 2026</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
