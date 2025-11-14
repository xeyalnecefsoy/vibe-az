"use client";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
    setStatus("submitting");
    // Simulate request
    await new Promise((r) => setTimeout(r, 800));
    setStatus("success");
  }

  return (
    <form onSubmit={onSubmit} className="group relative overflow-hidden rounded-xl border bg-[--color-card] p-2">
      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-[--color-accent]/30" />
      <div className="flex items-center gap-2">
        <span className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-md bg-[--color-accent]/15 text-[--color-accent]">
          <Mail className="h-4 w-4" />
        </span>
        <input
          type="email"
          required
          placeholder="E-poçt ünvanı"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-10 w-full flex-1 rounded-md border bg-[--color-background] px-3 text-sm outline-none placeholder:text-zinc-500 focus:border-[--color-accent]"
        />
        <button
          type="submit"
          disabled={status !== "idle"}
          className="cursor-pointer select-none rounded-md bg-[--color-accent] px-4 py-2 text-sm font-semibold text-white shadow transition active:scale-[0.98] hover:bg-[--color-accent-600] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "success" ? "Qeyd olundu" : status === "submitting" ? "Göndərilir..." : "Abunə ol"}
        </button>
      </div>
    </form>
  );
}
