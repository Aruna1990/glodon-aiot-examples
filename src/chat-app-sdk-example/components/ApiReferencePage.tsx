export const ApiReferencePage = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('已复制到剪贴板！');
    });
  };

  return (
    <div>
      <div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          API参考
        </h2>
        <p
          style={{
            margin: '0 0 32px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.6',
          }}
        >
          详细的API使用说明和代码示例
        </p>

        {/* WebChatClient类 */}
        <section style={{ marginBottom: '40px' }}>
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '22px',
              fontWeight: '600',
              color: '#333',
              paddingBottom: '12px',
              borderBottom: '2px solid #e0e0e0',
            }}
          >
            WebChatClient
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1890ff',
              }}
            >
              构造函数
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              创建WebChatClient实例
            </p>
            <div
              style={{
                background: '#1e1e1e',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d4d4d4',
                position: 'relative',
                overflowX: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>
                <code>{`import { WebChatClient } from '@glodon-aiot/chat-app-sdk';

const client = new WebChatClient(options);`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`import { WebChatClient } from '@glodon-aiot/chat-app-sdk';

const client = new WebChatClient(options);`)
                }
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'transparent',
                  border: '1px solid #555',
                  color: '#d4d4d4',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                📋
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1890ff',
              }}
            >
              完整示例
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              Bot模式完整配置示例
            </p>
            <div
              style={{
                background: '#1e1e1e',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d4d4d4',
                position: 'relative',
                overflowX: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>
                <code>{`import { WebChatClient } from '@glodon-aiot/chat-app-sdk';

// Bot模式
const client = new WebChatClient({
  env: 'test',
  apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow',
  config: {
    botId: 'your-bot-id',
  },
  auth: {
    type: 'token',
    token: 'your-token',
    onRefreshToken: () => {
      // 返回新的Token
      return 'new-token';
    },
  },
  ui: {
    base: {
      lang: 'zh-CN',
      layout: 'pc',
      zIndex: 1000,
    },
    asstBtn: {
      isNeed: true,
    },
    chatBot: {
      uploadable: true,
      width: 1000,
    },
  },
});`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`import { WebChatClient } from '@glodon-aiot/chat-app-sdk';

const client = new WebChatClient({
  env: 'test',
  apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow',
  config: {
    botId: 'your-bot-id',
  },
  auth: {
    type: 'token',
    token: 'your-token',
  },
  ui: {
    base: {
      lang: 'zh-CN',
      layout: 'pc',
    },
    asstBtn: {
      isNeed: true,
    },
    chatBot: {
      uploadable: true,
      width: 1000,
    },
  },
});`)
                }
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'transparent',
                  border: '1px solid #555',
                  color: '#d4d4d4',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                📋
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1890ff',
              }}
            >
              App模式示例
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              App模式（推荐）完整配置示例
            </p>
            <div
              style={{
                background: '#1e1e1e',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d4d4d4',
                position: 'relative',
                overflowX: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>
                <code>{`import { WebChatClient } from '@glodon-aiot/chat-app-sdk';

// App模式
const client = new WebChatClient({
  env: 'test',
  apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow',
  config: {
    type: 'app',
    appInfo: {
      appId: 'your-app-id',
      workflowId: 'your-workflow-id',
      draft_mode: true, // true=草稿，false=发布
      parameters: {
        SETTING: {
          ENABLE_NETWORK: 1, // 0=不联网，1=自动联网，2=必须联网
        },
      },
    },
  },
  auth: {
    type: 'token',
    token: 'your-token',
  },
  ui: {
    base: {
      lang: 'zh-CN',
      layout: 'pc',
    },
    asstBtn: {
      isNeed: true,
    },
    chatBot: {
      uploadable: true,
      width: 1000,
    },
  },
});`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`import { WebChatClient } from '@glodon-aiot/chat-app-sdk';

const client = new WebChatClient({
  env: 'test',
  apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow',
  config: {
    type: 'app',
    appInfo: {
      appId: 'your-app-id',
      workflowId: 'your-workflow-id',
      draft_mode: true,
      parameters: {
        SETTING: {
          ENABLE_NETWORK: 1,
        },
      },
    },
  },
  auth: {
    type: 'token',
    token: 'your-token',
  },
  ui: {
    base: {
      lang: 'zh-CN',
      layout: 'pc',
    },
    asstBtn: {
      isNeed: true,
    },
    chatBot: {
      uploadable: true,
      width: 1000,
    },
  },
});`)
                }
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '12px',
                  background: 'transparent',
                  border: '1px solid #555',
                  color: '#d4d4d4',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                📋
              </button>
            </div>
          </div>
        </section>

        {/* 自定义Web Components */}
        <section style={{ marginBottom: '40px' }}>
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '22px',
              fontWeight: '600',
              color: '#333',
              paddingBottom: '12px',
              borderBottom: '2px solid #e0e0e0',
            }}
          >
            自定义Web Components
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1890ff',
              }}
            >
              注册自定义组件
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              使用Web Components API创建自定义组件
            </p>
            <div
              style={{
                background: '#1e1e1e',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d4d4d4',
                position: 'relative',
                overflowX: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>
                <code>{`class CustomJsonItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = \`<div>Custom JsonItem</div>\`;
  }
}

customElements.define('demo-json-item', CustomJsonItem);`}</code>
              </pre>
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1890ff',
              }}
            >
              在SDK中使用
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              在配置中指定自定义组件
            </p>
            <div
              style={{
                background: '#1e1e1e',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d4d4d4',
                position: 'relative',
                overflowX: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>
                <code>{`const client = new WebChatClient({
  // ... 其他配置
  ui: {
    uiKitCustomWebComponents: {
      JsonItem: 'demo-json-item', // 使用自定义组件
    },
  },
});`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* 方法说明 */}
        <section>
          <h3
            style={{
              margin: '0 0 16px 0',
              fontSize: '22px',
              fontWeight: '600',
              color: '#333',
              paddingBottom: '12px',
              borderBottom: '2px solid #e0e0e0',
            }}
          >
            常用方法
          </h3>

          <div style={{ marginBottom: '24px' }}>
            <h4
              style={{
                margin: '0 0 8px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1890ff',
              }}
            >
              获取客户端实例
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              保存客户端实例引用，以便后续操作
            </p>
            <div
              style={{
                background: '#1e1e1e',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d4d4d4',
                position: 'relative',
              }}
            >
              <code>const clientRef = useRef&lt;WebChatClient&gt;(null);</code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

