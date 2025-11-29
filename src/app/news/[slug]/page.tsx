import Image from "next/image";
import { notFound } from "next/navigation";
import { getNewsArticleBySlug, getStrapiImageUrl } from "@/lib/strapi";
import { marked } from "marked";

export const revalidate = 60;

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let article = null;
  
  try {
    article = await getNewsArticleBySlug(slug);
  } catch (error) {
    console.error(`Failed to fetch article ${slug}:`, error);
  }

  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiImageUrl(article.coverImage) || 
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop";

  const date = new Date(article.publishedAt).toLocaleDateString('az-AZ', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  // Convert markdown to HTML
  const contentHtml = article.content 
    ? await marked(article.content)
    : article.excerpt || "";

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header className="space-y-6 text-center">
        <div className="space-y-4">
          {article.tag && (
            <span className="inline-block rounded-full bg-[--color-accent]/10 px-3 py-1 text-sm font-medium text-[--color-accent]">
              {article.tag}
            </span>
          )}
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <time className="block text-zinc-400">{date}</time>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-[--color-card]">
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            className="object-cover"
            priority
            unoptimized
            sizes="(max-width: 1200px) 100vw, 800px"
          />
        </div>
      </header>

      <div className="prose prose-invert mx-auto max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-a:text-[--color-accent] prose-strong:text-zinc-100">
        <p className="lead text-xl text-zinc-200">{article.excerpt}</p>
        <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
      </div>
    </article>
  );
}
