export const BrowserCompatibility = () => {
  return (
    <div
      style={{
        background: '#d1ecf1',
        border: '1px solid #17a2b8',
        borderRadius: '8px',
        padding: '20px',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0', color: '#0c5460' }}>
        🌐 浏览器兼容性
      </h3>
      <div style={{ color: '#0c5460', fontSize: '14px', lineHeight: '1.8' }}>
        <strong>原生支持：</strong>
        <br />
        • Chrome 54+ / Edge 79+
        <br />
        • Firefox 63+
        <br />
        • Safari 10.1+
        <br />
        <br />
        <strong>当前浏览器：</strong>
        <br />
        {window.customElements ? (
          <span style={{ color: '#28a745' }}>✅ 支持 Web Components</span>
        ) : (
          <span style={{ color: '#dc3545' }}>❌ 不支持 Web Components</span>
        )}
      </div>
    </div>
  );
};

