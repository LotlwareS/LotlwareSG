import React from 'react';
import Chatbot from './components/Chatbot/Chatbot';
import Hero from './components/Hero/Hero';
import Equipo from './components/aboutus/Equipo';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Hero />
      <Equipo />
      <Skills />
      <Projects />
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
