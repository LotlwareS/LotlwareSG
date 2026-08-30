import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Chatbot from './components/Chatbot/Chatbot';
import Home from './pages/Home';
import ProjectCaseStudy from './pages/ProjectCaseStudy';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proyectos/:slug" element={<ProjectCaseStudy />} />
      </Routes>
      <Chatbot />
    </div>
  );
}

export default App;
