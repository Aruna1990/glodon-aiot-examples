import { SchemaVersionSortConfig } from '../components/SchemaVersionSortConfig';
import type { SortConfig } from '../components/utils/schema-config';
import { ExternalLink } from './ExternalLink';

interface ConfigurationFormProps {
  token: string;
  setToken: (value: string) => void;
  chatType: 'bot' | 'app';
  botId: string;
  setBotId: (value: string) => void;
  appId: string;
  setAppId: (value: string) => void;
  workflowId: string;
  setWorkflowId: (value: string) => void;
  draftMode: string;
  setDraftMode: (value: string) => void;
  schemaSortConfig: SortConfig;
  setSchemaSortConfig: (config: SortConfig) => void;
  error: string;
  isLoadingSdk: boolean;
  onInitialize: () => void;
}

export const ConfigurationForm = ({
  token,
  setToken,
  chatType,
  botId,
  setBotId,
  appId,
  setAppId,
  workflowId,
  setWorkflowId,
  draftMode,
  setDraftMode,
  schemaSortConfig,
  setSchemaSortConfig,
  error,
  isLoadingSdk,
  onInitialize,
}: ConfigurationFormProps) => {
  return (
    <div
      style={{
        background: 'white',
        border: '2px solid #667eea',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <h2 style={{ margin: '0 0 20px 0', color: '#667eea' }}>🔧 配置信息</h2>
      <p style={{ margin: '0 0 20px 0', color: '#666', fontSize: '14px' }}>
        请输入以下信息以初始化聊天客户端。您还可以配置 Schema Version
        的渲染顺序，控制不同类型消息的显示优先级。
      </p>

      {/* 根路径信息展示 */}
      <div
        style={{
          marginBottom: '20px',
          padding: '12px 16px',
          background: '#f8f9fa',
          border: '1px solid #e0e0e0',
          borderRadius: '6px',
          fontSize: '13px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          <span>📍</span>
          <span>当前路径信息</span>
        </div>
        <div style={{ color: '#666', lineHeight: '1.6' }}>
          <div style={{ marginBottom: '4px' }}>
            <strong>API 根路径：</strong>
            <code
              style={{
                marginLeft: '8px',
                padding: '2px 6px',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '3px',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#d63384',
              }}
            >
              https://aiot-dev.glodon.com/api/cvforcepd/flow
            </code>
          </div>
          <div>
            <strong>当前页面：</strong>
            <code
              style={{
                marginLeft: '8px',
                padding: '2px 6px',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '3px',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: '#d63384',
                wordBreak: 'break-all',
              }}
            >
              {window.location.href}
            </code>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label
          htmlFor="token-input"
          style={{
            display: 'block',
            marginBottom: '8px',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          访问令牌（Token）<span style={{ color: 'red' }}>*</span>
        </label>
        <input
          id="token-input"
          type="text"
          value={token}
          onChange={e => setToken(e.target.value)}
          placeholder="请输入您的访问令牌"
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'monospace',
            boxSizing: 'border-box',
          }}
        />
        <small style={{ color: '#999', fontSize: '12px' }}>
          从环境变量 CHAT_APP_COZE_TOKEN 读取，或手动输入
        </small>
      </div>

      {chatType === 'bot' && (
        <div style={{ marginBottom: '20px' }}>
          <label
            htmlFor="botid-input"
            style={{
              display: 'block',
              marginBottom: '8px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            Bot ID<span style={{ color: 'red' }}>*</span>
          </label>
          <input
            id="botid-input"
            type="text"
            value={botId}
            onChange={e => setBotId(e.target.value)}
            placeholder="请输入 Bot ID"
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              fontSize: '14px',
              fontFamily: 'monospace',
              boxSizing: 'border-box',
            }}
          />
          <small style={{ color: '#999', fontSize: '12px' }}>
            从环境变量 CHAT_APP_INDEX_COZE_BOT_ID 读取，或使用默认值
          </small>
        </div>
      )}

      {chatType === 'app' && (
        <>
          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <label
                htmlFor="appid-input"
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  margin: 0,
                }}
              >
                App ID<span style={{ color: 'red' }}>*</span>
              </label>
              {appId.trim() && (
                <ExternalLink
                  href={`https://aiot-dev.glodon.com/portal/gldcv/cvforcepd/fe/#/space/1758636595/project-ide/${appId.trim()}`}
                  title="在系统中打开 App"
                />
              )}
            </div>
            <input
              id="appid-input"
              type="text"
              value={appId}
              onChange={e => setAppId(e.target.value)}
              placeholder="请输入 App ID"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'monospace',
                boxSizing: 'border-box',
              }}
            />
            <small style={{ color: '#999', fontSize: '12px' }}>
              从环境变量 CHAT_APP_CHATFLOW_COZE_APP_ID 读取
            </small>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px',
              }}
            >
              <label
                htmlFor="workflowid-input"
                style={{
                  fontWeight: 'bold',
                  color: '#333',
                  margin: 0,
                }}
              >
                Workflow ID<span style={{ color: 'red' }}>*</span>
              </label>
              {appId.trim() && workflowId.trim() && (
                <ExternalLink
                  href={`https://aiot-dev.glodon.com/portal/gldcv/cvforcepd/fe/#/space/1758636595/project-ide/${appId.trim()}/workflow/${workflowId.trim()}`}
                  title="在系统中打开 Workflow"
                />
              )}
            </div>
            <input
              id="workflowid-input"
              type="text"
              value={workflowId}
              onChange={e => setWorkflowId(e.target.value)}
              placeholder="请输入 Workflow ID"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'monospace',
                boxSizing: 'border-box',
              }}
            />
            <small style={{ color: '#999', fontSize: '12px' }}>
              从环境变量 CHAT_APP_CHATFLOW_COZE_WORKFLOW_ID 读取
            </small>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label
              htmlFor="draftmode-select"
              style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 'bold',
                color: '#333',
              }}
            >
              Draft Mode（草稿模式）
            </label>
            <select
              id="draftmode-select"
              value={draftMode}
              onChange={e => setDraftMode(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontFamily: 'monospace',
                boxSizing: 'border-box',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              <option value="true">true - 草稿（Draft）</option>
              <option value="false">false - 发布（Online）</option>
              <option value="">不设置（可选）</option>
            </select>
            <small style={{ color: '#999', fontSize: '12px' }}>
              默认值为草稿模式（true）。从环境变量 CHAT_APP_DRAFT_MODE
              读取，true=草稿，false=发布
            </small>
          </div>
        </>
      )}

      {/* Schema Version 排序配置 */}
      <SchemaVersionSortConfig
        config={schemaSortConfig}
        onChange={setSchemaSortConfig}
      />

      {error ? (
        <div
          style={{
            padding: '12px',
            background: '#ffe6e6',
            border: '1px solid #ff4d4f',
            borderRadius: '6px',
            color: '#d32f2f',
            marginBottom: '20px',
            fontSize: '14px',
          }}
        >
          ⚠️ {error}
        </div>
      ) : null}

      <button
        onClick={onInitialize}
        disabled={isLoadingSdk}
        style={{
          width: '100%',
          padding: '14px',
          background: isLoadingSdk
            ? '#ccc'
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: isLoadingSdk ? 'not-allowed' : 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          opacity: isLoadingSdk ? 0.7 : 1,
        }}
        onMouseOver={e => {
          if (!isLoadingSdk) {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
          }
        }}
        onMouseOut={e => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {isLoadingSdk ? '⏳ 正在加载 SDK...' : '🚀 初始化聊天客户端'}
      </button>

      <div
        style={{
          marginTop: '20px',
          padding: '12px',
          background: '#e3f2fd',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#1976d2',
        }}
      >
        💡 <strong>提示：</strong>
        如果您没有访问令牌，请到平台上获取，或者联系开发团队
      </div>
    </div>
  );
};
