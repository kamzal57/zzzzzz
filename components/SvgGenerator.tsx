import React, { useState, useEffect } from 'react';
import { generateSvg, isApiKeyConfigured } from '../lib/gemini';
import GeminiIcon from './GeminiIcon';
import DOMPurify from 'isomorphic-dompurify';
import ApiKeyNotice from './ApiKeyNotice';

const loadingMessages = [
    "Contacting the design muse...",
    "Translating ideas into vectors...",
    "Applying digital ink...",
    "Perfecting the curves...",
    "Finalizing the artwork...",
];

const SvgGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [generatedSvg, setGeneratedSvg] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [loadingMessage, setLoadingMessage] = useState<string>(loadingMessages[0]);
    const [copySuccess, setCopySuccess] = useState<boolean>(false);

    useEffect(() => {
        // Fix: Use ReturnType<typeof setInterval> for browser compatibility instead of NodeJS.Timeout
        let interval: ReturnType<typeof setInterval>;
        if (isLoading) {
            interval = setInterval(() => {
                setLoadingMessage(prev => {
                    const currentIndex = loadingMessages.indexOf(prev);
                    const nextIndex = (currentIndex + 1) % loadingMessages.length;
                    return loadingMessages[nextIndex];
                });
            }, 2000);
        }
        return () => clearInterval(interval);
    }, [isLoading]);

    const handleGenerate = async () => {
        const trimmedPrompt = prompt.trim();
        if (!trimmedPrompt) {
            setError('Please enter a description.');
            return;
        }
        if (trimmedPrompt.length > 1000) {
            setError('Description is too long. Please keep it under 1000 characters.');
            return;
        }
        if (!isApiKeyConfigured()) {
            setError('Missing API key. Please set VITE_GEMINI_API_KEY in .env.local and reload.');
            return;
        }
        setIsLoading(true);
        setError('');
        setGeneratedSvg('');
        setLoadingMessage(loadingMessages[0]);
        try {
            const svgResult = await generateSvg(trimmedPrompt);
             // Basic validation to check if the result is likely SVG
            if (svgResult.trim().startsWith('<svg')) {
                const safe = DOMPurify.sanitize(svgResult, { USE_PROFILES: { svg: true } });
                if (safe.length === 0) {
                    throw new Error("Generated SVG was empty or invalid after sanitization.");
                }
                setGeneratedSvg(safe);
            } else {
                throw new Error("The AI did not return valid SVG. Please try again with a more specific prompt.");
            }
        } catch (e: any) {
            setError(`Generation failed: ${e.message || 'An unexpected error occurred. Please try again.'}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCopy = async () => {
        if (!generatedSvg) return;
        try {
            await navigator.clipboard.writeText(generatedSvg);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            console.error('Failed to copy to clipboard:', err);
            // Fallback: create a temporary textarea
            const textarea = document.createElement('textarea');
            textarea.value = generatedSvg;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            } catch (fallbackErr) {
                console.error('Fallback copy failed:', fallbackErr);
            }
            document.body.removeChild(textarea);
        }
    };

    return (
        <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6 mb-10 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1 flex items-center gap-2">
                <GeminiIcon /> AI SVG Generator
            </h2>
            <p id="svg-generator-description" className="text-slate-400 mb-4 text-sm">Describe an image, icon, or logo, and let Gemini Pro bring it to life as an SVG.</p>

            {!isApiKeyConfigured() && (
                <ApiKeyNotice className="mb-4" />
            )}

            <div className="flex flex-col sm:flex-row gap-2 mb-4">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A smiling sun icon with sunglasses"
                    className="w-full bg-slate-700/50 text-slate-200 placeholder-slate-500 rounded-lg p-3 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                    disabled={isLoading}
                    onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
                    aria-label="SVG description input"
                    aria-describedby="svg-generator-description"
                    maxLength={1000}
                />
                <button
                    onClick={handleGenerate}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
                    aria-label="Generate SVG from description"
                >
                    {isLoading ? 'Generating...' : 'Generate'}
                </button>
            </div>
            
            {error && <div role="alert" aria-live="assertive" className="text-red-400 bg-red-900/50 border border-red-700 rounded-md p-3 text-center my-4">{error}</div>}
            
            {(isLoading || generatedSvg) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div>
                        <h3 className="font-semibold text-slate-200 mb-2">Generated Preview</h3>
                        <div className="bg-grid rounded-md border border-slate-700 h-64 p-2 flex items-center justify-center">
                            {isLoading ? (
                                <div className="text-center">
                                    <div className="w-8 h-8 mx-auto border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></div>
                                    <p className="text-slate-400 mt-4 animate-pulse">{loadingMessage}</p>
                                </div>
                            ) : (
                                <div className="w-full h-full p-4 flex items-center justify-center" dangerouslySetInnerHTML={{ __html: generatedSvg }} />
                            )}
                        </div>
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-slate-200">SVG Code</h3>
                            <button onClick={handleCopy} className="text-xs bg-slate-600 hover:bg-slate-500 text-white font-semibold py-1 px-3 rounded-full transition-colors duration-200">
                                {copySuccess ? 'Copied!' : 'Copy'}
                            </button>
                        </div>
                        <pre className="bg-gray-900 text-sm text-cyan-300 p-3 rounded-md h-64 overflow-auto">
                            <code>{isLoading ? '...' : generatedSvg.trim()}</code>
                        </pre>
                    </div>
                </div>
            )}
        </section>
    );
};

export default SvgGenerator;