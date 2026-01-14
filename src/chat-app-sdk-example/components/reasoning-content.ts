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

interface ReasoningContentData {
  reasoning_content?: string; // Markdown 格式的推理内容
  status?: 'thinking' | 'completed'; // 状态：思考中或已完成
  [key: string]: unknown; // 允许其他字段
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
 * ReasoningContent Web Component
 *
 * 独立的推理内容组件，用于展示 app.llm.reasoningcontent.v1 格式的推理内容
 *
 * 数据格式：
 * {
 *   reasoning_content: string  // Markdown 格式的推理内容
 * }
 *
 * 使用方式：
 * const reasoningContent = document.createElement('reasoning-content');
 * reasoningContent.setData({ reasoning_content: '...' });
 * document.body.appendChild(reasoningContent);
 */
export class ReasoningContent extends HTMLElement {
  private data?: ReasoningContentData;
  private isExpanded: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('[ReasoningContent] connected');
    this.loadMarkedIfNeeded();
    this.render();
  }

  /**
   * 设置推理内容数据
   * @param data 推理内容数据对象
   */
  setData(data: ReasoningContentData): void {
    this.data = data;

    // 根据状态设置展开/收起
    // 默认展开，只有在明确是 completed 状态时才收起
    if (this.data.status === 'completed') {
      // 完成后强制收起
      this.isExpanded = false;
    } else {
      // 思考中或没有明确状态时，默认展开
      this.isExpanded = true;
    }

    this.render();
  }

  /**
   * 切换展开/收起状态
   */
  private toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
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
      console.log('[ReasoningContent] marked.js loaded');
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

    const data = this.data || {};
    // 读取 reasoning_content 字段
    const content =
      data.reasoning_content || (typeof data === 'string' ? data : '') || '';

    // 判断状态
    const status = data.status || (content ? 'completed' : 'thinking');
    const isThinking = status === 'thinking';
    const title = isThinking ? '思考中' : '深度思考完成';

