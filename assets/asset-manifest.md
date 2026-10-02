# Leila Banta Portfolio — Asset Manifest

Source: `assets/raw-pdf-pages/portfolio-page-01.png` through `portfolio-page-25.png`, all **3672 x 2376 px**.
Resume: `assets/raw-pdf-pages/resume-page-01.png`, **1788 x 2526 px** (text-only document; no visual assets to extract).

All bounding boxes below are given in **original pixel coordinates** (already converted from the downscaled
Read-tool display size using the multiplier reported for each image, ~1.84x for portfolio pages, ~1.26x for
the resume). Format: `[x0, y0, x1, y1]` = left, top, right, bottom.

---

## NEEDS HUMAN REVIEW

1. **"Exploration with Portraiture" (page 21) and "Ruin and Reverie" (page 22) — authorship of the photography.**
   These are conceptual portrait/fashion photo shoots. The credits list Leila's role as "Concept Boarding, Shoot
   Scheduling, Shot List & Shoot Direction, Set Design & Styling, Image Editing & Post-Processing" — i.e., she
   directed/styled/edited but a separate photographer likely operated the camera (the subject in "Ruin and
   Reverie" appears to be Leila herself, styled, in a graduation shoot with a partner "Sean"). I've classified
   the finished photo compositions as HERO_DELIVERABLE because they represent her creative/art direction work
   product (explicitly one of her stated deliverable categories: "creative & visual direction"), but a site
   should caption these as "creative direction, styling & editing" rather than "photography by Leila" to be
   accurate. Please confirm the correct credit line before publishing.

2. **3D & Architectural Visualization page (page 24) — grid of small renders, several belong to *named* academic
   studio projects (Balik-Buhay Women's Center, KalyeKultura) already featured on pages 18–19, and others appear
   to be different, unnamed academic/freelance projects (an amphitheater/pathway render, a "SOUVENIR" wall
   mural interior, an arch/pergola structure, a garden walkway, residential interiors for "Freelance Projects").**
   I extracted each tile as a discrete deliverable, but I could not identify project names/clients for the
   freelance interior renders (right column) or the unlabeled academic renders (left column, rows 2–4) beyond
   the visible in-image captions ("GENERAL VIEW ITERATION 1", "CONFERENCE ROOM", "WORK AREA ITERATION 1", etc.).
   Site copy will need Leila to supply project names/context for these if they're to appear as standalone case
   studies rather than a grid.

3. **Myst Fragrance mood boards (page 5, right two-thirds of the bottom row) are clearly Pinterest/vintage-ad
   reference collages (perfume ads, vintage bottles, fashion editorial stills) — classified MOOD_BOARD_REFERENCE
   and NOT extracted individually.** However, the two collage panels as a *whole* (the "inspiration board" grids)
   could be useful as a single "process/inspiration" screenshot per your instructions. I did NOT auto-extract
   these grouped screenshots since it's a judgment call whether the site wants to show process at all — flagging
   here rather than guessing. If wanted, they're at approximately `[1288,1272,1888,2124]` and `[2384,1272,3408,2124]`
   on page 5.

4. **Color swatch chips (hex codes) across multiple case-study pages** (Myst pg.5, Casa Colina pg.7, UAPSA pg.12,
   Gabriela pg.13, Balik-Buhay pg.18, KalyeKultura pg.19) are simple flat-color rectangles with hex text.
   I classified these DELIVERABLE_DETAIL and extracted the swatch groups as single combined crops per project
   (rather than one crop per individual chip) since they only carry meaning as a palette set. If the site wants
   these as live CSS swatches instead of images, the hex values are transcribed in each project's section below
   and extraction may be unnecessary.

5. **Page 24 top-right freelance interior renders**: two columns of small renders labeled only "GENERAL VIEW
   ITERATION 1", "GENERAL VIEW", "CONFERENCE ROOM", "WORK AREA ITERATION 1" plus four unlabeled residential
   interior shots. It's unclear if these are one project or multiple freelance clients. Extracted individually
   as DELIVERABLE_DETAIL pending clarification.

6. **"UP Arki 2026" yearbook spreads (page 16)** contain real students' names, photos, and personal details
   (e.g. "Pol", "Eri", "Kity", "Vince" — full yearbook bio spreads with faces). These are genuine deliverables
   (yearbook layout design) but involve identifiable third parties. Flagging for privacy/consent judgment before
   publishing full-resolution crops of these spreads publicly — the cover/mockup and the two divider/infographic
   spreads (no identifiable faces at meaningful size) are lower-risk than the individual student bio spreads.

7. **Gabriela Youth UP Diliman (page 13)** is explicit political/advocacy content (anti-Duterte messaging,
   protest material). This is legitimate design work (bold typographic campaign material) but is politically
   charged. Noting for the portfolio owner's awareness in case she wants to contextualize or omit it depending
   on the site's audience — not my call to make silently.

---

## Page-by-page inventory

### Page 01 — Cover
**Section:** Portfolio cover / brand-cover
- `[0,0,3672,2376]` full page — paper grain texture. **TEXTURE_BACKGROUND** (recurring; noted once, see below).
- `[810,400,2740,1660]` "PORTFOLIO" stamped red logotype + pink swash + underline + small pink dot. **TYPOGRAPHY_ASSET** — the single most reusable brand asset in the whole deck (site header/hero wordmark).
- `[2200,1660,2860,1780]` "graphic design." + "selected visual work 2026" subtitle lockup (black + red serif). **TYPOGRAPHY_ASSET** (secondary, pairs with the stamp).
- `[0,0,700,900]` and `[3300,300,3672,1500]` and `[0,1500,600,2376]` halftone starburst/scribble decorative marks (black dot-pattern graphic elements). **TYPOGRAPHY_ASSET**-adjacent decorative graphic; grouped as one reusable "halftone burst" element, left and right corner instances are near-duplicates — extracted one clean instance.
- Footer service-category text row — plain text, not extracted as image.

### Page 02 — About Me
**Section:** about / bio
- `[0,0,3672,2376]` red-to-cream gradient background with texture. **TEXTURE_BACKGROUND**.
- `[2320,340,3672,2376]` full-color illustrated self-portrait (digitally painted, marker-style, red/black/white palette, decorative sparkle/spiral doodles). **HERO_DELIVERABLE** — original illustration, strong standalone asset for an "about" page.
- `[140,460,880,2040]` hand-lettered "about [me] / software / information" vertical wordmark treatment (script, pink on red). **TYPOGRAPHY_ASSET**.
- Body text, software list, contact info — plain text, not extracted as image.

### Page 03 — Table of Contents
**Section:** table of contents
- `[0,0,3672,2376]` dark charcoal grain texture with faint halftone spiral. **TEXTURE_BACKGROUND**.
- `[180,150,1290,610]` "table of contents" hand-script logotype with red underline. **TYPOGRAPHY_ASSET**.
- `[2760,0,3672,1700]` decorative gray linework illustration (abstract organic/skeletal ink drawing) in corner. **DELIVERABLE_DETAIL** — decorative illustration asset, could work as a background accent element site-wide.
- Numbered list (01–06 categories) — plain text, not extracted.

### Page 04 — Section Divider: Branding & Identity
**Section:** section divider
- `[0,0,3672,2376]` cream paper texture w/ halftone corner bursts. **TEXTURE_BACKGROUND** (+ halftone bursts, same reusable element as page 1).
- `[900,400,2760,1780]` "BRANDING & IDENTITY" stamped red/black typographic lockup with pink blob accent. **TYPOGRAPHY_ASSET** — this divider-title treatment repeats (differently worded) on every section-divider page (04, 08, 14, 17, 20, 23); each is a distinct wordmark worth extracting individually since the site likely uses one per section-intro.

### Page 05 — Myst Fragrance (branding, sheet 1 of 2)
**Section:** Myst Fragrance (Branding & Identity)
- `[1400,300,1650,1050]` primary Myst star/eye logomark (purple, ornamental). **HERO_DELIVERABLE**.
- `[1400,1030,1660,1200]` "MYST FRAGRANCE" wordmark lockup under the logomark. **TYPOGRAPHY_ASSET**.
- `[1780,320,2360,600]` 6-chip color palette swatch (hex: #573B4E, #AB7F9C, #6D648C, #243245, #C5A56E, #262720). **DELIVERABLE_DETAIL**.
- `[1780,650,2360,1150]` logo lockup color-variant grid (8 rows, wordmark on 4 color backgrounds x2 styles). **DELIVERABLE_DETAIL**.
- `[2420,300,3672,850]` "Wear Your Intention" repeated typographic scale study + "MYST FRAGRANCE" headline type pairing. **TYPOGRAPHY_ASSET**.
- `[1288,1272,1888,2124]` mood board collage, LEFT (modern perfume product photography — Prada, Viktor & Rolf, editorial fashion/perfume imagery). **MOOD_BOARD_REFERENCE** — not her work, collected inspiration. Grouped screenshot may be worth keeping for "process" context per note in NEEDS HUMAN REVIEW.
- `[2384,1272,3408,2124]` mood board collage, RIGHT (vintage perfume ads, occult/tarot ephemera, antique bottle photography). **MOOD_BOARD_REFERENCE** — same as above.
- Body/description text — not extracted.

### Page 06 — Myst Fragrance (branding, sheet 2 of 2)
**Section:** Myst Fragrance (Branding & Identity)
- `[190,320,1970,900]` "Logomark Modular System" — 14 variant logomarks (7 outline + 7 filled color versions, one per intention: Original/Love/Luck/Abundance/Protection/Confidence/Intuition), laid out as a labeled grid. **HERO_DELIVERABLE** — this is the standout systemic-design piece of the whole book; extract as one grouped grid image (cropping the whole labeled system keeps its meaning intact).
- `[190,1000,650,1450]` single perfume bottle + box render, "LOVE" variant (pink). **HERO_DELIVERABLE**.
- `[750,1000,1220,1450]` bottle + box render, "LUCK" variant (gold/olive). **HERO_DELIVERABLE**.
- `[1300,1000,1770,1450]` bottle + box render, "ABUNDANCE" variant (lavender/plum). **HERO_DELIVERABLE**.
- `[190,1460,650,1900]` bottle + box render, "PROTECTION" variant (black/graphite). **HERO_DELIVERABLE**.
- `[750,1460,1220,1900]` bottle + box render, "CONFIDENCE" variant (navy). **HERO_DELIVERABLE**.
- `[1300,1460,1770,1900]` bottle + box render, "INTUITION" variant (dusty violet). **HERO_DELIVERABLE**.
- `[2060,320,2740,850]` business-card mockup on tray (marble tray, stone). **DELIVERABLE_DETAIL**.
- `[2760,320,3440,850]` storefront window signage mockup at night. **HERO_DELIVERABLE** — strong environmental brand mockup.
- `[2060,870,2740,1400]` t-shirt apparel mockup (charcoal tee w/ embroidered-look logomark). **DELIVERABLE_DETAIL**.
- `[2760,870,3440,1400]` subway/mall digital ad-panel mockup. **DELIVERABLE_DETAIL**.
- `[2060,1420,2740,1900]` fabric/scarf pattern + phone Instagram mockup. **DELIVERABLE_DETAIL**.
- `[2760,1420,3440,1900]` tote bag mockup pair (canvas bags w/ logomark). **DELIVERABLE_DETAIL**.
- `[2060,1930,3620,2170]` all-six-bottle lineup, clean product shot row. **HERO_DELIVERABLE** — best single "full product line" hero image for this project.

### Page 07 — Casa Colina
**Section:** Casa Colina (Branding & Identity)
- `[1290,320,1810,900]` primary Casa Colina logomark (tree/A-frame house/hill line-art circular badge, white on dark). **HERO_DELIVERABLE**.
- `[2020,300,3660,620]` "CASA COLINA" wordmark lockup, three type treatments stacked (large serif/blackletter variants + script). **TYPOGRAPHY_ASSET**.
- `[1290,1080,2020,1980]` apparel mockup — oversized tee with circular photo-illustration graphic + logo lockup, worn by model. **HERO_DELIVERABLE**.
- `[2060,1080,2720,1620]` tote bag mockup on chair with books/pitcher styling. **DELIVERABLE_DETAIL**.
- `[2760,1080,3660,1620]` two baseball caps w/ embroidered-look small logomark. **DELIVERABLE_DETAIL**.
- `[2060,1660,2720,2200]` logomark on cream background, alternate colorway (brown/green). **DELIVERABLE_DETAIL**.
- `[2760,1660,3120,2200]` 4-chip color palette swatch (hex: #63A577, #CDC96D, #99AFB1, #383121) paired with texture photo references. **DELIVERABLE_DETAIL**.
- Project description text — not extracted.

### Page 08 — Section Divider: Digital & Social Media
**Section:** section divider
- `[900,300,2900,1800]` "DIGITAL & SOCIAL MEDIA" stamped typographic lockup. **TYPOGRAPHY_ASSET**.
- Texture/halftone — **TEXTURE_BACKGROUND** (same recurring elements).

### Page 09 — Myst Fragrance Social Media Identity
**Section:** Myst Fragrance (Digital & Social Media)
- `[1060,190,1580,810]` Instagram post: "CHOOSE YOUR ENERGY." B&W portrait + product. **HERO_DELIVERABLE**.
- `[1600,190,2120,810]` Instagram post: "FIND YOUR MYST." tarot-card-style 6-panel grid. **HERO_DELIVERABLE**.
- `[2140,190,2660,810]` Instagram post: "ANY LUCK?" flatlay w/ crystals, tarot cards, product. **HERO_DELIVERABLE**.
- `[1060,830,1580,1450]` Instagram post: "WHAT ARE YOU MANIFESTING?" 3x2 icon grid. **HERO_DELIVERABLE**.
- `[1600,830,2120,1450]` Instagram post: "WEAR YOUR INTENTION." full product lineup glamour shot. **HERO_DELIVERABLE**.
- `[2140,830,2660,1450]` Instagram post: "YOUR MYST ACCORDING TO YOUR RED FLAGS" meme-style 6-panel grid. **HERO_DELIVERABLE**.
- `[1060,1470,1580,2090]` Instagram post: "LOVE. LET IT IN." hand holding bottle, soft pink. **HERO_DELIVERABLE**.
- `[1600,1470,2120,2090]` Instagram post: "CHOOSE YOUR INTENTION." 6-panel ingredient flatlay grid. **HERO_DELIVERABLE**.
- `[2140,1470,2660,2090]` Instagram post: "CHARGED WITH PURPOSE." moody portrait with veil + product. **HERO_DELIVERABLE**.
- `[2700,830,3660,2170]` phone mockup showing full Instagram grid/profile. **DELIVERABLE_DETAIL** — good "device mockup" hero showing the whole feed system at once; consider as an alternative single hero instead of all 9 tiles.
- Project description text — not extracted.

### Page 10 — Myst Fragrance Scent Launch Campaign
**Section:** Myst Fragrance (Digital & Social Media)
- `[1150,270,1830,890]` "LOVE" scent flatlay (rose petals, pink bottle). **HERO_DELIVERABLE**.
- `[1930,270,2610,890]` "LUCK" scent flatlay (citrus, yellow bottle). **HERO_DELIVERABLE**.
- `[2710,270,3390,890]` "ABUNDANCE" scent flatlay (stone fruit, lavender bottle). **HERO_DELIVERABLE**.
- `[1150,990,1830,1610]` "PROTECTION" scent flatlay (dried citrus, dark bottle). **HERO_DELIVERABLE**.
- `[1930,990,2610,1610]` "CONFIDENCE" scent flatlay (blueberries/pepper, blue bottle). **HERO_DELIVERABLE**.
- `[2710,990,3390,1610]` "INTUITION" scent flatlay (grapefruit/florals, violet bottle). **HERO_DELIVERABLE**.
- (Note: these 6 are painterly/illustrated composites, not photography — stylistically distinct from page 9/11's photo-real work; good variety piece.)

### Page 11 — Myst Fragrance Scent Launch (social mockup)
**Section:** Myst Fragrance (Digital & Social Media)
- `[60,240,1850,1050]` angled Instagram-carousel banner mockup showing all 6 scent-launch tiles seamlessly tiled + phone overlay with caption "Meet the Myst fragrance collection...". **HERO_DELIVERABLE** — excellent single hero shot for the campaign; strongest "device mockup in context" image in the deck.

### Page 12 — UAPSA-UPD Alterkitektura 2024
**Section:** Digital & Social Media (campaign design, non-Myst)
- `[3040,290,3300,420]` 4-chip color palette (hex: #285282, #7DB6E2, #F1F2F2, #7BC067). **DELIVERABLE_DETAIL**.
- `[200,590,970,1330]` IG post "ALTERCHITECTURE 2024 AGHIMUAN — Meet the Speakers". **HERO_DELIVERABLE**.
- `[1010,590,1720,1330]` IG post "CONGRATULATIONS WINNERS". **HERO_DELIVERABLE**.
- `[1810,590,2560,1330]` IG post "WHAT IS NET-ZERO ARCHITECTURE?" infographic. **HERO_DELIVERABLE**.
- `[200,1390,970,2130]` IG post "THANK YOU SO MU—" sponsor/partner appreciation. **HERO_DELIVERABLE**.
- `[1010,1390,1720,2130]` IG post "AWARDING CEREMONY" event announcement. **HERO_DELIVERABLE**.
- `[1810,1390,2560,2130]` IG post "REGISTRATION DEADLINE IS EXTENDED!". **HERO_DELIVERABLE**.
- `[2680,470,3672,2000]` phone mockup showing Facebook page feed. **DELIVERABLE_DETAIL**.

### Page 13 — Gabriela Youth UP Diliman
**Section:** Digital & Social Media (advocacy campaign design) — see NEEDS HUMAN REVIEW #7
- `[3170,290,3410,420]` 4-chip color palette (hex: #6A5272, #AC99A9, #B5000D, #E6DAE4). **DELIVERABLE_DETAIL**.
- `[215,610,970,1340]` IG post "VIOLENCE AGAINST WOMEN & CHILDREN" w/ line-art figures. **HERO_DELIVERABLE**.
- `[1030,610,1780,1340]` IG post "VAWC (noun)" definition/infographic w/ icon illustrations. **HERO_DELIVERABLE**.
- `[1840,610,2560,1340]` IG post "DUTERTE: PAHIRAP, PABAYA, PASISTA!" bold protest typography. **HERO_DELIVERABLE**.
- `[215,1390,970,2130]` IG post "OCTOBER IS PEASANT MONTH." photo + type. **HERO_DELIVERABLE**.
- `[1030,1390,1780,2130]` IG post "OUR PEASANT COMMUNITY IS STRUGGLING." bulleted infographic. **HERO_DELIVERABLE**.
- `[1840,1390,2560,2130]` IG post "NATIONAL WOMEN'S DAY OF PROTEST" newsprint-style collage w/ historic photo. **HERO_DELIVERABLE**.
- `[2680,470,3672,2000]` phone mockup showing Facebook feed. **DELIVERABLE_DETAIL**.

### Page 14 — Section Divider: Editorial & Print
**Section:** section divider
- `[1000,350,2500,1800]` "EDITORIAL & PRINT" stamped typographic lockup. **TYPOGRAPHY_ASSET**.

### Page 15 — Strawberry Season (zine)
**Section:** Strawberry Season (Editorial & Print) — personal/academic art zine, CalArts specialization project
- `[1190,340,2350,1150]` fanned 3-booklet mockup (cover + inner spreads visible in a stack). **HERO_DELIVERABLE**.
- `[2380,320,3610,1140]` closed zine cover, front+back ("STRAWBERRY SEASON" title, pencil strawberry illustration). **HERO_DELIVERABLE**.
- `[190,1240,1140,2170]` open spread: pencil strawberry illustration (left) + collaged "BERRY SWEET!" typographic page (right). **HERO_DELIVERABLE**.
- `[1240,1240,2190,2170]` open spread: nutrition-label parody (left) + charcoal strawberry sketch + neon "RED ALERT" (right). **HERO_DELIVERABLE**.
- `[2280,1240,3230,2170]` open spread: "WANTED: STRAWBERRY" mock poster (left) + sticker/ephemera collage page (right). **HERO_DELIVERABLE**.
- Project description text — not extracted.

### Page 16 — UP Arki 2026 (yearbook) — see NEEDS HUMAN REVIEW #6
**Section:** UP Arki 2026 Yearbook (Editorial & Print)
- `[1290,240,2380,900]` yearbook cover + open-spread 3D mockup (red cover, illustrated drafting-tools motif). **HERO_DELIVERABLE** — lowest privacy risk, no identifiable individuals at scale, strong standalone cover design asset.
- `[210,1030,1780,1560]` divider spread "Architecture Class BATCH 2026" (duotone pink/yellow photo treatment + script title). **HERO_DELIVERABLE**.
- `[1870,1030,3450,1560]` infographic spread "WHAT IS CLASS 2026 MADE OF..." (scrapbook data-viz spread, stats/icons). **HERO_DELIVERABLE**.
- Individual student bio spreads (4 shown, bottom row) — contain names/photos of real students. **NOT extracted** pending privacy review (see NEEDS HUMAN REVIEW #6). If cleared, these are strong scrapbook-layout deliverables demonstrating editorial/layout skill.

### Page 17 — Section Divider: Information & Presentation
**Section:** section divider
- `[520,350,2320,1750]` "INFORMATION & PRESENTATION" stamped typographic lockup (two-line). **TYPOGRAPHY_ASSET**.

### Page 18 — Balik-Buhay Women's Center
**Section:** Balik-Buhay Women's Center (Information & Presentation Design — architecture thesis boards)
- `[240,530,1120,2140]` full architecture board #1 — cover/design-problem/concept/site-analysis/site-dev-plan composite board. **HERO_DELIVERABLE**.
- `[1130,960,1990,2140]` full architecture board #2 — floor plans + elevations composite board. **HERO_DELIVERABLE**.
- `[2060,530,2730,900]` presentation slide: title/cover slide with night render. **DELIVERABLE_DETAIL**.
- `[2060,970,2730,1340]` presentation slide: "Site Analysis" (composite map + SWOT). **DELIVERABLE_DETAIL**.
- `[2060,1400,2730,1780]` presentation slide: "SDP & Massing Studies". **DELIVERABLE_DETAIL**.
- `[2060,1830,2730,2170]` exterior night render, wide (walkway/hardscape). **HERO_DELIVERABLE**.
- `[2760,530,3450,900]` presentation slide: "Site Selection" (3-site comparison). **DELIVERABLE_DETAIL**.
- `[2760,970,3450,1340]` presentation slide: "Potential Architectural Translations" (material moodboard — this sub-panel is itself reference photography, borderline MOOD_BOARD_REFERENCE, but embedded inside her own presentation-design deliverable, so kept as part of the DELIVERABLE_DETAIL crop).
- `[2760,1400,3450,1780]` presentation slide: "Site Features" (walkway render). **DELIVERABLE_DETAIL**.
- `[2760,1830,3450,2170]` exterior night render, garden path close-up. **HERO_DELIVERABLE**.
- `[630,2230,1150,2376]`(approx, partial) 3-chip color palette swatch at bottom-left. **DELIVERABLE_DETAIL**.

### Page 19 — KalyeKultura
**Section:** KalyeKultura (Information & Presentation Design — architecture studio boards)
- `[200,530,1100,2150]` full architecture board #1 — cover/concept/site/form-evolution/floor-plans composite. **HERO_DELIVERABLE**.
- `[1110,910,2000,2150]` full architecture board #2 — site development plan (aerial isometric) + interior isometrics/perspectives composite. **HERO_DELIVERABLE**.
- `[2060,530,2760,900]` presentation slide: title/cover w/ exterior render. **DELIVERABLE_DETAIL**.
- `[2790,530,3490,900]` presentation slide: "The Site" (location map). **DELIVERABLE_DETAIL**.
- `[2060,970,2760,1340]` presentation slide: "Site Dev. Plan". **DELIVERABLE_DETAIL**.
- `[2790,970,3490,1340]` presentation slide: "Elevations & Sections". **DELIVERABLE_DETAIL**.
- `[2060,1400,2760,1780]` exterior render (building street elevation) + material swatches. **HERO_DELIVERABLE**.
- `[2790,1400,3490,1780]` presentation slide: "Floor Plans". **DELIVERABLE_DETAIL**.
- `[2060,1830,2760,2170]` interior render: "JEEPNEY MEMORABILIA WALL". **HERO_DELIVERABLE**.
- `[2790,1830,3490,2170]` interior/exterior render: "MURAL VIEWING DECK". **HERO_DELIVERABLE**.
- `[220,2200,1090,2376]` (partial, 3-chip palette, teal/orange/yellow) at bottom. **DELIVERABLE_DETAIL**.

### Page 20 — Section Divider: Creative & Visual Direction
**Section:** section divider
- `[330,350,2020,1780]` "CREATIVE & VISUAL DIRECTION" stamped typographic lockup (two-line). **TYPOGRAPHY_ASSET**.

### Page 21 — Exploration with Portraiture — see NEEDS HUMAN REVIEW #1
**Section:** Exploration with Portraiture (Creative & Visual Direction)
- `[1210,150,2250,395]` concept-boarding mood/reference panel "PLACE & IDENTITY" (contains reference photography — mixed, some her own set-styling photos). **MOOD_BOARD_REFERENCE** for the pure reference-image portions; kept whole as process documentation, not split further.
- `[1630,150,2250,395]` "ALTER-EGO" concept panel, same treatment. **MOOD_BOARD_REFERENCE** / process doc.
- `[1210,780,2150,1440]` "Still Life of a Restless Mind" — main hero shot, model lying in chaotic styled dorm-room set. **HERO_DELIVERABLE**.
- `[1210,1450,2150,2140]` group portrait — 3 models styled in patchwork/eclectic fashion, standing, full-body. **HERO_DELIVERABLE**.
- `[2230,780,2760,1170]` supporting shot from the "restless mind" set (standing model, messy room). **DELIVERABLE_DETAIL**.
- `[2230,1180,2760,1570]` supporting shot, same set, model close-up. **DELIVERABLE_DETAIL**.
- `[2230,1590,2760,1980]` supporting shot, same set, seated model. **DELIVERABLE_DETAIL**.
- `[2790,780,3660,1230]` "Alter-Ego" set, 3 styled portraits in messy room (triptych). **DELIVERABLE_DETAIL**.
- `[2790,1250,3660,2160]` "Alter-Ego" contact-sheet-style grid, 9 fashion outfit portraits against plain wall. **HERO_DELIVERABLE** — strong standalone "lookbook grid" composition.

### Page 22 — Ruin and Reverie — see NEEDS HUMAN REVIEW #1
**Section:** Ruin and Reverie (Creative & Visual Direction) — graduation concept photoshoot
- `[1190,290,1610,800]` portrait: model against graffiti wall, white dress + sablay. **HERO_DELIVERABLE**.
- `[1660,290,2080,800]` diptych: mirror/urbex portrait pairing. **DELIVERABLE_DETAIL**.
- `[2130,290,2550,800]` portrait: model standing against graffiti wall, full body. **HERO_DELIVERABLE**.
- `[2600,290,3610,800]` wide shot: model at "ARKI" sign installation, park setting. **HERO_DELIVERABLE**.
- `[1190,900,1610,1420]` portrait: model in sunflower field. **HERO_DELIVERABLE**.
- `[1660,900,2080,1420]` filmstrip-style contact sheet, 4 frames. **DELIVERABLE_DETAIL**.
- `[2130,900,2550,1420]` portrait: model walking through arcade/colonnade. **HERO_DELIVERABLE**.
- `[2600,900,3610,1420]` environmental shot: "TESS' STORE" sari-sari store scene with couple. **HERO_DELIVERABLE**.
- `[1190,1500,1660,2170]` filmstrip contact sheet, couple on bench, 4 frames. **DELIVERABLE_DETAIL**.
- `[1690,1500,2130,2170]` couple portrait on bench with graffiti backdrop. **HERO_DELIVERABLE**.
- `[2160,1500,2590,2170]` couple walking shot, colonnade. **HERO_DELIVERABLE**.
- `[2620,1500,3070,2170]` filmstrip contact sheet, styling/candid, 4 frames. **DELIVERABLE_DETAIL**.
- `[3100,1500,3610,2170]` couple portrait in sunflower field, close crop. **HERO_DELIVERABLE**.
- `[150,1010,590,1220]` concept-board text panel "RUIN & REVERIE: GRADUATION CONCEPT SHOOT". Text only, not extracted.
- `[150,1240,790,2170]` small contact-sheet/concept collage panel (couple + individual references). **MOOD_BOARD_REFERENCE**/process doc — mixed final shots and reference thumbnails at small scale, not extracted individually.

### Page 23 — Section Divider: 3D & Architectural Visualization
**Section:** section divider
- `[400,350,2350,1750]` "3D & ARCHITECTURAL VISUALIZATION" stamped typographic lockup (two-line). **TYPOGRAPHY_ASSET**.

### Page 24 — 3D & Architectural Visualization grid — see NEEDS HUMAN REVIEW #2, #5
**Section:** 3D & Architectural Visualization (Academic + Freelance renders)
Academic Projects column (left):
- `[210,320,890,660]` exterior render, pink/white curved building, night (Balik-Buhay-style but different angle — possibly same project). **DELIVERABLE_DETAIL**.
- `[990,320,1670,660]` exterior render, KalyeKultura building daytime. **DELIVERABLE_DETAIL** (duplicate subject of page 19 hero — lower priority to re-extract).
- `[210,680,890,1020]` night render, landscaped walkway with string lights. **DELIVERABLE_DETAIL**.
- `[990,680,1670,1020]` interior render, "SOUVENIR" branded wall/mural gallery space with figures. **HERO_DELIVERABLE** — distinct unnamed project, visually strong.
- `[210,1040,890,1380]` exterior detail, organic perforated screen/pergola structure. **HERO_DELIVERABLE** — distinct unnamed project.
- `[990,1040,1670,1380]` interior render, colorful mural wall + jeepney-truck installation (KalyeKultura-related). **DELIVERABLE_DETAIL**.
- `[210,1400,890,1740]` exterior render, garden path with flowering shrubs at sunset. **DELIVERABLE_DETAIL**.
- `[990,1400,1670,1740]` interior render, curved gallery wall w/ mural + skylight. **DELIVERABLE_DETAIL**.

Freelance Projects column (right):
- `[2020,320,2700,660]` interior render, open-plan office/dining "GENERAL VIEW ITERATION 1". **HERO_DELIVERABLE**.
- `[2790,320,3470,660]` interior render, living room w/ stone accent wall. **HERO_DELIVERABLE**.
- `[2020,680,2700,1020]` interior render, office hallway "GENERAL VIEW". **DELIVERABLE_DETAIL**.
- `[2790,680,3470,1020]` interior render, living room w/ TV console (alt angle). **DELIVERABLE_DETAIL**.
- `[2020,1040,2700,1380]` interior render, "CONFERENCE ROOM" with people. **DELIVERABLE_DETAIL**.
- `[2790,1040,3470,1380]` interior render, living room w/ shelving/decor detail. **DELIVERABLE_DETAIL**.
- `[2020,1400,2700,1740]` interior render, "WORK AREA ITERATION 1" dining/work space. **DELIVERABLE_DETAIL**.
- `[2790,1400,3470,1740]` interior render, living/dining combo w/ wood ceiling. **DELIVERABLE_DETAIL**.

### Page 25 — Thank You / Closing
**Section:** closing
- `[880,150,2200,1500]` "PORTFOLIO" stamped wordmark (same design as cover) + "thank you!" script line. **TYPOGRAPHY_ASSET** — near-duplicate of page 1 stamp; extracting the "thank you!" variant separately since the added script text makes it a distinct usable asset for a closing/contact section.
- Texture/halftone bursts — **TEXTURE_BACKGROUND** (recurring).
- Contact info footer — plain text, not extracted.

### Resume page 01
Text-only professional resume document (1788x2526px). No visual/graphic assets present — no extraction performed. Relevant for site's "resume/CV" section as a linked PDF or transcribed text, not as an image crop.

---

## TEXTURE_BACKGROUND note

A recurring cream/beige paper-grain texture (with occasional black halftone "starburst" scribble accents in
the corners) appears on pages 1, 3, 4, 6 (partial), 8, 14, 17, 20, 23, 25 — essentially all section-divider and
cover pages. This is a single reusable background asset, but a full-page (3672x2376) crop of it is low
information density and was **not** extracted as a separate curated file (see build note in
`crop_curated.py`). If the site needs a standalone texture tile, crop one directly from any divider page's
raw source PNG (e.g. `raw-pdf-pages/portfolio-page-04.png`, avoiding the text/logo area) — not cataloged
per-instance elsewhere in this manifest.
