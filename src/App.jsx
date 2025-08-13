import React from 'react';
import Chatbot from './components/Chatbot/Chatbot';
import Hero from './components/Hero/Hero';
import Equipo from './components/aboutus/Equipo'; // Nuevo módulo Hero
// (Después puedes agregar más módulos como About, Skills, etc.)

function App() {
  return (
    <div className="App">
      <Hero />
      <Equipo />
      {/* <About /> */}
      {/* <Skills /> */}
      {/* <Projects /> */}
      <Chatbot />
    </div>
  );
}

export default App;
