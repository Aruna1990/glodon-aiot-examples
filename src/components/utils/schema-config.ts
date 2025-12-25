// Schema Version 排序配置类型定义
export interface SchemaVersionConfig {
  schemaVersion: string;
  renderIndex: number;
}

export interface SortConfig {
  positive: SchemaVersionConfig[]; // renderIndex > 0
  negative: SchemaVersionConfig[]; // renderIndex < 0
}

const STORAGE_KEY = '数据定义版本_sort_config';

const DEFAULT_CONFIG: SortConfig = {
  positive: [
    { schemaVersion: 'cvforce.knowledge.refrence.v1', renderIndex: 9 },
  ],
  negative: [{ schemaVersion: 'cvforce.search.result.v1', renderIndex: -1 }],
};

// localStorage 工具函数
export const loadConfigFromStorage = (): SortConfig => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // 验证数据结构
      if (
        parsed.positive &&
        Array.isArray(parsed.positive) &&
        parsed.negative &&
        Array.isArray(parsed.negative)
      ) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load config from localStorage:', e);
  }
  return DEFAULT_CONFIG;
};

