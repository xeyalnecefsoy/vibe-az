import Image from "next/image";
import Link from "next/link";

export type NewsItem = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  tag?: string;
  date?: string;
};

export default function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="group overflow-hidden rounded-xl border bg-[--color-card] transition-colors hover:border-[--color-accent]/50 hover:shadow-[0_0_0_3px_rgba(168,85,247,0.12)]">
      <div className="relative aspect-video w-full">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {item.tag ? (
          <span className="absolute left-3 top-3 rounded-full bg-[--color-accent]/90 px-2.5 py-1 text-xs font-medium text-white shadow">
            {item.tag}
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug">
          {item.title}
        </h3>
        <p className="line-clamp-2 text-sm text-zinc-400">{item.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-zinc-500">
          <span>{item.date}</span>
          <Link
            href={`/news/${item.id}`}
            className="inline-flex cursor-pointer select-none items-center gap-1 rounded-md bg-[--color-accent]/15 px-2 py-1 font-medium text-[--color-accent] transition hover:bg-[--color-accent]/25 active:scale-95"
          >
            Read more
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
