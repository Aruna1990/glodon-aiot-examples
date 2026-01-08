interface ComponentInfo {
  name: string;
  description: string;
  borderColor: string;
  textColor: string;
}

const components: ComponentInfo[] = [
  {
    name: 'knowledge-reference-list',
    description: '知识库引用列表组件\n展示知识库引用信息',
    borderColor: '#f5222d',
    textColor: '#f5222d',
  },
  {
    name: 'search-result-list',
    description: '搜索结果列表组件\n独立可复用的搜索结果展示',
    borderColor: '#52c41a',
    textColor: '#52c41a',
  },
  {
    name: 'merged-reference-list',
    description: '合并参考来源列表组件\n展示合并的知识库和网络搜索结果',
    borderColor: '#1890ff',
    textColor: '#1890ff',
  },
  {
    name: 'demo-json-item',
    description: '自定义 JsonItem 组件\n支持多种 schema 渲染',
    borderColor: '#667eea',
    textColor: '#667eea',
  },
  {
    name: 'demo-content-box',
    description: '自定义 ContentBox 组件\n用于替换默认内容容器',
    borderColor: '#764ba2',
    textColor: '#764ba2',
  },
];

export const WebComponentsPage = () => {
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
        Web Components
      </h2>
      <p
        style={{
          margin: '0 0 32px 0',
          fontSize: '15px',
          color: '#666',
          lineHeight: '1.6',
        }}
      >
        本模块介绍我们提供的 SDK Demo 工程中用到的 Web Components。这些组件展示了如何通过 Web Components 技术自定义和扩展 SDK 的 UI 组件。
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
          什么是 Web Components？
        </h3>
        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          Web Components 是一套 Web 平台的原生组件模型，允许你创建可重用的自定义元素。
          它由三个主要技术组成：
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
            <strong>Custom Elements</strong>：允许定义自定义 HTML 元素
          </li>
          <li>
            <strong>Shadow DOM</strong>：提供封装样式和标记的能力
          </li>
          <li>
            <strong>HTML Templates</strong>：定义可重用的 HTML 模板
          </li>
        </ul>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          使用 Web Components 的优势是它们可以在任何框架或原生 JavaScript 中使用，提供了真正的跨框架组件复用能力。
        </p>
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
          Demo 工程中的 Web Components
        </h3>
        <p
          style={{
            margin: '0 0 24px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          以下是在 SDK Demo 工程中使用的 Web Components 列表：
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {components.map(component => (
            <div
              key={component.name}
              style={{
                flex: '1',
                minWidth: '280px',
                padding: '20px',
                background: '#f8f9fa',
                borderRadius: '8px',
                border: `2px solid ${component.borderColor}`,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  fontSize: '16px',
                  color: component.textColor,
                }}
              >
                {component.name}
              </div>
              <div
                style={{
                  fontSize: '14px',
                  color: '#666',
                  whiteSpace: 'pre-line',
                  lineHeight: '1.6',
                }}
              >
                {component.description}
              </div>
            </div>
          ))}
        </div>
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
          如何使用
        </h3>
        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          在 SDK 配置中，你可以通过 <code style={{ background: '#f5f5f5', padding: '2px 6px', borderRadius: '3px' }}>uiKitCustomWebComponents</code> 选项来指定自定义的 Web Components：
        </p>
        <div
          style={{
            background: '#1e1e1e',
            borderRadius: '6px',
            padding: '16px',
            fontFamily: 'monospace',
            fontSize: '14px',
            color: '#d4d4d4',
            overflowX: 'auto',
            marginBottom: '16px',
          }}
        >
          <pre style={{ margin: 0 }}>
            <code>{`ui: {
  uiKitCustomWebComponents: {
    JsonItem: 'demo-json-item', // 使用自定义的 Web Component
  },
}`}</code>
          </pre>
        </div>
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

