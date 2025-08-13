import React from "react";
import "./Equipo.css";
import ajolotito from "../../assets/Axolotl.png";
import enrique from "../../assets/enrique.png";
import alexander from "../../assets/alexander.png";
import alexis from "../../assets/alexis.png";

const Equipo = () => {
  return (
    <section className="equipo-section">
      <div className="parallax-background">
        <div className="ajolotito-container">
          <img src={ajolotito} alt="Ajolotito Empresario" className="ajolotito-img" />
        </div>

        <div className="aboutus-container">
          <h2>Acerca de Nosotros</h2>
          <p>
            Somos un grupo de grandes amigos los cuales coincidimos con el gusto y la pasión por el desarrollo de software, quienes al trabajar en pequeños proyectos nos dimos cuenta de que trabajando colaborativamente hemos podido desarrollar proyectos dinámicos y muy agradables a la vista de los clientes, dándonos cuenta de que los tres podemos unir nuestro intelecto, habilidad y creatividad para construir software de calidad.
          </p>
          <p>
            Es por eso que hemos decidido unirnos en una comunidad llamada <strong>Lotlware Solutions Group</strong>, en donde Alexander Trejo Alvarado, Josue Alexis Badillo y Carlos Enrique Rubio Gutierrez encabezan esta gran comunidad.
          </p>
        </div>

        <div className="equipo-cards">
          {/* Tarjeta de Enrique */}
          <div className="equipo-card">
            <div className="equipo-card-inner">
              <div className="equipo-card-front">
                <img src={enrique} alt="Carlos Enrique" />
                <p>Carlos Enrique R. Gutierrez</p>
              </div>
              <div className="equipo-card-back">
                <p>Especialista en Backend, Solr, y desarrollo web con PHP, Java y React.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Alexander */}
          <div className="equipo-card">
            <div className="equipo-card-inner">
              <div className="equipo-card-front">
                <img src={alexander} alt="Alexander Trejo" />
                <p>J. Alexander Trejo Alvarado</p>
              </div>
              <div className="equipo-card-back">
                <p>Enfocado en UI/UX, accesibilidad web y desarrollo con herramientas modernas.</p>
              </div>
            </div>
          </div>

          {/* Tarjeta de Alexis */}
          <div className="equipo-card">
            <div className="equipo-card-inner">
              <div className="equipo-card-front">
                <img src={alexis} alt="Alexis Badillo" />
                <p>Alexis Josué Badillo Trejo</p>
              </div>
              <div className="equipo-card-back">
                <p>Experto en automatización, testing, y soporte técnico de infraestructura.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipo;
