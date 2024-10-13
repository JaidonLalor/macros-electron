import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout';
import { ViewProvider } from './providers/ViewProvider';
import { RecordProvider } from './providers/RecordProvider';
import { PresetProvider } from './providers/PresetProvider';

const root = document.getElementById('root');
if (root) {
  (ReactDOM as any).createRoot(root).render(
    <React.StrictMode>
      <ViewProvider>
        <PresetProvider>
          <RecordProvider>
            <Layout />
          </RecordProvider>
        </PresetProvider>
      </ViewProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}