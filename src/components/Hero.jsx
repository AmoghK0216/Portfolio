import React from 'react';

const Hero = () => {
  return (
    <section className="text-center mb-12">
      <h1
        className="font-black mb-4 leading-none animate-fade-in-up"
        style={{
          fontSize: 'clamp(2.75rem, 7vw, 8rem)',
          lineHeight: 0.9,
        }}
      >
        <span className="block text-white">AMOGH</span>
        <span className="block text-yellow-400">KRISHNA</span>
      </h1>

      <p className="text-lg md:text-xl text-zinc-400 mb-6 animate-fade-in-up" style={{ animationDelay: '160ms' }}>
        Software Engineer | Full-Stack Developer | MS in Computer Science
      </p>

      <div className="flex gap-4 justify-center text-sm tracking-wider animate-fade-in-up" style={{ animationDelay: '280ms' }}>
        <span className="text-yellow-400">University of Florida</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-400">CGPA 3.94/4.0</span>
      </div>
    </section>
  );
};

export default Hero;