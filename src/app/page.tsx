import NewsCard, { type NewsItem } from "@/components/NewsCard";
import Hero from "@/components/Hero";
import { getNewsArticles, getStrapiImageUrl } from "@/lib/strapi";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  // Fetch news from Strapi
  let news: NewsItem[] = [];
  
  try {
    const strapiNews = await getNewsArticles({ limit: 4 });
    news = strapiNews.map((article) => ({
      id: article.id.toString(),
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      image: getStrapiImageUrl(article.coverImage) || 
             "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
      tag: article.tag || undefined,
      date: new Date(article.publishedAt).toLocaleDateString('az-AZ', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
    }));
  } catch (error) {
    console.error('Failed to fetch news from Strapi:', error);
    // Fallback to empty array if Strapi is unavailable
  }

  return (
    <div className="space-y-8">
      <Hero />
      <section className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Son xəbərlər</h1>
          <p className="mt-1 text-sm text-zinc-400">Azərbaycan rap səhnəsindən ən son yeniliklər</p>
        </div>
        <a
          href="/news"
          className="hidden cursor-pointer select-none rounded-md bg-[--color-accent] px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-[--color-accent-600] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] md:inline-flex"
        >
          Bütün xəbərlər →
        </a>
      </section>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.length > 0 ? (
          news.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))
        ) : (
          <div className="col-span-full rounded-xl border bg-[--color-card] p-8 text-center">
            <p className="text-zinc-400">
              Hələ ki xəbər yoxdur. Strapi admin panelindən xəbər əlavə edin.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
