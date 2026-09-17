import type { APIRoute } from 'astro';
import profile from '../data/profile.json';
import experiences from '../data/experiences.json';
import formations from '../data/formations.json';
import projects from '../data/projects.json';
import skills from '../data/skills.json';
import { range, duration } from '../lib/dates';

/** Résumé en texte brut du site, destiné aux assistants et moteurs de réponse IA (convention llms.txt). */
export const GET: APIRoute = ({ site }) => {
  const base = site!.toString().replace(/\/$/, '');
  const name = `${profile.firstName} ${profile.lastName}`;
  const lines = [
    `# ${name} — ${profile.title} à Nouméa, Nouvelle-Calédonie`,
    '',
    `> ${profile.tagline}`,
    '',
    profile.intro.join('\n\n'),
    '',
    '## Informations clés',
    `- Nom : ${name}`,
    `- Métier : ${profile.title}`,
    `- Lieu : ${profile.location}`,
    `- Situation : ${profile.conditions.status}`,
    `- Ouvert à : ${profile.conditions.openTo}`,
    `- Format : ${profile.conditions.format}`,
    `- Tarifs : ${profile.conditions.rate}`,
    `- Offre en CDI : ${profile.conditions.cdi}${profile.conditions.salary ? ` : ${profile.conditions.salary}` : ''}`,
    `- Lieu de travail : ${profile.conditions.remote}`,
    `- Expérience : ${profile.conditions.experienceYears}`,
    `- Site : ${base}/`,
    `- CV : ${base}/cv/ (PDF : ${base}${profile.cv})`,
    `- Contact : ${base}/contact/`,
    ...Object.entries(profile.links).filter(([, v]) => v).map(([k, v]) => `- ${k} : ${v}`),
    '',
    '## Compétences',
    ...skills.map((g) => `- ${g.group} : ${g.items.join(', ')}`),
    '',
    '## Expériences professionnelles',
    ...experiences.map((e) => `- ${range(e.start, e.end)} (${duration(e.start, e.end)}) — ${e.role}, ${e.company}, ${e.location}. ${e.summary}${e.stack.length ? ` Technologies : ${e.stack.join(', ')}.` : ''}`),
    '',
    '## Formations',
    ...formations.map((f) => `- ${range(f.start, f.end)} — ${f.title}, ${f.school} (${f.level}).`),
    '',
    '## Projets',
    ...projects.map((p) => `- [${p.title}](${base}/projets/${p.slug}/) — ${p.category}, ${p.client}, ${p.year}. ${p.summary} Stack : ${p.stack.join(', ')}.${'url' in p && p.url ? ` Site : ${p.url}` : ''}`),
    '',
    '## Questions fréquentes',
    ...profile.faq.flatMap((f) => [`### ${f.q}`, f.a, '']),
    '## Pages',
    `- [Accueil](${base}/)`,
    `- [Projets](${base}/projets/)`,
    `- [Parcours](${base}/parcours/)`,
    `- [CV](${base}/cv/)`,
    `- [Contact](${base}/contact/)`,
    '',
    `Dernière génération : ${new Date().toISOString().slice(0, 10)}. Contenu en français.`,
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
