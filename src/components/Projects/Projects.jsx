import React, { useState } from "react";
import "./Projects.css";
import { projects } from "../../data/projects";
import ProjectModal from "./ProjectModal";

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
              <div className="project-cover" style={{ background: project.cover.gradient }}>
                <i className={project.cover.icon}></i>
              </div>

              <div className="project-card-body">
                <h3 className="project-name">{project.title}</h3>
                <p className="project-description">{project.description}</p>

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
            </div>
          ))}
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default Projects;
