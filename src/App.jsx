import React, { useState, useEffect } from 'react';
import ThreeBackground from './components/ThreeBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import InteractiveGrid from './components/InteractiveGrid';
import ContactBar from './components/ContactBar';
import Modal from './components/Modal';
import GlobalStyles from './components/GlobalStyles';
import LoadingScreen from './components/LoadingScreen';
import { experiences, projects, skills } from './data/portfolioData';

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // Lock/unlock body scroll based on modal state (desktop only)
  useEffect(() => {
    if (isModalOpen && window.innerWidth >= 768) {
      // Prevent body scroll on desktop only
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const openModal = (type, content) => {
    setModalContent({ type, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    
    // Force cleanup of any lingering styles on next tick
    requestAnimationFrame(() => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.height = '';
      
      // Force reflow
      document.body.getBoundingClientRect();
    });
  };

  return (
    <>
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} />}
      
      <div className="relative min-h-screen bg-zinc-950 text-white overflow-x-hidden">
        <ThreeBackground />
        <Navigation />

        <main className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 sm:py-8">
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

        {isModalOpen && (
          <Modal 
            isOpen={isModalOpen}
            onClose={closeModal}
            content={modalContent}
          />
        )}

        <GlobalStyles />
      </div>
    </>
  );
};

export default Portfolio;