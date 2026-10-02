// Maps each project slug to its curated image assets.
// Source: assets/asset-manifest.md (produced by an overnight curation pass over the source PDF).
// Files physically live at E:\LeilaPortfolio-curated-assets, junctioned into public/images/curated
// because C: is (as of this writing) nearly out of disk space — see PROJECT_CONTEXT.md "Known Issues".
// Paths below are web-servable paths relative to /images/curated/.

export type ProjectAssets = {
  cardImage: string; // used on homepage teaser cards
  hero: string; // primary image on the project detail page
  gallery: string[]; // additional images, in display order
};

const BASE = '/images/curated';

export const projectAssets: Record<string, ProjectAssets> = {
  'myst-fragrance': {
    cardImage: `${BASE}/myst-fragrance/packaging-hero-full-lineup.png`,
    hero: `${BASE}/myst-fragrance/logomark-modular-system-grid.png`,
    gallery: [
      `${BASE}/myst-fragrance/logomark-primary.png`,
      `${BASE}/myst-fragrance/wordmark-myst-fragrance.png`,
      `${BASE}/myst-fragrance/typography-wear-your-intention.png`,
      `${BASE}/myst-fragrance/logo-lockup-colorway-grid.png`,
      `${BASE}/myst-fragrance/packaging-love.png`,
      `${BASE}/myst-fragrance/packaging-luck.png`,
      `${BASE}/myst-fragrance/packaging-abundance.png`,
      `${BASE}/myst-fragrance/packaging-protection.png`,
      `${BASE}/myst-fragrance/packaging-confidence.png`,
      `${BASE}/myst-fragrance/packaging-intuition.png`,
      `${BASE}/myst-fragrance/mockup-storefront-signage.png`,
      `${BASE}/myst-fragrance/mockup-business-card.png`,
      `${BASE}/myst-fragrance/mockup-apparel-tshirt.png`,
      `${BASE}/myst-fragrance/mockup-digital-ad-panel.png`,
      `${BASE}/myst-fragrance/mockup-fabric-pattern-phone.png`,
      `${BASE}/myst-fragrance/mockup-tote-bags.png`,
    ],
  },
  'myst-social-identity': {
    cardImage: `${BASE}/myst-fragrance/social-wear-your-intention-lineup.png`,
    hero: `${BASE}/myst-fragrance/social-find-your-myst.png`,
    gallery: [
      `${BASE}/myst-fragrance/social-choose-your-energy.png`,
      `${BASE}/myst-fragrance/social-any-luck.png`,
      `${BASE}/myst-fragrance/social-what-are-you-manifesting.png`,
      `${BASE}/myst-fragrance/social-wear-your-intention-lineup.png`,
      `${BASE}/myst-fragrance/social-red-flags-grid.png`,
      `${BASE}/myst-fragrance/social-love-let-it-in.png`,
      `${BASE}/myst-fragrance/social-choose-your-intention-grid.png`,
      `${BASE}/myst-fragrance/social-charged-with-purpose.png`,
      `${BASE}/myst-fragrance/mockup-instagram-feed-phone.png`,
    ],
  },
  'myst-scent-launch': {
    cardImage: `${BASE}/myst-fragrance/scent-launch-love.png`,
    hero: `${BASE}/myst-fragrance/scent-launch-abundance.png`,
    gallery: [
      `${BASE}/myst-fragrance/scent-launch-love.png`,
      `${BASE}/myst-fragrance/scent-launch-luck.png`,
      `${BASE}/myst-fragrance/scent-launch-abundance.png`,
      `${BASE}/myst-fragrance/scent-launch-protection.png`,
      `${BASE}/myst-fragrance/scent-launch-confidence.png`,
      `${BASE}/myst-fragrance/scent-launch-intuition.png`,
      `${BASE}/myst-fragrance/mockup-campaign-banner-phone.png`,
    ],
  },
  'casa-colina': {
    cardImage: `${BASE}/casa-colina/mockup-apparel-tshirt-hero.png`,
    hero: `${BASE}/casa-colina/logomark-primary.png`,
    gallery: [
      `${BASE}/casa-colina/wordmark-lockup-variants.png`,
      `${BASE}/casa-colina/mockup-apparel-tshirt-hero.png`,
      `${BASE}/casa-colina/mockup-tote-bag.png`,
      `${BASE}/casa-colina/mockup-caps.png`,
      `${BASE}/casa-colina/logomark-alt-colorway.png`,
    ],
  },
  'alterkitektura-2024': {
    cardImage: `${BASE}/alterkitektura/social-net-zero-infographic.png`,
    hero: `${BASE}/alterkitektura/social-meet-the-speakers.png`,
    gallery: [
      `${BASE}/alterkitektura/social-net-zero-infographic.png`,
      `${BASE}/alterkitektura/social-congratulations-winners.png`,
      `${BASE}/alterkitektura/social-awarding-ceremony.png`,
      `${BASE}/alterkitektura/social-registration-extended.png`,
      `${BASE}/alterkitektura/social-thank-you-sponsors.png`,
      `${BASE}/alterkitektura/mockup-facebook-feed-phone.png`,
    ],
  },
  'gabriela-youth': {
    cardImage: `${BASE}/gabriela-youth/social-vawc-definition-infographic.png`,
    hero: `${BASE}/gabriela-youth/social-vawc-awareness.png`,
    gallery: [
      `${BASE}/gabriela-youth/social-vawc-definition-infographic.png`,
      `${BASE}/gabriela-youth/social-duterte-statement.png`,
      `${BASE}/gabriela-youth/social-peasant-month.png`,
      `${BASE}/gabriela-youth/social-peasant-community-infographic.png`,
      `${BASE}/gabriela-youth/social-national-womens-day-protest.png`,
      `${BASE}/gabriela-youth/mockup-facebook-feed-phone.png`,
    ],
  },
  'strawberry-season': {
    cardImage: `${BASE}/strawberry-season/cover-front-back.png`,
    hero: `${BASE}/strawberry-season/mockup-booklets-fanned.png`,
    gallery: [
      `${BASE}/strawberry-season/cover-front-back.png`,
      `${BASE}/strawberry-season/spread-strawberry-berry-sweet.png`,
      `${BASE}/strawberry-season/spread-nutrition-red-alert.png`,
      `${BASE}/strawberry-season/spread-wanted-ephemera.png`,
    ],
  },
  'up-arki-2026': {
    cardImage: `${BASE}/up-arki-yearbook/cover-and-open-spread-mockup.png`,
    hero: `${BASE}/up-arki-yearbook/cover-and-open-spread-mockup.png`,
    gallery: [
      `${BASE}/up-arki-yearbook/divider-architecture-class-batch2026.png`,
      `${BASE}/up-arki-yearbook/infographic-what-is-class-2026.png`,
    ],
  },
  'balikbuhay-womens-center': {
    cardImage: `${BASE}/balik-buhay-womens-center/render-exterior-night-wide.png`,
    hero: `${BASE}/balik-buhay-womens-center/render-exterior-night-wide.png`,
    gallery: [
      `${BASE}/balik-buhay-womens-center/slide-cover-night-render.png`,
      `${BASE}/balik-buhay-womens-center/board-01-concept-site-analysis.png`,
      `${BASE}/balik-buhay-womens-center/board-02-floorplans-elevations.png`,
      `${BASE}/balik-buhay-womens-center/slide-site-selection.png`,
      `${BASE}/balik-buhay-womens-center/slide-site-analysis.png`,
      `${BASE}/balik-buhay-womens-center/slide-architectural-translations.png`,
      `${BASE}/balik-buhay-womens-center/slide-sdp-massing-studies.png`,
      `${BASE}/balik-buhay-womens-center/slide-site-features.png`,
      `${BASE}/balik-buhay-womens-center/render-garden-path-night.png`,
    ],
  },
  kalyekultura: {
    cardImage: `${BASE}/kalyekultura/render-mural-viewing-deck.png`,
    hero: `${BASE}/kalyekultura/render-mural-viewing-deck.png`,
    gallery: [
      `${BASE}/kalyekultura/slide-cover-render.png`,
      `${BASE}/kalyekultura/board-01-concept-form-floorplans.png`,
      `${BASE}/kalyekultura/board-02-site-dev-interior-isometrics.png`,
      `${BASE}/kalyekultura/slide-the-site-map.png`,
      `${BASE}/kalyekultura/slide-site-dev-plan.png`,
      `${BASE}/kalyekultura/slide-elevations-sections.png`,
      `${BASE}/kalyekultura/slide-floor-plans.png`,
      `${BASE}/kalyekultura/render-exterior-street-materials.png`,
      `${BASE}/kalyekultura/render-jeepney-memorabilia-wall.png`,
    ],
  },
  'exploration-portraiture': {
    cardImage: `${BASE}/exploration-portraiture/hero-still-life-restless-mind.png`,
    hero: `${BASE}/exploration-portraiture/hero-still-life-restless-mind.png`,
    gallery: [
      `${BASE}/exploration-portraiture/detail-restless-mind-seated.png`,
      `${BASE}/exploration-portraiture/detail-restless-mind-standing.png`,
      `${BASE}/exploration-portraiture/detail-restless-mind-closeup.png`,
      `${BASE}/exploration-portraiture/hero-group-patchwork-fashion.png`,
      `${BASE}/exploration-portraiture/hero-alterego-lookbook-grid.png`,
      `${BASE}/exploration-portraiture/detail-alterego-triptych.png`,
    ],
  },
  'ruin-and-reverie': {
    cardImage: `${BASE}/ruin-and-reverie/hero-arki-sign-park.png`,
    hero: `${BASE}/ruin-and-reverie/portrait-sunflower-field.png`,
    gallery: [
      `${BASE}/ruin-and-reverie/portrait-graffiti-wall-sablay.png`,
      `${BASE}/ruin-and-reverie/portrait-arcade-colonnade.png`,
      `${BASE}/ruin-and-reverie/hero-tess-store-scene.png`,
      `${BASE}/ruin-and-reverie/couple-portrait-sunflower-field.png`,
      `${BASE}/ruin-and-reverie/couple-walking-colonnade.png`,
      `${BASE}/ruin-and-reverie/couple-portrait-bench-graffiti.png`,
      `${BASE}/ruin-and-reverie/portrait-graffiti-wall-fullbody.png`,
    ],
  },
  '3d-architectural-visualization': {
    cardImage: `${BASE}/3d-visualization/exterior-perforated-pergola-screen.png`,
    hero: `${BASE}/3d-visualization/exterior-perforated-pergola-screen.png`,
    gallery: [
      `${BASE}/3d-visualization/interior-souvenir-mural-gallery.png`,
      `${BASE}/3d-visualization/freelance-interior-general-view-1.png`,
      `${BASE}/3d-visualization/freelance-interior-living-room-stone-wall.png`,
    ],
  },
};

export const brandAssets = {
  portfolioStamp: `${BASE}/brand-cover/portfolio-wordmark-stamp-full.png`,
  tagline: `${BASE}/brand-cover/tagline-graphic-design-2026.png`,
  aboutIllustration: `${BASE}/brand-cover/about-me-illustrated-portrait.png`,
  aboutWordmark: `${BASE}/brand-cover/about-me-vertical-wordmark.png`,
  tocDecoration: `${BASE}/brand-cover/toc-decorative-linework.png`,
  dividers: {
    'branding-identity': `${BASE}/brand-cover/divider-branding-identity.png`,
    'digital-social': `${BASE}/brand-cover/divider-digital-social-media.png`,
    'editorial-print': `${BASE}/brand-cover/divider-editorial-print.png`,
    'information-presentation': `${BASE}/brand-cover/divider-information-presentation.png`,
    'creative-direction': `${BASE}/brand-cover/divider-creative-visual-direction.png`,
    '3d-architectural': `${BASE}/brand-cover/divider-3d-architectural-visualization.png`,
  } as Record<string, string>,
};
