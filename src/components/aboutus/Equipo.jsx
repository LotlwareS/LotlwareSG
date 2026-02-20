import React from "react";
import "./Equipo.css";
import ajolotito from "../../assets/Axolotl.png";
import enrique from "../../assets/enrique.png";
import alexander from "../../assets/alexander.png";
import alexis from "../../assets/alexis.png";

const miembros = [
  {
    img: enrique,
    nombre: "Carlos Enrique R. Gutierrez",
    rol: "Backend Developer",
    descripcion: "Especialista en Backend, Solr y desarrollo web con PHP, Java y React.",
    icon: "fas fa-server",
  },
  {
    img: alexander,
    nombre: "J. Alexander Trejo Alvarado",
    rol: "UI/UX Designer",
    descripcion: "Enfocado en UI/UX, accesibilidad web y desarrollo con herramientas modernas.",
    icon: "fas fa-paint-brush",
  },
  {
    img: alexis,
    nombre: "Alexis Josué Badillo Trejo",
    rol: "DevOps & QA",
    descripcion: "Experto en automatización, testing y soporte técnico de infraestructura.",
    icon: "fas fa-cogs",
  },
];

const Equipo = () => {
  return (
    <section className="equipo-section" id="about">
      {/* ── Intro ── */}
      <div className="equipo-intro">
        <div className="equipo-intro-text">
          <span className="equipo-badge">Sobre nosotros</span>
          <h2>Un equipo apasionado<br />por el software</h2>
          <p>
            Somos un grupo de amigos que compartimos la pasión por el desarrollo de software.
            Al colaborar en proyectos juntos descubrimos que nuestra combinación de intelecto,
            habilidad y creatividad produce resultados de calidad real.
          </p>
          <p>
            Por eso fundamos <strong>Lotlware Solutions Group</strong>: para crear software
            dinámico, moderno y centrado en las necesidades del usuario.
          </p>
          <div className="equipo-stats">
            <div className="stat">
              <span className="stat-number">3+</span>
              <span className="stat-label">Años juntos</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">10+</span>
              <span className="stat-label">Proyectos</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-number">3</span>
              <span className="stat-label">Especialidades</span>
            </div>
          </div>
        </div>

        <div className="equipo-mascota">
          <div className="mascota-ring">
            <img src={ajolotito} alt="Mascota Lotlware" className="ajolotito-img" />
          </div>
        </div>
      </div>

      {/* ── Cards de equipo ── */}
      <div className="equipo-team">
        <h3 className="equipo-team-title">Conoce al equipo</h3>
        <div className="equipo-cards">
          {miembros.map((m, i) => (
            <div className="equipo-card" key={i}>
              <div className="equipo-card-inner">
                {/* Frente */}
                <div className="equipo-card-front">
                  <div className="card-img-wrapper">
                    <img src={m.img} alt={m.nombre} />
                    <div className="card-icon-badge">
                      <i className={m.icon}></i>
                    </div>
                  </div>
                  <div className="card-front-info">
                    <p className="card-nombre">{m.nombre}</p>
                    <span className="card-rol">{m.rol}</span>
                  </div>
                  <span className="card-flip-hint">Pasa el cursor ↻</span>
                </div>

                {/* Reverso */}
                <div className="equipo-card-back">
                  <i className={`${m.icon} card-back-icon`}></i>
                  <p className="card-back-nombre">{m.nombre}</p>
                  <p className="card-back-desc">{m.descripcion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Equipo;
