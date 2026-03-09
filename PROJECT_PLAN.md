# Thrisen — Project Plan: Interactive Split-Screen Website

**Client:** Personal/Professional website with a cinematic split-screen bridge, 3D character, and dual "worlds" (Personal + Professional).  
**Stack:** **Vite + React** (SPA), React Router, React Three Fiber, Drei, GSAP, .fbx character (optional .glb/.gltf for props).  
**Goal:** A functional and expressive "stage" where users choose between two identities (Personal vs Professional) through character-led interaction, with strong SEO foundations.  
**Note:** Client chose Vite over Next.js; SEO handled via react-helmet-async and optional prerendering later if needed.

---

## Overview of Phases

| Phase | Name | Focus |
|-------|------|--------|
| 1 | Discovery & Architecture | Tech choices, folder structure, SEO, asset pipeline |
| 2 | Core Interactive Bridge (V2) | Split-screen identity design, hover reactions, idle/run transitions |
| 3 | Cinematic World Transition System (V2) | Side expansion, character run-in, GSAP sequencing, route handoff |
| 4 | World Content + Persona States (V2) | Professional/personal content systems, digital twin states, polish & SEO |

## Updated Experience Pillars (New Concept)

- **The Bridge (Landing):** Vertical split screen where left = **Personal** (playful, warm, vibrant) and right = **Professional** (minimal, dark, tech-focused).
- **Single Character on Seam:** One 3D avatar sits at center seam and reacts to user intent.
- **Hover Language:** Hovering each side causes subtle panel glow and character head/upper-body look toward that side.
- **Click Trigger:** Clicking a side switches character from Idle to Run, expands the chosen side to fullscreen (GSAP width/clip-path), and transitions into that world's environment.
- **Identity Persistence:** Once landing in a world, the character shifts to that world's persona idle state and props/outfit.

---

# Phase 1: Discovery & Architecture

**Objective:** Lock down stack, project structure, SEO strategy, and asset workflow so Phases 2–4 have a clear foundation.

## 1.1 Framework & Tooling

- **Framework choice:** **Vite + React** (chosen). SPA with React Router; SEO via react-helmet-async; optional prerender (e.g. vite-plugin-ssr or vite-plugin-prerender) later for crawlers if needed.

- **Package manager:** npm (lockfile in repo).

- **Key dependencies:**
  - `react`, `react-dom`, `react-router-dom`, `react-helmet-async`
  - `three`, `@react-three/fiber`, `@react-three/drei`
  - `gsap`
  - Optional: `@react-three/rapier` or custom logic for simple character movement

## 1.2 Project Structure (Suggested)

```
src/
├── pages/                  # Route-level components (Vite + React Router)
│   ├── BridgePage.tsx      # Landing (Bridge)
│   ├── PersonalPage.tsx    # Personal world
│   └── ProfessionalPage.tsx # Professional world
├── components/
│   ├── bridge/             # Split-screen landing
│   │   ├── SplitLanding.tsx
│   │   ├── LeftPanel.tsx
│   │   ├── RightPanel.tsx
│   │   └── SeamOverlay.tsx
│   ├── three/
│   │   ├── Scene.tsx
│   │   ├── Character.tsx
│   │   ├── CameraRig.tsx
│   │   └── Lighting.tsx
│   ├── worlds/
│   │   ├── personal/       # Blog, Health, Social
│   │   └── professional/   # About, Skills, Projects, Contact
│   └── ui/                 # Shared buttons, modals, forms
├── hooks/
│   ├── useBridgeState.ts
│   ├── useWorldTransition.ts
│   └── useCharacterAnimation.ts
├── lib/
│   ├── gsap/
│   │   └── bridgeTimeline.ts
│   └── seo.ts
├── index.css               # Global styles (Tailwind)
└── public/
    ├── models/             # .fbx character + any props
    └── images/
```

Entry: `index.html` → `src/main.tsx` → `App.tsx` (React Router); meta via `PageMeta` + react-helmet-async.

## 1.3 SEO Strategy

