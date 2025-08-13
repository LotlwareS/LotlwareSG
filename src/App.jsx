import React from 'react';
import Chatbot from './components/Chatbot/Chatbot';
import Hero from './components/Hero/Hero'; // Nuevo módulo Hero
// (Después puedes agregar más módulos como About, Skills, etc.)

function App() {
  return (
    <div className="App">
      <Hero />
      {/* Aquí puedes agregar más secciones en orden */}
      {/* <About /> */}
      {/* <Skills /> */}
      {/* <Projects /> */}
      <Chatbot />
    </div>
  );
}

export default App;
