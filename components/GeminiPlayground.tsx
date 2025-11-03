import React, { useState, useRef } from 'react';
import { askWithSearch } from '../lib/gemini';
import { GenerateContentResponse } from '@google/genai';
import GeminiIcon from './GeminiIcon';
import MarkdownRenderer from './MarkdownRenderer';

interface GeminiPlaygroundProps {
  context: string;
  placeholder: string;
}

const GeminiPlayground: React.FC<GeminiPlaygroundProps> = ({ context, placeholder }) => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<GenerateContentResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError('');
    setResponse(null);

    try {
      const result = await askWithSearch(context, question);
      setResponse(result);
    } catch (err: any) {
      setError(`An error occurred: ${err.message}`);
    } finally {
      setIsLoading(false);
      setQuestion('');
    }
  };

  const groundingChunks = response?.candidates?.[0]?.groundingMetadata?.groundingChunks;
  const webSources = groundingChunks?.filter(chunk => chunk.web).map(chunk => chunk.web);

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
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

      {error && <p className="text-red-400 mt-4">{error}</p>}
      
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