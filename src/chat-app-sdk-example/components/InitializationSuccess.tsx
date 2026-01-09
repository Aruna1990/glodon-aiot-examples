export const InitializationSuccess = () => {
  return (
    <>
      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.6;
            }
          }
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
      <div
        style={{
          background: '#f0f9f2',
          border: '1px solid #c3e6cb',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
          color: '#155724',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <h3 style={{ margin: '0 0 12px 0' }}>✅ 初始化成功！</h3>
        <p style={{ margin: '0 0 24px 0', fontSize: '14px' }}>
          聊天客户端已成功初始化，请点击右下角的悬浮按钮打开聊天窗口。
        </p>

        {/* 动画提示：指向右下角悬浮按钮 */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '12px',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              fontSize: '16px',
              color: '#28a745',
              fontWeight: '700',
              animation: 'pulse 2s ease-in-out infinite',
              background: 'rgba(255, 255, 255, 0.9)',
              padding: '8px 16px',
              borderRadius: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            }}
          >
            点击这里
          </div>
          <div
            style={{
              fontSize: '32px',
              animation: 'bounce 1.5s ease-in-out infinite',
              transformOrigin: 'center',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          >
            👇
          </div>
        </div>
      </div>
    </>
  );
};

