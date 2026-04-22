---
name: nowweland-design
description: >
  Premium visual design and UX upgrade for nowweland.com — a luxury vacation villa in Akrotiri, Crete.
  Use this skill whenever working on UI, layout, typography, color, animations, components, or user experience.
  Activates automatically for any design, styling, or frontend task on this project.
---

# NowWeLand — Design & UX Skill

## Brand Identity

**Site:** nowweland.com  
**Property:** Luxury vacation villa, Akrotiri, Chania, Crete  
**Tone:** Quiet luxury meets warm Mediterranean soul  
**Feeling to evoke:** "I want to be there right now" — calm, aspirational, sensory  

---

## Design Principles

### 1. Quiet Luxury
- Never loud. Never cheap. Every element earns its place.
- Whitespace is intentional — use it generously.
- Avoid gradients, drop shadows, and decorative elements unless they serve a purpose.
- Less is more: remove before adding.

### 2. Mediterranean Warmth
- Warm neutrals over cold grays.
- Natural textures: stone, linen, wood, water.
- Light that feels like golden hour in Crete.

### 3. Sensory First
- Images are the hero. Never compete with them — support them.
- Typography should feel like it belongs in a design magazine.
- Micro-interactions should feel effortless, not performative.

---

## Color System

```
Primary background:   #FAF8F5  (warm off-white, like Cretan stone)
Secondary background: #F0EBE3  (linen)
Text primary:         #1A1714  (near black, warm undertone)
Text secondary:       #6B6560  (warm medium gray)
Accent:               #C4A882  (sand/gold — use sparingly)
Deep accent:          #3D2F28  (dark earth, for contrast)
Water blue:           #7BA7BC  (Aegean — use only for water-related elements)
White:                #FFFFFF  (pure white for cards and overlays)
```

