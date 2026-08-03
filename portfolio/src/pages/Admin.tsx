import { useEffect, useRef } from 'react';

export function Admin() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    import('decap-cms-app').then((CMS) => {
      const base = import.meta.env.BASE_URL || '/';
      const branch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
      const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;

      CMS.default.init({
        config: {
          backend: {
            name: 'git-gateway',
            branch,
          },
          media_folder: 'public/uploads',
          public_folder: `${base.replace(/\/$/, '')}/uploads`,
          site_url: siteUrl,
          display_url: siteUrl,
          publish_mode: 'editorial_workflow',
          slug: {
            encoding: 'unicode',
            clean_accents: false,
            sanitize_replacement: '-',
          },
          collections: [
            {
              name: 'settings',
              label: '站点设置',
              files: [
                {
                  name: 'site',
                  label: '站点信息',
                  file: 'content/settings.md',
                  fields: [
                    { label: '站点标题', name: 'siteTitle', widget: 'string' },
                    { label: '站点描述', name: 'siteDescription', widget: 'string' },
                    { label: '作者姓名', name: 'authorName', widget: 'string' },
                    { label: '作者定位', name: 'authorRole', widget: 'string' },
                    { label: '首页主标题', name: 'heroTagline', widget: 'string' },
                    { label: '首页介绍', name: 'heroIntro', widget: 'text' },
                    { label: '页脚版权', name: 'footerCopyright', widget: 'string' },
                  ],
                },
                {
                  name: 'about',
                  label: '关于我',
                  file: 'content/about.md',
                  fields: [
                    { label: '姓名', name: 'name', widget: 'string' },
                    { label: '定位', name: 'role', widget: 'string' },
                    { label: '个人简介', name: 'bio', widget: 'markdown' },
                    {
                      label: '技能',
                      name: 'skills',
                      widget: 'list',
                      field: { label: '技能', name: 'skill', widget: 'string' },
                    },
                    { label: '邮箱', name: 'email', widget: 'string' },
                    { label: '电话', name: 'phone', widget: 'string', required: false },
                    { label: '所在地', name: 'location', widget: 'string', required: false },
                    {
                      label: '头像',
                      name: 'avatar',
                      widget: 'image',
                      required: false,
                    },
                    {
                      label: '简历链接',
                      name: 'resumeUrl',
                      widget: 'file',
                      required: false,
                    },
                    {
                      label: '社交链接',
                      name: 'social',
                      widget: 'list',
                      fields: [
                        { label: '平台', name: 'platform', widget: 'string' },
                        { label: '链接', name: 'url', widget: 'string' },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              name: 'projects',
              label: '作品',
              folder: 'content/projects',
              create: true,
              slug: '{{slug}}',
              extension: 'md',
              format: 'yaml-frontmatter',
              fields: [
                { label: '标题', name: 'title', widget: 'string' },
                { label: 'Slug', name: 'slug', widget: 'string' },
                { label: '类别', name: 'category', widget: 'string' },
                { label: '年份', name: 'year', widget: 'number', value_type: 'int' },
                { label: '简短描述', name: 'description', widget: 'text' },
                { label: '封面图', name: 'cover', widget: 'image' },
                {
                  label: '标签',
                  name: 'tags',
                  widget: 'list',
                  field: { label: '标签', name: 'tag', widget: 'string' },
                },
                { label: '精选', name: 'featured', widget: 'boolean', default: false },
                { label: '隐藏', name: 'hidden', widget: 'boolean', default: false },
                { label: '排序', name: 'order', widget: 'number', value_type: 'int', default: 0 },
                { label: '详情内容', name: 'body', widget: 'markdown' },
              ],
            },
          ],
        },
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center">
      <div className="text-center">
        <div className="text-sm text-stone-500 mb-2">正在加载 Decap CMS...</div>
        <div className="text-xs text-stone-400">请稍候，即将跳转登录</div>
      </div>
    </div>
  );
}
