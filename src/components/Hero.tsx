import Link from "next/link";
import { PlayCircle, Megaphone, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border bg-[--card] px-6 py-12 sm:px-10 sm:py-16">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-linear-to-tr from-[--accent-700] via-[--accent] to-white/30 opacity-25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-linear-to-tr from-white/10 via-[--accent] to-[--accent-600] opacity-20 blur-3xl" />

      <div className="relative z-10 grid items-center gap-8 sm:grid-cols-2">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-zinc-300">
            <Megaphone className="h-4 w-4 text-[--accent]" />
            Son xəbər: Səhnədə yeni albom sədaları
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Vibe.az — Azərbaycan rap səhnəsinin nəbzi
          </h1>
          <p className="max-w-prose text-zinc-400">
            Xəbərlər, kliplər, intervyular və səhnə arxası hekayələr. Qaranlıq tonlar,
            bənövşəyi aksentlər və modern UI ilə tərtib olunmuş xəbər platforması.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/news"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[--accent] px-4 py-2 font-medium text-white shadow transition-colors hover:bg-[--accent-600]"
            >
              Son xəbərlər
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/videos"
              className="inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2 font-medium text-zinc-200 hover:border-[--accent]/50 hover:text-white"
            >
              <PlayCircle className="h-4 w-4 text-[--accent]" />
              Kliplərə bax
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-video w-full overflow-hidden rounded-xl border">
            <div className="flex h-full items-center justify-center bg-linear-to-br from-black via-zinc-900 to-[--accent-700]">
              <PlayCircle className="h-16 w-16 text-white/70" />
            </div>
          </div>
          <div className="pointer-events-none absolute -inset-2 rounded-xl bg-[--accent]/10 blur-lg" />
        </div>
      </div>
    </section>
  );
}
