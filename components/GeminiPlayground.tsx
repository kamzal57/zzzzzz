import React, { useState, useRef, useMemo } from 'react';
import { askWithSearch, isApiKeyConfigured } from '../lib/gemini';
import { GenerateContentResponse } from '@google/genai';
import GeminiIcon from './GeminiIcon';
import MarkdownRenderer from './MarkdownRenderer';
import ApiKeyNotice from './ApiKeyNotice';

interface GeminiPlaygroundProps {
  context: string;
  placeholder: string;
}

/**
 * GeminiPlayground Component
 * 
 * Interactive AI assistant that allows users to ask questions about SVG lessons
 * and receive answers powered by Google Gemini with web search capabilities.
 * 
 * @param {string} context - The lesson context to provide to the AI
 * @param {string} placeholder - Placeholder text for the input field
 * 
 * @component
 */
const GeminiPlayground: React.FC<GeminiPlaygroundProps> = ({ context, placeholder }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<GenerateContentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Memoize question validation to avoid repeated trim operations
  const isQuestionEmpty = useMemo(() => !question.trim(), [question]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || isLoading) return;

    if (trimmedQuestion.length > 500) {
      setError('Question is too long. Please keep it under 500 characters.');
      return;
    }

    if (!isApiKeyConfigured()) {
      setError('Missing API key. Please set VITE_GEMINI_API_KEY in .env.local and reload.');
      return;
    }

    setIsLoading(true);
    setError('');
    setResponse(null);

    try {
      const result = await askWithSearch(context, trimmedQuestion);
      if (!result || !result.text) {
        throw new Error('No response received from AI.');
      }
      setResponse(result);
    } catch (err: any) {
      setError(`An error occurred: ${err.message || 'Failed to get response. Please try again.'}`);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const groundingChunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const webSources = groundingChunks?.filter(chunk => chunk.web).map(chunk => chunk.web);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
      {!isApiKeyConfigured() && <ApiKeyNotice className="mb-3" />}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <GeminiIcon className="w-6 h-6 flex-shrink-0" aria-hidden="true" />
        <input
          ref={inputRef}
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-slate-700/50 text-slate-200 placeholder-slate-500 rounded-md p-2 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
          disabled={isLoading}
          aria-label="Ask a question"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={isLoading || isQuestionEmpty}
          className="bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          aria-label="Submit question"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin" aria-label="Loading"></div>
          ) : (
            'Ask'
          )}
        </button>
      </form>

      {error && <div role="alert" aria-live="assertive" className="text-red-400 mt-4">{error}</div>}
      
      {(isLoading || response) && (
        <div className="mt-4 border-t border-slate-700 pt-4">
          {isLoading && !response && (
             <p className="text-slate-400 animate-pulse">Gemini is thinking...</p>
          )}
          {response && (
            <>
              <MarkdownRenderer content={response.text} />
              {webSources && webSources.length > 0 && (
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
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default GeminiPlayground;