- **Meta & Open Graph:** Per-route title, description, `og:image`. Using **react-helmet-async** in a `PageMeta` component; optional prerender for production so crawlers see correct meta.
- **Semantic HTML:** One `<main>` per view, proper headings (h1 → h2 → h3), landmarks (header, nav, main, footer).
- **URLs:** `/` = Bridge, `/personal` = Personal world, `/professional` = Professional world. Clean, shareable URLs for each "world."
- **Performance:** Lazy-load 3D scene (and/or world content) to keep LCP good; preload critical fonts and hero image if any.
- **Sitemap & robots:** Static `public/sitemap.xml` and `public/robots.txt`; update base URL (e.g. `VITE_BASE_URL`) before deploy.

**Deliverable:** Short SEO checklist (meta, URLs, semantics, sitemap) and wiring in layout/head.

## 1.4 Asset Pipeline & 3D Conventions

- **Character model:**
  - Format: single rigged `.fbx` with at least two animations: **Idle**, **Run** (or similarly named clips).
  - Tool: Blender — export FBX with scale/axis match R3F (Y-up); or use Mixamo and export as FBX.
  - Optimization: Keep polygon count reasonable for 60fps on mid-range devices.
- **Naming:** e.g. `character.fbx`, animations: `Idle`, `Run` (match exact clip names in code).
- **Placement:** `public/models/character.fbx` (or under `/assets` and copied to build).

**Deliverable:** Document: "Asset requirements" (naming, format, where to put files, how to add new animations).

## 1.5 State & Routing Model (High Level)

- **Bridge state (V2):** At minimum track `worldTarget`, `hoverTarget`, `phase`, and `persona` so hover intent, click transitions, and world-specific character idles are coordinated.
- **Routing:** React Router: `navigate('/personal')` or `navigate('/professional')` (or `<Link>`). Transition plays before or during route change (see Phase 3).
- **Worlds:** Each world is a full-page layout; no split on those routes.

**Deliverable:** One-page "State & routing" diagram or bullet list (who owns bridge state, who owns route, order of operations).

---

## Phase 1 Checklist

- **Status:** Complete and re-verified in codebase (Mar 4, 2026).
- [✔] Choose framework: **Vite + React** and create project.
- [✔] Install dependencies (R3F, Drei, GSAP, router).
- [✔] Create folder structure (bridge, three, worlds, hooks, lib).
- [✔] Add root layout with meta, fonts, global styles.
- [✔] Document SEO approach and add basic meta/OG.
- [✔] Document asset pipeline and 3D conventions.
- [✔] Document state & routing model.
- [✔] (Optional) Add placeholder pages for `/`, `/personal`, `/professional` with minimal content.

*Implemented:* `docs/SEO.md`, `docs/SEO_CHECKLIST.md`, `docs/ASSET_REQUIREMENTS.md`, `docs/STATE_AND_ROUTING.md`; `App.tsx` (Router); `PageMeta` + `lib/seo.ts` for meta/OG; `src/hooks/useBridgeState.ts` + `src/contexts/BridgeStateContext.tsx` for bridge state model; `README.md` aligned to Vite/React setup.

---

# Phase 2: Core Interactive Bridge

**Objective:** Implement the V2 bridge: an identity-driven split landing where hover and click produce clear intent feedback (panel glow + character look), then a cinematic run-and-expand transition.

## 2.1 Split-Screen Layout

- **Layout:** CSS Grid or Flexbox: two equal columns (50% / 50%). No gap so the "seam" is a single vertical line in the center.
- **Left panel ("Personal"):** Warm tones, organic shapes, playful motion accents; clear "PERSONAL" label and CTA.
- **Right panel ("Professional"):** Dark mode or high-tech grid/glassmorphism styling; clear "PROFESSIONAL" label and CTA.
- **Center seam:** Optional thin line or glow; ensure the 3D canvas overlaps the seam so the character sits exactly on it.
- **Full viewport:** Bridge is 100vw / 100vh; no scrolling on the bridge itself.
- **Click targets:** Each half is a big clickable area (or explicit CTA buttons) that sets target world and triggers transition.

**Deliverable:** `SplitLanding` (or equivalent) with left/right panels and correct layout; no 3D yet.

## 2.2 3D Canvas Integration

