# 🎵 Vibe.az - Azərbaycan Rap Səhnəsinin Rəqəmsal Platforması

Azərbaycan rep musiqi səhnəsindən ən son xəbərlər, kliplər, intervyular və sənətçi profilləri üçün müasir, dinamik veb platforması.

## 🌐 Canlı Linklər

- **Website**: [vibe-az.netlify.app](https://vibe-az.netlify.app)
- **Admin Panel**: [vibe-az-production.up.railway.app/admin](https://vibe-az-production.up.railway.app/admin)

---

## 🛠️ Texnologiya Yığını

### Frontend (Next.js)

#### Core Framework
- **[Next.js 16.0.1](https://nextjs.org)** - React əsaslı server-side rendering framework
  - App Router (yeni Next.js arxitekturası)
  - Server Components (performans üçün)
  - Image Optimization (şəkil optimallaşdırması)
  - TypeScript dəstəyi

#### UI & Styling
- **[React 19.2.0](https://react.dev)** - İstifadəçi interfeysi kitabxanası
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[Lucide React](https://lucide.dev)** - Modern SVG ikonlar

#### Content Processing
- **[Marked](https://marked.js.org)** - Markdown-dan HTML-ə çevirmə

---

### Backend (Strapi CMS)

#### Headless CMS
- **[Strapi 5.31.2](https://strapi.io)** - Açıq mənbəli headless CMS
  - RESTful API
  - İstifadəçi idarəetməsi və rollar
  - Kontent növləri: News Articles, Artists, Videos, Categories
  - Media Library

#### Database
- **[PostgreSQL](https://www.postgresql.org)** - Əlaqəli verilənlər bazası
  - Railway-də host edilir
  - Strapi tərəfindən idarə olunur

#### Plugins
- **[@strapi/plugin-users-permissions](https://docs.strapi.io/user-docs/users-roles-permissions)** - İstifadəçi autentifikasiyası və icazələr
- **[@strapi/provider-upload-cloudinary](https://market.strapi.io/providers/@strapi-provider-upload-cloudinary)** - Cloudinary media yükləmə

---

## ☁️ Deployment & Hosting

### Frontend Hosting
- **[Netlify](https://netlify.com)**
  - Avtomatik GitHub deploymentləri
  - CDN ilə qlobal paylanma
  - Serverless Functions
  - 100GB/ay pulsuz bandwidth

### Backend Hosting
- **[Railway](https://railway.app)**
  - Strapi CMS host
  - PostgreSQL verilənlər bazası
  - Avtomatik deploymentlər
  - $5/ay pulsuz kredit

### Media Storage
- **[Cloudinary](https://cloudinary.com)**
  - Şəkil və media faylların saxlanması
  - Avtomatik optimallaşdırma
  - CDN ilə sürətli çatdırılma
  - 25GB/ay pulsuz storage

---

## 📁 Layihə Strukturu

```
vibe-az/
├── src/                          # Next.js frontend
│   ├── app/                      # App Router səhifələri
│   │   ├── page.tsx             # Ana səhifə
│   │   ├── news/                # Xəbərlər bölməsi
│   │   ├── artists/             # Sənətçilər
│   │   └── videos/              # Video kliplər
│   ├── components/              # React komponentləri
│   │   ├── NewsCard.tsx
│   │   ├── NavBar.tsx
│   │   └── ...
│   └── lib/
│       └── strapi.ts            # Strapi API client
├── vibe-az-cms/                 # Strapi CMS backend
│   ├── src/
│   │   └── api/                 # API endpoints
│   │       ├── news-article/
│   │       ├── artist/
│   │       ├── video/
│   │       └── category/
│   └── config/                  # Strapi konfiqurasiyası
│       ├── database.ts          # PostgreSQL config
│       ├── plugins.ts           # Cloudinary config
│       └── server.ts
├── public/                      # Statik fayllar
├── netlify.toml                 # Netlify konfiqurasiyası
├── railway.toml                 # Railway konfiqurasiyası
└── package.json
```

---

## 🚀 Lokal Development

### Tələblər
- Node.js 20.x və ya daha yuxarı
- npm 10.x və ya daha yuxarı

### Quraşdırma

1. **Repository-ni klonlayın**
```bash
git clone https://github.com/xeyalnecefsoy/vibe-az.git
cd vibe-az
```

2. **Frontend quraşdırması**
```bash
npm install
```

3. **Strapi CMS quraşdırması**
```bash
cd vibe-az-cms
npm install
```

4. **Environment dəyişənləri**

`.env.local` faylı yaradın (frontend üçün):
```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

5. **Development serverlərini işə salın**

Terminal 1 - Strapi:
```bash
cd vibe-az-cms
npm run develop
```

Terminal 2 - Next.js:
```bash
npm run dev
```

6. **Brauzerdə açın**
- Frontend: http://localhost:3000
- Strapi Admin: http://localhost:1337/admin

---

## 🔧 Əsas Xüsusiyyətlər

### Kontent İdarəetməsi
- ✅ Xəbər məqalələri (başlıq, məzmun, şəkil, kateqoriya)
- ✅ Sənətçi profilləri (bio, şəkillər, sosial linklər)
- ✅ Video kliplər (YouTube/Vimeo inteqrasiyası)
- ✅ Kateqoriyalar və teqlər
- ✅ Markdown dəstəyi (məqalə məzmunu üçün)

### İstifadəçi İdarəetməsi
- ✅ Çoxlu admin istifadəçiləri
- ✅ Rol əsaslı icazələr (Super Admin, Editor, Author)
- ✅ Təhlükəsiz autentifikasiya

### Performance
- ✅ Server-side rendering (SSR)
- ✅ Şəkil optimallaşdırması
- ✅ CDN ilə sürətli yükləmə
- ✅ Responsive dizayn (mobil, tablet, desktop)

### SEO
- ✅ Meta teqlər
- ✅ Semantic HTML
- ✅ Dinamik sitemap
- ✅ Open Graph protokolu

---

## 🔐 Environment Dəyişənləri

### Frontend (Netlify)
```env
NEXT_PUBLIC_STRAPI_URL=https://vibe-az-production.up.railway.app
```

### Backend (Railway)
```env
# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Security Keys
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your-salt
ADMIN_JWT_SECRET=your-secret
TRANSFER_TOKEN_SALT=your-salt
JWT_SECRET=your-secret

# Database
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}

# Cloudinary
CLOUDINARY_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret

# URLs
URL=https://vibe-az-production.up.railway.app
STRAPI_ADMIN_BACKEND_URL=https://vibe-az-production.up.railway.app
```

---

## 📊 API Endpoints

### News Articles
```
GET /api/news-articles?populate=*
GET /api/news-articles/:id?populate=*
```

### Artists
```
GET /api/artists?populate=*
GET /api/artists/:id?populate=*
```

### Videos
```
GET /api/videos?populate=*
GET /api/videos/:id?populate=*
```

### Categories
```
GET /api/categories
GET /api/categories/:id
```

---

## 🎨 Dizayn Xüsusiyyətləri

- **Dark Mode**: Müasir qaranlıq tema
- **Responsive**: Bütün ekran ölçüləri üçün adaptiv
- **Animations**: Smooth keçidlər və hover effektləri
- **Typography**: Oxunaqlı və estetik şrift seçimi
- **Color Scheme**: Vibrant purple accent (#a855f7)

---

## 📝 Kontent Əlavə Etmək

1. Admin panelinə daxil olun: `https://vibe-az-production.up.railway.app/admin`
2. **Content Manager** → İstədiyiniz kontent növünü seçin
3. **Create new entry** düyməsinə basın
4. Formu doldurun, şəkil yükləyin
5. **Save** və **Publish** düymələrinə basın
6. 1-2 dəqiqə gözləyin - kontent saytda görünəcək

---

## 🤝 Komanda Üzvləri Əlavə Etmək

1. **Settings** → **Users** → **Create new user**
2. Ad, soyad, email və şifrə daxil edin
3. **Role** seçin:
   - **Super Admin**: Tam giriş
   - **Editor**: Kontent idarəetməsi (tövsiyə olunur)
   - **Author**: Yalnız öz kontentini idarə edə bilər
4. **Save** düyməsinə basın
5. Yeni istifadəçiyə login məlumatlarını göndərin

---

## 🐛 Troubleshooting

### Şəkillər görünmür
- Cloudinary environment dəyişənlərini yoxlayın
- Strapi-də şəkillərin yüklənib-yüklənmədiyini yoxlayın
- Railway deployment loglarına baxın

### API 403 Forbidden
- Strapi **Settings** → **Roles** → **Public** → İcazələri yoxlayın
- `find` və `findOne` icazələrinin aktiv olduğundan əmin olun

### Build uğursuz olur
- `tsconfig.json`-da `vibe-az-cms` exclude olunub?
- `node_modules` silərək yenidən `npm install` edin

---

## 📄 Lisenziya

Bu layihə şəxsi və kommersiya məqsədləri üçün istifadə oluna bilər.

---

## 👨‍💻 Müəllif

**Xəyal Nəcəfsoy**
- GitHub: [@xeyalnecefsoy](https://github.com/xeyalnecefsoy)

---

## 🙏 Təşəkkürlər

- [Next.js](https://nextjs.org) - Framework
- [Strapi](https://strapi.io) - Headless CMS
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [Railway](https://railway.app) - Backend hosting
- [Netlify](https://netlify.com) - Frontend hosting
- [Cloudinary](https://cloudinary.com) - Media storage

---

**Uğurlar! 🚀**
