# Decap CMS 后台使用说明

后台地址：`https://yourname.github.io/yourname-portfolio/admin`

---

## 一、创建 GitHub OAuth App

1. 登录 GitHub，进入 **Settings > Developer settings > OAuth Apps > New OAuth App**。
2. 填写应用信息：
   - **Application name**：`Yourname Portfolio CMS`
   - **Homepage URL**：你的站点地址，如 `https://yourname.github.io/yourname-portfolio/`
   - **Authorization callback URL**：`https://yourname.github.io/yourname-portfolio/admin/`
3. 点击 **Register application**。
4. 记下生成的 **Client ID** 和 **Client Secret**。

> 如果站点绑定了自定义域名，上述两个 URL 需使用自定义域名。

---

## 二、配置 Netlify Identity / Decap CMS OAuth 代理

Decap CMS 使用 GitHub OAuth 时需要一个 OAuth 代理。最常用的方式是：

### 方案 A：使用 Netlify Git Gateway（推荐新手）

1. 在 [Netlify](https://netlify.com) 新建一个站点，连接同一个 GitHub 仓库。
2. 进入 **Site settings > Identity**，启用 Identity 服务。
3. 进入 **Services > Git Gateway**，启用并关联 GitHub。
4. 在 `src/pages/Admin.tsx` 中把 backend 改为：

```yaml
backend:
  name: git-gateway
  branch: main
```

### 方案 B：使用社区 OAuth 代理（纯 GitHub Pages）

如果你不想使用 Netlify，可以部署一个独立的 OAuth 代理，例如：

- [decap-cms-oauth](https://github.com/philhawksworth/decap-cms-oauth)（Cloudflare Workers）
- [netlify-cms-oauth-provider](https://github.com/vencax/netlify-cms-oauth-provider)（Vercel / Heroku）

配置时需要把代理地址填入 `src/pages/Admin.tsx` 的 `base_url` 字段。

```yaml
backend:
  name: github
  repo: yourname/yourname-portfolio
  branch: main
  base_url: https://your-oauth-proxy.vercel.app
```

---

## 三、修改后台配置

打开 `src/pages/Admin.tsx`，修改以下环境变量或硬编码值：

```tsx
const repo = import.meta.env.VITE_GITHUB_REPO || 'yourname/yourname-portfolio';
const branch = import.meta.env.VITE_GITHUB_BRANCH || 'main';
const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
```

建议通过仓库的 **Settings > Secrets and variables > Actions > Repository variables** 设置：

- `VITE_GITHUB_REPO`
- `VITE_GITHUB_BRANCH`
- `VITE_SITE_URL`

---

## 四、后台操作

### 登录

1. 访问 `/admin`。
2. 点击 **Login with GitHub**。
3. 授权后即可进入 CMS。

### 添加作品

1. 点击左侧 **作品 > 新建作品**。
2. 填写元数据：标题、Slug、类别、年份、描述、封面、标签、是否精选、是否隐藏、排序。
3. 在 **详情内容** 中使用 Markdown 编辑项目详情。
4. 点击右上角 **保存**，Decap CMS 会自动提交到 GitHub。

### 编辑站点信息

1. 点击左侧 **站点设置 > 站点信息**。
2. 修改站点标题、作者姓名、首页标题、页脚版权等。

### 编辑关于我

1. 点击左侧 **站点设置 > 关于我**。
2. 修改姓名、定位、个人简介、技能、联系方式、社交链接、头像、简历等。

---

## 五、发布流程

1. 在 CMS 中保存内容后，Decap CMS 会自动创建一个 Pull Request 或直接提交（取决于 `publish_mode`）。
2. GitHub Actions 检测到 `main` 分支更新后，自动构建并部署到 GitHub Pages。
3. 几分钟后，新内容即可上线。

---

## 六、常见问题

### 登录后白屏

- 检查 OAuth App 的 callback URL 是否正确。
- 检查 `VITE_SITE_URL` 和 `base_url` 是否一致。
- 打开浏览器开发者工具查看控制台报错。

### 图片上传后无法显示

- 检查 `media_folder` 是否为 `public/uploads`。
- 检查 `public_folder` 是否与 `VITE_BASE_URL` 一致。
- 如果是项目页，确保 `public_folder` 包含仓库名前缀，如 `/yourname-portfolio/uploads`。

### 修改后没有自动部署

- 检查 GitHub Actions 是否运行成功。
- 检查仓库 **Settings > Pages** 的 Source 是否选择 **GitHub Actions**。
- 检查 `main` 分支是否有新的提交。
