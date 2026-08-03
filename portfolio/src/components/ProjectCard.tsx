import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types/project';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link
      to={`/works/${project.slug}`}
      className={`group block ${featured ? 'md:col-span-2' : ''}`}
    >
      <div className="relative overflow-hidden bg-stone-200 aspect-[4/3] mb-5">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/10 transition-colors duration-500" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
            <span>{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-stone-400" />
            <span>{project.year}</span>
          </div>
          <h3 className="text-lg font-medium text-charcoal group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="mt-2 text-sm text-stone-500 line-clamp-2">{project.description}</p>
        </div>
        <ArrowUpRight
          size={18}
          className="mt-1 text-stone-400 group-hover:text-accent transition-colors shrink-0"
        />
      </div>
    </Link>
  );
}
