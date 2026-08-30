import React from "react";
import "./CTA.css";
import ajolotito from "../../assets/Axolotl.png";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-banner">
        <img src={ajolotito} alt="Mascota Lotlware" className="cta-mascot" />
        <div className="cta-text">
          <h2>¿Tienes una idea?</h2>
          <p>Hablemos sobre tu proyecto y construyamos juntos algo increíble.</p>
        </div>
        <a href="/#contact" className="cta-button">
          Hablemos <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </section>
  );
};

export default CTA;
