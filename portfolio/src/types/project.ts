export interface Project {
  slug: string;
  title: string;
  category: string;
  year: number;
  description: string;
  cover: string;
  tags: string[];
  featured: boolean;
  hidden: boolean;
  order: number;
  content: string;
}

export interface AboutData {
  name: string;
  role: string;
  bio: string;
  skills: string[];
  email: string;
  phone?: string;
  location?: string;
  social: {
    platform: string;
    url: string;
  }[];
  avatar?: string;
  resumeUrl?: string;
}

export interface SiteSettings {
  siteTitle: string;
  siteDescription: string;
  authorName: string;
  authorRole: string;
  heroTagline: string;
  heroIntro: string;
  footerCopyright: string;
}

export interface ContentData {
  projects: Project[];
  about: AboutData;
  settings: SiteSettings;
}
