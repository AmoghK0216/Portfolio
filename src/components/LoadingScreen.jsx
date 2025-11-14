import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoadComplete, 100);
          }, 100);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-zinc-950 flex items-center justify-center transition-opacity duration-800 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-yellow-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated logo cubes */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer rotating cube */}
          <div className="absolute inset-0 border-4 border-yellow-400/40 animate-spin-slow" style={{ animationDuration: '4s' }} />
          
          {/* Inner rotating cube */}
          <div className="absolute inset-4 border-4 border-yellow-400/60 animate-spin-reverse" style={{ animationDuration: '3s' }} />
          
          {/* Center logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-xl font-black">
              <span className="text-yellow-400">A</span>
              <span className="text-white">K</span>
            </div>
          </div>

          {/* Corner accents */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-yellow-400" />
          <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-yellow-400" />
          <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-yellow-400" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-yellow-400" />
        </div>

        {/* Loading text */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Loading Portfolio
          </h2>
          <p className="text-zinc-500 text-sm">Preparing the experience...</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 transition-all duration-300 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* Percentage */}
        <div className="mt-4 text-yellow-400 font-mono text-sm">
          {Math.floor(Math.min(progress, 100))}%
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
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

        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }

        .animate-spin-reverse {
          animation: spin-reverse 3s linear infinite;
        }

        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;