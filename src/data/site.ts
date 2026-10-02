// Central site data — nav structure, contact info, category taxonomy.
// Sourced directly from the PDF portfolio's own table of contents (page 3) and cover/closing pages.

export const site = {
  name: 'Leila Karlene Banta',
  role: 'Graphic Designer',
  email: 'leila.banta@gmail.com',
  phone: '+63 920 953 1002',
  location: 'Las Piñas City, Metro Manila, PH',
  linkedin: 'https://www.linkedin.com/in/leila-karlene-banta-534n1ly/',
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
