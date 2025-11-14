import React, { useState, useEffect } from 'react';
import { X, Briefcase, Calendar, TrendingUp } from 'lucide-react';

const ExperienceSection = ({ isOpen, onClose, experiences }) => {
  const [selectedExp, setSelectedExp] = useState(null);
  const [animateTimeline, setAnimateTimeline] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimateTimeline(true), 100);
    } else {
      setAnimateTimeline(false);
      setSelectedExp(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-950/95 backdrop-blur-xl">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(60)].map((_, i) => {
          const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
          const sizeClass = size === 'large' ? 'w-3 h-3' : size === 'medium' ? 'w-2 h-2' : 'w-1.5 h-1.5';
          const opacity = size === 'large' ? '50' : size === 'medium' ? '40' : '30';
          
          return (
            <div
              key={i}
              className={`absolute ${sizeClass} bg-yellow-400/${opacity} rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${100 + Math.random() * 20}%`,
                animation: `floatUp ${8 + Math.random() * 8}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`,
                boxShadow: '0 0 4px rgba(250, 204, 21, 0.3)',
              }}
            />
          );
        })}
        {/* Pulsing orbs */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute w-20 h-20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(250, 204, 21, 0.15) 0%, rgba(250, 204, 21, 0) 70%)',
              animation: `pulse ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl w-full h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 animate-slide-down">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center rotate-45">
              <Briefcase className="text-yellow-400 -rotate-45" size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              PROFESSIONAL <span className="text-yellow-400">JOURNEY</span>
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center border border-yellow-400/30 hover:border-yellow-400 hover:rotate-90 transition-all duration-300 group"
          >
            <X className="text-yellow-400 group-hover:scale-110 transition-transform" size={20} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex gap-6 overflow-hidden">
          {/* Timeline */}
          <div className="w-full md:w-2/5 flex flex-col gap-4 overflow-y-auto pr-4 pb-4 pl-6 custom-scrollbar">
            {experiences.map((exp, index) => (
              <div
                key={index}
                onClick={() => setSelectedExp(selectedExp === index ? null : index)}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  animateTimeline ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Timeline connector */}
                <div className="absolute -left-3 top-0 bottom-0 w-0.5 bg-yellow-400/20 group-hover:bg-yellow-400/50 transition-colors" />
                <div className="absolute top-6 -left-5 w-4 h-4 bg-yellow-400 rounded-full border-4 border-zinc-950 group-hover:scale-125 transition-transform z-10" />

                {/* Card */}
                <div
                  className={`border rounded-lg transition-all duration-300 bg-zinc-900/60 backdrop-blur-md ${
                    selectedExp === index
                      ? 'border-yellow-400 bg-zinc-900/70'
                      : 'border-yellow-400/20 hover:border-yellow-400/60'
                  }`}
                >
                  {/* Card Header (always visible) */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                        {exp.company}
                      </h3>
                      <div className={`w-8 h-8 border border-yellow-400/30 group-hover:border-yellow-400 transition-all duration-300 ${
                        selectedExp === index ? 'rotate-45' : ''
                      }`} />
                    </div>
                    
                    <p className="text-yellow-400 text-sm font-medium mb-2">{exp.role}</p>
                    
                    <div className="flex items-center gap-2 text-zinc-400 text-xs">
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  {/* Expanded Details (mobile only) */}
                  <div className={`md:hidden overflow-hidden transition-all duration-500 ${
                    selectedExp === index ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-6 pb-6 border-t border-yellow-400/20 pt-6 animate-fade-in-up">
                      {/* Achievements */}
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4 relative">
                          {/* Animated icon with pulse */}
                          <div className="relative">
                            <TrendingUp className="text-yellow-400 animate-pulse-gentle" size={20} />
                            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping-slow" />
                          </div>
                          <h4 className="text-lg font-bold text-white">Key Achievements</h4>
                          {/* Animated arrow/line */}
                          <div className="flex-1 h-px bg-yellow-400/20 relative overflow-hidden ml-2">
                            <div className="absolute inset-0 h-full w-6 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-slide-line" />
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          {exp.achievements.map((achievement, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-3 bg-zinc-800/50 border border-yellow-400/10 rounded-md relative overflow-hidden group"
                            >
                              {/* Shimmer effect - always running with dull yellow */}
                              <div className="absolute inset-0 animate-shimmer-continuous bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent" />
                              
                              <div className="w-6 h-6 flex-shrink-0 bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 text-xs font-bold relative z-10">
                                {i + 1}
                              </div>
                              <p className="text-zinc-300 text-sm leading-relaxed relative z-10">{achievement}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 bg-yellow-400/5 border border-yellow-400/20 rounded-md text-center relative overflow-hidden group">
                          {/* Animated corner accent */}
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-400/30 animate-corner-expand" />
                          <div className="text-2xl font-black text-yellow-400 mb-1 animate-number-pop">
                            {index === 0 ? '6' : index === 1 ? '6' : '6'}
                          </div>
                          <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Months</div>
                        </div>
                        <div className="p-3 bg-yellow-400/5 border border-yellow-400/20 rounded-md text-center relative overflow-hidden group">
                          {/* Animated corner accent */}
                          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-400/30 animate-corner-expand" style={{ animationDelay: '0.1s' }} />
                          <div className="text-2xl font-black text-yellow-400 mb-1 animate-number-pop" style={{ animationDelay: '0.1s' }}>
                            {index === 0 ? '50%' : index === 1 ? '40%' : '80%'}
                          </div>
                          <div className="text-[10px] text-zinc-400 uppercase tracking-wider">Impact</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Details Panel */}
          <div className="hidden md:block w-3/5 bg-zinc-900/60 backdrop-blur-md border border-yellow-400/20 rounded-lg p-8 overflow-y-auto custom-scrollbar">
            {selectedExp !== null ? (
              <div className="animate-fade-in-right">
                {/* Company Header */}
                <div className="mb-8 pb-6 border-b border-yellow-400/20">
                  <div className="flex items-start justify-between mb-4 gap-4">
                    <div className="flex-1">
                      <h3 className="text-3xl font-black text-white mb-2 break-words">
                        {experiences[selectedExp].company}
                      </h3>
                      <p className="text-xl text-yellow-400 font-semibold mb-3 break-words">
                        {experiences[selectedExp].role}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-sm font-medium whitespace-nowrap">
                        {experiences[selectedExp].period}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div className="flex items-center gap-3 mb-6 relative">
                    {/* Animated icon with pulse */}
                    <div className="relative">
                      <TrendingUp className="text-yellow-400 animate-pulse-gentle" size={24} />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping-slow" />
                    </div>
                    <h4 className="text-2xl font-bold text-white">Key Achievements</h4>
                    {/* Animated arrow/line */}
                    <div className="flex-1 h-px bg-yellow-400/20 relative overflow-hidden ml-4">
                      <div className="absolute inset-0 h-full w-8 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-slide-line" />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {experiences[selectedExp].achievements.map((achievement, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 bg-zinc-800/50 border border-yellow-400/10 rounded-md hover:border-yellow-400/30 transition-all duration-300 group animate-slide-up relative overflow-hidden"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        {/* Shimmer effect - always running with dull yellow */}
                        <div className="absolute inset-0 animate-shimmer-continuous bg-gradient-to-r from-transparent via-yellow-400/5 to-transparent" />
                        
                        <div className="w-8 h-8 flex-shrink-0 bg-yellow-400/10 border border-yellow-400/30 flex items-center justify-center text-yellow-400 font-bold group-hover:bg-yellow-400/20 transition-colors relative z-10">
                          {i + 1}
                        </div>
                        <p className="text-zinc-300 leading-relaxed relative z-10">{achievement}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stats/Metrics */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-md text-center group hover:bg-yellow-400/10 transition-colors relative overflow-hidden">
                    {/* Animated corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-400/30 animate-corner-expand" />
                    <div className="text-3xl font-black text-yellow-400 mb-1 animate-number-pop">
                      {selectedExp === 0 ? '6' : selectedExp === 1 ? '6' : '6'}
                    </div>
                    <div className="text-xs text-zinc-400 uppercase tracking-wider">Months</div>
                  </div>
                  <div className="p-4 bg-yellow-400/5 border border-yellow-400/20 rounded-md text-center group hover:bg-yellow-400/10 transition-colors relative overflow-hidden">
                    {/* Animated corner accent */}
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-yellow-400/30 animate-corner-expand" style={{ animationDelay: '0.1s' }} />
                    <div className="text-3xl font-black text-yellow-400 mb-1 animate-number-pop" style={{ animationDelay: '0.1s' }}>
                      {selectedExp === 0 ? '50%' : selectedExp === 1 ? '40%' : '80%'}
                    </div>
                    <div className="text-xs text-zinc-400 uppercase tracking-wider">Impact</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <div className="w-6 h-6 mx-auto mb-6 relative animate-rotate-random" style={{ transformStyle: 'preserve-3d' }}>
                    {/* Cube wireframe */}
                    <div className="absolute inset-0 border-8 border-yellow-400/60" style={{ transform: 'translateZ(16px)' }}></div>
                    <div className="absolute inset-0 border-8 border-yellow-400/60" style={{ transform: 'translateZ(-16px)' }}></div>
                    <div className="absolute inset-0 border-8 border-yellow-400/60" style={{ transform: 'rotateY(90deg) translateZ(16px)' }}></div>
                    <div className="absolute inset-0 border-8 border-yellow-400/60" style={{ transform: 'rotateY(90deg) translateZ(-16px)' }}></div>
                    <div className="absolute inset-0 border-8 border-yellow-400/60" style={{ transform: 'rotateX(90deg) translateZ(16px)' }}></div>
                    <div className="absolute inset-0 border-8 border-yellow-400/60" style={{ transform: 'rotateX(90deg) translateZ(-16px)' }}></div>
                  </div>
                  <p className="text-zinc-500 text-lg">Select an experience to view details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) translateX(${Math.random() > 0.5 ? '' : '-'}${30 + Math.random() * 40}px) scale(1.2);
            opacity: 0;
          }
        }

        @keyframes rotateRandom {
          0% {
            transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg);
          }
          25% {
            transform: rotateX(127deg) rotateY(83deg) rotateZ(211deg);
          }
          50% {
            transform: rotateX(241deg) rotateY(193deg) rotateZ(97deg);
          }
          75% {
            transform: rotateX(73deg) rotateY(311deg) rotateZ(157deg);
          }
          100% {
            transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
          }
        }

        .animate-rotate-random {
          animation: rotateRandom 6s linear infinite;
          perspective: 1000px;
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

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideLine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(1500%);
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

        @keyframes pingSlow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes numberPop {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes cornerExpand {
          0% {
            width: 0;
            height: 0;
            opacity: 0;
          }
          100% {
            width: 2rem;
            height: 2rem;
            opacity: 1;
          }
        }

        @keyframes shimmerContinuous {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }

        .animate-slide-line {
          animation: slideLine 3s ease-in-out infinite;
        }

        .animate-pulse-gentle {
          animation: pulseGentle 2s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: pingSlow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .animate-number-pop {
          animation: numberPop 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .animate-corner-expand {
          animation: cornerExpand 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .animate-shimmer-continuous {
          animation: shimmerContinuous 2.8s ease-in-out infinite;
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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

        .animate-slide-down {
          animation: slideDown 0.6s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .animate-slide-up {
          animation: slideUp 0.5s cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        .animate-spin-slow {
          animation: spinSlow 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulseSlow 2s ease-in-out infinite;
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

export default ExperienceSection;