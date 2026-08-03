import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import { marked } from 'marked';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'content');
const outputDir = path.join(root, 'public', 'content');

marked.setOptions({
  gfm: true,
  breaks: false,
});

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readFrontMatter(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);
  return { data: parsed.data, body: parsed.content };
}

function buildSettings() {
  const { data } = readFrontMatter(path.join(contentDir, 'settings.md'));
  return data;
}

function buildAbout() {
  const { data, body } = readFrontMatter(path.join(contentDir, 'about.md'));
  return {
    ...data,
    bio: marked(body.trim() || data.bio || ''),
  };
}

function buildProjects() {
  const projectsDir = path.join(contentDir, 'projects');
  if (!fs.existsSync(projectsDir)) return [];

  const files = fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith('.md'));

  return files
    .map((file) => {
      const { data, body } = readFrontMatter(path.join(projectsDir, file));
      return {
        ...data,
        slug: data.slug || file.replace(/\.md$/, ''),
        tags: data.tags || [],
        featured: data.featured ?? false,
        hidden: data.hidden ?? false,
        order: data.order ?? 0,
        content: marked(body.trim()),
      };
    })
    .sort((a, b) => b.year - a.year || a.order - b.order);
}

function main() {
  ensureDir(outputDir);

  const settings = buildSettings();
  const about = buildAbout();
  const projects = buildProjects();

  fs.writeFileSync(
    path.join(outputDir, 'settings.json'),
    JSON.stringify(settings, null, 2),
  );
  fs.writeFileSync(
    path.join(outputDir, 'about.json'),
    JSON.stringify(about, null, 2),
  );
  fs.writeFileSync(
    path.join(outputDir, 'projects.json'),
    JSON.stringify(projects, null, 2),
  );

  console.log(`✓ 生成内容数据: ${projects.length} 个作品`);
}

main();
