# Sivaram Charan — Portfolio

A modern, responsive personal portfolio built with **React + Vite + Tailwind CSS**, powered by **Framer Motion** (animation) and **Lenis** (smooth scrolling).

---

## 🚀 Quick Start

```bash
npm install     # install dependencies
npm run dev     # start dev server → http://localhost:5173
npm run build   # production build → /dist
npm run preview # preview the production build locally
```

---

## 📁 Project Structure

```
sivaram-portfolio/
├── public/                    # static assets (served as-is)
│   ├── images/                # project screenshots + responsive -480w/-720w variants
│   ├── Sivaram_SoftwareEngineer.pdf
│   ├── favicon.*  · og-image.png · site.webmanifest
│   ├── robots.txt · sitemap.xml · _headers
│
├── src/
│   ├── components/            # one folder per section/feature
│   │   ├── Preloader/  Navbar/  Hero/  About/  Skills/
│   │   ├── Projects/   Experience/  GithubStats/  Contact/  Footer/
│   │   ├── CommandPalette/  CustomCursor/  BackToTop/  ScrollProgress/
│   │   └── EasterEgg/  Toast/  Icons.jsx
│   ├── context/ThemeContext.jsx
│   ├── data/portfolioData.js  # ⭐ all personal content lives here
│   ├── hooks/                 # useLenis · useTypewriter · useGithubStats
│   ├── utils/                 # scroll.js · audio.js (Web Audio sound FX)
│   ├── styles/globals.css     # Tailwind import + design tokens + utilities
│   ├── App.jsx                # root component
│   └── main.jsx               # entry point
│
├── index.html                 # meta tags, fonts, structured data
├── vite.config.js · tailwind.config.js · postcss.config.js
└── package.json
```

---

## ✏️ How to Customize Content

**All personal content lives in one file: `src/data/portfolioData.js`**

| Export | Controls |
|---|---|
| `personalInfo` | Name, email, GitHub, LinkedIn, resume URL, availability status |
| `heroRoles` | Typewriter roles (exported for reuse; Hero currently uses static headline) |
| `stats` | Stat cards in the About section |
| `skillsCategory` | Skill categories + proficiency levels (Skills section also defines its own category tabs) |
| `projects` | Project cards & case studies (add a `tags` array to enable filtering) |
| `experience` | Career/internship/education entries |

> **Project filters** are derived from each project's `tags` array, so to show a project in a new category, just add that tag to it.

---

## 📧 Contact Form (EmailJS)

The contact form sends through [EmailJS](https://www.emailjs.com) (free tier: 200 emails/month).

Copy `.env.example` to `.env` and fill in your three values — see `src/components/Contact/EMAILJS_SETUP.md` for full instructions:

```
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
VITE_EMAILJS_PUBLIC_KEY=...
```

`.env` is gitignored and is **not** deployed. When you deploy, add the same three `VITE_EMAILJS_*` variables in your host's environment settings.

The form shows a **real success/error state** — if sending fails, the visitor sees a clear error with a direct email fallback (nothing is silently dropped).

---

## 📊 GitHub Stats

The *Open Source Telemetry* section fetches **live, verifiable** data from the GitHub API via `src/hooks/useGithubStats.js` (repo count, followers, and language distribution). The GitHub username is defined in `src/components/GithubStats/GithubStats.jsx`.

---

## 🌍 Deploy

```bash
npm run build
# Upload the generated /dist folder to your host:
#   Vercel / Netlify: framework auto-detected as Vite
```

---

## 🎨 Design System

Brand palette lives in `index.html`/`tailwind.config.js` (orange `#ff5722`, amber `#ff8c00`, dark `#0b0c10`). Typography: **Syne** (headings), **Space Grotesk** (body), **JetBrains Mono** (mono). Global utilities and CSS variables are in `src/styles/globals.css`.