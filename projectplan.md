# PROJECT PLAN — Premium 3D Watch Website

> **Document purpose:** single source of truth for designers, developers and AI build tools (Claude, website generators, Cursor, etc.).
> **Companion file:** `sitemap.md` (routes, page structure, navigation flow, component map).
> **Reference prompts to keep beside this file** (paste the originals into `/reference/`):
> - `/reference/soda-prompt.md` → the "Soda" 3D hero prompt (model-viewer, cursor tilt, colorway transition)
> - `/reference/soffit-gradient-prompt.md` → the "Soffit" WebGL2 gradient prompt (interactive background)
>
> **Status:** Planning · v1.0 · Working brand name: `[BRAND_NAME]` (see §3 Open Questions)

---

## 1. PROJECT SNAPSHOT

| Item | Decision |
|---|---|
| What | A premium, motion-led watch website: 3D hero watch, interactive WebGL gradient background, scroll-driven "waterfall deck" watch showcase, rich mouse effects |
| Hero product | Casio Duro Marlin "Batman" diver (black dial, blue/black bezel, black resin strap, WR 200M, date window) — from the uploaded image |
| Feeling | Premium, calm, precise, cinematic. Light, airy gradient field with dark, sharp product. Large confident type |
| Structure inspiration | **afternow.co** — editorial agency layout: minimal nav + Contact pill, big statements, case-study-style cards with tags/metrics, logo marquee, testimonial + stat pairs, services list, journal, giant footer |
| 3D + hero inspiration | **"Soda" prompt** — full-viewport hero, 3D model that tilts toward the cursor, floating decor with parallax + pointer repulsion, glass header, left headline / right carousel, flavor-switch transition |
| Background | **"Soffit" prompt** — plain WebGL2 fullscreen-triangle gradient shader, one canvas, all motion in the shader, pointer steers the light |
| Showcase section | **Screen-recording reference** — scroll-pinned card deck that cascades top → bottom with counter, progress rail and rotated label |
| Mouse/scroll effects | Dribbble "Wind Energy Landing Page" shot (could not be opened by the analysis tool — see §10 for the effect set we will build; confirm against the shot) |
| Typography | Braden Soft family (from the uploaded font screenshot) for display; neutral grotesk for UI/body |
| Delivery | Static front-end first (HTML/CSS/JS + GSAP + Lenis + model-viewer + WebGL2). Optional Supabase + n8n for enquiries/newsletter/orders |

---

## 2. INPUTS ANALYZED

### 2.1 Hero watch image — `01_watchzone_Casio_Duro_Marlin_Diver_s_Batman_Black_Dial_Men_s_Watch.png`
What is visible (use only these as facts; everything else must be verified against the real product page):
- Stainless steel case with brushed lugs and a screw-style crown on the right side
- **Rotating bezel**: black upper half, **blue lower half** (the "Batman" split), white numerals 10 / 20 / 30 / 40 / 50, a lume pip at 12 (triangle marker)
- **Black dial**, "CASIO" at 12, three oversized lume markers at 12 (bar), round lume dots, rectangular lume bars at 3 / 6 / 9
- **Date window at 3 o'clock**
- Sword-style luminous hour/minute hands, **thin blue second hand** with a luminous tip
- Small marlin/dolphin logo with **"WR 200M"** printed on the dial
- **Black resin strap**, wide lugs
- Image is a flat, front-facing, white-background retail photo (800 × 800) → good for texture extraction, **not** enough alone for a faithful 3D model (see §6)

### 2.2 Reference video — `Screen_Recording_2026-10-02_194636.mp4` (1202 × 776, 2.8 s)
What the frames show (this is the **showcase section behavior** the client wants):
- Light grey/white page. **Left column:** small mono eyebrow `GALLERY · VOL. 01` with a hairline, a huge two-line headline — line 1 heavy upright black (`In`), line 2 **heavy italic with a blue→magenta→red gradient fill** (`Freefall`) — a short paragraph, and a dark pill CTA with an arrow icon (`Explore the deck →`)
- **Center-right:** a vertical **stack of rounded cards** (≈ 24–28 px radius, soft shadow). The **active card sits large at the bottom of the stack**; **upcoming cards queue above it**, each smaller, slightly narrower and receding in depth (perspective stack, visible as thin slivers). **Passed cards drop below** and leave the viewport — a waterfall: *"each one folds over the crest and cascades straight down into the pit."*
- Each card: full-bleed visual, top-left glass pill `10 / 11`, top-right tiny mono category tag (`LIQUID`, `GLASS`, `RADIAL`, `FOLD`, `GLOW`…), bottom-left tiny `CHAPTER 10` label, a **big white title** (`Nectar`, `Chapel`, `Frond`, `Dahlia`, `Origami`), one-line description, and a dark gradient scrim at the bottom for legibility
- **Far right:** giant counter `10/11` (heavy extended black numerals, small `/11`), under it a **thin vertical progress rail** with ticks and a **glowing blue dot** that moves down as progress increases, and the **active title rotated 90°** at the rail's bottom (`NECTAR`)
- Driven by **scroll** (the section is pinned); a standard arrow cursor is visible → no custom cursor in the reference, we may add one (§10)

