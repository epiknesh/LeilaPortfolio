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
    gallery: z.array(z.string()),
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
  }),
});

const about = defineCollection({
  loader: glob({ pattern: 'about.md', base: './src/content/pages' }),
  schema: z.object({
    heroLede: z.string(),
    narrativeHeading: z.string(),
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

export const collections = { projects, home, about, resume, contact };
