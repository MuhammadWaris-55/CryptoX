# CryptoX 🚀

> A modern, dark-themed cryptocurrency landing page built with React, Tailwind CSS, and React Icons.
---

## 📸 Preview

| Section | Description |
|---|---|
| 🦸 Hero | Animated gradient headline, floating crypto coins, dashboard mockup |
| 📊 Live Prices | BTC, ETH, SOL, DOGE cards with sparkline charts |
| 📈 Statistics | Animated counting numbers (120B+ volume, 10M+ users) |
| ⚙️ Features | Glassmorphism cards with icons |
| 📉 Market Trends | BTC/USD chart with timeframe toggle |
| 📣 CTA | Full-width gradient call-to-action banner |
| 🔗 Footer | Social links, quick links, newsletter subscribe |

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS v3](https://v3.tailwindcss.com) | Utility-first styling |
| [React Icons](https://react-icons.github.io/react-icons) | Icon library (FA, SI sets) |
| [Google Fonts – Outfit](https://fonts.google.com/specimen/Outfit) | Typography |

---

## 📁 Project Structure

```
cryptox/
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx          # Root component — renders CryptoX
│   ├── CryptoX.jsx      # Main landing page (all sections)
│   ├── index.css        # Tailwind directives
│   └── main.jsx         # React entry point
├── index.html
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚡ Getting Started

### Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org) v18 or higher
- npm v9 or higher

### Installation

**1. Create the Vite + React project**

```bash
npm create vite@latest cryptox -- --template react
cd cryptox
```

**2. Install dependencies**

```bash
npm install
```

**3. Install Tailwind CSS v3**

> ⚠️ Use `tailwindcss@3` — Tailwind v4 removed the config file and will break setup.

```bash
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

**4. Install React Icons**

```bash
npm install react-icons
```

**5. Configure Tailwind**

Update `tailwind.config.js`:

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**6. Add Tailwind to CSS**

Replace everything in `src/index.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**7. Add the page component**

Copy `CryptoX.jsx` into `src/` and update `src/App.jsx`:

```jsx
import CryptoX from './CryptoX'

export default function App() {
  return <CryptoX />
}
```

**8. Make sure index.css is imported**

In `src/main.jsx`, confirm this line exists:

```js
import './index.css'
```

**9. Start the dev server**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 All Packages Summary

| Package | Version | Command |
|---|---|---|
| react | 18 | included via Vite template |
| react-dom | 18 | included via Vite template |
| vite | latest | included via Vite template |
| tailwindcss | **v3** | `npm install -D tailwindcss@3` |
| postcss | latest | `npm install -D postcss` |
| autoprefixer | latest | `npm install -D autoprefixer` |
| react-icons | latest | `npm install react-icons` |

---

## 🎨 Design System

### Color Palette

| Name | Hex | Usage |
|---|---|---|
| Background | `#0B0F19` | Page background |
| Primary | `#7C3AED` | Buttons, accents, glows |
| Secondary | `#2563EB` | Gradient partner |
| Cyan Accent | `#06B6D4` | Highlights, chart glow |
| Text Primary | `#F8FAFC` | Headings |
| Text Muted | `#64748B` | Descriptions, labels |
| Success | `#10B981` | Positive price change |
| Danger | `#EF4444` | Negative price change |

### Typography

- **Font:** Outfit (Google Fonts) — weights 300, 400, 600, 700, 800, 900
- **Headings:** `font-black` + `tracking-tight`
- **Body:** `font-light` + `leading-relaxed`

---

## 🧩 Sections Breakdown

### 1. Navbar
- Fixed top bar with blur backdrop
- Logo, nav links, Log In + Get Started buttons
- Responsive hamburger menu for mobile

### 2. Hero
- Animated gradient heading (`grad-text` keyframe)
- Floating crypto coin icons (BTC, ETH, SOL, DOGE) with `floatY` animation
- Portfolio dashboard mockup card
- Mini bar chart + coin pills
- Glowing orb background effects

### 3. Live Coin Cards
- Bitcoin, Ethereum, Solana, Dogecoin
- SVG sparkline chart per coin
- Price change badge (green / red)
- Hover lift effect

### 4. Statistics
- Animated counters using `IntersectionObserver`
- $120B+ Volume · 10M+ Users · 150+ Countries · 500+ Assets

### 5. Features
- 6 glassmorphism cards
- Icons from `react-icons/fa`
- Hover glow overlay effect

### 6. Market Trends
- Two-column layout (text + chart)
- BTC/USD SVG line chart
- Timeframe tab switcher (1H / 1D / 1W / 1M)

### 7. CTA Banner
- Gradient glass card
- Two action buttons

### 8. Footer
- Brand + social icons (Twitter, GitHub, Telegram, Discord)
- 3 link columns (Product, Company, Legal)
- Newsletter subscribe input with success state
- Language & currency selector

---

## 📱 Responsive Breakpoints

| Breakpoint | Width | Layout |
|---|---|---|
| Default | < 640px | Single column, stacked |
| `sm:` | ≥ 640px | 2-column coin cards |
| `md:` | ≥ 768px | Footer grid, newsletter row |
| `lg:` | ≥ 1024px | Hero side-by-side, 3-col features |
| `xl:` | ≥ 1280px | 4-column coin cards |

---

## 🚀 Build for Production

```bash
npm run build
```

---


## 🙌 Credits

Built with ❤️ using React, Tailwind CSS, and React Icons.