export const QuickStartPage = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('已复制到剪贴板！');
    });
  };

  return (
    <div>
      {/* 快速开始部分 */}
      <div>
        <h2
          style={{
            margin: '0 0 16px 0',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          快速开始
        </h2>
        <p
          style={{
            margin: '0 0 32px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.6',
          }}
        >
          通过几个简单的步骤，快速将Glodon AloT Chat SDK集成到你的项目中
        </p>

        {/* 步骤1：安装SDK */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#e6f7ff',
                color: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              <span>1</span>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>📦</span>
              <span>安装 SDK</span>
            </h3>
          </div>

          <p
            style={{
              margin: '0 0 16px 16px',
              fontSize: '15px',
              color: '#666',
            }}
          >
            使用 npm、yarn 或 pnpm 安装：
          </p>

          <div style={{ marginLeft: '56px' }}>
            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '500',
                }}
              >
                使用 npm:
              </p>
              <div
                style={{
                  position: 'relative',
                  background: '#1e1e1e',
                  borderRadius: '6px',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: '#d4d4d4',
                }}
              >
                <code>npm install @glodon-aiot/chat-app-sdk</code>
                <button
                  onClick={() => copyToClipboard('npm install @glodon-aiot/chat-app-sdk')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
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

            <div>
              <p
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '14px',
                  color: '#666',
                  fontWeight: '500',
                }}
              >
                使用 yarn:
              </p>
              <div
                style={{
                  position: 'relative',
                  background: '#1e1e1e',
                  borderRadius: '6px',
                  padding: '16px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: '#d4d4d4',
                }}
              >
                <code>yarn add @glodon-aiot/chat-app-sdk</code>
                <button
                  onClick={() => copyToClipboard('yarn add @glodon-aiot/chat-app-sdk')}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
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
          </div>
        </div>

        {/* 步骤2：获取Token */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#e6f7ff',
                color: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              <span>2</span>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>🔑</span>
              <span>获取访问令牌（Token）</span>
            </h3>
          </div>

          <div style={{ marginLeft: '56px' }}>
            <div
              style={{
                background: '#fff7e6',
                border: '1px solid #ffd591',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <p
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '15px',
                  color: '#d46b08',
                  fontWeight: '600',
                }}
              >
                💡 如何获取Token？
              </p>
              <ul
                style={{
                  margin: '0',
                  paddingLeft: '20px',
                  color: '#d46b08',
                  fontSize: '14px',
                  lineHeight: '1.8',
                }}
              >
                <li>
                  登录广联达行业AI平台：
                  <a
                    href="https://aiot-dev.glodon.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#1890ff', marginLeft: '4px' }}
                  >
                    https://aiot-dev.glodon.com
                  </a>
                </li>
                <li>进入个人中心或开发者设置</li>
                <li>在API密钥或Token管理页面创建新的Token</li>
                <li>复制Token并妥善保管（Token只显示一次）</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 步骤3：初始化SDK */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#e6f7ff',
                color: '#1890ff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px',
              }}
            >
              <span>3</span>
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: '20px',
                fontWeight: '600',
                color: '#333',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span>⚡</span>
              <span>初始化SDK</span>
            </h3>
          </div>

          <div style={{ marginLeft: '56px' }}>
            <p
              style={{
                margin: '0 0 16px 0',
                fontSize: '15px',
                color: '#666',
              }}
            >
              在你的项目中导入并初始化SDK：
            </p>
            <div
              style={{
                position: 'relative',
                background: '#1e1e1e',
                borderRadius: '6px',
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '14px',
                color: '#d4d4d4',
                overflowX: 'auto',
              }}
            >
              <pre style={{ margin: 0 }}>
                <code>{`import { WebChatClient } from '@glodon-aiot/chat-app-sdk';

const client = new WebChatClient({
  env: 'test',
  apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow',
  config: {
    botId: 'your-bot-id', // 或使用 appInfo 配置
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
            <p
              style={{
                margin: '16px 0 0 0',
                fontSize: '14px',
                color: '#999',
                fontStyle: 'italic',
              }}
            >
              💡 提示：更多配置选项请查看"配置文档"和"API参考"页面
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

