# Leila Banta — Portfolio Website: Project Context

**This file is the persistent source of truth for this project.** Read it before making any non-trivial decision. Update it whenever a real decision is made — not just at the end of a session.

Last updated: 2026-10-02 (grid refinements: right-click solo-filter, homepage asset placeholders, resume teaser removed, contact subtitle differentiated)

---

## 1. Project Overview

Building an interactive website portfolio for **Leila Karlene Banta**, a graphic designer / illustrator / architecture graduate (BS Architecture, University of the Philippines Diliman, Cum Laude, Class of 2026), based entirely on her existing static PDF portfolio and resume.

**Goal:** a natural digital evolution of her existing portfolio — not a generic template with her work dropped in. The website itself should be defensible as an example of good graphic design.

**Guiding principle:** *"Use technology to enhance the graphic design, not compensate for a lack of graphic design."* Every visual/technical decision needs a reason tied back to her existing work.

## 2. Client / Portfolio Subject

- **Name:** Leila Karlene Banta
- **Email:** leila.banta@gmail.com
- **Phone:** +63 920 953 1002
- **Location:** Las Piñas City, Metro Manila, Philippines
- **LinkedIn:** linkedin.com/in/leila-karlene-banta-534n1ly/
- **Education:** BS Architecture, UP Diliman (2021–2026, Cum Laude); STEM strand, UST Sampaloc (2019–2021)
- **Positioning (her own words):** "a graphic designer, illustrator, and digital/social media creative with an architecture background. I make things for pages, screens, and everywhere in between—designing with unique typography, bold visuals, and ideas that know how to hold your attention."
- **Software:** Illustrator, Photoshop, InDesign, Canva (primary); Krita, Sketchbook, Premiere [basic], SketchUp, AutoCAD, Enscape (secondary/basic)
- **Current role:** Independent Graphic & Spatial Designer (Jun 2022–present); prior leadership/creative roles at UAPSA-UPD (Associate VP, Communications & Operations, then Organizational Relations) and Gabriela Youth–UPD (Creatives Team Contributor)

## 3. Source Files

- `C:\Users\seanb\Downloads\Leila Banta - Portfolio - Graphic Design.pdf` (25 pages)
- `C:\Users\seanb\Downloads\Leila Banta - Resume - Graphic Design.pdf` (1 page)
- Extracted to `assets/raw-pdf-pages/` — full-resolution page renders (3672×2376px, 300dpi-equivalent, PNG) for reference and cropping. **Not committed to git** (see `.gitignore`) — too large, regenerate via `assets/extract.py` if needed.
- `assets/extracted-images/` and `assets/extracted-images-deduped/` — auto-extracted embedded PDF images. Mostly noisy fragments/duplicated textures; **not reliable for production use**. Superseded by manually curated crops in `assets/curated/` (see asset pipeline below).

## 4. Design Goals

- Innovative without being gimmicky
- Professional, polished, aesthetically distinctive, strongly art-directed
- Interactive only where interaction genuinely adds value
- Responsive across desktop/tablet/mobile
- Fast, performant, easy to maintain
- Faithful to Leila's existing visual identity — **the PDF is the primary visual reference**
- Reads as designed by someone with strong graphic design knowledge, not AI-generated

**Explicitly avoid:** generic dark-mode dev portfolios, excessive gradients, glassmorphism, giant generic type with no art direction, floating blobs, animation-for-its-own-sake, generic "creative agency" templates, bento grids, over-rounded cards, glow effects, Framer/Webflow-template aesthetics.

## 5. Established Visual Identity (from source PDF analysis)

Full analysis lives in the approved design proposal artifact: **https://claude.ai/artifact/QdzHAqdBwQVJNZATjdTxCh** (private; read this for full reasoning behind every choice below).

Key findings from page-by-page review:

