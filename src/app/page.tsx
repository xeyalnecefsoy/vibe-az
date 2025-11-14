import NewsCard, { type NewsItem } from "@/components/NewsCard";
import Hero from "@/components/Hero";

const mockNews: NewsItem[] = [
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
];

export default function Home() {
  return (
    <div className="space-y-8">
      <Hero />
      <section className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Son xəbərlər</h1>
          <p className="mt-1 text-sm text-zinc-400">Azerbaycan rap səhnəsindən ən son yeniliklər</p>
        </div>
        <a
          href="/news"
          className="hidden cursor-pointer select-none rounded-md bg-[--color-accent] px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-[--color-accent-600] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] md:inline-flex"
        >
          Bütün xəbərlər →
        </a>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockNews.map((n) => (
          <NewsCard key={n.id} item={n} />
        ))}
      </section>
    </div>
  );
}
