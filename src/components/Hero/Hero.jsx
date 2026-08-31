import React from "react";
import "./Hero.css";
import Navbar from "../Navbar/Navbar";
import fondo from "../../assets/ajolotes_friends.png";
import icono from "../../assets/logoSerioSinFondo.png";

const Hero = () => {
  return (
    <section className="hero-section" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="hero-overlay">

        <Navbar />

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
              <a href="/#projects" className="cta-primary">
                Ver proyectos <i className="fas fa-arrow-right"></i>
              </a>
              <a href="/#about" className="cta-secondary">
                Conocer al equipo
              </a>
            </div>

            {/* Redes sociales */}
            <div className="hero-socials">
              <a href="https://wa.me/5217721005528" target="_blank" rel="noopener noreferrer" title="WhatsApp">
                <i className="fab fa-whatsapp"></i>
              </a>
              <a href="mailto:LotlwareSolutions@gmail.com" title="Correo">
                <i className="fas fa-envelope"></i>
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
