import React from 'react';
import { X, Github } from 'lucide-react';
import ExperienceSection from './ExperienceSection';
import ProjectsSection from './ProjectsSection';
import SkillsSection from './SkillsSection';

const Modal = ({ isOpen, onClose, content }) => {
  // Handle experience separately with new component
  if (content?.type === 'experience') {
    return (
      <ExperienceSection 
        key={`experience-${content.timestamp || Date.now()}`}
        isOpen={isOpen}
        onClose={onClose}
        experiences={content.content}
      />
    );
  }

  // Handle projects with new component
  if (content?.type === 'projects') {
    return (
      <ProjectsSection 
        key={`projects-${content.timestamp || Date.now()}`}
        isOpen={isOpen}
        onClose={onClose}
        projects={content.content}
      />
    );
  }

  if (content?.type === 'skills') {
    return (
      <SkillsSection 
        key={`skills-${content.timestamp || Date.now()}`}
        isOpen={isOpen}
        onClose={onClose}
        skills={content.content}
      />
    );
  }

  if (!isOpen || !content) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6 pt-24 bg-zinc-950/90 backdrop-blur-md overflow-auto">
      <div className="relative max-w-5xl w-full max-h-[85vh] overflow-y-auto bg-zinc-900/90 border border-yellow-500/30 p-6 md:p-10 rounded-md custom-scrollbar">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-yellow-400 hover:text-yellow-300 transition-colors"
        >
          <X size={22} />
        </button>

        {content?.type === 'skills' && (
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-8">SKILLS</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(content.content).map(([category, items]) => (
                <div key={category} className="border-l-2 border-yellow-400/30 pl-4">
                  <h3 className="text-lg font-bold text-white mb-3">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-zinc-800 text-zinc-300 text-sm border border-yellow-500/20 hover:border-yellow-400/60 hover:text-yellow-400 transition-all rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;