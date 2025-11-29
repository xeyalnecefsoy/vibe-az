import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const STRAPI_URL = 'http://127.0.0.1:1337';

const mockNews = [
  {
    title: "Yeni albom: Baku Beats vol. 2 — yerli səhnədə səs-küy",
    excerpt: "Bakının ən istedadlı prodüserləri bir araya gəlib təzə sədalarla dolu kompilasiya təqdim etdilər.",
    imageUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop", // Vinyl/DJ
    tag: "Release",
    date: "2025-11-11",
    category: "Release"
  },
  {
    title: "İntervyu: Gənc MC ilə şəhər ritmləri və lirika barədə söhbət",
    excerpt: "Rap səhnəsinin yüksələn ulduzu ilham mənbələri və gələcək planları haqqında danışdı.",
    imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop", // Microphone
    tag: "Interview",
    date: "2025-11-09",
    category: "Interview"
  },
  {
    title: "Klip premyerası: Qaranlıq tonlarda güclü mesaj",
    excerpt: "Sənətçinin yeni klipi vizual estetika və hekayəçiliklə diqqət çəkir.",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop", // DJ/Party
    tag: "Video",
    date: "2025-11-06",
    category: "Video"
  },
  {
    title: "Səhnə arxası: studiya prosesindən qeydlər",
    excerpt: "Prodüser komandası yazım prosesinin sirrlərini bölüşür.",
    imageUrl: "https://images.unsplash.com/photo-1598653222000-6b7b7a552625?q=80&w=1200&auto=format&fit=crop", // Studio console
    tag: "Feature",
    date: "2025-11-03",
    category: "Feature"
  }
];

const mockArtists = [
  { name: "Northside MC", slug: "northside-mc", bio: "Bakı rep məktəbinin parlaq nümayəndəsi.", stat: "Yeni EP", image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=1200&auto=format&fit=crop" },
  { name: "BakuFlow", slug: "bakuflow", bio: "Yeni nəsil flow ustası.", stat: "Top single", image: "https://images.unsplash.com/photo-1520342868574-5fa3804e551c?q=80&w=1200&auto=format&fit=crop" },
  { name: "Qara Nota", slug: "qara-nota", bio: "Underground səslərin memarı.", stat: "Tour 2026", image: "https://images.unsplash.com/photo-1517230878791-4d28214057c2?q=80&w=1200&auto=format&fit=crop" },
];

const mockVideos = [
  {
    title: "Qaranlıq tonlarda güclü mesaj",
    description: "Rejissor işi və vizual effektləri ilə seçilən yeni klip.",
    thumbUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Şəhər gecələri: noir estetika",
    description: "Gecə həyatının ritmi və işıqları.",
    thumbUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Canlı sessiya: studiya improvisasiyası",
    description: "Heç bir hazırlıq olmadan yaranan musiqi.",
    thumbUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
];

const categories = ["Release", "Interview", "Live", "Video", "Feature"];

async function uploadImage(imageUrl, name) {
  try {
    const res = await fetch(imageUrl);
    if (!res.ok) throw new Error(`Failed to fetch image from ${imageUrl}: ${res.statusText}`);
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    const uniqueName = `${name}-${Date.now()}`;
    const formData = new FormData();
    formData.append('files', new Blob([buffer]), `${uniqueName}.jpg`);

    const uploadRes = await fetch(`${STRAPI_URL}/api/upload`, {
      method: 'POST',
      body: formData
    });

    if (!uploadRes.ok) throw new Error(`Failed to upload image: ${uploadRes.statusText}`);
    const data = await uploadRes.json();
    return data[0]; // Returns the uploaded file object
  } catch (error) {
    console.error(`Error uploading image ${name}:`, error);
    return null;
  }
}

async function createEntry(endpoint, data) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    
    if (!res.ok) {
        const err = await res.json();
        console.error(`Failed to create ${endpoint}:`, JSON.stringify(err, null, 2));
        return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`Error creating ${endpoint}:`, error);
    return null;
  }
}

