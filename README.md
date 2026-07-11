# Sivaram Charan — Portfolio

A modern, responsive personal portfolio built with **React + Vite**.  
Zero external CSS frameworks — all styles are hand-written vanilla CSS using CSS variables.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
# → Opens at http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📁 Project Structure

```
sivaram-portfolio/
├── public/
│   └── resume.pdf              ← Drop your resume PDF here
│
├── src/
│   ├── components/
│   │   ├── Preloader/
│   │   │   ├── Preloader.jsx   ← Loading animation
│   │   │   └── Preloader.css
│   │   ├── Navbar/
│   │   │   ├── Navbar.jsx      ← Sticky nav + theme toggle
│   │   │   └── Navbar.css
│   │   ├── Hero/
│   │   │   ├── Hero.jsx        ← Landing section + typewriter
│   │   │   └── Hero.css
│   │   ├── About/
│   │   │   ├── About.jsx       ← Bio + avatar + stats
│   │   │   └── About.css
│   │   ├── Skills/
│   │   │   ├── Skills.jsx      ← Skill category cards
│   │   │   └── Skills.css
│   │   ├── Projects/
│   │   │   ├── Projects.jsx    ← Filterable project cards
│   │   │   └── Projects.css
│   │   ├── Experience/
│   │   │   ├── Experience.jsx  ← Animated timeline
│   │   │   └── Experience.css
│   │   ├── Contact/
│   │   │   ├── Contact.jsx     ← Validated contact form
│   │   │   └── Contact.css
│   │   └── Footer/
│   │       ├── Footer.jsx
│   │       └── Footer.css
│   │
│   ├── context/
│   │   └── ThemeContext.jsx    ← Dark/light mode state
│   │
│   ├── data/
│   │   └── portfolioData.js    ← ⭐ Edit YOUR content here
│   │
│   ├── hooks/
│   │   ├── useScrollReveal.js  ← IntersectionObserver hook
│   │   └── useTypewriter.js    ← Typewriter animation hook
│   │
│   ├── styles/
│   │   └── globals.css         ← CSS variables + utilities
│   │
│   ├── App.jsx                 ← Root component
│   └── main.jsx                ← Entry point
│
├── index.html
├── vite.config.js
└── package.json
```

---

## ✏️ How to Customise Content

**All your personal content lives in one file:**

```
src/data/portfolioData.js
```

Edit these exports:
| Export | What it controls |
|---|---|
| `personalInfo` | Name, email, GitHub, LinkedIn, resume URL |
| `stats` | The 4 stat numbers in the About section |
| `aboutTags` | The tag chips under your bio |
| `skills` | Skill categories and their items |
| `projects` | Project cards — add/remove objects here |
| `experience` | Timeline entries |

---

## 🌐 Deploy to Netlify (easiest)

```bash
npm run build
# Drag the generated /dist folder to https://app.netlify.com/drop
```

## 🌐 Deploy to Vercel

```bash
npm install -g vercel
vercel
# Follow prompts — framework auto-detected as Vite
```

## 🌐 Deploy to GitHub Pages

```bash
# 1. Add homepage to package.json
#    "homepage": "https://YOUR_USERNAME.github.io/sivaram-portfolio"

# 2. Install gh-pages
npm install -D gh-pages

# 3. Add scripts to package.json
#    "predeploy": "npm run build",
#    "deploy": "gh-pages -d dist"

# 4. Deploy
npm run deploy
```

---

## 📧 Wire Up Real Email (Contact Form)

Install EmailJS:
```bash
npm install @emailjs/browser
```

In `Contact.jsx`, replace the `// TODO` comment with:
```js
import emailjs from '@emailjs/browser';

emailjs.send(
  'YOUR_SERVICE_ID',    // from emailjs.com dashboard
  'YOUR_TEMPLATE_ID',
  { name: form.name, email: form.email, message: form.message },
  'YOUR_PUBLIC_KEY'
).then(() => setSent(true));
```

Sign up free at [emailjs.com](https://emailjs.com) — 200 emails/month free.

---

## 🎨 Changing the Colour Scheme

All colours are CSS variables in `src/styles/globals.css`:

```css
:root {
  --cyan:   #00f5ff;   /* primary accent */
  --purple: #a855f7;   /* secondary accent */
  --pink:   #ec4899;   /* gradient end */
  --green:  #10b981;   /* "available" badge */
  --bg:     #050816;   /* darkest background */
}
```

Change `--cyan` and `--purple` to any two colours and the entire site updates instantly.
