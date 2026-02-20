import React, { useState } from "react";
import "./Hero.css";
import logo from "../../assets/incono.png";
import fondo from "../../assets/ajolotes_friends.png";
import icono from "../../assets/logoserio.png";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="hero-overlay">

        {/* ── Navbar ── */}
        <header className="hero-header">
          <div className="logo-group">
            <img src={logo} alt="Lotlware Solutions" className="hero-logo" />
            <span className="hero-text">Lotlware Solutions</span>
          </div>

          <nav className={`hero-nav ${isOpen ? "open" : ""}`}>
            <a href="#about">Sobre nosotros</a>
            <a href="#skills">Habilidades</a>
            <a href="#projects">Proyectos</a>
            <a href="mailto:LotlwareSolutions@gmail.com" className="contact-mail">
              LotlwareSolutions@gmail.com
            </a>
          </nav>

          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>
        </header>

        {/* ── Cuerpo principal ── */}
        <div className="hero-body">

          {/* Columna izquierda: texto */}
          <div className="hero-content">
            <span className="hero-badge">
              <i className="fas fa-code"></i>&nbsp; Software a la medida
            </span>

            <h1>
              Lotlware<br />
              <span className="hero-title-accent">Solutions Group</span>
            </h1>

            <p>
              Somos un equipo de amigos apasionados por el desarrollo de software,
              creando soluciones modernas, dinámicas y centradas en el usuario.
            </p>

            {/* CTAs */}
            <div className="hero-ctas">
              <a href="#projects" className="cta-primary">
                Ver proyectos <i className="fas fa-arrow-right"></i>
              </a>
              <a href="#about" className="cta-secondary">
                Conocer al equipo
              </a>
            </div>

            {/* Redes sociales */}
            <div className="hero-socials">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/cv.pdf" target="_blank" rel="noopener noreferrer" title="Currículo">
                <i className="fas fa-file-alt"></i>
              </a>
            </div>
          </div>

          {/* Columna derecha: logo */}
          <div className="hero-logo-side">
            <div className="hero-logo-ring">
              <img src={icono} alt="Lotlware SG" className="hero-main-logo" />
            </div>
          </div>

        </div>

        {/* Indicador scroll */}
        <div className="hero-scroll-indicator">
          <i className="fas fa-chevron-down"></i>
        </div>

      </div>
    </section>
  );
};

export default Hero;
