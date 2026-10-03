import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    category: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    projectType: z.string(),
    industry: z.string(),
    deliverables: z.array(z.string()),
    palette: z.array(
      z.object({
        hex: z.string(),
        name: z.string().optional(),
      })
    ),
    process: z.string().optional(),
    cardImage: z.string(),
    hero: z.string(),
    // Each gallery image carries its own display size rather than always
    // rendering in a fixed-column grid — lets Leila art-direct the gallery
    // rhythm per project (e.g. a single dramatic full-width shot, a square
    // detail crop, a tall portrait) instead of forcing every image into the
    // same tile, regardless of its actual subject/composition.
    gallery: z.array(
      z.object({
        image: z.string(),
        size: z.enum(['standard', 'wide', 'portrait', 'full']).default('standard'),
      })
    ),
    // Controls display order in the homepage grid — lower numbers first.
    // The glob loader otherwise returns entries in filesystem order (not
    // something Leila can control through the CMS), so this field is what
    // actually lets her rearrange the grid herself.
    order: z.number().default(0),
  }),
});

// One file per category — lets Leila add/rename/reorder categories herself
// through the CMS, instead of the old fixed list in src/data/site.ts (which
// only code changes could touch). A project's `category` field (above)
// stores this collection's entry id (its filename/slug) as a plain string
// rather than a validated reference, since Astro's content-collection
// reference() type requires the exact same loader shape on both sides and
// adds friction for little benefit here — an unmatched category slug just
// means that project doesn't show up grouped under any filter pill, which
// is an easy visual catch, not a silent failure.
const categories = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/categories' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
  }),
});

// One file per software tool — lets Leila add tools, reassign a tool's
// tier (primary/secondary/basic), and reorder within a tier herself
// through the CMS, instead of the old fixed array in src/data/software.ts.
const software = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/software' }),
  schema: z.object({
    name: z.string(),
    icon: z.string(),
    tier: z.enum(['primary', 'secondary', 'basic']).default('secondary'),
    order: z.number().default(0),
  }),
});

// Singleton page-copy collections: one Markdown file each, editable as a
// single "entry" in the CMS rather than a list. Body text (prose that reads
// naturally as paragraphs) is left in the Markdown content and pulled in
// with render(); short structured fields and repeatable lists (jobs,
// education, bullets) live in frontmatter so the CMS can offer add/remove/
// reorder controls for them.

const home = defineCollection({
  loader: glob({ pattern: 'home.md', base: './src/content/pages' }),
  schema: z.object({
    introLine: z.string(),
    // Both optional: the homepage renders a dashed placeholder box in
    // their place (see index.astro) until Leila uploads the real logo
    // mark and hand-lettered "typescript" wordmark through the CMS.
    logoImage: z.string().optional(),
    typescriptImage: z.string().optional(),
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/pages' }),
  schema: z.object({
    heroLede: z.string(),
    narrativeHeading: z.string(),
    portrait: z.string(),
  }),
});

const resume = defineCollection({
  loader: glob({ pattern: 'resume.md', base: './src/content/pages' }),
  schema: z.object({
    overview: z.string(),
    experience: z.array(
      z.object({
        title: z.string(),
        org: z.string().optional(),
        period: z.string(),
        bullets: z.array(z.string()),
      })
    ),
    education: z.array(
      z.object({
        degree: z.string(),
        org: z.string(),
        period: z.string(),
        note: z.string().optional(),
      })
    ),
    skills: z.array(z.string()),
    courses: z.array(
      z.object({
        name: z.string(),
        org: z.string(),
        year: z.string(),
      })
    ),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: 'contact.md', base: './src/content/pages' }),
  schema: z.object({
    lede: z.string(),
  }),
});

// Site-wide contact info (email, phone, social links, location) — one
// shared source so an edit in the CMS updates the footer, the Resume
// page's contact strip, and the Contact page's channel list all at once,
// instead of needing separate copies kept in sync by hand.
const siteInfo = defineCollection({
  loader: glob({ pattern: 'site.md', base: './src/content/pages' }),
  schema: z.object({
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string(),
    instagram: z.string(),
    instagramHandle: z.string(),
  }),
});

export const collections = { projects, categories, software, home, about, resume, contact, siteInfo };
