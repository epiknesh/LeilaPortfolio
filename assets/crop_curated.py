"""
crop_curated.py

Reproducible extraction script for Leila Banta's portfolio site assets.

Reads the bounding boxes documented (by hand, from full-resolution visual inspection)
in assets/asset-manifest.md and crops them out of the source 3672x2376px page renders
in assets/raw-pdf-pages/, writing clean PNGs into assets/curated/<project-slug>/.

Only HERO_DELIVERABLE, TYPOGRAPHY_ASSET, and DELIVERABLE_DETAIL items are extracted.
MOOD_BOARD_REFERENCE items are intentionally skipped (see manifest for rationale).
TEXTURE_BACKGROUND is extracted once as a reusable sample.

Crops are taken generously (a little padding beyond the tightest possible box) per
the task instructions, and are cropped directly from the full-resolution source pages
with no downscaling, using PyMuPDF (pymupdf) rather than PIL (PIL/Pillow was not
installable in this environment due to zero free disk space on C:; pymupdf was already
available and can load/crop raster PNGs via fitz.Pixmap just as well for this purpose).

Run with:  python crop_curated.py
"""

import os
import pymupdf  # aka fitz

SRC_DIR = os.path.join(os.path.dirname(__file__), "raw-pdf-pages")
OUT_DIR = os.path.join(os.path.dirname(__file__), "curated")

PAGE_W, PAGE_H = 3672, 2376  # all portfolio pages are this size


def page_path(n):
    return os.path.join(SRC_DIR, f"portfolio-page-{n:02d}.png")


def clamp_box(box, w=PAGE_W, h=PAGE_H):
    x0, y0, x1, y1 = box
    return (max(0, x0), max(0, y0), min(w, x1), min(h, y1))


def crop(page_num, box, out_path, pad=0):
    """Crop `box` (x0,y0,x1,y1) out of the given page PNG and save to out_path.

    `pad` adds extra pixels of padding on every side (clamped to page bounds),
    matching the task's instruction to crop generously rather than too tight.
    """
    x0, y0, x1, y1 = box
    x0, y0, x1, y1 = x0 - pad, y0 - pad, x1 + pad, y1 + pad
    x0, y0, x1, y1 = clamp_box((x0, y0, x1, y1))

    src = page_path(page_num)
    pix = pymupdf.Pixmap(src)  # full-resolution source page, no downscale
    clip = pymupdf.IRect(int(x0), int(y0), int(x1), int(y1))

    # Build a new Pixmap sized to the clip rect and copy the pixel data into it.
    out_pix = pymupdf.Pixmap(pix.colorspace, clip, pix.alpha)
    out_pix.copy(pix, clip)

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    out_pix.save(out_path)
    print(f"  wrote {out_path}  ({out_pix.width}x{out_pix.height})")


# ---------------------------------------------------------------------------
# Extraction list: (page_num, box, output_relative_path, pad)
# Boxes are [x0, y0, x1, y1] in original page pixel coordinates, transcribed
# from the visual inventory in assets/asset-manifest.md.
# ---------------------------------------------------------------------------

