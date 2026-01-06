import { loadConfigFromStorage } from './utils/schema-config';

/**
 * 自定义 JsonItem Web Component
 */
export class CustomJsonItem extends HTMLElement {
  /**
   * 自定义消息渲染索引计算函数
   * @param message - 消息对象
   * @returns 渲染索引，负数表示延迟渲染（在 chat complete 后渲染），0 或正数表示正常顺序渲染
   */
  static getJSONOutputMessageRenderIndex(message: any) {
    if (!message) {
      return 0;
    }
    console.log('getJSONOutputMessageRenderIndex message', message);

    // 检查是否是 Mix 类型消息
    if (message.content_type === 'mix' && message.content_obj) {
      const mixContent = message.content_obj as {
        item_list?: Array<{ type?: string; schema_version?: string }>;
      };

      if (mixContent.item_list) {
        // 从 localStorage 读取配置
        const config = loadConfigFromStorage();
        console.log('getJSONOutputMessageRenderIndex config:', config);

        // 收集所有匹配的 renderIndex
        const matchedIndices: number[] = [];

        // 查找消息中是否有配置的 schema_version
        for (const item of mixContent.item_list) {
          if (item.type === 'json' && item.schema_version) {
            console.log(
              'getJSONOutputMessageRenderIndex checking schema_version:',
              item.schema_version,
            );

            // 先在正数区域查找
            const positiveMatch = config.positive.find(
              c => c.schemaVersion === item.schema_version,
            );
            if (positiveMatch) {
              console.log(
                'getJSONOutputMessageRenderIndex found positive match:',
                positiveMatch.renderIndex,
              );
              matchedIndices.push(positiveMatch.renderIndex);
              continue;
            }

            // 再在负数区域查找
            const negativeMatch = config.negative.find(
              c => c.schemaVersion === item.schema_version,
            );
            if (negativeMatch) {
              console.log(
                'getJSONOutputMessageRenderIndex found negative match:',
                negativeMatch.renderIndex,
              );
              matchedIndices.push(negativeMatch.renderIndex);
              continue;
            }

            console.log(
              'getJSONOutputMessageRenderIndex no match found for:',
              item.schema_version,
            );
          }
        }

        // 如果有匹配的，返回优先级最高的（renderIndex 最小）
        if (matchedIndices.length > 0) {
          // 负数优先（延迟渲染），然后按绝对值排序
          const sortedIndices = matchedIndices.sort((a, b) => {
            // 负数优先
            if (a < 0 && b >= 0) {
              return -1;
            }
            if (a >= 0 && b < 0) {
              return 1;
            }
            // 同号时，绝对值小的优先
            return Math.abs(a) - Math.abs(b);
          });
          const result = sortedIndices[0];
          console.log(
            'getJSONOutputMessageRenderIndex final result:',
            result,
            'from matches:',
            matchedIndices,
          );
          return result;
        }
      }
    }

    return 0; // 0 表示正常顺序渲染
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('[CustomJsonItem] connected');
    this.loadMarkedIfNeeded();
    // 适配器现在会在首次挂载时调用 updateProps，所以这里不需要立即渲染
    // 但如果 updateProps 还没被调用，可以尝试从 DOM 属性读取
    this.readPropsFromDOM();
    this.render();
  }

  // 从 DOM 属性读取 props（作为 fallback，适配器现在会在首次挂载时调用 updateProps）
  readPropsFromDOM() {
    // 读取 schemaVersion（适配器会将字符串设置为 attribute）
    if (!(this as any).schemaVersion && this.hasAttribute('schemaversion')) {
      (this as any).schemaVersion =
        this.getAttribute('schemaversion') || undefined;
    }
    // 注意：data 是对象，适配器会设置为 property (this.data)，而不是 attribute
  }

  updateProps(props: any) {
    console.log('[CustomJsonItem] updateProps:', props);
    (this as any).data = props.data;
    (this as any).schemaVersion = props.schemaVersion;
    (this as any).message = props.message;
    this.render();
  }

