export const ConfigDocsPage = () => {
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
          配置文档
        </h2>
        <p
          style={{
            margin: '0 0 32px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.6',
          }}
        >
          详细说明SDK的各项配置选项和使用方法
        </p>

        {/* 基础配置 */}
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
            🔧 基础配置
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
              env
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              环境配置，可选值：<code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>'test'</code> 或 <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>'prod'</code>
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
              <code>env: 'test' | 'prod'</code>
              <button
                onClick={() => copyToClipboard("env: 'test'")}
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
              apiUrl
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              API服务地址，如果不设置会根据env自动选择
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
              <code>apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow'</code>
              <button
                onClick={() =>
                  copyToClipboard("apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow'")
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

        {/* 认证配置 */}
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
            🔑 认证配置
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
              auth.type
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              认证类型，目前支持 <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>'token'</code>
            </p>
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
              auth.token
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              访问令牌，从广联达行业AI平台获取
            </p>
            <div
              style={{
                background: '#fff7e6',
                border: '1px solid #ffd591',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '12px',
              }}
            >
              <p
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '15px',
                  color: '#d46b08',
                  fontWeight: '600',
                }}
              >
                💡 如何获取Token？
              </p>
              <ol
                style={{
                  margin: '0 0 12px 0',
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
                <li>进入个人中心或开发者设置页面</li>
                <li>在API密钥或Token管理页面创建新的Token</li>
                <li>复制Token并妥善保管（Token通常只显示一次）</li>
                <li>在生产环境中，建议使用环境变量或安全的密钥管理服务存储Token</li>
              </ol>
              <p style={{ margin: '0', fontSize: '14px', color: '#d46b08', fontWeight: '600' }}>
                ⚠️ 安全提示：Token需要妥善保管，不要泄露到公共代码仓库或客户端代码中
              </p>
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
              auth.onRefreshToken
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              可选的Token刷新回调函数，当Token过期时会被调用
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
                <code>{`onRefreshToken: () => {
  // 返回新的Token
  return 'new-token';
}`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`onRefreshToken: () => {
  return 'new-token';
}`)
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

        {/* 聊天配置 */}
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
            💬 聊天配置
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
              config.type
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              聊天类型：<code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>'bot'</code>（Bot模式）或 <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>'app'</code>（App模式，推荐）
            </p>
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
              config.botId
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              Bot模式的Bot ID（当type为'bot'时必填）
            </p>
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
              config.appInfo
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              App模式的配置对象（当type为'app'时必填）
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
                <code>{`appInfo: {
  appId: 'your-app-id',
  workflowId: 'your-workflow-id',
  draft_mode: true, // 可选：true=草稿，false=发布
  parameters: {
    SETTING: {
      ENABLE_NETWORK: 1, // 0=不联网，1=自动联网，2=必须联网
    },
  },
}`}</code>
              </pre>
              <button
                onClick={() =>
                  copyToClipboard(`appInfo: {
  appId: 'your-app-id',
  workflowId: 'your-workflow-id',
  draft_mode: true,
  parameters: {
    SETTING: {
      ENABLE_NETWORK: 1,
    },
  },
}`)
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

        {/* UI配置 */}
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
            🎨 UI配置
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
              ui.base
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              基础UI配置
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
                <code>{`base: {
  lang: 'zh-CN', // 语言：'zh-CN' | 'en-US'
  layout: 'pc', // 布局：'pc' | 'mobile'
  zIndex: 1000, // 层级
  icon: 'https://...', // 图标URL
}`}</code>
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
              ui.chatBot
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              聊天窗口配置
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
                <code>{`chatBot: {
  uploadable: true, // 是否支持文件上传
  isNeedClearContext: false, // 是否显示清除上下文按钮
  isNeedClearMessage: false, // 是否显示删除对话记录按钮
  isNeedAddNewConversation: false, // 是否显示新建会话按钮
  isNeedFunctionCallMessage: true, // 是否显示函数调用消息
  width: 1000, // 聊天窗口宽度（px）
}`}</code>
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
              ui.asstBtn
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              悬浮按钮配置
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
              <code>asstBtn: {`{ isNeed: true }`}</code>
            </div>
          </div>
        </section>

        {/* Web Components配置 */}
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
            🧩 Web Components配置
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
              ui.uiKitCustomWebComponents
            </h4>
            <p style={{ margin: '0 0 12px 0', color: '#666', fontSize: '14px' }}>
              自定义Web Components映射，用于替换默认的UIKit组件
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
                <code>{`uiKitCustomWebComponents: {
  JsonItem: 'demo-json-item', // 自定义JsonItem组件
}`}</code>
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

