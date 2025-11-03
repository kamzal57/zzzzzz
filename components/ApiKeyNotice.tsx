import React from 'react';

interface ApiKeyNoticeProps {
  className?: string;
}

/**
 * ApiKeyNotice Component
 * 
 * Displays a warning notice when the Gemini API key is not configured.
 * Used across the application to inform users about missing API configuration.
 * 
 * @param {string} [className] - Optional additional CSS classes
 */
const ApiKeyNotice: React.FC<ApiKeyNoticeProps> = ({ className }) => {
  return (
    <div 
      className={`rounded-md border border-amber-600 bg-amber-900/30 text-amber-200 p-3 text-sm ${className ?? ''}`}
      role="alert"
      aria-live="polite"
    >
      <strong className="font-semibold">Missing API Key:</strong> Set VITE_GEMINI_API_KEY in a .env.local file at the root. AI features will be unavailable until the key is configured.
    </div>
  );
};

export default ApiKeyNotice;
