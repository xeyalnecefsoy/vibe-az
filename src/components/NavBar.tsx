"use client";
import Link from "next/link";
import { useState } from "react";
import { Radio, Newspaper, Users2, PlayCircle, Info, Settings } from "lucide-react";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-[--color-background]/80 backdrop-blur supports-[backdrop-filter]:bg-[--color-background]/60">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-[--accent] text-white">
                <Radio className="h-5 w-5" />
              </span>
              <span className="text-lg font-semibold tracking-tight">Vibe.az</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="/news" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"><Newspaper className="h-4 w-4"/> News</Link>
            <Link href="/artists" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"><Users2 className="h-4 w-4"/> Artists</Link>
            <Link href="/videos" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"><PlayCircle className="h-4 w-4"/> Videos</Link>
            <Link href="/about" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"><Info className="h-4 w-4"/> About</Link>
            <Link href="/admin" className="inline-flex items-center gap-2 text-zinc-300 hover:text-white"><Settings className="h-4 w-4"/> Admin</Link>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="#newsletter"
              className="rounded-md bg-[--accent] px-3 py-2 text-sm font-semibold text-white shadow transition hover:bg-[--accent-600] active:scale-[0.98]"
            >
              Subscribe
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center rounded-md border bg-[--card] p-2 text-zinc-300 transition hover:text-white active:scale-95 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              {open ? (
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M3.75 5.25a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm0 6.75c0-.414.336-.75.75-.75h15a.75.75 0 0 1 0 1.5h-15a.75.75 0 0 1-.75-.75Zm.75 6a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5h-15Z"
                  clipRule="evenodd"
                />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <div className="md:hidden">
            <nav className="grid gap-2 border-t py-3 text-sm">
              <Link href="/news" className="rounded-md px-2 py-2 text-zinc-300 hover:bg-[--card] hover:text-white">News</Link>
              <Link href="/artists" className="rounded-md px-2 py-2 text-zinc-300 hover:bg-[--card] hover:text-white">Artists</Link>
              <Link href="/videos" className="rounded-md px-2 py-2 text-zinc-300 hover:bg-[--card] hover:text-white">Videos</Link>
              <Link href="/about" className="rounded-md px-2 py-2 text-zinc-300 hover:bg-[--card] hover:text-white">About</Link>
              <Link href="/admin" className="rounded-md px-2 py-2 text-zinc-300 hover:bg-[--card] hover:text-white">Admin</Link>
              <Link href="#newsletter" className="rounded-md px-2 py-2 text-zinc-300 hover:bg-[--card] hover:text-white">Subscribe</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
