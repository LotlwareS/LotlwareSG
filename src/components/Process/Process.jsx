import React from "react";
import "./Process.css";

const steps = [
  {
    icon: "fas fa-ear-listen",
    title: "Escuchamos",
    description: "Entendemos tus ideas y objetivos.",
  },
  {
    icon: "fas fa-pencil-ruler",
    title: "Diseñamos",
    description: "Planificamos y diseñamos la mejor solución.",
  },
  {
    icon: "fas fa-code",
    title: "Desarrollamos",
    description: "Construimos software limpio y escalable.",
  },
  {
    icon: "fas fa-circle-check",
    title: "Probamos",
    description: "Aseguramos calidad y funcionamiento.",
  },
  {
    icon: "fas fa-paper-plane",
    title: "Entregamos",
    description: "Lanzamos y te acompañamos en el proceso.",
  },
];

const Process = () => {
  return (
    <section className="process-section">
      <div className="process-container">
        <h2 className="process-title">Cómo trabajamos</h2>

        <div className="process-steps">
          {steps.map((step, i) => (
            <div className="process-step" key={step.title}>
              <div className="process-step-number">{i + 1}</div>
              <div className="process-step-icon">
                <i className={step.icon}></i>
              </div>
              <h3 className="process-step-title">{step.title}</h3>
              <p className="process-step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
