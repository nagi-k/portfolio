import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useContent } from '../hooks/useContent';
import { ProjectCard } from '../components/ProjectCard';
import { getFeaturedProjects, getVisibleProjects } from '../utils/content';

export function Home() {
  const { data } = useContent();
  if (!data) return null;

  const featured = getFeaturedProjects(data.projects, 3);
  const recent = getVisibleProjects(data.projects).slice(0, 4);

  return (
    <div className="animate-fade-in-up">
      {/* Hero */}
      <section className="min-h-[80vh] flex items-center px-6 md:px-10">
        <div className="max-w-7xl mx-auto w-full py-20 md:py-32">
          <div className="max-w-3xl">
            <p className="text-sm tracking-widest text-stone-500 mb-6 uppercase">
              {data.settings.authorRole}
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium text-charcoal leading-[1.1] mb-8">
              {data.settings.heroTagline}
            </h1>
            <p className="text-lg md:text-xl text-stone-600 leading-relaxed max-w-2xl mb-10">
              {data.settings.heroIntro}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/works"
                className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white text-sm font-medium hover:bg-accent transition-colors"
              >
                浏览作品
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-charcoal text-sm font-medium hover:border-charcoal transition-colors"
              >
                了解更多
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Works */}
      <section className="px-6 md:px-10 py-20 md:py-28 border-t border-stone-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-charcoal mb-2">精选作品</h2>
              <p className="text-stone-500 text-sm">研究驱动的设计叙事</p>
            </div>
            <Link
              to="/works"
              className="hidden md:inline-flex items-center gap-1 text-sm text-charcoal hover:text-accent transition-colors"
            >
              查看全部 <ArrowRight size={14} />
            </Link>
          </div>

          {featured.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {featured.map((project) => (
                <ProjectCard key={project.slug} project={project} featured />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {recent.slice(0, 2).map((project) => (
                <ProjectCard key={project.slug} project={project} featured />
              ))}
            </div>
          )}

          <div className="mt-10 md:hidden">
            <Link
              to="/works"
              className="inline-flex items-center gap-1 text-sm text-charcoal hover:text-accent transition-colors"
            >
              查看全部 <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Methodology teaser */}
      <section className="px-6 md:px-10 py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-sm tracking-widest text-stone-500 mb-4 uppercase">设计方法</p>
            <h2 className="text-2xl md:text-3xl font-medium text-charcoal mb-6">
              从真实问题出发，用逻辑推导设计
            </h2>
            <p className="text-stone-600 leading-relaxed mb-8">
              每一个项目都始于对用户与场景的深入观察，经过定义问题、发散构思、原型验证与迭代优化，最终落地为可衡量的设计成果。
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm text-charcoal hover:text-accent transition-colors"
            >
              了解我的工作方式 <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {['用户研究', '概念定义', '原型验证', '落地迭代'].map((item, idx) => (
              <div
                key={item}
                className={`bg-stone-50 border border-stone-200 p-6 md:p-8 ${
                  idx % 2 === 1 ? 'md:mt-8' : ''
                }`}
              >
                <span className="text-xs text-stone-400 mb-3 block">0{idx + 1}</span>
                <h3 className="text-charcoal font-medium">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
