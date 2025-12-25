/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHAT_APP_COZE_TOKEN?: string;
  readonly VITE_CHAT_APP_INDEX_COZE_BOT_ID?: string;
  readonly VITE_CHAT_APP_CHATFLOW_COZE_APP_ID?: string;
  readonly VITE_CHAT_APP_CHATFLOW_COZE_WORKFLOW_ID?: string;
  readonly VITE_CHAT_APP_DRAFT_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

