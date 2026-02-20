import React, { useState } from "react";
import "./Projects.css";

const projects = [
  {
    title: "LotlwareSG - Sitio Web",
    description:
      "Sitio web oficial de Lotlware Solutions Group construido con React y Vite. Incluye secciones de presentación, equipo, habilidades y chatbot inteligente.",
    tags: ["React", "Vite", "CSS3"],
    link: "https://github.com",
    demo: "#",
  },
  {
    title: "Chatbot Lotli",
    description:
      "Asistente virtual bilingüe (ES/EN) integrado en el sitio, con historial persistente, modo oscuro y soporte para formulario de contacto.",
    tags: ["React", "JavaScript", "LocalStorage"],
    link: "https://github.com",
    demo: "#",
  },
  {
    title: "Sistema de Inventarios",
    description:
      "Aplicación web para gestión de inventario con base de datos MySQL, panel de administración y reportes en PDF.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    link: "https://github.com",
    demo: "#",
  },
  {
    title: "App de Seguimiento Fitness",
    description:
      "Aplicación móvil multiplataforma para rastrear rutinas de ejercicio y progreso personal con estadísticas en tiempo real.",
    tags: ["Flutter", "Firebase", "Dart"],
    link: "https://github.com",
    demo: "#",
  },
];

const tagColors = {
  React: "#61dafb",
  Vite: "#a78bfa",
  CSS3: "#2596be",
  JavaScript: "#f0db4f",
  LocalStorage: "#f97316",
  PHP: "#8892bf",
  MySQL: "#00758f",
  Bootstrap: "#7952b3",
  Flutter: "#54c5f8",
  Firebase: "#ffca28",
  Dart: "#00b4ab",
};

const Projects = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2 className="projects-title">Proyectos</h2>
        <p className="projects-subtitle">
          Una muestra del trabajo que hemos construido juntos como equipo.
        </p>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <div
              key={i}
              className={`project-card ${hovered === i ? "hovered" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="project-card-header">
                <i className="fas fa-folder-open project-folder-icon"></i>
                <div className="project-links">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" title="GitHub">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" title="Demo">
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>

              <h3 className="project-name">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="project-tag"
                    style={{ color: tagColors[tag] || "#fff", borderColor: tagColors[tag] || "#fff" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
