
import React from 'react';
import Lesson from './Lesson';
import { type Module } from '../types';

interface ModuleCardProps {
  module: Module;
  isOpen: boolean;
  onToggle: () => void;
  isCompleted?: boolean;
  onToggleComplete?: () => void;
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

const CheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

const ModuleCard: React.FC<ModuleCardProps> = ({ module, isOpen, onToggle, isCompleted, onToggleComplete }) => {
  return (
    <div className={`border rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
      isCompleted ? 'border-cyan-500/50 bg-slate-800/70' : 'border-slate-700 bg-slate-800/50'
    }`}>
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 sm:p-5 text-left focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-inset"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4 flex-1">
          <span className={`flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-full font-bold text-lg ${
            isCompleted ? 'bg-cyan-500 text-white' : 'bg-cyan-900/50 text-cyan-400'
          }`}>
            {isCompleted ? <CheckIcon /> : module.id}
          </span>
          <div>
            <h2 className={`text-lg sm:text-xl font-semibold ${isCompleted ? 'text-cyan-300' : 'text-white'}`}>
              {module.title}
            </h2>
            <p className="text-sm text-slate-400 mt-1">{module.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {onToggleComplete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete();
              }}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                isCompleted 
                  ? 'bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30' 
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
              aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
            >
              {isCompleted ? 'Completed' : 'Mark Complete'}
            </button>
          )}
          <ChevronIcon isOpen={isOpen} />
        </div>
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
   