- **Single full-screen canvas:** React Three Fiber `<Canvas>` covering the full bridge (position: fixed or absolute, full width/height).
- **Integration with DOM:** Canvas sits behind or in front of panels as needed (typically behind UI with pointer-events so clicks hit panels; or canvas receives clicks and you raycast to left/right). Decide: either "canvas behind, UI on top with pointer-events" or "canvas in front, raycast to decide left/right."
- **Responsive:** Canvas resizes with viewport; R3F handles this by default.
- **Performance:** Set `frameloop="demand"` or `frameloop="always"` as needed; use `dpr={[1, 2]}` to cap pixel ratio on high-DPI.

**Deliverable:** Canvas visible on bridge with a simple mesh (e.g. box) to confirm R3F works; then replace with character.

## 2.3 Character Component

- **Load model:** Use `useFBX` from Drei pointing to `/models/character.fbx` (FBXLoader; animations on root via `useAnimations`).
- **Animations:** Use `useAnimations` (Drei) to get clip names and actions. Map to state: e.g. `idle` → Idle clip, `run` → Run clip; crossfade or play from start on state change.
- **Position:** Place character on the vertical center (x = 0 in world space, or aligned to seam). Y and Z for ground and depth. Scale so size fits the "bridge" visually.
- **Orientation:** Face the camera or slightly to one side; when "run left" vs "run right," flip or rotate so run direction matches target panel.
- **State-driven animation:** Bridge state (idle / personal / professional) drives which clip plays. On click: switch to "run" and set run direction (left or right).
- **Hover look behavior:** On hover left/right, blend in a lightweight "look-left/look-right" head-turn (or rotate head/neck bones procedurally if no clips available).

**Deliverable:** Character visible on seam, Idle by default; clicking left/right starts Run and orients character toward that side (animation only; no travel yet if you prefer to add motion in Phase 3).

## 2.4 Camera

- **Default:** Perspective camera; character in frame on the seam (e.g. slight angle or front view).
- **Orchestration:** Optional "follow" or "pan" when character "runs" — e.g. camera eases toward the chosen side. Can be done with R3F `<Camera>` + GSAP or with Drei `useFrame` and lerp. For Phase 2, at minimum: static camera that frames the character; optional: simple pan toward left/right on click.
- **Aspect:** Match canvas aspect ratio; no fixed FOV requirement unless you have a specific look.

**Deliverable:** Camera frames the character; optional pan on click.

## 2.5 Lighting

- **Basic three-point or env:** Ambient + 1–2 directional/point lights so the character is readable. Option: Drei `<Environment>` for quick IBL.
- **Mood:** Left (personal) can be warmer, right (professional) cooler; can be refined in Phase 3 with world-specific lighting or post-processing.

**Deliverable:** No dark character; lighting matches rough mood of each side.

## 2.6 Click Handling & Bridge State

- **Left click →** Set bridge state to "personal," play Run (facing left), optionally start camera pan left.
- **Right click →** Set bridge state to "professional," play Run (facing right), optionally start camera pan right.
- **State hook:** e.g. `useBridgeState()` exposing:
  - `worldTarget: null | 'personal' | 'professional'`
  - `hoverTarget: null | 'personal' | 'professional'`
  - `phase: 'idle' | 'hovering' | 'running' | 'transitioning' | 'arrived'`
  - `persona: 'default' | 'professional-tech' | 'personal-casual'`
- **Interaction detail:** Hover PERSONAL -> left panel glow + character looks left. Hover PROFESSIONAL -> right panel glow + character looks right.

**Deliverable:** Click left/right updates state, character runs and faces correct direction; state available for Phase 3 transition.

## 2.7 Hover Interaction Feedback (New)

- **Panel glow:** Soft edge glow and/or subtle scale/brightness increase on the hovered side only.
- **Character response:** Character turns head/torso toward hovered side without leaving seam.
- **Non-hover reset:** On mouse leave, character returns to neutral idle and glow fades.

**Deliverable:** A clear "I see your intent" feedback loop before click.

---

## Phase 2 Checklist

