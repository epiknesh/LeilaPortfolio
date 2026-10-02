// Brand/site-chrome assets not tied to any individual project (hero stamp,
// about-page illustration, category divider art). Per-project image assets
// (cardImage/hero/gallery) now live in each project's own frontmatter —
// see src/content/projects/*.md and src/content/config.ts.

const BASE = '/images/curated';

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
