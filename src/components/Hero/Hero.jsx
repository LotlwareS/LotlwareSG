import React, { useState } from "react";
import "./Hero.css";
import logo from "../../assets/incono.png";
import fondo from "../../assets/ajolotes_friends.png";
import icono from "../../assets/logoserio.png"; // 👈 Agregamos el logo redondo

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="hero-section" style={{ backgroundImage: `url(${fondo})` }}>
      <div className="hero-overlay">
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
            ☰
          </div>
        </header>

        <div className="hero-content">
          <h1>Lotlware Solutions Group</h1>
          <p>
            Somos un grupo de amigos y colegas apasionados por el desarrollo de software,
            con la idea de crear Software agradables para el usuario y enfocado en sus necesidades.
          </p>

          <div className="hero-links">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">Github ↗</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">Linkedin ↗</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
            <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">Currículo ↗</a>
          </div>
        </div>

        {/* 🔵 Logotipo decorativo redondo al lado derecho */}
        <div className="hero-icon-overlay">
          <img src={icono} alt="Lotlware SG" className="hero-main-logo" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
