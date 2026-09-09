import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ProjectModal.css";

const ProjectModal = ({ project, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(e) => e.stopPropagation()}>
        <div className="project-modal-header">
          <h3>
            <i className={project.cover.icon}></i> {project.title}
          </h3>
          <button className="project-modal-close" onClick={onClose} aria-label="Cerrar">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="project-modal-body">
          <div className="project-modal-top">
            <div className="project-modal-cover" style={{ background: project.cover.gradient }}>
              <i className={project.cover.icon}></i>
            </div>
            <p className="project-modal-description">{project.description}</p>
          </div>

          <div className="project-modal-split">
            <div>
              <h4>
                <i className="far fa-circle-question"></i> Problema
              </h4>
              <p>{project.problema}</p>
            </div>
            <div>
              <h4>
                <i className="far fa-lightbulb"></i> Solución
              </h4>
              <p>{project.solucion}</p>
            </div>
          </div>

          <div className="project-modal-section">
            <h4>
              <i className="fas fa-layer-group"></i> Tecnologías
            </h4>
            <div className="project-modal-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="project-modal-tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="project-modal-section">
            <h4>
              <i className="fas fa-list-check"></i> Funcionalidades clave
            </h4>
            <ul className="project-modal-features">
              {project.funcionalidades.map((f) => (
                <li key={f}><i className="fas fa-check-circle"></i> {f}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="project-modal-footer">
          <button
            className="project-modal-cta"
            onClick={() => navigate(`/proyectos/${project.slug}`)}
          >
            Ver caso de estudio <i className="fas fa-arrow-up-right-from-square"></i>
          </button>
          <button className="project-modal-secondary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
