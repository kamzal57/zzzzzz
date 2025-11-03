import React, { useState } from 'react';
import { learningPathData } from './data/learningPath';
import ModuleCard from './components/ModuleCard';
import Optimizer from './components/Optimizer';
import { type Module } from './types';
import SvgGenerator from './components/SvgGenerator';

const App: React.FC = () => {
  const [openModuleId, setOpenModuleId] = useState<number | null>(1);

  const toggleModule = (id: number) => {
    setOpenModuleId(prevId => (prevId === id ? null : id));
  };

  const PathIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8" lang="fr">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <PathIcon />
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              SVG Animation Learning Path
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-cyan-400">Master Interactive SVG Animations with AI</p>
          <p className="mt-4 text-slate-400 max-w-3xl mx-auto">
            A comprehensive guide for developers, from SVG fundamentals to complex animations, including AI-powered tools to accelerate your workflow.
          </p>
        </header>

        <SvgGenerator />
        <Optimizer />

        <div className="border-t border-slate-700 my-12 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-slate-900 px-4 text-slate-500 text-sm tracking-wider uppercase" role="presentation">Course Modules</span>
        </div>

        <main className="space-y-4" role="main">
          {learningPathData.map((module: Module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isOpen={openModuleId === module.id}
              onToggle={() => toggleModule(module.id)}
            />
          ))}
        </main>

        <footer className="text-center mt-12 text-slate-500" role="contentinfo">
          <p>Designed for a project-oriented, hands-on learning experience.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;