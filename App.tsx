import React, { useState, useEffect } from 'react';
import { learningPathData } from './data/learningPath';
import ModuleCard from './components/ModuleCard';
import Optimizer from './components/Optimizer';
import { type Module } from './types';
import SvgGenerator from './components/SvgGenerator';

const App: React.FC = () => {
  const [openModuleId, setOpenModuleId] = useState<number | null>(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [completedModules, setCompletedModules] = useState<Set<number>>(() => {
    // Load from localStorage on initial render
    const saved = localStorage.getItem('completedModules');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Save to localStorage whenever completedModules changes
  useEffect(() => {
    localStorage.setItem('completedModules', JSON.stringify(Array.from(completedModules)));
  }, [completedModules]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleModule = (id: number) => {
    setOpenModuleId(prevId => (prevId === id ? null : id));
  };

  const markModuleComplete = (id: number) => {
    setCompletedModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const progress = Math.round((completedModules.size / learningPathData.length) * 100);

  const PathIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );

  return (
    <div className="min-h-screen bg-slate-900 font-sans p-4 sm:p-6 lg:p-8">
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
          
          {/* Progress Tracker */}
          <div className="mt-6 max-w-md mx-auto">
            <div className="flex justify-between text-sm text-slate-400 mb-2">
              <span>Course Progress</span>
              <span>{completedModules.size} / {learningPathData.length} modules</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-cyan-400 h-full rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center mt-2 text-cyan-400 font-semibold">{progress}%</div>
          </div>
        </header>

        <SvgGenerator />
        <Optimizer />

        <div className="border-t border-slate-700 my-12 relative">
          <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-slate-900 px-4 text-slate-500 text-sm tracking-wider uppercase">Course Modules</span>
        </div>

        <main className="space-y-4">
          {learningPathData.map((module: Module) => (
            <ModuleCard
              key={module.id}
              module={module}
              isOpen={openModuleId === module.id}
              onToggle={() => toggleModule(module.id)}
              isCompleted={completedModules.has(module.id)}
              onToggleComplete={() => markModuleComplete(module.id)}
            />
          ))}
        </main>

        <footer className="text-center mt-12 text-slate-500">
          <p>Designed for a project-oriented, hands-on learning experience.</p>
        </footer>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-cyan-500 hover:bg-cyan-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
            aria-label="Scroll to top"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default App;