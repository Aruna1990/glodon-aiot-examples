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
