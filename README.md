# BIM Earth Consultancy — Website

Marketing website for BIM Earth Consultancy (Architecture, Interior Design, BIM services and BIM training), with a **Decap CMS** admin panel so content can be edited without touching code.

---

## Tech stack

- **Frontend**: React 19, TypeScript, Vite 6, React Router 7
- **Styling**: Tailwind CSS v4 (theme tokens in `src/index.css`)
- **Animations / icons**: `motion/react`, `lucide-react`
- **Forms**: EmailJS (Contact and Booking pages) — see [emailjs.md](emailjs.md)
- **CMS**: Decap CMS 3 (git-based; content is committed to the repo)
- **Hosting**: Netlify (Identity + Git Gateway for admin login)

## How content works

There is no database. All site content is JSON in `src/content/`:

| Type | Location | Loaded by |
| --- | --- | --- |
| Single pages (homepage, about, founder, services, contact, legal, settings, seo) | `src/content/*.json` | direct `import` |
| Collections (projects, gallery, testimonials, faqs, team-members, clients, certifications, blog) | `src/content/<collection>/*.json` | `import.meta.glob(...)`, sorted by `order` |

Images live in `public/` (project photos in `public/ProjectImages/<Project Name>/`). Images uploaded through the CMS go to `public/uploads/`.

The CMS field definitions are in [public/admin/config.yml](public/admin/config.yml). **If you add a new field to a JSON file, add it to `config.yml` too**, otherwise it can't be edited in the admin panel.

---

## Local development

```bash
npm install
npm run dev            # site at http://localhost:3000
```

### Using the admin panel locally

`config.yml` has `local_backend: true`, so the CMS can write straight to your local files without logging in. Run the Decap proxy server in a second terminal:

```bash
npx decap-server
```

Then open `http://localhost:3000/admin/`. Saved changes are written to `src/content/` — commit and push them like any other change.

### Environment variables

Copy `.env.example` to `.env.local` and fill in the EmailJS keys. Without them, the forms run in a simulated "sandbox" mode and no email is sent.

---

## Deployment (Netlify)

Build settings and the SPA redirect (so links like `/about` work on refresh) are in [netlify.toml](netlify.toml).

1. Import the GitHub repo into Netlify (build command `npm run build`, publish directory `dist` — picked up automatically from `netlify.toml`).
2. **Site configuration → Environment variables**: add `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, then redeploy.
3. **Enable admin login**:
   - Site configuration → **Identity** → Enable Identity.
   - Registration → set to **Invite only** (so strangers can't sign up as admins).
   - Identity → Services → **Git Gateway** → Enable.
   - Identity → **Invite users** → invite each admin's email.
4. Admins sign in at `https://<your-site>/admin/`. Each save is committed to the `main` branch, and Netlify rebuilds the site automatically (usually 1–2 minutes).

> Note: Netlify Identity is deprecated for new sites. If it isn't available on your account, switch `backend` in `config.yml` to `name: github` with `repo: <owner>/<repo>` and set up a GitHub OAuth app in Netlify (Site configuration → Access & security → OAuth).

---

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run lint` | TypeScript type-check |

## Theme customization

Fonts and accent colours are defined in the `@theme` block at the top of `src/index.css`.
