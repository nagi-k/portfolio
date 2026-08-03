# 高端个人作品集网站

基于 **React + Vite + TypeScript + Tailwind CSS + Decap CMS** 构建，部署在 **GitHub Pages** 上的个人作品集模板。

---

## 功能特性

- **前台展示**
  - 首页：个人定位、一句话介绍、精选作品
  - 作品列表页：项目封面、标题、类别、年份、简短描述
  - 作品详情页：项目背景、设计问题、设计过程、成果展示、图片画廊
  - 关于我：个人简介、技能、联系方式、社交媒体
  - 联系方式页：邮件、社交媒体、合作状态
- **后台管理**（`/admin`）
  - GitHub OAuth 登录
  - 在线添加 / 编辑 / 删除 / 隐藏作品
  - Markdown 富文本编辑
  - 图片上传与元数据管理
- **自动发布**
  - 保存内容后自动提交到 GitHub
  - GitHub Actions 自动构建并部署到 GitHub Pages

---

## 快速开始

### 1. 准备环境

- Node.js 20+
- GitHub 账号
- 已创建的 GitHub 仓库（如 `yourname-portfolio`）
- 已开启的 GitHub Pages
- 已创建的 GitHub OAuth App

### 2. 克隆与安装

```bash
git clone https://github.com/yourname/yourname-portfolio.git
cd yourname-portfolio
npm install --legacy-peer-deps
```

### 3. 本地开发

```bash
npm run dev
```

访问 http://localhost:5173 查看前台，http://localhost:5173/admin 查看后台入口。

### 4. 构建

```bash
npm run build
```

构建产物输出到 `dist/` 目录。

---

## 内容管理

站点内容存储在 `content/` 目录的 Markdown 文件中：

```
content/
├── settings.md          # 站点设置
├── about.md             # 关于我
└── projects/
    ├── smart-lamp.md    # 示例作品
    ├── health-app.md
    └── sustainable-packaging.md
```

你可以直接编辑 Markdown 文件，也可以通过 Decap CMS 后台在线编辑。

---

## 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库的 `main` 分支。
2. 在仓库 **Settings > Pages** 中，Source 选择 **GitHub Actions**。
3. GitHub Actions 工作流 `.github/workflows/deploy.yml` 会在每次推送到 `main` 时自动构建并部署。

> 如果你使用自定义域名或用户/组织主页（`yourname.github.io`），请修改 `vite.config.ts` 和 `public/404.html` 中的 `BASE` 为 `'/'`。

---

## 自定义配置

复制 `.env.example` 为 `.env` 并填入你的信息：

```bash
cp .env.example .env
```

关键环境变量：

| 变量 | 说明 |
| --- | --- |
| `VITE_BASE_URL` | GitHub Pages base 路径，如 `/yourname-portfolio/` |
| `VITE_GITHUB_REPO` | GitHub 仓库，如 `yourname/yourname-portfolio` |
| `VITE_GITHUB_BRANCH` | 默认分支，通常是 `main` |
| `VITE_SITE_URL` | 站点完整 URL |

---

## 后台配置（Decap CMS）

详见 [docs/admin-guide.md](./docs/admin-guide.md)。

---

## 安全与版权建议

- 作品图片建议添加水印或叠加个人 Logo。
- 不要上传原始高清文件，只放适合网页展示的低分辨率版本。
- 页面底部已包含版权声明，可在 `content/settings.md` 中修改。
- 代码开源，设计内容版权归作者所有。

---

## 技术栈

- 前端框架：React 18 + Vite 6 + TypeScript 5.6
- 样式：Tailwind CSS 4
- 内容管理：Decap CMS 3
- 图标：Lucide React
- 部署：GitHub Pages + GitHub Actions
