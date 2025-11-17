import React, { useState, useRef, useEffect } from 'react';
import { Mail, Phone, FileText } from 'lucide-react';

const ContactBar = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setCursorPos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const section = sectionRef.current;
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Handler to open resume in new tab
  const handleResumeClick = () => {
    // Replace this URL with your actual resume PDF URL
    // You can host it on Google Drive, Dropbox, GitHub, or your own server
    const resumeUrl = 'https://drive.google.com/file/d/1YEoE6MaCoiAQo3pr4UIB5Sw-Pmv_augB/view?usp=sharing'; // UPDATE THIS PATH
    window.open(resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden border border-yellow-500/30 p-8 rounded-lg animate-fade-in-up bg-zinc-900/20 backdrop-blur-sm" 
      style={{ animationDelay: '700ms' }}
    >
      {/* Yellow cursor dot */}
      <div 
        className="absolute w-3 h-3 bg-yellow-400 rounded-full pointer-events-none transition-opacity duration-300 z-10"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(250, 204, 21, 0.6)',
        }}
      />
      
      <div className="relative flex flex-col items-center gap-6">
        {/* Heading */}
        <div className="flex items-center gap-3">
          <div className="h-px w-12 bg-yellow-400/30" />
          <h3 className="text-base uppercase tracking-[0.3em] text-yellow-400 font-semibold">
            Let's Connect
          </h3>
          <div className="h-px w-12 bg-yellow-400/30" />
        </div>

        {/* Contact options */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center flex-wrap">
          {/* Email */}
          <a 
            href="mailto:amoghkrishna16@gmail.com" 
            className="contact-button group/link relative flex items-center gap-3 px-6 py-3.5 bg-zinc-900/60 border border-yellow-400/30 hover:border-yellow-400 rounded-lg transition-all duration-300 w-full sm:w-auto justify-center overflow-hidden"
          >
            <div className="relative flex items-center gap-3 z-10">
              <Mail size={18} className="text-yellow-400" />
              <span className="text-zinc-300 group-hover/link:text-zinc-950 text-sm font-medium transition-colors duration-300">
                amoghkrishna16@gmail.com
              </span>
            </div>
          </a>

          {/* Divider */}
          <div className="hidden sm:flex items-center">
            <div className="w-px h-8 bg-yellow-400/30" />
          </div>

          {/* Phone */}
          <a 
            href="tel:+13527570959" 
            className="contact-button group/link relative flex items-center gap-3 px-6 py-3.5 bg-zinc-900/60 border border-yellow-400/30 hover:border-yellow-400 rounded-lg transition-all duration-300 w-full sm:w-auto justify-center overflow-hidden"
          >
            <div className="relative flex items-center gap-3 z-10">
              <Phone size={18} className="text-yellow-400" />
              <span className="text-zinc-300 group-hover/link:text-zinc-950 text-sm font-medium transition-colors duration-300">
                +1 (352) 757-0959
              </span>
            </div>
          </a>

          {/* Divider */}
          <div className="hidden sm:flex items-center">
            <div className="w-px h-8 bg-yellow-400/30" />
          </div>

          {/* Resume Button */}
          <button
            onClick={handleResumeClick}
            className="contact-button group/link relative flex items-center gap-3 px-6 py-3.5 bg-zinc-900/60 border border-yellow-400/30 hover:border-yellow-400 rounded-lg transition-all duration-300 w-full sm:w-auto justify-center overflow-hidden"
          >
            <div className="relative flex items-center gap-3 z-10">
              <FileText size={18} className="text-yellow-400" />
              <span className="text-zinc-300 group-hover/link:text-zinc-950 text-sm font-medium transition-colors duration-300">
                Resume
              </span>
            </div>
          </button>
        </div>

        {/* Subtle call to action text */}
        <p className="text-xs text-zinc-500">
          Open to opportunities • Available for collaboration
        </p>
      </div>

      <style jsx>{`
        .contact-button::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: #FACC15;
          transform: translate(-50%, -50%);
          transition: width 0.6s ease, height 0.6s ease;
          z-index: 0;
        }

        .contact-button:hover::before {
          width: 400px;
          height: 400px;
        }

        .contact-button:hover .text-yellow-400 {
          color: #18181B;
        }
      `}</style>
    </section>
  );
};

export default ContactBar;