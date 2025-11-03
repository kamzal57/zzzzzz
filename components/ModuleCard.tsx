
import React from 'react';
import Lesson from './Lesson';
import { type Module } from '../types';

interface ModuleCardProps {
  module: Module;
  isOpen: boolean;
  onToggle: () => void;
}

const ChevronIcon: React.FC<{ isOpen: boolean }> = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isOpen, onToggle }) => {
  return (
    <div className="border border-slate-700 rounded-lg bg-slate-800/50 overflow-hidden shadow-lg transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Collapse' : 'Expand'} module ${module.id}: ${module.title}`}
      >
        <div className="flex items-center gap-4">
          <span className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-cyan-900/50 text-cyan-400 font-bold text-lg">
            {module.id}
          </span>
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white">{module.title}</h2>
            <p className="text-sm text-slate-400 mt-1">{module.description}</p>
          </div>
        </div>
        <ChevronIcon isOpen={isOpen} />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ transitionProperty: 'max-height, opacity' }}
      >
        <div className="border-t border-slate-700 p-4 sm:p-6 space-y-8">
          {module.lessons.map((lesson, index) => (
            <Lesson key={index} lesson={lesson} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;
   