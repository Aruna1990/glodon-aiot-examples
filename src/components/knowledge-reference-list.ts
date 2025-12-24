/*
 * Copyright 2025 coze-dev Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

interface KnowledgeResult {
  output: string;
  fileName: string;
  knowledgeName: string;
  fileUrl: string;
}

interface KnowledgeData {
  results: KnowledgeResult[];
}

interface WindowWithMarked extends Window {
  marked?: {
    parse: (
      text: string,
      options?: { breaks?: boolean; gfm?: boolean },
    ) => string;
  };
}

/**
 * KnowledgeReferenceList Web Component
 *
 * 独立的知识库参考来源列表组件，用于展示 cvforce.knowledge.refrence.v1 格式的知识库检索结果
 *
 * 数据格式：
 * {
 *   results: [
 *     {
 *       output: string,        // 文档内容/摘要（支持 Markdown）
 *       fileName: string,      // 文件名
 *       knowledgeName: string, // 知识库名称
 *       fileUrl: string        // 文件链接
 *     }
 *   ]
 * }
 *
 * 使用方式：
 * const knowledgeList = document.createElement('knowledge-reference-list');
 * knowledgeList.setData({ results: [...] });
 * document.body.appendChild(knowledgeList);
 */
export class KnowledgeReferenceList extends HTMLElement {
  private data?: KnowledgeData;
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('[KnowledgeReferenceList] connected');
    this.loadMarkedIfNeeded();
    this.render();
  }

  /**
   * 设置知识库参考数据
   * @param data 知识库参考数据对象
   */
  setData(data: KnowledgeData): void {
    this.data = data;
    this.render();
  }

  /**
   * 动态加载 marked.js 库
   */
  private loadMarkedIfNeeded(): void {
    const win = window as WindowWithMarked;
    if (typeof win.marked !== 'undefined') {
      return; // 已经加载
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = (): void => {
      console.log('[KnowledgeReferenceList] marked.js loaded');
      this.render(); // 重新渲染以应用 Markdown
    };
    document.head.appendChild(script);
  }

  /**
   * Markdown 渲染函数
   * @param text Markdown 文本
   * @returns 渲染后的 HTML 字符串
   */
  private renderMarkdown(text: string): string {
    if (!text) {
      return '';
    }

    const win = window as WindowWithMarked;
    const { marked } = win;
    if (typeof marked !== 'undefined' && marked.parse) {
      try {
        return marked.parse(text, { breaks: true, gfm: true });
      } catch (error) {
        console.error('Markdown parse error:', error);
        return this.escapeHtml(text).replace(/\n/g, '<br>');
      }
    }
    // Fallback: 简单的文本处理
    return this.escapeHtml(text).replace(/\n/g, '<br>');
  }

  /**
   * HTML 转义，防止 XSS
   * @param text 需要转义的文本
   * @returns 转义后的文本
   */
  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * 渲染组件
   */
  render(): void {
    if (!this.shadowRoot) {
      return;
    }

    const data = this.data || { results: [] };
    const results = data.results || [];
    const totalCount = results.length;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .knowledge-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          color: #333;
          background: #f5f5f5;
          border-radius: 8px;
          padding: 12px;
          margin: 8px 0;
        }
        .header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
          font-size: 15px;
          font-weight: 500;
        }
        .header-icon {
          font-size: 18px;
        }
        .items-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .item-card {
          background: #fff;
          border-radius: 6px;
          overflow: hidden;
          border: 1px solid #e8e8e8;
        }
        .item-header {
          display: flex;
          align-items: center;
          padding: 12px;
          cursor: pointer;
          gap: 12px;
          user-select: none;
          transition: background 0.2s;
        }
        .item-header:hover {
          background: #fafafa;
        }
        .expand-icon {
          font-size: 16px;
          transition: transform 0.2s;
          width: 20px;
          text-align: center;
        }
        .expand-icon.expanded {
          transform: rotate(90deg);
        }
        .item-index {
          font-weight: 500;
          color: #666;
          min-width: 24px;
        }
        .item-title {
          flex: 1;
          font-weight: 500;
        }
        .item-icon {
          font-size: 20px;
          color: #8b5cf6;
        }
        .item-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .item-content.expanded {
          max-height: 1000px;
        }
        .item-details {
          padding: 12px 16px 16px 60px;
          border-top: 1px solid #f0f0f0;
          background: #fafafa;
          font-size: 13px;
          line-height: 1.6;
          color: #666;
        }
        .item-output {
          margin-bottom: 8px;
        }
        /* Markdown 样式 */
        .item-output h1, .item-output h2, .item-output h3,
        .item-output h4, .item-output h5, .item-output h6 {
          margin: 0.8em 0 0.4em 0;
          font-weight: 600;
          line-height: 1.4;
          color: #333;
        }
        .item-output h1 { font-size: 1.6em; border-bottom: 2px solid #eee; padding-bottom: 0.3em; }
        .item-output h2 { font-size: 1.4em; border-bottom: 1px solid #eee; padding-bottom: 0.3em; }
        .item-output h3 { font-size: 1.2em; }
        .item-output h4 { font-size: 1.1em; }
        .item-output h5 { font-size: 1em; }
        .item-output h6 { font-size: 0.9em; color: #666; }
        .item-output p {
          margin: 0.6em 0;
          line-height: 1.7;
        }
        .item-output ul, .item-output ol {
          margin: 0.6em 0;
          padding-left: 2em;
        }
        .item-output li {
          margin: 0.3em 0;
          line-height: 1.6;
        }
        .item-output code {
          background: #f0f0f0;
          color: #e83e8c;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', 'Consolas', monospace;
          font-size: 0.9em;
        }
        .item-output pre {
          background: #f6f8fa;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
          margin: 0.8em 0;
          border: 1px solid #e1e4e8;
        }
        .item-output pre code {
          background: none;
          color: #333;
          padding: 0;
          border-radius: 0;
        }
        .item-output blockquote {
          border-left: 4px solid #dfe2e5;
          margin: 0.8em 0;
          padding: 0.5em 1em;
          color: #6a737d;
          background: #f6f8fa;
          border-radius: 0 4px 4px 0;
        }
        .item-output blockquote p {
          margin: 0.3em 0;
        }
        .item-output a {
          color: #1890ff;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .item-output a:hover {
          border-bottom-color: #1890ff;
        }
        .item-output img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 0.5em 0;
        }
        .item-output table {
          border-collapse: collapse;
          width: 100%;
          margin: 0.8em 0;
          font-size: 0.95em;
        }
        .item-output table th,
        .item-output table td {
          border: 1px solid #dfe2e5;
          padding: 8px 12px;
          text-align: left;
        }
        .item-output table th {
          background: #f6f8fa;
          font-weight: 600;
        }
        .item-output table tr:nth-child(even) {
          background: #f9f9f9;
        }
        .item-output hr {
          border: none;
          border-top: 2px solid #eee;
          margin: 1.5em 0;
        }
        .item-output strong {
          font-weight: 600;
          color: #333;
        }
        .item-output em {
          font-style: italic;
          color: #555;
        }
        .item-source {
          font-size: 12px;
          color: #999;
          margin-top: 12px;
          padding-top: 8px;
          border-top: 1px solid #eee;
        }
        .item-link {
          margin-top: 8px;
        }
        .item-link a {
          color: #1890ff;
          text-decoration: none;
          font-size: 12px;
        }
        .item-link a:hover {
          text-decoration: underline;
        }
      </style>
      <div class="knowledge-container">
        <div class="header">
          <span class="header-icon">📚</span>
          <span>参考来源 (共 ${totalCount} 项)</span>
        </div>
        <div class="items-container">
          ${results
            .map((result: KnowledgeResult, index: number) => {
              const isFirstItem = index === 0;
              return `
            <div class="item-card">
              <div class="item-header" onclick="this.parentElement.querySelector('.item-content').classList.toggle('expanded'); this.querySelector('.expand-icon').classList.toggle('expanded');">
                <span class="expand-icon ${isFirstItem ? 'expanded' : ''}">▶</span>
                <span class="item-index">${index + 1}.</span>
                <span class="item-title">${
                  result.knowledgeName ? `${result.knowledgeName} - ` : ''
                }${result.fileName || `文档 ${index + 1}`}</span>
                ${
                  result.fileUrl
                    ? `<a href="${result.fileUrl}" target="_blank" rel="noopener noreferrer">
                         下载原文
                        </a>`
                    : ''
                }
              </div>
              <div class="item-content ${isFirstItem ? 'expanded' : ''}">
                <div class="item-details">
                  ${
                    result.output
                      ? `<div class="item-output">${this.renderMarkdown(result.output)}</div>`
                      : ''
                  }
                </div>
              </div>
            </div>
          `;
            })
            .join('')}
        </div>
      </div>
    `;
  }
}
