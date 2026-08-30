import React from "react";
import "./Equipo.css";
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

const EquipoTeam = () => {
  return (
    <div className="equipo-team" id="team">
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
  );
};

export default EquipoTeam;
