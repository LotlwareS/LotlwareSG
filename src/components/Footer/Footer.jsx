import React from "react";
import "./Footer.css";
import logo from "../../assets/incono.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col footer-col-brand">
          <div className="footer-brand">
            <img src={logo} alt="Lotlware" className="footer-logo" />
            <span className="footer-name">Lotlware Solutions</span>
          </div>
          <p className="footer-description">
            Desarrollamos software moderno, dinámico y centrado en el usuario.
            Soluciones a la medida para impulsar tu negocio.
          </p>
        </div>

        <div className="footer-col">
          <h4>Navegación</h4>
          <nav className="footer-nav">
            <a href="/#about">Sobre nosotros</a>
            <a href="/#skills">Habilidades</a>
            <a href="/#projects">Proyectos</a>
            <a href="/#contact">Contacto</a>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Servicios</h4>
          <nav className="footer-nav">
            <a href="/#services">Desarrollo Web</a>
            <a href="/#services">Sistemas Empresariales</a>
            <a href="/#services">Apps móviles</a>
            <a href="/#services">UI/UX Design</a>
          </nav>
        </div>

        <div className="footer-col">
          <h4>Síguenos</h4>
          <div className="footer-socials">
            <a href="https://wa.me/5217721005528" target="_blank" rel="noopener noreferrer" title="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="mailto:LotlwareSolutions@gmail.com" title="Correo">
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Lotlware Solutions Group. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