- **Status:** Completed and re-verified with V2 interaction refinements (Mar 5, 2026).
- [✔] Update visual identity of both sides (Personal warm/organic, Professional dark/tech).
- [✔] Add hover state with side glow and character look-left/look-right response.
- [✔] Expand bridge state model to include `hoverTarget`, richer `phase`, and `persona`.
- [✔] Preserve click-to-run behavior while keeping hover behavior lightweight and reversible.
- [✔] Validate pointer behavior for desktop + touch fallback.

*Implemented:* `SplitLanding`, `LeftPanel`, `RightPanel`, `SeamOverlay`; `Scene`, `Character` (with `CharacterModel` + `CharacterPlaceholder`), `CameraRig`, `Lighting`; expanded `BridgeStateContext` + `useBridgeState` (`hoverTarget`, richer `phase`, `persona`); `useCharacterAnimation` with hover look intent and run direction; touch-safe panel intent handling.

---

# Phase 3: World Transition System

**Objective:** Execute a cinematic click-to-world sequence: selected side expands to fullscreen, character runs into that direction, and the new world loads with consistent identity/state.

## 3.1 Transition Flow (Order of Operations)

1. User clicks PERSONAL or PROFESSIONAL.
2. Character switches `Idle -> Run`, oriented to chosen side.
3. GSAP timeline expands selected side to fullscreen (`clip-path` or width animation); non-selected side retracts/fades.
4. Character runs "into" the selected environment (forward lateral movement + camera assist if needed).
5. Route change (or in-place world mount) resolves to `/personal` or `/professional`.
6. Character lands in world-specific persona idle state (`professional-tech` or `personal-casual`).
7. New page content performs short enter animation.

**Deliverable:** Single timeline or sequence document (or code comment) that defines exact order and approximate timings.

## 3.2 GSAP Timeline (Bridge Exit)

- **Scope:** Exit animations for bridge only (panel expansion, canvas fade, etc.).
- **Trigger:** After run + optional camera move; call timeline from bridge component or a small "transition controller" that reads bridge state.
- **Examples:** Left panel expands to full width while right side clips out (or vice versa); canvas can fade as world scene takes over.
- **On complete:** Navigate with React Router `navigate('/personal')` or `navigate('/professional')`. Ensure no flash of both pages; use loading or opacity so the new page appears only after route change.

**Deliverable:** `bridgeTimeline.ts` (or equivalent) with a function that returns a timeline for "exit to personal" and "exit to professional"; called from bridge and on complete triggers navigation.

## 3.6 Character Persona State Handoff (New)

- **Professional arrival state:** Character transitions to "tech/typing" idle (example: opens laptop, puts on glasses, focused pose).
- **Personal arrival state:** Character transitions to casual/hobby idle (example: hoodie variant, coffee cup/camera/running-shoe prop).
- **State persistence:** Returning to bridge resets to default seam idle; entering worlds restores their persona-specific idle.

**Deliverable:** Character state machine supports bridge and world persona states with clean transitions.

## 3.3 Route Change & Mount

- **Vite + React Router:** `useNavigate()('/personal')` or `/professional`. Optionally use a loading UI or Suspense boundary.
- **Entry animation:** On Personal/Professional page, run a short GSAP "enter" timeline (e.g. content from opacity 0 to 1, or slide up). Use layout or page-level useEffect to run once on mount.

**Deliverable:** Clicking a side eventually lands on the correct route with a smooth enter animation.

## 3.4 "Back to Bridge" (Optional but Recommended)

- **Link/button:** On Personal and Professional pages, a "Back" or "Home" that goes to `/`.
- **Behavior:** Navigate to `/`; bridge mounts in "idle" state (character Idle on seam). Optional: short "enter bridge" GSAP timeline (e.g. split reappears, character fades in or is already there).

**Deliverable:** From either world, user can return to the bridge and see the split again.

## 3.5 Shared Layout vs Full Replace

- **Decision:** Either (a) bridge is one layout and worlds are another layout, or (b) everything under one layout with conditional rendering. Recommendation: separate routes (`/`, `/personal`, `/professional`) and separate layouts so the bridge has no world content and worlds have no split.
- **Shared pieces:** Header/footer if any; SEO component; global styles. Keep 3D and heavy logic only on the bridge route to avoid loading R3F on world pages if desired (lazy load bridge when entering `/`).

