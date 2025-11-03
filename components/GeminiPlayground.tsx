import React, { useState, useRef } from 'react';
import { askWithSearch, isApiKeyConfigured } from '../lib/gemini';
import { GenerateContentResponse } from '@google/genai';
import GeminiIcon from './GeminiIcon';
import MarkdownRenderer from './MarkdownRenderer';
import ApiKeyNotice from './ApiKeyNotice';

interface GeminiPlaygroundProps {
  context: string;
  placeholder: string;
}

interface ConversationEntry {
  question: string;
  response: GenerateContentResponse;
  timestamp: Date;
}

const GeminiPlayground: React.FC<GeminiPlaygroundProps> = ({ context, placeholder }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<GenerateContentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversationHistory, setConversationHistory] = useState<ConversationEntry[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    if (!isApiKeyConfigured()) {
      setError('Missing API key. Please set VITE_GEMINI_API_KEY in .env.local and reload.');
      return;
    }

    const currentQuestion = question;
    setIsLoading(true);
    setError('');
    setResponse(null);

    try {
      const result = await askWithSearch(context, currentQuestion);
      setResponse(result);
      // Add to conversation history
      setConversationHistory(prev => [...prev, {
        question: currentQuestion,
        response: result,
        timestamp: new Date()
      }]);
    } catch (err: any) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const handleClearConversation = () => {
    setConversationHistory([]);
    setResponse(null);
    setError('');
    setQuestion('');
  };

  const handleCopyResponse = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }).catch((err) => {
      console.error('Failed to copy text: ', err);
      setError('Failed to copy to clipboard');
    });
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      {!isApiKeyConfigured() && <ApiKeyNotice className="mb-3" />}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <GeminiIcon className="w-6 h-6 flex-shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-700/50 text-slate-200 placeholder-slate-500 rounded-md p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
          ) : (
            'Ask'
          )}
        </button>
      </form>

      {conversationHistory.length > 0 && (
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleClearConversation}
            className="text-xs bg-slate-600 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full transition-colors duration-200"
          >
            Clear History
          </button>
        </div>
      )}

      {error && <p className="text-red-400 mt-4">{error}</p>}
      
      {/* Display conversation history */}
      {conversationHistory.length > 0 && (
        <div className="mt-4 space-y-4 border-t border-slate-700 pt-4">
          {conversationHistory.map((entry, index) => {
            const groundingChunks = entry.response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
            const webSources = groundingChunks?.filter(chunk => chunk.web).map(chunk => chunk.web);
            
            return (
              <div key={`${entry.timestamp.getTime()}-${index}`} className="border-b border-slate-700 pb-4 last:border-b-0">
                <div className="mb-2">
                  <p className="text-sm text-slate-400 mb-1">
                    {entry.timestamp.toLocaleTimeString()}
                  </p>
                  <p className="text-cyan-400 font-medium">Q: {entry.question}</p>
                </div>
                <div className="bg-slate-700/30 rounded-md p-3">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-xs text-slate-500">Response:</p>
                    <button
                      onClick={() => handleCopyResponse(entry.response.text, index)}
                      className="text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-2 rounded transition-colors duration-200"
                    >
                      {copiedIndex === index ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                  <MarkdownRenderer content={entry.response.text} />
                  {webSources && webSources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-600">
                      <h4 className="text-xs font-semibold text-slate-300 mb-2">Sources:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {webSources.map((source, sourceIndex) => (
                          <li key={sourceIndex} className="text-xs">
                            <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline truncate">
                              {source.title || source.uri}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Current loading/response state */}
      {(isLoading || response) && (
        <div className="mt-4 border-t border-slate-700 pt-4">
          {isLoading && !response && (
             <p className="text-slate-400 animate-pulse">Gemini is thinking...</p>
          )}
          {response && (
            <>
              <MarkdownRenderer content={response.text} />
              {(() => {
                const groundingChunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
                const webSources = groundingChunks?.filter(chunk => chunk.web).map(chunk => chunk.web);
                return webSources && webSources.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Sources from the web:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {webSources.map((source, index) => (
                        <li key={index} className="text-sm">
                          <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline truncate">
                            {source.title || source.uri}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiPlayground;