# BIM Earth - Enterprise Digital Twin & Sustainable Architecture Platform

BIM Earth is an ultra-premium, interactive website designed for advanced architectural consultation, computational BIM engineering, high-fidelity virtual twin design, and curated interior spaces. 

Designed with a high-contrast **Technical Biophilic & Parametric Cyber-Earth** theme, it leverages state-of-the-art interactive micro-animations, glassmorphism containers, and a clean typography grid.

---

## 🛠️ Technology Stack & Architecture

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (with native CSS nesting and `@theme` variables)
- **Animations**: `motion/react` for buttery-smooth page entries, hovering transitions, and modal overlays
- **Icons**: `lucide-react` (clean, unified vector symbols)
- **CMS Admin**: Decap CMS (a secure, Git-based flat-file management system)
- **Data Engine**: Flat-file JSON structure. No heavy SQL/NoSQL cloud database is required. The UI dynamically imports and processes records using Vite’s hyper-fast globbing engine:
  ```typescript
  const modules = import.meta.glob('/src/content/blog/*.json', { eager: true });
  ```

---

## 🧭 How to Access and Use the Admin Panel

The administration interface is fully configured and ready to use. You can manage everything from home slides, projects, clients, certifications, testimonials, FAQs, and blog posts without touching any code!

### 1. In Local Development / AI Studio Workspace
1. Simply append `/admin/` to your dev server URL:
   * **URL**: `http://localhost:3000/admin/` or `https://<preview-domain>/admin/`
2. Since `local_backend: true` is configured in `/public/admin/config.yml`, Decap CMS will detect your local workspace and allow you to log in instantly **without any password**.
3. All additions, edits, or deletions you perform in the admin interface will be written directly to your flat JSON files under `src/content/` in real-time!

### 2. In Production
When deployed to live servers, Decap CMS authenticates directly with GitHub to let you manage content. Changes saved in the CMS will be automatically committed as Git commits to your repo, triggering automatic redeployments!

To enable this:
1. Open `/public/admin/config.yml`.
2. Locate the `backend` configuration:
   ```yaml
   backend:
     name: github
     repo: owner/bim-earth-consultancy # <-- Change this to your GitHub username and repo name!
     branch: main
   ```
3. Set up an **OAuth Gateway** (details below in the Deployment section) so users can sign in with their GitHub account.

---

## 🚀 Step-by-Step Deployment Guide

Since this is a lightning-fast Single-Page Application (SPA) compiled into highly-optimized static HTML, CSS, and JS files, it can be deployed for **100% free** on edge-hosting services.

### Choice A: Netlify (Highly Recommended for Decap CMS)
Netlify provides native, zero-config support for Decap CMS authentication via its **Identity** feature.

1. **Upload your code to GitHub**: Create a repository on GitHub and push your code files.
2. **Deploy to Netlify**:
   - Log in to [Netlify](https://www.netlify.com/).
   - Click **Add new site** > **Import an existing project** > Choose **GitHub**.
   - Select your `bim-earth-consultancy` repository.
   - Configure the build settings:
     * **Build Command**: `npm run build`
     * **Publish directory**: `dist`
   - Click **Deploy**.
3. **Configure Decap CMS (Git Gateway)**:
   - In Netlify, go to **Site settings** > **Identity**.
   - Click **Enable Identity service**.
   - Under **Registration preferences**, change to *Invite only* (so random visitors can't register as admins!).
   - Scroll down to **Services** > **Git Gateway**, and click **Enable Git Gateway** (it will prompt you to connect your GitHub account).
4. **Done!** Access `https://<your-netlify-site>.netlify.app/admin/`, sign in using Netlify Identity, and start writing articles and publishing projects!

---

### Choice B: Vercel
Vercel is extremely fast and compiles Vite sites in seconds.

1. Create a repository on GitHub and push your code.
2. Log in to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
3. Import your repository.
4. Vercel automatically detects Vite. Ensure the build command is `npm run build` and the output directory is `dist`.
5. Click **Deploy**.
6. **Decap CMS Auth on Vercel**:
   - Since Vercel doesn't have an Identity widget built-in, you can use a simple third-party OAuth helper like [GitHub-OAuth-Gateway](https://github.com/vnoitcoder/github-oauth-gateway) or [decapi](https://github.com/iampatrick/decapi) to manage admin logins.
   - Simply host the helper on a free service (e.g., Vercel, Render) and add the server gateway URL to your `/public/admin/config.yml` backend block:
     ```yaml
     backend:
       name: github
       repo: username/repo
       base_url: https://your-oauth-gateway.vercel.app # <-- Add this
     ```

---

### Choice C: Google Cloud Run (Container Deployment)
If your infrastructure requires containerized hosting:

1. **Dockerize**: Build a production static file container using Nginx or light Node servers.
2. **Build the assets**:
   ```bash
   npm run build
   ```
3. Use your container deployment workflow to serve the static `dist/` assets on Port `3000` or port `8080` behind your ingress proxy.

---

## 🎨 Theme Customization Cheat Sheet

Want to tweak the color accents or typography in the future? 

Open `src/index.css` and look under the `@theme` block:
```css
@theme {
  --font-sans: 'Plus Jakarta Sans', sans-serif; /* Body copy & standard UI */
  --font-display: 'Space Grotesk', sans-serif; /* High-end display headings */
  --font-mono: 'JetBrains Mono', monospace;     /* Coordinate grids & stats */
  
  --color-accent-blue: #10b981;                /* Emerald sustainability accent */
  --color-accent-emerald: #10b981;             /* Primary biophilic color */
  --color-accent-cyan: #06b6d4;                /* High-fidelity digital twin cyan */
}
```

Simply update these Tailwind color variables or Google Font URLs at the top of the file to instantly restyle the entire corporate ecosystem!
