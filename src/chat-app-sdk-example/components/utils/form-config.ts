// 表单配置类型定义和 localStorage 工具函数

export interface FormConfig {
  token: string;
  chatType: 'bot' | 'app';
  botId: string;
  appId: string;
  workflowId: string;
  draftMode: string;
  connectNetwork: number;
  apiUrl: string;
  logoUrl: string;
}

const FORM_STORAGE_KEY = 'webcomponent_demo_form_config';

const DEFAULT_FORM_CONFIG: FormConfig = {
  token: '',
  chatType: 'app',
  botId: '',
  appId: '',
  workflowId: '',
  draftMode: 'true',
  connectNetwork: 0,
  apiUrl: 'https://aiot-dev.glodon.com/api/cvforcepd/flow',
  logoUrl: 'https://minio-dev.glodon.com/opencoze/default_icon/default_agent_icon.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=IELEY0R9LRLA4IQI60T1%2F20251231%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251231T033702Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8760f1429d02997191248194fd15228b61f91a1e6e71a12b2d2a2fd3d96c8eca',
};

export const loadFormConfigFromStorage = (): FormConfig => {
  try {
    const stored = localStorage.getItem(FORM_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // 验证数据结构并合并默认值
      return {
        ...DEFAULT_FORM_CONFIG,
        ...parsed,
        // 确保类型正确
        chatType: parsed.chatType === 'bot' ? 'bot' : 'app',
        connectNetwork:
          typeof parsed.connectNetwork === 'number' ? parsed.connectNetwork : 0,
        // 如果 draftMode 为空，使用默认值 'true'
        draftMode: parsed.draftMode || 'true',
        // 如果 apiUrl 为空，使用默认值
        apiUrl: parsed.apiUrl || DEFAULT_FORM_CONFIG.apiUrl,
        // 如果 logoUrl 为空，使用默认值
        logoUrl: parsed.logoUrl || DEFAULT_FORM_CONFIG.logoUrl,
      };
    }
  } catch (e) {
    console.error('Failed to load form config from localStorage:', e);
  }
  return DEFAULT_FORM_CONFIG;
};

export const saveFormConfigToStorage = (config: FormConfig): void => {
  try {
    localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save form config to localStorage:', e);
  }
};

