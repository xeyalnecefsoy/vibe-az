import NewsCard, { type NewsItem } from "@/components/NewsCard";
import { getNewsArticles, getCategories, getStrapiImageUrl } from "@/lib/strapi";
import NewsFilter from "@/components/NewsFilter";

export const revalidate = 60;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const categorySlug = params.category;
  const searchQuery = params.q;

  // Fetch categories for the filter
  const categories = await getCategories();
  
  // Fetch news from Strapi
  // Note: Strapi filtering would ideally happen on the backend. 
  // For now, we'll fetch and map, but in a real app you'd pass filters to the API.
  // Our simple client helper doesn't support complex filtering yet, so we might fetch all and filter or update the helper.
  // Let's update the helper usage to be more robust or just fetch latest.
  
  // Since our getNewsArticles helper is simple, let's fetch a batch.
  // In a production app, you'd want to implement proper server-side filtering in the Strapi client.
  let news: (NewsItem & { category: string })[] = [];
  
  try {
    const strapiNews = await getNewsArticles({ limit: 100 });
    news = strapiNews.map((article) => ({
      id: article.id.toString(),
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      image: getStrapiImageUrl(article.coverImage) || 
             "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
      tag: article.tag || "News",
      date: new Date(article.publishedAt).toLocaleDateString('az-AZ', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      category: "All"
    }));
  } catch (error) {
    console.error('Failed to fetch news:', error);
    // Continue with empty news array
  }

  // Client-side filtering for now since we are transitioning
  if (categorySlug && categorySlug !== "All") {
    // This assumes we have category data. Since we removed the relation to fix the circular dependency,
    // we might not have it yet. We'll skip category filtering for this step or rely on tags.
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    news = news.filter(n => 
      n.title.toLowerCase().includes(q) || 
      n.excerpt.toLowerCase().includes(q)
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <h1 className="text-2xl font-bold tracking-tight">Xəbərlər</h1>
        <p className="text-sm text-zinc-400">Səhnədən ən son başlıqlar</p>
        
        {/* We'll need a client component for the filter inputs */}
        <NewsFilter categories={categories.map(c => c.name)} />
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {news.length > 0 ? (
          news.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))
        ) : (
          <div className="col-span-full rounded-xl border bg-[--color-card] p-6 text-sm text-zinc-400">
            Heç nə tapılmadı. Başqa açar söz yoxlayın.
          </div>
        )}
      </section>
    </div>
  );
}
