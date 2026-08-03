import { useContent } from '../hooks/useContent';
import { Mail, Linkedin, Instagram, Twitter, Github, type LucideIcon } from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  email: Mail,
  linkedin: Linkedin,
  instagram: Instagram,
  twitter: Twitter,
  github: Github,
};

export function Contact() {
  const { data } = useContent();
  if (!data) return null;

  const { about, settings } = data;

  return (
    <div className="animate-fade-in-up">
      <section className="px-6 md:px-10 pt-20 pb-12 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm tracking-widest text-stone-500 mb-4 uppercase">Contact</p>
          <h1 className="text-3xl md:text-5xl font-medium text-charcoal mb-6">联系方式</h1>
          <p className="text-stone-600 max-w-2xl leading-relaxed mb-16">
            如果你对合作、咨询或仅仅是交流设计方法论感兴趣，欢迎通过邮件或社交媒体联系我。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="text-lg font-medium text-charcoal mb-4">发送邮件</h2>
              <a
                href={`mailto:${about.email}`}
                className="text-2xl md:text-3xl text-accent hover:text-accent-light transition-colors break-all"
              >
                {about.email}
              </a>
              {about.phone && (
                <p className="mt-4 text-stone-600">{about.phone}</p>
              )}
            </div>

            <div>
              <h2 className="text-lg font-medium text-charcoal mb-4">社交媒体</h2>
              <div className="space-y-3">
                {about.social.map((item) => {
                  const Icon = iconMap[item.platform.toLowerCase()] || Mail;
                  return (
                    <a
                      key={item.platform}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-stone-600 hover:text-charcoal transition-colors group"
                    >
                      <Icon size={18} className="text-stone-400 group-hover:text-accent" />
                      <span>{item.platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-stone-500 mb-4">当前状态</p>
          <p className="text-xl text-charcoal font-medium">
            开放新的设计合作机会，欢迎预约 15 分钟初步沟通。
          </p>
          <a
            href={`mailto:${about.email}?subject=合作咨询 | ${settings.authorName}`}
            className="inline-flex mt-6 px-6 py-3 bg-charcoal text-white text-sm font-medium hover:bg-accent transition-colors"
          >
            预约沟通
          </a>
        </div>
      </section>
    </div>
  );
}