### 2.3 Font screenshot — `Screenshot_2026-10-02_195043.png`
Braden Soft specimen: a **tall, condensed, soft-cornered display family**, six styles: Light, Light Italic, Regular, Regular Italic, Bold, Bold Italic (cream text on dusty rose). Tone: elegant, fashion/editorial, slightly friendly.
Use: headlines and big numerals. Italics are used for the gradient emphasis word (mirrors the video's `Freefall` treatment). **Licensing must be confirmed** (commercial font) — fallback stack in §4.2.

### 2.4 "Soda" prompt (3D hero site)
Key mechanics we **reuse** (map to the watch):
| Soda feature | Watch equivalent |
|---|---|
| Google `<model-viewer>` center can, `camera-orbit` set from the cursor every frame (`x*40deg`, `90 + y*20deg`), mouse lerp `0.05` | Hero watch tilts toward the cursor with the same smoothing |
| Floating berries/leaves with parallax layers (FG ×60, BG ×−30, far ×−15) and pointer repulsion (radius 400 px, strength −80, lerp 0.1) | Floating **bubbles + light particles** (dive watch → water/air bubbles) and optional small 3D parts (gear, screw crown) with the same repulsion physics |
| Rising PNG bubbles every 400 ms (10–30 px, opacity 0.2–0.6, 4–10 s) | Keep as is — fits the WR 200M story |
| Flavor card click → body palette morph (GSAP 1.5 s), can spins 360° with blur 15 px then to 720° (`back.out(0.7)`), texture swap at peak, berries implode/explode | **Colorway switch:** bezel/strap texture swap at the spin peak + palette morph of the gradient background |
| Glass header (backdrop blur 20 px, pill nav, pink active state) | Glass pill nav; active state uses brand accent |
| Left headline + CTA + award badge, right carousel + second headline | Same hero layout; badge = `WR 200M · Water resistant` |
| Entrance: model fades in 1.5 s with 0.3 s delay and floats ±20 px forever | Same |

### 2.5 "Soffit" prompt (interactive gradient)
- Plain **WebGL2**, one fullscreen triangle, one fragment shader (GLSL ES 3.00), no library
- One uniform per `CONFIG` key; **colours are changed only through CONFIG, never by editing GLSL**
- Pointer: two-stage lerp (lead 0.105, body 0.043), steers the light direction/sweep/lift
- DPR capped at 1, triangular dither (prevents banding), opaque canvas, clamped frame clock (alt-tab never lurches)
- The **final values supplied by the client** (the "use exactly these parameter values" block) are the ones in §7.2

### 2.6 afternow.co (analyzed live)
Patterns to borrow (structure, not copy):
- Minimal sticky nav: logo · 5 links · **Contact** pill; full-screen menu on mobile with a sub-list under Services
- Hero: one short, confident statement + background video with a **Play** control; one text CTA
- **Case-study list** where each row/card has: tags (service types), name, one-line promise, a proof metric ("4 year partnership, 4 product ecosystem")
- **Client logo marquee** (duplicated track = seamless loop)
- **Testimonials with stat pairs** (quote + 2 big numbers beside it)
- **Services block**: five numbered services, each with a 3-sentence description and an "Explore X" link
- Journal teaser (3 cards), newsletter, social links, legal links, giant closing CTA "Let's explore what's next"
- Consent/cookie manager (needed if analytics are used)

### 2.7 Dribbble shot "Scroll animations and mouse effects — Wind Energy Landing Page"
The page is JavaScript-rendered and returned no readable content to the analysis tool. **Assumption:** the effects are the standard premium set for that style — custom cursor, magnetic buttons, cursor-reactive hero object, scroll-linked parallax/reveals, pinned storytelling. §10 specifies each precisely. **Action for the client:** if the shot has a specific effect not listed (e.g. cursor-trail, wind-like particle flow, blade rotation tied to cursor), describe it in one sentence and we add it to §10.

---

## 3. DECISIONS, ASSUMPTIONS & OPEN QUESTIONS

### 3.1 Decisions made in this plan
1. **Light theme** (Soffit lavender gradient) so the dark Batman watch contrasts strongly; dark-theme variant is a later option.
2. **Two WebGL layers + DOM**: gradient canvas (own context) behind, `<model-viewer>` for 3D, DOM for text/cards. Max 3 live WebGL contexts at once (see §13).
3. **Only the hero and the product page run live 3D.** The showcase deck uses pre-rendered transparent PNG/WebP renders with a CSS 3D tilt — this keeps scrolling at 60 fps.
4. Watch **hands are separate meshes** → they can show the visitor's real local time.
5. The bezel is a **separate rotatable mesh** (drag to rotate on the product page).
6. Phase 1 = **showcase + enquiry/waitlist** (no checkout). Checkout can be added in Phase 3 (§14).

### 3.2 Open questions (answer these before build starts; defaults in brackets)
| # | Question | Default if unanswered |
|---|---|---|
| 1 | Brand name / logo? | Use `[BRAND_NAME]` placeholder, wordmark in Braden Soft Bold |
| 2 | Sell online (cart/checkout) or showcase + enquire? | Showcase + enquire (WhatsApp / form) |
| 3 | How many watches in the showcase deck? Only one real image exists. | 7 slots: slot 01 = Marlin Batman, slots 02–07 = placeholders (same watch in other colorways, then new models) |
| 4 | **Rights:** the hero image is a retailer photo of a **Casio** product. Is the site an authorised reseller, a review/portfolio concept, or a new own-brand line? | Treat as a **concept / portfolio build**; swap in own-brand or licensed assets before launch |
| 5 | Final font licence for Braden Soft? | Fallback fonts (§4.2) |
| 6 | Languages? (EN only, or EN + Bangla) | EN only; i18n-ready strings |
| 7 | Currency/pricing and shipping regions? | Price shown as "Enquire" |

---

## 4. BRAND & VISUAL SYSTEM

### 4.1 Colour tokens
```css
:root {
  /* Page (driven by the Soffit gradient, these are the fallbacks) */
  --bg:            #c8cff0;   /* Soffit bgColor */
  --bg-soft:       #f5f5fd;   /* Soffit colorD */
  --ink:           #0b0b14;   /* text on light */
  --ink-muted:     rgba(11, 11, 20, 0.62);
  --hair:          rgba(11, 11, 20, 0.14);

  /* Accent gradient used on emphasis words (mirrors the video's italic gradient word) */
  --accent-1:      #2a4bd7;   /* Batman blue */
  --accent-2:      #7b3fd9;
  --accent-3:      #f02be0;
  --accent-grad:   linear-gradient(90deg, var(--accent-1), var(--accent-2) 55%, var(--accent-3));

  /* Glass */
  --glass-bg:      rgba(255, 255, 255, 0.35);
  --glass-border:  rgba(255, 255, 255, 0.55);
  --glass-blur:    20px;

  /* Buttons */
  --btn-bg:        #0b0b14;   /* dark pill, as in the video CTA */
  --btn-fg:        #ffffff;
  --btn-chip:      #ffffff;   /* round arrow chip inside the pill */
}
```

### 4.2 Typography
| Role | Font | Fallback stack | Notes |
|---|---|---|---|
| Display / headlines / counter | **Braden Soft** (Bold, Bold Italic, Regular) | `'Barlow Condensed', 'Oswald', 'Arial Narrow', sans-serif` | Line-height 0.85–0.9, tight tracking, `clamp(4.5rem, 11vw, 12rem)` for hero |
| Emphasis word | Braden Soft **Bold Italic** + `background: var(--accent-grad); -webkit-background-clip: text; color: transparent;` | same | Mirrors `Freefall` in the video |
| UI / body | `Inter` (400/500) | `system-ui, sans-serif` | 16–18 px body |
| Eyebrow / tags / pills | `JetBrains Mono` or `IBM Plex Mono` 11 px, uppercase, tracking 0.12em | `ui-monospace, monospace` | `COLLECTION · VOL. 01`, `DIVER`, `01 / 07` |

### 4.3 Shape, spacing, motion tokens
```css
:root {
  --radius-card: 26px;
  --radius-pill: 999px;
  --space-section: clamp(6rem, 14vh, 12rem);
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);       /* general reveals */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1); /* card hover pop */
  --dur-fast: 0.3s; --dur-base: 0.8s; --dur-slow: 1.5s;
}
```

### 4.4 Image & render rules
- Watch renders: transparent background, 3:4 or square, WebP/AVIF 1600 px + 800 px
- Soft contact shadow baked below the watch (no hard drop shadow)
- Every card/hero must show **dial legibility** (no crop through the dial)

---

## 5. TECH STACK & ARCHITECTURE

### 5.1 Stack
| Layer | Choice | Why |
|---|---|---|
| Build | **Vite** (vanilla JS/TS modules) — or a single `index.html` for Phase 0 prototype | Simple, no framework needed; matches the Soda/Soffit "plain" approach |
| Routing | Multi-page HTML (Phase 1) → optional Barba.js/View Transitions API for page transitions | Keeps 3D/gradient canvas alive across pages |
| Animation | **GSAP 3 + ScrollTrigger** | Pinned sections, scrubbed timelines, same lib as Soda |
| Smooth scroll | **Lenis** (synced to ScrollTrigger) | Premium scroll feel |
| 3D | **`<model-viewer>`** for hero/product (as in Soda); optional upgrade to three.js if exploded-view + custom shaders are required | Fastest path; texture swap via `createTexture` |
| Background | **Raw WebGL2** from the Soffit prompt, unchanged shader | Cheap, one draw call |
| Styling | Plain CSS + custom properties (no Tailwind needed) | Predictable, AI-friendly |
| Backend (optional) | **Supabase** (tables below) + **n8n** (webhooks for enquiry/newsletter) | Matches existing automation stack |
| Hosting | Static host (Netlify / Vercel / Cloudflare Pages) | Free tier OK |

### 5.2 Layer stack (z-order)
```
z 0    #bg-gl            fixed <canvas> — Soffit gradient (pointer-reactive)
z 1    #bubbles          fixed container — rising PNG bubbles (pointer-events: none)
z 10   #stage-3d         fixed hero <model-viewer> (hero + product pages only), pointer-events: none except where dragged
z 20   main sections     DOM content (text, cards, deck)
z 30   .fx-front         foreground floating particles (parallax ×60) — hero only
z 100  header            glass nav
z 9999 #cursor           custom cursor (desktop, fine pointer only)
```

### 5.3 Folder structure
```
/
├─ index.html                 (Home)
├─ collection/index.html
├─ watch/marlin-batman/index.html   (template reused: /watch/[slug])
├─ craft/index.html
├─ story/index.html
├─ journal/index.html
├─ contact/index.html
├─ legal/{privacy,cookies,terms}.html
├─ assets/
│  ├─ models/        marlin-batman.glb  (+ colorway textures)
│  ├─ textures/      bezel-batman.jpg, bezel-red.jpg … strap-*.jpg
│  ├─ img/           renders (WebP/AVIF), bubble.png, og-image.jpg
│  └─ fonts/         BradenSoft-*.woff2 (if licensed)
├─ src/
│  ├─ gl/gradient.js          (Soffit engine — shader verbatim)
│  ├─ three-d/hero-watch.js   (cursor tilt, colorway switch, hands = real time)
│  ├─ fx/{cursor,magnetic,bubbles,particles,reveal}.js
│  ├─ sections/{showcase-deck,craft-explode,statement,marquee}.js
│  ├─ core/{lenis,scroll,preloader,transitions}.js
│  └─ styles/{tokens,base,layout,components}.css
└─ reference/{soda-prompt.md, soffit-gradient-prompt.md}
```

---

## 6. HERO WATCH — 3D SPEC

### 6.1 The honest constraint
One front-facing photo cannot produce an accurate 3D watch (no side, back, lug or crown geometry). Choose one route:

| Route | Quality | Effort | Notes |
|---|---|---|---|
| **A. Photogrammetry / multi-angle photos** of the real watch (≥ 36 images on a turntable) → Blender cleanup | Highest | Medium | Best realism |
| **B. Model in Blender** using the photo as a front blueprint + official dimensions | High | High | Full control, separable parts |
| **C. AI image-to-3D** (e.g., Meshy / Tripo / Rodin) from the photo → **manual cleanup in Blender** | Medium | Low | Fast prototype; hands/bezel are not separable — must be re-cut by hand |
| **D. Licensed 3D asset** | Varies | Low | Check licence |

**Recommended:** C for the Phase 0 prototype, B or A for launch.

### 6.2 GLB requirements (what the AI/dev must deliver)
- File: `assets/models/marlin-batman.glb`, **< 4 MB**, Draco/Meshopt compressed, 2K max textures (KTX2 if possible)
- Real-world scale, origin at the watch centre, dial facing **+Z**, 12 o'clock = +Y
- **Separate named meshes:** `case`, `bezel` (rotates around Z), `crystal` (glass, low roughness, slight reflection), `dial`, `hand_hour`, `hand_minute`, `hand_second`, `crown`, `strap`, `date_disc`
- **PBR materials:** brushed steel (metalness 1, roughness ~0.35), black matte dial, emissive-looking lume (white/green-white, slight emissive), resin strap (roughness 0.7)
- Bezel material has a **base-colour texture** that can be swapped at runtime for colorways (as the Soda can swaps `green base color.jpg` ↔ `blue base color.jpg`)
- Add `KHR_materials_clearcoat` on the crystal if supported

### 6.3 Hero behavior (copy from Soda, re-targeted)
```html
<model-viewer id="hero-watch"
  src="/assets/models/marlin-batman.glb"
  alt="Marlin Batman diver watch, 3D"
  camera-controls disable-zoom
  shadow-intensity="0"
  environment-image="neutral" exposure="1.4"
  interaction-prompt="none"
  camera-orbit="0deg 80deg 260%" field-of-view="30deg">
</model-viewer>
```
Per frame (`requestAnimationFrame`):
```js
currentMouse.x += (mouse.x - currentMouse.x) * 0.05;   // same smoothing as Soda
currentMouse.y += (mouse.y - currentMouse.y) * 0.05;
hero.cameraOrbit = `${currentMouse.x * 40 + switchSpin}deg ${80 + currentMouse.y * 20}deg 260%`;
```
- Entrance: opacity 0 → 1 over **1.5 s**, delay 0.3 s, then infinite float `translateY(0 → −20px → 0)` over 6 s
- Hand animation: `hand_hour/minute/second` rotation set from `new Date()` each second (second hand sweeps smoothly)
- Product page only: drag rotates the watch freely; a second drag target rotates the **bezel**; hotspots (see §8, Product)

---

## 7. INTERACTIVE BACKGROUND — SOFFIT GRADIENT

### 7.1 Integration contract
- Use the **shader and engine from the Soffit prompt verbatim** (`/reference/soffit-gradient-prompt.md`)
- Canvas: `<canvas id="bg-gl">` fixed, `width: 100vw; height: 100vh; z-index: 0`
- Never edit GLSL to change colour. Only `CONFIG` changes
- Keep: DPR cap 1, dither on, `alpha: false`, IntersectionObserver pause, clamped frame clock
- Pointer scalars (`iMouse`) already steer tilt/lift/sweep → the gradient "follows" the cursor with lag. Share the same pointer event source with the watch tilt so both feel coherent

### 7.2 Final CONFIG (client-supplied exact values — do not substitute)
```js
const CONFIG = {
  // colours
  bgColor: "#c8cff0", colorA: "#d4c8e8", colorB: "#dcdcf3", colorC: "#e0e4f5", colorD: "#f5f5fd",
  // settings
  ambient: 0.24, amount: 0.2, bounce: 0.38, bounceCurve: 4.25, breathe: 0.29,
  contrast: 2.45, cursor: 1, curve: 3.32, direct: 0.97, dither: 0.58, flow: 0.475,
  glow: 0.38, grain: 0, grainAnim: 0, horizon: 0.36, lacunarity: 1.99, lift: 0.11,
  maxDpr: 1, midpoint: 0.57, moteScale: 7, motes: 0.074, parallax: 0.0137,
  rock: 0.12, roughness: 0.29, scale: 1, sink: 0.24, speed: 0.33,
  spillCentre: 0.3, spillFloor: 0.26, spillWidth: 2.18, spread: 0.41,
  steer: -0.13, sweep: 0.5, tilt: 1.87, vignette: 0.21, warp: 2.58, warpScale: 0.78
};
```
> The Soffit prompt lists an older "shipped" CONFIG first and then this "use exactly these parameter values" block. **This block wins.**

### 7.3 Section-aware palette morph (extension, CONFIG-only)
Tween the five colours (and nothing else) with GSAP while scrolling or when a colorway is selected, then re-upload via `applyConfig()` (or upload the 5 colour uniforms only). Suggested presets (placeholders — tune by eye):

| Scene | bgColor | colorA | colorB | colorC | colorD |
|---|---|---|---|---|---|
| Hero / default (client values) | `#c8cff0` | `#d4c8e8` | `#dcdcf3` | `#e0e4f5` | `#f5f5fd` |
| Showcase deck | `#d9dcf2` | `#e3d9ee` | `#ececf7` | `#f1f3fa` | `#fbfbff` |
| Craft (dark story, optional) | `#1a1740` | `#3a2a8c` | `#5b3fd0` | `#9b4de0` | `#e9e0ff` |
| Colorway "Red bezel" (placeholder) | `#f0c8cf` | `#e8c8d4` | `#f3dce3` | `#f5e0e4` | `#fdf5f7` |
| Colorway "Pepsi" (placeholder) | `#c8d4f0` | `#c8d8e8` | `#dce6f3` | `#e0eaf5` | `#f5f8fd` |

Duration 1.5 s, ease `power2.inOut` (same as Soda's background morph). Respect `prefers-reduced-motion` (see §13).

---

## 8. HOME PAGE — SECTION-BY-SECTION SPEC

> Full route list and component inventory are in `sitemap.md`. Below is the **home page build order**.

### H0. Preloader (≈ 1.6 s max)
- Minimal: a thin ring that closes like a bezel + counter `00 → 100`, then the ring "scales away" to reveal the hero
- Waits for: fonts, `marlin-batman.glb` `load` event, first gradient frame
- Skippable; shown once per session (`sessionStorage`)

### H1. Header (fixed, glass)
- Left: logo (wordmark `[BRAND_NAME]`)
- Center: **glass pill nav** — Home · Collection · Craft · Story · Journal (active state = filled pill using `--btn-bg` text white, or accent)
- Right: **Contact** pill (dark), magnetic hover
- Behavior: hides on scroll down, shows on scroll up; blur 20 px, border `--glass-border`
- Mobile: hamburger → full-screen overlay menu (afternow pattern) with staggered link reveal

### H2. Hero (100 vh, no scroll inside)
Layout (copy Soda's three-column logic):
- **Left column:** eyebrow `AUTOMATIC PRECISION · DIVER SERIES`; headline  
  `Built for` (upright, Bold) / `the *Deep*` (Bold Italic, accent gradient)  
  paragraph (≤ 25 words); CTA pill `Explore the collection →`; bottom-left badge: icon + `WR 200M` / `WATER RESISTANT`
- **Center:** hero watch (§6.3), floats and tilts toward the cursor
- **Background FX:** Soffit gradient + rising bubbles (Soda bubble generator: every 400 ms, 10–30 px, opacity 0.2–0.6, 4–10 s)
- **Floating decor:** 6–9 small floating elements (bubbles/gear/lume dots) with the Soda physics: parallax FG ×60 / BG ×−30, repulsion radius 400 px, strength −80, lerp 0.1, float amplitude 15 px
- **Right column:** colorway carousel — 2–3 glass cards (watch thumbnail pops up on hover: `translateY(-30px) rotate(-12deg) scale(1.15)`), name + price/“Enquire”, two arrow buttons, and the second headline `Precision, *Sealed*`
- **Colorway switch** (click): see §9

### H3. Statement (afternow-style intro)
Pinned or sticky, full-width paragraph (Braden Soft Regular, ~6 vw), **word-by-word opacity reveal** scrubbed by scroll (0.15 → 1). Example copy: "Engineered for the deep. Finished like a keepsake. Every [BRAND_NAME] watch is tested to 200 metres and built to outlast the trend."

### H4. Showcase Deck — "the waterfall" (**the key section**, see §9A)
Reference: screen-recording. 7 cards (one per watch), pinned, scroll-driven.

### H5. Craft / Exploded view (pinned storytelling)
- Pin 300–400 vh. The hero watch (or a second `<model-viewer>`) **explodes** into parts as the user scrolls: bezel lifts, crystal lifts, dial/hands separate, case-back drops
- 4 steps, each with a numbered callout (afternow "service" style): `01 Rotating bezel`, `02 Crystal`, `03 Dial & lume`, `04 200 m sealed case` (final copy must be verified against the real specs)
- Camera path scrubbed by `ScrollTrigger` (`camera-orbit` + part transforms via scene-graph API). If using only `<model-viewer>`, fall back to **pre-rendered image-sequence** (60–90 frames WebP) scrubbed on a canvas

### H6. Specs strip + Marquee
- Spec pairs in giant numerals (afternow stat style): `200 M` water resistance, `3 H` hands + date, `∞` lume, etc. (verify)
- Infinite marquee of materials/keywords or press logos (duplicated track, `translateX` loop, pauses on hover)

### H7. Reviews / testimonials
- Slider: quote + two stat chips (afternow testimonial pattern). Placeholder copy until real reviews exist

### H8. Journal teaser
- 3 cards (image, category tag, title). Hover: image scale 1.05 + cursor label `READ`

### H9. Closing CTA + Footer
- Giant line `Let's find your watch` (Braden Soft, 14 vw) with magnetic CTA
- Newsletter (email field → n8n webhook → Supabase)
- Social links, legal links, `©` line
- Giant wordmark at the very bottom with scroll-linked parallax

---

## 9. KEY INTERACTION SPECS

### 9A. Showcase Deck — scroll waterfall (derived from the reference video)
**Section container:** pinned for `N × 100vh` scroll distance (`N` = number of cards = 7), `scrub: 0.6`.

**Left column (static while pinned):** eyebrow `COLLECTION · VOL. 01`, headline `The Deep` / `*Collection*` (accent italic), 2-line paragraph, CTA pill `Explore the collection →`.

**Right area:** a perspective stack (`perspective: 1400px`, `transform-style: preserve-3d`).

Progress `p` ∈ [0, N−1] from ScrollTrigger. For each card `i`, let `d = i − p`:

```js
// d > 0  → upcoming (queued above, receding)
// d = 0  → active (large, bottom of the visible stack)
// d < 0  → passed (folds over and drops down out of view)
function place(card, d) {
  if (d >= 0) {
    card.y       = -d * 34;               // px, each upcoming card sits higher
    card.scale   = 1 - d * 0.06;          // narrower with depth
    card.z       = -d * 90;               // px, deeper
    card.rotateX = d * 2;                 // deg, slight lean back
    card.opacity = Math.max(0, 1 - d * 0.18);
    card.blur    = Math.min(6, d * 1.5);  // optional, px
  } else {
    const k = Math.min(1, -d);            // 0 → 1 across one card of progress
    card.y       = k * (viewportH * 0.9); // falls to the bottom ("the pit")
    card.rotateX = -k * 38;               // folds forward over the crest
    card.scale   = 1 + k * 0.04;
    card.opacity = 1 - k;
  }
  card.zIndex = 100 - Math.round(Math.abs(d) * 10);
}
```
Tunables (starting values): active card ≈ 330 × 400 px desktop, radius `--radius-card`, gap 34 px, shadow `0 30px 60px rgba(11,11,20,0.25)`. Snap: `snap: 1 / (N − 1)` with `duration 0.4`, `ease: power2.out` so a card always lands centered.

**Card anatomy (per watch):**
- Full-bleed background: soft gradient (from the watch's colorway palette) + watch render, centered, slightly rotated (−8°), with parallax inside the card (`±12px` by pointer)
- Top-left glass pill `01 / 07`; top-right mono tag (`DIVER`, `DRESS`, `CHRONO`, …)
- Bottom: bottom scrim, mono `CHAPTER 01`, **watch name** (Braden Soft Bold, white, ~48 px), one-line tagline
- Hover (active card only): watch lifts `translateY(-10px) rotate(-4deg)`, cursor becomes `VIEW`; click → `/watch/[slug]` (shared-element transition: card image expands into the product hero)

**Right rail (fixed relative to section):**
- Giant counter `02/07` (digit slot-machine roll on change, 0.5 s) — Braden Soft Bold, ~96 px, `/07` small
- Vertical hairline rail with 7 ticks; **glowing dot** (`--accent-1`, 14 px, box-shadow glow) position = `p / (N−1)`
- Active watch name rotated −90°/90° at rail bottom (mono, 12 px, tracking 0.2em)

**Mobile (< 900 px):** stack collapses to a **horizontal swipe carousel** with the same card anatomy and a bottom progress bar. No pinning.

### 9B. Colorway switch transition (from Soda `switchFlavor`)
Triggered by clicking a hero carousel card or a colorway swatch on the product page. Locks input (`isSwitching`) until done.
1. **Palette morph**: tween the 5 Soffit colours to the colorway preset, `duration 1.5`, `ease power2.inOut`
2. **Watch spin** (phase 1): `val 0 → 360`, `blur 0 → 15px`, `duration 0.6`, `ease power2.in`
3. **At the peak:** swap the bezel (and strap) base-colour texture (`createTexture` preloaded + one-frame shader warm-up, like Soda)
4. **Spin** (phase 2): `val → 720`, `blur → 0`, `duration 1.5`, `ease back.out(0.7)`; `switchSpin` is added to the camera azimuth
5. **Floating decor implode/explode**: each particle flies to center (0.5 s, `power2.in`, scale 0.1, opacity 0), holds 0.3 s, swaps sprite if the colorway has its own, explodes to a new random position ±100 px (0.9 s, `back.out(1.5)`)
6. Update the card `.active` border, price/name text, and URL hash `#colorway=red`

### 9C. Hero cursor tilt & parallax (from Soda)
- Watch: see §6.3
- Parallax containers: FG decor `translate(x*60, y*60)`, BG decor `translate(x*-30, y*-30)`, far decor `translate(x*-15, y*-15)`; `transition: transform 0.1s ease-out`
- Pointer repulsion on each floating item (radius 400 px, strength −80, lerp 0.1, spin speed `+0.2 * (1 + force*5)`), disabled during the colorway switch

---

## 10. MOUSE & SCROLL EFFECT SYSTEM (afternow + Dribbble-style)

| # | Effect | Spec | Where |
|---|---|---|---|
| M1 | **Custom cursor** | 8 px dot + 36 px ring; ring lerps 0.18 behind dot; `mix-blend-mode: difference` on dark areas; hides on touch | Global |
| M2 | **Cursor states** | `default`, `link` (ring ×1.6), `view` (ring ×3 + text `VIEW`), `drag` (text `DRAG`), `play`, `read`; label fades 0.2 s | Cards, 3D, journal, video |
| M3 | **Magnetic buttons** | Within 80 px of a pill, button translates up to 12 px toward the cursor; spring back 0.5 s (`elastic.out(1, 0.5)`) | CTAs, nav pill, Contact |
| M4 | **Gradient steering** | Soffit `iMouse` two-stage lerp (0.105 / 0.043) | Whole site |
| M5 | **3D tilt** | Hero + product watch (§6.3); cards tilt ±6° with a moving light glare (`radial-gradient` following the pointer) | Hero, deck, collection grid |
| M6 | **Particle repulsion** | §9C | Hero (+ footer bubbles) |
| M7 | **Wind-style flow field** (optional, from the Dribbble reference) | Small canvas of 150 thin particles drifting along a noise field; the cursor adds a vortex force (radius 250 px) | Hero background (behind watch) — enable only if confirmed |
| M8 | **Text reveals** | Headline lines split into masked lines, `y: 110% → 0`, stagger 0.08, 1 s `--ease-out`; statement paragraph word opacity scrub | Every section |
| M9 | **Image reveal** | `clip-path: inset(100% 0 0 0) → inset(0)` + inner image `scale 1.2 → 1`, 1.2 s | Journal, story |
| M10 | **Scroll parallax** | Elements with `data-speed` move `scrollY * speed`; range ±0.2 | Decor, giant wordmark |
| M11 | **Pinned storytelling** | ScrollTrigger pin + scrub (Craft, Deck) | Home |
| M12 | **Marquee** | Duplicate track; speed ± scroll velocity (skew up to 6°) | Specs strip |
| M13 | **Page transitions** | 0.7 s: gradient hue shift + content fade/slide; shared-element expand from card → product hero | Route changes |
| M14 | **Hover micro-interactions** | Card hover pop (`--ease-spring`), link underline draw, arrow chip rotate 45° | Everywhere |

**Smooth scroll:** Lenis `lerp 0.1`, `smoothWheel true`, integrated with `ScrollTrigger.update`.
**Touch devices:** M1/M3/M5/M6 disabled; replace tilt with device-orientation (opt-in) or a slow auto-orbit.

---

## 11. OTHER PAGES — SUMMARY (details in `sitemap.md`)

| Page | Purpose | Signature interaction |
|---|---|---|
| `/collection` | Browse all watches (grid or list, filter by collection/colorway) | Cards tilt + glare; hover swaps to alt-angle render; cursor `VIEW` |
| `/watch/[slug]` | Product detail | Large 3D viewer (drag, bezel rotate, hotspots), colorway swatches (§9B), spec table, gallery, "Enquire" CTA, related watches |
| `/craft` | Technology & materials story | Exploded-view scroll story, material close-ups, lume demo (dark-mode toggle: lights off to show lume) |
| `/story` | Brand story, team, values | Image reveals, big statement, timeline |
| `/journal` + `/journal/[slug]` | Editorial content | Image reveal, reading progress bar |
| `/contact` | Enquiry form, WhatsApp/email, location | Magnetic submit, success state animation |
| Legal pages | Privacy, cookies, terms | Plain, fast, no 3D |

---

## 12. DATA, BACKEND & AUTOMATION (optional Phase 2)

### 12.1 Supabase tables
```
watches        (id, slug, name, tagline, collection, category_tag, description,
                price_amount, price_currency, is_published, sort_order, model_url, created_at)
colorways      (id, watch_id, name, hex_primary, bezel_texture_url, strap_texture_url,
                gradient_preset_json, sort_order)
watch_media    (id, watch_id, colorway_id, type[render|photo|video], url, alt, sort_order)
watch_specs    (id, watch_id, label, value, sort_order)
enquiries      (id, name, email, phone, watch_id, colorway_id, message, status, created_at)
subscribers    (id, email, source, created_at, unsubscribed_at)
journal_posts  (id, slug, title, excerpt, cover_url, body_md, published_at)
```
RLS: public `select` on published rows; `insert` only on `enquiries` and `subscribers` (rate-limited).

### 12.2 n8n workflows
1. **Enquiry:** Webhook → validate → insert `enquiries` → email notification (owner) + auto-reply (visitor) → optional WhatsApp/Slack alert
2. **Newsletter:** Webhook → upsert `subscribers` → welcome email
3. **Content sync (optional):** Supabase → static JSON build hook on publish

---

## 13. PERFORMANCE, ACCESSIBILITY, RESPONSIVE & FALLBACKS

### 13.1 Performance budgets
| Metric | Target |
|---|---|
| LCP | < 2.5 s (hero poster image shown instantly, 3D swaps in on load) |
| JS (initial, gz) | < 250 KB excluding model-viewer (lazy) |
| GLB | < 4 MB; textures ≤ 2K; lazy-load colorway textures after first paint |
| FPS | 60 desktop, ≥ 45 mid-range mobile |
| Live WebGL contexts | ≤ 3 (gradient, hero model, one extra on craft/product) — destroy/pause others off-screen |
| Gradient | DPR cap 1, pause when off-screen/hidden tab (already in Soffit) |

### 13.2 Accessibility
- `prefers-reduced-motion: reduce` → disable float, repulsion, deck 3D (use a simple vertical list), freeze gradient `speed` to 0, no spin transition (instant swap)
- All 3D has a static `poster` + `alt`; all text ≥ 4.5:1 contrast (use `--ink` on the light gradient; white text only over scrims)
- Keyboard: nav, deck (←/↑ and →/↓ move cards), colorway cards focusable with visible focus ring
- Custom cursor never replaces the native cursor for keyboard/screen-reader users

### 13.3 Responsive
- Breakpoints: `1200` (Soda collapses hero to one column), `900` (deck → swipe carousel), `600` (type scale, stacked nav)
- Hero on mobile: watch on top at 60 vh, headline below, carousel as horizontal scroll

### 13.4 Fallbacks
- No WebGL2 → CSS gradient (`--bg` → `--bg-soft`) + static render; message from Soffit is hidden
- Model load failure → show the PNG render in place of the 3D model
- Low-power devices (`navigator.hardwareConcurrency <= 4` or Save-Data) → disable particles, flow field and deck blur

---

## 14. BUILD PHASES & ACCEPTANCE CHECKLIST

### Phase 0 — Prototype (1–2 days)
- [ ] Single `index.html`: Soffit gradient + hero layout + placeholder 3D (AI-generated GLB or the PNG as a flat plane with tilt)
- [ ] Cursor tilt, bubbles, floating particles, colorway switch working with 2 colorways

### Phase 1 — Marketing site (1–2 weeks)
- [ ] Final GLB with separable parts (§6.2) · fonts · tokens
- [ ] Home H0–H9, Collection, Product template, Craft, Story, Contact, legal pages
- [ ] Showcase deck (§9A) matches the reference video behavior
- [ ] Mouse system M1–M6, M8–M14
- [ ] Lighthouse: Perf ≥ 85 mobile / 95 desktop, A11y ≥ 95

### Phase 2 — Backend & automation
- [ ] Supabase tables + RLS, n8n enquiry + newsletter flows, analytics + consent banner

### Phase 3 — Commerce (optional)
- [ ] Cart/checkout (Stripe / local gateway), inventory, order emails

### Definition of done (every phase)
1. Hero watch tilts toward the cursor with smooth lag; no jank on resize
2. Gradient reacts to the pointer and morphs on colorway change
3. Deck: scrolling one card-length lands exactly on the next card; counter, rail dot and rotated label always agree
4. Colorway switch: no texture flash, no frame drop, state recovers if clicked repeatedly
5. Reduced-motion and mobile fallbacks verified
6. No console errors; all assets have fallbacks

---

## 15. MASTER BUILD PROMPT (copy-paste ready for Claude / site generators)

```text
ROLE: You are an expert creative front-end developer.

TASK: Build the premium watch website described in projectplan.md and sitemap.md (attached).
Follow them exactly. Where they conflict with the two reference prompts
(/reference/soda-prompt.md and /reference/soffit-gradient-prompt.md),
the reference prompts win for 3D hero mechanics and the gradient engine;
projectplan.md wins for content, layout, and copy.

STACK: Vite + vanilla JS, GSAP + ScrollTrigger, Lenis, Google <model-viewer>,
raw WebGL2 (Soffit shader, unchanged). No frameworks.

BUILD ORDER:
1. Tokens, fonts (Braden Soft with fallback stack), base CSS.
2. Soffit gradient canvas with the FINAL CONFIG from projectplan.md §7.2.
3. Header, hero layout, hero watch <model-viewer> with cursor tilt (§6.3).
4. Bubbles, floating particles, parallax, pointer repulsion (§9C).
5. Colorway switch transition (§9B) including gradient palette morph (§7.3).
6. Showcase deck (§9A) with the exact place(card, d) logic.
7. Statement, Craft exploded view, specs marquee, reviews, journal, footer.
8. Mouse system (§10), preloader, page transitions.
9. Other pages from sitemap.md.
10. Accessibility, reduced-motion, mobile fallbacks, performance pass (§13).

RULES:
- Never change shader GLSL to recolour; change CONFIG only.
- Hardcode all values given in the plan as constants.
- Provide poster/PNG fallbacks for every 3D element.
- Use placeholders clearly marked [PLACEHOLDER] for any missing copy, price or asset.
- Do not invent technical specs of the watch: use only items marked "visible" in §2.1
  or mark them [VERIFY].
- Output complete files, no truncation.
```

---

## 16. APPENDIX

### 16.1 Key constants (quick reference)
| Constant | Value |
|---|---|
| Mouse lerp (watch tilt) | 0.05 |
| Tilt mapping | azimuth `x*40deg`, polar `80 + y*20deg` (hero) |
| Parallax multipliers | FG ×60 · BG ×−30 · far ×−15 |
| Repulsion | radius 400 px · strength −80 · lerp 0.1 · spin `0.2*(1+force*5)` |
| Float | amplitude 15 px Y / 6° ; hero ±20 px / 6 s |
| Bubbles | every 400 ms · 10–30 px · opacity 0.2–0.6 · rise 4–10 s · drift +30 px · 360° |
| Colorway spin | 0→360 (0.6 s, power2.in, blur 15 px) → 720 (1.5 s, back.out(0.7)) |
| Implode / explode | 0.5 s power2.in → hold 0.3 s → 0.9 s back.out(1.5), random ±100 px |
| Palette morph | 1.5 s power2.inOut (CSS body transition 1.2 s) |
| Soffit pointer | lead 0.105 · body 0.043 · DPR cap 1 · dither on |
| Deck | 7 cards · gap 34 px · scale step 0.06 · z step 90 px · rotateX step 2° · perspective 1400 px |
| Breakpoints | 1200 · 900 · 600 |

### 16.2 Asset checklist
- [ ] `marlin-batman.glb` (+ separated parts) · [ ] bezel textures per colorway · [ ] strap textures
- [ ] Transparent renders (front, 3/4, side, caseback) per watch · [ ] `bubble.png`
- [ ] Braden Soft web fonts (licensed) or fallbacks · [ ] logo (SVG) · [ ] OG image 1200×630
- [ ] Copy deck: hero, statement, 7 card taglines, craft steps, reviews, journal posts, legal

### 16.3 Risks
| Risk | Mitigation |
|---|---|
| AI-generated 3D watch looks wrong up close | Use it for prototype only; rebuild/scan for launch |
| Too many WebGL contexts → mobile crashes | Pre-rendered images in deck; pause off-screen canvases |
| Casio brand/imagery rights | Resolve question #4 before launch |
| Heavy motion hurts accessibility | Reduced-motion paths (§13.2) |
| Font licence | Fallback stack ready |
