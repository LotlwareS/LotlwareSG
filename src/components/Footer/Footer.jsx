import React from "react";
import "./Footer.css";
import logo from "../../assets/incono.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <img src={logo} alt="Lotlware" className="footer-logo" />
          <span className="footer-name">Lotlware Solutions Group</span>
        </div>

        <nav className="footer-nav">
          <a href="#about">Sobre nosotros</a>
          <a href="#skills">Habilidades</a>
          <a href="#projects">Proyectos</a>
          <a href="mailto:LotlwareSolutions@gmail.com">Contacto</a>
        </nav>

        <div className="footer-socials">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" title="GitHub">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://wa.me/5217721005528" target="_blank" rel="noopener noreferrer" title="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Lotlware Solutions Group. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
