import React from 'react';
import { ChevronRight } from 'lucide-react';

const InteractiveGrid = ({ experiences, projects, skills, openModal }) => {
  const cards = [
    {
      id: 'experience',
      title: 'EXPERIENCE',
      count: '03',
      subtitle: 'Professional Journey',
      payload: experiences,
    },
    {
      id: 'projects',
      title: 'PROJECTS',
      count: '04',
      subtitle: 'Featured Work',
      payload: projects,
    },
    {
      id: 'skills',
      title: 'SKILLS',
      count: '20+',
      subtitle: 'Technical Arsenal',
      payload: skills,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {cards.map((card, idx) => (
        <div
          key={card.id}
          onClick={() => openModal(card.id, card.payload)}
          className="group relative bg-zinc-900/40 backdrop-blur-sm border border-yellow-500/20 p-6 cursor-pointer transition-transform transform hover:scale-105 duration-500 animate-fade-in-up"
          style={{ animationDelay: `${400 + idx * 100}ms` }}
        >
          <div className="absolute top-3 right-3 w-10 h-10 border-2 border-yellow-400/30 group-hover:border-yellow-400 transition-transform duration-500 group-hover:rotate-90" />
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">{card.count}</h3>
          <h4 className="text-lg font-semibold mb-1">{card.title}</h4>
          <p className="text-zinc-500 mb-4 text-sm">{card.subtitle}</p>
          <div className="flex items-center gap-2 text-yellow-400 text-sm font-medium">
            <span>EXPLORE</span>
            <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </div>
        </div>
      ))}
    </section>
  );
};

export default InteractiveGrid;