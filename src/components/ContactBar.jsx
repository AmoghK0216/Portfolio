import React from 'react';

const ContactBar = () => {
  return (
    <section 
      className="bg-zinc-900/40 backdrop-blur-sm border border-yellow-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-4 rounded-md animate-fade-in-up" 
      style={{ animationDelay: '700ms' }}
    >
      <div className="text-sm text-zinc-400 tracking-wide">READY TO COLLABORATE?</div>
      <div className="flex gap-4">
        <a 
          href="mailto:amoghkrishna16@gmail.com" 
          className="px-5 py-2 bg-yellow-400 text-zinc-950 font-semibold rounded-md hover:bg-yellow-300 transition-colors"
        >
          GET IN TOUCH
        </a>
        <a 
          href="tel:+13527570959" 
          className="px-5 py-2 border border-yellow-400 text-yellow-400 font-semibold rounded-md hover:bg-yellow-400 hover:text-zinc-950 transition-colors"
        >
          +1 (352) 757-0959
        </a>
      </div>
    </section>
  );
};

export default ContactBar;