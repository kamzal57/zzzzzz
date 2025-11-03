import React from 'react';

interface ApiKeyNoticeProps {
  className?: string;
}

const ApiKeyNotice: React.FC<ApiKeyNoticeProps> = ({ className }) => {
  return (
    <div className={`rounded-md border border-amber-600 bg-amber-900/30 text-amber-200 p-3 text-sm ${className ?? ''}`} role="alert" aria-live="polite">
      <strong className="font-semibold">Clé API manquante :</strong> définissez VITE_GEMINI_API_KEY dans un fichier .env.local à la racine. Certaines fonctions IA seront inopérantes tant que la clé n'est pas configurée.
    </div>
  );
};

export default ApiKeyNotice;
