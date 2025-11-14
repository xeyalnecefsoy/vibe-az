import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Play, Share2 } from "lucide-react";

const VIDEOS = [
  {
    id: "v1",
    title: "Qaranlıq tonlarda güclü mesaj",
    thumb:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    description:
      "Qaranlıq tonlarda çəkilmiş klip güclü mesajı və minimalist vizualları ilə seçilir.",
  },
  {
    id: "v2",
    title: "Şəhər gecələri: noir estetika",
    thumb:
      "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop",
    description:
      "Noir estetika və neon işıqların harmoniyası ilə şəhər gecələrindən ilhamlanan vizual iş.",
  },
  {
    id: "v3",
    title: "Canlı sessiya: studiya improvisasiyası",
    thumb:
      "https://images.unsplash.com/photo-1495305379050-64540d6ee870?q=80&w=1200&auto=format&fit=crop",
    description:
      "Studiyada birgə improvizasiya və canlı ifa anlarından ibarət sessiya.",
  },
];

export function generateStaticParams() {
  return VIDEOS.map((v) => ({ id: v.id }));
}

export default async function VideoDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = VIDEOS.find((x) => x.id === id);
  if (!v) return notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-5">
      <header className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{v.title}</h1>
        <div className="pt-1">
          <button className="inline-flex cursor-pointer select-none items-center gap-2 rounded-md bg-[--accent]/15 px-3 py-1.5 text-xs font-semibold text-[--accent] transition hover:bg-[--accent]/25 active:scale-95">
            <Share2 className="h-4 w-4" /> Paylaş
          </button>
        </div>
      </header>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
        <Image src={v.thumb} alt={v.title} fill className="object-cover" />
      </div>
      <section className="prose prose-invert prose-zinc max-w-none">
        <p className="lead">{v.description}</p>
        <p>
          Klip çəkilişləri şəhərin gecə mənzərələrində aparılıb. Noir estetika, neon
          palitra və dərin kölgələr musiqinin atmosferini gücləndirir.
        </p>
        <h3>Kredits</h3>
        <ul>
          <li>Rejissor: B. Vahid</li>
          <li>Operator: A. Qasım</li>
          <li>Montaj: Studio Noir</li>
        </ul>
        <h3>Fəsillər</h3>
        <ol>
          <li>0:00 Intro</li>
          <li>0:45 Küçə səhnələri</li>
          <li>1:30 Studiya</li>
          <li>2:15 Final</li>
        </ol>
      </section>

      <div className="flex flex-wrap gap-2 pt-1">
        <Link href="/videos" className="inline-flex cursor-pointer select-none items-center gap-2 rounded-md bg-[--accent]/15 px-3 py-1.5 text-xs font-semibold text-[--accent] transition hover:bg-[--accent]/25">
          <Play className="h-4 w-4" /> Daha çox video
        </Link>
      </div>
    </article>
  );
}
