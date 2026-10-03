# SUMERI — Premium Horological Exhibition Platform

> **Engineered for the Deep.** Automatic Precision Diver Series & Interactive Haute Horlogerie Digital Showcase.

---

## Overview

**SUMERI** is a luxury digital watch exhibition and e-commerce experience designed with haute horlogerie editorial aesthetics, continuous interactive motion, and custom 3D horological engineering.

### Key Highlights
- **Floating Three-Watch Hero**: One large transparent product watch (MDV-106B-1A1V · EFK-200CD-1A · TW2Y47600) suspended over the hero background, with restrained mouse parallax and a GSAP + SVG-displacement morph when switching via the product cards.
- **Soffit WebGL Background**: Dynamic real-time gradient atmosphere that harmonically morphs when switching between timepiece colorways.
- **Scramble-Text Micro-Interactions**: Cryptographic typography effects on metadata, navigation, and blueprint HUD callouts powered by `framer-motion`.
- **7-Card Waterfall Showcase**: 3D perspective deck with authentic spring physics and dynamic card stacking.
- **26 Full Sitemap Routes**: Prerendered catalog, product specifications, craft breakdown, journal, and legal documents.

---

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack, React 19)
- **Styling**: Tailwind CSS, PostCSS
- **Animation & Interaction**: GSAP (ScrollTrigger), Framer Motion, Lenis Smooth Scroll
- **3D Graphics & Rendering**: Three.js, WebGL2 (Soffit Shader)
- **Image Pipeline**: Sharp (Automated spatial border flood-fill & anti-aliased alpha matting)

---

## Getting Started

### Prerequisites
- Node.js 18+ (or Node 20+)
- npm / pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Saif-Cipher/SUMERI.git
cd SUMERI

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Production Build
```bash
# Compile and optimize for production
npm run build

# Start production server
npm start
```

---

## 3D Watch Preprocessing Pipeline

The 185-frame 3D exploded watch animation was processed from raw rendering frames through an automated spatial segmentation script:

```bash
node scripts/process_animation.js
```

This script:
1. Seeds image boundaries to isolate the dark background from black watch components (dial, resin strap, ceramic bezel).
2. Performs 4-way flood-fill with adaptive thresholding.
3. Applies sub-pixel edge anti-aliasing with color unpremultiplication.
4. Generates a 5-panel verification contact sheet at `images_nobg/contact_sheet_preview.png`.

---

## License

Private repository. Copyright © 2026 SUMERI. All rights reserved.
