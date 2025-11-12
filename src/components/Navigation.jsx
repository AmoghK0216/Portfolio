import React from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const Navigation = () => {
  return (
    <nav className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between px-6 py-3 bg-transparent backdrop-blur-none border-none rounded-xl">
      <div className="text-2xl md:text-3xl font-extrabold tracking-wide">
        <span className="text-yellow-400">A</span>
        <span className="text-white">K</span>
      </div>
      <div className="flex items-center gap-4">
        <a 
          href="mailto:amoghkrishna16@gmail.com" 
          className="hover:text-yellow-400 transition-colors" 
          title="Email"
        >
          <Mail size={20} />
        </a>
        <a 
          href="https://github.com/AmoghK0216" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-yellow-400 transition-colors" 
          title="GitHub"
        >
          <Github size={20} />
        </a>
        <a 
          href="https://www.linkedin.com/in/amogh-krishna-padakanti-662678207" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-yellow-400 transition-colors" 
          title="LinkedIn"
        >
          <Linkedin size={20} />
        </a>
      </div>
    </nav>
  );
};

export default Navigation;