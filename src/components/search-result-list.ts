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

/**
 * SearchResultList Web Component
 *
 * 独立的搜索结果列表组件，用于展示 cvforce.search.result.v1 格式的搜索结果
 *
 * 数据格式：
 * {
 *   results: [
 *     {
 *       title: string,       // 标题
 *       snippet: string,     // 摘要/简介
 *       link: string,        // 链接
 *       datePublished: string, // 发布日期
 *       icon?: string        // 网站图标（可选）
 *     }
 *   ]
 * }
 *
 * 使用方式：
 * const searchList = document.createElement('search-result-list');
 * searchList.setData({ results: [...] });
 * document.body.appendChild(searchList);
 */
export class SearchResultList extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('[SearchResultList] connected');
    this.render();
  }

  /**
   * 设置搜索结果数据
   * @param data 搜索结果数据对象
   */
  setData(data: unknown) {
    (this as Record<string, unknown>).data = data;
    this.render();
  }

  /**
   * 获取网站图标 URL
   * @param link 网站链接
   * @param providedIcon 提供的图标 URL（可选）
   * @returns 图标 URL
   */
  private getFaviconUrl(link: string, providedIcon?: string): string {
    if (providedIcon) {
      return providedIcon;
    }

    try {
      const urlObj = new URL(link);
      return `${urlObj.origin}/favicon.ico`;
    } catch (error) {
      console.warn('[SearchResultList] Failed to parse URL:', error);
      return '';
    }
  }

  /**
   * 格式化日期为 YYYY-MM-DD 格式
   * @param dateStr 日期字符串
   * @returns 格式化后的日期字符串
   */
  private formatDate(dateStr: string): string {
    if (!dateStr) {
      return '';
    }
    try {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.warn('[SearchResultList] Failed to format date:', error);
      return dateStr;
    }
  }

  /**
   * 渲染组件
   */
  render() {
    if (!this.shadowRoot) {
      return;
    }

    const data = ((this as Record<string, unknown>).data || {}) as {
      results?: Array<{
        title?: string;
        snippet?: string;
        link?: string;
        datePublished?: string;
        icon?: string;
      }>;
    };
    const results = data.results || [];
    const totalCount = results.length;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .search-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        .search-header {
          display: flex;
          align-items: center;
          padding: 12px 16px;
          background: #f5f5f5;
          border-bottom: 1px solid #e8e8e8;
          cursor: pointer;
          user-select: none;
        }
        .search-header:hover {
          background: #f0f0f0;
        }
        .check-icon {
          width: 20px;
          height: 20px;
          background: #52c41a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 14px;
          margin-right: 12px;
          flex-shrink: 0;
        }
        .header-title {
          flex: 1;
          font-size: 14px;
          color: #333;
        }
        .expand-icon {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 18px;
          transition: transform 0.3s;
          flex-shrink: 0;
        }
        .search-header.collapsed .expand-icon {
          transform: rotate(-90deg);
        }
        .search-content {
          max-height: 10000px;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .search-content.collapsed {
          max-height: 0;
        }
        .result-item {
          padding: 16px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .result-item:hover {
          background-color: #fafafa;
        }
        .result-item:last-child {
          border-bottom: none;
        }
        .result-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
          border-radius: 2px;
          object-fit: contain;
        }
        .result-icon-placeholder {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
          background: #e8e8e8;
          border-radius: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #999;
        }
        .result-content {
          flex: 1;
          min-width: 0;
        }
        .result-header {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 6px;
        }
        .result-index {
          font-weight: 600;
          color: #666;
          flex-shrink: 0;
        }
        .result-title {
          font-size: 15px;
          font-weight: 500;
          color: #1890ff;
          line-height: 1.4;
          word-break: break-word;
          flex: 1;
        }
        .result-date {
          font-size: 12px;
          color: #999;
          flex-shrink: 0;
        }
        .result-snippet {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      </style>
      <div class="search-container">
        <div class="search-header" onclick="this.classList.toggle('collapsed'); this.nextElementSibling.classList.toggle('collapsed')">
          <div class="check-icon">✓</div>
          <div class="header-title">已搜索到${totalCount}个网页</div>
          <div class="expand-icon">∨</div>
        </div>
        <div class="search-content">
          ${results
            .map((result, index) => {
              const iconUrl = this.getFaviconUrl(
                result.link || '',
                result.icon,
              );
              return `
            <div class="result-item" onclick="window.open('${result.link || '#'}', '_blank')">
              ${
                iconUrl
                  ? `<img src="${iconUrl}" class="result-icon" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                     <div class="result-icon-placeholder" style="display: none;">🌐</div>`
                  : '<div class="result-icon-placeholder">🌐</div>'
              }
              <div class="result-content">
                <div class="result-header">
                  <span class="result-index">${index + 1}.</span>
                  <span class="result-title">${result.title || '无标题'}</span>
                  ${result.datePublished ? `<span class="result-date">${this.formatDate(result.datePublished)}</span>` : ''}
                </div>
                ${result.snippet ? `<div class="result-snippet">${result.snippet}</div>` : ''}
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