**Rules:**
- Never use pure black (#000000) — always warm darks
- Accent color (#C4A882) maximum 10% of any screen
- No more than 3 colors visible at once on any section

---

## Typography

```
Headings:   Cormorant Garamond or Playfair Display — elegant, editorial
Body:       Inter or DM Sans — clean, readable, modern
Captions:   DM Sans Light or Inter Light — small, airy
```

**Scale:**
```
H1: 56-72px / line-height 1.1 / letter-spacing -0.02em
H2: 36-48px / line-height 1.15
H3: 24-30px / line-height 1.3
Body: 16-18px / line-height 1.7
Caption: 13-14px / line-height 1.5 / letter-spacing 0.05em uppercase
```

**Rules:**
- Headlines in serif. Body in sans-serif. Never mix more than 2 typefaces.
- Use letter-spacing on small caps and labels.
- Never center-align body text — only headlines and short CTAs.

---

## Layout & Spacing

- Base unit: 8px grid
- Section padding: min 80px vertical on mobile, 120-160px on desktop
- Max content width: 1280px, centered
- Image-heavy sections: full bleed or near-full bleed (90-100vw)
- Text columns: max 65 characters per line for readability

**Section structure pattern:**
```
[Full-bleed hero image or video]
[Short, powerful headline — max 8 words]
[1-2 sentence supporting text]
[Single CTA]
```

---

## Photography & Media

- Images are the product. Treat them as art.
- Always use the highest resolution available.
- Prefer landscape/horizontal orientation for hero shots.
- Apply subtle warm color grading if images feel cold or flat.
- Never stretch, crop awkwardly, or pixelate.
- Lazy-load all images below the fold.
- Use aspect-ratio containers to prevent layout shift.

**Image hierarchy:**
1. Full-screen hero (100vh)
2. Large feature (60-70vh)
3. Gallery grid (equal-ratio squares or 4:3)
4. Small supporting thumbnails

---

## Components — Design Standards

### Hero Section
- Full viewport height (100vh)
- Image or video background with subtle overlay (max 20% opacity dark)
- Headline: large serif, white or near-white
- Subheading: small caps, light weight, letter-spaced
- Single CTA button: outline style, white, on hover fills with accent

### Booking / CTA Section
- Clean, minimal form
- Warm background (#F0EBE3)
- Never crowded — maximum 3 fields visible at once
- CTA button: dark earth (#3D2F28) with warm white text

### Gallery
- Masonry or equal-grid layout
- Hover: subtle zoom (scale 1.03) with 0.4s ease
- Lightbox on click — full screen, dark background, swipe-enabled

### Navigation
- Transparent on hero, transitions to solid on scroll
- Logo left, links right, booking CTA as button
- Mobile: full-screen overlay menu with large text

### Cards (amenities, features)
- No heavy borders — use subtle shadow or background color shift
- Icon or small image at top
- Short headline + 1-2 lines of text maximum

---

## Animations & Interactions

**Philosophy:** Animations should feel like breathing — natural, not flashy.

```
Default transition: 0.3s ease
Hover transitions:  0.2s ease
Page entrance:      fade-up, 0.5s, staggered 0.1s between elements
Scroll animations:  subtle fade-in (opacity 0→1, translateY 20px→0)
```

**Rules:**
- Never animate more than 2 elements simultaneously
- Respect `prefers-reduced-motion` — disable animations if set
- No bouncing, spinning, or attention-grabbing effects
- Parallax: subtle only (max 20px offset)

---

## Mobile Experience

- Mobile-first approach on all new components
- Touch targets: minimum 44x44px
- Swipe gestures on gallery and testimonials
- Sticky booking CTA on mobile (bottom bar)
- Font sizes never below 15px on mobile
- Test on iPhone SE (smallest) and iPhone Pro Max (largest)

---

## Competitive Reference — What Works

Study these sites for inspiration (do not copy):
- **Mr & Mrs Smith** — editorial photography, quiet CTAs
- **Airbnb Luxe** — trust signals + aspirational imagery balance  
- **Domaine des Etangs** — typography and whitespace mastery
- **Naxian Collection** — Mediterranean luxury done right
- **Verina Astra Suites** — Cycladic minimalism

**Key patterns from top villa sites:**
1. Hero video or full-screen image with minimal text overlay
2. "The Experience" section — sensory description, not features list
3. Social proof close to booking CTA
4. Mobile sticky booking button converts 2-3x better than inline CTA
5. Virtual tour or immersive gallery increases time-on-site significantly

---

## UX Priorities (in order)

1. **Speed** — page must feel instant. Optimize all images. Use lazy loading.
2. **Trust** — reviews, certifications, response time visible above fold or near booking
3. **Clarity** — one clear action per screen. Don't make users think.
4. **Delight** — small moments of beauty (hover states, transitions, micro-copy)

---

## What to Preserve

- All existing content (text, descriptions, amenities)
- Existing images and media assets
- Current booking flow logic
- Brand name and domain identity

## What to Improve (when relevant)

- Spacing that feels cramped
- Typography that lacks hierarchy
- Colors that feel cold or generic (`text-mediterranean-blue`, `text-mediterranean-deep-navy` → replace with `text-[#1A1714]`)
- CTAs that are buried or unclear
- Sections that compete visually instead of guiding the eye
- Any element that slows the page or creates layout shift

---

## Architecture (Current State — April 2026)

### Tech Stack
- React + TypeScript + Vite
- Tailwind CSS (custom color system via tailwind.config.ts)
- Supabase (Postgres + Auth + Storage + Edge Functions)
- Bilingual: EN + HE (RTL support via `dir` attribute on html element)
- Git worktree branch: `claude/clever-mcclintock`

### CMS Architecture
Content is loaded from **Supabase `page_content` table** via `useCms()` hook.
CMS content **overrides** `translations.ts` via `content?.field || translations.field` pattern.
Supabase project ID: `hscafycmozoismieksqc`
MCP Supabase tool is available — use `mcp__claude_ai_Supabase__execute_sql` to update content directly.

**Pages with CMS content:** home, about, gallery, booking, contact, explore

**To update CMS content without admin login:**
```sql
UPDATE page_content
SET data = data || '{"headline": "New value"}'::jsonb
WHERE page_id = (SELECT id FROM pages WHERE slug = 'about')
  AND lang = 'en' AND status = 'published';
```

### Key File Paths
```
src/components/HeroSection.tsx
src/components/AboutSection.tsx
src/components/DayAtVillaSection.tsx
src/components/GallerySection.tsx
src/components/TestimonialsSection.tsx
src/components/BookingSection.tsx
src/components/ContactSection.tsx
src/components/Footer.tsx
src/components/Header.tsx
src/utils/translations.ts        <- fallback content (EN + HE)
src/hooks/use-cms.ts             <- CMS data fetcher
src/lib/cms.ts                   <- Supabase CMS helpers
```

### Gallery Images
All images in `/lovable-uploads/` and Supabase Storage.
CMS categories: outdoor, garden-day-light, garden-night, secret-bay, sunset, living-room, balconies, bed-room-1, bed-room-2.

---

## Established Component Patterns (Implemented)

### Dark Editorial Section — DayAtVillaSection
Immersive storytelling pattern. Use for experience/narrative sections:
- Background: `bg-[#1A1714]`
- Alternating 5-col grid: image (col-span-3) + text (col-span-2), alternates L/R per row
- Ghost number behind text: `text-[140px] text-white/[0.03] font-cormorant absolute`
- Time label: `text-[10px] uppercase tracking-[0.25em] text-[#C4A882]`
- Headline: `font-cormorant font-light text-white text-3xl lg:text-4xl whitespace-pre-line`
- Body: `text-[15px] text-white/50 font-inter font-light max-w-xs`
- Image: `h-[52vh] object-cover hover:scale-[1.02] duration-700`

### Why Book Direct Block
Always pair with Booking section sidebar:
- Container: `bg-[#3D2F28] rounded-2xl p-6`
- Label: `text-[#C4A882]` gold checkmarks
- Items: `text-white/80 text-sm font-inter`

### Testimonials
- Section bg: `bg-[#F0EBE3]`
- Cards: `bg-white rounded-2xl p-8 shadow-sm`
- Stars: `fill-[#C4A882] text-[#C4A882]` (not amber)
- Attribution: name `#1A1714`, source `text-[#C4A882]` + "* 5.0"
- Footer line: "All reviews are verified guests on Google Maps"

### Header Scroll Behavior
- Transparent on hero → `bg-white/80 backdrop-blur-lg` on scroll (threshold: 50px)
- Logo: `text-white` when transparent, `text-[#3D2F28]` when scrolled
- Nav links: `text-white/90 hover:text-white` → `text-[#3D2F28] hover:text-[#1A1714]`
- Nav underline on hover: `after:bg-[#C4A882] after:h-px`

---

## Known Issues / Watchlist
- `text-mediterranean-stone-gray` still used in AboutSection body text — OK for now
- Supabase Auth Site URL pointed to old Netlify URL — fix via dashboard Auth settings
- `Heart` import still in Footer.tsx (unused after removing madeWith line)
- Admin panel at `/admin/content` requires Supabase Auth login

---

## How to Use This Skill

When working on any design or frontend task:

1. **Scan** the current component/section
2. **Check CMS** — does content come from Supabase or translations.ts?
3. **Identify** what conflicts with the principles above
4. **Propose** 2-3 specific improvements with rationale
5. **Implement** the agreed changes
6. **Update CMS** via MCP SQL if text content needs changing
7. **Validate**: Does this feel like quiet luxury? Is it warm? Is it clear?

Always ask before making structural layout changes.
Never remove content without explicit approval.
Suggest, don't impose — present options when direction is unclear.
