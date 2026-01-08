import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { IntroductionPage } from './components/IntroductionPage';
import { QuickStartPage } from './components/QuickStartPage';
import { DemoPage } from './components/DemoPage';
import { WebComponentsPage } from './components/WebComponentsPage';
import { BrowserCompatibilityPage } from './components/BrowserCompatibilityPage';
import { ConfigDocsPage } from './components/ConfigDocsPage';
import { ApiReferencePage } from './components/ApiReferencePage';

export const WebComponentDemo = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/quickstart" element={<QuickStartPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/webcomponents" element={<WebComponentsPage />} />
        <Route path="/browser" element={<BrowserCompatibilityPage />} />
        <Route path="/docs" element={<ConfigDocsPage />} />
        <Route path="/api" element={<ApiReferencePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};
