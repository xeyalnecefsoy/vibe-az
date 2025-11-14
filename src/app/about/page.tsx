import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Megaphone, Users2, Video, Newspaper, Shield, HeartHandshake, Sparkles, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "About Vibe.az — Azerbaijani Rap News",
  description: "Learn about Vibe.az: our mission, coverage, values and how we support the Azerbaijani rap scene.",
  openGraph: {
    title: "About Vibe.az — Azerbaijani Rap News",
    description: "Our mission, coverage and values.",
    url: "/about",
    images: [
      {
        url: "/favicon.ico",
        width: 64,
        height: 64,
        alt: "Vibe.az",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "About Vibe.az — Azerbaijani Rap News",
    description: "Our mission, coverage and values.",
    images: ["/favicon.ico"],
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8">
      {/* Banner */}
      <section className="relative overflow-hidden rounded-2xl border">
        <div className="relative h-56 w-full sm:h-72">
          <Image
            src="https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1920&auto=format&fit=crop"
            alt="Vibe.az About Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
        </div>
        <div className="absolute inset-0 flex items-end">
          <div className="w-full p-6 sm:p-8">
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Haqqımızda</h1>
            <p className="mt-1 max-w-2xl text-sm text-zinc-300">Vibe.az — rap xəbərləri, buraxılışlar və mədəniyyət üçün modern platforma.</p>
          </div>
        </div>
      </section>

      {/* Mission and Coverage */}
      <section className="rounded-2xl border bg-[--card] p-6 text-zinc-300">
        <p>
          Vibe.az Azərbaycan rap səhnəsinin yeniliklərini, çıxışları, intervyuları və səhnə arxası hekayələri
          toplayan müasir xəbər platformasıdır. Məqsədimiz yerli mədəniyyəti dəstəkləmək və azərbaycan dilində
          keyfiyyətli kontent təqdim etməkdir.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4">
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[--accent]"><Newspaper className="h-4 w-4"/> Xəbərlər</div>
            <p className="text-sm text-zinc-400">Yerli səhnədən gündəlik yeniliklər və analizlər.</p>
          </div>
          <div className="rounded-xl border p-4">
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[--accent]"><Video className="h-4 w-4"/> Kliplər</div>
            <p className="text-sm text-zinc-400">Premyeralar, video icmalları və kadr arxası.</p>
          </div>
          <div className="rounded-xl border p-4">
            <div className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-[--accent]"><Users2 className="h-4 w-4"/> Artistlər</div>
            <p className="text-sm text-zinc-400">İntervyular, profillər və kollaborasiyalar.</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="rounded-2xl border bg-[--card] p-6">
        <h2 className="mb-4 text-lg font-semibold">Dəyərlərimiz</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border p-4">
            <div className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-[--accent]"><Shield className="h-4 w-4"/> Keyfiyyət</div>
            <p className="text-sm text-zinc-400">Dəqiq, yoxlanmış və faydalı məlumat.</p>
          </div>
          <div className="rounded-xl border p-4">
            <div className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-[--accent]"><HeartHandshake className="h-4 w-4"/> İcma</div>
            <p className="text-sm text-zinc-400">Yerli səhnənin inkişafı üçün əməkdaşlıq.</p>
          </div>
          <div className="rounded-xl border p-4">
            <div className="mb-1 inline-flex items-center gap-2 text-sm font-semibold text-[--accent]"><Sparkles className="h-4 w-4"/> Yaradıcı yanaşma</div>
            <p className="text-sm text-zinc-400">Estetika və funksionallığı birləşdirən dizayn.</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="rounded-2xl border bg-[--card] p-6">
        <h2 className="mb-4 text-lg font-semibold">Yol xəritəsi</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2"><span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4 text-[--accent]"/> 2025 Q4 — V1 buraxılışı</span><span className="text-zinc-400">Canlı</span></li>
          <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2"><span>2026 Q1 — CMS və Auth</span><span className="text-zinc-400">Plan</span></li>
          <li className="flex items-center justify-between rounded-md bg-black/20 px-3 py-2"><span>2026 Q2 — Mobil tətbiq</span><span className="text-zinc-400">Plan</span></li>
        </ul>
      </section>

      {/* CTA */}
      <section className="rounded-2xl border bg-[--card] p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold">İdeyan var?</h2>
            <p className="text-sm text-zinc-400">Bizə yaz və növbəti hekayəni birgə hazırlayaq.</p>
          </div>
          <Link href="#newsletter" className="inline-flex cursor-pointer select-none items-center gap-2 rounded-md bg-[--accent] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[--accent-600] active:scale-[0.98]">
            <Megaphone className="h-4 w-4"/> Əlaqə saxla
          </Link>
        </div>
      </section>
    </div>
  );
}
