"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

interface NewsFilterProps {
  categories: string[];
}

export default function NewsFilter({ categories }: NewsFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [cat, setCat] = useState(searchParams.get("category") || "All");

  // Debounce search query update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }
      router.push(`/news?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, router, searchParams]);

  const handleCategoryChange = (newCat: string) => {
    setCat(newCat);
    const params = new URLSearchParams(searchParams.toString());
    if (newCat && newCat !== "All") {
      params.set("category", newCat);
    } else {
      params.delete("category");
    }
    router.push(`/news?${params.toString()}`);
  };

  const allCategories = ["All", ...categories];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Axtar: albom, klip, intervü..."
        className="h-10 flex-1 rounded-md border bg-[--color-background] px-3 text-sm outline-none placeholder:text-zinc-500 focus:border-[--color-accent]"
      />
      <div className="flex flex-wrap gap-2">
        {allCategories.map((c) => (
          <button
            key={c}
            onClick={() => handleCategoryChange(c)}
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
  );
}