**Deliverable:** Clear separation: `/` = bridge only; `/personal` and `/professional` = full-page world content.

---

## Phase 3 Checklist

- **Status:** Completed and re-verified with V2 cinematic transition update (Mar 5, 2026).
- [✔] Implement side-expansion transition (`clip-path` or width strategy) tied to click target.
- [✔] Sync character run timing with UI transition so movement feels continuous.
- [✔] Add persona state handoff on arrival (`professional-tech` / `personal-casual`).
- [✔] Keep route handoff free of flashes and preserve enter animation.
- [✔] Validate reverse transition back to bridge default idle.

*Implemented:* `lib/gsap/bridgeTimeline.ts` with side-expansion exit timelines; `BridgePage` runs transition after `RUN_DELAY_MS` and sets transition phase before route handoff; `useWorldTransition` passes route `state` for persona handoff; `PersonalPage`/`ProfessionalPage` GSAP enter on `<main>`; "← Back to Bridge" links reset bridge route to default seam idle by remount.

---

# Phase 4: World Content + Persona States

**Objective:** Build world content around two clear audiences (Recruiters/Clients vs Community/Peers) and align character/world visuals with each identity.

## 4.1 Professional World (Right Track)

- **Visual style:** Dark mode, glassmorphism/high-tech grid aesthetic, clean typography.
- **Interactive Tech Stack:** Floating cloud of tools (React, Node, etc.) as 3D icons or animated chips; optional character proximity interaction.
- **Project Showcase:** 3D slider/gallery wall; click project -> 2D modal with case study details (problem, solution, stack, impact, links).
- **Live Stats:** Dynamic metrics (GitHub contributions, years of experience, repositories) rendered as prominent text/cards (2D or 3D-styled).

**Deliverable:** `/professional` communicates technical credibility quickly for recruiters/clients.

## 4.2 Personal World (Left Track)

- **Visual style:** Warm tones, organic shapes, cozy "lo-fi room/office" vibe.
- **Hobby Highlights:** 3D props (camera, controller, book, shoe, coffee cup) with hover/click tooltips.
- **Micro-Blog / Feed:** Scrollable list of quick entries ("what I'm learning", "currently into", "favorite music").
- **Digital Twin variant:** Character appears in casual mode (e.g. hoodie or hobby prop) while in personal world.

**Deliverable:** `/personal` feels human/community-facing and complements the professional side without duplicating it.

## 4.3 Character Identity System (New)

- **Core requirement:** Character state must reflect the world they finish in, not just the transition animation.
- **Professional state pack:** typing/laptop animation, glasses accessory toggle, focused idle loop.
- **Personal state pack:** casual outfit variant (hoodie) and/or hobby-item hold poses.
- **Fallback strategy:** If outfit swap is heavy, start with prop/animation overlays and upgrade to full mesh/material swap later.

**Deliverable:** Stable persona system with explicit mapping from world route -> character look + idle behavior.

## 4.4 Content Slots (Pluggable)

- **Micro-blog feed:** `posts` data contract for quick updates on personal side.
- **Projects/case studies:** `projects` contract with richer case-study fields for professional modal/gallery.
- **Stats provider:** `stats` contract for dynamic numbers (GitHub or manual fallback values).

**Deliverable:** Clear props/interfaces and example data so content can be swapped without layout rewrites.

## 4.5 SEO Finalization

- **Per-route meta:** Title and description for `/`, `/personal`, `/professional`. OG tags for sharing.
- **Structured data:** Optional JSON-LD for Person or WebSite on home or about.
- **Sitemap:** Static `public/sitemap.xml`; update base URL for production.
- **robots.txt:** Allow crawlers; link to sitemap.
- **Semantic HTML:** Confirm one h1 per page, headings hierarchy, landmarks.

**Deliverable:** All routes have correct meta; sitemap and robots in place; quick SEO audit (Lighthouse or manual check).

## 4.6 Performance & Polish

