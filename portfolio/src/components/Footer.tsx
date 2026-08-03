import { Mail, Linkedin, Instagram, Twitter, Github, type LucideIcon } from 'lucide-react';
import type { AboutData } from '../types/project';

interface FooterProps {
  about: AboutData;
  copyright: string;
}

const iconMap: Record<string, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  github: Github,
};

export function Footer({ about, copyright }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-stone-300 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-16">
          <div>
            <h3 className="text-white text-lg font-medium mb-4">{about.name}</h3>
            <p className="text-stone-400 text-sm leading-relaxed max-w-md mb-6">
              {about.bio.slice(0, 120)}...
            </p>
            <a
              href={`mailto:${about.email}`}
              className="text-sm text-white hover:text-accent transition-colors"
            >
              {about.email}
            </a>
          </div>

          <div>
            <h3 className="text-white text-lg font-medium mb-4">社交媒体</h3>
            <div className="flex flex-wrap gap-4">
              {about.social.map((item) => {
                const Icon = iconMap[item.platform.toLowerCase()] || Mail;
                return (
                  <a
                    key={item.platform}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-stone-400 hover:text-white transition-colors text-sm"
                  >
                    <Icon size={16} />
                    <span>{item.platform}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-stone-500">
          <p>{copyright.replace('2026', String(currentYear))}</p>
          <p>代码开源，设计内容版权归作者所有</p>
        </div>
      </div>
    </footer>
  );
}
