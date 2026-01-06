/**
 * 自定义 ContentBox Web Component
 */
export class CustomContentBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    console.log('[CustomContentBox] connected');
    this.render();
  }

  updateProps(props: any) {
    console.log(
      '╔═══════════════════════════════════════════════════════════════╗',
    );
    console.log('║ [CustomContentBox] 接收到的完整 Props 数据');
    console.log(
      '╚═══════════════════════════════════════════════════════════════╝',
    );
    console.log(props);

    console.log('\n📝 [Message 对象详情]');
    console.log('- message:', props.message);
    console.log('  - id:', props.message?.id);
    console.log('  - role:', props.message?.role);
    console.log('  - type:', props.message?.type);
    console.log('  - content_type:', props.message?.content_type);
    console.log('  - content:', props.message?.content);
    console.log('  - content_obj:', props.message?.content_obj);

    console.log('\n⚙️ [其他配置]');
    console.log('- layout:', props.layout);
    console.log('- readonly:', props.readonly);
    console.log('- showBackground:', props.showBackground);
    console.log('- isCardDisabled:', props.isCardDisabled);
    console.log('- isContentLoading:', props.isContentLoading);

    console.log('\n🔧 [回调函数]');
    console.log('- eventCallbacks:', props.eventCallbacks);

    console.log(`\n${'═'.repeat(65)}`);

    // 保存数据到元素实例
    (this as any).propsData = props;
    this.render();
  }

  render() {
    const props = (this as any).propsData;

    if (!this.shadowRoot) {
      return;
    }

    if (!props) {
      // 没有数据时显示默认内容
      this.shadowRoot.innerHTML = `
        <style>
          .content-box {
            padding: 24px;
            text-align: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            margin: 16px;
          }
          h2 {
            margin: 0 0 12px 0;
            font-size: 24px;
          }
          p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
            line-height: 1.6;
          }
          .badge {
            margin-top: 16px;
            padding: 12px;
            background: rgba(255,255,255,0.1);
            border-radius: 6px;
          }
        </style>
        <div class="content-box">
          <h2>✨ 自定义内容容器</h2>
          <p>
            这是使用 <strong>Web Component</strong> 实现的自定义内容<br>
            完全不依赖 React 技术栈 🚀
          </p>
          <div class="badge">
            <small>等待消息数据...</small>
          </div>
        </div>
      `;
      return;
    }

    // 有数据时显示详细信息
    const message = props.message || {};
    const messageText = message.content || '无内容';
    const role = message.role || 'unknown';
    const contentType = message.content_type || 'unknown';

    this.shadowRoot.innerHTML = `
      <style>
        .content-box {
          padding: 16px;
          background: ${
            role === 'user'
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)'
          };
          color: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          margin: 8px 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.2);
        }
        .title {
          font-weight: bold;
          font-size: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .badge {
          display: inline-block;
          background: rgba(255,255,255,0.2);
          padding: 4px 12px;
          border-radius: 12px;
          font-size: 12px;
        }
        .content-text {
          background: rgba(255,255,255,0.1);
          padding: 12px;
          border-radius: 8px;
          margin: 12px 0;
          line-height: 1.6;
          font-size: 14px;
          white-space: pre-wrap;
          word-wrap: break-word;
        }
        .meta-info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
          margin-top: 12px;
        }
        .meta-item {
          background: rgba(255,255,255,0.1);
          padding: 8px;
          border-radius: 6px;
          font-size: 12px;
        }
        .meta-label {
          font-weight: bold;
          opacity: 0.8;
        }
        .meta-value {
          margin-top: 4px;
        }
        .json-preview {
          background: rgba(0,0,0,0.2);
          padding: 12px;
          border-radius: 6px;
          margin-top: 12px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          max-height: 200px;
          overflow: auto;
          text-align: left;
        }
      </style>
      <div class="content-box">
        <div class="header">
          <div class="title">
            ${role === 'user' ? '👤' : '🤖'}
            ${role === 'user' ? '用户消息' : 'AI 回复'}
          </div>
          <span class="badge">${contentType}</span>
        </div>

        <div class="content-text">
          ${messageText}
        </div>

        <div class="meta-info">
          <div class="meta-item">
            <div class="meta-label">🆔 Message ID</div>
            <div class="meta-value">${message.id || 'N/A'}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">📋 Type</div>
            <div class="meta-value">${message.type || 'N/A'}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">📱 Layout</div>
            <div class="meta-value">${props.layout || 'N/A'}</div>
          </div>
          <div class="meta-item">
            <div class="meta-label">🔒 Readonly</div>
            <div class="meta-value">${props.readonly ? 'Yes' : 'No'}</div>
          </div>
        </div>

        <details style="margin-top: 12px;">
          <summary style="cursor: pointer; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 6px; font-size: 12px;">
            📊 查看完整 Props 数据 (JSON)
          </summary>
          <div class="json-preview">
            <pre>${JSON.stringify(props, null, 2)}</pre>
          </div>
        </details>

        <div style="margin-top: 12px; padding: 8px; background: rgba(255,255,255,0.1); border-radius: 6px; text-align: center; font-size: 11px;">
          💡 提示：打开浏览器控制台查看详细的 console.log 输出
        </div>
      </div>
    `;
  }
}