  // 动态加载 marked.js 库
  loadMarkedIfNeeded() {
    if (typeof (window as any).marked !== 'undefined') {
      return; // 已经加载
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/marked/marked.min.js';
    script.onload = () => {
      console.log('[CustomJsonItem] marked.js loaded');
      this.render(); // 重新渲染
    };
    document.head.appendChild(script);
  }

  // Markdown 渲染函数
  renderMarkdown(text: string): string {
    if (!text) {
      return '';
    }

    const { marked } = window as any;
    if (typeof marked !== 'undefined' && marked.parse) {
      try {
        return marked.parse(text, { breaks: true, gfm: true });
      } catch (e) {
        console.error('Markdown parse error:', e);
        return this.escapeHtml(text).replace(/\n/g, '<br>');
      }
    }
    // Fallback: 简单的文本处理
    return this.escapeHtml(text).replace(/\n/g, '<br>');
  }

  // HTML 转义，防止 XSS
  escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  render() {
    // 优先从 this 读取（通过 updateProps 设置的）
    let { data } = this as any;
    let { schemaVersion } = this as any;

    // 如果还没有通过 updateProps 设置，尝试从 DOM 属性读取
    // 这对于历史记录和延迟消息很重要，因为它们首次渲染时 updateProps 可能不会被调用
    if (schemaVersion === undefined && this.hasAttribute('schemaversion')) {
      schemaVersion = this.getAttribute('schemaversion') || undefined;
      // 保存到 this，避免下次重复读取
      (this as any).schemaVersion = schemaVersion;
    }

    // 如果 data 还没有设置，尝试从 property 读取（适配器可能已经设置了）
    if (data === undefined) {
      // 适配器会将对象设置为 property，而不是 attribute
      // 如果 this.data 存在，说明适配器已经设置了
      const dataProperty = (this as any).data;
      if (dataProperty !== undefined) {
        data = dataProperty;
      }
    }

    console.info('data', data);
    console.info('schemaVersion', schemaVersion);

    if (!this.shadowRoot) {
      return;
    }

    // 如果数据还没有准备好，不渲染（等待 updateProps 被调用）
    if (data === undefined && schemaVersion === undefined) {
      console.log('[CustomJsonItem] Waiting for props...');
      return;
    }
    if (schemaVersion === 'cvforce.search.result.v1') {
      // 使用独立的 SearchResultList 组件
      this.shadowRoot.innerHTML = '<search-result-list></search-result-list>';
      const searchResultList = this.shadowRoot.querySelector(
        'search-result-list',
      ) as any;
      if (searchResultList) {
        searchResultList.setData(data);
      }
    } else if (schemaVersion === 'cvforce.knowledge.refrence.v1') {
      // 使用独立的 KnowledgeReferenceList 组件
      this.shadowRoot.innerHTML =
        '<knowledge-reference-list></knowledge-reference-list>';
      const knowledgeReferenceList = this.shadowRoot.querySelector(
        'knowledge-reference-list',
      ) as any;
      if (knowledgeReferenceList) {
        knowledgeReferenceList.setData(data);
      }
    } else if (schemaVersion === 'app.reference.merged_result.v1') {
      // 使用独立的 MergedReferenceList 组件
      this.shadowRoot.innerHTML =
        '<merged-reference-list></merged-reference-list>';
      const mergedReferenceList = this.shadowRoot.querySelector(
        'merged-reference-list',
      ) as any;
      if (mergedReferenceList) {
        mergedReferenceList.setData(data);
      }
    } else {
      // 默认的 JSON 显示
      this.shadowRoot.innerHTML = `
        <style>
          .default-json {
            padding: 12px;
            background: #f8f9fa;
            border-radius: 6px;
            margin: 8px 0;
            border: 1px solid #e0e0e0;
          }
          .schema-version {
            font-weight: bold;
            margin-bottom: 8px;
            color: #333;
            font-size: 13px;
            padding: 6px 10px;
            background: white;
            border-radius: 4px;
            display: inline-block;
          }
          pre {
            margin: 8px 0 0 0;
            font-size: 12px;
            font-family: 'Courier New', monospace;
            white-space: pre-wrap;
            word-wrap: break-word;
            color: #666;
            background: white;
            padding: 10px;
            border-radius: 4px;
          }
        </style>
        <div class="default-json">
          <div class="schema-version">📋 ${schemaVersion || '未知类型'}</div>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  }
}

