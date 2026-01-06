export const InitializationSuccess = () => {
  return (
    <div
      style={{
        background: '#d4edda',
        border: '1px solid #28a745',
        borderRadius: '8px',
        padding: '20px',
        marginBottom: '30px',
        color: '#155724',
      }}
    >
      <h3 style={{ margin: '0 0 12px 0' }}>✅ 初始化成功！</h3>
      <p style={{ margin: 0, fontSize: '14px' }}>
        聊天客户端已成功初始化，请点击右下角的悬浮按钮打开聊天窗口。
      </p>
    </div>
  );
};

