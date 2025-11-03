import React, { useState, useRef } from 'react';
import { explainSvg } from '../lib/gemini';
import GeminiIcon from './GeminiIcon';
import MarkdownRenderer from './MarkdownRenderer';
import DOMPurify from 'isomorphic-dompurify';
import { isApiKeyConfigured } from '../lib/gemini';
import ApiKeyNotice from './ApiKeyNotice';

const UploadIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
    </svg>
);

const Optimizer: React.FC = () => {
    const [originalSvg, setOriginalSvg] = useState<string>('');
    const [optimizedSvg, setOptimizedSvg] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');
    const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isExplaining, setIsExplaining] = useState<boolean>(false);
    const [explanation, setExplanation] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const resetState = () => {
        setOriginalSvg('');
        setOptimizedSvg('');
        setFileName('');
        setError('');
        setIsDragging(false);
        setExplanation('');
        if(fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const processFile = (file: File | null) => {
        if (!file) return;

        if (file.type !== 'image/svg+xml') {
            setError('Invalid file. Please select an SVG file.');
            return;
        }

        resetState();
        setFileName(file.name);
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target?.result as string;
            setOriginalSvg(text);
        };
        reader.readAsText(file);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        processFile(event.target.files?.[0] ?? null);
    };

    const handleOptimize = async () => {
        if (!originalSvg) return;
        setIsOptimizing(true);
        setOptimizedSvg('');
        setError('');
        try {
            const { optimize } = await import('https://cdn.jsdelivr.net/npm/svgo@3.3.2/dist/svgo.browser.mjs');
            const result = optimize(originalSvg, {
                multipass: true,
                plugins: [
                    { name: 'preset-default' },
                    { name: 'removeDimensions' },
                    { name: 'removeViewBox', active: false }
                ]
            });
            if (result.error) {
                throw new Error(result.error);
            }
            setOptimizedSvg(result.data);
        } catch (e: any) {
            setError(`Optimization Error: ${e.message || 'The SVG may be invalid.'}`);
            setOptimizedSvg('');
        } finally {
            setIsOptimizing(false);
        }
    };

    const handleExplain = async () => {
        if (!originalSvg) return;
        setIsExplaining(true);
        setExplanation('');
        setError('');
        try {
            const result = await explainSvg(originalSvg);
            setExplanation(result);
        } catch (e: any) {
            setError(`AI Error: ${e.message || 'Could not explain SVG.'}`);
            setExplanation('');
        } finally {
            setIsExplaining(false);
        }
    };

    const handleDownload = () => {
        if (!optimizedSvg) return;
        const blob = new Blob([optimizedSvg], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const newName = fileName.replace('.svg', '.min.svg');
        a.download = newName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, isEntering: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(isEntering);
    };
    
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
            e.dataTransfer.clearData();
        }
    };

    const formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    const originalSize = originalSvg.length;
    const optimizedSize = optimizedSvg.length;
    const reduction = originalSize > 0 ? ((originalSize - optimizedSize) / originalSize) * 100 : 0;

    const sanitizedOriginal = DOMPurify.sanitize(originalSvg, { USE_PROFILES: { svg: true } });
    const sanitizedOptimized = DOMPurify.sanitize(optimizedSvg, { USE_PROFILES: { svg: true } });

    return (
        <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 sm:p-6 mb-10 shadow-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">SVG Optimizer & Inspector</h2>
            <p className="text-slate-400 mb-6 text-sm">Powered by <a href="https://jakearchibald.github.io/svgomg/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">SVGOMG</a> and Gemini. Clean, optimize, and understand your SVGs.</p>
            {!isApiKeyConfigured() && (
                <ApiKeyNotice className="mb-4" />
            )}
            
            {!originalSvg && (
                <div 
                    className={`relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors duration-300 ${isDragging ? 'border-cyan-400 bg-slate-700/50' : 'border-slate-600 hover:border-slate-500'}`}
                    onDragEnter={(e) => handleDragEvents(e, true)}
                    onDragLeave={(e) => handleDragEvents(e, false)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <UploadIcon />
                    <p className="mt-2 text-slate-300">
                        <span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop an SVG file.
                    </p>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/svg+xml" className="hidden" />
                </div>
            )}

            {error && <p className="text-red-400 bg-red-900/50 border border-red-700 rounded-md p-3 text-center my-4">{error}</p>}
            
            {originalSvg && (
                <div className="space-y-6">
                    <div className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                        <p className="text-sm text-slate-300 truncate">File: <span className="font-medium text-white">{fileName}</span></p>
                        <button onClick={resetState} className="text-xs bg-slate-600 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded-full transition-colors duration-200">Change File</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h3 className="font-semibold text-slate-200 mb-2">Original <span className="text-xs font-normal text-slate-400">({formatBytes(originalSize)})</span></h3>
                                     <div className="bg-grid rounded-md border border-slate-700 h-48 p-2 overflow-auto" dangerouslySetInnerHTML={{ __html: sanitizedOriginal }} />
                        </div>
                         <div>
                            <h3 className="font-semibold text-slate-200 mb-2">Optimized <span className="text-xs font-normal text-slate-400">({optimizedSvg ? formatBytes(optimizedSize) : '...'})</span></h3>
                            <div className="bg-grid rounded-md border border-slate-700 h-48 p-2 overflow-auto flex items-center justify-center">
                                         {isOptimizing ? <p className="text-slate-400 animate-pulse">Optimizing...</p> : <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: sanitizedOptimized }} />}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button onClick={handleOptimize} disabled={isOptimizing || isExplaining} className="flex-shrink-0 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">
                            {isOptimizing ? 'Optimizing...' : 'Optimize'}
                        </button>
                        <button onClick={handleExplain} disabled={isExplaining || isOptimizing} className="flex items-center gap-2 flex-shrink-0 bg-slate-600 hover:bg-slate-500 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200">
                            <GeminiIcon className="w-5 h-5"/>
                            {isExplaining ? 'Explaining...' : 'Explain Code'}
                        </button>

                        {optimizedSvg && !isOptimizing && (
                            <>
                                <div className="flex-grow bg-slate-700/80 rounded-lg p-2 text-center text-sm text-green-400 font-medium">
                                        Reduction: {reduction.toFixed(2)}%
                                </div>
                                <button onClick={handleDownload} className="flex-shrink-0 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200">
                                    Download
                                </button>
                            </>
                        )}
                    </div>

                    {(isExplaining || explanation) && (
                        <div className="border-t border-slate-700 pt-4">
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2"><GeminiIcon className="w-5 h-5"/> AI Code Explanation</h3>
                            {isExplaining ? (
                                <p className="text-slate-400 animate-pulse">Gemini is analyzing your SVG...</p>
                            ) : (
                                <MarkdownRenderer content={explanation} />
                            )}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Optimizer;