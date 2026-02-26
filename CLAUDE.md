# CLAUDE.md — Andrew's Personal Website

## Project Overview

A futuristic, high-performance personal website for Andrew — a USC Business Administration & Data Science student, AI developer, blockchain researcher, and growth lead. The site serves as a portfolio, blog, and personal brand hub.

**Pages:** Home (Landing), About Me, Projects, Blog (Crypto Research Papers & Slides), Contact

---

## Design Philosophy & Aesthetic Direction

### Core Aesthetic: **"Supercar Showroom meets Digital Studio"**

Think of the website as a sleek supercar render brought to life as a web experience. The design language draws from precision-engineered automotive aesthetics — sharp lines, luminous surfaces, dramatic lighting, and obsessive attention to detail — fused with the immersive, WebGL-driven interactivity of award-winning studios.

### Inspiration Sites & What to Extract From Each

| Site | Key Takeaway |
|---|---|
| **lusion.co** | Cinematic 3D hero sections, scroll-driven storytelling, smooth page transitions, bold typography on dark canvases, immersive WebGL elements |
| **ilabsolutions.it** | Italian sartorial polish, elegant type pairings, refined micro-interactions, sophisticated hover states, clean section flow |
| **thedigitalpanda.com** | Dynamic showreel integration, staggered reveal animations, strong visual hierarchy, project showcase grids with rich hover effects |

### Design Principles

1. **Cinematic Depth** — Every section should feel like a frame from a high-end car commercial. Use layered parallax, volumetric lighting effects, and dramatic gradients to create depth and atmosphere.
2. **Precision & Polish** — No generic UI. Every spacing decision, every animation curve, every color choice should feel intentional — like the panel gaps on a Porsche 911.
3. **Motion as Identity** — Smooth, purposeful animations everywhere. Page transitions, scroll-triggered reveals, hover micro-interactions, and ambient background motion. Nothing should feel static.
4. **Dark-First Luxury** — Deep blacks and charcoals as the foundation, with sharp accent lighting (electric blue, cool white, or metallic silver) cutting through like headlights in the dark.
5. **Performance is Aesthetic** — The site itself should feel fast. Snappy interactions, optimized loading, smooth 60fps animations. Speed is part of the brand.

---

## Visual Language

### Color Palette

```
--color-bg-primary:       #08080A;       /* Near-black base */
--color-bg-secondary:     #111114;       /* Elevated surfaces */
--color-bg-tertiary:      #1A1A1F;       /* Cards, panels */
--color-surface-glass:    rgba(255, 255, 255, 0.03); /* Frosted glass overlays */

--color-accent-primary:   #00D4FF;       /* Electric cyan — primary CTA, links, highlights */
--color-accent-secondary: #7B61FF;       /* Deep violet — secondary accents, gradients */
--color-accent-glow:      #00D4FF33;     /* Cyan glow for ambient effects */

--color-text-primary:     #F0F0F5;       /* Main text — slightly warm white */
--color-text-secondary:   #8A8A9A;       /* Subdued text */
--color-text-muted:       #4A4A5A;       /* Hints, labels */

--color-border:           rgba(255, 255, 255, 0.06); /* Subtle dividers */
--color-border-hover:     rgba(0, 212, 255, 0.3);    /* Accent border on hover */
```

**Gradient Signatures:**
- Hero gradient: radial gradient from `#00D4FF10` center to `#08080A` edges (subtle headlight bloom)
- Card hover: linear gradient sweep from `#7B61FF08` to `#00D4FF08`
- Section dividers: horizontal line fading from transparent → `#00D4FF40` → transparent

### Typography

Use a pairing that feels engineered and editorial, not generic.

