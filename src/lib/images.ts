import type { ImageMetadata } from 'astro';

type Glob = Record<string, () => Promise<{ default: ImageMetadata }>>;

const logos = import.meta.glob<{ default: ImageMetadata }>('/src/assets/logos/*.{png,jpg}');
const projects = import.meta.glob<{ default: ImageMetadata }>('/src/assets/projects/*.png');
const diplomes = import.meta.glob<{ default: ImageMetadata }>('/src/assets/diplomes/*.jpg');
const people = import.meta.glob<{ default: ImageMetadata }>('/src/assets/*.{png,jpg}');

async function pick(glob: Glob, dir: string, name: string | null | undefined): Promise<ImageMetadata | null> {
  if (!name) return null;
  const key = Object.keys(glob).find((k) => k.startsWith(`${dir}/${name}.`));
  if (!key) return null;
  return (await glob[key]()).default;
}

export const logo = (name: string | null | undefined) => pick(logos, '/src/assets/logos', name);
export const projectImage = (name: string) => pick(projects, '/src/assets/projects', name);
export const diploma = (name: string | null | undefined) => pick(diplomes, '/src/assets/diplomes', name);
export const person = (name: string) => pick(people, '/src/assets', name);
