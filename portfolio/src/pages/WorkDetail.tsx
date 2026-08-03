import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { getProjectBySlug } from '../utils/content';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export function WorkDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data } = useContent();

  if (!data || !slug) return null;

  const project = getProjectBySlug(data.projects, slug);

  if (!project) {
    return <Navigate to="/works" replace />;
  }

  return (
    <article className="animate-fade-in-up">
      <section className="px-6 md:px-10 pt-20 pb-10 md:pt-28 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/works"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-charcoal transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            返回作品列表
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <div className="flex items-center gap-3 text-xs text-stone-500 mb-4">
                <span>{project.category}</span>
                <span className="w-1 h-1 rounded-full bg-stone-400" />
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {project.year}
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-medium text-charcoal mb-6 leading-tight">
                {project.title}
              </h1>
              <p className="text-lg text-stone-600 leading-relaxed mb-8">
                {project.description}
              </p>

              {project.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <Tag size={14} className="text-stone-400" />
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-stone-100 text-stone-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-stone-200 aspect-[4/3] overflow-hidden">
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto">
          <MarkdownRenderer html={project.content} />
        </div>
      </section>
    </article>
  );
}
