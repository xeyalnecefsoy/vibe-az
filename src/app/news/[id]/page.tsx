import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Share2, Tag } from "lucide-react";

// Combine mock items from Home and /news page
const NEWS = [
  {
    id: "1",
    title: "Yeni albom: Baku Beats vol. 2 — yerli səhnədə səs-küy",
    excerpt:
      "Bakının ən istedadlı prodüserləri bir araya gəlib təzə sədalarla dolu kompilasiya təqdim etdilər.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    tag: "Release",
    date: "11 Nov 2025",
  },
  {
    id: "2",
    title: "İntervyu: Gənc MC ilə şəhər ritmləri və lirika barədə söhbət",
    excerpt:
      "Rap səhnəsinin yüksələn ulduzu ilham mənbələri və gələcək planları haqqında danışdı.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    tag: "Interview",
    date: "09 Nov 2025",
  },
  {
    id: "3",
    title: "Klip premyerası: Qaranlıq tonlarda güclü mesaj",
    excerpt:
      "Sənətçinin yeni klipi vizual estetika və hekayəçiliklə diqqət çəkir.",
    image:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop",
    tag: "Video",
    date: "06 Nov 2025",
  },
  {
    id: "4",
    title: "Səhnə arxası: studiya prosesindən qeydlər",
    excerpt:
      "Prodüser komandası yazım prosesinin sirrlərini bölüşür.",
    image:
      "https://images.unsplash.com/photo-1461783420461-5e0eac4ac2f1?q=80&w=1200&auto=format&fit=crop",
    tag: "Feature",
    date: "03 Nov 2025",
  },
  {
    id: "n1",
    title: "EP premyerası: Şəhər sədaları ilə yeni dalğa",
    excerpt:
      "Yeni EP urban ritmlər və zəngin lirika ilə dinləyiciləri cəlb edir.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop",
    tag: "Release",
    date: "08 Nov 2025",
  },
  {
    id: "n2",
    title: "Səhnə: Canlı performansda improvizasiya anları",
    excerpt:
      "Konsertdə gözlənilməz freestyl ilə tamaşaçılar heyran qaldı.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
    tag: "Live",
    date: "05 Nov 2025",
  },
  {
    id: "n3",
    title: "İntervyu: MC Flow ilə yaradıcılıq prosesi",
    excerpt: "Sənətçi ilham mənbələrini və gələcək planlarını açıqlayır.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    tag: "Interview",
    date: "02 Nov 2025",
  },
  {
    id: "n4",
    title: "Klip premyerası: Noir estetika ilə güclü vizuallar",
    excerpt: "Yeni klip mesajı və vizual dili ilə fərqlənir.",
    image:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop",
    tag: "Video",
    date: "30 Oct 2025",
  },
  {
    id: "n5",
    title: "Səhnə arxası: Prodüserin qeydləri",
    excerpt: "Studiyada yaranan anlar və texniki detallar.",
    image:
      "https://images.unsplash.com/photo-1461783420461-5e0eac4ac2f1?q=80&w=1200&auto=format&fit=crop",
    tag: "Feature",
    date: "28 Oct 2025",
  },
];

export function generateStaticParams() {
  return NEWS.map((n) => ({ id: n.id }));
}

export default async function NewsDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = NEWS.find((n) => n.id === id);
  if (!item) return notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-5">
      <header className="space-y-2">
        <div className="text-xs text-zinc-400">{item.date}</div>
        <h1 className="text-2xl font-bold tracking-tight">{item.title}</h1>
        {item.tag && (
          <span className="inline-flex items-center gap-1 rounded-md bg-[--accent]/15 px-2 py-1 text-xs font-medium text-[--accent]">
            {item.tag}
          </span>
        )}
        <div className="pt-2">
          <button className="inline-flex cursor-pointer select-none items-center gap-2 rounded-md bg-[--accent]/15 px-3 py-1.5 text-xs font-semibold text-[--accent] transition hover:bg-[--accent]/25 active:scale-95">
            <Share2 className="h-4 w-4" /> Paylaş
          </button>
        </div>
      </header>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
        <Image src={item.image} alt={item.title} fill className="object-cover" />
      </div>
      <section className="prose prose-invert prose-zinc max-w-none">
        <p className="lead">{item.excerpt}</p>
        <p>
          Bu buraxılış, yerli prodüserlərin fərqli üslublarını bir araya gətirərək səhnədə
          yeni bir dalğa yaradır. Lirik mövzular urban estetika ilə vəhdət təşkil edir.
        </p>
        <p>
          İfaçıların studiya prosesində istifadə etdiyi sound dizayn yanaşmaları, həm də
          canlı performanslarda özünü göstərir. Xüsusən də bass xəttləri və ritm strukturları
          diqqət çəkir.
        </p>
        <blockquote>
          "Səsin arxasındakı sükut, ritmin özüdür." — Prodüser qeydi
        </blockquote>
        <h3>Tracklist</h3>
        <ul>
          <li>Intro — "Bakının Sədası"</li>
          <li>Qaranlıq küçələr (feat. City Lights)</li>
          <li>Noir interlude</li>
          <li>Yüksəliş — Final</li>
        </ul>
      </section>

      <section className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-400">
          <Tag className="h-3.5 w-3.5" />
          <span>#rap</span>
          <span>#baku</span>
          <span>#release</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <Link href="/news" className="inline-flex cursor-pointer select-none items-center gap-1 rounded-md bg-[--accent]/15 px-2 py-1 text-xs font-medium text-[--accent] transition hover:bg-[--accent]/25">
            Daha çox xəbər →
          </Link>
        </div>
      </section>
    </article>
  );
}
