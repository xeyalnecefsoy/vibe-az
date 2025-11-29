# 🚀 Deployment Guide: Railway + Netlify

Complete guide for deploying **vibe-az** to production using Railway (Strapi CMS) and Netlify (Next.js frontend).

---

## 📋 Prerequisites

- [ ] GitHub account (for both Railway and Netlify)
- [ ] Credit card for Railway verification (won't be charged in free tier)
- [ ] Your vibe-az project pushed to GitHub

---

## Part 1: Deploy Strapi CMS to Railway

### Step 1: Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"** or **"Login with GitHub"**
3. Authorize Railway to access your GitHub repositories

### Step 2: Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your **vibe-az** repository
4. Railway will detect the monorepo structure

### Step 3: Configure Strapi Service

1. Railway will ask which directory to deploy - select **`vibe-az-cms`**
2. Click **"Add variables"** to configure environment variables
3. Add the following environment variables:

```bash
# Generate secure keys using this command in your terminal:
# node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

HOST=0.0.0.0
PORT=1337
NODE_ENV=production

# Generate 4 different keys for these:
APP_KEYS=<generate-key-1>,<generate-key-2>,<generate-key-3>,<generate-key-4>
API_TOKEN_SALT=<generate-key>
ADMIN_JWT_SECRET=<generate-key>
TRANSFER_TOKEN_SALT=<generate-key>
JWT_SECRET=<generate-key>

# Database (Railway provides this automatically)
DATABASE_CLIENT=postgres
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### Step 4: Add PostgreSQL Database

1. In your Railway project, click **"New"** → **"Database"** → **"Add PostgreSQL"**
2. Railway will automatically create a PostgreSQL database
3. The `DATABASE_URL` will be automatically linked to your Strapi service

### Step 5: Set Public URL

1. Go to your Strapi service **Settings** tab
2. Click **"Generate Domain"** to get a public URL (e.g., `vibe-az-cms.up.railway.app`)
3. Copy this URL
4. Add two more environment variables:
   ```
   URL=https://vibe-az-cms.up.railway.app
   STRAPI_ADMIN_BACKEND_URL=https://vibe-az-cms.up.railway.app
   ```
   *(Replace with your actual Railway URL)*

### Step 6: Deploy

1. Railway will automatically deploy after you save environment variables
2. Wait 3-5 minutes for the build to complete
3. Check the **"Deployments"** tab for build logs
4. Once deployed, visit `https://your-app.up.railway.app/admin`

### Step 7: Create Strapi Admin Account

1. Visit `https://your-app.up.railway.app/admin`
2. Create your admin account (first user becomes super admin)
3. Login to the Strapi admin panel

### Step 8: Add Content

1. Create at least one item in each content type:
   - **News Articles** (with cover image)
   - **Artists** (with profile/cover images)
   - **Videos** (with thumbnail)
   - **Categories**
2. Make sure to **Publish** each item (not just save as draft)

### Step 9: Generate API Token (Optional but Recommended)

1. In Strapi admin, go to **Settings** → **API Tokens**
2. Click **"Create new API Token"**
3. Name: `Next.js Frontend`
4. Token type: **Read-only**
5. Token duration: **Unlimited**
6. Copy the generated token (you'll need it for Netlify)

---

## Part 2: Deploy Next.js to Netlify

### Step 1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"** and choose **"GitHub"**
3. Authorize Netlify to access your repositories

### Step 2: Create New Site

1. Click **"Add new site"** → **"Import an existing project"**
2. Choose **"Deploy with GitHub"**
3. Select your **vibe-az** repository
4. Netlify will detect Next.js automatically

### Step 3: Configure Build Settings

Netlify should auto-detect these, but verify:

- **Base directory**: *(leave empty - root of repo)*
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: `20`

### Step 4: Add Environment Variables

Before deploying, click **"Add environment variables"**:

```bash
NEXT_PUBLIC_STRAPI_URL=https://your-railway-app.up.railway.app
```

*(Replace with your actual Railway Strapi URL from Part 1, Step 5)*

**Optional**: If you created an API token in Strapi:
```bash
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token-from-strapi
```

### Step 5: Deploy

1. Click **"Deploy site"**
2. Wait 2-3 minutes for build to complete
3. Netlify will provide a URL like `https://random-name-123.netlify.app`

### Step 6: Verify Deployment

1. Visit your Netlify URL
2. Check that:
   - ✅ Homepage loads
   - ✅ News articles appear (from Strapi)
   - ✅ Artists page shows content
   - ✅ Videos page shows content
   - ✅ Images load correctly from Railway

### Step 7: Custom Domain (Optional)

1. In Netlify, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Follow instructions to configure DNS

---

## Part 3: Connect Everything

### Update Railway URL in Netlify

If you change your Railway domain or need to update:

1. Go to Netlify → **Site settings** → **Environment variables**
2. Edit `NEXT_PUBLIC_STRAPI_URL` with new Railway URL
3. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy**

### Enable CORS in Strapi (if needed)

If you get CORS errors:

1. In Railway, add environment variable:
   ```
   STRAPI_ADMIN_CLIENT_URL=https://your-netlify-site.netlify.app
   ```
2. Redeploy Strapi service

---

## 🔧 Troubleshooting

### Strapi won't start on Railway

**Check:**
- All environment variables are set correctly
- PostgreSQL database is connected
- Build logs for errors: Railway → Deployments → View logs

**Common fix:**
```bash
# Make sure APP_KEYS is comma-separated (no spaces):
APP_KEYS=key1,key2,key3,key4
```

### Next.js shows "Failed to fetch from Strapi"

**Check:**
1. Strapi is running: visit `https://your-railway-url.up.railway.app/api/news-articles`
2. Environment variable is correct in Netlify
3. Content is **Published** in Strapi (not draft)

**Fix:**
- Netlify → Site settings → Environment variables → Verify `NEXT_PUBLIC_STRAPI_URL`
- Trigger new deploy: Deploys → Trigger deploy → Clear cache and deploy

### Images not loading

**Check:**
1. Images are uploaded in Strapi
2. Railway URL is in `next.config.ts` remote patterns (already configured)
3. Images are accessible: `https://your-railway-url.up.railway.app/uploads/filename.jpg`

### Database connection errors

**Check:**
- PostgreSQL service is running in Railway
- `DATABASE_URL` variable uses `${{Postgres.DATABASE_URL}}` syntax
- Database and Strapi service are in the same Railway project

---

## 📊 Monitoring & Costs

### Railway Free Tier
- **$5 credit per month** (≈500 execution hours)
- Monitor usage: Railway → Project → Usage tab
- Upgrade if needed: Railway → Project → Settings → Subscription

### Netlify Free Tier
- **100GB bandwidth/month**
- **300 build minutes/month**
- Monitor: Netlify → Team overview → Usage

---

## 🔄 Making Updates

### Update Strapi Content
1. Login to Railway Strapi admin: `https://your-app.up.railway.app/admin`
2. Add/edit content
3. Publish changes
4. Content appears immediately on Netlify site

### Update Strapi Code
1. Push changes to GitHub `vibe-az-cms` directory
2. Railway auto-deploys (watch Deployments tab)
3. Wait 3-5 minutes

### Update Next.js Code
1. Push changes to GitHub (root or `src` directory)
2. Netlify auto-deploys (watch Deploys tab)
3. Wait 2-3 minutes

---

## ✅ Success Checklist

- [ ] Strapi admin accessible at Railway URL
- [ ] PostgreSQL database connected
- [ ] Sample content created and published
- [ ] Next.js site deployed to Netlify
- [ ] Homepage shows news from Strapi
- [ ] Artists page shows content
- [ ] Videos page shows content
- [ ] Images load from Railway
- [ ] No console errors in browser DevTools

---

## 🆘 Need Help?

**Railway Issues:**
- [Railway Docs](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway)

**Netlify Issues:**
- [Netlify Docs](https://docs.netlify.com)
- [Netlify Support](https://www.netlify.com/support/)

**Strapi Issues:**
- [Strapi Docs](https://docs.strapi.io)
- [Strapi Discord](https://discord.strapi.io)

---

## 🎉 You're Done!

Your vibe-az project is now live in production! 

**Next steps:**
- Add more content in Strapi
- Configure custom domain
- Set up automatic backups for PostgreSQL
- Monitor usage and performance
