export const UsageInstructions = () => {
  return (
    <div
      style={{
        background: '#fff3cd',
        border: '1px solid #ffc107',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
      }}
    >
      <h3 style={{ margin: '0 0 16px 0', color: '#856404' }}>
        💡 使用说明
      </h3>
      <div style={{ color: '#856404', lineHeight: '1.8' }}>
        <h4
          style={{
            margin: '0 0 8px 0',
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#856404',
          }}
        >
          📝 配置步骤
        </h4>
        <ol
          style={{
            margin: '0 0 16px 0',
            paddingLeft: '20px',
          }}
        >
          <li>
            <strong>选择聊天类型</strong>：Bot 模式或 App 模式（推荐）
          </li>
          <li>
            <strong>输入访问令牌</strong>：从环境变量读取或手动输入
          </li>
          <li>
            <strong>配置 ID</strong>：
            <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
              <li>Bot 模式：输入 Bot ID</li>
              <li>
                App 模式：输入 App ID 和 Workflow ID，可选配置 Draft Mode
              </li>
            </ul>
          </li>
          <li>
            <strong>配置 Schema Version 排序</strong>（可选）：
            <ul style={{ marginTop: '4px', paddingLeft: '20px' }}>
              <li>通过拖拽调整不同 数据定义版本 的渲染顺序</li>
              <li>正数区域：正常顺序渲染（renderIndex: 1, 2, 3...）</li>
              <li>
                负数区域：延迟渲染，在 chat complete 后渲染（renderIndex:
                -1, -2, -3...）
              </li>
              <li>可以添加自定义 数据定义版本，默认项不能删除</li>
              <li>配置会自动保存到 localStorage</li>
            </ul>
          </li>
          <li>
            <strong>点击初始化按钮</strong>：完成客户端初始化
          </li>
        </ol>

        <h4
          style={{
            margin: '0 0 8px 0',
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#856404',
          }}
        >
          🚀 使用功能
        </h4>
        <ol
          style={{
            margin: '0 0 16px 0',
            paddingLeft: '20px',
          }}
        >
          <li>点击右下角的悬浮按钮打开聊天窗口</li>
          <li>发送消息触发 Bot 响应</li>
          <li>
            如果 Bot 返回特定的 schema
            数据（如搜索结果、知识库参考），将使用 Web Components 渲染
          </li>
          <li>消息的渲染顺序由 Schema Version 排序配置决定</li>
          <li>打开浏览器控制台查看 Web Components 的生命周期日志</li>
        </ol>

        <h4
          style={{
            margin: '0 0 8px 0',
            fontSize: '15px',
            fontWeight: 'bold',
            color: '#856404',
          }}
        >
          🔧 Schema Version 排序配置说明
        </h4>
        <ul
          style={{
            margin: '0',
            paddingLeft: '20px',
          }}
        >
          <li>
            <strong>拖拽排序</strong>
            ：点击并拖拽项目到目标位置，支持同一区域内排序和跨区域移动
          </li>
          <li>
            <strong>添加新项</strong>：在输入框中输入
            数据定义版本，选择目标区域（正数/负数），点击"添加"按钮
          </li>
          <li>
            <strong>删除项</strong>
            ：点击项目右侧的"删除"按钮（默认项不能删除）
          </li>
          <li>
            <strong>渲染索引</strong>：系统会根据排序自动计算
            renderIndex，正数区域从 1 开始递增，负数区域从 -1 开始递减
          </li>
          <li>
            <strong>自动保存</strong>：所有配置变更会自动保存到浏览器
            localStorage，刷新页面后配置仍然保留
          </li>
        </ul>
      </div>
    </div>
  );
};

