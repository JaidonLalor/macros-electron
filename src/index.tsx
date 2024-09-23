import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './components/Layout';
import { ViewProvider } from './providers/ViewProvider';

const root = document.getElementById('root');
if (root) {
  (ReactDOM as any).createRoot(root).render(
    <React.StrictMode>
      <ViewProvider>
        <Layout />
      </ViewProvider>
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}