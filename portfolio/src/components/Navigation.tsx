import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import type { SiteSettings } from '../types/project';

interface NavigationProps {
  settings: SiteSettings;
}

export function Navigation({ settings }: NavigationProps) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: '作品', to: '/works' },
    { label: '关于', to: '/about' },
    { label: '联系', to: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-stone-50/90 backdrop-blur-sm border-b border-stone-200/60">
      <nav className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-charcoal font-medium text-lg tracking-tight hover:text-accent transition-colors"
        >
          {settings.authorName || settings.siteTitle}
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide transition-colors ${
                isActive(link.to)
                  ? 'text-charcoal font-medium'
                  : 'text-stone-500 hover:text-charcoal'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <button
          className="md:hidden p-2 text-charcoal"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? '关闭菜单' : '打开菜单'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden bg-stone-50 border-b border-stone-200/60 px-6 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block text-sm tracking-wide ${
                isActive(link.to) ? 'text-charcoal font-medium' : 'text-stone-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
