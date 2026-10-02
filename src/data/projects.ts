// Project case-study data — sourced verbatim from the portfolio PDF's own project pages.
// pdfPages recorded for traceability back to source during asset curation.

export type ProjectPalette = { hex: string; name?: string }[];

export type Project = {
  slug: string;
  category: string; // matches Category.slug in site.ts
  title: string;
  subtitle?: string;
  projectType: string;
  industry: string;
  deliverables: string[];
  description: string[]; // paragraphs, verbatim from PDF where possible
  palette: ProjectPalette;
  pdfPages: number[];
  // Optional: a short note on research/reference material behind the project.
  // Only present where the source PDF documents real concept-boarding work —
  // not written for every project, since padding it in everywhere would be
  // filler rather than a genuine process note. The underlying reference
  // images themselves (mood boards, mostly other brands' copyrighted ad
  // photography collected as research) are deliberately not republished on
  // the site — see PROJECT_CONTEXT.md for the reasoning.
  process?: string;
  // Notes for content/asset work, not shown on site.
  curationNotes?: string;
};

export const projects: Project[] = [
  {
    slug: 'myst-fragrance',
    category: 'branding-identity',
    title: 'Myst',
    subtitle: 'Fragrance. Wear Your Intention.',
    projectType: 'Academic Project',
    industry: 'Cosmetics & Personal Care',
    deliverables: [
      'Logo / Wordmark / Typography Design',
      'Visual Systems',
      'Packaging Design',
      'Digital & Print Collaterals',
    ],
    description: [
      'Myst is a modern fragrance brand inspired by manifestation and ritual. Myst perfumes are specially charged with intentions for love, luck, abundance, and the like, blending mysticism with a contemporary, fashion-forward identity.',
      'The visual identity uses a modular system of symbolic marks, with each intention represented by its own unique symbol. The ornamental details, refined typography, and rich jewel tones draw from occult symbolism and vintage perfume design, reinterpreting these influences through a polished, contemporary lens.',
    ],
    palette: [
      { hex: '#573B4E', name: 'Plum' },
      { hex: '#AB7F9C', name: 'Mauve' },
      { hex: '#6D648C', name: 'Indigo' },
      { hex: '#243245', name: 'Navy' },
      { hex: '#C5A56E', name: 'Gold' },
      { hex: '#262720', name: 'Near-black' },
    ],
    pdfPages: [5, 6],
    process: 'Concept boarding drew on vintage perfume advertising and occult/tarot ephemera, reinterpreted into a contemporary system rather than copied directly.',
    curationNotes: 'Pages 5-6. Page 5 bottom two mood-board clusters (perfume/vintage ad photography) are MOOD_BOARD_REFERENCE, exclude from case study gallery — only the logomark/wordmark/palette grid at top of p5 and everything on p6 (modular logomark system, packaging, mockups) is her deliverable work.',
  },
  {
    slug: 'myst-social-identity',
    category: 'digital-social',
    title: 'Myst Fragrance Social Media Identity',
    projectType: 'Myst Fragrance Overall Social Media Identity & Content Ideation',
    industry: 'Cosmetics & Personal Care',
    deliverables: ['Digital Publication Materials', 'Graphics & Copywriting'],
    description: [
      "A social media identity and content concept developed for Myst's online presence. The brand's visual language was translated into a cohesive and engaging social media feed through the ideation of several posts, spanning product-focused content, editorial visuals, interactive concepts, and informational posts.",
    ],
    palette: [
      { hex: '#573B4E', name: 'Plum' },
      { hex: '#AB7F9C', name: 'Mauve' },
      { hex: '#C5A56E', name: 'Gold' },
    ],
    pdfPages: [9],
  },
  {
    slug: 'myst-scent-launch',
    category: 'digital-social',
    title: 'Myst Fragrance Scent Launch',
    projectType: 'Myst Fragrance Scent Launch Social Media Campaign',
    industry: 'Cosmetics & Personal Care',
    deliverables: ['Digital Publication Materials', 'Graphics & Copywriting'],
    description: [
      "A social media campaign introducing Myst's signature intention-based fragrances through color-driven visual composites. Each scent is presented alongside its corresponding scent notes, with the imagery and color palette tailored to reflect its individual intention and identity.",
    ],
    palette: [
      { hex: '#573B4E', name: 'Plum' },
      { hex: '#AB7F9C', name: 'Mauve' },
    ],
    pdfPages: [10, 11],
  },
  {
    slug: 'casa-colina',
    category: 'branding-identity',
    title: 'Casa Colina',
    projectType: 'Freelance Project',
    industry: 'Hospitality',
    deliverables: [
      'Logo / Wordmark / Typography Design',
      'Visual Systems',
      'Merchandise Illustration & Design',
    ],
    description: [
      'Casa Colina is a modern A-frame AirBNB in Anilao, Batangas. Casa Colina balances modern built structure and natural landscapes for connection, comfort, and escape.',
      "The branding translates Casa Colina's A-frame architecture and mountainous setting into a clean, nature-led visual system. Muted green, yellow, and brown form the core palette, complemented by thin typography and organic graphic elements.",
    ],
    palette: [
      { hex: '#63A577', name: 'Green' },
      { hex: '#CDC96D', name: 'Yellow' },
      { hex: '#99AFB1', name: 'Blue-grey' },
      { hex: '#383121', name: 'Brown' },
    ],
    pdfPages: [7],
  },
  {
    slug: 'alterkitektura-2024',
    category: 'digital-social',
    title: 'UAPSA-UPD Alterkitektura 2024',
    projectType: 'UAPSA-UPD Alterkitektura 2024 Social Media Campaign',
    industry: 'Design Competition / Student Organization',
    deliverables: ['Digital Publication Materials', 'Graphics & Copywriting'],
    description: [
      'Alterkitektura is a design competition by UAPSA-UPD, exploring alternative approaches to architecture through student-led work. Under the theme "Aghimuan: Blueprint to Net-Zero Architecture," the branding combined blue-green gradients, abstract forms, and geometric compositions to represent the intersection of technology, architecture, and sustainability.',
    ],
    palette: [
      { hex: '#285282', name: 'Navy' },
      { hex: '#7DB6E2', name: 'Sky' },
      { hex: '#F1F2F2', name: 'White' },
      { hex: '#7BC067', name: 'Green' },
    ],
    pdfPages: [12],
  },
  {
    slug: 'gabriela-youth',
    category: 'digital-social',
    title: 'Gabriela Youth UP Diliman',
    projectType: 'Gabriela Youth UP Diliman Social Media Campaign Design',
    industry: 'Advocacy / Student Organization',
    deliverables: ['Digital Publication Materials', 'Graphics & Copywriting'],
    description: [
      'Gabriela Youth UPD is a youth organization focused on advocacy, education, and community-based campaigns. Its publication materials and print collateral used bold typography, attention-grabbing graphic compositions, and campaign-driven layouts to communicate organizational initiatives and advocacy messages across digital formats.',
    ],
    palette: [
      { hex: '#6A5272', name: 'Mauve' },
      { hex: '#AC99A9', name: 'Dusty pink' },
      { hex: '#B5000D', name: 'Red' },
      { hex: '#E6DAE4', name: 'Pale pink' },
    ],
    pdfPages: [13],
    curationNotes: 'Advocacy content includes real political/social commentary (VAWC, peasant rights, protest imagery) — this is legitimate design work addressing real issues, keep as-is, no privacy concerns (organizational campaign material, not private individuals).',
  },
  {
    slug: 'strawberry-season',
    category: 'editorial-print',
    title: 'Strawberry Season',
    projectType: 'Editorial Art Zine',
    industry: 'Independent / Academic',
    deliverables: ['Zine Design', 'Original Illustration', 'Editorial Sequencing'],
    description: [
      'Strawberry Season is an editorial art zine developed as part of the California Institute of the Arts Graphic Design Specialization, exploring the strawberry as a subject through original illustrations, artwork, and imagery. The project experiments with composition, image-making, and editorial sequencing to build a cohesive visual narrative around a single subject.',
    ],
    palette: [
      { hex: '#B5342A', name: 'Red' },
      { hex: '#D8CFC0', name: 'Paper' },
      { hex: '#6B7F5B', name: 'Green' },
    ],
    pdfPages: [15],
  },
  {
    slug: 'up-arki-2026',
    category: 'editorial-print',
    title: 'UP Arki 2026',
    subtitle: 'Architecture Class Yearbook, Vol. 1',
    projectType: 'Yearbook / Publication Design',
    industry: 'Academic',
    deliverables: ['Yearbook Layout', 'Publication Design', 'Print Design'],
    description: [
      'This yearbook design is built around the idea that "we are collections of everything we ever loved." Drawing from nostalgia, personal archives, slambook culture, and The Breakfast Club, the visual system uses bright, saturated colors and a scrapbook-inspired approach—layering paper textures, cutouts, handwritten elements, sticky notes, and playful compositions to create a yearbook that feels personal, candid, and distinctly lived-in.',
    ],
    palette: [
      { hex: '#E23D6B', name: 'Pink' },
      { hex: '#F2B632', name: 'Yellow' },
      { hex: '#3F5FA8', name: 'Blue' },
    ],
    pdfPages: [16],
    curationNotes: 'PRIVACY: individual student bio spreads (bottom two rows of p16) contain real classmates’ names/photos/personal info — EXCLUDED from site by default pending consent confirmation, see docs/DECISIONS_NEEDED.md #1. Only using: yearbook cover mockup, and the "What is Class 2026 Made Of" infographic spread (no identifiable individuals).',
  },
  {
    slug: 'balikbuhay-womens-center',
    category: 'information-presentation',
    title: "Balikbuhay Women's Center",
    projectType: 'Architectural Presentation Boards',
    industry: 'Institutional / Social Architecture',
    deliverables: ['Presentation Boards', 'Data Visualization', 'Architectural Graphics'],
    description: [
      "Architectural boards and presentation slides for Balik-Buhay Women's Center, a project proposing a reintegration support center for female OFWs in Cavite, using liminality as a framework for spatial design. The visual system centers on femininity, liminality, and biophilic wellness, using pink as the primary color, green & warm sunset tones as secondary accents, and curved organic forms to represent transition, connection, and nature as healing.",
    ],
    palette: [
      { hex: '#6B6693', name: 'Periwinkle' },
      { hex: '#C4674F', name: 'Terracotta' },
      { hex: '#A88E86', name: 'Warm grey' },
      { hex: '#A5527A', name: 'Rose' },
      { hex: '#1B5E3C', name: 'Green' },
    ],
    pdfPages: [18],
    process: 'Material and massing studies explored how curved, organic forms could translate the idea of liminality into built architecture, ahead of the final architectural translations shown here.',
  },
  {
    slug: 'kalyekultura',
    category: 'information-presentation',
    title: 'KalyeKultura',
    subtitle: 'The Jeepney Culture & Urban Arts Complex',
    projectType: 'Architectural Presentation Boards',
    industry: 'Cultural / Civic Architecture',
    deliverables: ['Presentation Boards', 'Data Visualization', 'Architectural Graphics'],
    description: [
      "Architectural boards and presentation slides for KalyeKultura, a proposed jeepney and urban arts complex in Cubao showcasing jeepney art, history, culture, and contemporary street art. The visual system draws from Cubao's urban character through muted, weathered backgrounds paired with teal, orange, yellow, red, and brown accents. Wide industrial typefaces and jeepney-inspired lettering reinforce the project's Filipino urban aesthetic.",
    ],
    palette: [
      { hex: '#4F9C9C', name: 'Teal' },
      { hex: '#DC9257', name: 'Orange' },
      { hex: '#E8C13F', name: 'Yellow' },
      { hex: '#C0392B', name: 'Red' },
      { hex: '#3B2E2A', name: 'Brown' },
    ],
    pdfPages: [19],
  },
  {
    slug: 'exploration-portraiture',
    category: 'creative-direction',
    title: 'Exploration with Portraiture',
    projectType: 'Concept Boarding, Shoot Direction, Styling, Post-Processing',
    industry: 'Personal / Editorial',
    deliverables: [
      'Concept Boarding',
      'Shoot Scheduling',
      'Shot List & Shoot Direction',
      'Set Design & Styling',
      'Image Editing & Post-Processing',
    ],
    description: [
      'A two-part portraiture project exploring unconventional approaches to representing identity and the subject. Still Life of a Restless Mind uses a chaotic domestic environment to externalize creative tension, while Patchwork Personality uses photo manipulation and fragmented styling to explore identity through fashion, multiplicity, and self-expression.',
    ],
    palette: [
      { hex: '#181614', name: 'Ink' },
      { hex: '#8A6D5C', name: 'Warm brown' },
    ],
    pdfPages: [21],
    process: 'Each half of the project started as its own concept board — "Place & Identity" for the domestic-chaos direction, "Alter-Ego" for the fragmented-styling direction — before moving into shoot planning.',
    curationNotes: 'Identifiable real people (models/friends) — see docs/DECISIONS_NEEDED.md #2. Standard for a photography-inclusive portfolio; flagged for confirmation, not excluded by default.',
  },
  {
    slug: 'ruin-and-reverie',
    category: 'creative-direction',
    title: 'Ruin and Reverie',
    projectType: 'Concept Boarding, Shoot Direction, Styling, Post-Processing',
    industry: 'Personal / Editorial',
    deliverables: [
      'Concept Boarding',
      'Shoot Scheduling',
      'Shot List & Shoot Direction',
      'Styling',
      'Image Editing & Post-Processing',
    ],
    description: [
      'A conceptual graduation portrait series that contrasts ethereal imagery with urbex and grunge aesthetics. Shot across UP Diliman and Cubao, the series pairs soft white styling and natural landscapes with weathered architecture and graffiti, using warm muted tones, film grain, and vintage-inspired treatments to create an editorial take on graduation portraiture.',
    ],
    palette: [
      { hex: '#181614', name: 'Ink' },
      { hex: '#C9A876', name: 'Warm gold' },
    ],
    pdfPages: [22],
    process: 'Location scouting and shot planning were worked out on a contact-sheet-style concept board before the shoot, mapping ethereal and urbex references against specific spots across UP Diliman and Cubao.',
    curationNotes: 'Identifiable real people — see docs/DECISIONS_NEEDED.md #2.',
  },
  {
    slug: '3d-architectural-visualization',
    category: '3d-architectural',
    title: '3D & Architectural Visualization',
    projectType: 'Academic & Freelance Projects',
    industry: 'Architecture / Interior Design',
    deliverables: ['3D Modeling', '3D Rendering', 'Interior Visualization'],
    description: [
      'A collection of 3D modeling and rendering work spanning academic architectural projects and freelance interior design visualization for commercial and residential spaces, including offices, workspaces, and entertainment units.',
    ],
    palette: [
      { hex: '#181614', name: 'Ink' },
      { hex: '#EDE8E0', name: 'Paper' },
    ],
    pdfPages: [24],
  },
];

export function getProjectsByCategory(categorySlug: string): Project[] {
  return projects.filter((p) => p.category === categorySlug);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
