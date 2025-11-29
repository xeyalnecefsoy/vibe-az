import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";

export default function Footer() {
  return (
    <footer className="border-t bg-[--color-background]">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div id="newsletter" className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold">Həftəlik bülleten</h3>
            <p className="mt-1 text-sm text-zinc-400">Son çıxışlar, kliplər və intervülər birbaşa poçtunuza.</p>
          </div>
          <NewsletterForm />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-zinc-400 md:flex-row" suppressHydrationWarning>
          <p>© {new Date().getFullYear()} Vibe.az — Azerbaijani Rap News</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="hover:text-[--color-accent]">Privacy</Link>
            <Link href="#" className="hover:text-[--color-accent]">Terms</Link>
            <Link href="#" className="hover:text-[--color-accent]">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
