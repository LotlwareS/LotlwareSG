import React, { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import CTA from "../components/CTA/CTA";
import Footer from "../components/Footer/Footer";
import { getProjectBySlug, getRelatedProjects, proceso, getTagIcon } from "../data/projects";
import "./ProjectCaseStudy.css";

const ProjectCaseStudy = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  const related = getRelatedProjects(slug).slice(0, 3);

  return (
    <div className="case-study-page">
      <Navbar />

      <div className="case-study-content">
        <div className="case-study-container">
          <nav className="case-breadcrumb">
            <Link to="/">Inicio</Link>
            <i className="fas fa-chevron-right"></i>
            <Link to="/#projects">Proyectos</Link>
            <i className="fas fa-chevron-right"></i>
            <span>{project.title}</span>
          </nav>

          <span className="case-badge">CASO DE ESTUDIO</span>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-description">{project.description}</p>

          <div className="case-tags">
            {project.tags.map((tag) => (
              <span key={tag} className="case-tag">{tag}</span>
            ))}
          </div>

          <div className="case-cover" style={{ background: project.cover.gradient }}>
            <i className={project.cover.icon}></i>
          </div>

          <section className="case-split">
            <div className="case-split-card">
              <h3><i className="far fa-circle-question"></i> Problema</h3>
              <p>{project.problema}</p>
            </div>
            <div className="case-split-card">
              <h3><i className="far fa-lightbulb"></i> Solución</h3>
              <p>{project.solucion}</p>
            </div>
          </section>

          <section className="case-section">
            <h2>Tecnologías usadas</h2>
            <div className="case-tech-grid">
              {project.tags.map((tag) => (
                <div className="case-tech-item" key={tag}>
                  <i className={getTagIcon(tag)}></i>
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="case-section">
            <h2>Funcionalidades principales</h2>
            <div className="case-features-grid">
              {project.funcionalidades.map((f) => (
                <div className="case-feature-card" key={f}>
                  <i className="fas fa-check-circle"></i>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="case-section">
            <h2>Proceso de desarrollo</h2>
            <div className="case-process">
              {proceso.map((step, i) => (
                <div className="case-process-step" key={step.title}>
                  <div className="case-process-number">{i + 1}</div>
                  <div className="case-process-icon">
                    <i className={step.icon}></i>
                  </div>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="case-section">
            <h2>Beneficios</h2>
            <div className="case-features-grid">
              {project.beneficios.map((b) => (
                <div className="case-feature-card" key={b}>
                  <i className="fas fa-star"></i>
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="case-section">
            <h2>Más proyectos relacionados</h2>
            <div className="case-related-grid">
              {related.map((p) => (
                <Link to={`/proyectos/${p.slug}`} className="case-related-card" key={p.slug}>
                  <div className="case-related-icon" style={{ background: p.cover.gradient }}>
                    <i className={p.cover.icon}></i>
                  </div>
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                  <span className="case-related-link">Ver proyecto <i className="fas fa-arrow-right"></i></span>
                </Link>
              ))}
              <Link to="/#projects" className="case-related-card case-related-all">
                <i className="fas fa-grip"></i>
                <h4>Ver todos los proyectos</h4>
                <p>Explora el resto de nuestro trabajo.</p>
                <span className="case-related-link">Ver proyectos <i className="fas fa-arrow-right"></i></span>
              </Link>
            </div>
          </section>
        </div>
      </div>

      <CTA />
      <Footer />
    </div>
  );
};

export default ProjectCaseStudy;
