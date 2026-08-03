import { useContent } from '../hooks/useContent';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { Mail, MapPin, FileText } from 'lucide-react';

export function About() {
  const { data } = useContent();
  if (!data) return null;

  const { about } = data;

  return (
    <div className="animate-fade-in-up">
      <section className="px-6 md:px-10 pt-20 pb-12 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm tracking-widest text-stone-500 mb-4 uppercase">About</p>
          <h1 className="text-3xl md:text-5xl font-medium text-charcoal mb-12">关于我</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4">
              {about.avatar && (
                <div className="aspect-[3/4] bg-stone-200 overflow-hidden mb-8">
                  <img
                    src={about.avatar}
                    alt={about.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-medium text-charcoal">{about.name}</h2>
                  <p className="text-stone-500 text-sm">{about.role}</p>
                </div>

                <div className="pt-4 border-t border-stone-200 space-y-3 text-sm">
                  <a
                    href={`mailto:${about.email}`}
                    className="flex items-center gap-2 text-stone-600 hover:text-accent transition-colors"
                  >
                    <Mail size={14} />
                    {about.email}
                  </a>
                  {about.location && (
                    <div className="flex items-center gap-2 text-stone-600">
                      <MapPin size={14} />
                      {about.location}
                    </div>
                  )}
                  {about.resumeUrl && (
                    <a
                      href={about.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors"
                    >
                      <FileText size={14} />
                      下载简历
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="prose-custom max-w-none mb-16">
                <MarkdownRenderer html={about.bio} />
              </div>

              <div className="border-t border-stone-200 pt-12">
                <h3 className="text-lg font-medium text-charcoal mb-6">技能与工具</h3>
                <div className="flex flex-wrap gap-3">
                  {about.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-white border border-stone-200 text-sm text-stone-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
