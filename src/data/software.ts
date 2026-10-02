// Software proficiency list, split into tiers per the resume/about copy.
// icon refers to a file in src/icons/software/<icon>.svg — either a real
// Simple Icons brand mark (recolored via currentColor to fit the site
// palette) or, for the two tools Simple Icons doesn't cover, a small
// monogram-style fallback mark drawn to match the same style.

export type SoftwareTool = {
  name: string;
  icon: string;
  tier: 'primary' | 'secondary';
  note?: string;
};

export const software: SoftwareTool[] = [
  { name: 'Adobe Illustrator', icon: 'illustrator', tier: 'primary' },
  { name: 'Adobe Photoshop', icon: 'photoshop', tier: 'primary' },
  { name: 'Adobe InDesign', icon: 'indesign', tier: 'primary' },
  { name: 'Canva', icon: 'canva', tier: 'primary' },
  { name: 'Krita', icon: 'krita', tier: 'secondary' },
  { name: 'Sketchbook', icon: 'sketchbook', tier: 'secondary' },
  { name: 'Premiere', icon: 'premiere', tier: 'secondary', note: 'basic' },
  { name: 'SketchUp', icon: 'sketchup', tier: 'secondary' },
  { name: 'AutoCAD', icon: 'autocad', tier: 'secondary' },
  { name: 'Enscape', icon: 'enscape', tier: 'secondary' },
];
