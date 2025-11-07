import React from 'react';

const GlobalStyles = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;900&display=swap');

        html, body {
          height: 100%;
          background: #070707;
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          scroll-behavior: smooth;
        }

        * {
          box-sizing: border-box;
          font-family: 'Outfit', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
        }

        /* Fade in up animation */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 600ms cubic-bezier(0.2, 0.9, 0.2, 1) both;
        }

        /* Custom scrollbar for modal */
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ffd86b, #ffb84d);
          border-radius: 10px;
          border: 2px solid rgba(0, 0, 0, 0.15);
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #ffe08a, #ffc966);
        }

        /* Firefox scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #ffb84d rgba(255, 255, 255, 0.03);
        }

        /* Main page scrollbar */
        html::-webkit-scrollbar {
          width: 8px;
        }

        html::-webkit-scrollbar-track {
          background: #070707;
        }

        html::-webkit-scrollbar-thumb {
          background: rgba(250, 204, 21, 0.3);
          border-radius: 4px;
        }

        html::-webkit-scrollbar-thumb:hover {
          background: rgba(250, 204, 21, 0.5);
        }

        html {
          scrollbar-width: thin;
          scrollbar-color: rgba(250, 204, 21, 0.3) #070707;
        }

        body::-webkit-scrollbar {
          width: 8px;
        }

        body::-webkit-scrollbar-track {
          background: #070707;
        }

        body::-webkit-scrollbar-thumb {
          background: rgba(250, 204, 21, 0.3);
          border-radius: 4px;
        }

        body::-webkit-scrollbar-thumb:hover {
          background: rgba(250, 204, 21, 0.5);
        }

        body {
          scrollbar-width: thin;
          scrollbar-color: rgba(250, 204, 21, 0.3) #070707;
        }

        /* Focus outline for accessibility */
        a:focus,
        button:focus {
          outline: 2px solid rgba(255, 214, 138, 0.35);
          outline-offset: 2px;
        }
      `}} />
    </>
  );
};

export default GlobalStyles;