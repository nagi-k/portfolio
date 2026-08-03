import { useContent } from '../hooks/useContent';
import { ProjectCard } from '../components/ProjectCard';
import { getVisibleProjects } from '../utils/content';

export function Works() {
  const { data } = useContent();
  if (!data) return null;

  const projects = getVisibleProjects(data.projects);

  return (
    <div className="animate-fade-in-up">
      <section className="px-6 md:px-10 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm tracking-widest text-stone-500 mb-4 uppercase">Portfolio</p>
          <h1 className="text-3xl md:text-5xl font-medium text-charcoal mb-6">作品</h1>
          <p className="text-stone-600 max-w-2xl leading-relaxed">
            以下项目涵盖工业设计与交互设计领域，聚焦于通过系统化的方法解决真实问题，并在商业与体验之间取得平衡。
          </p>
        </div>
      </section>

      <section className="px-6 md:px-10 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-14">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 text-stone-500 text-sm">
              暂无作品，请通过后台添加。
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
