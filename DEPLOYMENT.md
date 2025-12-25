# GitHub Pages 部署指南

本项目已配置自动部署到 GitHub Pages。

## 🚀 快速开始

### 1. 启用 GitHub Pages

1. 进入你的 GitHub 仓库：https://github.com/Aruna1990/glodon-aiot-examples
2. 点击 **Settings** → **Pages**
3. 在 **Source** 部分，选择 **GitHub Actions**
4. 保存设置

### 2. 推送代码

将配置更改推送到 `main` 分支：

```bash
git add .
git commit -m "chore: configure GitHub Pages deployment"
git push origin main
```

### 3. 查看部署状态

1. 进入仓库的 **Actions** 标签页
2. 查看 "Deploy to GitHub Pages" 工作流
3. 等待部署完成（通常需要 2-3 分钟）

### 4. 访问网站

部署成功后，你的网站将在以下地址可用：

**https://aruna1990.github.io/glodon-aiot-examples/**

## 📝 配置说明

### Vite 配置

项目已配置 `base: '/glodon-aiot-examples/'`，这是 GitHub Pages 部署所需的路径前缀。

如果你的仓库名不同，需要修改 `vite.config.ts` 中的 `base` 配置：

```typescript
base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
```

### GitHub Actions 工作流

`.github/workflows/deploy.yml` 文件配置了自动部署流程：

- **触发条件**：推送到 `main` 分支
- **构建步骤**：安装依赖 → 构建项目 → 上传构建产物
- **部署步骤**：自动部署到 GitHub Pages

## 🔧 故障排除

### 部署失败

1. 检查 GitHub Actions 日志中的错误信息
2. 确保 `package.json` 中的构建脚本正确
3. 确保所有依赖都已正确安装

### 页面 404

1. 检查 `vite.config.ts` 中的 `base` 路径是否正确
2. 确保仓库名与 `base` 路径匹配
3. 清除浏览器缓存后重试

### 资源加载失败

1. 检查构建后的 `dist` 目录结构
2. 确保所有资源路径使用相对路径
3. 检查浏览器控制台的错误信息

## 📚 相关资源

- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