- **3D:** Lazy-load R3F/character only on bridge route (dynamic import or route-based code split). Optimize .fbx (poly count, size).
- **Images:** Use standard `<img>` or a lightweight image component; placeholders if needed.
- **Fonts:** Preload critical font; avoid layout shift.
- **Accessibility:** Focus order, keyboard navigation (especially bridge click areas and modals), reduced motion preference (optional: respect `prefers-reduced-motion` for GSAP).
- **Mobile:** Touch targets for left/right on bridge; responsive layout for both worlds; test canvas on mobile (performance).

**Deliverable:** No critical performance regressions; basic a11y and mobile checks done.

---

## Phase 4 Checklist

- **Status:** Completed and re-verified with V2 world-content realignment (Mar 5, 2026).
- [✔] Professional world updated with interactive tech stack, project gallery wall, and live stats.
- [✔] Personal world updated with hobby props, micro-blog feed, and cozy visual language.
- [✔] Character identity system implemented (professional-tech vs personal-casual).
- [✔] Content data contracts updated (`posts`, `projects`, `stats`) with sample datasets.
- [✔] SEO/meta and performance reviewed after V2 visual/interaction changes.

*Implemented:* Personal: `HobbyShelf`, updated `RunningBlog`, `HealthJourney`, `SocialHub`, and cozy route styling; Professional: dark-tech route styling + updated `About`, `Skills`, `Projects`, `Contact`, and new `LiveStats`; data contracts in `src/data/posts.ts`, `projects.ts`, `stats.ts`, `milestones.ts`; persona route handoff with `useRoutePersona`; `PageMeta` on all routes; `public/sitemap.xml`, `public/robots.txt`.

**Before deploy:** Set `VITE_BASE_URL`; update `public/sitemap.xml` and `public/robots.txt` base URL; add `public/images/og-default.png` (or set `ogImage` per route in `lib/seo.ts`).

---

# Summary: Dependency Order

```
Phase 1 (Discovery) → Phase 2 (Bridge) → Phase 3 (Transitions) → Phase 4 (Content)
     ↓                      ↓                      ↓                      ↓
  Structure,           Split + 3D +            GSAP + route           Worlds +
  SEO base,            character +             change + back           blog/project
  assets               state                                         slots + SEO
```

---

# Suggested Timeline (Rough)

| Phase | Suggested duration (solo dev) |
|-------|------------------------------|
| 1     | 1–2 days                     |
| 2     | 3–5 days                     |
| 3     | 2–3 days                     |
| 4     | 4–6 days                     |

Total: about 2–3 weeks for a first full pass, depending on asset readiness and content.

---

# Risks & Mitigations

- **3D performance on low-end devices:** Use `frameloop="demand"` when idle if possible; reduce shadows or resolution; offer "reduce motion" or disable 3D fallback.
- **Character model not ready:** Use a placeholder (e.g. box or capsule) until .fbx is available; keep animation API the same (idle/run by name).
- **SEO with SPA:** Add prerendering (e.g. vite-plugin-prerender) for critical routes if crawlers need full meta/content.

---

# Baseline vs V2 Scope

**Baseline implemented (pre-V2):** Core split bridge, click-to-run routing, world pages, initial content sections, and SEO plumbing are already in place.

**V2 scope introduced in this update:** Hover glow + character look intent feedback, cinematic side expansion transition, and world-specific character persona states (professional-tech vs personal-casual), plus content realignment toward recruiter/client vs community/peer audiences.

**Current V2 decisions / follow-up:**

- **Character asset strategy:** Using one rig with lightweight persona overlays now; can upgrade to full outfit variants later.
- **Stats data source:** Manual `stats` snapshot contract is active; GitHub API integration is optional next step.
- **Transition technique:** Width expansion + subtle `clip-path` styling is now implemented in GSAP exit timeline.
- **Micro-blog source:** Local data contract (`src/data/posts.ts`) is active; markdown/CMS integration remains optional.
- **Production readiness:** Set final base URL values and OG image assets before deployment.

---

Use this document as the source of truth for the current V2 roadmap. Recommended execution order now is: Phase 2 interaction refinements (hover + intent cues), then Phase 3 cinematic transition/state handoff, and finally Phase 4 world content/persona alignment and SEO re-check.