    // 思考图标 SVG（使用 ThinkingIcon.svg）
    const thinkingIconSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="none" version="1.1" width="16" height="16" viewBox="0 0 15.622950553894043 15.629634857177734">
        <path d="M10.063607,0.51903856C10.965201,0.17335904,11.847365,-0.019344091,12.645576,0.0015385151C13.449177,0.022585273,14.211997,0.2639215,14.780591,0.83251512C15.349162,1.4010855,15.590521,2.163929,15.611569,2.9675074C15.632452,3.7657185,15.439725,4.647882,15.094068,5.5494761C14.815513,6.2760153,14.429146,7.0370541,13.947247,7.8069062C14.433741,8.5821247,14.823435,9.3486481,15.103912,10.080156C15.449567,10.98175,15.642294,11.863914,15.621411,12.662125C15.600366,13.465727,15.35903,14.228546,14.790459,14.79714C14.221865,15.36571,13.459044,15.607048,12.655443,15.628094C11.857233,15.649,10.975069,15.456296,10.073475,15.110617C9.3413353,14.829906,8.5740843,14.439766,7.7981863,13.952663C7.0313115,14.432032,6.2732725,14.816547,5.5494757,15.094046C4.647882,15.439702,3.7657177,15.632429,2.9675066,15.611547C2.1639283,15.5905,1.4010848,15.34914,0.83249116,14.780569C0.26394439,14.211975,0.022584915,13.449179,0.0015381575,12.645576C-0.019344807,11.847366,0.17338192,10.965202,0.5190382,10.063608C0.79752266,9.3373032,1.1836789,8.576498,1.6653664,7.8069291C1.1882726,7.0427265,0.80544448,6.2873592,0.52888191,5.5660229C0.18322563,4.6644297,-0.0094774961,3.7822652,0.011405468,2.9840541C0.032452226,2.1804757,0.27378845,1.4176322,0.84235847,0.84906185C1.4109521,0.28046823,2.1737723,0.039132357,2.9773743,0.018108845C3.7755854,-0.0027973652,4.6577492,0.18992901,5.5593433,0.53560889C6.2800465,0.81191361,7.034687,1.1943197,7.7982111,1.6708041C8.5707569,1.1865853,9.3345633,0.79855406,10.063607,0.51903856ZM13.007732,9.1593208C12.476944,9.8538914,11.874413,10.543399,11.208905,11.208906C10.540889,11.876922,9.8486385,12.481468,9.1513977,13.013733C9.6553984,13.2985,10.145266,13.531656,10.610476,13.710014C11.394671,14.010672,12.075062,14.142765,12.616187,14.128586C13.151922,14.114569,13.50529,13.960983,13.729797,13.736477C13.954282,13.511969,14.107913,13.158602,14.121929,12.622868C14.136108,12.081742,14.003992,11.401352,13.703336,10.617133C13.525117,10.152321,13.292195,9.6628742,13.007732,9.1593208ZM2.6044829,9.1617813C2.3248973,9.6586561,2.0955613,10.141655,1.9195926,10.600609C1.6189363,11.384804,1.4868425,12.065195,1.5010225,12.606321C1.5150615,13.142055,1.6686709,13.495399,1.8931553,13.719907C2.1176634,13.944391,2.4710305,14.098024,3.0067649,14.11204C3.5478902,14.126219,4.228281,13.994125,5.012476,13.69347C5.4699755,13.518063,5.9512882,13.289618,6.4464755,13.011251C5.7576704,12.483625,5.0740929,11.885477,4.4140453,11.225431C3.7440612,10.555447,3.1378734,9.8611336,2.6044829,9.1617813ZM7.7998734,3.4751873C7.02074,4.0324373,6.230545,4.6991401,5.4648418,5.4648438C4.6965137,6.2331948,4.0278416,7.0261559,3.4694438,7.8079133C4.0298347,8.5941238,4.7018347,9.3919373,5.4747095,10.164788C6.2371788,10.92728,7.0239286,11.591569,7.7998734,12.147367C8.5833187,11.588219,9.3781776,10.918304,10.148241,10.148241C10.915679,9.3808041,11.583648,8.5887566,12.141646,7.8079133C11.585639,7.0315228,10.920999,6.2443042,10.158084,5.4813895C9.3847866,4.7080927,8.5865059,4.0357647,7.7998734,3.4751873ZM7.8079586,5.7731638C8.9317627,5.7731638,9.842802,6.6842031,9.842802,7.8080306C9.842802,8.9318352,8.9317636,9.8428745,7.8079586,9.8428745C6.6841297,9.8428745,5.7730913,8.9318361,5.7730913,7.8080306C5.7730913,6.6842022,6.6841307,5.7731638,7.8079586,5.7731638ZM7.8079586,7.2731638C7.5125756,7.2731638,7.2730913,7.5126476,7.2730913,7.8080306C7.2730913,8.1034145,7.5125527,8.3428745,7.8079586,8.3428745C8.1033421,8.3428745,8.342802,8.1034145,8.342802,7.8080306C8.342802,7.5126243,8.1033421,7.2731638,7.8079586,7.2731638ZM12.606317,1.5010232C12.065191,1.4868668,11.384778,1.6189606,10.600583,1.9196169C10.138888,2.0966406,9.6528645,2.3276403,9.1528482,2.6094997C9.8529491,3.1433122,10.548036,3.750015,11.218747,4.4207258C11.879498,5.0814757,12.478209,5.765851,13.00623,6.4554062C13.286871,5.957078,13.517003,5.4727182,13.693465,5.0124764C13.994122,4.2282815,14.126215,3.5478673,14.112036,3.006742C14.09802,2.4710076,13.944411,2.1176405,13.719927,1.8931324C13.49542,1.668648,13.142052,1.5150622,12.606317,1.5010232ZM5.0223408,1.9361401C4.2381458,1.6354837,3.5577543,1.5034136,3.0166297,1.5175699C2.4808953,1.5316089,2.1275282,1.6852183,1.9030201,1.9097028C1.6785357,2.1342108,1.5249263,2.4875779,1.5109109,3.0233123C1.4967313,3.5644376,1.6288251,4.2448282,1.929481,5.0290232C2.1036923,5.4833822,2.3302152,5.9612732,2.6059813,6.4528751C3.1366296,5.7586088,3.73895,5.0694065,4.4041767,4.4041796C5.0668955,3.7414842,5.753356,3.1411793,6.4449735,2.6120074C5.9537935,2.3365231,5.476325,2.1102104,5.0223408,1.9361401Z" fill="#161616" fill-opacity="1"/>
      </svg>
    `;

    // 向下箭头图标 SVG
    const chevronDownSvg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 4L6 8L10 4" stroke="#666" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    this.shadowRoot.innerHTML = `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .reasoning-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          font-size: 14px;
          color: #333;
          background: #ffffff;
          border-radius: 8px;
          padding: 0;
          margin: 8px 0;
          border: 1px solid #e0e0e0;
          overflow: hidden;
        }
        .reasoning-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          cursor: pointer;
          user-select: none;
          transition: background-color 0.2s;
        }
        .reasoning-header:hover {
          background-color: #f5f5f5;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 8px;
          flex: 1;
        }
        .header-icon {
          width: 16px;
          height: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .header-title {
          font-size: 14px;
          font-weight: 500;
          color: #333;
        }
        .header-chevron {
          width: 12px;
          height: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .header-chevron.expanded {
          transform: rotate(180deg);
        }
        .reasoning-content-wrapper {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        .reasoning-content-wrapper.expanded {
          max-height: 2000px;
        }
        .reasoning-content {
          padding: 0 16px 16px 40px;
          line-height: 1.7;
          color: #666;
          font-size: 14px;
        }
        /* Markdown 样式 */
        .reasoning-content h1,
        .reasoning-content h2,
        .reasoning-content h3,
        .reasoning-content h4,
        .reasoning-content h5,
        .reasoning-content h6 {
          margin: 1em 0 0.5em 0;
          font-weight: 600;
          line-height: 1.4;
          color: #333;
        }
        .reasoning-content h1:first-child,
        .reasoning-content h2:first-child,
        .reasoning-content h3:first-child,
        .reasoning-content h4:first-child,
        .reasoning-content h5:first-child,
        .reasoning-content h6:first-child {
          margin-top: 0;
        }
        .reasoning-content h1 {
          font-size: 1.8em;
          border-bottom: 2px solid #eee;
          padding-bottom: 0.3em;
        }
        .reasoning-content h2 {
          font-size: 1.5em;
          border-bottom: 1px solid #eee;
          padding-bottom: 0.3em;
        }
        .reasoning-content h3 {
          font-size: 1.3em;
        }
        .reasoning-content h4 {
          font-size: 1.1em;
        }
        .reasoning-content h5 {
          font-size: 1em;
        }
        .reasoning-content h6 {
          font-size: 0.9em;
          color: #666;
        }
        .reasoning-content p {
          margin: 0.8em 0;
          line-height: 1.7;
        }
        .reasoning-content p:first-child {
          margin-top: 0;
        }
        .reasoning-content p:last-child {
          margin-bottom: 0;
        }
        .reasoning-content ul,
        .reasoning-content ol {
          margin: 0.8em 0;
          padding-left: 2em;
        }
        .reasoning-content li {
          margin: 0.4em 0;
          line-height: 1.6;
        }
        .reasoning-content code {
          background: #f0f0f0;
          color: #e83e8c;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: 'Courier New', 'Consolas', 'Monaco', monospace;
          font-size: 0.9em;
        }
        .reasoning-content pre {
          background: #f6f8fa;
          padding: 12px;
          border-radius: 6px;
          overflow-x: auto;
          margin: 1em 0;
          border: 1px solid #e1e4e8;
        }
        .reasoning-content pre code {
          background: none;
          color: #333;
          padding: 0;
          border-radius: 0;
          font-size: 0.9em;
        }
        .reasoning-content blockquote {
          border-left: 4px solid #dfe2e5;
          margin: 1em 0;
          padding: 0.5em 1em;
          color: #6a737d;
          background: #f6f8fa;
          border-radius: 0 4px 4px 0;
        }
        .reasoning-content blockquote p {
          margin: 0.3em 0;
        }
        .reasoning-content a {
          color: #1890ff;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s;
        }
        .reasoning-content a:hover {
          border-bottom-color: #1890ff;
        }
        .reasoning-content img {
          max-width: 100%;
          height: auto;
          border-radius: 4px;
          margin: 0.8em 0;
        }
        .reasoning-content table {
          border-collapse: collapse;
          width: 100%;
          margin: 1em 0;
          font-size: 0.95em;
        }
        .reasoning-content table th,
        .reasoning-content table td {
          border: 1px solid #dfe2e5;
          padding: 8px 12px;
          text-align: left;
        }
        .reasoning-content table th {
          background: #f6f8fa;
          font-weight: 600;
        }
        .reasoning-content table tr:nth-child(even) {
          background: #f9f9f9;
        }
        .reasoning-content hr {
          border: none;
          border-top: 2px solid #eee;
          margin: 1.5em 0;
        }
        .reasoning-content strong {
          font-weight: 600;
          color: #333;
        }
        .reasoning-content em {
          font-style: italic;
          color: #555;
        }
        .reasoning-content > *:first-child {
          margin-top: 0;
        }
        .reasoning-content > *:last-child {
          margin-bottom: 0;
        }
      </style>
      <div class="reasoning-container">
        <div class="reasoning-header" id="reasoning-header">
          <div class="header-left">
            <div class="header-icon">${thinkingIconSvg}</div>
            <span class="header-title">${title}</span>
          </div>
          <div class="header-chevron ${this.isExpanded ? 'expanded' : ''}">${chevronDownSvg}</div>
        </div>
        <div class="reasoning-content-wrapper ${this.isExpanded ? 'expanded' : ''}">
          <div class="reasoning-content">
            ${content ? this.renderMarkdown(content) : '<p style="color: #999;">暂无内容</p>'}
          </div>
        </div>
      </div>
    `;

    // 绑定点击事件
    const header = this.shadowRoot.querySelector('#reasoning-header');
    if (header) {
      header.addEventListener('click', () => this.toggleExpand());
    }
  }
}
