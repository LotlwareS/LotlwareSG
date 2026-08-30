import React, { useState } from "react";
import "../Hero/Hero.css";
import logo from "../../assets/incono.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="hero-header">
      <div className="logo-group">
        <img src={logo} alt="Lotlware Solutions" className="hero-logo" />
        <span className="hero-text">Lotlware Solutions</span>
      </div>

      <nav className={`hero-nav ${isOpen ? "open" : ""}`}>
        <a href="/#about">Sobre nosotros</a>
        <a href="/#skills">Habilidades</a>
        <a href="/#projects">Proyectos</a>
        <a href="mailto:LotlwareSolutions@gmail.com" className="contact-mail">
          <i className="fas fa-envelope"></i> LotlwareSolutions@gmail.com
        </a>
      </nav>

      <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        <i className={`fas ${isOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>
    </header>
  );
};

export default Navbar;
