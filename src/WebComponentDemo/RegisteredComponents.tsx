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

export const RegisteredComponents = () => {
  return (
    <div
      style={{
        background: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0' }}>📋 已注册的 Web Components</h3>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        {components.map(component => (
          <div
            key={component.name}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '16px',
              background: '#f8f9fa',
              borderRadius: '6px',
              border: `2px solid ${component.borderColor}`,
            }}
          >
            <div
              style={{
                fontWeight: 'bold',
                marginBottom: '8px',
                color: component.textColor,
              }}
            >
              {component.name}
            </div>
            <div style={{ fontSize: '13px', color: '#666', whiteSpace: 'pre-line' }}>
              {component.description}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

