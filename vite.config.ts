import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    // 使用 node_modules 中的包，不配置任何外部源码别名
  },
  server: {
    port: 3000,
    open: true,
    fs: {
      // 允许访问项目根目录的父目录，以便访问 node_modules 中的包资源
      // 这解决了访问 chat-app-sdk 构建输出目录中图片资源的 403 错误
      allow: [
        // 项目根目录
        __dirname,
        // 父目录（frontend）
        resolve(__dirname, '..'),
        // 允许访问 packages 目录（chat-app-sdk 的构建输出）
        resolve(__dirname, '..', '..', 'packages'),
        // 允许访问 node_modules（如果需要）
        resolve(__dirname, '..', '..', 'node_modules'),
      ],
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
