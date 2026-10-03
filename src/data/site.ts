// Central site data — nav structure, category taxonomy.
// Sourced directly from the PDF portfolio's own table of contents (page 3) and cover/closing pages.
//
// Contact info (email/phone/location/socials) now lives in the siteInfo
// content collection (src/content/pages/site.md) instead of here, so it's
// editable through the CMS — see src/content/config.ts.

export const site = {
  name: 'Leila Karlene Banta',
  role: 'Graphic Designer',
};

// Category taxonomy now lives in src/content/categories/*.md (a real
// content collection, so Leila can add/rename/reorder categories herself
// through the CMS) — see src/content/config.ts and ProjectGrid.astro.

export const nav = [
  { label: 'work', href: '/#work' },
  { label: 'about', href: '/about/' },
  { label: 'resume', href: '/resume/' },
  { label: 'contact', href: '/contact/' },
];
