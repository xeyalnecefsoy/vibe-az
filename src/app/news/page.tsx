"use client";
import { useMemo, useState } from "react";
import NewsCard, { type NewsItem } from "@/components/NewsCard";

type Category = "All" | "Release" | "Interview" | "Live" | "Video" | "Feature";

const news: (NewsItem & { category: Category })[] = [
  {
    id: "n1",
    title: "EP premyerası: Şəhər sədaları ilə yeni dalğa",
    excerpt:
      "Yeni EP urban ritmlər və zəngin lirika ilə dinləyiciləri cəlb edir.",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop",
    tag: "Release",
    date: "08 Nov 2025",
    category: "Release",
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
    category: "Live",
  },
  {
    id: "n3",
    title: "İntervyu: MC Flow ilə yaradıcılıq prosesi",
    excerpt: "Sənətçi ilham mənbələrini və gələcək planlarını açıqlayır.",
    image:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    tag: "Interview",
    date: "02 Nov 2025",
    category: "Interview",
  },
  {
    id: "n4",
    title: "Klip premyerası: Noir estetika ilə güclü vizuallar",
    excerpt: "Yeni klip mesajı və vizual dili ilə fərqlənir.",
    image:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop",
    tag: "Video",
    date: "30 Oct 2025",
    category: "Video",
  },
  {
    id: "n5",
    title: "Səhnə arxası: Prodüserin qeydləri",
    excerpt: "Studiyada yaranan anlar və texniki detallar.",
    image:
      "https://images.unsplash.com/photo-1461783420461-5e0eac4ac2f1?q=80&w=1200&auto=format&fit=crop",
    tag: "Feature",
    date: "28 Oct 2025",
    category: "Feature",
  },
];

const categories: Category[] = ["All", "Release", "Interview", "Live", "Video", "Feature"];

export default function NewsPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Category>("All");

  const filtered = useMemo(() => {
    return news.filter((n) => {
      const matchesCat = cat === "All" || n.category === cat;
      const q = query.trim().toLowerCase();
      const matchesQuery = !q ||
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q) ||
        (n.tag ? n.tag.toLowerCase().includes(q) : false);
      return matchesCat && matchesQuery;
    });
  }, [cat, query]);

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">Xəbərlər</h1>
        <p className="text-sm text-zinc-400">Səhnədən ən son başlıqlar</p>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Axtar: albom, klip, intervü..."
            className="h-10 flex-1 rounded-md border bg-[--color-background] px-3 text-sm outline-none placeholder:text-zinc-500 focus:border-[--color-accent]"
          />
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-3 py-1.5 text-xs ${
                  cat === c
                    ? "border-[--color-accent] bg-[--color-accent]/20 text-white"
                    : "text-zinc-300 hover:border-[--color-accent]/50 hover:text-white"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((n) => (
          <NewsCard key={n.id} item={n} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full rounded-xl border bg-[--color-card] p-6 text-sm text-zinc-400">
            Heç nə tapılmadı. Başqa açar söz yoxlayın.
          </div>
        )}
      </section>
    </div>
  );
}
