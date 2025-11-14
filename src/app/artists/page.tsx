import Link from "next/link";
import { Mic2, Music2, Star, Users2, Crown, Radio } from "lucide-react";

const artists = [
  { name: "Northside MC", slug: "northside-mc", stat: "Yeni EP", icon: Music2 },
  { name: "BakuFlow", slug: "bakuflow", stat: "Top single", icon: Star },
  { name: "Qara Nota", slug: "qara-nota", stat: "Tour 2026", icon: Mic2 },
];

export default function ArtistsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Artistlər</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Yerli səhnənin simaları, yeni çıxışlar və canlı performans xəbərdarlıqları.
        </p>
      </header>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {artists.map((a) => (
          <li key={a.slug} className="flex items-center justify-between rounded-xl border bg-[--color-card] p-4">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[--color-accent]/20 text-[--color-accent]">
                <a.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-medium">{a.name}</p>
                <p className="text-sm text-zinc-400">{a.stat}</p>
              </div>
            </div>
            <Link href={`/artists/${a.slug}`} className="rounded-md bg-[--color-accent]/15 px-3 py-1.5 text-sm font-medium text-[--color-accent] transition hover:bg-[--color-accent]/25 active:scale-95">
              Profilə bax
            </Link>
          </li>
        ))}
      </ul>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-[--color-card] p-4">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[--color-accent]">
            <Crown className="h-4 w-4" /> Trenddə olanlar
          </div>
          <p className="text-sm text-zinc-400">Həftənin ən çox dinlənən trekləri və artistləri.</p>
          <Link href="/news" className="mt-3 inline-flex cursor-pointer select-none items-center gap-1 rounded-md bg-[--color-accent]/15 px-2 py-1 text-sm font-medium text-[--color-accent] transition hover:bg-[--color-accent]/25">
            Bax →
          </Link>
        </div>
        <div className="rounded-xl border bg-[--color-card] p-4">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[--color-accent]">
            <Users2 className="h-4 w-4" /> Kollablar
          </div>
          <p className="text-sm text-zinc-400">Yeni əməkdaşlıqlar və prodüserlik layihələri.</p>
          <Link href="/videos" className="mt-3 inline-flex cursor-pointer select-none items-center gap-1 rounded-md bg-[--color-accent]/15 px-2 py-1 text-sm font-medium text-[--color-accent] transition hover:bg-[--color-accent]/25">
            Bax →
          </Link>
        </div>
        <div className="rounded-xl border bg-[--color-card] p-4">
          <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[--color-accent]">
            <Radio className="h-4 w-4" /> Canlı səslər
          </div>
          <p className="text-sm text-zinc-400">Studio session-lar və canlı performans qeydləri.</p>
          <Link href="/news" className="mt-3 inline-flex cursor-pointer select-none items-center gap-1 rounded-md bg-[--color-accent]/15 px-2 py-1 text-sm font-medium text-[--color-accent] transition hover:bg-[--color-accent]/25">
            Bax →
          </Link>
        </div>
      </section>
    </div>
  );
}
