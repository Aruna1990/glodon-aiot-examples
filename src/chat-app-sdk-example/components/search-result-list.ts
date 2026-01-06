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
  private drawerElement: HTMLElement | null = null;
  private maskElement: HTMLElement | null = null;
  private styleElement: HTMLStyleElement | null = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('[SearchResultList] connected');
    this.createDrawer();
    this.render();
  }

  disconnectedCallback() {
    console.log('[SearchResultList] disconnected');
    this.removeDrawer();
  }

  /**
   * 创建抽屉元素并添加到 body
   */
  private createDrawer() {
    // 创建样式元素
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.id = 'search-result-list-drawer-styles';
      document.head.appendChild(this.styleElement);
    }

    // 创建遮罩层
    if (!this.maskElement) {
      this.maskElement = document.createElement('div');
      this.maskElement.className = 'search-result-list-drawer-mask';
      this.maskElement.setAttribute(
        'data-component-id',
        this.getAttribute('data-id') || '',
      );
      document.body.appendChild(this.maskElement);
    }

    // 创建抽屉元素
    if (!this.drawerElement) {
      this.drawerElement = document.createElement('div');
      this.drawerElement.className = 'search-result-list-drawer';
      this.drawerElement.setAttribute(
        'data-component-id',
        this.getAttribute('data-id') || '',
      );
      document.body.appendChild(this.drawerElement);
    }
  }

  /**
   * 移除抽屉元素
   */
  private removeDrawer() {
    if (this.drawerElement && this.drawerElement.parentNode) {
      this.drawerElement.parentNode.removeChild(this.drawerElement);
      this.drawerElement = null;
    }
    if (this.maskElement && this.maskElement.parentNode) {
      this.maskElement.parentNode.removeChild(this.maskElement);
      this.maskElement = null;
    }
    if (this.styleElement && this.styleElement.parentNode) {
      this.styleElement.parentNode.removeChild(this.styleElement);
      this.styleElement = null;
    }
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
   * 打开抽屉
   */
  private openDrawer() {
    if (this.drawerElement) {
      this.drawerElement.classList.add('drawer-open');
    }
    if (this.maskElement) {
      this.maskElement.classList.add('mask-visible');
    }
  }

  /**
   * 关闭抽屉
   */
  private closeDrawer() {
    if (this.drawerElement) {
      this.drawerElement.classList.remove('drawer-open');
    }
    if (this.maskElement) {
      this.maskElement.classList.remove('mask-visible');
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

    // 链接图标 SVG（紫色）
    const linkIconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M7.05 9.35C6.9 9.35 6.8 9.3 6.7 9.2C6.1 8.6 5.75 7.8 5.75 6.95C5.75 6.1 6.1 5.3 6.7 4.7L9.55 1.85C10.15 1.25 10.95 0.9 11.8 0.9C12.65 0.9 13.45 1.25 14.05 1.85C15.3 3.1 15.3 5.1 14.05 6.35L12.75 7.65C12.55 7.85 12.25 7.85 12.05 7.65C11.85 7.45 11.85 7.15 12.05 6.95L13.35 5.65C14.2 4.8 14.2 3.4 13.35 2.55C12.95 2.15 12.4 1.9 11.8 1.9C11.2 1.9 10.65 2.15 10.25 2.55L7.4 5.4C7 5.8 6.75 6.35 6.75 6.95C6.75 7.55 7 8.1 7.4 8.5C7.6 8.7 7.6 9 7.4 9.2C7.3 9.3 7.2 9.35 7.05 9.35Z" fill="#B752EA"/>
        <path d="M4.2 14.9C3.4 14.9 2.55 14.6 1.95 13.95C1.35 13.35 1 12.55 1 11.7C1 10.85 1.35 10.05 1.95 9.45L3.25 8.15C3.45 7.95 3.75 7.95 3.95 8.15C4.15 8.35 4.15 8.65 3.95 8.85L2.65 10.15C2.25 10.55 2 11.1 2 11.7C2 12.3 2.25 12.85 2.65 13.25C3.5 14.1 4.9 14.1 5.75 13.25L8.6 10.4C9 10 9.25 9.45 9.25 8.85C9.25 8.25 9 7.7 8.6 7.3C8.4 7.1 8.4 6.8 8.6 6.6C8.8 6.4 9.1 6.4 9.3 6.6C9.9 7.2 10.25 8 10.25 8.85C10.25 9.7 9.9 10.5 9.3 11.1L6.45 13.95C5.85 14.55 5 14.9 4.2 14.9Z" fill="#B752EA"/>
      </svg>
    `;

    // 渲染按钮到 shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .search-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: transparent;
          border: none;
          cursor: pointer;
          user-select: none;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .link-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button-text {
          font-size: 14px;
          color: #B752EA;
          font-weight: 400;
        }
      </style>
      <div class="search-button" id="search-button">
        <div class="link-icon">${linkIconSvg}</div>
        <span class="button-text">共${totalCount}个参考来源</span>
      </div>
    `;

    // 渲染抽屉样式到 document.head
    if (this.styleElement) {
      this.styleElement.textContent = `
        .search-result-list-drawer-mask {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: transparent;
          z-index: 2147483646;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .search-result-list-drawer-mask.mask-visible {
          opacity: 1;
          visibility: visible;
        }
        .search-result-list-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 480px;
          max-width: 90vw;
          background: #ffffff;
          box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
          z-index: 2147483647;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        .search-result-list-drawer.drawer-open {
          transform: translateX(0);
        }
        .search-result-list-drawer .drawer-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
          flex-shrink: 0;
          background: #ffffff;
        }
        .search-result-list-drawer .drawer-title {
          font-size: 16px;
          font-weight: 500;
          color: #333;
        }
        .search-result-list-drawer .drawer-close {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
          color: #999;
          font-size: 20px;
          line-height: 1;
          border: none;
          background: transparent;
          padding: 0;
        }
        .search-result-list-drawer .drawer-close:hover {
          background-color: #f5f5f5;
          color: #666;
        }
        .search-result-list-drawer .drawer-content {
          flex: 1;
          overflow-y: auto;
          padding: 0 16px;
        }
        .search-result-list-drawer .result-item {
          padding: 16px 20px;
          border-bottom: 1px solid #f0f0f0;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .search-result-list-drawer .result-item:hover {
          background-color: #fafafa;
        }
        .search-result-list-drawer .result-item:last-child {
          border-bottom: none;
        }
        .search-result-list-drawer .result-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
          margin-top: 2px;
          border-radius: 2px;
          object-fit: contain;
        }
        .search-result-list-drawer .result-icon-placeholder {
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
        .search-result-list-drawer .result-content {
          flex: 1;
          min-width: 0;
        }
        .search-result-list-drawer .result-header {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 6px;
        }
        .search-result-list-drawer .result-index {
          font-weight: 600;
          color: #666;
          flex-shrink: 0;
        }
        .search-result-list-drawer .result-title {
          font-size: 15px;
          font-weight: 500;
          color: #1890ff;
          line-height: 1.4;
          word-break: break-word;
          flex: 1;
        }
        .search-result-list-drawer .result-date {
          font-size: 12px;
          color: #999;
          flex-shrink: 0;
        }
        .search-result-list-drawer .result-snippet {
          font-size: 13px;
          color: #666;
          line-height: 1.6;
          word-break: break-word;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `;
    }

    // 渲染抽屉内容到 document.body
    if (this.drawerElement) {
      this.drawerElement.innerHTML = `
        <div class="drawer-header">
          <div class="drawer-title">参考来源</div>
          <button class="drawer-close" id="drawer-close" aria-label="关闭">×</button>
        </div>
        <div class="drawer-content">
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
      `;
    }

    // 绑定事件
    const button = this.shadowRoot.querySelector('#search-button');
    if (button) {
      button.addEventListener('click', () => this.openDrawer());
    }

    const closeBtn = this.drawerElement?.querySelector('#drawer-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeDrawer());
    }

    // 绑定遮罩层点击事件
    if (this.maskElement) {
      this.maskElement.addEventListener('click', () => this.closeDrawer());
    }
  }
}
