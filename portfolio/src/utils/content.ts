import type { ContentData, Project, AboutData, SiteSettings } from '../types/project';

const base = import.meta.env.BASE_URL || '/';

function resolveUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('//')) {
    return path;
  }
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base.replace(/\/$/, '')}${normalized}`;
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(resolveUrl(path));
  if (!res.ok) {
    throw new Error(`Failed to load ${path}: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function loadContent(): Promise<ContentData> {
  const [projects, about, settings] = await Promise.all([
    fetchJson<Project[]>('content/projects.json'),
    fetchJson<AboutData>('content/about.json'),
    fetchJson<SiteSettings>('content/settings.json'),
  ]);

  return {
    projects: projects.map((p) => ({ ...p, cover: resolveUrl(p.cover) })),
    about: {
      ...about,
      avatar: about.avatar ? resolveUrl(about.avatar) : undefined,
      resumeUrl: about.resumeUrl ? resolveUrl(about.resumeUrl) : undefined,
    },
    settings,
  };
}

export function getFeaturedProjects(projects: Project[], limit = 3): Project[] {
  return projects
    .filter((p) => p.featured && !p.hidden)
    .sort((a, b) => a.order - b.order)
    .slice(0, limit);
}

export function getVisibleProjects(projects: Project[]): Project[] {
  return projects
    .filter((p) => !p.hidden)
    .sort((a, b) => b.year - a.year || a.order - b.order);
}

export function getProjectBySlug(projects: Project[], slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug && !p.hidden);
}