1. **Signature stamp wordmark** — the distressed, hand-inked serif "PORTFOLIO" lockup with a scratchy underline and soft pink halo (cover page). Closest thing she has to a personal logotype. Treat as a locked asset (image/SVG), not live-styled text.
2. **"about [me]" script** — genuinely hand-drawn/brush-lettered italic, not a clean italic serif font. Has real calligraphic irregularity (page 2). Should be sourced as an actual brush/calligraphy typeface, or vectorized from the original if fidelity matters enough.
3. **Paper/ink alternation** — section dividers ping-pong between warm off-white "paper" spreads (grain texture, halftone corner motifs) and near-black "ink" spreads. This is structural pacing, not decoration.
4. **Recurring 3-color chord** — blood red (~#B32E22), soft blush pink (~#EFC2CB), warm paper (~#EDE8E0) / near-black ink (~#181614). This chord is the connective thread across radically different per-project palettes.
5. **Every project has its own accent palette**, deliberately chosen and distinct: Myst (jewel tones: plum #573B4E, mauve #AB7F9C, indigo #6D648C, navy #243245, gold #C5A56E, near-black #262720), Casa Colina (nature: green #63A577, yellow #CDC96D, blue-grey #99AFB1, brown #383121), Alterkitektura (sustainability: navy #285282, sky #7DB6E2, white #F1F2F2, green #7BC067), Gabriela Youth (protest: mauve #6A5272, dusty pink #AC99A9, red #B5000D, pale pink #E6DAE4), Balikbuhay (pink/green/warm), KalyeKultura (teal/orange/yellow on weathered dark).
6. **Mono/data-label register** — "Project Type / Industry / Deliverables" set in a clean grid sans, used consistently as case-study metadata. This is the site's natural UI-chrome typography.
7. **Architecture background is a genuine differentiator** — confident spatial composition, presentation-board literacy (Balikbuhay Women's Center, KalyeKultura), and a full 3D/archviz category most graphic designers don't have.
8. **Six self-authored categories = sitemap**: Branding & Identity / Digital & Social Media / Editorial & Print / Information & Presentation Design / Creative & Visual Direction / 3D & Architectural Visualization.
9. **Illustrated self-portrait** (page 2) — a substantial, expressive ink illustration with red spiral/star doodle accents on a red-to-paper gradient. A real personal asset, not a minor mascot — deserves real presence on the About page, used once, signature-like.
10. **Halftone dot texture** used as recurring corner ornament on paper-register divider pages (small cracked-branch-like halftone clusters, top corners).

## 6. Color System

**⚠️ Superseded 2026-10-02 — direct owner decision.** The site originally used an alternating paper/ink "register" system (every section tagged light or dark, pacing the page like the PDF's own divider spreads — see the archived reasoning kept below for history). The owner asked for that to be removed site-wide in favor of one flat background, after reviewing the live site. Current system:

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#F0F0F0` | the site's one background color, used everywhere except the footer |
| `--bg-alt` | `#E6E6E6` | very subtle alternate, used sparingly between adjacent sections for the faintest separation — not a "register," just a whisper of contrast |
| `--ink` | `#181614` | the footer's background (the one deliberate dark exception, see below) |
| `--red` | `#B32E22` | the site's accent — links, active states, hover color, small highlights |
| `--pink` | `#EFC2CB` | mostly retired from general use (its low contrast against `--bg` was part of why `--red` replaced it in most spots during this redesign) — still used as-is inside the footer, which has its own locally-scoped dark-text tokens |
| `--text` | `#211F1C` | body text everywhere on `--bg` |
| `--text-dim` | `#5A564F` | secondary/caption text on `--bg` |

**The footer is the one remaining dark-background exception**, by direct owner decision (asked specifically: should the footer also go flat, or stay as a deliberate closing accent — chose to keep it dark). It and the lightbox overlay (always dark, since it's a fullscreen takeover regardless of page) each define their own locally-scoped `--footer-*` / `--lb-*` tokens in their own component files rather than reusing global register tokens — there is no longer a general-purpose "dark text on dark background" token set, since nothing else on the site needs one.

**Rule:** each project's own accent palette (Myst's jewel tones, etc.) is still scoped strictly to that project's detail page — never bleeds into site chrome. This part is unchanged.

Dark mode: the earlier "no manual dark-mode toggle, let `prefers-color-scheme` shift register emphasis" plan is now moot — there's no register to shift. Not revisited as part of this redesign; if a real dark mode is wanted later, it would need to be designed as a new decision, not inferred from what's left of the old system.

<details>
<summary>Archived: the original paper/ink register reasoning (superseded, kept for history)</summary>

Previously: `--paper` (`#EDE8E0`), `--paper-2` (`#E3DDD3`), `--ink` (`#181614`) as alternating section backgrounds, with `--text-onpaper`/`--text-onink` pairs. The rule was that every section was tagged light or dark via a `data-register` attribute, alternating down the page to echo the source PDF's own light/dark divider-spread pacing. Dark mode was meant to shift which register dominated by default, via `prefers-color-scheme`, rather than being a manual toggle. All of this is gone from the live site as of 2026-10-02 — the tokens were removed from `tokens.css`, every `data-register` attribute was stripped from every `.astro` file, and `[data-register]` CSS rules were deleted from `global.css`.

</details>

## 7. Typography

Three roles, translating what the PDF already does implicitly:

1. **Stamp/Display** — bold, distressed serif for section titles/category dividers, mimicking the letterpress/rubber-stamp cover treatment. Needs a genuinely textured display serif, not a smooth stand-in.
2. **Script/Signature** — refined, hand-drawn-feeling italic for personal/intimate copy (bio intro, pull-quotes). Used sparingly.
3. **Grid/Body** — clean humanist sans for reading copy; quiet, legible at length.
4. **Mono/Caption** — monospace for metadata labels (Project Type / Industry / Deliverables), nav labels, filter tags, page numbers — the site's "gallery wall text."

**Decision needed / in progress:** final typeface selection. Proposal artifact used Playfair Display (stamp/display substitute), Jost (body), IBM Plex Mono (caption) as placeholders — these are Google Fonts stand-ins chosen for the pitch deck, not necessarily final. Production typefaces should be chosen to more closely match the actual hand-lettered quality seen in the PDF (particularly the distressed "PORTFOLIO" wordmark and the "about [me]" script) — see Pending Decisions.

## 8. Website Architecture

**Structure (per owner's explicit direction):** Hybrid — scrolling homepage index + full standalone project detail pages.

- **Homepage** (`/`) — cover → about/intro → six category dividers, each revealing project teaser cards → resume snapshot → contact. Mirrors flipping through the physical portfolio.
- **Project detail pages** (`/work/<slug>/`) — one per case study, URL-addressable, full narrative + gallery + project accent palette.
- **About page** (`/about/`) — expanded bio, self-portrait illustration, software list, architecture→design narrative.
- **Resume page** (`/resume/`) — screen-native rebuild of the resume (not a PDF embed), with a PDF download available for recruiters.
- **Contact** — likely a section on homepage + footer everywhere, not a separate form page (no backend to maintain).

**Navigation:** persistent slim header, mono caption register, wordmark-as-stamp + text labels (work / about / resume / contact), lowercase, no hamburger icon, no mega-menus. Project pages get a prev/next filmstrip footer ("01/06 → 02/06").

## 9. Technical Stack

- **Framework:** Astro (static site generation, minimal JS by default)
- **Astro version:** 5.18.2, pinned — this machine runs **Node 20.20.0**, and Astro 6/create-astro 7 require Node ≥22. `npm audit` flags Astro <7.3.4 for several CVEs (XSS in specific edge cases, SSRF in prerendered error pages, AVIF RCE) — these are dev/build-time-surface issues for a static site with no server runtime and no user-generated content, so risk is low, but **flagging as a known issue**: revisit upgrading to Astro 7 + Node 22 once Node is upgraded on this machine or in CI.
- **Styling:** vanilla CSS (no framework/utility library) — design tokens as CSS custom properties, scoped Astro component styles.
- **Images:** Astro's built-in image optimization (`astro:assets`) for responsive/optimized delivery of curated PNG/JPG assets.
- **Hosting target:** static hosting (Netlify/Vercel/GitHub Pages-compatible) — no backend, no database, no forms-with-server-processing.
- **Package manager:** npm (matches environment defaults).
- **Testing/QA:** `playwright` added as a devDependency for one-off visual QA screenshots (browsers were already installed system-wide, so this was a small install). Not part of an automated test suite yet — used manually via ad hoc scripts during review passes, which are deleted after use, not committed.

## 10. Asset Pipeline

1. `assets/extract.py` — renders full PDF pages at 3x zoom (~300dpi) to `assets/raw-pdf-pages/`, and dumps embedded raster images to `assets/extracted-images/`.
2. `assets/dedupe.py` — collapses byte-identical duplicates (mostly repeated grain/texture tiles) → `assets/extracted-images-deduped/`. Superseded, not used in production.
3. **Curated extraction — complete.** A background agent reviewed all 25 portfolio pages + resume at full resolution, classified every visual element (HERO_DELIVERABLE / DELIVERABLE_DETAIL / MOOD_BOARD_REFERENCE / TEXTURE_BACKGROUND / TYPOGRAPHY_ASSET), and cropped 121 genuine-deliverable assets, documented in `assets/asset-manifest.md` (includes a "NEEDS HUMAN REVIEW" section — read it). Reproducible via `assets/crop_curated.py`. **Mood-board/reference imagery (vintage ads, other brands' product photography) was correctly excluded** — not extracted as individual images.
4. **Where the files physically live:** `E:\LeilaPortfolio-curated-assets` (NOT inside the git repo — see Known Issues §14 for why, and what needs to happen before deploy). Junctioned into `public/images/curated` so Astro's dev server can serve them. `src/data/project-assets.ts` maps each project slug to its cardImage/hero/gallery paths under `/images/curated/...`.

## 11a. First Real Browser QA Pass (with owner present)

Playwright was installed (browsers were already present on the system) and used to actually screenshot the site in Chromium for the first time — everything before this was verified via `curl`/HTML structure only. Found and fixed several real issues:

- **Cover stamp image seam**: the cropped "PORTFOLIO" wordmark asset's background tone didn't match the live CSS paper texture, creating a visible "pasted sticker" edge. Fixed by adding a thin border so the image reads as an intentionally framed plate (like a matted print) rather than a mismatched patch. `mix-blend-mode: multiply` was tried first but muddied the colors and was reverted.
- **Halftone corner motif**: was a hard-edged rectangular dot-grid that read as a floating placeholder box. Fixed with a radial mask so it fades from the corner instead of cutting off sharply.
- **Mobile header overflow**: at 390px and narrower, "contact" (last nav item) clipped off-screen because "leila karlene banta" as the wordmark took too much width. Fixed with a shorter "leila banta" wordmark variant under 560px, plus tighter gaps/font-size under 360px. Verified clean down to 320px (iPhone SE width).
- **Myst packaging crops included stray header text**: the six individual bottle/box crops (`packaging-love.png` etc.) had been cropped starting too high, catching part of the "PRODUCT & PACKAGING DESIGN CONCEPT" section header from the source page. Re-cropped all six by hand with corrected bounds.
- **Casa Colina wordmark lockup crop was broken**: cut off mid-way through a repeated wordmark, showing garbled overlapping text. Re-cropped with correct bounds showing all four intended type treatments.
- **Project hero images looked tiny/adrift for square or portrait-oriented assets** (e.g. Casa Colina's circular logomark): the hero image CSS forced `object-fit: contain` inside a wide fixed-aspect box, leaving huge empty side padding for anything not roughly 16:9. Fixed by letting hero images render at their natural size (capped by container width and a max-height), centered — confirmed this fix applies correctly across all 13 projects' hero aspect ratios, not just Casa Colina.
- **Removed a duplicated contact CTA** on the About page — it repeated the footer's "get in touch" section almost verbatim immediately above it.
- Ruled out as non-issues: flat-color "broken image" appearance in early screenshots was a `loading="lazy"` + full-page-screenshot timing artifact, not a real bug (confirmed zero failed network requests; images load correctly on scroll/normal viewing). A black pill UI element at the page bottom was Astro's own dev-mode toolbar, not a site bug (won't appear in production builds).

## 11b. Copy Pass (own writing vs. PDF-sourced)

At the owner's request, all site copy that was written by Claude (not lifted verbatim from the source PDF/resume) was reviewed for AI-generic phrasing and em dashes, and rewritten:
- Meta descriptions, image alt text, and title-tag separators across all pages (em dash → comma or pipe as appropriate).
- About page narrative paragraphs rewritten for plainer, more specific phrasing (removed constructions like "a background that shows up directly in," "these are architecture-studio instincts, applied to," "a category most graphic designers simply don't have in their toolkit").
- Verbatim PDF quotes (Leila's own bio text, project descriptions) were deliberately left untouched, including their own em dashes, since that's her writing, not ours, to edit.
- Code comments and internal `curationNotes` metadata (never rendered on the site) were left as-is — out of scope, not user-facing.

## 11. Completed Work

- Full read-through and analysis of both source PDFs (all 25 portfolio pages + resume).
- Design/UX proposal written and approved by owner: **https://claude.ai/artifact/QdzHAqdBwQVJNZATjdTxCh**
- Site structure decision made (hybrid scroll + detail pages) via direct question to owner.
- Tech stack decision made (Astro + vanilla CSS) via direct question to owner.
- PDF page renders extracted (25 portfolio + 1 resume, full res) and curated into 121 production-ready assets (see Asset Pipeline above).
- Astro project scaffolded manually (package.json, astro.config.mjs, tsconfig.json, .gitignore, folder structure) — `create-astro` CLI itself required Node 22 so scaffolding was done by hand; `npm install` succeeded (5 Astro peer-dep security advisories noted, see Known Issues).
- Design token system (`src/styles/tokens.css`, `global.css`) — paper/ink registers, accent chord, type roles, spacing scale, motion tokens with `prefers-reduced-motion` handling.
- Site data layer: `src/data/site.ts` (nav, categories, contact — verified verbatim against PDF page 3 table of contents), `src/data/projects.ts` (all 13 case studies with copy sourced from the PDF), `src/data/project-assets.ts` (image mapping).
- Components: `SiteHeader`, `SiteFooter`, `CategoryDivider` (red/black split title treatment matching the actual PDF divider pages), `ProjectCard` (hover/focus metadata reveal, real thumbnail images).
- Pages built and verified rendering via dev server: homepage (`/`), About (`/about/`), Resume (`/resume/`, with real PDF download link), and 13 dynamic project detail pages (`/work/<slug>/`) with hero image, description, palette swatches, gallery grid, and prev/next filmstrip nav.
- Homepage cover now uses the real cropped "PORTFOLIO" stamp wordmark image (re-cropped by hand for a cleaner bound than the first automated pass) with a one-time, reduced-motion-aware "stamp print" entrance animation — the one approved load-in flourish from the design proposal.
- About page uses the real illustrated self-portrait asset.
- All 123 image references in `project-assets.ts` verified to resolve to real files on disk.

## 11c. Gallery Lightbox

Built `src/components/Lightbox.astro`, a self-contained gallery + overlay component (vanilla JS, no library, consistent with the stack decision) used on every project detail page. Click any gallery image to view it full-size in a dark overlay with prev/next navigation. Supports: click-to-open, Escape to close, ArrowLeft/ArrowRight to navigate, click-outside-image to close, and a proper focus trap (Tab/Shift+Tab cycle only within the overlay's controls while open — verified via automated test that focus does not leak to the header or footer after 60 tab presses). Returns focus to the trigger that opened it on close. Tested across galleries ranging from 2 to 15 images. This closes the "becomes interactive" gallery item from the original approved design proposal.

## 11d. Paper/Ink Section Reveal

Implemented the "page-turn" pacing effect from the approved animation philosophy: each `.section` fades and rises in (14px, ~560ms) the first time it enters the viewport, via `IntersectionObserver`, marking the paper/ink register change as you scroll — never repeats, never triggers on hover. Cover/hero sections on every page are marked `.no-reveal` so no page ever opens on an empty frame. Three states verified with Playwright: normal motion (reveals on scroll), `prefers-reduced-motion: reduce` (everything visible immediately, no animation), and JavaScript disabled (CSS fallback via `html:not(.js-reveal-ready)` keeps content visible — never depends on JS to be readable).

## 11e. Accessibility Pass

Audited contrast, focus states, heading order, landmarks, and keyboard navigation across all page types using Playwright + a WCAG contrast calculator script (not a browser extension — this environment has no GUI browser, just headless automation). Found and fixed two real issues:
- **Contrast failure**: category divider numbers ("01", "02"...) and title text used `--red` (#B32E22) on the ink register, which is 2.86:1 — fails WCAG AA even for large text (needs 3:1). Added a new token `--red-on-ink` (#C6645B, same hue, 4.62:1) and applied it specifically on `[data-register="ink"]` — paper-register red usage is untouched since it already passes (5.17:1). Verified every other red/pink text usage in the codebase is already correctly confined to a background it passes contrast on (checked each call site's actual register, not just the token in isolation).
- **Skip link was invisible even on focus**: `.visually-hidden` (correctly used for pure screen-reader-only text elsewhere) was also applied to the "Skip to content" link, with no focus exception — defeating its purpose, since a skip link only works if a sighted keyboard user can see it appear when tabbed to. Split into a proper `.skip-link` class that's off-screen at rest and slides into view on `:focus`.

Verified as already correct (no changes needed): all images have `alt` attributes (empty `alt=""` used correctly for decorative gallery/card thumbnails, descriptive alt text on meaningful images), no links with empty accessible names, heading order is logical on every page (including the homepage's image-only `<h1>`, which resolves its accessible name correctly from the image's `alt` text per browser ARIA computation — confirmed via `ariaSnapshot()`, not just raw `textContent`), and semantic landmarks (`header`/`nav`/`main`/`footer`) are present on every page.

## 11f. Hero/Gallery Image Spot-Check

Reviewed every project's hero image and gallery ordering against the full set of available assets (not just what the first curation pass happened to pick), and made several real changes:
- **Myst Fragrance**: added `typography-wear-your-intention.png` (a type-scale study) to the gallery — it was extracted but never wired in, despite typography being an explicit listed deliverable for this project.
- **Balikbuhay Women's Center** and **KalyeKultura**: both originally used a title-card presentation slide (with "BALIK-BUHAY WOMEN'S CENTER:", author/course credits, etc. baked into the image) as the hero — redundant with the page's own `<h1>`, and not the strongest visual. Swapped to a clean architectural/atmospheric render for each (`render-exterior-night-wide.png` and `render-mural-viewing-deck.png` respectively); the original title slides moved into the gallery instead, where they still belong.
- **3D & Architectural Visualization**: the hero was a crop containing two stacked, unrelated renders (a pathway shot and a pergola detail) — visually busy, reads like a gallery pairing rather than one confident hero. Re-cropped from the source page to isolate just the pergola-with-sunburst render alone; it's the strongest single image available in this small (4-asset) set.
- **⚠️ Privacy catch, UP Arki 2026**: while reviewing the yearbook cover mockup more closely, found the crop still showed a sliver of the *open* spread in the background of the 3D book-mockup render — first pass showed a partially-legible bio card, and the mockup image itself has an individual student's full name/photo/personal facts baked into its open-page rendering. Re-cropped three times from the original source page to isolate only the closed book cover with zero part of any open spread visible. This is a reminder that "judge by the intended subject" isn't enough for privacy-sensitive source material — the full crop bounds need checking, including background/incidental content. See `docs/DECISIONS_NEEDED.md` #1 for the updated note.
- Everything else reviewed (Myst hero, Casa Colina hero, Alterkitektura hero, Gabriela Youth hero, Strawberry Season hero, Exploration with Portraiture hero, Ruin and Reverie hero) was confirmed as already the strongest available choice — no change made where the original pick held up under scrutiny.

## 11g. Contact Form

Built a real contact form at `src/components/ContactForm.astro` (name/email/message, client-side validation with accessible error messaging, honeypot spam field, success confirmation state), added as its own homepage section (`/#contact`) right before the footer — the footer's direct email/phone/LinkedIn links stay as-is for anyone who'd rather not use a form. Submits via Formspree, a third-party form-delivery service — the right fit for a static site with no backend of its own, per direct decision with the owner (options discussed: Formspree/Netlify-Forms-style service, mailto-only, or build-now-wire-later; owner chose the service route).

**Not yet functional**: the form points at a placeholder Formspree ID and will not actually deliver submissions until that's replaced with a real one from a Formspree account — see `docs/DECISIONS_NEEDED.md` #5. Everything else (rendering, validation, keyboard navigation/tab order, honeypot placement) verified working via Playwright.

## 11h. Three New Features (owner-requested, for personality/distinctiveness)

Asked directly what could make the site more distinctive without becoming gimmicky. Proposed and built three, all deliberately declined the more generic/risky options first (cursor effects, page-transition wipes, a "download the whole portfolio again" button, dark/light toggle — all already rejected earlier for good reasons, see §15):

1. **Process & references reveal** — a collapsed-by-default `<details>`/`<summary>` note under a project's description ("process & references"), added only where the source PDF documents real concept-boarding work: Myst, Balikbuhay, Exploration with Portraiture, Ruin and Reverie. Deliberately **not** written for every project — padding it in everywhere would be filler, not genuine process documentation.
   - **Important scope-narrowing during build**: the original idea was to show one cropped mood-board image per project. Before extracting anything, actually looked at the two Myst mood-board panels and found them to be dense collages of real, named luxury-brand advertising (Prada, Chanel, Dior, YSL, John Galliano) — copyrighted commercial photography collected as research, not Leila's own work. Publishing that at visible size on a public, indexable site is real trademark/copyright exposure, not a style choice. Flagged this to the owner before proceeding; agreed to describe the research in text instead of republishing the source images. No mood-board images were extracted or committed anywhere.

2. **Copy-to-clipboard color swatches** — every project's palette swatches are now real `<button>` elements; click one to copy its hex code, with a "copied!" confirmation that reverts after ~1.4s. Fully keyboard-operable (native button semantics, no custom tab handling needed), with a `navigator.clipboard` failure fallback (text selection) for older/restricted browser contexts. Verified via Playwright: correct clipboard content, confirmation text, and keyboard (Enter-key) activation.

3. **Per-project PDF "project sheet" download** — a clean, single-page PDF per case study (title, hero image, metadata, description, palette with hex codes, contact footer), distinct from the full resume PDF. Generated via `assets/generate_project_pdfs.mjs` (Playwright's `page.pdf()`, reading each project's already-rendered data off the live dev server rather than re-importing the TypeScript data files from plain Node, which would've needed an extra TS-loader dependency for no real benefit). Output written to `E:\LeilaPortfolio-curated-assets\project-sheets\` and junctioned into `public/project-sheets/`, same pattern as the curated images, for the same disk-space reason (see Known Issues).
   - **Maintenance note**: these are generated, static files — if project copy, images, or palettes change later, the PDFs need regenerating by re-running the script (with the dev server running). They will silently go stale otherwise. Worth automating as a build step eventually rather than a manual one-off script.

## 11i. Owner-Reported Fixes (visual QA round 2)

The owner reviewed the live site directly and reported four issues, all fixed:

1. **Lightbox rebuild.** The image counter ("2/20") visibly jumped position between images because the caption sat directly under a variable-height image inside a plain flex column — every image's different aspect ratio shifted the whole layout. Rebuilt the component: the index counter and close button now live in a fixed top chrome bar that never moves, the image stage is a fixed-height flex region, and switching images crossfades/slides (180ms) instead of swapping instantly. Added a thin progress rule at the bottom (echoing the site's own hairline-rule motif) showing position in the set. Also restyled the close/prev/next controls from bare Unicode characters into proper bordered buttons with a mono "close ✕" label, matching the site's chrome elsewhere instead of looking like browser defaults. Verified via Playwright: caption Y-position is pixel-identical (to sub-pixel precision) across 5 images of very different aspect ratios — confirms the jump is actually gone, not just less noticeable. Focus trap, keyboard nav, and Escape-to-close all re-verified working after the rebuild.

2. **Software proficiency icons.** Replaced plain text lists (About page, homepage "about [me]" section) with actual tool icons. Sourced 8 of the 10 tools from Simple Icons (a library of single-color, recolorable brand-mark SVGs — chosen over pasting in official multicolor brand logos, which would have clashed with the site's restrained palette) via jsdelivr, stored locally in `src/icons/software/` and inlined at build time through a new `SoftwareIcon.astro` component (reads the raw SVG file server-side, injects it so `currentColor` styling works, rather than `<img src>` which can't be recolored via CSS). Simple Icons has no entry for Enscape or Autodesk Sketchbook (both niche, architecture-adjacent tools) — hand-drew two simple monogram-style fallback marks ("Ei", stylized "Y") in the same visual weight so all 10 tools stay uniform; confirmed with the owner this was the right call before building rather than guessing. About page shows icon + tier grouping + full name always visible. Homepage shows icon-only tiles that expand on hover *or keyboard focus* to reveal the name (a `max-width` transition, `aria-label` carries the accessible name at all times so screen readers aren't hover-dependent). New shared data file `src/data/software.ts` is now the single source of truth for the tool list — this also fixed a pre-existing bug where the homepage's software list was silently missing "Premiere."

3. **Resume page footer boundary.** The resume's last content section (education/skills) and the site footer were both the `ink` register with no border between them, so they visually fused into one long dark block with no clear section break (owner sent a screenshot showing this). Fixed at the footer level, not the page level: `SiteFooter.astro` now always gets a `border-top` hairline and a slightly different background tone (`--ink-2` vs `--ink`) — so the footer is visually distinct from whatever precedes it on *any* page, not just a one-off fix for the resume page. Confirmed this also improved the homepage, where the new contact-form section (also ink) had the same fusion problem against the footer.

4. **Standalone `/contact/` page.** The "contact" nav link previously just anchored to `/#contact` on the homepage — inconsistent with "about" and "resume," which are real pages. Built `src/pages/contact/index.astro` (reuses the existing `ContactForm` component) as a proper page, updated `nav` in `site.ts` to point at `/contact/`, added "contact" to the footer's own nav list (it was missing there too), and replaced the homepage's full contact form section with a lighter teaser (heading + email + "send a message →" link) matching the existing "resume snapshot" teaser pattern already used for the Resume page. Avoided a first-draft mistake: initially gave the new contact page its own "direct" section (email/phone/LinkedIn/location) directly above the footer, which duplicated the footer almost verbatim — removed it once noticed, same class of redundancy caught and fixed on the About page earlier in the project.

## 11j. Major Redesign — Flat Color System, Filterable Grid, Spacing (2026-10-02)

The owner reviewed the live site again and asked for four structural changes, delivered together as one coordinated redesign rather than four separate patches (they all touch the same underlying systems):

1. **Removed the homepage cover/stamp hero entirely.** The "PORTFOLIO" stamp-wordmark section that used to open the homepage is gone. The About intro ("about [me]") is now the first thing visitors see, directly under the header.

2. **Removed the paper/ink alternating-register color system, site-wide.** See §6 (Color System) for the full before/after — every page, every component, converted from the two-register token system to one flat `--bg` (`#F0F0F0`), with the footer kept as the one deliberate dark exception (owner's explicit call when asked). This was the largest mechanical change: every `.astro` file in the project had `data-register` attributes and old token references (`--paper`, `--text-onpaper`, `--text-onink`, `--line-onpaper`, `--line-onink`, `--red-on-ink`, etc.) removed or replaced. Verified with a full codebase grep at the end — zero remaining references anywhere.

3. **Category sections replaced with one filterable grid.** This is the biggest functional change. `CategoryDivider.astro` (the component that used to render six separate "Branding & Visual Identity," "Digital & Social Media," etc. sections down the homepage) is deleted — no longer referenced anywhere. In its place: `ProjectGrid.astro`, a single uniform-tile grid (all 13 projects, same size, 4 columns on desktop down to 1 on mobile) with a filter-pill bar above it. Every category pill starts active (all projects shown); clicking a pill toggles just that category, and toggling every pill off is treated as "show everything" rather than a blank grid (explicit design choice, not a bug — matches a pattern from a reference project the owner pointed to, see below). `ProjectCard.astro` was reshaped from a variable-width card into a uniform 1:1 tile to fit this grid.
   - **Reference project**: the owner pointed to `C:\Users\seanb\OneDrive\Documents\GitHub\CasaLuisa`'s gallery page (`wp-content/themes/casaluisa/assets/src/js/modules/gallery-filters.js` and its paired `_gallery-page.scss`) as the filter behavior to match. That reference uses a FLIP (First-Last-Invert-Play) animation technique so surviving visible tiles glide to their new grid position when others are filtered out, instead of instantly snapping — adapted (not copied verbatim) into `ProjectGrid.astro`'s own filter script. Simplified relative to the reference because this grid's tiles are all the same size (the reference's masonry-style variable tile sizes needed extra z-index/shadow handling for tiles visually crossing paths mid-animation; a uniform grid never has that problem).
   - **Real bug found and fixed during build, before the owner ever saw it**: rapid-fire toggling multiple filter pills in quick succession could leave the grid in a wrong state — a `setTimeout`-scheduled "finish hiding this tile" callback from an earlier click could fire *after* a later click had already decided that same tile should be visible again, incorrectly hiding it anyway (a stale-closure race condition). Fixed by having each pending-hide callback re-check the *current* filter state when it actually fires, not just trust the state it was scheduled with. Caught via automated testing (rapid-click all 6 pills off, verify all 13 tiles are visible after everything settles) before this ever reached a real user.

4. **Reduced spacing site-wide.** `--gutter` (side padding) and `--content-max` (the width content caps out at) were the two levers: gutter's max dropped from 64px to 40px, and content-max widened from 1240px to 1520px, so wide viewports use more of the available width instead of leaving large empty margins on both sides. `--space-section` and `--space-block` (vertical rhythm between/within sections) were also tightened, since the old values were tuned for a slower, more ceremonial pace that doesn't fit a flat, denser, grid-driven layout as well.

**A tooling lesson from this session, worth remembering**: mid-session, discovered two `astro dev` server processes were running simultaneously on overlapping ports (one from an earlier session that a "killed" notification suggested had stopped, but hadn't actually released the port) — this caused several minutes of genuinely confusing debugging where a CSS color fix appeared not to be taking effect (`curl` hit the freshly-recompiled server, but Playwright screenshots were hitting the stale one). Fixed by killing all `node` processes and starting one clean server. If a background-process "stopped/killed" notification arrives but verification shows the thing still responding, don't assume it's fine — check for a duplicate process before trusting either data source. Separately (not related to this bug): Playwright's `fullPage: true` full-page screenshots repeatedly produced false "empty gap" alarms this session, on both desktop and mobile, for content that rendered correctly when actually scrolled into view normally — this has now happened three times across sessions, so it's a known limitation of that verification method, not a real site bug, unless corroborated by `getBoundingClientRect()` measurements or a fresh scroll-and-screenshot.

## 11k. Grid Filter Refinements & Homepage Cleanup (2026-10-02, same day follow-up)

Four more owner-reported changes, same session as §11j:

1. **Right-click to solo a category.** Right-clicking any filter pill now deselects every other category and activates only that one — a fast path to "show me just this category" without clicking five other pills off by hand. A small hint line ("right-click a category to view it alone") sits next to "show all," hidden under a 760px breakpoint since right-click has no real equivalent on touch devices and the hint would be misleading there. Implemented as a `contextmenu` listener with `preventDefault()` (so the browser's native right-click menu doesn't appear) reusing the exact same `applyFilter()`/FLIP logic as regular pill clicks — no separate code path to keep in sync.

2. **"about [me]" / "software" / "information" are now placeholders.** Leila is producing two real assets to replace this hand-script text: a logo (replaces "about [me]") and a typescript/wordmark treatment of her name (replaces "software" / "information"). Swapped the live text for two dashed-border placeholder boxes with bracketed labels, sized roughly to where the final images will sit. See `docs/DECISIONS_NEEDED.md` #6 — swap in real `<img>` tags once those files exist.

3. **Resume teaser removed from the homepage.** The "BS Architecture, UP Diliman" section between the project grid and the contact teaser is gone — direct owner instruction, no replacement content. The `/resume/` page itself and the "resume" nav link are both untouched; only the homepage preview of it was removed.

4. **Homepage contact teaser's subtitle changed from "get in touch" to "let's work together."** The footer (which appears on every page) and the homepage's contact-teaser section were both labeled "get in touch," which read as repetitive stacked on top of each other. Only the homepage teaser was changed — the footer and the standalone `/contact/` page both still say "get in touch," since neither of those two is adjacent to the other.

## 12. Current Work (as of last update)

Site is in a working, reviewable state end-to-end (structure, copy, real images, base interactions all in place). Remaining work is refinement, not scaffolding — see Pending Work.

## 13. Pending Work

- **Resolve the disk-space / asset-portability issue before any real deploy** — see Known Issues §14. This is the top blocker for shipping, not a design task.
- Decide and act on the two privacy/consent flags (yearbook classmates, portraiture models) — see `docs/DECISIONS_NEEDED.md` #1 and #2.
- Activate the contact form with a real Formspree ID — see `docs/DECISIONS_NEEDED.md` #5.
- The 13 per-project PDF sheets are generated, static files (see §11h item 3) — regenerate via `node assets/generate_project_pdfs.mjs` (dev server must be running) any time project copy, images, or palettes change, or they'll silently go stale. Worth wiring into an actual build step eventually rather than staying a manual script.
- ~~Spot-check hero/gallery image choices against the full asset manifest~~ — done, see §11f.
- The "3D & Architectural Visualization" project only has 4 of the ~16 render tiles extracted — manifest flags that several are unlabeled/unattributed; needs Leila's input on project names before extracting/captioning the rest (manifest item 2 and 5).
- Typography: currently using Fraunces (stamp/display stand-in), Petit Formal Script (script stand-in), Jost (body), IBM Plex Mono (caption) — Google Fonts. The real "PORTFOLIO" wordmark and category divider titles are now real cropped/live-styled assets matching the source closely; the "about [me]" script and body copy are still using Google Fonts approximations of Leila's actual hand-lettering. Acceptable for now, flagged as a possible future refinement (see `docs/DECISIONS_NEEDED.md` #3).
- Real-device responsive QA — verified extensively at 1440px, 390px, and 320px widths via Playwright, but never checked on an actual phone/tablet.
- ~~Paper/ink section-transition animation~~ — done, see §11d.
- ~~Accessibility pass~~ — done, see §11e. A full automated audit (axe-core or similar) would still catch more than the manual/scripted checks done here; worth running if the project ever adds that tooling.
- ~~Lightbox/zoom for gallery images~~ — done, see §11c.

## 14. Known Issues

- **⚠️ C: drive on this machine is critically full (hit 0 bytes free at one point; ~80-90MB typical margin as of this writing).** Pre-existing, machine-wide condition, not caused by this project. See `docs/DECISIONS_NEEDED.md` item 0 for full incident notes. **Consequences for how this project must be worked on until resolved:**
  - **Do not run `astro build` on this machine right now.** Astro's static build copies everything from `public/` into `dist/`, which physically duplicates all curated images (currently ~97MB, junctioned from E:) onto C: — this already drove free space to 0 bytes once and was fixed by deleting `dist/` (safe: fully regenerable build output). Use `astro dev` for verification instead — the dev server serves files in place without copying. Only run a full build once C: has real headroom again, or build on a CI/deploy host instead of this machine.
  - Curated image assets physically live at `E:\LeilaPortfolio-curated-assets` (E: has 115GB free) and are junctioned into `public/images/curated` via an NTFS junction (`New-Item -ItemType Junction`), NOT copied into the repo. This means **the images are not actually part of the git-tracked project** and won't travel with `git clone` or a deploy as-is. Needs resolving before real deployment: copy the curated assets into the repo proper once disk space allows.
  - Avoid further large npm installs (a Playwright install for screenshot testing was attempted and failed with ENOSPC) until space is freed.
- Node 20.20.0 on this machine blocks upgrading to Astro 7.x / latest `create-astro`; using Astro 5.18.2 (last line supporting Node 20). Revisit if Node is upgraded.
- `npm audit` reports 3 vulnerabilities (1 critical, 1 high, 1 low) tied to Astro <7.3.4, transitively via esbuild/sharp — build/dev-time surface, not applicable to the deployed static output, but unresolved pending the Node upgrade above.
- Embedded-image PDF extraction (`extracted-images/`) is unreliable (403 fragments, ~130 exact duplicates from repeated background textures) — do not use directly; rely on curated crops from full-page renders instead.
- **No browser screenshot/visual-testing tool was available in this environment** (no chromium-cli, no Playwright — install attempt failed due to the disk-full condition above). All verification during this session was done via: `astro dev` + `curl` (HTTP status, HTML structure checks), reading rendered HTML output, and careful manual CSS/layout reasoning — not actual visual screenshots. **The site has not been visually confirmed to render correctly in a real browser.** Strongly recommend opening `http://localhost:4321/` (run `npm run dev`) in an actual browser as the first thing when reviewing this session's work, and treat anything below "does it build/serve without errors" as unverified until then.

## 15. Decisions Intentionally Rejected (and why)

- **Single long scrolling page for everything** — rejected in favor of hybrid structure; flattens case-study storytelling depth and prevents direct linking to individual projects. (Owner decision.)
- **Next.js/React** — rejected in favor of Astro; this site doesn't need React's interactivity/state model, and Astro ships far less JS by default for a content-heavy, mostly-static site. (Owner decision.)
- **Real-time 3D/WebGL hero** for the 3D/archviz category — rejected; her existing renders are already high-quality static images, rebuilding as real-time 3D would be effort spent on a gimmick the source material doesn't ask for.
- **Dark-mode toggle framed as a "feature"** — rejected; manual theme toggles are a generic portfolio-template trope. (Originally reasoned against partly because of the paper/ink register's own structural duality — that duality no longer exists post-2026-10-02 redesign, see §6, but the core objection to a toggle-as-feature still stands on its own.)
- **Cursor-follow effects, animated grain/noise loops, scroll-triggered parallax on project imagery** — rejected outright as the class of effect most associated with generic/AI-feeling portfolio sites.
- **AI-generated filler graphics** anywhere on the site — rejected; every image must trace back to Leila's real work or documented personal assets.

## 16. Future Ideas (not yet committed)

- "Contact sheet" style project index — frame numbers, crop marks, registration dots (ties to the pink dot motif beside "PORTFOLIO" on the cover). Still potentially relevant to the new filterable grid's tile styling.
- ~~Reuse her six exact category divider spreads near-verbatim as homepage section breaks~~ — **moot as of 2026-10-02**: the homepage no longer has category-divider sections at all (replaced by the filterable grid, see §11j). The divider images themselves (`brandAssets.dividers`) are still available in `project-assets.ts` if a future use for them comes up.
- Self-portrait illustration as a small, singular signature mark near the footer/contact area sitewide (used once, not repeated decoratively).

## 17. Important Discoveries / Open Questions Requiring Owner Input

See the live running list maintained in `docs/DECISIONS_NEEDED.md` — checked and updated as work continues. Summary of what's flagged as of this writing:

1. **UP Arki 2026 yearbook spread (PDF page 16) contains real classmates' names, photos, and personal info** (e.g., birthdates, nicknames) — appropriate for a print yearbook, but these third parties haven't consented to appearing on Leila's public personal portfolio website. Recommend either (a) omitting individual student spreads and showing only the cover/system-level pages (the infographic "What is Class 2026 Made Of" spread has no identifiable individuals and is fine), or (b) blurring/obscuring names and faces, or (c) getting Leila to confirm she has consent to publish. Defaulting to **option (a)** for now (safest), pending owner confirmation.
2. **Portraiture project (pages 21–22) features identifiable real people** (models/friends) in personal settings. This is standard/expected for a photography portfolio (unlike the yearbook case), but flagging so the owner can confirm Leila is fine with these specific images going on a public website vs. the PDF being a more limited-distribution document.
3. **Final production typeface selection** — placeholder Google Fonts (Playfair Display / Jost / IBM Plex Mono) were used in the proposal pitch; worth deciding whether to invest in licensing/sourcing typefaces closer to the actual hand-lettered stamp and script seen in the PDF, or vectorizing the original wordmark directly from the PDF art as a locked asset (likely the higher-fidelity option for the "PORTFOLIO" stamp specifically, since it's clearly hand-worked, not a font).
