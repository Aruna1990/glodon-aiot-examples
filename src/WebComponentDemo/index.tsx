import React, { useState, useRef, useEffect } from 'react';

import { CustomJsonItem } from '../components/CustomJsonItem';
import type { SortConfig } from '../components/utils/schema-config';
import {
  loadConfigFromStorage,
  saveConfigToStorage,
} from '../components/utils/schema-config';
import {
  loadFormConfigFromStorage,
  saveFormConfigToStorage,
  type FormConfig,
} from '../components/utils/form-config';
import { NetworkSwitchWrapper } from '../components/NetworkSwitch';
import { registerWebComponents } from '../components/registerWebComponents';
import { Header } from './Header';
import { RegisteredComponents } from './RegisteredComponents';
import { BrowserCompatibility } from './BrowserCompatibility';
import { InitializationSuccess } from './InitializationSuccess';
import { UsageInstructions } from './UsageInstructions';
import { DocumentationLink } from './DocumentationLink';
import { ConfigurationForm } from './ConfigurationForm';

// 注册 Web Components
registerWebComponents();

export const WebComponentDemo = () => {
  // 从 localStorage 加载表单配置
  const initialFormConfig = loadFormConfigFromStorage();

  const [token, setToken] = useState(initialFormConfig.token);
  const [chatType] = useState<'bot' | 'app'>(initialFormConfig.chatType);
  const [botId, setBotId] = useState(initialFormConfig.botId);
  const [appId, setAppId] = useState(initialFormConfig.appId);
  const [workflowId, setWorkflowId] = useState(initialFormConfig.workflowId);
  const [draftMode, setDraftMode] = useState<string>(
    initialFormConfig.draftMode,
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState('');
  const [isLoadingSdk, setIsLoadingSdk] = useState(false); // SDK 加载状态
  const [connectNetwork, setConnectNetwork] = useState<number>(
    initialFormConfig.connectNetwork,
  ); // 联网开关状态：0=不联网，1=自动联网，2=必须联网
  const connectNetworkRef = useRef<number>(initialFormConfig.connectNetwork); // 使用 ref 存储最新值，确保闭包中能访问到最新值
  const clientRef = useRef<any>(null); // 保存客户端实例引用（使用 any 因为动态导入）
  const [schemaSortConfig, setSchemaSortConfig] = useState<SortConfig>(() =>
    loadConfigFromStorage(),
  );

  // 当 Schema Version 配置改变时保存到 localStorage
  useEffect(() => {
    saveConfigToStorage(schemaSortConfig);
  }, [schemaSortConfig]);

  // 同步 connectNetworkRef
  useEffect(() => {
    connectNetworkRef.current = connectNetwork;
  }, [connectNetwork]);

  // 当表单配置改变时保存到 localStorage
  useEffect(() => {
    const formConfig: FormConfig = {
      token,
      chatType,
      botId,
      appId,
      workflowId,
      draftMode,
      connectNetwork,
    };
    saveFormConfigToStorage(formConfig);
  }, [token, chatType, botId, appId, workflowId, draftMode, connectNetwork]);

  const initializeClient = async () => {
    // 检查浏览器支持
    if (!window.customElements) {
      alert(
        '当前浏览器不支持 Web Components，请使用现代浏览器（Chrome 54+, Firefox 63+, Safari 10.1+）',
      );
      return;
    }

    // 验证输入
    if (!token.trim()) {
      setError('请输入访问令牌（Token）');
      return;
    }

    if (chatType === 'bot' && !botId.trim()) {
      setError('请输入 Bot ID');
      return;
    }

    if (chatType === 'app') {
      if (!appId.trim()) {
        setError('请输入 App ID');
        return;
      }
      if (!workflowId.trim()) {
        setError('请输入 Workflow ID');
        return;
      }
    }

    setError('');
    setIsLoadingSdk(true);
    console.log('🚀 Loading SDK and initializing WebChatClient...');

    try {
      // 动态导入 SDK（延迟加载，减少初始 bundle 大小）
      const { WebChatClient } = await import('@glodon-aiot/chat-app-sdk');
      console.log('✅ SDK loaded successfully');
      // 构建配置对象
      const config: any = {
        type: chatType === 'app' ? 'app' : undefined,
      };

      if (chatType === 'bot') {
        config.botId = botId.trim();
      } else {
        const draftModeValue =
          draftMode === 'true'
            ? true
            : draftMode === 'false'
              ? false
              : undefined;
        // 同步更新 ref
        connectNetworkRef.current = connectNetwork;
        config.appInfo = {
          appId: appId.trim(),
          workflowId: workflowId.trim(),
          ...(draftModeValue !== undefined && { draft_mode: draftModeValue }),
          parameters: {
            SETTING: {
              ENABLE_NETWORK: connectNetwork, // 0: 不联网；1: 自动联网；2: 必须联网
            },
          },
        };
      }

      // 初始化 WebChatClient
      const client = new WebChatClient({
        env: 'test',
        apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow',
        config,
        auth: {
          type: 'token',
          token: token.trim(),
          onRefreshToken: () => token.trim(),
        },
        extra: {
          webChat: {
            test: 'webcomponent-demo',
          },
        },
        ui: {
          base: {
            lang: 'zh-CN',
            layout: 'pc',
            zIndex: 1000,
            icon: 'https://minio-dev.glodon.com/opencoze/default_icon/default_agent_icon.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=IELEY0R9LRLA4IQI60T1%2F20251231%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251231T033702Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8760f1429d02997191248194fd15228b61f91a1e6e71a12b2d2a2fd3d96c8eca',
          },
          asstBtn: {
            isNeed: true,
          },
          chatBot: {
            uploadable: true,
            isNeedClearContext: false, // 显示清除上下文按钮
            isNeedClearMessage: false, // 不显示删除对话记录按钮
            isNeedAddNewConversation: false, // 不显示新建会话按钮
            isNeedFunctionCallMessage: true,
            // isNeedQuote: true,
            width: 1000,
          },
          // 🎯 使用 Web Components
          uiKitCustomWebComponents: {
            JsonItem: 'demo-json-item',
          },
          // uiKitCustomComponents: {
          //   JsonItem: (props: any) => {
          //     return <div>JsonItem</div>;
          //   },
          // },
          // 可选：使用自定义 ContentBox
          // contentBoxWebComponent: 'demo-content-box',
          getMessageRenderIndex: CustomJsonItem.getJSONOutputMessageRenderIndex,
          header: {
            isShow: true,
            isNeedClose: false,
            isNeedLogo: true, // 显示 header 中的 icon
          },
          conversations: {
            isNeed: true,
          },
          // 🌐 在输入框右侧按钮区域添加联网开关（与文件上传按钮一起显示）
          input: {
            renderChatInputRightActions: () => {
              // 每次调用时都同步最新的 state 到 ref，确保获取最新值
              if (
                connectNetworkRef.current === null ||
                connectNetworkRef.current === undefined
              ) {
                connectNetworkRef.current = connectNetwork;
              }
              console.log(
                'renderChatInputRightActions 被调用，当前 connectNetwork:',
                connectNetworkRef.current,
                '(0: 不联网；1: 自动联网；2: 必须联网)',
              );
              // 使用 React.createElement 确保使用正确的 React 实例，避免 hooks 错误
              return React.createElement(NetworkSwitchWrapper, {
                connectNetworkRef,
                setConnectNetwork: (value: number) => {
                  console.log('setConnectNetwork 被调用，新值:', value);
                  setConnectNetwork(value);
                  connectNetworkRef.current = value;
                },
                clientRef,
                chatType,
              });
            },
            inputMode: 'multi-line',
          },
          footer: {
            isShow: false,
          },
        },
      });

      // 保存客户端实例引用
      clientRef.current = client;

      setIsInitialized(true);
      setIsLoadingSdk(false);
      console.log('✅ WebChatClient initialized with Web Components!');
    } catch (err) {
      console.error('❌ Initialization error:', err);
      setIsLoadingSdk(false);
      setError(
        `初始化失败: ${err instanceof Error ? err.message : String(err)}`,
      );
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <Header />

      {/* 配置表单 */}
      {!isInitialized && (
        <ConfigurationForm
          token={token}
          setToken={setToken}
          chatType={chatType}
          botId={botId}
          setBotId={setBotId}
          appId={appId}
          setAppId={setAppId}
          workflowId={workflowId}
          setWorkflowId={setWorkflowId}
          draftMode={draftMode}
          setDraftMode={setDraftMode}
          schemaSortConfig={schemaSortConfig}
          setSchemaSortConfig={setSchemaSortConfig}
          error={error}
          isLoadingSdk={isLoadingSdk}
          onInitialize={initializeClient}
        />
      )}

      {/* 初始化成功提示 */}
      {isInitialized ? <InitializationSuccess /> : null}

      {isInitialized ? <UsageInstructions /> : null}

      <RegisteredComponents />

      <BrowserCompatibility />

      <DocumentationLink />
    </div>
  );
};
