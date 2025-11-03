import React, { useState } from 'react';
import { type Lesson as LessonType } from '../types';
import GeminiPlayground from './GeminiPlayground';
import GeminiIcon from './GeminiIcon';
import DOMPurify from 'isomorphic-dompurify';

interface LessonProps {
  lesson: LessonType;
}

const CodeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const ToolIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 inline-block text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const Lesson: React.FC<LessonProps> = ({ lesson }) => {
  const [isAiHelperOpen, setIsAiHelperOpen] = useState(false);
  
  const lessonContext = `
Lesson Title: ${lesson.title}
Core Concepts Covered:
- ${lesson.concepts.join('\n- ')}

Code Example:
\`\`\`xml
${lesson.example.code.trim()}
\`\`\`
`;

  return (
    <div className="bg-slate-900/70 p-4 rounded-lg border border-slate-700/50">
      <h3 className="text-lg font-semibold text-cyan-400 mb-3">{lesson.title}</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-slate-200 mb-2">Key Concepts:</h4>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            {lesson.concepts.map((concept, i) => (
              <li key={i}>{concept}</li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-800 p-4 rounded-md border border-slate-700">
          <h4 className="font-medium text-slate-200 mb-2">{lesson.example.title}</h4>
          <p className="text-sm text-slate-400 mb-4">{lesson.example.description}</p>
          
          <div className="mb-4">
            <h5 className="text-sm font-semibold text-slate-300 mb-2 flex items-center"><CodeIcon/>Code Example</h5>
            <pre className="bg-gray-900 text-sm text-cyan-300 p-3 rounded-md overflow-x-auto">
              <code>{lesson.example.code.trim()}</code>
            </pre>
          </div>
          
          <div>
            <h5 className="text-sm font-semibold text-slate-300 mb-2 flex items-center"><EyeIcon/>Visual Preview</h5>
            <div className="bg-grid rounded-md border border-slate-700 h-40 p-2 overflow-hidden flex items-center justify-center">
              <div className="w-full h-full flex items-center justify-center" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(lesson.example.visual, { USE_PROFILES: { svg: true } }) }} />
            </div>
          </div>

          {lesson.tools && lesson.tools.length > 0 && (
            <div className="mt-4">
              <h5 className="text-sm font-semibold text-slate-300 mb-2 flex items-center"><ToolIcon/>Tools & Libraries</h5>
              <div className="flex flex-wrap gap-2">
                {lesson.tools.map((tool, i) => (
                  <span key={i} className="bg-sky-900/70 text-sky-300 text-xs font-medium px-2.5 py-1 rounded-full">{tool}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-700/50 pt-4">
        <button 
            onClick={() => setIsAiHelperOpen(!isAiHelperOpen)}
            className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-800/50 hover:bg-slate-800 p-2 rounded-lg transition-colors"
        >
            <GeminiIcon className="w-5 h-5" />
            <span>{isAiHelperOpen ? 'Close AI Assistant' : 'Ask Gemini about this lesson'}</span>
        </button>
        {isAiHelperOpen && (
            <div className="mt-4">
                <GeminiPlayground 
                    context={lessonContext} 
                    placeholder="e.g., Explain SMIL in more detail..." 
                />
            </div>
        )}
      </div>
    </div>
  );
};

export default Lesson;