"use client";
import { useState } from "react";
import { cms, type NewsRecord, type ArtistRecord, type VideoRecord } from "@/lib/cms";
import { Plus, Trash2, Edit3, Save, X, Settings, Newspaper, Users2, PlayCircle } from "lucide-react";

type IconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

function SectionHeader({ icon: Icon, title, subtitle }: { icon: IconType; title: string; subtitle: string }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-[--accent]/20 text-[--accent]">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-xs text-zinc-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}

function Empty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-[--card] p-6 text-sm text-zinc-400">{children}</div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={"h-10 w-full rounded-md border bg-[--background] px-3 text-sm outline-none placeholder:text-zinc-500 focus:border-[--accent] " + (props.className ?? "")}
    />
  );
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={"min-h-[84px] w-full rounded-md border bg-[--background] px-3 py-2 text-sm outline-none placeholder:text-zinc-500 focus:border-[--accent] " + (props.className ?? "")}
    />
  );
}

export default function AdminPage() {
  const [tab, setTab] = useState<"news" | "artists" | "videos">("news");

  // Local state sourced from localStorage via cms (lazy init on client)
  const [news, setNews] = useState<NewsRecord[]>(() => (typeof window !== "undefined" ? cms.getNews<NewsRecord>([]) : []));
  const [artists, setArtists] = useState<ArtistRecord[]>(() => (typeof window !== "undefined" ? cms.getArtists<ArtistRecord>([]) : []));
  const [videos, setVideos] = useState<VideoRecord[]>(() => (typeof window !== "undefined" ? cms.getVideos<VideoRecord>([]) : []));

  // Forms
  const [newsForm, setNewsForm] = useState<NewsRecord>({ id: "", title: "", excerpt: "", image: "", tag: "", date: "", category: "" });
  const [artistForm, setArtistForm] = useState<ArtistRecord>({ name: "", slug: "", bio: "", stat: "" });
  const [videoForm, setVideoForm] = useState<VideoRecord>({ id: "", title: "", thumb: "", description: "" });

  const [editingId, setEditingId] = useState<string | null>(null);

  function saveNews(list: NewsRecord[]) {
    setNews(list);
    cms.setNews(list);
  }
  function saveArtists(list: ArtistRecord[]) {
    setArtists(list);
    cms.setArtists(list);
  }
  function saveVideos(list: VideoRecord[]) {
    setVideos(list);
    cms.setVideos(list);
  }

  // Helpers
  function slugify(s: string) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[--accent]/20 text-[--accent]">
            <Settings className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-zinc-400">Manage website content (local only)</p>
          </div>
        </div>
      </header>

      <nav className="flex flex-wrap gap-2">
        <button onClick={() => setTab("news")} className={`rounded-md px-3 py-1.5 text-sm ${tab === "news" ? "bg-[--accent]/20 text-[--accent]" : "border text-zinc-300 hover:bg-[--card]"}`}>
          <span className="inline-flex items-center gap-2"><Newspaper className="h-4 w-4"/> News</span>
        </button>
        <button onClick={() => setTab("artists")} className={`rounded-md px-3 py-1.5 text-sm ${tab === "artists" ? "bg-[--accent]/20 text-[--accent]" : "border text-zinc-300 hover:bg-[--card]"}`}>
          <span className="inline-flex items-center gap-2"><Users2 className="h-4 w-4"/> Artists</span>
        </button>
        <button onClick={() => setTab("videos")} className={`rounded-md px-3 py-1.5 text-sm ${tab === "videos" ? "bg-[--accent]/20 text-[--accent]" : "border text-zinc-300 hover:bg-[--card]"}`}>
          <span className="inline-flex items-center gap-2"><PlayCircle className="h-4 w-4"/> Videos</span>
        </button>
      </nav>

      {tab === "news" && (
        <section className="space-y-4">
          <SectionHeader icon={Newspaper} title="News" subtitle="Create, edit, delete news posts" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-2">
              {news.length === 0 && <Empty>No news yet. Add your first post.</Empty>}
              {news.map((n) => (
                <div key={n.id} className="flex flex-col gap-3 rounded-xl border bg-[--card] p-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{n.title}</p>
                    <p className="truncate text-xs text-zinc-400">{n.excerpt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditingId(n.id); setNewsForm(n); }} className="rounded-md bg-[--accent]/15 px-2 py-1 text-sm font-medium text-[--accent] hover:bg-[--accent]/25"><Edit3 className="mr-1 inline h-4 w-4"/> Edit</button>
                    <button onClick={() => saveNews(news.filter(x => x.id !== n.id))} className="rounded-md border px-2 py-1 text-sm text-zinc-200 hover:border-[--accent]/50 hover:text-white"><Trash2 className="mr-1 inline h-4 w-4"/> Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-[--card] p-4">
              <h3 className="mb-2 text-sm font-semibold text-[--accent]">{editingId ? "Edit News" : "Add News"}</h3>
              <div className="space-y-2">
                <TextInput placeholder="ID" value={newsForm.id} onChange={(e) => setNewsForm({ ...newsForm, id: e.target.value })} />
                <TextInput placeholder="Title" value={newsForm.title} onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })} />
                <TextArea placeholder="Excerpt" value={newsForm.excerpt} onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })} />
                <TextInput placeholder="Image URL" value={newsForm.image} onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })} />
                <div className="grid grid-cols-2 gap-2">
                  <TextInput placeholder="Tag" value={newsForm.tag} onChange={(e) => setNewsForm({ ...newsForm, tag: e.target.value })} />
                  <TextInput placeholder="Date" value={newsForm.date} onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })} />
                </div>
                <TextInput placeholder="Category" value={newsForm.category} onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })} />
                <div className="flex gap-2 pt-1">
                  {editingId ? (
                    <>
                      <button onClick={() => { saveNews(news.map(n => n.id === editingId ? newsForm : n)); setEditingId(null); setNewsForm({ id: "", title: "", excerpt: "", image: "", tag: "", date: "", category: "" }); }} className="inline-flex items-center gap-2 rounded-md bg-[--accent] px-3 py-2 text-sm font-semibold text-white hover:bg-[--accent-600]"><Save className="h-4 w-4"/> Save</button>
                      <button onClick={() => { setEditingId(null); }} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-zinc-200 hover:border-[--accent]/50 hover:text-white"><X className="h-4 w-4"/> Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => { saveNews([...news, newsForm]); setNewsForm({ id: "", title: "", excerpt: "", image: "", tag: "", date: "", category: "" }); }} className="inline-flex items-center gap-2 rounded-md bg-[--accent] px-3 py-2 text-sm font-semibold text-white hover:bg-[--accent-600]"><Plus className="h-4 w-4"/> Add</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === "artists" && (
        <section className="space-y-4">
          <SectionHeader icon={Users2} title="Artists" subtitle="Create, edit, delete artists" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-2">
              {artists.length === 0 && <Empty>No artists yet. Add your first artist.</Empty>}
              {artists.map((a) => (
                <div key={a.slug} className="flex flex-col gap-3 rounded-xl border bg-[--card] p-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{a.name}</p>
                    <p className="truncate text-xs text-zinc-400">/{a.slug}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditingId(a.slug); setArtistForm(a); }} className="rounded-md bg-[--accent]/15 px-2 py-1 text-sm font-medium text-[--accent] hover:bg-[--accent]/25"><Edit3 className="mr-1 inline h-4 w-4"/> Edit</button>
                    <button onClick={() => saveArtists(artists.filter(x => x.slug !== a.slug))} className="rounded-md border px-2 py-1 text-sm text-zinc-200 hover:border-[--accent]/50 hover:text-white"><Trash2 className="mr-1 inline h-4 w-4"/> Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-[--card] p-4">
              <h3 className="mb-2 text-sm font-semibold text-[--accent]">{editingId ? "Edit Artist" : "Add Artist"}</h3>
              <div className="space-y-2">
                <TextInput placeholder="Name" value={artistForm.name} onChange={(e) => setArtistForm({ ...artistForm, name: e.target.value, slug: slugify(e.target.value) })} />
                <TextInput placeholder="Slug" value={artistForm.slug} onChange={(e) => setArtistForm({ ...artistForm, slug: e.target.value })} />
                <TextArea placeholder="Bio" value={artistForm.bio} onChange={(e) => setArtistForm({ ...artistForm, bio: e.target.value })} />
                <TextInput placeholder="Stat" value={artistForm.stat} onChange={(e) => setArtistForm({ ...artistForm, stat: e.target.value })} />
                <div className="flex gap-2 pt-1">
                  {editingId ? (
                    <>
                      <button onClick={() => { saveArtists(artists.map(n => n.slug === editingId ? artistForm : n)); setEditingId(null); setArtistForm({ name: "", slug: "", bio: "", stat: "" }); }} className="inline-flex items-center gap-2 rounded-md bg-[--accent] px-3 py-2 text-sm font-semibold text-white hover:bg-[--accent-600]"><Save className="h-4 w-4"/> Save</button>
                      <button onClick={() => { setEditingId(null); }} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-zinc-200 hover:border-[--accent]/50 hover:text-white"><X className="h-4 w-4"/> Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => { saveArtists([...artists, artistForm]); setArtistForm({ name: "", slug: "", bio: "", stat: "" }); }} className="inline-flex items-center gap-2 rounded-md bg-[--accent] px-3 py-2 text-sm font-semibold text-white hover:bg-[--accent-600]"><Plus className="h-4 w-4"/> Add</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {tab === "videos" && (
        <section className="space-y-4">
          <SectionHeader icon={PlayCircle} title="Videos" subtitle="Create, edit, delete videos" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2 space-y-2">
              {videos.length === 0 && <Empty>No videos yet. Add your first video.</Empty>}
              {videos.map((v) => (
                <div key={v.id} className="flex flex-col gap-3 rounded-xl border bg-[--card] p-4 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{v.title}</p>
                    <p className="truncate text-xs text-zinc-400">{v.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => { setEditingId(v.id); setVideoForm(v); }} className="rounded-md bg-[--accent]/15 px-2 py-1 text-sm font-medium text-[--accent] hover:bg-[--accent]/25"><Edit3 className="mr-1 inline h-4 w-4"/> Edit</button>
                    <button onClick={() => saveVideos(videos.filter(x => x.id !== v.id))} className="rounded-md border px-2 py-1 text-sm text-zinc-200 hover:border-[--accent]/50 hover:text-white"><Trash2 className="mr-1 inline h-4 w-4"/> Delete</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl border bg-[--card] p-4">
              <h3 className="mb-2 text-sm font-semibold text-[--accent]">{editingId ? "Edit Video" : "Add Video"}</h3>
              <div className="space-y-2">
                <TextInput placeholder="ID" value={videoForm.id} onChange={(e) => setVideoForm({ ...videoForm, id: e.target.value })} />
                <TextInput placeholder="Title" value={videoForm.title} onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} />
                <TextInput placeholder="Thumbnail URL" value={videoForm.thumb} onChange={(e) => setVideoForm({ ...videoForm, thumb: e.target.value })} />
                <TextArea placeholder="Description" value={videoForm.description} onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} />
                <div className="flex gap-2 pt-1">
                  {editingId ? (
                    <>
                      <button onClick={() => { saveVideos(videos.map(n => n.id === editingId ? videoForm : n)); setEditingId(null); setVideoForm({ id: "", title: "", thumb: "", description: "" }); }} className="inline-flex items-center gap-2 rounded-md bg-[--accent] px-3 py-2 text-sm font-semibold text-white hover:bg-[--accent-600]"><Save className="h-4 w-4"/> Save</button>
                      <button onClick={() => { setEditingId(null); }} className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm text-zinc-200 hover:border-[--accent]/50 hover:text-white"><X className="h-4 w-4"/> Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => { saveVideos([...videos, videoForm]); setVideoForm({ id: "", title: "", thumb: "", description: "" }); }} className="inline-flex items-center gap-2 rounded-md bg-[--accent] px-3 py-2 text-sm font-semibold text-white hover:bg-[--accent-600]"><Plus className="h-4 w-4"/> Add</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
