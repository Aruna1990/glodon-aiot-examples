export const Header = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      }}
    >
      <h1 style={{ margin: '0 0 10px 0' }}>🎨 Web Components 示例</h1>
      <p style={{ margin: 0, opacity: 0.9, fontSize: '16px' }}>
        本示例展示如何使用 Web Components 自定义 chat-app-sdk 的 UIKit
        组件，完全脱离 React 技术栈。支持通过拖拽方式配置 Schema Version
        的渲染顺序，实现灵活的消息排序控制。
      </p>
    </div>
  );
};