- **Display / Headlines:** [Clash Display](https://fonts.cdnfonts.com/css/clash-display) or [Satoshi](https://fonts.cdnfonts.com/css/satoshi) — geometric, modern, confident. Use uppercase with generous letter-spacing for section headers.
- **Body:** [General Sans](https://fonts.cdnfonts.com/css/general-sans) or [Switzer](https://fonts.cdnfonts.com/css/switzer) — clean, highly legible, contemporary.
- **Monospace (code/data accents):** [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — for stats, labels, tags, dates.

**Type Scale:**
```
Hero headline:       clamp(3rem, 8vw, 7rem), weight 700, tracking -0.02em
Section headline:    clamp(2rem, 5vw, 4rem), weight 600, tracking -0.01em
Subheadline:         clamp(1.25rem, 2.5vw, 1.75rem), weight 500
Body:                1rem (16px), weight 400, line-height 1.7
Caption / Label:     0.75rem, weight 500, uppercase, tracking 0.1em, monospace
```

### Iconography & Visual Elements

- Custom line icons with 1.5px stroke, rounded caps — matching the precision aesthetic
- Avoid emoji in the UI entirely
- Use subtle grid/mesh overlays as background texture (evokes technical drawings / car blueprints)
- Geometric accent shapes: thin lines, circles, crosshairs — like HUD/targeting elements
- Noise/grain texture overlay at ~3% opacity for richness

---

## Animation & Interaction Standards

### Global Transitions

- **Page transitions:** Smooth crossfade with a subtle slide (300–500ms, cubic-bezier(0.25, 0.1, 0.25, 1.0))
- **Scroll-triggered reveals:** Elements fade in + translate up 30px as they enter viewport. Stagger children by 80–120ms.
- **Cursor:** Custom cursor — small dot with a trailing ring that expands on hover over interactive elements

### Hover States

- **Links:** Color shift to `--color-accent-primary` with a subtle underline animation (left-to-right wipe)
- **Cards:** Slight scale(1.02), border-color transition to accent, subtle glow shadow
- **Buttons:** Background fill animation (left-to-right), icon micro-rotation or arrow slide
- **Images/thumbnails:** Subtle Ken Burns zoom + overlay gradient shift

### Ambient Motion

- Subtle floating particles or softly animated mesh gradient in hero section background
- Parallax depth on layered elements during scroll
- Gentle pulsing glow on accent elements (like an LED indicator on a car dashboard)

### Performance Rules

- Prefer CSS animations and transforms over JS-driven animation where possible
- Use `will-change` sparingly and only on actively animating elements
- Intersection Observer for scroll-triggered animations (no scroll event listeners)
- Lazy load all images and heavy assets
- Target 60fps on all animations

---

## Page-by-Page Specifications

### 1. Home / Landing Page

**Purpose:** Immediate impact. Establish the brand, create intrigue, drive navigation.

**Structure:**
1. **Hero Section** — Full-viewport. Large animated headline with staggered letter/word reveal. Subtle 3D or particle background effect. Tagline + CTA button. Scroll indicator at bottom.
2. **Quick Intro Strip** — One-liner about Andrew with a few key identity markers (USC, AI/ML, Blockchain, Data Science) displayed as animated tags or a ticker.
3. **Featured Projects** — 2–3 highlighted project cards with thumbnail, title, and tags. Hover reveals description. Links to Projects page.
4. **Latest Blog Post** — Preview card of the most recent crypto research piece. Sleek card with gradient border.
5. **CTA / Contact Teaser** — Bold statement ("Let's build something.") with link to Contact page.

**Navigation:** Fixed top nav bar, minimal — logo/name on left, page links on right. Transparent background that gains a subtle frosted-glass effect on scroll. Hamburger menu on mobile with full-screen overlay.

### 2. About Me

**Purpose:** Personal story, skills, background — presented with personality, not like a resume.

**Structure:**
1. **Hero/Intro** — Large headline ("About Me" or something more personal). Subheadline summarizing Andrew in one compelling sentence.
2. **Bio Section** — Two-column layout: portrait/photo on one side, narrative text on the other. The bio should read conversationally — Korean American background, USC, interests spanning blockchain to AI development. Animate in on scroll.
3. **Skills / Interests Grid** — Visual grid or card layout showing key domains: AI / ML, Blockchain & DeFi, Data Analytics, Finance, Full-Stack Development. Each with an icon and brief descriptor. Subtle hover animations.
4. **Experience Timeline** — Vertical or horizontal timeline showing key roles: BlockchainSC, Serenity AI, Keck Graduate Institute, USC Finance Club. Scroll-animated.
5. **Personal Touches** — Section for hobbies/interests (basketball, tech, etc.) displayed casually — maybe a scrolling photo strip or mood board aesthetic.

### 3. Projects

**Purpose:** Showcase of work — technical, entrepreneurial, and creative.

**Structure:**
1. **Page Header** — Bold headline + filter/tag system for categories (AI / ML, Blockchain, Data Analytics, Full-Stack, Research, etc.)
2. **Project Grid** — Masonry or staggered grid layout. Each card shows: project thumbnail/cover, title, short description, tech stack tags. Hover effect: overlay with "View Project →" CTA.
3. **Project Detail View** — Clicking a project opens a dedicated page or modal with: full description, role/contribution, tech stack, images/screenshots/demos, links to live site or repo.

**Key Projects to Feature:**
- SprintIQ (AI biomechanical analysis app — pose estimation, computer vision)
- Serenity AI (agentic wellness platform — LLM orchestration, RAG)
- Neighborhood (social media concept app that combats AI-human relationships and nurtures authentic human-human connection)
- Poker GTO Trainer (trains users to play perfect game-theory-optimal poker)
- BlockchainSC research & investment work
- Autonomous data analysis systems
- Academic/data science projects

### 4. Blog (Crypto Research Papers & Slides)

**Purpose:** Publish and showcase crypto/blockchain research — position Andrew as a thought leader in the space.

**Structure:**
1. **Page Header** — Headline + search bar + category filters (DeFi, DAOs, Trading Platforms, Market Analysis, etc.)
2. **Post List** — Clean card-based list. Each card: title, date, category tag, reading time, brief excerpt. Sorted reverse-chronologically.
3. **Post Detail View** — Long-form reading experience. Clean, readable typography with generous margins. Support for:
   - Embedded slide decks (PDF viewer or image carousel for presentation slides)
   - Code snippets with syntax highlighting
   - Charts/graphs
   - LaTeX or mathematical notation if needed
   - Download links for full PDFs
4. **Sidebar or Footer** — Related posts, tags cloud, newsletter signup (optional)

**Content Types:**
- Written research articles / papers
- Embedded slide decks (from presentations)
- Market analysis pieces
- Quick takes / shorter form posts

### 5. Contact

**Purpose:** Simple, clean way for people to reach out.

**Structure:**
1. **Headline** — Something bold and inviting: "Let's Connect" or "Get In Touch"
2. **Contact Form** — Name, email, subject, message. Styled inputs with animated focus states (border glow, label float). Submit button with loading state animation.
3. **Direct Links** — Email, LinkedIn, Twitter/X, GitHub — displayed as icon links with hover effects.
4. **Location / Context** — "Based in Los Angeles, CA" with a subtle map element or just text.

---

## Technical Guidelines

### Stack — Best-in-Class

- **Framework:** Next.js 14+ (App Router) with TypeScript — RSC, streaming, parallel routes, intercepting routes for project modals
- **Styling:** Tailwind CSS v4 + CSS Modules for scoped complex animations. CSS variables for theming. No component libraries — everything custom.
- **Animations:** GSAP (GreenSock) with ScrollTrigger for scroll-driven choreography. Framer Motion for layout animations and page transitions. Lenis for buttery smooth-scroll. CSS for micro-interactions.
- **3D / WebGL:** Three.js with React Three Fiber + Drei for hero backgrounds, particle fields, or interactive 3D elements. Post-processing via `@react-three/postprocessing`. Use `<Suspense>` and `<Loader>` for graceful loading.
- **Blog / Content:** Contentlayer or Velite for type-safe MDX processing. Support LaTeX via `rehype-katex`, syntax highlighting via `rehype-pretty-code` with Shiki, and embedded slide viewers.
- **State & Data:** Zustand for lightweight global state (theme, cursor, navigation). SWR or TanStack Query for any dynamic data fetching.
- **Deployment:** Vercel (Edge Functions, ISR, image optimization, analytics built-in)
- **Tooling:** ESLint + Prettier, Husky + lint-staged for pre-commit hooks, `next-sitemap` for SEO, `sharp` for image processing

### File Structure (Next.js App Router + TypeScript)

```
/
├── app/
│   ├── layout.tsx              # Root layout — nav, footer, providers, smooth scroll
│   ├── page.tsx                # Home / Landing
│   ├── template.tsx            # Page transition wrapper
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx            # Project grid
│   │   ├── @modal/             # Intercepting route for project quick-view
│   │   │   └── (.)[slug]/
│   │   │       └── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx        # Full project detail
│   ├── blog/
│   │   ├── page.tsx            # Blog list with filters
│   │   └── [slug]/
│   │       └── page.tsx        # Blog post (MDX rendered)
│   └── contact/
│       ├── page.tsx
│       └── action.ts           # Server Action for form submission
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── PageTransition.tsx  # Framer Motion AnimatePresence wrapper
│   │   ├── SmoothScroll.tsx    # Lenis provider
│   │   └── CustomCursor.tsx    # GSAP-driven custom cursor
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Tag.tsx
│   │   ├── MagneticElement.tsx # GSAP magnetic hover effect
│   │   ├── TextReveal.tsx      # GSAP SplitText word/char reveal
│   │   ├── MaskReveal.tsx      # Clip-path scroll reveal
│   │   └── GlowBorder.tsx     # Animated gradient border component
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── FeaturedProjects.tsx
│   │   ├── LatestPost.tsx
│   │   ├── ContactCTA.tsx
│   │   └── SkillsGrid.tsx
│   ├── three/                  # R3F components
│   │   ├── Scene.tsx           # Canvas wrapper with perf monitoring
│   │   ├── ParticleField.tsx   # Instanced mesh particle system
│   │   ├── GradientMesh.tsx    # Animated shader-based background
│   │   └── shaders/
│   │       ├── particles.vert
│   │       └── particles.frag
│   └── mdx/                    # Custom MDX components
│       ├── SlideEmbed.tsx      # PDF/image carousel for presentations
│       ├── CodeBlock.tsx       # Shiki-highlighted code
│       ├── Callout.tsx
│       └── Chart.tsx           # Recharts wrapper for data viz
├── content/
│   ├── projects/               # MDX or JSON per project
│   └── blog/                   # MDX files for blog posts
├── public/
│   ├── images/
│   ├── slides/                 # PDF slide decks
│   ├── models/                 # Optional .glb/.gltf 3D assets
│   └── fonts/                  # Self-hosted font files
├── styles/
│   └── globals.css             # CSS variables, base resets, keyframes, noise/grain overlays
├── lib/
│   ├── gsap.ts                 # GSAP plugin registration (ScrollTrigger, SplitText)
│   ├── animations.ts           # Shared Framer Motion variants
│   ├── utils.ts
│   └── fonts.ts                # next/font local font definitions
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useInView.ts
│   ├── useLenis.ts
│   └── useMediaQuery.ts
└── CLAUDE.md
```

### Performance Targets

- Lighthouse Performance: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- All images: WebP/AVIF with proper srcset
- Fonts: Subset and preload critical fonts

### Accessibility Baseline

- All interactive elements keyboard-navigable
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text on all images
- Color contrast ratio ≥ 4.5:1 for body text
- Reduced motion: respect `prefers-reduced-motion` — disable parallax, particle effects, and complex animations; keep simple fades
- Focus-visible styles on all interactive elements

---

## Content & Copy Tone

- **Voice:** Confident but not arrogant. Curious. Forward-looking. Technical and sharp.
- **Perspective:** First person. "I build AI systems at the intersection of machine learning, blockchain, and real-world impact."
- **Avoid:** Corporate jargon, overly casual slang, filler words.
- **Blog tone:** Analytical and informed. Write like you're explaining to a smart friend who isn't in crypto — clear, structured, backed by data.

---

## Brand Assets Needed

- [ ] Professional headshot / portrait photo
- [ ] Project screenshots and thumbnails (16:9 and 1:1 crops)
- [ ] Slide deck PDFs for blog posts
- [ ] Personal logo or wordmark (optional — name in display font works)
- [ ] Open Graph / social share images (1200×630) for each page
- [ ] Favicon (SVG preferred)

---

## Development Phases

### Phase 1 — Foundation
- Set up Next.js project with Tailwind
- Implement global styles (colors, typography, CSS variables)
- Build Navbar + Footer + basic page routing
- Create Home page hero section with animation

### Phase 2 — Core Pages
- Build out About Me page
- Build Projects grid + detail pages
- Build Contact page with form

### Phase 3 — Blog
- Set up MDX or CMS integration
- Build blog list + post detail pages
- Add slide deck embedding (PDF viewer)
- Add category filtering and search

### Phase 4 — Polish & Motion
- Add page transitions (Framer Motion)
- Implement scroll-triggered animations across all pages
- Add hover micro-interactions
- Custom cursor (optional)
- 3D/particle hero background (optional, performance permitting)

### Phase 5 — Launch
- SEO optimization (meta tags, OG images, sitemap)
- Performance audit and optimization
- Cross-browser and mobile testing
- Deploy to Vercel
- Connect custom domain

---

## Key Reminders for Claude

- **Never use generic/default styling.** Every element should feel custom and intentional.
- **Dark theme is mandatory.** The entire site lives on a dark canvas.
- **Animation is core, not decoration.** Every page should have meaningful motion.
- **Think "supercar showroom" for visual inspiration.** Sleek, precise, dramatic, premium.
- **Prioritize the highest-quality implementation.** Use GSAP for complex scroll choreography, R3F for 3D, custom shaders where appropriate. Don't simplify — build it right.
- **The blog is a key differentiator** — it needs to handle both long-form writing and embedded slide presentations cleanly.
- **Performance matters.** Fancy animations that lag are worse than no animations.
- **Mobile-first responsive design.** The site must look and feel premium on phones too.
