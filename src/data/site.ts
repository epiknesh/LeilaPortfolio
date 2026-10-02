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

export type Category = {
  slug: string;
  number: string;
  title: string;
  tags: string[];
};

// Verbatim from portfolio PDF page 3 (table of contents).
export const categories: Category[] = [
  {
    slug: 'branding-identity',
    number: '01',
    title: 'Branding & Visual Identity',
    tags: ['logo design', 'brand identity', 'visual systems', 'concept development'],
  },
  {
    slug: 'digital-social',
    number: '02',
    title: 'Digital & Social Media',
    tags: ['content creation', 'digital and social media assets', 'digital campaigns'],
  },
  {
    slug: 'editorial-print',
    number: '03',
    title: 'Editorial & Print',
    tags: ['publication design', 'print layouting', 'print collaterals'],
  },
  {
    slug: 'information-presentation',
    number: '04',
    title: 'Information & Presentation Design',
    tags: ['data visualization', 'presentations', 'visual communication'],
  },
  {
    slug: 'creative-direction',
    number: '05',
    title: 'Creative & Visual Direction',
    tags: ['concept development', 'logistical & visual direction', 'creative execution'],
  },
  {
    slug: '3d-architectural',
    number: '06',
    title: '3D & Architectural Visualization',
    tags: ['3D modeling', 'rendering', 'spatial visualization', 'architectural graphics'],
  },
];

export const nav = [
  { label: 'work', href: '/#work' },
  { label: 'about', href: '/about/' },
  { label: 'resume', href: '/resume/' },
  { label: 'contact', href: '/contact/' },
];
