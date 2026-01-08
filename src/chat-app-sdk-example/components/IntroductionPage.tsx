export const IntroductionPage = () => {
  return (
    <div>
      <h2
        style={{
          margin: '0 0 16px 0',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#333',
        }}
      >
        介绍
      </h2>
      <p
        style={{
          margin: '0 0 32px 0',
          fontSize: '15px',
          color: '#666',
          lineHeight: '1.6',
        }}
      >
        基于广联达行业AI平台的智能聊天 SDK
      </p>

      <div style={{ marginBottom: '32px' }}>
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: '22px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          关于 Glodon AloT Chat SDK
        </h3>
        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          Glodon AloT Chat SDK
          是一个基于广联达行业AI平台的智能聊天软件开发工具包。
          它提供了简单易用的API，帮助开发者快速集成智能对话功能到自己的应用中。
        </p>
        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          SDK支持两种模式：
        </p>
        <ul
          style={{
            margin: '0 0 16px 0',
            paddingLeft: '24px',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          <li>
            <strong>浮窗模式</strong>：以悬浮按钮的形式展示，点击后弹出聊天窗口
          </li>
          <li>
            <strong>嵌入模式</strong>：将聊天组件嵌入到页面指定位置
          </li>
        </ul>
      </div>

      <div style={{ marginBottom: '32px' }}>
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: '22px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          主要特性
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: '24px',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          <li>支持 Bot 模式和 App 模式（推荐）</li>
          <li>支持自定义 Web Components</li>
          <li>支持文件上传功能</li>
          <li>支持联网搜索功能</li>
          <li>支持多语言（中文/英文）</li>
          <li>支持 PC 和移动端布局</li>
          <li>丰富的 UI 配置选项</li>
          <li>完整的 TypeScript 类型支持</li>
        </ul>
      </div>

      <div>
        <h3
          style={{
            margin: '0 0 16px 0',
            fontSize: '22px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          快速开始
        </h3>
        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          想要快速开始使用？请查看
          <a
            href="#quickstart"
            style={{
              color: '#1890ff',
              textDecoration: 'none',
              margin: '0 4px',
            }}
          >
            快速开始
          </a>
          页面，了解如何安装和配置 SDK。
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          更多详细信息请参考
          <a
            href="#docs"
            style={{
              color: '#1890ff',
              textDecoration: 'none',
              margin: '0 4px',
            }}
          >
            配置文档
          </a>
          和
          <a
            href="#api"
            style={{
              color: '#1890ff',
              textDecoration: 'none',
              margin: '0 4px',
            }}
          >
            API参考
          </a>
          页面。
        </p>
      </div>
    </div>
  );
};
