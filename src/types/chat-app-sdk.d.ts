/**
 * 类型声明文件：@glodon-aiot/chat-app-sdk
 * 用于解决构建时找不到类型声明的问题
 */

/// <reference types="react" />

declare module '@glodon-aiot/chat-app-sdk' {
  import type { ReactNode } from 'react';
  // 基础类型定义
  export interface CozeChatOptions {
    env?: 'test' | 'prod';
    apiUrl?: string;
    config?: {
      type?: 'bot' | 'app';
      botId?: string;
      appInfo?: {
        appId?: string;
        workflowId?: string;
        draft_mode?: boolean;
        parameters?: Record<string, unknown>;
      };
    };
    auth?: {
      type?: 'token';
      token?: string;
      onRefreshToken?: () => string;
    };
    extra?: Record<string, unknown>;
    ui?: {
      base?: {
        lang?: string;
        layout?: 'pc' | 'mobile';
        zIndex?: number;
        icon?: string;
      };
      asstBtn?: {
        isNeed?: boolean;
      };
      chatBot?: {
        uploadable?: boolean;
        isNeedClearContext?: boolean;
        isNeedClearMessage?: boolean;
        isNeedAddNewConversation?: boolean;
        isNeedFunctionCallMessage?: boolean;
        width?: number;
      };
      uiKitCustomWebComponents?: {
        JsonItem?: string;
      };
      contentBoxWebComponent?: string;
      getMessageRenderIndex?: (message: unknown | undefined) => number;
      header?: {
        isShow?: boolean;
        isNeedClose?: boolean;
        isNeedLogo?: boolean; // 是否显示 logo/icon，默认为 true
        icon?: string; // logo/icon 的 URL，如果设置则覆盖 base.icon
        extra?: ReactNode | false; // 用于站位的，默认无
      };
      conversations?: {
        isNeed?: boolean;
      };
      input?: {
        renderChatInputRightActions?: () => ReactNode;
        placeholder?: string;
        isShow?: boolean;
        defaultText?: string;
        isNeedAudio?: boolean;
        /**
         * 输入框模式：'single-line' | 'multi-line'
         * 'single-line': 单行模式，按钮在右侧
         * 'multi-line': 多行模式，发送按钮在右下角，其他辅助按钮在左下角
         * 默认值：根据 textarea 高度自动检测（保持向后兼容）
         */
        inputMode?: 'single-line' | 'multi-line';
      };
      footer?: {
        isShow?: boolean;
      };
    };
    getContainer?: () => HTMLElement;
    mode?: 'float' | 'embed';
  }

  export class WebChatClient {
    static clients: WebChatClient[];
    readonly chatClientId: string;
    readonly options: CozeChatOptions;
    readonly senderName: string;
    readonly apiUrl: string;
    readonly authClient: unknown;
    readonly globalStore: unknown;

    constructor(options: CozeChatOptions);

    // 添加常用的公共方法声明（根据实际使用情况可以扩展）
    [key: string]: unknown;
  }
}
