import React, { useState } from 'react';

interface ApiKeyNoticeProps {
  className?: string;
}

const ApiKeyNotice: React.FC<ApiKeyNoticeProps> = ({ className }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`rounded-md border border-amber-600 bg-amber-900/30 text-amber-200 p-3 text-sm ${className ?? ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <strong className="font-semibold">⚠️ Clé API manquante</strong>
          <p className="mt-1">
            Les fonctionnalités IA nécessitent une clé API Gemini. 
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="ml-2 text-amber-300 hover:text-amber-100 underline font-medium"
            >
              {showDetails ? 'Masquer les instructions' : 'Comment configurer ?'}
            </button>
          </p>
        </div>
      </div>
      
      {showDetails && (
        <div className="mt-3 p-3 bg-amber-950/50 rounded border border-amber-700">
          <ol className="list-decimal list-inside space-y-2 text-xs">
            <li>
              Obtenez une clé API gratuite sur{' '}
              <a 
                href="https://aistudio.google.com/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-300 hover:text-cyan-200 underline"
              >
                Google AI Studio
              </a>
            </li>
            <li>Créez un fichier <code className="bg-slate-800 px-1 py-0.5 rounded">.env.local</code> à la racine du projet</li>
            <li>Ajoutez la ligne : <code className="bg-slate-800 px-1 py-0.5 rounded">VITE_GEMINI_API_KEY=votre_clé_ici</code></li>
            <li>Redémarrez le serveur de développement (<code className="bg-slate-800 px-1 py-0.5 rounded">npm run dev</code>)</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default ApiKeyNotice;
