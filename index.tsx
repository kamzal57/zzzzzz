
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { isApiKeyConfigured } from './lib/gemini';

// Log API key status on app startup
if (isApiKeyConfigured()) {
  console.log('🚀 SVG Animation Learning Path - AI features enabled');
} else {
  console.warn('🚀 SVG Animation Learning Path - AI features disabled (no API key)');
  console.info('💡 To enable AI features, set VITE_GEMINI_API_KEY in .env.local');
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
   