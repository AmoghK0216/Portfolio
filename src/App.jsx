import React, { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import InteractiveGrid from './components/InteractiveGrid';
import ContactBar from './components/ContactBar';
import Modal from './components/Modal';
import GlobalStyles from './components/GlobalStyles';
import { experiences, projects, skills } from './data/portfolioData';

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (type, content) => {
    setModalContent({ type, content });
    setIsModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 text-white">
      <ThreeBackground />
      <Navigation />

      <main className="relative z-10 min-h-screen flex items-start justify-center pt-28 pb-24 px-6">
        <div className="w-full max-w-6xl">
          <Hero />
          <InteractiveGrid 
            experiences={experiences}
            projects={projects}
            skills={skills}
            openModal={openModal}
          />
          <ContactBar />
        </div>
      </main>

      <Modal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />

      <GlobalStyles />
    </div>
  );
};

export default Portfolio;