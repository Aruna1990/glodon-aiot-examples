export const BrowserCompatibilityPage = () => {
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
        浏览器兼容性
      </h2>
      <p
        style={{
          margin: '0 0 32px 0',
          fontSize: '15px',
          color: '#666',
          lineHeight: '1.6',
        }}
      >
        了解 Glodon AloT Chat SDK 的浏览器兼容性要求和当前浏览器的支持情况
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
          原生支持
        </h3>
        <div
          style={{
            background: '#d1ecf1',
            border: '1px solid #17a2b8',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px',
          }}
        >
          <div style={{ color: '#0c5460', fontSize: '15px', lineHeight: '1.8' }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '600' }}>
              以下浏览器原生支持 Web Components：
            </p>
            <ul
              style={{
                margin: '8px 0 0 0',
                paddingLeft: '24px',
              }}
            >
              <li>Chrome 54+ / Edge 79+</li>
              <li>Firefox 63+</li>
              <li>Safari 10.1+</li>
            </ul>
          </div>
        </div>
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6',
          }}
        >
          这些浏览器版本都内置了对 Web Components 标准的完整支持，无需额外的 polyfill。
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
          当前浏览器检测
        </h3>
        <div
          style={{
            background: '#d1ecf1',
            border: '1px solid #17a2b8',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px',
          }}
        >
          <div style={{ color: '#0c5460', fontSize: '15px', lineHeight: '1.8' }}>
            <strong>当前浏览器：</strong>
            <br />
            <br />
            {window.customElements ? (
              <span
                style={{
                  color: '#28a745',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                ✅ 支持 Web Components
              </span>
            ) : (
              <span
                style={{
                  color: '#dc3545',
                  fontSize: '18px',
                  fontWeight: '600',
                }}
              >
                ❌ 不支持 Web Components
              </span>
            )}
          </div>
        </div>
        {!window.customElements && (
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
              ⚠️ 您的浏览器不支持 Web Components
            </p>
            <p
              style={{
                margin: 0,
                fontSize: '14px',
                color: '#d46b08',
                lineHeight: '1.6',
              }}
            >
              建议升级到支持的浏览器版本，或使用 polyfill 来提供兼容性支持。
            </p>
          </div>
        )}
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6',
          }}
        >
          如果您的浏览器不支持 Web Components，可以考虑使用 polyfill：
          <a
            href="https://github.com/webcomponents/polyfills"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#1890ff',
              textDecoration: 'none',
              marginLeft: '4px',
            }}
          >
            https://github.com/webcomponents/polyfills
          </a>
        </p>
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
          兼容性说明
        </h3>
        <p
          style={{
            margin: '0 0 16px 0',
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          Glodon AloT Chat SDK 依赖 Web Components 技术来实现自定义组件的功能。
          如果您的项目需要支持较旧的浏览器，可以使用 Web Components polyfill 来提供兼容性支持。
        </p>
        <p
          style={{
            margin: 0,
            fontSize: '15px',
            color: '#666',
            lineHeight: '1.8',
          }}
        >
          建议在生产环境中优先使用原生支持的现代浏览器，以获得最佳的性能和体验。
        </p>
      </div>
    </div>
  );
};

