# Clea Backoffice Studio

Admin web dashboard for managing educational articles, skin diagnostic guides, and interactive stories in the **Clea** mobile skincare ecosystem.

---

## Features

### 1. 📖 Articles Management
- **WYSIWYG Rich-Text Editor (TipTap)**: Formatted headings, bullet/numbered lists, quotes, links, and inline imagery.
- **Categorization & Filtering**: Filter by skin concerns (*Acne Care, Hydration, Anti-Aging, Sun Protection, Ingredients 101, Daily Routine*).
- **Publishing Workflow**: Draft, Published, and Archived states with click-to-toggle shortcuts.
- **Mobile Live Preview**: Real-time side-by-side or fullscreen preview of how articles render on mobile devices.

### 2. 📱 Interactive Stories Builder
- **True 9:16 iPhone Simulator**:
  - Live preview with Notch/Dynamic Island, animated progress bars, pause on hold, tap left/right to navigate slides.
  - Custom slide durations (3s - 12s) and darkness overlay adjustments.
- **Interactive Call-To-Action (CTA) Buttons**:
  - `scan` -> Launches multi-angle facial camera scan in Clea mobile (`clea://scan`).
  - `product` -> Launches barcode ingredient scanner (`clea://barcode`).
  - `article` -> Directs user to in-depth research guide.
  - `external` -> Opens verified external dermatological study.

### 3. 📊 Dashboard Analytics
- Total views, engagement rates, and reading times.
- Quick actions for instant publishing.
- Local storage persistence with JSON export/import support.

---

## Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS (Clea brand palette: Coral `#FB5F40`, Sun `#FFC758`, Warm `#FCF8F4`, Charcoal `#1C1918`)
- **Rich Text**: `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-image`
- **Routing**: `react-router-dom` v7
- **Icons**: `lucide-react`

---

## Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# Opens at http://localhost:3000

# Build production bundle
npm run build
```
