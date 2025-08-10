import React from 'react';
import Header from './components/Header';
import ValueProposition from './components/ValueProposition';
import Process from './components/Process';
import Faq from './components/Faq';
import InnovativeFeatures from './components/InnovativeFeatures';
import CTA from './components/CTA';
import Footer from './components/Footer';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="bg-white dark:bg-gray-900 transition-colors duration-500">
        <Header />
        <main>
          <ValueProposition />
          <Process />
          <Faq />
          <InnovativeFeatures />
          <CTA />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;