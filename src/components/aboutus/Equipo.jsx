import React from "react";
import "./Equipo.css";
import ajolotito from "../../assets/Axolotl.png";

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
    </section>
  );
};

export default Equipo;