ITEMS = [
    # --- Page 01: Cover ---
    (1, (800, 390, 2750, 1670), "brand-cover/portfolio-wordmark-stamp.png", 20),
    (1, (2190, 1650, 2870, 1790), "brand-cover/tagline-graphic-design-2026.png", 15),
    # NOTE: a full-page texture-background sample was intentionally NOT extracted here.
    # It's a large (full 3672x2376) low-information crop of the recurring paper-grain
    # background; per the manifest's TEXTURE_BACKGROUND note, its existence is documented
    # rather than duplicated as its own curated file. Use any divider page's background
    # directly if a background texture sample is needed.

    # --- Page 02: About ---
    (2, (2300, 320, 3672, 2376), "brand-cover/about-me-illustrated-portrait.png", 10),
    (2, (120, 440, 900, 2060), "brand-cover/about-me-vertical-wordmark.png", 15),

    # --- Page 03: Table of Contents ---
    (3, (160, 130, 1310, 630), "brand-cover/table-of-contents-wordmark.png", 15),
    (3, (2740, 0, 3672, 1720), "brand-cover/toc-decorative-linework.png", 10),

    # --- Page 04: Section divider - Branding & Identity ---
    (4, (880, 380, 2780, 1800), "brand-cover/divider-branding-identity.png", 15),

    # --- Page 05: Myst Fragrance sheet 1 ---
    (5, (1390, 290, 1660, 1060), "myst-fragrance/logomark-primary.png", 15),
    (5, (1390, 1020, 1670, 1210), "myst-fragrance/wordmark-myst-fragrance.png", 12),
    (5, (1770, 310, 2370, 610), "myst-fragrance/color-palette-swatches.png", 12),
    (5, (1770, 640, 2370, 1160), "myst-fragrance/logo-lockup-colorway-grid.png", 12),
    (5, (2410, 290, 3672, 860), "myst-fragrance/typography-wear-your-intention.png", 15),

    # --- Page 06: Myst Fragrance sheet 2 ---
    (6, (180, 310, 1980, 910), "myst-fragrance/logomark-modular-system-grid.png", 15),
    (6, (180, 990, 660, 1460), "myst-fragrance/packaging-love.png", 12),
    (6, (740, 990, 1230, 1460), "myst-fragrance/packaging-luck.png", 12),
    (6, (1290, 990, 1780, 1460), "myst-fragrance/packaging-abundance.png", 12),
    (6, (180, 1450, 660, 1910), "myst-fragrance/packaging-protection.png", 12),
    (6, (740, 1450, 1230, 1910), "myst-fragrance/packaging-confidence.png", 12),
    (6, (1290, 1450, 1780, 1910), "myst-fragrance/packaging-intuition.png", 12),
    (6, (2050, 310, 2750, 860), "myst-fragrance/mockup-business-card.png", 12),
    (6, (2750, 310, 3450, 860), "myst-fragrance/mockup-storefront-signage.png", 12),
    (6, (2050, 860, 2750, 1410), "myst-fragrance/mockup-apparel-tshirt.png", 12),
    (6, (2750, 860, 3450, 1410), "myst-fragrance/mockup-digital-ad-panel.png", 12),
    (6, (2050, 1410, 2750, 1910), "myst-fragrance/mockup-fabric-pattern-phone.png", 12),
    (6, (2750, 1410, 3450, 1910), "myst-fragrance/mockup-tote-bags.png", 12),
    (6, (2050, 1920, 3630, 2180), "myst-fragrance/packaging-hero-full-lineup.png", 12),

    # --- Page 07: Casa Colina ---
    (7, (1280, 310, 1820, 910), "casa-colina/logomark-primary.png", 15),
    (7, (2010, 290, 3670, 630), "casa-colina/wordmark-lockup-variants.png", 15),
    (7, (1280, 1070, 2030, 1990), "casa-colina/mockup-apparel-tshirt-hero.png", 12),
    (7, (2050, 1070, 2730, 1630), "casa-colina/mockup-tote-bag.png", 12),
    (7, (2750, 1070, 3670, 1630), "casa-colina/mockup-caps.png", 12),
    (7, (2050, 1650, 2730, 2210), "casa-colina/logomark-alt-colorway.png", 12),
    (7, (2750, 1650, 3130, 2210), "casa-colina/color-palette-swatches.png", 12),

    # --- Page 08: Section divider - Digital & Social Media ---
    (8, (880, 290, 2910, 1810), "brand-cover/divider-digital-social-media.png", 15),

    # --- Page 09: Myst social media ---
    (9, (1050, 180, 1590, 820), "myst-fragrance/social-choose-your-energy.png", 12),
    (9, (1590, 180, 2130, 820), "myst-fragrance/social-find-your-myst.png", 12),
    (9, (2130, 180, 2670, 820), "myst-fragrance/social-any-luck.png", 12),
    (9, (1050, 820, 1590, 1460), "myst-fragrance/social-what-are-you-manifesting.png", 12),
    (9, (1590, 820, 2130, 1460), "myst-fragrance/social-wear-your-intention-lineup.png", 12),
    (9, (2130, 820, 2670, 1460), "myst-fragrance/social-red-flags-grid.png", 12),
    (9, (1050, 1460, 1590, 2100), "myst-fragrance/social-love-let-it-in.png", 12),
    (9, (1590, 1460, 2130, 2100), "myst-fragrance/social-choose-your-intention-grid.png", 12),
    (9, (2130, 1460, 2670, 2100), "myst-fragrance/social-charged-with-purpose.png", 12),
    (9, (2690, 820, 3670, 2180), "myst-fragrance/mockup-instagram-feed-phone.png", 12),

    # --- Page 10: Myst scent launch ---
    (10, (1140, 260, 1840, 900), "myst-fragrance/scent-launch-love.png", 12),
    (10, (1920, 260, 2620, 900), "myst-fragrance/scent-launch-luck.png", 12),
    (10, (2700, 260, 3400, 900), "myst-fragrance/scent-launch-abundance.png", 12),
    (10, (1140, 980, 1840, 1620), "myst-fragrance/scent-launch-protection.png", 12),
    (10, (1920, 980, 2620, 1620), "myst-fragrance/scent-launch-confidence.png", 12),
    (10, (2700, 980, 3400, 1620), "myst-fragrance/scent-launch-intuition.png", 12),

    # --- Page 11: Myst campaign banner mockup ---
    (11, (50, 230, 1860, 1060), "myst-fragrance/mockup-campaign-banner-phone.png", 15),

    # --- Page 12: UAPSA Alterkitektura ---
    (12, (3030, 280, 3310, 430), "alterkitektura/color-palette-swatches.png", 10),
    (12, (190, 580, 980, 1340), "alterkitektura/social-meet-the-speakers.png", 12),
    (12, (1000, 580, 1730, 1340), "alterkitektura/social-congratulations-winners.png", 12),
    (12, (1800, 580, 2570, 1340), "alterkitektura/social-net-zero-infographic.png", 12),
    (12, (190, 1380, 980, 2140), "alterkitektura/social-thank-you-sponsors.png", 12),
    (12, (1000, 1380, 1730, 2140), "alterkitektura/social-awarding-ceremony.png", 12),
    (12, (1800, 1380, 2570, 2140), "alterkitektura/social-registration-extended.png", 12),
    (12, (2670, 460, 3672, 2010), "alterkitektura/mockup-facebook-feed-phone.png", 12),

    # --- Page 13: Gabriela Youth ---
    (13, (3160, 280, 3420, 430), "gabriela-youth/color-palette-swatches.png", 10),
    (13, (205, 600, 980, 1350), "gabriela-youth/social-vawc-awareness.png", 12),
    (13, (1020, 600, 1790, 1350), "gabriela-youth/social-vawc-definition-infographic.png", 12),
    (13, (1830, 600, 2570, 1350), "gabriela-youth/social-duterte-statement.png", 12),
    (13, (205, 1380, 980, 2140), "gabriela-youth/social-peasant-month.png", 12),
    (13, (1020, 1380, 1790, 2140), "gabriela-youth/social-peasant-community-infographic.png", 12),
    (13, (1830, 1380, 2570, 2140), "gabriela-youth/social-national-womens-day-protest.png", 12),
    (13, (2670, 460, 3672, 2010), "gabriela-youth/mockup-facebook-feed-phone.png", 12),

    # --- Page 14: Section divider - Editorial & Print ---
    (14, (980, 340, 2510, 1810), "brand-cover/divider-editorial-print.png", 15),

    # --- Page 15: Strawberry Season zine ---
    (15, (1180, 330, 2360, 1160), "strawberry-season/mockup-booklets-fanned.png", 15),
    (15, (2370, 310, 3620, 1150), "strawberry-season/cover-front-back.png", 15),
    (15, (180, 1230, 1150, 2180), "strawberry-season/spread-strawberry-berry-sweet.png", 12),
    (15, (1230, 1230, 2200, 2180), "strawberry-season/spread-nutrition-red-alert.png", 12),
    (15, (2270, 1230, 3240, 2180), "strawberry-season/spread-wanted-ephemera.png", 12),

    # --- Page 16: UP Arki 2026 yearbook (privacy-safe items only, see manifest) ---
    (16, (1280, 230, 2390, 910), "up-arki-yearbook/cover-and-open-spread-mockup.png", 15),
    (16, (200, 1020, 1790, 1570), "up-arki-yearbook/divider-architecture-class-batch2026.png", 15),
    (16, (1860, 1020, 3460, 1570), "up-arki-yearbook/infographic-what-is-class-2026.png", 15),
    # NOTE: individual student bio spreads intentionally NOT extracted - see
    # NEEDS HUMAN REVIEW #6 in asset-manifest.md (identifiable third parties).

    # --- Page 17: Section divider - Information & Presentation ---
    (17, (500, 340, 2340, 1760), "brand-cover/divider-information-presentation.png", 15),

    # --- Page 18: Balik-Buhay Women's Center ---
    (18, (230, 520, 1130, 2150), "balik-buhay-womens-center/board-01-concept-site-analysis.png", 15),
    (18, (1120, 950, 2000, 2150), "balik-buhay-womens-center/board-02-floorplans-elevations.png", 15),
    (18, (2050, 520, 2740, 910), "balik-buhay-womens-center/slide-cover-night-render.png", 12),
    (18, (2050, 960, 2740, 1350), "balik-buhay-womens-center/slide-site-analysis.png", 12),
    (18, (2050, 1390, 2740, 1790), "balik-buhay-womens-center/slide-sdp-massing-studies.png", 12),
    (18, (2050, 1820, 2740, 2180), "balik-buhay-womens-center/render-exterior-night-wide.png", 12),
    (18, (2750, 520, 3460, 910), "balik-buhay-womens-center/slide-site-selection.png", 12),
    (18, (2750, 960, 3460, 1350), "balik-buhay-womens-center/slide-architectural-translations.png", 12),
    (18, (2750, 1390, 3460, 1790), "balik-buhay-womens-center/slide-site-features.png", 12),
    (18, (2750, 1820, 3460, 2180), "balik-buhay-womens-center/render-garden-path-night.png", 12),
    (18, (610, 2200, 1170, 2376), "balik-buhay-womens-center/color-palette-swatches.png", 10),

    # --- Page 19: KalyeKultura ---
    (19, (190, 520, 1110, 2160), "kalyekultura/board-01-concept-form-floorplans.png", 15),
    (19, (1100, 900, 2010, 2160), "kalyekultura/board-02-site-dev-interior-isometrics.png", 15),
    (19, (2050, 520, 2770, 910), "kalyekultura/slide-cover-render.png", 12),
    (19, (2780, 520, 3500, 910), "kalyekultura/slide-the-site-map.png", 12),
    (19, (2050, 960, 2770, 1350), "kalyekultura/slide-site-dev-plan.png", 12),
    (19, (2780, 960, 3500, 1350), "kalyekultura/slide-elevations-sections.png", 12),
    (19, (2050, 1390, 2770, 1790), "kalyekultura/render-exterior-street-materials.png", 12),
    (19, (2780, 1390, 3500, 1790), "kalyekultura/slide-floor-plans.png", 12),
    (19, (2050, 1820, 2770, 2180), "kalyekultura/render-jeepney-memorabilia-wall.png", 12),
    (19, (2780, 1820, 3500, 2180), "kalyekultura/render-mural-viewing-deck.png", 12),
    (19, (210, 2190, 1100, 2376), "kalyekultura/color-palette-swatches.png", 10),

    # --- Page 20: Section divider - Creative & Visual Direction ---
    (20, (310, 340, 2040, 1790), "brand-cover/divider-creative-visual-direction.png", 15),

    # --- Page 21: Exploration with Portraiture ---
    (21, (1200, 770, 2160, 1450), "exploration-portraiture/hero-still-life-restless-mind.png", 15),
    (21, (1200, 1440, 2160, 2150), "exploration-portraiture/hero-group-patchwork-fashion.png", 15),
    (21, (2220, 770, 2770, 1180), "exploration-portraiture/detail-restless-mind-standing.png", 10),
    (21, (2220, 1170, 2770, 1580), "exploration-portraiture/detail-restless-mind-closeup.png", 10),
    (21, (2220, 1580, 2770, 1990), "exploration-portraiture/detail-restless-mind-seated.png", 10),
    (21, (2780, 770, 3670, 1240), "exploration-portraiture/detail-alterego-triptych.png", 10),
    (21, (2780, 1240, 3670, 2170), "exploration-portraiture/hero-alterego-lookbook-grid.png", 15),

    # --- Page 22: Ruin and Reverie ---
    (22, (1180, 280, 1620, 810), "ruin-and-reverie/portrait-graffiti-wall-sablay.png", 12),
    (22, (2120, 280, 2560, 810), "ruin-and-reverie/portrait-graffiti-wall-fullbody.png", 12),
    (22, (2590, 280, 3620, 810), "ruin-and-reverie/hero-arki-sign-park.png", 15),
    (22, (1180, 890, 1620, 1430), "ruin-and-reverie/portrait-sunflower-field.png", 12),
    (22, (2120, 890, 2560, 1430), "ruin-and-reverie/portrait-arcade-colonnade.png", 12),
    (22, (2590, 890, 3620, 1430), "ruin-and-reverie/hero-tess-store-scene.png", 15),
    (22, (1680, 1490, 2140, 2180), "ruin-and-reverie/couple-portrait-bench-graffiti.png", 12),
    (22, (2150, 1490, 2600, 2180), "ruin-and-reverie/couple-walking-colonnade.png", 12),
    (22, (3090, 1490, 3620, 2180), "ruin-and-reverie/couple-portrait-sunflower-field.png", 12),

    # --- Page 23: Section divider - 3D & Architectural Visualization ---
    (23, (390, 340, 2360, 1760), "brand-cover/divider-3d-architectural-visualization.png", 15),

    # --- Page 24: 3D visualization grid ---
    (24, (980, 670, 1680, 1030), "3d-visualization/interior-souvenir-mural-gallery.png", 12),
    (24, (200, 1030, 900, 1390), "3d-visualization/exterior-perforated-pergola-screen.png", 12),
    (24, (2010, 310, 2710, 670), "3d-visualization/freelance-interior-general-view-1.png", 12),
    (24, (2780, 310, 3480, 670), "3d-visualization/freelance-interior-living-room-stone-wall.png", 12),
]


def main():
    print(f"Extracting {len(ITEMS)} curated assets from {SRC_DIR} -> {OUT_DIR}\n")
    for page_num, box, rel_out, pad in ITEMS:
        out_path = os.path.join(OUT_DIR, rel_out)
        crop(page_num, box, out_path, pad=pad)
    print("\nDone.")


if __name__ == "__main__":
    main()