async function findEntry(endpoint, filters) {
  try {
    const query = new URLSearchParams(filters).toString();
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}?${query}`);
    const data = await res.json();
    return data.data && data.data.length > 0 ? data.data[0] : null;
  } catch (error) {
    console.error(`Error finding entry in ${endpoint}:`, error);
    return null;
  }
}

async function updateEntry(endpoint, id, data) {
  try {
    const res = await fetch(`${STRAPI_URL}/api/${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    return await res.json();
  } catch (error) {
    console.error(`Error updating ${endpoint}/${id}:`, error);
    return null;
  }
}

async function main() {
  console.log('Starting migration...');

  // 1. Create Categories
  console.log('Creating categories...');
  const categoryMap = {};
  for (const cat of categories) {
    const existing = await findEntry('categories', { 'filters[name][$eq]': cat });
    if (existing) {
        categoryMap[cat] = existing;
        console.log(`Category ${cat} already exists.`);
        continue;
    }

    const created = await createEntry('categories', {
      name: cat,
      slug: cat.toLowerCase(),
      description: `${cat} category`
    });
    if (created) categoryMap[cat] = created.data;
  }

  // 2. Create News Articles
  console.log('Creating news articles...');
  for (const news of mockNews) {
    const slug = news.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await findEntry('news-articles', { 'filters[slug][$eq]': slug });
    
    const image = await uploadImage(news.imageUrl, news.tag);
    const entryData = {
      title: news.title,
      slug: slug,
      excerpt: news.excerpt,
      content: news.excerpt,
      tag: news.tag,
      publishedAt: new Date(news.date).toISOString(),
      coverImage: image ? image.id : null,
      featured: true
    };

    if (existing) {
      console.log(`News ${news.title} exists. Updating...`);
      if (image) {
        await updateEntry('news-articles', existing.documentId, { coverImage: image.id });
      } else {
        console.log(`Skipping image update for ${news.title} because upload failed.`);
      }
    } else {
      console.log(`Creating News ${news.title}...`);
      await createEntry('news-articles', entryData);
    }
  }

  // 3. Create Artists
  console.log('Creating artists...');
  for (const artist of mockArtists) {
    const existing = await findEntry('artists', { 'filters[slug][$eq]': artist.slug });
    const image = await uploadImage(artist.image, artist.slug);
    
    const entryData = {
      name: artist.name,
      slug: artist.slug,
      bio: artist.bio,
      profileImage: image ? image.id : null,
      coverImage: image ? image.id : null,
      featured: true
    };

    if (existing) {
      console.log(`Artist ${artist.name} exists. Updating...`);
      if (image) {
        await updateEntry('artists', existing.documentId, { profileImage: image.id, coverImage: image.id });
      } else {
        console.log(`Skipping image update for ${artist.name} because upload failed.`);
      }
    } else {
      console.log(`Creating Artist ${artist.name}...`);
      await createEntry('artists', entryData);
    }
  }

  // 4. Create Videos
  console.log('Creating videos...');
  for (const video of mockVideos) {
    const slug = video.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const existing = await findEntry('videos', { 'filters[slug][$eq]': slug });
    
    const image = await uploadImage(video.thumbUrl, video.title.substring(0, 10));
    const entryData = {
      title: video.title,
      slug: slug,
      description: video.description,
      videoUrl: video.videoUrl,
      thumbnail: image ? image.id : null,
      featured: true
    };

    if (existing) {
      console.log(`Video ${video.title} exists. Updating...`);
      if (image) {
        await updateEntry('videos', existing.documentId, { thumbnail: image.id });
      } else {
        console.log(`Skipping image update for ${video.title} because upload failed.`);
      }
    } else {
      console.log(`Creating Video ${video.title}...`);
      await createEntry('videos', entryData);
    }
  }

  console.log('Migration complete!');
}

main();
