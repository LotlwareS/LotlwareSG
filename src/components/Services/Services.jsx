import React from "react";
import "./Services.css";

const services = [
  {
    icon: "fas fa-laptop-code",
    title: "Desarrollo Web",
    description: "Sitios web modernos, rápidos y responsivos con las mejores tecnologías.",
  },
  {
    icon: "fas fa-building",
    title: "Sistemas Empresariales",
    description: "Soluciones a la medida para optimizar procesos y mejorar la productividad.",
  },
  {
    icon: "fas fa-mobile-alt",
    title: "Apps móviles",
    description: "Aplicaciones móviles intuitivas y funcionales para Android e iOS.",
  },
  {
    icon: "fas fa-pen-nib",
    title: "UI/UX Design",
    description: "Diseñamos experiencias atractivas, usables y centradas en el usuario.",
  },
  {
    icon: "fas fa-cloud",
    title: "APIs e Integraciones",
    description: "Conectamos sistemas y automatizamos flujos para mayor eficiencia.",
  },
  {
    icon: "fas fa-headset",
    title: "Soporte y Mantenimiento",
    description: "Acompañamiento continuo para mantener tus sistemas siempre al día.",
  },
];

const Services = () => {
  return (
    <section className="services-section" id="services">
      <div className="services-container">
        <h2 className="services-title">Nuestros Servicios</h2>
        <p className="services-subtitle">
          Lo que hacemos para llevar tu idea de software a la realidad.
        </p>

        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">
                <i className={s.icon}></i>
              </div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-description">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
