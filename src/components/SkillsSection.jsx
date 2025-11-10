import React, { useState, useEffect } from 'react';
import { X, Search, Code2, Database, Wrench, Brain, Rocket } from 'lucide-react';

const SkillsSection = ({ isOpen, onClose, skills }) => {
  const [animateIn, setAnimateIn] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Icon mapping for categories
  const categoryIcons = {
    'Languages': Code2,
    'Frameworks': Rocket,
    'Databases': Database,
    'Tools': Wrench,
    'Concepts': Brain,
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimateIn(true), 100);
    } else {
      setAnimateIn(false);
      setSearchTerm('');
      setSelectedCategory('All');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Flatten all skills with category info
  const allSkills = [];
  Object.entries(skills).forEach(([category, skillList]) => {
    skillList.forEach(skill => {
      allSkills.push({ name: skill, category });
    });
  });

  // Filter skills based on search and category
  const filteredSkills = allSkills.filter(skill => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || skill.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Object.keys(skills)];

  // Color schemes for categories
  const categoryColors = {
    'Languages': 'from-yellow-400/30 to-amber-400/10',
    'Frameworks': 'from-orange-400/30 to-yellow-400/10',
    'Databases': 'from-amber-400/30 to-yellow-400/10',
    'Tools': 'from-yellow-500/30 to-amber-500/10',
    'Concepts': 'from-yellow-400/30 to-orange-400/10',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/98 backdrop-blur-xl overflow-hidden">
      {/* Deep ocean background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Depth gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 via-blue-950/10 to-zinc-950" />
        
        {/* Ambient light rays */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute top-0 w-1 opacity-5"
            style={{
              left: `${15 + i * 15}%`,
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(250, 204, 21, 0.3), transparent)',
              transform: `rotate(${-3 + Math.random() * 6}deg)`,
              animation: `sway ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={`plankton-${i}`}
            className="absolute w-0.5 h-0.5 bg-yellow-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `floatParticle ${15 + Math.random() * 15}s linear infinite`,
              animationDelay: `${Math.random() * 10}s`,
              boxShadow: '0 0 2px rgba(250, 204, 21, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Main content container */}
      <div className="relative w-full h-full max-w-7xl mx-auto flex flex-col p-6">
        {/* Header */}
        <div className={`flex items-center justify-between mb-6 transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <div className="flex items-center gap-3">
            <div className="w-1 h-12 bg-yellow-400 rounded-full animate-pulse-slow" />
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
                SKILLS
              </h2>
              <p className="text-zinc-500 text-sm mt-1">
                {filteredSkills.length} {filteredSkills.length === 1 ? 'skill' : 'skills'} in the ocean
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/5 transition-all duration-300 group backdrop-blur-sm"
          >
            <X className="text-yellow-400 group-hover:rotate-90 transition-transform duration-300" size={20} />
          </button>
        </div>

        {/* Controls Panel */}
        <div className={`mb-4 transition-all duration-700 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} style={{ transitionDelay: '100ms' }}>
          <div className="bg-zinc-900/60 backdrop-blur-md border border-yellow-400/20 rounded-xl p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search bar */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-400/60" size={18} />
                <input
                  type="text"
                  placeholder="Search skills (e.g., React, Python, Docker)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-800/50 border border-yellow-400/20 rounded-lg text-white placeholder-zinc-500 focus:border-yellow-400 focus:outline-none transition-colors"
                />
              </div>

              {/* Category filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                {categories.map((category) => {
                  const Icon = categoryIcons[category];
                  const isSelected = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                        isSelected
                          ? 'bg-yellow-400 text-zinc-950'
                          : 'bg-zinc-800/50 text-zinc-400 border border-yellow-400/20 hover:border-yellow-400 hover:text-yellow-400'
                      }`}
                    >
                      {Icon && <Icon size={16} />}
                      <span>{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="flex-1 relative overflow-hidden rounded-xl border border-yellow-400/20 bg-zinc-900/20 backdrop-blur-sm">
          <div className="relative w-full h-full overflow-y-auto p-6 pb-24 custom-scrollbar">
            {filteredSkills.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pb-4">
                {filteredSkills.map((skill, index) => {
                  const gradient = categoryColors[skill.category] || categoryColors['Languages'];
                  const floatDelay = Math.random() * 1.5;
                  const floatDuration = 4 + Math.random() * 3;
                  // Stagger glow delays significantly to ensure varied timing
                  const glowDelay = index * 0.3 + Math.random() * 6;
                  const glowDuration = 5 + Math.random() * 3;
                  
                  return (
                    <div
                      key={`${skill.category}-${skill.name}-${index}`}
                      className={`skill-jellyfish group relative transition-all duration-700 ${
                        animateIn ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}
                      style={{ 
                        transitionDelay: `${200 + index * 50}ms`,
                        animation: `jellyfishFloat ${floatDuration}s ease-in-out infinite`,
                        animationDelay: `${floatDelay}s`,
                      }}
                    >
                      {/* Glow effect */}
                      <div 
                        className="absolute inset-0 rounded-xl blur-xl opacity-0"
                        style={{
                          background: `radial-gradient(circle, rgba(250, 204, 21, 0.6) 0%, rgba(250, 204, 21, 0) 70%)`,
                          animation: `jellyfishGlow ${glowDuration}s ease-in-out infinite`,
                          animationDelay: `${glowDelay}s`,
                        }}
                      />

                      {/* Skill card */}
                      <div className={`relative bg-gradient-to-br ${gradient} border-2 border-yellow-400/30 rounded-xl p-4 h-full flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden group-hover:border-yellow-400 transition-all duration-300`}>
                        {/* Inner pulse */}
                        <div 
                          className="absolute inset-0 rounded-xl opacity-0"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(250, 204, 21, 0.3) 0%, transparent 70%)',
                            animation: `innerPulse ${glowDuration}s ease-in-out infinite`,
                            animationDelay: `${glowDelay}s`,
                          }}
                        />

                        {/* Bioluminescent dots */}
                        <div className="absolute top-2 right-2 flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-1 bg-yellow-400 rounded-full opacity-0"
                              style={{
                                animation: `bioluminescence ${glowDuration * 0.6}s ease-in-out infinite`,
                                animationDelay: `${i * 0.2 + glowDelay}s`,
                                boxShadow: '0 0 4px rgba(250, 204, 21, 0.9)',
                              }}
                            />
                          ))}
                        </div>

                        {/* Content */}
                        <div className="relative z-10">
                          {/* Category icon */}
                          {categoryIcons[skill.category] && (
                            <div className="mb-2 flex justify-center">
                              {React.createElement(categoryIcons[skill.category], {
                                size: 20,
                                className: "text-yellow-400/60 group-hover:text-yellow-400 transition-colors"
                              })}
                            </div>
                          )}

                          {/* Skill name */}
                          <div className="text-white font-bold text-sm mb-1 drop-shadow-lg">
                            {skill.name}
                          </div>

                          {/* Category tag */}
                          <div className="text-yellow-400/70 text-[9px] uppercase tracking-widest font-medium">
                            {skill.category}
                          </div>
                        </div>

                        {/* Hover shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer rounded-xl" />

                        {/* Flowing tentacle effect at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 flex gap-0.5 justify-center opacity-30">
                          {[...Array(8)].map((_, i) => (
                            <div
                              key={i}
                              className="w-0.5 bg-yellow-400"
                              style={{
                                height: '100%',
                                animation: `tentacleWave ${1 + Math.random() * 0.5}s ease-in-out infinite`,
                                animationDelay: `${i * 0.1}s`,
                                transformOrigin: 'top center',
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-yellow-400/40 text-6xl mb-4">🔍</div>
                  <p className="text-zinc-400 text-lg mb-2">No skills found</p>
                  <p className="text-zinc-600 text-sm">Try adjusting your search or filter</p>
                </div>
              </div>
            )}
          </div>

          {/* Legend overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-zinc-900/90 backdrop-blur-md border border-yellow-400/30 rounded-lg p-3">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
              {Object.entries(skills).map(([category, skillList]) => {
                const Icon = categoryIcons[category];
                const count = skillList.filter(s => 
                  filteredSkills.some(fs => fs.name === s && fs.category === category)
                ).length;
                return (
                  <div key={category} className="flex items-center gap-2">
                    {Icon && <Icon size={14} className="text-yellow-400" />}
                    <span className="text-zinc-400">{category}:</span>
                    <span className="text-yellow-400 font-bold">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes jellyfishFloat {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-8px) translateX(3px);
          }
          50% {
            transform: translateY(-4px) translateX(-3px);
          }
          75% {
            transform: translateY(-10px) translateX(2px);
          }
        }

        @keyframes jellyfishGlow {
          0%, 100% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes innerPulse {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.7;
            transform: scale(1);
          }
        }

        @keyframes bioluminescence {
          0%, 100% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes tentacleWave {
          0%, 100% {
            transform: scaleY(1);
          }
          50% {
            transform: scaleY(1.5);
          }
        }

        @keyframes sway {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(15px) rotate(3deg);
          }
        }

        @keyframes floatParticle {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${15 + Math.random() * 25}px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(250, 204, 21, 0.3);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(250, 204, 21, 0.5);
        }
      `}</style>
    </div>
  );
};

// Mock data for preview
const mockSkills = {
  Languages: ['Java', 'Python', 'JavaScript', 'Dart', 'Go'],
  Frameworks: ['Spring', 'React', 'Node.js', 'Flutter'],
  Databases: ['SQL', 'MongoDB', 'MySQL'],
  Tools: ['Docker', 'Jenkins', 'Git', 'Selenium'],
  Concepts: ['REST APIs', 'Microservices', 'CI/CD', 'Agile'],
};

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="min-h-screen bg-zinc-950">
      <SkillsSection 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        skills={mockSkills}
      />
    </div>
  );
}