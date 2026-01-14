import { SearchResultList } from './search-result-list';
import { KnowledgeReferenceList } from './knowledge-reference-list';
import { MergedReferenceList } from './merged-reference-list';
import { ReasoningContent } from './reasoning-content';
import { CustomJsonItem } from './CustomJsonItem';
import { CustomContentBox } from './CustomContentBox';

// 注册 Web Components
export const registerWebComponents = () => {
  if (!customElements.get('search-result-list')) {
    customElements.define('search-result-list', SearchResultList);
    console.log('✅ Registered: search-result-list');
  }

  if (!customElements.get('knowledge-reference-list')) {
    customElements.define('knowledge-reference-list', KnowledgeReferenceList);
    console.log('✅ Registered: knowledge-reference-list');
  }

  if (!customElements.get('merged-reference-list')) {
    customElements.define('merged-reference-list', MergedReferenceList);
    console.log('✅ Registered: merged-reference-list');
  }

  if (!customElements.get('reasoning-content')) {
    customElements.define('reasoning-content', ReasoningContent);
    console.log('✅ Registered: reasoning-content');
  }

  if (!customElements.get('demo-json-item')) {
    customElements.define('demo-json-item', CustomJsonItem);
    console.log('✅ Registered: demo-json-item');
  }

  if (!customElements.get('demo-content-box')) {
    customElements.define('demo-content-box', CustomContentBox);
    console.log('✅ Registered: demo-content-box');
  }
};

