import React, { useState } from "react";
import "./Projects.css";
import { projects } from "../../data/projects";
import ProjectModal from "./ProjectModal";

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
  const [selected, setSelected] = useState(null);

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
              key={project.slug}
              className={`project-card ${hovered === i ? "hovered" : ""}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setSelected(project)}
            >
              <div className="project-card-header">
                <i className="fas fa-folder-open project-folder-icon"></i>
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

              <button
                className="project-details-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(project);
                }}
              >
                Ver detalles
              </button>
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default Projects;
