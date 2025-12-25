import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    // 自定义插件：重写 SDK 内部的 @/ 别名
    // 使用 enforce: 'pre' 确保在其他解析器之前运行
    {
      name: 'resolve-sdk-aliases',
      enforce: 'pre', // 在其他插件之前运行
      resolveId(source, importer) {
        // 如果是从 SDK 文件导入的 @/ 路径，重写为 SDK 的相对路径
        if (source.startsWith('@/') && importer) {
          // SDK 的 src 目录绝对路径（现在是兄弟目录）
          const sdkSrcPath = path.resolve(__dirname, '../chat-app-sdk/src');

          // 将 importer 解析为绝对路径
          let importerPath: string;
          if (path.isAbsolute(importer)) {
            importerPath = importer;
          } else {
            // importer 可能是相对路径，尝试多种解析方式
            importerPath = path.resolve(process.cwd(), importer);
            if (!fs.existsSync(importerPath)) {
              const sdkDir = path.resolve(__dirname, '../chat-app-sdk');
              importerPath = path.resolve(sdkDir, importer);
            }
            if (!fs.existsSync(importerPath)) {
              importerPath = path.resolve(__dirname, importer);
            }
            if (!fs.existsSync(importerPath) && importer.startsWith('../')) {
              importerPath = path.resolve(sdkSrcPath, '..', importer);
            }
          }

          // 规范化路径
          const normalizedImporter = path.normalize(importerPath);
          const normalizedSdkPath = path.normalize(sdkSrcPath);

          // 检查 importer 是否来自 SDK 的 src 目录
          const isFromSDK = normalizedImporter.includes('chat-app-sdk/src') ||
                           normalizedImporter.startsWith(normalizedSdkPath);

          if (isFromSDK) {
            const relativePath = source.replace('@/', '');
            const resolvedPath = path.resolve(sdkSrcPath, relativePath);

            // 首先尝试作为文件（带扩展名）
            const fileExtensions = ['.ts', '.tsx', '.js', '.jsx'];
            for (const ext of fileExtensions) {
              const fullPath = resolvedPath + ext;
              if (fs.existsSync(fullPath)) {
                return fullPath;
              }
            }

            // 如果作为文件不存在，尝试作为目录（查找 index 文件）
            if (fs.existsSync(resolvedPath)) {
              const stat = fs.statSync(resolvedPath);
              if (stat.isDirectory()) {
                const indexExtensions = ['/index.ts', '/index.tsx', '/index.js', '/index.jsx'];
                for (const ext of indexExtensions) {
                  const fullPath = resolvedPath + ext;
                  if (fs.existsSync(fullPath)) {
                    return fullPath;
                  }
                }
              }
            }

            // 如果找不到文件，返回路径让 Vite 继续处理
            return resolvedPath;
          }
        }
        return null;
      },
    },
  ],
  resolve: {
    alias: {
      // SDK 包别名（现在是兄弟目录）
      '@glodon-aiot/chat-app-sdk': path.resolve(__dirname, '../chat-app-sdk/src/index.ts'),
      // @coze-studio/open-chat 别名
      '@coze-studio/open-chat/types': path.resolve(__dirname, '../../open-chat/src/exports/types.ts'),
      '@coze-studio/open-chat/envs': path.resolve(__dirname, '../../open-chat/src/util/env.ts'),
      // 注意：不在这里配置 @/ alias，让插件处理
      // 示例项目如果需要使用 @/，应该使用相对路径或完整的别名
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
