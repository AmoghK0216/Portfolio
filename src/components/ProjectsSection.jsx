import React, { useState, useEffect } from 'react';
import { X, Github, ExternalLink, Code2, Sparkles, Zap } from 'lucide-react';

const ProjectsSection = ({ isOpen, onClose, projects }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimateCards(true), 100);
    } else {
      setAnimateCards(false);
      setSelectedProject(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Generate particle configs with curved paths - reduced count for less distraction
  const particles = [...Array(45)].map((_, i) => {
    const symbols = ['</>', '{ }', '[ ]', '<>', '()', 'fn', 'let', 'const', 'var', '=>', '==', '||', '&&', '=>'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const isLarge = Math.random() > 0.8; // Fewer large particles
    const isMedium = !isLarge && Math.random() > 0.6;
    const size = isLarge ? 'text-lg' : isMedium ? 'text-sm' : 'text-xs'; // Smaller overall
    // 50-50 yellow and white with better distribution
    const isYellow = i % 2 === 0;
    const color = isYellow ? 'text-yellow-400' : 'text-white';
    const opacity = isLarge ? '40' : isMedium ? '30' : '25'; // Increased opacity to see yellow better
    
    // Random start position
    const startX = Math.random() * 100;
    const startY = Math.random() * 100;
    
    // Create gentle curved path with subtle control points
    const angle = Math.random() * Math.PI * 2;
    const distance = 40 + Math.random() * 50; // Reduced to 40-90px for slower feel
    
    // Main end position
    const endX = startX + Math.cos(angle) * distance;
    const endY = startY + Math.sin(angle) * distance;
    
    // Control points for curve (creates the wave/arc effect)
    const midX = startX + Math.cos(angle + Math.PI / 4) * (distance * 0.6);
    const midY = startY + Math.sin(angle - Math.PI / 4) * (distance * 0.6);
    
    // Much longer lifetimes for very slow, ambient movement
    const lifetime = 15 + Math.random() * 10; // 15-25 seconds
    const delay = Math.random() * 2; // Reduced delay so particles start moving immediately
    
    // Subtle wave parameters for gentle, non-distracting motion
    const waveAmplitude = 8 + Math.random() * 12; // Gentle wave (8-20px)
    const waveFrequency = 1.5 + Math.random() * 1.5; // Fewer waves (1.5-3)
    
    return {
      symbol,
      size,
      color,
      opacity,
      startX,
      startY,
      endX,
      endY,
      midX,
      midY,
      lifetime,
      delay,
      rotation: Math.random() * 360,
      waveAmplitude,
      waveFrequency,
    };
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/95 backdrop-blur-xl overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(250, 204, 21, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(250, 204, 21, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'gridScroll 20s linear infinite'
        }} />
        
        {/* Floating code symbols with curved, organic movement */}
        {particles.map((particle, i) => (
          <div
            key={i}
            className={`absolute ${particle.color}/${particle.opacity} font-mono ${particle.size} font-bold particle-float`}
            style={{
              '--start-x': `${particle.startX}%`,
              '--start-y': `${particle.startY}%`,
              '--mid-x': `${particle.midX}%`,
              '--mid-y': `${particle.midY}%`,
              '--end-x': `${particle.endX}%`,
              '--end-y': `${particle.endY}%`,
              '--lifetime': `${particle.lifetime}s`,
              '--delay': `${particle.delay}s`,
              '--rotation': `${particle.rotation}deg`,
              '--wave-amplitude': `${particle.waveAmplitude}px`,
              '--wave-frequency': particle.waveFrequency,
              left: `${particle.startX}%`,
              top: `${particle.startY}%`,
              animation: `floatCurved var(--lifetime) cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: `var(--delay)`,
              textShadow: particle.color.includes('yellow') 
                ? '0 0 15px rgba(250, 204, 21, 0.6), 0 0 5px rgba(250, 204, 21, 0.8)' 
                : '0 0 10px rgba(255, 255, 255, 0.3)',
            }}
          >
            {particle.symbol}
          </div>
        ))}

        {/* Glowing orbs with 50-50 colors */}
        {[...Array(12)].map((_, i) => {
          const isYellow = i % 2 === 0;
          const color = isYellow 
            ? 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, rgba(250, 204, 21, 0) 70%)'
            : 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 70%)';
          
          return (
            <div
              key={`glow-${i}`}
              className="absolute rounded-full blur-3xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${100 + Math.random() * 200}px`,
                height: `${100 + Math.random() * 200}px`,
                background: color,
                animation: `morphBlob ${5 + Math.random() * 5}s ease-in-out infinite`,
                animationDelay: `0s`,
              }}
            />
          );
        })}
      </div>

      <div className="relative max-w-7xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-down">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 backdrop-blur-sm border border-yellow-400/40 flex items-center justify-center rounded-lg animate-float">
                <Code2 className="text-yellow-400" size={24} />
              </div>
              <Sparkles className="absolute -top-1 -right-1 text-yellow-400 animate-pulse-slow" size={16} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              FEATURED <span className="text-yellow-400">PROJECTS</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-yellow-400/30 hover:border-yellow-400 hover:bg-yellow-400/10 transition-all duration-300 group"
          >
            <X className="text-yellow-400 group-hover:rotate-90 transition-transform" size={20} />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden pr-4 pb-4 custom-scrollbar">
          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`relative cursor-pointer transition-all duration-700 ${
                  animateCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="group relative">
                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-400/0 via-yellow-400/20 to-yellow-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-border-flow" />
                  </div>
                  
                  {/* Card */}
                  <div 
                    onClick={() => setSelectedProject(selectedProject === index ? null : index)}
                    className={`relative h-full bg-zinc-900/60 backdrop-blur-sm border rounded-xl overflow-hidden transition-all duration-500 ${
                      selectedProject === index
                        ? 'border-yellow-400 shadow-lg shadow-yellow-400/20'
                        : 'border-yellow-400/20 group-hover:border-yellow-400/60'
                    }`}
                  >
                  {/* Tech tag ribbon */}
                  <div className="absolute top-0 right-0 px-4 py-1 bg-gradient-to-l from-yellow-400/20 to-transparent border-b border-l border-yellow-400/30 rounded-bl-lg">
                    <div className="flex items-center gap-2">
                      <Zap size={12} className="text-yellow-400 animate-pulse-gentle" />
                      <span className="text-yellow-400 text-xs font-mono font-medium">{project.type}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pt-10">
                    {/* Project name with animated underline */}
                    <div className="relative inline-block mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                        {project.name}
                      </h3>
                      <div className="absolute bottom-0 left-0 h-0.5 bg-yellow-400 w-0 group-hover:w-full transition-all duration-500" />
                    </div>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.split(',').map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs font-mono bg-yellow-400/10 text-yellow-400 border border-yellow-400/30 rounded animate-fade-in"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 group-hover:text-zinc-300 transition-colors">
                      {project.description}
                    </p>

                    {/* Action buttons */}
                    {project.link && (
                      <div className="flex gap-3 pt-4 border-t border-yellow-400/10">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 px-4 py-2 bg-yellow-400/10 hover:bg-yellow-400/20 border border-yellow-400/30 hover:border-yellow-400 text-yellow-400 text-sm font-medium rounded-lg transition-all duration-300 group/btn"
                        >
                          <Github size={16} className="group-hover/btn:rotate-12 transition-transform" />
                          <span>View Code</span>
                        </a>
                      </div>
                    )}

                    {!project.link && (
                      <div className="pt-4 border-t border-yellow-400/10">
                        <span className="text-zinc-500 text-xs font-mono">Academic Project</span>
                      </div>
                    )}
                  </div>

                  {/* Expanded details */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    selectedProject === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 border-t border-yellow-400/20 pt-6 bg-zinc-950/40">
                      <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Sparkles size={18} className="text-yellow-400 animate-pulse-gentle" />
                        Project Highlights
                      </h4>
                      <div className="space-y-2">
                        {getProjectHighlights(project).map((highlight, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-yellow-400/5 border border-yellow-400/20 rounded-lg animate-slide-in-left"
                            style={{ animationDelay: `${i * 100}ms` }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mt-2 animate-pulse-slow" />
                            <p className="text-zinc-300 text-sm">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                    {/* Hover effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-yellow-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridScroll {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }

        @keyframes floatCurved {
          0% {
            left: var(--start-x);
            top: var(--start-y);
            opacity: 0;
            transform: rotate(0deg) scale(0.9) translateX(0);
          }
          15% {
            opacity: 0.8;
            transform: rotate(calc(var(--rotation) * 0.15)) scale(1) translateX(calc(sin(0.15 * var(--wave-frequency) * 3.14159) * var(--wave-amplitude)));
          }
          25% {
            left: calc(var(--start-x) + (var(--mid-x) - var(--start-x)) * 0.5);
            top: calc(var(--start-y) + (var(--mid-y) - var(--start-y)) * 0.5);
            transform: rotate(calc(var(--rotation) * 0.25)) scale(1) translateX(calc(sin(0.25 * var(--wave-frequency) * 3.14159) * var(--wave-amplitude)));
          }
          50% {
            left: var(--mid-x);
            top: var(--mid-y);
            transform: rotate(calc(var(--rotation) * 0.5)) scale(1.02) translateX(calc(sin(0.5 * var(--wave-frequency) * 3.14159) * var(--wave-amplitude)));
          }
          75% {
            left: calc(var(--mid-x) + (var(--end-x) - var(--mid-x)) * 0.5);
            top: calc(var(--mid-y) + (var(--end-y) - var(--mid-y)) * 0.5);
            transform: rotate(calc(var(--rotation) * 0.75)) scale(1) translateX(calc(sin(0.75 * var(--wave-frequency) * 3.14159) * var(--wave-amplitude)));
          }
          85% {
            opacity: 0.8;
            transform: rotate(calc(var(--rotation) * 0.85)) scale(0.98) translateX(calc(sin(0.85 * var(--wave-frequency) * 3.14159) * var(--wave-amplitude)));
          }
          100% {
            left: var(--end-x);
            top: var(--end-y);
            opacity: 0;
            transform: rotate(var(--rotation)) scale(0.9) translateX(calc(sin(var(--wave-frequency) * 3.14159) * var(--wave-amplitude)));
          }
        }

        @keyframes morphBlob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          33% {
            transform: translate(30px, -40px) scale(1.2);
            opacity: 1;
          }
          66% {
            transform: translate(-30px, 30px) scale(0.85);
            opacity: 0.5;
          }
        }

        @keyframes borderFlow {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulseGentle {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes pulseSlow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .particle-float {
          will-change: left, top, opacity, transform;
        }

        .animate-slide-down {
          animation: slideDown 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
        }

        .animate-border-flow {
          animation: borderFlow 3s linear infinite;
        }

        .animate-fade-in {
          animation: fadeIn 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
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

// Helper function to generate project highlights
const getProjectHighlights = (project) => {
  const highlights = {
    'HaulAssist': [
      'Dynamic pricing algorithm based on distance and cargo weight',
      'Secure payment integration with transaction history',
      'Added unit tests using go testing/testify framework, implemented UI automation tests using cypress.'
    ],
    'SNU ARC': [
      'Real-time room/facility availability and booking system',
      'Added a student wallet for on-campus transactions',
      'Implemented role-based access control for different user types: students, staff, and admins'
    ],
    'FarMart': [
      'Direct connection between farmers and consumers',
      'Product catalog with multiple filters and search functionality',
      'Users can look at multiple vendors and compare prices for the same product'
    ],
    'Cross-Language Document Retrieval': [
      'Fine-tuned BERT model for multilingual queries',
      'Support for 1 local-indian language with high accuracy',
      'Efficient document ranking and retrieval system'
    ],
    'AI Checkers Bot': [
      'Implemented Minimax algorithm with alpha-beta pruning for optimal moves',
      'Graphical interface using Pygame for interactive gameplay',
      'Achieved competitive performance against human players'
    ],
    'Blood Donation Management System': [
      'Comprehensive system for managing blood donations and donor information',
      'Implemented donor registration and blood inventory management',
      'Users can select a location/hospitals to check if a specific blood type is available'
    ],
    'Sentiment Analysis on Airline Tweets': [
      'Analyzed sentiment of tweets related to major airlines',
      'Used NLTK for text preprocessing and Scikit-learn for model training',
      'Achieved high accuracy in classifying tweet sentiments',
      'Trained a sarcasm detection model on articles from The Onion to improve sentiment accuracy'
    ],
  };
  
  return highlights[project.name] || [
    'Scalable architecture with modern tech stack',
    'Responsive design for all device sizes',
    'Comprehensive testing and documentation'
  ];
};

export default ProjectsSection;